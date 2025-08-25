<template>
  <!-- Pagination Controls -->
  <div v-if="totalPages > 1" class="flex flex-col xs:flex-row items-center justify-between gap-2 xs:gap-0 mb-3 sm:mb-4">
    <div class="text-xs sm:text-sm text-gray-500 dark:text-white/70 text-center xs:text-left">
      {{ t('common.showing', 'Showing') }} {{ startIndex + 1 }}-{{ Math.min(endIndex, totalEntries) }} {{ t('common.of', 'of') }} {{ totalEntries }} {{ t('common.entries', 'entries') }}
    </div>
    <div class="flex items-center gap-1">
      <button 
        @click="$emit('update:current-page', currentPage - 1)" 
        :disabled="currentPage === 1"
        class="px-2 py-1 text-xs sm:text-sm rounded border border-gray-300 dark:border-dark-bg-mute bg-white dark:bg-[#0a0a0a] text-gray-700 dark:text-white hover:bg-gray-50 dark:hover:bg-dark-bg-soft disabled:opacity-50 disabled:cursor-not-allowed"
      >
        ←
      </button>
      <span class="px-2 sm:px-3 py-1 text-xs sm:text-sm text-gray-700 dark:text-white">
        {{ currentPage }} / {{ totalPages }}
      </span>
      <button 
        @click="$emit('update:current-page', currentPage + 1)" 
        :disabled="currentPage === totalPages"
        class="px-2 py-1 text-xs sm:text-sm rounded border border-gray-300 dark:border-dark-bg-mute bg-white dark:bg-[#0a0a0a] text-gray-700 dark:text-white hover:bg-gray-50 dark:hover:bg-dark-bg-soft disabled:opacity-50 disabled:cursor-not-allowed"
      >
        →
      </button>
    </div>
  </div>
</template>

<script setup lang="ts">
import { useI18n } from 'vue-i18n'

defineProps<{
  currentPage: number
  totalPages: number
  startIndex: number
  endIndex: number
  totalEntries: number
}>()

const emit = defineEmits<{
  'update:current-page': [page: number]
}>()

const { t } = useI18n()
</script>
