"use client";

import React, { useEffect, useRef } from "react";
import { ShieldAlert, Radio, Search, Network } from "lucide-react";

export function TorNetworkVisualizer() {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    let animationFrameId: number;
    let width = (canvas.width = canvas.parentElement?.clientWidth || 360);
    let height = (canvas.height = canvas.parentElement?.clientHeight || 240);

    const isMobile = width < 500;

    const handleResize = () => {
      if (!canvas || !canvas.parentElement) return;
      width = canvas.width = canvas.parentElement.clientWidth;
      height = canvas.height = canvas.parentElement.clientHeight;
    };

    window.addEventListener("resize", handleResize);

    interface GraphNode {
      x: number;
      y: number;
      vx: number;
      vy: number;
      radius: number;
      type: "suspect" | "relay" | "hub";
      pulse: number;
    }

    const nodeCount = isMobile ? 14 : 26;
    const nodes: GraphNode[] = [];

    for (let i = 0; i < nodeCount; i++) {
      nodes.push({
        x: 30 + Math.random() * (width - 60),
        y: 40 + Math.random() * (height - 80),
        vx: (Math.random() - 0.5) * 0.4,
        vy: (Math.random() - 0.5) * 0.4,
        radius: i === 0 ? (isMobile ? 5.5 : 7) : i < 4 ? 4.5 : 3,
        type: i === 0 ? "suspect" : i < 4 ? "hub" : "relay",
        pulse: Math.random() * Math.PI,
      });
    }

    let time = 0;

    const render = () => {
      ctx.clearRect(0, 0, width, height);
      time += 0.025;

      nodes.forEach((node) => {
        node.x += node.vx;
        node.y += node.vy;
        node.pulse += 0.03;

        if (node.x < 20 || node.x > width - 20) node.vx *= -1;
        if (node.y < 35 || node.y > height - 35) node.vy *= -1;
      });

      const maxDist = isMobile ? 70 : 95;

      for (let i = 0; i < nodes.length; i++) {
        for (let j = i + 1; j < nodes.length; j++) {
          const dx = nodes[i].x - nodes[j].x;
          const dy = nodes[i].y - nodes[j].y;
          const dist = Math.sqrt(dx * dx + dy * dy);

          if (dist < maxDist) {
            const alpha = (1 - dist / maxDist) * 0.35;
            ctx.beginPath();
            ctx.moveTo(nodes[i].x, nodes[i].y);
            ctx.lineTo(nodes[j].x, nodes[j].y);
            ctx.strokeStyle =
              nodes[i].type === "suspect" || nodes[j].type === "suspect"
                ? `rgba(255, 42, 84, ${alpha * 1.5})`
                : `rgba(168, 85, 247, ${alpha})`;
            ctx.lineWidth = 1;
            ctx.stroke();
          }
        }
      }

      nodes.forEach((node) => {
        ctx.beginPath();
        ctx.arc(node.x, node.y, node.radius, 0, Math.PI * 2);

        if (node.type === "suspect") {
          ctx.fillStyle = "#ff2a54";
          ctx.fill();

          const ring = (isMobile ? 6 : 8) + Math.sin(node.pulse) * (isMobile ? 8 : 12);
          ctx.beginPath();
          ctx.arc(node.x, node.y, ring, 0, Math.PI * 2);
          ctx.strokeStyle = "rgba(255, 42, 84, 0.45)";
          ctx.lineWidth = 1;
          ctx.stroke();
        } else if (node.type === "hub") {
          ctx.fillStyle = "#c084fc";
          ctx.fill();
        } else {
          ctx.fillStyle = "rgba(255, 255, 255, 0.6)";
          ctx.fill();
        }
      });

      animationFrameId = requestAnimationFrame(render);
    };

    render();

    return () => {
      cancelAnimationFrame(animationFrameId);
      window.removeEventListener("resize", handleResize);
    };
  }, []);

  return (
    <div className="relative w-full h-[220px] sm:h-[300px] md:h-[360px] rounded-2xl overflow-hidden bg-neutral-950/80 border border-rose-500/20 flex flex-col items-center justify-center">
      {/* Background ambient gradient */}
      <div className="absolute inset-0 bg-gradient-to-tr from-rose-950/30 via-purple-950/20 to-neutral-950/90 pointer-events-none" />

      {/* Top Header Telemetry */}
      <div className="absolute top-2.5 inset-x-3 sm:inset-x-4 flex items-center justify-between z-10 text-[10px] sm:text-[11px] font-mono">
        <div className="flex items-center gap-1.5 px-2.5 py-1 rounded-full glass-2 border-rose-500/30 text-rose-300">
          <ShieldAlert className="w-3 h-3 text-rose-400 animate-pulse" />
          <span>TOR TOPOLOGY</span>
        </div>
        <div className="flex items-center gap-2 sm:gap-3 text-neutral-400">
          <span className="flex items-center gap-1">
            <Radio className="w-3 h-3 text-rose-400 animate-ping" />
            <span className="text-neutral-300">Live Tracing</span>
          </span>
          <span className="flex items-center gap-1">
            <Network className="w-3 h-3 text-purple-400" />
            <span className="text-neutral-300 hidden xs:inline">Graph ML</span>
          </span>
        </div>
      </div>

      {/* Canvas */}
      <canvas ref={canvasRef} className="w-full h-full cursor-crosshair z-0" />

      {/* Bottom Status Pill */}
      <div className="absolute bottom-2.5 inset-x-3 sm:inset-x-4 flex items-center justify-between z-10 text-[9px] sm:text-[10px] font-mono text-neutral-400">
        <div className="flex items-center gap-1.5 glass-1 px-2.5 py-1 rounded-full border border-white/10">
          <Search className="w-3 h-3 text-rose-400" />
          <span>Operational Dark Web Intel</span>
        </div>
        <div className="hidden xs:block text-neutral-500">
          Suspect Profiling • Threat ML
        </div>
      </div>
    </div>
  );
}
