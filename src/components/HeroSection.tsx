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
  const [spotlightPos, setSpotlightPos] = useState({ x: 190, y: 230 });
  const [isHoveringPortrait, setIsHoveringPortrait] = useState(false);
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

  // Interactive spotlight mouse tracker on portrait image
  const handlePortraitMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    const rect = e.currentTarget.getBoundingClientRect();
    setSpotlightPos({
      x: e.clientX - rect.left,
      y: e.clientY - rect.top,
    });
    if (!isHoveringPortrait) setIsHoveringPortrait(true);
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
      className="relative min-h-screen flex flex-col justify-between pt-28 sm:pt-36 pb-12 px-4 sm:px-8 lg:px-16 overflow-hidden bg-[#07080b]"
    >
      {/* Foggy and Blurry White Atmospheric Background */}
      {/* 1. Large Top-Center Fog Cloud */}
      <div className="absolute -top-32 left-1/2 -translate-x-1/2 w-[950px] h-[650px] rounded-full bg-white/[0.14] blur-[160px] pointer-events-none fog-drift-slow" />

      {/* 2. Fog Bloom Behind Portrait (Right) */}
      <div className="absolute top-1/6 -right-16 w-[700px] h-[750px] rounded-full bg-white/[0.18] blur-[140px] pointer-events-none" />

      {/* 3. Fog Bloom Behind Headlines (Left) */}
      <div className="absolute top-1/3 -left-24 w-[650px] h-[600px] rounded-full bg-zinc-200/[0.13] blur-[150px] pointer-events-none" />

      {/* 4. Ambient Ethereal White Mist Gradient */}
      <div className="absolute inset-0 fog-ambient-mist pointer-events-none opacity-90" />

      {/* 5. Bottom Mist Ribbon Layer */}
      <div className="absolute bottom-0 inset-x-0 h-80 bg-gradient-to-t from-white/[0.07] via-zinc-400/[0.03] to-transparent blur-3xl pointer-events-none" />

      {/* Tech Grid Background Accent with subtle opacity */}
      <div className="absolute inset-0 bg-tech-grid opacity-20 pointer-events-none" />

      {/* Main Hero Grid */}
      <div className="relative max-w-7xl mx-auto w-full grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-8 items-center my-auto z-10">
        
        {/* Left Column: Headlines & Animated Roles */}
        <div className="lg:col-span-7 flex flex-col space-y-6 lg:space-y-8">
          
          {/* Eyebrow badge */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="inline-flex items-center gap-2.5 px-3.5 py-1.5 rounded-full bg-zinc-900/90 border border-amber-400/25 w-fit backdrop-blur-md shadow-[0_0_15px_rgba(245,158,11,0.1)]"
          >
            <span className="w-2 h-2 rounded-full bg-amber-400 animate-pulse" />
            <span className="font-mono text-xs tracking-widest uppercase text-amber-200">
              TEST ENGINEER &bull; AI-ASSISTED DEVELOPER
            </span>
          </motion.div>

          {/* Main Headline with Striking Red to Warm Gold/Yellow Gradient */}
          <div className="overflow-hidden">
            <motion.h1
              initial={{ y: 80, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
              className="font-display text-5xl sm:text-7xl lg:text-8xl font-black tracking-tight text-white leading-[1.05]"
            >
              HI, I'M <span className="bg-gradient-to-r from-red-500 via-amber-400 to-yellow-300 bg-clip-text text-transparent filter drop-shadow-[0_0_25px_rgba(245,158,11,0.35)]">AKSHAY.</span>
            </motion.h1>
          </div>

          {/* Task 2: Cyberpunk Glitch Role Switcher (Accurately matches reference image) */}
          <div className="relative py-2">
            <div className="cyber-glitch-wrapper flex flex-col sm:flex-row items-start sm:items-center gap-3">
              {/* Horizontal ambient neon speedlines */}
              <div className="cyber-glitch-streak-left hidden sm:block" />
              <div className="cyber-glitch-streak-right hidden sm:block" />
              <div className="cyber-glitch-streak-mid hidden sm:block" />

              {/* Glitched "I am a" text */}
              <span className="glitch-text-intro">
                I am a
              </span>

              {/* Glitched Pill Box with Neon Cyan / Magenta Border */}
              <div className="cyber-glitch-box relative">
                {/* Vertical Cyan to Magenta Neon Indicator */}
                <div className="cyber-glitch-indicator" />

                <AnimatePresence mode="wait">
                  <motion.div
                    key={roles[roleIndex]}
                    initial={{ y: 15, opacity: 0, filter: 'blur(3px)' }}
                    animate={{ y: 0, opacity: 1, filter: 'blur(0px)' }}
                    exit={{ y: -15, opacity: 0, filter: 'blur(3px)' }}
                    transition={{ duration: 0.35, ease: [0.22, 1, 0.36, 1] }}
                    className="cyber-glitch-text pl-1"
                  >
                    <Sparkles className="w-4 h-4 text-cyan-300 shrink-0" />
                    <span>{roles[roleIndex]}</span>
                  </motion.div>
                </AnimatePresence>
              </div>

              {/* Status Neon Dot on the right (matches reference image) */}
              <div className="hidden sm:flex items-center justify-center w-6 h-6 rounded-full bg-black/60 border border-cyan-400/40 shadow-[0_0_12px_rgba(0,240,255,0.6)]">
                <span className="w-2 h-2 rounded-full bg-white animate-pulse" />
              </div>
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

          {/* Micro Trust Metrics with Red & Gold Yellow Color Accents */}
          <div className="grid grid-cols-3 gap-4 pt-4 border-t border-white/10 max-w-lg">
            <div>
              <div className="font-display font-extrabold text-2xl text-amber-400">4+</div>
              <div className="text-[11px] font-mono text-zinc-400 tracking-wider">PROJECT POCs</div>
            </div>
            <div>
              <div className="font-display font-extrabold text-2xl text-red-400">100%</div>
              <div className="text-[11px] font-mono text-zinc-400 tracking-wider">DEFECT RESOLUTION</div>
            </div>
            <div>
              <div className="font-display font-extrabold text-2xl text-yellow-300">UAE 1M</div>
              <div className="text-[11px] font-mono text-zinc-400 tracking-wider">PROMPTERS CERTIFIED</div>
            </div>
          </div>
        </div>

        {/* Right Column: Akshay's Portrait with 3D Tilt & Floating Badges */}
        <div className="lg:col-span-5 flex justify-center items-center relative py-6 overflow-visible">
          
          {/* Luminous Foggy and Blurry White Backlight behind Portrait */}
          <div className="absolute w-[420px] h-[520px] rounded-full bg-white/[0.22] blur-[110px] -z-10 pointer-events-none" />

          {/* Portrait Container with 3D Tilt in Black/Grey Frame */}
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 1, ease: [0.16, 1, 0.3, 1] }}
            className="relative w-full max-w-[360px] sm:max-w-[400px] aspect-[4/5] rounded-3xl p-2.5 bg-gradient-to-b from-white/20 via-zinc-800/40 to-black/90 border border-white/20 shadow-[0_30px_70px_rgba(0,0,0,0.9)] backdrop-blur-md group overflow-visible"
            style={{
              transform: `perspective(1000px) rotateY(${mousePos.x * 12}deg) rotateX(${-mousePos.y * 12}deg)`,
              transformStyle: 'preserve-3d',
              transition: 'transform 0.15s ease-out',
            }}
          >
            {/* The Portrait Image with Interactive Spotlight Color Reveal & Zoom */}
            <div
              onMouseMove={handlePortraitMouseMove}
              onMouseEnter={() => setIsHoveringPortrait(true)}
              onMouseLeave={() => setIsHoveringPortrait(false)}
              className="relative w-full h-full rounded-2xl overflow-hidden bg-zinc-950 cursor-crosshair group/portrait"
            >
              {/* Layer 1: Base Black and White Image (Perfect Zoomed Framing) */}
              <img
                src={portraitImg}
                alt="Akshay Kanth C — Test Engineer and AI-Assisted Developer"
                className="w-full h-full object-cover object-top filter grayscale contrast-[1.12] brightness-[0.98] transition-transform duration-700 ease-out scale-[1.26] origin-[center_28%] pointer-events-none"
                loading="eager"
              />

              {/* Layer 2: Color Image revealed ONLY at the mouse point area via dynamic radial gradient mask */}
              <div
                className="absolute inset-0 pointer-events-none transition-opacity duration-300"
                style={{
                  opacity: isHoveringPortrait ? 1 : 0,
                  WebkitMaskImage: `radial-gradient(circle 140px at ${spotlightPos.x}px ${spotlightPos.y}px, black 35%, rgba(0,0,0,0.7) 65%, transparent 100%)`,
                  maskImage: `radial-gradient(circle 140px at ${spotlightPos.x}px ${spotlightPos.y}px, black 35%, rgba(0,0,0,0.7) 65%, transparent 100%)`,
                }}
              >
                <img
                  src={portraitImg}
                  alt=""
                  aria-hidden="true"
                  className="w-full h-full object-cover object-top filter contrast-[1.05] brightness-[1.02] scale-[1.26] origin-[center_28%]"
                />
              </div>

              {/* Cinematic Vignette & Bottom Gradient */}
              <div className="absolute inset-0 bg-gradient-to-t from-[#060709] via-transparent to-transparent opacity-85 pointer-events-none z-10" />

              {/* Floating Badge: Ability Card in Black and Grey */}
              <div className="absolute bottom-5 left-5 right-5 p-3.5 rounded-xl bg-zinc-950/90 backdrop-blur-xl border border-white/15 flex items-center justify-between shadow-2xl z-20 transition-all duration-300">
                <div>
                  <div className="flex items-center gap-1.5 text-xs font-bold text-white">
                    <ShieldCheck className="w-4 h-4 text-neutral-300" />
                    <span>AKSHAY KANTH C</span>
                  </div>
                  <div className="text-[10px] font-mono text-zinc-400">
                    Test Engineer &bull; AI-Assisted Developer
                  </div>
                </div>
                <span className="px-2.5 py-1 rounded-full bg-white/10 border border-white/20 text-[10px] font-mono text-zinc-300 transition-colors">
                  {isHoveringPortrait ? 'SPOTLIGHT RGB' : 'DUBAI, UAE'}
                </span>
              </div>
            </div>

            {/* Top Floating Badge: Test Engineer */}
            <div
              className="absolute -top-3 -right-3 px-3.5 py-2 rounded-xl bg-zinc-900/95 border border-white/25 shadow-2xl backdrop-blur-xl flex items-center gap-2 text-xs font-semibold text-white animate-float z-40 whitespace-nowrap"
              style={{ transform: 'translateZ(45px)' }}
            >
              <CheckCircle2 className="w-4 h-4 text-neutral-300" />
              <span>Test Engineer</span>
            </div>

            {/* Bottom-left Floating Badge: AI-Assisted Developer (Safely positioned with z-40 to prevent any clipping) */}
            <div
              className="absolute -bottom-5 -left-4 sm:-left-6 px-3.5 py-2 rounded-xl bg-zinc-900/95 border border-white/25 shadow-2xl backdrop-blur-xl flex items-center gap-2 text-xs font-semibold text-white z-40 whitespace-nowrap"
              style={{ transform: 'translateZ(45px)', animation: 'float 5s ease-in-out infinite reverse' }}
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
