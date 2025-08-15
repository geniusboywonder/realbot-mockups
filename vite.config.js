import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import path from 'path';

export default defineConfig({
  plugins: [react()],
  resolve: {
    alias: {
      '@mockups': path.resolve(__dirname, '../mockups'),
      '@shared': path.resolve(__dirname, '../shared'),
    },
  },

server: {
  fs: {
    allow: ['..'], // allow access to parent folders
  },
},
});
