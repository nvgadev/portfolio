import { useEffect } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import Navbar from './components/Navbar';
import { useTheme } from './theme';
import Hero from './components/Hero';
import CursorGuide from './components/CursorGuide';
import { About, Expertise, Experience, Projects, Skills, Certifications, Contact, Footer } from './components/Sections';

gsap.registerPlugin(ScrollTrigger);
// Keep entrance animations on real time even when frames are slow (WebGL on weak devices)
gsap.ticker.lagSmoothing(0);

export default function App() {
  const [theme, toggleTheme] = useTheme();
  useEffect(() => {
    const reduce = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    if (reduce) return;
    const triggers = ScrollTrigger.batch('.reveal', {
      start: 'top 88%',
      once: true,
      onEnter: (els) => gsap.to(els, { opacity: 1, y: 0, duration: 0.8, stagger: 0.08, ease: 'power3.out' }),
    });
    return () => triggers.forEach((t) => t.kill());
  }, []);

  return (
    <>
      <Navbar theme={theme} onToggleTheme={toggleTheme} />
      <main>
        <Hero theme={theme} />
        <About />
        <Expertise />
        <Experience />
        <Projects />
        <Skills />
        <Certifications />
        <Contact />
      </main>
      <Footer />
      <CursorGuide />
    </>
  );
}
