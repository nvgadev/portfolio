// Builds the whole site into one self-contained index.html (used for sharing a live preview).
import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import { viteSingleFile } from 'vite-plugin-singlefile';

export default defineConfig({
  plugins: [react(), viteSingleFile()],
  build: { outDir: 'dist-single', assetsInlineLimit: 100000000 },
});
