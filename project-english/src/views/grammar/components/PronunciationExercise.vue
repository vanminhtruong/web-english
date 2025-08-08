<template>
  <div class="bg-white dark:bg-[#0a0a0a] rounded-xl shadow-lg border border-gray-200 dark:border-white/10 p-6">
    <!-- Instruction -->
    <div class="mb-6">
      <h3 class="text-lg font-semibold text-gray-900 dark:text-white mb-4">
        {{ tf('grammar.practice.pronunciation.instruction', 'Pronounce the following correctly') }}
      </h3>
      
      <!-- Target sentence/word -->
      <div class="bg-gray-50 dark:bg-[#0a0a0a]/50 rounded-lg p-4 mb-4">
        <div class="text-center">
          <div class="text-2xl font-bold text-gray-900 dark:text-white mb-2">
            {{ question.targetText }}
          </div>
          <div v-if="question.phonetic" class="text-lg text-blue-600 dark:text-blue-400 mb-4">
            {{ question.phonetic }}
          </div>
        </div>
        
        <!-- Listen button -->
        <div class="text-center">
          <button
            @click="playTargetAudio"
            class="inline-flex items-center space-x-2 px-6 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
          >
            <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15.536 8.464a5 5 0 010 7.072m-2.036-5.036a2.5 2.5 0 010 3.536M6 10h4l4.5-4.5v9L10 10H6V8z" />
            </svg>
            <span>{{ tf('grammar.practice.pronunciation.listen', 'Listen') }}</span>
          </button>
        </div>
      </div>
    </div>

    <!-- Recording Section -->
    <div class="mb-6">
      <div class="text-center">
        <!-- Recording Button -->
        <button
          @click="toggleRecording"
          :disabled="isProcessing"
          :class="[
            'w-24 h-24 rounded-full border-4 flex items-center justify-center transition-all duration-200 mb-4',
            isRecording
              ? 'border-red-500 bg-red-100 dark:bg-red-900/30 animate-pulse'
              : 'border-gray-300 dark:border-white/10 bg-gray-100 dark:bg-[#0a0a0a] hover:border-blue-500 hover:bg-blue-50 dark:hover:bg-blue-900/30',
            isProcessing ? 'opacity-50 cursor-not-allowed' : 'cursor-pointer'
          ]"
        >
          <svg 
            v-if="!isRecording && !isProcessing"
            class="w-10 h-10 text-gray-600 dark:text-white/60" 
            fill="none" 
            stroke="currentColor" 
            viewBox="0 0 24 24"
          >
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 11a7 7 0 01-7 7m0 0a7 7 0 01-7-7m7 7v4m0 0H8m4 0h4m-4-8a3 3 0 01-3-3V5a3 3 0 116 0v6a3 3 0 01-3 3z" />
          </svg>
          <svg 
            v-else-if="isRecording"
            class="w-10 h-10 text-red-600" 
            fill="currentColor" 
            viewBox="0 0 24 24"
          >
            <rect x="6" y="6" width="12" height="12" rx="2"/>
          </svg>
          <svg 
            v-else
            class="w-10 h-10 text-blue-600 animate-spin" 
            fill="none" 
            viewBox="0 0 24 24"
          >
            <circle class="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" stroke-width="4"></circle>
            <path class="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
          </svg>
        </button>
        
        <!-- Recording Status -->
        <div class="text-sm text-gray-600 dark:text-white/60 mb-2">
          {{ recordingStatus }}
        </div>
        
        <!-- Duration -->
        <div v-if="isRecording || recordingDuration > 0" class="text-lg font-mono text-blue-600 dark:text-blue-400">
          {{ formatTime(recordingDuration) }}
        </div>
      </div>
    </div>

    <!-- Audio Playback (User's Recording) -->
    <div v-if="recordedAudio && !isRecording" class="mb-6">
      <div class="bg-blue-50 dark:bg-blue-900/30 rounded-lg p-4">
        <div class="flex items-center justify-between">
          <div class="flex items-center space-x-3">
            <button
              @click="playRecordedAudio"
              class="p-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
            >
              <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M14.828 14.828a4 4 0 01-5.656 0M9 10h1m4 0h1m-6 4h8m2-10V9a2 2 0 01-2 2H5a2 2 0 01-2-2V6a2 2 0 012-2h14a2 2 0 012 2z" />
              </svg>
            </button>
            <span class="text-blue-700 dark:text-blue-300 font-medium">
              {{ tf('grammar.practice.pronunciation.yourRecording', 'Your recording') }}
            </span>
          </div>
          
          <button
            @click="clearRecording"
            class="p-2 text-gray-500 dark:text-white/60 hover:text-red-600 dark:hover:text-red-400 transition-colors"
          >
            <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
            </svg>
          </button>
        </div>
      </div>
    </div>

    <!-- Pronunciation Feedback -->
    <div v-if="pronunciationScore !== null" class="mb-6">
      <div :class="[
        'p-4 rounded-lg border',
        pronunciationScore >= 80 ? 'bg-green-50 dark:bg-green-900/30 border-green-200 dark:border-green-700' :
        pronunciationScore >= 60 ? 'bg-yellow-50 dark:bg-yellow-900/30 border-yellow-200 dark:border-yellow-700' :
        'bg-red-50 dark:bg-red-900/30 border-red-200 dark:border-red-700'
      ]">
        <div class="flex items-center justify-between mb-3">
          <h4 :class="[
            'font-medium',
            pronunciationScore >= 80 ? 'text-green-800 dark:text-green-200' :
            pronunciationScore >= 60 ? 'text-yellow-800 dark:text-yellow-200' :
            'text-red-800 dark:text-red-200'
          ]">
            {{ t('grammar.practice.pronunciation.feedback') }}
          </h4>
          <div :class="[
            'text-2xl font-bold',
            pronunciationScore >= 80 ? 'text-green-600 dark:text-green-400' :
            pronunciationScore >= 60 ? 'text-yellow-600 dark:text-yellow-400' :
            'text-red-600 dark:text-red-400'
          ]">
            {{ pronunciationScore }}%
          </div>
        </div>
        
        <!-- Progress Bar -->
        <div class="w-full bg-gray-200 dark:bg-white/10 rounded-full h-3 mb-3">
          <div 
            :class="[
              'h-3 rounded-full transition-all duration-500',
              pronunciationScore >= 80 ? 'bg-green-600' :
              pronunciationScore >= 60 ? 'bg-yellow-600' :
              'bg-red-600'
            ]"
            :style="{ width: `${pronunciationScore}%` }"
          ></div>
        </div>
        
        <!-- Feedback Message -->
        <p :class="[
          'text-sm',
          pronunciationScore >= 80 ? 'text-green-700 dark:text-green-300' :
          pronunciationScore >= 60 ? 'text-yellow-700 dark:text-yellow-300' :
          'text-red-700 dark:text-red-300'
        ]">
          {{ getFeedbackMessage() }}
        </p>
      </div>
    </div>

    <!-- Tips -->
    <div v-if="question.tips && question.tips.length > 0" class="mb-6">
      <button
        @click="showTips = !showTips"
        class="flex items-center space-x-2 text-blue-600 dark:text-blue-400 hover:text-blue-700 dark:hover:text-blue-300 transition-colors"
      >
        <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9.663 17h4.673M12 3v1m6.364 1.636l-.707.707M21 12h-1M4 12H3m3.343-5.657l-.707-.707m2.828 9.9a5 5 0 117.072 0l-.548.547A3.374 3.374 0 0014 18.469V19a2 2 0 11-4 0v-.531c0-.895-.356-1.754-.988-2.386l-.548-.547z" />
        </svg>
        <span>{{ tf('grammar.practice.pronunciation.tips', 'Tips') }}</span>
      </button>
      
      <div v-if="showTips" class="mt-3 p-4 bg-blue-50 dark:bg-blue-900/30 border border-blue-200 dark:border-blue-700 rounded-lg">
        <ul class="space-y-2">
          <li v-for="tip in question.tips" :key="tip" class="text-sm text-blue-700 dark:text-blue-300 flex items-start space-x-2">
            <span class="text-blue-500 mt-1">•</span>
            <span>{{ tip }}</span>
          </li>
        </ul>
      </div>
    </div>

    <!-- Action Buttons -->
    <div class="flex justify-between items-center">
      <div class="flex space-x-4">
        <!-- Try Again -->
        <button
          v-if="pronunciationScore !== null && pronunciationScore < 80"
          @click="resetExercise"
          class="flex items-center space-x-2 px-4 py-2 text-sm text-blue-600 dark:text-blue-400 hover:text-blue-700 dark:hover:text-blue-300 transition-colors"
        >
          <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15" />
          </svg>
          <span>{{ tf('grammar.practice.pronunciation.tryAgain', 'Try again') }}</span>
        </button>
      </div>

      <div class="flex space-x-4">
        <!-- Submit/Next -->
        <button
          v-if="pronunciationScore === null"
          @click="analyzePronunciation"
          :disabled="!recordedAudio"
          class="px-6 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 disabled:bg-gray-400 disabled:cursor-not-allowed transition-colors"
        >
          {{ tf('grammar.practice.pronunciation.analyze', 'Analyze pronunciation') }}
        </button>
        
        <button
          v-else
          @click="nextQuestion"
          class="px-6 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 transition-colors"
        >
          {{ questionIndex === totalQuestions - 1 ? tf('grammar.practice.finish', 'Finish') : tf('grammar.practice.next', 'Next') }}
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

// Props
interface Props {
  question: {
    id: number
    targetText: string
    phonetic?: string
    tips?: string[]
    audio?: string
  }
  questionIndex: number
  totalQuestions: number
}

const props = defineProps<Props>()

// Emits
const emit = defineEmits<{
  answer: [answer: { isCorrect: boolean; score: number; targetText: string }]
  next: []
  complete: []
}>()

// State
const isMounted = ref(true)
const isRecording = ref(false)
const isProcessing = ref(false)
const recordedAudio = ref<Blob | null>(null)
const recordingDuration = ref(0)
const pronunciationScore = ref<number | null>(null)
const showTips = ref(false)
const mediaRecorder = ref<MediaRecorder | null>(null)
const audioChunks = ref<Blob[]>([])
const recordingTimer = ref<number | null>(null)

// Computed
const recordingStatus = computed(() => {
  if (isProcessing.value) return tf('grammar.practice.pronunciation.processing', 'Processing...')
  if (isRecording.value) return tf('grammar.practice.pronunciation.recording', 'Recording...')
  if (recordedAudio.value) return tf('grammar.practice.pronunciation.recorded', 'Recorded')
  return tf('grammar.practice.pronunciation.ready', 'Ready to record')
})

// Methods
const toggleRecording = async () => {
  if (!isRecording.value) {
    await startRecording()
  } else {
    stopRecording()
  }
}

const startRecording = async () => {
  try {
    const stream = await navigator.mediaDevices.getUserMedia({ audio: true })
    mediaRecorder.value = new MediaRecorder(stream)
    audioChunks.value = []
    recordingDuration.value = 0

    mediaRecorder.value.ondataavailable = (event) => {
      audioChunks.value.push(event.data)
    }

    mediaRecorder.value.onstop = () => {
      const audioBlob = new Blob(audioChunks.value, { type: 'audio/wav' })
      recordedAudio.value = audioBlob
      stream.getTracks().forEach(track => track.stop())
    }

    mediaRecorder.value.start()
    isRecording.value = true
    
    // Start timer
    recordingTimer.value = setInterval(() => {
      recordingDuration.value += 1
      if (recordingDuration.value >= 10) { // Auto-stop after 10 seconds
        stopRecording()
      }
    }, 1000)
    
  } catch (error) {
    console.error('Error accessing microphone:', error)
    alert(tf('grammar.practice.pronunciation.microphoneError', 'Unable to access microphone. Please check your browser permissions and try again.'))
  }
}

const stopRecording = () => {
  if (mediaRecorder.value && mediaRecorder.value.state !== 'inactive') {
    mediaRecorder.value.stop()
  }
  isRecording.value = false
  
  if (recordingTimer.value) {
    clearInterval(recordingTimer.value)
    recordingTimer.value = null
  }
}

const playTargetAudio = async () => {
  try {
    await playAudio(props.question.targetText)
  } catch (error) {
    console.error('Error playing target audio:', error)
  }
}

const playRecordedAudio = () => {
  if (recordedAudio.value) {
    const audio = new Audio(URL.createObjectURL(recordedAudio.value))
    audio.play()
  }
}

const clearRecording = () => {
  recordedAudio.value = null
  recordingDuration.value = 0
  pronunciationScore.value = null
}

const analyzePronunciation = async () => {
  if (!recordedAudio.value) return
  
  isProcessing.value = true
  
  try {
    // Simulate pronunciation analysis (in real app, you'd use speech recognition API)
    await new Promise(resolve => setTimeout(resolve, 2000))
    
    // Mock scoring (in real app, compare with target pronunciation)
    const mockScore = Math.floor(Math.random() * 40) + 60 // 60-100%
    pronunciationScore.value = mockScore
    
    emit('answer', {
      isCorrect: mockScore >= 70,
      score: mockScore,
      targetText: props.question.targetText
    })
    
  } catch (error) {
    console.error('Error analyzing pronunciation:', error)
  } finally {
    isProcessing.value = false
  }
}

const getFeedbackMessage = () => {
  if (pronunciationScore.value === null) return ''
  
  if (pronunciationScore.value >= 90) {
    return tf('grammar.practice.pronunciation.excellent', 'Excellent pronunciation!')
  } else if (pronunciationScore.value >= 80) {
    return tf('grammar.practice.pronunciation.good', 'Good pronunciation!')
  } else if (pronunciationScore.value >= 70) {
    return tf('grammar.practice.pronunciation.fair', 'Fair pronunciation. Keep practicing!')
  } else {
    return tf('grammar.practice.pronunciation.needsImprovement', 'Needs improvement. Try again!')
  }
}

const resetExercise = () => {
  clearRecording()
  showTips.value = false
}

const nextQuestion = () => {
  if (props.questionIndex === props.totalQuestions - 1) {
    emit('complete')
  } else {
    resetExercise()
    emit('next')
  }
}

const formatTime = (seconds: number) => {
  const mins = Math.floor(seconds / 60)
  const secs = seconds % 60
  return `${mins}:${secs.toString().padStart(2, '0')}`
}

// Cleanup
onUnmounted(() => {
  isMounted.value = false
  if (recordingTimer.value) {
    clearInterval(recordingTimer.value)
    recordingTimer.value = null
  }
  if (mediaRecorder.value && mediaRecorder.value.state !== 'inactive') {
    try {
      mediaRecorder.value.stop()
    } catch (error) {
      console.warn('Error stopping media recorder:', error)
    }
  }
  mediaRecorder.value = null
})
</script>
