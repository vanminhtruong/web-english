import { createRouter, createWebHashHistory } from 'vue-router'
import { ROUTE_PATHS, ROUTE_CONFIG, createComponentImport } from '../constants/routes'

const router = createRouter({
  history: createWebHashHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: ROUTE_PATHS.ROOT,
      redirect: ROUTE_PATHS.DASHBOARD,
    },
    {
      path: ROUTE_CONFIG.DASHBOARD.path,
      name: ROUTE_CONFIG.DASHBOARD.name,
      component: createComponentImport(ROUTE_CONFIG.DASHBOARD.componentPath),
    },
    {
      path: ROUTE_CONFIG.VOCABULARY_LIST.path,
      name: ROUTE_CONFIG.VOCABULARY_LIST.name,
      component: createComponentImport(ROUTE_CONFIG.VOCABULARY_LIST.componentPath),
    },
    {
      path: ROUTE_CONFIG.VOCABULARY_QUESTIONS.path,
      name: ROUTE_CONFIG.VOCABULARY_QUESTIONS.name,
      component: createComponentImport(ROUTE_CONFIG.VOCABULARY_QUESTIONS.componentPath),
    },
    {
      path: ROUTE_CONFIG.VOCABULARY_EXAMPLES.path,
      name: ROUTE_CONFIG.VOCABULARY_EXAMPLES.name,
      component: createComponentImport(ROUTE_CONFIG.VOCABULARY_EXAMPLES.componentPath),
    },
    {
      path: ROUTE_CONFIG.VOCABULARY_GENERATOR.path,
      name: ROUTE_CONFIG.VOCABULARY_GENERATOR.name,
      component: createComponentImport(ROUTE_CONFIG.VOCABULARY_GENERATOR.componentPath),
    },
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
      path: ROUTE_CONFIG.NOT_FOUND.path,
      name: ROUTE_CONFIG.NOT_FOUND.name,
      component: createComponentImport(ROUTE_CONFIG.NOT_FOUND.componentPath),
    },
  ],
})

// Navigation Guards (removed authentication checks)
// router.beforeEach((to, _from, next) => {
//   next()
// })

export default router
