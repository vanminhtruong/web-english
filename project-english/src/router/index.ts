import { createRouter, createWebHashHistory } from 'vue-router'

// Static imports
import DashboardView from '../views/dashboard/DashboardView.vue'
import VocabularyListView from '../views/vocabulary/VocabularyListView.vue'
import GrammarListView from '../views/grammar/GrammarListView.vue'
import GrammarDetailView from '../views/grammar/GrammarDetailView.vue'
import GrammarPracticeView from '../views/grammar/GrammarPracticeView.vue'
import FlashcardView from '../views/practice/FlashcardView.vue'
import QuizView from '../views/practice/QuizView.vue'
import TailwindTest from '../components/TailwindTest.vue'
import NotFoundView from '../views/NotFoundView.vue'

const router = createRouter({
  history: createWebHashHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      redirect: '/dashboard'
    },
    {
      path: '/dashboard',
      name: 'dashboard',
      component: DashboardView,
    },
    {
      path: '/vocabulary',
      name: 'vocabulary-list',
      component: VocabularyListView,
    },
    {
      path: '/grammar',
      name: 'grammar-list',
      component: GrammarListView,
    },
    {
      path: '/grammar/:id',
      name: 'grammar-detail',
      component: GrammarDetailView,
    },
    {
      path: '/grammar/:id/practice',
      name: 'grammar-practice',
      component: GrammarPracticeView,
    },

    {
      path: '/practice/flashcard',
      name: 'practice-flashcard',
      component: FlashcardView,
    },
    {
      path: '/practice/quiz',
      name: 'practice-quiz',
      component: QuizView,
    },
    {
      path: '/test',
      name: 'tailwind-test',
      component: TailwindTest,
    },
    {
      path: '/:pathMatch(.*)*',
      name: 'NotFound',
      component: NotFoundView
    }
  ],
})

// Navigation Guards (removed authentication checks)
// router.beforeEach((to, _from, next) => {
//   next()
// })

export default router
