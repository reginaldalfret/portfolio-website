"use client";

import React, { useEffect, useRef } from "react";
import { Activity, Cpu, ShieldCheck, Zap } from "lucide-react";

export function AgentSwarmVisualizer() {
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

    // Adaptive agent nodes count (fewer on mobile for 60fps canvas performance)
    const TOTAL_AGENTS = isMobile ? 85 : 301;
    interface Node {
      angle: number;
      speed: number;
      radius: number;
      size: number;
      color: string;
      id: number;
    }

    const nodes: Node[] = [];
    const colors = ["#00f2fe", "#38bdf8", "#818cf8", "#c084fc", "#ffffff"];

    const ringRadii = isMobile ? [36, 62, 88] : [55, 93, 131, 169];

    for (let i = 0; i < TOTAL_AGENTS; i++) {
      const ringIndex = i % ringRadii.length;
      const baseRadius = ringRadii[ringIndex] + (Math.random() * (isMobile ? 8 : 15) - (isMobile ? 4 : 7.5));
      nodes.push({
        angle: Math.random() * Math.PI * 2,
        speed: (0.002 + Math.random() * 0.003) * (ringIndex % 2 === 0 ? 1 : -1),
        radius: baseRadius,
        size: Math.random() > 0.85 ? (isMobile ? 2.0 : 2.5) : (isMobile ? 1.2 : 1.6),
        color: colors[Math.floor(Math.random() * colors.length)],
        id: i + 1,
      });
    }

    let time = 0;

    const render = () => {
      ctx.clearRect(0, 0, width, height);
      const centerX = width / 2;
      const centerY = height / 2;
      time += 0.02;

      // Concentric guide rings
      ctx.lineWidth = 1;
      ringRadii.forEach((r, idx) => {
        ctx.beginPath();
        ctx.arc(centerX, centerY, r, 0, Math.PI * 2);
        ctx.strokeStyle = `rgba(0, 242, 254, ${0.08 - idx * 0.015})`;
        ctx.stroke();
      });

      // Pulse waves from center
      const maxPulse = isMobile ? 100 : 180;
      const pulseRadius = (time * 24) % maxPulse;
      ctx.beginPath();
      ctx.arc(centerX, centerY, pulseRadius, 0, Math.PI * 2);
      ctx.strokeStyle = `rgba(0, 242, 254, ${Math.max(0, 0.4 - pulseRadius / maxPulse)})`;
      ctx.stroke();

      // Render Agent Nodes
      nodes.forEach((node) => {
        node.angle += node.speed;
        const x = centerX + Math.cos(node.angle) * node.radius;
        const y = centerY + Math.sin(node.angle) * node.radius;

        if (node.id % (isMobile ? 16 : 24) === 0) {
          ctx.beginPath();
          ctx.moveTo(centerX, centerY);
          ctx.lineTo(x, y);
          ctx.strokeStyle = "rgba(0, 242, 254, 0.12)";
          ctx.stroke();
        }

        ctx.beginPath();
        ctx.arc(x, y, node.size, 0, Math.PI * 2);
        ctx.fillStyle = node.color;
        ctx.fill();
      });

      // Central Agent 301 Orchestrator Core
      const coreGlow = ctx.createRadialGradient(centerX, centerY, 0, centerX, centerY, isMobile ? 24 : 36);
      coreGlow.addColorStop(0, "rgba(0, 242, 254, 0.4)");
      coreGlow.addColorStop(0.5, "rgba(138, 43, 226, 0.2)");
      coreGlow.addColorStop(1, "rgba(0, 0, 0, 0)");
      ctx.fillStyle = coreGlow;
      ctx.beginPath();
      ctx.arc(centerX, centerY, isMobile ? 24 : 36, 0, Math.PI * 2);
      ctx.fill();

      // Core Solid Disc
      const discRadius = isMobile ? 11 : 14;
      ctx.beginPath();
      ctx.arc(centerX, centerY, discRadius, 0, Math.PI * 2);
      ctx.fillStyle = "#090d16";
      ctx.strokeStyle = "#00f2fe";
      ctx.lineWidth = 1.5;
      ctx.fill();
      ctx.stroke();

      // Core Label
      ctx.fillStyle = "#ffffff";
      ctx.font = isMobile ? "bold 8px monospace" : "bold 9px monospace";
      ctx.textAlign = "center";
      ctx.textBaseline = "middle";
      ctx.fillText("301", centerX, centerY);

      animationFrameId = requestAnimationFrame(render);
    };

    render();

    return () => {
      cancelAnimationFrame(animationFrameId);
      window.removeEventListener("resize", handleResize);
    };
  }, []);

  return (
    <div className="relative w-full h-[220px] sm:h-[300px] md:h-[360px] rounded-2xl overflow-hidden bg-neutral-950/80 border border-cyan-500/20 flex flex-col items-center justify-center">
      {/* Background ambient gradient */}
      <div className="absolute inset-0 bg-gradient-to-tr from-cyan-950/30 via-purple-950/20 to-neutral-950/90 pointer-events-none" />

      {/* Top Telemetry Header */}
      <div className="absolute top-2.5 inset-x-3 sm:inset-x-4 flex items-center justify-between z-10 text-[10px] sm:text-[11px] font-mono">
        <div className="flex items-center gap-1.5 px-2.5 py-1 rounded-full glass-2 border-cyan-500/30 text-cyan-300">
          <Activity className="w-3 h-3 text-cyan-400 animate-pulse" />
          <span>AGENT 301 CORE</span>
        </div>
        <div className="flex items-center gap-2 sm:gap-3 text-neutral-400">
          <span className="flex items-center gap-1">
            <Cpu className="w-3 h-3 text-emerald-400" />
            <span className="text-neutral-300 hidden xs:inline">Local Inference</span>
          </span>
          <span className="flex items-center gap-1">
            <Zap className="w-3 h-3 text-yellow-400" />
            <span className="text-neutral-300">301 Agents</span>
          </span>
        </div>
      </div>

      {/* Live Canvas */}
      <canvas ref={canvasRef} className="w-full h-full cursor-crosshair z-0" />

      {/* Bottom Status Pill */}
      <div className="absolute bottom-2.5 inset-x-3 sm:inset-x-4 flex items-center justify-between z-10 text-[9px] sm:text-[10px] font-mono text-neutral-400">
        <div className="flex items-center gap-1.5 glass-1 px-2.5 py-1 rounded-full border border-white/10">
          <ShieldCheck className="w-3 h-3 text-cyan-400" />
          <span>Sovereign Local-First</span>
        </div>
        <div className="hidden xs:block text-neutral-500">
          OCR • Streaming Inference
        </div>
      </div>
    </div>
  );
}
