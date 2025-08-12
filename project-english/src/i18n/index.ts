import { createI18n } from 'vue-i18n'
import type { I18n } from 'vue-i18n'
import en from './locales/en.json'
import vi from './locales/vi.json'

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

const i18n: I18n = createI18n({
  legacy: false,
  locale: getInitialLocale(),
  fallbackLocale: 'en',
  globalInjection: true,
  missingWarn: false,
  fallbackWarn: false,
  silentTranslationWarn: true,
  silentFallbackWarn: true,
  messages: {
    en,
    vi
  }
})

export default i18n

// Utility function to change locale
export function setLocale(locale: 'en' | 'vi') {
  i18n.global.locale.value = locale
  try {
    localStorage.setItem('locale', locale)
  } catch (error) {
    console.warn('Could not save locale to localStorage:', error)
  }
  document.querySelector('html')?.setAttribute('lang', locale)
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