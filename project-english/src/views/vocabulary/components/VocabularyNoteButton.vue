<template>
  <button
    @click="openNoteDialog"
    class="flex items-center space-x-1 px-3 py-1 text-xs sm:text-sm md:text-base lg:text-lg xl:text-sm 2xl:text-base font-medium text-green-600 dark:text-green-400 hover:text-green-800 dark:hover:text-green-200 hover:bg-green-50 dark:hover:bg-green-900/50 rounded-full border border-dashed border-green-300 dark:border-green-600 hover:border-green-400 dark:hover:border-green-500 transition-colors focus:outline-none focus:ring-2 focus:ring-green-500"
    :aria-label="t('vocabulary.notes.manageNotes', 'Manage Notes')"
  >
    <svg class="w-3 h-3" fill="currentColor" viewBox="0 0 20 20">
      <path d="M13.586 3.586a2 2 0 112.828 2.828l-.793.793-2.828-2.828.793-.793zM11.379 5.793L3 14.172V17h2.828l8.38-8.379-2.83-2.828z"/>
    </svg>
    <span>{{ t('vocabulary.notes.manageNotes', 'Manage Notes') }}</span>
  </button>
</template>

<script setup lang="ts">
import { ref } from 'vue';
import { useI18n } from 'vue-i18n';

const { t } = useI18n();

const props = defineProps<{
  date: string;
  isToday: boolean;
}>();

const emit = defineEmits<{
  'open-note-dialog': [date: string];
}>();

const openNoteDialog = () => {
  emit('open-note-dialog', props.date);
};
</script> 