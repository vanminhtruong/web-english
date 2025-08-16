<template>
  <!-- IPA Picker Modal (no click-outside close) -->
  <Teleport to="body">
    <Transition
      enter-active-class="transition-all duration-500 ease-out"
      enter-from-class="opacity-0"
      enter-to-class="opacity-100"
      leave-active-class="transition-all duration-300 ease-in"
      leave-from-class="opacity-100"
      leave-to-class="opacity-0"
    >
      <div v-if="modelValue" class="fixed inset-0 bg-black/50 flex items-center justify-center p-4 z-[60000] backdrop-blur-sm">
        <Transition
          enter-active-class="transition-all duration-500 ease-out"
          enter-from-class="opacity-0 scale-90 translate-y-8 rotate-1"
          enter-to-class="opacity-100 scale-100 translate-y-0 rotate-0"
          leave-active-class="transition-all duration-300 ease-in"
          leave-from-class="opacity-100 scale-100 translate-y-0 rotate-0"
          leave-to-class="opacity-0 scale-90 translate-y-8 rotate-1"
        >
          <div class="w-full max-w-2xl max-h-[85vh]">
            <div class="bg-white dark:bg-dark-bg-soft shadow-2xl rounded-xl border border-gray-200 dark:border-dark-bg-mute overflow-hidden transform flex flex-col h-full" @click.stop>
              <!-- Header -->
              <div class="px-5 py-4 border-b border-gray-200 dark:border-dark-bg-mute bg-gradient-to-r from-blue-50 to-indigo-50 dark:from-dark-bg-soft dark:to-dark-bg-soft flex items-center justify-between">
                <h3 class="text-lg font-semibold text-gray-900 dark:text-white flex items-center space-x-2">
                  <span class="w-2 h-2 bg-blue-500 rounded-full animate-pulse"></span>
                  <span>{{ t('vocabulary.pronunciation.ipaPickerTitle', 'IPA Picker') }}</span>
                </h3>
                <button
                  type="button"
                  @click="closeModal"
                  class="text-gray-400 hover:text-gray-600 dark:hover:text-white transition-all duration-300 hover:scale-110 hover:rotate-90 p-1 rounded-full hover:bg-gray-100 dark:hover:bg-dark-bg-mute"
                  :title="t('common.close', 'Close')"
                  :aria-label="t('common.close', 'Close')"
                >
                  <svg class="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12"></path>
                  </svg>
                </button>
              </div>

              <!-- Body -->
              <div class="px-5 py-4 space-y-4 overflow-y-auto flex-1 min-h-0 max-h-[calc(85vh-120px)]">
                <!-- Search Input -->
                <div class="relative">
                  <div class="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                    <svg class="h-5 w-5 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"></path>
                    </svg>
                  </div>
                  <input
                    v-model="searchQuery"
                    type="text"
                    class="block w-full pl-10 pr-3 py-2 border border-gray-300 dark:border-dark-bg-mute rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 dark:bg-dark-bg-mute dark:text-white"
                    :placeholder="t('common.search', 'Search IPA symbols...')"
                  />
                </div>

                <!-- Preview -->
                <div class="p-3 rounded-lg border border-gray-200 dark:border-dark-bg-mute bg-white dark:bg-dark-bg-mute">
                  <div class="text-2xl md:text-3xl font-mono text-gray-900 dark:text-white break-words min-h-[2.5rem]">
                    {{ ipaDraft || t('vocabulary.pronunciation.previewPlaceholder', 'Start building IPA...') }}
                  </div>
                </div>

                <!-- Quick controls -->
                <div class="flex flex-wrap gap-2">
                  <button
                    type="button"
                    @click="wrapWithSlashes"
                    class="px-3 py-1.5 rounded-lg border border-gray-300 dark:border-dark-bg-mute text-gray-800 dark:text-white dark:bg-dark-bg-mute hover:bg-gray-100 dark:hover:bg-dark-bg-soft"
                    :title="t('vocabulary.pronunciation.wrap', 'Wrap with slashes')"
                    :aria-label="t('vocabulary.pronunciation.wrap', 'Wrap with slashes')"
                  >
                    /.../
                  </button>
                  <button
                    type="button"
                    @click="backspaceIpa"
                    class="px-3 py-1.5 rounded-lg border border-gray-300 dark:border-dark-bg-mute text-gray-800 dark:text-white dark:bg-dark-bg-mute hover:bg-gray-100 dark:hover:bg-dark-bg-soft"
                    :title="t('common.backspace', 'Backspace')"
                    :aria-label="t('common.backspace', 'Backspace')"
                  >
                    {{ t('common.backspace', 'Backspace') }}
                  </button>
                  <button
                    type="button"
                    @click="clearIpa"
                    class="px-3 py-1.5 rounded-lg border border-gray-300 dark:border-dark-bg-mute text-gray-800 dark:text-white dark:bg-dark-bg-mute hover:bg-gray-100 dark:hover:bg-dark-bg-soft"
                    :title="t('common.clear', 'Clear')"
                    :aria-label="t('common.clear', 'Clear')"
                  >
                    {{ t('common.clear', 'Clear') }}
                  </button>
                  <button
                    type="button"
                    @click="applyIpa"
                    class="ml-auto px-3 py-1.5 rounded-lg bg-green-600 hover:bg-green-700 text-white"
                    :title="t('common.apply', 'Apply')"
                    :aria-label="t('common.apply', 'Apply')"
                  >
                    {{ t('common.apply', 'Apply') }}
                  </button>
                </div>

                <!-- Symbols -->
                <div class="space-y-4">
                  <!-- Vowels -->
                  <div>
                    <div class="text-sm font-medium text-gray-600 dark:text-white/70 mb-2 flex items-center">
                      <span class="w-1 h-4 bg-blue-500 rounded mr-2"></span>
                      {{ t('vocabulary.pronunciation.vowels', 'Vowels') }}
                    </div>
                    <div class="grid grid-cols-3 sm:grid-cols-4 md:grid-cols-6 gap-2">
                      <div 
                        v-for="vowel in filteredVowels" 
                        :key="'v-'+vowel.symbol"
                        class="relative"
                      >
                        <button 
                          type="button" 
                          @click="appendIpa(vowel.symbol)" 
                          class="w-full p-2 bg-blue-100 hover:bg-blue-200 dark:bg-blue-900 dark:hover:bg-blue-800 text-gray-800 dark:text-gray-200 rounded-lg transition-all duration-200 hover:scale-105 flex flex-col items-center text-sm border border-gray-300 dark:border-dark-bg-mute"
                          :title="vowel.description"
                        >
                          <span class="font-bold text-base">{{ vowel.symbol }}</span>
                          <span class="text-xs text-gray-600 dark:text-gray-400">{{ vowel.letter }}</span>
                        </button>
                        <button
                          type="button"
                          @click="speakIPA(vowel.symbol, $event)"
                          class="absolute -top-1 -right-1 w-5 h-5 bg-green-500 hover:bg-green-600 text-white rounded-full flex items-center justify-center text-xs transition-all duration-200 hover:scale-110 shadow-md"
                          :title="`Pronounce ${vowel.symbol}`"
                        >
                          <svg class="w-3 h-3" fill="currentColor" viewBox="0 0 20 20">
                            <path fill-rule="evenodd" d="M9.383 3.076A1 1 0 0110 4v12a1 1 0 01-1.617.824L4.8 13.6H2a1 1 0 01-1-1V7.4a1 1 0 011-1h2.8l3.583-3.224a1 1 0 01.617-.176zM12 5a1 1 0 011.414 0L15 6.586l1.586-1.586a1 1 0 111.414 1.414L16.414 8 18 9.586a1 1 0 01-1.414 1.414L15 9.414 13.414 11A1 1 0 0112 9.586L13.586 8 12 6.414A1 1 0 0112 5z" clip-rule="evenodd"></path>
                          </svg>
                        </button>
                      </div>
                    </div>
                  </div>

                  <!-- Diphthongs -->
                  <div>
                    <div class="text-sm font-medium text-gray-600 dark:text-white/70 mb-2 flex items-center">
                      <span class="w-1 h-4 bg-green-500 rounded mr-2"></span>
                      {{ t('vocabulary.pronunciation.diphthongs', 'Diphthongs') }}
                    </div>
                    <div class="grid grid-cols-3 sm:grid-cols-4 md:grid-cols-5 gap-2">
                      <div 
                        v-for="diphthong in filteredDiphthongs" 
                        :key="'d-'+diphthong.symbol"
                        class="relative"
                      >
                        <button 
                          type="button" 
                          @click="appendIpa(diphthong.symbol)" 
                          class="w-full p-2 bg-green-100 hover:bg-green-200 dark:bg-green-900 dark:hover:bg-green-800 text-gray-800 dark:text-gray-200 rounded-lg transition-all duration-200 hover:scale-105 flex flex-col items-center text-sm border border-gray-300 dark:border-dark-bg-mute"
                          :title="diphthong.description"
                        >
                          <span class="font-bold text-base">{{ diphthong.symbol }}</span>
                          <span class="text-xs text-gray-600 dark:text-gray-400">{{ diphthong.letter }}</span>
                        </button>
                        <button
                          type="button"
                          @click="speakIPA(diphthong.symbol, $event)"
                          class="absolute -top-1 -right-1 w-5 h-5 bg-green-500 hover:bg-green-600 text-white rounded-full flex items-center justify-center text-xs transition-all duration-200 hover:scale-110 shadow-md"
                          :title="`Pronounce ${diphthong.symbol}`"
                        >
                          <svg class="w-3 h-3" fill="currentColor" viewBox="0 0 20 20">
                            <path fill-rule="evenodd" d="M9.383 3.076A1 1 0 0110 4v12a1 1 0 01-1.617.824L4.8 13.6H2a1 1 0 01-1-1V7.4a1 1 0 011-1h2.8l3.583-3.224a1 1 0 01.617-.176zM12 5a1 1 0 011.414 0L15 6.586l1.586-1.586a1 1 0 111.414 1.414L16.414 8 18 9.586a1 1 0 01-1.414 1.414L15 9.414 13.414 11A1 1 0 0112 9.586L13.586 8 12 6.414A1 1 0 0112 5z" clip-rule="evenodd"></path>
                          </svg>
                        </button>
                      </div>
                    </div>
                  </div>

                  <!-- Consonants -->
                  <div>
                    <div class="text-sm font-medium text-gray-600 dark:text-white/70 mb-2 flex items-center">
                      <span class="w-1 h-4 bg-purple-500 rounded mr-2"></span>
                      {{ t('vocabulary.pronunciation.consonants', 'Consonants') }}
                    </div>
                    <div class="grid grid-cols-3 sm:grid-cols-4 md:grid-cols-6 gap-2">
                      <div 
                        v-for="consonant in filteredConsonants" 
                        :key="'c-'+consonant.symbol"
                        class="relative"
                      >
                        <button 
                          type="button" 
                          @click="appendIpa(consonant.symbol)" 
                          class="w-full p-2 bg-purple-100 hover:bg-purple-200 dark:bg-purple-900 dark:hover:bg-purple-800 text-gray-800 dark:text-gray-200 rounded-lg transition-all duration-200 hover:scale-105 flex flex-col items-center text-sm border border-gray-300 dark:border-dark-bg-mute"
                          :title="consonant.description"
                        >
                          <span class="font-bold text-base">{{ consonant.symbol }}</span>
                          <span class="text-xs text-gray-600 dark:text-gray-400">{{ consonant.letter }}</span>
                        </button>
                        <button
                          type="button"
                          @click="speakIPA(consonant.symbol, $event)"
                          class="absolute -top-1 -right-1 w-5 h-5 bg-green-500 hover:bg-green-600 text-white rounded-full flex items-center justify-center text-xs transition-all duration-200 hover:scale-110 shadow-md"
                          :title="`Pronounce ${consonant.symbol}`"
                        >
                          <svg class="w-3 h-3" fill="currentColor" viewBox="0 0 20 20">
                            <path fill-rule="evenodd" d="M9.383 3.076A1 1 0 0110 4v12a1 1 0 01-1.617.824L4.8 13.6H2a1 1 0 01-1-1V7.4a1 1 0 011-1h2.8l3.583-3.224a1 1 0 01.617-.176zM12 5a1 1 0 011.414 0L15 6.586l1.586-1.586a1 1 0 111.414 1.414L16.414 8 18 9.586a1 1 0 01-1.414 1.414L15 9.414 13.414 11A1 1 0 0112 9.586L13.586 8 12 6.414A1 1 0 0112 5z" clip-rule="evenodd"></path>
                          </svg>
                        </button>
                      </div>
                    </div>
                  </div>

                  <!-- Marks -->
                  <div>
                    <div class="text-sm font-medium text-gray-600 dark:text-white/70 mb-2 flex items-center">
                      <span class="w-1 h-4 bg-orange-500 rounded mr-2"></span>
                      {{ t('vocabulary.pronunciation.marks', 'Marks') }}
                    </div>
                    <div class="flex flex-wrap gap-2">
                      <button 
                        v-for="mark in IPA_MARKS" 
                        :key="'m-'+mark" 
                        type="button" 
                        @click="appendIpa(mark)" 
                        class="px-3 py-2 bg-orange-100 hover:bg-orange-200 dark:bg-orange-900 dark:hover:bg-orange-800 text-gray-800 dark:text-gray-200 rounded-lg transition-all duration-200 hover:scale-105 border border-gray-300 dark:border-dark-bg-mute font-mono"
                      >
                        {{ mark === ' ' ? t('common.space', 'Space') : mark }}
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </Transition>
      </div>
    </Transition>
  </Teleport>
</template>

<script setup lang="ts">
import { ref, watch, computed } from 'vue'
import { useI18n } from 'vue-i18n'
import { useVoiceStore } from '../../../stores/voiceStore'

interface Props {
  modelValue: boolean
  initialValue?: string
}

interface Emits {
  'update:modelValue': [value: boolean]
  'apply': [value: string]
}

const props = withDefaults(defineProps<Props>(), {
  initialValue: ''
})

const emit = defineEmits<Emits>()
const { t } = useI18n()
const { playAudio } = useVoiceStore()

// IPA Draft state
const ipaDraft = ref('')
const searchQuery = ref('')

// IPA symbol sets with corresponding letters
const IPA_VOWELS = [
  // Monophthongs (short/long where applicable)
  { symbol: 'i', letter: 'ee', description: 'Long "ee" sound as in "see"' },
  { symbol: 'iː', letter: 'ee', description: 'Long "ee" sound as in "see"' },
  { symbol: 'ɪ', letter: 'i', description: 'Short "i" sound as in "sit"' },
  { symbol: 'e', letter: 'e', description: '"e" sound as in "bed"' },
  { symbol: 'ɛ', letter: 'e', description: 'Open "e" sound as in "bet"' },
  { symbol: 'æ', letter: 'a', description: '"a" sound as in "cat"' },
  { symbol: 'u', letter: 'oo', description: 'Long "oo" sound as in "boot"' },
  { symbol: 'uː', letter: 'oo', description: 'Long "oo" sound as in "boot"' },
  { symbol: 'ʊ', letter: 'u', description: 'Short "u" sound as in "put"' },
  { symbol: 'o', letter: 'o', description: '"o" sound as in "go"' },
  { symbol: 'ɔ', letter: 'aw', description: '"aw" sound as in "saw"' },
  { symbol: 'ɒ', letter: 'o', description: 'Short "o" sound as in "lot"' },
  { symbol: 'ɑ', letter: 'a', description: '"a" sound as in "father"' },
  { symbol: 'ʌ', letter: 'u', description: '"u" sound as in "cup"' },
  { symbol: 'ɜ', letter: 'ur', description: '"ur" sound as in "bird"' },
  { symbol: 'ɜː', letter: 'ur', description: 'Long "ur" sound as in "bird"' },
  { symbol: 'ɝ', letter: 'er', description: 'R-colored "er" sound' },
  { symbol: 'ɚ', letter: 'er', description: 'Unstressed "er" sound' },
  { symbol: 'ə', letter: 'uh', description: 'Schwa - unstressed "uh" sound' }
]

const IPA_DIPHTHONGS = [
  // Common diphthongs (BrE/AmE variants included)
  { symbol: 'eɪ', letter: 'ay', description: '"ay" sound as in "day"' },
  { symbol: 'aɪ', letter: 'i', description: '"i" sound as in "my"' },
  { symbol: 'ɔɪ', letter: 'oy', description: '"oy" sound as in "boy"' },
  { symbol: 'aʊ', letter: 'ow', description: '"ow" sound as in "now"' },
  { symbol: 'əʊ', letter: 'o', description: '"o" sound as in "go" (British)' },
  { symbol: 'oʊ', letter: 'o', description: '"o" sound as in "go" (American)' },
  { symbol: 'ɪə', letter: 'ear', description: '"ear" sound as in "near"' },
  { symbol: 'eə', letter: 'air', description: '"air" sound as in "hair"' },
  { symbol: 'ʊə', letter: 'oor', description: '"oor" sound as in "poor"' }
]

const IPA_CONSONANTS = [
  // Plosives
  { symbol: 'p', letter: 'p', description: '"p" sound as in "pat"' },
  { symbol: 'b', letter: 'b', description: '"b" sound as in "bat"' },
  { symbol: 't', letter: 't', description: '"t" sound as in "tap"' },
  { symbol: 'd', letter: 'd', description: '"d" sound as in "day"' },
  { symbol: 'k', letter: 'k', description: '"k" sound as in "cat"' },
  { symbol: 'g', letter: 'g', description: '"g" sound as in "go"' },
  // Fricatives
  { symbol: 'f', letter: 'f', description: '"f" sound as in "fat"' },
  { symbol: 'v', letter: 'v', description: '"v" sound as in "vat"' },
  { symbol: 'θ', letter: 'th', description: 'Voiceless "th" as in "think"' },
  { symbol: 'ð', letter: 'th', description: 'Voiced "th" as in "this"' },
  { symbol: 's', letter: 's', description: '"s" sound as in "sat"' },
  { symbol: 'z', letter: 'z', description: '"z" sound as in "zoo"' },
  { symbol: 'ʃ', letter: 'sh', description: '"sh" sound as in "she"' },
  { symbol: 'ʒ', letter: 'zh', description: '"zh" sound as in "measure"' },
  { symbol: 'h', letter: 'h', description: '"h" sound as in "hat"' },
  // Affricates
  { symbol: 'tʃ', letter: 'ch', description: '"ch" sound as in "chair"' },
  { symbol: 'dʒ', letter: 'j', description: '"j" sound as in "jar"' },
  // Nasals
  { symbol: 'm', letter: 'm', description: '"m" sound as in "mat"' },
  { symbol: 'n', letter: 'n', description: '"n" sound as in "net"' },
  { symbol: 'ŋ', letter: 'ng', description: '"ng" sound as in "sing"' },
  // Liquids
  { symbol: 'l', letter: 'l', description: '"l" sound as in "let"' },
  { symbol: 'ɫ', letter: 'l', description: 'Dark "l" sound' },
  { symbol: 'r', letter: 'r', description: 'Rolled "r" sound' },
  { symbol: 'ɹ', letter: 'r', description: 'English "r" sound as in "red"' },
  // Glides
  { symbol: 'w', letter: 'w', description: '"w" sound as in "wet"' },
  { symbol: 'j', letter: 'y', description: '"y" sound as in "yes"' },
  // Other
  { symbol: 'ʔ', letter: '\'', description: 'Glottal stop' },
  { symbol: 'ɾ', letter: 't', description: 'Flap "t" as in "butter" (American)' },
  { symbol: 'ʍ', letter: 'wh', description: 'Voiceless "wh" as in "what"' }
]

const IPA_MARKS: string[] = ['ˈ', 'ˌ', 'ː', '.', ' ']

// Computed filtered arrays based on search
const filteredVowels = computed(() => {
  if (!searchQuery.value) return IPA_VOWELS
  const query = searchQuery.value.toLowerCase()
  return IPA_VOWELS.filter(vowel => 
    vowel.symbol.includes(query) || 
    vowel.letter.toLowerCase().includes(query) || 
    vowel.description.toLowerCase().includes(query)
  )
})

const filteredDiphthongs = computed(() => {
  if (!searchQuery.value) return IPA_DIPHTHONGS
  const query = searchQuery.value.toLowerCase()
  return IPA_DIPHTHONGS.filter(diphthong => 
    diphthong.symbol.includes(query) || 
    diphthong.letter.toLowerCase().includes(query) || 
    diphthong.description.toLowerCase().includes(query)
  )
})

const filteredConsonants = computed(() => {
  if (!searchQuery.value) return IPA_CONSONANTS
  const query = searchQuery.value.toLowerCase()
  return IPA_CONSONANTS.filter(consonant => 
    consonant.symbol.includes(query) || 
    consonant.letter.toLowerCase().includes(query) || 
    consonant.description.toLowerCase().includes(query)
  )
})

// Watch for modal open to initialize draft
watch(() => props.modelValue, (isOpen) => {
  if (isOpen) {
    ipaDraft.value = props.initialValue || ''
    searchQuery.value = ''
  }
})

// Methods
const closeModal = () => {
  emit('update:modelValue', false)
}

const appendIpa = (symbol: string) => {
  ipaDraft.value += symbol
}

const clearIpa = () => {
  ipaDraft.value = ''
}

const backspaceIpa = () => {
  if (!ipaDraft.value) return
  // Remove last character (sufficient for our symbol sets)
  ipaDraft.value = ipaDraft.value.slice(0, -1)
}

const wrapWithSlashes = () => {
  const trimmed = ipaDraft.value.trim()
  if (!trimmed) {
    ipaDraft.value = '/ /'
    return
  }
  const alreadyWrapped = trimmed.startsWith('/') && trimmed.endsWith('/')
  ipaDraft.value = alreadyWrapped ? trimmed : `/${trimmed.replace(/^\/+|\/+$/g, '')}/`
}

const applyIpa = () => {
  emit('apply', ipaDraft.value.trim())
  closeModal()
}

// Text-to-Speech function for IPA pronunciation using project voice system
const speakIPA = async (symbol: string, event: Event) => {
  event.stopPropagation() // Prevent adding the symbol when clicking voice button
  
  // Map IPA symbols to example words for better pronunciation
  const ipaToWord: Record<string, string> = {
    // Vowels
    'i': 'see',
    'iː': 'see', 
    'ɪ': 'sit',
    'e': 'bed',
    'ɛ': 'bet',
    'æ': 'cat',
    'u': 'boot',
    'uː': 'boot',
    'ʊ': 'put',
    'o': 'go',
    'ɔ': 'saw',
    'ɒ': 'lot',
    'ɑ': 'father',
    'ʌ': 'cup',
    'ɜ': 'bird',
    'ɜː': 'bird',
    'ɝ': 'bird',
    'ɚ': 'butter',
    'ə': 'about',
    
    // Diphthongs
    'eɪ': 'day',
    'aɪ': 'my',
    'ɔɪ': 'boy',
    'aʊ': 'now',
    'əʊ': 'go',
    'oʊ': 'go',
    'ɪə': 'near',
    'eə': 'hair',
    'ʊə': 'poor',
    
    // Consonants
    'p': 'pat',
    'b': 'bat',
    't': 'tap',
    'd': 'day',
    'k': 'cat',
    'g': 'go',
    'f': 'fat',
    'v': 'vat',
    'θ': 'think',
    'ð': 'this',
    's': 'sat',
    'z': 'zoo',
    'ʃ': 'she',
    'ʒ': 'measure',
    'h': 'hat',
    'tʃ': 'chair',
    'dʒ': 'jar',
    'm': 'mat',
    'n': 'net',
    'ŋ': 'sing',
    'l': 'let',
    'ɫ': 'call',
    'r': 'red',
    'ɹ': 'red',
    'w': 'wet',
    'j': 'yes',
    'ʔ': 'button',
    'ɾ': 'butter',
    'ʍ': 'what'
  }
  
  // Get example word for the symbol, fallback to symbol itself
  const textToSpeak = ipaToWord[symbol] || symbol
  
  try {
    // Use project voice system with current settings
    await playAudio(textToSpeak)
  } catch (error) {
    console.warn('Failed to play IPA pronunciation:', error)
  }
}
</script>
