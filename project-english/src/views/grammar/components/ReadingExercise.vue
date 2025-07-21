<template>
  <div class="bg-white dark:bg-[#0a0a0a] rounded-xl shadow-lg border border-gray-200 dark:border-gray-700 p-6">
    <!-- Reading Passage -->
    <div class="mb-8">
      <div class="flex items-center justify-between mb-4">
        <h3 class="text-lg font-semibold text-gray-900 dark:text-white">
          {{ question.title || t('grammar.practice.reading.passage') }}
        </h3>
        
        <div class="flex items-center space-x-4">
          <!-- Audio button for passage -->
          <button
            v-if="question.audio"
            @click="playPassageAudio"
            class="flex items-center space-x-2 px-3 py-2 bg-blue-100 dark:bg-blue-900/30 text-blue-700 dark:text-blue-300 rounded-lg hover:bg-blue-200 dark:hover:bg-blue-900/50 transition-colors"
          >
            <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15.536 8.464a5 5 0 010 7.072m-2.036-5.036a2.5 2.5 0 010 3.536M6 10h4l4.5-4.5v9L10 10H6V8z" />
            </svg>
            <span>{{ t('grammar.practice.reading.listen') }}</span>
          </button>
          
          <!-- Reading time -->
          <div class="text-sm text-gray-500 dark:text-gray-400">
            {{ t('grammar.practice.reading.readingTime') }}: {{ formatTime(readingTime) }}
          </div>
        </div>
      </div>
      
      <!-- Passage Content -->
      <div class="bg-gray-50 dark:bg-[#0a0a0a]/50 rounded-lg p-6 max-h-96 overflow-y-auto">
        <div class="prose dark:prose-invert max-w-none">
          <div 
            v-html="formattedPassage"
            class="text-gray-800 dark:text-gray-200 leading-relaxed text-justify"
          ></div>
        </div>
      </div>
    </div>

    <!-- Questions Section -->
    <div class="space-y-6">
      <h4 class="text-lg font-semibold text-gray-900 dark:text-white border-b border-gray-200 dark:border-gray-700 pb-2">
        {{ t('grammar.practice.reading.questions') }}
      </h4>
      
      <!-- Question List -->
      <div class="space-y-6">
        <div
          v-for="(q, index) in question.questions"
          :key="index"
          class="border border-gray-200 dark:border-gray-700 rounded-lg p-4"
        >
          <div class="mb-4">
            <h5 class="font-medium text-gray-900 dark:text-white mb-2">
              {{ index + 1 }}. {{ q.question }}
            </h5>
            
            <!-- Question type specific content -->
            <div v-if="q.type === 'multiple-choice'" class="space-y-2">
              <label
                v-for="(option, optionIndex) in q.options"
                :key="optionIndex"
                :class="[
                  'flex items-start space-x-3 p-3 rounded-lg cursor-pointer transition-all',
                  userAnswers[index] === optionIndex
                    ? 'bg-blue-50 dark:bg-blue-900/30 border border-blue-300 dark:border-blue-600'
                    : 'bg-gray-50 dark:bg-gray-700/50 hover:bg-gray-100 dark:hover:bg-gray-700 border border-transparent',
                  showAnswers && optionIndex === q.correctAnswer
                    ? 'bg-green-50 dark:bg-green-900/30 border border-green-300 dark:border-green-600'
                    : '',
                  showAnswers && userAnswers[index] === optionIndex && optionIndex !== q.correctAnswer
                    ? 'bg-red-50 dark:bg-red-900/30 border border-red-300 dark:border-red-600'
                    : ''
                ]"
              >
                <input
                  type="radio"
                  :name="`question-${index}`"
                  :value="optionIndex"
                  v-model="userAnswers[index]"
                  :disabled="showAnswers"
                  class="mt-1"
                />
                <span class="text-gray-900 dark:text-white">{{ option }}</span>
                
                <!-- Answer icons -->
                <div class="ml-auto">
                  <svg
                    v-if="showAnswers && optionIndex === q.correctAnswer"
                    class="w-5 h-5 text-green-600 dark:text-green-400"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 13l4 4L19 7" />
                  </svg>
                  <svg
                    v-else-if="showAnswers && userAnswers[index] === optionIndex && optionIndex !== q.correctAnswer"
                    class="w-5 h-5 text-red-600 dark:text-red-400"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12" />
                  </svg>
                </div>
              </label>
            </div>
            
            <!-- True/False questions -->
            <div v-else-if="q.type === 'true-false'" class="space-y-2">
              <label
                v-for="option in ['true', 'false']"
                :key="option"
                :class="[
                  'flex items-center space-x-3 p-3 rounded-lg cursor-pointer transition-all',
                  userAnswers[index] === option
                    ? 'bg-blue-50 dark:bg-blue-900/30 border border-blue-300 dark:border-blue-600'
                    : 'bg-gray-50 dark:bg-gray-700/50 hover:bg-gray-100 dark:hover:bg-gray-700 border border-transparent',
                  showAnswers && option === q.correctAnswer
                    ? 'bg-green-50 dark:bg-green-900/30 border border-green-300 dark:border-green-600'
                    : '',
                  showAnswers && userAnswers[index] === option && option !== q.correctAnswer
                    ? 'bg-red-50 dark:bg-red-900/30 border border-red-300 dark:border-red-600'
                    : ''
                ]"
              >
                <input
                  type="radio"
                  :name="`question-${index}`"
                  :value="option"
                  v-model="userAnswers[index]"
                  :disabled="showAnswers"
                />
                <span class="text-gray-900 dark:text-white">
                  {{ t(`grammar.practice.reading.${option}`) }}
                </span>
              </label>
            </div>
            
            <!-- Short answer questions -->
            <div v-else-if="q.type === 'short-answer'" class="space-y-2">
              <input
                v-model="userAnswers[index]"
                :disabled="showAnswers"
                :placeholder="t('grammar.practice.reading.yourAnswer')"
                :class="[
                  'w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent',
                  showAnswers
                    ? isShortAnswerCorrect(index)
                      ? 'border-green-500 bg-green-50 dark:bg-green-900/30'
                      : 'border-red-500 bg-red-50 dark:bg-red-900/30'
                    : 'border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-700',
                  'text-gray-900 dark:text-white'
                ]"
              />
              
              <!-- Show correct answer for short answer -->
              <div v-if="showAnswers && !isShortAnswerCorrect(index)" class="text-sm text-green-600 dark:text-green-400">
                {{ t('grammar.practice.reading.correctAnswer') }}: {{ q.correctAnswer }}
              </div>
            </div>
          </div>
          
          <!-- Question explanation -->
          <div v-if="showAnswers && q.explanation" class="mt-4 p-3 bg-yellow-50 dark:bg-yellow-900/30 border border-yellow-200 dark:border-yellow-700 rounded-lg">
            <p class="text-sm text-yellow-800 dark:text-yellow-200">
              <strong>{{ t('grammar.practice.explanation') }}:</strong> {{ q.explanation }}
            </p>
          </div>
        </div>
      </div>
    </div>

    <!-- Summary -->
    <div v-if="showAnswers" class="mt-8 p-4 bg-blue-50 dark:bg-blue-900/30 border border-blue-200 dark:border-blue-700 rounded-lg">
      <div class="grid grid-cols-3 gap-4 text-center">
        <div>
          <div class="text-2xl font-bold text-blue-600 dark:text-blue-400">{{ correctAnswers }}</div>
          <div class="text-sm text-gray-600 dark:text-gray-400">{{ t('grammar.practice.reading.correct') }}</div>
        </div>
        <div>
          <div class="text-2xl font-bold text-red-600 dark:text-red-400">{{ incorrectAnswers }}</div>
          <div class="text-sm text-gray-600 dark:text-gray-400">{{ t('grammar.practice.reading.incorrect') }}</div>
        </div>
        <div>
          <div class="text-2xl font-bold text-green-600 dark:text-green-400">{{ accuracy }}%</div>
          <div class="text-sm text-gray-600 dark:text-gray-400">{{ t('grammar.practice.reading.accuracy') }}</div>
        </div>
      </div>
    </div>

    <!-- Action Buttons -->
    <div class="flex justify-between items-center mt-8">
      <div class="flex space-x-4">
        <!-- Highlight Keywords -->
        <button
          @click="toggleHighlights"
          class="flex items-center space-x-2 px-4 py-2 text-sm text-gray-600 dark:text-gray-400 hover:text-gray-800 dark:hover:text-gray-200 transition-colors"
        >
          <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M7 20l4-16m2 16l4-16M6 9h14M4 15h14" />
          </svg>
          <span>{{ showHighlights ? t('grammar.practice.reading.hideHighlights') : t('grammar.practice.reading.showHighlights') }}</span>
        </button>
        
        <!-- Reading Timer -->
        <div class="flex items-center space-x-2 text-sm text-gray-600 dark:text-gray-400">
          <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
          </svg>
          <span>{{ formatTime(readingTime) }}</span>
        </div>
      </div>

      <div class="flex space-x-4">
        <!-- Submit/Check Answers -->
        <button
          v-if="!showAnswers"
          @click="checkAnswers"
          :disabled="!hasAllAnswers"
          class="px-6 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 disabled:bg-gray-400 disabled:cursor-not-allowed transition-colors"
        >
          {{ t('grammar.practice.checkAnswer') }}
        </button>
        
        <!-- Next Question -->
        <button
          v-else
          @click="nextQuestion"
          class="px-6 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 transition-colors"
        >
          {{ questionIndex === totalQuestions - 1 ? t('grammar.practice.finish') : t('grammar.practice.next') }}
        </button>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, computed, onMounted, onUnmounted } from 'vue'
import { useI18n } from 'vue-i18n'
import { useVoiceStore } from '../../../stores/voiceStore'

const { t } = useI18n()
const { playAudio } = useVoiceStore()

// Props
interface Question {
  question: string
  type: 'multiple-choice' | 'true-false' | 'short-answer'
  options?: string[]
  correctAnswer: any
  explanation?: string
}

interface Props {
  question: {
    id: number
    title?: string
    passage: string
    questions: Question[]
    keywords?: string[]
    audio?: string
  }
  questionIndex: number
  totalQuestions: number
}

const props = defineProps<Props>()

// Emits
const emit = defineEmits<{
  answer: [answer: { isCorrect: boolean; correctAnswers: number; totalQuestions: number }]
  next: []
  complete: []
}>()

// State
const userAnswers = ref<any[]>([])
const showAnswers = ref(false)
const showHighlights = ref(false)
const readingTime = ref(0)
const timer = ref<number | null>(null)

// Computed
const formattedPassage = computed(() => {
  let passage = props.question.passage
  
  if (showHighlights.value && props.question.keywords) {
    props.question.keywords.forEach(keyword => {
      const regex = new RegExp(`\\b${keyword}\\b`, 'gi')
      passage = passage.replace(regex, `<mark class="bg-yellow-200 dark:bg-yellow-700 px-1 rounded">${keyword}</mark>`)
    })
  }
  
  return passage
})

const hasAllAnswers = computed(() => {
  if (!props.question?.questions) return false
  return userAnswers.value.length === props.question.questions.length &&
         userAnswers.value.every(answer => answer !== null && answer !== undefined && answer !== '')
})

const correctAnswers = computed(() => {
  if (!props.question?.questions) return 0
  return props.question.questions.filter((q, index) => {
    if (q.type === 'short-answer') {
      return isShortAnswerCorrect(index)
    }
    return userAnswers.value[index] === q.correctAnswer
  }).length
})

const incorrectAnswers = computed(() => {
  if (!props.question?.questions) return 0
  return props.question.questions.length - correctAnswers.value
})

const accuracy = computed(() => {
  return props.question.questions.length > 0 
    ? Math.round((correctAnswers.value / props.question.questions.length) * 100)
    : 0
})

// Methods
const isShortAnswerCorrect = (index: number) => {
  const userAnswer = userAnswers.value[index]
  const correctAnswer = props.question.questions[index].correctAnswer
  
  if (!userAnswer || !correctAnswer) return false
  
  // Simple text comparison (case insensitive, trimmed)
  return userAnswer.toLowerCase().trim() === correctAnswer.toLowerCase().trim()
}

const toggleHighlights = () => {
  showHighlights.value = !showHighlights.value
}

const checkAnswers = () => {
  if (!hasAllAnswers.value) return
  
  showAnswers.value = true
  stopTimer()
  
  const isCorrect = correctAnswers.value === props.question.questions.length
  
  emit('answer', {
    isCorrect,
    correctAnswers: correctAnswers.value,
    totalQuestions: props.question.questions.length
  })
}

const nextQuestion = () => {
  if (props.questionIndex === props.totalQuestions - 1) {
    emit('complete')
  } else {
    resetExercise()
    emit('next')
  }
}

const playPassageAudio = async () => {
  try {
    await playAudio(props.question.passage)
  } catch (error) {
    console.error('Error playing passage audio:', error)
  }
}

const resetExercise = () => {
  userAnswers.value = []
  showAnswers.value = false
  showHighlights.value = false
  readingTime.value = 0
  startTimer()
}

const startTimer = () => {
  timer.value = setInterval(() => {
    readingTime.value += 1
  }, 1000)
}

const stopTimer = () => {
  if (timer.value) {
    clearInterval(timer.value)
    timer.value = null
  }
}

const formatTime = (seconds: number) => {
  const mins = Math.floor(seconds / 60)
  const secs = seconds % 60
  return `${mins}:${secs.toString().padStart(2, '0')}`
}

// Initialize
onMounted(() => {
  // Safe guard for questions array
  if (props.question?.questions && Array.isArray(props.question.questions)) {
    userAnswers.value = new Array(props.question.questions.length).fill(null)
  } else {
    userAnswers.value = []
  }
  startTimer()
})

onUnmounted(() => {
  stopTimer()
})
</script>
