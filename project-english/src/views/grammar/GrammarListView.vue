<template>
  <div class="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 dark:from-[#0a0a0a] dark:to-[#0f0f0f] relative overflow-x-hidden">
    <!-- Animated Background Elements to match Dashboard style -->
    <div class="absolute inset-0 overflow-hidden pointer-events-none z-0">
      <div class="floating-shapes">
        <div class="absolute top-20 left-10 w-64 h-64 bg-blue-300 dark:bg-blue-500 rounded-full mix-blend-multiply dark:mix-blend-normal filter blur-xl opacity-30 animate-blob"></div>
        <div class="absolute top-40 right-10 w-72 h-72 bg-purple-300 dark:bg-purple-500 rounded-full mix-blend-multiply dark:mix-blend-normal filter blur-xl opacity-30 animate-blob animation-delay-2000"></div>
        <div class="absolute -bottom-8 left-20 w-80 h-80 bg-pink-300 dark:bg-pink-500 rounded-full mix-blend-multiply dark:mix-blend-normal filter blur-xl opacity-30 animate-blob animation-delay-4000"></div>
      </div>
    </div>
    <!-- Header -->
    <LazyLoadComponent animation-type="fade-up">
      <GrammarHeader @add-lesson="openAddDialog" />
    </LazyLoadComponent>

    <!-- Main Content -->
    <div class="relative z-10 max-w-7xl mx-auto py-6 px-4 sm:px-6 lg:px-8">
      <!-- Filters -->
      <LazyLoadComponent animation-type="slide-left" :threshold="0.2" root-margin="100px">
        <GrammarFilters
          :searchQuery="searchQuery"
          :selectedLevel="selectedLevel"
          :selectedCategory="selectedCategory"
          :categories="categories"
          @update:searchQuery="searchQuery = $event"
          @update:selectedLevel="selectedLevel = $event"
          @update:selectedCategory="selectedCategory = $event"
        />
      </LazyLoadComponent>

      <LazyLoadComponent animation-type="scale" :threshold="0.2" root-margin="150px">
        <!-- Grammar Lessons Grid -->
        <div v-if="filteredLessons.length > 0" class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          <GrammarCard
            v-for="lesson in filteredLessons"
            :key="lesson.id"
            :lesson="lesson"
            @view-lesson="viewLesson"
            @practice-lesson="practiceLesson"
            @edit-lesson="openEditDialog"
            @delete-lesson="deleteLesson"
          />
        </div>

        <!-- Empty State -->
        <GrammarEmptyState
          v-else
          @add-lesson="openAddDialog"
        />
      </LazyLoadComponent>
    </div>

    <!-- Grammar Form Dialog -->
    <GrammarFormDialog
      v-model="showFormDialog"
      :edit-id="currentEditId"
      @saved="onLessonSaved"
    />
  </div>
</template>

<script setup lang="ts">
import { ref, computed, onMounted, defineAsyncComponent } from 'vue'
import { useRouter } from 'vue-router'
import { useI18n } from 'vue-i18n'
import { loadComponentSafely } from '../../utils/import-helper'
import { useGrammarStore } from '../../composables/useGrammarStore'

// Sử dụng defineAsyncComponent để import components an toàn
const LazyLoadComponent = defineAsyncComponent(() => import('../../components/LazyLoadComponent.vue'))
const GrammarHeader = defineAsyncComponent(
  loadComponentSafely(() => import('./components/GrammarHeader.vue'))
)
const GrammarFilters = defineAsyncComponent(
  loadComponentSafely(() => import('./components/GrammarFilters.vue'))
)
const GrammarCard = defineAsyncComponent(
  loadComponentSafely(() => import('./components/GrammarCard.vue'))
)
const GrammarEmptyState = defineAsyncComponent(
  loadComponentSafely(() => import('./components/GrammarEmptyState.vue'))
)
const GrammarFormDialog = defineAsyncComponent(
  loadComponentSafely(() => import('./components/GrammarFormDialog.vue'))
)

const router = useRouter()
const { t } = useI18n()
const grammarStore = useGrammarStore()

// Dialog control
const showFormDialog = ref(false)
const currentEditId = ref('')

// Data
const searchQuery = ref('')
const selectedLevel = ref('')
const selectedCategory = ref('')

const categories = ref([
  'Tenses', 'Conditionals', 'Passive Voice', 'Modal Verbs', 'Reported Speech', 
  'Articles', 'Prepositions', 'Adjectives & Adverbs', 'Phrasal Verbs', 'Gerunds & Infinitives'
])

// Computed
const filteredLessons = computed(() => {
  return grammarStore.allLessons.value.filter(lesson => {
    const matchesSearch = lesson.title.toLowerCase().includes(searchQuery.value.toLowerCase()) ||
                         lesson.description.toLowerCase().includes(searchQuery.value.toLowerCase())
    const matchesLevel = !selectedLevel.value || lesson.level === selectedLevel.value
    const matchesCategory = !selectedCategory.value || lesson.category === selectedCategory.value
    
    return matchesSearch && matchesLevel && matchesCategory
  })
})

// Methods
const openAddDialog = () => {
  currentEditId.value = ''
  showFormDialog.value = true
}

const openEditDialog = (lesson: any) => {
  currentEditId.value = lesson.id
  showFormDialog.value = true
}

const onLessonSaved = (lesson: any) => {
  // Optionally do something after lesson is saved
  console.log('Lesson saved:', lesson)
}

const viewLesson = (lesson: any) => {
  router.push(`/grammar/${lesson.id}`)
}

const practiceLesson = (lesson: any) => {
  router.push(`/grammar/${lesson.id}/practice`)
}

const deleteLesson = (lesson: any) => {
  if (confirm(t('grammar.confirmDelete', { title: lesson.title }) || `Delete lesson "${lesson.title}"?`)) {
    grammarStore.deleteLesson(lesson.id)
  }
}

onMounted(() => {
  // Load grammar lessons data
  console.log('Grammar list mounted')
})
</script>

<style scoped>
.line-clamp-3 {
  display: -webkit-box;
  -webkit-line-clamp: 3;
  -webkit-box-orient: vertical;
  overflow: hidden;
}
</style>
