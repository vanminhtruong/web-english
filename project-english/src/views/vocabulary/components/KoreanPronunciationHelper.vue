<template>
  <div>
    <!-- Backdrop -->
    <Transition
      enter-active-class="transition-all duration-500 ease-out"
      enter-from-class="opacity-0"
      enter-to-class="opacity-100"
      leave-active-class="transition-all duration-300 ease-in"
      leave-from-class="opacity-100"
      leave-to-class="opacity-0"
    >
      <div 
        v-if="modelValue" 
        class="fixed inset-0 bg-gray-600 bg-opacity-50 flex items-center justify-center p-4 z-50 backdrop-blur-sm"
      >
        <!-- Dialog Container -->
        <Transition
          enter-active-class="transition-all duration-500 ease-out"
          enter-from-class="opacity-0 scale-90 translate-y-8 rotate-1"
          enter-to-class="opacity-100 scale-100 translate-y-0 rotate-0"
          leave-active-class="transition-all duration-300 ease-in"
          leave-from-class="opacity-100 scale-100 translate-y-0 rotate-0"
          leave-to-class="opacity-0 scale-90 translate-y-8 rotate-1"
        >
          <div class="w-full max-h-[90vh] flex flex-col max-w-full sm:max-w-lg md:max-w-2xl lg:max-w-4xl">
            <!-- Dialog Content -->
            <div 
              class="bg-white dark:bg-[#0a0a0a] shadow-2xl rounded-xl border border-gray-200 dark:border-gray-700 flex flex-col h-full overflow-hidden transform"
              @click.stop
            >
              <!-- Header -->
              <div class="px-6 py-4 border-b border-gray-200 dark:border-gray-700 flex-shrink-0 bg-gradient-to-r from-green-50 to-emerald-50 dark:from-[#0a0a0a] dark:to-[#0a0a0a]">
                <div class="flex items-center justify-between">
                  <h2 class="text-lg sm:text-xl md:text-2xl font-semibold text-gray-900 dark:text-white flex items-center space-x-2">
                    <span class="w-2 h-2 bg-green-500 rounded-full animate-pulse"></span>
                    <span>{{ t('korean.pronunciationHelper.title', 'Korean Pronunciation Helper') }}</span>
                  </h2>
                  <button 
                    @click="closeDialog"
                    class="text-gray-400 hover:text-gray-600 dark:hover:text-gray-200 transition-all duration-300 hover:scale-110 hover:rotate-90 p-1 rounded-full hover:bg-gray-100 dark:hover:bg-gray-800"
                  >
                    <svg class="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12"></path>
                    </svg>
                  </button>
                </div>
              </div>

              <!-- Sticky Preview Section -->
              <div class="px-6 py-4 border-b border-gray-200 dark:border-gray-700 bg-white dark:bg-[#0a0a0a] sticky top-0 z-10">
                <!-- Search Input -->
                <div class="relative mb-4">
                  <div class="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                    <svg class="h-5 w-5 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"></path>
                    </svg>
                  </div>
                  <input
                    ref="searchInputRef"
                    v-model="searchQuery"
                    type="text"
                    class="block w-full pl-10 pr-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-green-500 dark:bg-[#0a0a0a] dark:text-white"
                    :placeholder="t('common.search', 'Search Korean sounds...')"
                    @blur="refocusSearchInput"
                  />
                </div>

                <!-- Preview Section -->
                <div>
                  <label class="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2 flex items-center">
                    <span class="w-1 h-4 bg-green-500 rounded mr-2"></span>
                    {{ t('korean.pronunciationHelper.preview', 'Pronunciation Preview') }}
                  </label>
                  <div class="relative">
                    <input
                      v-model="currentPronunciation"
                      type="text"
                      class="w-full px-3 py-2 pr-20 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-[#0a0a0a] text-gray-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-transparent transition-all duration-300 text-lg"
                      :placeholder="t('korean.pronunciationHelper.placeholder', 'Click Korean sounds below...')"
                      readonly
                    />
                    <!-- Backspace Button -->
                    <button
                      v-if="currentPronunciation"
                      @click="backspacePronunciation"
                      class="absolute right-12 top-1/2 -translate-y-1/2 w-8 h-6 bg-orange-500 hover:bg-orange-600 text-white rounded flex items-center justify-center text-xs font-bold transition-all duration-300 hover:scale-110"
                      :title="t('common.backspace', 'Backspace')"
                    >
                      ⌫
                    </button>
                    <!-- Clear Button -->
                    <button
                      v-if="currentPronunciation"
                      @click="clearPronunciation"
                      class="absolute right-2 top-1/2 -translate-y-1/2 w-6 h-6 bg-red-500 hover:bg-red-600 text-white rounded-full flex items-center justify-center text-xs font-bold transition-all duration-300 hover:scale-110"
                      :title="t('common.clear', 'Clear')"
                    >
                      ×
                    </button>
                  </div>
                </div>
              </div>

              <!-- Scrollable Content -->
              <div class="px-6 py-4 flex-1 overflow-y-auto min-h-0">

                <!-- Korean Pronunciation Guide -->
                <div class="space-y-6">
                  <!-- Korean Consonant Sounds (자음 소리) -->
                  <div>
                    <h3 class="text-md font-semibold text-gray-800 dark:text-gray-200 mb-3 flex items-center">
                      <span class="w-1 h-4 bg-blue-500 rounded mr-2"></span>
                      {{ t('korean.pronunciationHelper.consonantSounds', 'Consonant Sounds (자음 소리)') }}
                    </h3>
                    <div class="grid grid-cols-4 sm:grid-cols-6 md:grid-cols-8 gap-2">
                      <button
                        v-for="sound in filteredConsonantSounds"
                        :key="sound.korean"
                        @click="addSound(sound.romanization)"
                        class="p-2 bg-blue-100 hover:bg-blue-200 dark:bg-blue-900 dark:hover:bg-blue-800 text-gray-800 dark:text-gray-200 rounded-lg transition-all duration-200 hover:scale-105 flex flex-col items-center text-sm"
                        :title="sound.description"
                      >
                        <span class="font-bold">{{ sound.korean }}</span>
                        <span class="text-xs text-gray-600 dark:text-gray-400">{{ sound.romanization }}</span>
                      </button>
                    </div>
                  </div>

                  <!-- Korean Vowel Sounds (모음 소리) -->
                  <div>
                    <h3 class="text-md font-semibold text-gray-800 dark:text-gray-200 mb-3 flex items-center">
                      <span class="w-1 h-4 bg-green-500 rounded mr-2"></span>
                      {{ t('korean.pronunciationHelper.vowelSounds', 'Vowel Sounds (모음 소리)') }}
                    </h3>
                    <div class="grid grid-cols-4 sm:grid-cols-6 md:grid-cols-8 gap-2">
                      <button
                        v-for="sound in filteredVowelSounds"
                        :key="sound.korean"
                        @click="addSound(sound.romanization)"
                        class="p-2 bg-green-100 hover:bg-green-200 dark:bg-green-900 dark:hover:bg-green-800 text-gray-800 dark:text-gray-200 rounded-lg transition-all duration-200 hover:scale-105 flex flex-col items-center text-sm"
                        :title="sound.description"
                      >
                        <span class="font-bold">{{ sound.korean }}</span>
                        <span class="text-xs text-gray-600 dark:text-gray-400">{{ sound.romanization }}</span>
                      </button>
                    </div>
                  </div>

                  <!-- Common Korean Pronunciation Patterns -->
                  <div>
                    <h3 class="text-md font-semibold text-gray-800 dark:text-gray-200 mb-3 flex items-center">
                      <span class="w-1 h-4 bg-purple-500 rounded mr-2"></span>
                      {{ t('korean.pronunciationHelper.commonPatterns', 'Common Patterns') }}
                    </h3>
                    <div class="grid grid-cols-3 sm:grid-cols-4 md:grid-cols-6 gap-2">
                      <button
                        v-for="pattern in filteredCommonPatterns"
                        :key="pattern.korean"
                        @click="addSound(pattern.romanization)"
                        class="p-2 bg-purple-100 hover:bg-purple-200 dark:bg-purple-900 dark:hover:bg-purple-800 text-gray-800 dark:text-gray-200 rounded-lg transition-all duration-200 hover:scale-105 flex flex-col items-center text-sm"
                        :title="pattern.description"
                      >
                        <span class="font-bold">{{ pattern.korean }}</span>
                        <span class="text-xs text-gray-600 dark:text-gray-400">{{ pattern.romanization }}</span>
                      </button>
                    </div>
                  </div>

                  <!-- Special Characters -->
                  <div>
                    <h3 class="text-md font-semibold text-gray-800 dark:text-gray-200 mb-3 flex items-center">
                      <span class="w-1 h-4 bg-yellow-500 rounded mr-2"></span>
                      {{ t('korean.pronunciationHelper.specialChars', 'Special Characters') }}
                    </h3>
                    <div class="flex flex-wrap gap-2">
                      <button
                        v-for="char in specialChars"
                        :key="char.char"
                        @click="addSound(char.char)"
                        class="px-3 py-2 bg-yellow-100 hover:bg-yellow-200 dark:bg-yellow-900 dark:hover:bg-yellow-800 text-gray-800 dark:text-gray-200 rounded-lg transition-all duration-200 hover:scale-105 text-sm font-mono"
                        :title="char.description"
                      >
                        {{ char.char }}
                      </button>
                    </div>
                  </div>
                </div>
              </div>

              <!-- Footer -->
              <div class="px-6 py-4 border-t border-gray-200 dark:border-gray-700 flex-shrink-0 bg-gray-50 dark:bg-[#0a0a0a]">
                <div class="flex justify-between items-center space-x-3">
                  <button
                    type="button"
                    @click="clearPronunciation"
                    class="px-4 py-2 text-sm font-medium text-gray-600 dark:text-gray-400 bg-gray-200 dark:bg-gray-700 hover:bg-gray-300 dark:hover:bg-gray-600 rounded-lg transition-all duration-300 hover:scale-105"
                  >
                    {{ t('common.clear', 'Clear') }}
                  </button>
                  <div class="flex space-x-3">
                    <button
                      type="button"
                      @click="closeDialog"
                      class="px-4 py-2 text-sm font-medium text-gray-600 dark:text-gray-400 bg-gray-200 dark:bg-gray-700 hover:bg-gray-300 dark:hover:bg-gray-600 rounded-lg transition-all duration-300 hover:scale-105"
                    >
                      {{ t('common.cancel', 'Cancel') }}
                    </button>
                    <button
                      type="button"
                      @click="confirmPronunciation"
                      class="px-4 py-2 text-sm font-medium text-white bg-green-600 hover:bg-green-700 rounded-lg transition-all duration-300 hover:scale-105 shadow-lg"
                    >
                      {{ t('common.confirm', 'Confirm') }}
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </Transition>
      </div>
    </Transition>
  </div>
</template>

<script setup lang="ts">
import { ref, watch, computed, nextTick } from 'vue'
import { useI18n } from 'vue-i18n'

interface Props {
  modelValue: boolean
  initialValue?: string
}

interface Emits {
  (event: 'update:modelValue', value: boolean): void
  (event: 'pronunciation-confirmed', value: string): void
}

interface KoreanSound {
  korean: string
  romanization: string
  description: string
}

interface SpecialChar {
  char: string
  description: string
}

const props = withDefaults(defineProps<Props>(), {
  initialValue: ''
})

const emit = defineEmits<Emits>()
const { t } = useI18n()

// State
const currentPronunciation = ref('')
const searchQuery = ref('')
const searchInputRef = ref<HTMLInputElement | null>(null)

// Korean Consonant Sounds (Romanized)
const koreanConsonantSounds: KoreanSound[] = [
  { korean: 'ㄱ', romanization: 'g/k', description: 'g as in go, k as in sky' },
  { korean: 'ㄴ', romanization: 'n', description: 'n as in no' },
  { korean: 'ㄷ', romanization: 'd/t', description: 'd as in do, t as in stop' },
  { korean: 'ㄹ', romanization: 'r/l', description: 'r as in run, l as in love' },
  { korean: 'ㅁ', romanization: 'm', description: 'm as in moon' },
  { korean: 'ㅂ', romanization: 'b/p', description: 'b as in boy, p as in spy' },
  { korean: 'ㅅ', romanization: 's', description: 's as in see' },
  { korean: 'ㅇ', romanization: 'ng', description: 'ng as in sing' },
  { korean: 'ㅈ', romanization: 'j', description: 'j as in jump' },
  { korean: 'ㅊ', romanization: 'ch', description: 'ch as in chair' },
  { korean: 'ㅋ', romanization: 'k', description: 'k as in key' },
  { korean: 'ㅌ', romanization: 't', description: 't as in top' },
  { korean: 'ㅍ', romanization: 'p', description: 'p as in pie' },
  { korean: 'ㅎ', romanization: 'h', description: 'h as in home' },
  { korean: 'ㄲ', romanization: 'kk', description: 'stronger k sound' },
  { korean: 'ㄸ', romanization: 'tt', description: 'stronger t sound' },
  { korean: 'ㅃ', romanization: 'pp', description: 'stronger p sound' },
  { korean: 'ㅆ', romanization: 'ss', description: 'stronger s sound' },
  { korean: 'ㅉ', romanization: 'jj', description: 'stronger j sound' }
]

// Korean Vowel Sounds (Romanized)
const koreanVowelSounds: KoreanSound[] = [
  { korean: 'ㅏ', romanization: 'a', description: 'a as in father' },
  { korean: 'ㅑ', romanization: 'ya', description: 'ya as in yard' },
  { korean: 'ㅓ', romanization: 'eo', description: 'uh as in up' },
  { korean: 'ㅕ', romanization: 'yeo', description: 'yuh sound' },
  { korean: 'ㅗ', romanization: 'o', description: 'o as in go' },
  { korean: 'ㅛ', romanization: 'yo', description: 'yo as in yo-yo' },
  { korean: 'ㅜ', romanization: 'u', description: 'u as in moon' },
  { korean: 'ㅠ', romanization: 'yu', description: 'yu as in you' },
  { korean: 'ㅡ', romanization: 'eu', description: 'uh sound (lips spread)' },
  { korean: 'ㅣ', romanization: 'i', description: 'i as in machine' },
  { korean: 'ㅐ', romanization: 'ae', description: 'ae as in cat' },
  { korean: 'ㅒ', romanization: 'yae', description: 'yae sound' },
  { korean: 'ㅔ', romanization: 'e', description: 'e as in red' },
  { korean: 'ㅖ', romanization: 'ye', description: 'ye as in yes' },
  { korean: 'ㅘ', romanization: 'wa', description: 'wa as in water' },
  { korean: 'ㅙ', romanization: 'wae', description: 'wae sound' },
  { korean: 'ㅚ', romanization: 'oe', description: 'we sound' },
  { korean: 'ㅝ', romanization: 'wo', description: 'wo sound' },
  { korean: 'ㅞ', romanization: 'we', description: 'we sound' },
  { korean: 'ㅟ', romanization: 'wi', description: 'wi as in we' },
  { korean: 'ㅢ', romanization: 'ui', description: 'ui sound' }
]

// Common Korean Pronunciation Patterns
const commonKoreanPatterns: KoreanSound[] = [
  { korean: '안', romanization: 'an', description: 'an sound' },
  { korean: '음', romanization: 'eum', description: 'eum sound' },
  { korean: '이', romanization: 'i', description: 'i sound' },
  { korean: '은', romanization: 'eun', description: 'eun sound' },
  { korean: '을', romanization: 'eul', description: 'eul sound' },
  { korean: '의', romanization: 'ui', description: 'ui sound' },
  { korean: '에', romanization: 'e', description: 'e sound' },
  { korean: '게', romanization: 'ge', description: 'ge sound' },
  { korean: '세', romanization: 'se', description: 'se sound' },
  { korean: '데', romanization: 'de', description: 'de sound' },
  { korean: '네', romanization: 'ne', description: 'ne sound' },
  { korean: '베', romanization: 'be', description: 'be sound' }
]

// Special Characters
const specialChars: SpecialChar[] = [
  { char: '-', description: 'Syllable separator' },
  { char: "'", description: 'Glottal stop' },
  { char: ':', description: 'Long vowel marker' },
  { char: ' ', description: 'Space' },
  { char: '(', description: 'Open parenthesis' },
  { char: ')', description: 'Close parenthesis' },
  { char: '[', description: 'Open bracket' },
  { char: ']', description: 'Close bracket' }
]

// Computed filtered arrays based on search
const filteredConsonantSounds = computed(() => {
  if (!searchQuery.value) return koreanConsonantSounds
  const query = searchQuery.value.toLowerCase()
  return koreanConsonantSounds.filter(sound => 
    sound.korean.includes(query) || 
    sound.romanization.toLowerCase().includes(query) || 
    sound.description.toLowerCase().includes(query)
  )
})

const filteredVowelSounds = computed(() => {
  if (!searchQuery.value) return koreanVowelSounds
  const query = searchQuery.value.toLowerCase()
  return koreanVowelSounds.filter(sound => 
    sound.korean.includes(query) || 
    sound.romanization.toLowerCase().includes(query) || 
    sound.description.toLowerCase().includes(query)
  )
})

const filteredCommonPatterns = computed(() => {
  if (!searchQuery.value) return commonKoreanPatterns
  const query = searchQuery.value.toLowerCase()
  return commonKoreanPatterns.filter(pattern => 
    pattern.korean.includes(query) || 
    pattern.romanization.toLowerCase().includes(query) || 
    pattern.description.toLowerCase().includes(query)
  )
})

// Methods
const focusSearchInput = () => {
  if (searchInputRef.value) {
    searchInputRef.value.focus()
  }
}

const refocusSearchInput = () => {
  // Refocus after a short delay to ensure any click actions complete first
  setTimeout(() => {
    focusSearchInput()
  }, 50)
}

const addSound = (sound: string) => {
  currentPronunciation.value += sound
  // Maintain focus on search input after adding sound
  setTimeout(() => {
    focusSearchInput()
  }, 10)
}

const clearPronunciation = () => {
  currentPronunciation.value = ''
  // Maintain focus on search input after clearing
  setTimeout(() => {
    focusSearchInput()
  }, 10)
}

const backspacePronunciation = () => {
  if (currentPronunciation.value.length > 0) {
    currentPronunciation.value = currentPronunciation.value.slice(0, -1)
  }
  // Maintain focus on search input after backspace
  setTimeout(() => {
    focusSearchInput()
  }, 10)
}

const closeDialog = () => {
  emit('update:modelValue', false)
}

const confirmPronunciation = () => {
  emit('pronunciation-confirmed', currentPronunciation.value)
  emit('update:modelValue', false)
}

// Watch for initial value changes
watch(() => props.initialValue, (newValue) => {
  currentPronunciation.value = newValue
}, { immediate: true })

// Watch for modal opening and focus search
watch(() => props.modelValue, async (isOpen) => {
  if (isOpen) {
    currentPronunciation.value = props.initialValue
    searchQuery.value = ''
    // Focus search input after modal animation
    await nextTick()
    setTimeout(() => {
      focusSearchInput()
    }, 100)
  }
})
</script>

<style scoped>
/* Animation keyframes */
@keyframes fadeInUp {
  from {
    opacity: 0;
    transform: translateY(30px);
  }
  to {
    opacity: 1;
    transform: translateY(0);
  }
}

.animate-fade-in-up {
  animation: fadeInUp 0.6s ease-out both;
}
</style>
