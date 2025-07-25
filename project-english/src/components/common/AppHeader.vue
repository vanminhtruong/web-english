<template>
  <header class="bg-white dark:bg-black shadow-sm border-b border-gray-200 dark:border-gray-700">
    <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
      <div class="flex items-center justify-between h-16">
        <div class="flex items-center space-x-2 md:space-x-4 min-w-0">
          <img alt="Vue logo" src="@/assets/logo.svg" class="h-6 w-6 md:h-8 md:w-8 flex-shrink-0" />
          <h1 class="text-base md:text-xl font-bold text-gray-900 dark:text-white truncate">
            <span class="hidden sm:inline">English Learning App</span>
            <span class="sm:hidden">English App</span>
          </h1>
        </div>

        <div class="flex items-center space-x-1 md:space-x-4">
          <nav class="hidden lg:flex space-x-1">
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

          <!-- Mobile Navigation Menu Button -->
          <button 
            @click="toggleMobileMenu"
            class="lg:hidden p-2 rounded-md text-gray-600 dark:text-gray-300 hover:text-gray-900 dark:hover:text-white hover:bg-gray-100 dark:hover:bg-gray-800 focus:outline-none focus:ring-2 focus:ring-blue-500"
            :aria-label="showMobileMenu ? 'Close menu' : 'Open menu'"
          >
            <svg class="h-6 w-6" :class="{ 'hidden': showMobileMenu, 'block': !showMobileMenu }" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 6h16M4 12h16M4 18h16" />
            </svg>
            <svg class="h-6 w-6" :class="{ 'block': showMobileMenu, 'hidden': !showMobileMenu }" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12" />
            </svg>
          </button>

          <!-- Language Switcher -->
          <LanguageSwitcher />

          <!-- Theme Toggle -->
          <ThemeToggle />
        </div>
      </div>

      <!-- Mobile Navigation Menu -->
      <div class="lg:hidden" :class="{ 'block': showMobileMenu, 'hidden': !showMobileMenu }">
        <div class="px-2 pt-2 pb-3 space-y-1 border-t border-gray-200 dark:border-gray-700">
          <RouterLink 
            to="/dashboard" 
            @click="showMobileMenu = false"
            class="block px-3 py-2 rounded-md text-base font-medium text-gray-600 dark:text-gray-300 hover:text-gray-900 dark:hover:text-white hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors"
          >
            {{ t('common.dashboard', 'Dashboard') }}
          </RouterLink>
          <RouterLink 
            to="/vocabulary" 
            @click="showMobileMenu = false"
            class="block px-3 py-2 rounded-md text-base font-medium text-gray-600 dark:text-gray-300 hover:text-gray-900 dark:hover:text-white hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors"
          >
            {{ t('common.vocabulary', 'Từ vựng') }}
          </RouterLink>
          <RouterLink 
            to="/grammar" 
            @click="showMobileMenu = false"
            class="block px-3 py-2 rounded-md text-base font-medium text-gray-600 dark:text-gray-300 hover:text-gray-900 dark:hover:text-white hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors"
          >
            {{ t('common.grammar', 'Ngữ pháp') }}
          </RouterLink>
          <RouterLink 
            to="/practice/flashcard" 
            @click="showMobileMenu = false"
            class="block px-3 py-2 rounded-md text-base font-medium text-gray-600 dark:text-gray-300 hover:text-gray-900 dark:hover:text-white hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors"
          >
            {{ t('common.practice', 'Luyện tập') }}
          </RouterLink>
        </div>
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
const showMobileMenu = ref(false)

const toggleMobileMenu = () => {
  showMobileMenu.value = !showMobileMenu.value
}
</script>

<style scoped>
</style> 