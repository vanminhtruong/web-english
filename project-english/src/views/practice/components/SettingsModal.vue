<template>
  <div v-if="show" class="fixed inset-0 bg-gray-600 bg-opacity-50 overflow-y-auto h-full w-full z-50">
    <div class="relative top-20 mx-auto p-5 border w-96 shadow-lg rounded-md bg-white dark:bg-[#0a0a0a] dark:border-gray-800">
      <div class="mt-3">
        <h3 class="text-lg font-medium text-gray-900 dark:text-white mb-4">{{ t('flashcard.settings.title') }}</h3>

        <div class="space-y-4">
          <div>
            <label class="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">{{ t('flashcard.settings.category') }}</label>
            <select :value="settings.category" @change="updateSetting('category', $event)" class="w-full px-3 py-2 border border-gray-300 dark:border-gray-700 rounded-md bg-white dark:bg-[#0a0a0a] text-gray-900 dark:text-white">
              <option value="">{{ t('flashcard.settings.all') }}</option>
              <option value="Technology">Technology</option>
              <option value="Business">Business</option>
              <option value="Travel">Travel</option>
            </select>
          </div>

          <div>
            <label class="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">{{ t('flashcard.settings.level') }}</label>
            <select :value="settings.level" @change="updateSetting('level', $event)" class="w-full px-3 py-2 border border-gray-300 dark:border-gray-700 rounded-md bg-white dark:bg-[#0a0a0a] text-gray-900 dark:text-white">
              <option value="">{{ t('flashcard.settings.all') }}</option>
              <option value="beginner">{{ t('flashcard.settings.beginner') }}</option>
              <option value="intermediate">{{ t('flashcard.settings.intermediate') }}</option>
              <option value="advanced">{{ t('flashcard.settings.advanced') }}</option>
            </select>
          </div>

          <div>
            <label class="flex items-center">
              <input type="checkbox" :checked="localSettings.autoFlip" @change="updateLocalSetting('autoFlip', $event)" class="mr-2">
              <span class="text-sm text-gray-700 dark:text-gray-300">{{ t('flashcard.settings.autoFlip') }}</span>
            </label>
          </div>

          <div>
            <label class="flex items-center">
              <input type="checkbox" :checked="localSettings.shuffleCards" @change="updateLocalSetting('shuffleCards', $event)" class="mr-2">
              <span class="text-sm text-gray-700 dark:text-gray-300">{{ t('flashcard.settings.shuffle') }}</span>
            </label>
          </div>
        </div>

        <div class="flex justify-end space-x-3 mt-6">
          <button @click="emit('cancel')" class="px-4 py-2 text-gray-700 dark:text-gray-300 border border-gray-300 dark:border-gray-700 rounded-md hover:bg-gray-50 dark:hover:bg-gray-800">
            {{ t('common.cancel') }}
          </button>
          <button @click="emit('apply')" class="px-4 py-2 bg-blue-500 hover:bg-blue-600 text-white rounded-md">
            {{ t('common.apply') }}
          </button>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { useI18n } from 'vue-i18n';

const props = defineProps<{
  show: boolean;
  settings: any;
  localSettings: any;
}>();

const emit = defineEmits(['update:settings', 'update:local-settings', 'cancel', 'apply']);

const { t } = useI18n();

const updateSetting = (key: string, event: Event) => {
  const target = event.target as HTMLSelectElement;
  emit('update:settings', { ...props.settings, [key]: target.value });
};

const updateLocalSetting = (key: string, event: Event) => {
  const target = event.target as HTMLInputElement;
  emit('update:local-settings', { ...props.localSettings, [key]: target.checked });
};
</script> 