<template>
  <!-- Move arrow - only visible when move mode is active -->
  <button 
    v-if="moveMode"
    @click.stop="handleMoveClick"
    class="text-blue-500 hover:text-blue-600 dark:text-blue-400 dark:hover:text-blue-300 transition-colors"
    :title="t('vocabulary.moveToDateGroup', 'Move to another date group')"
  >
    <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
      <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M13 7l5 5m0 0l-5 5m5-5H6"></path>
    </svg>
  </button>
</template>

<script setup lang="ts">
import { useI18n } from 'vue-i18n'

const { t } = useI18n()

interface Word {
  id: number
  word: string
  pronunciation: string
  partOfSpeech: string
  meaning: string
  example?: string
  level: string
  category: string
  favorite?: boolean
  image?: string
  createdAt?: string
  updatedAt?: string
}

interface Props {
  word: Word     
  moveMode?: boolean
}

const props = defineProps<Props>()

const emit = defineEmits<{
  'move-vocabulary': [data: { word: Word, targetDate: string, sourceDate?: string }]
}>()

// Handle move button click
const handleMoveClick = () => {
  // Emit the event with empty targetDate and word's createdAt as sourceDate - parent will handle the modal
  emit('move-vocabulary', { 
    word: props.word, 
    targetDate: '', 
    sourceDate: props.word.createdAt 
  })
}
</script>
