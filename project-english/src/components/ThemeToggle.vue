<template>
  <div class="relative">
    <!-- Theme Toggle Button -->
    <button
      @click="toggleTheme"
      class="relative inline-flex items-center justify-center w-10 h-10 rounded-lg border border-gray-300 dark:border-gray-600 bg-white dark:bg-black text-gray-600 dark:text-gray-300 hover:bg-gray-50 dark:hover:bg-gray-900 transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-blue-500 dark:focus:ring-blue-400"
      :title="themeStore.themeLabel()"
    >
      <!-- Sun Icon (Light Mode) -->
      <svg
        v-if="!themeStore.isDarkMode"
        class="w-5 h-5 text-yellow-500 transition-transform duration-200 hover:rotate-12"
        fill="currentColor"
        viewBox="0 0 20 20"
      >
        <path
          fill-rule="evenodd"
          d="M10 2a1 1 0 011 1v1a1 1 0 11-2 0V3a1 1 0 011-1zm4 8a4 4 0 11-8 0 4 4 0 018 0zm-.464 4.95l.707.707a1 1 0 001.414-1.414l-.707-.707a1 1 0 00-1.414 1.414zm2.12-10.607a1 1 0 010 1.414l-.706.707a1 1 0 11-1.414-1.414l.707-.707a1 1 0 011.414 0zM17 11a1 1 0 100-2h-1a1 1 0 100 2h1zm-7 4a1 1 0 011 1v1a1 1 0 11-2 0v-1a1 1 0 011-1zM5.05 6.464A1 1 0 106.465 5.05l-.708-.707a1 1 0 00-1.414 1.414l.707.707zm1.414 8.486l-.707.707a1 1 0 01-1.414-1.414l.707-.707a1 1 0 011.414 1.414zM4 11a1 1 0 100-2H3a1 1 0 000 2h1z"
          clip-rule="evenodd"
        />
      </svg>

      <!-- Moon Icon (Dark Mode) -->
      <svg
        v-else
        class="w-5 h-5 text-blue-400 transition-transform duration-200 hover:rotate-12"
        fill="currentColor"
        viewBox="0 0 20 20"
      >
        <path
          d="M17.293 13.293A8 8 0 016.707 2.707a8.001 8.001 0 1010.586 10.586z"
        />
      </svg>

      <!-- Ripple Effect -->
      <span
        v-if="isAnimating"
        class="absolute inset-0 rounded-lg bg-blue-400 opacity-30 animate-ping"
      ></span>
    </button>

    <!-- Tooltip -->
    <div
      v-if="showTooltip"
      class="absolute bottom-full left-1/2 transform -translate-x-1/2 mb-2 px-2 py-1 text-xs font-medium text-white bg-gray-900 dark:bg-black dark:text-white dark:border dark:border-gray-600 rounded shadow-lg whitespace-nowrap z-50"
    >
      {{ themeStore.themeLabel() }}
      <div class="absolute top-full left-1/2 transform -translate-x-1/2 w-0 h-0 border-l-4 border-r-4 border-t-4 border-transparent border-t-gray-900 dark:border-t-black"></div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, onMounted, onUnmounted } from 'vue'
import { useThemeStore } from '../stores/theme'

const themeStore = useThemeStore()

// Local state
const isAnimating = ref(false)
const showTooltip = ref(false)
let tooltipTimer: number | null = null

// Methods
const toggleTheme = () => {
  isAnimating.value = true
  themeStore.toggleTheme()
  
  // Reset animation after a short delay
  setTimeout(() => {
    isAnimating.value = false
  }, 300)
}

const handleMouseEnter = () => {
  if (tooltipTimer) {
    clearTimeout(tooltipTimer)
  }
  tooltipTimer = setTimeout(() => {
    showTooltip.value = true
  }, 500) // Show tooltip after 500ms hover
}

const handleMouseLeave = () => {
  if (tooltipTimer) {
    clearTimeout(tooltipTimer)
  }
  showTooltip.value = false
}

// Keyboard support
const handleKeydown = (event: KeyboardEvent) => {
  // Toggle theme with Ctrl/Cmd + Shift + T
  if ((event.ctrlKey || event.metaKey) && event.shiftKey && event.key === 'T') {
    event.preventDefault()
    toggleTheme()
  }
}

onMounted(() => {
  // Add event listeners
  const button = document.querySelector('[data-theme-toggle]')
  if (button) {
    button.addEventListener('mouseenter', handleMouseEnter)
    button.addEventListener('mouseleave', handleMouseLeave)
  }
  
  // Add keyboard shortcut
  document.addEventListener('keydown', handleKeydown)
})

onUnmounted(() => {
  // Clean up event listeners
  const button = document.querySelector('[data-theme-toggle]')
  if (button) {
    button.removeEventListener('mouseenter', handleMouseEnter)
    button.removeEventListener('mouseleave', handleMouseLeave)
  }
  
  document.removeEventListener('keydown', handleKeydown)
  
  if (tooltipTimer) {
    clearTimeout(tooltipTimer)
  }
})
</script>

<style scoped>
/* Custom animations */
@keyframes rotate {
  from {
    transform: rotate(0deg);
  }
  to {
    transform: rotate(360deg);
  }
}

.hover\:rotate-12:hover {
  transform: rotate(12deg);
}

/* Smooth transitions for theme changes */
button {
  transition: all 0.2s cubic-bezier(0.4, 0, 0.2, 1);
}

/* Focus styles */
button:focus {
  outline: none;
  box-shadow: 0 0 0 2px rgba(59, 130, 246, 0.5);
}

/* Dark mode specific styles */
.dark button:focus {
  box-shadow: 0 0 0 2px rgba(96, 165, 250, 0.5);
}
</style>
