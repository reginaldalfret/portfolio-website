"use client";

import React, { useState } from "react";
import { motion } from "framer-motion";
import { PORTFOLIO_DATA } from "@/lib/portfolioData";
import { SectionHeader } from "@/components/ui/SectionHeader";
import { Calendar, MapPin, ChevronRight } from "lucide-react";

export function ExperienceSection() {
  const [activeExpIndex, setActiveExpIndex] = useState<number>(0);

  return (
    <section id="experience" className="relative py-16 sm:py-24 md:py-32 px-3.5 sm:px-6 lg:px-8 max-w-6xl mx-auto overflow-hidden">
      <SectionHeader
        eyebrow="Career Journey"
        title="Professional"
        highlight="Experience"
        description="Engineering scalable ERP platforms, full-stack applications, and domain-specific LLM fine-tuning."
        badgeColor="purple"
      />

      <div className="relative">
        {/* Central Ambient Line on Desktop */}
        <div className="hidden md:block absolute left-8 top-8 bottom-8 w-px bg-gradient-to-b from-cyan-500/40 via-purple-500/40 to-transparent pointer-events-none" />

        <div className="space-y-6 sm:space-y-12">
          {PORTFOLIO_DATA.experience.map((exp, index) => {
            const isActive = activeExpIndex === index;

            return (
              <motion.div
                key={exp.company}
                initial={{ opacity: 0, y: 25 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-40px" }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                onClick={() => setActiveExpIndex(index)}
                className="relative md:pl-20"
              >
                {/* Timeline Node on Left (Desktop) */}
                <div className="hidden md:flex absolute left-4 top-8 -translate-x-1/2 w-8 h-8 rounded-full glass-1 border border-white/20 items-center justify-center shadow-lg transition-all duration-300">
                  <span
                    className={`w-3 h-3 rounded-full transition-all duration-300 ${
                      exp.current
                        ? "bg-cyan-400 shadow-[0_0_12px_rgba(0,242,254,0.8)] animate-pulse"
                        : "bg-purple-400"
                    }`}
                  />
                </div>

                {/* Experience Card */}
                <div
                  className={`glass-3 rounded-2xl sm:rounded-3xl p-5 sm:p-8 border transition-all duration-300 ${
                    isActive
                      ? "border-cyan-500/40 shadow-[0_15px_40px_rgba(0,0,0,0.7)] bg-white/[0.04]"
                      : "border-white/10 hover:border-white/20"
                  }`}
                >
                  <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 sm:gap-4 pb-4 sm:pb-6 border-b border-white/8">
                    <div>
                      <div className="flex flex-wrap items-center gap-2 sm:gap-3">
                        <h3 className="text-xl sm:text-2xl font-bold text-white tracking-tight">
                          {exp.role}
                        </h3>
                        {exp.current && (
                          <span className="px-2.5 py-0.5 rounded-full text-[10px] sm:text-[11px] font-mono tracking-wider font-semibold bg-cyan-500/10 border border-cyan-500/30 text-cyan-300">
                            CURRENT
                          </span>
                        )}
                      </div>
                      <div className="text-base sm:text-lg font-semibold text-neutral-300 mt-1 flex flex-wrap items-center gap-1.5 sm:gap-2">
                        <span>{exp.company}</span>
                        <span className="text-neutral-500">•</span>
                        <span className="text-xs sm:text-sm font-normal text-neutral-400">{exp.type}</span>
                      </div>
                    </div>

                    <div className="flex flex-row sm:flex-col sm:items-end gap-2 sm:gap-1.5 text-[11px] sm:text-xs font-mono text-neutral-400">
                      <div className="flex items-center gap-1.5 glass-2 px-2.5 py-1 sm:p-0 rounded-full border border-white/8 sm:border-none">
                        <Calendar className="w-3.5 h-3.5 text-cyan-400" />
                        <span>{exp.period}</span>
                      </div>
                      <div className="flex items-center gap-1.5 glass-2 px-2.5 py-1 sm:p-0 rounded-full border border-white/8 sm:border-none">
                        <MapPin className="w-3.5 h-3.5 text-purple-400" />
                        <span>{exp.location}</span>
                      </div>
                    </div>
                  </div>

                  {/* Bullet Points */}
                  <div className="mt-4 sm:mt-6 space-y-2.5 sm:space-y-3">
                    {exp.points.map((point, pIdx) => (
                      <div key={pIdx} className="flex items-start gap-2.5 text-xs sm:text-sm text-neutral-300 leading-relaxed">
                        <ChevronRight className="w-4 h-4 text-cyan-400 shrink-0 mt-0.5" />
                        <span>{point}</span>
                      </div>
                    ))}
                  </div>

                  {/* Technology Chips */}
                  <div className="mt-4 sm:mt-6 pt-4 sm:pt-6 border-t border-white/8 flex flex-wrap gap-1.5 sm:gap-2">
                    {exp.technologies.map((tech) => (
                      <span
                        key={tech}
                        className="px-2.5 py-0.5 sm:py-1 rounded-full text-[11px] sm:text-xs font-mono glass-2 text-neutral-300 border border-white/8"
                      >
                        {tech}
                      </span>
                    ))}
                  </div>
                </div>
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
