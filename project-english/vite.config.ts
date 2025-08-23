import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'
import { fileURLToPath, URL } from 'node:url'

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [vue()],
  base: process.env.NODE_ENV === 'production' ? '/web-english/' : '/',
  resolve: {
    alias: {
      '@': fileURLToPath(new URL('./src', import.meta.url))
    }
  },
  build: {
    assetsInlineLimit: 0,
    minify: false, // Tắt minify để debug dễ hơn
    sourcemap: false,
    target: 'esnext',
    rollupOptions: {
      output: {
        // Single file output với inline dynamic imports
        entryFileNames: 'assets/index.js',
        chunkFileNames: 'assets/index.js',
        assetFileNames: 'assets/[name].[ext]',
        // Tắt hết dynamic imports - gộp tất cả vào 1 file
        inlineDynamicImports: true
      }
    }
  },
  server: {
    port: 5173,
    host: true
  },
  // Cấu hình đặc biệt cho GitHub Pages
  define: {
    __APP_BASE_URL__: process.env.NODE_ENV === 'production' ? '"/web-english/"' : '"/"'
  }
})
