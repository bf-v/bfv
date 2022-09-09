/// <reference types="vitest" />
import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import eslint from 'vite-plugin-eslint';

// https://vitejs.dev/config/
export default defineConfig({
  base: '/bfv/',
  plugins: [react(), eslint()],
  server: {
    port: 3000,
  },
  test: {
    include: [
      '**/*.{test,spec}.{js,mjs,cjs,ts,mts,cts,jsx,tsx}',
      '**/__tests__/*.{js,mjs,cjs,ts,mts,cts,jsx,tsx}',
    ],
    coverage: {
      all: true,
    },
  },
});
