<template>
  <div>
    <!-- Backdrop -->
    <Transition
      enter-active-class="transition-all duration-500 ease-out"
      enter-from-class="opacity-0"
      enter-to-class="opacity-100"
      leave-active-class="transition-all duration-300 ease-in"
      leave-from-class="opacity-100"
      leave-to-class="opacity-0"
    >
      <div 
        v-if="show" 
        class="fixed inset-0 bg-gray-600 bg-opacity-50 flex items-center justify-center p-4 z-50 backdrop-blur-sm"
      >
        <!-- Modal Container -->
        <Transition
          enter-active-class="transition-all duration-500 ease-out"
          enter-from-class="opacity-0 scale-90 translate-y-8 rotate-1"
          enter-to-class="opacity-100 scale-100 translate-y-0 rotate-0"
          leave-active-class="transition-all duration-300 ease-in"
          leave-from-class="opacity-100 scale-100 translate-y-0 rotate-0"
          leave-to-class="opacity-0 scale-90 translate-y-8 rotate-1"
        >
          <div class="w-full max-w-md">
            <!-- Modal Content -->
            <div 
              class="bg-white dark:bg-[#0a0a0a] shadow-2xl rounded-xl border border-gray-200 dark:border-gray-700 transform"
              @click.stop
            >
              <!-- Header -->
              <div class="px-6 py-4 border-b border-gray-200 dark:border-gray-700 bg-gradient-to-r from-blue-50 to-indigo-50 dark:from-[#0a0a0a] dark:to-[#0a0a0a] rounded-t-xl">
                <div class="flex items-center justify-between">
                  <h3 class="text-lg font-semibold text-gray-900 dark:text-white flex items-center space-x-2">
                    <span class="w-2 h-2 bg-blue-500 rounded-full animate-pulse"></span>
                    <span>{{ t('flashcard.settings.title', 'Flashcard Settings') }}</span>
                  </h3>
                  <button 
                    @click="emit('cancel')"
                    class="text-gray-400 hover:text-gray-600 dark:hover:text-gray-200 transition-all duration-300 hover:scale-110 hover:rotate-90 p-1 rounded-full hover:bg-gray-100 dark:hover:bg-gray-800"
                  >
                    <svg class="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12"></path>
                    </svg>
                  </button>
                </div>
              </div>

              <!-- Content -->
              <div class="px-6 py-4">
                <div class="space-y-4">
                  <div class="relative">
                    <label class="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">{{ t('flashcard.settings.category', 'Category') }}</label>
                    
                    <!-- Custom Dropdown Button -->
                    <button
                      type="button"
                      @click="toggleCategoryDropdown"
                      class="w-full px-3 py-2 border border-gray-300 dark:border-gray-700 rounded-md bg-white dark:bg-[#0a0a0a] text-gray-900 dark:text-white text-left flex items-center justify-between hover:border-blue-300 dark:hover:border-blue-600 transition-colors"
                    >
                      <span>{{ getSelectedCategoryDisplay() }}</span>
                      <svg class="w-4 h-4 transition-transform duration-200" :class="categoryDropdownOpen ? 'rotate-180' : ''" fill="currentColor" viewBox="0 0 20 20">
                        <path fill-rule="evenodd" d="M5.23 7.21a.75.75 0 011.06.02L10 11.17l3.71-3.94a.75.75 0 111.08 1.04l-4.24 4.5a.75.75 0 01-1.08 0L5.21 8.27a.75.75 0 01.02-1.06z" clip-rule="evenodd"/>
                      </svg>
                    </button>
                    
                    <!-- Custom Dropdown Menu -->
                    <Transition
                      enter-active-class="transition-all duration-200 ease-out"
                      enter-from-class="opacity-0 scale-95 translate-y-2"
                      enter-to-class="opacity-100 scale-100 translate-y-0"
                      leave-active-class="transition-all duration-150 ease-in"
                      leave-from-class="opacity-100 scale-100 translate-y-0"
                      leave-to-class="opacity-0 scale-95 translate-y-2"
                    >
                      <div
                        v-if="categoryDropdownOpen"
                        class="absolute top-full left-0 right-0 mt-1 bg-white dark:bg-[#0a0a0a] border border-gray-300 dark:border-gray-700 rounded-md shadow-xl z-[99999] overflow-hidden"
                      >
                        <!-- Search Input -->
                        <div class="p-3 border-b border-gray-200 dark:border-gray-700">
                          <input
                            v-model="categorySearchQuery"
                            type="text"
                            :placeholder="t('common.search', 'Search') + '...'"
                            class="w-full px-3 py-2 text-sm border border-gray-300 dark:border-gray-600 rounded-md bg-white dark:bg-[#0f0f0f] text-gray-900 dark:text-white placeholder-gray-500 dark:placeholder-gray-400 focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none"
                            @click.stop
                          />
                        </div>
                        
                        <!-- Options List -->
                        <div class="max-h-[240px] overflow-y-auto">
                          <div
                            class="px-3 py-2 text-sm cursor-pointer hover:bg-blue-50 dark:hover:bg-blue-900/20 text-gray-900 dark:text-white transition-colors"
                            :class="localSettings.category === '' ? 'bg-blue-100 dark:bg-blue-900/30 font-medium' : ''"
                            @click="selectCategory('')"
                          >
                            {{ t('flashcard.settings.all', 'All') }}
                          </div>
                          <div
                            v-for="category in filteredCategories"
                            :key="category"
                            class="px-3 py-2 text-sm cursor-pointer hover:bg-blue-50 dark:hover:bg-blue-900/20 text-gray-900 dark:text-white transition-colors"
                            :class="localSettings.category === category ? 'bg-blue-100 dark:bg-blue-900/30 font-medium' : ''"
                            @click="selectCategory(category)"
                          >
                            {{ getTopicName(category) }}
                          </div>
                          <div v-if="filteredCategories.length === 0" class="px-3 py-2 text-sm text-gray-500 dark:text-gray-400 text-center">
                            {{ t('common.noResults', 'No results found') }}
                          </div>
                        </div>
                      </div>
                    </Transition>
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
                  <button @click="emit('cancel')" class="px-4 py-2 text-gray-700 dark:text-gray-300 border border-gray-300 dark:border-gray-700 rounded-md hover:bg-gray-50 dark:hover:bg-gray-800 transition-colors">
                    {{ t('common.cancel', 'Cancel') }}
                  </button>
                  <button @click="emit('apply')" class="px-4 py-2 bg-blue-500 hover:bg-blue-600 text-white rounded-md transition-colors">
                    {{ t('common.apply', 'Apply') }}
                  </button>
                </div>
              </div>
            </div>
          </div>
        </Transition>
      </div>
    </Transition>
  </div>
</template>

<script setup lang="ts">
import { useI18n } from 'vue-i18n';
import { useVocabularyStore } from '../../../composables/useVocabularyStore';
import { getTopicName } from '../../../utils/topicUtils';
import { computed, ref, watch, onMounted, onUnmounted } from 'vue';

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

// Custom dropdown state
const categoryDropdownOpen = ref(false);
const categorySearchQuery = ref('');

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

// Filtered categories based on search query
const filteredCategories = computed(() => {
  if (!categorySearchQuery.value) return categories.value;
  
  return categories.value.filter(category => {
    const topicName = getTopicName(category).toLowerCase();
    return topicName.includes(categorySearchQuery.value.toLowerCase());
  });
});

// Get selected category display text
const getSelectedCategoryDisplay = () => {
  if (!props.localSettings.category) {
    return t('flashcard.settings.all', 'All');
  }
  return getTopicName(props.localSettings.category);
};

// Toggle category dropdown
const toggleCategoryDropdown = () => {
  categoryDropdownOpen.value = !categoryDropdownOpen.value;
  if (categoryDropdownOpen.value) {
    categorySearchQuery.value = '';
  }
};

// Select category option
const selectCategory = (category: string) => {
  updateLocalSetting('category', { target: { value: category } } as any);
  categoryDropdownOpen.value = false;
  categorySearchQuery.value = '';
};

// Close dropdown when clicking outside
const handleClickOutside = (event: Event) => {
  const target = event.target as HTMLElement;
  if (!target.closest('.relative')) {
    categoryDropdownOpen.value = false;
  }
};

// Watch for modal show/hide to close dropdown
watch(() => props.show, (newShow) => {
  if (!newShow) {
    categoryDropdownOpen.value = false;
    categorySearchQuery.value = '';
  }
});

// Setup click outside listener
onMounted(() => {
  document.addEventListener('click', handleClickOutside);
});

onUnmounted(() => {
  document.removeEventListener('click', handleClickOutside);
});

const updateLocalSetting = (key: string, event: Event) => {
  const target = event.target as HTMLInputElement | HTMLSelectElement;
  const value = target.type === 'checkbox' ? (target as HTMLInputElement).checked : target.value;
  emit('update:local-settings', { ...props.localSettings, [key]: value });
};
</script> 