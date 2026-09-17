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
    let width = (canvas.width = canvas.parentElement?.clientWidth || 500);
    let height = (canvas.height = canvas.parentElement?.clientHeight || 400);

    const handleResize = () => {
      if (!canvas || !canvas.parentElement) return;
      width = canvas.width = canvas.parentElement.clientWidth;
      height = canvas.height = canvas.parentElement.clientHeight;
    };

    window.addEventListener("resize", handleResize);

    // Graph Nodes
    interface GraphNode {
      x: number;
      y: number;
      vx: number;
      vy: number;
      radius: number;
      type: "suspect" | "relay" | "hub";
      pulse: number;
    }

    const nodeCount = 28;
    const nodes: GraphNode[] = [];

    for (let i = 0; i < nodeCount; i++) {
      nodes.push({
        x: 40 + Math.random() * (width - 80),
        y: 50 + Math.random() * (height - 100),
        vx: (Math.random() - 0.5) * 0.45,
        vy: (Math.random() - 0.5) * 0.45,
        radius: i === 0 ? 7 : i < 5 ? 5 : 3,
        type: i === 0 ? "suspect" : i < 5 ? "hub" : "relay",
        pulse: Math.random() * Math.PI,
      });
    }

    let time = 0;

    const render = () => {
      ctx.clearRect(0, 0, width, height);
      time += 0.025;

      // Update positions
      nodes.forEach((node) => {
        node.x += node.vx;
        node.y += node.vy;
        node.pulse += 0.03;

        if (node.x < 30 || node.x > width - 30) node.vx *= -1;
        if (node.y < 40 || node.y > height - 40) node.vy *= -1;
      });

      // Draw Edges
      for (let i = 0; i < nodes.length; i++) {
        for (let j = i + 1; j < nodes.length; j++) {
          const dx = nodes[i].x - nodes[j].x;
          const dy = nodes[i].y - nodes[j].y;
          const dist = Math.sqrt(dx * dx + dy * dy);

          if (dist < 95) {
            const alpha = (1 - dist / 95) * 0.35;
            ctx.beginPath();
            ctx.moveTo(nodes[i].x, nodes[i].y);
            ctx.lineTo(nodes[j].x, nodes[j].y);
            ctx.strokeStyle =
              nodes[i].type === "suspect" || nodes[j].type === "suspect"
                ? `rgba(255, 42, 84, ${alpha * 1.5})`
                : `rgba(168, 85, 247, ${alpha})`;
            ctx.lineWidth = nodes[i].type === "suspect" ? 1.5 : 1;
            ctx.stroke();
          }
        }
      }

      // Draw Nodes
      nodes.forEach((node) => {
        ctx.beginPath();
        ctx.arc(node.x, node.y, node.radius, 0, Math.PI * 2);

        if (node.type === "suspect") {
          // Crimson glowing threat node
          ctx.fillStyle = "#ff2a54";
          ctx.shadowColor = "#ff2a54";
          ctx.shadowBlur = 12;
          ctx.fill();

          // Radar pulse ring
          const ring = 8 + Math.sin(node.pulse) * 12;
          ctx.beginPath();
          ctx.arc(node.x, node.y, ring, 0, Math.PI * 2);
          ctx.strokeStyle = "rgba(255, 42, 84, 0.4)";
          ctx.lineWidth = 1;
          ctx.stroke();
        } else if (node.type === "hub") {
          ctx.fillStyle = "#c084fc";
          ctx.shadowColor = "#c084fc";
          ctx.shadowBlur = 8;
          ctx.fill();
        } else {
          ctx.fillStyle = "rgba(255, 255, 255, 0.6)";
          ctx.shadowBlur = 0;
          ctx.fill();
        }
        ctx.shadowBlur = 0;
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
    <div className="relative w-full h-[320px] sm:h-[380px] rounded-2xl overflow-hidden bg-neutral-950/80 border border-rose-500/20 flex flex-col items-center justify-center">
      {/* Background ambient gradient */}
      <div className="absolute inset-0 bg-gradient-to-tr from-rose-950/30 via-purple-950/20 to-neutral-950/90 pointer-events-none" />

      {/* Top Header Telemetry */}
      <div className="absolute top-3 inset-x-4 flex items-center justify-between z-10 text-[11px] font-mono">
        <div className="flex items-center gap-2 px-2.5 py-1 rounded-full glass-2 border-rose-500/30 text-rose-300">
          <ShieldAlert className="w-3 h-3 text-rose-400 animate-pulse" />
          <span>TOR NETWORK TOPOLOGY</span>
        </div>
        <div className="flex items-center gap-3 text-neutral-400">
          <span className="flex items-center gap-1">
            <Radio className="w-3 h-3 text-rose-400 animate-ping" />
            <span className="text-neutral-300">Live Tracing</span>
          </span>
          <span className="flex items-center gap-1">
            <Network className="w-3 h-3 text-purple-400" />
            <span className="text-neutral-300">Graph ML</span>
          </span>
        </div>
      </div>

      {/* Canvas */}
      <canvas ref={canvasRef} className="w-full h-full cursor-crosshair z-0" />

      {/* Bottom Status Pill */}
      <div className="absolute bottom-3 inset-x-4 flex items-center justify-between z-10 text-[10px] font-mono text-neutral-400">
        <div className="flex items-center gap-1.5 glass-1 px-2.5 py-1 rounded-full border border-white/10">
          <Search className="w-3 h-3 text-rose-400" />
          <span>Operational Dark Web Intelligence</span>
        </div>
        <div className="hidden sm:block text-neutral-500">
          Suspect Profiling • Threat Classification
        </div>
      </div>
    </div>
  );
}
