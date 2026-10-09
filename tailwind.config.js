/** @type {import('tailwindcss').Config} */
const v = (name) => `rgb(var(--${name}) / <alpha-value>)`;
export default {
  darkMode: 'class',
  content: ['./index.html', './src/**/*.{js,jsx}'],
  theme: {
    extend: {
      colors: {
        paper: v('paper'),
        card: v('card'),
        ink: v('ink'),
        muted: v('muted'),
        line: 'var(--line)',
        awsdeep: v('awsdeep'),
        aws: '#FF9900',
        blue: '#2563EB',
        violet: '#7C3AED',
        night: '#0B1222',
      },
      fontFamily: {
        sans: ['Inter', 'system-ui', 'sans-serif'],
        display: ['Anton', 'Impact', 'Arial Narrow', 'sans-serif'],
        mono: ['"JetBrains Mono"', 'ui-monospace', 'monospace'],
      },
      keyframes: {
        bob: { '0%,100%': { transform: 'translateY(0)' }, '50%': { transform: 'translateY(-12px)' } },
        drift: { '0%,100%': { transform: 'translate(0,0) scale(1)' }, '50%': { transform: 'translate(40px,-30px) scale(1.08)' } },
        wave: {
          '0%, 60%, 100%': { transform: 'rotate(0deg)' },
          '10%': { transform: 'rotate(-12deg)' },
          '20%': { transform: 'rotate(5deg)' },
          '30%': { transform: 'rotate(-12deg)' },
          '40%': { transform: 'rotate(5deg)' },
          '50%': { transform: 'rotate(-6deg)' },
        },
        bye: {
          '0%, 70%, 100%': { transform: 'rotate(0deg)' },
          '12%': { transform: 'rotate(-16deg)' },
          '26%': { transform: 'rotate(7deg)' },
          '40%': { transform: 'rotate(-16deg)' },
          '54%': { transform: 'rotate(7deg)' },
        },
        goodbye: {
          '0%, 100%': { transform: 'rotate(0deg) translateY(0)' },
          '25%': { transform: 'rotate(1.6deg) translateY(-2px)' },
          '50%': { transform: 'rotate(-1.2deg) translateY(0)' },
          '75%': { transform: 'rotate(1.2deg) translateY(-2px)' },
        },
        byewave: {
          '0%, 64%, 100%': { transform: 'rotate(0deg)' },
          '10%': { transform: 'rotate(9deg)' },
          '22%': { transform: 'rotate(1deg)' },
          '34%': { transform: 'rotate(9deg)' },
          '46%': { transform: 'rotate(1deg)' },
          '56%': { transform: 'rotate(6deg)' },
        },
        breathe: { '0%,100%': { transform: 'translateY(0) rotate(0deg)' }, '50%': { transform: 'translateY(-8px) rotate(0.6deg)' } },
        swing: {
          '0%,100%': { transform: 'translateY(0) rotate(-5deg)' },
          '50%': { transform: 'translateY(-14px) rotate(5deg)' },
        },
        pop: { '0%': { transform: 'scale(0.6) translateY(10px)', opacity: '0' }, '100%': { transform: 'scale(1) translateY(0)', opacity: '1' } },
      },
      animation: {
        bob: 'bob 5s ease-in-out infinite',
        drift: 'drift 14s ease-in-out infinite',
        wave: 'wave 2.6s ease-in-out infinite',
        bye: 'bye 3.4s ease-in-out infinite',
        goodbye: 'goodbye 3.2s ease-in-out infinite',
        byewave: 'byewave 2.8s ease-in-out infinite',
        breathe: 'breathe 4.5s ease-in-out infinite',
        swing: 'swing 4s ease-in-out infinite',
        pop: 'pop 0.5s cubic-bezier(.2,1.4,.4,1) both',
      },
    },
  },
  plugins: [],
};
