<template>
  <div class="bg-white dark:bg-[#0a0a0a] rounded-xl shadow-lg border border-gray-200 dark:border-gray-700 p-6">
    <!-- Listening Controls -->
    <div class="mb-8">
      <div class="text-center">
        <h3 class="text-lg font-semibold text-gray-900 dark:text-white mb-4">
          {{ t('grammar.practice.exercises.listening.instruction') }}
        </h3>
        
        <!-- Audio Player -->
        <div class="bg-gray-50 dark:bg-[#0a0a0a]/50 rounded-lg p-6 mb-4">
          <div class="flex items-center justify-center space-x-6 mb-4">
            <!-- Play/Pause Button -->
            <button
              @click="togglePlayback"
              :disabled="!audioLoaded"
              class="w-16 h-16 bg-blue-600 hover:bg-blue-700 disabled:bg-gray-400 text-white rounded-full flex items-center justify-center transition-colors shadow-lg"
            >
              <svg v-if="!isPlaying" class="w-8 h-8 ml-1" fill="currentColor" viewBox="0 0 24 24">
                <path d="M8 5v14l11-7z"/>
              </svg>
              <svg v-else class="w-8 h-8" fill="currentColor" viewBox="0 0 24 24">
                <rect x="6" y="4" width="4" height="16"/>
                <rect x="14" y="4" width="4" height="16"/>
              </svg>
            </button>
            
            <!-- Restart Button -->
            <button
              @click="restartAudio"
              :disabled="!audioLoaded"
              class="p-3 bg-gray-300 dark:bg-gray-600 hover:bg-gray-400 dark:hover:bg-gray-500 disabled:bg-gray-200 dark:disabled:bg-gray-700 text-gray-700 dark:text-gray-300 rounded-full transition-colors"
            >
              <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15" />
              </svg>
            </button>
            
            <!-- Speed Control -->
            <div class="flex items-center space-x-2">
              <span class="text-sm text-gray-600 dark:text-gray-400">{{ t('grammar.practice.exercises.listening.speed') }}:</span>
              <select
                v-model="playbackSpeed"
                @change="updatePlaybackSpeed"
                class="px-2 py-1 text-sm border border-gray-300 dark:border-gray-600 rounded bg-white dark:bg-gray-700 text-gray-900 dark:text-white"
              >
                <option value="0.5">0.5x</option>
                <option value="0.75">0.75x</option>
                <option value="1">1x</option>
                <option value="1.25">1.25x</option>
                <option value="1.5">1.5x</option>
              </select>
            </div>
          </div>
          
          <!-- Progress Bar -->
          <div class="mb-4">
            <div 
              class="w-full bg-gray-200 dark:bg-gray-700 rounded-full h-2 cursor-pointer"
              @click="seekAudio"
              ref="progressBar"
            >
              <div 
                class="bg-blue-600 h-2 rounded-full transition-all duration-100"
                :style="{ width: `${progress}%` }"
              ></div>
            </div>
            <div class="flex justify-between text-xs text-gray-500 dark:text-gray-400 mt-1">
              <span>{{ formatTime(currentTime) }}</span>
              <span>{{ formatTime(duration) }}</span>
            </div>
          </div>
          
          <!-- Play Count Info -->
          <div class="flex items-center justify-center space-x-4 text-sm text-gray-600 dark:text-gray-400">
            <div class="flex items-center space-x-1">
              <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15.536 8.464a5 5 0 010 7.072m-2.036-5.036a2.5 2.5 0 010 3.536M6 10h4l4.5-4.5v9L10 10H6V8z" />
              </svg>
              <span>{{ t('grammar.practice.exercises.listening.playsLeft') }}: {{ playsRemaining }}</span>
            </div>
            <div v-if="question.allowNotes" class="flex items-center space-x-1">
              <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z" />
              </svg>
              <span>{{ t('grammar.practice.exercises.listening.notesAllowed') }}</span>
            </div>
          </div>
        </div>
        
        <!-- Loading State -->
        <div v-if="!audioLoaded" class="text-gray-500 dark:text-gray-400">
          {{ t('grammar.practice.exercises.listening.loading') }}...
        </div>
      </div>
    </div>

    <!-- Notes Section (if allowed) -->
    <div v-if="question.allowNotes" class="mb-6">
      <label class="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
        {{ t('grammar.practice.exercises.listening.takeNotes') }}
      </label>
      <textarea
        v-model="userNotes"
        :placeholder="t('grammar.practice.exercises.listening.notesPlaceholder')"
        class="w-full h-32 px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent bg-white dark:bg-gray-700 text-gray-900 dark:text-white resize-none"
      ></textarea>
    </div>

    <!-- Questions Section -->
    <div class="space-y-6">
      <h4 class="text-lg font-semibold text-gray-900 dark:text-white border-b border-gray-200 dark:border-gray-700 pb-2">
        {{ t('grammar.practice.exercises.listening.questions') }}
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
            
            <!-- Multiple Choice -->
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
            
            <!-- Fill in the blank -->
            <div v-else-if="q.type === 'fill-blank'" class="space-y-2">
              <input
                v-model="userAnswers[index]"
                :disabled="showAnswers"
                :placeholder="t('grammar.practice.exercises.listening.fillBlank')"
                :class="[
                  'w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent',
                  showAnswers
                    ? isAnswerCorrect(index)
                      ? 'border-green-500 bg-green-50 dark:bg-green-900/30'
                      : 'border-red-500 bg-red-50 dark:bg-red-900/30'
                    : 'border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-700',
                  'text-gray-900 dark:text-white'
                ]"
              />
              
              <!-- Show correct answer -->
              <div v-if="showAnswers && !isAnswerCorrect(index)" class="text-sm text-green-600 dark:text-green-400">
                {{ t('grammar.practice.exercises.listening.correctAnswer') }}: {{ q.correctAnswer }}
              </div>
            </div>
            
            <!-- Ordering/Sequencing -->
            <div v-else-if="q.type === 'ordering'" class="space-y-2">
              <div class="text-sm text-gray-600 dark:text-gray-400 mb-2">
                {{ t('grammar.practice.exercises.listening.dragToOrder') }}
              </div>
              <draggable 
                v-model="userAnswers[index]" 
                :disabled="showAnswers"
                class="space-y-2"
                item-key="id"
              >
                <template #item="{ element, index: itemIndex }">
                  <div 
                    :class="[
                      'p-3 bg-gray-50 dark:bg-gray-700 rounded-lg border cursor-move',
                      showAnswers && itemIndex === element.correctPosition
                        ? 'border-green-500 bg-green-50 dark:bg-green-900/30'
                        : showAnswers && itemIndex !== element.correctPosition
                        ? 'border-red-500 bg-red-50 dark:bg-red-900/30'
                        : 'border-gray-200 dark:border-gray-600'
                    ]"
                  >
                    <div class="flex items-center space-x-3">
                      <span class="w-6 h-6 bg-blue-600 text-white rounded-full flex items-center justify-center text-sm font-medium">
                        {{ itemIndex + 1 }}
                      </span>
                      <span class="text-gray-900 dark:text-white">{{ element.text }}</span>
                    </div>
                  </div>
                </template>
              </draggable>
            </div>
          </div>
          
          <!-- Question explanation -->
          <div v-if="showAnswers && q.explanation" class="mt-4 p-3 bg-yellow-50 dark:bg-yellow-900/30 border border-yellow-200 dark:border-yellow-700 rounded-lg">
            <p class="text-sm text-yellow-800 dark:text-yellow-200">
              <strong>{{ t('grammar.practice.exercises.explanation') }}:</strong> {{ q.explanation }}
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
          <div class="text-sm text-gray-600 dark:text-gray-400">{{ t('grammar.practice.exercises.listening.correct') }}</div>
        </div>
        <div>
          <div class="text-2xl font-bold text-red-600 dark:text-red-400">{{ incorrectAnswers }}</div>
          <div class="text-sm text-gray-600 dark:text-gray-400">{{ t('grammar.practice.exercises.listening.incorrect') }}</div>
        </div>
        <div>
          <div class="text-2xl font-bold text-green-600 dark:text-green-400">{{ accuracy }}%</div>
          <div class="text-sm text-gray-600 dark:text-gray-400">{{ t('grammar.practice.exercises.listening.accuracy') }}</div>
        </div>
      </div>
    </div>

    <!-- Action Buttons -->
    <div class="flex justify-between items-center mt-8">
      <div class="flex space-x-4">
        <!-- Transcript button (if available) -->
        <button
          v-if="question.transcript && showAnswers"
          @click="showTranscript = !showTranscript"
          class="flex items-center space-x-2 px-4 py-2 text-sm text-blue-600 dark:text-blue-400 hover:text-blue-700 dark:hover:text-blue-300 transition-colors"
        >
          <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
          </svg>
          <span>{{ showTranscript ? t('grammar.practice.exercises.listening.hideTranscript') : t('grammar.practice.exercises.listening.showTranscript') }}</span>
        </button>
      </div>

      <div class="flex space-x-4">
        <!-- Submit/Check Answers -->
        <button
          v-if="!showAnswers"
          @click="checkAnswers"
          :disabled="!hasAllAnswers"
          class="px-6 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 disabled:bg-gray-400 disabled:cursor-not-allowed transition-colors"
        >
          {{ t('grammar.practice.exercises.checkAnswer') }}
        </button>
        
        <!-- Next Question -->
        <button
          v-else
          @click="nextQuestion"
          class="px-6 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 transition-colors"
        >
          {{ questionIndex === totalQuestions - 1 ? t('grammar.practice.exercises.finish') : t('grammar.practice.exercises.next') }}
        </button>
      </div>
    </div>

    <!-- Transcript Modal -->
    <div v-if="showTranscript" class="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
      <div class="bg-white dark:bg-gray-800 rounded-xl shadow-2xl border border-gray-200 dark:border-gray-700 p-6 max-w-2xl w-full mx-4 max-h-96 overflow-y-auto">
        <div class="flex items-center justify-between mb-4">
          <h3 class="text-lg font-semibold text-gray-900 dark:text-white">
            {{ t('grammar.practice.exercises.listening.transcript') }}
          </h3>
          <button
            @click="showTranscript = false"
            class="p-2 rounded-lg text-gray-500 dark:text-gray-400 hover:text-gray-700 dark:hover:text-gray-200 hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors"
          >
            <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12" />
            </svg>
          </button>
        </div>
        <div class="prose dark:prose-invert max-w-none">
          <p class="text-gray-800 dark:text-gray-200 leading-relaxed">
            {{ question.transcript }}
          </p>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, computed, onMounted, onUnmounted } from 'vue'
import { useI18n } from 'vue-i18n'
import { useVoiceStore } from '../../../stores/voiceStore'
// Note: You'll need to install vue-draggable-next for ordering questions
// import draggable from 'vuedraggable'

const { t } = useI18n()
const { playAudio } = useVoiceStore()

// Props
interface Question {
  question: string
  type: 'multiple-choice' | 'fill-blank' | 'ordering'
  options?: string[]
  correctAnswer: any
  explanation?: string
}

interface Props {
  question: {
    id: number
    audioUrl: string
    questions: Question[]
    allowNotes?: boolean
    maxPlays?: number
    transcript?: string
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
const userNotes = ref('')
const showAnswers = ref(false)
const showTranscript = ref(false)
const audioLoaded = ref(false)
const isPlaying = ref(false)
const currentTime = ref(0)
const duration = ref(0)
const progress = ref(0)
const playbackSpeed = ref(1)
const playsRemaining = ref(3)
const audio = ref<HTMLAudioElement | null>(null)
const progressBar = ref<HTMLElement | null>(null)

// Computed
const hasAllAnswers = computed(() => {
  if (!props.question?.questions) return false
  return userAnswers.value.length === props.question.questions.length &&
         userAnswers.value.every(answer => answer !== null && answer !== undefined && answer !== '')
})

const correctAnswers = computed(() => {
  if (!props.question?.questions) return 0
  return props.question.questions.filter((q, index) => {
    return isAnswerCorrect(index)
  }).length
})

const incorrectAnswers = computed(() => {
  return props.question.questions.length - correctAnswers.value
})

const accuracy = computed(() => {
  return props.question.questions.length > 0 
    ? Math.round((correctAnswers.value / props.question.questions.length) * 100)
    : 0
})

// Methods
const isAnswerCorrect = (index: number) => {
  const userAnswer = userAnswers.value[index]
  const correctAnswer = props.question.questions[index].correctAnswer
  const questionType = props.question.questions[index].type
  
  if (questionType === 'fill-blank') {
    return userAnswer?.toLowerCase().trim() === correctAnswer?.toLowerCase().trim()
  } else if (questionType === 'ordering') {
    return JSON.stringify(userAnswer) === JSON.stringify(correctAnswer)
  }
  
  return userAnswer === correctAnswer
}

const togglePlayback = () => {
  if (!audio.value || playsRemaining.value <= 0) return
  
  if (isPlaying.value) {
    audio.value.pause()
  } else {
    audio.value.play()
    if (currentTime.value === 0) {
      playsRemaining.value--
    }
  }
}

const restartAudio = () => {
  if (!audio.value) return
  audio.value.currentTime = 0
  currentTime.value = 0
  progress.value = 0
}

const updatePlaybackSpeed = () => {
  if (audio.value) {
    audio.value.playbackRate = parseFloat(playbackSpeed.value.toString())
  }
}

const seekAudio = (event: MouseEvent) => {
  if (!audio.value || !progressBar.value) return
  
  const rect = progressBar.value.getBoundingClientRect()
  const clickX = event.clientX - rect.left
  const newTime = (clickX / rect.width) * duration.value
  
  audio.value.currentTime = newTime
  currentTime.value = newTime
}

const updateProgress = () => {
  if (audio.value) {
    currentTime.value = audio.value.currentTime
    progress.value = duration.value > 0 ? (currentTime.value / duration.value) * 100 : 0
  }
}

const checkAnswers = () => {
  if (!hasAllAnswers.value) return
  
  showAnswers.value = true
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

const resetExercise = () => {
  userAnswers.value = []
  userNotes.value = ''
  showAnswers.value = false
  showTranscript.value = false
  playsRemaining.value = props.question.maxPlays || 3
  restartAudio()
}

const formatTime = (seconds: number) => {
  const mins = Math.floor(seconds / 60)
  const secs = Math.floor(seconds % 60)
  return `${mins}:${secs.toString().padStart(2, '0')}`
}

const initializeAudio = () => {
  audio.value = new Audio(props.question.audioUrl)
  
  audio.value.addEventListener('loadedmetadata', () => {
    duration.value = audio.value!.duration
    audioLoaded.value = true
  })
  
  audio.value.addEventListener('timeupdate', updateProgress)
  
  audio.value.addEventListener('play', () => {
    isPlaying.value = true
  })
  
  audio.value.addEventListener('pause', () => {
    isPlaying.value = false
  })
  
  audio.value.addEventListener('ended', () => {
    isPlaying.value = false
    currentTime.value = 0
    progress.value = 0
  })
}

// Initialize
onMounted(() => {
  userAnswers.value = new Array(props.question.questions?.length || 0).fill(null)
  playsRemaining.value = props.question.maxPlays || 3
  initializeAudio()
})

onUnmounted(() => {
  if (audio.value) {
    audio.value.pause()
    audio.value = null
  }
})
</script>
