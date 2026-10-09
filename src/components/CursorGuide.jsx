import { useEffect, useRef, useState } from 'react';

/**
 * A small "ghost cursor" with a name tag that glides between the things a
 * visitor can click in the section they're looking at, tapping each one.
 * It never captures the mouse and shows no pop-ups.
 */

const PRIORITY = {
  top: ['#hire-me', '[data-flip]', 'a[href="#projects"]'],
  experience: ['[data-guide="exp-tabs"] button'],
  projects: ['[data-guide="proj-filter"] button'],
  skills: ['#skill-search'],
  certifications: ['[data-guide="verify"]'],
  contact: ['[data-guide="email"]'],
};
const SECTIONS = ['top', 'about', 'expertise', 'experience', 'projects', 'skills', 'certifications', 'contact'];
const DWELL = 2400;
const MAX_TARGETS = 6;

function visibleIn(el, vh) {
  if (!el || el.disabled || el.offsetParent === null) return false;
  const r = el.getBoundingClientRect();
  return r.width > 8 && r.height > 8 && r.top > 76 && r.bottom < vh - 12;
}

function currentTargets() {
  const vh = window.innerHeight;
  const mid = vh * 0.5;
  const id = SECTIONS.find((s) => {
    const r = document.getElementById(s)?.getBoundingClientRect();
    return r && r.top <= mid && r.bottom >= mid;
  });
  if (!id) return [];
  const sec = document.getElementById(id);
  const list = [];
  const add = (el) => {
    if (el && !list.includes(el) && visibleIn(el, vh)) list.push(el);
  };
  (PRIORITY[id] || []).forEach((sel) => document.querySelectorAll(sel).forEach((el) => (id === 'top' || sec.contains(el)) && add(el)));
  sec.querySelectorAll('a[href], button, input').forEach(add);
  return list.slice(0, MAX_TARGETS);
}

export default function CursorGuide() {
  const root = useRef(null);
  const [tap, setTap] = useState(0);
  const [flip, setFlip] = useState(false);
  const [show, setShow] = useState(false);

  useEffect(() => {
    const reduce = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    const cur = { x: window.innerWidth * 0.75, y: window.innerHeight * 0.7 };
    const goal = { ...cur };
    let idx = 0;
    let targets = [];
    let raf;
    let arrived = false;

    const pointOf = (el) => {
      const r = el.getBoundingClientRect();
      return { x: r.left + Math.min(r.width * 0.5, 60), y: r.top + r.height * 0.62 };
    };
    const aim = () => {
      targets = currentTargets();
      if (!targets.length) return;
      idx %= targets.length;
      Object.assign(goal, pointOf(targets[idx]));
      arrived = false;
    };
    const tick = () => {
      if (targets[idx]) Object.assign(goal, pointOf(targets[idx]));
      const k = reduce ? 1 : 0.075;
      cur.x += (goal.x - cur.x) * k;
      cur.y += (goal.y - cur.y) * k;
      if (root.current) root.current.style.transform = `translate3d(${cur.x}px, ${cur.y}px, 0)`;
      if (!arrived && Math.hypot(goal.x - cur.x, goal.y - cur.y) < 2) {
        arrived = true;
        setTap((t) => t + 1);
      }
      raf = requestAnimationFrame(tick);
    };
    const onScroll = () => {
      setShow(true);
      clearTimeout(onScroll.t);
      onScroll.t = setTimeout(() => {
        idx = 0;
        aim();
      }, 180);
    };
    const flipTimer = setInterval(() => setFlip(cur.x > window.innerWidth - 120), 300);
    const cycle = setInterval(() => {
      idx += 1;
      aim();
    }, DWELL);
    const start = setTimeout(() => {
      setShow(true);
      aim();
    }, 1600);

    raf = requestAnimationFrame(tick);
    window.addEventListener('scroll', onScroll, { passive: true });
    window.addEventListener('resize', aim);
    return () => {
      cancelAnimationFrame(raf);
      clearInterval(cycle);
      clearInterval(flipTimer);
      clearTimeout(start);
      clearTimeout(onScroll.t);
      window.removeEventListener('scroll', onScroll);
      window.removeEventListener('resize', aim);
    };
  }, []);

  return (
    <div
      ref={root}
      className={`pointer-events-none fixed left-0 top-0 z-[60] transition-opacity duration-500 ${show ? 'opacity-100' : 'opacity-0'}`}
      aria-hidden="true"
    >
      <span key={`r${tap}`} className="cursor-ripple absolute -left-3 -top-3 h-6 w-6 rounded-full border-2 border-aws" />
      <svg viewBox="0 0 24 24" className="absolute -left-[3px] -top-[2px] h-6 w-6 drop-shadow-[0_2px_3px_rgba(14,21,37,0.35)]">
        <defs>
          <linearGradient id="cg-arrow" x1="0" y1="0" x2="1" y2="1">
            <stop offset="0" stopColor="#FF9900" />
            <stop offset="1" stopColor="#7C3AED" />
          </linearGradient>
        </defs>
        <path d="M3 2 L20 11.5 L12.4 13.3 L9 21 Z" fill="url(#cg-arrow)" stroke="#fff" strokeWidth="1.6" strokeLinejoin="round" />
      </svg>
      {/* Name tag, like a teammate's cursor */}
      <span
        key={`t${tap}`}
        className={`cursor-tap bg-grad absolute top-4 whitespace-nowrap rounded-full px-2.5 py-1 text-[11px] font-semibold text-white shadow-[0_6px_14px_-6px_rgba(124,58,237,0.8)] ${
          flip ? 'right-3 rounded-tr-sm' : 'left-4 rounded-tl-sm'
        }`}
      >
        Gopi
      </span>
    </div>
  );
}
