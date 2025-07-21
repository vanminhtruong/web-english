<template>
  <div class="bg-white dark:bg-[#0a0a0a] shadow rounded-lg p-6 mb-6">
    <div class="grid grid-cols-1 md:grid-cols-3 gap-4">
      <!-- Search -->
      <div>
        <label class="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">{{ $t('common.search') }}</label>
        <input
          :value="searchQuery"
          @input="$emit('update:searchQuery', $event.target.value)"
          type="text"
          :placeholder="$t('grammar.search')"
          class="w-full px-3 py-2 border border-gray-300 dark:border-gray-700 rounded-md bg-white dark:bg-[#0a0a0a] text-gray-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-blue-500 dark:focus:ring-blue-400"
        />
      </div>
      
      <!-- Level Filter -->
      <div>
        <label class="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">{{ $t('grammar.level') }}</label>
        <select 
          :value="selectedLevel" 
          @change="$emit('update:selectedLevel', $event.target.value)"
          class="w-full px-3 py-2 border border-gray-300 dark:border-gray-700 rounded-md bg-white dark:bg-[#0a0a0a] text-gray-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-blue-500 dark:focus:ring-blue-400"
        >
          <option value="">{{ $t('common.all') }}</option>
          <option value="beginner">{{ $t('grammar.levels.beginner') }}</option>
          <option value="intermediate">{{ $t('grammar.levels.intermediate') }}</option>
          <option value="advanced">{{ $t('grammar.levels.advanced') }}</option>
        </select>
      </div>
      
      <!-- Category Filter -->
      <div>
        <label class="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">{{ $t('grammar.category') }}</label>
        <select 
          :value="selectedCategory" 
          @change="$emit('update:selectedCategory', $event.target.value)"
          class="w-full px-3 py-2 border border-gray-300 dark:border-gray-700 rounded-md bg-white dark:bg-[#0a0a0a] text-gray-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-blue-500 dark:focus:ring-blue-400"
        >
          <option value="">{{ $t('common.all') }}</option>
          <option v-for="category in categories" :key="category" :value="category">{{ category }}</option>
        </select>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
interface Props {
  searchQuery: string
  selectedLevel: string
  selectedCategory: string
  categories: string[]
}

defineProps<Props>()

defineEmits<{
  'update:searchQuery': [value: string]
  'update:selectedLevel': [value: string]
  'update:selectedCategory': [value: string]
}>()
</script>
