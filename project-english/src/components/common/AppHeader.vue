<template>
  <header 
    :class="[
      'backdrop-blur-md fixed top-0 left-0 right-0 z-50 transition-all duration-500 ease-out',
      isScrolled 
        ? 'bg-white/95 dark:bg-black/95 shadow-xl shadow-black/10 dark:shadow-white/10 border-b border-gray-200/10 dark:border-gray-700/10' 
        : 'bg-transparent shadow-none border-transparent'
    ]"
    :style="{
      position: 'fixed',
      top: 0,
      left: '0px',
      right: '0px',
      width: '100vw',
      maxWidth: '100vw',
      minWidth: '100vw',
      opacity: Math.max(0.9, 1 - scrollProgress * 0.1),
      backdropFilter: isScrolled ? 'blur(12px) saturate(180%)' : 'blur(0px)',
      WebkitBackdropFilter: isScrolled ? 'blur(12px) saturate(180%)' : 'blur(0px)',
      margin: 0,
      padding: 0,
      boxSizing: 'border-box',
      overflowX: 'hidden'
    }"
  >
    <div class="w-full px-4 sm:px-6 lg:px-8">
      <div class="flex items-center justify-between h-16">
        <!-- Logo and Title -->
        <div class="flex items-center space-x-2 sm:space-x-4">
          <img alt="Vue logo" src="@/assets/logo.svg" class="h-6 w-6 sm:h-8 sm:w-8 cursor-pointer" @click="handleLogoClick" :title="t('common.dashboard', 'Dashboard')" />
          <h1
            class="text-lg sm:text-xl font-bold text-gray-900 dark:text-white truncate cursor-pointer"
            @click="handleLogoClick"
            :title="t('common.dashboard', 'Dashboard')"
            role="button"
            tabindex="0"
            @keydown.enter.prevent="handleLogoClick"
            @keydown.space.prevent="handleLogoClick"
          >
            <span class="hidden sm:inline">English Learning App</span>
            <span class="sm:hidden">English App</span>
          </h1>
        </div>

        <!-- Desktop Navigation (hidden on mobile/tablet/lg) -->
        <div class="hidden xl:flex items-center space-x-4">
          <nav class="flex space-x-1">
            <RouterLink
              to="/dashboard"
              :class="[
                'text-gray-600 dark:text-gray-300 hover:text-gray-900 dark:hover:text-white px-3 py-2 rounded-md text-sm font-medium transition-all duration-200 ease-out hover:bg-gray-50 dark:hover:bg-gray-800/50 focus:outline-none',
                route.path === '/dashboard' ? 'bg-gray-300 dark:bg-gray-700 text-black dark:text-white font-bold' : ''
              ]"
            >
              {{ t('common.dashboard', 'Dashboard') }}
            </RouterLink>
            <RouterLink
              to="/vocabulary"
              :class="[
                'text-gray-600 dark:text-gray-300 hover:text-gray-900 dark:hover:text-white px-3 py-2 rounded-md text-sm font-medium transition-all duration-200 ease-out hover:bg-gray-50 dark:hover:bg-gray-800/50 focus:outline-none',
                route.path === '/vocabulary' ? 'bg-gray-300 dark:bg-gray-700 text-black dark:text-white font-bold' : ''
              ]"
            >
              {{ t('common.vocabulary', 'Vocabulary') }}
            </RouterLink>
            <RouterLink
              to="/grammar"
              :class="[
                'text-gray-600 dark:text-gray-300 hover:text-gray-900 dark:hover:text-white px-3 py-2 rounded-md text-sm font-medium transition-all duration-200 ease-out hover:bg-gray-50 dark:hover:bg-gray-800/50 focus:outline-none',
                route.path === '/grammar' ? 'bg-gray-300 dark:bg-gray-700 text-black dark:text-white font-bold' : ''
              ]"
            >
              {{ t('common.grammar', 'Grammar') }}
            </RouterLink>
            <RouterLink
              to="/practice/flashcard"
              :class="[
                'text-gray-600 dark:text-gray-300 hover:text-gray-900 dark:hover:text-white px-3 py-2 rounded-md text-sm font-medium transition-colors focus:outline-none',
                route.path === '/practice/flashcard' ? 'bg-gray-300 dark:bg-gray-700 text-black dark:text-white font-bold' : ''
              ]"
            >
              {{ t('common.practice', 'Practice') }}
            </RouterLink>
          </nav>

          <!-- Language Switcher -->
          <LanguageSwitcher />

          <!-- Theme Toggle -->
          <ThemeToggle />
        </div>

        <!-- Mobile Controls (visible on lg and below) -->
        <div class="xl:hidden flex items-center space-x-2">
          <!-- Language Switcher (compact) -->
          <LanguageSwitcher />
          
          <!-- Theme Toggle (compact) -->
          <ThemeToggle />
          
          <!-- Mobile Menu Button -->
          <button
            @click="toggleMobileMenu"
            class="inline-flex items-center justify-center p-2 rounded-md text-gray-600 dark:text-gray-300 hover:text-gray-900 dark:hover:text-white hover:bg-gray-100 dark:hover:bg-gray-800 focus:outline-none focus:ring-2 focus:ring-inset focus:ring-blue-500 transition-all duration-200 ease-out transform hover:scale-105 active:scale-95"
            :aria-expanded="isMobileMenuOpen"
            aria-label="Toggle navigation menu"
          >
            <!-- Hamburger Icon -->
            <svg
              v-if="!isMobileMenuOpen"
              class="h-6 w-6"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 6h16M4 12h16M4 18h16" />
            </svg>
            <!-- Close Icon -->
            <svg
              v-else
              class="h-6 w-6"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12" />
            </svg>
          </button>
        </div>
      </div>

      <!-- Mobile Navigation Menu -->
      <div
        v-show="isMobileMenuOpen"
        class="xl:hidden border-t border-gray-200 dark:border-gray-700 bg-white dark:bg-black transition-all duration-300 ease-out transform"
        :class="isMobileMenuOpen ? 'opacity-100 translate-y-0' : 'opacity-0 -translate-y-2 pointer-events-none'"
      >
        <nav class="px-2 pt-2 pb-3 space-y-1">
          <RouterLink
            to="/dashboard"
            @click="closeMobileMenu"
            :class="[
              'block px-3 py-2 rounded-md text-base font-medium text-gray-600 dark:text-gray-300 hover:text-gray-900 dark:hover:text-white hover:bg-gray-100 dark:hover:bg-gray-800 transition-all duration-200 ease-out transform hover:translate-x-1 hover:scale-105 focus:outline-none',
              route.path === '/dashboard' ? 'bg-gray-300 dark:bg-gray-700 text-black dark:text-white font-bold' : ''
            ]"
          >
            {{ t('common.dashboard', 'Dashboard') }}
          </RouterLink>
          <RouterLink
            to="/vocabulary"
            @click="closeMobileMenu"
            :class="[
              'block px-3 py-2 rounded-md text-base font-medium text-gray-600 dark:text-gray-300 hover:text-gray-900 dark:hover:text-white hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors focus:outline-none',
              route.path === '/vocabulary' ? 'bg-gray-300 dark:bg-gray-700 text-black dark:text-white font-bold' : ''
            ]"
          >
            {{ t('common.vocabulary', 'Vocabulary') }}
          </RouterLink>
          <RouterLink
            to="/grammar"
            @click="closeMobileMenu"
            :class="[
              'block px-3 py-2 rounded-md text-base font-medium text-gray-600 dark:text-gray-300 hover:text-gray-900 dark:hover:text-white hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors focus:outline-none',
              route.path === '/grammar' ? 'bg-gray-300 dark:bg-gray-700 text-black dark:text-white font-bold' : ''
            ]"
          >
            {{ t('common.grammar', 'Grammar') }}
          </RouterLink>
          <RouterLink
            to="/practice/flashcard"
            @click="closeMobileMenu"
            :class="[
              'block px-3 py-2 rounded-md text-base font-medium text-gray-600 dark:text-gray-300 hover:text-gray-900 dark:hover:text-white hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors focus:outline-none',
              route.path === '/practice/flashcard' ? 'bg-gray-300 dark:bg-gray-700 text-black dark:text-white font-bold' : ''
            ]"
          >
            {{ t('common.practice', 'Practice') }}
          </RouterLink>
        </nav>
      </div>
    </div>
  </header>
</template>

<script setup lang="ts">
import { defineAsyncComponent, ref, onMounted, onUnmounted } from 'vue'
import { useI18n } from 'vue-i18n'
import { RouterLink, useRoute, useRouter } from 'vue-router'
import { loadComponentSafely } from '../../utils/import-helper'

// Use defineAsyncComponent to import components
const ThemeToggle = defineAsyncComponent(
  loadComponentSafely(() => import('../ThemeToggle.vue'))
)
const LanguageSwitcher = defineAsyncComponent(
  loadComponentSafely(() => import('../LanguageSwitcher.vue'))
)

const { t } = useI18n()
const route = useRoute()
const router = useRouter()

// Mobile menu state
const isMobileMenuOpen = ref(false)
const isScrolled = ref(false)
const scrollProgress = ref(0)

// Scroll handling
const handleScroll = () => {
  const scrollY = window.scrollY
  isScrolled.value = scrollY > 10
  scrollProgress.value = Math.min(scrollY / 100, 1)
}

// Single-trigger animation: runs exactly once per scroll down
let animationTimeout: number | null = null
let hasAnimated = false
let lastScrollY = 0

const enhancedScroll = () => {
  const scrollY = window.scrollY
  const header = document.querySelector('header') as HTMLElement | null
  
  if (!header) return
  
  // Reset animation when back at top
  if (scrollY === 0) {
    isScrolled.value = false
    header.style.transform = 'translateY(0)'
    header.style.opacity = '1'
    header.style.boxShadow = 'none'
    hasAnimated = false // Reset for next scroll down
    lastScrollY = 0
    return
  }
  
  // Only trigger once when scrolling down
  const scrollingDown = scrollY > lastScrollY
  if (scrollingDown && !hasAnimated && scrollY > 50) {
    hasAnimated = true
    isScrolled.value = true
    
    // Step 1: Slide UP (out of view)
    header.style.transform = 'translateY(-64px)'
    header.style.opacity = '0.8'
    
    // Step 2: Wait 0.15s
    animationTimeout = window.setTimeout(() => {
      // Step 3: Slide DOWN (back into view)
      header.style.transform = 'translateY(0)'
      header.style.opacity = '1'
      
      animationTimeout = null
    }, 170)
    
    // Enhanced shadow
    const progress = Math.min(scrollY / 100, 1)
    const shadowIntensity = Math.min(progress * 0.3, 0.2)
    header.style.boxShadow = `0 ${4 + progress * 8}px ${8 + progress * 16}px rgba(0, 0, 0, ${shadowIntensity})`
  }
  
  lastScrollY = scrollY
}

onMounted(() => {
  window.addEventListener('scroll', enhancedScroll, { passive: true })
  enhancedScroll() // Initial check
})

onUnmounted(() => {
  window.removeEventListener('scroll', enhancedScroll)
})

// Mobile menu functions
const toggleMobileMenu = () => {
  isMobileMenuOpen.value = !isMobileMenuOpen.value
}

const closeMobileMenu = () => {
  isMobileMenuOpen.value = false
}

// Logo click: go to dashboard from anywhere; if already there, scroll to top
const handleLogoClick = async () => {
  try {
    if (route.path === '/dashboard') {
      window.scrollTo({ top: 0, behavior: 'smooth' })
    } else {
      if (isMobileMenuOpen.value) closeMobileMenu()
      await router.push('/dashboard')
      window.scrollTo({ top: 0, behavior: 'smooth' })
    }
  } catch (e) {
    // no-op
  }
}
</script>

<style scoped>
/* Timed slide animation styles */
header {
  position: fixed !important;
  top: 0 !important;
  left: 0 !important;
  right: 0 !important;
  width: 100vw !important;
  max-width: 100vw !important;
  min-width: 100vw !important;
  margin: 0 !important;
  padding: 0 !important;
  box-sizing: border-box !important;
  /* Smooth transitions for slide animation */
  transition: transform 0.4s cubic-bezier(0.4, 0, 0.2, 1), 
              opacity 0.4s cubic-bezier(0.4, 0, 0.2, 1),
              box-shadow 0.4s cubic-bezier(0.4, 0, 0.2, 1);
  will-change: transform, opacity, box-shadow;
}

/* Remove container constraints */
:deep(.max-w-7xl) {
  max-width: none !important;
  width: 100% !important;
  margin: 0 !important;
  padding-left: 1rem !important;
  padding-right: 1rem !important;
}

/* Ensure full width content */
.container {
  max-width: none !important;
  width: 100vw !important;
}

/* Remove border/outline/box-shadow for active/focus tab menu */
:deep(.router-link-active),
:deep(.router-link-exact-active),
:deep(a:focus) {
  outline: none !important;
  box-shadow: none !important;
  border: none !important;
}
</style>