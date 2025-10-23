import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'

export default defineConfig({
  plugins: [vue()],
  server: {
    port: 3005,
    open: true
  },
  assetsInclude: ['**/*.mp4', '**/*.webm', '**/*.mov'],
  publicDir: 'public'
})
