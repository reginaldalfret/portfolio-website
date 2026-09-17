"use client";

import React, { useState } from "react";
import { motion } from "framer-motion";
import { PORTFOLIO_DATA, Project } from "@/lib/portfolioData";
import { SectionHeader } from "@/components/ui/SectionHeader";
import { GlassButton } from "@/components/ui/GlassButton";
import { AgentSwarmVisualizer } from "./AgentSwarmVisualizer";
import { TorNetworkVisualizer } from "./TorNetworkVisualizer";
import { AgriGisVisualizer } from "./AgriGisVisualizer";
import { ProjectModal } from "./ProjectModal";
import { Trophy, ArrowUpRight, Sparkles } from "lucide-react";

export function ProjectsSection() {
  const [selectedProject, setSelectedProject] = useState<Project | null>(null);

  const renderVisual = (id: string) => {
    switch (id) {
      case "project-301":
        return <AgentSwarmVisualizer />;
      case "project-tor":
        return <TorNetworkVisualizer />;
      case "project-crop":
        return <AgriGisVisualizer />;
      default:
        return null;
    }
  };

  return (
    <section id="work" className="relative py-16 sm:py-24 md:py-32 px-3.5 sm:px-6 lg:px-8 max-w-7xl mx-auto overflow-hidden">
      <SectionHeader
        eyebrow="Featured Engineering"
        title="Flagship"
        highlight="AI & Systems"
        description="Major full-stack and artificial intelligence solutions with national hackathon championships and real-world adoption."
        badgeColor="cyan"
      />

      <div className="space-y-12 sm:space-y-20 md:space-y-28">
        {PORTFOLIO_DATA.projects.map((project, index) => {
          const isEven = index % 2 === 0;

          return (
            <motion.div
              key={project.id}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-60px" }}
              transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
              className="relative"
            >
              {/* Cinematic Ambient Glow Field */}
              <div
                className={`absolute -inset-2 sm:-inset-4 rounded-[32px] sm:rounded-[40px] bg-gradient-to-r ${project.theme.gradient} blur-2xl sm:blur-3xl opacity-30 pointer-events-none -z-10`}
              />

              {/* Giant Cinematic Showcase Card */}
              <div className="glass-4 rounded-[28px] sm:rounded-[36px] lg:rounded-[40px] p-5 sm:p-8 lg:p-12 border border-white/10 relative overflow-hidden shadow-[0_20px_60px_rgba(0,0,0,0.8)]">
                
                {/* Giant Ghost Watermark Number - Responsive and clipped */}
                <div className="absolute top-2 right-4 sm:top-4 sm:right-8 text-6xl xs:text-7xl sm:text-9xl md:text-[160px] font-mono font-black text-white/[0.03] select-none pointer-events-none leading-none">
                  {project.number}
                </div>

                <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 sm:gap-8 lg:gap-12 items-center relative z-10">
                  
                  {/* Content Column */}
                  <div
                    className={`lg:col-span-6 flex flex-col justify-center ${
                      isEven ? "lg:order-1" : "lg:order-2"
                    }`}
                  >
                    {/* Project Header Info */}
                    <div className="flex flex-wrap items-center gap-2 sm:gap-3 mb-3 sm:mb-4">
                      <span className="text-[11px] font-mono font-bold tracking-widest text-neutral-400">
                        CASE {project.number}
                      </span>
                      <div
                        className={`inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-[11px] sm:text-xs font-medium border ${project.theme.badgeBg}`}
                      >
                        <Trophy className="w-3.5 h-3.5 shrink-0" />
                        <span>{project.award.title}</span>
                      </div>
                    </div>

                    {/* Title */}
                    <h3 className="text-2xl xs:text-3xl sm:text-4xl lg:text-5xl font-bold tracking-tight text-white mb-1.5 sm:mb-2 leading-[1.15] break-words">
                      {project.title}
                    </h3>

                    {/* Tagline */}
                    <p className={`text-sm sm:text-base lg:text-lg font-medium mb-3 sm:mb-4 ${project.theme.textColor}`}>
                      {project.tagline}
                    </p>

                    {/* Summary */}
                    <p className="text-neutral-300 text-sm sm:text-base leading-relaxed mb-5 sm:mb-6 font-normal">
                      {project.description}
                    </p>

                    {/* Technology Chips */}
                    <div className="flex flex-wrap gap-1.5 sm:gap-2 mb-6 sm:mb-8">
                      {project.technologies.map((tech) => (
                        <span
                          key={tech}
                          className="px-2.5 sm:px-3 py-1 rounded-full text-[11px] sm:text-xs font-mono glass-2 text-neutral-300 border border-white/10"
                        >
                          {tech}
                        </span>
                      ))}
                    </div>

                    {/* Actions */}
                    <div className="flex flex-wrap items-center gap-3">
                      <GlassButton
                        variant="primary"
                        onClick={() => setSelectedProject(project)}
                        icon={<Sparkles className="w-4 h-4 text-cyan-500" />}
                        className="flex-1 sm:flex-initial"
                      >
                        View Project Details
                      </GlassButton>

                      {project.github && (
                        <GlassButton
                          variant="secondary"
                          href={project.github}
                          target="_blank"
                          icon={<ArrowUpRight className="w-4 h-4" />}
                          className="flex-1 sm:flex-initial"
                        >
                          GitHub
                        </GlassButton>
                      )}
                    </div>
                  </div>

                  {/* Interactive Visual Column */}
                  <div
                    className={`lg:col-span-6 w-full ${
                      isEven ? "lg:order-2" : "lg:order-1"
                    }`}
                  >
                    <div className="relative p-1.5 sm:p-2 rounded-2xl sm:rounded-3xl glass-3 border border-white/10 shadow-2xl overflow-hidden">
                      {renderVisual(project.id)}
                    </div>
                  </div>
                </div>
              </div>
            </motion.div>
          );
        })}
      </div>

      {/* Project Deep Dive Modal */}
      <ProjectModal
        project={selectedProject}
        onClose={() => setSelectedProject(null)}
      />
    </section>
  );
}
