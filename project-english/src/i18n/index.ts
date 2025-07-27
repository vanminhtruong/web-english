import { createI18n } from 'vue-i18n'

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

// Create i18n instance with empty messages initially
const i18n = createI18n({
  legacy: false,
  locale: getInitialLocale(),
  fallbackLocale: 'en',
  messages: {
    en: {},
    vi: {}
  }
})

// Load messages from public folder
async function loadMessages(locale: 'en' | 'vi') {
  try {
    const baseUrl = import.meta.env.PROD ? '/web-english' : ''
    const response = await fetch(`${baseUrl}/locales/${locale}.json`)
    if (!response.ok) {
      throw new Error(`Failed to load ${locale}.json: ${response.status}`)
    }
    const data = await response.json()
    i18n.global.setLocaleMessage(locale, data)
    console.log(`✅ Loaded ${locale} translations`)
  } catch (error) {
    console.error(`❌ Failed to load ${locale} messages:`, error)
  }
}

// Load initial locale on startup
loadMessages(getInitialLocale())

export default i18n

// Utility function to change locale
export async function setLocale(locale: 'en' | 'vi') {
  await loadMessages(locale)
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
export async function toggleLocale(): Promise<'en' | 'vi'> {
  const newLocale = i18n.global.locale.value === 'en' ? 'vi' : 'en'
  await setLocale(newLocale)
  return newLocale
}