<template>
  <div class="practice-timer">
    <!-- Timer Display -->
    <div v-if="isActive" class="flex items-center justify-center gap-2 mb-4">
      <div class="timer-display" :class="getTimerClass()">
        <svg class="w-5 h-5" fill="currentColor" viewBox="0 0 20 20">
          <path fill-rule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm1-12a1 1 0 10-2 0v4a1 1 0 00.293.707l2.828 2.829a1 1 0 101.415-1.415L11 9.586V6z" clip-rule="evenodd"/>
        </svg>
        <span class="font-mono font-bold">{{ formatTime(remainingTime) }}</span>
      </div>
    </div>

    <!-- Start Practice Button -->
    <div v-if="!hasStarted" class="text-center mb-6">
      <button
        @click="startPractice"
        class="bg-blue-500 hover:bg-blue-600 text-white px-8 py-4 rounded-xl font-semibold text-lg transition-colors shadow-lg hover:shadow-xl"
      >
        <svg class="w-6 h-6 inline-block mr-2" fill="currentColor" viewBox="0 0 20 20">
          <path fill-rule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zM9.555 7.168A1 1 0 008 8v4a1 1 0 001.555.832l3-2a1 1 0 000-1.664l-3-2z" clip-rule="evenodd"/>
        </svg>
        {{ t('practice.timer.startPractice') }}
      </button>
      <div class="text-sm text-gray-500 dark:text-gray-400 mt-2">
        {{ t('practice.timer.timeLimit', { seconds: maxTime }) }}
      </div>
    </div>

    <!-- Timeout Modal -->
    <div v-if="showTimeoutModal" class="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
      <div class="bg-white dark:bg-gray-800 rounded-xl p-8 max-w-md mx-4 text-center">
        <div class="text-red-500 mb-4">
          <svg class="w-16 h-16 mx-auto" fill="currentColor" viewBox="0 0 20 20">
            <path fill-rule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm1-12a1 1 0 10-2 0v4a1 1 0 00.293.707l2.828 2.829a1 1 0 101.415-1.415L11 9.586V6z" clip-rule="evenodd"/>
          </svg>
        </div>
        <h3 class="text-xl font-bold text-gray-900 dark:text-white mb-2">
          {{ t('practice.timer.timeUp') }}
        </h3>
        <p class="text-gray-600 dark:text-gray-300 mb-6">
          {{ t('practice.timer.timeUpMessage') }}
        </p>
        <div class="flex gap-3">
          <button
            @click="restartPractice"
            class="flex-1 bg-blue-500 hover:bg-blue-600 text-white px-4 py-2 rounded-lg font-medium transition-colors"
          >
            {{ t('practice.timer.tryAgain') }}
          </button>
          <button
            @click="skipCard"
            class="flex-1 bg-gray-500 hover:bg-gray-600 text-white px-4 py-2 rounded-lg font-medium transition-colors"
          >
            {{ t('practice.timer.skip') }}
          </button>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, computed, onUnmounted, watch } from 'vue'
import { useI18n } from 'vue-i18n'

interface Props {
  maxTime?: number
  autoStart?: boolean
  disabled?: boolean
}

const props = withDefaults(defineProps<Props>(), {
  maxTime: 30,
  autoStart: false,
  disabled: false
})

const emit = defineEmits<{
  start: []
  timeout: []
  tick: [remainingTime: number]
  restart: []
  skip: []
}>()

const { t } = useI18n()

// Timer state
const remainingTime = ref(props.maxTime)
const isActive = ref(false)
const hasStarted = ref(false)
const showTimeoutModal = ref(false)
let timerId: number | null = null

// Computed
const isRunning = computed(() => isActive.value && remainingTime.value > 0)

// Methods
const startPractice = () => {
  hasStarted.value = true
  startTimer()
  emit('start')
}

const startTimer = () => {
  if (props.disabled) return
  
  isActive.value = true
  remainingTime.value = props.maxTime
  
  timerId = setInterval(() => {
    if (remainingTime.value > 0) {
      remainingTime.value--
      emit('tick', remainingTime.value)
    } else {
      handleTimeout()
    }
  }, 1000)
}

const stopTimer = () => {
  isActive.value = false
  if (timerId) {
    clearInterval(timerId)
    timerId = null
  }
}

const resetTimer = () => {
  stopTimer()
  remainingTime.value = props.maxTime
}

const handleTimeout = () => {
  stopTimer()
  showTimeoutModal.value = true
  emit('timeout')
}

const restartPractice = () => {
  showTimeoutModal.value = false
  resetTimer()
  startTimer()
  emit('restart')
}

const skipCard = () => {
  showTimeoutModal.value = false
  resetTimer()
  startTimer()
  emit('skip')
}

const nextCard = () => {
  if (hasStarted.value) {
    resetTimer()
    startTimer()
  }
}

const formatTime = (seconds: number): string => {
  const mins = Math.floor(seconds / 60)
  const secs = seconds % 60
  return `${mins.toString().padStart(2, '0')}:${secs.toString().padStart(2, '0')}`
}

const getTimerClass = () => {
  if (remainingTime.value <= 5) return 'timer-critical'
  if (remainingTime.value <= 10) return 'timer-warning'
  return 'timer-normal'
}

// Watch for props changes
watch(() => props.disabled, (disabled) => {
  if (disabled) {
    stopTimer()
  }
})

// Auto start if enabled
watch(() => props.autoStart, (autoStart) => {
  if (autoStart && !hasStarted.value) {
    startPractice()
  }
})

// Cleanup
onUnmounted(() => {
  stopTimer()
})

// Expose methods for parent component
defineExpose({
  startTimer,
  stopTimer,
  resetTimer,
  nextCard,
  hasStarted
})
</script>

<style scoped>
.timer-display {
  @apply flex items-center gap-2 px-3 py-2 rounded-lg font-medium;
}

.timer-normal {
  @apply bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-200;
}

.timer-warning {
  @apply bg-yellow-100 text-yellow-800 dark:bg-yellow-900 dark:text-yellow-200;
}

.timer-critical {
  @apply bg-red-100 text-red-800 dark:bg-red-900 dark:text-red-200;
  animation: pulse 1s infinite;
}

@keyframes pulse {
  0%, 100% { opacity: 1; }
  50% { opacity: 0.7; }
}
</style>
