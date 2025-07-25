<template>
  <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
    <div class="bg-white dark:bg-[#0a0a0a] overflow-hidden shadow rounded-lg border border-gray-200 dark:border-gray-800">
      <div class="p-5">
        <div class="flex items-center">
          <div class="flex-shrink-0">
            <div class="w-8 h-8 bg-blue-500 dark:bg-blue-600 rounded-md flex items-center justify-center">
              <svg class="w-5 h-5 text-white" fill="currentColor" viewBox="0 0 20 20">
                <path d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"/>
              </svg>
            </div>
          </div>
          <div class="ml-5 w-0 flex-1">
            <dl>
              <dt class="text-sm font-medium text-gray-500 dark:text-gray-400 truncate">{{ $t('dashboard.stats.vocabularyLearned') }}</dt>
              <dd class="text-lg font-medium text-gray-900 dark:text-white">{{ stats.vocabularyLearned }}</dd>
            </dl>
          </div>
        </div>
      </div>
    </div>

    <div class="bg-white dark:bg-[#0a0a0a] overflow-hidden shadow rounded-lg border border-gray-200 dark:border-gray-800">
      <div class="p-5">
        <div class="flex items-center">
          <div class="flex-shrink-0">
            <div class="w-8 h-8 bg-green-500 dark:bg-green-600 rounded-md flex items-center justify-center">
              <svg class="w-5 h-5 text-white" fill="currentColor" viewBox="0 0 20 20">
                <path d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.247 18 16.5 18c-1.746 0-3.332.477-4.5 1.253"/>
              </svg>
            </div>
          </div>
          <div class="ml-5 w-0 flex-1">
            <dl>
              <dt class="text-sm font-medium text-gray-500 dark:text-gray-400 truncate">{{ $t('dashboard.stats.grammarLessons') }}</dt>
              <dd class="text-lg font-medium text-gray-900 dark:text-white">{{ stats.grammarLessons }}</dd>
            </dl>
          </div>
        </div>
      </div>
    </div>

    <div class="bg-white dark:bg-[#0a0a0a] overflow-hidden shadow rounded-lg border border-gray-200 dark:border-gray-800">
      <div class="p-5">
        <div class="flex items-center">
          <div class="flex-shrink-0">
            <div class="w-8 h-8 bg-yellow-500 dark:bg-yellow-600 rounded-md flex items-center justify-center">
              <svg class="w-5 h-5 text-white" fill="currentColor" viewBox="0 0 20 20">
                <path d="M13 6a3 3 0 11-6 0 3 3 0 016 0zM18 8a2 2 0 11-4 0 2 2 0 014 0zM14 15a4 4 0 00-8 0v3h8v-3z"/>
              </svg>
            </div>
          </div>
          <div class="ml-5 w-0 flex-1">
            <dl>
              <dt class="text-sm font-medium text-gray-500 dark:text-gray-400 truncate">{{ $t('dashboard.stats.currentStreak') }}</dt>
              <dd class="text-lg font-medium text-gray-900 dark:text-white">{{ stats.currentStreak }} {{ $t('dashboard.stats.days') }}</dd>
            </dl>
          </div>
        </div>
      </div>
    </div>

    <div class="bg-white dark:bg-[#0a0a0a] overflow-hidden shadow rounded-lg border border-gray-200 dark:border-gray-800">
      <div class="p-5">
        <div class="flex items-center">
          <div class="flex-shrink-0">
            <div class="w-8 h-8 bg-purple-500 dark:bg-purple-600 rounded-md flex items-center justify-center">
              <svg class="w-5 h-5 text-white" fill="currentColor" viewBox="0 0 20 20">
                <path d="M12 14l4-4m0 0l4-4m-4 4H4"/>
              </svg>
            </div>
          </div>
          <div class="ml-5 w-0 flex-1">
            <dl>
              <dt class="text-sm font-medium text-gray-500 dark:text-gray-400 truncate">{{ $t('dashboard.stats.totalTime') }}</dt>
              <dd class="text-lg font-medium text-gray-900 dark:text-white">{{ stats.totalTime }} {{ $t('dashboard.stats.hours') }}</dd>
            </dl>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
interface Stats {
  vocabularyLearned: number
  grammarLessons: number
  currentStreak: number
  totalTime: number
}

interface Props {
  stats: Stats
}

defineProps<Props>()
</script>
