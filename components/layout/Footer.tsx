"use client";

import React from "react";
import { PORTFOLIO_DATA } from "@/lib/portfolioData";
import { Github, Linkedin, Mail, ArrowUp } from "lucide-react";

export function Footer() {
  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  return (
    <footer className="relative py-12 border-t border-white/10 glass-1 overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex flex-col md:flex-row items-center justify-between gap-6">
        
        {/* Brand & Titles */}
        <div className="flex flex-col items-center md:items-start text-center md:text-left">
          <div className="text-sm font-bold font-mono tracking-wider text-white">
            {PORTFOLIO_DATA.personal.name.toUpperCase()}
          </div>
          <div className="text-xs text-neutral-400 mt-1">
            Software Engineer <span className="text-neutral-600">|</span> Full-Stack Developer <span className="text-neutral-600">|</span> AI Engineer
          </div>
        </div>

        {/* Social Links */}
        <div className="flex items-center gap-4 text-neutral-400">
          <a
            href={PORTFOLIO_DATA.personal.github}
            target="_blank"
            rel="noopener noreferrer"
            className="p-2 rounded-full glass-2 hover:text-white transition-colors"
            aria-label="GitHub"
          >
            <Github className="w-4 h-4" />
          </a>
          <a
            href={PORTFOLIO_DATA.personal.linkedin}
            target="_blank"
            rel="noopener noreferrer"
            className="p-2 rounded-full glass-2 hover:text-white transition-colors"
            aria-label="LinkedIn"
          >
            <Linkedin className="w-4 h-4" />
          </a>
          <a
            href={`mailto:${PORTFOLIO_DATA.personal.email}`}
            className="p-2 rounded-full glass-2 hover:text-white transition-colors"
            aria-label="Email"
          >
            <Mail className="w-4 h-4" />
          </a>

          <button
            onClick={scrollToTop}
            className="p-2 rounded-full glass-2 hover:text-white transition-colors ml-2"
            title="Scroll to top"
            aria-label="Scroll to top"
          >
            <ArrowUp className="w-4 h-4" />
          </button>
        </div>
      </div>

      {/* Subtle Copyright Line */}
      <div className="mt-8 text-center text-[11px] font-mono text-neutral-500">
        © {new Date().getFullYear()} Reginald Alfret V. Designed with Liquid Glass & Ambient RGB.
      </div>
    </footer>
  );
}
