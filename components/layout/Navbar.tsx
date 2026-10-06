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
  { label: "About", href: "/about" },
  { label: "Work", href: "/#work" },
  { label: "Experience", href: "/#experience" },
  { label: "Achievements", href: "/#achievements" },
  { label: "Open Source", href: "/#open-source" },
  { label: "Skills", href: "/#skills" },
  { label: "Education", href: "/#education" },
  { label: "Contact", href: "/#contact" },
];

export function Navbar({ onOpenResume }: NavbarProps) {
  const [scrolled, setScrolled] = useState(false);
  const [activeSection, setActiveSection] = useState<string>("hero");
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  useEffect(() => {
    if (typeof window !== "undefined" && window.location.pathname === "/about") {
      setActiveSection("about");
    }

    const handleScroll = () => {
      setScrolled(window.scrollY > 30);

      // Simple section spy
      const sections = ["work", "experience", "achievements", "open-source", "skills", "education", "contact"];
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
      <header className="fixed top-0 inset-x-0 z-50 flex justify-center px-3 sm:px-6 pt-[max(0.75rem,env(safe-area-inset-top))] pointer-events-none">
        <nav
          className={cn(
            "pointer-events-auto flex items-center justify-between gap-2 sm:gap-6 px-3.5 sm:px-6 py-2 rounded-full transition-all duration-500 w-full max-w-5xl",
            scrolled
              ? "glass-1 shadow-[0_12px_40px_rgba(0,0,0,0.6)] border-white/12 py-2"
              : "bg-black/30 backdrop-blur-md border border-white/8 py-2 sm:py-2.5"
          )}
        >
          {/* Brand Logo / Name */}
          <a
            href="/"
            className="group flex items-center gap-2.5 text-sm font-semibold tracking-tight text-white hover:opacity-90 transition-opacity min-h-[44px] pr-1"
            aria-label="Reginald Alfret Home"
          >
            <span className="w-7 h-7 rounded-full bg-gradient-to-tr from-cyan-400 via-indigo-500 to-purple-500 flex items-center justify-center text-[11px] font-mono text-black font-bold shadow-[0_0_12px_rgba(0,242,254,0.4)] shrink-0">
              R
            </span>
            <span className="text-neutral-200 group-hover:text-white transition-colors text-xs font-mono tracking-wider">
              <span className="hidden sm:inline">REGINALD ALFRET</span>
              <span className="sm:hidden font-bold">REGINALD</span>
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
                    "relative px-3.5 py-1.5 rounded-full text-xs font-medium tracking-wide transition-all duration-200 select-none min-h-[36px] flex items-center",
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

          {/* Actions: Resume Modal Button & Mobile Hamburger */}
          <div className="flex items-center gap-2">
            <button
              onClick={onOpenResume}
              className="flex items-center gap-1.5 px-3 py-1.5 rounded-full text-xs font-medium tracking-wide glass-2 text-neutral-200 hover:text-white border border-white/10 hover:border-cyan-500/40 hover:shadow-[0_0_15px_rgba(0,242,254,0.2)] transition-all cursor-pointer min-h-[36px]"
            >
              <FileText className="w-3.5 h-3.5 text-cyan-400" />
              <span>Resume</span>
            </button>

            {/* Mobile Menu Toggle (44px tap target) */}
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="md:hidden w-11 h-11 flex items-center justify-center rounded-full glass-2 text-neutral-200 hover:text-white active:scale-95 transition-all cursor-pointer border border-white/10"
              aria-label="Toggle Navigation Menu"
            >
              {mobileMenuOpen ? <X className="w-5 h-5 text-cyan-400" /> : <Menu className="w-5 h-5" />}
            </button>
          </div>
        </nav>
      </header>

      {/* Mobile Drawer Backdrop & Floating Sheet */}
      <AnimatePresence>
        {mobileMenuOpen && (
          <>
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setMobileMenuOpen(false)}
              className="fixed inset-0 bg-black/60 backdrop-blur-md z-40 md:hidden"
              aria-hidden="true"
            />
            <motion.div
              initial={{ opacity: 0, y: -15, scale: 0.98 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              exit={{ opacity: 0, y: -15, scale: 0.98 }}
              transition={{ duration: 0.2, ease: [0.16, 1, 0.3, 1] }}
              className="fixed top-[calc(4.25rem+env(safe-area-inset-top))] inset-x-3 z-50 md:hidden glass-1 rounded-3xl p-5 shadow-[0_20px_50px_rgba(0,0,0,0.8)] border border-white/15 overflow-hidden"
            >
              {/* Subtle top edge glow */}
              <div className="absolute top-0 inset-x-0 h-0.5 bg-gradient-to-r from-cyan-500/40 via-purple-500/40 to-transparent" />

              <div className="flex flex-col gap-1">
                {navItems.map((item) => {
                  const isActive = activeSection === item.href.replace("#", "");
                  return (
                    <a
                      key={item.label}
                      href={item.href}
                      onClick={() => setMobileMenuOpen(false)}
                      className={cn(
                        "flex items-center justify-between px-4 py-3.5 rounded-2xl text-sm font-medium transition-all min-h-[48px] touch-manipulation",
                        isActive
                          ? "bg-white/10 text-white font-semibold border border-white/15 shadow-sm"
                          : "text-neutral-300 hover:text-white hover:bg-white/5 active:bg-white/10"
                      )}
                    >
                      <span className="tracking-wide">{item.label}</span>
                      <ArrowUpRight className="w-4 h-4 opacity-40" />
                    </a>
                  );
                })}
                <div className="pt-3 border-t border-white/10 mt-2 flex flex-col gap-2">
                  <button
                    onClick={() => {
                      setMobileMenuOpen(false);
                      onOpenResume();
                    }}
                    className="w-full min-h-[48px] py-3 rounded-2xl bg-white text-black font-semibold text-xs text-center tracking-wider uppercase active:scale-98 transition-transform touch-manipulation shadow-lg shadow-white/10"
                  >
                    View Verified Resume PDF
                  </button>
                </div>
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </>
  );
}
