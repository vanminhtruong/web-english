<template>
  <div v-if="modelValue" class="fixed inset-0 z-50 overflow-hidden" aria-labelledby="modal-title" role="dialog" aria-modal="true">
    <div class="flex items-end justify-center min-h-screen pt-4 px-4 pb-20 text-center sm:block sm:p-0">
      <!-- Background overlay - Removed click handler -->
      <div class="fixed inset-0 bg-gray-500 bg-opacity-75 transition-opacity"></div>

      <!-- Dialog panel -->
      <div class="inline-block align-bottom bg-white dark:bg-[#0a0a0a] rounded-lg text-left overflow-hidden shadow-xl transform transition-all sm:my-8 sm:align-middle sm:max-w-4xl sm:w-full">
        <div class="bg-white dark:bg-[#0a0a0a] px-4 pt-5 pb-4 sm:p-6 sm:pb-4">
          <div class="flex items-center justify-between pb-4 border-b border-gray-200 dark:border-gray-700">
            <h3 class="text-lg leading-6 font-medium text-gray-900 dark:text-white">
              {{ isEdit ? t('grammar.editLesson') : t('grammar.addNewLesson') }}
            </h3>
            <button @click="closeDialog" class="text-gray-400 hover:text-gray-500 dark:hover:text-gray-300">
              <svg class="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12" />
              </svg>
            </button>
          </div>

          <!-- Form Content - Adjusted max height and overflow -->
          <form @submit.prevent="submitForm" class="space-y-6 mt-4 max-h-[calc(100vh-200px)] overflow-y-auto px-2">
            <!-- Basic Information -->
            <div class="bg-white dark:bg-[#0f0f0f] shadow rounded-lg p-6 border border-gray-200 dark:border-gray-700">
              <h3 class="text-lg font-medium text-gray-900 dark:text-white mb-6">{{ t('common.title') }}</h3>
              
              <div class="grid grid-cols-1 md:grid-cols-2 gap-6">
                <!-- Title -->
                <div class="md:col-span-2">
                  <label for="title" class="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                    {{ t('common.title') }} <span class="text-red-500">*</span>
                  </label>
                  <input
                    id="title"
                    v-model="form.title"
                    type="text"
                    required
                    class="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-md bg-white dark:bg-[#0a0a0a] text-gray-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-blue-500"
                    :placeholder="t('grammar.titlePlaceholder')"
                  />
                </div>

                <!-- Category -->
                <div>
                  <label for="category" class="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                    {{ t('grammar.category') }} <span class="text-red-500">*</span>
                  </label>
                  <select
                    id="category"
                    v-model="form.category"
                    required
                    class="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-md bg-white dark:bg-[#0a0a0a] text-gray-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-blue-500"
                  >
                    <option value="">{{ t('grammar.selectCategory') }}</option>
                    <option v-for="category in categories" :key="category" :value="category">
                      {{ category }}
                    </option>
                  </select>
                </div>

                <!-- Level -->
                <div>
                  <label for="level" class="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                    {{ t('grammar.level') }} <span class="text-red-500">*</span>
                  </label>
                  <select
                    id="level"
                    v-model="form.level"
                    required
                    class="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-md bg-white dark:bg-[#0a0a0a] text-gray-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-blue-500"
                  >
                    <option value="">{{ t('grammar.selectLevel') }}</option>
                    <option value="beginner">{{ t('grammar.levels.beginner') }}</option>
                    <option value="intermediate">{{ t('grammar.levels.intermediate') }}</option>
                    <option value="advanced">{{ t('grammar.levels.advanced') }}</option>
                  </select>
                </div>

                <!-- Duration -->
                <div>
                  <label for="duration" class="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                    {{ t('grammar.durationLabel') }} <span class="text-red-500">*</span>
                  </label>
                  <input
                    id="duration"
                    v-model.number="form.duration"
                    type="number"
                    min="1"
                    required
                    class="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-md bg-white dark:bg-[#0a0a0a] text-gray-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-blue-500"
                    placeholder="30"
                  />
                </div>

                <!-- Description -->
                <div class="md:col-span-2">
                  <label for="description" class="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                    {{ t('grammar.description') }} <span class="text-red-500">*</span>
                  </label>
                  <textarea
                    id="description"
                    v-model="form.description"
                    rows="3"
                    required
                    class="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-md bg-white dark:bg-[#0a0a0a] text-gray-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-blue-500"
                    :placeholder="t('grammar.descriptionPlaceholder')"
                  ></textarea>
                </div>
              </div>
            </div>

            <!-- Content -->
            <div class="bg-white dark:bg-[#0f0f0f] shadow rounded-lg p-6 border border-gray-200 dark:border-gray-700">
              <h3 class="text-lg font-medium text-gray-900 dark:text-white mb-6">{{ t('grammar.lessonContent') }}</h3>
              
              <div class="space-y-6">
                <!-- Theory -->
                <div>
                  <label for="theory" class="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                    {{ t('grammar.theory') }} <span class="text-red-500">*</span>
                  </label>
                  <textarea
                    id="theory"
                    v-model="form.theory"
                    rows="6"
                    required
                    class="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-md bg-white dark:bg-[#0a0a0a] text-gray-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-blue-500"
                    :placeholder="t('grammar.theoryPlaceholder')"
                  ></textarea>
                  <p class="mt-1 text-sm text-gray-500 dark:text-gray-400">{{ t('grammar.markdownSupported') }}</p>
                </div>

                <!-- Structure -->
                <div>
                  <label for="structure" class="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                    {{ t('grammar.structure') }} <span class="text-red-500">*</span>
                  </label>
                  <textarea
                    id="structure"
                    v-model="form.structure"
                    rows="4"
                    required
                    class="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-md bg-white dark:bg-[#0a0a0a] text-gray-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-blue-500"
                    :placeholder="t('grammar.structurePlaceholder')"
                  ></textarea>
                </div>

                <!-- Examples -->
                <div>
                  <label class="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                    {{ t('grammar.examples') }} <span class="text-red-500">*</span>
                  </label>
                  
                  <div class="space-y-2">
                    <div v-for="(example, index) in form.examples" :key="index" class="flex items-start space-x-2">
                      <div class="flex-1">
                        <input
                          v-model="example.text"
                          type="text"
                          class="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-md bg-white dark:bg-[#0a0a0a] text-gray-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-blue-500"
                          :placeholder="t('grammar.examplePlaceholder', { index: index + 1 })"
                          required
                        />
                        <input
                          v-model="example.translation"
                          type="text"
                          class="w-full mt-1 px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-md bg-white dark:bg-[#0a0a0a] text-gray-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-blue-500"
                          :placeholder="t('grammar.translationPlaceholder', { index: index + 1 })"
                          required
                        />
                      </div>
                      <button 
                        type="button" 
                        @click="removeExample(index)" 
                        class="mt-2 text-red-500 hover:text-red-700"
                        :disabled="form.examples.length <= 1"
                      >
                        <svg class="w-5 h-5" fill="currentColor" viewBox="0 0 20 20">
                          <path fill-rule="evenodd" d="M9 2a1 1 0 00-.894.553L7.382 4H4a1 1 0 000 2v10a2 2 0 002 2h8a2 2 0 002-2V6a1 1 0 100-2h-3.382l-.724-1.447A1 1 0 0011 2H9zM7 8a1 1 0 012 0v6a1 1 0 11-2 0V8zm5-1a1 1 0 00-1 1v6a1 1 0 102 0V8a1 1 0 00-1-1z" clip-rule="evenodd"/>
                        </svg>
                      </button>
                    </div>
                  </div>
                  
                  <button 
                    type="button" 
                    @click="addExample" 
                    class="mt-2 inline-flex items-center text-sm text-blue-600 dark:text-blue-400 hover:text-blue-800 dark:hover:text-blue-300"
                  >
                    <svg class="w-4 h-4 mr-1" fill="currentColor" viewBox="0 0 20 20">
                      <path fill-rule="evenodd" d="M10 3a1 1 0 011 1v5h5a1 1 0 110 2h-5v5a1 1 0 11-2 0v-5H4a1 1 0 110-2h5V4a1 1 0 011-1z" clip-rule="evenodd"/>
                    </svg>
                    {{ t('grammar.addExample') }}
                  </button>
                </div>

                <!-- Usage Rules -->
                <div>
                  <label class="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                    {{ t('grammar.usageRules') }}
                  </label>
                  
                  <div class="space-y-2">
                    <div v-for="(rule, index) in form.usageRules" :key="index" class="flex items-start space-x-2">
                      <div class="flex-1">
                        <input
                          v-model="rule.title"
                          type="text"
                          class="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-md bg-white dark:bg-[#0a0a0a] text-gray-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-blue-500"
                          :placeholder="t('grammar.ruleTitlePlaceholder', { index: index + 1 })"
                        />
                        <textarea
                          v-model="rule.description"
                          rows="2"
                          class="w-full mt-1 px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-md bg-white dark:bg-[#0a0a0a] text-gray-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-blue-500"
                          :placeholder="t('grammar.ruleDescriptionPlaceholder', { index: index + 1 })"
                        ></textarea>
                      </div>
                      <button 
                        type="button" 
                        @click="removeRule(index)" 
                        class="mt-2 text-red-500 hover:text-red-700"
                      >
                        <svg class="w-5 h-5" fill="currentColor" viewBox="0 0 20 20">
                          <path fill-rule="evenodd" d="M9 2a1 1 0 00-.894.553L7.382 4H4a1 1 0 000 2v10a2 2 0 002 2h8a2 2 0 002-2V6a1 1 0 100-2h-3.382l-.724-1.447A1 1 0 0011 2H9zM7 8a1 1 0 012 0v6a1 1 0 11-2 0V8zm5-1a1 1 0 00-1 1v6a1 1 0 102 0V8a1 1 0 00-1-1z" clip-rule="evenodd"/>
                        </svg>
                      </button>
                    </div>
                  </div>
                  
                  <button 
                    type="button" 
                    @click="addRule" 
                    class="mt-2 inline-flex items-center text-sm text-blue-600 dark:text-blue-400 hover:text-blue-800 dark:hover:text-blue-300"
                  >
                    <svg class="w-4 h-4 mr-1" fill="currentColor" viewBox="0 0 20 20">
                      <path fill-rule="evenodd" d="M10 3a1 1 0 011 1v5h5a1 1 0 110 2h-5v5a1 1 0 11-2 0v-5H4a1 1 0 110-2h5V4a1 1 0 011-1z" clip-rule="evenodd"/>
                    </svg>
                    {{ t('grammar.addRule') }}
                  </button>
                </div>

                <!-- Common Mistakes -->
                <div>
                  <label class="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                    {{ t('grammar.commonMistakes') }}
                  </label>
                  
                  <div class="space-y-2">
                    <div v-for="(mistake, index) in form.commonMistakes" :key="index" class="flex items-start space-x-2">
                      <div class="flex-1">
                        <input
                          v-model="mistake.wrong"
                          type="text"
                          class="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-md bg-white dark:bg-[#0a0a0a] text-gray-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-blue-500"
                          :placeholder="t('grammar.wrongSentencePlaceholder', { index: index + 1 })"
                        />
                        <input
                          v-model="mistake.correct"
                          type="text"
                          class="w-full mt-1 px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-md bg-white dark:bg-[#0a0a0a] text-gray-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-blue-500"
                          :placeholder="t('grammar.correctSentencePlaceholder', { index: index + 1 })"
                        />
                        <textarea
                          v-model="mistake.explanation"
                          rows="2"
                          class="w-full mt-1 px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-md bg-white dark:bg-[#0a0a0a] text-gray-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-blue-500"
                          :placeholder="t('grammar.explanationPlaceholder', { index: index + 1 })"
                        ></textarea>
                      </div>
                      <button 
                        type="button" 
                        @click="removeMistake(index)" 
                        class="mt-2 text-red-500 hover:text-red-700"
                      >
                        <svg class="w-5 h-5" fill="currentColor" viewBox="0 0 20 20">
                          <path fill-rule="evenodd" d="M9 2a1 1 0 00-.894.553L7.382 4H4a1 1 0 000 2v10a2 2 0 002 2h8a2 2 0 002-2V6a1 1 0 100-2h-3.382l-.724-1.447A1 1 0 0011 2H9zM7 8a1 1 0 012 0v6a1 1 0 11-2 0V8zm5-1a1 1 0 00-1 1v6a1 1 0 102 0V8a1 1 0 00-1-1z" clip-rule="evenodd"/>
                        </svg>
                      </button>
                    </div>
                  </div>
                  
                  <button 
                    type="button" 
                    @click="addMistake" 
                    class="mt-2 inline-flex items-center text-sm text-blue-600 dark:text-blue-400 hover:text-blue-800 dark:hover:text-blue-300"
                  >
                    <svg class="w-4 h-4 mr-1" fill="currentColor" viewBox="0 0 20 20">
                      <path fill-rule="evenodd" d="M10 3a1 1 0 011 1v5h5a1 1 0 110 2h-5v5a1 1 0 11-2 0v-5H4a1 1 0 110-2h5V4a1 1 0 011-1z" clip-rule="evenodd"/>
                    </svg>
                    {{ t('grammar.addMistake') }}
                  </button>
                </div>
              </div>
            </div>
          </form>
        </div>
        
        <!-- Dialog footer -->
        <div class="bg-gray-50 dark:bg-[#0f0f0f] px-4 py-3 sm:px-6 sm:flex sm:flex-row-reverse">
          <button 
            type="button" 
            @click="submitForm"
            :disabled="isSubmitting"
            class="w-full inline-flex justify-center rounded-md border border-transparent shadow-sm px-4 py-2 bg-blue-600 text-base font-medium text-white hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 sm:ml-3 sm:w-auto sm:text-sm"
          >
            {{ isSubmitting ? t('common.saving') : (isEdit ? t('common.update') : t('common.save')) }}
          </button>
          <button 
            type="button" 
            @click="closeDialog"
            class="mt-3 w-full inline-flex justify-center rounded-md border border-gray-300 dark:border-gray-600 shadow-sm px-4 py-2 bg-white dark:bg-[#0a0a0a] text-base font-medium text-gray-700 dark:text-gray-300 hover:bg-gray-50 dark:hover:bg-gray-900 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 sm:mt-0 sm:ml-3 sm:w-auto sm:text-sm"
          >
            {{ t('common.cancel') }}
          </button>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, watch, computed, onMounted, onUnmounted } from 'vue'
import { useI18n } from 'vue-i18n'
import { useGrammarStore } from '../../../composables/useGrammarStore'

const props = defineProps({
  modelValue: {
    type: Boolean,
    default: false
  },
  editId: {
    type: String,
    default: ''
  }
})

const emit = defineEmits(['update:modelValue', 'saved'])

const { t } = useI18n()
const grammarStore = useGrammarStore()
const isSubmitting = ref(false)
const isEdit = computed(() => !!props.editId)

// Prevent body scrolling when dialog is open
watch(() => props.modelValue, (isOpen) => {
  if (isOpen) {
    document.body.style.overflow = 'hidden'
  } else {
    document.body.style.overflow = ''
  }
})

// Make sure to reset body overflow when component is unmounted
onUnmounted(() => {
  document.body.style.overflow = ''
})

const categories = ref([
  'Tenses', 'Conditionals', 'Passive Voice', 'Modal Verbs', 'Reported Speech', 
  'Articles', 'Prepositions', 'Adjectives & Adverbs', 'Phrasal Verbs', 'Gerunds & Infinitives'
])

// Form data
const form = ref({
  title: '',
  description: '',
  level: '',
  category: '',
  duration: 30,
  theory: '',
  structure: '',
  examples: [
    { text: '', translation: '' }
  ],
  usageRules: [
    { title: '', description: '' }
  ],
  commonMistakes: [
    { wrong: '', correct: '', explanation: '' }
  ]
})

// Define resetForm before using it in watch
const resetForm = () => {
  form.value = {
    title: '',
    description: '',
    level: '',
    category: '',
    duration: 30,
    theory: '',
    structure: '',
    examples: [{ text: '', translation: '' }],
    usageRules: [{ title: '', description: '' }],
    commonMistakes: [{ wrong: '', correct: '', explanation: '' }]
  }
}

// Load lesson data if in edit mode
watch(() => props.editId, (newId) => {
  if (newId) {
    const lesson = grammarStore.getLesson(newId)
    if (lesson) {
      form.value = {
        title: lesson.title,
        description: lesson.description,
        level: lesson.level,
        category: lesson.category,
        duration: lesson.duration,
        theory: lesson.theory,
        structure: lesson.structure || '',
        examples: lesson.examples.map(ex => ({
          text: ex.text,
          translation: ex.translation
        })),
        usageRules: lesson.usageRules?.map(rule => ({
          title: rule.title,
          description: rule.description
        })) || [{ title: '', description: '' }],
        commonMistakes: lesson.commonMistakes?.map(mistake => ({
          wrong: mistake.wrong,
          correct: mistake.correct,
          explanation: mistake.explanation
        })) || [{ wrong: '', correct: '', explanation: '' }]
      }
    }
  } else {
    resetForm()
  }
}, { immediate: true })

// Methods for adding and removing array items
const addExample = () => {
  form.value.examples.push({ text: '', translation: '' })
}

const removeExample = (index: number) => {
  if (form.value.examples.length > 1) {
    form.value.examples.splice(index, 1)
  }
}

const addRule = () => {
  form.value.usageRules.push({ title: '', description: '' })
}

const removeRule = (index: number) => {
  form.value.usageRules.splice(index, 1)
}

const addMistake = () => {
  form.value.commonMistakes.push({ wrong: '', correct: '', explanation: '' })
}

const removeMistake = (index: number) => {
  form.value.commonMistakes.splice(index, 1)
}

const closeDialog = () => {
  emit('update:modelValue', false)
}

// Form submission
const submitForm = () => {
  isSubmitting.value = true
  
  // Remove empty array items before submission
  const filteredUsageRules = form.value.usageRules.filter(rule => rule.title.trim() !== '' || rule.description.trim() !== '')
  const filteredMistakes = form.value.commonMistakes.filter(mistake => mistake.wrong.trim() !== '' || mistake.correct.trim() !== '' || mistake.explanation.trim() !== '')
  
  // Create rules array for compatibility with GrammarLesson interface
  const rules = filteredUsageRules.map((rule, index) => ({
    id: index + 1,
    title: rule.title,
    description: rule.description
  }))
  
  // Create examples array for compatibility with GrammarLesson interface
  const examples = form.value.examples.map((example, index) => ({
    id: index + 1,
    text: example.text,
    translation: example.translation
  }))
  
  // Create mistakes array for compatibility with GrammarLesson interface
  const commonMistakes = filteredMistakes.map((mistake, index) => ({
    id: index + 1,
    wrong: mistake.wrong,
    correct: mistake.correct,
    explanation: mistake.explanation
  }))
  
  // Create lesson object
  const lessonData = {
    id: isEdit.value ? props.editId : Date.now().toString(),
    title: form.value.title,
    description: form.value.description,
    level: form.value.level,
    category: form.value.category,
    duration: form.value.duration,
    rating: isEdit.value ? grammarStore.getLesson(props.editId)?.rating || 5.0 : 5.0,
    progress: isEdit.value ? grammarStore.getLesson(props.editId)?.progress || 0 : 0,
    exercises: Math.floor(form.value.duration / 5),
    theory: form.value.theory,
    structure: form.value.structure,
    examples: examples,
    rules: rules,
    usageRules: filteredUsageRules,
    commonMistakes: commonMistakes
  }
  
  // Save the lesson to the store
  if (isEdit.value) {
    grammarStore.updateLesson(props.editId, lessonData)
  } else {
    grammarStore.addLesson(lessonData)
  }
  
  // Simulate API call for UI feedback
  setTimeout(() => {
    isSubmitting.value = false
    emit('saved', lessonData)
    emit('update:modelValue', false)
    resetForm()
  }, 500)
}
</script>

<style scoped>
/* Prevent scrollbar shift when dialog opens */
.overflow-hidden {
  padding-right: 0 !important;
}
</style> 