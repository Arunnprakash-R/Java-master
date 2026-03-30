import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

export default defineConfig({
  // GitHub Pages serves this project at https://<user>.github.io/Java-master/
  // so we must build with the repo name as the base path.
  base: '/Java-master/',
  plugins: [react()],
  server: {
    port: 5173,
  },
});
