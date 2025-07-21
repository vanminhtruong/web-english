<template>
  <div class="text-center py-12">
    <svg class="mx-auto h-12 w-12 text-gray-400 dark:text-gray-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
      <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.247 18 16.5 18c-1.746 0-3.332.477-4.5 1.253"/>
    </svg>
    <h3 class="mt-2 text-sm font-medium text-gray-900 dark:text-white">{{ $t('grammar.emptyState.title') }}</h3>
    <p class="mt-1 text-sm text-gray-500 dark:text-gray-400">{{ $t('grammar.emptyState.description') }}</p>
    <div class="mt-6">
      <button @click="$emit('add-lesson')" class="inline-flex items-center px-4 py-2 border border-transparent shadow-sm text-sm font-medium rounded-md text-white bg-blue-600 hover:bg-blue-700">
        <svg class="-ml-1 mr-2 h-5 w-5" fill="currentColor" viewBox="0 0 20 20">
          <path fill-rule="evenodd" d="M10 3a1 1 0 011 1v5h5a1 1 0 110 2h-5v5a1 1 0 11-2 0v-5H4a1 1 0 110-2h5V4a1 1 0 011-1z" clip-rule="evenodd"/>
        </svg>
        {{ $t('grammar.addNewLesson') }}
      </button>
    </div>
  </div>
</template>

<script setup lang="ts">
defineEmits<{
  'add-lesson': []
}>()
</script>
