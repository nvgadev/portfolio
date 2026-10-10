import { gsap } from 'gsap';
import { ScrollToPlugin } from 'gsap/ScrollToPlugin';

gsap.registerPlugin(ScrollToPlugin);

/**
 * Smoothly scroll to a section by id in a fixed, short time,
 * no matter how far away it is. Clicking again mid-scroll retargets.
 */
export function scrollToId(id) {
  const reduce = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  const y = id === 'top' ? 0 : document.getElementById(id);
  if (y === null) return;
  const target = typeof y === 'number' ? 0 : y.getBoundingClientRect().top + window.scrollY;
  const dist = Math.abs(target - window.scrollY);
  gsap.killTweensOf(window);
  if (reduce || dist < 2) {
    window.scrollTo(0, target);
    return;
  }
  gsap.to(window, {
    duration: Math.min(1.1, 0.45 + dist / 6000),
    scrollTo: { y: target, autoKill: true },
    ease: 'power2.inOut',
  });
  if (history.replaceState) history.replaceState(null, '', id === 'top' ? '#' : `#${id}`);
}
