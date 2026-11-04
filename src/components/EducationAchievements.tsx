import React from 'react';
import { motion } from 'framer-motion';
import { GraduationCap, Award, Trophy, Users, BookOpen, CheckCircle } from 'lucide-react';

export const EducationAchievements: React.FC = () => {
  const education = [
    {
      degree: 'MCA — Master of Computer Applications',
      institution: 'Nehru College of Management, Bharathiyar University',
      focus: 'Advanced Software Engineering, Systems Architecture & QA Methodologies',
      tag: 'Postgraduate Degree'
    },
    {
      degree: 'B.Sc Computer Science',
      institution: 'College of Applied Science Vadakkenchery, Calicut University',
      focus: 'Algorithms, Data Structures, Relational Databases, Operating Systems',
      tag: 'Undergraduate Degree'
    },
    {
      degree: 'Class XII (Computer Science)',
      institution: 'Bhavans Vidhya Mandir Chithali, CBSE',
      focus: 'Mathematics, Physics, Chemistry, Computer Science Fundamentals',
      tag: 'Higher Secondary'
    }
  ];

  const achievements = [
    {
      icon: Award,
      title: 'UAE 1 Million Prompters Initiative',
      organization: 'UAE Government National AI Program',
      desc: 'Completed prestigious certification launched by the UAE Government to accelerate nationwide AI literacy, prompt engineering proficiency, and practical GenAI workflows.',
      badge: 'Certified Prompter'
    },
    {
      icon: Trophy,
      title: 'Quarterly Reward & Recognition Award',
      organization: 'SIDE, Bangalore',
      desc: 'Awarded for outstanding performance, meticulous defect diagnostics, and high-impact quality contribution across 4 critical project releases.',
      badge: 'Excellence in QA'
    },
    {
      icon: Users,
      title: 'Inter-College Tech & Gaming Event Leadership',
      organization: 'Nehru College & College of Applied Science',
      desc: 'Volunteered and spearheaded event operations, coordinating schedules and technical tournaments for 100+ student participants.',
      badge: 'Event Organizer'
    }
  ];

  return (
    <section id="education" className="relative py-28 sm:py-36 px-4 sm:px-8 lg:px-16 bg-[#08090b] overflow-hidden">
      {/* Background Tech Grid and Foggy White Smoke Cloud */}
      <div className="absolute inset-0 bg-tech-grid opacity-20 pointer-events-none" />
      <div className="absolute top-1/3 left-10 w-[650px] h-[650px] rounded-full bg-white/[0.1] blur-[160px] pointer-events-none" />

      <div className="relative max-w-7xl mx-auto z-10">
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-16">
          <div>
            <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-zinc-900 border border-white/10 backdrop-blur-md mb-4">
              <GraduationCap className="w-3.5 h-3.5 text-neutral-300" />
              <span className="font-mono text-xs tracking-widest uppercase text-zinc-300">
                CHAPTER 08 &bull; PEDAGOGY &amp; RECOGNITION
              </span>
            </div>
            <h2 className="font-display text-4xl sm:text-6xl font-black text-white tracking-tight leading-tight">
              EDUCATION &amp; <br />
              <span className="text-emerald-400 filter drop-shadow-[0_0_35px_rgba(52,211,153,0.7)]">
                HONORS.
              </span>
            </h2>
          </div>
          <p className="text-zinc-400 font-light max-w-md text-sm sm:text-base">
            Formal computer science foundations paired with recognized industry certifications and organizational honors.
          </p>
        </div>

        {/* Two Columns: Education & Honors */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-10">
          
          {/* Education Column */}
          <div className="space-y-6">
            <div className="flex items-center gap-3 pb-2 border-b border-white/10">
              <BookOpen className="w-5 h-5 text-neutral-300" />
              <h3 className="font-display font-bold text-xl text-white">
                Academic Background
              </h3>
            </div>

            <div className="space-y-4">
              {education.map((item, idx) => (
                <motion.div
                  key={item.degree}
                  initial={{ opacity: 0, x: -20 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.5, delay: idx * 0.1 }}
                  className="p-6 rounded-2xl bg-zinc-900/60 border border-white/10 hover:border-white/30 backdrop-blur-md transition-all duration-300 group"
                >
                  <div className="flex items-center justify-between gap-2 mb-2">
                    <span className="px-2.5 py-0.5 rounded-full bg-white/5 border border-white/10 text-[10px] font-mono text-zinc-300 uppercase tracking-wider">
                      {item.tag}
                    </span>
                  </div>
                  <h4 className="font-display font-bold text-lg text-white group-hover:text-neutral-200 transition-colors">
                    {item.degree}
                  </h4>
                  <p className="text-sm font-medium text-zinc-300 mt-1">
                    {item.institution}
                  </p>
                  <p className="text-xs text-zinc-400 font-mono mt-2 flex items-center gap-1.5">
                    <CheckCircle className="w-3.5 h-3.5 text-neutral-300" />
                    <span>{item.focus}</span>
                  </p>
                </motion.div>
              ))}
            </div>
          </div>

          {/* Achievements Column */}
          <div className="space-y-6">
            <div className="flex items-center gap-3 pb-2 border-b border-white/10">
              <Trophy className="w-5 h-5 text-neutral-300" />
              <h3 className="font-display font-bold text-xl text-white">
                Achievements &amp; Honors
              </h3>
            </div>

            <div className="space-y-4">
              {achievements.map((item, idx) => {
                const Icon = item.icon;
                return (
                  <motion.div
                    key={item.title}
                    initial={{ opacity: 0, x: 20 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.5, delay: idx * 0.1 }}
                    className="p-6 rounded-2xl bg-zinc-900/60 border border-white/10 hover:border-white/30 backdrop-blur-md transition-all duration-300 group"
                  >
                    <div className="flex items-center justify-between gap-2 mb-3">
                      <div className="w-9 h-9 rounded-xl bg-white/5 border border-white/10 flex items-center justify-center text-neutral-300 group-hover:bg-white group-hover:text-black transition-colors">
                        <Icon className="w-5 h-5" />
                      </div>
                      <span className="px-2.5 py-0.5 rounded-full bg-white/5 border border-white/10 text-[10px] font-mono text-zinc-300">
                        {item.badge}
                      </span>
                    </div>
                    <h4 className="font-display font-bold text-lg text-white">
                      {item.title}
                    </h4>
                    <p className="text-xs font-mono text-zinc-400 mt-0.5">
                      {item.organization}
                    </p>
                    <p className="text-xs sm:text-sm text-zinc-300 font-light mt-2 leading-relaxed">
                      {item.desc}
                    </p>
                  </motion.div>
                );
              })}
            </div>
          </div>

        </div>
      </div>
    </section>
  );
};

