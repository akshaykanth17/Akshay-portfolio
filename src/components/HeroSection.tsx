import React, { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ArrowDown, ArrowUpRight, Download, Mail, Sparkles, CheckCircle2, ShieldCheck, Cpu } from 'lucide-react';
import portraitImg from '../assets/akshay.jpg';

// Strictly only Test Engineer and AI-Assisted Developer
const roles = [
  'Test Engineer',
  'AI-Assisted Developer'
];

export const HeroSection: React.FC = () => {
  const [roleIndex, setRoleIndex] = useState(0);
  const [mousePos, setMousePos] = useState({ x: 0, y: 0 });
  const heroRef = useRef<HTMLDivElement>(null);

  // Cycling roles interval
  useEffect(() => {
    const interval = setInterval(() => {
      setRoleIndex((prev) => (prev + 1) % roles.length);
    }, 3000);
    return () => clearInterval(interval);
  }, []);

  // Subtle 3D mouse tilt tracking
  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!heroRef.current) return;
    const rect = heroRef.current.getBoundingClientRect();
    const x = (e.clientX - rect.left) / rect.width - 0.5;
    const y = (e.clientY - rect.top) / rect.height - 0.5;
    setMousePos({ x, y });
  };

  const handleScrollTo = (id: string) => {
    const el = document.querySelector(id);
    if (el) el.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <section
      id="hero"
      ref={heroRef}
      onMouseMove={handleMouseMove}
      className="relative min-h-screen flex flex-col justify-between pt-28 sm:pt-36 pb-12 px-4 sm:px-8 lg:px-16 overflow-hidden bg-gradient-to-b from-[#050608] via-[#090a0d] to-[#0e1014]"
    >
      {/* Background Interactive Ambient Muted Greys */}
      <div
        className="absolute top-1/4 left-1/4 w-[450px] h-[450px] rounded-full bg-zinc-700/10 blur-[150px] pointer-events-none transition-transform duration-700 ease-out"
        style={{
          transform: `translate(${mousePos.x * 40}px, ${mousePos.y * 40}px)`,
        }}
      />
      <div
        className="absolute bottom-1/4 right-1/4 w-[400px] h-[400px] rounded-full bg-neutral-600/10 blur-[140px] pointer-events-none transition-transform duration-700 ease-out"
        style={{
          transform: `translate(${-mousePos.x * 35}px, ${-mousePos.y * 35}px)`,
        }}
      />

      {/* Tech Grid Background Accent */}
      <div className="absolute inset-0 bg-tech-grid opacity-30 pointer-events-none" />

      {/* Main Hero Grid */}
      <div className="relative max-w-7xl mx-auto w-full grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-8 items-center my-auto z-10">
        
        {/* Left Column: Headlines & Animated Roles */}
        <div className="lg:col-span-7 flex flex-col space-y-6 lg:space-y-8">
          
          {/* Eyebrow badge */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="inline-flex items-center gap-2.5 px-3.5 py-1.5 rounded-full bg-zinc-900/80 border border-white/10 w-fit backdrop-blur-md"
          >
            <span className="w-2 h-2 rounded-full bg-neutral-300 animate-pulse" />
            <span className="font-mono text-xs tracking-widest uppercase text-neutral-300">
              TEST ENGINEER &bull; AI-ASSISTED DEVELOPER
            </span>
          </motion.div>

          {/* Main Headline */}
          <div className="overflow-hidden">
            <motion.h1
              initial={{ y: 80, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
              className="font-display text-5xl sm:text-7xl lg:text-8xl font-black tracking-tight text-white leading-[1.05]"
            >
              HI, I'M <span className="bg-gradient-to-r from-white via-zinc-200 to-zinc-400 bg-clip-text text-transparent">AKSHAY.</span>
            </motion.h1>
          </div>

          {/* Dynamic Role Carousel Card with ONLY 2 Designations */}
          <div className="flex flex-col sm:flex-row items-start sm:items-center gap-3">
            <span className="font-display text-2xl sm:text-3xl lg:text-4xl font-medium text-zinc-400">
              I am a
            </span>

            {/* Interactive Switcher Box in Black and Grey */}
            <div className="h-14 sm:h-16 px-5 py-2 rounded-xl bg-zinc-900/90 border border-white/15 backdrop-blur-xl shadow-[0_10px_30px_rgba(0,0,0,0.6)] flex items-center justify-center min-w-[260px] sm:min-w-[320px] relative overflow-hidden">
              <div className="absolute left-3 top-0 bottom-0 w-1 bg-white/60 rounded-full" />
              <AnimatePresence mode="wait">
                <motion.div
                  key={roles[roleIndex]}
                  initial={{ y: 20, opacity: 0, filter: 'blur(4px)' }}
                  animate={{ y: 0, opacity: 1, filter: 'blur(0px)' }}
                  exit={{ y: -20, opacity: 0, filter: 'blur(4px)' }}
                  transition={{ duration: 0.4, ease: [0.22, 1, 0.36, 1] }}
                  className="font-display font-bold text-lg sm:text-xl lg:text-2xl text-white tracking-wide flex items-center gap-2 pl-2"
                >
                  <Sparkles className="w-4 h-4 text-neutral-300 shrink-0" />
                  <span>{roles[roleIndex]}</span>
                </motion.div>
              </AnimatePresence>
            </div>
          </div>

          {/* Subtitle statement */}
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.3 }}
            className="text-base sm:text-lg text-zinc-300 max-w-xl font-light leading-relaxed"
          >
            MCA graduate with dedicated QA testing experience in Android &amp; iOS mobile ecosystems, defect lifecycle management, and full-stack AI-assisted application building.
          </motion.p>

          {/* Call-to-action Action Buttons in Black & Grey Mix */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.4 }}
            className="flex flex-wrap items-center gap-4 pt-2"
          >
            {/* Explore My Work */}
            <button
              onClick={() => handleScrollTo('#projects')}
              className="group relative inline-flex items-center gap-3 px-7 py-3.5 rounded-full bg-white hover:bg-neutral-200 text-black font-semibold text-sm tracking-wide shadow-[0_10px_30px_rgba(255,255,255,0.15)] transition-all duration-300 hover:scale-105 active:scale-95 overflow-hidden"
            >
              <span>Explore My Work</span>
              <ArrowUpRight className="w-4 h-4 transition-transform group-hover:translate-x-1 group-hover:-translate-y-1" />
            </button>

            {/* Download CV */}
            <a
              href="./Akshay_Kanth_C_CV_.pdf"
              download="Akshay_Kanth_C_CV.pdf"
              className="group inline-flex items-center gap-2.5 px-6 py-3.5 rounded-full bg-zinc-900/80 hover:bg-zinc-800 text-zinc-200 border border-white/15 font-medium text-sm tracking-wide backdrop-blur-md transition-all duration-300 hover:border-white/30 hover:scale-105 active:scale-95"
            >
              <Download className="w-4 h-4 text-neutral-300" />
              <span>Download CV</span>
            </a>

            {/* Contact Me */}
            <button
              onClick={() => handleScrollTo('#contact')}
              className="inline-flex items-center gap-2 px-6 py-3.5 rounded-full text-zinc-400 hover:text-white font-medium text-sm tracking-wide hover:bg-white/5 transition-all duration-200"
            >
              <Mail className="w-4 h-4" />
              <span>Contact Me</span>
            </button>
          </motion.div>

          {/* Micro Trust Metrics */}
          <div className="grid grid-cols-3 gap-4 pt-4 border-t border-white/10 max-w-lg">
            <div>
              <div className="font-display font-extrabold text-2xl text-white">4+</div>
              <div className="text-[11px] font-mono text-zinc-400 tracking-wider">PROJECT POCs</div>
            </div>
            <div>
              <div className="font-display font-extrabold text-2xl text-neutral-300">100%</div>
              <div className="text-[11px] font-mono text-zinc-400 tracking-wider">DEFECT RESOLUTION</div>
            </div>
            <div>
              <div className="font-display font-extrabold text-2xl text-zinc-200">UAE 1M</div>
              <div className="text-[11px] font-mono text-zinc-400 tracking-wider">PROMPTERS CERTIFIED</div>
            </div>
          </div>
        </div>

        {/* Right Column: Akshay's Portrait with 3D Tilt & Floating Badges */}
        <div className="lg:col-span-5 flex justify-center items-center relative">
          
          {/* Subtle Ambient Back-light */}
          <div className="absolute w-[340px] h-[440px] rounded-3xl bg-zinc-600/15 blur-3xl -z-10" />

          {/* Portrait Container with 3D Tilt in Black/Grey Frame */}
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 1, ease: [0.16, 1, 0.3, 1] }}
            className="relative w-full max-w-[360px] sm:max-w-[400px] aspect-[4/5] rounded-3xl p-2.5 bg-gradient-to-b from-white/15 via-zinc-800/40 to-black/80 border border-white/15 shadow-[0_30px_70px_rgba(0,0,0,0.9)] backdrop-blur-md group"
            style={{
              transform: `perspective(1000px) rotateY(${mousePos.x * 12}deg) rotateX(${-mousePos.y * 12}deg)`,
              transition: 'transform 0.15s ease-out',
            }}
          >
            {/* The Real Portrait Image */}
            <div className="relative w-full h-full rounded-2xl overflow-hidden bg-zinc-950">
              <img
                src={portraitImg}
                alt="Akshay Kanth C — Test Engineer and AI-Assisted Developer"
                className="w-full h-full object-cover object-top filter brightness-[1.02] contrast-[1.04] group-hover:scale-105 transition-transform duration-700 ease-out"
                loading="eager"
              />

              {/* Cinematic Vignette & Bottom Gradient */}
              <div className="absolute inset-0 bg-gradient-to-t from-[#060709] via-transparent to-transparent opacity-80" />

              {/* Floating Badge: Ability Card in Black and Grey */}
              <div className="absolute bottom-5 left-5 right-5 p-3.5 rounded-xl bg-zinc-950/90 backdrop-blur-xl border border-white/15 flex items-center justify-between shadow-2xl">
                <div>
                  <div className="flex items-center gap-1.5 text-xs font-bold text-white">
                    <ShieldCheck className="w-4 h-4 text-neutral-300" />
                    <span>AKSHAY KANTH C</span>
                  </div>
                  <div className="text-[10px] font-mono text-zinc-400">
                    Test Engineer &bull; AI-Assisted Developer
                  </div>
                </div>
                <span className="px-2.5 py-1 rounded-full bg-white/10 border border-white/20 text-[10px] font-mono text-zinc-300">
                  DUBAI, UAE
                </span>
              </div>
            </div>

            {/* Top Floating Badge: Test Engineer */}
            <div
              className="absolute -top-3 -right-3 px-3.5 py-2 rounded-xl bg-zinc-900/90 border border-white/20 shadow-xl backdrop-blur-xl flex items-center gap-2 text-xs font-semibold text-white animate-float"
            >
              <CheckCircle2 className="w-4 h-4 text-neutral-300" />
              <span>Test Engineer</span>
            </div>

            {/* Bottom-left Floating Badge: AI-Assisted Developer */}
            <div
              className="absolute -bottom-3 -left-3 px-3.5 py-2 rounded-xl bg-zinc-900/90 border border-white/20 shadow-xl backdrop-blur-xl flex items-center gap-2 text-xs font-semibold text-white"
              style={{ animation: 'float 5s ease-in-out infinite reverse' }}
            >
              <Cpu className="w-4 h-4 text-neutral-300" />
              <span>AI-Assisted Developer</span>
            </div>
          </motion.div>
        </div>
      </div>

      {/* Bottom Bar: Status & Scroll Indicator */}
      <div className="relative max-w-7xl mx-auto w-full flex flex-col sm:flex-row items-center justify-between pt-8 border-t border-white/5 text-xs font-mono text-zinc-400 gap-4 z-10">
        <div className="flex items-center gap-4">
          <span className="flex items-center gap-1.5 text-neutral-300">
            <span className="w-2 h-2 rounded-full bg-white inline-block animate-pulse" />
            AVAILABLE FOR OPPORTUNITIES
          </span>
          <span className="hidden sm:inline">&bull;</span>
          <span className="hidden sm:inline">DUBAI &bull; OPEN TO RELOCATION &bull; REMOTE</span>
        </div>

        <button
          onClick={() => handleScrollTo('#doors')}
          className="flex items-center gap-2 text-zinc-300 hover:text-white transition-colors group cursor-pointer"
        >
          <span className="tracking-widest">ENTER 3D SANCTUARY</span>
          <ArrowDown className="w-3.5 h-3.5 animate-bounce text-neutral-400" />
        </button>
      </div>
    </section>
  );
};
