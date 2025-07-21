<template>
  <div class="bg-white dark:bg-[#0a0a0a] rounded-lg shadow border border-gray-200 dark:border-gray-700 p-4 mb-6">
    <div class="flex items-center justify-between">
      <div class="flex items-center space-x-4">
        <div class="flex items-center space-x-2">
          <span class="text-sm font-medium text-gray-700 dark:text-gray-300">{{ t('vocabulary.save.mode') }}</span>
          <button
            @click="emit('update:autoSaveEnabled', !autoSaveEnabled)"
            :class="[
              'relative  inline-flex h-6 w-11 items-center rounded-full transition-colors',
              autoSaveEnabled ? 'bg-blue-600' : 'bg-gray-200 dark:bg-gray-600'
            ]"
          >
            <span
              :class="[
                'inline-block h-4 w-4 transform rounded-full bg-white transition-transform',
                autoSaveEnabled ? 'translate-x-6' : 'translate-x-1'
              ]"
            />
          </button>
          <span class="text-sm text-gray-600 dark:text-gray-400">
            {{ autoSaveEnabled ? t('vocabulary.save.auto') : t('vocabulary.save.manual') }}
          </span>
        </div>

        <div class="flex items-center space-x-2">
          <!-- Manual save button -->
          <button
            v-if="!autoSaveEnabled"
            @click="emit('manual-save')"
            :disabled="isSaving"
            class="px-4 py-2 bg-green-500 hover:bg-green-600 disabled:bg-gray-400 text-white text-sm font-medium rounded-lg transition-colors flex items-center space-x-2"
          >
            <svg v-if="isSaving" class="animate-spin h-4 w-4" fill="none" viewBox="0 0 24 24">
              <circle class="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" stroke-width="4"></circle>
              <path class="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
            </svg>
            <svg v-else class="h-4 w-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M8 7H5a2 2 0 00-2 2v9a2 2 0 002 2h14a2 2 0 002-2V9a2 2 0 00-2-2h-3m-1 4l-3-3m0 0l-3 3m3-3v12"></path>
            </svg>
            <span>{{ isSaving ? t('common.saving') : t('vocabulary.save.saveNow') }}</span>
          </button>

          <!-- Auto-save setup button -->
          <button
            v-if="autoSaveEnabled && !hasAutoSaveFile"
            @click="emit('setup-auto-save')"
            class="px-4 py-2 bg-orange-500 hover:bg-orange-600 text-white text-sm font-medium rounded-lg transition-colors flex items-center space-x-2"
          >
            <svg class="h-4 w-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 6v6m0 0v6m0-6h6m-6 0H6"></path>
            </svg>
            <span>{{ t('vocabulary.save.chooseAutoFile') }}</span>
          </button>

          <!-- Reset auto-save file button -->
          <button
            v-if="autoSaveEnabled && hasAutoSaveFile"
            @click="emit('reset-auto-save')"
            class="px-4 py-2 bg-gray-500 hover:bg-gray-600 text-white text-sm font-medium rounded-lg transition-colors flex items-center space-x-2"
          >
            <svg class="h-4 w-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15"></path>
            </svg>
            <span>{{ t('vocabulary.save.changeAutoFile') }}</span>
          </button>

          <!-- Import button -->
          <div class="relative">
            <input
              ref="fileInputRef"
              type="file"
              accept=".json"
              @change="handleFileSelected"
              class="hidden"
            />
            <button
              @click="openFilePicker"
              class="px-4 py-2 bg-blue-500 hover:bg-blue-600 text-white text-sm font-medium rounded-lg transition-colors flex items-center space-x-2"
            >
              <svg class="h-4 w-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M7 16a4 4 0 01-.88-7.903A5 5 0 1115.9 6L16 6a5 5 0 011 9.9M9 19l3 3m0 0l3-3m-3 3V10"></path>
              </svg>
              <span>{{ t('vocabulary.save.importFile') }}</span>
            </button>
          </div>
        </div>
      </div>

      <div class="flex items-center space-x-4 text-sm text-gray-500 dark:text-gray-400">
        <div class="flex items-center space-x-1">
          <svg class="h-4 w-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z"></path>
          </svg>
          <span>{{ t('vocabulary.save.lastSave', { time: lastSaveTime || t('vocabulary.save.notSaved') }) }}</span>
        </div>
        <div class="flex items-center space-x-1">
          <div :class="['h-2 w-2 rounded-full', saveStatusColor]" />
          <span>{{ saveStatusText }}</span>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue';
import { useI18n } from 'vue-i18n';

defineProps<{
  autoSaveEnabled: boolean;
  isSaving: boolean;
  hasAutoSaveFile: boolean;
  lastSaveTime: string;
  saveStatusColor: string;
  saveStatusText: string;
}>();

const emit = defineEmits([
  'update:autoSaveEnabled',
  'manual-save',
  'setup-auto-save',
  'reset-auto-save',
  'import-file'
]);

const { t } = useI18n();
const fileInputRef = ref<HTMLInputElement | null>(null);

const openFilePicker = () => {
  fileInputRef.value?.click();
};

const handleFileSelected = (event: Event) => {
  const target = event.target as HTMLInputElement;
  if (target.files && target.files.length > 0) {
    emit('import-file', target.files[0]);
    // Reset input value to allow re-selecting the same file
    target.value = '';
  }
};
</script> 