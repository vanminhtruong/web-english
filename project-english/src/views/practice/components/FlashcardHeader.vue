<template>
  <div class="bg-white dark:bg-black shadow border-b border-gray-200 dark:border-gray-800">
    <div class="max-w-4xl mx-auto py-6 px-4 sm:px-6 lg:px-8">
      <div class="flex items-center justify-between">
        <div class="flex items-center">
          <button @click="$emit('go-back')" class="mr-4 text-gray-500 dark:text-gray-400 hover:text-gray-700 dark:hover:text-gray-300">
            <svg class="w-6 h-6" fill="currentColor" viewBox="0 0 20 20">
              <path fill-rule="evenodd" d="M12.707 5.293a1 1 0 010 1.414L9.414 10l3.293 3.293a1 1 0 01-1.414 1.414l-4-4a1 1 0 010-1.414l4-4a1 1 0 011.414 0z" clip-rule="evenodd"/>
            </svg>
          </button>
          <div>
            <h1 class="text-3xl font-bold text-gray-900 dark:text-white">{{ $t('flashcard.modes.flashcard') }}</h1>
            <p class="mt-2 text-sm text-gray-600 dark:text-gray-300">{{ $t('flashcard.header.description', 'Luyện tập từ vựng với thẻ ghi nhớ') }}</p>
          </div>
        </div>
        
        <div class="flex items-center space-x-4">
          <!-- History Button -->
          <button @click="$emit('show-history')" class="text-gray-500 dark:text-gray-400 hover:text-gray-700 dark:hover:text-gray-300" :title="$t('flashcard.header.history')">
            <svg class="w-6 h-6" fill="currentColor" viewBox="0 0 20 20">
              <path fill-rule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm1-12a1 1 0 10-2 0v4a1 1 0 00.293.707l2.828 2.829a1 1 0 101.415-1.415L11 9.586V6z" clip-rule="evenodd"/>
            </svg>
          </button>

          <!-- Shuffle Toggle -->
          <div class="flex items-center space-x-2">
            <span class="text-sm text-gray-600 dark:text-gray-300">{{ $t('flashcard.settings.shuffle') }}</span>
            <button
              @click="$emit('toggle-shuffle')"
              :class="[
                'relative inline-flex h-6 w-11 items-center rounded-full transition-colors',
                shuffleEnabled ? 'bg-blue-600' : 'bg-gray-200 dark:bg-gray-600'
              ]"
              :title="$t('flashcard.settings.shuffle')"
            >
              <span
                :class="[
                  'inline-block h-4 w-4 transform rounded-full bg-white transition-transform',
                  shuffleEnabled ? 'translate-x-6' : 'translate-x-1'
                ]"
              />
            </button>
          </div>

          <div class="text-right">
            <p class="text-sm text-gray-500">{{ $t('flashcard.header.progress', 'Tiến độ') }}</p>
            <p class="text-lg font-semibold text-gray-900 dark:text-white">{{ currentIndex + 1 }} / {{ totalCards }}</p>
          </div>
          <div class="flex items-center space-x-2">
            <select
              :value="practiceMode"
              @change="$emit('change-practice-mode', $event.target.value)"
              class="px-3 py-1 text-sm border border-gray-300 dark:border-gray-600 rounded-md bg-white dark:bg-[#0f0f0f] cursor-pointer text-gray-900 dark:text-white"
            >
              <option value="flashcard">{{ $t('flashcard.modes.flashcard') }}</option>
              <option value="quiz">{{ $t('flashcard.modes.quiz') }}</option>
              <option value="typing">{{ $t('flashcard.modes.typing') }}</option>
              <option value="listening">{{ $t('flashcard.modes.listening') }}</option>
              <option value="image">{{ $t('flashcard.modes.image') }}</option>
              <option value="pronunciation">{{ $t('flashcard.modes.pronunciation') }}</option>
            </select>
            <button @click="$emit('show-settings')" class="text-gray-500 dark:text-gray-400 hover:text-gray-700 dark:hover:text-gray-300" :title="$t('flashcard.header.settings')">
              <svg class="w-6 h-6" fill="currentColor" viewBox="0 0 20 20">
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

interface Props {
  currentIndex: number
  totalCards: number
  practiceMode: string
  shuffleEnabled: boolean
}

defineProps<Props>()

const { t } = useI18n()

const emit = defineEmits<{
  'go-back': []
  'show-history': []
  'change-practice-mode': [mode: string]
  'show-settings': []
  'toggle-shuffle': []
}>()
</script>
