<template>
  <div class="bg-white dark:bg-[#0a0a0a] rounded-xl shadow-lg border border-gray-200 dark:border-gray-700 p-6">
    <!-- Writing Prompt -->
    <div class="mb-8">
      <h3 class="text-lg font-semibold text-gray-900 dark:text-white mb-4">
        {{ t('grammar.practice.exercises.writing.instruction') }}
      </h3>
      
      <!-- Task Description -->
      <div class="bg-blue-50 dark:bg-blue-900/30 border border-blue-200 dark:border-blue-700 rounded-lg p-4 mb-6">
        <div class="flex items-start space-x-3">
          <div class="w-6 h-6 bg-blue-600 rounded-full flex items-center justify-center flex-shrink-0 mt-1">
            <svg class="w-4 h-4 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
            </svg>
          </div>
          <div>
            <h4 class="font-medium text-blue-800 dark:text-blue-200 mb-2">
              {{ question.taskType === 'essay' ? t('grammar.practice.exercises.writing.essay') : 
                 question.taskType === 'email' ? t('grammar.practice.exercises.writing.email') :
                 question.taskType === 'letter' ? t('grammar.practice.exercises.writing.letter') :
                 t('grammar.practice.exercises.writing.paragraph') }}
            </h4>
            <p class="text-blue-700 dark:text-blue-300 text-sm">
              {{ question.prompt }}
            </p>
          </div>
        </div>
      </div>
      
      <!-- Requirements -->
      <div v-if="question.requirements && question.requirements.length > 0" class="mb-6">
        <h4 class="text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
          {{ t('grammar.practice.exercises.writing.requirements') }}
        </h4>
        <ul class="space-y-1">
          <li 
            v-for="requirement in question.requirements" 
            :key="requirement"
            class="flex items-start space-x-2 text-sm text-gray-600 dark:text-gray-400"
          >
            <svg class="w-4 h-4 text-green-600 dark:text-green-400 mt-0.5 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 13l4 4L19 7" />
            </svg>
            <span>{{ requirement }}</span>
          </li>
        </ul>
      </div>
      
      <!-- Word/Time Limits -->
      <div class="flex items-center space-x-6 text-sm text-gray-600 dark:text-gray-400 mb-4">
        <div v-if="question.minWords" class="flex items-center space-x-1">
          <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
          </svg>
          <span>{{ t('grammar.practice.exercises.writing.minWords') }}: {{ question.minWords }}</span>
        </div>
        <div v-if="question.timeLimit" class="flex items-center space-x-1">
          <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
          </svg>
          <span>{{ t('grammar.practice.exercises.writing.timeLimit') }}: {{ question.timeLimit }} {{ t('common.minutes') }}</span>
        </div>
      </div>
    </div>

    <!-- Writing Area -->
    <div class="mb-6">
      <div class="flex items-center justify-between mb-4">
        <h4 class="text-lg font-medium text-gray-900 dark:text-white">
          {{ t('grammar.practice.exercises.writing.yourResponse') }}
        </h4>
        
        <!-- Stats -->
        <div class="flex items-center space-x-4 text-sm">
          <div class="flex items-center space-x-1">
            <span class="text-gray-500 dark:text-gray-400">{{ t('grammar.practice.exercises.writing.words') }}:</span>
            <span 
              :class="[
                'font-medium',
                wordCount >= (question.minWords || 0) ? 'text-green-600 dark:text-green-400' : 'text-orange-600 dark:text-orange-400'
              ]"
            >
              {{ wordCount }}
            </span>
            <span v-if="question.minWords" class="text-gray-400 dark:text-gray-500">
              / {{ question.minWords }}
            </span>
          </div>
          
          <div v-if="question.timeLimit" class="flex items-center space-x-1">
            <span class="text-gray-500 dark:text-gray-400">{{ t('grammar.practice.exercises.writing.timeLeft') }}:</span>
            <span 
              :class="[
                'font-medium font-mono',
                timeRemaining <= 300 ? 'text-red-600 dark:text-red-400' : 'text-blue-600 dark:text-blue-400'
              ]"
            >
              {{ formatTime(timeRemaining) }}
            </span>
          </div>
        </div>
      </div>
      
      <!-- Text Area -->
      <textarea
        v-model="userText"
        :disabled="timeExpired || isSubmitted"
        :placeholder="getPlaceholderText()"
        class="w-full h-80 px-4 py-3 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent bg-white dark:bg-gray-700 text-gray-900 dark:text-white resize-none disabled:bg-gray-100 dark:disabled:bg-gray-800 disabled:cursor-not-allowed"
        @input="updateWordCount"
      ></textarea>
      
      <!-- Tips -->
      <div class="mt-4 text-sm text-gray-600 dark:text-gray-400">
        <button
          @click="showTips = !showTips"
          class="flex items-center space-x-1 hover:text-gray-800 dark:hover:text-gray-200 transition-colors"
        >
          <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9.663 17h4.673M12 3v1m6.364 1.636l-.707.707M21 12h-1M4 12H3m3.343-5.657l-.707-.707m2.828 9.9a5 5 0 117.072 0l-.548.547A3.374 3.374 0 0014 18.469V19a2 2 0 11-4 0v-.531c0-.895-.356-1.754-.988-2.386l-.548-.547z" />
          </svg>
          <span>{{ t('grammar.practice.exercises.writing.tips') }}</span>
        </button>
        
        <div v-if="showTips" class="mt-2 p-3 bg-yellow-50 dark:bg-yellow-900/30 border border-yellow-200 dark:border-yellow-700 rounded-lg">
          <ul class="space-y-1">
            <li v-for="tip in writingTips" :key="tip" class="text-yellow-800 dark:text-yellow-200">
              • {{ tip }}
            </li>
          </ul>
        </div>
      </div>
    </div>

    <!-- AI Feedback (if submitted) -->
    <div v-if="isSubmitted && feedback" class="mb-6">
      <h4 class="text-lg font-medium text-gray-900 dark:text-white mb-4">
        {{ t('grammar.practice.exercises.writing.feedback') }}
      </h4>
      
      <!-- Overall Score -->
      <div class="bg-gradient-to-r from-blue-50 to-purple-50 dark:from-blue-900/30 dark:to-purple-900/30 border border-blue-200 dark:border-blue-700 rounded-lg p-4 mb-4">
        <div class="flex items-center justify-between">
          <h5 class="font-medium text-gray-900 dark:text-white">
            {{ t('grammar.practice.exercises.writing.overallScore') }}
          </h5>
          <div class="text-2xl font-bold text-blue-600 dark:text-blue-400">
            {{ feedback.overallScore }}/100
          </div>
        </div>
        
        <!-- Score breakdown -->
        <div class="grid grid-cols-2 md:grid-cols-4 gap-4 mt-4">
          <div class="text-center">
            <div class="text-lg font-semibold text-gray-900 dark:text-white">{{ feedback.grammar }}</div>
            <div class="text-xs text-gray-600 dark:text-gray-400">{{ t('grammar.practice.exercises.writing.grammar') }}</div>
          </div>
          <div class="text-center">
            <div class="text-lg font-semibold text-gray-900 dark:text-white">{{ feedback.vocabulary }}</div>
            <div class="text-xs text-gray-600 dark:text-gray-400">{{ t('grammar.practice.exercises.writing.vocabulary') }}</div>
          </div>
          <div class="text-center">
            <div class="text-lg font-semibold text-gray-900 dark:text-white">{{ feedback.coherence }}</div>
            <div class="text-xs text-gray-600 dark:text-gray-400">{{ t('grammar.practice.exercises.writing.coherence') }}</div>
          </div>
          <div class="text-center">
            <div class="text-lg font-semibold text-gray-900 dark:text-white">{{ feedback.taskResponse }}</div>
            <div class="text-xs text-gray-600 dark:text-gray-400">{{ t('grammar.practice.exercises.writing.taskResponse') }}</div>
          </div>
        </div>
      </div>
      
      <!-- Detailed Feedback -->
      <div class="space-y-4">
        <!-- Strengths -->
        <div v-if="feedback.strengths.length > 0" class="p-4 bg-green-50 dark:bg-green-900/30 border border-green-200 dark:border-green-700 rounded-lg">
          <h6 class="font-medium text-green-800 dark:text-green-200 mb-2">
            {{ t('grammar.practice.exercises.writing.strengths') }}
          </h6>
          <ul class="space-y-1">
            <li v-for="strength in feedback.strengths" :key="strength" class="text-green-700 dark:text-green-300 text-sm">
              ✓ {{ strength }}
            </li>
          </ul>
        </div>
        
        <!-- Areas for Improvement -->
        <div v-if="feedback.improvements.length > 0" class="p-4 bg-orange-50 dark:bg-orange-900/30 border border-orange-200 dark:border-orange-700 rounded-lg">
          <h6 class="font-medium text-orange-800 dark:text-orange-200 mb-2">
            {{ t('grammar.practice.exercises.writing.improvements') }}
          </h6>
          <ul class="space-y-1">
            <li v-for="improvement in feedback.improvements" :key="improvement" class="text-orange-700 dark:text-orange-300 text-sm">
              → {{ improvement }}
            </li>
          </ul>
        </div>
        
        <!-- Specific Corrections -->
        <div v-if="feedback.corrections.length > 0" class="p-4 bg-red-50 dark:bg-red-900/30 border border-red-200 dark:border-red-700 rounded-lg">
          <h6 class="font-medium text-red-800 dark:text-red-200 mb-2">
            {{ t('grammar.practice.exercises.writing.corrections') }}
          </h6>
          <div class="space-y-2">
            <div v-for="correction in feedback.corrections" :key="correction.original" class="text-sm">
              <div class="text-red-700 dark:text-red-300">
                ❌ {{ correction.original }}
              </div>
              <div class="text-green-700 dark:text-green-300">
                ✅ {{ correction.corrected }}
              </div>
              <div v-if="correction.explanation" class="text-gray-600 dark:text-gray-400 text-xs mt-1">
                {{ correction.explanation }}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>

    <!-- Action Buttons -->
    <div class="flex justify-between items-center">
      <div class="flex space-x-4">
        <!-- Save Draft -->
        <button
          v-if="!isSubmitted && userText.trim()"
          @click="saveDraft"
          class="flex items-center space-x-2 px-4 py-2 text-sm text-gray-600 dark:text-gray-400 hover:text-gray-800 dark:hover:text-gray-200 transition-colors"
        >
          <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M8 7H5a2 2 0 00-2 2v9a2 2 0 002 2h14a2 2 0 002-2V9a2 2 0 00-2-2h-3m-1 4l-3-3m0 0l-3 3m3-3v12" />
          </svg>
          <span>{{ t('grammar.practice.exercises.writing.saveDraft') }}</span>
        </button>
        
        <!-- Clear -->
        <button
          v-if="!isSubmitted && userText.trim()"
          @click="clearText"
          class="flex items-center space-x-2 px-4 py-2 text-sm text-red-600 dark:text-red-400 hover:text-red-700 dark:hover:text-red-300 transition-colors"
        >
          <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
          </svg>
          <span>{{ t('grammar.practice.exercises.writing.clear') }}</span>
        </button>
      </div>

      <div class="flex space-x-4">
        <!-- Submit for Review -->
        <button
          v-if="!isSubmitted"
          @click="submitForReview"
          :disabled="!canSubmit"
          class="px-6 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 disabled:bg-gray-400 disabled:cursor-not-allowed transition-colors"
        >
          {{ isAnalyzing ? t('grammar.practice.exercises.writing.analyzing') : t('grammar.practice.exercises.writing.submit') }}
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

const { t } = useI18n()

// Props
interface Props {
  question: {
    id: number
    taskType: 'essay' | 'email' | 'letter' | 'paragraph'
    prompt: string
    requirements?: string[]
    minWords?: number
    timeLimit?: number // in minutes
  }
  questionIndex: number
  totalQuestions: number
}

const props = defineProps<Props>()

// Emits
const emit = defineEmits<{
  answer: [answer: { isCorrect: boolean; score: number; text: string }]
  next: []
  complete: []
}>()

// State
const userText = ref('')
const wordCount = ref(0)
const timeRemaining = ref(0)
const timeExpired = ref(false)
const isSubmitted = ref(false)
const isAnalyzing = ref(false)
const showTips = ref(false)
const timer = ref<number | null>(null)

const feedback = ref<{
  overallScore: number
  grammar: number
  vocabulary: number
  coherence: number
  taskResponse: number
  strengths: string[]
  improvements: string[]
  corrections: Array<{
    original: string
    corrected: string
    explanation?: string
  }>
} | null>(null)

// Computed
const canSubmit = computed(() => {
  return userText.value.trim().length > 0 && 
         wordCount.value >= (props.question.minWords || 0) &&
         !timeExpired.value &&
         !isAnalyzing.value
})

const writingTips = computed(() => {
  const tips = [
    t('grammar.practice.exercises.writing.tip1'),
    t('grammar.practice.exercises.writing.tip2'),
    t('grammar.practice.exercises.writing.tip3'),
    t('grammar.practice.exercises.writing.tip4'),
    t('grammar.practice.exercises.writing.tip5')
  ]
  return tips
})

// Methods
const updateWordCount = () => {
  wordCount.value = userText.value.trim().split(/\s+/).filter(word => word.length > 0).length
}

const getPlaceholderText = () => {
  switch (props.question.taskType) {
    case 'essay':
      return t('grammar.practice.exercises.writing.essayPlaceholder')
    case 'email':
      return t('grammar.practice.exercises.writing.emailPlaceholder')
    case 'letter':
      return t('grammar.practice.exercises.writing.letterPlaceholder')
    default:
      return t('grammar.practice.exercises.writing.paragraphPlaceholder')
  }
}

const startTimer = () => {
  if (props.question.timeLimit) {
    timeRemaining.value = props.question.timeLimit * 60 // Convert to seconds
    timer.value = setInterval(() => {
      timeRemaining.value--
      if (timeRemaining.value <= 0) {
        timeExpired.value = true
        stopTimer()
        if (!isSubmitted.value) {
          submitForReview()
        }
      }
    }, 1000)
  }
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

const saveDraft = () => {
  // Save to localStorage
  const draftKey = `writing-draft-${props.question.id}`
  localStorage.setItem(draftKey, userText.value)
  
  // Show toast notification (you might want to implement a toast system)
  console.log('Draft saved!')
}

const clearText = () => {
  if (confirm(t('grammar.practice.exercises.writing.confirmClear'))) {
    userText.value = ''
    wordCount.value = 0
  }
}

const submitForReview = async () => {
  isAnalyzing.value = true
  stopTimer()
  
  try {
    // Simulate AI analysis (in real app, call AI service)
    await new Promise(resolve => setTimeout(resolve, 3000))
    
    // Mock feedback generation
    const mockFeedback = {
      overallScore: Math.floor(Math.random() * 30) + 70, // 70-100
      grammar: Math.floor(Math.random() * 30) + 70,
      vocabulary: Math.floor(Math.random() * 30) + 70,
      coherence: Math.floor(Math.random() * 30) + 70,
      taskResponse: Math.floor(Math.random() * 30) + 70,
      strengths: [
        'Good use of complex sentence structures',
        'Clear organization of ideas',
        'Appropriate vocabulary for the task'
      ],
      improvements: [
        'Work on paragraph transitions',
        'Use more varied sentence beginnings',
        'Expand on supporting details'
      ],
      corrections: [
        {
          original: 'This is very good',
          corrected: 'This is excellent',
          explanation: 'Use more precise adjectives for better impact'
        }
      ]
    }
    
    feedback.value = mockFeedback
    isSubmitted.value = true
    
    const score = mockFeedback.overallScore
    emit('answer', {
      isCorrect: score >= 70,
      score,
      text: userText.value
    })
    
  } catch (error) {
    console.error('Error analyzing writing:', error)
  } finally {
    isAnalyzing.value = false
  }
}

const nextQuestion = () => {
  if (props.questionIndex === props.totalQuestions - 1) {
    emit('complete')
  } else {
    resetExercise()
    emit('next')
  }
}

const resetExercise = () => {
  userText.value = ''
  wordCount.value = 0
  timeExpired.value = false
  isSubmitted.value = false
  isAnalyzing.value = false
  showTips.value = false
  feedback.value = null
  stopTimer()
  startTimer()
}

const loadDraft = () => {
  const draftKey = `writing-draft-${props.question.id}`
  const draft = localStorage.getItem(draftKey)
  if (draft) {
    userText.value = draft
    updateWordCount()
  }
}

// Initialize
onMounted(() => {
  startTimer()
  loadDraft()
})

onUnmounted(() => {
  stopTimer()
})
</script>
