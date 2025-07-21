<template>
  <div class="bg-white dark:bg-[#0a0a0a] rounded-xl shadow-lg border border-gray-200 dark:border-gray-700 p-6">
    <!-- Question -->
    <div class="mb-6">
      <h3 class="text-lg font-semibold text-gray-900 dark:text-white mb-4">
        {{ t('grammar.practice.fillBlank.instruction') }}
      </h3>
      
      <!-- Sentence with blanks -->
      <div class="bg-gray-50 dark:bg-[#0a0a0a]/50 rounded-lg p-4 mb-4">
        <div class="text-lg leading-relaxed text-gray-900 dark:text-white">
          <span v-for="(part, index) in sentenceParts" :key="index">
            <span v-if="part.type === 'text'">{{ part.content }}</span>
            <input
              v-else-if="part.type === 'blank'"
              v-model="userAnswers[part.index]"
              :class="[
                'inline-block mx-1 px-3 py-1 border-b-2 bg-transparent text-center min-w-20 focus:outline-none transition-colors',
                showAnswer
                  ? isAnswerCorrect(part.index)
                    ? 'border-green-500 text-green-600 dark:text-green-400'
                    : 'border-red-500 text-red-600 dark:text-red-400'
                  : 'border-blue-500 focus:border-blue-600'
              ]"
              :placeholder="`(${part.index + 1})`"
              :disabled="showAnswer"
            />
          </span>
        </div>
      </div>

      <!-- Word Bank (if provided) -->
      <div v-if="question.wordBank && question.wordBank.length > 0" class="mb-4">
        <h4 class="text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
          {{ t('grammar.practice.fillBlank.wordBank') }}
        </h4>
        <div class="flex flex-wrap gap-2">
          <button
            v-for="word in question.wordBank"
            :key="word"
            @click="insertWord(word)"
            :disabled="showAnswer"
            class="px-3 py-1 bg-blue-100 dark:bg-blue-900/30 text-blue-700 dark:text-blue-300 rounded-lg hover:bg-blue-200 dark:hover:bg-blue-900/50 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
          >
            {{ word }}
          </button>
        </div>
      </div>

      <!-- Audio for sentence -->
      <div v-if="question.audio" class="mb-4">
        <button
          @click="playSentenceAudio"
          class="flex items-center space-x-2 px-4 py-2 bg-blue-100 dark:bg-blue-900/30 text-blue-700 dark:text-blue-300 rounded-lg hover:bg-blue-200 dark:hover:bg-blue-900/50 transition-colors"
        >
          <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15.536 8.464a5 5 0 010 7.072m-2.036-5.036a2.5 2.5 0 010 3.536M6 10h4l4.5-4.5v9L10 10H6V8z" />
          </svg>
          <span>{{ t('grammar.practice.playAudio') }}</span>
        </button>
      </div>
    </div>

    <!-- Answer Feedback -->
    <div v-if="showAnswer" class="mb-6 space-y-4">
      <!-- Correct Answers -->
      <div class="p-4 bg-green-50 dark:bg-green-900/30 border border-green-200 dark:border-green-700 rounded-lg">
        <h4 class="font-medium text-green-800 dark:text-green-200 mb-2">
          {{ t('grammar.practice.correctAnswers') }}
        </h4>
        <div class="text-lg leading-relaxed text-green-700 dark:text-green-300">
          <span v-for="(part, index) in sentenceParts" :key="`correct-${index}`">
            <span v-if="part.type === 'text'">{{ part.content }}</span>
            <span 
              v-else-if="part.type === 'blank'"
              class="inline-block mx-1 px-2 py-1 bg-green-100 dark:bg-green-800 rounded border font-medium"
            >
              {{ question.correctAnswers[part.index] }}
            </span>
          </span>
        </div>
      </div>

      <!-- Your Answers (if different) -->
      <div v-if="hasIncorrectAnswers" class="p-4 bg-red-50 dark:bg-red-900/30 border border-red-200 dark:border-red-700 rounded-lg">
        <h4 class="font-medium text-red-800 dark:text-red-200 mb-2">
          {{ t('grammar.practice.yourAnswers') }}
        </h4>
        <div class="text-lg leading-relaxed text-red-700 dark:text-red-300">
          <span v-for="(part, index) in sentenceParts" :key="`user-${index}`">
            <span v-if="part.type === 'text'">{{ part.content }}</span>
            <span 
              v-else-if="part.type === 'blank'"
              :class="[
                'inline-block mx-1 px-2 py-1 rounded border font-medium',
                isAnswerCorrect(part.index)
                  ? 'bg-green-100 dark:bg-green-800 text-green-700 dark:text-green-300'
                  : 'bg-red-100 dark:bg-red-800 text-red-700 dark:text-red-300'
              ]"
            >
              {{ userAnswers[part.index] || '(empty)' }}
            </span>
          </span>
        </div>
      </div>
    </div>

    <!-- Explanation -->
    <div v-if="showAnswer && question.explanation" class="mb-6 p-4 bg-yellow-50 dark:bg-yellow-900/30 border border-yellow-200 dark:border-yellow-700 rounded-lg">
      <h4 class="font-medium text-yellow-800 dark:text-yellow-200 mb-2">
        {{ t('grammar.practice.explanation') }}
      </h4>
      <p class="text-yellow-700 dark:text-yellow-300 text-sm">
        {{ question.explanation }}
      </p>
    </div>

    <!-- Action Buttons -->
    <div class="flex justify-between items-center">
      <div class="flex items-center space-x-4">
        <!-- Hint button -->
        <button
          v-if="!showAnswer && question.hint"
          @click="showHint = !showHint"
          class="flex items-center space-x-2 px-4 py-2 text-sm text-gray-600 dark:text-gray-400 hover:text-gray-800 dark:hover:text-gray-200 transition-colors"
        >
          <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9.663 17h4.673M12 3v1m6.364 1.636l-.707.707M21 12h-1M4 12H3m3.343-5.657l-.707-.707m2.828 9.9a5 5 0 117.072 0l-.548.547A3.374 3.374 0 0014 18.469V19a2 2 0 11-4 0v-.531c0-.895-.356-1.754-.988-2.386l-.548-.547z" />
          </svg>
          <span>{{ t('grammar.practice.hint') }}</span>
        </button>
        
        <!-- Hint content -->
        <div v-if="showHint && question.hint" class="text-sm text-blue-600 dark:text-blue-400">
          💡 {{ question.hint }}
        </div>
        
        <!-- Clear button -->
        <button
          v-if="!showAnswer"
          @click="clearAnswers"
          class="flex items-center space-x-2 px-4 py-2 text-sm text-gray-600 dark:text-gray-400 hover:text-gray-800 dark:hover:text-gray-200 transition-colors"
        >
          <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
          </svg>
          <span>{{ t('grammar.practice.clear') }}</span>
        </button>
      </div>

      <div class="flex space-x-4">
        <!-- Submit/Check Answer -->
        <button
          v-if="!showAnswer"
          @click="checkAnswer"
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
import { ref, computed, watch } from 'vue'
import { useI18n } from 'vue-i18n'
import { useVoiceStore } from '../../../stores/voiceStore'

const { t } = useI18n()
const { playAudio } = useVoiceStore()

// Props
interface Props {
  question: {
    id: number
    sentence: string
    correctAnswers: string[]
    wordBank?: string[]
    explanation?: string
    hint?: string
    audio?: string
  }
  questionIndex: number
  totalQuestions: number
}

const props = defineProps<Props>()

// Emits
const emit = defineEmits<{
  answer: [answer: { isCorrect: boolean; userAnswer: string[]; correctAnswer: string[] }]
  next: []
  complete: []
}>()

// State
const userAnswers = ref<string[]>([])
const showAnswer = ref(false)
const showHint = ref(false)
const focusedBlankIndex = ref<number | null>(null)

// Computed
const sentenceParts = computed(() => {
  if (!props.question?.sentence) return []
  
  const parts = []
  const regex = /___+/g
  let lastIndex = 0
  let match
  let blankIndex = 0

  while ((match = regex.exec(props.question.sentence)) !== null) {
    // Add text before the blank
    if (match.index > lastIndex) {
      parts.push({
        type: 'text',
        content: props.question.sentence.slice(lastIndex, match.index)
      })
    }
    
    // Add the blank
    parts.push({
      type: 'blank',
      index: blankIndex++
    })
    
    lastIndex = regex.lastIndex
  }
  
  // Add remaining text
  if (lastIndex < props.question.sentence.length) {
    parts.push({
      type: 'text',
      content: props.question.sentence.slice(lastIndex)
    })
  }
  
  return parts
})

const hasAllAnswers = computed(() => {
  if (!props.question?.correctAnswers) return false
  return userAnswers.value.length === props.question.correctAnswers.length &&
         userAnswers.value.every(answer => answer && answer.trim() !== '')
})

const hasIncorrectAnswers = computed(() => {
  if (!props.question?.correctAnswers) return false
  return userAnswers.value.some((answer, index) => 
    answer.toLowerCase().trim() !== props.question.correctAnswers[index].toLowerCase().trim()
  )
})

const correctCount = computed(() => {
  if (!props.question?.correctAnswers) return 0
  return userAnswers.value.filter((answer, index) => 
    answer.toLowerCase().trim() === props.question.correctAnswers[index].toLowerCase().trim()
  ).length
})

// Methods
const isAnswerCorrect = (index: number) => {
  if (!showAnswer.value || !userAnswers.value[index] || !props.question?.correctAnswers?.[index]) return false
  return userAnswers.value[index].toLowerCase().trim() === 
         props.question.correctAnswers[index].toLowerCase().trim()
}

const insertWord = (word: string) => {
  if (focusedBlankIndex.value !== null) {
    userAnswers.value[focusedBlankIndex.value] = word
  } else {
    // Find first empty blank
    const emptyIndex = userAnswers.value.findIndex(answer => !answer || answer.trim() === '')
    if (emptyIndex !== -1) {
      userAnswers.value[emptyIndex] = word
    }
  }
}

const clearAnswers = () => {
  userAnswers.value = []
}

const checkAnswer = () => {
  if (!hasAllAnswers.value || !props.question?.correctAnswers) return
  
  showAnswer.value = true
  const isCorrect = correctCount.value === props.question.correctAnswers.length
  
  emit('answer', {
    isCorrect,
    userAnswer: [...userAnswers.value],
    correctAnswer: [...props.question.correctAnswers]
  })
}

const nextQuestion = () => {
  if (props.questionIndex === props.totalQuestions - 1) {
    emit('complete')
  } else {
    // Reset for next question
    userAnswers.value = []
    showAnswer.value = false
    showHint.value = false
    focusedBlankIndex.value = null
    emit('next')
  }
}

const playSentenceAudio = async () => {
  try {
    // Create complete sentence with correct answers for audio
    let completeSentence = props.question.sentence
    props.question.correctAnswers.forEach((answer, index) => {
      completeSentence = completeSentence.replace(/___+/, answer)
    })
    await playAudio(completeSentence)
  } catch (error) {
    console.error('Error playing audio:', error)
  }
}

// Initialize userAnswers array
watch(() => props.question, (newQuestion) => {
  if (newQuestion && newQuestion.correctAnswers && newQuestion.correctAnswers.length > 0) {
    userAnswers.value = new Array(newQuestion.correctAnswers.length).fill('')
  }
}, { immediate: true })
</script>
