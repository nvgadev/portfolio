import { useEffect, useState } from 'react';
import { Menu, X, Sun, Moon } from 'lucide-react';
import { navLinks, profile } from '../data/profile';

export default function Navbar({ theme, onToggleTheme }) {
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);
  const [active, setActive] = useState('');

  useEffect(() => {
    const onScroll = () => {
      setScrolled(window.scrollY > 40);
      let cur = '';
      for (const l of navLinks) {
        const el = document.getElementById(l.id);
        if (el && el.getBoundingClientRect().top <= 140) cur = l.id;
      }
      setActive(cur);
    };
    onScroll();
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  const go = (id) => (e) => {
    e.preventDefault();
    setOpen(false);
    document.getElementById(id)?.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <header
      className={`fixed inset-x-0 top-0 z-50 transition-colors duration-300 ${
        scrolled || open ? 'bg-card/80 backdrop-blur-md border-b border-line shadow-[0_8px_30px_-20px_rgba(14,21,37,0.4)]' : 'bg-transparent'
      }`}
    >
      <nav className="mx-auto flex h-16 md:h-[72px] max-w-7xl items-center justify-between px-5 sm:px-8">
        <a href="#top" onClick={go('top')} className="flex items-center gap-2.5" aria-label={profile.name}>
          <span className="bg-grad grid h-9 w-9 place-items-center rounded-xl font-display text-lg tracking-wide text-white shadow-md">{profile.monogram}</span>
          <span className="hidden sm:block text-[15px] font-semibold tracking-tight text-ink">{profile.name}</span>
        </a>

        <ul className="hidden lg:flex items-center gap-1">
          {navLinks.map((l) => (
            <li key={l.id}>
              <a
                href={`#${l.id}`}
                onClick={go(l.id)}
                className={`px-3 py-2 text-[13px] font-medium transition-colors ${
                  active === l.id ? 'text-awsdeep' : 'text-ink/70 hover:text-ink'
                }`}
              >
                {l.label}
              </a>
            </li>
          ))}
        </ul>

        <div className="flex items-center gap-2 sm:gap-3">
          <button
            onClick={onToggleTheme}
            className="grid h-10 w-10 place-items-center rounded-full bg-card text-ink shadow-sm ring-1 ring-line transition-transform hover:-translate-y-0.5"
            aria-label={theme === 'dark' ? 'Switch to light mode' : 'Switch to dark mode'}
            title={theme === 'dark' ? 'Light mode' : 'Dark mode'}
          >
            {theme === 'dark' ? <Sun size={18} className="text-aws" /> : <Moon size={18} />}
          </button>
          <a
            id="hire-me"
            href="#contact"
            onClick={go('contact')}
            className="bg-grad hidden sm:inline-flex rounded-full px-5 py-2 text-sm font-semibold text-white shadow-[0_8px_20px_-8px_rgba(242,85,44,0.7)] transition-transform hover:-translate-y-0.5"
          >
            Hire Me
          </a>
          <button
            className="lg:hidden p-2 text-ink"
            onClick={() => setOpen((o) => !o)}
            aria-label={open ? 'Close menu' : 'Open menu'}
            aria-expanded={open}
          >
            {open ? <X size={22} /> : <Menu size={22} />}
          </button>
        </div>
      </nav>

      {open && (
        <ul className="lg:hidden border-t border-line px-5 pb-5 pt-2">
          {navLinks.map((l) => (
            <li key={l.id}>
              <a href={`#${l.id}`} onClick={go(l.id)} className="block py-3 text-base text-ink/85 border-b border-line">
                {l.label}
              </a>
            </li>
          ))}
          <li>
            <a href="#contact" onClick={go('contact')} className="bg-grad mt-4 block rounded-full py-3 text-center font-semibold text-white">
              Hire Me
            </a>
          </li>
        </ul>
      )}
    </header>
  );
}
