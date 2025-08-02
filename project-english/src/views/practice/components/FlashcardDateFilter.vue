<template>
  <div class="bg-white dark:bg-[#0f0f0f] border-b border-gray-200 dark:border-gray-700">
    <div class="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
      <div class="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
        <!-- Date Filter Section -->
        <div class="flex flex-col sm:flex-row items-start sm:items-center gap-4">
          <div class="flex items-center gap-2">
            <input
              id="enableDateFilter"
              v-model="localEnabled"
              type="checkbox"
              class="h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300 dark:border-gray-600 rounded dark:bg-gray-800"
            />
            <label for="enableDateFilter" class="text-sm font-medium text-gray-700 dark:text-gray-300">
              {{ t('flashcard.dateFilter.enable', 'Filter by date') }}
            </label>
          </div>

          <div v-if="localEnabled" class="flex items-center gap-2">
            <svg class="w-4 h-4 text-gray-500 dark:text-gray-400" fill="currentColor" viewBox="0 0 20 20">
              <path fill-rule="evenodd" d="M6 2a1 1 0 00-1 1v1H4a2 2 0 00-2 2v10a2 2 0 002 2h12a2 2 0 002-2V6a2 2 0 00-2-2h-1V3a1 1 0 10-2 0v1H7V3a1 1 0 00-1-1zm0 5a1 1 0 000 2h8a1 1 0 100-2H6z" clip-rule="evenodd"/>
            </svg>
            <select
              v-model="localSelectedDate"
              class="px-3 py-1.5 text-sm border border-gray-300 dark:border-gray-600 rounded-md bg-white dark:bg-[#0f0f0f] text-gray-900 dark:text-white focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              :disabled="!localEnabled"
            >
              <option value="">{{ t('flashcard.dateFilter.allDates', 'All dates') }}</option>
              <option v-for="group in availableDates" :key="group.date" :value="group.date">
                {{ group.displayDate }} ({{ group.count }})
              </option>
            </select>
          </div>
        </div>

        <!-- Info Section -->
        <div v-if="localEnabled && localSelectedDate" class="text-sm text-gray-600 dark:text-gray-400">
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
import { computed, watch } from 'vue'
import { useI18n } from 'vue-i18n'
import { groupVocabulariesByDate, getGroupDisplayDate } from '../../../utils/dateUtils'
import type { Vocabulary } from '../../../composables/useVocabularyStore'

interface Props {
  vocabularies: Vocabulary[]
  enabled: boolean
  selectedDate: string
}

interface DateGroup {
  date: string
  displayDate: string
  count: number
}

const props = defineProps<Props>()

const emit = defineEmits<{
  'update:enabled': [value: boolean]
  'update:selectedDate': [value: string]
}>()

const { t, locale } = useI18n()

// Local reactive values for v-model
const localEnabled = computed({
  get: () => props.enabled,
  set: (value) => emit('update:enabled', value)
})

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

// Reset selected date when disabled
watch(localEnabled, (enabled) => {
  if (!enabled) {
    localSelectedDate.value = ''
  }
})

// Reset selected date if it becomes unavailable
watch(availableDates, (newDates) => {
  if (localSelectedDate.value && !newDates.some(d => d.date === localSelectedDate.value)) {
    localSelectedDate.value = ''
  }
})
</script>
