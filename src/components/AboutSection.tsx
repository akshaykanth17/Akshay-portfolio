import React from 'react';
import { motion } from 'framer-motion';
import { Bug, Smartphone, Terminal, BrainCircuit, Layers } from 'lucide-react';

export const AboutSection: React.FC = () => {
  const highlights = [
    {
      icon: Smartphone,
      title: 'Mobile Ecosystem QA',
      desc: 'Extensive hands-on testing on Android & iOS platforms, verifying touch gestures, push notifications, and device compatibilities.'
    },
    {
      icon: Bug,
      title: 'Defect Lifecycle & JIRA',
      desc: 'Precision logging, root-cause diagnostics, regression suites, and continuous coordination with engineering teams.'
    },
    {
      icon: BrainCircuit,
      title: 'AI-Assisted Engineering',
      desc: 'Leveraging Generative AI & Google Antigravity to automate test scripts, diagnose anomalies, and accelerate full-stack delivery.'
    },
    {
      icon: Layers,
      title: 'Full-Stack Architecture',
      desc: 'Building modern web applications with React 18, TypeScript, Node.js, PostgreSQL, Docker, and real-time Socket.IO.'
    }
  ];

  return (
    <section id="about" className="relative py-28 sm:py-36 px-4 sm:px-8 lg:px-16 bg-[#08090b] overflow-hidden">
      {/* Background Subtle Tech Grid */}
      <div className="absolute inset-0 bg-tech-grid opacity-25 pointer-events-none" />

      {/* Decorative Muted Grey Glow */}
      <div className="absolute top-1/2 left-0 w-96 h-96 rounded-full bg-zinc-700/10 blur-[130px] pointer-events-none" />

      <div className="relative max-w-7xl mx-auto">
        {/* Header Eyebrow */}
        <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-zinc-900 border border-white/10 backdrop-blur-md mb-6">
          <Terminal className="w-3.5 h-3.5 text-neutral-300" />
          <span className="font-mono text-xs tracking-widest uppercase text-zinc-300">
            CHAPTER 04 &bull; PHILOSOPHY &amp; BACKGROUND
          </span>
        </div>

        {/* Giant Editorial Headline */}
        <h2 className="font-display text-4xl sm:text-6xl lg:text-7xl font-black text-white tracking-tight leading-[1.08] max-w-4xl mb-12">
          THE PERSON <br />
          <span className="bg-gradient-to-r from-white via-zinc-200 to-zinc-400 bg-clip-text text-transparent">
            BEHIND THE CODE.
          </span>
        </h2>

        {/* Two-Column Storytelling Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-start">
          
          {/* Left Column: Narrative Prose */}
          <div className="lg:col-span-7 space-y-6 text-zinc-300 font-light text-base sm:text-lg leading-relaxed">
            <p className="border-l-2 border-white/40 pl-4 py-1 text-white font-medium text-lg sm:text-xl">
              "Quality is never an accident; it is always the result of high intention, sincere effort, intelligent direction, and skillful execution."
            </p>
            <p>
              I am an <strong className="text-white font-semibold">MCA graduate, Test Engineer, and AI-Assisted Developer</strong> based in Dubai with dedicated QA experience. Having served as the Point of Contact for four major features at SIDE, Bangalore, I specialize in bridging the gap between bulletproof quality assurance and forward-looking software development.
            </p>
            <p>
              My background spans complete testing lifecycles across <span className="text-white font-medium">Android and iOS mobile applications</span>, executing functional, regression, smoke, sanity, exploratory, and User Acceptance Testing (UAT). Every edge case matters. Every defect documented in JIRA is an opportunity to fortify software stability and elevate end-user satisfaction.
            </p>
            <p>
              Beyond traditional testing, I actively engineer <span className="text-white font-medium">AI-assisted test agents</span> and full-stack social applications. Utilizing modern LLM orchestration, Playwright browser automation, and Google Antigravity workflows, I design automated solutions that accelerate test coverage without sacrificing empirical precision.
            </p>

            {/* Quick Badges in Black & Grey */}
            <div className="flex flex-wrap gap-2 pt-4">
              {['Dubai, UAE', 'Test Engineer', 'AI-Assisted Developer', 'MCA Degree', 'Mobile QA (Android/iOS)', 'JIRA & Scrum', 'Playwright Automation', 'Open to Relocation'].map((badge) => (
                <span
                  key={badge}
                  className="px-3 py-1 rounded-full bg-zinc-900 border border-white/10 text-xs font-mono text-zinc-300"
                >
                  {badge}
                </span>
              ))}
            </div>
          </div>

          {/* Right Column: 4 Pillar Feature Cards in Black & Grey */}
          <div className="lg:col-span-5 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-1 gap-4">
            {highlights.map((item, idx) => {
              const Icon = item.icon;
              return (
                <motion.div
                  key={item.title}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.5, delay: idx * 0.1 }}
                  className="p-5 rounded-2xl bg-zinc-900/60 border border-white/10 hover:border-white/30 backdrop-blur-md transition-all duration-300 group hover:-translate-y-1"
                >
                  <div className="flex items-center gap-3 mb-2">
                    <div className="w-9 h-9 rounded-xl bg-white/5 border border-white/10 flex items-center justify-center text-neutral-300 group-hover:bg-white group-hover:text-black transition-colors">
                      <Icon className="w-5 h-5" />
                    </div>
                    <h3 className="font-display font-bold text-base text-white">
                      {item.title}
                    </h3>
                  </div>
                  <p className="text-xs sm:text-sm text-zinc-400 font-light leading-relaxed">
                    {item.desc}
                  </p>
                </motion.div>
              );
            })}
          </div>

        </div>
      </div>
    </section>
  );
};
