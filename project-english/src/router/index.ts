import { createRouter, createWebHashHistory } from 'vue-router'

const router = createRouter({
  history: createWebHashHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      redirect: '/dashboard',
    },
    {
      path: '/dashboard',
      name: 'dashboard',
      component: () => import('../views/dashboard/DashboardView.vue'),
    },
    {
      path: '/vocabulary',
      name: 'vocabulary-list',
      component: () => import('../views/vocabulary/VocabularyListView.vue'),
    },
    {
      path: '/vocabulary/questions',
      name: 'vocabulary-questions',
      component: () => import('../views/vocabulary/VocabularyQuestionsView.vue'),
    },
    {
      path: '/vocabulary/examples',
      name: 'vocabulary-examples',
      component: () => import('../views/vocabulary/VocabularyExamplesView.vue'),
    },
    {
      path: '/vocabulary/generator',
      name: 'vocabulary-generator',
      component: () => import('../views/vocabulary/AutoGeneratorView.vue'),
    },
    {
      path: '/grammar',
      name: 'grammar-list',
      component: () => import('../views/grammar/GrammarListView.vue'),
    },
    {
      path: '/grammar/:id',
      name: 'grammar-detail',
      component: () => import('../views/grammar/GrammarDetailView.vue'),
    },
    {
      path: '/grammar/:id/practice',
      name: 'grammar-practice',
      component: () => import('../views/grammar/GrammarPracticeView.vue'),
    },
    {
      path: '/practice/flashcard',
      name: 'practice-flashcard',
      component: () => import('../views/practice/FlashcardView.vue'),
    },
    {
      path: '/practice/quiz',
      name: 'practice-quiz',
      component: () => import('../views/practice/QuizView.vue'),
    },
    {
      path: '/test',
      name: 'tailwind-test',
      component: () => import('../components/TailwindTest.vue'),
    },
    {
      path: '/:pathMatch(.*)*',
      name: 'NotFound',
      component: () => import('../views/NotFoundView.vue'),
    },
  ],
})

// test
// Navigation Guards (removed authentication checks)
// router.beforeEach((to, _from, next) => {
//   next()
// })

export default router
