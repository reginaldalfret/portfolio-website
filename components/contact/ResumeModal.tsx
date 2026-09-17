"use client";

import React, { useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { X, Download, ExternalLink, FileText } from "lucide-react";
import { GlassButton } from "@/components/ui/GlassButton";

interface ResumeModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export function ResumeModal({ isOpen, onClose }: ResumeModalProps) {
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
    };

    if (isOpen) {
      document.body.style.overflow = "hidden";
      window.addEventListener("keydown", handleKeyDown);
    }

    return () => {
      document.body.style.overflow = "unset";
      window.removeEventListener("keydown", handleKeyDown);
    };
  }, [isOpen, onClose]);

  if (!isOpen) return null;

  return (
    <AnimatePresence>
      <div className="fixed inset-0 z-50 flex items-center justify-center p-2 sm:p-6 pt-[max(0.5rem,env(safe-area-inset-top))] pb-[max(0.5rem,env(safe-area-inset-bottom))]">
        {/* Backdrop */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          onClick={onClose}
          className="fixed inset-0 bg-black/85 backdrop-blur-2xl -z-10"
        />

        {/* Modal Box */}
        <motion.div
          initial={{ opacity: 0, scale: 0.96, y: 15 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={{ opacity: 0, scale: 0.96, y: 15 }}
          transition={{ type: "spring", duration: 0.4, bounce: 0.15 }}
          className="relative w-full max-w-5xl h-[92dvh] glass-4 rounded-2xl sm:rounded-[36px] border border-white/15 shadow-2xl flex flex-col overflow-hidden"
        >
          {/* Header Bar */}
          <div className="flex items-center justify-between px-4 sm:px-6 py-3 sm:py-4 border-b border-white/10 glass-1">
            <div className="flex items-center gap-2.5 sm:gap-3">
              <div className="w-8 h-8 rounded-xl bg-cyan-500/20 text-cyan-400 flex items-center justify-center shrink-0">
                <FileText className="w-4 h-4" />
              </div>
              <div>
                <h3 className="text-xs sm:text-base font-semibold text-white tracking-tight truncate max-w-[170px] xs:max-w-xs sm:max-w-none">
                  Reginald_Alfret_Resume.pdf
                </h3>
                <div className="text-[10px] sm:text-[11px] font-mono text-neutral-400">
                  Verified Engineering Resume
                </div>
              </div>
            </div>

            <div className="flex items-center gap-2">
              <a
                href="/Reginald_Alfret_Resume.pdf"
                download="Reginald_Alfret_Resume.pdf"
                className="hidden sm:inline-flex"
              >
                <GlassButton
                  variant="primary"
                  size="sm"
                  icon={<Download className="w-3.5 h-3.5" />}
                >
                  Download PDF
                </GlassButton>
              </a>

              <a
                href="/Reginald_Alfret_Resume.pdf"
                target="_blank"
                rel="noopener noreferrer"
                className="w-11 h-11 flex items-center justify-center rounded-full glass-2 text-neutral-300 hover:text-white transition-colors border border-white/10 active:scale-95"
                title="Open PDF in new tab"
                aria-label="Open PDF in new tab"
              >
                <ExternalLink className="w-4 h-4" />
              </a>

              <button
                onClick={onClose}
                className="w-11 h-11 flex items-center justify-center rounded-full glass-2 text-neutral-300 hover:text-white active:scale-95 transition-all cursor-pointer border border-white/10"
                aria-label="Close modal"
              >
                <X className="w-5 h-5" />
              </button>
            </div>
          </div>

          {/* Embedded PDF Viewer */}
          <div className="flex-1 w-full bg-neutral-950/60 relative overflow-hidden">
            <iframe
              src="/Reginald_Alfret_Resume.pdf#toolbar=0"
              className="w-full h-full border-none"
              title="Reginald Alfret Resume PDF Viewer"
            />
          </div>

          {/* Bottom Bar on Mobile */}
          <div className="sm:hidden px-4 py-3 border-t border-white/10 glass-1 flex items-center justify-between gap-3">
            <span className="text-[11px] text-neutral-400 font-mono">Verified Credentials</span>
            <a
              href="/Reginald_Alfret_Resume.pdf"
              download="Reginald_Alfret_Resume.pdf"
              className="flex-1 max-w-[160px]"
            >
              <GlassButton variant="primary" size="sm" className="w-full min-h-[44px]">
                Download PDF
              </GlassButton>
            </a>
          </div>
        </motion.div>
      </div>
    </AnimatePresence>
  );
}
