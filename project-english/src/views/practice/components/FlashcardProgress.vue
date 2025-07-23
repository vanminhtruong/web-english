<template>
  <div class="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
    <div class="w-full bg-gray-200 dark:bg-[#0f0f0f] rounded-full h-2">
      <div class="bg-blue-500 h-2 rounded-full transition-all duration-300" :style="{ width: progressPercentage + '%' }"></div>
    </div>
  </div>
</template>

<script setup lang="ts">
interface Props {
  progressPercentage: number
}

const props = defineProps<Props>()
</script>
