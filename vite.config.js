import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'

export default defineConfig({
  plugins: [vue()],
  server: {
    port: 3005,
    open: true,
    proxy: {
      '/api':   { target: 'http://localhost:3025', changeOrigin: true },
      '/admin': { target: 'http://localhost:3025', changeOrigin: true }
    }
  },
  assetsInclude: ['**/*.mp4', '**/*.webm', '**/*.mov'],
  publicDir: 'public'
})
