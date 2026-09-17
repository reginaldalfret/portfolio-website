"use client";

import React from "react";
import { motion } from "framer-motion";
import { PORTFOLIO_DATA } from "@/lib/portfolioData";
import { SectionHeader } from "@/components/ui/SectionHeader";
import { Trophy, Medal, Sparkles } from "lucide-react";

export function AchievementsSection() {
  return (
    <section id="achievements" className="relative py-16 sm:py-24 md:py-32 px-3.5 sm:px-6 lg:px-8 max-w-7xl mx-auto overflow-hidden">
      <SectionHeader
        eyebrow="Competitive Excellence"
        title="Awards &"
        highlight="Recognitions"
        description="Proven track record in national hackathons, state police cybersecurity challenges, and technical symposiums."
        badgeColor="crimson"
      />

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6">
        {PORTFOLIO_DATA.achievements.map((item, index) => {
          const isGold = item.title.includes("1st Place");

          return (
            <motion.div
              key={`${item.event}-${index}`}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-40px" }}
              transition={{ duration: 0.5, delay: index * 0.08 }}
              className="relative group touch-manipulation"
            >
              <div
                className={`h-full glass-3 rounded-2xl sm:rounded-3xl p-5 sm:p-7 border transition-all duration-300 flex flex-col justify-between ${
                  item.highlight
                    ? "border-yellow-500/20 group-hover:border-yellow-500/50 group-hover:shadow-[0_10px_30px_rgba(234,179,8,0.15)]"
                    : "border-white/10 group-hover:border-white/25"
                }`}
              >
                <div>
                  <div className="flex items-center justify-between mb-3 sm:mb-4">
                    <div
                      className={`w-9 h-9 sm:w-10 sm:h-10 rounded-2xl flex items-center justify-center transition-transform duration-300 group-hover:scale-105 ${
                        isGold
                          ? "bg-yellow-500/15 text-yellow-400 border border-yellow-500/30 shadow-[0_0_15px_rgba(234,179,8,0.2)]"
                          : "bg-purple-500/15 text-purple-400 border border-purple-500/30"
                      }`}
                    >
                      {isGold ? (
                        <Trophy className="w-4 h-4 sm:w-5 sm:h-5" />
                      ) : (
                        <Medal className="w-4 h-4 sm:w-5 sm:h-5" />
                      )}
                    </div>

                    {item.year && (
                      <span className="text-[11px] font-mono text-neutral-400 px-2.5 py-0.5 rounded-full glass-2 border border-white/8">
                        {item.year}
                      </span>
                    )}
                  </div>

                  <div className="text-[11px] font-mono uppercase tracking-wider text-neutral-400 mb-1">
                    {item.award}
                  </div>

                  <h3 className="text-lg sm:text-xl font-bold text-white tracking-tight mb-1.5 group-hover:text-yellow-200 transition-colors">
                    {item.title}
                  </h3>

                  <div className="text-xs sm:text-sm font-semibold text-neutral-300 mb-2">
                    {item.event}
                  </div>
                </div>

                {/* Project association badge */}
                {item.projectRelation && (
                  <div className="pt-3 sm:pt-4 border-t border-white/8 mt-3">
                    <div className="flex items-center gap-1.5 text-[11px] sm:text-xs text-neutral-400 font-mono">
                      <Sparkles className="w-3.5 h-3.5 text-cyan-400 shrink-0" />
                      <span className="truncate">{item.projectRelation}</span>
                    </div>
                  </div>
                )}
              </div>
            </motion.div>
          );
        })}
      </div>
    </section>
  );
}
