<template>
  <div class="bg-white dark:bg-black shadow border-b border-gray-200 dark:border-gray-800">
    <div class="max-w-4xl mx-auto py-3 sm:py-4 md:py-6 px-3 sm:px-4 md:px-6">
      <!-- Mobile Layout (below sm) -->
      <div class="sm:hidden">
        <!-- Top Row: Back button + Title -->
        <div class="flex items-center justify-between mb-3">
          <div class="flex items-center">
            <button @click="$emit('go-back')" class="mr-3 text-gray-500 dark:text-gray-400 hover:text-gray-700 dark:hover:text-gray-300">
              <svg class="w-5 h-5" fill="currentColor" viewBox="0 0 20 20">
                <path fill-rule="evenodd" d="M12.707 5.293a1 1 0 010 1.414L9.414 10l3.293 3.293a1 1 0 01-1.414 1.414l-4-4a1 1 0 010-1.414l4-4a1 1 0 011.414 0z" clip-rule="evenodd"/>
              </svg>
            </button>
            <div>
              <h1 class="text-xl font-bold text-gray-900 dark:text-white">{{ t('flashcard.modes.flashcard') }}</h1>
            </div>
          </div>
          <div class="text-right">
            <p class="text-xs text-gray-500">{{ t('flashcard.header.progress', 'Tiến độ') }}</p>
            <p class="text-sm font-semibold text-gray-900 dark:text-white">{{ currentIndex + 1 }}/{{ totalCards }}</p>
          </div>
        </div>
        
        <!-- Bottom Row: Controls -->
        <div class="flex items-center justify-between">
          <div class="flex items-center space-x-2">
            <!-- History Button -->
            <button @click="$emit('show-history')" class="text-gray-500 dark:text-gray-400 hover:text-gray-700 dark:hover:text-gray-300" :title="t('flashcard.header.history')">
              <svg class="w-5 h-5" fill="currentColor" viewBox="0 0 20 20">
                <path fill-rule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm1-12a1 1 0 10-2 0v4a1 1 0 00.293.707l2.828 2.829a1 1 0 101.415-1.415L11 9.586V6z" clip-rule="evenodd"/>
              </svg>
            </button>
            
            <!-- Settings Button -->
            <button @click="$emit('show-settings')" class="text-gray-500 dark:text-gray-400 hover:text-gray-700 dark:hover:text-gray-300" :title="t('flashcard.header.settings')">
              <svg class="w-5 h-5" fill="currentColor" viewBox="0 0 20 20">
                <path fill-rule="evenodd" d="M11.49 3.17c-.38-1.56-2.6-1.56-2.98 0a1.532 1.532 0 01-2.286.948c-1.372-.836-2.942.734-2.106 2.106.54.886.061 2.042-.947 2.287-1.561.379-1.561 2.6 0 2.978a1.532 1.532 0 01.947 2.287c-.836 1.372.734 2.942 2.106 2.106a1.532 1.532 0 012.287.947c.379 1.561 2.6 1.561 2.978 0a1.533 1.533 0 012.287-.947c1.372.836 2.942-.734 2.106-2.106a1.533 1.533 0 01.947-2.287c1.561-.379 1.561-2.6 0-2.978a1.532 1.532 0 01-.947-2.287c.836-1.372-.734-2.942-2.106-2.106a1.532 1.532 0 01-2.287-.947zM10 13a3 3 0 100-6 3 3 0 000 6z" clip-rule="evenodd"/>
              </svg>
            </button>
          </div>
          
          <div class="flex items-center space-x-2">
            <!-- Practice Mode Select -->
            <select
              :value="practiceMode"
              @change="handlePracticeModeChange"
              class="px-2 py-1 text-xs border border-gray-300 dark:border-gray-600 rounded-md bg-white dark:bg-[#0f0f0f] cursor-pointer text-gray-900 dark:text-white"
            >
              <option value="flashcard">{{ t('flashcard.modes.flashcard') }}</option>
              <option value="quiz">{{ t('flashcard.modes.quiz') }}</option>
              <option value="typing">{{ t('flashcard.modes.typing') }}</option>
              <option value="listening">{{ t('flashcard.modes.listening') }}</option>
              <option value="image">{{ t('flashcard.modes.image') }}</option>
              <option value="pronunciation">{{ t('flashcard.modes.pronunciation') }}</option>
            </select>
            
            <!-- Shuffle Toggle -->
            <button
              @click="$emit('toggle-shuffle')"
              :class="[
                'relative inline-flex h-5 w-9 items-center rounded-full transition-colors',
                shuffleEnabled ? 'bg-blue-600' : 'bg-gray-200 dark:bg-gray-600'
              ]"
              :title="t('flashcard.settings.shuffle')"
            >
              <span
                :class="[
                  'inline-block h-3 w-3 transform rounded-full bg-white transition-transform',
                  shuffleEnabled ? 'translate-x-5' : 'translate-x-1'
                ]"
              />
            </button>
          </div>
        </div>
      </div>
      
      <!-- Tablet & Desktop Layout (sm and above) -->
      <div class="hidden sm:flex items-center justify-between">
        <div class="flex items-center">
          <button @click="$emit('go-back')" class="mr-4 text-gray-500 dark:text-gray-400 hover:text-gray-700 dark:hover:text-gray-300">
            <svg class="w-6 h-6 md:w-7 md:h-7" fill="currentColor" viewBox="0 0 20 20">
              <path fill-rule="evenodd" d="M12.707 5.293a1 1 0 010 1.414L9.414 10l3.293 3.293a1 1 0 01-1.414 1.414l-4-4a1 1 0 010-1.414l4-4a1 1 0 011.414 0z" clip-rule="evenodd"/>
            </svg>
          </button>
          <div>
            <h1 class="text-2xl md:text-3xl font-bold text-gray-900 dark:text-white">{{ t('flashcard.modes.flashcard') }}</h1>
            <p class="mt-1 md:mt-2 text-sm md:text-base text-gray-600 dark:text-gray-300">{{ t('flashcard.header.description', 'Luyện tập từ vựng với thẻ ghi nhớ') }}</p>
          </div>
        </div>
        
        <div class="flex items-center space-x-3 md:space-x-4">
          <!-- History Button -->
          <button @click="$emit('show-history')" class="text-gray-500 dark:text-gray-400 hover:text-gray-700 dark:hover:text-gray-300" :title="t('flashcard.header.history')">
            <svg class="w-6 h-6 md:w-7 md:h-7" fill="currentColor" viewBox="0 0 20 20">
              <path fill-rule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm1-12a1 1 0 10-2 0v4a1 1 0 00.293.707l2.828 2.829a1 1 0 101.415-1.415L11 9.586V6z" clip-rule="evenodd"/>
            </svg>
          </button>

          <!-- Shuffle Toggle -->
          <div class="flex items-center space-x-2 md:space-x-3">
            <span class="text-sm md:text-base text-gray-600 dark:text-gray-300">{{ t('flashcard.settings.shuffle') }}</span>
            <button
              @click="$emit('toggle-shuffle')"
              :class="[
                'relative inline-flex items-center rounded-full transition-colors',
                'h-6 w-11 md:h-7 md:w-12',
                shuffleEnabled ? 'bg-blue-600' : 'bg-gray-200 dark:bg-gray-600'
              ]"
              :title="t('flashcard.settings.shuffle')"
            >
              <span
                :class="[
                  'inline-block transform rounded-full bg-white transition-transform',
                  'h-4 w-4 md:h-5 md:w-5',
                  shuffleEnabled ? 'translate-x-6 md:translate-x-6' : 'translate-x-1'
                ]"
              />
            </button>
          </div>

          <div class="text-right">
            <p class="text-sm md:text-base text-gray-500">{{ t('flashcard.header.progress', 'Tiến độ') }}</p>
            <p class="text-lg md:text-xl font-semibold text-gray-900 dark:text-white">{{ currentIndex + 1 }} / {{ totalCards }}</p>
          </div>
          
          <div class="flex items-center space-x-2 md:space-x-3">
            <select
              :value="practiceMode"
              @change="handlePracticeModeChange"
              class="px-3 py-1 md:px-4 md:py-2 text-sm md:text-base border border-gray-300 dark:border-gray-600 rounded-md bg-white dark:bg-[#0f0f0f] cursor-pointer text-gray-900 dark:text-white"
            >
              <option value="flashcard">{{ t('flashcard.modes.flashcard') }}</option>
              <option value="quiz">{{ t('flashcard.modes.quiz') }}</option>
              <option value="typing">{{ t('flashcard.modes.typing') }}</option>
              <option value="listening">{{ t('flashcard.modes.listening') }}</option>
              <option value="image">{{ t('flashcard.modes.image') }}</option>
              <option value="pronunciation">{{ t('flashcard.modes.pronunciation') }}</option>
            </select>
            <button @click="$emit('show-settings')" class="text-gray-500 dark:text-gray-400 hover:text-gray-700 dark:hover:text-gray-300" :title="t('flashcard.header.settings')">
              <svg class="w-6 h-6 md:w-7 md:h-7" fill="currentColor" viewBox="0 0 20 20">
                <path fill-rule="evenodd" d="M11.49 3.17c-.38-1.56-2.6-1.56-2.98 0a1.532 1.532 0 01-2.286.948c-1.372-.836-2.942.734-2.106 2.106.54.886.061 2.042-.947 2.287-1.561.379-1.561 2.6 0 2.978a1.532 1.532 0 01.947 2.287c-.836 1.372.734 2.942 2.106 2.106a1.532 1.532 0 012.287.947c.379 1.561 2.6 1.561 2.978 0a1.533 1.533 0 012.287-.947c1.372.836 2.942-.734 2.106-2.106a1.533 1.533 0 01.947-2.287c1.561-.379 1.561-2.6 0-2.978a1.532 1.532 0 01-.947-2.287c.836-1.372-.734-2.942-2.106-2.106a1.532 1.532 0 01-2.287-.947zM10 13a3 3 0 100-6 3 3 0 000 6z" clip-rule="evenodd"/>
              </svg>
            </button>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { useI18n } from 'vue-i18n'
import type { PracticeMode } from '../types'

interface Props {
  currentIndex: number
  totalCards: number
  practiceMode: PracticeMode
  shuffleEnabled: boolean
}

defineProps<Props>()

const { t } = useI18n()

const emit = defineEmits<{
  'go-back': []
  'show-history': []
  'change-practice-mode': [mode: PracticeMode]
  'show-settings': []
  'toggle-shuffle': []
}>()

const handlePracticeModeChange = (event: Event) => {
  const target = event.target as HTMLSelectElement
  emit('change-practice-mode', target.value as PracticeMode)
}
</script>
