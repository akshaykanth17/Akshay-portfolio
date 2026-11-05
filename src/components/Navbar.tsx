import React, { useState, useEffect } from 'react';
import { Download, Menu, X, ArrowUpRight, Github } from 'lucide-react';

export const Navbar: React.FC = () => {
  const [time, setTime] = useState<string>('');
  const [scrolled, setScrolled] = useState<boolean>(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState<boolean>(false);

  useEffect(() => {
    // Update live Dubai time
    const updateTime = () => {
      const options: Intl.DateTimeFormatOptions = {
        timeZone: 'Asia/Dubai',
        hour: '2-digit',
        minute: '2-digit',
        second: '2-digit',
        hour12: true,
      };
      const formatted = new Intl.DateTimeFormat([], options).format(new Date());
      setTime(formatted);
    };

    updateTime();
    const interval = setInterval(updateTime, 1000);

    const handleScroll = () => {
      setScrolled(window.scrollY > 40);
    };
    window.addEventListener('scroll', handleScroll, { passive: true });

    return () => {
      clearInterval(interval);
      window.removeEventListener('scroll', handleScroll);
    };
  }, []);

  const navLinks = [
    { name: 'Home', href: '#hero' },
    { name: 'Doors', href: '#doors' },
    { name: 'About', href: '#about' },
    { name: 'Timeline', href: '#timeline' },
    { name: 'Projects', href: '#projects' },
    { name: 'Skills', href: '#skills' },
    { name: 'Education', href: '#education' },
    { name: 'Contact', href: '#contact' },
  ];

  const handleScrollTo = (e: React.MouseEvent<HTMLAnchorElement>, href: string) => {
    e.preventDefault();
    if (href === '#about') {
      const doorSection = document.querySelector('#doors') || document.querySelector('#about');
      if (doorSection) {
        doorSection.scrollIntoView({ behavior: 'smooth' });
        window.dispatchEvent(new CustomEvent('open-door-sanctuary'));
      }
    } else {
      const target = document.querySelector(href);
      if (target) {
        target.scrollIntoView({ behavior: 'smooth' });
      }
    }
    setMobileMenuOpen(false);
  };

  return (
    <header className="fixed top-0 left-0 right-0 z-40 px-4 sm:px-8 pt-4 transition-all duration-300">
      <div
        className={`max-w-7xl mx-auto flex items-center justify-between px-5 py-3 rounded-full transition-all duration-300 ${
          scrolled
            ? 'bg-[#101115]/90 backdrop-blur-xl border border-white/10 shadow-2xl shadow-black/80'
            : 'bg-transparent border border-white/5'
        }`}
      >
        {/* Brand Monogram in Black & Grey Mix */}
        <a
          href="#hero"
          onClick={(e) => handleScrollTo(e, '#hero')}
          className="group flex items-center gap-3"
        >
          <div className="w-9 h-9 rounded-full bg-gradient-to-tr from-zinc-800 to-zinc-900 border border-white/15 flex items-center justify-center font-display font-black text-sm text-white shadow-lg group-hover:scale-105 group-hover:border-white/30 transition-all">
            AK
          </div>
          <div className="hidden sm:flex flex-col">
            <span className="font-display font-bold text-sm tracking-wider text-zinc-100 group-hover:text-white transition-colors">
              AKSHAY KANTH C
            </span>
            <span className="font-mono text-[10px] tracking-widest text-zinc-400">
              TEST ENGINEER &bull; AI-ASSISTED DEVELOPER
            </span>
          </div>
        </a>

        {/* Center Navigation Links (Desktop) */}
        <nav className="hidden lg:flex items-center gap-1 bg-white/[0.03] border border-white/5 px-3 py-1.5 rounded-full backdrop-blur-sm">
          {navLinks.map((link) => (
            <a
              key={link.name}
              href={link.href}
              onClick={(e) => handleScrollTo(e, link.href)}
              className="px-3.5 py-1 text-xs font-medium text-zinc-400 hover:text-white hover:bg-white/10 rounded-full transition-all duration-200"
            >
              {link.name}
            </a>
          ))}
        </nav>

        {/* Right Info: Dubai Clock, Available Status, Download CV */}
        <div className="flex items-center gap-3">
          {/* Status badge: AVAILABLE FOR WORK in vibrant Emerald Green */}
          <div className="hidden md:flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-emerald-950/70 border border-emerald-500/40 text-emerald-300 text-[11px] font-mono tracking-wider shadow-[0_0_15px_rgba(16,185,129,0.25)]">
            <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse inline-block shadow-[0_0_8px_#34d399]" />
            <span className="font-semibold text-emerald-300">AVAILABLE FOR WORK</span>
          </div>

          {/* Live Dubai Time */}
          <div className="hidden sm:flex items-center gap-1.5 px-3 py-1 rounded-full bg-zinc-900/70 border border-white/10 font-mono text-[11px] text-zinc-300">
            <span className="text-zinc-500">DXB:</span>
            <span>{time || '18:15'}</span>
          </div>

          {/* GitHub Profile */}
          <a
            href="https://github.com/akshaykanth17"
            target="_blank"
            rel="noopener noreferrer"
            className="hidden sm:flex items-center justify-center w-8 h-8 rounded-full bg-zinc-900/80 hover:bg-zinc-800 text-zinc-300 hover:text-white border border-white/10 transition-colors"
            title="Akshay's GitHub @akshaykanth17"
          >
            <Github className="w-4 h-4" />
          </a>

          {/* Download CV button in elegant monochrome */}
          <a
            href="./Akshay_Kanth_C_CV_.pdf"
            download="Akshay_Kanth_C_CV.pdf"
            className="flex items-center gap-2 px-4 py-2 rounded-full bg-white hover:bg-neutral-200 text-black font-semibold text-xs tracking-wider shadow-lg shadow-white/5 transition-all duration-300 hover:scale-105 active:scale-95"
            title="Download Akshay Kanth C's CV"
          >
            <Download className="w-3.5 h-3.5" />
            <span className="hidden sm:inline">CV</span>
          </a>

          {/* Mobile menu hamburger */}
          <button
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="lg:hidden p-2 text-zinc-300 hover:text-white rounded-full bg-zinc-900 border border-white/10"
            aria-label="Toggle menu"
          >
            {mobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
          </button>
        </div>
      </div>

      {/* Mobile Drawer Menu */}
      {mobileMenuOpen && (
        <div className="lg:hidden mt-2 p-5 rounded-2xl bg-[#101115]/95 backdrop-blur-2xl border border-white/10 shadow-2xl animate-in fade-in slide-in-from-top-4 duration-300">
          <div className="flex flex-col gap-3">
            {navLinks.map((link) => (
              <a
                key={link.name}
                href={link.href}
                onClick={(e) => handleScrollTo(e, link.href)}
                className="flex items-center justify-between py-2 px-3 text-zinc-200 hover:text-white hover:bg-white/5 rounded-lg text-sm font-medium transition-colors"
              >
                <span>{link.name}</span>
                <ArrowUpRight className="w-4 h-4 text-zinc-400" />
              </a>
            ))}
            <div className="pt-3 mt-2 border-t border-white/10 flex items-center justify-between text-xs font-mono text-zinc-400">
              <span className="flex items-center gap-2 text-emerald-300 font-semibold">
                <span className="w-2 h-2 rounded-full bg-emerald-400 inline-block animate-pulse shadow-[0_0_8px_#34d399]" />
                AVAILABLE FOR WORK &bull; DUBAI
              </span>
              <span>{time}</span>
            </div>
          </div>
        </div>
      )}
    </header>
  );
};
