import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

// GitHub Pages serves this project from /lawafrica-web/, not from the domain
// root, so every built asset URL needs that prefix. Locally the prefix is '/',
// which is why base is read from the mode rather than hard-coded.
export default defineConfig(({ command }) => ({
  base: command === 'build' ? '/lawafrica-web/' : '/',
  plugins: [react()],
  server: { port: 5173, open: true }
}));
