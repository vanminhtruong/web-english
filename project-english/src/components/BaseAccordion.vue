<template>
  <div class="bg-white dark:bg-[#0a0a0a] shadow rounded-lg border border-gray-200 dark:border-dark-bg-mute overflow-hidden">
    <!-- Accordion Header -->
    <button
      @click="toggle"
      :aria-expanded="isOpen ? 'true' : 'false'"
      class="w-full flex items-center justify-between px-3 py-3 xs:px-4 xs:py-3 sm:px-5 sm:py-4 text-left bg-gray-50 dark:bg-[#0f0f0f] hover:bg-gray-100 dark:hover:bg-dark-bg-mute transition-colors border-b border-gray-200 dark:border-dark-bg-mute focus:outline-none focus:ring-2 focus:ring-blue-500"
    >
      <div class="flex items-center space-x-3">
        <!-- Icon -->
        <div v-if="icon && iconPaths" class="flex-shrink-0">
          <svg
            class="w-5 h-5 xs:w-6 xs:h-6 text-blue-500 dark:text-blue-400"
            fill="currentColor"
            viewBox="0 0 20 20"
          >
            <path
              fill-rule="evenodd"
              :d="iconPaths"
              clip-rule="evenodd"
            />
          </svg>
        </div>
        <!-- Title and description -->
        <div>
          <h3 class="text-sm xs:text-base sm:text-lg font-semibold text-gray-900 dark:text-white">
            {{ title }}
          </h3>
          <p v-if="description" class="text-xs xs:text-sm text-gray-600 dark:text-white/70 mt-1">
            {{ description }}
          </p>
        </div>
      </div>
      
      <!-- Chevron Icon -->
      <svg
        class="w-5 h-5 text-gray-500 dark:text-white/60 transition-transform duration-200"
        :class="{ 'rotate-180': isOpen }"
        fill="none"
        stroke="currentColor"
        viewBox="0 0 24 24"
      >
        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 9l-7 7-7-7" />
      </svg>
    </button>

    <!-- Accordion Content with smooth animation -->
    <transition
      name="accordion"
      @enter="enter"
      @after-enter="afterEnter"
      @leave="leave"
      @after-leave="afterLeave"
    >
      <div v-show="isOpen" class="accordion-content">
        <div class="px-3 py-3 xs:px-4 xs:py-4 sm:px-5 sm:py-5">
          <slot></slot>
        </div>
      </div>
    </transition>
  </div>
</template>

<script setup lang="ts">
import { ref, computed } from 'vue'

interface Props {
  title: string
  description?: string
  icon?: string
  defaultOpen?: boolean
  persistKey?: string // For localStorage persistence
}

const props = withDefaults(defineProps<Props>(), {
  defaultOpen: true,
  persistKey: undefined
})

// Get initial state from localStorage or use defaultOpen
const getInitialState = (): boolean => {
  if (props.persistKey && typeof localStorage !== 'undefined') {
    try {
      const stored = localStorage.getItem(`accordion-${props.persistKey}`)
      return stored !== null ? JSON.parse(stored) : props.defaultOpen
    } catch {
      return props.defaultOpen
    }
  }
  return props.defaultOpen
}

const isOpen = ref<boolean>(getInitialState())

// Icon SVG paths
const iconPaths = computed(() => {
  const iconMap: Record<string, string> = {
    'vocabulary': 'M4 4a2 2 0 012-2h4.586A2 2 0 0112 2.586L15.414 6A2 2 0 0116 7.414V16a2 2 0 01-2 2H6a2 2 0 01-2-2V4zm2 6a1 1 0 011-1h6a1 1 0 110 2H7a1 1 0 01-1-1zm1 3a1 1 0 100 2h6a1 1 0 100-2H7z',
    'filter': 'M3 3a1 1 0 011-1h12a1 1 0 011 1v3a1 1 0 01-.293.707L12 11.414V15a1 1 0 01-.293.707l-2 2A1 1 0 018 17v-5.586L3.293 6.707A1 1 0 013 6V3z'
  }
  
  return iconMap[props.icon || ''] || null
})

const toggle = () => {
  isOpen.value = !isOpen.value
  
  // Persist state to localStorage if persistKey is provided
  if (props.persistKey && typeof localStorage !== 'undefined') {
    try {
      localStorage.setItem(`accordion-${props.persistKey}`, JSON.stringify(isOpen.value))
    } catch {
      // Ignore localStorage errors
    }
  }
}

// Animation functions
const enter = (el: Element) => {
  const element = el as HTMLElement
  element.style.height = '0'
  element.style.overflow = 'hidden'
}

const afterEnter = (el: Element) => {
  const element = el as HTMLElement
  element.style.height = 'auto'
  element.style.overflow = 'visible'
}

const leave = (el: Element) => {
  const element = el as HTMLElement
  element.style.height = element.offsetHeight + 'px'
  element.style.overflow = 'hidden'
  // Force reflow
  element.offsetHeight
  element.style.height = '0'
}

const afterLeave = (el: Element) => {
  const element = el as HTMLElement
  element.style.height = 'auto'
  element.style.overflow = 'visible'
}
</script>

<style scoped>
.accordion-enter-active,
.accordion-leave-active {
  transition: height 0.3s cubic-bezier(0.4, 0, 0.2, 1);
}

.accordion-content {
  overflow: hidden;
}
</style>
