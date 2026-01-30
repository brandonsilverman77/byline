import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

export default defineConfig({
  plugins: [react()],
  build: {
    outDir: '../public/vite',
    emptyOutDir: true,
    manifest: true,
    rollupOptions: {
      input: 'src/main.jsx'
    }
  },
  server: {
    proxy: {
      '/graphql': {
        target: 'http://localhost:3000',
        changeOrigin: true
      }
    }
  }
})
