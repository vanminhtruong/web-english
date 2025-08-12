import './style.css'
import './assets/main.css'

import { createApp } from 'vue'
import { createPinia } from 'pinia'
import Toast, { type PluginOptions } from 'vue-toastification'
import 'vue-toastification/dist/index.css'

import App from './App.vue'
import router from './router'
import { useThemeStore } from './stores/theme'
import i18n, { ensureI18nReady } from './i18n'

const app = createApp(App)
const pinia = createPinia()

app.use(pinia)
app.use(router)
app.use(i18n)

const options: PluginOptions = {
  transition: 'Vue-Toastification__bounce',
  maxToasts: 5,
  newestOnTop: true,
  filterBeforeCreate: (toast, toasts) => {
    if (toasts.filter(t => t.content === toast.content).length !== 0) {
      return false
    }
    return toast
  },
  bodyClassName: ['font-sans', 'text-sm'],
  toastClassName: ['custom-toast'],
  closeButtonClassName: 'dark:text-white dark:hover:text-gray-200'
}

app.use(Toast, options)

// Initialize theme after Pinia is set up
const themeStore = useThemeStore()
themeStore.initTheme()

// Ensure i18n messages are loaded before mount to avoid flashing keys
;(async () => {
  await ensureI18nReady()
  app.mount('#app')
})()
