import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

export default defineConfig(({ command }) => ({
  // GitHub Pages serves this project at https://<user>.github.io/Java-master/
  // so builds must use the repo name as the base path.
  // For local dev, use '/' so URLs stay simple.
  base: command === 'build' ? '/Java-master/' : '/',
  plugins: [react()],
  server: {
    port: 5173,
  },
}));
