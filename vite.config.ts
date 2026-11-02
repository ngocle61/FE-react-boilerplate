import babel from '@rolldown/plugin-babel';
import tailwindcss from '@tailwindcss/vite';
import react, { reactCompilerPreset } from '@vitejs/plugin-react';
import path from 'node:path';
import { defineConfig } from 'vite';

const reactCompiler = process.env.VITEST ? [] : [babel({ presets: [reactCompilerPreset()] })];

export default defineConfig({
  plugins: [react(), ...reactCompiler, tailwindcss()],
  resolve: {
    alias: {
      '@ui/form': path.resolve(import.meta.dirname, 'src/_widgets/ui/form/public-api.ts'),
      '@ui': path.resolve(import.meta.dirname, 'src/_widgets/public-api.ts'),
      '@': path.resolve(import.meta.dirname, 'src'),
    },
  },
  build: {
    manifest: true,
  },
  server: {
    port: 3000,
    strictPort: true,
    proxy: {
      '/api': 'http://127.0.0.1:3001',
    },
  },
});
