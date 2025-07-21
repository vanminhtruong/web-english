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
              ({{ group.totalItems || group.vocabularies.length }} {{ t('vocabulary.words') }})
            </span>
          </h4>
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
        <!-- Words in this date group -->
        <div class="divide-y divide-gray-200 dark:divide-gray-700">
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
import { defineAsyncComponent, ref, watch, onMounted, nextTick } from 'vue'
import { useI18n } from 'vue-i18n'
import { loadComponentSafely } from '../../../utils/import-helper'
import type { GroupedVocabulary } from '../../../utils/dateUtils'

const { t } = useI18n()

// Sử dụng defineAsyncComponent để import components an toàn
const VocabularyCard = defineAsyncComponent(
  loadComponentSafely(() => import('./VocabularyCard.vue'))
)

interface Props {
  group: GroupedVocabulary
  defaultExpanded?: boolean
  accordionState?: Record<string, boolean>
}

const props = withDefaults(defineProps<Props>(), {
  defaultExpanded: false, // Changed to false for collapsed by default
  accordionState: () => ({})
})

// Local state for accordion
const isExpanded = ref(props.defaultExpanded)
const accordionContent = ref<HTMLElement>()
const accordionMaxHeight = ref(0)

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

// Initialize accordion state
onMounted(async () => {
  // Check if there's a saved state for this date group
  if (props.accordionState && typeof props.accordionState[props.group.date] === 'boolean') {
    isExpanded.value = props.accordionState[props.group.date]
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

const toggleAccordion = () => {
  isExpanded.value = !isExpanded.value
  emit('accordion-toggle', props.group.date, isExpanded.value)
}

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
</style>
