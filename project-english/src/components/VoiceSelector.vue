<template>
  <div class="flex flex-col sm:flex-row sm:items-center space-y-2 sm:space-y-0 sm:space-x-3 md:space-x-4 lg:space-x-4">
    <span class="text-sm md:text-sm lg:text-base font-medium text-gray-700 dark:text-gray-300">
      {{ t('voice.selector.title', 'Voice') }}
    </span>
    
    <!-- Voice Type Dropdown -->
    <div class="relative w-full sm:w-auto" @click.stop ref="dropdownContainer">
      <button
        @click="showDropdown = !showDropdown"
        ref="dropdownButton"
        class="flex w-full min-w-[240px] sm:min-w-[260px] md:min-w-[280px] lg:min-w-[300px] items-center justify-between px-3 py-2 md:px-3 md:py-2 lg:px-4 lg:py-2.5 bg-white dark:bg-[#0f0f0f] border border-gray-300 dark:border-gray-700 rounded-lg text-sm md:text-sm lg:text-base font-medium text-gray-700 dark:text-gray-300 hover:bg-gray-50 dark:hover:bg-[#0a0a0a] transition-colors"
      >
        <div class="flex items-center space-x-2">
          <span class="text-sm md:text-base lg:text-lg">{{ currentVoiceOption?.icon }}</span>
          <span class="truncate">{{ currentVoiceOption?.label }}</span>
        </div>
        <svg class="w-4 h-4 md:w-4 md:h-4 lg:w-5 lg:h-5 flex-shrink-0" :class="{ 'rotate-180': showDropdown }" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 9l-7 7-7-7" />
        </svg>
      </button>
    </div>
    
    <!-- Dropdown Menu -->
    <Teleport to="body">
      <div 
        v-if="showDropdown"
        ref="dropdownMenu"
        :style="dropdownStyle"
        class="bg-white dark:bg-[#0f0f0f] border border-gray-300 dark:border-gray-700 rounded-lg shadow-lg max-h-60 overflow-hidden z-[9998] min-w-[240px] sm:min-w-[260px] md:min-w-[280px] lg:min-w-[300px]"
      >
        <div class="overflow-y-auto max-h-60">
        <div
          v-for="option in voiceOptions"
          :key="option.value"
          @click="selectVoiceOption(option)"
          :class="[
            'flex items-center justify-between gap-2 px-3 py-2 md:px-3 md:py-2 lg:px-4 lg:py-2.5 text-left text-sm md:text-sm lg:text-base transition-colors cursor-pointer',
            currentVoiceType === option.value
              ? 'bg-blue-50 dark:bg-[#2d3436] text-blue-600 dark:text-blue-400'
              : 'text-gray-700 dark:text-gray-300 hover:bg-gray-50 dark:hover:bg-gray-800'
          ]"
        >
          <div class="flex items-center space-x-2 min-w-0 flex-1">
          <span class="text-sm md:text-base lg:text-lg flex-shrink-0">{{ option.icon }}</span>
          <span class="truncate flex-1">{{ option.label }}</span>
          </div>
          <div class="flex items-center space-x-1 flex-shrink-0">
            <svg v-if="currentVoiceType === option.value" class="inline-block w-4 h-4 md:w-4 md:h-4 lg:w-5 lg:h-5 text-blue-600 dark:text-blue-400 flex-shrink-0" fill="currentColor" viewBox="0 0 20 20">
            <path fill-rule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clip-rule="evenodd" />
          </svg>
            <button @click.stop="openVoiceSettings(option)" class="inline-block p-1 md:p-1 lg:p-1.5 rounded-full hover:bg-gray-200 dark:hover:bg-gray-500 flex-shrink-0">
              <svg class="inline-block w-3 h-3 sm:w-4 sm:h-4 md:w-4 md:h-4 lg:w-4 lg:h-4 text-gray-500 dark:text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M10.325 4.317c.426-1.756 2.924-1.756 3.35 0a1.724 1.724 0 002.573 1.066c1.543-.94 3.31.826 2.37 2.37a1.724 1.724 0 001.065 2.572c1.756.426 1.756 2.924 0 3.35a1.724 1.724 0 00-1.066 2.573c.94 1.543-.826 3.31-2.37 2.37a1.724 1.724 0 00-2.572 1.065c-.426 1.756-2.924 1.756-3.35 0a1.724 1.724 0 00-2.573-1.066c-1.543.94-3.31-.826-2.37-2.37a1.724 1.724 0 00-1.065-2.572c-1.756-.426-1.756-2.924 0-3.35a1.724 1.724 0 001.066-2.573c-.94-1.543.826-3.31 2.37-2.37.996.608 2.296.07 2.572-1.065z"></path><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 12a3 3 0 11-6 0 3 3 0 016 0z"></path></svg>
        </button>
          </div>
        </div>
        </div>
      </div>
    </Teleport>
    
    <!-- Voice info tooltip -->
    <div 
      v-if="showVoiceInfo && currentVoiceInfo"
      class="relative"
      @mouseenter="showTooltip = true"
      @mouseleave="showTooltip = false"
    >
      <button
        class="p-2 text-gray-500 dark:text-gray-400 hover:text-gray-700 dark:hover:text-gray-200 transition-colors"
      >
        <svg class="w-4 h-4" fill="currentColor" viewBox="0 0 20 20">
          <path fill-rule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7-4a1 1 0 11-2 0 1 1 0 012 0zM9 9a1 1 0 000 2v3a1 1 0 001 1h1a1 1 0 100-2v-3a1 1 0 00-1-1H9z" clip-rule="evenodd"/>
        </svg>
      </button>
      
      <!-- Tooltip -->
      <div 
        v-if="showTooltip"
        class="absolute z-[9999] bottom-full left-1/2 transform -translate-x-1/2 mb-2 px-3 py-2 bg-gray-900 dark:bg-gray-700 text-white text-xs rounded-lg shadow-lg whitespace-nowrap"
      >
        <div>{{ t('voice.info.name') }}: {{ currentVoiceInfo.name }}</div>
        <div>{{ t('voice.info.language') }}: {{ currentVoiceInfo.lang }}</div>
        <div>{{ t('voice.info.gender') }}: {{ t(`voice.gender.${currentVoiceInfo.gender}`) }}</div>
        <!-- Arrow -->
        <div class="absolute top-full left-1/2 transform -translate-x-1/2 border-4 border-transparent border-t-gray-900 dark:border-t-gray-700"></div>
      </div>
    </div>
    
    <!-- Test voice button -->
    <button
      @click="testVoice"
      :disabled="isTesting"
      class="flex items-center space-x-1 px-3 py-2 md:px-3 md:py-2 lg:px-4 lg:py-2.5 text-sm md:text-sm lg:text-base bg-blue-500 hover:bg-blue-600 disabled:bg-gray-400 text-white rounded-lg transition-colors w-full sm:w-auto"
    >
      <svg 
        v-if="!isTesting"
        class="w-4 h-4 md:w-4 md:h-4 lg:w-5 lg:h-5" 
        fill="none" 
        stroke="currentColor" 
        viewBox="0 0 24 24"
      >
        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15.536 8.464a5 5 0 010 7.072m2.828-9.9a9 9 0 010 14.142M9 9a3 3 0 000 6v-6z" />
      </svg>
      <svg 
        v-else
        class="w-4 h-4 md:w-4 md:h-4 lg:w-5 lg:h-5 animate-spin" 
        fill="none" 
        viewBox="0 0 24 24"
      >
        <circle class="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" stroke-width="4"></circle>
        <path class="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
      </svg>
      <span>{{ isTesting ? t('voice.testing', 'Testing...') : t('voice.test', 'Test Voice') }}</span>
    </button>

    <!-- Voice Settings Modal -->
    <Teleport to="body">
      <VoiceSettingsModal
        v-if="showSettingsModal && selectedVoiceForSettings"
        :show="showSettingsModal"
        :voice-type="selectedVoiceForSettings.value"
        :voice-name="selectedVoiceForSettings.label"
        :initial-settings="voiceSettings[selectedVoiceForSettings.value]"
        @close="showSettingsModal = false"
        @save="handleSaveVoiceSettings"
        @reset="handleResetVoiceSettings"
      />
    </Teleport>
  </div>
</template>

<script setup lang="ts">
import { ref, computed, onMounted, onUnmounted, watch, defineAsyncComponent } from 'vue'
import { useI18n } from 'vue-i18n'
import { useVoiceStore } from '../stores/voiceStore'
import type { VoiceType, VoiceSettings } from '../stores/voiceStore'

const VoiceSettingsModal = defineAsyncComponent(() => import('./VoiceSettingsModal.vue'))

const { t } = useI18n()
const { 
  voiceSettings, 
  currentVoiceType,
  setVoiceType, 
  updateVoiceSettings,
  resetVoiceSettings,
  playAudio, 
  getVoiceTypeOptions, 
  getCurrentVoiceInfo,
  loadVoices
} = useVoiceStore()

// Props
interface Props {
  showVoiceInfo?: boolean
}

const props = withDefaults(defineProps<Props>(), {
  showVoiceInfo: true
})

// Local state
const isTesting = ref(false)
const showTooltip = ref(false)
const showDropdown = ref(false)
const dropdownButton = ref<HTMLElement | null>(null)
const dropdownMenu = ref<HTMLElement | null>(null)
const dropdownContainer = ref<HTMLElement | null>(null)
const showSettingsModal = ref(false)
const selectedVoiceForSettings = ref<{ value: VoiceType; label: string; icon: string } | null>(null)

// Computed
const voiceOptions = computed(() => getVoiceTypeOptions())
const currentVoiceInfo = computed(() => getCurrentVoiceInfo())
const currentVoiceOption = computed(() => {
  return voiceOptions.value.find(option => option.value === currentVoiceType.value)
})

// Dropdown positioning - calculated once when dropdown opens
const dropdownStyle = computed((): Record<string, string> => {
  if (!showDropdown.value || !dropdownButton.value) {
    return { display: 'none' }
  }
  
  const buttonRect = dropdownButton.value.getBoundingClientRect()
  const viewportWidth = window.innerWidth
  const dropdownWidth = buttonRect.width
  
  // Calculate left position, ensuring dropdown doesn't overflow viewport
  let leftPosition = buttonRect.left
  if (leftPosition + dropdownWidth > viewportWidth) {
    leftPosition = viewportWidth - dropdownWidth - 8 // 8px margin from edge
  }
  if (leftPosition < 8) {
    leftPosition = 8 // 8px margin from left edge
  }
  
  return {
    position: 'fixed',
    top: `${buttonRect.bottom + 4}px`,
    left: `${leftPosition}px`,
    width: `${buttonRect.width}px`,
    maxWidth: `${viewportWidth - 16}px`, // Ensure it never exceeds viewport width
    zIndex: '9999'
  }
})

// Methods
const handleVoiceChange = (voiceType: VoiceType) => {
  setVoiceType(voiceType)
}

const selectVoiceOption = (option: any) => {
  handleVoiceChange(option.value)
  showDropdown.value = false
}

const testVoice = async () => {
  if (isTesting.value) return
  
  isTesting.value = true
  try {
    const testText = t('voice.testText', 'Hello, this is a test of the selected voice.')
    await playAudio(testText)
  } catch (error) {
    console.error('Error testing voice:', error)
  } finally {
    isTesting.value = false
  }
}



// Settings Modal Methods
const openVoiceSettings = (option: { value: VoiceType; label: string; icon: string }) => {
  selectedVoiceForSettings.value = option
  showSettingsModal.value = true
  showDropdown.value = false // Close dropdown when opening settings
}

const handleSaveVoiceSettings = (payload: { voiceType: VoiceType; settings: VoiceSettings }) => {
  updateVoiceSettings(payload.voiceType, payload.settings)
  showSettingsModal.value = false
}

const handleResetVoiceSettings = (voiceType: VoiceType) => {
  resetVoiceSettings(voiceType)
  // Re-open modal to show updated default values
  const option = voiceOptions.value.find(o => o.value === voiceType)
  if(option) {
    selectedVoiceForSettings.value = option
  }
}

// Close dropdown when clicking outside
const handleClickOutside = (event: Event) => {
  if (showDropdown.value) {
    const target = event.target as HTMLElement
    
    // Check if click is outside both dropdown button and dropdown menu
    if (dropdownButton.value && !dropdownButton.value.contains(target) &&
        dropdownMenu.value && !dropdownMenu.value.contains(target)) {
      showDropdown.value = false
    }
  }
}

// Update dropdown position smoothly when scrolling
const updateDropdownPosition = () => {
  if (showDropdown.value && dropdownButton.value) {
    const buttonRect = dropdownButton.value.getBoundingClientRect()
    const dropdown = dropdownMenu.value
    
    if (dropdown) {
      dropdown.style.top = `${buttonRect.bottom + 4}px`
      dropdown.style.left = `${buttonRect.left}px`
      dropdown.style.minWidth = `${buttonRect.width}px`
    }
  }
}

// Throttled scroll handler to prevent excessive updates
let scrollTimeout: number | null = null
const handleScroll = () => {
  if (showDropdown.value) {
    // Use requestAnimationFrame for smooth updates
    if (scrollTimeout) {
      cancelAnimationFrame(scrollTimeout)
    }
    scrollTimeout = requestAnimationFrame(updateDropdownPosition)
  }
}

// Close dropdown when resizing window (different behavior for resize)
const handleResize = () => {
  if (showDropdown.value) {
    showDropdown.value = false
  }
}

// Initialize voices on mount
onMounted(() => {
  loadVoices()
  document.addEventListener('click', handleClickOutside)
  window.addEventListener('scroll', handleScroll, true)
  window.addEventListener('resize', handleResize)
})

onUnmounted(() => {
  document.removeEventListener('click', handleClickOutside)
  window.removeEventListener('scroll', handleScroll, true)
  window.removeEventListener('resize', handleResize)
  
  // Cleanup scroll timeout
  if (scrollTimeout) {
    cancelAnimationFrame(scrollTimeout)
  }
})

// Watch for voice settings changes to ensure reactivity
watch(currentVoiceType, (newType) => {
  console.log('VoiceSelector: Voice type changed to:', newType)
}, { immediate: true })
</script>
