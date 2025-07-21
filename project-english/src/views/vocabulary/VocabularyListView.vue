<template>
  <div>
    <!-- Header -->
    <VocabularyHeader @add-vocabulary="openAddDialog" />

    <!-- Filters and Search -->
    <div class="max-w-7xl mx-auto py-6 px-4 sm:px-6 lg:px-8">
      <VocabularyFilters
        :search-query="searchQuery"
        :selected-category="selectedCategory"
        :selected-level="selectedLevel"
        :categories="categories"
        :show-favorites-only="showFavoritesOnly"
        @update:searchQuery="updateSearchQuery"
        @update:selectedCategory="updateSelectedCategory"
        @update:selectedLevel="updateSelectedLevel"
        @update:showFavoritesOnly="updateShowFavoritesOnly"
      />
      
      <!-- Date Grouping Toggle -->
      <div class="bg-white dark:bg-[#0a0a0a] rounded-lg shadow border border-gray-200 dark:border-gray-700 p-4 mb-6">
        <div class="flex items-center justify-between">
          <div class="flex items-center space-x-3">
            <svg class="w-5 h-5 text-gray-500 dark:text-gray-400" fill="currentColor" viewBox="0 0 20 20">
              <path fill-rule="evenodd" d="M6 2a1 1 0 00-1 1v1H4a2 2 0 00-2 2v10a2 2 0 002 2h12a2 2 0 002-2V6a2 2 0 00-2-2h-1V3a1 1 0 10-2 0v1H7V3a1 1 0 00-1-1zm0 5a1 1 0 000 2h8a1 1 0 100-2H6z" clip-rule="evenodd"/>
            </svg>
            <div>
              <h3 class="text-sm font-medium text-gray-900 dark:text-white">{{ t('vocabulary.grouping.title') }}</h3>
              <p class="text-xs text-gray-500 dark:text-gray-400">{{ t('vocabulary.grouping.description') }}</p>
            </div>
          </div>
          <button
            @click="toggleGrouping"
            :class="[
              'relative inline-flex h-6 w-11 items-center rounded-full transition-colors',
              useGrouping ? 'bg-blue-600' : 'bg-gray-200 dark:bg-gray-600'
            ]"
          >
            <span
              :class="[
                'inline-block h-4 w-4 transform rounded-full bg-white transition-transform',
                useGrouping ? 'translate-x-6' : 'translate-x-1'
              ]"
            />
          </button>
        </div>
      </div>

      <!-- Voice Settings Panel -->
      <div class="bg-white dark:bg-[#0a0a0a] rounded-lg shadow border border-gray-200 dark:border-gray-700 p-4 mb-6">
        <VoiceSelector :show-voice-info="true" />
      </div>

      <!-- Topic Management Panel -->
      <div class="bg-white dark:bg-[#0a0a0a] rounded-lg shadow border border-gray-200 dark:border-gray-700 p-4 mb-6">
        <div class="flex items-center justify-between">
          <div class="flex items-center space-x-3">
            <svg class="w-5 h-5 text-gray-500 dark:text-gray-400" fill="currentColor" viewBox="0 0 20 20">
              <path fill-rule="evenodd" d="M3 4a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1zm0 4a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1zm0 4a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1z" clip-rule="evenodd"/>
            </svg>
            <div>
              <h3 class="text-sm font-medium text-gray-900 dark:text-white">{{ t('vocabulary.topicManager.title') }}</h3>
              <p class="text-xs text-gray-500 dark:text-gray-400">{{ t('vocabulary.topicManager.builtInTopicsDescription') }}</p>
            </div>
          </div>
          <button
            @click="openTopicManager"
            class="px-4 py-2 bg-purple-600 hover:bg-purple-700 text-white text-sm font-medium rounded-lg transition-colors flex items-center space-x-2"
          >
            <svg class="h-4 w-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 6v6m0 0v6m0-6h6m-6 0H6"/>
            </svg>
            <span>{{ t('vocabulary.topicManager.manageTopics') }}</span>
          </button>
        </div>
      </div>

      <!-- Save Control Panel -->
      <div class="bg-white dark:bg-[#0a0a0a] rounded-lg shadow border border-gray-200 dark:border-gray-700 p-4 mb-6">
        <div class="flex items-center justify-between">
          <div class="flex items-center space-x-4">
            <div class="flex items-center space-x-2">
              <span class="text-sm font-medium text-gray-700 dark:text-gray-300">{{ t('vocabulary.save.mode') }}</span>
              <button
                @click="toggleSaveMode"
                :class="[
                  'relative  inline-flex h-6 w-11 items-center rounded-full transition-colors',
                  autoSaveEnabled ? 'bg-blue-600' : 'bg-gray-200 dark:bg-gray-600'
                ]"
              >
                <span
                  :class="[
                    'inline-block h-4 w-4 transform rounded-full bg-white transition-transform',
                    autoSaveEnabled ? 'translate-x-6' : 'translate-x-1'
                  ]"
                />
              </button>
              <span class="text-sm text-gray-600 dark:text-gray-400">
                {{ autoSaveEnabled ? t('vocabulary.save.auto') : t('vocabulary.save.manual') }}
              </span>
            </div>
            
            <div class="flex items-center space-x-2">
              <!-- Manual save button -->
              <button
                v-if="!autoSaveEnabled"
                @click="manualSave"
                :disabled="isSaving"
                class="px-4 py-2 bg-green-500 hover:bg-green-600 disabled:bg-gray-400 text-white text-sm font-medium rounded-lg transition-colors flex items-center space-x-2"
              >
                <svg v-if="isSaving" class="animate-spin h-4 w-4" fill="none" viewBox="0 0 24 24">
                  <circle class="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" stroke-width="4"></circle>
                  <path class="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                </svg>
                <svg v-else class="h-4 w-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M8 7H5a2 2 0 00-2 2v9a2 2 0 002 2h14a2 2 0 002-2V9a2 2 0 00-2-2h-3m-1 4l-3-3m0 0l-3 3m3-3v12"></path>
                </svg>
                <span>{{ isSaving ? t('common.saving') : t('vocabulary.save.saveNow') }}</span>
              </button>
              
              <!-- Auto-save setup button (when auto-save enabled but no file selected) -->
              <button
                v-if="autoSaveEnabled && !hasAutoSaveFile"
                @click="setupAutoSaveFile"
                class="px-4 py-2 bg-orange-500 hover:bg-orange-600 text-white text-sm font-medium rounded-lg transition-colors flex items-center space-x-2"
              >
                <svg class="h-4 w-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 6v6m0 0v6m0-6h6m-6 0H6"></path>
                </svg>
                <span>{{ t('vocabulary.save.chooseAutoFile') }}</span>
              </button>
              
              <!-- Reset auto-save file button (when auto-save enabled and file selected) -->
              <button
                v-if="autoSaveEnabled && hasAutoSaveFile"
                @click="resetAutoSaveFile"
                class="px-4 py-2 bg-gray-500 hover:bg-gray-600 text-white text-sm font-medium rounded-lg transition-colors flex items-center space-x-2"
              >
                <svg class="h-4 w-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15"></path>
                </svg>
                <span>{{ t('vocabulary.save.changeAutoFile') }}</span>
              </button>
              
              <!-- Import button -->
              <div class="relative">
                <input
                  ref="fileInput"
                  type="file"
                  accept=".json"
                  @change="handleFileImport"
                  class="hidden"
                />
                <button
                  @click="openFileImport"
                  class="px-4 py-2 bg-blue-500 hover:bg-blue-600 text-white text-sm font-medium rounded-lg transition-colors flex items-center space-x-2"
                >
                  <svg class="h-4 w-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M7 16a4 4 0 01-.88-7.903A5 5 0 1115.9 6L16 6a5 5 0 011 9.9M9 19l3 3m0 0l3-3m-3 3V10"></path>
                  </svg>
                  <span>{{ t('vocabulary.save.importFile') }}</span>
                </button>
              </div>
            </div>
          </div>
          
          <div class="flex items-center space-x-4 text-sm text-gray-500 dark:text-gray-400">
            <div class="flex items-center space-x-1">
              <svg class="h-4 w-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z"></path>
              </svg>
              <span>{{ t('vocabulary.save.lastSave', { time: lastSaveTime || t('vocabulary.save.notSaved') }) }}</span>
            </div>
            <div class="flex items-center space-x-1">
              <div :class="['h-2 w-2 rounded-full', getSaveStatusColor]" />
              <span>{{ getSaveStatusText }}</span>
            </div>
          </div>
        </div>
      </div>

      <!-- Vocabulary List -->
      <VocabularyList
        :paginated-words="useGrouping ? [] : paginatedVocabulary"
        :current-page="currentPage"
        :total-pages="totalPages"
        :total-count="filteredVocabulary.length"
        :start-index="startIndex"
        :end-index="endIndex"
        :visible-pages="visiblePages"
        :use-grouping="useGrouping"
        :all-words="useGrouping ? filteredVocabulary : undefined"
        :date-group-pages="dateGroupPages"
        :items-per-page-grouped="itemsPerPageGrouped"
        @play-audio="playAudio"
        @edit-word="openEditDialog"
        @delete-word="deleteWord"
        @toggle-favorite="toggleFavorite"
        @view-details="openDetailsDialog"
        @previous-page="previousPage"
        @next-page="nextPage"
        @go-to-page="goToPage"
        @date-group-previous="dateGroupPrevious"
        @date-group-next="dateGroupNext"
        @date-group-go-to-page="dateGroupGoToPage"
      />
    </div>

    <!-- Vocabulary Form Dialog -->
    <VocabularyFormDialog
      v-model="showFormDialog"
      :vocabulary="selectedVocabulary"
      @vocabulary-saved="onVocabularySaved"
    />

    <!-- Vocabulary Detail Dialog -->
    <VocabularyDetailDialog
      v-model="showDetailDialog"
      :vocabulary="selectedVocabularyForDetail"
      @edit-vocabulary="openEditFromDetail"
      @toggle-favorite="toggleFavorite"
    />

    <!-- Topic Manager Dialog -->
    <TopicManager
      v-model="showTopicManager"
      :vocabulary-usage="categoryUsage"
      @topic-added="onTopicAdded"
      @topic-updated="onTopicUpdated"
      @topic-deleted="onTopicDeleted"
    />
  </div>
</template>

<script setup lang="ts">
import { ref, computed, onMounted, onUnmounted, watch, defineAsyncComponent } from 'vue'
import { useRouter, useRoute } from 'vue-router'
import { useI18n } from 'vue-i18n'
import { useVoiceStore } from '../../stores/voiceStore'
import { useVocabularyStore } from '../../composables/useVocabularyStore'
import { groupVocabulariesByDate, getDateKey } from '../../utils/dateUtils'
// Dialog component
const VocabularyFormDialog = defineAsyncComponent(() => import('./components/VocabularyFormDialog.vue'))
import type { Vocabulary } from '../../composables/useVocabularyStore'
import { loadComponentSafely } from '../../utils/import-helper'

// Sử dụng defineAsyncComponent để import components an toàn
const VocabularyHeader = defineAsyncComponent(
  loadComponentSafely(() => import('./components/VocabularyHeader.vue'))
)
const VocabularyFilters = defineAsyncComponent(
  loadComponentSafely(() => import('./components/VocabularyFilters.vue'))
)
const VocabularyList = defineAsyncComponent({
  loader: () => import('./components/VocabularyList.vue'),
  errorComponent: () => 'Error loading component'
})
const VocabularyDetailDialog = defineAsyncComponent({
  loader: () => import('./components/VocabularyDetailDialog.vue'),
  errorComponent: () => 'Error loading component'
})
const VoiceSelector = defineAsyncComponent(
  loadComponentSafely(() => import('../../components/VoiceSelector.vue'))
)
const TopicManager = defineAsyncComponent(
  loadComponentSafely(() => import('./components/TopicManager.vue'))
)

const router = useRouter()
const route = useRoute()
const { t } = useI18n()
const vocabularyStore = useVocabularyStore()
const voiceStore = useVoiceStore()

// Reactive data
const fileInput = ref<HTMLInputElement | null>(null)
const currentVocabulary = ref<any>(null)
const showDialog = ref(false)
const searchQuery = ref('')
const selectedCategory = ref('')
const selectedLevel = ref('')
const showFavoritesOnly = ref(false)
const useGrouping = ref(false)
const currentPage = ref(1)
const itemsPerPage = ref(5)
const itemsPerPageGrouped = ref(5) // Items per page for grouped view
const dateGroupPages = ref<Record<string, number>>({}) // Track current page for each date group

const autoSaveFileHandle = ref<any>(null)
const autoSaveFileName = ref<string>('vocabulary-auto-backup.json')
const hasAutoSaveFile = ref<boolean>(false) // Track if user has selected auto-save file

// Save functionality states
const autoSaveEnabled = ref(true)
const isSaving = ref(false)
const lastSaveTime = ref('')

// Dialog states
const showFormDialog = ref(false)
const selectedVocabulary = ref<Vocabulary | null>(null)
const showDetailDialog = ref(false)
const selectedVocabularyForDetail = ref<Vocabulary | null>(null)
const saveStatus = ref<'idle' | 'saving' | 'success' | 'error'>('idle')

// Topic Manager states
const showTopicManager = ref(false)
let autoSaveTimer: number | null = null
let debounceTimer: number | null = null

// Methods to handle localStorage
function getStoredShowFavoritesOnly(): boolean {
  try {
    const stored = localStorage.getItem('vocabulary-show-favorites-only')
    return stored === 'true'
  } catch {
    return false
  }
}

function setStoredShowFavoritesOnly(value: boolean) {
  localStorage.setItem('vocabulary-show-favorites-only', value.toString())
}

function updateShowFavoritesOnly(value: boolean) {
  showFavoritesOnly.value = value
  setStoredShowFavoritesOnly(value)
  // Reset to first page when changing filters
  currentPage.value = 1
  // Clear date group pages
  dateGroupPages.value = {}
}

// Search Query localStorage methods
function getStoredSearchQuery(): string {
  try {
    return localStorage.getItem('vocabulary-search-query') || ''
  } catch {
    return ''
  }
}

function setStoredSearchQuery(value: string) {
  localStorage.setItem('vocabulary-search-query', value)
}

function updateSearchQuery(value: string) {
  searchQuery.value = value
  setStoredSearchQuery(value)
  // Reset to first page when changing filters
  currentPage.value = 1
  // Clear date group pages
  dateGroupPages.value = {}
  // Trigger auto-save if enabled
  if (autoSaveEnabled.value) {
    debounceAutoSave()
  }
}

// Selected Category localStorage methods
function getStoredSelectedCategory(): string {
  try {
    return localStorage.getItem('vocabulary-selected-category') || ''
  } catch {
    return ''
  }
}

function setStoredSelectedCategory(value: string) {
  localStorage.setItem('vocabulary-selected-category', value)
}

function updateSelectedCategory(value: string) {
  selectedCategory.value = value
  setStoredSelectedCategory(value)
  // Reset to first page when changing filters
  currentPage.value = 1
  // Clear date group pages
  dateGroupPages.value = {}
  // Trigger auto-save if enabled
  if (autoSaveEnabled.value) {
    debounceAutoSave()
  }
}

// Selected Level localStorage methods
function getStoredSelectedLevel(): string {
  try {
    return localStorage.getItem('vocabulary-selected-level') || ''
  } catch {
    return ''
  }
}

function setStoredSelectedLevel(value: string) {
  localStorage.setItem('vocabulary-selected-level', value)
}

function updateSelectedLevel(value: string) {
  selectedLevel.value = value
  setStoredSelectedLevel(value)
  // Reset to first page when changing filters
  currentPage.value = 1
  // Clear date group pages
  dateGroupPages.value = {}
  // Trigger auto-save if enabled
  if (autoSaveEnabled.value) {
    debounceAutoSave()
  }
}

// Grouping localStorage methods
const getStoredUseGrouping = (): boolean => {
  const stored = localStorage.getItem('vocabulary-use-grouping')
  return stored ? JSON.parse(stored) : false
}

const setStoredUseGrouping = (value: boolean) => {
  localStorage.setItem('vocabulary-use-grouping', JSON.stringify(value))
}

const toggleGrouping = () => {
  useGrouping.value = !useGrouping.value
  setStoredUseGrouping(useGrouping.value)
  
  // Reset to first page when toggling grouping
  currentPage.value = 1
  
  console.log('Grouping toggled:', useGrouping.value)
}

// Save functionality methods
const getStoredAutoSaveEnabled = (): boolean => {
  const stored = localStorage.getItem('vocabulary-auto-save-enabled')
  return stored ? JSON.parse(stored) : true
}

const setStoredAutoSaveEnabled = (value: boolean) => {
  localStorage.setItem('vocabulary-auto-save-enabled', JSON.stringify(value))
}

const getStoredHasAutoSaveFile = (): boolean => {
  const stored = localStorage.getItem('vocabulary-has-auto-save-file')
  return stored ? JSON.parse(stored) : false
}

const setStoredHasAutoSaveFile = (value: boolean) => {
  localStorage.setItem('vocabulary-has-auto-save-file', JSON.stringify(value))
}

// Reset auto-save file selection
const resetAutoSaveFile = () => {
  autoSaveFileHandle.value = null
  hasAutoSaveFile.value = false
  setStoredHasAutoSaveFile(false)
  console.log('Auto-save file selection reset')
}

const getStoredLastSaveTime = (): string => {
  return localStorage.getItem('vocabulary-last-save-time') || ''
}



const setStoredLastSaveTime = (time: string) => {
  localStorage.setItem('vocabulary-last-save-time', time)
}

const toggleSaveMode = () => {
  autoSaveEnabled.value = !autoSaveEnabled.value
  setStoredAutoSaveEnabled(autoSaveEnabled.value)
  
  if (autoSaveEnabled.value) {
    // Start auto-save when enabled
    scheduleAutoSave()
  } else {
    // Clear auto-save timer when disabled
    if (autoSaveTimer) {
      clearTimeout(autoSaveTimer)
      autoSaveTimer = null
    }
  }
}



const manualSave = async () => {
  if (isSaving.value) return
  
  isSaving.value = true
  saveStatus.value = 'saving'
  
  try {
    // Get group topics from localStorage
    const getGroupTopics = (): Record<string, string> => {
      try {
        const stored = localStorage.getItem('vocabulary-group-topics')
        return stored ? JSON.parse(stored) : {}
      } catch (error) {
        console.warn('Failed to load group topics for save:', error)
        return {}
      }
    }
    
    // Get vocabulary data, custom topics, and group topics
    const vocabularyData = {
      vocabularies: vocabularyStore.allVocabularies.value,
      customTopics: vocabularyStore.customTopics.value,
      groupTopics: getGroupTopics(), // Include group topics in save data
      accordionState: JSON.parse(localStorage.getItem('vocabulary-accordion-state') || '{}'), // Include accordion state
      exportDate: new Date().toISOString(),
      version: '1.1', // Updated version to include new data
      totalCount: vocabularyStore.totalCount.value
    }
    
    // Try to use File System Access API first (for modern browsers)
    if ('showSaveFilePicker' in window) {
      await saveToFileSystem(vocabularyData)
    } else {
      // Fallback to download
      await downloadJsonFile(vocabularyData)
    }
    
    // Also save to localStorage as backup
    vocabularyStore.saveToLocalStorage()
    
    // Update save time
    const now = new Date().toLocaleString('vi-VN')
    lastSaveTime.value = now
    setStoredLastSaveTime(now)
    
    saveStatus.value = 'success'
    
    // Show success for 2 seconds
    setTimeout(() => {
      if (saveStatus.value === 'success') {
        saveStatus.value = 'idle'
      }
    }, 2000)
    
  } catch (error) {
    console.error('Error during manual save:', error)
    saveStatus.value = 'error'
    
    // Show error for 3 seconds
    setTimeout(() => {
      if (saveStatus.value === 'error') {
        saveStatus.value = 'idle'
      }
    }, 3000)
  } finally {
    isSaving.value = false
  }
}

// Save to file system using File System Access API
const saveToFileSystem = async (data: any) => {
  try {
    const fileHandle = await (window as any).showSaveFilePicker({
      suggestedName: `vocabulary-backup-${new Date().toISOString().split('T')[0]}.json`,
      types: [{
        description: 'JSON files',
        accept: {
          'application/json': ['.json']
        }
      }]
    })
    
    const writable = await fileHandle.createWritable()
    await writable.write(JSON.stringify(data, null, 2))
    await writable.close()
    
    // Store file handle for auto-save to use
    autoSaveFileHandle.value = fileHandle
    hasAutoSaveFile.value = true
    setStoredHasAutoSaveFile(true)
    console.log('File saved successfully to file system and handle stored for auto-save')
  } catch (error) {
    if ((error as Error).name !== 'AbortError') {
      console.error('Error saving to file system:', error)
      // Fallback to download if file system access fails
      await downloadJsonFile(data)
    }
  }
}

// Fallback: Download JSON file
const downloadJsonFile = async (data: any) => {
  const jsonString = JSON.stringify(data, null, 2)
  const blob = new Blob([jsonString], { type: 'application/json' })
  const url = URL.createObjectURL(blob)
  
  const link = document.createElement('a')
  link.href = url
  link.download = `vocabulary-backup-${new Date().toISOString().split('T')[0]}.json`
  document.body.appendChild(link)
  link.click()
  document.body.removeChild(link)
  
  URL.revokeObjectURL(url)
  console.log('File downloaded successfully')
}

const debounceAutoSave = () => {
  console.log('debounceAutoSave called, autoSaveEnabled:', autoSaveEnabled.value)
  if (!autoSaveEnabled.value) return
  
  // Clear existing debounce timer
  if (debounceTimer) {
    console.log('Clearing existing debounce timer')
    clearTimeout(debounceTimer)
  }
  
  console.log('Setting new debounce timer for 500ms...')
  // Set new debounce timer for auto-save (delay 500ms for quick response)
  debounceTimer = setTimeout(() => {
    console.log('Debounce timer fired, calling performAutoSave')
    performAutoSave()
  }, 500) as unknown as number
}

const performAutoSave = async () => {
  console.log('performAutoSave called, autoSaveEnabled:', autoSaveEnabled.value)
  if (!autoSaveEnabled.value) return
  
  try {
    console.log('Starting auto-save process...')
    saveStatus.value = 'saving'
    
    // Get group topics from localStorage
    const getGroupTopics = (): Record<string, string> => {
      try {
        const stored = localStorage.getItem('vocabulary-group-topics')
        return stored ? JSON.parse(stored) : {}
      } catch (error) {
        console.warn('Failed to load group topics for auto-save:', error)
        return {}
      }
    }
    
    // Get vocabulary data, custom topics, and group topics for JSON file
    const vocabularyData = {
      vocabularies: vocabularyStore.allVocabularies.value,
      customTopics: vocabularyStore.customTopics.value,
      groupTopics: getGroupTopics(), // Include group topics in auto-save data
      accordionState: JSON.parse(localStorage.getItem('vocabulary-accordion-state') || '{}'), // Include accordion state
      exportDate: new Date().toISOString(),
      version: '1.1', // Updated version to include new data
      totalCount: vocabularyStore.totalCount.value
    }
    
    // Save to localStorage first
    vocabularyStore.saveToLocalStorage()
    console.log('Auto-save: Data saved to localStorage')
    
    // Try to auto-save to file (ghi đè file đã có, không hiện dialog)
    await tryAutoSaveToFile(vocabularyData)
    
    // Update save time
    const now = new Date().toLocaleString('vi-VN')
    lastSaveTime.value = now
    setStoredLastSaveTime(now)
    
    saveStatus.value = 'success'
    
    // Reset status after 1 second for auto-save
    setTimeout(() => {
      if (saveStatus.value === 'success') {
        saveStatus.value = 'idle'
      }
    }, 1000)
    
  } catch (error) {
    console.error('Error during auto-save:', error)
    saveStatus.value = 'error'
    
    setTimeout(() => {
      if (saveStatus.value === 'error') {
        saveStatus.value = 'idle'
      }
    }, 2000)
  }
}

// Auto-save to file (silent, no user interaction)
const autoSaveToFile = async (data: any) => {
  try {
    // Check if we have a stored file handle from previous manual save
    const storedFileHandle = getStoredFileHandle()
    
    if (storedFileHandle && 'createWritable' in storedFileHandle) {
      // Try to use existing file handle
      try {
        const writable = await storedFileHandle.createWritable()
        await writable.write(JSON.stringify(data, null, 2))
        await writable.close()
        console.log('Auto-saved to existing file')
        return
      } catch (error) {
        console.log('Could not write to existing file handle, will use download method')
      }
    }
    
    // Fallback to automatic download with consistent filename
    const filename = `vocabulary-auto-backup.json`
    const jsonString = JSON.stringify(data, null, 2)
    const blob = new Blob([jsonString], { type: 'application/json' })
    const url = URL.createObjectURL(blob)
    
    const link = document.createElement('a')
    link.href = url
    link.download = filename
    link.style.display = 'none'
    document.body.appendChild(link)
    link.click()
    document.body.removeChild(link)
    
    URL.revokeObjectURL(url)
    console.log('Auto-saved via download')
    
  } catch (error) {
    console.log('Auto-save to file failed, data saved to localStorage only:', error)
    // Don't throw error for auto-save failures
  }
}

// Helper to get stored file handle (this is a placeholder - actual implementation would need more complex storage)
const getStoredFileHandle = () => {
  // In a real implementation, you might store file handle reference
  // but due to security restrictions, this is limited
  return null
}

// Auto-save to file with overwrite capability
const tryAutoSaveToFile = async (data: any) => {
  try {
    // Check if we have File System Access API support
    if ('showSaveFilePicker' in window) {
      // If we already have a file handle, use it to overwrite
      if (autoSaveFileHandle.value) {
        try {
          const writable = await autoSaveFileHandle.value.createWritable()
          await writable.write(JSON.stringify(data, null, 2))
          await writable.close()
          console.log('Auto-save: Successfully overwrote existing file')
          return
        } catch (error) {
          console.log('Auto-save: Failed to overwrite existing file:', error)
          autoSaveFileHandle.value = null // Reset handle if it's invalid
          hasAutoSaveFile.value = false // Reset state
          setStoredHasAutoSaveFile(false)
        }
      }
      
      // If no file handle exists but user previously selected file, 
      // it means page was refreshed - file handle is lost
      if (!autoSaveFileHandle.value && hasAutoSaveFile.value) {
        console.log('Auto-save: File handle lost after page refresh. File selection needed.')
        // Don't auto-save to file until user re-selects file
        return
      }
      
      // If no file handle and no previous selection, silently skip
      if (!autoSaveFileHandle.value) {
        console.log('Auto-save: No file handle available. User needs to select auto-save file first.')
        return
      }
    } else {
      // Fallback: No file saving for auto-save to prevent spam
      console.log('Auto-save: File System Access API not available, localStorage only')
    }
    
  } catch (error) {
    console.log('Auto-save: File operation failed:', error)
  }
}

// File import functions
const openFileImport = () => {
  fileInput.value?.click()
}

// Setup auto-save file function
const setupAutoSaveFile = async () => {
  try {
    if ('showSaveFilePicker' in window) {
      autoSaveFileHandle.value = await (window as any).showSaveFilePicker({
        suggestedName: autoSaveFileName.value,
        types: [{
          description: 'JSON files',
          accept: {
            'application/json': ['.json']
          }
        }]
      })
      
      console.log('Auto-save file selected:', autoSaveFileHandle.value.name)
      
      // Mark that user has selected auto-save file
      hasAutoSaveFile.value = true
      setStoredHasAutoSaveFile(true)
      
      // Perform initial save to the selected file
      await tryAutoSaveToFile({
        vocabularies: vocabularyStore.allVocabularies.value,
        exportDate: new Date().toISOString(),
        version: '1.0',
        totalCount: vocabularyStore.allVocabularies.value.length
      })
    } else {
      alert(t('vocabulary.save.errors.browserNotSupported'))
    }
  } catch (error) {
    if ((error as Error).name === 'AbortError') {
      console.log('User cancelled file selection')
    } else {
      console.error('Error setting up auto-save file:', error)
      alert(t('vocabulary.save.errors.fileSelectError', { error: (error as Error).message }))
    }
  }
}

const handleFileImport = async (event: Event) => {
  const target = event.target as HTMLInputElement
  const file = target.files?.[0]
  
  if (!file || !file.name.endsWith('.json')) {
    alert(t('vocabulary.save.errors.invalidFile'))
    return
  }
  
  try {
    saveStatus.value = 'saving'
    
    const text = await file.text()
    const data = JSON.parse(text)
    
    // Validate data structure
    if (!data.vocabularies || !Array.isArray(data.vocabularies)) {
      throw new Error(t('vocabulary.save.errors.invalidFormat'))
    }
    
    // Confirm before importing
    const confirmMessage = t('vocabulary.save.import.confirmMessage', { count: data.vocabularies.length, filename: file.name })
    
    if (!confirm(confirmMessage)) {
      saveStatus.value = 'idle'
      return
    }
    
    // Import vocabularies using store method
    const success = vocabularyStore.importVocabularies(data.vocabularies)
    
    if (!success) {
      throw new Error('Không thể nhập dữ liệu vào store')
    }
    
    // Import custom topics if available
    if (data.customTopics && Array.isArray(data.customTopics)) {
      console.log('Importing custom topics:', data.customTopics)
      // Clear existing custom topics first
      vocabularyStore.customTopics.value = []
      // Add imported custom topics
      data.customTopics.forEach((topic: {key: string, vi: string, en: string}) => {
        vocabularyStore.addCustomTopic(topic)
      })
      console.log('Custom topics imported successfully')
    }
    
    // Import group topics if available (version 1.1+)
    if (data.groupTopics && typeof data.groupTopics === 'object') {
      try {
        localStorage.setItem('vocabulary-group-topics', JSON.stringify(data.groupTopics))
        console.log('Group topics imported successfully:', data.groupTopics)
      } catch (error) {
        console.warn('Failed to import group topics:', error)
      }
    }
    
    // Import accordion state if available (version 1.1+)
    if (data.accordionState && typeof data.accordionState === 'object') {
      try {
        localStorage.setItem('vocabulary-accordion-state', JSON.stringify(data.accordionState))
        console.log('Accordion state imported successfully:', data.accordionState)
      } catch (error) {
        console.warn('Failed to import accordion state:', error)
      }
    }
    
    // Update save time
    const now = new Date().toLocaleString('vi-VN')
    lastSaveTime.value = now
    setStoredLastSaveTime(now)
    
    saveStatus.value = 'success'
    alert(t('vocabulary.save.import.successMessage', { count: data.vocabularies.length }))
    
    // Reset file input
    if (fileInput.value) {
      fileInput.value.value = ''
    }
    
    // Reset status after showing success
    setTimeout(() => {
      if (saveStatus.value === 'success') {
        saveStatus.value = 'idle'
      }
    }, 2000)
    
  } catch (error) {
    console.error('Error importing file:', error)
    saveStatus.value = 'error'
    alert('Lỗi khi nhập file: ' + (error as Error).message)
    
    setTimeout(() => {
      if (saveStatus.value === 'error') {
        saveStatus.value = 'idle'
      }
    }, 3000)
  }
}

// Missing scheduleAutoSave function
const scheduleAutoSave = () => {
  // Clear existing timer
  if (autoSaveTimer) {
    clearTimeout(autoSaveTimer)
  }
  
  // Set up auto-save timer (every 10 seconds for auto mode)
  autoSaveTimer = window.setTimeout(() => {
    if (autoSaveEnabled.value) {
      performAutoSave()
      scheduleAutoSave() // Schedule next auto-save
    }
  }, 10000) // 10 seconds
}

// Computed
// Use the raw category keys from the store
const categories = computed(() => vocabularyStore.getCategories.value)

// Category usage for TopicManager
const categoryUsage = computed(() => vocabularyStore.getCategoryUsage.value)

const filteredVocabulary = computed(() => {
  return vocabularyStore.allVocabularies.value.filter(word => {
    const matchesSearch = !searchQuery.value ||
      word.word.toLowerCase().includes(searchQuery.value.toLowerCase()) ||
      word.meaning.toLowerCase().includes(searchQuery.value.toLowerCase())
    const matchesCategory = !selectedCategory.value || word.category === selectedCategory.value
    const matchesLevel = !selectedLevel.value || word.level === selectedLevel.value
    const matchesFavorite = !showFavoritesOnly.value || word.favorite === true

    return matchesSearch && matchesCategory && matchesLevel && matchesFavorite
  })
})

const totalPages = computed(() => {
  // No pagination when grouping is enabled
  if (useGrouping.value) return 1
  return Math.ceil(filteredVocabulary.value.length / itemsPerPage.value)
})

const paginatedVocabulary = computed(() => {
  // Return all filtered vocabulary when grouping is enabled
  if (useGrouping.value) return filteredVocabulary.value
  
  const start = (currentPage.value - 1) * itemsPerPage.value
  const end = start + itemsPerPage.value
  return filteredVocabulary.value.slice(start, end)
})

const startIndex = computed(() => (currentPage.value - 1) * itemsPerPage.value + 1)
const endIndex = computed(() => Math.min(currentPage.value * itemsPerPage.value, filteredVocabulary.value.length))

const visiblePages = computed(() => {
  const pages = []
  const start = Math.max(1, currentPage.value - 2)
  const end = Math.min(totalPages.value, currentPage.value + 2)
  
  for (let i = start; i <= end; i++) {
    pages.push(i)
  }
  return pages
})

// Save status computed functions
const getSaveStatusColor = computed(() => {
  switch (saveStatus.value) {
    case 'saving':
      return 'bg-yellow-500'
    case 'success':
      return 'bg-green-500'
    case 'error':
      return 'bg-red-500'
    default:
      return 'bg-gray-400'
  }
})

const getSaveStatusText = computed(() => {
  switch (saveStatus.value) {
    case 'saving':
      return autoSaveEnabled.value ? t('vocabulary.save.status.autoSaving') : t('vocabulary.save.status.saving')
    case 'success':
      if (autoSaveEnabled.value) {
        return hasAutoSaveFile.value ? t('vocabulary.save.status.autoWithFile') : t('vocabulary.save.status.autoLocalStorage')
      }
      return t('vocabulary.save.status.fileSaved')
    case 'error':
      return t('vocabulary.save.status.error')
    default:
      if (autoSaveEnabled.value) {
        return hasAutoSaveFile.value ? t('vocabulary.save.status.autoFile') : t('vocabulary.save.status.autoNoFile')
      }
      return t('vocabulary.save.manual')
  }
})

// Methods
const openAddDialog = () => {
  selectedVocabulary.value = null
  showFormDialog.value = true
}

const openEditDialog = (word: Vocabulary) => {
  selectedVocabulary.value = word
  showFormDialog.value = true
}

const onVocabularySaved = () => {
  showFormDialog.value = false
  selectedVocabulary.value = null
  // Vocabulary saved successfully, auto-save will be triggered by watchers
  console.log('Vocabulary saved via dialog, auto-save should be triggered automatically')
}

const openDetailsDialog = (word: Vocabulary) => {
  selectedVocabularyForDetail.value = word
  showDetailDialog.value = true
}

const openEditFromDetail = (word: Vocabulary) => {
  showDetailDialog.value = false
  selectedVocabulary.value = word
  showFormDialog.value = true
}

const deleteWord = (word: any) => {
  if (confirm(t('vocabulary.confirmDelete', { word: word.word }))) {
    vocabularyStore.deleteVocabulary(word.id)
    
    // Trigger auto-save if enabled
    if (autoSaveEnabled.value) {
      debounceAutoSave()
    }
  }
}

const toggleFavorite = (word: any) => {
  vocabularyStore.toggleFavorite(word.id)
  
  // Trigger auto-save if enabled
  if (autoSaveEnabled.value) {
    debounceAutoSave()
  }
}

const playAudio = async (word: string) => {
  try {
    // Directly create utterance with current voice settings to ensure reactivity
    const utterance = voiceStore.createUtterance(word)
    
    await new Promise<void>((resolve, reject) => {
      utterance.onend = () => resolve()
      utterance.onerror = (event) => reject(event.error)
      
      if ('speechSynthesis' in window) {
        speechSynthesis.speak(utterance)
      } else {
        reject(new Error('Speech synthesis not supported'))
      }
    })
  } catch (error) {
    console.error('Error playing audio:', error)
    // Fallback to basic speech synthesis
    if ('speechSynthesis' in window) {
      const utterance = new SpeechSynthesisUtterance(word)
      utterance.lang = 'en-US'
      speechSynthesis.speak(utterance)
    }
  }
}

const previousPage = () => {
  if (currentPage.value > 1) {
    currentPage.value--
  }
}

const nextPage = () => {
  if (currentPage.value < totalPages.value) {
    currentPage.value++
  }
}

const goToPage = (page: number) => {
  currentPage.value = page
}

// Date group pagination handlers
const dateGroupPrevious = (date: string) => {
  const currentPage = dateGroupPages.value[date] || 1
  console.log('dateGroupPrevious:', { date, currentPage, dateGroupPages: dateGroupPages.value })
  if (currentPage > 1) {
    dateGroupPages.value[date] = currentPage - 1
    console.log('Updated to page:', dateGroupPages.value[date])
  }
}

const dateGroupNext = (date: string) => {
  const currentPage = dateGroupPages.value[date] || 1
  // We need to calculate total pages for this date group
  const dateGroup = filteredVocabulary.value.filter(word => {
    return getDateKey(word.createdAt) === date
  })
  const totalPages = Math.ceil(dateGroup.length / itemsPerPageGrouped.value)
  
  console.log('dateGroupNext:', { date, currentPage, totalPages, dateGroupLength: dateGroup.length, dateGroupPages: dateGroupPages.value })
  
  if (currentPage < totalPages) {
    dateGroupPages.value[date] = currentPage + 1
    console.log('Updated to page:', dateGroupPages.value[date])
  }
}

const dateGroupGoToPage = (date: string, page: number) => {
  dateGroupPages.value[date] = page
}

// Topic Manager methods
const openTopicManager = () => {
  showTopicManager.value = true
}

const onTopicAdded = (topic: { key: string; vi: string; en: string }) => {
  console.log('Topic added:', topic)
  
  // Update reactive custom topics in vocabulary store
  vocabularyStore.addCustomTopic(topic)
  
  // Force re-computation of categories by accessing the computed property
  const currentCategories = vocabularyStore.getCategories.value
  console.log('Categories after adding topic:', currentCategories)
  
  // Trigger auto-save if enabled
  if (autoSaveEnabled.value) {
    debounceAutoSave()
  }
  
  // Emit event to notify other components
  window.dispatchEvent(new CustomEvent('topics-updated'))
}

const onTopicUpdated = (oldKey: string, topic: { key: string; vi: string; en: string }) => {
  console.log('Topic updated:', { oldKey, topic })
  
  // Update all vocabularies that use the old key
  vocabularyStore.allVocabularies.value.forEach(vocab => {
    if (vocab.category === oldKey) {
      vocabularyStore.updateVocabulary(vocab.id, { category: topic.key })
    }
  })
  
  // Update reactive custom topics in vocabulary store
  vocabularyStore.updateCustomTopic(oldKey, topic)
  
  // Force re-computation of categories
  const currentCategories = vocabularyStore.getCategories.value
  console.log('Categories after updating topic:', currentCategories)
  
  // Trigger auto-save if enabled
  if (autoSaveEnabled.value) {
    debounceAutoSave()
  }
  
  // Emit event to notify other components
  window.dispatchEvent(new CustomEvent('topics-updated'))
}

const onTopicDeleted = (key: string) => {
  console.log('Topic deleted:', key)
  // Note: TopicManager should prevent deletion of topics in use
  
  // Update reactive custom topics in vocabulary store
  vocabularyStore.deleteCustomTopic(key)
  
  // Force re-computation of categories
  const currentCategories = vocabularyStore.getCategories.value
  console.log('Categories after deleting topic:', currentCategories)
  
  // Trigger auto-save if enabled
  if (autoSaveEnabled.value) {
    debounceAutoSave()
  }
  
  // Emit event to notify other components
  window.dispatchEvent(new CustomEvent('topics-updated'))
}

// Watch for vocabulary changes to trigger auto-save
watch(
  vocabularyStore.allVocabularies,
  (newVocabularies, oldVocabularies) => {
    const newCount = newVocabularies?.length || 0
    const oldCount = oldVocabularies?.length || 0
    
    console.log('Vocabulary watcher triggered:', {
      autoSaveEnabled: autoSaveEnabled.value,
      newCount,
      oldCount,
      countChanged: newCount !== oldCount
    })
    
    // Only trigger auto-save if:
    // 1. Auto-save is enabled
    // 2. There are vocabularies (not initial empty state)
    // 3. The count has actually changed (new addition or deletion)
    // 4. We have old data (not first initialization)
    if (autoSaveEnabled.value && 
        newCount > 0 && 
        oldCount !== undefined &&
        newCount !== oldCount) {
      console.log('Vocabulary count changed, performing INSTANT auto-save...', { oldCount, newCount })
      
      // Immediately show saving status and perform auto-save
      saveStatus.value = 'saving'
      
      // Call performAutoSave directly without any delay
      performAutoSave()
    }
  },
  { deep: true, immediate: false }
)

// Watch for changes to existing vocabularies (edits, favorite toggle)
watch(
  () => vocabularyStore.allVocabularies.value.map(v => ({ id: v.id, favorite: v.favorite, word: v.word, meaning: v.meaning })),
  (newData, oldData) => {
    // Only trigger if auto-save is enabled and we have data
    if (autoSaveEnabled.value && 
        newData.length > 0 && 
        oldData && 
        JSON.stringify(newData) !== JSON.stringify(oldData)) {
      console.log('Vocabulary content changed, triggering auto-save...')
      debounceAutoSave()
    }
  },
  { deep: true }
)

onMounted(() => {
  // Initialize vocabulary store
  vocabularyStore.initializeStore()
  
  // Reset dialog states on mount
  showFormDialog.value = false
  selectedVocabulary.value = null
  
  // Restore states from localStorage
  showFavoritesOnly.value = getStoredShowFavoritesOnly()
  useGrouping.value = getStoredUseGrouping()
  lastSaveTime.value = getStoredLastSaveTime()
  autoSaveEnabled.value = getStoredAutoSaveEnabled()
  hasAutoSaveFile.value = getStoredHasAutoSaveFile()
  searchQuery.value = getStoredSearchQuery()
  selectedCategory.value = getStoredSelectedCategory()
  selectedLevel.value = getStoredSelectedLevel()
  
  // Start auto-save scheduling if enabled
  if (autoSaveEnabled.value) {
    console.log('Auto-save is enabled, starting auto-save schedule...')
    scheduleAutoSave()
    
    // Note: Remove instant auto-save on mount to prevent dialog from showing
    // Auto-save will be triggered by data changes instead
  }
  
  console.log('Vocabulary list mounted, current vocabulary count:', vocabularyStore.allVocabularies.value.length)
  
  // Test watcher by logging vocabulary changes
  console.log('Setting up vocabulary change monitoring...')
  
  // Also watch the totalCount computed directly as backup
  watch(
    vocabularyStore.totalCount,
    (newTotal, oldTotal) => {
      console.log('Total count watcher triggered:', { newTotal, oldTotal, autoSaveEnabled: autoSaveEnabled.value })
      if (autoSaveEnabled.value && newTotal !== oldTotal && oldTotal !== undefined && newTotal > 0) {
        console.log('Total count changed via backup watcher, performing INSTANT auto-save...')
        
        // Immediately show saving status and perform auto-save
        saveStatus.value = 'saving'
        
        // Call performAutoSave directly without any delay
        performAutoSave()
      }
    }
  )
})

// Watch voice settings changes for debugging
watch(
  () => voiceStore.voiceSettings.value.voiceType,
  (newVoiceType, oldVoiceType) => {
    console.log('VocabularyListView: Voice type changed from', oldVoiceType, 'to', newVoiceType)
    console.log('Selected voice:', voiceStore.selectedVoice.value?.name)
  }
)

// Cleanup on unmount
onUnmounted(() => {
  // Reset dialog states
  showFormDialog.value = false
  selectedVocabulary.value = null
  
  // Clear timers
  if (autoSaveTimer) {
    clearTimeout(autoSaveTimer)
    autoSaveTimer = null
  }
  if (debounceTimer) {
    clearTimeout(debounceTimer)
    debounceTimer = null
  }
})
</script>
