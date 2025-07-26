<template>
  <div class="max-w-4xl mx-auto px-3 sm:px-4 md:px-6 py-2 sm:py-3 md:py-4">
    <div class="w-full bg-gray-200 dark:bg-[#0f0f0f] rounded-full h-1.5 sm:h-2 md:h-3">
      <div class="bg-blue-500 rounded-full transition-all duration-300 h-1.5 sm:h-2 md:h-3" :style="{ width: progressPercentage + '%' }"></div>
    </div>
  </div>
</template>

<script setup lang="ts">
interface Props {
  progressPercentage: number
}

const props = defineProps<Props>()
</script>
