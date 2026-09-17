"use client";

import React from "react";
import { motion } from "framer-motion";
import { PORTFOLIO_DATA } from "@/lib/portfolioData";
import { GlassButton } from "@/components/ui/GlassButton";
import { LiquidNeuralCore } from "@/components/3d/LiquidNeuralCore";
import { ArrowDown, Github, Linkedin, Mail, Trophy, Sparkles, Terminal } from "lucide-react";

interface HeroProps {
  onOpenResume: () => void;
}

export function Hero({ onOpenResume }: HeroProps) {
  return (
    <section className="relative min-h-screen flex flex-col justify-center items-center pt-24 pb-16 px-4 sm:px-6 lg:px-8 overflow-hidden">
      <div className="w-full max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-8 items-center">
        
        {/* Left Column: Typography & Action */}
        <div className="lg:col-span-7 flex flex-col items-center lg:items-start text-center lg:text-left z-10">
          
          {/* Eyebrow badge */}
          <motion.div
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
            className="inline-flex items-center gap-2.5 px-4 py-1.5 rounded-full text-xs font-mono tracking-[0.2em] uppercase glass-1 mb-6 border border-white/10"
          >
            <span className="w-2 h-2 rounded-full bg-cyan-400 animate-pulse shadow-[0_0_8px_rgba(0,242,254,0.8)]" />
            <span className="text-neutral-300 font-semibold">{PORTFOLIO_DATA.personal.name}</span>
            <span className="text-neutral-500">|</span>
            <span className="text-neutral-400">Chennai, India</span>
          </motion.div>

          {/* Main Title Stack */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.1, ease: [0.16, 1, 0.3, 1] }}
            className="space-y-1 sm:space-y-2 mb-6"
          >
            <h1 className="text-4xl sm:text-6xl md:text-7xl font-bold tracking-[-0.04em] text-white leading-[1.05]">
              SOFTWARE ENGINEER
            </h1>
            <h2 className="text-3xl sm:text-5xl md:text-6xl font-semibold tracking-[-0.035em] text-neutral-300 leading-[1.05]">
              FULL-STACK DEVELOPER
            </h2>
            <h2 className="text-3xl sm:text-5xl md:text-6xl font-semibold tracking-[-0.035em] bg-gradient-to-r from-cyan-400 via-indigo-300 to-purple-400 bg-clip-text text-transparent leading-[1.05]">
              AI ENGINEER
            </h2>
          </motion.div>

          {/* Supporting statement */}
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.2, ease: [0.16, 1, 0.3, 1] }}
            className="text-lg sm:text-xl text-neutral-400 max-w-xl font-normal leading-relaxed mb-8"
          >
            {PORTFOLIO_DATA.personal.headline}
          </motion.p>

          {/* Call to Actions */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.3, ease: [0.16, 1, 0.3, 1] }}
            className="flex flex-wrap items-center justify-center lg:justify-start gap-4 mb-10"
          >
            <GlassButton
              variant="primary"
              size="lg"
              href="#work"
              icon={<ArrowDown className="w-4 h-4" />}
            >
              Explore Work
            </GlassButton>

            <GlassButton
              variant="secondary"
              size="lg"
              onClick={onOpenResume}
              icon={<Sparkles className="w-4 h-4 text-cyan-400" />}
            >
              View Resume
            </GlassButton>
          </motion.div>

          {/* Verified Social & Channels */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.8, delay: 0.4 }}
            className="flex items-center gap-4 text-neutral-400"
          >
            <span className="text-xs uppercase tracking-widest font-mono text-neutral-500">Connect:</span>
            <a
              href={PORTFOLIO_DATA.personal.github}
              target="_blank"
              rel="noopener noreferrer"
              className="p-2 rounded-full glass-2 hover:text-white hover:border-white/30 transition-colors"
              aria-label="GitHub Profile"
            >
              <Github className="w-4 h-4" />
            </a>
            <a
              href={PORTFOLIO_DATA.personal.linkedin}
              target="_blank"
              rel="noopener noreferrer"
              className="p-2 rounded-full glass-2 hover:text-white hover:border-white/30 transition-colors"
              aria-label="LinkedIn Profile"
            >
              <Linkedin className="w-4 h-4" />
            </a>
            <a
              href={`mailto:${PORTFOLIO_DATA.personal.email}`}
              className="p-2 rounded-full glass-2 hover:text-white hover:border-white/30 transition-colors"
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
          transition={{ duration: 1.0, delay: 0.2, ease: [0.16, 1, 0.3, 1] }}
          className="lg:col-span-5 relative flex items-center justify-center"
        >
          {/* Ambient rim light reflection */}
          <div className="absolute inset-0 bg-gradient-to-tr from-cyan-500/10 via-purple-500/10 to-transparent rounded-full filter blur-3xl pointer-events-none" />

          {/* Interactive 3D Canvas */}
          <LiquidNeuralCore />

          {/* Floating Liquid Glass Stat Chips */}
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8, delay: 0.6 }}
            className="absolute top-6 right-2 sm:right-6 glass-2 px-3.5 py-2 rounded-2xl border border-white/12 shadow-lg hidden sm:flex items-center gap-2.5 backdrop-blur-xl"
          >
            <div className="w-7 h-7 rounded-xl bg-cyan-500/20 flex items-center justify-center text-cyan-400">
              <Trophy className="w-4 h-4" />
            </div>
            <div className="text-left">
              <div className="text-[10px] font-mono text-neutral-400 uppercase tracking-wider">National Champion</div>
              <div className="text-xs font-semibold text-white">HackIndia 2026 (1st Place)</div>
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8, delay: 0.7 }}
            className="absolute bottom-6 left-2 sm:left-4 glass-2 px-3.5 py-2 rounded-2xl border border-white/12 shadow-lg hidden sm:flex items-center gap-2.5 backdrop-blur-xl"
          >
            <div className="w-7 h-7 rounded-xl bg-purple-500/20 flex items-center justify-center text-purple-400">
              <Terminal className="w-4 h-4" />
            </div>
            <div className="text-left">
              <div className="text-[10px] font-mono text-neutral-400 uppercase tracking-wider">Multi-Agent AI</div>
              <div className="text-xs font-semibold text-white">301 Autonomous Agents</div>
            </div>
          </motion.div>
        </motion.div>
      </div>

      {/* Verified Stats Row */}
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8, delay: 0.5 }}
        className="w-full max-w-6xl mx-auto mt-16 sm:mt-24 grid grid-cols-2 md:grid-cols-4 gap-4"
      >
        {PORTFOLIO_DATA.stats.map((stat, i) => (
          <div
            key={stat.label}
            className="glass-2 p-5 sm:p-6 rounded-3xl border border-white/8 hover:border-white/20 transition-all duration-300 group"
          >
            <div className="text-3xl sm:text-4xl font-bold font-mono tracking-tight text-white group-hover:text-cyan-300 transition-colors">
              {stat.value}
            </div>
            <div className="mt-1 text-sm font-semibold text-neutral-200">
              {stat.label}
            </div>
            <div className="mt-1 text-xs text-neutral-400 leading-snug">
              {stat.caption}
            </div>
          </div>
        ))}
      </motion.div>
    </section>
  );
}
