"use client";

import React, { useEffect, useState } from "react";
import { motion, useScroll, useTransform } from "framer-motion";

export function AmbientLighting() {
  const { scrollY } = useScroll();
  const [mousePos, setMousePos] = useState({ x: 0.5, y: 0.5 });
  const [isDesktop, setIsDesktop] = useState(false);

  useEffect(() => {
    // Only track cursor on pointer-fine desktop devices
    const hasHover = window.matchMedia("(hover: hover) and (pointer: fine)").matches;
    setIsDesktop(hasHover && window.innerWidth >= 768);

    if (!hasHover) return;

    const handleMouseMove = (e: MouseEvent) => {
      const x = e.clientX / window.innerWidth;
      const y = e.clientY / window.innerHeight;
      setMousePos({ x, y });
    };

    window.addEventListener("mousemove", handleMouseMove, { passive: true });
    return () => window.removeEventListener("mousemove", handleMouseMove);
  }, []);

  // Soft transform on scroll
  const orb1Y = useTransform(scrollY, [0, 3000], [0, 300]);
  const orb2Y = useTransform(scrollY, [0, 3000], [0, -250]);
  const orb3Y = useTransform(scrollY, [0, 4000], [0, 350]);

  return (
    <div className="fixed inset-0 pointer-events-none overflow-hidden z-0 max-w-full" aria-hidden="true">
      {/* Background base vignette */}
      <div className="absolute inset-0 bg-[#050505]" />
      
      {/* Dynamic Cursor Ambient Follower (Only on fine-pointer desktop) */}
      {isDesktop && (
        <motion.div
          className="absolute rounded-full filter blur-[140px] opacity-25"
          style={{
            width: 500,
            height: 500,
            left: `${mousePos.x * 100}%`,
            top: `${mousePos.y * 100}%`,
            transform: "translate(-50%, -50%)",
            background: "radial-gradient(circle, rgba(0, 242, 254, 0.18) 0%, rgba(138, 43, 226, 0.08) 50%, transparent 70%)",
            transition: "left 0.8s cubic-bezier(0.16, 1, 0.3, 1), top 0.8s cubic-bezier(0.16, 1, 0.3, 1)",
          }}
        />
      )}

      {/* Primary Ambient Atmosphere Field 1: Cyan / Deep Blue (Top / Hero) */}
      <motion.div
        style={{ y: orb1Y }}
        animate={{
          scale: [1, 1.05, 0.98, 1],
          opacity: [0.15, 0.22, 0.15],
        }}
        transition={{
          duration: 18,
          repeat: Infinity,
          ease: "easeInOut",
        }}
        className="absolute -top-[80px] sm:-top-[120px] left-[5%] sm:left-[15%] w-[320px] sm:w-[680px] h-[320px] sm:h-[540px] rounded-full blur-[90px] sm:blur-[160px] bg-gradient-to-br from-cyan-500/25 via-blue-600/15 to-transparent"
      />

      {/* Primary Ambient Atmosphere Field 2: Electric Violet / Magenta (Mid / Projects) */}
      <motion.div
        style={{ y: orb2Y }}
        animate={{
          scale: [1, 0.95, 1.06, 1],
          opacity: [0.12, 0.18, 0.12],
        }}
        transition={{
          duration: 22,
          repeat: Infinity,
          ease: "easeInOut",
          delay: 2,
        }}
        className="absolute top-[35%] -right-[60px] sm:-right-[100px] w-[340px] sm:w-[720px] h-[340px] sm:h-[600px] rounded-full blur-[90px] sm:blur-[170px] bg-gradient-to-bl from-purple-600/20 via-pink-600/10 to-transparent"
      />

      {/* Primary Ambient Atmosphere Field 3: Crimson / Deep Indigo (Experience / TOR Section) */}
      <motion.div
        style={{ y: orb3Y }}
        animate={{
          scale: [1, 1.04, 0.96, 1],
          opacity: [0.12, 0.17, 0.12],
        }}
        transition={{
          duration: 24,
          repeat: Infinity,
          ease: "easeInOut",
          delay: 4,
        }}
        className="absolute top-[65%] -left-[60px] sm:-left-[120px] w-[320px] sm:w-[680px] h-[320px] sm:h-[560px] rounded-full blur-[90px] sm:blur-[170px] bg-gradient-to-tr from-rose-600/18 via-indigo-700/15 to-transparent"
      />

      {/* Primary Ambient Atmosphere Field 4: Emerald / Cyan (Agri-Intelligence / Footer) */}
      <motion.div
        animate={{
          scale: [1, 1.06, 0.98, 1],
          opacity: [0.08, 0.14, 0.08],
        }}
        transition={{
          duration: 20,
          repeat: Infinity,
          ease: "easeInOut",
          delay: 6,
        }}
        className="absolute bottom-[-60px] sm:bottom-[-100px] right-[10%] sm:right-[20%] w-[300px] sm:w-[620px] h-[300px] sm:h-[480px] rounded-full blur-[90px] sm:blur-[160px] bg-gradient-to-tl from-emerald-500/15 via-teal-600/10 to-transparent"
      />

      {/* Subtle grid line overlay */}
      <div 
        className="absolute inset-0 opacity-[0.02] bg-[radial-gradient(#ffffff_1px,transparent_1px)] [background-size:32px_32px]"
      />
    </div>
  );
}
