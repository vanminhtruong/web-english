<template>
  <div ref="containerRef" class="bg-white dark:bg-[#0a0a0a] rounded-lg shadow border border-gray-200 dark:border-dark-bg-mute p-4 sm:p-5 mb-6">
    <div class="flex flex-col md:flex-row md:items-center md:justify-between gap-3 sm:gap-4">
      <div class="flex items-center space-x-4 sm:space-x-4">
        <svg class="w-5 h-5 text-gray-500 dark:text-gray-400" fill="currentColor" viewBox="0 0 20 20">
          <path fill-rule="evenodd" d="M3 4a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1zm0 4a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1zm0 4a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1z" clip-rule="evenodd"/>
        </svg>
        <div class="flex flex-col space-y-0.5 sm:space-y-1">
          <h3 class="text-sm font-medium text-gray-900 dark:text-white">{{ t('vocabulary.topicManager.title', 'Topic Manager') }}</h3>
          <p class="text-xs text-gray-500 dark:text-gray-400">{{ t('vocabulary.topicManager.builtInTopicsDescription', 'Manage built-in topics and categories') }}</p>
        </div>
      </div>
      <button
        @click="emit('open')"
        class="px-4 py-2 bg-purple-600 hover:bg-purple-700 text-white text-sm font-medium rounded-lg transition-colors flex items-center space-x-2 self-start md:self-auto mt-3 sm:mt-3 md:mt-0 w-full md:w-auto"
      >
        <svg class="h-4 w-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 6v6m0 0v6m0-6h6m-6 0H6"/>
        </svg>
        <span>{{ t('vocabulary.topicManager.manageTopics', 'Manage Topics') }}</span>
      </button>
    </div>
    
    <!-- Sticky Manager Topic Button -->
    <Teleport to="body">
      <Transition name="sticky-fade">
        <div 
          v-show="shouldShowStickyButton"
          class="fixed top-20 right-6 z-[9999]"
          style="position: fixed !important;"
        >
          <button
            @click="emit('open')"
            @mouseenter="showTooltip = true"
            @mouseleave="showTooltip = false"
            class="relative bg-purple-600 hover:bg-purple-700 dark:bg-purple-600 dark:hover:bg-purple-500 text-white font-medium w-12 h-12 sm:w-14 sm:h-14 md:w-16 md:h-16 rounded-full shadow-lg hover:shadow-xl transition-all duration-300 transform hover:scale-105 flex items-center justify-center"
          >
            <svg class="w-5 h-5 sm:w-6 sm:h-6 md:w-7 md:h-7" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 6v6m0 0v6m0-6h6m-6 0H6"/>
            </svg>
            
            <!-- Tooltip -->
            <div
              v-if="showTooltip"
              class="absolute bottom-full right-0 mb-2 px-3 py-2 text-xs font-medium text-white bg-gray-900 dark:bg-[#0a0a0a] dark:border dark:border-dark-bg-mute rounded-lg shadow-lg whitespace-nowrap z-[10000]"
            >
              {{ t('vocabulary.topicManager.manageTopics', 'Manage Topics') }}
              <div class="absolute top-full right-4 w-0 h-0 border-l-4 border-r-4 border-t-4 border-transparent border-t-gray-900 dark:border-t-[#0a0a0a]"></div>
            </div>
          </button>
        </div>
      </Transition>
    </Teleport>
  </div>
</template>

<script setup lang="ts">
import { ref, computed, onMounted, onUnmounted } from 'vue';
import { useI18n } from 'vue-i18n';
import { useModalStore } from '../../../stores/modalStore';

const emit = defineEmits(['open']);
const { t } = useI18n();
const modalStore = useModalStore();

// Refs
const containerRef = ref<HTMLElement>();
const showStickyButton = ref(false);
const showTooltip = ref(false);
const isXlScreen = ref(false);
const isToolsAccordionOpen = ref(true);

// Check if screen is XL or larger
const checkScreenSize = () => {
  isXlScreen.value = window.innerWidth >= 1280; // xl breakpoint
};

// Check Tools & Settings accordion state from localStorage
const checkAccordionState = () => {
  try {
    const stored = localStorage.getItem('accordion-vocabulary-tools');
    isToolsAccordionOpen.value = stored !== null ? JSON.parse(stored) : true;
  } catch {
    isToolsAccordionOpen.value = true;
  }
};

// Computed to show sticky button based on conditions
const shouldShowStickyButton = computed(() => {
  // Only show on XL screens and up
  if (!isXlScreen.value) return false;
  
  // Hide when any modal is open
  if (modalStore.shouldHideBackToTop) return false;
  
  // Show if: (scrolled past container) OR (tools accordion is closed)
  return showStickyButton.value || !isToolsAccordionOpen.value;
});

// Scroll handler
const handleScroll = () => {
  if (!containerRef.value) return;
  
  const rect = containerRef.value.getBoundingClientRect();
  const containerTop = rect.top;
  const containerBottom = rect.bottom;
  
  // Show sticky button khi container đã cuộn qua khỏi viewport
  // Hiển thị khi top của container < 0 (đã cuộn qua)
  showStickyButton.value = containerTop < -50; // Thêm offset để trigger sớm hơn
  
  // Debug log (optional - can be removed in production)
  // console.log('Scroll position:', { containerTop, containerBottom, showSticky: showStickyButton.value });
};

// Lifecycle
onMounted(() => {
  window.addEventListener('scroll', handleScroll, { passive: true });
  window.addEventListener('resize', checkScreenSize, { passive: true });
  
  // Listen for localStorage changes (accordion state)
  window.addEventListener('storage', checkAccordionState);
  
  // Initial checks
  handleScroll();
  checkScreenSize();
  checkAccordionState();
  
  // Also check accordion state periodically in case it changes within same tab
  const accordionCheckInterval = setInterval(checkAccordionState, 1000);
  
  // Store interval for cleanup
  (window as any).__accordionCheckInterval = accordionCheckInterval;
});

onUnmounted(() => {
  window.removeEventListener('scroll', handleScroll);
  window.removeEventListener('resize', checkScreenSize);
  window.removeEventListener('storage', checkAccordionState);
  
  // Clear interval
  if ((window as any).__accordionCheckInterval) {
    clearInterval((window as any).__accordionCheckInterval);
    delete (window as any).__accordionCheckInterval;
  }
});
</script>

<style scoped>
/* Sticky button transition */
.sticky-fade-enter-active,
.sticky-fade-leave-active {
  transition: all 0.3s ease;
}

.sticky-fade-enter-from {
  opacity: 0;
  transform: translateY(-10px) scale(0.9);
}

.sticky-fade-leave-to {
  opacity: 0;
  transform: translateY(-10px) scale(0.9);
}

.sticky-fade-enter-to,
.sticky-fade-leave-from {
  opacity: 1;
  transform: translateY(0) scale(1);
}
</style> 