<template>
  <div class="practice-timer">
    <!-- Timer Display -->
    <div v-if="isActive" class="flex items-center justify-center gap-1 sm:gap-2 md:gap-3 mb-3 sm:mb-4 md:mb-5">
      <div class="timer-display" :class="getTimerClass()">
        <svg class="w-4 h-4 sm:w-5 sm:h-5 md:w-6 md:h-6" fill="currentColor" viewBox="0 0 20 20">
          <path fill-rule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm1-12a1 1 0 10-2 0v4a1 1 0 00.293.707l2.828 2.829a1 1 0 101.415-1.415L11 9.586V6z" clip-rule="evenodd"/>
        </svg>
        <span class="font-mono font-bold text-sm sm:text-base md:text-lg">{{ formatTime(remainingTime) }}</span>
      </div>
    </div>

    <!-- Start Practice Button -->
    <div v-if="!hasStarted" class="text-center mb-4 sm:mb-5 md:mb-6">
      <button
        @click="startPractice"
        class="bg-blue-500 hover:bg-blue-600 text-white px-4 py-2 sm:px-6 sm:py-3 md:px-8 md:py-4 rounded-lg sm:rounded-xl md:rounded-2xl font-semibold text-sm sm:text-base md:text-lg transition-colors shadow-lg hover:shadow-xl"
      >
        <svg class="w-4 h-4 sm:w-5 sm:h-5 md:w-6 md:h-6 inline-block mr-1 sm:mr-2 md:mr-3" fill="currentColor" viewBox="0 0 20 20">
          <path fill-rule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zM9.555 7.168A1 1 0 008 8v4a1 1 0 001.555.832l3-2a1 1 0 000-1.664l-3-2z" clip-rule="evenodd"/>
        </svg>
        {{ t('practice.timer.startPractice') }}
      </button>
      <div class="text-xs sm:text-sm md:text-base text-gray-500 dark:text-gray-400 mt-2">
        {{ t('practice.timer.timeLimit', { seconds: maxTime }) }}
      </div>
    </div>

    <!-- Timeout Modal -->
    <Teleport to="body">
      <div v-if="showTimeoutModal" class="timeout-modal-overlay" style="position: fixed !important; top: 0 !important; left: 0 !important; right: 0 !important; bottom: 0 !important; z-index: 99999 !important; background: rgba(0,0,0,0.5) !important; display: flex !important; align-items: center !important; justify-content: center !important; padding: 12px !important;">
        <div style="position: relative !important; z-index: 100000 !important;" class="timeout-modal-content bg-black bg-opacity-50 flex items-center justify-center z-[9999] p-3 sm:p-4 md:p-6">
        <div class="bg-white dark:bg-gray-800 rounded-xl p-4 sm:p-6 md:p-8 max-w-xs sm:max-w-sm md:max-w-md mx-auto text-center w-full">
          <div class="text-red-500 mb-3 sm:mb-4 md:mb-5">
            <svg class="w-12 h-12 sm:w-14 sm:h-14 md:w-16 md:h-16 mx-auto" fill="currentColor" viewBox="0 0 20 20">
              <path fill-rule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm1-12a1 1 0 10-2 0v4a1 1 0 00.293.707l2.828 2.829a1 1 0 101.415-1.415L11 9.586V6z" clip-rule="evenodd"/>
            </svg>
          </div>
          <h3 class="text-lg sm:text-xl md:text-2xl font-bold text-gray-900 dark:text-white mb-2 sm:mb-3 md:mb-4">
            {{ t('practice.timer.timeUp') }}
          </h3>
          <p class="text-sm sm:text-base md:text-lg text-gray-600 dark:text-gray-300 mb-4 sm:mb-5 md:mb-6 leading-relaxed">
            {{ t('practice.timer.timeUpMessage') }}
          </p>
          <div class="flex gap-2 sm:gap-3 md:gap-4">
            <button
              @click="restartPractice"
              class="flex-1 bg-blue-500 hover:bg-blue-600 text-white px-3 py-2 sm:px-4 sm:py-2 md:px-5 md:py-3 rounded-lg font-medium transition-colors text-xs sm:text-sm md:text-base"
            >
              {{ t('practice.timer.tryAgain') }}
            </button>
            <button
              @click="skipCard"
              class="flex-1 bg-gray-500 hover:bg-gray-600 text-white px-3 py-2 sm:px-4 sm:py-2 md:px-5 md:py-3 rounded-lg font-medium transition-colors text-xs sm:text-sm md:text-base"
            >
              {{ t('practice.timer.skip') }}
            </button>
          </div>
        </div>
        </div>
      </div>
    </Teleport>
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
  // Only stop the interval but keep isActive true to continue showing the timer
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

const resetPractice = () => {
  stopTimer()
  hasStarted.value = false
  remainingTime.value = props.maxTime
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
  hasStarted,
  resetPractice,
})
</script>

<style scoped>
.timer-display {
  @apply flex items-center gap-1 sm:gap-2 md:gap-3 px-2 py-1 sm:px-3 sm:py-2 md:px-4 md:py-3 rounded-lg font-medium;
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
