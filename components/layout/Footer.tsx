"use client";

import React from "react";
import { PORTFOLIO_DATA } from "@/lib/portfolioData";
import { Github, Linkedin, Mail, ArrowUp } from "lucide-react";
import { trackContactClick } from "@/lib/analytics";

export function Footer() {
  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  return (
    <footer className="relative pt-10 pb-[calc(2rem+env(safe-area-inset-bottom))] border-t border-white/10 glass-1 overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex flex-col md:flex-row items-center justify-between gap-5">
        
        {/* Brand & Titles */}
        <div className="flex flex-col items-center md:items-start text-center md:text-left">
          <div className="text-xs sm:text-sm font-bold font-mono tracking-wider text-white">
            {PORTFOLIO_DATA.personal.name.toUpperCase()}
          </div>
          <div className="text-[11px] sm:text-xs text-neutral-400 mt-1">
            Software Engineer <span className="text-neutral-600">|</span> Full-Stack Developer <span className="text-neutral-600">|</span> AI Engineer
          </div>
        </div>

        {/* Social Links & Back to top */}
        <div className="flex items-center gap-3 text-neutral-400">
          <a
            href={PORTFOLIO_DATA.personal.github}
            target="_blank"
            rel="noopener noreferrer"
            onClick={() => trackContactClick("github")}
            className="w-11 h-11 flex items-center justify-center rounded-full glass-2 hover:text-white transition-colors border border-white/10 active:scale-95"
            aria-label="GitHub"
          >
            <Github className="w-4 h-4" />
          </a>
          <a
            href={PORTFOLIO_DATA.personal.linkedin}
            target="_blank"
            rel="noopener noreferrer"
            onClick={() => trackContactClick("linkedin")}
            className="w-11 h-11 flex items-center justify-center rounded-full glass-2 hover:text-white transition-colors border border-white/10 active:scale-95"
            aria-label="LinkedIn"
          >
            <Linkedin className="w-4 h-4" />
          </a>
          <a
            href={`mailto:${PORTFOLIO_DATA.personal.email}`}
            onClick={() => trackContactClick("email")}
            className="w-11 h-11 flex items-center justify-center rounded-full glass-2 hover:text-white transition-colors border border-white/10 active:scale-95"
            aria-label="Email"
          >
            <Mail className="w-4 h-4" />
          </a>

          <button
            onClick={scrollToTop}
            className="w-11 h-11 flex items-center justify-center rounded-full glass-2 hover:text-white transition-colors ml-1 border border-white/10 active:scale-95 cursor-pointer"
            title="Scroll to top"
            aria-label="Scroll to top"
          >
            <ArrowUp className="w-4 h-4" />
          </button>
        </div>
      </div>

      {/* Subtle Copyright Line */}
      <div className="mt-6 text-center text-[10px] sm:text-[11px] font-mono text-neutral-500 px-4">
        © {new Date().getFullYear()} Reginald Alfret V. Designed with Liquid Glass & Ambient RGB.
      </div>
    </footer>
  );
}
