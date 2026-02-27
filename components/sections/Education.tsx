'use client';

const education = {
  degree: 'B.Tech AI & Data Science',
  institution: 'St. Joseph\'s Institute of Technology',
  location: 'Chennai',
  year: '2023 - 2027',
  cgpa: '8.2/10',
};

const certifications = [
  {
    title: 'Meta Front-End Developer',
    issuer: 'Coursera',
    icon: '📱',
  },
  {
    title: 'React Complete Guide',
    issuer: 'Udemy',
    icon: '⚛️',
  },
  {
    title: 'Figma UI/UX Design',
    issuer: 'Udemy',
    icon: '🎨',
  },
  {
    title: 'Google Cybersecurity',
    issuer: 'Coursera',
    icon: '🔒',
  },
];

export default function Education() {
  return (
    <section id="education" className="relative py-20 md:py-32 px-6 bg-gradient-to-b from-black to-black/80">
      <div className="max-w-6xl mx-auto">
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-bold mb-4">
            <span className="glow-cyan">Education & Certifications</span>
          </h2>
          <div className="h-1 w-16 bg-gradient-to-r from-cyan-400 to-violet-600 mx-auto" />
        </div>

        {/* Degree */}
        <div className="grid md:grid-cols-2 gap-8 mb-16 animate-slideInUp">
          <div className="glass-effect glass-hover rounded-lg p-8">
            <h3 className="text-3xl font-bold glow-cyan mb-2">{education.degree}</h3>
            <p className="text-lg text-gray-300 mb-4">{education.institution}</p>
            <div className="space-y-2 text-gray-400">
              <p>📍 {education.location}</p>
              <p>📅 {education.year}</p>
              <p className="text-cyan-400 font-bold">GPA: {education.cgpa}</p>
            </div>
          </div>

          <div className="flex items-center justify-center">
            <div className="text-center">
              <div className="text-7xl mb-4">🎓</div>
              <p className="text-gray-400 text-sm max-w-xs">
                Specialized in AI & Data Science with focus on frontend development and user experience design
              </p>
            </div>
          </div>
        </div>

        {/* Certifications */}
        <div>
          <h3 className="text-2xl font-bold text-violet-400 mb-8">Professional Certifications</h3>
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-4">
            {certifications.map((cert, idx) => (
              <div
                key={idx}
                className="glass-effect glass-hover rounded-lg p-6 text-center transition-all duration-300"
              >
                <div className="text-5xl mb-3">{cert.icon}</div>
                <h4 className="text-lg font-bold text-gray-300 mb-2">{cert.title}</h4>
                <p className="text-sm text-gray-500">{cert.issuer}</p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
