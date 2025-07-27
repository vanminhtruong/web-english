import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Read the original JSON files
const enJson = JSON.parse(fs.readFileSync(path.join(__dirname, '../src/i18n/locales/en.json'), 'utf8'));
const viJson = JSON.parse(fs.readFileSync(path.join(__dirname, '../src/i18n/locales/vi.json'), 'utf8'));

// Generate TypeScript content with inline JSON
const tsContent = `import { createI18n } from 'vue-i18n'

// Inline translations to avoid bundling issues on GitHub Pages
const en = ${JSON.stringify(enJson, null, 2)} as const

const vi = ${JSON.stringify(viJson, null, 2)} as const

// Type definitions for messages
type MessageSchema = typeof en

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

const i18n = createI18n({
  legacy: false, // you must set \`false\`, to use Composition API
  locale: getInitialLocale(), // set default locale
  fallbackLocale: 'en', // set fallback locale
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
`;

// Write the new TypeScript file
fs.writeFileSync(path.join(__dirname, '../src/i18n/index.ts'), tsContent);

console.log('✅ Translations synced successfully!');
console.log('📝 Updated src/i18n/index.ts with inline translations');
