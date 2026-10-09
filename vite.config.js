import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

export default defineConfig({
  // GitHub Pages serves the site from /portfolio/; everywhere else it lives at /
  base: process.env.VITE_BASE || '/',
  plugins: [react()],
  build: {
    rollupOptions: {
      output: { manualChunks: { vendor: ['react', 'react-dom'], gsap: ['gsap'] } },
    },
  },
});
