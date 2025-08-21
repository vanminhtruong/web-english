<template>
  <div class="bg-white/60 dark:bg-[#0a0a0a]/60 backdrop-blur-sm rounded-xl border border-white/20 dark:border-white/10 p-3 sm:p-4 md:p-5">
    <div class="flex items-center mb-3 sm:mb-4">
      <div class="animate-pulse-slow">
        <div class="w-2.5 h-2.5 bg-gradient-to-r from-red-400 to-red-500 rounded-full mr-2.5"></div>
      </div>
      <h3 class="text-sm sm:text-base font-semibold bg-gradient-to-r from-red-600 to-red-600 dark:from-red-400 dark:to-red-400 bg-clip-text text-transparent">
        {{ t('vocabulary.deleteAll.title', 'Delete All Vocabularies') }}
      </h3>
    </div>
    <div class="flex flex-col space-y-3">
      <p class="text-xs sm:text-sm text-gray-600 dark:text-gray-300">
        {{ t('vocabulary.deleteAll.description', 'This will permanently delete all vocabulary words from your collection. This action cannot be undone.') }}
      </p>
      <div class="flex flex-col sm:flex-row gap-2">
        <button
          @click="showDeleteAllModal = true"
          class="inline-flex items-center justify-center px-2 py-1.5 sm:px-3 sm:py-2 text-xs font-medium text-white bg-red-600 hover:bg-red-700 dark:bg-red-500 dark:hover:bg-red-600 rounded-md transition-colors duration-200 focus:outline-none focus:ring-2 focus:ring-red-500 focus:ring-offset-2 dark:focus:ring-offset-[#0a0a0a] w-fit"
        >
          <svg class="w-3 h-3 mr-1.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16"></path>
          </svg>
          {{ t('vocabulary.deleteAll.button', 'Delete All Vocabularies') }}
        </button>
        <button
          @click="showClearLocalStoreModal = true"
          class="inline-flex items-center justify-center px-2 py-1.5 sm:px-3 sm:py-2 text-xs font-medium text-white bg-orange-600 hover:bg-orange-700 dark:bg-orange-500 dark:hover:bg-orange-600 rounded-md transition-colors duration-200 focus:outline-none focus:ring-2 focus:ring-orange-500 focus:ring-offset-2 dark:focus:ring-offset-[#0a0a0a] w-fit"
        >
          <svg class="w-3 h-3 mr-1.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16"></path>
          </svg>
          {{ t('vocabulary.deleteAll.clearLocalStore', 'Clear Local Store') }}
        </button>
      </div>
    </div>

    <!-- Delete All Vocabularies Confirmation Modal -->
    <Teleport to="body">
      <div 
        v-if="showDeleteAllModal" 
        class="fixed inset-0 z-[9999] flex items-center justify-center p-4" 
        aria-labelledby="modal-title" 
        role="dialog" 
        aria-modal="true"
      >
        <div class="fixed inset-0 bg-black bg-opacity-50 backdrop-blur-sm transition-opacity" aria-hidden="true"></div>

        <div class="relative bg-white dark:bg-[#0a0a0a] rounded-lg shadow-xl w-full max-w-lg mx-auto border border-gray-200 dark:border-dark-bg-mute overflow-hidden p-6">
          <div class="sm:flex sm:items-start">
            <div class="mx-auto flex-shrink-0 flex items-center justify-center h-12 w-12 rounded-full bg-red-100 dark:bg-red-900/30 sm:mx-0 sm:h-10 sm:w-10">
              <svg class="h-6 w-6 text-red-600 dark:text-red-400" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor">
                <path stroke-linecap="round" stroke-linejoin="round" d="M12 9v3.75m-9.303 3.376c-.866 1.5.217 3.374 1.948 3.374h14.71c1.73 0 2.813-1.874 1.948-3.374L13.949 3.378c-.866-1.5-3.032-1.5-3.898 0L2.697 16.126zM12 15.75h.007v.008H12v-.008z" />
              </svg>
            </div>
            <div class="mt-3 text-center sm:mt-0 sm:ml-4 sm:text-left">
              <h3 class="text-lg leading-6 font-medium text-gray-900 dark:text-white" id="modal-title">
                {{ t('vocabulary.deleteAll.confirmTitle', 'Delete All Vocabularies') }}
              </h3>
              <div class="mt-2">
                <p class="text-sm text-gray-500 dark:text-gray-300">
                  {{ t('vocabulary.deleteAll.confirmMessage', 'Are you sure you want to delete all vocabulary words? This action cannot be undone and will permanently remove all your saved words.') }}
                </p>
                <div class="mt-3 p-3 bg-red-50 dark:bg-red-900/20 rounded-md border border-red-200 dark:border-red-800">
                  <p class="text-sm text-red-800 dark:text-red-300 font-medium">
                    {{ t('vocabulary.deleteAll.warningCount', { count: totalCount }, `You are about to delete ${totalCount} vocabulary words.`) }}
                  </p>
                </div>
              </div>
            </div>
          </div>
          <div class="mt-5 sm:mt-4 sm:flex sm:flex-row-reverse">
            <button
              @click="confirmDeleteAll"
              type="button"
              class="w-full inline-flex justify-center rounded-md border border-transparent shadow-sm px-4 py-2 bg-red-600 text-base font-medium text-white hover:bg-red-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-red-500 dark:focus:ring-offset-[#0a0a0a] sm:ml-3 sm:w-auto sm:text-sm transition-colors duration-200"
            >
              {{ t('vocabulary.deleteAll.confirm', 'Delete All') }}
            </button>
            <button
              @click="showDeleteAllModal = false"
              type="button"
              class="mt-3 w-full inline-flex justify-center rounded-md border border-gray-300 dark:border-dark-bg-mute shadow-sm px-4 py-2 bg-white dark:bg-dark-bg-soft text-base font-medium text-gray-700 dark:text-gray-300 hover:bg-gray-50 dark:hover:bg-dark-bg-mute focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 dark:focus:ring-offset-[#0a0a0a] sm:mt-0 sm:w-auto sm:text-sm transition-colors duration-200"
            >
              {{ t('common.cancel', 'Cancel') }}
            </button>
          </div>
        </div>
      </div>
    </Teleport>

    <!-- Clear Local Store Confirmation Modal -->
    <Teleport to="body">
      <div 
        v-if="showClearLocalStoreModal" 
        class="fixed inset-0 z-[9999] flex items-center justify-center p-4" 
        aria-labelledby="clear-local-store-modal-title" 
        role="dialog" 
        aria-modal="true"
      >
        <div class="fixed inset-0 bg-black bg-opacity-50 backdrop-blur-sm transition-opacity" aria-hidden="true"></div>

        <div class="relative bg-white dark:bg-[#0a0a0a] rounded-lg shadow-xl w-full max-w-lg mx-auto border border-gray-200 dark:border-dark-bg-mute overflow-hidden p-6">
          <div class="sm:flex sm:items-start">
            <div class="mx-auto flex-shrink-0 flex items-center justify-center h-12 w-12 rounded-full bg-orange-100 dark:bg-orange-900/30 sm:mx-0 sm:h-10 sm:w-10">
              <svg class="h-6 w-6 text-orange-600 dark:text-orange-400" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor">
                <path stroke-linecap="round" stroke-linejoin="round" d="M12 9v3.75m-9.303 3.376c-.866 1.5.217 3.374 1.948 3.374h14.71c1.73 0 2.813-1.874 1.948-3.374L13.949 3.378c-.866-1.5-3.032-1.5-3.898 0L2.697 16.126zM12 15.75h.007v.008H12v-.008z" />
              </svg>
            </div>
            <div class="mt-3 text-center sm:mt-0 sm:ml-4 sm:text-left">
              <h3 class="text-lg leading-6 font-medium text-gray-900 dark:text-white" id="clear-local-store-modal-title">
                {{ t('vocabulary.deleteAll.clearLocalStoreTitle', 'Clear Local Store Data') }}
              </h3>
              <div class="mt-2">
                <p class="text-sm text-gray-500 dark:text-gray-300">
                  {{ t('vocabulary.deleteAll.clearLocalStoreMessage', 'This will clear all data stored in your browser\'s local storage, including vocabulary words, practice sessions, and user preferences. This action cannot be undone.') }}
                </p>
                <p class="text-sm text-orange-600 dark:text-orange-400 mt-2 font-medium">
                  {{ t('vocabulary.deleteAll.pageReloadNotice', 'Note: Page will automatically reload after clearing to ensure complete reset.') }}
                </p>
                <div class="mt-3 p-3 bg-orange-50 dark:bg-orange-900/20 rounded-md border border-orange-200 dark:border-orange-800">
                  <p class="text-sm text-orange-800 dark:text-orange-300 font-medium">
                    {{ t('vocabulary.deleteAll.clearLocalStoreWarning', 'Warning: This will remove all locally stored data and reset the application to its initial state.') }}
                  </p>
                </div>
              </div>
            </div>
          </div>
          <div class="mt-5 sm:mt-4 sm:flex sm:flex-row-reverse">
            <button
              @click="confirmClearLocalStore"
              type="button"
              class="w-full inline-flex justify-center rounded-md border border-transparent shadow-sm px-4 py-2 bg-orange-600 text-base font-medium text-white hover:bg-orange-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-orange-500 dark:focus:ring-offset-[#0a0a0a] sm:ml-3 sm:w-auto sm:text-sm transition-colors duration-200"
            >
              {{ t('vocabulary.deleteAll.clearLocalStoreConfirm', 'Clear All Data') }}
            </button>
            <button
              @click="showClearLocalStoreModal = false"
              type="button"
              class="mt-3 w-full inline-flex justify-center rounded-md border border-gray-300 dark:border-dark-bg-mute shadow-sm px-4 py-2 bg-white dark:bg-dark-bg-soft text-base font-medium text-gray-700 dark:text-gray-300 hover:bg-gray-50 dark:hover:bg-dark-bg-mute focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 dark:focus:ring-offset-[#0a0a0a] sm:mt-0 sm:w-auto sm:text-sm transition-colors duration-200"
            >
              {{ t('common.cancel', 'Cancel') }}
            </button>
          </div>
        </div>
      </div>
    </Teleport>
  </div>
</template>

<script setup lang="ts">
import { ref, watch, nextTick } from 'vue'
import { useI18n } from 'vue-i18n'
import { useToast } from 'vue-toastification'
import { useVocabularyStore } from '../../../composables/useVocabularyStore'
import { useThemeStore } from '../../../stores/theme'
import { useVoiceStore } from '../../../stores/voiceStore'

interface Props {
  totalCount: number
  autoSaveEnabled: boolean
  useGrouping: boolean
}

interface Emits {
  (e: 'vocabularies-deleted'): void
  (e: 'local-store-cleared'): void
}

const props = defineProps<Props>()
const emit = defineEmits<Emits>()

const { t } = useI18n()
const toast = useToast()
const vocabularyStore = useVocabularyStore()
const themeStore = useThemeStore()
const voiceStore = useVoiceStore()

// Modal states
const showDeleteAllModal = ref(false)
const showClearLocalStoreModal = ref(false)

// Prevent body scroll when modal is open
watch(showDeleteAllModal, (newValue) => {
  if (newValue) {
    document.body.classList.add('modal-open')
  } else {
    document.body.classList.remove('modal-open')
  }
})

watch(showClearLocalStoreModal, (newValue) => {
  if (newValue) {
    document.body.classList.add('modal-open')
  } else {
    document.body.classList.remove('modal-open')
  }
})

// Confirm delete all vocabularies
const confirmDeleteAll = () => {
  try {
    // Clear all vocabularies from store
    vocabularyStore.clearAllVocabularies()
    
    // Close modal
    showDeleteAllModal.value = false
    
    // Show success message
    toast.success(
      t('vocabulary.deleteAll.success', 'All vocabulary words have been deleted successfully'),
      { timeout: 3000 }
    )
    
    // Emit event to parent to handle additional cleanup
    emit('vocabularies-deleted')
    
    console.log('All vocabularies deleted successfully')
  } catch (error) {
    console.error('Error deleting all vocabularies:', error)
    toast.error(
      t('vocabulary.deleteAll.error', 'Failed to delete all vocabularies. Please try again.'),
      { timeout: 5000 }
    )
  }
}

// Confirm clear local store
const confirmClearLocalStore = () => {
  try {
    // Clear all vocabularies from store
    vocabularyStore.clearAllVocabularies()
    
    // Force clear all possible storage mechanisms
    // 1. Clear localStorage completely
    localStorage.clear()
    
    // 2. Clear sessionStorage completely
    sessionStorage.clear()
    
    // 3. Clear IndexedDB if available
    if ('indexedDB' in window) {
      try {
        indexedDB.deleteDatabase('vocabulary-db')
        indexedDB.deleteDatabase('practice-sessions-db')
        indexedDB.deleteDatabase('user-settings-db')
        console.log('IndexedDB databases deleted')
      } catch (dbError) {
        console.log('IndexedDB not available or error deleting:', dbError)
      }
    }
    
    // 4. Clear all cookies for this domain
    document.cookie.split(";").forEach(function(c) { 
      document.cookie = c.replace(/^ +/, "").replace(/=.*/, "=;expires=" + new Date().toUTCString() + ";path=/"); 
    })
    
    // 5. Clear any cached data in memory
    if ('caches' in window) {
      caches.keys().then(function(names) {
        for (let name of names) {
          caches.delete(name)
        }
      })
    }
    
    // 5.1. Clear any remaining cache storage
    if ('cacheStorage' in window) {
      caches.keys().then(function(names) {
        for (let name of names) {
          caches.delete(name)
        }
      })
    }
    
    // 5.2. Clear any service worker registrations
    if ('serviceWorker' in navigator) {
      navigator.serviceWorker.getRegistrations().then(function(registrations) {
        for (let registration of registrations) {
          registration.unregister()
        }
      })
    }
    
    // 6. Reset theme to system default
    themeStore.setTheme(false)
    
    // 7. Reset voice settings to default for all voice types
    const voiceTypes = ['female-sweet', 'female-clear', 'female-professional', 'male-strong', 'male-gentle', 'male-deep', 'korean-female', 'korean-male'] as const
    voiceTypes.forEach(type => voiceStore.resetVoiceSettings(type))
    
    // 8. Force clear any remaining localStorage items by specific keys
    const commonKeys = [
      'vocabulary-data',
      'practice-sessions',
      'user-settings',
      'theme',
      'voice-settings',
      'accordion-state',
      'hover-expand-enabled',
      'auto-save-enabled',
      'move-mode-enabled',
      'grouping-enabled',
      'last-save-time',
      'save-status',
      'google-drive-token',
      'google-drive-refresh-token',
      'google-drive-file-id',
      'auto-save-file-path',
      'vocabulary-notes',
      'grammar-rules',
      'user-preferences',
      'app-settings',
      'vocabulary-filters',
      'search-history',
      'recent-searches',
      'favorite-words',
      'learning-progress',
      'daily-targets',
      'study-sessions',
      'vocabulary-categories',
      'topic-groups',
      'date-grouping',
      'pagination-settings',
      'sort-preferences',
      'display-options',
      'accessibility-settings',
      'performance-settings',
      'debug-settings',
      'error-logs',
      'analytics-data',
      'user-activity',
      'session-data',
      'cache-data',
      'temp-data',
      'backup-data',
      'sync-data',
      'offline-data',
      'pending-changes',
      'auto-save-queue',
      'undo-redo-stack',
      'clipboard-data',
      'drag-drop-state',
      'modal-state',
      'tooltip-state',
      'notification-state',
      'loading-state',
      'error-state',
      'success-state',
      'warning-state',
      'info-state'
    ]
    
    commonKeys.forEach(key => {
      try {
        localStorage.removeItem(key)
        sessionStorage.removeItem(key)
      } catch (e) {
        console.log(`Error removing key ${key}:`, e)
      }
    })
    
    // 9. Clear any dynamic keys that might exist
    // Clear localStorage completely with loop
    let localStorageLength = localStorage.length
    while (localStorageLength > 0) {
      try {
        const key = localStorage.key(0)
        if (key) {
          localStorage.removeItem(key)
        }
        localStorageLength = localStorage.length
      } catch (e) {
        console.log('Error removing dynamic localStorage key:', e)
        break
      }
    }
    
    // Clear sessionStorage completely with loop
    let sessionStorageLength = sessionStorage.length
    while (sessionStorageLength > 0) {
      try {
        const key = sessionStorage.key(0)
        if (key) {
          sessionStorage.removeItem(key)
        }
        sessionStorageLength = sessionStorage.length
      } catch (e) {
        console.log('Error removing dynamic sessionStorage key:', e)
        break
      }
    }
    
    // Double-check and force clear again
    try {
      localStorage.clear()
      sessionStorage.clear()
    } catch (e) {
      console.log('Error in final clear:', e)
    }
    
    // 10. Force garbage collection if available
    if ('gc' in window) {
      try {
        (window as any).gc()
      } catch (e) {
        console.log('Garbage collection not available')
      }
    }
    
    // Close modal
    showClearLocalStoreModal.value = false
    
    // Show success message
    toast.success(
      t('vocabulary.deleteAll.clearLocalStoreSuccess', 'All local store data has been cleared successfully'),
      { timeout: 3000 }
    )
    
    // Emit event to parent to handle additional cleanup
    emit('local-store-cleared')
    
    console.log('Local store data cleared successfully - 100% complete')
    
    // 11. Force page reload after a short delay to ensure complete reset
    setTimeout(() => {
      // Final verification - check if any data remains
      const remainingLocalStorage = localStorage.length
      const remainingSessionStorage = sessionStorage.length
      
      if (remainingLocalStorage > 0 || remainingSessionStorage > 0) {
        console.log(`Warning: ${remainingLocalStorage} localStorage items and ${remainingSessionStorage} sessionStorage items remain`)
        // Force clear one more time
        try {
          localStorage.clear()
          sessionStorage.clear()
        } catch (e) {
          console.log('Final clear attempt failed:', e)
        }
      }
      
      console.log('Reloading page to ensure complete reset...')
      window.location.reload()
    }, 1500)
    
  } catch (error) {
    console.error('Error clearing local store data:', error)
    toast.error(
      t('vocabulary.deleteAll.clearLocalStoreError', 'Failed to clear local store data. Please try again.'),
      { timeout: 5000 }
    )
  }
}
</script>
