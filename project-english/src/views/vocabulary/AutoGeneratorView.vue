<template>
  <div class="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 dark:from-[#0a0a0a] dark:to-[#0f0f0f] relative overflow-x-hidden">
    <!-- Animated Background Elements -->
    <div class="absolute inset-0 overflow-hidden pointer-events-none z-0">
      <div class="floating-shapes">
        <div class="absolute top-20 left-10 w-64 h-64 bg-blue-300 dark:bg-blue-500 rounded-full mix-blend-multiply dark:mix-blend-normal filter blur-xl opacity-30 animate-blob"></div>
        <div class="absolute top-40 right-10 w-72 h-72 bg-purple-300 dark:bg-purple-500 rounded-full mix-blend-multiply dark:mix-blend-normal filter blur-xl opacity-30 animate-blob animation-delay-2000"></div>
        <div class="absolute -bottom-8 left-20 w-80 h-80 bg-pink-300 dark:bg-pink-500 rounded-full mix-blend-multiply dark:mix-blend-normal filter blur-xl opacity-30 animate-blob animation-delay-4000"></div>
      </div>
    </div>

    <!-- Header -->
    <div class="relative z-10 max-w-full sm:max-w-full md:max-w-full lg:max-w-7xl mx-auto px-2 xs:px-3 sm:px-4 md:px-6 lg:px-8 xl:px-10 2xl:px-12 pt-3 sm:pt-6">
      <div class="group bg-white/80 dark:bg-[#0a0a0a]/80 backdrop-blur-md shadow-xl hover:shadow-2xl rounded-2xl border border-white/20 dark:border-white/10 transition-all duration-500 hover:scale-[1.005] p-2 xs:p-3 sm:p-4 md:p-5 lg:p-6 mb-3 xs:mb-4 sm:mb-6">
        <div class="flex items-center mb-4">
          <div class="animate-pulse-slow">
            <div class="w-2.5 h-2.5 bg-gradient-to-r from-purple-400 to-pink-500 rounded-full mr-2.5"></div>
          </div>
          <h1 class="text-lg sm:text-xl font-bold bg-gradient-to-r from-purple-600 to-pink-600 dark:from-purple-400 dark:to-pink-400 bg-clip-text text-transparent">
            {{ t('autoGenerator.title', 'Auto Generator') }}
          </h1>
        </div>
        <p class="text-sm sm:text-base text-gray-600 dark:text-gray-300 mb-4">
          {{ t('autoGenerator.description', 'Generate vocabulary words automatically from text, topics, or AI suggestions') }}
        </p>
      </div>
    </div>

    <!-- Main Content -->
    <div class="relative z-10 max-w-full sm:max-w-full md:max-w-full lg:max-w-7xl mx-auto py-3 px-2 xs:py-4 xs:px-3 sm:py-6 sm:px-4 md:px-6 lg:px-8 xl:px-10 2xl:px-12 overflow-x-hidden">
      
      <!-- Generation Methods -->
      <div class="grid gap-6 md:grid-cols-2 lg:grid-cols-3 mb-6">
        
        <!-- Text Analysis Method -->
        <div class="group bg-white/80 dark:bg-[#0a0a0a]/80 backdrop-blur-md shadow-xl hover:shadow-2xl rounded-2xl border border-white/20 dark:border-white/10 transition-all duration-500 hover:scale-[1.02] p-4 sm:p-6">
          <div class="flex items-center mb-4">
            <div class="w-12 h-12 bg-gradient-to-r from-blue-500 to-cyan-500 rounded-full flex items-center justify-center mr-3">
              <svg class="w-6 h-6 text-white" fill="currentColor" viewBox="0 0 20 20">
                <path fill-rule="evenodd" d="M4 4a2 2 0 012-2h8a2 2 0 012 2v12a1 1 0 110 2h-3a1 1 0 01-1-1v-2a1 1 0 00-1-1H9a1 1 0 00-1 1v2a1 1 0 01-1 1H4a1 1 0 110-2V4zm3 1h2v2H7V5zm2 4H7v2h2V9zm2-4h2v2h-2V5zm2 4h-2v2h2V9z" clip-rule="evenodd" />
              </svg>
            </div>
            <h3 class="text-base sm:text-lg font-semibold text-gray-800 dark:text-white">
              {{ t('autoGenerator.methods.textAnalysis', 'Text Analysis') }}
            </h3>
          </div>
          <p class="text-sm text-gray-600 dark:text-gray-300 mb-4">
            {{ t('autoGenerator.methods.textAnalysisDesc', 'Extract vocabulary from articles, books, or any text content') }}
          </p>
          <button
            @click="selectedMethod = 'text'"
            :class="[
              'w-full py-2 px-4 rounded-lg font-medium transition-all duration-200',
              selectedMethod === 'text'
                ? 'bg-gradient-to-r from-blue-500 to-cyan-500 text-white shadow-lg'
                : 'bg-gray-100 dark:bg-dark-bg-mute text-gray-700 dark:text-gray-300 hover:bg-gray-200 dark:hover:bg-dark-bg-soft'
            ]"
          >
            {{ t('common.select', 'Select') }}
          </button>
        </div>

        <!-- Topic-based Method -->
        <div class="group bg-white/80 dark:bg-[#0a0a0a]/80 backdrop-blur-md shadow-xl hover:shadow-2xl rounded-2xl border border-white/20 dark:border-white/10 transition-all duration-500 hover:scale-[1.02] p-4 sm:p-6">
          <div class="flex items-center mb-4">
            <div class="w-12 h-12 bg-gradient-to-r from-green-500 to-teal-500 rounded-full flex items-center justify-center mr-3">
              <svg class="w-6 h-6 text-white" fill="currentColor" viewBox="0 0 20 20">
                <path d="M7 3a1 1 0 000 2h6a1 1 0 100-2H7zM4 7a1 1 0 011-1h10a1 1 0 110 2H5a1 1 0 01-1-1zM2 11a2 2 0 012-2h12a2 2 0 012 2v4a2 2 0 01-2 2H4a2 2 0 01-2-2v-4z" />
              </svg>
            </div>
            <h3 class="text-base sm:text-lg font-semibold text-gray-800 dark:text-white">
              {{ t('autoGenerator.methods.topicBased', 'Topic-based') }}
            </h3>
          </div>
          <p class="text-sm text-gray-600 dark:text-gray-300 mb-4">
            {{ t('autoGenerator.methods.topicBasedDesc', 'Generate words based on specific topics or categories') }}
          </p>
          <button
            @click="selectedMethod = 'topic'"
            :class="[
              'w-full py-2 px-4 rounded-lg font-medium transition-all duration-200',
              selectedMethod === 'topic'
                ? 'bg-gradient-to-r from-green-500 to-teal-500 text-white shadow-lg'
                : 'bg-gray-100 dark:bg-dark-bg-mute text-gray-700 dark:text-gray-300 hover:bg-gray-200 dark:hover:bg-dark-bg-soft'
            ]"
          >
            {{ t('common.select', 'Select') }}
          </button>
        </div>

        <!-- AI Suggestions Method -->
        <div class="group bg-white/80 dark:bg-[#0a0a0a]/80 backdrop-blur-md shadow-xl hover:shadow-2xl rounded-2xl border border-white/20 dark:border-white/10 transition-all duration-500 hover:scale-[1.02] p-4 sm:p-6">
          <div class="flex items-center mb-4">
            <div class="w-12 h-12 bg-gradient-to-r from-purple-500 to-pink-500 rounded-full flex items-center justify-center mr-3">
              <svg class="w-6 h-6 text-white" fill="currentColor" viewBox="0 0 20 20">
                <path fill-rule="evenodd" d="M11.49 3.17c-.38-1.56-2.6-1.56-2.98 0a1.532 1.532 0 01-2.286.948c-1.372-.836-2.942.734-2.106 2.106.54.886.061 2.042-.947 2.287-1.561.379-1.561 2.6 0 2.978a1.532 1.532 0 01.947 2.287c-.836 1.372.734 2.942 2.106 2.106a1.532 1.532 0 012.287.947c.379 1.561 2.6 1.561 2.978 0a1.533 1.533 0 012.287-.947c1.372.836 2.942-.734 2.106-2.106a1.533 1.533 0 01.947-2.287c1.561-.379 1.561-2.6 0-2.978a1.532 1.532 0 01-.947-2.287c.836-1.372-.734-2.942-2.106-2.106a1.532 1.532 0 01-2.287-.947zM10 13a3 3 0 100-6 3 3 0 000 6z" clip-rule="evenodd" />
              </svg>
            </div>
            <h3 class="text-base sm:text-lg font-semibold text-gray-800 dark:text-white">
              {{ t('autoGenerator.methods.aiSuggestions', 'AI Suggestions') }}
            </h3>
          </div>
          <p class="text-sm text-gray-600 dark:text-gray-300 mb-4">
            {{ t('autoGenerator.methods.aiSuggestionsDesc', 'Get intelligent word suggestions based on your learning level') }}
          </p>
          <button
            @click="selectedMethod = 'ai'"
            :class="[
              'w-full py-2 px-4 rounded-lg font-medium transition-all duration-200',
              selectedMethod === 'ai'
                ? 'bg-gradient-to-r from-purple-500 to-pink-500 text-white shadow-lg'
                : 'bg-gray-100 dark:bg-dark-bg-mute text-gray-700 dark:text-gray-300 hover:bg-gray-200 dark:hover:bg-dark-bg-soft'
            ]"
          >
            {{ t('common.select', 'Select') }}
          </button>
        </div>
      </div>

      <!-- Generation Form -->
      <div v-if="selectedMethod" class="bg-white/80 dark:bg-[#0a0a0a]/80 backdrop-blur-md shadow-xl rounded-2xl border border-white/20 dark:border-white/10 p-4 sm:p-6 mb-6">
        <!-- Text Analysis Form -->
        <div v-if="selectedMethod === 'text'" class="space-y-6">
          <div class="flex items-center mb-4">
            <div class="w-8 h-8 bg-gradient-to-r from-blue-500 to-cyan-500 rounded-full flex items-center justify-center mr-3">
              <svg class="w-4 h-4 text-white" fill="currentColor" viewBox="0 0 20 20">
                <path fill-rule="evenodd" d="M4 4a2 2 0 012-2h8a2 2 0 012 2v12a1 1 0 110 2h-3a1 1 0 01-1-1v-2a1 1 0 00-1-1H9a1 1 0 00-1 1v2a1 1 0 01-1 1H4a1 1 0 110-2V4zm3 1h2v2H7V5zm2 4H7v2h2V9zm2-4h2v2h-2V5zm2 4h-2v2h2V9z" clip-rule="evenodd" />
              </svg>
            </div>
            <h3 class="text-lg font-semibold text-gray-800 dark:text-white">
              {{ t('autoGenerator.forms.textAnalysis.title', 'Analyze Text Content') }}
            </h3>
          </div>
          
          <div>
            <label class="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
              {{ t('autoGenerator.forms.textAnalysis.inputLabel', 'Paste your text content here:') }}
            </label>
            <textarea
              v-model="textInput"
              :placeholder="t('autoGenerator.forms.textAnalysis.placeholder', 'Paste article, book excerpt, or any English text...')"
              class="w-full h-40 px-4 py-3 border border-gray-300 dark:border-dark-bg-mute rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent bg-white dark:bg-dark-bg-soft text-gray-900 dark:text-white resize-none"
              :disabled="isGenerating"
            ></textarea>
          </div>

          <div class="grid gap-4 md:grid-cols-2">
            <div>
              <label class="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                {{ t('autoGenerator.forms.common.difficultyLevel', 'Difficulty Level') }}
              </label>
              <select 
                v-model="difficultyLevel"
                class="w-full px-4 py-2 border border-gray-300 dark:border-dark-bg-mute rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent bg-white dark:bg-dark-bg-soft text-gray-900 dark:text-white"
                :disabled="isGenerating"
              >
                <option value="beginner">{{ t('autoGenerator.levels.beginner', 'Beginner') }}</option>
                <option value="intermediate">{{ t('autoGenerator.levels.intermediate', 'Intermediate') }}</option>
                <option value="advanced">{{ t('autoGenerator.levels.advanced', 'Advanced') }}</option>
                <option value="mixed">{{ t('autoGenerator.levels.mixed', 'Mixed Levels') }}</option>
              </select>
            </div>
            <div>
              <label class="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                {{ t('autoGenerator.forms.common.maxWords', 'Maximum Words') }}
              </label>
              <select 
                v-model="maxWords"
                class="w-full px-4 py-2 border border-gray-300 dark:border-dark-bg-mute rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent bg-white dark:bg-dark-bg-soft text-gray-900 dark:text-white"
                :disabled="isGenerating"
              >
                <option value="10">10</option>
                <option value="20">20</option>
                <option value="30">30</option>
                <option value="50">50</option>
              </select>
            </div>
          </div>
        </div>

        <!-- Generate Button -->
        <div class="flex justify-end mt-6">
          <button
            @click="generateVocabulary"
            :disabled="!canGenerate || isGenerating"
            :class="[
              'px-6 py-3 rounded-lg font-semibold transition-all duration-200 flex items-center space-x-2',
              canGenerate && !isGenerating
                ? 'bg-gradient-to-r from-blue-500 to-purple-500 hover:from-blue-600 hover:to-purple-600 text-white shadow-lg hover:shadow-xl transform hover:scale-105'
                : 'bg-gray-300 dark:bg-dark-bg-mute text-gray-500 dark:text-gray-400 cursor-not-allowed'
            ]"
          >
            <svg v-if="isGenerating" class="animate-spin w-5 h-5" fill="none" viewBox="0 0 24 24">
              <circle class="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" stroke-width="4"></circle>
              <path class="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 002 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
            </svg>
            <svg v-else class="w-5 h-5" fill="currentColor" viewBox="0 0 20 20">
              <path fill-rule="evenodd" d="M10 3a1 1 0 011 1v5h5a1 1 0 110 2h-5v5a1 1 0 11-2 0v-5H4a1 1 0 110-2h5V4a1 1 0 011-1z" clip-rule="evenodd" />
            </svg>
            <span>
              {{ isGenerating 
                ? t('autoGenerator.generating', 'Generating...') 
                : t('autoGenerator.generate', 'Generate Vocabulary') 
              }}
            </span>
          </button>
        </div>
      </div>

      <!-- Generated Words Preview -->
      <div v-if="generatedWords.length > 0" class="bg-white/80 dark:bg-[#0a0a0a]/80 backdrop-blur-md shadow-xl rounded-2xl border border-white/20 dark:border-white/10 p-4 sm:p-6">
        <div class="flex items-center justify-between mb-6">
          <div class="flex items-center">
            <div class="w-8 h-8 bg-gradient-to-r from-green-500 to-blue-500 rounded-full flex items-center justify-center mr-3">
              <svg class="w-4 h-4 text-white" fill="currentColor" viewBox="0 0 20 20">
                <path fill-rule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clip-rule="evenodd" />
              </svg>
            </div>
            <h3 class="text-lg font-semibold text-gray-800 dark:text-white">
              {{ t('autoGenerator.preview.title', 'Generated Vocabulary') }}
            </h3>
          </div>
          <div class="flex space-x-2">
            <button
              @click="saveAllWords"
              :disabled="isSaving"
              :class="[
                'px-4 py-2 rounded-lg font-medium transition-all duration-200 flex items-center space-x-2',
                'bg-gradient-to-r from-green-500 to-teal-500 hover:from-green-600 hover:to-teal-600 text-white shadow-lg hover:shadow-xl transform hover:scale-105'
              ]"
            >
              <svg class="w-4 h-4" fill="currentColor" viewBox="0 0 20 20">
                <path fill-rule="evenodd" d="M3 17a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1zm3.293-7.707a1 1 0 011.414 0L9 10.586V3a1 1 0 112 0v7.586l1.293-1.293a1 1 0 111.414 1.414l-3 3a1 1 0 01-1.414 0l-3-3a1 1 0 010-1.414z" clip-rule="evenodd" />
              </svg>
              <span>{{ t('autoGenerator.saveAll', 'Save All') }}</span>
            </button>
            <button
              @click="clearGenerated"
              class="px-4 py-2 rounded-lg font-medium text-red-600 dark:text-red-400 hover:bg-red-50 dark:hover:bg-red-900/20 transition-all duration-200"
            >
              {{ t('common.clear', 'Clear') }}
            </button>
          </div>
        </div>
        
        <div class="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
          <div 
            v-for="(word, index) in generatedWords" 
            :key="index"
            class="bg-gray-50 dark:bg-dark-bg-mute rounded-lg p-4 hover:shadow-md transition-shadow duration-200"
          >
            <div class="flex items-start justify-between mb-2">
              <h4 class="font-semibold text-gray-800 dark:text-white text-lg">
                {{ word.word }}
              </h4>
              <span class="text-xs px-2 py-1 bg-blue-100 dark:bg-blue-900/30 text-blue-600 dark:text-blue-400 rounded-full">
                {{ word.type }}
              </span>
            </div>
            <p class="text-sm text-gray-600 dark:text-gray-300 mb-3">
              {{ word.meaning }}
            </p>
            <div v-if="word.example" class="text-xs text-gray-500 dark:text-gray-400 italic border-l-2 border-gray-300 dark:border-gray-600 pl-2">
              "{{ word.example }}"
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, computed } from 'vue'
import { useI18n } from 'vue-i18n'
import { useVocabularyStore } from '../../composables/useVocabularyStore'
import { useToast, POSITION } from 'vue-toastification'

const { t } = useI18n()
const vocabularyStore = useVocabularyStore()
const toast = useToast()

// State
const selectedMethod = ref<'text' | 'topic' | 'ai' | null>(null)
const textInput = ref('')
const selectedTopic = ref('')
const aiPreferences = ref('')
const difficultyLevel = ref('intermediate')
const maxWords = ref('20')
const focusArea = ref('vocabulary')
const isGenerating = ref(false)
const isSaving = ref(false)
const generatedWords = ref<Array<{
  word: string
  meaning: string
  type: string
  example?: string
}>>([])

// Computed
const canGenerate = computed(() => {
  if (selectedMethod.value === 'text') {
    return textInput.value.trim().length > 10
  } else if (selectedMethod.value === 'topic') {
    return selectedTopic.value !== ''
  } else if (selectedMethod.value === 'ai') {
    return aiPreferences.value.trim().length > 5
  }
  return false
})

// Methods
const generateVocabulary = async () => {
  if (!canGenerate.value || isGenerating.value) return
  
  isGenerating.value = true
  
  try {
    // Simulate API call - In real implementation, call your backend service
    await new Promise(resolve => setTimeout(resolve, 2000))
    
    // Mock generated words - Replace with actual API response
    generatedWords.value = generateMockWords()
  } catch (error) {
    console.error('Error generating vocabulary:', error)
  } finally {
    isGenerating.value = false
  }
}

const generateMockWords = () => {
  const mockWords = [
    { word: 'Articulate', meaning: 'Having or showing the ability to speak fluently and coherently', type: 'Adjective', example: 'She gave an articulate presentation to the board.' },
    { word: 'Resilience', meaning: 'The capacity to recover quickly from difficulties', type: 'Noun', example: 'His resilience helped him overcome many challenges.' },
    { word: 'Innovative', meaning: 'Featuring new methods; advanced and original', type: 'Adjective', example: 'The company is known for its innovative products.' },
    { word: 'Collaborate', meaning: 'Work jointly on an activity', type: 'Verb', example: 'We need to collaborate to complete this project.' },
    { word: 'Efficient', meaning: 'Achieving maximum productivity with minimum effort', type: 'Adjective', example: 'The new system is more efficient than the old one.' }
  ]
  
  const count = Math.min(parseInt(maxWords.value), 10)
  return mockWords.slice(0, count)
}

const saveAllWords = async () => {
  if (generatedWords.value.length === 0) return
  
  isSaving.value = true
  
  try {
    let savedCount = 0
    
    for (const word of generatedWords.value) {
      // Convert generated word to vocabulary format
      const vocabularyData = {
        word: word.word,
        pronunciation: '', // Would be generated by TTS or manual input
        partOfSpeech: word.type,
        meaning: word.meaning,
        example: word.example || '',
        category: selectedTopic.value || 'uncategorized',
        level: difficultyLevel.value,
        synonyms: [],
        antonyms: [],
        notes: `Generated via ${selectedMethod.value} method`,
        favorite: false,
        image: undefined
      }
      
      // Add vocabulary to store
      const result = vocabularyStore.addVocabulary(vocabularyData)
      if (result) {
        savedCount++
      }
    }
    
    // Show success toast
    toast.success(
      t('autoGenerator.saveSuccess', `Successfully saved ${savedCount} words to your vocabulary list`),
      {
        position: POSITION.TOP_RIGHT,
        timeout: 3000
      }
    )
    
    // Clear after successful save
    generatedWords.value = []
    selectedMethod.value = null
    textInput.value = ''
    selectedTopic.value = ''
    aiPreferences.value = ''
    
  } catch (error) {
    console.error('Error saving vocabulary:', error)
    toast.error(
      t('autoGenerator.saveError', 'Failed to save vocabulary words'),
      {
        position: POSITION.TOP_RIGHT,
        timeout: 3000
      }
    )
  } finally {
    isSaving.value = false
  }
}

const clearGenerated = () => {
  generatedWords.value = []
}
</script>

<style scoped>
@keyframes blob {
  0% { transform: translate(0px, 0px) scale(1); }
  33% { transform: translate(30px, -50px) scale(1.1); }
  66% { transform: translate(-20px, 20px) scale(0.9); }
  100% { transform: translate(0px, 0px) scale(1); }
}

.animate-blob {
  animation: blob 7s infinite;
}

.animation-delay-2000 {
  animation-delay: 2s;
}

.animation-delay-4000 {
  animation-delay: 4s;
}

@keyframes pulse-slow {
  0%, 100% { opacity: 1; }
  50% { opacity: 0.5; }
}

.animate-pulse-slow {
  animation: pulse-slow 3s ease-in-out infinite;
}
</style>
