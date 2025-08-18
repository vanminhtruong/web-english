<template>
  <div class="relative inline-flex items-center justify-center">
    <!-- SVG Circle Progress -->
    <svg 
      :width="size" 
      :height="size" 
      class="transform -rotate-90" 
      :viewBox="`0 0 ${size} ${size}`"
    >
      <!-- Background circle -->
      <circle
        :cx="size / 2"
        :cy="size / 2"
        :r="radius"
        stroke="currentColor"
        :stroke-width="strokeWidth"
        fill="transparent"
        class="text-gray-200 dark:text-dark-bg-mute opacity-50"
      />
      <!-- Progress circle -->
      <circle
        :cx="size / 2"
        :cy="size / 2"
        :r="radius"
        stroke="currentColor"
        :stroke-width="strokeWidth"
        fill="transparent"
        :stroke-dasharray="circumference"
        :stroke-dashoffset="strokeDashoffset"
        :class="progressColor"
        class="transition-all duration-500 ease-in-out"
        stroke-linecap="round"
      />
    </svg>
    
    <!-- Percentage text in center -->
    <div 
      class="absolute inset-0 flex items-center justify-center z-10"
      :class="textSizeClass"
    >
      <span 
        class="font-bold transition-colors duration-300 bg-white dark:bg-dark-bg rounded-full px-0.5 py-0.5 shadow-sm"
        :class="textColor"
        style="line-height: 1;"
      >
        {{ displayValue }}
      </span>
    </div>
  </div>
</template>

<script setup lang="ts">
import { computed } from 'vue'

interface Props {
  /** Progress percentage (0-100) */
  percentage: number
  /** Size of the circle in pixels */
  size?: number
  /** Stroke width of the circle */
  strokeWidth?: number
  /** Custom color classes for the progress circle */
  color?: string
  /** Show percentage or custom text */
  showText?: boolean
  /** Custom text to display instead of percentage */
  customText?: string
}

const props = withDefaults(defineProps<Props>(), {
  percentage: 0,
  size: 48,
  strokeWidth: 4,
  color: '',
  showText: true,
  customText: ''
})

// Calculate circle properties
const radius = computed(() => (props.size - props.strokeWidth) / 2)
const circumference = computed(() => radius.value * 2 * Math.PI)
const strokeDashoffset = computed(() => {
  const progress = Math.min(Math.max(props.percentage, 0), 100)
  return circumference.value - (progress / 100) * circumference.value
})

// Color classes based on progress
const progressColor = computed(() => {
  if (props.color) return props.color
  
  if (props.percentage >= 100) {
    return 'text-green-500 dark:text-green-400'
  } else if (props.percentage >= 70) {
    return 'text-blue-500 dark:text-blue-400'
  } else if (props.percentage >= 40) {
    return 'text-yellow-500 dark:text-yellow-400'
  } else {
    return 'text-orange-500 dark:text-orange-400'
  }
})

// Text color to match progress color
const textColor = computed(() => {
  if (props.percentage >= 100) {
    return 'text-green-600 dark:text-green-300'
  } else if (props.percentage >= 70) {
    return 'text-blue-600 dark:text-blue-300'
  } else if (props.percentage >= 40) {
    return 'text-yellow-600 dark:text-yellow-300'
  } else {
    return 'text-orange-600 dark:text-orange-300'
  }
})

// Text size based on circle size
const textSizeClass = computed(() => {
  if (props.size <= 32) {
    return 'text-xs'
  } else if (props.size <= 48) {
    return 'text-sm'
  } else if (props.size <= 64) {
    return 'text-base'
  } else {
    return 'text-lg'
  }
})

// Display value
const displayValue = computed(() => {
  if (props.customText) {
    return props.customText
  }
  if (!props.showText) {
    return ''
  }
  return `${Math.round(props.percentage)}%`
})
</script>

<style scoped>
/* Additional animations for smooth progress changes */
circle {
  transition: stroke-dashoffset 0.5s ease-in-out;
}
</style>
