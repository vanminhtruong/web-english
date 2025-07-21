<template>
  <div class="bg-white dark:bg-[#0a0a0a] shadow">
    <div class="max-w-4xl mx-auto py-6 px-4 sm:px-6 lg:px-8">
      <div class="flex items-center justify-between">
        <div class="flex items-center">
          <button @click="$emit('go-back')" class="mr-4 text-gray-500 hover:text-gray-700 dark:text-gray-400 dark:hover:text-gray-300">
            <svg class="w-6 h-6" fill="currentColor" viewBox="0 0 20 20">
              <path fill-rule="evenodd" d="M12.707 5.293a1 1 0 010 1.414L9.414 10l3.293 3.293a1 1 0 01-1.414 1.414l-4-4a1 1 0 010-1.414l4-4a1 1 0 011.414 0z" clip-rule="evenodd"/>
            </svg>
          </button>
          <div>
            <h1 class="text-3xl font-bold text-gray-900 dark:text-white">Quiz</h1>
            <p class="mt-2 text-sm text-gray-600 dark:text-gray-400">Kiểm tra kiến thức của bạn</p>
          </div>
        </div>
        
        <div class="flex items-center space-x-4">
          <div class="text-right">
            <p class="text-sm text-gray-500 dark:text-gray-400">Thời gian</p>
            <p class="text-lg font-semibold text-gray-900 dark:text-white">{{ formatTime(timeRemaining) }}</p>
          </div>
          <div class="text-right">
            <p class="text-sm text-gray-500 dark:text-gray-400">Điểm</p>
            <p class="text-lg font-semibold text-gray-900 dark:text-white">{{ score }}</p>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
interface Props {
  timeRemaining: number
  score: number
}

defineProps<Props>()

const emit = defineEmits<{
  'go-back': []
}>()

const formatTime = (seconds: number): string => {
  const minutes = Math.floor(seconds / 60)
  const remainingSeconds = seconds % 60
  return `${minutes.toString().padStart(2, '0')}:${remainingSeconds.toString().padStart(2, '0')}`
}
</script>
