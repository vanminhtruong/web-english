<template>
  <div class="bg-white dark:bg-[#0a0a0a] shadow rounded-lg p-4 md:p-6 mb-6 border border-gray-200 dark:border-gray-700">
    <div class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
      <!-- Search -->
      <div class="sm:col-span-2 lg:col-span-2">
        <label class="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">{{ t('common.search') }}</label>
        <input
          :value="searchQuery"
          @input="$emit('update:searchQuery', $event.target.value)"
          type="text"
          :placeholder="t('vocabulary.searchPlaceholder')"
          class="w-full px-3 py-2 md:py-3 border border-gray-300 dark:border-gray-600 rounded-md bg-white dark:bg-[#0a0a0a] text-gray-900 dark:text-white placeholder-gray-500 dark:placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500 text-sm md:text-base"
        />
      </div>

      <!-- Category Filter -->
      <div>
        <label class="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">{{ t('vocabulary.category') }}</label>
        <select 
          :value="selectedCategory" 
          @change="$emit('update:selectedCategory', $event.target.value)"
          class="w-full px-3 py-2 md:py-3 border border-gray-300 dark:border-gray-600 rounded-md bg-white dark:bg-[#0a0a0a] text-gray-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-blue-500 text-sm md:text-base"
        >
          <option value="">{{ t('common.all') }}</option>
          <option v-for="category in categories" :key="category" :value="category">{{ getTopicDisplayName(category) }}</option>
        </select>
      </div>

      <!-- Level Filter -->
      <div>
        <label class="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">{{ t('vocabulary.level') }}</label>
        <select 
          :value="selectedLevel" 
          @change="$emit('update:selectedLevel', $event.target.value)"
          class="w-full px-3 py-2 md:py-3 border border-gray-300 dark:border-gray-600 rounded-md bg-white dark:bg-[#0a0a0a] text-gray-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-blue-500 text-sm md:text-base"
        >
          <option value="">{{ t('common.all') }}</option>
          <option value="beginner">{{ t('vocabulary.levels.beginner') }}</option>
          <option value="intermediate">{{ t('vocabulary.levels.intermediate') }}</option>
          <option value="advanced">{{ t('vocabulary.levels.advanced') }}</option>
        </select>
      </div>
    </div>
    
    <!-- Favorites Filter -->
    <div class="mt-4">
      <label class="inline-flex items-center">
        <input 
          type="checkbox" 
          :checked="showFavoritesOnly" 
          @change="$emit('update:showFavoritesOnly', $event.target.checked)"
          class="rounded border-gray-300 text-blue-600 shadow-sm focus:border-blue-300 focus:ring focus:ring-blue-200 focus:ring-opacity-50 dark:bg-[#0a0a0a] dark:border-gray-600"
        >
        <span class="ml-2 text-sm md:text-base text-gray-700 dark:text-gray-300">{{ t('vocabulary.showFavoritesOnly') }}</span>
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

defineEmits<{
  'update:searchQuery': [value: string]
  'update:selectedCategory': [value: string]
  'update:selectedLevel': [value: string]
  'update:showFavoritesOnly': [value: boolean]
}>()

// Function to get topic display name
const getTopicDisplayName = (category: string): string => {
  return getTopicName(category)
}


</script>
