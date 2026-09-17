"use client";

import React, { useState } from "react";
import { motion } from "framer-motion";
import { PORTFOLIO_DATA } from "@/lib/portfolioData";
import { SectionHeader } from "@/components/ui/SectionHeader";
import { GlassButton } from "@/components/ui/GlassButton";
import {
  Mail,
  Phone,
  MapPin,
  Github,
  Linkedin,
  Copy,
  Check,
  FileText,
  Download,
  ArrowUpRight,
  Sparkles,
} from "lucide-react";

interface ContactSectionProps {
  onOpenResume: () => void;
}

export function ContactSection({ onOpenResume }: ContactSectionProps) {
  const [copiedEmail, setCopiedEmail] = useState(false);
  const [copiedPhone, setCopiedPhone] = useState(false);

  const copyToClipboard = (text: string, type: "email" | "phone") => {
    navigator.clipboard.writeText(text);
    if (type === "email") {
      setCopiedEmail(true);
      setTimeout(() => setCopiedEmail(false), 2000);
    } else {
      setCopiedPhone(true);
      setTimeout(() => setCopiedPhone(false), 2000);
    }
  };

  return (
    <section id="contact" className="relative py-16 sm:py-24 md:py-32 px-3.5 sm:px-6 lg:px-8 max-w-6xl mx-auto overflow-hidden">
      
      {/* Large Resume Banner: "Everything in one place." */}
      <motion.div
        initial={{ opacity: 0, y: 25 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.6 }}
        className="mb-16 sm:mb-24 relative"
      >
        <div className="absolute -inset-1 bg-gradient-to-r from-cyan-500/20 via-purple-500/20 to-emerald-500/20 rounded-[32px] sm:rounded-[36px] blur-xl sm:blur-2xl opacity-40 pointer-events-none" />
        
        <div className="glass-4 rounded-2xl sm:rounded-[36px] p-6 sm:p-12 border border-white/12 text-center relative overflow-hidden">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full text-[11px] sm:text-xs font-mono uppercase tracking-widest glass-2 text-cyan-300 border-cyan-500/30 mb-3 sm:mb-4">
            <Sparkles className="w-3.5 h-3.5 text-cyan-400" />
            <span>Comprehensive Dossier</span>
          </div>

          <h3 className="text-2xl xs:text-3xl sm:text-4xl md:text-5xl font-bold tracking-tight text-white mb-2 sm:mb-3">
            Everything in one place.
          </h3>

          <p className="text-neutral-300 text-xs sm:text-base max-w-xl mx-auto mb-6 sm:mb-8">
            Access the complete verified career document including technical competencies, university transcript milestones, and project deployments.
          </p>

          <div className="flex flex-wrap items-center justify-center gap-3 sm:gap-4">
            <GlassButton
              variant="primary"
              size="lg"
              onClick={onOpenResume}
              icon={<FileText className="w-4 h-4 text-cyan-500" />}
              className="w-full sm:w-auto"
            >
              View Resume
            </GlassButton>

            <a
              href="/Reginald_Alfret_Resume.pdf"
              download="Reginald_Alfret_Resume.pdf"
              className="w-full sm:w-auto"
            >
              <GlassButton
                variant="secondary"
                size="lg"
                icon={<Download className="w-4 h-4" />}
                className="w-full sm:w-auto"
              >
                Download PDF
              </GlassButton>
            </a>
          </div>
        </div>
      </motion.div>

      {/* Main Contact Section */}
      <SectionHeader
        eyebrow="Direct Collaboration"
        title="Let's build something"
        highlight="meaningful."
        description="Open to conversations around software engineering, AI systems, product development, and transformative technology."
        badgeColor="cyan"
      />

      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 sm:gap-6 max-w-4xl mx-auto">
        
        {/* Email Card */}
        <motion.div
          whileHover={{ y: -3 }}
          className="glass-3 rounded-2xl sm:rounded-3xl p-5 sm:p-6 border border-white/10 flex flex-col justify-between"
        >
          <div>
            <div className="w-10 h-10 rounded-2xl bg-cyan-500/15 border border-cyan-500/30 flex items-center justify-center text-cyan-400 mb-3.5">
              <Mail className="w-5 h-5" />
            </div>
            <div className="text-[11px] font-mono uppercase tracking-wider text-neutral-400 mb-1">
              Email
            </div>
            <div className="text-xs sm:text-sm font-semibold text-white truncate mb-2">
              {PORTFOLIO_DATA.personal.email}
            </div>
          </div>

          <div className="flex items-center gap-2 pt-3.5 border-t border-white/8">
            <a
              href={`mailto:${PORTFOLIO_DATA.personal.email}`}
              className="min-h-[44px] text-xs font-semibold text-cyan-300 hover:text-cyan-200 flex items-center gap-1 transition-colors touch-manipulation"
            >
              <span>Compose</span>
              <ArrowUpRight className="w-3.5 h-3.5" />
            </a>
            <button
              onClick={() => copyToClipboard(PORTFOLIO_DATA.personal.email, "email")}
              className="ml-auto w-11 h-11 flex items-center justify-center rounded-xl glass-2 text-neutral-300 hover:text-white transition-colors cursor-pointer border border-white/10 active:scale-95"
              title="Copy Email"
              aria-label="Copy Email"
            >
              {copiedEmail ? <Check className="w-4 h-4 text-emerald-400" /> : <Copy className="w-4 h-4" />}
            </button>
          </div>
        </motion.div>

        {/* Phone Card */}
        <motion.div
          whileHover={{ y: -3 }}
          className="glass-3 rounded-2xl sm:rounded-3xl p-5 sm:p-6 border border-white/10 flex flex-col justify-between"
        >
          <div>
            <div className="w-10 h-10 rounded-2xl bg-purple-500/15 border border-purple-500/30 flex items-center justify-center text-purple-400 mb-3.5">
              <Phone className="w-5 h-5" />
            </div>
            <div className="text-[11px] font-mono uppercase tracking-wider text-neutral-400 mb-1">
              Phone
            </div>
            <div className="text-xs sm:text-sm font-semibold text-white mb-2">
              {PORTFOLIO_DATA.personal.phone}
            </div>
          </div>

          <div className="flex items-center gap-2 pt-3.5 border-t border-white/8">
            <a
              href={`tel:${PORTFOLIO_DATA.personal.phone.replace(/\s+/g, "")}`}
              className="min-h-[44px] text-xs font-semibold text-purple-300 hover:text-purple-200 flex items-center gap-1 transition-colors touch-manipulation"
            >
              <span>Call</span>
              <ArrowUpRight className="w-3.5 h-3.5" />
            </a>
            <button
              onClick={() => copyToClipboard(PORTFOLIO_DATA.personal.phone, "phone")}
              className="ml-auto w-11 h-11 flex items-center justify-center rounded-xl glass-2 text-neutral-300 hover:text-white transition-colors cursor-pointer border border-white/10 active:scale-95"
              title="Copy Phone"
              aria-label="Copy Phone"
            >
              {copiedPhone ? <Check className="w-4 h-4 text-emerald-400" /> : <Copy className="w-4 h-4" />}
            </button>
          </div>
        </motion.div>

        {/* Location & Social Card */}
        <motion.div
          whileHover={{ y: -3 }}
          className="glass-3 rounded-2xl sm:rounded-3xl p-5 sm:p-6 border border-white/10 flex flex-col justify-between"
        >
          <div>
            <div className="w-10 h-10 rounded-2xl bg-emerald-500/15 border border-emerald-500/30 flex items-center justify-center text-emerald-400 mb-3.5">
              <MapPin className="w-5 h-5" />
            </div>
            <div className="text-[11px] font-mono uppercase tracking-wider text-neutral-400 mb-1">
              Location
            </div>
            <div className="text-xs sm:text-sm font-semibold text-white mb-2">
              {PORTFOLIO_DATA.personal.location}
            </div>
          </div>

          <div className="flex items-center gap-2 pt-3.5 border-t border-white/8">
            <a
              href={PORTFOLIO_DATA.personal.github}
              target="_blank"
              rel="noopener noreferrer"
              className="w-11 h-11 flex items-center justify-center rounded-xl glass-2 text-neutral-300 hover:text-white transition-colors border border-white/10 active:scale-95"
              aria-label="GitHub Profile"
            >
              <Github className="w-4 h-4" />
            </a>
            <a
              href={PORTFOLIO_DATA.personal.linkedin}
              target="_blank"
              rel="noopener noreferrer"
              className="w-11 h-11 flex items-center justify-center rounded-xl glass-2 text-neutral-300 hover:text-white transition-colors border border-white/10 active:scale-95"
              aria-label="LinkedIn Profile"
            >
              <Linkedin className="w-4 h-4" />
            </a>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
