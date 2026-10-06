"use client";

import React, { useState } from "react";
import { Navbar } from "@/components/layout/Navbar";
import { Hero } from "@/components/hero/Hero";
import { ProjectsSection } from "@/components/projects/ProjectsSection";
import { ExperienceSection } from "@/components/experience/ExperienceSection";
import { AchievementsSection } from "@/components/achievements/AchievementsSection";
import { OpenSourceSection } from "@/components/opensource/OpenSourceSection";
import { SkillsSection } from "@/components/skills/SkillsSection";
import { EducationSection } from "@/components/about/EducationSection";
import { ContactSection } from "@/components/contact/ContactSection";
import { Footer } from "@/components/layout/Footer";
import { ResumeModal } from "@/components/contact/ResumeModal";

export default function Home() {
  const [resumeOpen, setResumeOpen] = useState(false);

  return (
    <div className="relative min-h-[100dvh] w-full max-w-full overflow-x-hidden text-white flex flex-col justify-between selection:bg-cyan-500/20 selection:text-cyan-200">
      <Navbar onOpenResume={() => setResumeOpen(true)} />
      
      <main className="flex-1 w-full max-w-full overflow-x-hidden">
        <Hero onOpenResume={() => setResumeOpen(true)} />
        <ProjectsSection />
        <ExperienceSection />
        <AchievementsSection />
        <OpenSourceSection />
        <SkillsSection />
        <EducationSection />
        <ContactSection onOpenResume={() => setResumeOpen(true)} />
      </main>

      <Footer />

      {/* Global Resume PDF Modal */}
      <ResumeModal isOpen={resumeOpen} onClose={() => setResumeOpen(false)} />
    </div>
  );
}
