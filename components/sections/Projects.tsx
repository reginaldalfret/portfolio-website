'use client';

import { Github, ExternalLink } from 'lucide-react';

const projects = [
  {
    id: 1,
    title: 'TOR-UNVEIL',
    badge: '🏆 TN Police Hackathon 2025 — 1st Place',
    featured: true,
    description:
      'Full-stack dark web cybercriminal tracking tool. Real-time data visualization, suspect profile cards, and network graph UI. Adopted by Tamil Nadu Police. Beat 200+ teams.',
    tags: ['React.js', 'Tailwind CSS', 'Node.js', 'REST API'],
    github: 'https://github.com/reginaldalfret/tor-unveil',
    demo: '#projects',
  },
  {
    id: 2,
    title: 'Scam Detector',
    badge: '🥅 TN Police Hackathon 2024 — Finalist',
    featured: false,
    description:
      'React dashboard integrating ML backend to classify and flag scam content in real time. Confidence meter, live prediction scores, and report export functionality.',
    tags: ['React.js', 'Tailwind CSS', 'ML REST API'],
    github: 'https://github.com/reginaldalfret/scam-detector',
    demo: '#projects',
  },
  {
    id: 3,
    title: 'Advanced Text-to-Speech App',
    badge: '⭐ Featured Project',
    featured: false,
    description:
      'Single Page Application supporting 250+ languages and voice tones. Built with Figma-first design-to-code workflow for optimal user experience.',
    tags: ['React.js', 'Material UI', 'Web Speech API'],
    github: 'https://github.com/reginaldalfret/text-to-speech',
    demo: '#projects',
  },
];

export default function Projects() {
  return (
    <section id="projects" className="relative py-20 md:py-32 px-6 bg-black">
      <div className="max-w-6xl mx-auto">
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-bold mb-4">
            <span className="glow-cyan">Featured Projects</span>
          </h2>
          <div className="h-1 w-16 bg-gradient-to-r from-cyan-400 to-violet-600 mx-auto" />
        </div>

        <div className="grid md:grid-cols-2 gap-8 mb-8">
          {projects.map((project, idx) => (
            <div
              key={project.id}
              className={`group glass-effect glass-hover rounded-lg p-6 transition-all duration-300 ${
                project.featured ? 'md:col-span-2' : ''
              } animate-slideInUp`}
              style={{ animationDelay: `${idx * 100}ms` }}
            >
              {/* Badge */}
              <div className="inline-block px-3 py-1 rounded-full text-xs font-mono bg-gradient-to-r from-cyan-400/20 to-violet-600/20 border border-cyan-400/30 text-cyan-400 mb-4">
                {project.badge}
              </div>

              {/* Title */}
              <h3 className="text-2xl md:text-3xl font-bold text-white mb-3 group-hover:text-cyan-400 transition-colors">
                {project.title}
              </h3>

              {/* Description */}
              <p className="text-gray-400 text-base leading-relaxed mb-6">
                {project.description}
              </p>

              {/* Tags */}
              <div className="flex flex-wrap gap-2 mb-6">
                {project.tags.map((tag, i) => (
                  <span
                    key={i}
                    className="px-3 py-1 text-xs font-mono text-gray-400 bg-white/5 rounded border border-white/10"
                  >
                    {tag}
                  </span>
                ))}
              </div>

              {/* Links */}
              <div className="flex gap-4">
                <a
                  href={project.github}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-2 px-4 py-2 bg-cyan-400/10 border border-cyan-400/30 text-cyan-400 rounded hover:bg-cyan-400/20 transition-all duration-300"
                >
                  <Github size={18} />
                  <span className="text-sm font-medium">GitHub</span>
                </a>
                <a
                  href={project.demo}
                  className="inline-flex items-center gap-2 px-4 py-2 bg-violet-600/10 border border-violet-600/30 text-violet-400 rounded hover:bg-violet-600/20 transition-all duration-300"
                >
                  <ExternalLink size={18} />
                  <span className="text-sm font-medium">Live Demo</span>
                </a>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
