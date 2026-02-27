'use client';

import { useEffect, useState } from 'react';
import { ChevronDown } from 'lucide-react';

const roles = [
  'Frontend Developer',
  'UI Engineer',
  'Hackathon Champion',
  'React Specialist',
];

export default function Hero() {
  const [currentRoleIndex, setCurrentRoleIndex] = useState(0);
  const [displayedText, setDisplayedText] = useState('');
  const [isDeleting, setIsDeleting] = useState(false);

  useEffect(() => {
    const currentRole = roles[currentRoleIndex];
    let timeout: NodeJS.Timeout;

    if (!isDeleting && displayedText === currentRole) {
      timeout = setTimeout(() => setIsDeleting(true), 2000);
    } else if (isDeleting && displayedText === '') {
      setIsDeleting(false);
      setCurrentRoleIndex((prev) => (prev + 1) % roles.length);
    } else {
      const nextText = isDeleting
        ? currentRole.substring(0, displayedText.length - 1)
        : currentRole.substring(0, displayedText.length + 1);

      timeout = setTimeout(() => setDisplayedText(nextText), isDeleting ? 50 : 80);
    }

    return () => clearTimeout(timeout);
  }, [displayedText, isDeleting, currentRoleIndex]);

  const scrollToNext = () => {
    const aboutSection = document.getElementById('about');
    aboutSection?.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <section className="relative min-h-screen w-full overflow-hidden pt-24 flex items-center justify-center">
      {/* Animated grid background */}
      <div className="absolute inset-0 scanlines opacity-5" />
      <div className="absolute inset-0">
        <div className="absolute inset-0 bg-gradient-to-b from-cyan-900/10 to-transparent" />
      </div>

      {/* Content */}
      <div className="relative z-10 max-w-5xl mx-auto px-6 text-center animate-fadeIn">
        <div className="mb-8">
          <div className="inline-block px-4 py-2 rounded-full glass-effect border border-cyan-400/30 text-cyan-400 text-sm font-mono mb-6">
            Welcome to my portfolio
          </div>
        </div>

        <h1 className="text-5xl md:text-7xl font-bold mb-4 leading-tight">
          <span className="glow-cyan">Reginald Alfret V</span>
        </h1>

        <div className="h-16 md:h-20 flex items-center justify-center mb-6">
          <div className="text-3xl md:text-4xl font-light">
            <span className="text-gray-300">Building interfaces that </span>
            <span className="glow-violet inline-block min-w-[300px] md:min-w-[400px]">
              {displayedText}
              <span className="animate-pulse">|</span>
            </span>
          </div>
        </div>

        <p className="text-lg text-gray-400 mb-8 max-w-2xl mx-auto leading-relaxed">
          Building interfaces that don't just look good — they win. Frontend Developer and UI Engineer specializing in React, crafting polished, responsive designs from concept to production.
        </p>

        <div className="flex flex-col sm:flex-row gap-4 justify-center mb-16">
          <button className="px-8 py-3 bg-cyan-400 text-black font-semibold rounded-lg hover:bg-cyan-300 transition-all duration-300 hover:shadow-[0_0_20px_rgba(0,245,255,0.5)]">
            View Projects
          </button>
          <button className="px-8 py-3 glass-effect border-cyan-400/50 text-cyan-400 font-semibold rounded-lg glass-hover">
            Download Resume
          </button>
        </div>

        {/* Social Links */}
        <div className="flex justify-center gap-6 mb-16">
          <a
            href="https://github.com/reginaldalfret"
            target="_blank"
            rel="noopener noreferrer"
            className="text-gray-400 hover:text-cyan-400 transition-colors duration-300"
            aria-label="GitHub"
          >
            <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24">
              <path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.6.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v 3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z" />
            </svg>
          </a>
          <a
            href="https://linkedin.com/in/reginaldalfret"
            target="_blank"
            rel="noopener noreferrer"
            className="text-gray-400 hover:text-cyan-400 transition-colors duration-300"
            aria-label="LinkedIn"
          >
            <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24">
              <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.475-2.236-1.986-2.236-1.081 0-1.722.722-2.004 1.418-.103.249-.129.597-.129.946v5.441h-3.554s.05-8.824 0-9.737h3.554v1.375c.427-.659 1.191-1.597 2.898-1.597 2.117 0 3.704 1.385 3.704 4.362v5.597zM5.337 9.432c-1.142 0-1.889-.755-1.889-1.699 0-.959.747-1.699 1.925-1.699 1.178 0 1.888.74 1.906 1.699 0 .944-.728 1.699-1.942 1.699zm1.612 11.02H3.74V9.716h3.209v10.736zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z" />
            </svg>
          </a>
          <a
            href="mailto:reginald@example.com"
            className="text-gray-400 hover:text-cyan-400 transition-colors duration-300"
            aria-label="Email"
          >
            <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24">
              <path d="M20 4H4c-1.1 0-1.99.9-1.99 2L2 18c0 1.1.9 2 2 2h16c1.1 0 2-.9 2-2V6c0-1.1-.9-2-2-2zm0 4l-8 5-8-5V6l8 5 8-5v2z" />
            </svg>
          </a>
        </div>

        {/* Scroll indicator */}
        <button
          onClick={scrollToNext}
          className="absolute bottom-8 left-1/2 transform -translate-x-1/2 animate-bounce text-cyan-400 hover:text-cyan-300 transition-colors"
          aria-label="Scroll to next section"
        >
          <ChevronDown size={32} />
        </button>
      </div>
    </section>
  );
}
