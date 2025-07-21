import { ref, watch, onMounted } from 'vue'
import { useI18n } from 'vue-i18n'

// Debug function to log available voices
const debugAvailableVoices = () => {
  if ('speechSynthesis' in window) {
    const voices = speechSynthesis.getVoices()
    console.log('=== AVAILABLE VOICES DEBUG ====')
    console.log(`Total voices found: ${voices.length}`)
    voices.forEach((voice, index) => {
      console.log(`${index + 1}. Name: "${voice.name}" | Lang: ${voice.lang} | Local: ${voice.localService} | Default: ${voice.default}`)
    })
    console.log('=================================')
    return voices
  }
  return []
}

export type VoiceType = 'female-sweet' | 'female-clear' | 'male-strong' | 'male-gentle' | 'female-professional' | 'male-deep'

export interface VoiceSettings {
  voiceType: VoiceType
  rate: number
  pitch: number
  volume: number
}

// Global reactive state - Optimized for natural human-like speech
const defaultSettings: VoiceSettings = {
  voiceType: 'female-sweet',
  rate: 0.9,  // Slightly faster for more natural flow
  pitch: 0.95, // Slightly lower pitch for more human-like sound
  volume: 1.0
}

const voiceSettings = ref<VoiceSettings>({ ...defaultSettings })
const availableVoices = ref<SpeechSynthesisVoice[]>([])
const selectedVoice = ref<SpeechSynthesisVoice | null>(null)

// Load available voices
const loadVoices = () => {
  if ('speechSynthesis' in window) {
    const voices = speechSynthesis.getVoices()
    console.log('Loading voices, total found:', voices.length)
    
    // Debug: Show all available voices
    debugAvailableVoices()
    
    const englishVoices = voices.filter(voice => voice.lang.startsWith('en'))
    console.log('English voices found:', englishVoices.length)
    
    availableVoices.value = englishVoices
    
    // Only update selected voice if we have voices
    if (englishVoices.length > 0) {
      updateSelectedVoice()
    }
  }
}

// Update selected voice based on settings
const updateSelectedVoice = () => {
  const voices = availableVoices.value
  console.log('Updating voice selection, available voices:', voices.length)
  console.log('Current voice type:', voiceSettings.value.voiceType)
  
  if (voices.length === 0) {
    console.log('No voices available, loading voices...')
    loadVoices()
    return
  }

  // Try to find voice based on specific voice type preference
  let targetVoice: SpeechSynthesisVoice | null = null

  // Separate female and male voices
  const femaleVoices = voices.filter(voice => {
    const name = voice.name.toLowerCase()
    return name.includes('female') || name.includes('woman') || name.includes('zira') || 
           name.includes('hazel') || name.includes('cortana') || name.includes('helena') ||
           name.includes('susan') || name.includes('samantha') || name.includes('karen')
  })
  
  const maleVoices = voices.filter(voice => {
    const name = voice.name.toLowerCase()
    return name.includes('male') || name.includes('man') || name.includes('david') || 
           name.includes('mark') || name.includes('daniel') || name.includes('richard') ||
           name.includes('alex') || name.includes('tom') || name.includes('aaron')
  })
  
  console.log(`Female voices found: ${femaleVoices.length}`, femaleVoices.map(v => v.name))
  console.log(`Male voices found: ${maleVoices.length}`, maleVoices.map(v => v.name))
  
  // If no gender-specific voices found, split all voices by index
  if (femaleVoices.length === 0 && maleVoices.length === 0) {
    const halfPoint = Math.floor(voices.length / 2)
    femaleVoices.push(...voices.slice(0, halfPoint))
    maleVoices.push(...voices.slice(halfPoint))
    console.log('No gender-specific voices found, splitting by index')
  }
  
  switch (voiceSettings.value.voiceType) {
    case 'female-sweet':
      // Use first female voice or first available
      targetVoice = femaleVoices[0] || voices[0]
      console.log('Selected female-sweet:', targetVoice?.name)
      break
      
    case 'female-clear':
      // Use second female voice or second available
      targetVoice = femaleVoices[1] || femaleVoices[0] || voices[1] || voices[0]
      console.log('Selected female-clear:', targetVoice?.name)
      break
      
    case 'female-professional':
      // Use third female voice or cycle back
      targetVoice = femaleVoices[2] || femaleVoices[0] || voices[2] || voices[0]
      console.log('Selected female-professional:', targetVoice?.name)
      break
      
    case 'male-strong':
      // Use first male voice
      targetVoice = maleVoices[0] || voices[Math.floor(voices.length / 2)] || voices[0]
      console.log('Selected male-strong:', targetVoice?.name)
      break
      
    case 'male-gentle':
      // Use second male voice
      targetVoice = maleVoices[1] || maleVoices[0] || voices[Math.floor(voices.length / 2) + 1] || voices[0]
      console.log('Selected male-gentle:', targetVoice?.name)
      break
      
    case 'male-deep':
      // Use third male voice or cycle back
      targetVoice = maleVoices[2] || maleVoices[0] || voices[Math.floor(voices.length / 2) + 2] || voices[0]
      console.log('Selected male-deep:', targetVoice?.name)
      break
  }

  console.log(`Looking for ${voiceSettings.value.voiceType} voice, found:`, targetVoice?.name)

  // Fallback: use first available voice or default system voice
  const previousVoice = selectedVoice.value?.name
  selectedVoice.value = targetVoice || voices[0] || null
  
  console.log('Voice changed from', previousVoice, 'to', selectedVoice.value?.name)
}

// Load settings from localStorage
const loadSettings = () => {
  const saved = localStorage.getItem('voice-settings')
  if (saved) {
    try {
      const parsedSettings = JSON.parse(saved)
      voiceSettings.value = { ...defaultSettings, ...parsedSettings }
    } catch (error) {
      console.error('Error loading voice settings:', error)
      voiceSettings.value = { ...defaultSettings }
    }
  }
}

// Save settings to localStorage
const saveSettings = () => {
  localStorage.setItem('voice-settings', JSON.stringify(voiceSettings.value))
}

// Create and configure speech utterance with voice-specific settings
const createUtterance = (text: string): SpeechSynthesisUtterance => {
  // Force update selected voice to ensure we have the latest
  updateSelectedVoice()
  
  const utterance = new SpeechSynthesisUtterance(text)
  utterance.lang = 'en-US'
  
  // Voice-specific settings for distinct characteristics
  let rate = voiceSettings.value.rate
  let pitch = voiceSettings.value.pitch
  
  switch (voiceSettings.value.voiceType) {
    case 'female-sweet':
      rate = 0.85 // Slower, sweeter
      pitch = 1.1  // Higher, more gentle
      break
    case 'female-clear':
      rate = 1.0   // Normal speed
      pitch = 0.95 // Slightly lower, professional
      break
    case 'female-professional':
      rate = 0.9   // Slightly slower, authoritative
      pitch = 0.85 // Lower, more confident
      break
    case 'male-strong':
      rate = 0.8   // Slower, more powerful
      pitch = 0.7  // Much lower, strong
      break
    case 'male-gentle':
      rate = 0.9   // Gentle pace
      pitch = 0.9  // Warm, friendly
      break
    case 'male-deep':
      rate = 0.75  // Very slow, deep
      pitch = 0.6  // Very low, resonant
      break
  }
  
  utterance.rate = Math.max(0.6, Math.min(1.2, rate))
  utterance.pitch = Math.max(0.5, Math.min(1.3, pitch))
  utterance.volume = voiceSettings.value.volume
  
  console.log('Creating utterance with voice type:', voiceSettings.value.voiceType)
  console.log('Selected voice for utterance:', selectedVoice.value?.name)
  
  if (selectedVoice.value) {
    utterance.voice = selectedVoice.value
  }
  
  return utterance
}

// Play audio with current voice settings
const playAudio = (text: string): Promise<void> => {
  return new Promise((resolve, reject) => {
    if (!('speechSynthesis' in window)) {
      console.warn('Speech synthesis not supported')
      reject(new Error('Speech synthesis not supported'))
      return
    }

    const utterance = createUtterance(text)
    
    utterance.onend = () => resolve()
    utterance.onerror = (event) => reject(event.error)
    
    speechSynthesis.speak(utterance)
  })
}

// Update voice type
const setVoiceType = (type: VoiceType) => {
  console.log('Setting voice type to:', type)
  voiceSettings.value.voiceType = type
  
  // Force reload voices if not available
  if (availableVoices.value.length === 0) {
    loadVoices()
  }
  
  // Update selected voice immediately
  updateSelectedVoice()
  
  // Save settings
  saveSettings()
  
  console.log('Voice updated to:', selectedVoice.value?.name)
}

// Get voice type options for UI
const getVoiceTypeOptions = () => {
  const { t } = useI18n()
  
  return [
    { value: 'female-sweet', label: t('voice.types.female_sweet'), icon: '👩💖' },
    { value: 'female-clear', label: t('voice.types.female_clear'), icon: '👩💼' },
    { value: 'female-professional', label: t('voice.types.female_professional'), icon: '👩🎯' },
    { value: 'male-strong', label: t('voice.types.male_strong'), icon: '👨💪' },
    { value: 'male-gentle', label: t('voice.types.male_gentle'), icon: '👨😊' },
    { value: 'male-deep', label: t('voice.types.male_deep'), icon: '👨🎭' }
  ]
}

// Get current voice info
const getCurrentVoiceInfo = () => {
  if (!selectedVoice.value) return null
  
  // Extract gender from voice type
  const gender = voiceSettings.value.voiceType.includes('female') ? 'female' : 'male'
  
  return {
    name: selectedVoice.value.name,
    lang: selectedVoice.value.lang,
    gender: gender
  }
}

// Watch for settings changes
watch(voiceSettings, () => {
  updateSelectedVoice()
  saveSettings()
}, { deep: true })

// Watch specifically for voice type changes
watch(() => voiceSettings.value.voiceType, (newType, oldType) => {
  if (newType !== oldType) {
    console.log('Voice type changed from', oldType, 'to', newType)
    updateSelectedVoice()
  }
})

// Initialize voices when available
if ('speechSynthesis' in window) {
  speechSynthesis.onvoiceschanged = () => {
    loadVoices()
  }
}

// Load settings on module initialization
loadSettings()
loadVoices()

// Export the composable
export function useVoiceStore() {
  return {
    voiceSettings,
    availableVoices,
    selectedVoice,
    setVoiceType,
    playAudio,
    createUtterance,
    getVoiceTypeOptions,
    getCurrentVoiceInfo,
    loadVoices
  }
}
