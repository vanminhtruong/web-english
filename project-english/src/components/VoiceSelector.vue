<template>
  <div class="flex items-center space-x-3">
    <span class="text-sm font-medium text-gray-700 dark:text-gray-300">
      {{ t('voice.selector.title') }}
    </span>
    
    <!-- Voice Type Dropdown -->
    <div class="relative" @click.stop ref="dropdownContainer">
      <button
        @click="showDropdown = !showDropdown"
        ref="dropdownButton"
        class="flex w-[230px] items-center space-x-2 px-3 py-2 bg-white dark:bg-[#0f0f0f] border border-gray-300 dark:border-gray-700 rounded-lg text-sm font-medium text-gray-700 dark:text-gray-300 hover:bg-gray-50 dark:hover:bg-[#0a0a0a] transition-colors"
      >
        <span>{{ currentVoiceOption?.icon }}</span>
        <span>{{ currentVoiceOption?.label }}</span>
        <svg class="w-4 h-4 ml-1 translate-x-[9px]" :class="{ 'rotate-180': showDropdown }" fill="none" stroke="currentColor" viewBox="0 0 24 24">
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
        class="w-[230px]  bg-white dark:bg-[#0f0f0f] border border-gray-300 dark:border-gray-700 rounded-lg shadow-lg max-h-60 overflow-hidden z-[9998]"
      >
        <div class="overflow-y-auto max-h-60">
        <div
          v-for="option in voiceOptions"
          :key="option.value"
          @click="selectVoiceOption(option)"
          :class="[
            'flex items-center justify-between space-x-2 px-3 py-2 text-left text-sm transition-colors cursor-pointer',
            currentVoiceType === option.value
              ? 'bg-blue-50 dark:bg-[#2d3436] text-blue-600 dark:text-blue-400'
              : 'text-gray-700 dark:text-gray-300 hover:bg-gray-50 dark:hover:bg-gray-800'
          ]"
        >
          <div class="flex items-center space-x-2">
          <span>{{ option.icon }}</span>
          <span>{{ option.label }}</span>
          </div>
          <div class="flex items-center">
            <svg v-if="currentVoiceType === option.value" class="w-4 h-4 text-blue-600 dark:text-blue-400" fill="currentColor" viewBox="0 0 20 20">
            <path fill-rule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clip-rule="evenodd" />
          </svg>
            <button @click.stop="openVoiceSettings(option)" class="ml-2 p-1 rounded-full hover:bg-gray-200 dark:hover:bg-gray-500">
              <svg class="w-4 h-4 text-gray-500 dark:text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M10.325 4.317c.426-1.756 2.924-1.756 3.35 0a1.724 1.724 0 002.573 1.066c1.543-.94 3.31.826 2.37 2.37a1.724 1.724 0 001.065 2.572c1.756.426 1.756 2.924 0 3.35a1.724 1.724 0 00-1.066 2.573c.94 1.543-.826 3.31-2.37 2.37a1.724 1.724 0 00-2.572 1.065c-.426 1.756-2.924 1.756-3.35 0a1.724 1.724 0 00-2.573-1.066c-1.543.94-3.31-.826-2.37-2.37a1.724 1.724 0 00-1.065-2.572c-1.756-.426-1.756-2.924 0-3.35a1.724 1.724 0 001.066-2.573c-.94-1.543.826-3.31 2.37-2.37.996.608 2.296.07 2.572-1.065z"></path><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 12a3 3 0 11-6 0 3 3 0 016 0z"></path></svg>
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
      class="flex items-center space-x-1 px-3 py-2 text-sm bg-blue-500 hover:bg-blue-600 disabled:bg-gray-400 text-white rounded-lg transition-colors"
    >
      <svg 
        v-if="isTesting" 
        class="animate-spin w-4 h-4" 
        fill="none" 
        viewBox="0 0 24 24"
      >
        <circle class="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" stroke-width="4"></circle>
        <path class="opacity-75" fill="currentColor" d="m4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
      </svg>
      <svg 
        v-else
        class="w-4 h-4" 
        fill="currentColor" 
        viewBox="0 0 20 20"
      >
        <path fill-rule="evenodd" d="M9.383 3.076A1 1 0 0110 4v12a1 1 0 01-1.617.817L4.5 13.5H2a1 1 0 01-1-1v-5a1 1 0 011-1h2.5l3.883-3.317zm5.94 2.045a1 1 0 011.32.663A6.977 6.977 0 0118 10c0 1.688-.57 3.24-1.357 4.216a1 1 0 11-1.644-1.132A4.987 4.987 0 0016 10c0-1.092-.36-2.099-.923-2.907a1 1 0 01.246-1.372z" clip-rule="evenodd"/>
      </svg>
      <span>{{ isTesting ? t('voice.testing') : t('voice.test') }}</span>
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
const dropdownStyle = computed(() => {
  if (!showDropdown.value || !dropdownButton.value) {
    return { display: 'none' }
  }
  
  const buttonRect = dropdownButton.value.getBoundingClientRect()
  
  return {
    position: 'fixed',
    top: `${buttonRect.bottom + 4}px`,
    left: `${buttonRect.left}px`,
    minWidth: `${buttonRect.width}px`,
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
    const testText = t('voice.testText')
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
