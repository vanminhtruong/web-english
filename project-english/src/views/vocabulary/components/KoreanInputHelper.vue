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
              <div class="px-6 py-4 border-b border-gray-200 dark:border-gray-700 flex-shrink-0 bg-gradient-to-r from-blue-50 to-indigo-50 dark:from-[#0a0a0a] dark:to-[#0a0a0a]">
                <div class="flex items-center justify-between">
                  <h2 class="text-lg sm:text-xl md:text-2xl font-semibold text-gray-900 dark:text-white flex items-center space-x-2">
                    <span class="w-2 h-2 bg-blue-500 rounded-full animate-pulse"></span>
                    <span>{{ t('korean.inputHelper.title', 'Korean Input Helper') }}</span>
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

              <!-- Content -->
              <div class="px-6 py-4 flex-1 overflow-y-auto min-h-0">
                <!-- Preview Section -->
                <div class="mb-6">
                  <label class="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2 flex items-center">
                    <span class="w-1 h-4 bg-green-500 rounded mr-2"></span>
                    {{ t('korean.inputHelper.preview', 'Preview') }}
                  </label>
                  <div class="relative">
                    <input
                      v-model="currentInput"
                      type="text"
                      class="w-full px-3 py-2 pr-20 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-[#0a0a0a] text-gray-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-300 text-lg"
                      :placeholder="t('korean.inputHelper.placeholder', 'Type or click characters below...')"
                      readonly
                    />
                    <!-- Backspace Button -->
                    <button
                      v-if="currentInput"
                      @click="backspaceInput"
                      class="absolute right-12 top-1/2 -translate-y-1/2 w-8 h-6 bg-orange-500 hover:bg-orange-600 text-white rounded flex items-center justify-center text-xs font-bold transition-all duration-300 hover:scale-110"
                      :title="t('common.backspace', 'Backspace')"
                    >
                      ⌫
                    </button>
                    <!-- Clear Button -->
                    <button
                      v-if="currentInput"
                      @click="clearInput"
                      class="absolute right-2 top-1/2 -translate-y-1/2 w-6 h-6 bg-red-500 hover:bg-red-600 text-white rounded-full flex items-center justify-center text-xs font-bold transition-all duration-300 hover:scale-110"
                      :title="t('common.clear', 'Clear')"
                    >
                      ×
                    </button>
                  </div>
                </div>

                <!-- Character Categories -->
                <div class="space-y-6">
                  <!-- Consonants (자음) -->
                  <div>
                    <h3 class="text-md font-semibold text-gray-800 dark:text-gray-200 mb-3 flex items-center">
                      <span class="w-1 h-4 bg-blue-500 rounded mr-2"></span>
                      {{ t('korean.inputHelper.consonants', 'Consonants (자음)') }}
                    </h3>
                    <div class="grid grid-cols-4 sm:grid-cols-6 md:grid-cols-8 gap-2">
                      <button
                        v-for="consonant in koreanConsonants"
                        :key="consonant.char"
                        @click="addCharacter(consonant.char)"
                        class="p-2 bg-blue-100 hover:bg-blue-200 dark:bg-blue-900 dark:hover:bg-blue-800 text-gray-800 dark:text-gray-200 rounded-lg transition-all duration-200 hover:scale-105 flex flex-col items-center text-sm"
                        :title="consonant.description"
                      >
                        <span class="font-bold text-base">{{ consonant.char }}</span>
                        <span class="text-xs text-gray-600 dark:text-gray-400">{{ consonant.romanization }}</span>
                      </button>
                    </div>
                  </div>

                  <!-- Vowels (모음) -->
                  <div>
                    <h3 class="text-md font-semibold text-gray-800 dark:text-gray-200 mb-3 flex items-center">
                      <span class="w-1 h-4 bg-green-500 rounded mr-2"></span>
                      {{ t('korean.inputHelper.vowels', 'Vowels (모음)') }}
                    </h3>
                    <div class="grid grid-cols-4 sm:grid-cols-6 md:grid-cols-8 gap-2">
                      <button
                        v-for="vowel in koreanVowels"
                        :key="vowel.char"
                        @click="addCharacter(vowel.char)"
                        class="p-2 bg-green-100 hover:bg-green-200 dark:bg-green-900 dark:hover:bg-green-800 text-gray-800 dark:text-gray-200 rounded-lg transition-all duration-200 hover:scale-105 flex flex-col items-center text-sm"
                        :title="vowel.description"
                      >
                        <span class="font-bold text-base">{{ vowel.char }}</span>
                        <span class="text-xs text-gray-600 dark:text-gray-400">{{ vowel.romanization }}</span>
                      </button>
                    </div>
                  </div>

                  <!-- Common Syllables (자주 쓰이는 글자) -->
                  <div>
                    <h3 class="text-md font-semibold text-gray-800 dark:text-gray-200 mb-3 flex items-center">
                      <span class="w-1 h-4 bg-purple-500 rounded mr-2"></span>
                      {{ t('korean.inputHelper.commonSyllables', 'Common Syllables') }}
                    </h3>
                    <div class="grid grid-cols-6 sm:grid-cols-8 md:grid-cols-10 gap-2">
                      <button
                        v-for="syllable in commonKoreanSyllables"
                        :key="syllable"
                        @click="addCharacter(syllable)"
                        class="w-10 h-10 sm:w-12 sm:h-12 bg-purple-100 hover:bg-purple-200 dark:bg-purple-900 dark:hover:bg-purple-800 text-gray-800 dark:text-gray-200 rounded-lg transition-all duration-200 hover:scale-110 flex items-center justify-center font-bold text-base"
                      >
                        {{ syllable }}
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
                    @click="clearInput"
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
                      @click="confirmInput"
                      class="px-4 py-2 text-sm font-medium text-white bg-blue-600 hover:bg-blue-700 rounded-lg transition-all duration-300 hover:scale-105 shadow-lg"
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
import { ref, watch } from 'vue'
import { useI18n } from 'vue-i18n'

interface Props {
  modelValue: boolean
  initialValue?: string
}

interface Emits {
  (event: 'update:modelValue', value: boolean): void
  (event: 'input-confirmed', value: string): void
}

const props = withDefaults(defineProps<Props>(), {
  initialValue: ''
})

const emit = defineEmits<Emits>()
const { t } = useI18n()

// State
const currentInput = ref('')

// Korean Characters with Romanization
const koreanConsonants = [
  { char: 'ㄱ', romanization: 'g/k', description: 'g as in go, k as in sky' },
  { char: 'ㄴ', romanization: 'n', description: 'n as in no' },
  { char: 'ㄷ', romanization: 'd/t', description: 'd as in do, t as in stop' },
  { char: 'ㄹ', romanization: 'r/l', description: 'r as in run, l as in love' },
  { char: 'ㅁ', romanization: 'm', description: 'm as in moon' },
  { char: 'ㅂ', romanization: 'b/p', description: 'b as in boy, p as in spy' },
  { char: 'ㅅ', romanization: 's', description: 's as in see' },
  { char: 'ㅇ', romanization: 'ng', description: 'ng as in sing (silent at start)' },
  { char: 'ㅈ', romanization: 'j', description: 'j as in jump' },
  { char: 'ㅊ', romanization: 'ch', description: 'ch as in chair' },
  { char: 'ㅋ', romanization: 'k', description: 'k as in key' },
  { char: 'ㅌ', romanization: 't', description: 't as in top' },
  { char: 'ㅍ', romanization: 'p', description: 'p as in pie' },
  { char: 'ㅎ', romanization: 'h', description: 'h as in home' },
  { char: 'ㄲ', romanization: 'kk', description: 'stronger k sound' },
  { char: 'ㄸ', romanization: 'tt', description: 'stronger t sound' },
  { char: 'ㅃ', romanization: 'pp', description: 'stronger p sound' },
  { char: 'ㅆ', romanization: 'ss', description: 'stronger s sound' },
  { char: 'ㅉ', romanization: 'jj', description: 'stronger j sound' }
]

const koreanVowels = [
  { char: 'ㅏ', romanization: 'a', description: 'a as in father' },
  { char: 'ㅑ', romanization: 'ya', description: 'ya as in yard' },
  { char: 'ㅓ', romanization: 'eo', description: 'uh as in up' },
  { char: 'ㅕ', romanization: 'yeo', description: 'yuh sound' },
  { char: 'ㅗ', romanization: 'o', description: 'o as in go' },
  { char: 'ㅛ', romanization: 'yo', description: 'yo as in yo-yo' },
  { char: 'ㅜ', romanization: 'u', description: 'u as in moon' },
  { char: 'ㅠ', romanization: 'yu', description: 'yu as in you' },
  { char: 'ㅡ', romanization: 'eu', description: 'uh sound (lips spread)' },
  { char: 'ㅣ', romanization: 'i', description: 'i as in machine' },
  { char: 'ㅐ', romanization: 'ae', description: 'ae as in cat' },
  { char: 'ㅒ', romanization: 'yae', description: 'yae sound' },
  { char: 'ㅔ', romanization: 'e', description: 'e as in red' },
  { char: 'ㅖ', romanization: 'ye', description: 'ye as in yes' },
  { char: 'ㅘ', romanization: 'wa', description: 'wa as in water' },
  { char: 'ㅙ', romanization: 'wae', description: 'wae sound' },
  { char: 'ㅚ', romanization: 'oe', description: 'we sound' },
  { char: 'ㅝ', romanization: 'wo', description: 'wo sound' },
  { char: 'ㅞ', romanization: 'we', description: 'we sound' },
  { char: 'ㅟ', romanization: 'wi', description: 'wi as in we' },
  { char: 'ㅢ', romanization: 'ui', description: 'ui sound' }
]

const commonKoreanSyllables = [
  // Basic syllables (기본 음절)
  '가', '나', '다', '라', '마', '바', '사', '아', '자', '차', '카', '타', '파', '하',
  
  // Common particles & endings (조사 및 어미)
  '은', '을', '이', '가', '의', '에', '로', '와', '과', '나', '도', '만', '부터', '까지',
  
  // Frequent syllables (자주 쓰이는 음절)
  '고', '수', '한', '그', '요', '지', '시', '인', '대', '중', '모', '서', '있', '있다',
  
  // Common verbs/adjectives (동사/형용사)
  '하다', '되다', '있다', '없다', '같다', '다르다', '좋다', '나쁘다', '크다', '작다',
  
  // Common nouns (명사)
  '사람', '시간', '일', '날', '년', '월', '주', '분', '초', '때', '곳', '것', '말', '글',
  
  // Common adverbs (부사)
  '정말', '진짜', '아주', '매우', '너무', '조금', '많이', '잘', '못', '안', '또', '다시',
  
  // Numbers (숫자)
  '일', '이', '삼', '사', '오', '육', '칠', '팔', '구', '십', '백', '천', '만'
]

// Hangeul composition constants
const HANGEUL_START = 0xAC00 // 가
const JUNGSUNG_COUNT = 21 // number of vowels
const JONGSUNG_COUNT = 28 // number of final consonants (including empty)
const chosungMap = ['ㄱ', 'ㄲ', 'ㄴ', 'ㄷ', 'ㄸ', 'ㄹ', 'ㅁ', 'ㅂ', 'ㅃ', 'ㅅ', 'ㅆ', 'ㅇ', 'ㅈ', 'ㅉ', 'ㅊ', 'ㅋ', 'ㅌ', 'ㅍ', 'ㅎ']
const jungsungMap = ['ㅏ', 'ㅐ', 'ㅑ', 'ㅒ', 'ㅓ', 'ㅔ', 'ㅕ', 'ㅖ', 'ㅗ', 'ㅘ', 'ㅙ', 'ㅚ', 'ㅛ', 'ㅜ', 'ㅝ', 'ㅞ', 'ㅟ', 'ㅠ', 'ㅡ', 'ㅢ', 'ㅣ']
const jongsungMap = ['', 'ㄱ', 'ㄲ', 'ㄳ', 'ㄴ', 'ㄵ', 'ㄶ', 'ㄷ', 'ㄹ', 'ㄺ', 'ㄻ', 'ㄼ', 'ㄽ', 'ㄾ', 'ㄿ', 'ㅀ', 'ㅁ', 'ㅂ', 'ㅄ', 'ㅅ', 'ㅆ', 'ㅇ', 'ㅈ', 'ㅊ', 'ㅋ', 'ㅌ', 'ㅍ', 'ㅎ']

// Helper functions
const isConsonant = (char: string) => {
  const code = char.charCodeAt(0)
  return (code >= 0x3131 && code <= 0x314E) // ㄱ-ㅎ
}

const isVowel = (char: string) => {
  const code = char.charCodeAt(0)
  return (code >= 0x314F && code <= 0x3163) // ㅏ-ㅢ
}

const isSyllable = (char: string) => {
  const code = char.charCodeAt(0)
  return (code >= 0xAC00 && code <= 0xD7A3) // 가-힣
}

const decomposeSyllable = (syllable: string) => {
  const code = syllable.charCodeAt(0) - HANGEUL_START
  const chosung = Math.floor(code / (JUNGSUNG_COUNT * JONGSUNG_COUNT))
  const jungsung = Math.floor((code % (JUNGSUNG_COUNT * JONGSUNG_COUNT)) / JONGSUNG_COUNT)
  const jongsung = code % JONGSUNG_COUNT
  
  return {
    chosung: chosungMap[chosung],
    jungsung: jungsungMap[jungsung],
    jongsung: jongsung > 0 ? jongsungMap[jongsung] : ''
  }
}

const composeSyllable = (chosung: string, jungsung: string, jongsung: string = '') => {
  const chosungIndex = chosungMap.indexOf(chosung)
  const jungsungIndex = jungsungMap.indexOf(jungsung)
  const jongsungIndex = jongsung ? jongsungMap.indexOf(jongsung) : 0
  
  if (chosungIndex === -1 || jungsungIndex === -1 || jongsungIndex === -1) {
    return null
  }
  
  const syllableCode = HANGEUL_START + (chosungIndex * JUNGSUNG_COUNT * JONGSUNG_COUNT) + (jungsungIndex * JONGSUNG_COUNT) + jongsungIndex
  return String.fromCharCode(syllableCode)
}

// Methods
const addCharacter = (character: string) => {
  const currentText = currentInput.value
  
  // If adding a consonant or vowel, try to compose with previous characters
  if (isConsonant(character) || isVowel(character)) {
    // Get the last character
    const lastChar = currentText.slice(-1)
    
    if (lastChar && isSyllable(lastChar)) {
      // Decompose the last syllable
      const decomposed = decomposeSyllable(lastChar)
      
      if (isVowel(character) && decomposed.chosung && !decomposed.jungsung) {
        // Add vowel to consonant
        const newSyllable = composeSyllable(decomposed.chosung, character)
        if (newSyllable) {
          currentInput.value = currentText.slice(0, -1) + newSyllable
          return
        }
      } else if (isConsonant(character) && decomposed.chosung && decomposed.jungsung && !decomposed.jongsung) {
        // Add final consonant
        const newSyllable = composeSyllable(decomposed.chosung, decomposed.jungsung, character)
        if (newSyllable) {
          currentInput.value = currentText.slice(0, -1) + newSyllable
          return
        }
      }
    } else if (lastChar && isConsonant(lastChar) && isVowel(character)) {
      // Compose consonant + vowel
      const newSyllable = composeSyllable(lastChar, character)
      if (newSyllable) {
        currentInput.value = currentText.slice(0, -1) + newSyllable
        return
      }
    }
  }
  
  // Default: just add the character
  currentInput.value += character
}

const clearInput = () => {
  currentInput.value = ''
}

const backspaceInput = () => {
  if (currentInput.value.length === 0) return
  
  const currentText = currentInput.value
  const lastChar = currentText.slice(-1)
  
  // If the last character is a complete syllable, decompose it step by step
  if (isSyllable(lastChar)) {
    const decomposed = decomposeSyllable(lastChar)
    
    if (decomposed.jongsung) {
      // Remove final consonant: 각 → 가
      const newSyllable = composeSyllable(decomposed.chosung, decomposed.jungsung)
      if (newSyllable) {
        currentInput.value = currentText.slice(0, -1) + newSyllable
        return
      }
    } else if (decomposed.jungsung) {
      // Remove vowel, keep only initial consonant: 가 → ㄱ  
      currentInput.value = currentText.slice(0, -1) + decomposed.chosung
      return
    }
    // If only chosung exists, it will be handled by default case below
  }
  
  // Default: remove last character (for consonants, vowels, or other characters)
  currentInput.value = currentText.slice(0, -1)
}

const closeDialog = () => {
  emit('update:modelValue', false)
}

const confirmInput = () => {
  emit('input-confirmed', currentInput.value)
  emit('update:modelValue', false)
}

// Watch for initial value changes
watch(() => props.initialValue, (newValue) => {
  currentInput.value = newValue
}, { immediate: true })

// Watch for modal opening
watch(() => props.modelValue, (isOpen) => {
  if (isOpen) {
    currentInput.value = props.initialValue
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
