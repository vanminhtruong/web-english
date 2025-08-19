<template>
  <div class="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 dark:from-[#0a0a0a] dark:to-[#0f0f0f] relative overflow-x-hidden">
    <!-- Animated Background Elements -->
    <div class="absolute inset-0 overflow-hidden pointer-events-none z-0">
      <div class="floating-shapes">
        <div class="absolute top-20 left-10 w-64 h-64 bg-blue-300 dark:bg-blue-500 rounded-full mix-blend-multiply dark:mix-blend-normal filter blur-xl opacity-30 animate-blob"></div>
        <div class="absolute top-40 right-10 w-72 h-72 bg-purple-300 dark:bg-purple-500 rounded-full mix-blend-multiply dark:mix-blend-normal filter blur-xl opacity-30 animate-blob animation-delay-2000"></div>
        <div class="absolute -bottom-8 left-20 w-80 h-80 bg-pink-300 dark:bg-pink-500 rounded-full mix-blend-multiply dark:mix-blend-normal filter blur-xl opacity-30 animate-blob animation-delay-4000"></div>
        <div class="hidden sm:block absolute top-10 left-1/2 -translate-x-1/2 w-40 h-40 bg-cyan-300 dark:bg-cyan-500 rounded-full mix-blend-multiply dark:mix-blend-normal filter blur-xl opacity-25 animate-blob animation-delay-1000"></div>
        <div class="hidden sm:block absolute bottom-24 right-24 w-52 h-52 bg-indigo-300 dark:bg-indigo-500 rounded-full mix-blend-multiply dark:mix-blend-normal filter blur-xl opacity-25 animate-blob animation-delay-3000"></div>
      </div>
    </div>
    
    <!-- Header -->
    <div class="relative z-10 max-w-full sm:max-w-full md:max-w-full lg:max-w-7xl mx-auto px-2 xs:px-3 sm:px-4 md:px-6 lg:px-8 xl:px-10 2xl:px-12 pt-3 sm:pt-6">
      <div class="group bg-white/80 dark:bg-[#0a0a0a]/80 backdrop-blur-md shadow-xl hover:shadow-2xl rounded-2xl border border-white/20 dark:border-white/10 transition-all duration-500 hover:scale-[1.005] p-2 xs:p-3 sm:p-4 md:p-5 lg:p-6 mb-3 xs:mb-4 sm:mb-6">
        <div class="flex items-center justify-between mb-4">
          <div class="flex items-center">
            <div class="animate-pulse-slow">
              <div class="w-2.5 h-2.5 bg-gradient-to-r from-blue-400 to-indigo-500 rounded-full mr-2.5"></div>
            </div>
            <div>
              <h1 class="text-lg sm:text-xl font-bold bg-gradient-to-r from-blue-600 to-indigo-600 dark:from-blue-400 dark:to-indigo-400 bg-clip-text text-transparent mb-2">
                {{ t('vocabulary.questions.title', 'Question Manager') }}
              </h1>
              <p class="text-sm sm:text-base text-gray-600 dark:text-gray-300">
                {{ t('vocabulary.questions.description', 'Create and manage questions based on your vocabulary words') }}
              </p>
            </div>
          </div>
          <button
            @click="openCreateDialog"
            class="px-4 sm:px-6 py-2 sm:py-3 bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-700 hover:to-indigo-700 text-white rounded-lg font-medium transition-all duration-300 shadow-lg hover:shadow-xl"
          >
            {{ t('vocabulary.questions.addQuestion', 'Add New Question') }}
          </button>
        </div>
      </div>
    </div>

    <!-- Search and Filters -->
    <div class="relative z-10 max-w-full sm:max-w-full md:max-w-full lg:max-w-7xl mx-auto py-3 px-2 xs:py-4 xs:px-3 sm:py-6 sm:px-4 md:px-6 lg:px-8 xl:px-10 2xl:px-12 overflow-x-hidden">
      <div class="group bg-white/80 dark:bg-[#0a0a0a]/80 backdrop-blur-md shadow-xl hover:shadow-2xl rounded-2xl border border-white/20 dark:border-white/10 transition-all duration-500 hover:scale-[1.005] mb-3 xs:mb-4 sm:mb-6 p-2 xs:p-3 sm:p-4 md:p-5 lg:p-6">
        <div class="flex items-center mb-4">
          <div class="animate-pulse-slow">
            <div class="w-2.5 h-2.5 bg-gradient-to-r from-blue-400 to-purple-500 rounded-full mr-2.5"></div>
          </div>
          <h3 class="text-base sm:text-lg font-semibold bg-gradient-to-r from-blue-600 to-purple-600 dark:from-blue-400 dark:to-purple-400 bg-clip-text text-transparent">
            {{ t('vocabulary.filters.title', 'Filters') }}
          </h3>
        </div>
        <div class="grid grid-cols-1 md:grid-cols-3 gap-4">
          <!-- Search -->
          <div>
            <label class="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
              {{ t('vocabulary.questions.searchQuestions', 'Search questions...') }}
            </label>
            <input
              v-model="searchTerm"
              type="text"
              :placeholder="t('vocabulary.questions.searchQuestions', 'Search questions...')"
              class="w-full px-3 py-2 border border-gray-300 dark:border-dark-bg-mute rounded-lg bg-white/50 dark:bg-[#0a0a0a]/50 backdrop-blur-sm focus:ring-2 focus:ring-blue-500 focus:border-transparent text-gray-900 dark:text-white transition-all duration-300"
            />
          </div>
          
          <!-- Filter by Vocabulary -->
          <div>
            <label class="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
              {{ t('vocabulary.questions.filterByVocabulary', 'Filter by vocabulary') }}
            </label>
            <select
              v-model="selectedVocabulary"
              class="w-full px-3 py-2 border border-gray-300 dark:border-dark-bg-mute rounded-lg bg-white/50 dark:bg-[#0a0a0a]/50 backdrop-blur-sm text-gray-900 dark:text-white transition-all duration-300"
            >
              <option value="">{{ t('vocabulary.questions.allVocabulary', 'All Vocabulary') }}</option>
              <option v-for="vocab in vocabularyList" :key="vocab.id" :value="vocab.id">
                {{ vocab.word }} - {{ vocab.meaning }}
              </option>
            </select>
          </div>
          
          <!-- Filter by Type -->
          <div>
            <label class="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
              {{ t('vocabulary.questions.filterByType', 'Filter by type') }}
            </label>
            <select
              v-model="selectedType"
              class="w-full px-3 py-2 border border-gray-300 dark:border-dark-bg-mute rounded-lg bg-white/50 dark:bg-[#0a0a0a]/50 backdrop-blur-sm text-gray-900 dark:text-white transition-all duration-300"
            >
              <option value="">{{ t('vocabulary.questions.allTypes', 'All Types') }}</option>
              <option value="multiple-choice">{{ t('vocabulary.questions.multipleChoice', 'Multiple Choice') }}</option>
              <option value="fill-blank">{{ t('vocabulary.questions.fillBlank', 'Fill in the Blank') }}</option>
              <option value="true-false">{{ t('vocabulary.questions.trueFalse', 'True/False') }}</option>
              <option value="short-answer">{{ t('vocabulary.questions.shortAnswer', 'Short Answer') }}</option>
            </select>
          </div>
        </div>
      </div>
    </div>

    <!-- Questions List -->
    <div class="relative z-10 max-w-full sm:max-w-full md:max-w-full lg:max-w-7xl mx-auto py-3 px-2 xs:py-4 xs:px-3 sm:py-6 sm:px-4 md:px-6 lg:px-8 xl:px-10 2xl:px-12 overflow-x-hidden">
      <div class="group bg-white/80 dark:bg-[#0a0a0a]/80 backdrop-blur-md shadow-xl hover:shadow-2xl rounded-2xl border border-white/20 dark:border-white/10 transition-all duration-500 hover:scale-[1.005] p-2 xs:p-3 sm:p-4 md:p-5 lg:p-6">
        <div class="flex items-center mb-4">
          <div class="animate-pulse-slow">
            <div class="w-2.5 h-2.5 bg-gradient-to-r from-green-400 to-blue-500 rounded-full mr-2.5"></div>
          </div>
          <h3 class="text-base sm:text-lg font-semibold bg-gradient-to-r from-green-600 to-blue-600 dark:from-green-400 dark:to-blue-400 bg-clip-text text-transparent">
            {{ t('vocabulary.questions.title', 'Questions List') }}
          </h3>
        </div>
        
        <div class="space-y-4">
          <div v-if="filteredQuestions.length === 0" class="text-center py-8">
            <div class="animate-pulse-slow">
              <div class="w-3 h-3 bg-gradient-to-r from-gray-400 to-gray-500 rounded-full mx-auto mb-3"></div>
            </div>
            <p class="text-gray-500 dark:text-gray-400">
              {{ t('vocabulary.questions.noQuestions', 'No questions found') }}
            </p>
          </div>
          
          <div
            v-for="question in filteredQuestions"
            :key="question.id"
            class="bg-white/60 dark:bg-[#0a0a0a]/60 backdrop-blur-sm rounded-xl border border-white/20 dark:border-white/10 p-3 sm:p-4 md:p-5 hover:shadow-lg transition-all duration-300 hover:scale-[1.002]"
          >
            <div class="flex items-start justify-between">
              <div class="flex-1">
                <div class="flex items-center gap-3 mb-3">
                  <span class="px-2 py-1 text-xs font-medium rounded-full" :class="getTypeColorClass(question.type)">
                    {{ getTypeLabel(question.type) }}
                  </span>
                  <span v-if="question.difficulty" class="px-2 py-1 text-xs font-medium rounded-full" :class="getDifficultyColorClass(question.difficulty)">
                    {{ getDifficultyLabel(question.difficulty) }}
                  </span>
                  <span v-if="question.vocabulary" class="text-sm text-gray-600 dark:text-gray-400">
                    {{ question.vocabulary.word }}
                  </span>
                </div>
                
                <h3 class="text-lg font-semibold text-gray-900 dark:text-white mb-2">
                  {{ question.question }}
                </h3>
                
                <div v-if="question.options && question.type === 'multiple-choice'" class="mb-3">
                  <div class="grid grid-cols-1 sm:grid-cols-2 gap-2">
                    <div
                      v-for="(option, index) in question.options"
                      :key="index"
                      class="px-3 py-2 bg-white/50 dark:bg-[#0a0a0a]/50 backdrop-blur-sm rounded border border-gray-200 dark:border-white/10"
                      :class="{ 'border-green-500 bg-green-50/50 dark:bg-green-900/20': index === Number(question.correctAnswer) }"
                    >
                      {{ option }}
                    </div>
                  </div>
                </div>
                
                <div v-else class="mb-3">
                  <p class="text-sm text-gray-600 dark:text-gray-400">
                    <strong>{{ t('vocabulary.questions.correctAnswer', 'Correct Answer') }}:</strong>
                    <span class="ml-2 px-2 py-1 bg-green-50/50 dark:bg-green-900/20 text-green-700 dark:text-green-400 rounded">
                      {{ question.correctAnswer }}
                    </span>
                  </p>
                </div>
                
                <div v-if="question.explanation" class="mb-3">
                  <p class="text-sm text-gray-600 dark:text-gray-400">
                    <strong>{{ t('vocabulary.questions.explanation', 'Explanation') }}:</strong>
                    {{ question.explanation }}
                  </p>
                </div>
                
                <p class="text-xs text-gray-500 dark:text-gray-400">
                  {{ t('vocabulary.questions.createdAt', 'Created At') }}: {{ formatDate(question.createdAt) }}
                </p>
              </div>
              
              <div class="flex items-center gap-2 ml-4">
                <button
                  @click="editQuestion(question)"
                  class="px-3 py-2 text-blue-600 hover:text-blue-700 hover:bg-blue-50/50 dark:text-blue-400 dark:hover:text-blue-300 dark:hover:bg-blue-900/20 rounded-lg transition-all duration-300"
                >
                  {{ t('common.edit', 'Edit') }}
                </button>
                <button
                  @click="deleteQuestion(question)"
                  class="px-3 py-2 text-red-600 hover:text-red-700 hover:bg-red-50/50 dark:text-red-400 dark:hover:text-red-300 dark:hover:bg-red-900/20 rounded-lg transition-all duration-300"
                >
                  {{ t('common.delete', 'Delete') }}
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>

    <!-- Create/Edit Question Dialog -->
    <QuestionFormDialog
      v-if="showCreateDialog || showEditDialog"
      :show="showCreateDialog || showEditDialog"
      :question="currentQuestion"
      :vocabulary-list="vocabularyList"
      @close="closeDialog"
      @save="saveQuestion"
    />
  </div>
</template>

<script setup lang="ts">
import { ref, computed, onMounted, defineAsyncComponent } from 'vue'
import { useI18n } from 'vue-i18n'
import { useVocabularyStore } from '../../composables/useVocabularyStore'

const QuestionFormDialog = defineAsyncComponent(() => import('./components/QuestionFormDialog.vue'))

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

const { t } = useI18n()
const vocabularyStore = useVocabularyStore()

// State
const questions = ref<Question[]>([])
const showCreateDialog = ref(false)
const showEditDialog = ref(false)
const currentQuestion = ref<Question | null>(null)
const searchTerm = ref('')
const selectedVocabulary = ref('')
const selectedType = ref('')

// Computed
const vocabularyList = computed(() => vocabularyStore.allVocabularies.value.map(v => ({ id: v.id.toString(), word: v.word, meaning: v.meaning })))

const filteredQuestions = computed(() => {
  let filtered = questions.value

  if (searchTerm.value) {
    const term = searchTerm.value.toLowerCase()
    filtered = filtered.filter(q => 
      q.question.toLowerCase().includes(term) ||
      q.vocabulary?.word.toLowerCase().includes(term)
    )
  }

  if (selectedVocabulary.value) {
    filtered = filtered.filter(q => q.vocabularyId === selectedVocabulary.value)
  }

  if (selectedType.value) {
    filtered = filtered.filter(q => q.type === selectedType.value)
  }

  return filtered
})

// Methods
const loadQuestions = () => {
  const stored = localStorage.getItem('vocabulary-questions')
  if (stored) {
    questions.value = JSON.parse(stored)
    // Populate vocabulary info
    questions.value.forEach(question => {
      const vocab = vocabularyList.value.find(v => v.id === question.vocabularyId)
      if (vocab) {
        question.vocabulary = { id: vocab.id, word: vocab.word }
      }
    })
  }
}

const saveQuestionsToStorage = () => {
  localStorage.setItem('vocabulary-questions', JSON.stringify(questions.value))
}

const editQuestion = (question: Question) => {
  currentQuestion.value = { ...question }
  showEditDialog.value = true
}

const deleteQuestion = (question: Question) => {
  if (confirm(t('vocabulary.questions.confirmDelete', 'Are you sure you want to delete this question?'))) {
    questions.value = questions.value.filter(q => q.id !== question.id)
    saveQuestionsToStorage()
  }
}

const saveQuestion = (questionData: Partial<Question>) => {
  if (currentQuestion.value && showEditDialog.value) {
    // Update existing question
    const index = questions.value.findIndex(q => q.id === currentQuestion.value!.id)
    if (index !== -1) {
      questions.value[index] = {
        ...questions.value[index],
        vocabularyId: questionData.vocabularyId || questions.value[index].vocabularyId,
        question: questionData.question || questions.value[index].question,
        type: questionData.type || questions.value[index].type,
        options: questionData.options || questions.value[index].options,
        correctAnswer: questionData.correctAnswer || questions.value[index].correctAnswer,
        difficulty: questionData.difficulty || questions.value[index].difficulty,
        explanation: questionData.explanation || questions.value[index].explanation,
        updatedAt: new Date().toISOString()
      }
      // Update vocabulary info
      const vocab = vocabularyList.value.find(v => v.id === questions.value[index].vocabularyId)
      if (vocab) {
        questions.value[index].vocabulary = { id: vocab.id, word: vocab.word }
      }
    }
  } else {
    // Create new question
    const newQuestion: Question = {
      id: Date.now().toString(),
      vocabularyId: questionData.vocabularyId!,
      question: questionData.question!,
      type: questionData.type!,
      options: questionData.options,
      correctAnswer: questionData.correctAnswer!,
      difficulty: questionData.difficulty || 'medium',
      explanation: questionData.explanation,
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString()
    }
    // Add vocabulary info
    const vocab = vocabularyList.value.find(v => v.id === newQuestion.vocabularyId)
    if (vocab) {
      newQuestion.vocabulary = { id: vocab.id, word: vocab.word }
    }
    questions.value.push(newQuestion)
  }
  
  saveQuestionsToStorage()
  closeDialog()
}

const openCreateDialog = () => {
  currentQuestion.value = null
  showCreateDialog.value = true
}

const closeDialog = () => {
  showCreateDialog.value = false
  showEditDialog.value = false
  currentQuestion.value = null
}

const getTypeLabel = (type: string) => {
  const labels = {
    'multiple-choice': t('vocabulary.questions.types.multipleChoice', 'Multiple Choice'),
    'fill-blank': t('vocabulary.questions.types.fillBlank', 'Fill in the Blank'),
    'true-false': t('vocabulary.questions.types.trueFalse', 'True/False'),
    'short-answer': t('vocabulary.questions.types.shortAnswer', 'Short Answer')
  }
  return labels[type as keyof typeof labels] || type
}

const getTypeColorClass = (type: string) => {
  const classes = {
    'multiple-choice': 'bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-300',
    'fill-blank': 'bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-300',
    'true-false': 'bg-yellow-100 text-yellow-800 dark:bg-yellow-900 dark:text-yellow-300',
    'short-answer': 'bg-purple-100 text-purple-800 dark:bg-purple-900 dark:text-purple-300'
  }
  return classes[type as keyof typeof classes] || 'bg-gray-100 text-gray-800 dark:bg-gray-700 dark:text-gray-300'
}

const getDifficultyLabel = (difficulty: string | undefined) => {
  if (!difficulty) return ''
  
  const labels = {
    'easy': t('common.easy', 'Easy'),
    'medium': t('vocabulary.questions.difficulty.medium', 'Medium'),
    'hard': t('common.difficult', 'Difficult')
  }
  return labels[difficulty as keyof typeof labels] || difficulty
}

const getTypeClass = getTypeColorClass

const getDifficultyClass = (difficulty: string) => {
  const classes = {
    'easy': 'bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-300',
    'medium': 'bg-yellow-100 text-yellow-800 dark:bg-yellow-900 dark:text-yellow-300',
    'hard': 'bg-red-100 text-red-800 dark:bg-red-900 dark:text-red-300'
  }
  return classes[difficulty as keyof typeof classes] || 'bg-gray-100 text-gray-800 dark:bg-gray-700 dark:text-gray-300'
}

const getDifficultyColorClass = (difficulty: string) => {
  const classes = {
    'easy': 'text-green-600 dark:text-green-400',
    'medium': 'text-yellow-600 dark:text-yellow-400',
    'hard': 'text-red-600 dark:text-red-400'
  }
  return classes[difficulty as keyof typeof classes] || 'text-gray-600 dark:text-gray-400'
}

const formatDate = (dateString: string) => {
  return new Date(dateString).toLocaleDateString()
}

onMounted(() => {
  loadQuestions()
})
</script>
