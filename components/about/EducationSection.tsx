"use client";

import React from "react";
import { motion } from "framer-motion";
import { PORTFOLIO_DATA } from "@/lib/portfolioData";
import { SectionHeader } from "@/components/ui/SectionHeader";
import { GlassPanel } from "@/components/ui/GlassPanel";
import { GraduationCap, Award, Globe2, Compass, CheckCircle2, BookOpen } from "lucide-react";

export function EducationSection() {
  const { education, certifications, personal } = PORTFOLIO_DATA;

  return (
    <section id="education" className="relative py-28 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto">
      <SectionHeader
        eyebrow="Academic & Credentials"
        title="Education &"
        highlight="Certifications"
        description="Formal training in Artificial Intelligence & Data Science complemented by industry-standard credentials."
        badgeColor="emerald"
      />

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
        
        {/* Left Column: Education Showcase */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="lg:col-span-7 glass-4 rounded-[32px] p-6 sm:p-8 lg:p-10 border border-white/10 relative overflow-hidden"
        >
          {/* Header */}
          <div className="flex items-center gap-4 mb-6">
            <div className="w-12 h-12 rounded-2xl bg-emerald-500/15 border border-emerald-500/30 flex items-center justify-center text-emerald-400 shadow-[0_0_20px_rgba(16,185,129,0.2)]">
              <GraduationCap className="w-6 h-6" />
            </div>
            <div>
              <div className="text-xs font-mono uppercase tracking-wider text-emerald-400">
                Undergraduate Degree
              </div>
              <h3 className="text-2xl font-bold text-white tracking-tight">
                {education.degree}
              </h3>
            </div>
          </div>

          <div className="space-y-3 mb-6">
            <div className="text-lg font-semibold text-neutral-200">
              {education.institution}
            </div>
            <div className="flex flex-wrap items-center gap-3 text-xs font-mono text-neutral-400">
              <span className="glass-2 px-3 py-1 rounded-full border border-white/10">{education.location}</span>
              <span className="glass-2 px-3 py-1 rounded-full border border-white/10">{education.period}</span>
              <span className="glass-2 px-3 py-1 rounded-full border border-emerald-500/30 text-emerald-300 font-bold">
                CGPA: {education.cgpa}
              </span>
              <span className="glass-2 px-3 py-1 rounded-full border border-white/10 text-neutral-300">
                {education.arrears}
              </span>
            </div>
          </div>

          <div className="pt-6 border-t border-white/10 space-y-3">
            {education.highlights.map((item, idx) => (
              <div key={idx} className="flex items-start gap-3 text-sm text-neutral-300">
                <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0 mt-0.5" />
                <span>{item}</span>
              </div>
            ))}
          </div>

          {/* Languages & Core Traits */}
          <div className="mt-8 pt-6 border-t border-white/10 grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div className="glass-2 p-4 rounded-2xl border border-white/8">
              <div className="flex items-center gap-2 text-xs font-mono uppercase tracking-wider text-neutral-400 mb-2">
                <Globe2 className="w-3.5 h-3.5 text-cyan-400" />
                <span>Spoken Languages</span>
              </div>
              <div className="flex flex-wrap gap-1.5">
                {personal.languages.map((lang) => (
                  <span key={lang} className="text-xs font-medium text-white px-2.5 py-0.5 rounded-full bg-white/5 border border-white/8">
                    {lang}
                  </span>
                ))}
              </div>
            </div>

            <div className="glass-2 p-4 rounded-2xl border border-white/8">
              <div className="flex items-center gap-2 text-xs font-mono uppercase tracking-wider text-neutral-400 mb-2">
                <Compass className="w-3.5 h-3.5 text-purple-400" />
                <span>Key Focus Areas</span>
              </div>
              <div className="flex flex-wrap gap-1.5">
                {personal.interests.map((interest) => (
                  <span key={interest} className="text-xs font-medium text-white px-2.5 py-0.5 rounded-full bg-white/5 border border-white/8">
                    {interest}
                  </span>
                ))}
              </div>
            </div>
          </div>
        </motion.div>

        {/* Right Column: Verified Certifications */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.15 }}
          className="lg:col-span-5 flex flex-col justify-between space-y-4"
        >
          <div className="glass-3 rounded-[32px] p-6 sm:p-8 border border-white/10 h-full flex flex-col justify-between">
            <div>
              <div className="flex items-center gap-3 mb-6 pb-4 border-b border-white/8">
                <Award className="w-5 h-5 text-yellow-400" />
                <h3 className="text-lg font-bold text-white tracking-tight">
                  Industry Certifications
                </h3>
              </div>

              <div className="space-y-3.5">
                {certifications.map((cert) => (
                  <div
                    key={cert.name}
                    className="p-4 rounded-2xl glass-2 border border-white/8 hover:border-white/20 transition-all group"
                  >
                    <div className="flex items-center justify-between">
                      <h4 className="text-sm font-semibold text-white group-hover:text-cyan-300 transition-colors">
                        {cert.name}
                      </h4>
                      <span className="text-[10px] font-mono text-neutral-400 px-2 py-0.5 rounded glass-1 border border-white/8">
                        {cert.platform}
                      </span>
                    </div>
                    <div className="text-xs text-neutral-400 mt-1">
                      Issuer: <span className="text-neutral-300">{cert.issuer}</span>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Soft Skills footer chip list */}
            <div className="mt-6 pt-6 border-t border-white/8">
              <div className="text-xs font-mono uppercase tracking-wider text-neutral-400 mb-2">
                Engineering Leadership & Attributes
              </div>
              <div className="flex flex-wrap gap-2">
                {personal.softSkills.map((skill) => (
                  <span key={skill} className="text-xs text-neutral-300 glass-2 px-2.5 py-1 rounded-xl border border-white/8">
                    {skill}
                  </span>
                ))}
              </div>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
