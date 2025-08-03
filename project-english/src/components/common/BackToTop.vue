<template>
  <Transition
    name="fade-scale"
    enter-active-class="fade-scale-enter-active"
    enter-from-class="fade-scale-enter-from"
    leave-active-class="fade-scale-leave-active"
    leave-to-class="fade-scale-leave-to"
  >
    <div
      v-show="showBackToTop"
      class="fixed bottom-6 z-50 left-1/2 -translate-x-[calc(100%+1rem)] sm:left-1/2 sm:-translate-x-[calc(100%+4px)] lg:left-6 lg:translate-x-0"
    >
      <!-- Tooltip -->
      <Transition
        name="fade"
        enter-active-class="transition-opacity duration-200"
        enter-from-class="opacity-0"
        leave-active-class="transition-opacity duration-200"
        leave-to-class="opacity-0"
      >
        <div
          v-show="showTooltip"
          class="absolute bottom-full left-1/2 transform -translate-x-1/2 mb-2 px-2 py-1 text-xs text-white bg-gray-900 dark:bg-black rounded shadow-lg whitespace-nowrap z-10 pointer-events-none"
        >
          {{ t('common.backToTop') }}
          <!-- Arrow -->
          <div class="absolute top-full left-1/2 transform -translate-x-1/2 w-0 h-0 border-l-4 border-r-4 border-t-4 border-transparent border-t-gray-900 dark:border-t-black"></div>
        </div>
      </Transition>

      <!-- Back to Top Button -->
      <button
        @click="handleScrollToTop"
        @mouseenter="showTooltip = true"
        @mouseleave="showTooltip = false"
        class="group w-12 h-12 sm:w-14 sm:h-14 md:w-16 md:h-16 bg-blue-600 hover:bg-blue-700 dark:bg-blue-500 dark:hover:bg-blue-600 text-white rounded-full shadow-lg hover:shadow-xl transform hover:scale-105 transition-all duration-300 flex items-center justify-center"
        :aria-label="t('common.backToTop')"
      >
        <!-- Arrow Up Icon -->
        <svg
          class="w-6 h-6 sm:w-7 sm:h-7 md:w-8 md:h-8 transform group-hover:-translate-y-0.5 transition-transform duration-200"
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            stroke-linecap="round"
            stroke-linejoin="round"
            stroke-width="2"
            d="M5 10l7-7m0 0l7 7m-7-7v18"
          />
        </svg>

        <!-- Progress Ring (optional) -->
        <svg
          v-if="showProgress"
          class="absolute inset-0 w-full h-full -rotate-90"
          viewBox="0 0 100 100"
        >
          <circle
            cx="50"
            cy="50"
            r="45"
            fill="none"
            stroke="currentColor"
            stroke-width="2"
            opacity="0.3"
          />
          <circle
            cx="50"
            cy="50"
            r="45"
            fill="none"
            stroke="currentColor"
            stroke-width="2"
            :stroke-dasharray="circumference"
            :stroke-dashoffset="circumference - (scrollPercentage / 100) * circumference"
            class="transition-all duration-300"
          />
        </svg>
      </button>
    </div>
  </Transition>
</template>

<script setup lang="ts">
import { ref, computed, onMounted, onUnmounted } from 'vue'
import { useI18n } from 'vue-i18n'
import { useScrollStore } from '../../stores/scroll'
import { useModalStore } from '../../stores/modalStore'

// Props
interface Props {
  showProgress?: boolean
}

const props = withDefaults(defineProps<Props>(), {
  showProgress: false
})

// Composables
const { t } = useI18n()
const scrollStore = useScrollStore()
const modalStore = useModalStore()

// State
const showTooltip = ref(false)

// Computed - Hide when modal is open
const showBackToTop = computed(() => {
  return scrollStore.showBackToTop && !modalStore.shouldHideBackToTop
})
const scrollPercentage = computed(() => scrollStore.scrollPercentage())

// For progress ring calculation
const circumference = computed(() => 2 * Math.PI * 45) // radius = 45

// Methods
const handleScrollToTop = () => {
  showTooltip.value = false
  scrollStore.scrollToTop()
}

// Lifecycle
onMounted(() => {
  scrollStore.initScrollListener()
})

onUnmounted(() => {
  scrollStore.removeScrollListener()
})
</script>

<style scoped>
.fade-scale-enter-active,
.fade-scale-leave-active {
  transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
}

.fade-scale-enter-from,
.fade-scale-leave-to {
  opacity: 0;
  transform: scale(0.8) translateY(10px);
}

/* XS: Override animation to include positioning */
@media (max-width: 639px) {
  .fade-scale-enter-from,
  .fade-scale-leave-to {
    opacity: 0;
    transform: scale(0.8) translateY(10px) translateX(calc(-100% - 1rem));
  }
  
  .fade-scale-enter-to,
  .fade-scale-leave-from {
    opacity: 1;
    transform: scale(1) translateY(0) translateX(calc(-100% - 1rem));
  }
}
</style>
