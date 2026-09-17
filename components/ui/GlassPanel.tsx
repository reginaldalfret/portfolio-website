"use client";

import React, { forwardRef } from "react";
import { cn } from "@/lib/utils";
import { motion, HTMLMotionProps } from "framer-motion";

export interface GlassPanelProps extends HTMLMotionProps<"div"> {
  level?: 1 | 2 | 3 | 4;
  specular?: boolean;
  glow?: "cyan" | "purple" | "crimson" | "emerald" | "none";
  interactive?: boolean;
  className?: string;
  children?: React.ReactNode;
}

export const GlassPanel = forwardRef<HTMLDivElement, GlassPanelProps>(
  (
    {
      level = 3,
      specular = true,
      glow = "none",
      interactive = false,
      className,
      children,
      ...props
    },
    ref
  ) => {
    const levelClass = {
      1: "glass-1 rounded-full",
      2: "glass-2 rounded-2xl",
      3: "glass-3 rounded-3xl",
      4: "glass-4 rounded-[32px]",
    }[level];

    const glowClass = {
      none: "",
      cyan: "hover:shadow-glow-cyan hover:border-cyan-500/40",
      purple: "hover:shadow-glow-purple hover:border-purple-500/40",
      crimson: "hover:shadow-glow-crimson hover:border-rose-500/40",
      emerald: "hover:shadow-glow-emerald hover:border-emerald-500/40",
    }[glow];

    return (
      <motion.div
        ref={ref}
        whileHover={interactive ? { y: -3, scale: 1.006 } : undefined}
        transition={{ type: "spring", stiffness: 350, damping: 25 }}
        className={cn(
          "relative overflow-hidden transition-all duration-300",
          levelClass,
          specular && "inner-specular",
          glowClass,
          className
        )}
        {...props}
      >
        {children}
      </motion.div>
    );
  }
);

GlassPanel.displayName = "GlassPanel";
