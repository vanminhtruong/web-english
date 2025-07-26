import { createRouter, createWebHashHistory } from 'vue-router'
import { ROUTE_CONFIG, createComponentImport } from '../constants/routes'

const router = createRouter({
  history: createWebHashHistory(import.meta.env.BASE_URL),
  routes: [
    // Redirect root to dashboard
    {
      path: '/',
      redirect: '/dashboard'
    },

    // Dashboard
    {
      path: ROUTE_CONFIG.DASHBOARD.path,
      name: ROUTE_CONFIG.DASHBOARD.name,
      component: createComponentImport(ROUTE_CONFIG.DASHBOARD.componentPath),
    },

    // Vocabulary Routes
    {
      path: ROUTE_CONFIG.VOCABULARY_LIST.path,
      name: ROUTE_CONFIG.VOCABULARY_LIST.name,
      component: createComponentImport(ROUTE_CONFIG.VOCABULARY_LIST.componentPath),
    },
    {
      path: ROUTE_CONFIG.VOCABULARY_ADD.path,
      name: ROUTE_CONFIG.VOCABULARY_ADD.name,
      component: createComponentImport(ROUTE_CONFIG.VOCABULARY_ADD.componentPath),
    },
    {
      path: ROUTE_CONFIG.VOCABULARY_EDIT.path,
      name: ROUTE_CONFIG.VOCABULARY_EDIT.name,
      component: createComponentImport(ROUTE_CONFIG.VOCABULARY_EDIT.componentPath),
    },

    // Grammar Routes
    {
      path: ROUTE_CONFIG.GRAMMAR_LIST.path,
      name: ROUTE_CONFIG.GRAMMAR_LIST.name,
      component: createComponentImport(ROUTE_CONFIG.GRAMMAR_LIST.componentPath),
    },
    {
      path: ROUTE_CONFIG.GRAMMAR_DETAIL.path,
      name: ROUTE_CONFIG.GRAMMAR_DETAIL.name,
      component: createComponentImport(ROUTE_CONFIG.GRAMMAR_DETAIL.componentPath),
    },
    {
      path: ROUTE_CONFIG.GRAMMAR_PRACTICE.path,
      name: ROUTE_CONFIG.GRAMMAR_PRACTICE.name,
      component: createComponentImport(ROUTE_CONFIG.GRAMMAR_PRACTICE.componentPath),
    },
    {
      path: ROUTE_CONFIG.GRAMMAR_ADD.path,
      name: ROUTE_CONFIG.GRAMMAR_ADD.name,
      component: createComponentImport(ROUTE_CONFIG.GRAMMAR_ADD.componentPath),
    },
    {
      path: ROUTE_CONFIG.GRAMMAR_EDIT.path,
      name: ROUTE_CONFIG.GRAMMAR_EDIT.name,
      component: createComponentImport(ROUTE_CONFIG.GRAMMAR_EDIT.componentPath),
    },

    // Practice Routes
    {
      path: ROUTE_CONFIG.PRACTICE_FLASHCARD.path,
      name: ROUTE_CONFIG.PRACTICE_FLASHCARD.name,
      component: createComponentImport(ROUTE_CONFIG.PRACTICE_FLASHCARD.componentPath),
    },
    {
      path: ROUTE_CONFIG.PRACTICE_QUIZ.path,
      name: ROUTE_CONFIG.PRACTICE_QUIZ.name,
      component: createComponentImport(ROUTE_CONFIG.PRACTICE_QUIZ.componentPath),
    },

    {
      path: ROUTE_CONFIG.TAILWIND_TEST.path,
      name: ROUTE_CONFIG.TAILWIND_TEST.name,
      component: createComponentImport(ROUTE_CONFIG.TAILWIND_TEST.componentPath),
    },

    {
      path: '/:pathMatch(.*)*',
      name: 'NotFound',
      component: () => import('../views/NotFoundView.vue')
    }
  ],
})

// Navigation Guards (removed authentication checks)
// router.beforeEach((to, _from, next) => {
//   next()
// })

export default router
