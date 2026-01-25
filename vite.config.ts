import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vite.dev/config/
export default defineConfig({
  plugins: [react()],
  build: {
    rollupOptions: {
      output: {
        manualChunks: {
          'vendor': ['react', 'react-dom', 'zustand', '@supabase/supabase-js'],
          'markdown': ['react-markdown', 'remark-gfm'],
          'icons': ['lucide-react'],
        }
      }
    }
  }
})
