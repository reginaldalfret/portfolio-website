'use client';

const experiences = [
  {
    id: 1,
    role: 'Data Scientist Intern',
    company: 'Data Patterns',
    location: 'Chennai',
    period: 'May - Jun 2025',
    highlights: [
      'Built web scraping pipelines for data extraction',
      'Trained Small Language Models on custom datasets',
      'Developed React dashboard for model outputs visualization',
      'Optimized data processing workflows',
    ],
  },
];

export default function Experience() {
  return (
    <section id="experience" className="relative py-20 md:py-32 px-6 bg-gradient-to-b from-black to-black/80">
      <div className="max-w-6xl mx-auto">
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-bold mb-4">
            <span className="glow-cyan">Experience</span>
          </h2>
          <div className="h-1 w-16 bg-gradient-to-r from-cyan-400 to-violet-600 mx-auto" />
        </div>

        <div className="space-y-8 animate-slideInUp">
          {experiences.map((exp, idx) => (
            <div
              key={exp.id}
              className="relative glass-effect glass-hover rounded-lg p-8 transition-all duration-300 pl-8 md:pl-8"
            >
              {/* Timeline dot */}
              <div className="absolute left-0 top-8 w-4 h-4 bg-cyan-400 rounded-full -translate-x-1.5 md:-translate-x-6" />

              {/* Content */}
              <div className="grid md:grid-cols-3 gap-4 md:gap-8">
                <div className="md:col-span-1">
                  <h3 className="text-xl font-bold text-cyan-400 mb-2">{exp.role}</h3>
                  <div className="text-gray-400 space-y-1">
                    <p className="font-semibold text-gray-300">{exp.company}</p>
                    <p className="text-sm">{exp.location}</p>
                    <p className="text-sm font-mono text-violet-400">{exp.period}</p>
                  </div>
                </div>

                <div className="md:col-span-2">
                  <h4 className="text-sm font-bold text-gray-300 mb-3 uppercase tracking-wider">
                    Key Achievements
                  </h4>
                  <ul className="space-y-2">
                    {exp.highlights.map((highlight, i) => (
                      <li key={i} className="flex gap-3 text-gray-400">
                        <span className="text-cyan-400 font-bold">→</span>
                        <span>{highlight}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
