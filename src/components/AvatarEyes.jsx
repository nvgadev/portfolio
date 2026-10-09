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
const pct = (v, total) => `${(v / total) * 100}%`;

/**
 * Gopi's 3D avatar with irises that follow the visitor's cursor.
 * The parent sets --ex / --ey (each -1..1) for where to look.
 */
export default function AvatarEyes({ alt, className = '' }) {
  return (
    <div className={`relative ${className}`} style={{ aspectRatio: `${W} / ${H}` }}>
      <img src={base} alt={alt} className="absolute inset-0 h-full w-full select-none" draggable="false" />
      {EYES.map(({ src, c, open }, i) => {
        const [ox, oy, rx, ry] = open;
        return (
          <div
            key={i}
            className="absolute overflow-hidden rounded-[50%]"
            style={{ left: pct(ox - rx, W), top: pct(oy - ry, H), width: pct(rx * 2, W), height: pct(ry * 2, H) }}
            aria-hidden="true"
          >
            <img
              src={src}
              alt=""
              className="absolute max-w-none select-none"
              style={{
                left: pct(c[0] - 10 - (ox - rx), rx * 2),
                top: pct(c[1] - 10 - (oy - ry), ry * 2),
                width: pct(20, rx * 2),
                height: pct(20, ry * 2),
                transform: 'translate(calc(var(--ex, 0) * 22%), calc(var(--ey, 0) * 9%))',
              }}
              draggable="false"
            />
          </div>
        );
      })}
    </div>
  );
}
