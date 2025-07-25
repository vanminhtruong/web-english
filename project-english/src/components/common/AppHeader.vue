<template>
  <header class="bg-white dark:bg-black shadow-sm border-b border-gray-200 dark:border-gray-700">
    <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
      <div class="flex items-center justify-between h-16">
        <div class="flex items-center space-x-4">
          <img alt="Vue logo" src="@/assets/logo.svg" class="h-8 w-8" />
          <h1 class="text-xl font-bold text-gray-900 dark:text-white">English Learning App</h1>
        </div>

        <div class="flex items-center space-x-4">
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
      </div>
    </div>
  </header>
</template>

<script setup lang="ts">
import { defineAsyncComponent } from 'vue'
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
</script>

<style scoped>
</style> 