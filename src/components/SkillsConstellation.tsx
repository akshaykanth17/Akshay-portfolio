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
          bg: 'bg-emerald-500/15',
          border: 'border-emerald-500/40',
          text: 'text-emerald-300',
          glow: 'rgba(16, 185, 129, 0.4)',
        };
      case 'dev':
        return {
          bg: 'bg-blue-500/15',
          border: 'border-blue-500/40',
          text: 'text-blue-300',
          glow: 'rgba(59, 130, 246, 0.4)',
        };
      case 'ai':
        return {
          bg: 'bg-indigo-500/15',
          border: 'border-indigo-500/40',
          text: 'text-indigo-300',
          glow: 'rgba(99, 102, 241, 0.4)',
        };
    }
  };

  return (
    <section id="skills" className="relative py-28 sm:py-36 px-4 sm:px-8 lg:px-16 bg-[#07080d] overflow-hidden">
      {/* Background ambient light */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] rounded-full bg-blue-600/5 blur-[160px] pointer-events-none" />

      <div className="relative max-w-7xl mx-auto">
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-12">
          <div>
            <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-white/5 border border-white/10 backdrop-blur-md mb-4">
              <BrainCircuit className="w-3.5 h-3.5 text-blue-400" />
              <span className="font-mono text-xs tracking-widest uppercase text-slate-300">
                CHAPTER 07 &bull; TECHNICAL CAPABILITIES
              </span>
            </div>
            <h2 className="font-display text-4xl sm:text-6xl font-black text-white tracking-tight leading-tight">
              INTERACTIVE <br />
              <span className="bg-gradient-to-r from-blue-400 via-sky-300 to-indigo-300 bg-clip-text text-transparent">
                SKILLS CONSTELLATION.
              </span>
            </h2>
          </div>

          {/* Category Filter Pills */}
          <div className="flex flex-wrap items-center gap-2 p-1.5 rounded-full bg-white/5 border border-white/10 backdrop-blur-md">
            {[
              { id: 'all', label: 'All Disciplines' },
              { id: 'qa', label: 'Quality Assurance' },
              { id: 'dev', label: 'Development' },
              { id: 'ai', label: 'AI & Tools' },
            ].map((tab) => (
              <button
                key={tab.id}
                onClick={() => setFilter(tab.id as any)}
                className={`px-4 py-2 rounded-full text-xs font-medium tracking-wide transition-all duration-200 ${
                  filter === tab.id
                    ? 'bg-blue-600 text-white shadow-lg shadow-blue-600/40'
                    : 'text-slate-400 hover:text-white hover:bg-white/5'
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
          className="hidden md:block relative w-full h-[520px] rounded-3xl bg-gradient-to-b from-slate-900/40 via-slate-950/60 to-black/80 border border-white/10 p-6 overflow-hidden shadow-2xl backdrop-blur-xl"
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
                      stroke="rgba(96, 165, 250, 0.4)"
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
                    className={`w-2 h-2 rounded-full ${
                      skill.category === 'qa'
                        ? 'bg-emerald-400'
                        : skill.category === 'dev'
                        ? 'bg-blue-400'
                        : 'bg-indigo-400'
                    } ${skill.importance === 'primary' ? 'animate-pulse' : ''}`}
                  />
                  <span className={`text-xs font-mono font-medium ${colors.text} whitespace-nowrap`}>
                    {skill.name}
                  </span>
                </div>
              </motion.div>
            );
          })}

          {/* Center Info HUD / Active Node Details */}
          <div className="absolute bottom-6 left-6 right-6 p-4 rounded-2xl bg-black/60 border border-white/10 backdrop-blur-md flex items-center justify-between text-xs font-mono text-slate-300">
            <div className="flex items-center gap-4">
              <span className="text-slate-400">NODE STATUS:</span>
              {activeSkill ? (
                <span className="text-white font-bold flex items-center gap-2">
                  <Sparkles className="w-4 h-4 text-amber-400" />
                  {activeSkill.name} [{activeSkill.category.toUpperCase()}]
                </span>
              ) : (
                <span className="text-slate-400">Hover or click any node to explore technical matrix</span>
              )}
            </div>

            <div className="flex items-center gap-4">
              <span className="flex items-center gap-1.5 text-emerald-400">
                <span className="w-2 h-2 rounded-full bg-emerald-400 inline-block" /> QA
              </span>
              <span className="flex items-center gap-1.5 text-blue-400">
                <span className="w-2 h-2 rounded-full bg-blue-400 inline-block" /> Dev
              </span>
              <span className="flex items-center gap-1.5 text-indigo-400">
                <span className="w-2 h-2 rounded-full bg-indigo-400 inline-block" /> AI &amp; Tools
              </span>
            </div>
          </div>
        </div>

        {/* Mobile Accessible Card List (shown on mobile / tablet) */}
        <div className="md:hidden grid grid-cols-1 sm:grid-cols-2 gap-4">
          {[
            {
              cat: 'Quality Assurance',
              items: skillsData.filter((s) => s.category === 'qa'),
              color: 'emerald',
            },
            {
              cat: 'Software Development',
              items: skillsData.filter((s) => s.category === 'dev'),
              color: 'blue',
            },
            {
              cat: 'Generative AI & Tooling',
              items: skillsData.filter((s) => s.category === 'ai'),
              color: 'indigo',
            },
          ].map((group) => (
            <div
              key={group.cat}
              className="p-5 rounded-2xl bg-slate-900/80 border border-white/10 backdrop-blur-md"
            >
              <h3 className="font-display font-bold text-sm text-white mb-3 flex items-center gap-2">
                <CheckCircle2 className="w-4 h-4 text-blue-400" />
                <span>{group.cat}</span>
              </h3>
              <div className="flex flex-wrap gap-2">
                {group.items.map((item) => (
                  <span
                    key={item.id}
                    className="px-2.5 py-1 rounded-lg bg-white/5 border border-white/5 text-xs font-mono text-slate-300"
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
