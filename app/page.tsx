'use client';

import Hero from '@/components/Hero';
import About from '@/components/About';
import Skills from '@/components/Skills';
import Projects from '@/components/Projects';
import Experience from '@/components/Experience';
import Contact from '@/components/Contact';
import ThemeToggle from '@/components/ThemeToggle';
import KonamiCode from '@/components/KonamiCode';

export default function Home() {
  return (
    <div className="crt-screen">
      <ThemeToggle />
      <KonamiCode />
      
      <Hero />
      <About />
      <Skills />
      <Projects />
      <Experience />
      <Contact />
      
      {/* Footer */}
      <footer className="text-center py-8 border-t border-current border-opacity-30">
        <div className="pixel-font text-xs opacity-70">
          © 2025 ANNAMALAI.DEV - GAME OVER
        </div>
        <div className="mono-font text-xs opacity-50 mt-2">
          Made with ❤️ and lots of ☕
        </div>
      </footer>
    </div>
  );
}