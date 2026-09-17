"use client";

import React, { useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Project } from "@/lib/portfolioData";
import { X, Trophy, Github, CheckCircle2, ArrowUpRight } from "lucide-react";
import { GlassButton } from "@/components/ui/GlassButton";

interface ProjectModalProps {
  project: Project | null;
  onClose: () => void;
}

export function ProjectModal({ project, onClose }: ProjectModalProps) {
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
    };

    if (project) {
      document.body.style.overflow = "hidden";
      window.addEventListener("keydown", handleKeyDown);
    }

    return () => {
      document.body.style.overflow = "unset";
      window.removeEventListener("keydown", handleKeyDown);
    };
  }, [project, onClose]);

  if (!project) return null;

  return (
    <AnimatePresence>
      <div className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6 overflow-y-auto">
        {/* Backdrop */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          onClick={onClose}
          className="fixed inset-0 bg-black/80 backdrop-blur-xl -z-10"
        />

        {/* Modal Window */}
        <motion.div
          initial={{ opacity: 0, scale: 0.95, y: 20 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={{ opacity: 0, scale: 0.95, y: 20 }}
          transition={{ type: "spring", duration: 0.5, bounce: 0.2 }}
          className="relative w-full max-w-3xl glass-4 rounded-3xl p-6 sm:p-8 border border-white/15 shadow-2xl my-8 overflow-hidden text-left"
        >
          {/* Specular Edge */}
          <div className="absolute top-0 inset-x-0 h-px bg-gradient-to-r from-transparent via-white/30 to-transparent" />

          {/* Close Button */}
          <button
            onClick={onClose}
            className="absolute top-5 right-5 p-2 rounded-full glass-2 text-neutral-400 hover:text-white hover:border-white/20 transition-all cursor-pointer z-10"
            aria-label="Close details"
          >
            <X className="w-5 h-5" />
          </button>

          {/* Header */}
          <div className="flex items-center gap-3 mb-4">
            <span className="text-xs font-mono font-bold tracking-widest text-neutral-400">
              PROJECT {project.number}
            </span>
            <div className={`inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-medium border ${project.theme.badgeBg}`}>
              <Trophy className="w-3.5 h-3.5" />
              <span>{project.award.title}</span>
            </div>
          </div>

          <h3 className="text-2xl sm:text-3xl font-bold text-white tracking-tight">
            {project.title}
          </h3>
          <p className="text-sm sm:text-base font-medium text-neutral-300 mt-1 mb-4">
            {project.tagline}
          </p>

          <p className="text-neutral-400 leading-relaxed text-sm sm:text-base mb-6">
            {project.description}
          </p>

          {/* Award Context */}
          <div className="glass-2 p-4 rounded-2xl border border-white/10 mb-6 flex items-start gap-3">
            <Trophy className="w-5 h-5 text-yellow-400 shrink-0 mt-0.5" />
            <div>
              <div className="text-xs font-mono uppercase tracking-wider text-neutral-400">Achievement Context</div>
              <div className="text-sm font-semibold text-neutral-200 mt-0.5">{project.award.context}</div>
            </div>
          </div>

          {/* Key Engineering Details */}
          <div className="mb-6">
            <h4 className="text-xs font-mono uppercase tracking-wider text-neutral-400 mb-3">
              Engineering Architecture & Achievements
            </h4>
            <div className="space-y-2.5">
              {project.points.map((point, idx) => (
                <div key={idx} className="flex items-start gap-3 text-sm text-neutral-300">
                  <CheckCircle2 className="w-4 h-4 text-cyan-400 shrink-0 mt-0.5" />
                  <span>{point}</span>
                </div>
              ))}
            </div>
          </div>

          {/* Technologies */}
          <div className="mb-8">
            <h4 className="text-xs font-mono uppercase tracking-wider text-neutral-400 mb-3">
              Technologies & Frameworks
            </h4>
            <div className="flex flex-wrap gap-2">
              {project.technologies.map((tech) => (
                <span
                  key={tech}
                  className="px-3 py-1 rounded-full text-xs font-mono glass-2 text-neutral-300 border border-white/10"
                >
                  {tech}
                </span>
              ))}
            </div>
          </div>

          {/* Actions */}
          <div className="flex flex-wrap items-center justify-between gap-4 pt-4 border-t border-white/10">
            {project.github && (
              <GlassButton
                variant="primary"
                href={project.github}
                target="_blank"
                icon={<ArrowUpRight className="w-4 h-4" />}
              >
                View Repository on GitHub
              </GlassButton>
            )}
            <button
              onClick={onClose}
              className="text-xs font-medium text-neutral-400 hover:text-white transition-colors ml-auto"
            >
              Dismiss
            </button>
          </div>
        </motion.div>
      </div>
    </AnimatePresence>
  );
}
