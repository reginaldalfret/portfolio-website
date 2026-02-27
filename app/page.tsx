'use client';

import { useEffect, useState } from 'react';
import Hero from '@/components/sections/Hero';
import About from '@/components/sections/About';
import Skills from '@/components/sections/Skills';
import Projects from '@/components/sections/Projects';
import Experience from '@/components/sections/Experience';
import Achievements from '@/components/sections/Achievements';
import Education from '@/components/sections/Education';
import Contact from '@/components/sections/Contact';
import Navigation from '@/components/Navigation';
import BackToTop from '@/components/BackToTop';

export default function Home() {
  const [isScrolled, setIsScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <main className="min-h-screen bg-black">
      <Navigation isScrolled={isScrolled} />
      <Hero />
      <About />
      <Skills />
      <Projects />
      <Experience />
      <Achievements />
      <Education />
      <Contact />
      <BackToTop />
    </main>
  );
}
