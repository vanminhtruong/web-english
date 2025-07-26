<template>
  <header class="bg-white dark:bg-black shadow-sm border-b border-gray-200 dark:border-gray-700">
    <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
      <div class="flex items-center justify-between h-16">
        <!-- Logo and Title -->
        <div class="flex items-center space-x-2 sm:space-x-4">
          <img alt="Vue logo" src="@/assets/logo.svg" class="h-6 w-6 sm:h-8 sm:w-8" />
          <h1 class="text-lg sm:text-xl font-bold text-gray-900 dark:text-white truncate">
            <span class="hidden sm:inline">English Learning App</span>
            <span class="sm:hidden">English App</span>
          </h1>
        </div>

        <!-- Desktop Navigation (hidden on mobile/tablet/lg) -->
        <div class="hidden xl:flex items-center space-x-4">
          <nav class="flex space-x-1">
            <RouterLink to="/dashboard" class="text-gray-600 dark:text-gray-300 hover:text-gray-900 dark:hover:text-white px-3 py-2 rounded-md text-sm font-medium transition-colors">
              {{ t('common.dashboard', 'Dashboard') }}
            </RouterLink>
            <RouterLink to="/vocabulary" class="text-gray-600 dark:text-gray-300 hover:text-gray-900 dark:hover:text-white px-3 py-2 rounded-md text-sm font-medium transition-colors">
              {{ t('common.vocabulary', 'Từ vựng') }}
            </RouterLink>
            <RouterLink to="/grammar" class="text-gray-600 dark:text-gray-300 hover:text-gray-900 dark:hover:text-white px-3 py-2 rounded-md text-sm font-medium transition-colors">
              {{ t('common.grammar', 'Ngữ pháp') }}
            </RouterLink>
            <RouterLink to="/practice/flashcard" class="text-gray-600 dark:text-gray-300 hover:text-gray-900 dark:hover:text-white px-3 py-2 rounded-md text-sm font-medium transition-colors">
              {{ t('common.practice', 'Luyện tập') }}
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
            class="inline-flex items-center justify-center p-2 rounded-md text-gray-600 dark:text-gray-300 hover:text-gray-900 dark:hover:text-white hover:bg-gray-100 dark:hover:bg-gray-800 focus:outline-none focus:ring-2 focus:ring-inset focus:ring-blue-500 transition-colors"
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
        class="xl:hidden border-t border-gray-200 dark:border-gray-700 bg-white dark:bg-black"
      >
        <nav class="px-2 pt-2 pb-3 space-y-1">
          <RouterLink
            to="/dashboard"
            @click="closeMobileMenu"
            class="block px-3 py-2 rounded-md text-base font-medium text-gray-600 dark:text-gray-300 hover:text-gray-900 dark:hover:text-white hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors"
          >
            {{ t('common.dashboard', 'Dashboard') }}
          </RouterLink>
          <RouterLink
            to="/vocabulary"
            @click="closeMobileMenu"
            class="block px-3 py-2 rounded-md text-base font-medium text-gray-600 dark:text-gray-300 hover:text-gray-900 dark:hover:text-white hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors"
          >
            {{ t('common.vocabulary', 'Từ vựng') }}
          </RouterLink>
          <RouterLink
            to="/grammar"
            @click="closeMobileMenu"
            class="block px-3 py-2 rounded-md text-base font-medium text-gray-600 dark:text-gray-300 hover:text-gray-900 dark:hover:text-white hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors"
          >
            {{ t('common.grammar', 'Ngữ pháp') }}
          </RouterLink>
          <RouterLink
            to="/practice/flashcard"
            @click="closeMobileMenu"
            class="block px-3 py-2 rounded-md text-base font-medium text-gray-600 dark:text-gray-300 hover:text-gray-900 dark:hover:text-white hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors"
          >
            {{ t('common.practice', 'Luyện tập') }}
          </RouterLink>
        </nav>
      </div>
    </div>
  </header>
</template>

<script setup lang="ts">
import { defineAsyncComponent, ref } from 'vue'
import { useI18n } from 'vue-i18n'
import { RouterLink } from 'vue-router'
import { loadComponentSafely } from '../../utils/import-helper'

// Use defineAsyncComponent to import components
const ThemeToggle = defineAsyncComponent(
  loadComponentSafely(() => import('../ThemeToggle.vue'))
)
const LanguageSwitcher = defineAsyncComponent(
  loadComponentSafely(() => import('../LanguageSwitcher.vue'))
)

const { t } = useI18n()

// Mobile menu state
const isMobileMenuOpen = ref(false)

// Mobile menu functions
const toggleMobileMenu = () => {
  isMobileMenuOpen.value = !isMobileMenuOpen.value
}

const closeMobileMenu = () => {
  isMobileMenuOpen.value = false
}
</script>

<style scoped>
</style>