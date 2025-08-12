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
    assetsInlineLimit: 0, // Don't inline any assets
    minify: false, // Không sử dụng minify để tránh lỗi JavaScript
    sourcemap: true, // Thêm sourcemap để dễ debug
    rollupOptions: {
      output: {
        manualChunks: (id) => {
          // Split the code into chunks to avoid large files
          if (id.includes('node_modules')) {
            if (id.includes('vue-toastification')) {
              return 'vendor-toast';
            }
            return 'vendor';
          }
        }
      }
    }
  },
  server: {
    port: 5173,
    host: true
  }
})
