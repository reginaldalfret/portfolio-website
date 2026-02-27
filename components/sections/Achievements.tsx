'use client';

const achievements = [
  {
    icon: '🥇',
    title: 'TN Police Hackathon 2025',
    subtitle: 'TOR-UNVEIL Adopted',
    description: 'Winner - 1st Place - Dark web cybercriminal tracking tool',
  },
  {
    icon: '🥇',
    title: 'SRM RehabHack 2025',
    subtitle: 'Winner',
    description: 'Real-time physio rehabilitation app development',
  },
  {
    icon: '🥇',
    title: 'Blaze a Trail 2.0',
    subtitle: 'Winner',
    description: 'AI crop recommendation engine for sustainable agriculture',
  },
  {
    icon: '🥅',
    title: 'TN Police Hackathon 2024',
    subtitle: 'Finalist',
    description: 'Scam Detector - ML-based content classification',
  },
  {
    icon: '🏆',
    title: '6 National-Level',
    subtitle: 'Technical Symposiums',
    description: 'Winner across multiple competitions and hackathons',
  },
  {
    icon: '⭐',
    title: '250+ GitHub',
    subtitle: 'Contributions 2025',
    description: 'Active open source contributor and developer',
  },
];

export default function Achievements() {
  return (
    <section id="achievements" className="relative py-20 md:py-32 px-6 bg-black">
      <div className="max-w-6xl mx-auto">
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-bold mb-4">
            <span className="glow-violet">Achievements & Awards</span>
          </h2>
          <div className="h-1 w-16 bg-gradient-to-r from-violet-600 to-cyan-400 mx-auto" />
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6 animate-slideInUp">
          {achievements.map((achievement, idx) => (
            <div
              key={idx}
              className="group glass-effect glass-hover rounded-lg p-6 transition-all duration-300 flex flex-col"
              style={{ animationDelay: `${idx * 50}ms` }}
            >
              {/* Icon */}
              <div className="text-5xl mb-4 group-hover:scale-110 transition-transform duration-300">
                {achievement.icon}
              </div>

              {/* Title */}
              <h3 className="text-lg font-bold text-cyan-400 mb-2">{achievement.title}</h3>

              {/* Subtitle */}
              <p className="text-sm font-semibold text-violet-400 mb-3">{achievement.subtitle}</p>

              {/* Description */}
              <p className="text-gray-400 text-sm leading-relaxed flex-grow">
                {achievement.description}
              </p>

              {/* Hover effect line */}
              <div className="h-0.5 bg-gradient-to-r from-cyan-400 to-transparent mt-4 transform scale-x-0 group-hover:scale-x-100 transition-transform duration-300 origin-left" />
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
