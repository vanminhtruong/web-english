<template>
  <div v-if="show" class="fixed inset-0 bg-gray-600 bg-opacity-50 overflow-y-auto h-full w-full z-50">
    <div class="relative top-20 mx-auto p-5 border w-96 shadow-lg rounded-md bg-white dark:bg-[#0a0a0a] dark:border-gray-800">
      <div class="mt-3">
        <h3 class="text-lg font-medium text-gray-900 dark:text-white mb-4">{{ t('flashcard.settings.title', 'Flashcard Settings') }}</h3>

        <div class="space-y-4">
          <div>
            <label class="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">{{ t('flashcard.settings.category', 'Category') }}</label>
            <select :value="localSettings.category" @change="updateLocalSetting('category', $event)" class="w-full px-3 py-2 border border-gray-300 dark:border-gray-700 rounded-md bg-white dark:bg-[#0a0a0a] text-gray-900 dark:text-white">
              <option value="">{{ t('flashcard.settings.all', 'All') }}</option>
              <option v-for="category in categories" :key="category" :value="category">
                {{ getTopicName(category) }}
              </option>
            </select>
          </div>

          <div>
            <label class="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">{{ t('flashcard.settings.level', 'Level') }}</label>
            <select :value="localSettings.level" @change="updateLocalSetting('level', $event)" class="w-full px-3 py-2 border border-gray-300 dark:border-gray-700 rounded-md bg-white dark:bg-[#0a0a0a] text-gray-900 dark:text-white">
              <option value="">{{ t('flashcard.settings.all', 'All') }}</option>
              <option v-for="level in levels" :key="level" :value="level">
                {{ t(`flashcard.settings.${level.toLowerCase()}`, level) }}
              </option>
            </select>
          </div>

          <div>
            <label class="flex items-center">
              <input type="checkbox" :checked="localSettings.autoFlip" @change="updateLocalSetting('autoFlip', $event)" class="mr-2">
              <span class="text-sm text-gray-700 dark:text-gray-300">{{ t('flashcard.settings.autoFlip', 'Auto-flip after answering') }}</span>
            </label>
          </div>

          <div>
            <label class="flex items-center">
              <input type="checkbox" :checked="localSettings.shuffleCards" @change="updateLocalSetting('shuffleCards', $event)" class="mr-2">
              <span class="text-sm text-gray-700 dark:text-gray-300">{{ t('flashcard.settings.shuffle', 'Shuffle cards') }}</span>
            </label>
          </div>
        </div>

        <div class="flex justify-end space-x-3 mt-6">
          <button @click="emit('cancel')" class="px-4 py-2 text-gray-700 dark:text-gray-300 border border-gray-300 dark:border-gray-700 rounded-md hover:bg-gray-50 dark:hover:bg-gray-800">
            {{ t('common.cancel', 'Cancel') }}
          </button>
          <button @click="emit('apply')" class="px-4 py-2 bg-blue-500 hover:bg-blue-600 text-white rounded-md">
            {{ t('common.apply', 'Apply') }}
          </button>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { useI18n } from 'vue-i18n';
import { useVocabularyStore } from '../../../composables/useVocabularyStore';
import { getTopicName } from '../../../utils/topicUtils';
import { computed } from 'vue';

const props = defineProps<{
  show: boolean;
  settings: any;
  localSettings: any;
  dateFilterEnabled?: boolean;
  selectedDate?: string;
}>();

const emit = defineEmits(['update:settings', 'update:local-settings', 'cancel', 'apply']);

const { t } = useI18n();
const { getCategories, getLevels, allVocabularies } = useVocabularyStore();

const levels = getLevels;

// Filter categories based on selected date
const categories = computed(() => {
  if (!props.dateFilterEnabled || !props.selectedDate) {
    return getCategories.value;
  }
  
  // Get vocabularies for the selected date
  const vocabulariesForDate = allVocabularies.value.filter(vocab => {
    return vocab.createdAt && vocab.createdAt.startsWith(props.selectedDate!);
  });
  
  // Get unique categories from vocabularies for this date
  const categoriesForDate = new Set(vocabulariesForDate.map(vocab => vocab.category));
  
  // Filter the available categories to only include ones used on this date
  return getCategories.value.filter(category => categoriesForDate.has(category));
});

const updateLocalSetting = (key: string, event: Event) => {
  const target = event.target as HTMLInputElement | HTMLSelectElement;
  const value = target.type === 'checkbox' ? (target as HTMLInputElement).checked : target.value;
  emit('update:local-settings', { ...props.localSettings, [key]: value });
};
</script> 