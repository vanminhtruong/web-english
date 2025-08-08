<template>
  <!-- Exercise Manager Modal -->
  <!-- Backdrop Transition -->
  <Transition appear
    enter-active-class="transition-all duration-500 ease-out"
    enter-from-class="opacity-0"
    enter-to-class="opacity-100"
    leave-active-class="transition-all duration-300 ease-in"
    leave-from-class="opacity-100"
    leave-to-class="opacity-0"
  >
    <div v-if="modelValue" class="fixed inset-0 bg-gray-600 bg-opacity-50 dark:bg-black/60 flex items-center justify-center p-4 z-50 backdrop-blur-sm">
      <!-- Dialog Container Transition -->
      <Transition appear
        enter-active-class="transition-all duration-500 ease-out"
        enter-from-class="opacity-0 scale-90 translate-y-8 rotate-1"
        enter-to-class="opacity-100 scale-100 translate-y-0 rotate-0"
        leave-active-class="transition-all duration-300 ease-in"
        leave-from-class="opacity-100 scale-100 translate-y-0 rotate-0"
        leave-to-class="opacity-0 scale-90 translate-y-8 rotate-1"
      >
        <div class="w-full max-h-[90vh] flex flex-col max-w-full sm:max-w-lg md:max-w-2xl lg:max-w-4xl">
          <!-- Modal Surface -->
          <div class="bg-white dark:bg-[#0a0a0a] rounded-xl shadow-2xl border-0 dark:border dark:border-gray-custom flex flex-col h-full overflow-hidden transform transform-gpu will-change-transform" @click.stop>
            <!-- Header -->
            <div class="px-6 py-4 border-b-0 dark:border-b dark:border-gray-custom flex-shrink-0 bg-gradient-to-r from-blue-50 to-indigo-50 dark:from-[#0a0a0a] dark:to-[#0a0a0a]">
              <div class="flex items-center justify-between">
                <h3 class="text-lg sm:text-xl md:text-2xl font-semibold text-gray-900 dark:text-white flex items-center space-x-2">
                  <span class="w-2 h-2 bg-blue-500 rounded-full animate-pulse"></span>
                  <span>{{ t('grammar.practice.exerciseManager.title', 'Exercise Manager') }}</span>
                </h3>
                <button
                  @click="closeModal"
                  class="text-gray-400 hover:text-gray-600 dark:text-white/60 dark:hover:text-white transition-all duration-300 hover:scale-110 hover:rotate-90 p-1 rounded-full hover:bg-gray-100 dark:hover:bg-white/10"
                  aria-label="Close"
                >
                  <svg class="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12" />
                  </svg>
                </button>
              </div>
            </div>

            <!-- Body (scrollable) -->
            <div class="px-6 py-4 flex-1 overflow-y-auto min-h-0">
              <!-- Exercise Types Management -->
              <div class="space-y-6">
        <!-- Add New Exercise Type -->
        <div class="bg-white dark:bg-gray-custom border-0 dark:border dark:border-gray-custom rounded-lg p-4 animate-fade-in-up ring-1 ring-gray-100 dark:ring-0" style="animation-delay: 0.1s">
          <h4 class="text-md font-medium text-gray-900 dark:text-white mb-4">
            {{ t('grammar.practice.exerciseManager.addNew', 'Add new exercise type') }}
          </h4>
          <div class="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div class="animate-fade-in-up" style="animation-delay: 0.2s">
              <label class="block text-sm font-medium text-gray-700 dark:text-white/80 mb-2">
                {{ t('grammar.practice.exerciseManager.exerciseType', 'Exercise type') }}
              </label>
              <input
                v-model="newExercise.type"
                type="text"
                class="w-full px-3 py-2 border-0 dark:border dark:border-gray-custom rounded-lg bg-white dark:bg-gray-custom text-gray-900 dark:text-white ring-1 ring-gray-200/50 dark:ring-0 shadow-sm dark:shadow-none focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-300 dark:hover:border-blue-500 transform hover:scale-[1.02]"
                :placeholder="t('grammar.practice.exerciseManager.typePlaceholder', 'e.g. multiple-choice')"
              >
            </div>
            <div class="animate-fade-in-up" style="animation-delay: 0.3s">
              <label class="block text-sm font-medium text-gray-700 dark:text-white/80 mb-2">
                {{ t('grammar.practice.exerciseManager.title', 'Title') }}
              </label>
              <input
                v-model="newExercise.title"
                type="text"
                class="w-full px-3 py-2 border-0 dark:border dark:border-gray-custom rounded-lg bg-white dark:bg-gray-custom text-gray-900 dark:text-white ring-1 ring-gray-200/50 dark:ring-0 shadow-sm dark:shadow-none focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-300 dark:hover:border-blue-500 transform hover:scale-[1.02]"
                :placeholder="t('grammar.practice.exerciseManager.titlePlaceholder', 'Enter exercise title')"
              >
            </div>
            <div class="md:col-span-2 animate-fade-in-up" style="animation-delay: 0.4s">
              <label class="block text-sm font-medium text-gray-700 dark:text-white/80 mb-2">
                {{ t('grammar.practice.exerciseManager.description', 'Description') }}
              </label>
              <textarea
                v-model="newExercise.description"
                rows="3"
                class="w-full px-3 py-2 border-0 dark:border dark:border-gray-custom rounded-lg bg-white dark:bg-gray-custom text-gray-900 dark:text-white ring-1 ring-gray-200/50 dark:ring-0 shadow-sm dark:shadow-none focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-300 dark:hover:border-blue-500 transform hover:scale-[1.02]"
                :placeholder="t('grammar.practice.exerciseManager.descriptionPlaceholder', 'Briefly describe this exercise')"
              ></textarea>
            </div>
            <div class="animate-fade-in-up" style="animation-delay: 0.5s">
              <label class="block text-sm font-medium text-gray-700 dark:text-white/80 mb-2">
                {{ t('grammar.practice.exerciseManager.difficulty', 'Difficulty') }}
              </label>
              <select
                v-model="newExercise.difficulty"
                class="w-full px-3 py-2 border-0 dark:border dark:border-gray-custom rounded-lg bg-white dark:bg-gray-custom text-gray-900 dark:text-white ring-1 ring-gray-200/50 dark:ring-0 shadow-sm dark:shadow-none focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-300 dark:hover:border-blue-500 transform hover:scale-[1.02] cursor-pointer"
              >
                <option value="easy">{{ t('grammar.practice.settings.levels.easy', 'Easy') }}</option>
                <option value="medium">{{ t('grammar.practice.settings.levels.medium', 'Medium') }}</option>
                <option value="hard">{{ t('grammar.practice.settings.levels.hard', 'Hard') }}</option>
              </select>
            </div>
            <div>
              <label class="block text-sm font-medium text-gray-700 dark:text-white/80 mb-2">
                {{ t('grammar.practice.exerciseManager.duration', 'Duration') }}
              </label>
              <input
                v-model="newExercise.duration"
                type="text"
                class="w-full px-3 py-2 border-0 dark:border dark:border-gray-custom rounded-lg bg-white dark:bg-gray-custom text-gray-900 dark:text-white ring-1 ring-gray-200/50 dark:ring-0 shadow-sm dark:shadow-none focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-300 dark:hover:border-blue-500 transform hover:scale-[1.02]"
                :placeholder="t('grammar.practice.exerciseManager.durationPlaceholder', 'e.g. 10-15 min')"
              >
            </div>
          </div>
          <div class="flex justify-end mt-4 animate-fade-in-up" style="animation-delay: 0.7s">
            <button
              @click="addExerciseType"
              class="px-5 py-2 text-sm font-medium text-white bg-gradient-to-r from-blue-500 to-blue-600 rounded-lg hover:from-blue-600 hover:to-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 transition-all duration-300 hover:scale-105 hover:shadow-lg"
            >
              {{ t('grammar.practice.exerciseManager.add', 'Add') }}
            </button>
          </div>
        </div>
        
        <!-- Existing Exercise Types -->
        <div>
          <h4 class="text-md font-medium text-gray-900 dark:text-white mb-4">
            {{ t('grammar.practice.exerciseManager.existing', 'Existing exercise types') }}
          </h4>
          <div class="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div
              v-for="(exercise, index) in exerciseTypes"
              :key="exercise.type"
              class="bg-white dark:bg-gray-custom border-0 dark:border dark:border-gray-custom rounded-lg p-4 ring-1 ring-gray-100 dark:ring-0"
            >
              <div class="flex items-start justify-between">
                <div class="flex-1">
                  <div class="flex items-center space-x-2 mb-2">
                    <component :is="exercise.icon" class="w-5 h-5" :class="exercise.colorClass.replace('bg-', 'text-')" />
                    <h5 class="font-medium text-gray-900 dark:text-white">{{ tf(`grammar.practice.exercises.${exercise.type}.title`, exercise.title) }}</h5>
                  </div>
                  <p class="text-sm text-gray-600 dark:text-white/60 mb-2">{{ tf(`grammar.practice.exercises.${exercise.type}.description`, exercise.description) }}</p>
                  <div class="flex items-center space-x-4 text-xs text-gray-500 dark:text-white/60">
                    <span>{{ exercise.difficulty }}</span>
                    <span>{{ exercise.duration }}</span>
                  </div>
                </div>
                <div class="flex items-center space-x-2 ml-4">
                  <button
                    @click="openQuestionManager(exercise.type)"
                    class="p-1 rounded text-green-600 dark:text-green-400 hover:bg-green-100 dark:hover:bg-green-900/30 transition-colors"
                    :title="t('grammar.practice.exerciseManager.manageQuestions', 'Manage questions')"
                  >
                    <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                    </svg>
                  </button>
                  <button
                    @click="editExerciseType(index)"
                    class="p-1 rounded text-blue-600 dark:text-blue-400 hover:bg-blue-100 dark:hover:bg-blue-900/30 transition-colors"
                    :title="t('common.edit', 'Edit')"
                  >
                    <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z" />
                    </svg>
                  </button>
                  <button
                    @click="deleteExerciseType(index)"
                    class="p-1 rounded text-red-600 dark:text-red-400 hover:bg-red-100 dark:hover:bg-red-900/30 transition-colors"
                    :title="t('common.delete', 'Delete')"
                  >
                    <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
                    </svg>
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
            
            <!-- close body container -->
            </div>

            <!-- Footer -->
            <div class="px-6 py-4 border-t-0 dark:border-t dark:border-gray-custom flex-shrink-0 bg-gradient-to-r from-gray-50 to-blue-50 dark:from-[#0a0a0a] dark:to-[#0a0a0a]">
              <div class="flex justify-end space-x-3">
              <button
                @click="closeModal"
                class="px-6 py-2 text-gray-700 dark:text-white/80 bg-gray-100 dark:bg-gray-custom hover:bg-gray-200 dark:hover:bg-white/10 rounded-lg transition-all duration-300 hover:scale-105 hover:shadow-lg font-medium"
              >
                {{ t('common.cancel', 'Cancel') }}
              </button>
              <button
                @click="saveExerciseTypes"
                class="px-6 py-2 bg-gradient-to-r from-blue-500 to-blue-600 text-white rounded-lg hover:from-blue-600 hover:to-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 transition-all duration-300 hover:scale-105 hover:shadow-lg font-medium"
              >
                {{ t('common.save', 'Save') }}
              </button>
              </div>
            </div>
          </div>
        </div>
      </Transition>
    </div>
  </Transition>
</template>

<script setup lang="ts">
import { ref, reactive, watch, onUnmounted } from 'vue'
import { useI18n } from 'vue-i18n'

// Props
interface Props {
  modelValue: boolean
  exerciseTypes: any[]
}

const props = defineProps<Props>()

// Emits
const emit = defineEmits<{
  'update:modelValue': [value: boolean]
  'add-exercise': [exercise: any]
  'edit-exercise': [index: number, exercise: any]
  'delete-exercise': [index: number]
  'save-exercises': []
  'open-question-manager': [exerciseType: string]
}>()

// Composables
const { t } = useI18n()
// Helper: i18n with safe fallback
const tf = (key: string, fallback: string, params?: Record<string, any>) => {
  const translated = params ? (t as any)(key, params) : (t as any)(key)
  const text = typeof translated === 'string' ? translated : String(translated)
  if (text === key) return fallback
  return text
}

// Reactive data
const newExercise = reactive({
  type: '',
  title: '',
  description: '',
  difficulty: 'easy',
  duration: '',
  icon: 'BookOpenIcon',
  colorClass: 'bg-gray-500'
})

// Methods
const closeModal = () => {
  emit('update:modelValue', false)
}

const addExerciseType = () => {
  if (!newExercise.type || !newExercise.title || !newExercise.description) {
    return
  }
  
  const exerciseToAdd = {
    ...newExercise,
    icon: getIconForType(newExercise.type),
    colorClass: getColorForType(newExercise.type)
  }
  
  emit('add-exercise', exerciseToAdd)
  
  // Reset form
  Object.assign(newExercise, {
    type: '',
    title: '',
    description: '',
    difficulty: 'easy',
    duration: '',
    icon: 'BookOpenIcon',
    colorClass: 'bg-gray-500'
  })
}

const editExerciseType = (index: number) => {
  const exercise = props.exerciseTypes[index]
  Object.assign(newExercise, exercise)
  emit('edit-exercise', index, exercise)
}

const deleteExerciseType = (index: number) => {
  if (confirm(t('common.confirmDelete', 'Are you sure you want to delete this?'))) {
    emit('delete-exercise', index)
  }
}

const saveExerciseTypes = () => {
  emit('save-exercises')
  closeModal()
}

const openQuestionManager = (exerciseType: string) => {
  emit('open-question-manager', exerciseType)
}

// Helper functions
const getIconForType = (type: string) => {
  const iconMap: Record<string, string> = {
    'multiple-choice': 'CheckCircleIcon',
    'fill-blank': 'PencilIcon',
    'writing': 'DocumentTextIcon',
    'listening': 'SpeakerWaveIcon',
    'reading': 'BookOpenIcon',
    'grammar': 'AcademicCapIcon'
  }
  return iconMap[type] || 'BookOpenIcon'
}

const getColorForType = (type: string) => {
  const colorMap: Record<string, string> = {
    'multiple-choice': 'bg-gray-500',
    'fill-blank': 'bg-green-500',
    'writing': 'bg-purple-500',
    'listening': 'bg-orange-500',
    'reading': 'bg-indigo-500',
    'grammar': 'bg-red-500'
  }
  return colorMap[type] || 'bg-gray-500'
}

// Watch for modal close
watch(() => props.modelValue, (newValue) => {
  if (!newValue) {
    // Reset form when modal closes
    Object.assign(newExercise, {
      type: '',
      title: '',
      description: '',
      difficulty: 'easy',
      duration: '',
      icon: 'BookOpenIcon',
      colorClass: 'bg-gray-500'
    })
  }
})

// Body scroll lock to prevent page scroll behind modal
const lockBodyScroll = () => {
  document.body.style.overflow = 'hidden'
}
const unlockBodyScroll = () => {
  document.body.style.overflow = ''
}

watch(() => props.modelValue, (open) => {
  if (open) lockBodyScroll()
  else unlockBodyScroll()
}, { immediate: true })

onUnmounted(() => {
  unlockBodyScroll()
})
</script>
