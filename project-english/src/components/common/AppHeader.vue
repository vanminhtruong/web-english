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
      overflow: 'visible'
    }"
  >
    <div class="w-full px-4 sm:px-6 lg:px-8 overflow-visible">
      <div class="flex items-center justify-between h-16 overflow-visible">
        <!-- Logo and Title -->
        <div class="flex items-center space-x-2 sm:space-x-4">
          <img
            alt="Vue logo"
            src="@/assets/logo.svg"
            class="header-logo h-6 w-6 sm:h-8 sm:w-8 cursor-pointer select-none"
            @click="handleLogoClick"
            :title="t('common.dashboard', 'Dashboard')"
          />
          <h1
            class="text-lg sm:text-xl font-bold text-gray-900 dark:text-white truncate cursor-pointer"
            @click="handleLogoClick"
            :title="t('common.dashboard', 'Dashboard')"
            role="button"
            tabindex="0"
            @keydown.enter.prevent="handleLogoClick"
            @keydown.space.prevent="handleLogoClick"
          >
            <span v-if="!isSmallScreen" class="logo-words" :aria-label="fullTitle" :key="`full-${animationCycleKey}`">
              <template v-for="(char, index) in titleFullChars">
                <span
                  v-if="char === ' '"
                  :key="`full-${index}-space`"
                  :class="['logo-char', 'logo-space', isHiding ? 'logo-char-hide' : '']"
                  :style="{ animationDelay: `${index * (isHiding ? hideStepMs : appearStepMs)}ms` }"
                >&nbsp;</span>
                <span
                  v-else
                  :key="`full-${index}-${char}`"
                  :class="['logo-char', isHiding ? 'logo-char-hide' : '']"
                  :style="{ animationDelay: `${index * (isHiding ? hideStepMs : appearStepMs)}ms` }"
                >{{ char }}</span>
              </template>
            </span>
            <span v-else class="logo-words" :aria-label="shortTitle" :key="`short-${animationCycleKey}`">
              <template v-for="(char, index) in titleShortChars">
                <span
                  v-if="char === ' '"
                  :key="`short-${index}-space`"
                  :class="['logo-char', 'logo-space', isHiding ? 'logo-char-hide' : '']"
                  :style="{ animationDelay: `${index * (isHiding ? hideStepMs : appearStepMs)}ms` }"
                >&nbsp;</span>
                <span
                  v-else
                  :key="`short-${index}-${char}`"
                  :class="['logo-char', isHiding ? 'logo-char-hide' : '']"
                  :style="{ animationDelay: `${index * (isHiding ? hideStepMs : appearStepMs)}ms` }"
                >{{ char }}</span>
              </template>
            </span>
          </h1>
        </div>

        <!-- Desktop Navigation (hidden on mobile/tablet/lg) -->
        <div class="hidden xl:flex items-center space-x-4 overflow-visible">
          <nav class="flex space-x-1 relative overflow-visible">
            <RouterLink
              to="/dashboard"
              :class="[
                'text-gray-600 dark:text-gray-300 hover:text-gray-900 dark:hover:text-white px-3 py-2 rounded-md text-sm font-medium transition-all duration-200 ease-out hover:bg-gray-50 dark:hover:bg-dark-bg-mute focus:outline-none',
                route.path === '/dashboard' ? 'bg-gray-300 dark:bg-dark-bg-mute text-black dark:text-white font-bold' : ''
              ]"
            >
              {{ t('common.dashboard', 'Dashboard') }}
            </RouterLink>
            
            <!-- Vocabulary Tab with Submenu -->
            <div class="relative group overflow-visible">
              <RouterLink
                to="/vocabulary"
                :class="[
                  'text-gray-600 dark:text-gray-300 hover:text-gray-900 dark:hover:text-white px-3 py-2 rounded-md text-sm font-medium transition-all duration-200 ease-out hover:bg-gray-50 dark:hover:bg-dark-bg-mute focus:outline-none flex items-center space-x-1',
                  route.path.startsWith('/vocabulary') ? 'bg-gray-300 dark:bg-dark-bg-mute text-black dark:text-white font-bold' : ''
                ]"
              >
                <span>{{ t('common.vocabulary', 'Vocabulary') }}</span>
                <svg class="w-4 h-4 transition-transform duration-200 group-hover:rotate-180" fill="currentColor" viewBox="0 0 20 20">
                  <path fill-rule="evenodd" d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z" clip-rule="evenodd" />
                </svg>
              </RouterLink>
              
              <!-- Submenu -->
              <div class="absolute top-full left-0 w-56 opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-200 ease-out transform translate-y-2 group-hover:translate-y-0 z-[9999] pointer-events-none group-hover:pointer-events-auto pt-1">
                <div class="bg-white dark:bg-[#0a0a0a] border border-gray-200 dark:border-dark-bg-mute rounded-lg shadow-lg dark:shadow-black/20 py-2">
                  <RouterLink
                    to="/vocabulary"
                    class="block px-4 py-2 text-sm text-gray-600 dark:text-gray-300 hover:text-gray-900 dark:hover:text-white hover:bg-gray-50 dark:hover:bg-dark-bg-mute transition-colors duration-150"
                  >
                    <div class="flex items-center space-x-2">
                      <svg class="w-4 h-4" fill="currentColor" viewBox="0 0 20 20">
                        <path d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                      </svg>
                      <span>{{ t('vocabulary.submenu.manageWords', 'Manage Words') }}</span>
                    </div>
                  </RouterLink>
                  
                  <RouterLink
                    to="/vocabulary/questions"
                    class="block px-4 py-2 text-sm text-gray-600 dark:text-gray-300 hover:text-gray-900 dark:hover:text-white hover:bg-gray-50 dark:hover:bg-dark-bg-mute transition-colors duration-150"
                  >
                    <div class="flex items-center space-x-2">
                      <svg class="w-4 h-4" fill="currentColor" viewBox="0 0 20 20">
                        <path fill-rule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-8-3a1 1 0 00-.867.5 1 1 0 11-1.731-1A3 3 0 0113 8a3.001 3.001 0 01-2 2.83V11a1 1 0 11-2 0v-1a1 1 0 011-1 1 1 0 100-2zm0 8a1 1 0 100-2 1 1 0 000 2z" clip-rule="evenodd" />
                      </svg>
                      <span>{{ t('vocabulary.submenu.manageQuestions', 'Manage Questions') }}</span>
                    </div>
                  </RouterLink>
                  
                  <RouterLink
                    to="/vocabulary/examples"
                    class="block px-4 py-2 text-sm text-gray-600 dark:text-gray-300 hover:text-gray-900 dark:hover:text-white hover:bg-gray-50 dark:hover:bg-dark-bg-mute transition-colors duration-150"
                  >
                    <div class="flex items-center space-x-2">
                      <svg class="w-4 h-4" fill="currentColor" viewBox="0 0 20 20">
                        <path fill-rule="evenodd" d="M4 4a2 2 0 012-2h8a2 2 0 012 2v12a1 1 0 110 2h-3a1 1 0 01-1-1v-2a1 1 0 00-1-1H9a1 1 0 00-1 1v2a1 1 0 01-1 1H4a1 1 0 110-2V4zm3 1h2v2H7V5zm2 4H7v2h2V9zm2-4h2v2h-2V5zm2 4h-2v2h2V9z" clip-rule="evenodd" />
                      </svg>
                      <span>{{ t('vocabulary.submenu.manageExamples', 'Manage Examples') }}</span>
                    </div>
                  </RouterLink>
                  
                  <div class="border-t border-gray-200 dark:border-dark-bg-mute my-1"></div>
                  
                  <RouterLink
                    to="/vocabulary/generator"
                    class="block px-4 py-2 text-sm text-gray-600 dark:text-gray-300 hover:text-gray-900 dark:hover:text-white hover:bg-gray-50 dark:hover:bg-dark-bg-mute transition-colors duration-150"
                  >
                    <div class="flex items-center space-x-2">
                      <svg class="w-4 h-4" fill="currentColor" viewBox="0 0 20 20">
                        <path fill-rule="evenodd" d="M11.49 3.17c-.38-1.56-2.6-1.56-2.98 0a1.532 1.532 0 01-2.286.948c-1.372-.836-2.942.734-2.106 2.106.54.886.061 2.042-.947 2.287-1.561.379-1.561 2.6 0 2.978a1.532 1.532 0 01.947 2.287c-.836 1.372.734 2.942 2.106 2.106a1.532 1.532 0 012.287.947c.379 1.561 2.6 1.561 2.978 0a1.533 1.533 0 012.287-.947c1.372.836 2.942-.734 2.106-2.106a1.533 1.533 0 01.947-2.287c1.561-.379 1.561-2.6 0-2.978a1.532 1.532 0 01-.947-2.287c.836-1.372-.734-2.942-2.106-2.106a1.532 1.532 0 01-2.287-.947zM10 13a3 3 0 100-6 3 3 0 000 6z" clip-rule="evenodd" />
                      </svg>
                      <span>{{ t('vocabulary.submenu.autoGenerator', 'Auto Generator') }}</span>
                    </div>
                  </RouterLink>
                </div>
              </div>
            </div>
            <RouterLink
              to="/grammar"
              :class="[
                'text-gray-600 dark:text-gray-300 hover:text-gray-900 dark:hover:text-white px-3 py-2 rounded-md text-sm font-medium transition-all duration-200 ease-out hover:bg-gray-50 dark:hover:bg-dark-bg-mute focus:outline-none',
                route.path === '/grammar' ? 'bg-gray-300 dark:bg-dark-bg-mute text-black dark:text-white font-bold' : ''
              ]"
            >
              {{ t('common.grammar', 'Grammar') }}
            </RouterLink>
            <RouterLink
              to="/practice/flashcard"
              :class="[
                'text-gray-600 dark:text-gray-300 hover:text-gray-900 dark:hover:text-white px-3 py-2 rounded-md text-sm font-medium transition-colors focus:outline-none',
                route.path === '/practice/flashcard' ? 'bg-gray-300 dark:bg-dark-bg-mute text-black dark:text-white font-bold' : ''
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
          <!-- Vocabulary Section in Mobile -->
          <div class="space-y-1">
            <RouterLink
              to="/vocabulary"
              @click="closeMobileMenu"
              :class="[
                'block px-3 py-2 rounded-md text-base font-medium text-gray-600 dark:text-gray-300 hover:text-gray-900 dark:hover:text-white hover:bg-gray-100 dark:hover:bg-dark-bg-mute transition-colors focus:outline-none',
                route.path === '/vocabulary' ? 'bg-gray-300 dark:bg-dark-bg-mute text-black dark:text-white font-bold' : ''
              ]"
            >
              {{ t('common.vocabulary', 'Vocabulary') }}
            </RouterLink>
            
            <!-- Mobile Vocabulary Submenu -->
            <div class="ml-4 space-y-1">
              <RouterLink
                to="/vocabulary/questions"
                @click="closeMobileMenu"
                class="block px-3 py-2 rounded-md text-sm text-gray-500 dark:text-gray-400 hover:text-gray-900 dark:hover:text-white hover:bg-gray-100 dark:hover:bg-dark-bg-mute transition-colors focus:outline-none"
              >
                <div class="flex items-center space-x-2">
                  <svg class="w-3 h-3" fill="currentColor" viewBox="0 0 20 20">
                    <path fill-rule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-8-3a1 1 0 00-.867.5 1 1 0 11-1.731-1A3 3 0 0113 8a3.001 3.001 0 01-2 2.83V11a1 1 0 11-2 0v-1a1 1 0 011-1 1 1 0 100-2zm0 8a1 1 0 100-2 1 1 0 000 2z" clip-rule="evenodd" />
                  </svg>
                  <span>{{ t('vocabulary.submenu.manageQuestions', 'Manage Questions') }}</span>
                </div>
              </RouterLink>
              <RouterLink
                to="/vocabulary/examples"
                @click="closeMobileMenu"
                class="block px-3 py-2 rounded-md text-sm text-gray-500 dark:text-gray-400 hover:text-gray-900 dark:hover:text-white hover:bg-gray-100 dark:hover:bg-dark-bg-mute transition-colors focus:outline-none"
              >
                <div class="flex items-center space-x-2">
                  <svg class="w-3 h-3" fill="currentColor" viewBox="0 0 20 20">
                    <path fill-rule="evenodd" d="M4 4a2 2 0 012-2h8a2 2 0 012 2v12a1 1 0 110 2h-3a1 1 0 01-1-1v-2a1 1 0 00-1-1H9a1 1 0 00-1 1v2a1 1 0 01-1 1H4a1 1 0 110-2V4zm3 1h2v2H7V5zm2 4H7v2h2V9zm2-4h2v2h-2V5zm2 4h-2v2h2V9z" clip-rule="evenodd" />
                  </svg>
                  <span>{{ t('vocabulary.submenu.manageExamples', 'Manage Examples') }}</span>
                </div>
              </RouterLink>
              <RouterLink
                to="/vocabulary/generator"
                @click="closeMobileMenu"
                class="block px-3 py-2 rounded-md text-sm text-gray-500 dark:text-gray-400 hover:text-gray-900 dark:hover:text-white hover:bg-gray-100 dark:hover:bg-dark-bg-mute transition-colors focus:outline-none"
              >
                <div class="flex items-center space-x-2">
                  <svg class="w-3 h-3" fill="currentColor" viewBox="0 0 20 20">
                    <path fill-rule="evenodd" d="M11.49 3.17c-.38-1.56-2.6-1.56-2.98 0a1.532 1.532 0 01-2.286.948c-1.372-.836-2.942.734-2.106 2.106.54.886.061 2.042-.947 2.287-1.561.379-1.561 2.6 0 2.978a1.532 1.532 0 01.947 2.287c-.836 1.372.734 2.942 2.106 2.106a1.532 1.532 0 012.287.947c.379 1.561 2.6 1.561 2.978 0a1.533 1.533 0 012.287-.947c1.372.836 2.942-.734 2.106-2.106a1.533 1.533 0 01.947-2.287c1.561-.379 1.561-2.6 0-2.978a1.532 1.532 0 01-.947-2.287c.836-1.372-.734-2.942-2.106-2.106a1.532 1.532 0 01-2.287-.947zM10 13a3 3 0 100-6 3 3 0 000 6z" clip-rule="evenodd" />
                  </svg>
                  <span>{{ t('vocabulary.submenu.autoGenerator', 'Auto Generator') }}</span>
                </div>
              </RouterLink>
            </div>
          </div>
          <RouterLink
            to="/grammar"
            @click="closeMobileMenu"
            :class="[
              'block px-3 py-2 rounded-md text-base font-medium text-gray-600 dark:text-gray-300 hover:text-gray-900 dark:hover:text-white hover:bg-gray-100 dark:hover:bg-dark-bg-mute transition-colors focus:outline-none',
              route.path === '/grammar' ? 'bg-gray-300 dark:bg-dark-bg-mute text-black dark:text-white font-bold' : ''
            ]"
          >
            {{ t('common.grammar', 'Grammar') }}
          </RouterLink>
          <RouterLink
            to="/practice/flashcard"
            @click="closeMobileMenu"
            :class="[
              'block px-3 py-2 rounded-md text-base font-medium text-gray-600 dark:text-gray-300 hover:text-gray-900 dark:hover:text-white hover:bg-gray-100 dark:hover:bg-dark-bg-mute transition-colors focus:outline-none',
              route.path === '/practice/flashcard' ? 'bg-gray-300 dark:bg-dark-bg-mute text-black dark:text-white font-bold' : ''
            ]"
          >
            {{ t('common.practice', 'Practice') }}
          </RouterLink>
        </nav>
      </div>
    </div>
    
    <!-- Scroll Progress Bar -->
    <div class="absolute bottom-0 left-0 right-0 h-1 bg-gray-200/20 dark:bg-white/10">
      <div 
        class="h-full bg-gradient-to-r from-blue-500 via-purple-500 to-pink-500 dark:from-blue-400 dark:via-purple-400 dark:to-pink-400 transition-all duration-150 ease-out"
        :style="{ width: `${scrollProgressPercentage}%` }"
      ></div>
    </div>
  </header>
</template>

<script setup lang="ts">
import { defineAsyncComponent, ref, onMounted, onUnmounted, computed } from 'vue'
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
const isSmallScreen = ref(false)

// Word cycle animation state
const appearStepMs = 120
const hideStepMs = 80
const cyclePauseMs = 1200
const isHiding = ref(false)
const animationCycleKey = ref(0)
let cycleTimer: number | null = null

// Scroll handling
const handleScroll = () => {
  const scrollY = window.scrollY
  isScrolled.value = scrollY > 10
  scrollProgress.value = Math.min(scrollY / 100, 1)
  
  // Calculate scroll progress percentage for progress bar
  const documentHeight = document.documentElement.scrollHeight - window.innerHeight
  scrollProgressPercentage.value = documentHeight > 0 ? Math.min((scrollY / documentHeight) * 100, 100) : 0
}

// Scroll progress percentage for progress bar
const scrollProgressPercentage = ref(0)

// Single-trigger animation: runs exactly once per scroll down
let animationTimeout: number | null = null
let hasAnimated = false
let lastScrollY = 0

const enhancedScroll = () => {
  const scrollY = window.scrollY
  const header = document.querySelector('header') as HTMLElement | null
  
  if (!header) return
  
  // Update scroll progress percentage for progress bar
  const documentHeight = document.documentElement.scrollHeight - window.innerHeight
  scrollProgressPercentage.value = documentHeight > 0 ? Math.min((scrollY / documentHeight) * 100, 100) : 0
  
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
  const media = window.matchMedia('(max-width: 639px)')
  const updateScreen = (e?: MediaQueryList | MediaQueryListEvent) => {
    isSmallScreen.value = e ? e.matches : media.matches
  }
  updateScreen(media)
  if (typeof media.addEventListener === 'function') {
    media.addEventListener('change', updateScreen)
  } else if (typeof media.addListener === 'function') {
    media.addListener(updateScreen)
  }
  ;(window as any).__headerMedia__ = { media, updateScreen }

  // Start cyclic appear -> hide -> appear loop
  const runCycle = () => {
    // Appear phase
    isHiding.value = false
    const wordsCount = isSmallScreen.value ? titleShortChars.value.length : titleFullChars.value.length
    const appearDuration = appearStepMs * wordsCount + cyclePauseMs

    // Schedule hide phase after appear completes
    cycleTimer = window.setTimeout(() => {
      isHiding.value = true
      const hideDuration = hideStepMs * wordsCount + cyclePauseMs

      // After hide completes, bump key to retrigger animation and loop
      cycleTimer = window.setTimeout(() => {
        animationCycleKey.value++
        runCycle()
      }, hideDuration)
    }, appearDuration)
  }

  runCycle()
  ;(window as any).__headerCycle__ = () => {
    if (cycleTimer) window.clearTimeout(cycleTimer)
  }
})

onUnmounted(() => {
  window.removeEventListener('scroll', enhancedScroll)
  const refObj = (window as any).__headerMedia__
  if (refObj && refObj.media) {
    const { media, updateScreen } = refObj
    if (typeof media.removeEventListener === 'function') {
      media.removeEventListener('change', updateScreen)
    } else if (typeof media.removeListener === 'function') {
      media.removeListener(updateScreen)
    }
    delete (window as any).__headerMedia__
  }
  const stopCycle = (window as any).__headerCycle__
  if (typeof stopCycle === 'function') {
    stopCycle()
    delete (window as any).__headerCycle__
  }
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

// Title animation: split into characters (including spaces) for staggered reveal
const fullTitle = computed(() => t('app.title', 'English Learning App'))
const shortTitle = computed(() => t('app.titleShort', 'English App'))
const titleFullChars = computed(() => Array.from(fullTitle.value))
const titleShortChars = computed(() => Array.from(shortTitle.value))
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

/* Header logo animations */
@keyframes header-logo-idle {
  0% {
    transform: translateY(0) scale(1) rotate(0deg);
    filter: drop-shadow(0 0 0 rgba(0,0,0,0));
  }
  25% {
    transform: translateY(-2px) scale(1.06) rotate(2deg);
    filter: drop-shadow(0 3px 6px rgba(0,0,0,0.15));
  }
  50% {
    transform: translateY(-4px) scale(1.1) rotate(0deg);
    filter: drop-shadow(0 6px 12px rgba(0,0,0,0.2));
  }
  75% {
    transform: translateY(-2px) scale(1.06) rotate(-2deg);
    filter: drop-shadow(0 3px 6px rgba(0,0,0,0.15));
  }
  100% {
    transform: translateY(0) scale(1) rotate(0deg);
    filter: drop-shadow(0 0 0 rgba(0,0,0,0));
  }
}

.header-logo {
  animation: header-logo-idle 3s ease-in-out infinite;
  transition: transform 220ms cubic-bezier(0.22, 1, 0.36, 1),
              filter 220ms cubic-bezier(0.22, 1, 0.36, 1);
  transform-origin: center;
  will-change: transform, filter;
}

.header-logo:hover {
  transform: translateY(-2px) scale(1.14) rotate(-12deg);
  filter: drop-shadow(0 10px 16px rgba(0,0,0,0.25));
}

.header-logo:active {
  transform: translateY(0) scale(0.95) rotate(-4deg);
}

@media (prefers-reduced-motion: reduce) {
  .header-logo {
    animation: none;
  }
}

/* Logo title char-by-char reveal */
@keyframes word-reveal-up {
  0% {
    opacity: 0;
    transform: translateY(12px) scale(0.98);
    filter: blur(2px);
  }
  60% {
    opacity: 1;
    transform: translateY(-2px) scale(1.02);
    filter: blur(0);
  }
  100% {
    opacity: 1;
    transform: translateY(0) scale(1);
  }
}

.logo-char-hide {
  animation-name: word-hide-down !important;
}

@keyframes word-hide-down {
  0% {
    opacity: 1;
    transform: translateY(0) scale(1);
    filter: blur(0);
  }
  100% {
    opacity: 0;
    transform: translateY(12px) scale(0.98);
    filter: blur(2px);
  }
}

.logo-words {
  display: inline-block;
}

.logo-char {
  display: inline-block;
  opacity: 0;
  animation: word-reveal-up 480ms cubic-bezier(0.22, 1, 0.36, 1) forwards;
  will-change: transform, opacity, filter;
}

.logo-space {
  width: 0.35em;
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

/* Ensure submenu visibility */
.group:hover .absolute {
  display: block !important;
}

/* Fix container overflow for dropdown visibility */
header,
header > *,
nav,
.group {
  overflow: visible !important;
}

/* Submenu positioning and visibility */
.group {
  position: relative !important;
}

.group .absolute {
  position: absolute !important;
  z-index: 9999 !important;
}
</style>