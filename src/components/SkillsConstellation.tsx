import React, { useState, useRef } from 'react';
import { motion } from 'framer-motion';
import { BrainCircuit, Sparkles, CheckCircle2 } from 'lucide-react';

interface Skill {
  id: string;
  name: string;
  category: 'qa' | 'dev' | 'ai';
  importance: 'primary' | 'standard';
  x: number; // percentage 0-100
  y: number; // percentage 0-100
  vx?: number;
  vy?: number;
}

const skillsData: Skill[] = [
  // QA Core
  { id: '1', name: 'Manual Testing', category: 'qa', importance: 'primary', x: 22, y: 32 },
  { id: '2', name: 'Functional & Regression', category: 'qa', importance: 'primary', x: 38, y: 22 },
  { id: '3', name: 'Mobile App Testing (iOS/Android)', category: 'qa', importance: 'primary', x: 28, y: 50 },
  { id: '4', name: 'Bug Tracking (JIRA)', category: 'qa', importance: 'primary', x: 15, y: 65 },
  { id: '5', name: 'Test Case Design & Execution', category: 'qa', importance: 'standard', x: 36, y: 72 },
  { id: '6', name: 'Smoke & Sanity Testing', category: 'qa', importance: 'standard', x: 18, y: 45 },
  { id: '7', name: 'API Testing', category: 'qa', importance: 'standard', x: 32, y: 85 },
  { id: '8', name: 'User Acceptance Testing (UAT)', category: 'qa', importance: 'standard', x: 42, y: 40 },

  // Development
  { id: '9', name: 'React 18', category: 'dev', importance: 'primary', x: 62, y: 26 },
  { id: '10', name: 'TypeScript', category: 'dev', importance: 'primary', x: 74, y: 38 },
  { id: '11', name: 'Python', category: 'dev', importance: 'primary', x: 55, y: 52 },
  { id: '12', name: 'Playwright Browser Automation', category: 'dev', importance: 'primary', x: 68, y: 62 },
  { id: '13', name: 'Node.js & Express', category: 'dev', importance: 'standard', x: 80, y: 52 },
  { id: '14', name: 'Streamlit Dashboards', category: 'dev', importance: 'standard', x: 60, y: 76 },
  { id: '15', name: 'PostgreSQL & Prisma', category: 'dev', importance: 'standard', x: 76, y: 75 },

  // AI & Modern Tools
  { id: '16', name: 'Generative AI (GenAI)', category: 'ai', importance: 'primary', x: 48, y: 34 },
  { id: '17', name: 'Google Antigravity AI', category: 'ai', importance: 'primary', x: 50, y: 62 },
  { id: '18', name: 'Vibe Coding Workflows', category: 'ai', importance: 'primary', x: 45, y: 80 },
  { id: '19', name: 'Git & GitHub CI/CD', category: 'ai', importance: 'standard', x: 52, y: 15 },
  { id: '20', name: 'Docker Compose', category: 'ai', importance: 'standard', x: 85, y: 28 },
  { id: '21', name: 'Firebase & Security', category: 'ai', importance: 'standard', x: 88, y: 65 },
  { id: '22', name: 'Microsoft Excel Data QA', category: 'ai', importance: 'standard', x: 12, y: 22 },
];

export const SkillsConstellation: React.FC = () => {
  const [filter, setFilter] = useState<'all' | 'qa' | 'dev' | 'ai'>('all');
  const [activeSkill, setActiveSkill] = useState<Skill | null>(null);
  const [mouseOffset, setMouseOffset] = useState({ x: 0, y: 0 });
  const containerRef = useRef<HTMLDivElement>(null);

  const filteredSkills = skillsData.filter(
    (s) => filter === 'all' || s.category === filter
  );

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!containerRef.current) return;
    const rect = containerRef.current.getBoundingClientRect();
    const x = (e.clientX - rect.left) / rect.width - 0.5;
    const y = (e.clientY - rect.top) / rect.height - 0.5;
    setMouseOffset({ x: x * 20, y: y * 20 });
  };

  const getCategoryColor = (cat: 'qa' | 'dev' | 'ai') => {
    switch (cat) {
      case 'qa':
        return {
          bg: 'bg-zinc-800/80',
          border: 'border-white/20',
          text: 'text-white',
          glow: 'rgba(255, 255, 255, 0.2)',
        };
      case 'dev':
        return {
          bg: 'bg-zinc-900/80',
          border: 'border-white/15',
          text: 'text-zinc-200',
          glow: 'rgba(255, 255, 255, 0.15)',
        };
      case 'ai':
        return {
          bg: 'bg-zinc-800/60',
          border: 'border-white/25',
          text: 'text-zinc-100',
          glow: 'rgba(255, 255, 255, 0.25)',
        };
    }
  };

  return (
    <section id="skills" className="relative py-28 sm:py-36 px-4 sm:px-8 lg:px-16 bg-[#060709] overflow-hidden">
      {/* Background ambient foggy white smoke */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[750px] h-[750px] rounded-full bg-white/[0.1] blur-[170px] pointer-events-none" />

      <div className="relative max-w-7xl mx-auto z-10">
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-12">
          <div>
            <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-zinc-900 border border-white/10 backdrop-blur-md mb-4">
              <BrainCircuit className="w-3.5 h-3.5 text-neutral-300" />
              <span className="font-mono text-xs tracking-widest uppercase text-zinc-300">
                CHAPTER 07 &bull; TECHNICAL CAPABILITIES
              </span>
            </div>
            <h2 className="font-display text-4xl sm:text-6xl font-black text-white tracking-tight leading-tight">
              INTERACTIVE <br />
              <span className="bg-gradient-to-r from-white via-zinc-200 to-zinc-400 bg-clip-text text-transparent filter drop-shadow-[0_0_30px_rgba(255,255,255,0.35)]">
                SKILLS CONSTELLATION.
              </span>
            </h2>
          </div>

          {/* Category Filter Pills in Black & Grey */}
          <div className="flex flex-wrap items-center gap-2 p-1.5 rounded-full bg-zinc-900/90 border border-white/10 backdrop-blur-md">
            {[
              { id: 'all', label: 'All Disciplines' },
              { id: 'qa', label: 'Test Engineering' },
              { id: 'dev', label: 'Development' },
              { id: 'ai', label: 'AI & Tools' },
            ].map((tab) => (
              <button
                key={tab.id}
                onClick={() => setFilter(tab.id as any)}
                className={`px-4 py-2 rounded-full text-xs font-medium tracking-wide transition-all duration-200 ${
                  filter === tab.id
                    ? 'bg-white text-black font-semibold shadow-lg shadow-white/5'
                    : 'text-zinc-400 hover:text-white hover:bg-white/5'
                }`}
              >
                {tab.label}
              </button>
            ))}
          </div>
        </div>

        {/* Interactive Desktop Constellation Canvas/Map (Hidden on Mobile) */}
        <div
          ref={containerRef}
          onMouseMove={handleMouseMove}
          className="hidden md:block relative w-full h-[520px] rounded-3xl bg-gradient-to-b from-zinc-900/60 via-zinc-950/80 to-black border border-white/10 p-6 overflow-hidden shadow-2xl backdrop-blur-xl"
        >
          {/* Subtle connecting lines SVG between nearby nodes */}
          <svg className="absolute inset-0 w-full h-full pointer-events-none opacity-20">
            {filteredSkills.map((s1, i) =>
              filteredSkills.slice(i + 1).map((s2) => {
                const dist = Math.hypot(s1.x - s2.x, s1.y - s2.y);
                if (dist < 28) {
                  return (
                    <line
                      key={`${s1.id}-${s2.id}`}
                      x1={`${s1.x}%`}
                      y1={`${s1.y}%`}
                      x2={`${s2.x}%`}
                      y2={`${s2.y}%`}
                      stroke="rgba(255, 255, 255, 0.25)"
                      strokeWidth="1"
                      strokeDasharray="3 3"
                    />
                  );
                }
                return null;
              })
            )}
          </svg>

          {/* Floating Interactive Skill Nodes */}
          {filteredSkills.map((skill) => {
            const colors = getCategoryColor(skill.category);
            const isHovered = activeSkill?.id === skill.id;

            return (
              <motion.div
                key={skill.id}
                initial={{ scale: 0, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                exit={{ scale: 0, opacity: 0 }}
                transition={{ duration: 0.4 }}
                onMouseEnter={() => setActiveSkill(skill)}
                onMouseLeave={() => setActiveSkill(null)}
                className="absolute cursor-pointer select-none group"
                style={{
                  left: `${skill.x}%`,
                  top: `${skill.y}%`,
                  transform: `translate(-50%, -50%) translate(${mouseOffset.x * 0.4}px, ${mouseOffset.y * 0.4}px)`,
                  transition: 'transform 0.2s ease-out',
                }}
              >
                <div
                  className={`px-3.5 py-2 rounded-2xl ${colors.bg} ${colors.border} border backdrop-blur-xl flex items-center gap-2 shadow-lg transition-all duration-300 group-hover:scale-115 group-hover:z-30`}
                  style={{
                    boxShadow: isHovered ? `0 0 25px ${colors.glow}` : undefined,
                  }}
                >
                  <div
                    className="w-2 h-2 rounded-full bg-white animate-pulse"
                  />
                  <span className={`text-xs font-mono font-medium ${colors.text} whitespace-nowrap`}>
                    {skill.name}
                  </span>
                </div>
              </motion.div>
            );
          })}

          {/* Center Info HUD / Active Node Details */}
          <div className="absolute bottom-6 left-6 right-6 p-4 rounded-2xl bg-zinc-950/80 border border-white/10 backdrop-blur-md flex items-center justify-between text-xs font-mono text-zinc-300">
            <div className="flex items-center gap-4">
              <span className="text-zinc-500">NODE STATUS:</span>
              {activeSkill ? (
                <span className="text-white font-bold flex items-center gap-2">
                  <Sparkles className="w-4 h-4 text-white" />
                  {activeSkill.name} [{activeSkill.category.toUpperCase()}]
                </span>
              ) : (
                <span className="text-zinc-400">Hover or click any node to explore technical matrix</span>
              )}
            </div>

            <div className="flex items-center gap-4">
              <span className="flex items-center gap-1.5 text-zinc-300">
                <span className="w-2 h-2 rounded-full bg-white inline-block" /> Test Engineering
              </span>
              <span className="flex items-center gap-1.5 text-zinc-400">
                <span className="w-2 h-2 rounded-full bg-zinc-400 inline-block" /> Development
              </span>
              <span className="flex items-center gap-1.5 text-zinc-400">
                <span className="w-2 h-2 rounded-full bg-zinc-600 inline-block" /> AI &amp; Tools
              </span>
            </div>
          </div>
        </div>

        {/* Mobile Accessible Card List (shown on mobile / tablet) */}
        <div className="md:hidden grid grid-cols-1 sm:grid-cols-2 gap-4">
          {[
            {
              cat: 'Test Engineering',
              items: skillsData.filter((s) => s.category === 'qa'),
            },
            {
              cat: 'Software Development',
              items: skillsData.filter((s) => s.category === 'dev'),
            },
            {
              cat: 'Generative AI & Tools',
              items: skillsData.filter((s) => s.category === 'ai'),
            },
          ].map((group) => (
            <div
              key={group.cat}
              className="p-5 rounded-2xl bg-zinc-900/80 border border-white/10 backdrop-blur-md"
            >
              <h3 className="font-display font-bold text-sm text-white mb-3 flex items-center gap-2">
                <CheckCircle2 className="w-4 h-4 text-neutral-300" />
                <span>{group.cat}</span>
              </h3>
              <div className="flex flex-wrap gap-2">
                {group.items.map((item) => (
                  <span
                    key={item.id}
                    className="px-2.5 py-1 rounded-lg bg-white/5 border border-white/10 text-xs font-mono text-zinc-300"
                  >
                    {item.name}
                  </span>
                ))}
              </div>
            </div>
          ))}
        </div>

      </div>
    </section>
  );
};
