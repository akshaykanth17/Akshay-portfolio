import React from 'react';
import { ArrowUp } from 'lucide-react';

export const Footer: React.FC = () => {
  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <footer className="relative bg-[#060709] border-t border-white/10 py-16 px-4 sm:px-8 lg:px-16 text-zinc-400">
      <div className="max-w-7xl mx-auto flex flex-col space-y-12">
        {/* Top Tier */}
        <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-8 pb-10 border-b border-white/5">
          <div className="space-y-2">
            <div className="flex items-center gap-3">
              <div className="w-8 h-8 rounded-full bg-gradient-to-tr from-zinc-700 to-zinc-900 border border-white/15 flex items-center justify-center font-display font-black text-xs text-white">
                AK
              </div>
              <span className="font-display font-black text-lg text-white tracking-wider">
                AKSHAY KANTH C
              </span>
            </div>
            <p className="font-mono text-xs text-zinc-400 max-w-sm">
              Test Engineer &bull; AI-Assisted Developer
            </p>
          </div>

          {/* Quick nav links & Back to Top */}
          <div className="flex items-center gap-6">
            <button
              onClick={scrollToTop}
              className="group flex items-center gap-2 px-4 py-2.5 rounded-full bg-white/5 hover:bg-white/10 text-xs font-mono text-zinc-300 border border-white/10 transition-colors"
            >
              <span>BACK TO TOP</span>
              <ArrowUp className="w-3.5 h-3.5 text-zinc-300 transition-transform group-hover:-translate-y-1" />
            </button>
          </div>
        </div>

        {/* Bottom Tier: Credits & Declaration */}
        <div className="flex flex-col sm:flex-row items-center justify-between gap-4 text-xs font-mono text-zinc-400">
          <div>
            &copy; {new Date().getFullYear()} Akshay Kanth C. All Rights Reserved.
          </div>

          <div className="flex items-center gap-2">
            <span>Crafted with</span>
            <span className="text-zinc-200 font-bold">Three.js</span>
            <span>&bull;</span>
            <span className="text-white font-bold">GSAP</span>
            <span>&bull;</span>
            <span className="text-zinc-200 font-bold">React 18</span>
          </div>

          <div className="flex items-center gap-1.5 text-zinc-300">
            <span className="w-2 h-2 rounded-full bg-white animate-pulse" />
            <span>Dubai, United Arab Emirates</span>
          </div>
        </div>
      </div>
    </footer>
  );
};
