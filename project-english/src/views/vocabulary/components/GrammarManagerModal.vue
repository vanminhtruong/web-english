<template>
  <div>
    <!-- Backdrop -->
    <Transition
      enter-active-class="transition-all duration-500 ease-out"
      enter-from-class="opacity-0"
      enter-to-class="opacity-100"
      leave-active-class="transition-all duration-300 ease-in"
      leave-from-class="opacity-100"
      leave-to-class="opacity-0"
    >
      <div 
        v-if="props.modelValue" 
        class="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50 backdrop-blur-sm"
      >
        <!-- Modal Container -->
        <Transition
          enter-active-class="transition-all duration-500 ease-out"
          enter-from-class="opacity-0 scale-90 translate-y-8 rotate-1"
          enter-to-class="opacity-100 scale-100 translate-y-0 rotate-0"
          leave-active-class="transition-all duration-300 ease-in"
          leave-from-class="opacity-100 scale-100 translate-y-0 rotate-0"
          leave-to-class="opacity-0 scale-90 translate-y-8 rotate-1"
        >
          <div class="w-full max-w-4xl">
            <!-- Modal Content -->
            <div 
              class="bg-white dark:bg-[#0a0a0a] shadow-2xl rounded-xl border border-gray-200 dark:border-gray-700 transform overflow-hidden"
              @click.stop
            >
              <!-- Header -->
              <div class="px-6 py-4 border-b border-gray-200 dark:border-gray-700 bg-gradient-to-r from-blue-50 to-indigo-50 dark:from-[#0a0a0a] dark:to-[#0a0a0a]">
                <div class="flex items-center justify-between">
                  <h3 class="text-lg sm:text-xl md:text-2xl font-semibold text-gray-900 dark:text-white flex items-center space-x-2">
                    <span class="w-2 h-2 bg-blue-500 rounded-full animate-pulse"></span>
                    <span>{{ t('grammar.manager.title', 'Grammar Manager') }}</span>
                  </h3>
                  <button
                    @click="closeModal"
                    class="text-gray-400 hover:text-gray-600 dark:hover:text-gray-200 transition-all duration-300 hover:scale-110 hover:rotate-90 p-1 rounded-full hover:bg-gray-100 dark:hover:bg-gray-800"
                  >
                    <svg class="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12"></path>
                    </svg>
                  </button>
                </div>
              </div>

              <!-- Content -->
              <div class="px-6 py-4 max-h-[70vh] overflow-y-auto">
                <!-- Add New Grammar Form -->
                <div class="mb-6 p-4 bg-gray-50 dark:bg-dark-bg-mute rounded-lg border border-gray-200 dark:border-dark-bg-mute animate-fade-in-up" style="animation-delay: 0.1s">
                  <h4 class="text-md font-medium text-gray-900 dark:text-white mb-4 flex items-center">
                    <span class="w-1 h-4 bg-blue-500 rounded mr-2"></span>
                    {{ isEditing ? t('grammar.manager.editGrammar', 'Edit Grammar Rule') : t('grammar.manager.addNew', 'Add New Grammar Rule') }}
                  </h4>
                  
                  <form @submit.prevent="saveGrammar" class="space-y-4">
                    <!-- Title -->
                    <div class="animate-fade-in-up" style="animation-delay: 0.2s">
                      <label class="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2 flex items-center">
                        <span class="w-1 h-4 bg-green-500 rounded mr-2"></span>
                        {{ t('grammar.manager.title', 'Title') }} <span class="text-red-500 ml-1">*</span>
                      </label>
                      <input
                        v-model="formData.title"
                        type="text"
                        required
                        class="w-full px-3 py-2 border border-gray-300 dark:border-dark-bg-mute rounded-lg bg-white dark:bg-dark-bg-soft text-gray-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-transparent transition-all duration-300 hover:border-green-400 dark:hover:border-green-500 transform hover:scale-[1.02]"
                        :placeholder="t('grammar.manager.titlePlaceholder', 'e.g., Present Perfect Tense')"
                      />
                    </div>

                    <!-- Category -->
                    <div class="animate-fade-in-up" style="animation-delay: 0.3s">
                      <label class="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2 flex items-center">
                        <span class="w-1 h-4 bg-purple-500 rounded mr-2"></span>
                        {{ t('grammar.manager.category', 'Category') }} <span class="text-red-500 ml-1">*</span>
                      </label>
                      <select
                        v-model="formData.category"
                        required
                        class="w-full px-3 py-2 border border-gray-300 dark:border-dark-bg-mute rounded-lg bg-white dark:bg-dark-bg-soft text-gray-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent transition-all duration-300 hover:border-purple-400 dark:hover:border-purple-500 transform hover:scale-[1.02] cursor-pointer"
                      >
                  <option value="">{{ t('grammar.manager.selectCategory', 'Select Category') }}</option>
                  <option value="tenses">{{ t('grammar.categories.tenses', 'Tenses') }}</option>
                  <option value="conditionals">{{ t('grammar.categories.conditionals', 'Conditionals') }}</option>
                  <option value="passive">{{ t('grammar.categories.passive', 'Passive Voice') }}</option>
                  <option value="modals">{{ t('grammar.categories.modals', 'Modal Verbs') }}</option>
                  <option value="articles">{{ t('grammar.categories.articles', 'Articles') }}</option>
                  <option value="prepositions">{{ t('grammar.categories.prepositions', 'Prepositions') }}</option>
                  <option value="conjunctions">{{ t('grammar.categories.conjunctions', 'Conjunctions') }}</option>
                  <option value="other">{{ t('grammar.categories.other', 'Other') }}</option>
                </select>
                    </div>

                    <!-- Level -->
                    <div class="animate-fade-in-up" style="animation-delay: 0.4s">
                      <label class="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2 flex items-center">
                        <span class="w-1 h-4 bg-orange-500 rounded mr-2"></span>
                        {{ t('grammar.manager.level', 'Level') }} <span class="text-red-500 ml-1">*</span>
                      </label>
                      <select
                        v-model="formData.level"
                        required
                        class="w-full px-3 py-2 border border-gray-300 dark:border-dark-bg-mute rounded-lg bg-white dark:bg-dark-bg-soft text-gray-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-orange-500 focus:border-transparent transition-all duration-300 hover:border-orange-400 dark:hover:border-orange-500 transform hover:scale-[1.02] cursor-pointer"
                      >
                  <option value="">{{ t('grammar.manager.selectLevel', 'Select Level') }}</option>
                        <option value="beginner">{{ t('grammar.levels.beginner', 'Beginner') }}</option>
                        <option value="intermediate">{{ t('grammar.levels.intermediate', 'Intermediate') }}</option>
                        <option value="advanced">{{ t('grammar.levels.advanced', 'Advanced') }}</option>
                      </select>
                    </div>

                    <!-- Formula -->
                    <div class="animate-fade-in-up" style="animation-delay: 0.5s">
                      <label class="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2 flex items-center">
                        <span class="w-1 h-4 bg-yellow-500 rounded mr-2"></span>
                        {{ t('grammar.manager.formula', 'Grammar Formula') }} <span class="text-red-500 ml-1">*</span>
                      </label>
                      <textarea
                        v-model="formData.formula"
                        required
                        rows="3"
                        class="w-full px-3 py-2 border border-gray-300 dark:border-dark-bg-mute rounded-lg bg-white dark:bg-dark-bg-soft text-gray-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-yellow-500 focus:border-transparent transition-all duration-300 hover:border-yellow-400 dark:hover:border-yellow-500 transform hover:scale-[1.02] resize-none"
                        :placeholder="t('grammar.manager.formulaPlaceholder', 'e.g., Subject + have/has + past participle')"
                      ></textarea>
                    </div>

                    <!-- Description -->
                    <div class="animate-fade-in-up" style="animation-delay: 0.6s">
                      <label class="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2 flex items-center">
                        <span class="w-1 h-4 bg-teal-500 rounded mr-2"></span>
                        {{ t('grammar.manager.description', 'Description') }}
                      </label>
                      <textarea
                        v-model="formData.description"
                        rows="3"
                        class="w-full px-3 py-2 border border-gray-300 dark:border-dark-bg-mute rounded-lg bg-white dark:bg-dark-bg-soft text-gray-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-teal-500 focus:border-transparent transition-all duration-300 hover:border-teal-400 dark:hover:border-teal-500 transform hover:scale-[1.02] resize-none"
                        :placeholder="t('grammar.manager.descriptionPlaceholder', 'Explain when and how to use this grammar rule')"
                      ></textarea>
                    </div>

                    <!-- Examples -->
                    <div class="animate-fade-in-up" style="animation-delay: 0.7s">
                      <label class="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2 flex items-center">
                        <span class="w-1 h-4 bg-pink-500 rounded mr-2"></span>
                        {{ t('grammar.manager.examples', 'Examples') }}
                      </label>
                      <div class="space-y-2">
                        <div v-for="(example, index) in formData.examples" :key="index" class="flex items-center space-x-2">
                          <input
                            v-model="formData.examples[index]"
                            type="text"
                            class="flex-1 px-3 py-2 border border-gray-300 dark:border-dark-bg-mute rounded-lg bg-white dark:bg-dark-bg-soft text-gray-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-pink-500 focus:border-transparent transition-all duration-300 hover:border-pink-400 dark:hover:border-pink-500 transform hover:scale-[1.02]"
                            :placeholder="t('grammar.manager.examplePlaceholder', 'e.g., I have finished my homework.')"
                          />
                          <button
                            type="button"
                            @click="removeExample(index)"
                            class="text-red-500 hover:text-red-700 p-1 rounded-full hover:bg-red-50 dark:hover:bg-red-900/20 transition-all duration-300 hover:scale-110"
                          >
                            <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12"></path>
                            </svg>
                          </button>
                        </div>
                        <button
                          type="button"
                          @click="addExample"
                          class="text-blue-600 hover:text-blue-800 dark:text-blue-400 dark:hover:text-blue-300 text-sm font-medium transition-all duration-300 hover:scale-105"
                        >
                          + {{ t('grammar.manager.addExample', 'Add Example') }}
                        </button>
                      </div>
                    </div>

                    <!-- Form Actions -->
                    <div class="flex justify-end space-x-3 pt-4 animate-fade-in-up" style="animation-delay: 0.8s">
                      <button
                        type="button"
                        @click="resetForm"
                        class="px-4 py-2 text-gray-700 dark:text-gray-300 bg-gray-100 dark:bg-gray-700 hover:bg-gray-200 dark:hover:bg-gray-600 rounded-lg transition-all duration-300 transform hover:scale-105 hover:shadow-md"
                      >
                        {{ t('common.cancel', 'Cancel') }}
                      </button>
                      <button
                        type="submit"
                        class="px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded-lg transition-all duration-300 transform hover:scale-105 hover:shadow-lg"
                      >
                        {{ isEditing ? t('common.update', 'Update') : t('common.add', 'Add') }}
                      </button>
                    </div>
                  </form>
                </div>

                <!-- Grammar Rules List -->
                <div class="animate-fade-in-up" style="animation-delay: 0.9s">
                  <div class="flex items-center justify-between mb-4">
                    <h4 class="text-md font-medium text-gray-900 dark:text-white flex items-center">
                      <span class="w-1 h-4 bg-indigo-500 rounded mr-2"></span>
                      {{ t('grammar.manager.existingRules', 'Grammar Rules') }}
                    </h4>
                    
                    <!-- Filter by Category -->
                    <select
                      v-model="filterCategory"
                      class="px-3 py-1 border border-gray-300 dark:border-dark-bg-mute rounded-lg bg-white dark:bg-dark-bg-soft text-gray-900 dark:text-white text-sm focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent transition-all duration-300 hover:border-indigo-400 dark:hover:border-indigo-500 cursor-pointer"
                    >
                <option value="">{{ t('common.all', 'All Categories') }}</option>
                <option value="tenses">{{ t('grammar.categories.tenses', 'Tenses') }}</option>
                <option value="conditionals">{{ t('grammar.categories.conditionals', 'Conditionals') }}</option>
                <option value="passive">{{ t('grammar.categories.passive', 'Passive Voice') }}</option>
                <option value="modals">{{ t('grammar.categories.modals', 'Modal Verbs') }}</option>
                <option value="articles">{{ t('grammar.categories.articles', 'Articles') }}</option>
                <option value="prepositions">{{ t('grammar.categories.prepositions', 'Prepositions') }}</option>
                <option value="conjunctions">{{ t('grammar.categories.conjunctions', 'Conjunctions') }}</option>
                <option value="other">{{ t('grammar.categories.other', 'Other') }}</option>
              </select>
            </div>

                  <!-- Grammar Rules Cards -->
                  <div v-if="filteredGrammarRules.length > 0" class="space-y-4 max-h-96 overflow-y-auto scrollbar-custom">
                    <div
                      v-for="(rule, index) in filteredGrammarRules"
                      :key="rule.id"
                      class="p-4 border border-gray-200 dark:border-dark-bg-mute rounded-lg bg-white dark:bg-dark-bg-mute animate-fade-in-up transition-all duration-300 hover:shadow-lg hover:scale-[1.02]"
                      :style="`animation-delay: ${1.0 + (index * 0.1)}s`"
                    >
                      <div class="flex items-start justify-between">
                        <div class="flex-1">
                          <div class="flex items-center space-x-2 mb-2">
                            <h5 class="font-medium text-gray-900 dark:text-white">{{ rule.title }}</h5>
                            <span class="px-2 py-1 text-xs bg-blue-100 dark:bg-blue-900/50 text-blue-800 dark:text-blue-300 rounded-full">
                              {{ t(`grammar.categories.${rule.category}`, rule.category) }}
                            </span>
                            <span class="px-2 py-1 text-xs bg-green-100 dark:bg-green-900/50 text-green-800 dark:text-green-300 rounded-full">
                              {{ t(`grammar.levels.${rule.level}`, rule.level) }}
                            </span>
                          </div>
                          
                          <div class="mb-2">
                            <p class="text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                              {{ t('grammar.manager.formula', 'Formula') }}:
                            </p>
                            <p class="text-sm text-gray-600 dark:text-gray-400 font-mono bg-gray-50 dark:bg-gray-800 p-2 rounded">
                              {{ rule.formula }}
                            </p>
                          </div>

                          <div v-if="rule.description" class="mb-2">
                            <p class="text-sm text-gray-600 dark:text-gray-400">{{ rule.description }}</p>
                          </div>

                          <div v-if="rule.examples && rule.examples.length > 0" class="mb-2">
                            <p class="text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                              {{ t('grammar.manager.examples', 'Examples') }}:
                            </p>
                            <ul class="text-sm text-gray-600 dark:text-gray-400 space-y-1">
                              <li v-for="example in rule.examples" :key="example" class="flex items-start">
                                <span class="text-gray-400 mr-2">•</span>
                                <span>{{ example }}</span>
                              </li>
                            </ul>
                          </div>

                          <p class="text-xs text-gray-500 dark:text-gray-400">
                            {{ t('grammar.manager.createdAt', 'Created') }}: {{ formatDate(rule.createdAt) }}
                          </p>
                        </div>

                        <!-- Actions -->
                        <div class="flex items-center space-x-2 ml-4">
                          <button
                            @click="editGrammar(rule)"
                            class="text-blue-600 hover:text-blue-800 dark:text-blue-400 dark:hover:text-blue-300 p-1 rounded-full hover:bg-blue-50 dark:hover:bg-blue-900/20 transition-all duration-300 hover:scale-110"
                            :title="t('common.edit', 'Edit')"
                          >
                            <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z"></path>
                            </svg>
                          </button>
                          <button
                            @click="deleteGrammar(rule.id)"
                            class="text-red-600 hover:text-red-800 dark:text-red-400 dark:hover:text-red-300 p-1 rounded-full hover:bg-red-50 dark:hover:bg-red-900/20 transition-all duration-300 hover:scale-110"
                            :title="t('common.delete', 'Delete')"
                          >
                            <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 7l-.867 12.142A2 2 0 0016.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16"></path>
                            </svg>
                          </button>
                        </div>
                      </div>
                    </div>
                  </div>

                  <!-- Empty State -->
                  <div v-else class="text-center py-8 animate-fade-in-up" style="animation-delay: 1.0s">
                    <svg class="w-12 h-12 text-gray-400 mx-auto mb-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"></path>
                    </svg>
                    <p class="text-gray-500 dark:text-gray-400">
                      {{ t('grammar.manager.noRules', 'No grammar rules found') }}
                    </p>
                  </div>
                </div>
              </div>

              <!-- Footer -->
              <div class="px-6 py-4 border-t border-gray-200 dark:border-gray-700 bg-gradient-to-r from-gray-50 to-blue-50 dark:from-[#0a0a0a] dark:to-[#0a0a0a]">
                <div class="flex justify-end">
                  <button
                    @click="closeModal"
                    class="px-4 py-2 bg-gray-100 dark:bg-dark-bg-mute hover:bg-gray-200 dark:hover:bg-dark-bg-soft text-gray-700 dark:text-gray-300 rounded-lg transition-all duration-300 transform hover:scale-105 hover:shadow-md"
                  >
                    {{ t('common.close', 'Close') }}
                  </button>
                </div>
              </div>
            </div>
          </div>
        </Transition>
      </div>
    </Transition>
  </div>
</template>

<script setup lang="ts">
import { ref, computed, watch, onMounted, onUnmounted } from 'vue'
import { useI18n } from 'vue-i18n'

const { t } = useI18n()

interface GrammarRule {
  id: string
  title: string
  category: string
  level: string
  formula: string
  description?: string
  examples: string[]
  createdAt: Date
  updatedAt: Date
}

interface Props {
  modelValue: boolean
  selectedDate?: string | null
}

const props = withDefaults(defineProps<Props>(), {
  selectedDate: null
})

const emit = defineEmits<{
  'update:modelValue': [value: boolean]
}>()

// State
const grammarRules = ref<GrammarRule[]>([])
const isEditing = ref(false)
const editingId = ref<string | null>(null)
const filterCategory = ref('')

// Form data
const formData = ref({
  title: '',
  category: '',
  level: '',
  formula: '',
  description: '',
  examples: ['']
})

// Computed
const filteredGrammarRules = computed(() => {
  if (!filterCategory.value) return grammarRules.value
  return grammarRules.value.filter(rule => rule.category === filterCategory.value)
})

// Methods
const closeModal = () => {
  resetForm()
  emit('update:modelValue', false)
}

const resetForm = () => {
  formData.value = {
    title: '',
    category: '',
    level: '',
    formula: '',
    description: '',
    examples: ['']
  }
  isEditing.value = false
  editingId.value = null
}

const addExample = () => {
  formData.value.examples.push('')
}

const removeExample = (index: number) => {
  if (formData.value.examples.length > 1) {
    formData.value.examples.splice(index, 1)
  }
}

const saveGrammar = () => {
  // Filter out empty examples
  const examples = formData.value.examples.filter(example => example.trim() !== '')
  
  if (isEditing.value && editingId.value) {
    // Update existing rule
    const index = grammarRules.value.findIndex(rule => rule.id === editingId.value)
    if (index !== -1) {
      grammarRules.value[index] = {
        ...grammarRules.value[index],
        title: formData.value.title,
        category: formData.value.category,
        level: formData.value.level,
        formula: formData.value.formula,
        description: formData.value.description,
        examples,
        updatedAt: new Date()
      }
    }
  } else {
    // Add new rule
    const newRule: GrammarRule = {
      id: Date.now().toString(),
      title: formData.value.title,
      category: formData.value.category,
      level: formData.value.level,
      formula: formData.value.formula,
      description: formData.value.description,
      examples,
      createdAt: new Date(),
      updatedAt: new Date()
    }
    grammarRules.value.unshift(newRule)
  }

  saveToLocalStorage()
  resetForm()
}

const editGrammar = (rule: GrammarRule) => {
  formData.value = {
    title: rule.title,
    category: rule.category,
    level: rule.level,
    formula: rule.formula,
    description: rule.description || '',
    examples: rule.examples.length > 0 ? [...rule.examples] : ['']
  }
  isEditing.value = true
  editingId.value = rule.id
}

const deleteGrammar = (id: string) => {
  if (confirm(t('grammar.manager.confirmDelete', 'Are you sure you want to delete this grammar rule?'))) {
    grammarRules.value = grammarRules.value.filter(rule => rule.id !== id)
    saveToLocalStorage()
  }
}

const formatDate = (date: Date) => {
  return new Date(date).toLocaleDateString()
}

const saveToLocalStorage = () => {
  localStorage.setItem('grammar-rules', JSON.stringify(grammarRules.value))
}

const loadFromLocalStorage = () => {
  const stored = localStorage.getItem('grammar-rules')
  if (stored) {
    try {
      const parsed = JSON.parse(stored)
      grammarRules.value = parsed.map((rule: any) => ({
        ...rule,
        createdAt: new Date(rule.createdAt),
        updatedAt: new Date(rule.updatedAt)
      }))
    } catch (error) {
      console.error('Error loading grammar rules:', error)
    }
  }
}

// Handle vocabulary import refresh
const handleVocabularyImport = () => {
  console.log('Vocabulary import detected, refreshing grammar rules')
  loadFromLocalStorage()
}

// Initialize
onMounted(() => {
  loadFromLocalStorage()
  // Listen for vocabulary import events to refresh grammar rules
  window.addEventListener('vocabularyImportComplete', handleVocabularyImport)
})

// Cleanup
onUnmounted(() => {
  window.removeEventListener('vocabularyImportComplete', handleVocabularyImport)
  unlockBodyScroll()
})

// Body scroll lock functions
const lockBodyScroll = () => {
  document.body.style.overflow = 'hidden'
}

const unlockBodyScroll = () => {
  document.body.style.overflow = ''
}

// Watch for modal open/close
watch(() => props.modelValue, (newValue) => {
  if (newValue) {
    loadFromLocalStorage()
    lockBodyScroll()
  } else {
    resetForm()
    unlockBodyScroll()
  }
})
</script>

<style scoped>
/* Custom scrollbar for webkit browsers */
.overflow-y-auto::-webkit-scrollbar {
  width: 6px;
}

.overflow-y-auto::-webkit-scrollbar-track {
  background-color: #f3f4f6;
}

.dark .overflow-y-auto::-webkit-scrollbar-track {
  background-color: #0f0f0f;
}

.overflow-y-auto::-webkit-scrollbar-thumb {
  background-color: #d1d5db;
  border-radius: 9999px;
}

.dark .overflow-y-auto::-webkit-scrollbar-thumb {
  background-color: #0a0a0a;
}

.overflow-y-auto::-webkit-scrollbar-thumb:hover {
  background-color: #9ca3af;
}

.dark .overflow-y-auto::-webkit-scrollbar-thumb:hover {
  background-color: #6b7280;
}

/* Fade in up animation */
@keyframes fadeInUp {
  from {
    opacity: 0;
    transform: translateY(20px);
  }
  to {
    opacity: 1;
    transform: translateY(0);
  }
}

.animate-fade-in-up {
  animation: fadeInUp 0.6s ease-out forwards;
  opacity: 0;
}

/* Enhanced hover effects for form inputs */
input:focus, textarea:focus, select:focus {
  transform: scale(1.02);
  box-shadow: 0 0 0 3px rgba(59, 130, 246, 0.1);
}

/* Smooth transitions for all interactive elements */
* {
  transition-property: all;
  transition-timing-function: cubic-bezier(0.4, 0, 0.2, 1);
}

/* Enhanced button hover effects */
button:hover {
  transform: translateY(-1px);
}

/* Loading animation for submit button */
@keyframes pulse {
  0%, 100% {
    opacity: 1;
  }
  50% {
    opacity: 0.5;
  }
}

.animate-pulse {
  animation: pulse 2s cubic-bezier(0.4, 0, 0.6, 1) infinite;
}

/* Stagger animation delays for form fields */
.animate-fade-in-up:nth-child(1) { animation-delay: 0.1s; }
.animate-fade-in-up:nth-child(2) { animation-delay: 0.2s; }
.animate-fade-in-up:nth-child(3) { animation-delay: 0.3s; }
.animate-fade-in-up:nth-child(4) { animation-delay: 0.4s; }
.animate-fade-in-up:nth-child(5) { animation-delay: 0.5s; }
.animate-fade-in-up:nth-child(6) { animation-delay: 0.6s; }
.animate-fade-in-up:nth-child(7) { animation-delay: 0.7s; }
.animate-fade-in-up:nth-child(8) { animation-delay: 0.8s; }
.animate-fade-in-up:nth-child(9) { animation-delay: 0.9s; }
.animate-fade-in-up:nth-child(10) { animation-delay: 1.0s; }
.animate-fade-in-up:nth-child(11) { animation-delay: 1.1s; }
.animate-fade-in-up:nth-child(12) { animation-delay: 1.2s; }

/* Enhanced backdrop blur effect */
.backdrop-blur-sm {
  backdrop-filter: blur(8px);
  -webkit-backdrop-filter: blur(8px);
}

/* Smooth dialog entrance */
.dialog-enter-active {
  transition: all 0.5s cubic-bezier(0.4, 0, 0.2, 1);
}

.dialog-enter-from {
  opacity: 0;
  transform: scale(0.9) translateY(20px) rotate(1deg);
}

.dialog-enter-to {
  opacity: 1;
  transform: scale(1) translateY(0) rotate(0deg);
}

/* Enhanced shadow effects */
.shadow-2xl {
  box-shadow: 0 25px 50px -12px rgba(0, 0, 0, 0.25);
}

/* Enhanced focus states */
input:focus, textarea:focus, select:focus {
  outline: none;
  border-color: transparent;
  box-shadow: 0 0 0 3px rgba(59, 130, 246, 0.1), 0 4px 6px -1px rgba(0, 0, 0, 0.1);
}

/* Smooth scale transitions */
.transform {
  transition: transform 0.3s cubic-bezier(0.4, 0, 0.2, 1);
}

/* Enhanced button states */
button:active {
  transform: scale(0.95);
}

/* Loading spinner enhancement */
@keyframes spin {
  to {
    transform: rotate(360deg);
  }
}

.animate-spin {
  animation: spin 1s linear infinite;
}

/* Enhanced checkbox styling */
input[type="checkbox"] {
  transition: all 0.3s ease;
}

input[type="checkbox"]:checked {
  transform: scale(1.1);
}

/* Smooth color transitions */
.transition-colors {
  transition: color 0.3s ease, background-color 0.3s ease, border-color 0.3s ease;
}

/* Enhanced border radius */
.rounded-lg {
  border-radius: 0.5rem;
}

.rounded-xl {
  border-radius: 0.75rem;
}

/* Gradient backgrounds */
.bg-gradient-to-r {
  background-image: linear-gradient(to right, var(--tw-gradient-stops));
}

/* Enhanced hover effects for interactive elements */
.hover\:scale-\[1\.02\]:hover {
  transform: scale(1.02);
}

.hover\:scale-105:hover {
  transform: scale(1.05);
}

.hover\:scale-110:hover {
  transform: scale(1.1);
}

/* Smooth rotation effects */
.hover\:rotate-90:hover {
  transform: rotate(90deg);
}

/* Enhanced shadow on hover */
.hover\:shadow-lg:hover {
  box-shadow: 0 10px 15px -3px rgba(0, 0, 0, 0.1), 0 4px 6px -2px rgba(0, 0, 0, 0.05);
}

/* Disabled state styling */
.disabled\:cursor-not-allowed:disabled {
  cursor: not-allowed;
}

.disabled\:opacity-50:disabled {
  opacity: 0.5;
}

/* Custom scrollbar styling */
.scrollbar-custom::-webkit-scrollbar {
  width: 8px;
}

.scrollbar-custom::-webkit-scrollbar-track {
  background-color: #f3f4f6;
  border-radius: 4px;
}

.dark .scrollbar-custom::-webkit-scrollbar-track {
  background-color: #0f0f0f;
}

.scrollbar-custom::-webkit-scrollbar-thumb {
  background-color: #d1d5db;
  border-radius: 4px;
}

.dark .scrollbar-custom::-webkit-scrollbar-thumb {
  background-color: #0a0a0a;
}

.scrollbar-custom::-webkit-scrollbar-thumb:hover {
  background-color: #9ca3af;
}

.dark .scrollbar-custom::-webkit-scrollbar-thumb:hover {
  background-color: #000000;
}
</style>
