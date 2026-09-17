"use client";

import React, { useState } from "react";
import { motion } from "framer-motion";
import { PORTFOLIO_DATA } from "@/lib/portfolioData";
import { SectionHeader } from "@/components/ui/SectionHeader";
import { GlassPanel } from "@/components/ui/GlassPanel";
import { Code2, Layout, Server, Database, BrainCircuit, Wrench, Sparkles } from "lucide-react";

export function SkillsSection() {
  const [selectedCategory, setSelectedCategory] = useState<string>("All");

  const categoryIcons: Record<string, React.ReactNode> = {
    Languages: <Code2 className="w-4 h-4 text-cyan-400" />,
    Frontend: <Layout className="w-4 h-4 text-blue-400" />,
    "Backend & APIs": <Server className="w-4 h-4 text-purple-400" />,
    Databases: <Database className="w-4 h-4 text-emerald-400" />,
    "AI & Machine Learning": <BrainCircuit className="w-4 h-4 text-pink-400" />,
    "Tools & Infrastructure": <Wrench className="w-4 h-4 text-yellow-400" />,
  };

  const categories = ["All", ...PORTFOLIO_DATA.skillCategories.map((c) => c.category)];

  const filteredCategories =
    selectedCategory === "All"
      ? PORTFOLIO_DATA.skillCategories
      : PORTFOLIO_DATA.skillCategories.filter((c) => c.category === selectedCategory);

  return (
    <section id="skills" className="relative py-28 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto">
      <SectionHeader
        eyebrow="Technical Stack"
        title="Engineering"
        highlight="Capabilities"
        description="Comprehensive technical proficiencies in AI systems, full-stack web frameworks, scalable databases, and modern tooling."
        badgeColor="cyan"
      />

      {/* Category Filter Pills */}
      <div className="flex flex-wrap items-center justify-center gap-2 mb-12">
        {categories.map((cat) => (
          <button
            key={cat}
            onClick={() => setSelectedCategory(cat)}
            className={`px-4 py-2 rounded-full text-xs font-medium tracking-wide transition-all duration-200 cursor-pointer ${
              selectedCategory === cat
                ? "bg-white text-black font-semibold shadow-[0_0_20px_rgba(255,255,255,0.3)]"
                : "glass-2 text-neutral-300 hover:text-white hover:bg-white/8"
            }`}
          >
            {cat}
          </button>
        ))}
      </div>

      {/* Categorized Constellations */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {filteredCategories.map((catGroup, idx) => (
          <motion.div
            key={catGroup.category}
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.4, delay: idx * 0.06 }}
            className="glass-3 rounded-3xl p-6 border border-white/10 hover:border-cyan-500/30 transition-all duration-300 flex flex-col justify-between"
          >
            <div>
              {/* Category Header */}
              <div className="flex items-center gap-2.5 mb-5 pb-4 border-b border-white/8">
                {categoryIcons[catGroup.category]}
                <h3 className="text-base font-semibold text-white tracking-tight">
                  {catGroup.category}
                </h3>
              </div>

              {/* Skills Clusters */}
              <div className="flex flex-wrap gap-2.5">
                {catGroup.skills.map((skill) => (
                  <motion.div
                    key={skill.name}
                    whileHover={{ scale: 1.05, y: -2 }}
                    className="group relative flex items-center gap-2 px-3 py-1.5 rounded-xl glass-2 border border-white/10 hover:border-white/30 hover:bg-white/10 transition-all cursor-default"
                  >
                    <span className="text-xs font-medium text-neutral-200 group-hover:text-white">
                      {skill.name}
                    </span>
                    {skill.tag && (
                      <span className="text-[10px] font-mono text-neutral-400 group-hover:text-cyan-300 bg-white/5 px-1.5 py-0.5 rounded">
                        {skill.tag}
                      </span>
                    )}
                  </motion.div>
                ))}
              </div>
            </div>

            <div className="mt-6 pt-3 border-t border-white/5 flex items-center justify-between text-[11px] font-mono text-neutral-500">
              <span>{catGroup.skills.length} competencies</span>
              <Sparkles className="w-3 h-3 text-cyan-400/50" />
            </div>
          </motion.div>
        ))}
      </div>
    </section>
  );
}
