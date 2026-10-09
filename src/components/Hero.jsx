import { useEffect, useRef, useState } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { ArrowDown, BadgeCheck } from 'lucide-react';
import { profile } from '../data/profile';
import Terminal from './Terminal';
import Globe from './Globe';
import { PersonaCard, FlipButton } from './Persona';

gsap.registerPlugin(ScrollTrigger);


/**
 * Bright, scroll-scrubbed hero. The portrait sits in a 3D tilt stage that
 * follows the pointer, in front of a WebGL globe of connected AWS regions.
 */
export default function Hero({ theme }) {
  const section = useRef(null);
  const stage = useRef(null);
  const portrait = useRef(null);
  const intro = useRef(null);
  const term = useRef(null);
  const hint = useRef(null);
  const progress = useRef(0);
  const [real, setReal] = useState(false);

  // Pointer-driven 3D tilt
  useEffect(() => {
    const reduce = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    if (reduce) return undefined;
    const target = { x: 0, y: 0, z: 0, ex: 0, ey: 0 };
    const cur = { x: 0, y: 0, z: 0, ex: 0, ey: 0 };
    const onMove = (e) => {
      const nx = (e.clientX / window.innerWidth) * 2 - 1;
      const ny = (e.clientY / window.innerHeight) * 2 - 1;
      target.y = nx * 10;
      target.x = -ny * 7;
      target.z = nx * 2.5; // lean toward the cursor's side
      // Eyes look toward the cursor
      const r = portrait.current?.getBoundingClientRect();
      if (r) {
        const ex = r.left + r.width * 0.5;
        const ey = r.top + r.height * 0.2;
        const clamp = (v) => Math.max(-1, Math.min(1, v));
        target.ex = clamp((e.clientX - ex) / 360);
        target.ey = clamp((e.clientY - ey) / 300);
      }
    };
    let raf;
    const loop = () => {
      cur.x += (target.x - cur.x) * 0.06;
      cur.y += (target.y - cur.y) * 0.06;
      cur.z += (target.z - cur.z) * 0.06;
      cur.ex += (target.ex - cur.ex) * 0.15;
      cur.ey += (target.ey - cur.ey) * 0.15;
      if (portrait.current) {
        portrait.current.style.setProperty('--ex', cur.ex.toFixed(3));
        portrait.current.style.setProperty('--ey', cur.ey.toFixed(3));
      }
      if (stage.current) stage.current.style.transform = `rotateX(${cur.x}deg) rotateY(${cur.y}deg) rotateZ(${cur.z}deg)`;
      raf = requestAnimationFrame(loop);
    };
    loop();
    window.addEventListener('pointermove', onMove, { passive: true });
    return () => {
      cancelAnimationFrame(raf);
      window.removeEventListener('pointermove', onMove);
    };
  }, []);

  useEffect(() => {
    const reduce = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    const ctx = gsap.context(() => {
      if (!reduce) {
        gsap.from(portrait.current, { y: 80, opacity: 0, duration: 1.3, ease: 'power3.out' });
        gsap.from(intro.current.children, { y: 40, opacity: 0, duration: 0.9, stagger: 0.1, delay: 0.15, ease: 'power3.out' });
      }

    }, section);
    return () => ctx.revert();
  }, []);

  const go = (id) => (e) => {
    e.preventDefault();
    document.getElementById(id)?.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <section id="top" ref={section} className="relative bg-paper" aria-label="Introduction">
      <div className="relative h-[100svh] min-h-[640px] w-full overflow-hidden">
        {/* Aurora background */}
        <div className="absolute inset-0 dot-grid" aria-hidden="true" />
        <div className="pointer-events-none absolute inset-0" aria-hidden="true">
          <div className="animate-drift absolute -left-32 top-10 h-[34rem] w-[34rem] rounded-full bg-[#FFB547]/40 blur-[110px]" />
          <div className="animate-drift absolute right-[-8rem] top-[-6rem] h-[36rem] w-[36rem] rounded-full bg-[#7C3AED]/25 blur-[120px]" style={{ animationDelay: '-5s' }} />
          <div className="animate-drift absolute bottom-[-10rem] left-1/3 h-[32rem] w-[40rem] rounded-full bg-[#38BDF8]/30 blur-[120px]" style={{ animationDelay: '-9s' }} />
        </div>

        {/* 3D globe */}
        <div className="absolute left-1/2 top-[44%] h-[min(100vh,62rem)] w-[min(100vh,62rem)] -translate-x-1/2 -translate-y-1/2 opacity-90">
          <Globe progressRef={progress} theme={theme} />
        </div>

        {/* Portrait in a 3D tilt stage */}
        <div className="absolute inset-x-0 bottom-0 flex justify-center lg:pl-[16vw]" style={{ perspective: '1200px' }}>
          <div ref={stage} className="preserve-3d relative will-change-transform">
            {/* Portal: glowing ring behind the avatar */}
            <div className="pointer-events-none absolute left-1/2 top-[6%] aspect-square w-[92%] -translate-x-1/2 rounded-full border border-[#38BDF8]/25" style={{ transform: 'translateX(-50%) translateZ(-90px)', background: 'radial-gradient(circle at 50% 45%, rgba(56,189,248,0.16), rgba(124,58,237,0.08) 45%, transparent 70%)', boxShadow: 'inset 0 0 60px rgba(56,189,248,0.12)' }} aria-hidden="true" />
            <div className="pointer-events-none absolute left-1/2 top-[11%] aspect-square w-[78%] rounded-full border border-dashed border-[#38BDF8]/15" style={{ transform: 'translateX(-50%) translateZ(-60px)' }} aria-hidden="true" />
            <div ref={portrait} className="relative origin-bottom">
              <PersonaCard real={real} className="h-[46svh] sm:h-[62svh] lg:h-[68svh] aspect-[378/541]" />
            </div>
            {!real && (
              <>
                {[
                  // left of the avatar
                  ['Control Tower', '-25%', '27%', 90, 0.4],
                  ['AFT', '-34%', '36%', 70, 2.6],
                  ['AWS', '-12%', '35%', 60, 0],
                  ['Terraform', '2%', '45%', 120, 1.6],
                  ['Checkov', '-22%', '44%', 70, 0.8],
                  ['GuardDuty', '-14%', '54%', 80, 3.2],
                  ['Ansible', '-27%', '63%', 60, 1.1],
                  ['Jenkins', '-8%', '66%', 90, 2.0],
                  ['Python', '-22%', '75%', 70, 3.8],
                  // right of the avatar
                  ['Kubernetes', '70%', '43%', 130, 2.2],
                  ['Cloud WAN', '100%', '38%', 80, 3.0, 1],
                  ['Transit Gateway', '122%', '45%', 90, 1.4],
                  ['GitHub Actions', '96%', '52%', 90, 3.6],
                  ['OIDC', '76%', '55%', 110, 0.6],
                  ['ArgoCD', '128%', '56%', 70, 2.8],
                  ['Helm', '136%', '66%', 60, 1.9],
                  ['Security Hub', '127%', '77%', 80, 0.2],
                  ['SCPs', '-36%', '52%', 60, 3.3],
                ].map(([label, x, y, z, d, wide]) => (
                  <span key={label} className={`absolute hidden ${wide ? 'min-[1400px]:block' : 'sm:block'}`} style={{ left: x, top: y, transform: `translateZ(${z}px)` }}>
                    <span className="chip-neon animate-bob inline-flex whitespace-nowrap rounded-full px-3 py-1.5 font-mono text-[11.5px] font-semibold" style={{ animationDelay: `${-d}s` }}>
                      {label}
                    </span>
                  </span>
                ))}
                <span className="absolute hidden md:block" style={{ left: '-14%', top: '9%', transform: 'translateZ(140px)' }}>
                  <span className="animate-bob inline-flex items-center gap-2 whitespace-nowrap rounded-2xl border border-aws/50 bg-card/90 px-3.5 py-2 text-ink shadow-[0_0_24px_-6px_rgba(255,153,0,0.6)] backdrop-blur" style={{ animationDelay: '-2s' }}>
                    <BadgeCheck size={16} className="text-aws" />
                    <span className="leading-tight">
                      <span className="block font-mono text-[10px] font-semibold uppercase tracking-[0.2em] text-awsdeep">Certified</span>
                      <span className="block text-[13px] font-semibold">AWS DevOps Pro</span>
                    </span>
                  </span>
                </span>
                <span className="absolute hidden md:block" style={{ left: '80%', top: '64%', transform: 'translateZ(160px)' }}>
                  <span className="chip-neon animate-bob block rounded-2xl px-4 py-2.5" style={{ animationDelay: '-3.4s' }}>
                    <span className="block font-mono text-3xl font-bold leading-none">8+</span>
                    <span className="mt-1 block whitespace-nowrap font-mono text-[10px] uppercase tracking-[0.2em] opacity-80">Years shipping</span>
                  </span>
                </span>
              </>
            )}
          </div>
        </div>

        {/* Platform with the flip button */}
        <div className="pointer-events-none absolute inset-x-0 bottom-24 sm:bottom-6 z-20 flex justify-center lg:pl-[16vw]">
          <div className="relative flex items-center justify-center">
            <span className="absolute h-16 w-[min(30rem,88vw)] rounded-[50%] border border-dashed border-[#38BDF8]/40" style={{ background: 'radial-gradient(ellipse at center, rgba(56,189,248,0.18), transparent 70%)' }} aria-hidden="true" />
            <FlipButton real={real} onChange={setReal} className="pointer-events-auto relative" />
          </div>
        </div>

        {/* Soft floor fade */}
        <div className="pointer-events-none absolute inset-x-0 bottom-0 h-40 bg-gradient-to-t from-paper via-paper/70 to-transparent" aria-hidden="true" />

        {/* Intro */}
        <div ref={intro} className="absolute left-5 right-5 sm:right-auto sm:left-10 lg:left-16 top-24 sm:top-1/2 sm:-translate-y-1/2 z-10 max-w-[40rem]">
          <p className="glass mb-3 sm:mb-5 inline-flex items-center gap-2 rounded-full px-3.5 py-1.5 text-[12px] font-medium text-ink">
            <span className="relative flex h-2 w-2">
              <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-[#22C55E] opacity-70" />
              <span className="relative inline-flex h-2 w-2 rounded-full bg-[#22C55E]" />
            </span>
            {profile.available}
          </p>
          <p className="mb-2 font-mono text-[11px] sm:text-xs uppercase tracking-[0.3em] text-muted">Hi, I&apos;m</p>
          <h1 className="font-display uppercase leading-[0.9] tracking-tight text-[13vw] sm:text-7xl xl:text-[5.6rem]">
            <span className="block text-ink">{profile.first}</span>
            <span className="block text-grad">{profile.last}</span>
          </h1>
          <p className="mt-3 sm:mt-4 text-base sm:text-xl font-semibold text-ink">{profile.title}</p>
          <p className="mt-1 hidden max-w-sm text-[15px] text-muted sm:block">8+ years building secure, multi-account AWS platforms with Terraform and keyless CI/CD.</p>
        </div>

        {/* Terminal */}
        <div ref={term} className="absolute right-8 lg:right-14 top-[24%] z-10 hidden lg:block">
          <p className="mb-3 text-right font-mono text-[11px] uppercase tracking-[0.25em] text-muted">
            // Live from my <span className="text-awsdeep font-semibold">platform</span>
          </p>
          <Terminal />
        </div>

        {/* Scroll hint */}
        <a href="#about" onClick={go('about')} ref={hint} className="absolute left-5 sm:left-10 lg:left-16 bottom-9 z-10 hidden sm:flex items-center gap-2 font-mono text-[11px] uppercase tracking-[0.25em] text-muted hover:text-ink">
          <ArrowDown size={14} className="animate-bounce text-aws" />
          Scroll to explore
        </a>

        {/* CTAs */}
        <div className="absolute inset-x-5 bottom-7 sm:inset-x-auto sm:right-10 lg:right-16 z-10 flex justify-center gap-3">
          <a href="#projects" onClick={go('projects')} className="bg-grad rounded-full px-6 py-3 text-sm font-semibold text-white shadow-[0_12px_30px_-8px_rgba(242,85,44,0.6)] transition-transform hover:-translate-y-0.5">
            View My Work
          </a>
          <a href="#contact" onClick={go('contact')} className="glass rounded-full px-6 py-3 text-sm font-semibold text-ink transition-transform hover:-translate-y-0.5">
            Let&apos;s Talk
          </a>
        </div>

      </div>
    </section>
  );
}
