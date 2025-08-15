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
          <div class="w-full max-w-2xl">
            <div class="bg-white dark:bg-dark-bg-soft shadow-2xl rounded-xl border border-gray-200 dark:border-dark-bg-mute overflow-hidden transform" @click.stop>
              <!-- Header -->
              <div class="px-5 py-4 border-b border-gray-200 dark:border-dark-bg-mute bg-gradient-to-r from-blue-50 to-indigo-50 dark:from-dark-bg-soft dark:to-dark-bg-soft flex items-center justify-between">
                <h3 class="text-lg font-semibold text-gray-900 dark:text-white flex items-center space-x-2">
                  <span class="w-2 h-2 bg-blue-500 rounded-full animate-pulse"></span>
                  <span>{{ t('vocabulary.pronunciation.ipaPickerTitle', 'IPA Picker') }}</span>
                </h3>
                <button
                  type="button"
                  @click="closeModal"
                  class="text-gray-400 hover:text-gray-600 dark:hover:text-gray-200 transition-all duration-300 hover:scale-110 hover:rotate-90 p-1 rounded-full hover:bg-gray-100 dark:hover:bg-gray-800"
                  :title="t('common.close', 'Close')"
                  :aria-label="t('common.close', 'Close')"
                >
                  <svg class="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12"></path>
                  </svg>
                </button>
              </div>

              <!-- Body -->
              <div class="px-5 py-4 space-y-4">
                <!-- Preview -->
                <div class="p-3 rounded-lg border border-gray-200 dark:border-dark-bg-mute bg-white dark:bg-gray-custom">
                  <div class="text-2xl md:text-3xl font-mono text-gray-900 dark:text-white break-words min-h-[2.5rem]">
                    {{ ipaDraft || t('vocabulary.pronunciation.previewPlaceholder', 'Start building IPA...') }}
                  </div>
                </div>

                <!-- Quick controls -->
                <div class="flex flex-wrap gap-2">
                  <button
                    type="button"
                    @click="wrapWithSlashes"
                    class="px-3 py-1.5 rounded-lg border border-gray-300 dark:border-dark-bg-mute text-gray-800 dark:text-white dark:bg-gray-custom hover:bg-gray-100 dark:hover:bg-gray-custom"
                    :title="t('vocabulary.pronunciation.wrap', 'Wrap with slashes')"
                    :aria-label="t('vocabulary.pronunciation.wrap', 'Wrap with slashes')"
                  >
                    /.../
                  </button>
                  <button
                    type="button"
                    @click="backspaceIpa"
                    class="px-3 py-1.5 rounded-lg border border-gray-300 dark:border-dark-bg-mute text-gray-800 dark:text-white dark:bg-gray-custom hover:bg-gray-100 dark:hover:bg-gray-custom"
                    :title="t('common.backspace', 'Backspace')"
                    :aria-label="t('common.backspace', 'Backspace')"
                  >
                    {{ t('common.backspace', 'Backspace') }}
                  </button>
                  <button
                    type="button"
                    @click="clearIpa"
                    class="px-3 py-1.5 rounded-lg border border-gray-300 dark:border-dark-bg-mute text-gray-800 dark:text-white dark:bg-gray-custom hover:bg-gray-100 dark:hover:bg-gray-custom"
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
                    <div class="text-sm font-medium text-gray-600 dark:text-white/70 mb-2">{{ t('vocabulary.pronunciation.vowels', 'Vowels') }}</div>
                    <div class="flex flex-wrap gap-2">
                      <button v-for="s in IPA_VOWELS" :key="'v-'+s" type="button" @click="appendIpa(s)" class="px-2.5 py-1.5 rounded-md border border-gray-300 dark:border-dark-bg-mute text-gray-900 dark:text-white dark:bg-gray-custom hover:bg-gray-100 dark:hover:bg-gray-custom">
                        {{ s }}
                      </button>
                    </div>
                  </div>

                  <!-- Diphthongs -->
                  <div>
                    <div class="text-sm font-medium text-gray-600 dark:text-white/70 mb-2">{{ t('vocabulary.pronunciation.diphthongs', 'Diphthongs') }}</div>
                    <div class="flex flex-wrap gap-2">
                      <button v-for="s in IPA_DIPHTHONGS" :key="'d-'+s" type="button" @click="appendIpa(s)" class="px-2.5 py-1.5 rounded-md border border-gray-300 dark:border-dark-bg-mute text-gray-900 dark:text-white dark:bg-gray-custom hover:bg-gray-100 dark:hover:bg-gray-custom">
                        {{ s }}
                      </button>
                    </div>
                  </div>

                  <!-- Consonants -->
                  <div>
                    <div class="text-sm font-medium text-gray-600 dark:text-white/70 mb-2">{{ t('vocabulary.pronunciation.consonants', 'Consonants') }}</div>
                    <div class="flex flex-wrap gap-2">
                      <button v-for="s in IPA_CONSONANTS" :key="'c-'+s" type="button" @click="appendIpa(s)" class="px-2.5 py-1.5 rounded-md border border-gray-300 dark:border-dark-bg-mute text-gray-900 dark:text-white dark:bg-gray-custom hover:bg-gray-100 dark:hover:bg-gray-custom">
                        {{ s }}
                      </button>
                    </div>
                  </div>

                  <!-- Marks -->
                  <div>
                    <div class="text-sm font-medium text-gray-600 dark:text-white/70 mb-2">{{ t('vocabulary.pronunciation.marks', 'Marks') }}</div>
                    <div class="flex flex-wrap gap-2">
                      <button v-for="s in IPA_MARKS" :key="'m-'+s" type="button" @click="appendIpa(s)" class="px-2.5 py-1.5 rounded-md border border-gray-300 dark:border-dark-bg-mute text-gray-900 dark:text-white dark:bg-gray-custom hover:bg-gray-100 dark:hover:bg-gray-custom">
                        {{ s === ' ' ? t('common.space', 'Space') : s }}
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
import { ref, watch } from 'vue'
import { useI18n } from 'vue-i18n'

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

// IPA Draft state
const ipaDraft = ref('')

// IPA symbol sets
const IPA_VOWELS: string[] = [
  // Monophthongs (short/long where applicable)
  'i', 'iː', 'ɪ',
  'e', 'ɛ', 'æ',
  'u', 'uː', 'ʊ',
  'o', 'ɔ', 'ɒ', 'ɑ',
  'ʌ', 'ɜ', 'ɜː', 'ɝ', 'ɚ', 'ə'
]

const IPA_DIPHTHONGS: string[] = [
  // Common diphthongs (BrE/AmE variants included)
  'eɪ', 'aɪ', 'ɔɪ', 'aʊ', 'əʊ', 'oʊ', 'ɪə', 'eə', 'ʊə'
]

const IPA_CONSONANTS: string[] = [
  // Plosives
  'p', 'b', 't', 'd', 'k', 'g',
  // Fricatives
  'f', 'v', 'θ', 'ð', 's', 'z', 'ʃ', 'ʒ', 'h',
  // Affricates
  'tʃ', 'dʒ',
  // Nasals
  'm', 'n', 'ŋ',
  // Liquids
  'l', 'ɫ', 'r', 'ɹ',
  // Glides
  'w', 'j',
  // Other
  'ʔ', 'ɾ', 'ʍ'
]

const IPA_MARKS: string[] = ['ˈ', 'ˌ', 'ː', '.', ' ']

// Watch for modal open to initialize draft
watch(() => props.modelValue, (isOpen) => {
  if (isOpen) {
    ipaDraft.value = props.initialValue || ''
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
</script>
