<template>
  <div v-if="show" class="fixed inset-0 bg-gray-600 bg-opacity-50 overflow-y-auto h-full w-full z-50">
    <div class="relative top-20 mx-auto p-5 border w-96 shadow-lg rounded-md bg-white dark:bg-[#0a0a0a] dark:border-gray-800">
      <div class="mt-3 text-center">
        <div class="mx-auto flex items-center justify-center h-12 w-12 rounded-full bg-green-100 dark:bg-gray-800">
          <svg class="h-6 w-6 text-green-600 dark:text-green-400" fill="currentColor" viewBox="0 0 20 20">
            <path fill-rule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clip-rule="evenodd"/>
          </svg>
        </div>
        <h3 class="text-lg leading-6 font-medium text-gray-900 dark:text-white mt-4">{{ t('flashcard.completion.title') }}</h3>
        <div class="mt-2 px-7 py-3">
          <p class="text-sm text-gray-500 dark:text-gray-400">{{ t('flashcard.completion.description', { count: cardCount }) }}</p>
          <div class="mt-4 text-left">
            <p class="text-sm"><span class="font-medium text-green-600 dark:text-green-400">{{ t('flashcard.completion.correct') }}:</span> {{ stats.correct }}</p>
            <p class="text-sm"><span class="font-medium text-red-600 dark:text-red-400">{{ t('flashcard.completion.incorrect') }}:</span> {{ stats.incorrect }}</p>
            <p class="text-sm"><span class="font-medium text-gray-600 dark:text-gray-400">{{ t('flashcard.completion.accuracy') }}:</span> {{ (stats.correct + stats.incorrect) > 0 ? Math.round((stats.correct / (stats.correct + stats.incorrect)) * 100) : 0 }}%</p>
            <p class="text-sm mt-2">
              <span class="font-medium">{{ t('flashcard.completion.result') }}:</span>
              <span
                class="ml-1 px-2 py-0.5 text-xs font-medium rounded-full"
                :class="(stats.correct + stats.incorrect) > 0 && Math.round((stats.correct / (stats.correct + stats.incorrect)) * 100) >= 70
                  ? 'bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-200'
                  : 'bg-red-100 text-red-800 dark:bg-red-900 dark:text-red-200'"
              >
                {{ (stats.correct + stats.incorrect) > 0 && Math.round((stats.correct / (stats.correct + stats.incorrect)) * 100) >= 70 ? t('flashcard.history.pass') : t('flashcard.history.fail') }}
              </span>
            </p>
          </div>
        </div>
        <div class="items-center px-4 py-3 space-y-2">
          <button @click="emit('restart')" class="px-4 py-2 bg-blue-500 text-white text-base font-medium rounded-md w-full shadow-sm hover:bg-blue-600">
            {{ t('common.restart') }}
          </button>
          <button @click="emit('go-back')" class="px-4 py-2 bg-gray-300 dark:bg-gray-800 text-gray-700 dark:text-white text-base font-medium rounded-md w-full shadow-sm hover:bg-gray-400 dark:hover:bg-gray-700">
            {{ t('common.back') }}
          </button>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { useI18n } from 'vue-i18n'

defineProps<{
  show: boolean
  stats: any
  cardCount: number
}>()

const emit = defineEmits(['restart', 'go-back'])

const { t } = useI18n()
</script> 