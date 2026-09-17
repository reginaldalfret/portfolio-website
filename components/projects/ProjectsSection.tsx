"use client";

import React, { useState } from "react";
import { motion } from "framer-motion";
import { PORTFOLIO_DATA, Project } from "@/lib/portfolioData";
import { SectionHeader } from "@/components/ui/SectionHeader";
import { GlassPanel } from "@/components/ui/GlassPanel";
import { GlassButton } from "@/components/ui/GlassButton";
import { AgentSwarmVisualizer } from "./AgentSwarmVisualizer";
import { TorNetworkVisualizer } from "./TorNetworkVisualizer";
import { AgriGisVisualizer } from "./AgriGisVisualizer";
import { ProjectModal } from "./ProjectModal";
import { Trophy, ArrowUpRight, Sparkles, ExternalLink } from "lucide-react";

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
    <section id="work" className="relative py-28 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto">
      <SectionHeader
        eyebrow="Featured Engineering"
        title="Flagship"
        highlight="AI & Systems"
        description="Major full-stack and artificial intelligence solutions with national hackathon championships and real-world adoption."
        badgeColor="cyan"
      />

      <div className="space-y-20 md:space-y-32">
        {PORTFOLIO_DATA.projects.map((project, index) => {
          const isEven = index % 2 === 0;

          return (
            <motion.div
              key={project.id}
              initial={{ opacity: 0, y: 40 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-80px" }}
              transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
              className="relative"
            >
              {/* Cinematic Ambient Glow Field tailored to project theme */}
              <div
                className={`absolute -inset-4 rounded-[40px] bg-gradient-to-r ${project.theme.gradient} blur-3xl opacity-30 pointer-events-none -z-10`}
              />

              {/* Giant Cinematic Showcase Card */}
              <div className="glass-4 rounded-[32px] sm:rounded-[40px] p-6 sm:p-10 lg:p-12 border border-white/10 relative overflow-hidden shadow-[0_20px_60px_rgba(0,0,0,0.8)]">
                
                {/* Giant Ghost Watermark Number */}
                <div className="absolute top-4 right-6 sm:right-10 text-8xl sm:text-9xl md:text-[180px] font-mono font-black text-white/[0.03] select-none pointer-events-none leading-none">
                  {project.number}
                </div>

                <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-center relative z-10">
                  
                  {/* Content Column */}
                  <div
                    className={`lg:col-span-6 flex flex-col justify-center ${
                      isEven ? "lg:order-1" : "lg:order-2"
                    }`}
                  >
                    {/* Project Header Info */}
                    <div className="flex flex-wrap items-center gap-3 mb-4">
                      <span className="text-xs font-mono font-bold tracking-widest text-neutral-400">
                        CASE {project.number}
                      </span>
                      <div
                        className={`inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-medium border ${project.theme.badgeBg}`}
                      >
                        <Trophy className="w-3.5 h-3.5 shrink-0" />
                        <span>{project.award.title}</span>
                      </div>
                    </div>

                    {/* Title */}
                    <h3 className="text-3xl sm:text-4xl lg:text-5xl font-bold tracking-tight text-white mb-2 leading-[1.1]">
                      {project.title}
                    </h3>

                    {/* Tagline */}
                    <p className={`text-base sm:text-lg font-medium mb-4 ${project.theme.textColor}`}>
                      {project.tagline}
                    </p>

                    {/* Summary */}
                    <p className="text-neutral-300 text-sm sm:text-base leading-relaxed mb-6 font-normal">
                      {project.description}
                    </p>

                    {/* Technology Chips */}
                    <div className="flex flex-wrap gap-2 mb-8">
                      {project.technologies.map((tech) => (
                        <span
                          key={tech}
                          className="px-3 py-1 rounded-full text-xs font-mono glass-2 text-neutral-300 border border-white/10"
                        >
                          {tech}
                        </span>
                      ))}
                    </div>

                    {/* Actions */}
                    <div className="flex flex-wrap items-center gap-4">
                      <GlassButton
                        variant="primary"
                        onClick={() => setSelectedProject(project)}
                        icon={<Sparkles className="w-4 h-4 text-cyan-500" />}
                      >
                        View Project Details
                      </GlassButton>

                      {project.github && (
                        <GlassButton
                          variant="secondary"
                          href={project.github}
                          target="_blank"
                          icon={<ArrowUpRight className="w-4 h-4" />}
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
                    <div className="relative p-2 rounded-3xl glass-3 border border-white/10 shadow-2xl">
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
