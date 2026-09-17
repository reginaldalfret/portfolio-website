"use client";

import React from "react";
import { cn } from "@/lib/utils";
import { motion } from "framer-motion";

interface SectionHeaderProps {
  eyebrow?: string;
  title: string;
  highlight?: string;
  description?: string;
  align?: "left" | "center";
  className?: string;
  badgeColor?: "cyan" | "purple" | "crimson" | "emerald" | "default";
}

export function SectionHeader({
  eyebrow,
  title,
  highlight,
  description,
  align = "center",
  className,
  badgeColor = "default",
}: SectionHeaderProps) {
  const badgeClasses = {
    default: "text-neutral-400 border-white/10 bg-white/5",
    cyan: "text-cyan-300 border-cyan-500/30 bg-cyan-500/10",
    purple: "text-purple-300 border-purple-500/30 bg-purple-500/10",
    crimson: "text-rose-300 border-rose-500/30 bg-rose-500/10",
    emerald: "text-emerald-300 border-emerald-500/30 bg-emerald-500/10",
  }[badgeColor];

  return (
    <div
      className={cn(
        "relative mb-8 sm:mb-14 md:mb-20 max-w-3xl px-2 sm:px-0",
        align === "center" ? "mx-auto text-center" : "text-left",
        className
      )}
    >
      {eyebrow && (
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-60px" }}
          transition={{ duration: 0.5 }}
          className="inline-flex items-center gap-2 px-3 sm:px-3.5 py-1 rounded-full text-[10px] sm:text-[11px] font-mono uppercase tracking-[0.15em] sm:tracking-[0.2em] mb-3 sm:mb-4 border glass-1 backdrop-blur-md"
        >
          <span className={cn("w-1.5 h-1.5 rounded-full animate-pulse", {
            "bg-neutral-400": badgeColor === "default",
            "bg-cyan-400": badgeColor === "cyan",
            "bg-purple-400": badgeColor === "purple",
            "bg-rose-400": badgeColor === "crimson",
            "bg-emerald-400": badgeColor === "emerald",
          })} />
          <span className={badgeClasses}>{eyebrow}</span>
        </motion.div>
      )}

      <motion.h2
        initial={{ opacity: 0, y: 15 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: "-60px" }}
        transition={{ duration: 0.5, delay: 0.1 }}
        className="text-2xl xs:text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-semibold tracking-[-0.03em] text-white leading-[1.15] break-words"
      >
        {title}{" "}
        {highlight && (
          <span className="bg-gradient-to-r from-neutral-100 via-neutral-300 to-neutral-500 bg-clip-text text-transparent">
            {highlight}
          </span>
        )}
      </motion.h2>

      {description && (
        <motion.p
          initial={{ opacity: 0, y: 15 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-60px" }}
          transition={{ duration: 0.5, delay: 0.2 }}
          className="mt-2.5 sm:mt-4 text-xs sm:text-base lg:text-lg text-neutral-300 sm:text-neutral-400 leading-relaxed font-normal max-w-2xl mx-auto"
        >
          {description}
        </motion.p>
      )}
    </div>
  );
}
