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
    minify: 'terser', // Sử dụng terser cho minify tốt hơn
    sourcemap: false, // Tắt sourcemap cho production để giảm size
    target: 'esnext',
    rollupOptions: {
      output: {
        // Cấu hình naming patterns cho GitHub Pages
        entryFileNames: 'assets/[name]-[hash].js',
        chunkFileNames: 'assets/[name]-[hash].js',
        assetFileNames: 'assets/[name]-[hash].[ext]',
        manualChunks: {
          // Tách thành chunks nhỏ hơn
          'vue-vendor': ['vue', 'vue-router', 'pinia'],
          'ui-vendor': ['vue-toastification', 'vue-i18n'],
          'utils-vendor': ['canvas-confetti', 'vue-draggable-next']
        }
      }
    }
  },
  server: {
    port: 5173,
    host: true
  },
  // Cấu hình thêm cho GitHub Pages
  experimental: {
    renderBuiltUrl(filename, { hostType }) {
      if (hostType === 'js') {
        return { js: `${process.env.NODE_ENV === 'production' ? '/web-english/' : '/'}${filename}` }
      }
      return { relative: true }
    }
  }
})
