"use client";

import React, { useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { X, Download, ExternalLink, FileText, CheckCircle2 } from "lucide-react";
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
      <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-6">
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
          initial={{ opacity: 0, scale: 0.95, y: 20 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={{ opacity: 0, scale: 0.95, y: 20 }}
          transition={{ type: "spring", duration: 0.5, bounce: 0.2 }}
          className="relative w-full max-w-5xl h-[90vh] glass-4 rounded-3xl sm:rounded-[36px] border border-white/15 shadow-2xl flex flex-col overflow-hidden"
        >
          {/* Header Bar */}
          <div className="flex items-center justify-between px-6 py-4 border-b border-white/10 glass-1">
            <div className="flex items-center gap-3">
              <div className="w-8 h-8 rounded-xl bg-cyan-500/20 text-cyan-400 flex items-center justify-center">
                <FileText className="w-4 h-4" />
              </div>
              <div>
                <h3 className="text-sm sm:text-base font-semibold text-white tracking-tight">
                  Reginald_Alfret_Resume.pdf
                </h3>
                <div className="text-[11px] font-mono text-neutral-400">
                  Official Verified Engineering Resume
                </div>
              </div>
            </div>

            <div className="flex items-center gap-3">
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
                className="p-2 rounded-full glass-2 text-neutral-400 hover:text-white transition-colors"
                title="Open in new tab"
              >
                <ExternalLink className="w-4 h-4" />
              </a>

              <button
                onClick={onClose}
                className="p-2 rounded-full glass-2 text-neutral-400 hover:text-white transition-colors cursor-pointer"
                aria-label="Close modal"
              >
                <X className="w-4 h-4" />
              </button>
            </div>
          </div>

          {/* Embedded PDF Viewer */}
          <div className="flex-1 w-full bg-neutral-950/60 relative">
            <iframe
              src="/Reginald_Alfret_Resume.pdf#toolbar=0"
              className="w-full h-full border-none"
              title="Reginald Alfret Resume"
            />
          </div>

          {/* Bottom Bar on Mobile */}
          <div className="sm:hidden px-4 py-3 border-t border-white/10 glass-1 flex items-center justify-between">
            <span className="text-xs text-neutral-400">Verified Credentials</span>
            <a
              href="/Reginald_Alfret_Resume.pdf"
              download="Reginald_Alfret_Resume.pdf"
            >
              <GlassButton variant="primary" size="sm">
                Download PDF
              </GlassButton>
            </a>
          </div>
        </motion.div>
      </div>
    </AnimatePresence>
  );
}
