import React from 'react';
import { useLenis } from './hooks/useLenis';
import { CinematicIntro } from './components/CinematicIntro';
import { Navbar } from './components/Navbar';
import { HeroSection } from './components/HeroSection';
import { DoorSection } from './components/DoorSection';
import { AboutSection } from './components/AboutSection';
import { ExperienceTimeline } from './components/ExperienceTimeline';
import { ProjectShowcase } from './components/ProjectShowcase';
import { SkillsConstellation } from './components/SkillsConstellation';
import { EducationAchievements } from './components/EducationAchievements';
import { ContactSection } from './components/ContactSection';
import { Footer } from './components/Footer';
import { CustomCursor } from './components/CustomCursor';

export const App: React.FC = () => {
  // Initialize Lenis smooth scroll
  useLenis();

  return (
    <div className="relative min-h-screen bg-[#060709] text-zinc-100 selection:bg-white selection:text-black bg-noise overflow-x-hidden">
      {/* Global Foggy & Blurry White Smoke Ambient Clouds Across All Pages */}
      <div className="fixed inset-0 pointer-events-none z-0 overflow-hidden">
        {/* Top-right drifting foggy white smoke */}
        <div className="white-smoke-cloud w-[800px] h-[700px] -top-32 -right-32 opacity-75 fog-drift-slow" />
        {/* Mid-left drifting foggy white smoke */}
        <div className="white-smoke-cloud w-[700px] h-[700px] top-[30%] -left-40 opacity-60" style={{ animation: 'fogDrift 18s ease-in-out infinite alternate-reverse' }} />
        {/* Mid-right drifting foggy white smoke */}
        <div className="white-smoke-cloud w-[750px] h-[750px] top-[60%] -right-32 opacity-55 fog-drift-slow" />
        {/* Bottom-left drifting foggy white smoke */}
        <div className="white-smoke-cloud w-[700px] h-[650px] bottom-10 -left-28 opacity-65" style={{ animation: 'fogDrift 16s ease-in-out infinite alternate' }} />
        {/* Ambient white mist glow */}
        <div className="absolute inset-0 fog-ambient-mist opacity-60" />
      </div>

      {/* Custom magnetic interactive cursor */}
      <CustomCursor />

      {/* Cinematic 2-3s Opening */}
      <CinematicIntro onComplete={() => {}} />

      {/* Main Luxury Navigation Bar */}
      <Navbar />

      {/* Chapter 02: Immersive Hero */}
      <HeroSection />

      {/* Chapter 03: Signature 3D Door Portal */}
      <DoorSection />

      {/* Chapter 04: About The Person Behind The Code */}
      <AboutSection />

      {/* Chapter 05: Scroll-Driven Experience Timeline */}
      <ExperienceTimeline />

      {/* Chapter 06: Cinematic Project Showcase */}
      <ProjectShowcase />

      {/* Chapter 07: Interactive Skills Constellation */}
      <SkillsConstellation />

      {/* Chapter 08: Education & Achievements */}
      <EducationAchievements />

      {/* Chapter 09: Cinematic Contact Section */}
      <ContactSection />

      {/* Refined Footer */}
      <Footer />
    </div>
  );
};

export default App;
