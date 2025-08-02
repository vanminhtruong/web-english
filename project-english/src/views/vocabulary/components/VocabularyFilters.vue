<template>
  <div class="bg-white dark:bg-[#0a0a0a] shadow rounded-lg p-2 xs:p-3 sm:p-4 md:p-5 lg:p-6 border border-gray-200 dark:border-gray-700">
    <div class="grid grid-cols-1 xs:grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-2 xs:gap-3 sm:gap-4 lg:gap-6">
      <!-- Search -->
      <div class="col-span-1 xs:col-span-1 sm:col-span-2 md:col-span-2">
        <label class="block text-xs sm:text-sm font-medium text-gray-700 dark:text-gray-300 mb-1 xs:mb-1.5 sm:mb-2">{{ t('common.search', 'Search') }}</label>
        <input
          :value="searchQuery"
          @input="handleSearchInput"
          type="text"
          :placeholder="t('vocabulary.searchPlaceholder', 'Search vocabulary...')"
          class="w-full px-2 py-1.5 xs:px-2.5 xs:py-2 sm:px-3 sm:py-2 text-xs sm:text-sm border border-gray-300 dark:border-gray-600 rounded-md bg-white dark:bg-[#0a0a0a] text-gray-900 dark:text-white placeholder-gray-500 dark:placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500"
        />
      </div>

      <!-- Category Filter -->
      <div class="col-span-1">
        <label class="block text-xs sm:text-sm font-medium text-gray-700 dark:text-gray-300 mb-1 xs:mb-1.5 sm:mb-2">{{ t('vocabulary.category', 'Category') }}</label>
        <select 
          :value="selectedCategory" 
          @change="handleCategoryChange"
          class="w-full px-2 py-1.5 xs:px-2.5 xs:py-2 sm:px-3 sm:py-2 text-xs sm:text-sm border border-gray-300 dark:border-gray-600 rounded-md bg-white dark:bg-[#0a0a0a] text-gray-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-blue-500"
        >
          <option value="">{{ t('common.all', 'All') }}</option>
          <option v-for="category in categories" :key="category" :value="category">{{ getTopicDisplayName(category) }}</option>
        </select>
      </div>

      <!-- Level Filter -->
      <div class="col-span-1">
        <label class="block text-xs sm:text-sm font-medium text-gray-700 dark:text-gray-300 mb-1 xs:mb-1.5 sm:mb-2">{{ t('vocabulary.level', 'Level') }}</label>
        <select 
          :value="selectedLevel" 
          @change="handleLevelChange"
          class="w-full px-2 py-1.5 xs:px-2.5 xs:py-2 sm:px-3 sm:py-2 text-xs sm:text-sm border border-gray-300 dark:border-gray-600 rounded-md bg-white dark:bg-[#0a0a0a] text-gray-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-blue-500"
        >
          <option value="">{{ t('common.all', 'All') }}</option>
          <option value="beginner">{{ t('vocabulary.levels.beginner', 'Beginner') }}</option>
          <option value="intermediate">{{ t('vocabulary.levels.intermediate', 'Intermediate') }}</option>
          <option value="advanced">{{ t('vocabulary.levels.advanced', 'Advanced') }}</option>
        </select>
      </div>
    </div>
    
    <!-- Favorites Filter -->
    <div class="mt-2 xs:mt-3 sm:mt-4">
      <label class="inline-flex items-center cursor-pointer">
        <input 
          type="checkbox" 
          :checked="showFavoritesOnly" 
          @change="handleFavoritesChange"
          class="w-3 h-3 xs:w-3.5 xs:h-3.5 sm:w-4 sm:h-4 rounded border-gray-300 text-blue-600 shadow-sm focus:border-blue-300 focus:ring focus:ring-blue-200 focus:ring-opacity-50 dark:bg-[#0a0a0a] dark:border-gray-600"
        >
        <span class="ml-1.5 xs:ml-2 text-xs sm:text-sm text-gray-700 dark:text-gray-300">{{ t('vocabulary.showFavoritesOnly', 'Show favorites only') }}</span>
      </label>
    </div>
  </div>
</template>

<script setup lang="ts">
import { useI18n } from 'vue-i18n'
import { computed } from 'vue'
import { getTopicName } from '../../../utils/topicUtils'

const { t } = useI18n()

interface Props {
  searchQuery: string
  selectedCategory: string
  selectedLevel: string
  categories: string[]
  showFavoritesOnly: boolean
}

const props = defineProps<Props>()

const emit = defineEmits<{
  'update:searchQuery': [value: string]
  'update:selectedCategory': [value: string]
  'update:selectedLevel': [value: string]
  'update:showFavoritesOnly': [value: boolean]
}>()

// Function to get topic display name
const getTopicDisplayName = (category: string): string => {
  return getTopicName(category)
}

// Event handlers
const handleCategoryChange = (event: Event) => {
  const target = event.target as HTMLSelectElement
  emit('update:selectedCategory', target.value)
}

const handleLevelChange = (event: Event) => {
  const target = event.target as HTMLSelectElement
  emit('update:selectedLevel', target.value)
}

const handleSearchInput = (event: Event) => {
  const target = event.target as HTMLInputElement
  emit('update:searchQuery', target.value)
}

const handleFavoritesChange = (event: Event) => {
  const target = event.target as HTMLInputElement
  emit('update:showFavoritesOnly', target.checked)
}


</script>
