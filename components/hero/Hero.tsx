"use client";

import React from "react";
import { motion } from "framer-motion";
import { PORTFOLIO_DATA } from "@/lib/portfolioData";
import { GlassButton } from "@/components/ui/GlassButton";
import { LiquidNeuralCore } from "@/components/3d/LiquidNeuralCore";
import { ArrowDown, Github, Linkedin, Mail, Trophy, Sparkles, Terminal } from "lucide-react";
import { trackContactClick } from "@/lib/analytics";

interface HeroProps {
  onOpenResume: () => void;
}

export function Hero({ onOpenResume }: HeroProps) {
  return (
    <section className="relative min-h-[100dvh] flex flex-col justify-center items-center pt-[calc(4.5rem+env(safe-area-inset-top))] pb-12 sm:pb-16 px-3.5 sm:px-6 lg:px-8 overflow-hidden">
      <div className="w-full max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-8 items-center">
        
        {/* Left Column: Typography & Action (Desktop & Mobile First Priority) */}
        <div className="lg:col-span-7 flex flex-col items-center lg:items-start text-center lg:text-left z-10 w-full">
          
          {/* Eyebrow badge */}
          <motion.div
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
            className="inline-flex items-center gap-2 px-3 sm:px-4 py-1.5 rounded-full text-[11px] sm:text-xs font-mono tracking-[0.15em] sm:tracking-[0.2em] uppercase glass-1 mb-4 sm:mb-6 border border-white/10"
          >
            <span className="w-2 h-2 rounded-full bg-cyan-400 animate-pulse shadow-[0_0_8px_rgba(0,242,254,0.8)]" />
            <span className="text-neutral-200 font-semibold">{PORTFOLIO_DATA.personal.name}</span>
            <span className="text-neutral-500">|</span>
            <span className="text-neutral-400">Chennai, India</span>
          </motion.div>

          {/* Main Title Stack with responsive fluid clamp */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.1, ease: [0.16, 1, 0.3, 1] }}
            className="space-y-1 sm:space-y-2 mb-4 sm:mb-6 w-full"
          >
            <h1 className="text-[28px] xs:text-3xl sm:text-5xl md:text-6xl lg:text-7xl font-bold tracking-[-0.04em] text-white leading-[1.08] break-words">
              SOFTWARE ENGINEER
            </h1>
            <h2 className="text-[24px] xs:text-[28px] sm:text-4xl md:text-5xl lg:text-6xl font-semibold tracking-[-0.035em] text-neutral-300 leading-[1.08] break-words">
              FULL-STACK DEVELOPER
            </h2>
            <h2 className="text-[24px] xs:text-[28px] sm:text-4xl md:text-5xl lg:text-6xl font-semibold tracking-[-0.035em] bg-gradient-to-r from-cyan-400 via-indigo-300 to-purple-400 bg-clip-text text-transparent leading-[1.08] break-words">
              AI ENGINEER
            </h2>
          </motion.div>

          {/* Supporting statement */}
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2, ease: [0.16, 1, 0.3, 1] }}
            className="text-base sm:text-xl text-neutral-300 max-w-xl font-normal leading-relaxed mb-6 sm:mb-8 px-2 sm:px-0"
          >
            {PORTFOLIO_DATA.personal.headline}
          </motion.p>

          {/* Call to Actions - Tappable & Stacked Intelligently on narrow screens */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.3, ease: [0.16, 1, 0.3, 1] }}
            className="flex flex-row flex-wrap items-center justify-center lg:justify-start gap-3 sm:gap-4 mb-6 sm:mb-10 w-full sm:w-auto"
          >
            <GlassButton
              variant="primary"
              size="lg"
              href="#work"
              icon={<ArrowDown className="w-4 h-4" />}
              className="flex-1 sm:flex-initial"
            >
              Explore Work
            </GlassButton>

            <GlassButton
              variant="secondary"
              size="lg"
              onClick={onOpenResume}
              icon={<Sparkles className="w-4 h-4 text-cyan-400" />}
              className="flex-1 sm:flex-initial"
            >
              View Resume
            </GlassButton>
          </motion.div>

          {/* Verified Social & Channels */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.6, delay: 0.4 }}
            className="flex items-center gap-3 sm:gap-4 text-neutral-400 mb-6 lg:mb-0"
          >
            <span className="text-[11px] uppercase tracking-widest font-mono text-neutral-500">Connect:</span>
            <a
              href={PORTFOLIO_DATA.personal.github}
              target="_blank"
              rel="noopener noreferrer"
              onClick={() => trackContactClick("github")}
              className="w-10 h-10 flex items-center justify-center rounded-full glass-2 hover:text-white hover:border-white/30 active:scale-95 transition-all"
              aria-label="GitHub Profile"
            >
              <Github className="w-4 h-4" />
            </a>
            <a
              href={PORTFOLIO_DATA.personal.linkedin}
              target="_blank"
              rel="noopener noreferrer"
              onClick={() => trackContactClick("linkedin")}
              className="w-10 h-10 flex items-center justify-center rounded-full glass-2 hover:text-white hover:border-white/30 active:scale-95 transition-all"
              aria-label="LinkedIn Profile"
            >
              <Linkedin className="w-4 h-4" />
            </a>
            <a
              href={`mailto:${PORTFOLIO_DATA.personal.email}`}
              onClick={() => trackContactClick("email")}
              className="w-10 h-10 flex items-center justify-center rounded-full glass-2 hover:text-white hover:border-white/30 active:scale-95 transition-all"
              aria-label="Send Email"
            >
              <Mail className="w-4 h-4" />
            </a>
          </motion.div>
        </div>

        {/* Right Column: 3D Liquid Neural Core */}
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.8, delay: 0.2, ease: [0.16, 1, 0.3, 1] }}
          className="lg:col-span-5 relative flex items-center justify-center w-full"
        >
          {/* Ambient rim light reflection */}
          <div className="absolute inset-0 bg-gradient-to-tr from-cyan-500/10 via-purple-500/10 to-transparent rounded-full filter blur-3xl pointer-events-none" />

          {/* Interactive 3D Canvas */}
          <LiquidNeuralCore />

          {/* Floating Liquid Glass Stat Chips (Hidden on small mobile to avoid occlusion) */}
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8, delay: 0.6 }}
            className="absolute top-2 right-2 sm:right-6 glass-2 px-3 py-1.5 rounded-2xl border border-white/12 shadow-lg hidden md:flex items-center gap-2.5 backdrop-blur-xl"
          >
            <div className="w-6 h-6 rounded-lg bg-cyan-500/20 flex items-center justify-center text-cyan-400">
              <Trophy className="w-3.5 h-3.5" />
            </div>
            <div className="text-left">
              <div className="text-[9px] font-mono text-neutral-400 uppercase tracking-wider">National Champion</div>
              <div className="text-[11px] font-semibold text-white">HackIndia 2026 (1st)</div>
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8, delay: 0.7 }}
            className="absolute bottom-2 left-2 sm:left-4 glass-2 px-3 py-1.5 rounded-2xl border border-white/12 shadow-lg hidden md:flex items-center gap-2.5 backdrop-blur-xl"
          >
            <div className="w-6 h-6 rounded-lg bg-purple-500/20 flex items-center justify-center text-purple-400">
              <Terminal className="w-3.5 h-3.5" />
            </div>
            <div className="text-left">
              <div className="text-[9px] font-mono text-neutral-400 uppercase tracking-wider">Multi-Agent AI</div>
              <div className="text-[11px] font-semibold text-white">301 Agents</div>
            </div>
          </motion.div>
        </motion.div>
      </div>

      {/* Verified Stats Row - Responsive 2-col on mobile, 4-col on desktop */}
      <motion.div
        initial={{ opacity: 0, y: 25 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, delay: 0.4 }}
        className="w-full max-w-6xl mx-auto mt-10 sm:mt-16 lg:mt-20 grid grid-cols-2 md:grid-cols-4 gap-3 sm:gap-4"
      >
        {PORTFOLIO_DATA.stats.map((stat) => (
          <div
            key={stat.label}
            className="glass-2 p-4 sm:p-5 rounded-2xl sm:rounded-3xl border border-white/8 hover:border-white/20 transition-all duration-300 group"
          >
            <div className="text-2xl sm:text-4xl font-bold font-mono tracking-tight text-white group-hover:text-cyan-300 transition-colors">
              {stat.value}
            </div>
            <div className="mt-1 text-xs sm:text-sm font-semibold text-neutral-200">
              {stat.label}
            </div>
            <div className="mt-0.5 text-[11px] sm:text-xs text-neutral-400 leading-snug">
              {stat.caption}
            </div>
          </div>
        ))}
      </motion.div>
    </section>
  );
}
