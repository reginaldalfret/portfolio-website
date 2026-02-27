'use client';

export default function About() {
  const stats = [
    { label: 'Hackathons Won', value: '3+' },
    { label: 'GitHub Contributions', value: '250+' },
    { label: 'Teams Defeated', value: '200+' },
    { label: 'CGPA', value: '8.2' },
  ];

  return (
    <section id="about" className="relative py-20 md:py-32 px-6 bg-black">
      <div className="max-w-6xl mx-auto">
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-bold mb-4">
            <span className="glow-cyan">About Me</span>
          </h2>
          <div className="h-1 w-16 bg-gradient-to-r from-cyan-400 to-violet-600 mx-auto" />
        </div>

        <div className="grid md:grid-cols-2 gap-12 items-center mb-16 animate-slideInUp">
          {/* Avatar */}
          <div className="flex justify-center md:justify-start">
            <div className="relative w-64 h-64 md:w-80 md:h-80">
              <div className="absolute inset-0 rounded-lg bg-gradient-to-br from-cyan-400 to-violet-600 p-1 animate-pulse opacity-30" />
              <div className="absolute inset-1 rounded-lg bg-gradient-to-br from-cyan-500/20 to-violet-600/20 backdrop-blur" />
              <div className="absolute inset-0 rounded-lg overflow-hidden flex items-center justify-center">
                <div className="w-60 h-60 md:w-72 md:h-72 bg-gradient-to-br from-gray-800 to-black rounded-lg flex items-center justify-center text-6xl">
                  👨‍💻
                </div>
              </div>
            </div>
          </div>

          {/* Bio */}
          <div className="space-y-6">
            <p className="text-lg text-gray-300 leading-relaxed">
              Second-year <span className="glow-cyan text-base">B.Tech AI & Data Science</span> student at St. Joseph's Institute of Technology, Chennai. I build React-based UIs, integrate REST APIs, and deliver polished, responsive interfaces — from Figma to production.
            </p>
            <p className="text-lg text-gray-300 leading-relaxed">
              My work has been <span className="glow-cyan text-base">adopted by Tamil Nadu Police</span>. With 250+ GitHub contributions in 2025, I'm passionate about creating solutions that combine cutting-edge technology with exceptional user experience.
            </p>
            <p className="text-lg text-gray-300 leading-relaxed">
              When I'm not coding, you'll find me working on exciting hackathon projects, contributing to open source, or exploring new technologies in cybersecurity and web development.
            </p>
          </div>
        </div>

        {/* Stats */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 md:gap-6 mt-16">
          {stats.map((stat, index) => (
            <div
              key={index}
              className="glass-effect glass-hover p-6 rounded-lg text-center"
            >
              <div className="text-3xl md:text-4xl font-bold glow-cyan mb-2">
                {stat.value}
              </div>
              <div className="text-sm text-gray-400">{stat.label}</div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
