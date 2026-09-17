"use client";

import React, { useEffect, useRef } from "react";
import { Sprout, Layers, BarChart3, CloudSun } from "lucide-react";

export function AgriGisVisualizer() {
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

    let time = 0;

    const render = () => {
      ctx.clearRect(0, 0, width, height);
      time += 0.02;

      const centerX = width / 2;
      const centerY = height / 2 + (isMobile ? 10 : 15);

      const contours = isMobile ? 4 : 6;
      const step = isMobile ? 18 : 25;

      for (let c = 0; c < contours; c++) {
        ctx.beginPath();
        const baseRadius = (isMobile ? 25 : 40) + c * step;
        for (let angle = 0; angle <= Math.PI * 2; angle += 0.1) {
          const distortion =
            Math.sin(angle * 3 + time + c) * (isMobile ? 5 : 8) +
            Math.cos(angle * 2 - time * 0.5) * (isMobile ? 4 : 6);
          const r = baseRadius + distortion;
          const x = centerX + Math.cos(angle) * r * (isMobile ? 1.15 : 1.3);
          const y = centerY + Math.sin(angle) * (r * (isMobile ? 0.7 : 0.75));

          if (angle === 0) ctx.moveTo(x, y);
          else ctx.lineTo(x, y);
        }
        ctx.closePath();
        ctx.strokeStyle = `rgba(16, 185, 129, ${0.15 + c * 0.06})`;
        ctx.lineWidth = c === (isMobile ? 2 : 3) ? 1.5 : 1;
        ctx.stroke();

        if (c === 1) {
          ctx.fillStyle = "rgba(16, 185, 129, 0.05)";
          ctx.fill();
        }
      }

      // Geo Sensor Points
      const numPoints = isMobile ? 8 : 12;
      for (let i = 0; i < numPoints; i++) {
        const a = (i * Math.PI * 2) / numPoints + time * 0.1;
        const dist = (isMobile ? 45 : 65) + (i % 3) * (isMobile ? 20 : 35);
        const px = centerX + Math.cos(a) * dist * (isMobile ? 1.15 : 1.3);
        const py = centerY + Math.sin(a) * (dist * (isMobile ? 0.7 : 0.75));

        ctx.beginPath();
        ctx.arc(px, py, isMobile ? 2 : 2.5, 0, Math.PI * 2);
        ctx.fillStyle = i % 2 === 0 ? "#10b981" : "#00f2fe";
        ctx.fill();
      }

      // Radar scanning line
      const scanAngle = time * 0.8;
      const scanLength = isMobile ? 105 : 160;
      ctx.beginPath();
      ctx.moveTo(centerX, centerY);
      ctx.lineTo(
        centerX + Math.cos(scanAngle) * scanLength,
        centerY + Math.sin(scanAngle) * (scanLength * 0.6)
      );
      ctx.strokeStyle = "rgba(16, 185, 129, 0.4)";
      ctx.lineWidth = 1.2;
      ctx.stroke();

      animationFrameId = requestAnimationFrame(render);
    };

    render();

    return () => {
      cancelAnimationFrame(animationFrameId);
      window.removeEventListener("resize", handleResize);
    };
  }, []);

  return (
    <div className="relative w-full h-[220px] sm:h-[300px] md:h-[360px] rounded-2xl overflow-hidden bg-neutral-950/80 border border-emerald-500/20 flex flex-col items-center justify-center">
      {/* Background ambient gradient */}
      <div className="absolute inset-0 bg-gradient-to-tr from-emerald-950/30 via-teal-950/20 to-neutral-950/90 pointer-events-none" />

      {/* Top Header Telemetry */}
      <div className="absolute top-2.5 inset-x-3 sm:inset-x-4 flex items-center justify-between z-10 text-[10px] sm:text-[11px] font-mono">
        <div className="flex items-center gap-1.5 px-2.5 py-1 rounded-full glass-2 border-emerald-500/30 text-emerald-300">
          <Sprout className="w-3 h-3 text-emerald-400 animate-pulse" />
          <span>GIS INTELLIGENCE</span>
        </div>
        <div className="flex items-center gap-2 sm:gap-3 text-neutral-400">
          <span className="flex items-center gap-1">
            <CloudSun className="w-3 h-3 text-yellow-400" />
            <span className="text-neutral-300">GIS Telemetry</span>
          </span>
          <span className="flex items-center gap-1">
            <BarChart3 className="w-3 h-3 text-cyan-400" />
            <span className="text-neutral-300 hidden xs:inline">XAI Model</span>
          </span>
        </div>
      </div>

      {/* Live Canvas */}
      <canvas ref={canvasRef} className="w-full h-full cursor-crosshair z-0" />

      {/* Bottom Status Pill */}
      <div className="absolute bottom-2.5 inset-x-3 sm:inset-x-4 flex items-center justify-between z-10 text-[9px] sm:text-[10px] font-mono text-neutral-400">
        <div className="flex items-center gap-1.5 glass-1 px-2.5 py-1 rounded-full border border-white/10">
          <Layers className="w-3 h-3 text-emerald-400" />
          <span>Soil & Precision Agriculture</span>
        </div>
        <div className="hidden xs:block text-neutral-500">
          Predictive Insights
        </div>
      </div>
    </div>
  );
}
