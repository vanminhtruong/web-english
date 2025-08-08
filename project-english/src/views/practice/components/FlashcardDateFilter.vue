<template>
  <div class="bg-white dark:bg-[#0f0f0f] border-b border-gray-200 dark:border-dark-bg-mute">
    <div class="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
      <div class="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
        <!-- Date Filter Section (always enabled) -->
        <div class="flex flex-col sm:flex-row items-start sm:items-center gap-4">
          <div class="flex items-center gap-2">
            <svg class="w-4 h-4 text-gray-500 dark:text-white/60" fill="currentColor" viewBox="0 0 20 20">
              <path fill-rule="evenodd" d="M6 2a1 1 0 00-1 1v1H4a2 2 0 00-2 2v10a2 2 0 002 2h12a2 2 0 002-2V6a2 2 0 00-2-2h-1V3a1 1 0 10-2 0v1H7V3a1 1 0 00-1-1zm0 5a1 1 0 000 2h8a1 1 0 100-2H6z" clip-rule="evenodd"/>
            </svg>
            <!-- Custom Dropdown với Scroll -->
            <div class="relative">
              <button
                type="button"
                @click="toggleDropdown"
                :disabled="practiceStarted"
                :aria-disabled="practiceStarted ? 'true' : 'false'"
                :title="practiceStarted ? t('flashcard.dateFilter.disabledDuringPractice', 'Date filter is disabled during practice') : ''"
                class="px-3 py-1.5 text-sm border border-gray-300 dark:border-dark-bg-soft dark:border-2 rounded-md bg-white dark:bg-dark-bg text-gray-900 dark:text-white focus:ring-2 focus:ring-blue-500 focus:border-blue-400 disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-between min-w-[200px] sm:min-w-[240px]"
              >
                <span class="truncate">
                  {{ getSelectedDateDisplay() }}
                </span>
                <svg 
                  class="w-4 h-4 ml-2 transition-transform duration-200" 
                  :class="{ 'rotate-180': isDropdownOpen }"
                  fill="currentColor" 
                  viewBox="0 0 20 20"
                >
                  <path fill-rule="evenodd" d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z" clip-rule="evenodd" />
                </svg>
              </button>
              
              <!-- Dropdown Menu -->
              <transition
                enter-active-class="transform transition duration-100 ease-out"
                enter-from-class="scale-95 opacity-0 translate-y-2"
                enter-to-class="scale-100 opacity-100 translate-y-0"
                leave-active-class="transform transition duration-75 ease-in"
                leave-from-class="scale-100 opacity-100 translate-y-0"
                leave-to-class="scale-95 opacity-0 translate-y-2"
              >
                <div 
                  v-if="isDropdownOpen && !practiceStarted"
                  class="absolute bottom-full mb-1 w-full bg-white dark:bg-dark-bg border border-gray-300 dark:border-dark-bg-soft dark:border-2 rounded-md shadow-xl ring-1 ring-black ring-opacity-5 max-h-60 overflow-y-auto origin-bottom"
                  style="z-index: 99999 !important;"
                >
                <!-- All Dates Option -->
                <button
                  type="button"
                  @click="selectDate('')"
                  class="w-full px-3 py-2 text-left text-sm hover:bg-gray-100 dark:hover:bg-dark-bg-mute transition-colors duration-150"
                  :class="{
                    'bg-blue-50 dark:bg-blue-900/30 text-blue-600 dark:text-blue-400': localSelectedDate === ''
                  }"
                >
                  {{ t('flashcard.dateFilter.allDates', 'All dates') }}
                </button>
                
                <!-- Date Options -->
                <button
                  v-for="group in availableDates"
                  :key="group.date"
                  type="button"
                  @click="selectDate(group.date)"
                  class="w-full px-3 py-2 text-left text-sm hover:bg-gray-100 dark:hover:bg-dark-bg-mute transition-colors duration-150 flex items-center justify-between"
                  :class="{
                    'bg-blue-50 dark:bg-blue-900/30 text-blue-600 dark:text-blue-400': localSelectedDate === group.date
                  }"
                >
                  <span class="truncate">{{ group.displayDate }}</span>
                  <span class="ml-2 text-xs text-gray-500 dark:text-white/60 flex-shrink-0">
                    ({{ group.count }})
                  </span>
                </button>
                </div>
              </transition>
            </div>
          </div>
        </div>

        <!-- Info Section -->
        <div v-if="localSelectedDate" class="text-sm text-gray-600 dark:text-white/70">
          <span class="flex items-center gap-1">
            <svg class="w-4 h-4" fill="currentColor" viewBox="0 0 20 20">
              <path fill-rule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7-4a1 1 0 11-2 0 1 1 0 012 0zM9 9a1 1 0 000 2v3a1 1 0 001 1h1a1 1 0 100-2v-3a1 1 0 00-1-1H9z" clip-rule="evenodd"/>
            </svg>
            {{ getFilterInfo() }}
          </span>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { computed, ref, watch, onMounted, onUnmounted } from 'vue'
import { useI18n } from 'vue-i18n'
import { groupVocabulariesByDate, getGroupDisplayDate } from '../../../utils/dateUtils'
import type { Vocabulary } from '../../../composables/useVocabularyStore'

interface Props {
  vocabularies: Vocabulary[]
  // enabled remains for backward-compat but is ignored (filter is always enabled)
  enabled?: boolean
  selectedDate: string
  practiceStarted?: boolean
}

interface DateGroup {
  date: string
  displayDate: string
  count: number
}

const props = defineProps<Props>()

const emit = defineEmits<{
  // keep event signature for parent compatibility; not emitted anymore for enabled
  'update:enabled': [value: boolean]
  'update:selectedDate': [value: string]
}>()

const { t, locale } = useI18n()

// Dropdown state
const isDropdownOpen = ref(false)

// Filter is always enabled
const localEnabled = computed(() => true)

const localSelectedDate = computed({
  get: () => props.selectedDate,
  set: (value) => emit('update:selectedDate', value)
})

// Get available dates from vocabularies
const availableDates = computed((): DateGroup[] => {
  if (!props.vocabularies.length) return []
  
  const grouped = groupVocabulariesByDate(props.vocabularies, locale.value)
  
  return grouped.map(group => ({
    date: group.date,
    displayDate: group.displayDate,
    count: group.vocabularies.length
  }))
})

// Dropdown functions
const toggleDropdown = () => {
  if (props.practiceStarted) return
  isDropdownOpen.value = !isDropdownOpen.value
}

const selectDate = (date: string) => {
  if (props.practiceStarted) return
  localSelectedDate.value = date
  isDropdownOpen.value = false
}

const getSelectedDateDisplay = () => {
  if (!localSelectedDate.value) {
    return t('flashcard.dateFilter.allDates', 'All dates')
  }
  
  const selectedGroup = availableDates.value.find(g => g.date === localSelectedDate.value)
  if (!selectedGroup) {
    return t('flashcard.dateFilter.allDates', 'All dates')
  }
  
  return `${selectedGroup.displayDate} (${selectedGroup.count})`
}

// Close dropdown when clicking outside
const handleClickOutside = (event: Event) => {
  const target = event.target as HTMLElement
  if (!target.closest('.relative')) {
    isDropdownOpen.value = false
  }
}

// Get filter info text
const getFilterInfo = () => {
  if (!localSelectedDate.value) return ''
  
  const selectedGroup = availableDates.value.find(g => g.date === localSelectedDate.value)
  if (!selectedGroup) return ''
  
  return t(
    'flashcard.dateFilter.info',
    { count: selectedGroup.count, date: selectedGroup.displayDate },
    `Showing ${selectedGroup.count} words from ${selectedGroup.displayDate}`
  )
}

// No need to watch enabled state since the filter is always enabled

// Reset selected date if it becomes unavailable
watch(availableDates, (newDates) => {
  if (localSelectedDate.value && !newDates.some(d => d.date === localSelectedDate.value)) {
    localSelectedDate.value = ''
  }
})

// Always enabled: no-op watcher removed

// Setup click outside listener
onMounted(() => {
  document.addEventListener('click', handleClickOutside)
})

onUnmounted(() => {
  document.removeEventListener('click', handleClickOutside)
})
</script>
