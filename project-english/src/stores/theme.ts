import { defineStore } from 'pinia'
import { ref, watch } from 'vue'

export const useThemeStore = defineStore('theme', () => {
  // State
  const isDarkMode = ref(false)
  
  // Actions
  const toggleTheme = () => {
    isDarkMode.value = !isDarkMode.value
    applyTheme()
    saveThemeToStorage()
  }
  
  const setTheme = (dark: boolean) => {
    isDarkMode.value = dark
    applyTheme()
    saveThemeToStorage()
  }
  
  const applyTheme = () => {
    const html = document.documentElement
    
    if (isDarkMode.value) {
      html.classList.add('dark')
      html.style.colorScheme = 'dark'
    } else {
      html.classList.remove('dark')
      html.style.colorScheme = 'light'
    }
  }
  
  const saveThemeToStorage = () => {
    localStorage.setItem('theme', isDarkMode.value ? 'dark' : 'light')
  }
  
  const loadThemeFromStorage = () => {
    const savedTheme = localStorage.getItem('theme')
    
    if (savedTheme) {
      isDarkMode.value = savedTheme === 'dark'
    } else {
      // Detect system preference
      isDarkMode.value = window.matchMedia('(prefers-color-scheme: dark)').matches
    }
    
    applyTheme()
  }
  
  const initTheme = () => {
    loadThemeFromStorage()
    
    // Listen for system theme changes
    const mediaQuery = window.matchMedia('(prefers-color-scheme: dark)')
    mediaQuery.addEventListener('change', (e) => {
      if (!localStorage.getItem('theme')) {
        isDarkMode.value = e.matches
        applyTheme()
      }
    })
  }
  
  // Getters
  const currentTheme = () => isDarkMode.value ? 'dark' : 'light'
  const themeIcon = () => isDarkMode.value ? '🌙' : '☀️'
  const themeLabel = () => isDarkMode.value ? 'Chế độ tối' : 'Chế độ sáng'
  
  return {
    // State
    isDarkMode,
    
    // Actions
    toggleTheme,
    setTheme,
    initTheme,
    
    // Getters
    currentTheme,
    themeIcon,
    themeLabel
  }
})
