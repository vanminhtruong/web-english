<template>
  <div class="min-h-screen bg-gray-50 dark:bg-black">
    <!-- Loading State -->
    <div v-if="isLoading" class="max-w-4xl mx-auto py-6 px-4 sm:px-6 lg:px-8">
      <div class="bg-white dark:bg-[#0a0a0a] shadow rounded-lg p-6">
        <div class="animate-pulse">
          <div class="h-8 bg-gray-200 dark:bg-dark-bg-mute rounded w-1/2 mb-4"></div>
          <div class="space-y-3">
            <div class="h-4 bg-gray-200 dark:bg-dark-bg-mute rounded"></div>
            <div class="h-4 bg-gray-200 dark:bg-dark-bg-mute rounded w-5/6"></div>
            <div class="h-4 bg-gray-200 dark:bg-dark-bg-mute rounded w-3/4"></div>
          </div>
        </div>
      </div>
    </div>

    <!-- Content -->
    <div v-else class="max-w-4xl mx-auto py-6 px-4 sm:px-6 lg:px-8">
      <!-- Header -->
      <div class="bg-white dark:bg-[#0a0a0a] shadow rounded-lg p-6 mb-6">
        <div class="flex items-center justify-between mb-4">
          <button @click="goBack" class="text-gray-500 dark:text-white/70 hover:text-gray-700 dark:hover:text-white">
            <svg class="w-6 h-6" fill="currentColor" viewBox="0 0 20 20">
              <path fill-rule="evenodd" d="M12.707 5.293a1 1 0 010 1.414L9.414 10l3.293 3.293a1 1 0 01-1.414 1.414l-4-4a1 1 0 010-1.414l4-4a1 1 0 011.414 0z" clip-rule="evenodd"/>
            </svg>
          </button>
          
          <div class="flex space-x-2">
            <button @click="practiceLesson" class="bg-green-500 hover:bg-green-600 text-white font-medium py-2 px-4 rounded-lg transition-colors">
              <svg class="w-5 h-5 inline mr-2" fill="currentColor" viewBox="0 0 20 20">
                <path fill-rule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-8-3a1 1 0 00-.867.5 1 1 0 11-1.731-1A3 3 0 0113 8a3.001 3.001 0 01-2 2.83V11a1 1 0 11-2 0v-1a1 1 0 011-1 1 1 0 100-2zm0 8a1 1 0 100-2 1 1 0 000 2z" clip-rule="evenodd"/>
              </svg>
              {{ t('grammar.practice.title', 'Practice') }}
            </button>
            <button @click="openEditDialog" class="bg-blue-500 hover:bg-blue-600 text-white font-medium py-2 px-4 rounded-lg transition-colors">
              <svg class="w-5 h-5 inline mr-2" fill="currentColor" viewBox="0 0 20 20">
                <path d="M13.586 3.586a2 2 0 112.828 2.828l-.793.793-2.828-2.828.793-.793zM11.379 5.793L3 14.172V17h2.828l8.38-8.379-2.83-2.828z"/>
              </svg>
              {{ t('common.edit', 'Edit') }}
            </button>
          </div>
        </div>
        
        <div class="flex items-center justify-between">
          <div>
            <h1 class="text-3xl font-bold text-gray-900 dark:text-white">{{ lesson.title }}</h1>
            <p class="mt-2 text-gray-600 dark:text-white/80">{{ lesson.description }}</p>
          </div>
          
          <div class="text-right">
            <span :class="getLevelColor(lesson.level)" class="px-3 py-1 text-sm font-medium rounded-full">
              {{ getLevelText(lesson.level) }}
            </span>
            <p class="text-sm text-gray-500 dark:text-white/60 mt-2">{{ lesson.duration }} {{ t('grammar.duration', 'mins') }}</p>
          </div>
        </div>
        
        <!-- Progress Bar -->
        <div class="mt-6">
          <div class="flex justify-between text-sm text-gray-600 dark:text-white/80 mb-2">
            <span>{{ t('grammar.progress', 'Progress') }}</span>
            <span>{{ lesson.progress }}%</span>
          </div>
          <div class="w-full bg-gray-200 dark:bg-dark-bg-mute rounded-full h-3">
            <div class="bg-blue-500 h-3 rounded-full transition-all duration-300" :style="{ width: lesson.progress + '%' }"></div>
          </div>
        </div>
      </div>

      <!-- Lesson Content -->
      <div class="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <!-- Main Content -->
        <div class="lg:col-span-2 space-y-6">
          <!-- Theory Section -->
          <div class="bg-white dark:bg-[#0a0a0a] shadow rounded-lg p-6">
            <h2 class="text-xl font-semibold text-gray-900 dark:text-white mb-4">{{ t('grammar.detail.theory', 'Theory') }}</h2>
            <div class="prose dark:prose-invert max-w-none">
              <div v-html="lesson.theory"></div>
            </div>
          </div>

          <!-- Examples Section -->
          <div class="bg-white dark:bg-[#0a0a0a] shadow rounded-lg p-6">
            <h2 class="text-xl font-semibold text-gray-900 dark:text-white mb-4">{{ t('grammar.detail.examples', 'Examples') }}</h2>
            <div class="space-y-4">
              <div v-for="example in lesson.examples" :key="example.id" class="border-l-4 border-blue-500 pl-4">
                <p class="text-gray-900 dark:text-white font-medium">{{ example.sentence }}</p>
                <p class="text-gray-600 dark:text-white/80 text-sm mt-1">{{ example.translation }}</p>
                <p class="text-gray-500 dark:text-white/60 text-xs mt-1" v-if="example.note">{{ example.note }}</p>
              </div>
            </div>
          </div>

          <!-- Usage Rules -->
          <div class="bg-white dark:bg-[#0a0a0a] shadow rounded-lg p-6">
            <h2 class="text-xl font-semibold text-gray-900 dark:text-white mb-4">{{ t('grammar.detail.usageRules', 'Usage Rules') }}</h2>
            <div class="space-y-3">
              <div v-for="rule in lesson.rules" :key="rule.id" class="flex items-start space-x-3">
                <div class="flex-shrink-0 w-6 h-6 bg-blue-100 dark:bg-dark-bg-mute rounded-full flex items-center justify-center">
                  <span class="text-blue-600 dark:text-blue-400 text-sm font-medium">{{ rule.id }}</span>
                </div>
                <div>
                  <p class="text-gray-900 dark:text-white">{{ rule.title }}</p>
                  <p class="text-gray-600 dark:text-white/80 text-sm">{{ rule.description }}</p>
                </div>
              </div>
            </div>
          </div>

          <!-- Common Mistakes -->
          <div v-if="lesson.commonMistakes && lesson.commonMistakes.length > 0" class="bg-white dark:bg-[#0a0a0a] shadow rounded-lg p-6">
            <h2 class="text-xl font-semibold text-gray-900 dark:text-white mb-4">{{ t('grammar.detail.commonMistakes', 'Common Mistakes') }}</h2>
            <div class="space-y-4">
              <div v-for="mistake in lesson.commonMistakes" :key="mistake.id" class="bg-red-50 dark:bg-dark-bg-mute border border-red-200 dark:border-red-900 rounded-lg p-4">
                <div class="flex items-start space-x-3">
                  <svg class="w-5 h-5 text-red-500 dark:text-red-400 mt-0.5" fill="currentColor" viewBox="0 0 20 20">
                    <path fill-rule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7 4a1 1 0 11-2 0 1 1 0 012 0zm-1-9a1 1 0 00-1 1v4a1 1 0 102 0V6a1 1 0 00-1-1z" clip-rule="evenodd"/>
                  </svg>
                  <div>
                    <p class="text-red-800 dark:text-red-400 font-medium">❌ {{ mistake.wrong }}</p>
                    <p class="text-green-800 dark:text-green-400 font-medium mt-1">✅ {{ mistake.correct }}</p>
                    <p class="text-gray-600 dark:text-white/80 text-sm mt-1">{{ mistake.explanation }}</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        <!-- Sidebar -->
        <div class="space-y-6">
          <!-- Quick Info -->
          <div class="bg-white dark:bg-[#0a0a0a] shadow rounded-lg p-6">
            <h3 class="text-lg font-medium text-gray-900 dark:text-white mb-4">{{ t('grammar.detail.info', 'Info') }}</h3>
            <div class="space-y-3">
              <div class="flex justify-between">
                <span class="text-gray-600 dark:text-white/60">{{ t('grammar.detail.topic', 'Topic') }}:</span>
                <span class="text-gray-900 dark:text-white">{{ lesson.category }}</span>
              </div>
              <div class="flex justify-between">
                <span class="text-gray-600 dark:text-white/60">{{ t('grammar.detail.duration', 'Duration') }}:</span>
                <span class="text-gray-900 dark:text-white">{{ lesson.duration }} {{ t('grammar.duration', 'mins') }}</span>
              </div>
              <div class="flex justify-between">
                <span class="text-gray-600 dark:text-white/60">{{ t('grammar.detail.exercises', 'Exercises') }}:</span>
                <span class="text-gray-900 dark:text-white">{{ lesson.exercises }}</span>
              </div>
              <div class="flex justify-between">
                <span class="text-gray-600 dark:text-white/60">{{ t('grammar.detail.rating', 'Rating') }}:</span>
                <div class="flex items-center">
                  <svg class="w-4 h-4 text-yellow-400 mr-1" fill="currentColor" viewBox="0 0 20 20">
                    <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z"/>
                  </svg>
                  <span class="text-gray-900 dark:text-white">{{ lesson.rating }}</span>
                </div>
              </div>
            </div>
          </div>

          <!-- Related Lessons -->
          <div class="bg-white dark:bg-[#0a0a0a] shadow rounded-lg p-6">
            <h3 class="text-lg font-medium text-gray-900 dark:text-white mb-4">{{ t('grammar.detail.relatedLessons', 'Related Lessons') }}</h3>
            <div class="space-y-3">
              <div v-for="related in relatedLessons" :key="related.id" class="border border-gray-200 dark:border-dark-bg-mute rounded-lg p-3 hover:bg-gray-50 dark:hover:bg-dark-bg-mute cursor-pointer" @click="viewRelatedLesson(related)">
                <p class="text-sm font-medium text-gray-900 dark:text-white">{{ related.title }}</p>
                <p class="text-xs text-gray-500 dark:text-white/60">{{ related.category }}</p>
              </div>
            </div>
          </div>

          <!-- Quick Actions -->
          <div class="bg-white dark:bg-[#0a0a0a] shadow rounded-lg p-6">
            <h3 class="text-lg font-medium text-gray-900 dark:text-white mb-4">{{ t('common.actions', 'Actions') }}</h3>
            <div class="space-y-3">
              <button @click="markAsCompleted" class="w-full bg-green-500 hover:bg-green-600 text-white font-medium py-2 px-4 rounded-lg transition-colors">
                {{ t('grammar.detail.markCompleted', 'Mark as Completed') }}
              </button>
              <button @click="addToFavorites" class="w-full bg-yellow-500 hover:bg-yellow-600 text-white font-medium py-2 px-4 rounded-lg transition-colors">
                {{ t('grammar.detail.addToFavorites', 'Add to Favorites') }}
              </button>
              <button @click="shareLesson" class="w-full bg-blue-500 hover:bg-blue-600 text-white font-medium py-2 px-4 rounded-lg transition-colors">
                {{ t('grammar.detail.shareLesson', 'Share Lesson') }}
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>

    <!-- Grammar Form Dialog -->
    <GrammarFormDialog
      v-model="showEditDialog"
      :edit-id="currentLessonId"
      @saved="onLessonUpdated"
    />
  </div>
</template>

<script setup lang="ts">
import { ref, onMounted, defineAsyncComponent } from 'vue'
import { useRouter, useRoute } from 'vue-router'
import { useGrammarStore } from '../../composables/useGrammarStore'
import { useI18n } from 'vue-i18n'
import { loadComponentSafely } from '../../utils/import-helper'

const GrammarFormDialog = defineAsyncComponent(
  loadComponentSafely(() => import('./components/GrammarFormDialog.vue'))
)

const router = useRouter()
const route = useRoute()
const grammarStore = useGrammarStore()
const { t } = useI18n()

// Dialog control
const showEditDialog = ref(false)
const currentLessonId = ref('')

// Define interfaces for type safety
interface Lesson {
  id: string | number;
  title: string;
  description: string;
  level: string;
  category: string;
  duration: number;
  rating: number;
  progress: number;
  exercises: number;
  theory: string;
  examples: Array<{
    id: number;
    sentence: string;
    translation: string;
    note?: string;
  }>;
  rules: Array<{
    id: number;
    title: string;
    description: string;
  }>;
  commonMistakes: Array<{
    id: number;
    wrong: string;
    correct: string;
    explanation: string;
  }>;
}

interface RelatedLesson {
  id: number;
  title: string;
  category: string;
}

// Data
const isLoading = ref(true)
const lesson = ref<Lesson>({} as Lesson)
const relatedLessons = ref<RelatedLesson[]>([])

// Methods
const loadLesson = async () => {
  const id = route.params.id as string
  currentLessonId.value = id
  
  try {
    // Simulate API call
    await new Promise(resolve => setTimeout(resolve, 500))
    
    // Get lesson from store
    const grammarLesson = grammarStore.getLesson(id)
    
    if (grammarLesson) {
      // Map grammar lesson to detail view format
      lesson.value = {
        id: grammarLesson.id,
        title: grammarLesson.title,
        description: grammarLesson.description,
        level: grammarLesson.level,
        category: grammarLesson.category,
        duration: grammarLesson.duration,
        rating: grammarLesson.rating,
        progress: grammarLesson.progress,
        exercises: grammarLesson.exercises,
        theory: grammarLesson.theory,
        examples: grammarLesson.examples.map(ex => ({
          id: ex.id,
          sentence: ex.text,
          translation: ex.translation,
          note: ex.note
        })),
        rules: grammarLesson.rules,
        commonMistakes: grammarLesson.commonMistakes || []
      }
      
      // Get related lessons
      const related = grammarStore.getRelatedLessons(id, grammarLesson.category)
      relatedLessons.value = related.map(rel => ({
        id: parseInt(rel.id),
        title: rel.title,
        category: rel.category
      }))
    } else {
      // Lesson not found
      console.error('Lesson not found:', id)
    }
    
  } catch (error) {
    console.error('Error loading lesson:', error)
  } finally {
    isLoading.value = false
  }
}

const goBack = () => {
  router.back()
}

const practiceLesson = () => {
  router.push(`/grammar/${route.params.id}/practice`)
}

const openEditDialog = () => {
  showEditDialog.value = true
}

const onLessonUpdated = () => {
  // Reload the lesson data
  loadLesson()
}

const viewRelatedLesson = (relatedLesson: RelatedLesson) => {
  router.push(`/grammar/${relatedLesson.id}`)
}

const markAsCompleted = () => {
  lesson.value.progress = 100
  grammarStore.updateLesson(currentLessonId.value, { progress: 100 })
}

const addToFavorites = () => {
  // Add to favorites
  alert(t('grammar.detail.addedToFavorites', 'Added to favorites'))
}

const shareLesson = () => {
  // Share functionality
  if (navigator.share) {
    navigator.share({
      title: lesson.value.title,
      text: lesson.value.description,
      url: window.location.href
    })
  } else {
    // Fallback
    navigator.clipboard.writeText(window.location.href)
    alert(t('grammar.detail.linkCopied', 'Link copied to clipboard'))
  }
}

const getLevelColor = (level: string) => {
  switch (level) {
    case 'beginner': return 'bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-300'
    case 'intermediate': return 'bg-yellow-100 text-yellow-800 dark:bg-yellow-900 dark:text-yellow-300'
    case 'advanced': return 'bg-red-100 text-red-800 dark:bg-red-900 dark:text-red-300'
    default: return 'bg-gray-100 text-gray-800 dark:bg-dark-bg-mute dark:text-white/80'
  }
}

const getLevelText = (level: string) => {
  const fallbackMap: Record<string, string> = {
    beginner: 'Beginner',
    intermediate: 'Intermediate',
    advanced: 'Advanced',
  }
  return t(`grammar.levels.${level}`, fallbackMap[level] || 'Level')
}

onMounted(() => {
  loadLesson()
})
</script>

<style scoped>
.prose h3 {
  @apply text-lg font-semibold text-gray-900 dark:text-white mt-4 mb-2;
}

.prose p {
  @apply text-gray-700 dark:text-white/80 mb-3;
}

.prose ul {
  @apply list-disc list-inside text-gray-700 dark:text-white/80 space-y-1;
}

.prose strong {
  @apply font-semibold text-gray-900 dark:text-white;
}
</style>
