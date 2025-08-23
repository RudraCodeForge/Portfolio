import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

export default defineConfig({
  plugins: [react()],
  server: {
    host: '0.0.0.0',
    port: 3000,
    allowedHosts: [
      '51c73605-1a9f-4379-be47-36a3877f5ff2-00-2ov6y4dw50xo4.pike.replit.dev'
    ]
  }
});