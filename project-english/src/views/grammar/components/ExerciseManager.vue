<template>
  <!-- Exercise Manager Modal -->
  <div v-if="modelValue" class="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
    <div class="bg-white dark:bg-[#0a0a0a] rounded-xl shadow-2xl border border-gray-200 dark:border-gray-700 p-6 max-w-4xl w-full mx-4 max-h-[90vh] overflow-y-auto">
      <div class="flex items-center justify-between mb-6">
        <h3 class="text-lg font-semibold text-gray-900 dark:text-white">
          {{ t('grammar.practice.exerciseManager.title', 'Exercise Manager') }}
        </h3>
        <button
          @click="closeModal"
          class="p-2 rounded-lg text-gray-500 dark:text-gray-400 hover:text-gray-700 dark:hover:text-gray-200 hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors"
        >
          <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12" />
          </svg>
        </button>
      </div>
      
      <!-- Exercise Types Management -->
      <div class="space-y-6">
        <!-- Add New Exercise Type -->
        <div class="bg-gray-50 dark:bg-[#0a0a0a] border border-gray-200 dark:border-gray-700 rounded-lg p-4">
          <h4 class="text-md font-medium text-gray-900 dark:text-white mb-4">
            {{ t('grammar.practice.exerciseManager.addNew', 'Add new exercise type') }}
          </h4>
          <div class="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label class="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                {{ t('grammar.practice.exerciseManager.exerciseType', 'Exercise type') }}
              </label>
              <input
                v-model="newExercise.type"
                type="text"
                class="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-[#0a0a0a] text-gray-900 dark:text-white focus:ring-2 focus:ring-gray-500 focus:border-transparent"
                :placeholder="t('grammar.practice.exerciseManager.typePlaceholder', 'e.g. multiple-choice')"
              >
            </div>
            <div>
              <label class="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                {{ t('grammar.practice.exerciseManager.title', 'Title') }}
              </label>
              <input
                v-model="newExercise.title"
                type="text"
                class="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-[#0a0a0a] text-gray-900 dark:text-white focus:ring-2 focus:ring-gray-500 focus:border-transparent"
                :placeholder="t('grammar.practice.exerciseManager.titlePlaceholder', 'Enter exercise title')"
              >
            </div>
            <div class="md:col-span-2">
              <label class="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                {{ t('grammar.practice.exerciseManager.description', 'Description') }}
              </label>
              <textarea
                v-model="newExercise.description"
                rows="3"
                class="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-[#0a0a0a] text-gray-900 dark:text-white focus:ring-2 focus:ring-gray-500 focus:border-transparent"
                :placeholder="t('grammar.practice.exerciseManager.descriptionPlaceholder', 'Briefly describe this exercise')"
              ></textarea>
            </div>
            <div>
              <label class="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                {{ t('grammar.practice.exerciseManager.difficulty', 'Difficulty') }}
              </label>
              <select
                v-model="newExercise.difficulty"
                class="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-[#0a0a0a] text-gray-900 dark:text-white focus:ring-2 focus:ring-gray-500 focus:border-transparent"
              >
                <option value="easy">{{ t('grammar.practice.settings.levels.easy', 'Easy') }}</option>
                <option value="medium">{{ t('grammar.practice.settings.levels.medium', 'Medium') }}</option>
                <option value="hard">{{ t('grammar.practice.settings.levels.hard', 'Hard') }}</option>
              </select>
            </div>
            <div>
              <label class="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                {{ t('grammar.practice.exerciseManager.duration', 'Duration') }}
              </label>
              <input
                v-model="newExercise.duration"
                type="text"
                class="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-[#0a0a0a] text-gray-900 dark:text-white focus:ring-2 focus:ring-gray-500 focus:border-transparent"
                :placeholder="t('grammar.practice.exerciseManager.durationPlaceholder', 'e.g. 10-15 min')"
              >
            </div>
          </div>
          <div class="flex justify-end mt-4">
            <button
              @click="addExerciseType"
              class="px-4 py-2 text-sm font-medium text-white bg-gray-800 dark:bg-gray-700 rounded-lg hover:bg-gray-900 dark:hover:bg-gray-600 transition-colors"
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
              class="bg-white dark:bg-[#0a0a0a] border border-gray-200 dark:border-gray-700 rounded-lg p-4"
            >
              <div class="flex items-start justify-between">
                <div class="flex-1">
                  <div class="flex items-center space-x-2 mb-2">
                    <component :is="exercise.icon" class="w-5 h-5" :class="exercise.colorClass.replace('bg-', 'text-')" />
                    <h5 class="font-medium text-gray-900 dark:text-white">{{ tf(`grammar.practice.exercises.${exercise.type}.title`, exercise.title) }}</h5>
                  </div>
                  <p class="text-sm text-gray-600 dark:text-gray-400 mb-2">{{ tf(`grammar.practice.exercises.${exercise.type}.description`, exercise.description) }}</p>
                  <div class="flex items-center space-x-4 text-xs text-gray-500 dark:text-gray-400">
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
      
      <div class="flex justify-end space-x-4 mt-6">
        <button
          @click="closeModal"
          class="px-4 py-2 text-sm font-medium text-gray-700 dark:text-gray-300 bg-gray-100 dark:bg-[#0a0a0a] rounded-lg hover:bg-gray-200 dark:hover:bg-gray-600 transition-colors"
        >
          {{ t('common.cancel', 'Cancel') }}
        </button>
        <button
          @click="saveExerciseTypes"
          class="px-4 py-2 text-sm font-medium text-white bg-gray-800 dark:bg-gray-700 rounded-lg hover:bg-gray-900 dark:hover:bg-gray-600 transition-colors"
        >
          {{ t('common.save', 'Save') }}
        </button>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, reactive, watch } from 'vue'
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
</script>
