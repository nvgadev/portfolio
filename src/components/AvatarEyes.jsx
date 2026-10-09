import { useId } from 'react';
import base from '../assets/avatar-base.webp';
import irisL from '../assets/iris-l.webp';
import irisR from '../assets/iris-r.webp';

// Source image is 378 x 541; iris sprites are 20 x 20 in that space.
const W = 378;
const H = 541;
const EYES = [
  { src: irisL, c: [134, 111], open: [133, 111, 13, 7] },
  { src: irisR, c: [190, 104], open: [190, 104, 13, 7] },
];

/**
 * Gopi's 3D avatar with irises that follow the visitor's cursor (or wander on touch screens).
 * The parent sets --ex / --ey (each -1..1) for where to look.
 *
 * Built as one SVG so the eye-opening clip is an SVG clipPath. Safari drops
 * overflow:hidden + border-radius clipping inside 3D-transformed parents, which
 * left one eye showing white on iPhones.
 */
export default function AvatarEyes({ alt, className = '' }) {
  const uid = useId().replace(/:/g, '');
  return (
    <svg
      viewBox={`0 0 ${W} ${H}`}
      className={`relative block select-none ${className}`}
      style={{ aspectRatio: `${W} / ${H}` }}
      role="img"
      aria-label={alt}
    >
      <defs>
        {EYES.map(({ open: [ox, oy, rx, ry] }, i) => (
          <clipPath key={i} id={`eye-${uid}-${i}`}>
            <ellipse cx={ox} cy={oy} rx={rx} ry={ry} />
          </clipPath>
        ))}
      </defs>
      <image href={base} x="0" y="0" width={W} height={H} />
      {EYES.map(({ src, c }, i) => (
        <g key={i} clipPath={`url(#eye-${uid}-${i})`}>
          <image
            href={src}
            x={c[0] - 10}
            y={c[1] - 10}
            width="20"
            height="20"
            style={{ transform: 'translate(calc(var(--ex, 0) * 4.4px), calc(var(--ey, 0) * 1.8px))' }}
          />
        </g>
      ))}
    </svg>
  );
}
