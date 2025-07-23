<template>
  <div class="mb-6">
    <!-- Date group header with accordion toggle -->
    <div class="sticky top-0 bg-gray-50 dark:bg-gray-800 px-6 py-3 border-b border-gray-200 dark:border-gray-700 z-10">
      <div class="flex items-center justify-between">
        <div class="flex items-center space-x-2">
          <!-- Accordion toggle button -->
          <button
            @click="toggleAccordion"
            class="p-1 rounded-md hover:bg-gray-200 dark:hover:bg-gray-700 transition-colors focus:outline-none focus:ring-2 focus:ring-blue-500"
            :aria-label="isExpanded ? t('vocabulary.accordion.collapse') : t('vocabulary.accordion.expand')"
          >
            <svg 
              class="w-4 h-4 text-gray-500 dark:text-gray-400 transition-transform duration-200"
              :class="{ 'transform rotate-90': isExpanded }"
              fill="currentColor" 
              viewBox="0 0 20 20"
            >
              <path fill-rule="evenodd" d="M7.293 14.707a1 1 0 010-1.414L10.586 10 7.293 6.707a1 1 0 011.414-1.414l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414 0z" clip-rule="evenodd"/>
            </svg>
          </button>

          <h4 class="text-sm font-semibold text-gray-700 dark:text-gray-300 flex items-center space-x-2">
            <svg class="w-4 h-4" fill="currentColor" viewBox="0 0 20 20">
              <path fill-rule="evenodd" d="M6 2a1 1 0 00-1 1v1H4a2 2 0 00-2 2v10a2 2 0 002 2h12a2 2 0 002-2V6a2 2 0 00-2-2h-1V3a1 1 0 10-2 0v1H7V3a1 1 0 00-1-1zm0 5a1 1 0 000 2h8a1 1 0 100-2H6z" clip-rule="evenodd"/>
            </svg>
            <span>{{ group.displayDate }}</span>
            <span class="text-xs text-gray-500 dark:text-gray-400">
              ({{ totalVocabularyCount }} {{ t('vocabulary.words') }})
            </span>
          </h4>
        </div>
        
        <!-- Center topic section -->
        <div class="flex-1 flex justify-center mx-4">
          <div v-if="!showTopicInput" class="flex items-center space-x-2">
            <!-- Topic display or add button -->
            <div v-if="groupTopic" class="flex items-center space-x-2 px-3 py-1 bg-blue-50 dark:bg-blue-900/50 rounded-full border border-blue-200 dark:border-blue-700">
              <svg class="w-3 h-3 text-blue-600 dark:text-blue-400" fill="currentColor" viewBox="0 0 20 20">
                <path fill-rule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7-4a1 1 0 11-2 0 1 1 0 012 0zM9 9a1 1 0 000 2v3a1 1 0 001 1h1a1 1 0 100-2v-3a1 1 0 00-1-1H9z" clip-rule="evenodd"/>
              </svg>
              <span class="text-xs font-medium text-blue-700 dark:text-blue-300">{{ groupTopic }}</span>
              <button
                @click="editTopic"
                class="text-blue-600 dark:text-blue-400 hover:text-blue-800 dark:hover:text-blue-200 focus:outline-none"
                :aria-label="t('vocabulary.accordion.editTopic')"
              >
                <svg class="w-3 h-3" fill="currentColor" viewBox="0 0 20 20">
                  <path d="M13.586 3.586a2 2 0 112.828 2.828l-.793.793-2.828-2.828.793-.793zM11.379 5.793L3 14.172V17h2.828l8.38-8.379-2.83-2.828z"/>
                </svg>
              </button>
            </div>
            <button
              v-else
              @click="showTopicInput = true"
              class="flex items-center space-x-1 px-3 py-1 text-xs font-medium text-gray-600 dark:text-gray-400 hover:text-blue-600 dark:hover:text-blue-400 hover:bg-blue-50 dark:hover:bg-blue-900/50 rounded-full border border-dashed border-gray-300 dark:border-gray-600 hover:border-blue-300 dark:hover:border-blue-600 transition-colors focus:outline-none focus:ring-2 focus:ring-blue-500"
              :aria-label="t('vocabulary.accordion.addTopic')"
            >
              <svg class="w-3 h-3" fill="currentColor" viewBox="0 0 20 20">
                <path fill-rule="evenodd" d="M10 3a1 1 0 011 1v5h5a1 1 0 110 2h-5v5a1 1 0 11-2 0v-5H4a1 1 0 110-2h5V4a1 1 0 011-1z" clip-rule="evenodd"/>
              </svg>
              <span>{{ t('vocabulary.accordion.addTopic') }}</span>
            </button>
          </div>
          
          <!-- Topic input form -->
          <div v-else class="flex items-center space-x-2 w-full max-w-xs">
            <input
              ref="topicInput"
              v-model="topicInputValue"
              @keyup.enter="saveTopic"
              @keyup.escape="cancelTopicInput"
              type="text"
              :placeholder="t('vocabulary.accordion.topicPlaceholder')"
              class="flex-1 px-2 py-1 text-xs border border-blue-300 dark:border-blue-600 rounded-md bg-white dark:bg-gray-800 text-gray-900 dark:text-gray-100 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            />
            <button
              @click="saveTopic"
              class="px-2 py-1 text-xs bg-blue-600 hover:bg-blue-700 text-white rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 transition-colors"
              :aria-label="t('vocabulary.accordion.saveTopic')"
            >
              <svg class="w-3 h-3" fill="currentColor" viewBox="0 0 20 20">
                <path fill-rule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clip-rule="evenodd"/>
              </svg>
            </button>
            <button
              @click="cancelTopicInput"
              class="px-2 py-1 text-xs bg-gray-500 hover:bg-gray-600 text-white rounded-md focus:outline-none focus:ring-2 focus:ring-gray-500 transition-colors"
              :aria-label="t('vocabulary.accordion.cancelTopic')"
            >
              <svg class="w-3 h-3" fill="currentColor" viewBox="0 0 20 20">
                <path fill-rule="evenodd" d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z" clip-rule="evenodd"/>
              </svg>
            </button>
          </div>
        </div>
        
        <!-- Date group pagination (only show when expanded) -->
        <div v-if="isExpanded && group.totalPages && group.totalPages > 1" class="flex items-center space-x-2">
          <button 
            @click="$emit('date-group-previous', group.date)"
            :disabled="(group.currentPage || 1) === 1"
            class="px-2 py-1 text-xs border border-gray-300 dark:border-gray-600 rounded bg-white dark:bg-[#0a0a0a] text-gray-700 dark:text-gray-300 hover:bg-gray-50 dark:hover:bg-gray-600 disabled:opacity-50 disabled:cursor-not-allowed"
          >
            {{ t('common.previous') }}
          </button>
          
          <span class="text-xs text-gray-500 dark:text-gray-400">
            {{ group.currentPage || 1 }} / {{ group.totalPages }}
          </span>
          
          <button 
            @click="$emit('date-group-next', group.date)"
            :disabled="(group.currentPage || 1) === group.totalPages"
            class="px-2 py-1 text-xs border border-gray-300 dark:border-gray-600 rounded bg-white dark:bg-[#0a0a0a] text-gray-700 dark:text-gray-300 hover:bg-gray-50 dark:hover:bg-gray-600 disabled:opacity-50 disabled:cursor-not-allowed"
          >
            {{ t('common.next') }}
          </button>
        </div>
      </div>
    </div>
    
    <!-- Collapsible content with simple transition -->
    <transition name="accordion">
      <div v-if="isExpanded" class="accordion-content">
        <!-- Topic-based sub-groups -->
        <div v-if="group.topics && group.topics.length > 0" class="divide-y divide-gray-200 dark:divide-gray-700">
          <div 
            v-for="topicGroup in group.topics" 
            :key="topicGroup.topic" 
            class="topic-group"
            @mouseenter="hoverToExpandEnabled ? handleTopicHover(topicGroup.topic, true) : null"
            @mouseleave="hoverToExpandEnabled ? handleTopicHover(topicGroup.topic, false) : null"
          >
            <!-- Topic header with accordion toggle -->
            <div 
              class="flex items-center justify-between px-6 py-3 cursor-pointer hover:bg-gray-100 dark:hover:bg-gray-700/50"
              @click="toggleTopicAccordion(topicGroup.topic)"
            >
              <div class="flex items-center space-x-2">
                <svg 
                  class="w-4 h-4 text-gray-400 dark:text-gray-500 transition-transform duration-200"
                  :class="{ 'transform rotate-90': isTopicExpanded(topicGroup.topic) }"
                  fill="currentColor" 
                  viewBox="0 0 20 20"
                >
                  <path fill-rule="evenodd" d="M7.293 14.707a1 1 0 010-1.414L10.586 10 7.293 6.707a1 1 0 011.414-1.414l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414 0z" clip-rule="evenodd"/>
                </svg>
                <h5 class="text-sm font-medium text-gray-600 dark:text-gray-400">
                  {{ getTopicName(topicGroup.topic) }}
                  <span class="text-xs text-gray-500">({{ topicGroup.vocabularies.length }})</span>
                </h5>
              </div>
            </div>

            <!-- Collapsible content for topic -->
            <transition name="topic-accordion">
              <div v-if="isTopicExpanded(topicGroup.topic)" class="topic-accordion-content py-2">
                <div class="divide-y divide-gray-200 dark:divide-gray-700">
                  <VocabularyCard
                    v-for="word in topicGroup.vocabularies"
                    :key="word.id"
                    :word="word"
                    @play-audio="$emit('play-audio', $event)"
                    @edit-word="$emit('edit-word', $event)"
                    @delete-word="$emit('delete-word', $event)"
                    @toggle-favorite="$emit('toggle-favorite', $event)"
                    @view-details="$emit('view-details', $event)"
                  />
                </div>
              </div>
            </transition>
          </div>
        </div>

        <!-- Fallback for words without topics -->
        <div v-else class="divide-y divide-gray-200 dark:divide-gray-700">
            <VocabularyCard
              v-for="word in group.vocabularies"
              :key="word.id"
              :word="word"
              @play-audio="$emit('play-audio', $event)"
              @edit-word="$emit('edit-word', $event)"
              @delete-word="$emit('delete-word', $event)"
              @toggle-favorite="$emit('toggle-favorite', $event)"
              @view-details="$emit('view-details', $event)"
            />
        </div>
      </div>
    </transition>
  </div>
</template>

<script setup lang="ts">
import { defineAsyncComponent, ref, watch, onMounted, onUnmounted, nextTick, computed } from 'vue'
import { useI18n } from 'vue-i18n'
import { loadComponentSafely } from '../../../utils/import-helper'
import type { GroupedVocabulary } from '../../../utils/dateUtils'
import { getTopicName } from '../../../utils/topicUtils'

const { t } = useI18n()

// Sử dụng defineAsyncComponent để import components an toàn
const VocabularyCard = defineAsyncComponent(
  loadComponentSafely(() => import('./VocabularyCard.vue'))
)

interface Props {
  group: GroupedVocabulary
  defaultExpanded?: boolean
  accordionState?: Record<string, boolean>
  hoverToExpandEnabled?: boolean
}

const props = withDefaults(defineProps<Props>(), {
  defaultExpanded: false, // Changed to false for collapsed by default
  accordionState: () => ({}),
  hoverToExpandEnabled: false
})

// Computed property to calculate total vocabulary count (including paginated items)
const totalVocabularyCount = computed(() => {
  // Use totalItems if available (includes all paginated vocabularies)
  if (props.group.totalItems && props.group.totalItems > 0) {
    return props.group.totalItems
  }
  
  // Fallback: calculate from current visible data
  if (props.group.topics && props.group.topics.length > 0) {
    // Sum up vocabularies from all topics
    return props.group.topics.reduce((total, topicGroup) => {
      return total + (topicGroup.vocabularies?.length || 0)
    }, 0)
  } else {
    // Fallback to direct vocabularies array
    return props.group.vocabularies?.length || 0
  }
})

// Local state for accordion
const isExpanded = ref(props.defaultExpanded)
const accordionContent = ref<HTMLElement>()
const accordionMaxHeight = ref(0)

// State for topic accordions
const expandedTopics = ref<Record<string, boolean>>({})

// Toggle topic accordion
const toggleTopicAccordion = (topic: string) => {
  expandedTopics.value[topic] = !expandedTopics.value[topic]
}

const isTopicExpanded = (topic: string) => {
  return expandedTopics.value[topic] || false
}

// Handle topic hover for expand/collapse
const hoverTimeouts = ref<Record<string, number>>({})

const handleTopicHover = (topic: string, isHovering: boolean) => {
  if (props.hoverToExpandEnabled) {
    // Clear any existing timeout for this topic
    if (hoverTimeouts.value[topic]) {
      clearTimeout(hoverTimeouts.value[topic])
      delete hoverTimeouts.value[topic]
    }
    
    if (isHovering) {
      // Immediately expand on hover
      expandedTopics.value[topic] = true
    } else {
      // Delay collapse to allow for modal interactions
      hoverTimeouts.value[topic] = setTimeout(() => {
        // Close the topic after delay, but check if modal opened during delay
        if (!isModalOpen()) {
          expandedTopics.value[topic] = false
        }
        delete hoverTimeouts.value[topic]
      }, 200) // 200ms delay
    }
  }
}

// Track if mouse is outside vocabulary area
const isMouseOutsideVocabulary = ref(false)

// Handle vocabulary list mouse leave event
const handleVocabularyListMouseLeave = () => {
  if (props.hoverToExpandEnabled) {
    isMouseOutsideVocabulary.value = true
    
    // If no modal is open, close immediately
    if (!isModalOpen()) {
      closeAllTopics()
    }
    // If modal is open, categories will close when modal closes (via watcher)
  }
}

// Handle vocabulary list mouse enter event
const handleVocabularyListMouseEnter = () => {
  if (props.hoverToExpandEnabled) {
    isMouseOutsideVocabulary.value = false
  }
}

// Close all topics helper function
const closeAllTopics = () => {
  Object.keys(expandedTopics.value).forEach(topic => {
    expandedTopics.value[topic] = false
  })
  // Clear any pending timeouts
  Object.keys(hoverTimeouts.value).forEach(topic => {
    if (hoverTimeouts.value[topic]) {
      clearTimeout(hoverTimeouts.value[topic])
      delete hoverTimeouts.value[topic]
    }
  })
}

// Check if any modal is currently open
const isModalOpen = (): boolean => {
  // Check for common modal/dialog selectors
  const modalSelectors = [
    '[role="dialog"]',
    '.modal',
    '.dialog',
    '[data-headlessui-state="open"]', // HeadlessUI modals
    '.fixed.inset-0', // Common modal backdrop pattern
  ]
  
  return modalSelectors.some(selector => {
    const elements = document.querySelectorAll(selector)
    return Array.from(elements).some(el => {
      const style = window.getComputedStyle(el)
      return style.display !== 'none' && style.visibility !== 'hidden'
    })
  })
}

// Topic functionality state
const showTopicInput = ref(false)
const topicInputValue = ref('')
const topicInput = ref<HTMLInputElement>()
const groupTopic = ref('')

// Local storage key for topics
const TOPICS_STORAGE_KEY = 'vocabulary-group-topics'

// Load group topics from localStorage
const getStoredTopics = (): Record<string, string> => {
  try {
    const stored = localStorage.getItem(TOPICS_STORAGE_KEY)
    return stored ? JSON.parse(stored) : {}
  } catch (error) {
    console.warn('Failed to load group topics from localStorage:', error)
    return {}
  }
}

// Save group topics to localStorage
const setStoredTopics = (topics: Record<string, string>) => {
  try {
    localStorage.setItem(TOPICS_STORAGE_KEY, JSON.stringify(topics))
  } catch (error) {
    console.warn('Failed to save group topics to localStorage:', error)
  }
}

// Topic functionality methods
const editTopic = () => {
  topicInputValue.value = groupTopic.value
  showTopicInput.value = true
  nextTick(() => {
    topicInput.value?.focus()
  })
}

const saveTopic = () => {
  const trimmedTopic = topicInputValue.value.trim()
  groupTopic.value = trimmedTopic
  
  // Update localStorage
  const storedTopics = getStoredTopics()
  if (trimmedTopic) {
    storedTopics[props.group.date] = trimmedTopic
  } else {
    delete storedTopics[props.group.date]
  }
  setStoredTopics(storedTopics)
  
  // Reset input state
  showTopicInput.value = false
  topicInputValue.value = ''
}

const cancelTopicInput = () => {
  showTopicInput.value = false
  topicInputValue.value = ''
}

// Calculate accordion content height for smooth animation
const calculateHeight = async () => {
  if (!accordionContent.value) return
  
  const innerElement = accordionContent.value.querySelector('.accordion-inner') as HTMLElement
  if (innerElement) {
    // Create a temporary clone to measure height without affecting current element
    const clone = innerElement.cloneNode(true) as HTMLElement
    clone.style.visibility = 'hidden'
    clone.style.position = 'absolute'
    clone.style.height = 'auto'
    clone.style.maxHeight = 'none'
    clone.style.overflow = 'visible'
    
    document.body.appendChild(clone)
    
    await nextTick()
    
    accordionMaxHeight.value = clone.scrollHeight + 24 // Add padding
    
    document.body.removeChild(clone)
  }
}

// Initialize accordion state and load topics
onMounted(async () => {
  // Check if there's a saved state for this date group
  if (props.accordionState && typeof props.accordionState[props.group.date] === 'boolean') {
    isExpanded.value = props.accordionState[props.group.date]
  }
  
  // Load saved topic for this group
  const storedTopics = getStoredTopics()
  if (storedTopics[props.group.date]) {
    groupTopic.value = storedTopics[props.group.date]
  }
  
  // Calculate height for smooth animation
  await nextTick()
  await calculateHeight()
})

// Recalculate height when vocabulary list changes
watch(
  () => props.group.vocabularies.length,
  async () => {
    await nextTick()
    await calculateHeight()
  }
)

// Watch for changes in accordionState prop
watch(
  () => props.accordionState?.[props.group.date],
  (newState) => {
    if (typeof newState === 'boolean') {
      isExpanded.value = newState
    }
  }
)

// Watch for modal state changes to close categories when modal closes
const modalWatchInterval = ref<number | null>(null)

// Start watching for modal changes when component mounts
const startModalWatcher = () => {
  if (modalWatchInterval.value) return
  
  modalWatchInterval.value = setInterval(() => {
    if (props.hoverToExpandEnabled && isMouseOutsideVocabulary.value && !isModalOpen()) {
      closeAllTopics()
    }
  }, 300) // Check every 300ms
}

// Stop modal watcher
const stopModalWatcher = () => {
  if (modalWatchInterval.value) {
    clearInterval(modalWatchInterval.value)
    modalWatchInterval.value = null
  }
}

const toggleAccordion = () => {
  isExpanded.value = !isExpanded.value
  emit('accordion-toggle', props.group.date, isExpanded.value)
}

// Initialize component
onMounted(async () => {
  // Check if there's a saved state for this date group
  if (props.accordionState && typeof props.accordionState[props.group.date] === 'boolean') {
    isExpanded.value = props.accordionState[props.group.date]
  }
  
  // Load saved topic for this group
  const storedTopics = getStoredTopics()
  if (storedTopics[props.group.date]) {
    groupTopic.value = storedTopics[props.group.date]
  }
  
  // Listen for vocabulary list mouse events
  window.addEventListener('vocabulary-list-mouse-leave', handleVocabularyListMouseLeave)
  window.addEventListener('vocabulary-list-mouse-enter', handleVocabularyListMouseEnter)
  
  // Start modal watcher
  startModalWatcher()
  
  // Calculate height for smooth animation
  await nextTick()
  await calculateHeight()
})

// Cleanup on unmount
onUnmounted(() => {
  window.removeEventListener('vocabulary-list-mouse-leave', handleVocabularyListMouseLeave)
  window.removeEventListener('vocabulary-list-mouse-enter', handleVocabularyListMouseEnter)
  
  // Stop modal watcher
  stopModalWatcher()
  
  // Clear any remaining timeouts
  Object.keys(hoverTimeouts.value).forEach(topic => {
    if (hoverTimeouts.value[topic]) {
      clearTimeout(hoverTimeouts.value[topic])
    }
  })
})

const emit = defineEmits<{
  'play-audio': [word: string]
  'edit-word': [word: any]
  'delete-word': [word: any]
  'toggle-favorite': [word: any]
  'view-details': [word: any]
  'date-group-previous': [date: string]
  'date-group-next': [date: string]
  'accordion-toggle': [date: string, expanded: boolean]
}>()
</script>

<style scoped>
/* Smooth transition for chevron icon */
svg {
  transition: transform 0.3s cubic-bezier(0.25, 0.8, 0.25, 1);
  will-change: transform;
}

/* Accordion transition classes */
.accordion-enter-active,
.accordion-leave-active {
  transition: all 0.4s cubic-bezier(0.25, 0.8, 0.25, 1);
  transform-origin: top;
}

.accordion-enter-from {
  opacity: 0;
  transform: translateY(-10px) scaleY(0.8);
}

.accordion-leave-to {
  opacity: 0;
  transform: translateY(-10px) scaleY(0.8);
}

.accordion-enter-to,
.accordion-leave-from {
  opacity: 1;
  transform: translateY(0) scaleY(1);
}

/* Ensure smooth rendering */
.accordion-content {
  transform-origin: top;
  backface-visibility: hidden;
}

/* Topic Accordion transition classes */
.topic-accordion-enter-active,
.topic-accordion-leave-active {
  transition: all 0.3s ease-out;
}
.topic-accordion-enter-from,
.topic-accordion-leave-to {
  opacity: 0;
  transform: translateY(-5px);
}
</style>
