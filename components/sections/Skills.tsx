'use client';

const skillCategories = [
  {
    title: 'Languages',
    skills: ['JavaScript (ES6+)', 'HTML5', 'CSS3', 'TypeScript', 'Python'],
  },
  {
    title: 'Frameworks',
    skills: ['React.js', 'Angular', 'Bootstrap', 'Tailwind CSS', 'Material UI'],
  },
  {
    title: 'Tools',
    skills: ['Figma', 'Git', 'GitHub', 'Postman', 'Cursor IDE', 'VS Code'],
  },
  {
    title: 'Concepts',
    skills: ['REST API', 'Responsive Design', 'WCAG Accessibility', 'UX Design'],
  },
];

export default function Skills() {
  return (
    <section id="skills" className="relative py-20 md:py-32 px-6 bg-gradient-to-b from-black to-black/80">
      <div className="max-w-6xl mx-auto">
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-bold mb-4">
            <span className="glow-violet">Skills & Expertise</span>
          </h2>
          <div className="h-1 w-16 bg-gradient-to-r from-violet-600 to-cyan-400 mx-auto" />
        </div>

        <div className="grid md:grid-cols-2 gap-8 animate-slideInUp">
          {skillCategories.map((category, idx) => (
            <div key={idx} className="space-y-4">
              <h3 className="text-xl font-bold text-cyan-400 mb-4">{category.title}</h3>
              <div className="flex flex-wrap gap-2">
                {category.skills.map((skill, i) => (
                  <div
                    key={i}
                    className="px-4 py-2 rounded-full glass-effect border border-cyan-400/30 text-gray-300 text-sm font-medium hover:border-cyan-400 hover:text-cyan-400 transition-all duration-300 hover:shadow-[0_0_15px_rgba(0,245,255,0.2)]"
                  >
                    {skill}
                  </div>
                ))}
              </div>
            </div>
          ))}
        </div>

        {/* Proficiency Bars */}
        <div className="mt-16 pt-16 border-t border-white/10 space-y-8">
          <h3 className="text-2xl font-bold text-cyan-400">Proficiency Levels</h3>
          {[
            { name: 'React & Frontend Development', level: 95 },
            { name: 'UI/UX Design & Implementation', level: 90 },
            { name: 'REST API Integration', level: 88 },
            { name: 'Responsive & Accessible Design', level: 92 },
          ].map((item, idx) => (
            <div key={idx}>
              <div className="flex justify-between mb-2">
                <span className="text-gray-300">{item.name}</span>
                <span className="text-cyan-400 font-bold">{item.level}%</span>
              </div>
              <div className="w-full h-2 bg-gray-800 rounded-full overflow-hidden">
                <div
                  className="h-full bg-gradient-to-r from-cyan-400 to-violet-600 rounded-full transition-all duration-1000"
                  style={{ width: `${item.level}%` }}
                />
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
