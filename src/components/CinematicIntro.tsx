import React, { useEffect, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

interface CinematicIntroProps {
  onComplete: () => void;
}

export const CinematicIntro: React.FC<CinematicIntroProps> = ({ onComplete }) => {
  const [phase, setPhase] = useState<number>(0);
  const [isVisible, setIsVisible] = useState(true);

  useEffect(() => {
    // If user previously saw intro or prefers reduced motion, fast-track
    const hasSeenIntro = sessionStorage.getItem('akshay_intro_seen');
    const prefersReduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

    if (hasSeenIntro || prefersReduced) {
      onComplete();
      setIsVisible(false);
      return;
    }

    // Sequence timelines:
    // 0ms: Glowing line
    // 600ms: Geometric expansion
    // 1400ms: Name reveal
    // 2400ms: Fade to hero
    const t1 = setTimeout(() => setPhase(1), 500);
    const t2 = setTimeout(() => setPhase(2), 1200);
    const t3 = setTimeout(() => {
      handleFinish();
    }, 2600);

    return () => {
      clearTimeout(t1);
      clearTimeout(t2);
      clearTimeout(t3);
    };
  }, []);

  const handleFinish = () => {
    sessionStorage.setItem('akshay_intro_seen', 'true');
    setIsVisible(false);
    setTimeout(onComplete, 400);
  };

  if (!isVisible) return null;

  return (
    <AnimatePresence>
      <motion.div
        initial={{ opacity: 1 }}
        exit={{ opacity: 0, scale: 1.05 }}
        transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
        className="fixed inset-0 z-50 flex flex-col items-center justify-center bg-[#060709] text-white overflow-hidden pointer-events-auto"
      >
        {/* Subtle background glow in monochrome */}
        <div className="absolute inset-0 bg-radial-gradient from-white/[0.04] via-transparent to-transparent pointer-events-none" />

        {/* Central visual choreography */}
        <div className="relative flex flex-col items-center justify-center w-full max-w-2xl px-6">
          {/* Phase 0: Narrow glowing line */}
          <motion.div
            initial={{ width: 0, opacity: 0 }}
            animate={{
              width: phase >= 1 ? '160px' : '40px',
              opacity: 1,
              boxShadow: '0 0 25px rgba(255, 255, 255, 0.4)',
            }}
            transition={{ duration: 0.6, ease: 'easeOut' }}
            className="h-[2px] bg-gradient-to-r from-transparent via-zinc-200 to-transparent mb-8"
          />

          {/* Phase 1: Abstract geometric ring / diamond motif */}
          <motion.div
            initial={{ scale: 0, rotate: -45, opacity: 0 }}
            animate={{
              scale: phase >= 1 ? 1 : 0,
              rotate: phase >= 1 ? 45 : -45,
              opacity: phase >= 1 ? 0.7 : 0,
            }}
            transition={{ duration: 0.7, ease: [0.34, 1.56, 0.64, 1] }}
            className="w-16 h-16 border border-white/20 rounded-sm mb-6 flex items-center justify-center shadow-[0_0_20px_rgba(255,255,255,0.1)]"
          >
            <div className="w-8 h-8 border border-white/30 rounded-full animate-ping opacity-30" />
          </motion.div>

          {/* Phase 2: Letter reveal */}
          <div className="overflow-hidden flex flex-col items-center text-center">
            <motion.h1
              initial={{ y: 50, opacity: 0 }}
              animate={{ y: phase >= 2 ? 0 : 50, opacity: phase >= 2 ? 1 : 0 }}
              transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
              className="font-display text-4xl sm:text-5xl md:text-6xl font-black tracking-widest text-zinc-100"
            >
              AKSHAY KANTH C
            </motion.h1>
            <motion.p
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: phase >= 2 ? 0.8 : 0, y: phase >= 2 ? 0 : 15 }}
              transition={{ duration: 0.5, delay: 0.2 }}
              className="font-mono text-xs sm:text-sm tracking-[0.3em] uppercase text-zinc-400 mt-3"
            >
              Test Engineer &bull; AI-Assisted Developer
            </motion.p>
          </div>
        </div>

        {/* Skip button */}
        <button
          onClick={handleFinish}
          className="absolute bottom-8 right-8 text-xs font-mono tracking-widest text-zinc-400 hover:text-white px-4 py-2 rounded-full border border-white/10 hover:border-white/30 bg-white/5 backdrop-blur-md transition-all duration-300"
        >
          SKIP INTRO [ESC]
        </button>
      </motion.div>
    </AnimatePresence>
  );
};

