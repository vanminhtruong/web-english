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
        v-if="show" 
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
                  <div>
                    <h2 class="text-lg sm:text-xl md:text-2xl font-semibold text-gray-900 dark:text-white flex items-center space-x-2">
                      <span class="w-2 h-2 bg-green-500 rounded-full animate-pulse"></span>
                      <span>{{ example ? t('vocabulary.examples.editExample', 'Edit Example') : t('vocabulary.examples.addExample', 'Add New Example') }}</span>
                    </h2>
                    <div v-if="selectedVocab" class="mt-2 flex items-center space-x-2 text-sm text-gray-600 dark:text-gray-300">
                      <span class="font-medium text-green-600 dark:text-green-400">{{ t('common.vocabulary', 'Vocabulary') }}:</span>
                      <span class="font-semibold">{{ selectedVocab.word }}</span>
                      <span class="text-gray-400">•</span>
                      <span>{{ selectedVocab.meaning }}</span>
                    </div>
                  </div>
                  <button 
                    @click="$emit('close')"
                    class="text-gray-400 hover:text-gray-600 dark:hover:text-gray-200 transition-all duration-300 hover:scale-110 hover:rotate-90 p-1 rounded-full hover:bg-gray-100 dark:hover:bg-gray-800"
                  >
                    <svg class="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12"></path>
                    </svg>
                  </button>
                </div>
              </div>

              <!-- Form -->
              <div class="px-6 py-4 flex-1 overflow-y-auto min-h-0">
                <form @submit.prevent="handleSubmit" class="space-y-6">

                  <!-- Example Type -->
                  <div class="animate-fade-in-up" style="animation-delay: 0.2s">
                    <label class="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2 flex items-center">
                      <span class="w-1 h-4 bg-blue-500 rounded mr-2"></span>
                      {{ t('vocabulary.examples.exampleType', 'Example Type') }} <span class="text-red-500 ml-1">*</span>
                    </label>
                    <select
                      v-model="formData.type"
                      required
                      class="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-[#0a0a0a] text-gray-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-300 hover:border-blue-400 dark:hover:border-blue-500 transform hover:scale-[1.02]"
                    >
                      <option value="">{{ t('vocabulary.examples.selectType', 'Select example type...') }}</option>
                      <option value="sentence">{{ t('vocabulary.examples.types.sentence', 'Sentence') }}</option>
                      <option value="dialogue">{{ t('vocabulary.examples.types.dialogue', 'Dialogue') }}</option>
                      <option value="phrase">{{ t('vocabulary.examples.types.phrase', 'Phrase') }}</option>
                      <option value="context">{{ t('vocabulary.examples.types.context', 'Context') }}</option>
                    </select>
                  </div>

                  <!-- Title -->
                  <div class="animate-fade-in-up" style="animation-delay: 0.3s">
                    <label class="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2 flex items-center">
                      <span class="w-1 h-4 bg-purple-500 rounded mr-2"></span>
                      {{ t('common.title', 'Title') }} <span class="text-red-500 ml-1">*</span>
                    </label>
                    <input
                      v-model="formData.title"
                      type="text"
                      required
                      :placeholder="t('vocabulary.examples.titlePlaceholder', 'Brief title for this example...')"
                      class="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-[#0a0a0a] text-gray-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent transition-all duration-300 hover:border-purple-400 dark:hover:border-purple-500 transform hover:scale-[1.02]"
                    />
                  </div>

                  <!-- Content -->
                  <div class="animate-fade-in-up" style="animation-delay: 0.4s">
                    <label class="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2 flex items-center">
                      <span class="w-1 h-4 bg-orange-500 rounded mr-2"></span>
                      {{ t('vocabulary.examples.content', 'Example Content') }} <span class="text-red-500 ml-1">*</span>
                    </label>
                    <textarea
                      v-model="formData.content"
                      required
                      rows="4"
                      :placeholder="t('vocabulary.examples.contentPlaceholder', 'Enter the example sentence or dialogue...')"
                      class="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-[#0a0a0a] text-gray-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-orange-500 focus:border-transparent transition-all duration-300 hover:border-orange-400 dark:hover:border-orange-500 transform hover:scale-[1.02] resize-none"
                    ></textarea>
                  </div>

                  <!-- Translation -->
                  <div class="animate-fade-in-up" style="animation-delay: 0.5s">
                    <label class="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2 flex items-center">
                      <span class="w-1 h-4 bg-yellow-500 rounded mr-2"></span>
                      {{ t('vocabulary.examples.translation', 'Translation') }}
                    </label>
                    <textarea
                      v-model="formData.translation"
                      rows="2"
                      :placeholder="t('vocabulary.examples.translationPlaceholder', 'Optional translation in your native language...')"
                      class="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-[#0a0a0a] text-gray-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-yellow-500 focus:border-transparent transition-all duration-300 hover:border-yellow-400 dark:hover:border-yellow-500 transform hover:scale-[1.02] resize-none"
                    ></textarea>
                  </div>

                  <!-- Context -->
                  <div class="animate-fade-in-up" style="animation-delay: 0.6s">
                    <label class="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2 flex items-center">
                      <span class="w-1 h-4 bg-cyan-500 rounded mr-2"></span>
                      {{ t('vocabulary.examples.context', 'Context') }}
                    </label>
                    <textarea
                      v-model="formData.context"
                      rows="2"
                      :placeholder="t('vocabulary.examples.contextPlaceholder', 'Optional context or situation where this example is used...')"
                      class="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-[#0a0a0a] text-gray-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-cyan-500 focus:border-transparent transition-all duration-300 hover:border-cyan-400 dark:hover:border-cyan-500 transform hover:scale-[1.02] resize-none"
                    ></textarea>
                  </div>

                  <!-- Difficulty -->
                  <div class="animate-fade-in-up" style="animation-delay: 0.7s">
                    <label class="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2 flex items-center">
                      <span class="w-1 h-4 bg-pink-500 rounded mr-2"></span>
                      {{ t('vocabulary.examples.difficulty', 'Difficulty') }}
                    </label>
                    <select
                      v-model="formData.difficulty"
                      class="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-[#0a0a0a] text-gray-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-pink-500 focus:border-transparent transition-all duration-300 hover:border-pink-400 dark:hover:border-pink-500 transform hover:scale-[1.02]"
                    >
                      <option value="">{{ t('vocabulary.examples.selectDifficulty', 'Select difficulty...') }}</option>
                      <option value="easy">{{ t('common.easy', 'Easy') }}</option>
                      <option value="medium">{{ t('vocabulary.examples.difficulty.medium', 'Medium') }}</option>
                      <option value="hard">{{ t('common.difficult', 'Difficult') }}</option>
                    </select>
                  </div>

                  <!-- Tags -->
                  <div class="animate-fade-in-up" style="animation-delay: 0.8s">
                    <label class="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2 flex items-center">
                      <span class="w-1 h-4 bg-indigo-500 rounded mr-2"></span>
                      {{ t('vocabulary.examples.tags', 'Tags') }}
                    </label>
                    <div class="space-y-3">
                      <input
                        v-model="tagInput"
                        type="text"
                        :placeholder="t('vocabulary.examples.tagsPlaceholder', 'Enter tags separated by commas...')"
                        @keydown.enter.prevent="addTagFromInput"
                        class="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-[#0a0a0a] text-gray-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent transition-all duration-300 hover:border-indigo-400 dark:hover:border-indigo-500 transform hover:scale-[1.02]"
                      />
                      <div v-if="formData.tags && formData.tags.length > 0" class="flex flex-wrap gap-2">
                        <span
                          v-for="(tag, index) in formData.tags"
                          :key="index"
                          class="inline-flex items-center px-3 py-1 rounded-full text-sm bg-green-100/50 text-green-800 dark:bg-green-900/20 dark:text-green-300 backdrop-blur-sm"
                        >
                          {{ tag }}
                          <button
                            type="button"
                            @click="removeTag(index)"
                            class="ml-2 text-green-600 dark:text-green-400 hover:text-green-800 dark:hover:text-green-200 transition-all duration-300 hover:scale-110"
                          >
                            <svg class="w-3 h-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12" />
                            </svg>
                          </button>
                        </span>
                      </div>
                    </div>
                  </div>
                </form>
              </div>

              <!-- Footer -->
              <div class="flex items-center justify-end space-x-3 p-6 border-t border-gray-200 dark:border-gray-700 bg-gradient-to-r from-gray-50 to-white dark:from-[#0a0a0a] dark:to-[#0a0a0a] flex-shrink-0">
                <button
                  @click="$emit('close')"
                  type="button"
                  class="px-4 py-2 text-gray-700 dark:text-gray-300 bg-white/50 dark:bg-[#0a0a0a]/50 hover:bg-gray-100/50 dark:hover:bg-[#0a0a0a]/70 border border-gray-300 dark:border-gray-600 rounded-lg font-medium transition-all duration-300 hover:scale-105 shadow-md hover:shadow-lg"
                >
                  {{ t('common.cancel', 'Cancel') }}
                </button>
                <button
                  @click="handleSubmit"
                  type="submit"
                  :disabled="!isFormValid"
                  class="px-6 py-2 bg-gradient-to-r from-green-600 to-emerald-600 hover:from-green-700 hover:to-emerald-700 disabled:from-gray-400 disabled:to-gray-500 disabled:cursor-not-allowed text-white rounded-lg font-medium transition-all duration-300 hover:scale-105 shadow-lg hover:shadow-xl"
                >
                  {{ example ? t('common.update', 'Update') : t('common.add', 'Add') }}
                </button>
              </div>
            </div>
          </div>
        </Transition>
      </div>
    </Transition>
  </div>
</template>

<script setup lang="ts">
import { ref, computed, watch, onMounted, onUnmounted } from 'vue'
import { useI18n } from 'vue-i18n'

interface Example {
  id?: string
  vocabularyId: string
  title: string
  content: string
  translation?: string
  context?: string
  type: 'sentence' | 'dialogue' | 'phrase' | 'context'
  difficulty?: 'easy' | 'medium' | 'hard'
  tags?: string[]
}

interface Props {
  show: boolean
  example?: Example | null
  vocabularyId?: string
  vocabularyList: Array<{ id: string; word: string; meaning: string }>
}

interface Emits {
  (e: 'close'): void
  (e: 'save', example: Example): void
}

const props = defineProps<Props>()
const emit = defineEmits<Emits>()
const { t } = useI18n()

// Form data
const formData = ref<Example>({
  vocabularyId: '',
  title: '',
  content: '',
  translation: '',
  context: '',
  type: 'sentence',
  difficulty: 'easy',
  tags: []
})

const tagInput = ref('')

// Computed
const selectedVocab = computed(() => {
  return props.vocabularyList.find(v => v.id === formData.value.vocabularyId)
})

const isFormValid = computed(() => {
  return formData.value.vocabularyId && 
         formData.value.title.trim() && 
         formData.value.content.trim() &&
         formData.value.type
})

// Methods
const resetForm = () => {
  formData.value = {
    vocabularyId: props.vocabularyId || '',
    title: '',
    content: '',
    translation: '',
    context: '',
    type: 'sentence',
    difficulty: 'easy',
    tags: []
  }
  tagInput.value = ''
}

const loadExample = () => {
  if (props.example) {
    formData.value = {
      ...props.example,
      tags: props.example.tags ? [...props.example.tags] : []
    }
  } else {
    resetForm()
    // Set vocabularyId from props if provided
    if (props.vocabularyId) {
      formData.value.vocabularyId = props.vocabularyId
    }
  }
}

const addTagFromInput = () => {
  if (tagInput.value.trim()) {
    const newTags = tagInput.value
      .split(',')
      .map(tag => tag.trim())
      .filter(tag => tag && !formData.value.tags?.includes(tag))
    
    if (newTags.length > 0) {
      formData.value.tags = [...(formData.value.tags || []), ...newTags]
      tagInput.value = ''
    }
  }
}

const removeTag = (index: number) => {
  if (formData.value.tags) {
    formData.value.tags.splice(index, 1)
  }
}

const handleSubmit = () => {
  if (!isFormValid.value) return

  const exampleData: Example = {
    ...formData.value,
    tags: formData.value.tags?.filter(tag => tag.trim()) || []
  }

  emit('save', exampleData)
}

const lockBodyScroll = () => {
  document.body.style.overflow = 'hidden'
}

const unlockBodyScroll = () => {
  document.body.style.overflow = ''
}

// Watchers
watch(() => props.show, (newShow) => {
  if (newShow) {
    loadExample()
    lockBodyScroll()
  } else {
    unlockBodyScroll()
  }
})

watch(() => props.example, () => {
  if (props.show) {
    loadExample()
  }
})

watch(() => props.vocabularyId, () => {
  if (props.show && !props.example) {
    formData.value.vocabularyId = props.vocabularyId || ''
  }
})

onMounted(() => {
  if (props.show) {
    loadExample()
    lockBodyScroll()
  }
})

onUnmounted(() => {
  unlockBodyScroll()
})

defineOptions({
  name: 'ExampleFormDialog'
})
</script>

<script lang="ts">
export default {}
</script>
