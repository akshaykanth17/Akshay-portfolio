import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  FolderGit2, 
  Layers, 
  Cpu, 
  CheckCircle, 
  ChevronRight,
  Lock,
  X,
  ExternalLink
} from 'lucide-react';

interface Project {
  id: string;
  number: string;
  title: string;
  badge: string;
  category: string;
  tagline: string;
  description: string;
  githubUrl: string;
  techStack: string[];
  features: string[];
  architecture: {
    frontend: string;
    backend: string;
    database: string;
    devopsAi: string;
  };
  mockupType: 'mobile-app' | 'browser-agent';
}

const projects: Project[] = [
  {
    id: 'heartsync',
    number: '01',
    title: 'HEARTSYNC',
    badge: 'Full-Stack & Vibe Coding',
    category: 'Real-Time Social Platform',
    githubUrl: 'https://github.com/akshaykanth17/HeartSync',
    tagline: 'High-concurrency social web application with gesture-based interactions & real-time messaging.',
    description:
      'A comprehensive full-stack social web platform scaffolded and engineered using Google Antigravity AI and a modern vibe-coding workflow. Features low-latency Socket.IO communications, BullMQ background job queues with Redis, geolocation-filtered discovery, and military-grade Firebase Authentication.',
    techStack: [
      'React 18',
      'TypeScript',
      'Node.js',
      'Express',
      'Prisma ORM',
      'PostgreSQL',
      'Socket.IO',
      'BullMQ',
      'Redis',
      'Firebase Auth',
      'Docker Compose',
      'Framer Motion',
      'Sharp'
    ],
    features: [
      'Real-Time Messaging: Instant socket synchronization with typing status and receipt acknowledgment.',
      'Asynchronous Background Queues: BullMQ + Redis pipeline for email dispatch, notifications, and media processing.',
      'Gesture UI: Fluid Tinder-style card swiping, drag interactions, and spring physics powered by Framer Motion.',
      'Image Optimization: Automated image pipeline using Sharp for EXIF metadata sanitization and responsive webp resizing.',
      'Enterprise Security: Firebase Auth with custom JWT claims, bcrypt, Zod schema validation, and rate limiting.'
    ],
    architecture: {
      frontend: 'React 18, TypeScript, Tailwind CSS, Framer Motion',
      backend: 'Node.js, Express, Socket.IO, BullMQ, Redis',
      database: 'PostgreSQL with Prisma ORM migrations',
      devopsAi: 'Google Antigravity AI, Docker Compose, Render CI/CD'
    },
    mockupType: 'mobile-app'
  },
  {
    id: 'ai-tester',
    number: '02',
    title: 'AI SOFTWARE TESTING AGENT',
    badge: 'Autonomous QA & GenAI',
    category: 'Intelligent Test Automation',
    githubUrl: 'https://github.com/akshaykanth17/QA-AI-Agent',
    tagline: 'Autonomous QA agent creating test matrices, driving headless browsers, and diagnosing root causes.',
    description:
      'An end-to-end intelligent QA system engineered to bridge the gap between human requirements and verified test execution. The agent ingests plain-text specs, synthesizes positive/negative/boundary test matrices, controls live browsers via Playwright, snaps visual evidence, and generates actionable failure diagnostics without hallucination.',
    techStack: [
      'Python',
      'Playwright',
      'Streamlit',
      'OpenAI API (GPT-4o)',
      'SQLite',
      'Pandas',
      'ReportLab (PDF)',
      'Pytest'
    ],
    features: [
      'Automated Test Generation: AI-driven synthesis of positive, negative, edge-case, and boundary test scenarios.',
      'Live Playwright Browser Execution: Headless and headed test running with real-time DOM interaction and visual screenshot capture.',
      'Zero-Hallucination Failure Diagnostics: AI analysis comparing expected vs. actual DOM state to isolate root causes.',
      '7-Tab Interactive Dashboard: Built in Streamlit for test authoring, live run monitoring, audit history, and Excel/PDF export.',
      'Hardened Security Controls: Strict domain whitelisting, private IP blocklists, and automatic password masking in test logs.'
    ],
    architecture: {
      frontend: 'Streamlit 7-tab analytical dashboard, dynamic reporting',
      backend: 'Python 3.12, Asyncio, Playwright browser engine',
      database: 'SQLite local audit database & schema storage',
      devopsAi: 'OpenAI API, Prompt Engineering, Test Harness'
    },
    mockupType: 'browser-agent'
  }
];

export const ProjectShowcase: React.FC = () => {
  const [selectedProject, setSelectedProject] = useState<Project | null>(null);

  return (
    <section id="projects" className="relative py-28 sm:py-36 px-4 sm:px-8 lg:px-16 bg-[#090a10] overflow-hidden">
      {/* Background glow & grid */}
      <div className="absolute inset-0 bg-tech-grid opacity-20 pointer-events-none" />
      <div className="absolute top-1/3 right-10 w-[500px] h-[500px] rounded-full bg-blue-600/5 blur-[150px] pointer-events-none" />

      <div className="relative max-w-7xl mx-auto">
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-16">
          <div>
            <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-white/5 border border-white/10 backdrop-blur-md mb-4">
              <FolderGit2 className="w-3.5 h-3.5 text-blue-400" />
              <span className="font-mono text-xs tracking-widest uppercase text-slate-300">
                CHAPTER 06 &bull; FEATURED ARCHITECTURE
              </span>
            </div>
            <h2 className="font-display text-4xl sm:text-6xl font-black text-white tracking-tight leading-tight">
              ENGINEERED <br />
              <span className="bg-gradient-to-r from-blue-400 via-sky-300 to-indigo-300 bg-clip-text text-transparent">
                PROJECT PORTFOLIO.
              </span>
            </h2>
          </div>
          <p className="text-slate-400 font-light max-w-md text-sm sm:text-base">
            Detailed case studies of full-stack web applications and autonomous AI testing agents engineered with production-grade rigor.
          </p>
        </div>

        {/* Project Cards Sequence */}
        <div className="space-y-24">
          {projects.map((project, index) => (
            <div
              key={project.id}
              className={`relative rounded-3xl bg-gradient-to-b from-[#121524]/90 to-[#0a0c14]/95 border border-white/10 p-6 sm:p-10 lg:p-12 shadow-2xl backdrop-blur-xl grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-center group`}
            >
              {/* Massive Ambient Project Number in Background */}
              <div className="absolute top-4 right-8 font-display font-black text-8xl sm:text-9xl text-white/[0.03] select-none pointer-events-none">
                {project.number}
              </div>

              {/* Text & Content Column (7 cols) */}
              <div className="lg:col-span-7 flex flex-col space-y-6 z-10">
                <div className="flex items-center gap-3">
                  <span className="px-3 py-1 rounded-full bg-blue-500/20 text-blue-400 border border-blue-500/30 font-mono text-xs font-semibold uppercase tracking-wider">
                    {project.badge}
                  </span>
                  <span className="text-xs font-mono text-slate-400">
                    {project.category}
                  </span>
                </div>

                <div>
                  <h3 className="font-display text-3xl sm:text-5xl font-black text-white tracking-tight">
                    {project.title}
                  </h3>
                  <p className="text-sm sm:text-base text-blue-300 font-mono mt-1">
                    {project.tagline}
                  </p>
                </div>

                <p className="text-slate-300 font-light text-sm sm:text-base leading-relaxed">
                  {project.description}
                </p>

                {/* Key Architectural Highlights */}
                <div className="space-y-2.5 pt-2">
                  {project.features.slice(0, 3).map((feat, fIdx) => (
                    <div key={fIdx} className="flex items-start gap-2.5 text-xs sm:text-sm text-slate-300">
                      <CheckCircle className="w-4 h-4 text-emerald-400 shrink-0 mt-0.5" />
                      <span>{feat}</span>
                    </div>
                  ))}
                </div>

                {/* Tech Pills */}
                <div className="flex flex-wrap gap-2 pt-2">
                  {project.techStack.map((tech) => (
                    <span
                      key={tech}
                      className="px-3 py-1 rounded-lg bg-white/5 border border-white/10 text-xs font-mono text-slate-300"
                    >
                      {tech}
                    </span>
                  ))}
                </div>

                {/* Action Buttons */}
                <div className="flex items-center gap-4 pt-4">
                  <button
                    onClick={() => setSelectedProject(project)}
                    className="inline-flex items-center gap-2.5 px-6 py-3 rounded-full bg-blue-600 hover:bg-blue-500 text-white font-semibold text-xs tracking-wider shadow-lg shadow-blue-600/30 transition-all duration-200 hover:scale-105 active:scale-95"
                  >
                    <span>View Architecture Details</span>
                    <ChevronRight className="w-4 h-4" />
                  </button>
                  <a
                    href={project.githubUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-2 px-4 py-3 rounded-full bg-white/5 hover:bg-white/10 text-slate-200 border border-white/10 text-xs font-semibold tracking-wider transition-all duration-200 hover:border-white/30 hover:scale-105"
                  >
                    <span>GitHub</span>
                    <ExternalLink className="w-3.5 h-3.5 text-blue-400" />
                  </a>
                </div>
              </div>

              {/* Device / Interactive Visual Column (5 cols) */}
              <div className="lg:col-span-5 flex justify-center items-center z-10">
                {project.mockupType === 'mobile-app' ? (
                  /* Phone Mockup for HeartSync */
                  <div className="relative w-full max-w-[280px] sm:max-w-[320px] aspect-[9/19] rounded-[42px] p-3 bg-gradient-to-b from-slate-700 via-slate-900 to-black border-[3px] border-slate-700 shadow-[0_25px_60px_rgba(0,0,0,0.9)] transform-style-3d group-hover:rotate-1 transition-transform duration-500">
                    {/* Speaker notch */}
                    <div className="absolute top-4 left-1/2 -translate-x-1/2 w-24 h-4 bg-black rounded-full z-20 flex items-center justify-center">
                      <div className="w-3 h-3 rounded-full bg-slate-900 border border-slate-800" />
                    </div>

                    {/* Screen Content */}
                    <div className="w-full h-full rounded-[32px] overflow-hidden bg-slate-950 flex flex-col justify-between p-4 relative border border-white/5">
                      {/* App Header */}
                      <div className="pt-6 pb-2 flex items-center justify-between border-b border-white/10">
                        <div className="flex items-center gap-2">
                          <div className="w-6 h-6 rounded-full bg-gradient-to-tr from-pink-500 to-rose-500 flex items-center justify-center text-[10px] font-black text-white">
                            ♥
                          </div>
                          <span className="font-display font-bold text-xs text-white">HeartSync</span>
                        </div>
                        <span className="text-[9px] font-mono text-emerald-400 bg-emerald-500/10 px-2 py-0.5 rounded-full border border-emerald-500/20">
                          Socket.IO Live
                        </span>
                      </div>

                      {/* Mockup Body: Social Profile Card */}
                      <div className="my-auto py-2 flex flex-col items-center text-center">
                        <div className="w-full aspect-[4/5] rounded-2xl bg-gradient-to-br from-indigo-950 via-slate-900 to-pink-950/40 p-4 border border-white/10 flex flex-col justify-end text-left relative overflow-hidden shadow-inner">
                          <div className="absolute top-3 right-3 px-2 py-0.5 rounded-full bg-black/60 backdrop-blur-md text-[9px] font-mono text-slate-300">
                            2.4 km away
                          </div>
                          <div className="w-12 h-12 rounded-full bg-blue-600/30 border border-blue-400/40 mb-2 flex items-center justify-center text-xl">
                            👋
                          </div>
                          <h4 className="font-display font-bold text-sm text-white">Sophia, 24</h4>
                          <p className="text-[10px] text-slate-400 line-clamp-2">
                            Software engineer passionate about AI models &amp; cafe hopping.
                          </p>
                          <div className="flex gap-1 mt-2">
                            <span className="px-1.5 py-0.5 rounded bg-white/10 text-[8px] text-slate-300">Design</span>
                            <span className="px-1.5 py-0.5 rounded bg-white/10 text-[8px] text-slate-300">AI</span>
                            <span className="px-1.5 py-0.5 rounded bg-white/10 text-[8px] text-slate-300">Music</span>
                          </div>
                        </div>

                        {/* Gesture buttons */}
                        <div className="flex items-center justify-center gap-4 mt-3">
                          <div className="w-10 h-10 rounded-full bg-red-500/10 border border-red-500/30 flex items-center justify-center text-red-400 text-xs font-bold shadow-lg">
                            ✕
                          </div>
                          <div className="w-12 h-12 rounded-full bg-gradient-to-tr from-rose-500 to-pink-500 flex items-center justify-center text-white text-base font-bold shadow-lg shadow-pink-500/30">
                            ♥
                          </div>
                          <div className="w-10 h-10 rounded-full bg-blue-500/10 border border-blue-500/30 flex items-center justify-center text-blue-400 text-xs font-bold shadow-lg">
                            ★
                          </div>
                        </div>
                      </div>

                      {/* App Footer */}
                      <div className="pt-2 text-center text-[9px] font-mono text-slate-400 border-t border-white/5">
                        Interactive Gesture UI &bull; Conceptual Mockup
                      </div>
                    </div>
                  </div>
                ) : (
                  /* Browser Dashboard Mockup for AI Testing Agent */
                  <div className="w-full max-w-[420px] rounded-2xl bg-slate-950 border border-white/15 shadow-[0_25px_60px_rgba(0,0,0,0.9)] overflow-hidden">
                    {/* Browser Chrome Header */}
                    <div className="px-4 py-2.5 bg-slate-900 border-b border-white/10 flex items-center justify-between">
                      <div className="flex items-center gap-1.5">
                        <div className="w-2.5 h-2.5 rounded-full bg-red-500/80" />
                        <div className="w-2.5 h-2.5 rounded-full bg-yellow-500/80" />
                        <div className="w-2.5 h-2.5 rounded-full bg-green-500/80" />
                      </div>
                      <div className="px-3 py-1 rounded bg-black/50 text-[10px] font-mono text-slate-400 border border-white/5 flex items-center gap-1.5">
                        <Lock className="w-2.5 h-2.5 text-emerald-400" />
                        <span>localhost:8501/stream-agent</span>
                      </div>
                      <div className="w-4" />
                    </div>

                    {/* Streamlit 7-Tab Preview */}
                    <div className="p-4 space-y-3 font-mono text-xs">
                      {/* Tab bar */}
                      <div className="flex items-center gap-1 border-b border-white/10 pb-2 text-[10px] overflow-x-auto">
                        <span className="px-2 py-0.5 rounded bg-blue-500/20 text-blue-300 font-bold border border-blue-500/30">
                          1. Requirements
                        </span>
                        <span className="px-2 py-0.5 text-slate-400">2. Test Cases</span>
                        <span className="px-2 py-0.5 text-slate-400">3. Playwright</span>
                        <span className="px-2 py-0.5 text-slate-400">4. Diagnostic</span>
                      </div>

                      {/* Live Execution Terminal Card */}
                      <div className="p-3 rounded-lg bg-black/80 border border-white/10 space-y-1.5">
                        <div className="flex items-center justify-between text-[10px]">
                          <span className="text-emerald-400 flex items-center gap-1">
                            <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-ping inline-block" />
                            PLAYWRIGHT ENGINE ACTIVE
                          </span>
                          <span className="text-slate-400">Target: /checkout-flow</span>
                        </div>
                        <div className="text-[10px] text-slate-300 font-mono space-y-0.5">
                          <p className="text-slate-400">&gt; Synthesizing 14 boundary test assertions...</p>
                          <p className="text-blue-300">&gt; Chromium launched headless (1920x1080)</p>
                          <p className="text-slate-400">&gt; Filling [data-testid=email] with valid token</p>
                          <p className="text-emerald-400 font-semibold">&gt; Assert #08 PASSED (Status 200 OK)</p>
                          <p className="text-amber-300">&gt; Snapshot proof captured: run_049.png</p>
                        </div>
                      </div>

                      {/* Metrics bar */}
                      <div className="grid grid-cols-3 gap-2 text-center pt-1">
                        <div className="p-2 rounded bg-white/5 border border-white/5">
                          <div className="font-bold text-white text-xs">14 / 14</div>
                          <div className="text-[9px] text-slate-400">Tests Run</div>
                        </div>
                        <div className="p-2 rounded bg-white/5 border border-white/5">
                          <div className="font-bold text-emerald-400 text-xs">0 Fails</div>
                          <div className="text-[9px] text-slate-400">Defect State</div>
                        </div>
                        <div className="p-2 rounded bg-white/5 border border-white/5">
                          <div className="font-bold text-blue-400 text-xs">PDF/XLSX</div>
                          <div className="text-[9px] text-slate-400">Export Ready</div>
                        </div>
                      </div>

                      <div className="text-center text-[9px] text-slate-400 pt-1">
                        Playwright &bull; OpenAI &bull; Streamlit Mockup
                      </div>
                    </div>
                  </div>
                )}
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Case Study Modal Drawer */}
      <AnimatePresence>
        {selectedProject && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6 bg-black/80 backdrop-blur-xl"
          >
            <motion.div
              initial={{ scale: 0.95, y: 20 }}
              animate={{ scale: 1, y: 0 }}
              exit={{ scale: 0.95, y: 20 }}
              className="relative w-full max-w-3xl max-h-[90vh] overflow-y-auto rounded-3xl bg-[#0f121d] border border-white/20 p-6 sm:p-8 text-white shadow-2xl"
            >
              {/* Close Button */}
              <button
                onClick={() => setSelectedProject(null)}
                className="absolute top-6 right-6 p-2 rounded-full bg-white/10 hover:bg-white/20 transition-colors"
              >
                <X className="w-5 h-5 text-slate-300" />
              </button>

              <div className="flex items-center gap-2 mb-3">
                <span className="px-3 py-1 rounded-full bg-blue-500/20 text-blue-400 border border-blue-500/30 text-xs font-mono font-bold">
                  {selectedProject.badge}
                </span>
                <span className="text-xs font-mono text-slate-400">
                  Detailed Architectural Breakdown
                </span>
              </div>

              <h3 className="font-display text-2xl sm:text-4xl font-black mb-2">
                {selectedProject.title}
              </h3>
              <p className="text-slate-300 text-sm sm:text-base mb-6 font-light">
                {selectedProject.description}
              </p>

              {/* Architecture Matrix */}
              <div className="mb-6">
                <h4 className="font-display font-bold text-base text-blue-300 mb-3 flex items-center gap-2">
                  <Layers className="w-4 h-4" />
                  <span>Subsystem Architecture</span>
                </h4>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-xs font-mono">
                  <div className="p-3 rounded-xl bg-white/5 border border-white/10">
                    <span className="text-slate-400 block mb-1">FRONTEND LAYER:</span>
                    <span className="text-white font-semibold">{selectedProject.architecture.frontend}</span>
                  </div>
                  <div className="p-3 rounded-xl bg-white/5 border border-white/10">
                    <span className="text-slate-400 block mb-1">BACKEND ENGINE:</span>
                    <span className="text-white font-semibold">{selectedProject.architecture.backend}</span>
                  </div>
                  <div className="p-3 rounded-xl bg-white/5 border border-white/10">
                    <span className="text-slate-400 block mb-1">DATABASE &amp; PERSISTENCE:</span>
                    <span className="text-white font-semibold">{selectedProject.architecture.database}</span>
                  </div>
                  <div className="p-3 rounded-xl bg-white/5 border border-white/10">
                    <span className="text-slate-400 block mb-1">DEVOPS &amp; AI HARNESS:</span>
                    <span className="text-white font-semibold">{selectedProject.architecture.devopsAi}</span>
                  </div>
                </div>
              </div>

              {/* All Engineered Features */}
              <div>
                <h4 className="font-display font-bold text-base text-blue-300 mb-3 flex items-center gap-2">
                  <Cpu className="w-4 h-4" />
                  <span>Key Specifications &amp; Capabilities</span>
                </h4>
                <div className="space-y-2">
                  {selectedProject.features.map((feat, fIdx) => (
                    <div key={fIdx} className="p-3 rounded-xl bg-white/[0.03] border border-white/5 flex items-start gap-3 text-xs sm:text-sm text-slate-300">
                      <CheckCircle className="w-4 h-4 text-emerald-400 shrink-0 mt-0.5" />
                      <span>{feat}</span>
                    </div>
                  ))}
                </div>
              </div>

              {/* Bottom Notice */}
              <div className="mt-8 pt-4 border-t border-white/10 flex flex-col sm:flex-row items-center justify-between text-xs font-mono text-slate-400 gap-2">
                <span>Directly from Akshay Kanth C's Verified Resume Portfolio</span>
                <div className="flex items-center gap-3">
                  <a
                    href={selectedProject.githubUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-white/10 hover:bg-white/20 text-white font-mono text-xs transition-colors"
                  >
                    <span>View on GitHub</span>
                    <ExternalLink className="w-3.5 h-3.5" />
                  </a>
                  <button
                    onClick={() => setSelectedProject(null)}
                    className="px-5 py-2 rounded-full bg-blue-600 hover:bg-blue-500 text-white font-semibold transition-colors"
                  >
                    Close Case Study
                  </button>
                </div>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  );
};
