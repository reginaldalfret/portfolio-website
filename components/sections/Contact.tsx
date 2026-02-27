'use client';

import { Mail, Github, Linkedin, ExternalLink } from 'lucide-react';

export default function Contact() {
  return (
    <section id="contact" className="relative py-20 md:py-32 px-6 bg-black">
      <div className="max-w-4xl mx-auto">
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-bold mb-4">
            <span className="glow-violet">Let's Connect</span>
          </h2>
          <p className="text-gray-400 text-lg max-w-2xl mx-auto">
            Have an interesting project or opportunity? I'd love to hear from you. Get in touch!
          </p>
          <div className="h-1 w-16 bg-gradient-to-r from-violet-600 to-cyan-400 mx-auto mt-6" />
        </div>

        {/* Contact Cards */}
        <div className="grid md:grid-cols-3 gap-6 mb-12 animate-slideInUp">
          {/* Email */}
          <a
            href="mailto:reginald@example.com"
            className="glass-effect glass-hover rounded-lg p-6 text-center transition-all duration-300 flex flex-col items-center gap-4"
          >
            <div className="w-12 h-12 rounded-full bg-cyan-400/10 border border-cyan-400/30 flex items-center justify-center">
              <Mail className="text-cyan-400" size={24} />
            </div>
            <div>
              <h3 className="font-bold text-cyan-400 mb-2">Email</h3>
              <p className="text-sm text-gray-400">reginald@example.com</p>
            </div>
          </a>

          {/* GitHub */}
          <a
            href="https://github.com/reginaldalfret"
            target="_blank"
            rel="noopener noreferrer"
            className="glass-effect glass-hover rounded-lg p-6 text-center transition-all duration-300 flex flex-col items-center gap-4"
          >
            <div className="w-12 h-12 rounded-full bg-violet-600/10 border border-violet-600/30 flex items-center justify-center">
              <Github className="text-violet-400" size={24} />
            </div>
            <div>
              <h3 className="font-bold text-violet-400 mb-2">GitHub</h3>
              <p className="text-sm text-gray-400">@reginaldalfret</p>
            </div>
          </a>

          {/* LinkedIn */}
          <a
            href="https://linkedin.com/in/reginaldalfret"
            target="_blank"
            rel="noopener noreferrer"
            className="glass-effect glass-hover rounded-lg p-6 text-center transition-all duration-300 flex flex-col items-center gap-4"
          >
            <div className="w-12 h-12 rounded-full bg-cyan-400/10 border border-cyan-400/30 flex items-center justify-center">
              <Linkedin className="text-cyan-400" size={24} />
            </div>
            <div>
              <h3 className="font-bold text-cyan-400 mb-2">LinkedIn</h3>
              <p className="text-sm text-gray-400">@reginaldalfret</p>
            </div>
          </a>
        </div>

        {/* CTA */}
        <div className="text-center glass-effect rounded-lg p-12 mb-12">
          <h3 className="text-2xl font-bold mb-4">Ready to build something amazing?</h3>
          <p className="text-gray-400 mb-6 max-w-lg mx-auto">
            Whether you have a project in mind or just want to say hello, feel free to reach out. Let's create something incredible together.
          </p>
          <a
            href="mailto:reginald@example.com"
            className="inline-flex items-center gap-2 px-8 py-3 bg-cyan-400 text-black font-semibold rounded-lg hover:bg-cyan-300 transition-all duration-300 hover:shadow-[0_0_20px_rgba(0,245,255,0.5)]"
          >
            Send me an email
            <ExternalLink size={18} />
          </a>
        </div>

        {/* Footer */}
        <div className="text-center text-gray-500 text-sm pt-8 border-t border-white/10">
          <p>
            © 2025 Reginald Alfret V. Built with React, Tailwind CSS, and a passion for great design.
          </p>
        </div>
      </div>
    </section>
  );
}
