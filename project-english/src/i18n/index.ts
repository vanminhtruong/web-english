import { createI18n } from 'vue-i18n'

// Note: We load locale messages asynchronously from public/locales at runtime
// to ensure correct behavior on GitHub Pages (subpath deployments).
import enSrc from './locales/en.json'
import viSrc from './locales/vi.json'

// Safe locale getter with fallback
function getInitialLocale(): 'en' | 'vi' {
  try {
    const savedLocale = localStorage.getItem('locale')
    return (savedLocale === 'en' || savedLocale === 'vi') ? savedLocale : 'vi'
  } catch (error) {
    console.warn('localStorage not available, using default locale:', error)
    return 'vi'
  }
}

const initialLocale = getInitialLocale()

const i18n = createI18n({
  legacy: false, // you must set `false`, to use Composition API
  locale: initialLocale, // set default locale
  fallbackLocale: 'en', // set fallback locale
  globalInjection: true, // Enable global $t function
  missingWarn: false, // Disable missing translation warnings
  fallbackWarn: false, // Disable fallback warnings
  silentTranslationWarn: true, // Silence translation warnings
  silentFallbackWarn: true, // Silence fallback warnings
  messages: {} // messages will be loaded asynchronously
})

// Track which locales have been loaded
const loadedLocales = new Set<string>()

async function loadMessages(locale: 'en' | 'vi') {
  if (loadedLocales.has(locale)) return
  try {
    const publicBase = (import.meta.env.BASE_URL || '/').replace(/\/$/, '')
    const url = `${publicBase}/locales/${locale}.json`
    const res = await fetch(url, { cache: 'no-cache' })
    if (!res.ok) throw new Error(`Failed to load ${url}: ${res.status}`)
    const messages = await res.json()
    // Merge with src fallbacks to ensure no missing keys render '.'
    const fallbackMsgs = (locale === 'en' ? enSrc : viSrc) as Record<string, any>
    const merged = { ...(fallbackMsgs as Record<string, any>), ...(messages as Record<string, any>) }
    i18n.global.setLocaleMessage(locale, merged)
    loadedLocales.add(locale)
    // Force re-render if this is the active locale
    if (i18n.global.locale.value === locale) {
      // Re-assign the same value to trigger watchers
      i18n.global.locale.value = locale
    }
    console.info(`[i18n] Loaded messages for ${locale} from`, url)
  } catch (err) {
    console.error('Error loading locale messages:', err)
  }
}

// Preload the initial locale and fallback ('en') in the background
void loadMessages(initialLocale)
if (initialLocale !== 'en') {
  void loadMessages('en')
}

export default i18n

// Utility function to change locale
export function setLocale(locale: 'en' | 'vi') {
  // Ensure messages for target locale are loaded (fire-and-forget to keep API sync)
  if (!loadedLocales.has(locale)) {
    void loadMessages(locale)
  }
  i18n.global.locale.value = locale
  try {
    localStorage.setItem('locale', locale)
  } catch (error) {
    console.warn('Could not save locale to localStorage:', error)
  }
  document.querySelector('html')?.setAttribute('lang', locale)
}

// Ensure i18n resources are ready before app mount
export async function ensureI18nReady(): Promise<void> {
  const current = i18n.global.locale.value as 'en' | 'vi'
  await loadMessages(current)
  if (current !== 'en') {
    await loadMessages('en')
  }
}

// Utility function to get current locale
export function getLocale(): 'en' | 'vi' {
  return i18n.global.locale.value as 'en' | 'vi'
}

// Utility function to check if current locale is English
export function isEnglish(): boolean {
  return i18n.global.locale.value === 'en'
}

// Utility function to toggle locale
export function toggleLocale(): 'en' | 'vi' {
  const newLocale = i18n.global.locale.value === 'en' ? 'vi' : 'en'
  setLocale(newLocale)
  return newLocale
}