<template>
  <div class="min-h-screen bg-gradient-to-br from-purple-50 to-pink-100 dark:from-gray-900 dark:to-[#0a0a0a]">
    <!-- Header -->
    <QuizHeader 
      :time-remaining="timeRemaining"
      :score="score"
      @go-back="goBack"
    />

    <!-- Progress Bar -->
    <QuizProgress 
      :current-question-index="currentQuestionIndex"
      :total-questions="questions.length"
      :progress-percentage="progressPercentage"
    />

    <!-- Quiz Content -->
    <div class="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <!-- Quiz Setup -->
      <QuizSetup 
        v-if="!quizStarted"
        :settings="quizSettings"
        :available-levels="availableLevels"
        @start-quiz="startQuiz"
      />

      <!-- Quiz Questions -->
      <QuizQuestion
        v-else-if="!quizCompleted"
        :question="currentQuestion"
        :selected-answer="selectedAnswer"
        :is-first-question="currentQuestionIndex === 0"
        :is-last-question="currentQuestionIndex === questions.length - 1"
        @select-answer="selectAnswer"
        @previous-question="previousQuestion"
        @next-question="nextQuestion"
      />

      <!-- Quiz Results -->
      <QuizResults
        v-else
        :score="score"
        :correct-answers="correctAnswers"
        :total-questions="questions.length"
        :accuracy="Math.round(accuracy)"
        :questions="questions"
        :user-answers="userAnswers"
        @restart-quiz="restartQuiz"
        @go-back="goBack"
      />
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, computed, onMounted, onUnmounted, defineAsyncComponent, watch } from 'vue'
import { useRouter } from 'vue-router'
import { loadComponentSafely } from '../../utils/import-helper'
import { useVocabularyStore } from '../../composables/useVocabularyStore'
import type { Vocabulary } from '../../composables/useVocabularyStore'

// Sử dụng defineAsyncComponent để import components an toàn
const QuizHeader = defineAsyncComponent(
  loadComponentSafely(() => import('./components/QuizHeader.vue'))
)
const QuizProgress = defineAsyncComponent(
  loadComponentSafely(() => import('./components/QuizProgress.vue'))
)
const QuizSetup = defineAsyncComponent(
  loadComponentSafely(() => import('./components/QuizSetup.vue'))
)
const QuizQuestion = defineAsyncComponent(
  loadComponentSafely(() => import('./components/QuizQuestion.vue'))
)
const QuizResults = defineAsyncComponent(
  loadComponentSafely(() => import('./components/QuizResults.vue'))
)

const router = useRouter()
const vocabularyStore = useVocabularyStore()

// Data
const quizStarted = ref(false)
const quizCompleted = ref(false)
const currentQuestionIndex = ref(0)
const selectedAnswer = ref<number | null>(null)
const userAnswers = ref<number[]>([])
const score = ref(0)
const timeRemaining = ref(0)
let timer: number | null = null

const quizSettings = ref({
  type: 'vocabulary',
  level: '',
  questionCount: '10',
  timeLimit: '10'
})

// Question interface
interface Question {
  id: number
  type: string
  level: string
  question: string
  options: string[]
  correctAnswer: number
  explanation: string
}

const questions = ref<Question[]>([])

// Function to generate questions from vocabulary data
const generateQuestionsFromVocabulary = (vocabularies: Vocabulary[]): Question[] => {
  console.log('Generating questions from', vocabularies.length, 'vocabularies')
  if (vocabularies.length === 0) return []
  
  const vocabQuestions = vocabularies.map((vocab, index) => {
    // Create incorrect options by mixing meanings from other vocabularies
    const otherVocabs = vocabularies.filter(v => v.id !== vocab.id)
    let incorrectOptions: string[] = []
    
    if (otherVocabs.length > 0) {
      incorrectOptions = otherVocabs
        .slice(0, 3)
        .map(v => v.meaning.split(' - ')[0]) // Take first part of meaning
    }
    
    // If we don't have enough other vocabularies, add some generic options
    const genericOptions = ['Không có nghĩa', 'Từ khác', 'Khái niệm khác', 'Nghĩa khác', 'Ý nghĩa khác']
    while (incorrectOptions.length < 3) {
      const randomGeneric = genericOptions[Math.floor(Math.random() * genericOptions.length)]
      if (!incorrectOptions.includes(randomGeneric)) {
        incorrectOptions.push(randomGeneric)
      }
    }
    
    const correctMeaning = vocab.meaning.split(' - ')[0] // Take first part of meaning
    const allOptions = [correctMeaning, ...incorrectOptions.slice(0, 3)]
    
    // Shuffle options
    const shuffledOptions = allOptions.sort(() => Math.random() - 0.5)
    const correctAnswer = shuffledOptions.indexOf(correctMeaning)
    
    return {
      id: vocab.id,
      type: 'vocabulary',
      level: vocab.level,
      question: `What does "${vocab.word}" mean?`,
      options: shuffledOptions,
      correctAnswer,
      explanation: `"${vocab.word}" có nghĩa là: ${vocab.meaning}`
    }
  })
  
  // Shuffle questions and limit to quiz settings
  return vocabQuestions.sort(() => Math.random() - 0.5)
}

// Function to update questions based on current vocabulary data
const updateQuestions = () => {
  const vocabularies = vocabularyStore.allVocabularies.value
  console.log('Updating questions from', vocabularies.length, 'total vocabularies')
  
  const filteredVocabs = vocabularies.filter(vocab => {
    // Filter based on quiz settings if needed
    if (quizSettings.value.level && vocab.level !== quizSettings.value.level) {
      return false
    }
    return true
  })
  
  console.log('Filtered to', filteredVocabs.length, 'vocabularies for quiz')
  
  const generatedQuestions = generateQuestionsFromVocabulary(filteredVocabs)
  const questionCount = parseInt(quizSettings.value.questionCount)
  questions.value = generatedQuestions.slice(0, questionCount)
  
  console.log('Generated', questions.value.length, 'questions')
}

// Get available levels from vocabulary store
const availableLevels = computed(() => {
  return vocabularyStore.getLevels.value
})

// Computed
const currentQuestion = computed(() => questions.value[currentQuestionIndex.value] || {})
const progressPercentage = computed(() => ((currentQuestionIndex.value + 1) / questions.value.length) * 100)
const correctAnswers = computed(() => {
  return userAnswers.value.filter((answer, index) => answer === questions.value[index].correctAnswer).length
})
const accuracy = computed(() => (correctAnswers.value / questions.value.length) * 100)

// Methods
const startQuiz = (settings?: any) => {
  // Update settings if provided
  if (settings) {
    quizSettings.value = { ...settings }
  }
  // Ensure we have questions before starting
  if (questions.value.length === 0) {
    updateQuestions()
  }
  
  // If still no questions, show alert
  if (questions.value.length === 0) {
    alert('Không có từ vựng nào để luyện tập. Vui lòng thêm từ vựng trước!')
    return
  }
  
  quizStarted.value = true
  
  // Set timer if time limit is specified
  if (quizSettings.value.timeLimit !== '0') {
    timeRemaining.value = parseInt(quizSettings.value.timeLimit) * 60
    startTimer()
  }
  
  // Initialize user answers array
  userAnswers.value = new Array(questions.value.length).fill(-1)
}

const startTimer = () => {
  timer = setInterval(() => {
    timeRemaining.value--
    if (timeRemaining.value <= 0) {
      completeQuiz()
    }
  }, 1000)
}

const selectAnswer = (index: number) => {
  selectedAnswer.value = index
}

const nextQuestion = () => {
  if (selectedAnswer.value !== null) {
    userAnswers.value[currentQuestionIndex.value] = selectedAnswer.value
    
    if (currentQuestionIndex.value === questions.value.length - 1) {
      completeQuiz()
    } else {
      currentQuestionIndex.value++
      selectedAnswer.value = userAnswers.value[currentQuestionIndex.value] !== -1 
        ? userAnswers.value[currentQuestionIndex.value] 
        : null
    }
  }
}

const previousQuestion = () => {
  if (currentQuestionIndex.value > 0) {
    userAnswers.value[currentQuestionIndex.value] = selectedAnswer.value || -1
    currentQuestionIndex.value--
    selectedAnswer.value = userAnswers.value[currentQuestionIndex.value] !== -1 
      ? userAnswers.value[currentQuestionIndex.value] 
      : null
  }
}

const completeQuiz = () => {
  if (selectedAnswer.value !== null) {
    userAnswers.value[currentQuestionIndex.value] = selectedAnswer.value
  }
  
  // Calculate score
  score.value = correctAnswers.value * 10
  
  quizCompleted.value = true
  
  if (timer) {
    clearInterval(timer)
  }
}

const restartQuiz = () => {
  quizStarted.value = false
  quizCompleted.value = false
  currentQuestionIndex.value = 0
  selectedAnswer.value = null
  userAnswers.value = []
  score.value = 0
  timeRemaining.value = 0
  
  // Update questions to get fresh data
  updateQuestions()
  
  if (timer) {
    clearInterval(timer)
  }
}

const goBack = () => {
  router.back()
}

const formatTime = (seconds: number) => {
  const minutes = Math.floor(seconds / 60)
  const remainingSeconds = seconds % 60
  return `${minutes}:${remainingSeconds.toString().padStart(2, '0')}`
}

const getLevelColor = (level: string) => {
  switch (level) {
    case 'beginner': return 'bg-green-100 text-green-800'
    case 'intermediate': return 'bg-yellow-100 text-yellow-800'
    case 'advanced': return 'bg-red-100 text-red-800'
    default: return 'bg-gray-100 text-gray-800'
  }
}

const getLevelText = (level: string) => {
  switch (level) {
    case 'beginner': return 'Cơ bản'
    case 'intermediate': return 'Trung cấp'
    case 'advanced': return 'Nâng cao'
    default: return level
  }
}

onMounted(async () => {
  // Initialize vocabulary store
  const isReady = vocabularyStore.initializeStore()
  
  // Wait for store to be ready
  if (!isReady.value) {
    await new Promise(resolve => 
      watch(isReady, (ready) => {
        if (ready) resolve(true)
      }, { immediate: true })
    )
  }
  
  // Load quiz questions based on settings
  updateQuestions()
  
  console.log('Quiz view mounted', vocabularyStore.allVocabularies.value.length, 'vocabularies loaded')
})

// Watch for store ready state and vocabulary changes
watch(
  () => vocabularyStore.isStoreReady.value,
  (isReady) => {
    if (isReady) {
      updateQuestions()
    }
  },
  { immediate: true }
)

// Watch for changes in vocabulary store and update questions
watch(
  () => vocabularyStore.allVocabularies.value,
  () => {
    if (vocabularyStore.isStoreReady.value) {
      updateQuestions()
    }
  },
  { deep: true }
)

// Watch for changes in quiz settings and update questions
watch(
  () => quizSettings.value,
  () => {
    updateQuestions()
  },
  { deep: true }
)

onUnmounted(() => {
  if (timer) {
    clearInterval(timer)
  }
})
</script>
