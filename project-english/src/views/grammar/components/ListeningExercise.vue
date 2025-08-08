<template>
  <div class="bg-white dark:bg-[#0a0a0a] rounded-xl shadow-lg border border-gray-200 dark:border-white/10 p-6">
    <!-- Listening Controls -->
    <div class="mb-8">
      <div class="text-center">
        <h3 class="text-lg font-semibold text-gray-900 dark:text-white mb-4">
          {{ tf('grammar.practice.exercises.listening.instruction', 'Listen carefully and answer the questions') }}
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
              class="p-3 bg-gray-300 dark:bg-white/10 hover:bg-gray-400 dark:hover:bg-white/15 disabled:bg-gray-200 dark:disabled:bg-white/5 text-gray-700 dark:text-white/80 rounded-full transition-colors"
            >
              <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15" />
              </svg>
            </button>

          </div>
          
          <!-- Progress Bar -->
          <div class="mb-4">
            <div 
              class="w-full bg-gray-200 dark:bg-white/10 rounded-full h-2 cursor-pointer"
              @click="seekAudio"
              ref="progressBar"
            >
              <div 
                class="bg-blue-600 h-2 rounded-full transition-all duration-100"
                :style="{ width: `${progress}%` }"
              ></div>
            </div>
            <div class="flex justify-between text-xs text-gray-500 dark:text-white/60 mt-1">
              <span>{{ formatTime(currentTime) }}</span>
              <span>{{ formatTime(duration) }}</span>
            </div>
          </div>
          
          <!-- Play Count Info -->
          <div class="flex items-center justify-center space-x-4 text-sm text-gray-600 dark:text-white/60">
            <div class="flex items-center space-x-1">
              <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15.536 8.464a5 5 0 010 7.072m-2.036-5.036a2.5 2.5 0 010 3.536M6 10h4l4.5-4.5v9L10 10H6V8z" />
              </svg>
              <span>{{ tf('grammar.practice.exercises.listening.playsLeft', 'Plays left') }}: {{ playsRemaining }}</span>
            </div>
            <div v-if="question.allowNotes" class="flex items-center space-x-1">
              <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z" />
              </svg>
              <span>{{ tf('grammar.practice.exercises.listening.notesAllowed', 'Notes are allowed') }}</span>
            </div>
          </div>
        </div>
        
        <!-- Loading State -->
        <div v-if="!audioLoaded" class="text-gray-500 dark:text-white/60">
          {{ tf('grammar.practice.exercises.listening.loading', 'Loading') }}...
        </div>
      </div>
    </div>

    <!-- Notes Section (if allowed) -->
    <div v-if="question.allowNotes" class="mb-6">
      <label class="block text-sm font-medium text-gray-700 dark:text-white/80 mb-2">
        {{ tf('grammar.practice.exercises.listening.takeNotes', 'Take notes') }}
      </label>
      <textarea
        v-model="userNotes"
        :placeholder="tf('grammar.practice.exercises.listening.notesPlaceholder', 'Type your notes here...')"
        class="w-full h-32 px-4 py-2 border border-gray-300 dark:border-white/10 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent bg-white dark:bg-[#0a0a0a] text-gray-900 dark:text-white resize-none"
      ></textarea>
    </div>

    <!-- Questions Section -->
    <div class="space-y-6">
      <h4 class="text-lg font-semibold text-gray-900 dark:text-white border-b border-gray-200 dark:border-white/10 pb-2">
        {{ tf('grammar.practice.exercises.listening.questions', 'Questions') }}
      </h4>
      
      <!-- Question List -->
      <div class="space-y-6">
        <div
          v-for="(q, index) in question.questions"
          :key="index"
          class="border border-gray-200 dark:border-white/10 rounded-lg p-4"
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
                    : 'bg-gray-50 dark:bg-[#0a0a0a]/50 hover:bg-gray-100 dark:hover:bg-[#0a0a0a]/70 border border-transparent',
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
                :placeholder="tf('grammar.practice.exercises.listening.fillBlank', 'Type the missing word/phrase')"
                :class="[
                  'w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent',
                  showAnswers
                    ? isAnswerCorrect(index)
                      ? 'border-green-500 bg-green-50 dark:bg-green-900/30'
                      : 'border-red-500 bg-red-50 dark:bg-red-900/30'
                    : 'border-gray-300 dark:border-white/10 bg-white dark:bg-[#0a0a0a]',
                  'text-gray-900 dark:text-white'
                ]"
              />
              
              <!-- Show correct answer -->
              <div v-if="showAnswers && !isAnswerCorrect(index)" class="text-sm text-green-600 dark:text-green-400">
                {{ tf('grammar.practice.exercises.listening.correctAnswer', 'Correct answer') }}: {{ q.correctAnswer }}
              </div>
            </div>
            
            <!-- Ordering/Sequencing -->
            <div v-else-if="q.type === 'ordering'" class="space-y-2">
              <div class="text-sm text-gray-600 dark:text-white/60 mb-2">
                {{ tf('grammar.practice.exercises.listening.dragToOrder', 'Drag to order') }}
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
                      'p-3 bg-gray-50 dark:bg-[#0a0a0a] rounded-lg border cursor-move',
                      showAnswers && itemIndex === element.correctPosition
                        ? 'border-green-500 bg-green-50 dark:bg-green-900/30'
                        : showAnswers && itemIndex !== element.correctPosition
                        ? 'border-red-500 bg-red-50 dark:bg-red-900/30'
                        : 'border-gray-200 dark:border-white/10'
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
              <strong>{{ tf('grammar.practice.exercises.explanation', 'Explanation') }}:</strong> {{ q.explanation }}
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
          <div class="text-sm text-gray-600 dark:text-white/60">{{ tf('grammar.practice.exercises.listening.correct', 'Correct') }}</div>
        </div>
        <div>
          <div class="text-2xl font-bold text-red-600 dark:text-red-400">{{ incorrectAnswers }}</div>
          <div class="text-sm text-gray-600 dark:text-white/60">{{ tf('grammar.practice.exercises.listening.incorrect', 'Incorrect') }}</div>
        </div>
        <div>
          <div class="text-2xl font-bold text-green-600 dark:text-green-400">{{ accuracy }}%</div>
          <div class="text-sm text-gray-600 dark:text-white/60">{{ tf('grammar.practice.exercises.listening.accuracy', 'Accuracy') }}</div>
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
          <span>{{ showTranscript ? tf('grammar.practice.exercises.listening.hideTranscript', 'Hide transcript') : tf('grammar.practice.exercises.listening.showTranscript', 'Show transcript') }}</span>
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
          {{ tf('grammar.practice.exercises.checkAnswer', 'Check answer') }}
        </button>
        
        <!-- Next Question -->
        <button
          v-else
          @click="nextQuestion"
          class="px-6 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 transition-colors"
        >
          {{ questionIndex === totalQuestions - 1 ? tf('grammar.practice.exercises.finish', 'Finish') : tf('grammar.practice.exercises.next', 'Next') }}
        </button>
      </div>
    </div>

    <!-- Transcript Modal -->
    <div v-if="showTranscript" class="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
      <div class="bg-white dark:bg-[#0a0a0a] rounded-xl shadow-2xl border border-gray-200 dark:border-white/10 p-6 max-w-2xl w-full mx-4 max-h-96 overflow-y-auto">
        <div class="flex items-center justify-between mb-4">
          <h3 class="text-lg font-semibold text-gray-900 dark:text-white">
            {{ tf('grammar.practice.exercises.listening.transcript', 'Transcript') }}
          </h3>
          <button
            @click="showTranscript = false"
            class="p-2 rounded-lg text-gray-500 dark:text-white/60 hover:text-gray-700 dark:hover:text-white hover:bg-gray-100 dark:hover:bg-white/10 transition-colors"
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
import { ref, computed, onMounted, onUnmounted, watch } from 'vue'
import { useI18n } from 'vue-i18n'
import { useVoiceStore } from '../../../stores/voiceStore'
import { VueDraggableNext as draggable } from 'vue-draggable-next'

const { t } = useI18n()
// Safe translation with explicit fallback and optional params
const tf = (key: string, fallback: string, params?: Record<string, any>) => {
  try {
    const translated = t(key as any, params as any)
    return typeof translated === 'string' && translated !== key ? translated : fallback
  } catch {
    return fallback
  }
}
const { playAudio } = useVoiceStore()

// YouTube player reference
let youtubePlayer: any = null
const isYouTubeAudio = ref(false)
const youtubeEmbedUrl = ref('')

// YouTube API type declarations
declare global {
  interface Window {
    YT: any
    onYouTubeIframeAPIReady: () => void
  }
}

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
    playbackSpeed?: number
    difficulty?: string
  }
  questionIndex: number
  totalQuestions: number
  difficulty?: string
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
const playsRemaining = ref(3)
const audio = ref<HTMLAudioElement | null>(null)
const progressBar = ref<HTMLElement | null>(null)
const youtubePlayerReady = ref(false)

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

const playbackSpeed = computed(() => {
  // Priority: 
  // 1. Explicit playbackSpeed from question
  // 2. Question's individual difficulty setting
  // 3. Global difficulty setting
  // 4. Default speed
  
  // DEBUG: Log the values
  console.log('DEBUG - Question difficulty:', props.question.difficulty)
  console.log('DEBUG - Global difficulty:', props.difficulty)
  console.log('DEBUG - Explicit playbackSpeed:', props.question.playbackSpeed)
  
  if (props.question.playbackSpeed) {
    console.log('DEBUG - Using explicit playbackSpeed:', props.question.playbackSpeed)
    return props.question.playbackSpeed
  }
  
  // Use question's individual difficulty first, then global difficulty
  const difficulty = props.question.difficulty || props.difficulty
  console.log('DEBUG - Final difficulty used:', difficulty)
  
  // Map difficulty to playback speed
  let speed
  switch (difficulty) {
    case 'easy':
      speed = 0.75  // Slower for easier listening
      break
    case 'medium':
      speed = 1     // Normal speed
      break
    case 'hard':
      speed = 3.25  // Faster for challenge
      break
    default:
      speed = 1     // Default to normal speed
  }
  
  console.log('DEBUG - Computed playback speed:', speed)
  return speed
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
  // Check plays remaining first
  if (playsRemaining.value <= 0) return
  
  // Handle YouTube audio
  if (isYouTubeAudio.value) {
    if (!youtubePlayerReady.value || !youtubePlayer || !youtubePlayer.playVideo || !youtubePlayer.pauseVideo) {
      console.warn('YouTube player not ready yet')
      return
    }
    
    if (isPlaying.value) {
      youtubePlayer.pauseVideo()
    } else {
      youtubePlayer.playVideo()
      if (playsRemaining.value > 0) {
        playsRemaining.value--
      }
    }
    return
  }
  
  // Handle regular audio
  if (!audio.value) return
  
  if (isPlaying.value) {
    audio.value.pause()
  } else {
    audio.value.play()
    if (playsRemaining.value > 0) {
      playsRemaining.value--
    }
  }
}

const restartAudio = () => {
  if (isYouTubeAudio.value) {
    // Restart YouTube audio
    if (youtubePlayer && youtubePlayer.seekTo) {
      youtubePlayer.seekTo(0)
      currentTime.value = 0
      progress.value = 0
    }
  } else {
    // Restart regular audio
    if (!audio.value) return
    
    audio.value.currentTime = 0
    currentTime.value = 0
    progress.value = 0
  }
}

const updatePlaybackSpeed = () => {
  console.log('DEBUG - updatePlaybackSpeed called!')
  console.log('DEBUG - Current playbackSpeed.value:', playbackSpeed.value)
  console.log('DEBUG - isYouTubeAudio.value:', isYouTubeAudio.value)
  console.log('DEBUG - audio.value exists:', !!audio.value)
  
  if (isYouTubeAudio.value) {
    if (youtubePlayer && youtubePlayer.setPlaybackRate) {
      console.log('DEBUG - Setting YouTube playback rate to:', playbackSpeed.value)
      youtubePlayer.setPlaybackRate(parseFloat(playbackSpeed.value.toString()))
    } else {
      console.log('DEBUG - YouTube player not ready for setPlaybackRate')
    }
  } else if (audio.value) {
    console.log('DEBUG - Setting audio playback rate to:', playbackSpeed.value)
    console.log('DEBUG - Audio playbackRate BEFORE setting:', audio.value.playbackRate)
    audio.value.playbackRate = parseFloat(playbackSpeed.value.toString())
    console.log('DEBUG - Audio playbackRate AFTER setting:', audio.value.playbackRate)
    
    // Double-check after a short delay to see if it gets reset
    setTimeout(() => {
      console.log('DEBUG - Audio playbackRate after 100ms:', audio.value?.playbackRate)
      // Force re-apply if it got reset
      if (audio.value && audio.value.playbackRate !== parseFloat(playbackSpeed.value.toString())) {
        console.log('DEBUG - Playback rate was reset! Force re-applying...')
        audio.value.playbackRate = parseFloat(playbackSpeed.value.toString())
        console.log('DEBUG - Force-applied playbackRate:', audio.value.playbackRate)
      }
    }, 100)
  } else {
    console.log('DEBUG - No audio element available to set playback rate')
  }
}

const seekAudio = (event: MouseEvent) => {
  if (!progressBar.value) return
  
  const rect = progressBar.value.getBoundingClientRect()
  const clickX = event.clientX - rect.left
  const newTime = (clickX / rect.width) * duration.value
  
  if (isYouTubeAudio.value) {
    if (youtubePlayer && youtubePlayer.seekTo) {
      youtubePlayer.seekTo(newTime, true)
      currentTime.value = newTime
    }
  } else if (audio.value) {
    audio.value.currentTime = newTime
    currentTime.value = newTime
  }
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

// YouTube audio player creation using iframe with Player API
const createYouTubeAudioPlayer = (videoId: string) => {
  isYouTubeAudio.value = true
  
  // Create container for YouTube player
  const playerContainer = document.createElement('div')
  playerContainer.id = `youtube-player-${Date.now()}`
  playerContainer.style.position = 'absolute'
  playerContainer.style.left = '-9999px'
  playerContainer.style.top = '-9999px'
  playerContainer.style.width = '1px'
  playerContainer.style.height = '1px'
  document.body.appendChild(playerContainer)
  
  // Load YouTube Player API if not already loaded
  if (!window.YT) {
    const script = document.createElement('script')
    script.src = 'https://www.youtube.com/iframe_api'
    document.head.appendChild(script)
    
    // Wait for API to load
    window.onYouTubeIframeAPIReady = () => {
      initYouTubePlayer(videoId, playerContainer.id)
    }
  } else {
    initYouTubePlayer(videoId, playerContainer.id)
  }
}

// Initialize YouTube Player
const initYouTubePlayer = (videoId: string, containerId: string) => {
  youtubePlayer = new window.YT.Player(containerId, {
    height: '1',
    width: '1',
    videoId: videoId,
    playerVars: {
      autoplay: 0,
      controls: 0,
      disablekb: 1,
      fs: 0,
      iv_load_policy: 3,
      modestbranding: 1,
      rel: 0,
      showinfo: 0
    },
    events: {
      onReady: (event: any) => {
        audioLoaded.value = true
        youtubePlayerReady.value = true
        duration.value = event.target.getDuration() || 0
        // Apply playback speed after YouTube player is ready
        updatePlaybackSpeed()
      },
      onStateChange: (event: any) => {
        const state = event.data
        if (state === window.YT.PlayerState.PLAYING) {
          isPlaying.value = true
        } else if (state === window.YT.PlayerState.PAUSED || state === window.YT.PlayerState.ENDED) {
          isPlaying.value = false
          if (state === window.YT.PlayerState.ENDED) {
            currentTime.value = 0
            progress.value = 0
          }
        }
      }
    }
  })
  
  // Start progress tracking for YouTube
  const updateYouTubeProgress = () => {
    if (youtubePlayer && youtubePlayer.getCurrentTime && isPlaying.value) {
      const current = youtubePlayer.getCurrentTime()
      currentTime.value = current
      if (duration.value > 0) {
        progress.value = (current / duration.value) * 100
      }
    }
  }
  
  // Update progress every second for YouTube
  setInterval(updateYouTubeProgress, 1000)
}

const initializeAudio = () => {
  // Handle YouTube URLs by converting them to playable audio format
  let audioUrl = props.question.audioUrl
  
  // Check if it's a YouTube format (youtube:videoId)
  if (audioUrl.startsWith('youtube:')) {
    const videoId = audioUrl.replace('youtube:', '')
    createYouTubeAudioPlayer(videoId)
    return
  }
  
  // Check if it's a full YouTube URL
  if (audioUrl.includes('youtube.com/watch') || audioUrl.includes('youtu.be/')) {
    let videoId = ''
    if (audioUrl.includes('youtube.com/watch')) {
      const urlParams = new URLSearchParams(audioUrl.split('?')[1])
      videoId = urlParams.get('v') || ''
    } else if (audioUrl.includes('youtu.be/')) {
      videoId = audioUrl.split('youtu.be/')[1].split('?')[0]
    }
    
    if (videoId) {
      createYouTubeAudioPlayer(videoId)
      return
    }
  }
  
  // Handle regular audio URLs
  audio.value = new Audio(audioUrl)
  
  audio.value.addEventListener('loadedmetadata', () => {
    duration.value = audio.value!.duration
    audioLoaded.value = true
    // Apply playback speed after audio is loaded
    updatePlaybackSpeed()
  })
  
  audio.value.addEventListener('timeupdate', updateProgress)
  
  audio.value.addEventListener('play', () => {
    isPlaying.value = true
    // Apply playback speed every time audio starts playing
    updatePlaybackSpeed()
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

// Watch for playback speed changes based on difficulty
watch(playbackSpeed, (newSpeed) => {
  // Update the audio speed when difficulty changes
  updatePlaybackSpeed()
}, { immediate: false })

// Watch for question changes to reinitialize audio with new audioUrl
watch(() => props.question, (newQuestion, oldQuestion) => {
  if (newQuestion && oldQuestion && newQuestion.audioUrl !== oldQuestion.audioUrl) {
    // Clean up old audio
    if (audio.value) {
      audio.value.pause()
      audio.value = null
    }
    if (youtubePlayer) {
      youtubePlayer.destroy()
      youtubePlayer = null
    }
    
    // Reset state
    audioLoaded.value = false
    isPlaying.value = false
    currentTime.value = 0
    duration.value = 0
    progress.value = 0
    playsRemaining.value = newQuestion.maxPlays || 3
    isYouTubeAudio.value = false
    youtubePlayerReady.value = false
    
    // Initialize new audio
    initializeAudio()
  }
}, { deep: true })

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
