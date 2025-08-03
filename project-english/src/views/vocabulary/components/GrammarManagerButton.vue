<template>
  <button
    @click="openGrammarManager"
    class="flex items-center space-x-1 md:space-x-1.5 px-2 xs:px-2.5 sm:px-3 md:px-4 py-0.5 xs:py-1 sm:py-1 md:py-1.5 bg-green-600 hover:bg-green-700 text-white rounded-md transition-colors text-xs md:text-sm lg:text-base xl:text-sm 2xl:text-base font-medium"
    :aria-label="t('grammar.manager.manageGrammar', 'Manage Grammar')"
  >
    <svg class="w-3 md:w-4 lg:w-4 xl:w-5 xl:h-5 2xl:w-6 2xl:h-6 h-3 md:h-4 lg:h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
      <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"></path>
    </svg>
    <span class="hidden xs:inline">{{ t('grammar.manager.manageGrammar', 'Manage Grammar') }}</span>
  </button>
</template>

<script setup lang="ts">
import { useI18n } from 'vue-i18n'

const { t } = useI18n()

interface Props {
  date: string
}

const props = defineProps<Props>()

const emit = defineEmits<{
  openGrammarManager: [date: string]
}>()

const openGrammarManager = () => {
  emit('openGrammarManager', props.date)
}
</script>
