import { useEffect } from 'react';
import { gsap } from 'gsap';
import Navbar from './components/Navbar';
import { useTheme } from './theme';
import Hero from './components/Hero';
import CursorGuide from './components/CursorGuide';
import { About, Expertise, Experience, Projects, Skills, Certifications, Contact, Footer } from './components/Sections';

// Keep entrance animations on real time even when frames are slow (WebGL on weak devices)
gsap.ticker.lagSmoothing(0);

export default function App() {
  const [theme, toggleTheme] = useTheme();
  // Reveal sections as they come into view. IntersectionObserver fires right away,
  // even after a long jump from the nav, so content never sits blank.
  useEffect(() => {
    const els = Array.from(document.querySelectorAll('.reveal'));
    if (!('IntersectionObserver' in window)) {
      els.forEach((el) => el.classList.add('is-in'));
      return undefined;
    }
    const pending = new Set(els);
    const io = new IntersectionObserver(
      (entries) => {
        if (!entries.some((e) => e.isIntersecting)) return;
        // reveal everything now on screen or already scrolled past
        const vh = window.innerHeight;
        pending.forEach((el) => {
          if (el.getBoundingClientRect().top < vh) {
            el.classList.add('is-in');
            pending.delete(el);
            io.unobserve(el);
          }
        });
      },
      { rootMargin: '0px 0px -6% 0px' }
    );
    els.forEach((el) => io.observe(el));
    return () => io.disconnect();
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
