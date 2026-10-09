import { useEffect, useState } from 'react';
import { Camera, Sparkles } from 'lucide-react';
import body from '../assets/avatar-body.webp';
import hand from '../assets/avatar-hand.webp';
import AvatarEyes from './AvatarEyes';
import { RotateCcw } from 'lucide-react';
import { profile } from '../data/profile';

// Waving 3D avatar: the hand is its own layer, rotating around the wrist.
export function WavingAvatar({ className = '', alt = '', wave = 'animate-wave' }) {
  return (
    <div className={`relative ${className}`} style={{ aspectRatio: '527 / 526' }}>
      <img src={body} alt={alt} className="absolute inset-0 h-full w-full select-none" draggable="false" />
      <img
        src={hand}
        alt=""
        aria-hidden="true"
        className={`${wave} absolute inset-0 h-full w-full select-none`}
        style={{ transformOrigin: '11.8% 77.6%' }}
        draggable="false"
      />
    </div>
  );
}

const GREETINGS = ['Hi, welcome! 👋', "I'm Gopi, nice to meet you", 'I build secure AWS platforms ☁️', 'Scroll down to see my journey'];

// Speech bubble that cycles through short greetings
export function Greeting({ className = '' }) {
  const [i, setI] = useState(0);
  useEffect(() => {
    const id = setInterval(() => setI((n) => (n + 1) % GREETINGS.length), 2800);
    return () => clearInterval(id);
  }, []);
  return (
    <div className={`pointer-events-none ${className}`} aria-live="polite">
      <div key={i} className="animate-pop relative inline-block whitespace-nowrap rounded-2xl rounded-bl-md bg-card px-4 py-2.5 text-[15px] font-semibold text-ink shadow-[0_16px_40px_-14px_rgba(14,21,37,0.45)] ring-1 ring-line">
        {GREETINGS[i]}
      </div>
    </div>
  );
}

/**
 * Flip card: 3D avatar on the front, real photo on the back.
 * `real` is controlled by the PersonaSwitch.
 */
export function PersonaCard({ real, className = '' }) {
  return (
    <div className={`relative ${className}`} style={{ perspective: '1600px' }}>
      <div
        className="preserve-3d relative h-full w-full transition-transform duration-[900ms] ease-[cubic-bezier(.2,.8,.2,1)]"
        style={{ transform: real ? 'rotateY(180deg)' : 'rotateY(0deg)' }}
      >
        <div className="backface-hidden absolute inset-0 flex items-end justify-center">
          <AvatarEyes className="h-full w-auto" alt={`3D avatar of ${profile.name}`} />
        </div>
        <div className="backface-hidden absolute inset-0 flex items-end justify-center" style={{ transform: 'rotateY(180deg)' }}>
          <img
            src={profile.cutout}
            alt={`Photo of ${profile.name}`}
            className="h-full w-auto max-w-none select-none drop-shadow-[0_30px_40px_rgba(14,21,37,0.25)]"
            draggable="false"
          />
        </div>
      </div>
    </div>
  );
}

// Prominent two-option switch between the avatar and the real photo
export function PersonaSwitch({ real, onChange, className = '' }) {
  const opt = (active) =>
    `relative z-10 inline-flex w-[8.5rem] items-center justify-center gap-2 rounded-full px-3 py-2.5 text-sm font-semibold transition-colors ${
      active ? 'text-white' : 'text-ink/70 hover:text-ink'
    }`;
  return (
    <div className={`glass relative inline-flex rounded-full p-1.5 ${className}`} role="group" aria-label="Choose how my picture is shown">
      <span
        className="bg-grad absolute bottom-1.5 top-1.5 w-[calc(50%-6px)] rounded-full shadow-[0_8px_20px_-8px_rgba(242,85,44,0.8)] transition-transform duration-500"
        style={{ left: 6, transform: real ? 'translateX(100%)' : 'translateX(0)' }}
        aria-hidden="true"
      />
      <button type="button" className={opt(!real)} aria-pressed={!real} onClick={() => onChange(false)}>
        <Sparkles size={16} /> 3D Avatar
      </button>
      <button type="button" className={opt(real)} aria-pressed={real} onClick={() => onChange(true)}>
        <Camera size={16} /> Real photo
      </button>
    </div>
  );
}

// Single flip button that sits on the avatar's platform
export function FlipButton({ real, onChange, className = '' }) {
  return (
    <button
      type="button"
      onClick={() => onChange(!real)}
      aria-pressed={real}
      data-flip
      className={`group inline-flex items-center gap-2 rounded-full border border-[#38BDF8]/40 bg-card/85 px-5 py-2.5 font-mono text-[12px] font-semibold uppercase tracking-[0.18em] text-ink shadow-[0_0_24px_-6px_rgba(56,189,248,0.6)] backdrop-blur transition-all hover:border-[#38BDF8] hover:shadow-[0_0_30px_-4px_rgba(56,189,248,0.8)] ${className}`}
    >
      <RotateCcw size={15} className="text-[#0EA5E9] transition-transform duration-500 group-hover:-rotate-180" />
      {real ? 'Flip to 3D avatar' : 'Flip to real photo'}
    </button>
  );
}
