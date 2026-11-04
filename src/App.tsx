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
    <div className="relative min-h-screen bg-[#090a0f] text-slate-100 selection:bg-blue-600 selection:text-white bg-noise">
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
