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
              <div class="px-6 py-4 border-b border-gray-200 dark:border-gray-700 flex-shrink-0 bg-gradient-to-r from-blue-50 to-indigo-50 dark:from-[#0a0a0a] dark:to-[#0a0a0a]">
                <div class="flex items-center justify-between">
                  <h2 class="text-lg sm:text-xl md:text-2xl font-semibold text-gray-900 dark:text-white flex items-center space-x-2">
                    <span class="w-2 h-2 bg-blue-500 rounded-full animate-pulse"></span>
                    <span>{{ question ? t('vocabulary.questions.editQuestion', 'Edit Question') : t('vocabulary.questions.addQuestion', 'Add New Question') }}</span>
                  </h2>
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
                  <!-- Vocabulary Selection -->
                  <div class="animate-fade-in-up" style="animation-delay: 0.1s">
                    <label class="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2 flex items-center">
                      <span class="w-1 h-4 bg-blue-500 rounded mr-2"></span>
                      {{ t('vocabulary.questions.selectVocabulary', 'Select Vocabulary Word') }} <span class="text-red-500 ml-1">*</span>
                    </label>
                    <select
                      v-model="formData.vocabularyId"
                      required
                      class="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-[#0a0a0a] text-gray-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-300 hover:border-blue-400 dark:hover:border-blue-500 transform hover:scale-[1.02]"
                    >
                      <option value="">{{ t('vocabulary.questions.selectVocabularyPlaceholder', 'Choose a vocabulary word...') }}</option>
                      <option v-for="vocab in vocabularyList" :key="vocab.id" :value="vocab.id">
                        {{ vocab.word }} - {{ vocab.meaning }}
                      </option>
                    </select>
                  </div>

                  <!-- Question Type -->
                  <div class="animate-fade-in-up" style="animation-delay: 0.2s">
                    <label class="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2 flex items-center">
                      <span class="w-1 h-4 bg-green-500 rounded mr-2"></span>
                      {{ t('vocabulary.questions.questionType', 'Question Type') }} <span class="text-red-500 ml-1">*</span>
                    </label>
                    <select
                      v-model="formData.type"
                      required
                      @change="onTypeChange"
                      class="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-[#0a0a0a] text-gray-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-transparent transition-all duration-300 hover:border-green-400 dark:hover:border-green-500 transform hover:scale-[1.02]"
                    >
                      <option value="">{{ t('vocabulary.questions.selectType', 'Select question type...') }}</option>
                      <option value="multiple-choice">{{ t('vocabulary.questions.types.multipleChoice', 'Multiple Choice') }}</option>
                      <option value="fill-blank">{{ t('vocabulary.questions.types.fillBlank', 'Fill in the Blank') }}</option>
                      <option value="true-false">{{ t('vocabulary.questions.types.trueFalse', 'True/False') }}</option>
                      <option value="short-answer">{{ t('vocabulary.questions.types.shortAnswer', 'Short Answer') }}</option>
                    </select>
                  </div>

                  <!-- Question Text -->
                  <div class="animate-fade-in-up" style="animation-delay: 0.3s">
                    <label class="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2 flex items-center">
                      <span class="w-1 h-4 bg-purple-500 rounded mr-2"></span>
                      {{ t('vocabulary.questions.questionText', 'Question') }} <span class="text-red-500 ml-1">*</span>
                    </label>
                    <textarea
                      v-model="formData.question"
                      required
                      rows="3"
                      :placeholder="t('vocabulary.questions.questionPlaceholder', 'Enter your question...')"
                      class="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-[#0a0a0a] text-gray-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent transition-all duration-300 hover:border-purple-400 dark:hover:border-purple-500 transform hover:scale-[1.02] resize-none"
                    ></textarea>
                  </div>

                  <!-- Multiple Choice Options -->
                  <div v-if="formData.type === 'multiple-choice'" class="space-y-4 animate-fade-in-up" style="animation-delay: 0.4s">
                    <div class="flex items-center justify-between">
                      <label class="block text-sm font-medium text-gray-700 dark:text-gray-300 flex items-center">
                        <span class="w-1 h-4 bg-orange-500 rounded mr-2"></span>
                        {{ t('vocabulary.questions.options', 'Answer Options') }} <span class="text-red-500 ml-1">*</span>
                      </label>
                      <button
                        type="button"
                        @click="addOption"
                        class="text-blue-600 dark:text-blue-400 hover:text-blue-700 dark:hover:text-blue-300 text-sm font-medium transition-all duration-300 hover:scale-105"
                      >
                        + {{ t('vocabulary.questions.addOption', 'Add Option') }}
                      </button>
                    </div>
                    <template v-if="formData.options">
                      <div v-for="(option, index) in formData.options" :key="index" class="flex items-center space-x-3">
                      <div class="flex items-center">
                        <input
                          :id="`option-${index}`"
                          v-model="formData.correctAnswer"
                          :value="index"
                          type="radio"
                          name="correctAnswer"
                          class="w-4 h-4 text-blue-600 focus:ring-blue-500 border-gray-300 dark:border-gray-600"
                        />
                        <label :for="`option-${index}`" class="ml-2 text-sm text-gray-700 dark:text-gray-300">
                          {{ String.fromCharCode(65 + index) }}
                        </label>
                      </div>
                      <input
                        v-model="formData.options[index]"
                        type="text"
                        :placeholder="`${t('vocabulary.questions.optionPlaceholder', 'Option')} ${String.fromCharCode(65 + index)}`"
                        class="flex-1 px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-[#0a0a0a] text-gray-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-300 hover:border-blue-400 dark:hover:border-blue-500 transform hover:scale-[1.02]"
                      />
                      <button
                        v-if="formData.options && formData.options.length > 2"
                        type="button"
                        @click="removeOption(index)"
                        class="p-2 text-red-600 dark:text-red-400 hover:bg-red-50/50 dark:hover:bg-red-900/20 rounded-lg transition-all duration-300 hover:scale-110"
                      >
                        <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
                        </svg>
                      </button>
                      </div>
                    </template>
                  </div>

                  <!-- Correct Answer for Non-Multiple Choice -->
                  <div v-if="formData.type && formData.type !== 'multiple-choice'" class="animate-fade-in-up" style="animation-delay: 0.5s">
                    <label class="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2 flex items-center">
                      <span class="w-1 h-4 bg-orange-500 rounded mr-2"></span>
                      {{ t('vocabulary.questions.correctAnswer', 'Correct Answer') }} <span class="text-red-500 ml-1">*</span>
                    </label>
                    <input
                      v-if="formData.type === 'true-false'"
                      :value="formData.correctAnswer === 'true' ? t('vocabulary.questions.true', 'True') : t('vocabulary.questions.false', 'False')"
                      type="text"
                      readonly
                      class="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-gray-50/50 dark:bg-[#0a0a0a]/50 text-gray-900 dark:text-white"
                    />
                    <div v-if="formData.type === 'true-false'" class="mt-2 flex space-x-4">
                      <label class="flex items-center">
                        <input
                          v-model="formData.correctAnswer"
                          value="true"
                          type="radio"
                          name="trueFalse"
                          class="w-4 h-4 text-blue-600 focus:ring-blue-500 border-gray-300 dark:border-gray-600"
                        />
                        <span class="ml-2 text-sm text-gray-700 dark:text-gray-300">{{ t('vocabulary.questions.true', 'True') }}</span>
                      </label>
                      <label class="flex items-center">
                        <input
                          v-model="formData.correctAnswer"
                          value="false"
                          type="radio"
                          name="trueFalse"
                          class="w-4 h-4 text-blue-600 focus:ring-blue-500 border-gray-300 dark:border-gray-600"
                        />
                        <span class="ml-2 text-sm text-gray-700 dark:text-gray-300">{{ t('vocabulary.questions.false', 'False') }}</span>
                      </label>
                    </div>
                    <input
                      v-else
                      v-model="formData.correctAnswer"
                      type="text"
                      required
                      :placeholder="t('vocabulary.questions.correctAnswerPlaceholder', 'Enter the correct answer...')"
                      class="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-[#0a0a0a] text-gray-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-orange-500 focus:border-transparent transition-all duration-300 hover:border-orange-400 dark:hover:border-orange-500 transform hover:scale-[1.02]"
                    />
                  </div>

                  <!-- Difficulty -->
                  <div class="animate-fade-in-up" style="animation-delay: 0.6s">
                    <label class="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2 flex items-center">
                      <span class="w-1 h-4 bg-yellow-500 rounded mr-2"></span>
                      {{ t('vocabulary.questions.difficulty', 'Difficulty') }}
                    </label>
                    <select
                      v-model="formData.difficulty"
                      class="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-[#0a0a0a] text-gray-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-yellow-500 focus:border-transparent transition-all duration-300 hover:border-yellow-400 dark:hover:border-yellow-500 transform hover:scale-[1.02]"
                    >
                      <option value="">{{ t('vocabulary.questions.selectDifficulty', 'Select difficulty...') }}</option>
                      <option value="easy">{{ t('common.easy', 'Easy') }}</option>
                      <option value="medium">{{ t('vocabulary.questions.difficulty.medium', 'Medium') }}</option>
                      <option value="hard">{{ t('common.difficult', 'Difficult') }}</option>
                    </select>
                  </div>

                  <!-- Explanation -->
                  <div class="animate-fade-in-up" style="animation-delay: 0.7s">
                    <label class="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2 flex items-center">
                      <span class="w-1 h-4 bg-cyan-500 rounded mr-2"></span>
                      {{ t('vocabulary.questions.explanation', 'Explanation') }}
                    </label>
                    <textarea
                      v-model="formData.explanation"
                      rows="3"
                      :placeholder="t('vocabulary.questions.explanationPlaceholder', 'Optional explanation for the answer...')"
                      class="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-[#0a0a0a] text-gray-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-cyan-500 focus:border-transparent transition-all duration-300 hover:border-cyan-400 dark:hover:border-cyan-500 transform hover:scale-[1.02] resize-none"
                    ></textarea>
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
                  class="px-6 py-2 bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-700 hover:to-indigo-700 disabled:from-gray-400 disabled:to-gray-500 disabled:cursor-not-allowed text-white rounded-lg font-medium transition-all duration-300 hover:scale-105 shadow-lg hover:shadow-xl"
                >
                  {{ question ? t('common.update', 'Update') : t('common.add', 'Add') }}
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

interface Question {
  id: string
  vocabularyId: string
  vocabulary?: {
    id: string
    word: string
  }
  question: string
  type: 'multiple-choice' | 'fill-blank' | 'true-false' | 'short-answer'
  options?: string[]
  correctAnswer: string
  difficulty?: 'easy' | 'medium' | 'hard'
  explanation?: string
  createdAt: string
  updatedAt: string
}

interface Props {
  show: boolean
  question?: Question | null
  vocabularyList: Array<{ id: string; word: string; meaning: string }>
}

interface Emits {
  (e: 'close'): void
  (e: 'save', question: Partial<Question>): void
}

const props = defineProps<Props>()
const emit = defineEmits<Emits>()
const { t } = useI18n()

// Form data
const formData = ref<{
  vocabularyId: string
  question: string
  type: 'multiple-choice' | 'fill-blank' | 'true-false' | 'short-answer'
  options: string[] | undefined
  correctAnswer: string
  difficulty: 'easy' | 'medium' | 'hard' | undefined
  explanation: string
}>({
  vocabularyId: '',
  question: '',
  type: 'multiple-choice',
  options: undefined,
  correctAnswer: '',
  difficulty: undefined,
  explanation: ''
})

// Computed
const isFormValid = computed(() => {
  if (!formData.value.vocabularyId || !formData.value.question || !formData.value.type) {
    return false
  }

  if (formData.value.type === 'multiple-choice') {
    return formData.value.options?.every(opt => opt.trim()) && 
           formData.value.correctAnswer !== '' &&
           formData.value.options?.length >= 2
  }

  return formData.value.correctAnswer !== ''
})

// Methods
const resetForm = () => {
  formData.value = {
    vocabularyId: '',
    question: '',
    type: 'multiple-choice',
    options: undefined,
    correctAnswer: '',
    difficulty: undefined,
    explanation: ''
  }
}

const loadQuestion = () => {
  if (props.question) {
    formData.value = {
      vocabularyId: props.question.vocabularyId,
      question: props.question.question,
      type: props.question.type,
      options: props.question.options ? [...props.question.options] : ['', '', '', ''],
      correctAnswer: String(props.question.correctAnswer),
      difficulty: props.question.difficulty || 'easy',
      explanation: props.question.explanation || ''
    }
  } else {
    resetForm()
  }
}

const onTypeChange = () => {
  if (formData.value.type === 'multiple-choice') {
    formData.value.options = ['', '', '', '']
  } else if (formData.value.type === 'true-false') {
    formData.value.options = undefined
    formData.value.correctAnswer = 'true'
  } else {
    formData.value.options = undefined
    formData.value.correctAnswer = ''
  }
}

const addOption = () => {
  if (formData.value.options && formData.value.options.length < 6) {
    formData.value.options.push('')
  }
}

const removeOption = (index: number) => {
  if (formData.value.options && formData.value.options.length > 2) {
    formData.value.options.splice(index, 1)
    // Adjust correct answer if it was pointing to removed option
    const currentAnswerIndex = Number(formData.value.correctAnswer)
    if (currentAnswerIndex === index) {
      formData.value.correctAnswer = ''
    } else if (currentAnswerIndex > index) {
      formData.value.correctAnswer = String(currentAnswerIndex - 1)
    }
  }
}

const handleSubmit = () => {
  if (!isFormValid.value) return

  const questionData = {
    vocabularyId: formData.value.vocabularyId,
    question: formData.value.question,
    type: formData.value.type,
    correctAnswer: formData.value.correctAnswer,
    difficulty: formData.value.difficulty,
    explanation: formData.value.explanation,
    options: formData.value.type === 'multiple-choice' ? formData.value.options?.filter(opt => opt.trim()) : undefined
  }

  emit('save', questionData)
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
    loadQuestion()
    lockBodyScroll()
  } else {
    unlockBodyScroll()
  }
})

watch(() => props.question, () => {
  if (props.show) {
    loadQuestion()
  }
})

onMounted(() => {
  if (props.show) {
    loadQuestion()
    lockBodyScroll()
  }
})

onUnmounted(() => {
  unlockBodyScroll()
})

defineOptions({
  name: 'QuestionFormDialog'
})
</script>

<script lang="ts">
export default {}
</script>
