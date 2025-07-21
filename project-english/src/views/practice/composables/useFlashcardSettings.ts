import { ref, watch, onMounted } from 'vue'
import type { GameSettings } from './useFlashcardGame'

export function useFlashcardSettings() {
  const showSettings = ref(false)
  
  // Default settings
  const defaultSettings: GameSettings = {
    cardCount: 20,
    difficulty: 'all',
    autoFlip: false,
    flipDelay: 3,
    showDefinition: true,
    showExample: true,
    showPronunciation: true,
    shuffleCards: false,
    voiceType: 'female'
  }

  // Current settings
  const settings = ref<GameSettings>({ ...defaultSettings })

  // Local settings for modal editing
  const localSettings = ref<GameSettings>({ ...defaultSettings })

  // Load settings from localStorage
  const loadSettings = () => {
    const saved = localStorage.getItem('flashcard-settings')
    if (saved) {
      try {
        const parsedSettings = JSON.parse(saved)
        settings.value = { ...defaultSettings, ...parsedSettings }
        localSettings.value = { ...settings.value }
      } catch (error) {
        console.error('Error loading settings:', error)
        settings.value = { ...defaultSettings }
        localSettings.value = { ...defaultSettings }
      }
    }
  }

  // Save settings to localStorage
  const saveSettings = () => {
    localStorage.setItem('flashcard-settings', JSON.stringify(settings.value))
  }

  // Apply settings from modal
  const applySettings = () => {
    settings.value = { ...localSettings.value }
    saveSettings()
    showSettings.value = false
  }

  // Reset settings to default
  const resetSettings = () => {
    settings.value = { ...defaultSettings }
    localSettings.value = { ...defaultSettings }
    saveSettings()
  }

  // Cancel settings changes
  const cancelSettings = () => {
    localSettings.value = { ...settings.value }
    showSettings.value = false
  }

  // Open settings modal
  const openSettings = () => {
    localSettings.value = { ...settings.value }
    showSettings.value = true
  }

  // Settings validation
  const validateSettings = (settingsToValidate: GameSettings) => {
    const errors: string[] = []
    
    if (settingsToValidate.cardCount < 1 || settingsToValidate.cardCount > 100) {
      errors.push('Số lượng thẻ phải từ 1 đến 100')
    }
    
    if (settingsToValidate.flipDelay < 1 || settingsToValidate.flipDelay > 10) {
      errors.push('Thời gian lật thẻ phải từ 1 đến 10 giây')
    }
    
    return errors
  }

  // Get difficulty levels
  const getDifficultyLevels = () => {
    return [
      { value: 'all', label: 'Tất cả' },
      { value: 'easy', label: 'Dễ' },
      { value: 'medium', label: 'Trung bình' },
      { value: 'hard', label: 'Khó' }
    ]
  }

  // Get flip delay options
  const getFlipDelayOptions = () => {
    return [
      { value: 1, label: '1 giây' },
      { value: 2, label: '2 giây' },
      { value: 3, label: '3 giây' },
      { value: 4, label: '4 giây' },
      { value: 5, label: '5 giây' },
      { value: 10, label: '10 giây' }
    ]
  }

  // Get card count options
  const getCardCountOptions = () => {
    return [
      { value: 10, label: '10 thẻ' },
      { value: 20, label: '20 thẻ' },
      { value: 30, label: '30 thẻ' },
      { value: 50, label: '50 thẻ' },
      { value: 100, label: '100 thẻ' }
    ]
  }

  // Get voice type options
  const getVoiceTypeOptions = () => {
    return [
      { value: 'female', label: 'Giọng nữ', icon: '👩' },
      { value: 'male', label: 'Giọng nam', icon: '👨' }
    ]
  }

  // Settings presets
  const getSettingsPresets = () => {
    return {
      beginner: {
        ...defaultSettings,
        cardCount: 10,
        difficulty: 'easy',
        autoFlip: true,
        flipDelay: 5,
        showDefinition: true,
        showExample: true,
        showPronunciation: true
      },
      intermediate: {
        ...defaultSettings,
        cardCount: 20,
        difficulty: 'medium',
        autoFlip: false,
        showDefinition: true,
        showExample: true,
        showPronunciation: false
      },
      advanced: {
        ...defaultSettings,
        cardCount: 50,
        difficulty: 'hard',
        autoFlip: false,
        showDefinition: false,
        showExample: false,
        showPronunciation: false
      }
    }
  }

  // Apply preset
  const applyPreset = (presetName: 'beginner' | 'intermediate' | 'advanced') => {
    const presets = getSettingsPresets()
    localSettings.value = { ...presets[presetName] }
  }

  // Watch for settings changes to auto-save
  watch(settings, () => {
    saveSettings()
  }, { deep: true })

  onMounted(() => {
    loadSettings()
  })

  return {
    showSettings,
    settings,
    localSettings,
    applySettings,
    resetSettings,
    cancelSettings,
    openSettings,
    validateSettings,
    getDifficultyLevels,
    getFlipDelayOptions,
    getCardCountOptions,
    getVoiceTypeOptions,
    getSettingsPresets,
    applyPreset
  }
}
