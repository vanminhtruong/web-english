<template>
  <div class="bg-white dark:bg-[#0a0a0a] rounded-xl shadow-lg p-8 border border-gray-200 dark:border-gray-700">
    <div class="text-center mb-8">
      <h2 class="text-2xl font-bold text-gray-900 dark:text-white mb-4">{{ t('quiz.setup.title') }}</h2>
      <p class="text-gray-600 dark:text-gray-400">{{ t('quiz.setup.description') }}</p>
    </div>
    
    <div class="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
      <div>
        <label class="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">{{ t('quiz.setup.type') }}</label>
        <select v-model="localSettings.type" class="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-md bg-white dark:bg-[#0a0a0a] text-gray-900 dark:text-white">
          <option value="vocabulary">{{ t('quiz.types.vocabulary') }}</option>
          <option value="grammar">{{ t('quiz.types.grammar') }}</option>
          <option value="mixed">{{ t('quiz.types.mixed') }}</option>
        </select>
      </div>
      
      <div>
        <label class="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">{{ t('quiz.setup.level') }}</label>
        <select v-model="localSettings.level" class="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-md bg-white dark:bg-[#0a0a0a] text-gray-900 dark:text-white">
          <option value="">{{ t('quiz.setup.allLevels') }}</option>
          <option v-for="level in availableLevels" :key="level" :value="level">
            {{ getLevelText(level) }}
          </option>
        </select>
      </div>
      
      <div>
        <label class="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">{{ t('quiz.setup.questionCount') }}</label>
        <select v-model="localSettings.questionCount" class="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-md bg-white dark:bg-[#0a0a0a] text-gray-900 dark:text-white">
          <option value="5">5 {{ t('quiz.progress.question').toLowerCase() }}</option>
          <option value="10">10 {{ t('quiz.progress.question').toLowerCase() }}</option>
          <option value="15">15 {{ t('quiz.progress.question').toLowerCase() }}</option>
          <option value="20">20 {{ t('quiz.progress.question').toLowerCase() }}</option>
        </select>
      </div>
      
      <div>
        <label class="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">{{ t('quiz.setup.timeLimit') }}</label>
        <select v-model="localSettings.timeLimit" class="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-md bg-white dark:bg-[#0a0a0a] text-gray-900 dark:text-white">
          <option value="0">{{ t('quiz.setup.unlimited') }}</option>
          <option value="5">5 {{ t('common.minutes') }}</option>
          <option value="10">10 {{ t('common.minutes') }}</option>
          <option value="15">15 {{ t('common.minutes') }}</option>
        </select>
      </div>
    </div>
    
    <div class="text-center">
      <button @click="handleStartQuiz" class="bg-purple-500 hover:bg-purple-600 text-white font-medium py-3 px-8 rounded-lg transition-colors">
        {{ t('quiz.setup.start') }}
      </button>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, watch } from 'vue'
import { useI18n } from 'vue-i18n'

interface QuizSettings {
  type: string
  level: string
  questionCount: string
  timeLimit: string
}

interface Props {
  settings: QuizSettings
  availableLevels?: string[]
}

const props = defineProps<Props>()

const emit = defineEmits<{
  'start-quiz': [settings: QuizSettings]
}>()

const { t } = useI18n()

const localSettings = ref<QuizSettings>({ ...props.settings })

watch(localSettings, (newSettings) => {
  emit('start-quiz', newSettings)
}, { deep: true })

const handleStartQuiz = () => {
  emit('start-quiz', localSettings.value)
}

// Helper function to get level display text
const getLevelText = (level: string) => {
  switch (level) {
    case 'beginner': return t('levels.beginner')
    case 'intermediate': return t('levels.intermediate')
    case 'advanced': return t('levels.advanced')
    default: return level
  }
}
</script>
