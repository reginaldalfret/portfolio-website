"use client";

import React, { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { cn } from "@/lib/utils";
import { PORTFOLIO_DATA } from "@/lib/portfolioData";
import { FileText, Menu, X, ArrowUpRight } from "lucide-react";

interface NavbarProps {
  onOpenResume: () => void;
}

const navItems = [
  { label: "Work", href: "#work" },
  { label: "Experience", href: "#experience" },
  { label: "Achievements", href: "#achievements" },
  { label: "Skills", href: "#skills" },
  { label: "Education", href: "#education" },
  { label: "Contact", href: "#contact" },
];

export function Navbar({ onOpenResume }: NavbarProps) {
  const [scrolled, setScrolled] = useState(false);
  const [activeSection, setActiveSection] = useState<string>("hero");
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 30);

      // Simple section spy
      const sections = ["work", "experience", "achievements", "skills", "education", "contact"];
      const scrollPos = window.scrollY + 200;

      for (const section of sections) {
        const el = document.getElementById(section);
        if (el) {
          const top = el.offsetTop;
          const height = el.offsetHeight;
          if (scrollPos >= top && scrollPos < top + height) {
            setActiveSection(section);
            break;
          }
        }
      }
    };

    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <>
      {/* Top Floating Pill Navigation */}
      <header className="fixed top-0 inset-x-0 z-50 flex justify-center px-4 sm:px-6 pt-4 sm:pt-6 pointer-events-none">
        <nav
          className={cn(
            "pointer-events-auto flex items-center justify-between gap-2 sm:gap-6 px-4 sm:px-6 py-2.5 rounded-full transition-all duration-500",
            scrolled
              ? "glass-1 shadow-[0_12px_40px_rgba(0,0,0,0.6)] border-white/12 py-2"
              : "bg-black/20 backdrop-blur-md border border-white/8 py-2.5"
          )}
        >
          {/* Brand Logo / Name */}
          <a
            href="#"
            className="group flex items-center gap-2.5 text-sm font-semibold tracking-tight text-white hover:opacity-90 transition-opacity pr-2"
          >
            <span className="w-6 h-6 rounded-full bg-gradient-to-tr from-cyan-400 via-indigo-500 to-purple-500 flex items-center justify-center text-[10px] font-mono text-black font-bold shadow-[0_0_12px_rgba(0,242,254,0.4)]">
              R
            </span>
            <span className="hidden xs:inline text-neutral-200 group-hover:text-white transition-colors text-xs font-mono tracking-wider">
              REGINALD ALFRET
            </span>
          </a>

          {/* Desktop Navigation Links */}
          <div className="hidden md:flex items-center gap-1">
            {navItems.map((item) => {
              const isActive = activeSection === item.href.replace("#", "");
              return (
                <a
                  key={item.label}
                  href={item.href}
                  className={cn(
                    "relative px-3.5 py-1.5 rounded-full text-xs font-medium tracking-wide transition-all duration-200 select-none",
                    isActive
                      ? "text-white"
                      : "text-neutral-400 hover:text-neutral-200 hover:bg-white/5"
                  )}
                >
                  {isActive && (
                    <motion.span
                      layoutId="activePill"
                      transition={{ type: "spring", stiffness: 380, damping: 30 }}
                      className="absolute inset-0 rounded-full bg-white/10 border border-white/15 -z-10 shadow-[0_0_12px_rgba(255,255,255,0.08)]"
                    />
                  )}
                  {item.label}
                </a>
              );
            })}
          </div>

          {/* Actions: Resume Modal Button */}
          <div className="flex items-center gap-2 pl-2">
            <button
              onClick={onOpenResume}
              className="flex items-center gap-1.5 px-3 py-1.5 rounded-full text-xs font-medium tracking-wide glass-2 text-neutral-200 hover:text-white border border-white/10 hover:border-cyan-500/40 hover:shadow-[0_0_15px_rgba(0,242,254,0.2)] transition-all cursor-pointer"
            >
              <FileText className="w-3.5 h-3.5 text-cyan-400" />
              <span>Resume</span>
            </button>

            {/* Mobile Menu Toggle */}
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="md:hidden p-1.5 rounded-full text-neutral-300 hover:text-white hover:bg-white/5 transition-colors"
              aria-label="Toggle Navigation Menu"
            >
              {mobileMenuOpen ? <X className="w-4 h-4" /> : <Menu className="w-4 h-4" />}
            </button>
          </div>
        </nav>
      </header>

      {/* Mobile Drawer */}
      <AnimatePresence>
        {mobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.25 }}
            className="fixed top-20 inset-x-4 z-40 md:hidden glass-1 rounded-3xl p-5 shadow-2xl border border-white/15"
          >
            <div className="flex flex-col gap-2">
              {navItems.map((item) => (
                <a
                  key={item.label}
                  href={item.href}
                  onClick={() => setMobileMenuOpen(false)}
                  className="flex items-center justify-between px-4 py-3 rounded-xl text-sm font-medium text-neutral-200 hover:text-white hover:bg-white/5 transition-all"
                >
                  <span>{item.label}</span>
                  <ArrowUpRight className="w-3.5 h-3.5 opacity-50" />
                </a>
              ))}
              <div className="pt-2 border-t border-white/10 mt-1 flex flex-col gap-2">
                <button
                  onClick={() => {
                    setMobileMenuOpen(false);
                    onOpenResume();
                  }}
                  className="w-full py-2.5 rounded-xl bg-white text-black font-semibold text-xs text-center tracking-wide"
                >
                  View Verified Resume PDF
                </button>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
