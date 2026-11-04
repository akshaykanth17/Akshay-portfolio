import React from 'react';
import { motion } from 'framer-motion';
import { Briefcase, Calendar, MapPin, CheckCircle2 } from 'lucide-react';

export const ExperienceTimeline: React.FC = () => {

  const responsibilities = [
    {
      title: 'Feature Point of Contact (POC)',
      desc: 'Selected as the primary QA Point of Contact for 4 project features, directly coordinating between developers and stakeholders to guarantee timely test deliverables.',
      tag: 'Leadership & Coordination'
    },
    {
      title: 'Mobile Ecosystem QA (Android & iOS)',
      desc: 'Performed thorough manual and device testing on real Android and iOS smartphones to validate app stability, responsiveness, touch gestures, and memory constraints.',
      tag: 'Cross-Platform Mobile'
    },
    {
      title: 'Comprehensive Test Regimen',
      desc: 'Designed and executed structured test suites spanning Functional, Regression, Smoke, Sanity, Exploratory, Compatibility, UI/UX, and Integration testing.',
      tag: 'Test Execution'
    },
    {
      title: 'Defect Lifecycle & JIRA Management',
      desc: 'Identified, documented, and tracked bugs with reproduction steps, severity metrics, and logs in JIRA, partnering closely with software engineers until verified fix.',
      tag: 'JIRA & Tracking'
    },
    {
      title: 'Daily Agile Scrum & Reporting',
      desc: 'Actively participated in daily standups, sprint reviews, and retrospective meetings; generated actionable scrum reports for engineering leadership.',
      tag: 'Agile Methodology'
    },
    {
      title: 'User Acceptance Testing (UAT)',
      desc: 'Assisted in validating business-critical user journeys and workflows to ensure end-to-end readiness prior to release milestones.',
      tag: 'Production Readiness'
    }
  ];

  return (
    <section id="timeline" className="relative py-28 sm:py-36 px-4 sm:px-8 lg:px-16 bg-[#060709] overflow-hidden">
      {/* Decorative Year Watermark Background */}
      <div className="absolute right-0 top-1/4 select-none pointer-events-none opacity-[0.03] font-display font-black text-[18vw] leading-none text-white overflow-hidden">
        2025-26
      </div>

      <div className="relative max-w-7xl mx-auto">
        {/* Eyebrow */}
        <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-zinc-900 border border-white/10 backdrop-blur-md mb-6">
          <Briefcase className="w-3.5 h-3.5 text-neutral-300" />
          <span className="font-mono text-xs tracking-widest uppercase text-zinc-300">
            CHAPTER 05 &bull; CAREER TRAJECTORY
          </span>
        </div>

        {/* Section Headline with Giant Year Numbers */}
        <div className="flex flex-col lg:flex-row lg:items-end justify-between gap-8 mb-16">
          <div>
            <h2 className="font-display text-4xl sm:text-6xl font-black text-white tracking-tight leading-tight">
              PROFESSIONAL <br />
              <span className="bg-gradient-to-r from-white via-zinc-200 to-zinc-400 bg-clip-text text-transparent">
                EXPERIENCE.
              </span>
            </h2>
            <p className="text-zinc-400 font-light mt-3 max-w-lg text-sm sm:text-base">
              Hands-on test engineering tenure validating business-critical features, multi-platform mobile stability, and Agile delivery.
            </p>
          </div>

          {/* Huge Animated Year Display Badge in Black & Grey */}
          <div className="flex items-center gap-4 bg-zinc-900/90 border border-white/10 p-4 sm:p-6 rounded-3xl backdrop-blur-xl shadow-2xl">
            <div className="text-center">
              <span className="font-mono text-[10px] tracking-widest text-zinc-500 block">START</span>
              <span className="font-display font-black text-3xl sm:text-5xl text-white">2025</span>
              <span className="font-mono text-[11px] text-zinc-400 block">JUNE 11</span>
            </div>
            <div className="h-10 w-[1px] bg-white/10" />
            <div className="text-center">
              <span className="font-mono text-[10px] tracking-widest text-zinc-500 block">COMPLETION</span>
              <span className="font-display font-black text-3xl sm:text-5xl text-neutral-300">2026</span>
              <span className="font-mono text-[11px] text-zinc-400 block">AUGUST 14</span>
            </div>
          </div>
        </div>

        {/* The Primary Role Spotlight Card */}
        <div className="relative rounded-3xl bg-zinc-900/80 border border-white/10 p-6 sm:p-10 shadow-2xl backdrop-blur-2xl">
          {/* Header of the Role */}
          <div className="flex flex-col md:flex-row md:items-center justify-between pb-8 border-b border-white/10 gap-4">
            <div>
              <div className="flex items-center gap-3 mb-2">
                <span className="px-3 py-1 rounded-full bg-white/10 text-white border border-white/20 font-mono text-xs font-semibold uppercase tracking-wider">
                  Test Engineer
                </span>
                <span className="px-3 py-1 rounded-full bg-zinc-800 text-zinc-300 border border-white/10 font-mono text-xs">
                  Verified Experience
                </span>
              </div>
              <h3 className="font-display text-2xl sm:text-4xl font-extrabold text-white">
                TEST ENGINEER
              </h3>
              <div className="flex flex-wrap items-center gap-4 mt-2 text-xs sm:text-sm text-zinc-300 font-mono">
                <span className="flex items-center gap-1.5 text-white font-bold">
                  <Briefcase className="w-4 h-4 text-neutral-400" />
                  SIDE
                </span>
                <span>&bull;</span>
                <span className="flex items-center gap-1.5 text-zinc-400">
                  <MapPin className="w-4 h-4 text-zinc-500" />
                  Bangalore, India
                </span>
                <span>&bull;</span>
                <span className="flex items-center gap-1.5 text-zinc-400">
                  <Calendar className="w-4 h-4 text-zinc-500" />
                  June 11, 2025 &ndash; August 14, 2026
                </span>
              </div>
            </div>

            {/* Quick Metrics in Black and Grey */}
            <div className="flex items-center gap-3">
              <div className="px-4 py-2.5 rounded-2xl bg-white/5 border border-white/10 text-center">
                <span className="font-display font-black text-xl text-white">4</span>
                <span className="text-[10px] font-mono text-zinc-400 block">Features POC</span>
              </div>
              <div className="px-4 py-2.5 rounded-2xl bg-white/5 border border-white/10 text-center">
                <span className="font-display font-black text-xl text-neutral-300">2</span>
                <span className="text-[10px] font-mono text-zinc-400 block">Mobile OS</span>
              </div>
              <div className="px-4 py-2.5 rounded-2xl bg-white/5 border border-white/10 text-center">
                <span className="font-display font-black text-xl text-zinc-200">JIRA</span>
                <span className="text-[10px] font-mono text-zinc-400 block">Lifecycle</span>
              </div>
            </div>
          </div>

          {/* Detailed Responsibilities Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 pt-8">
            {responsibilities.map((resp, i) => (
              <motion.div
                key={resp.title}
                initial={{ opacity: 0, y: 15 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.4, delay: i * 0.08 }}
                className="p-5 rounded-2xl bg-white/[0.03] hover:bg-white/[0.06] border border-white/5 hover:border-white/20 transition-all duration-300 flex flex-col justify-between"
              >
                <div>
                  <div className="inline-block px-2.5 py-0.5 rounded-md bg-white/5 border border-white/10 text-[10px] font-mono text-zinc-300 uppercase tracking-wider mb-3">
                    {resp.tag}
                  </div>
                  <h4 className="font-display font-bold text-base text-white mb-2 flex items-start gap-2">
                    <CheckCircle2 className="w-4 h-4 text-neutral-300 shrink-0 mt-0.5" />
                    <span>{resp.title}</span>
                  </h4>
                  <p className="text-xs sm:text-sm text-zinc-300 font-light leading-relaxed">
                    {resp.desc}
                  </p>
                </div>
              </motion.div>
            ))}
          </div>

        </div>
      </div>
    </section>
  );
};
