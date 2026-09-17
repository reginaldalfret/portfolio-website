"use client";

import React, { useRef, useState } from "react";
import { cn } from "@/lib/utils";
import { motion } from "framer-motion";

export interface GlassButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: "primary" | "secondary" | "glow-cyan" | "glow-purple" | "ghost";
  size?: "sm" | "md" | "lg";
  href?: string;
  target?: string;
  rel?: string;
  icon?: React.ReactNode;
  iconPosition?: "left" | "right";
  children: React.ReactNode;
}

export function GlassButton({
  variant = "secondary",
  size = "md",
  href,
  target,
  rel,
  icon,
  iconPosition = "right",
  className,
  children,
  onClick,
  ...props
}: GlassButtonProps) {
  const buttonRef = useRef<HTMLDivElement>(null);
  const [position, setPosition] = useState({ x: 0, y: 0 });

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    // Disable magnetic cursor pull on touch devices
    if (typeof window !== "undefined" && window.matchMedia("(hover: none)").matches) return;
    if (!buttonRef.current) return;
    const { left, top, width, height } = buttonRef.current.getBoundingClientRect();
    const centerX = left + width / 2;
    const centerY = top + height / 2;
    const moveX = (e.clientX - centerX) * 0.15;
    const moveY = (e.clientY - centerY) * 0.15;
    setPosition({ x: moveX, y: moveY });
  };

  const handleMouseLeave = () => {
    setPosition({ x: 0, y: 0 });
  };

  const sizeClasses = {
    sm: "min-h-[44px] px-4 py-2 text-xs font-medium tracking-wide",
    md: "min-h-[44px] px-6 py-2.5 text-sm font-medium tracking-wide",
    lg: "min-h-[48px] px-7 py-3.5 text-sm sm:text-base font-semibold tracking-wide",
  }[size];

  const variantClasses = {
    primary:
      "bg-white text-black hover:bg-white/90 active:bg-white/80 shadow-[0_0_25px_rgba(255,255,255,0.35)] border border-white",
    secondary:
      "glass-2 text-neutral-200 hover:text-white active:bg-white/10 border border-white/10 hover:border-white/25",
    "glow-cyan":
      "bg-cyan-500/10 text-cyan-300 border border-cyan-500/30 hover:bg-cyan-500/20 active:bg-cyan-500/30 hover:border-cyan-400/60 shadow-[0_0_20px_rgba(0,242,254,0.25)]",
    "glow-purple":
      "bg-purple-500/10 text-purple-300 border border-purple-500/30 hover:bg-purple-500/20 active:bg-purple-500/30 hover:border-purple-400/60 shadow-[0_0_20px_rgba(138,43,226,0.25)]",
    ghost:
      "bg-transparent text-neutral-400 hover:text-white active:bg-white/5 border border-transparent",
  }[variant];

  const content = (
    <motion.div
      ref={buttonRef}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      animate={{ x: position.x, y: position.y }}
      transition={{ type: "spring", stiffness: 350, damping: 20 }}
      whileTap={{ scale: 0.95 }}
      className={cn(
        "group relative inline-flex items-center justify-center gap-2.5 rounded-full cursor-pointer select-none whitespace-nowrap transition-all duration-300 touch-manipulation",
        sizeClasses,
        variantClasses,
        className
      )}
    >
      {/* Specular sheen effect on hover */}
      <span className="absolute inset-0 rounded-full overflow-hidden pointer-events-none">
        <span className="absolute -inset-full bg-gradient-to-r from-transparent via-white/15 to-transparent transform -skew-x-12 group-hover:translate-x-[200%] transition-transform duration-1000 ease-out" />
      </span>

      {icon && iconPosition === "left" && (
        <span className="transition-transform duration-300 group-hover:-translate-x-0.5">
          {icon}
        </span>
      )}
      <span>{children}</span>
      {icon && iconPosition === "right" && (
        <span className="transition-transform duration-300 group-hover:translate-x-0.5">
          {icon}
        </span>
      )}
    </motion.div>
  );

  if (href) {
    return (
      <a
        href={href}
        target={target}
        rel={rel || (target === "_blank" ? "noopener noreferrer" : undefined)}
        className="inline-block"
      >
        {content}
      </a>
    );
  }

  return (
    <button type="button" onClick={onClick} className="inline-block" {...props}>
      {content}
    </button>
  );
}
