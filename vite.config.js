import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vite.dev/config/
export default defineConfig({
  plugins: [react()],
  server: {
    port: 5173,
    strictPort: false,
  },
  build: {
    // Optimizacija build procesa
    rollupOptions: {
      output: {
        // Code splitting - manji chunkovi
        manualChunks: {
          'react-vendor': ['react', 'react-dom', 'react-router-dom'],
        },
      },
    },
    // Kompresija i optimizacija
    minify: 'terser',
    terserOptions: {
      compress: {
        drop_console: true, // Ukloni console.log u production
        drop_debugger: true,
      },
    },
    // Chunk size warnings
    chunkSizeWarningLimit: 1000,
    // Source maps samo za development
    sourcemap: false,
  },
  // Optimizacija za production
  optimizeDeps: {
    include: ['react', 'react-dom', 'react-router-dom'],
  },
})


