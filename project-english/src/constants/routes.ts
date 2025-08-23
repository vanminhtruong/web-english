/**
 * Module quản lý các route constants và component paths
 * Giúp tránh lỗi TypeScript khi import components
 */

// Route names constants
export const ROUTE_NAMES = {
  // Dashboard
  DASHBOARD: 'dashboard',

  // Vocabulary
  VOCABULARY_LIST: 'vocabulary-list',
  VOCABULARY_QUESTIONS: 'vocabulary-questions',
  VOCABULARY_EXAMPLES: 'vocabulary-examples',
  VOCABULARY_GENERATOR: 'vocabulary-generator',
  VOCABULARY_ADD: 'vocabulary-add',
  VOCABULARY_EDIT: 'vocabulary-edit',

  // Grammar
  GRAMMAR_LIST: 'grammar-list',
  GRAMMAR_DETAIL: 'grammar-detail',
  GRAMMAR_PRACTICE: 'grammar-practice',
  GRAMMAR_ADD: 'grammar-add',
  GRAMMAR_EDIT: 'grammar-edit',

  // Practice
  PRACTICE_FLASHCARD: 'practice-flashcard',
  PRACTICE_QUIZ: 'practice-quiz',

  // Test
  TAILWIND_TEST: 'tailwind-test',
  
  // Not Found
  NOT_FOUND: 'NotFound',
} as const

// Route paths constants
export const ROUTE_PATHS = {
  ROOT: '/',

  // Dashboard
  DASHBOARD: '/dashboard',

  // Vocabulary
  VOCABULARY: '/vocabulary',
  VOCABULARY_QUESTIONS: '/vocabulary/questions',
  VOCABULARY_EXAMPLES: '/vocabulary/examples',
  VOCABULARY_GENERATOR: '/vocabulary/generator',
  VOCABULARY_ADD: '/vocabulary/add',
  VOCABULARY_EDIT: '/vocabulary/edit/:id',

  // Grammar
  GRAMMAR: '/grammar',
  GRAMMAR_DETAIL: '/grammar/:id',
  GRAMMAR_PRACTICE: '/grammar/:id/practice',
  GRAMMAR_ADD: '/grammar/add',
  GRAMMAR_EDIT: '/grammar/edit/:id',

  // Practice
  PRACTICE_FLASHCARD: '/practice/flashcard',
  PRACTICE_QUIZ: '/practice/quiz',

  // Test
  TEST: '/test',
  
  // Not Found
  NOT_FOUND: '/:pathMatch(.*)*',
} as const

// Component paths constants (để sử dụng với dynamic import)
export const COMPONENT_PATHS = {
  // Dashboard
  DASHBOARD: '../views/dashboard/DashboardView.vue',

  // Vocabulary
  VOCABULARY_LIST: '../views/vocabulary/VocabularyListView.vue',
  VOCABULARY_QUESTIONS: '../views/vocabulary/VocabularyQuestionsView.vue',
  VOCABULARY_EXAMPLES: '../views/vocabulary/VocabularyExamplesView.vue',
  VOCABULARY_GENERATOR: '../views/vocabulary/AutoGeneratorView.vue',
  VOCABULARY_ADD: '../views/vocabulary/AddVocabularyView.vue',
  VOCABULARY_EDIT: '../views/vocabulary/EditVocabularyView.vue',

  // Grammar
  GRAMMAR_LIST: '../views/grammar/GrammarListView.vue',
  GRAMMAR_DETAIL: '../views/grammar/GrammarDetailView.vue',
  GRAMMAR_PRACTICE: '../views/grammar/GrammarPracticeView.vue',
  GRAMMAR_ADD: '../views/grammar/AddGrammarView.vue',
  GRAMMAR_EDIT: '../views/grammar/EditGrammarView.vue',

  // Practice
  PRACTICE_FLASHCARD: '../views/practice/FlashcardView.vue',
  PRACTICE_QUIZ: '../views/practice/QuizView.vue',

  // Test
  TAILWIND_TEST: '../components/TailwindTest.vue',
  
  // Not Found
  NOT_FOUND: '../views/NotFoundView.vue',
} as const

// Type definitions
export type RouteNameType = typeof ROUTE_NAMES[keyof typeof ROUTE_NAMES]
export type RoutePathType = typeof ROUTE_PATHS[keyof typeof ROUTE_PATHS]
export type ComponentPathType = typeof COMPONENT_PATHS[keyof typeof COMPONENT_PATHS]

/**
 * Helper function để tạo dynamic import cho component
 * @param componentPath - Đường dẫn đến component
 * @returns Function để dynamic import component
 */
export const createComponentImport = (componentPath: ComponentPathType) => {
  return () => import(/* @vite-ignore */ componentPath)
}

/**
 * Route configuration object
 */
export const ROUTE_CONFIG = {
  // Dashboard
  DASHBOARD: {
    path: ROUTE_PATHS.DASHBOARD,
    name: ROUTE_NAMES.DASHBOARD,
    componentPath: COMPONENT_PATHS.DASHBOARD,
  },

  // Vocabulary
  VOCABULARY_LIST: {
    path: ROUTE_PATHS.VOCABULARY,
    name: ROUTE_NAMES.VOCABULARY_LIST,
    componentPath: COMPONENT_PATHS.VOCABULARY_LIST,
  },
  VOCABULARY_QUESTIONS: {
    path: ROUTE_PATHS.VOCABULARY_QUESTIONS,
    name: ROUTE_NAMES.VOCABULARY_QUESTIONS,
    componentPath: COMPONENT_PATHS.VOCABULARY_QUESTIONS,
  },
  VOCABULARY_EXAMPLES: {
    path: ROUTE_PATHS.VOCABULARY_EXAMPLES,
    name: ROUTE_NAMES.VOCABULARY_EXAMPLES,
    componentPath: COMPONENT_PATHS.VOCABULARY_EXAMPLES,
  },
  VOCABULARY_GENERATOR: {
    path: ROUTE_PATHS.VOCABULARY_GENERATOR,
    name: ROUTE_NAMES.VOCABULARY_GENERATOR,
    componentPath: COMPONENT_PATHS.VOCABULARY_GENERATOR,
  },
  VOCABULARY_ADD: {
    path: ROUTE_PATHS.VOCABULARY_ADD,
    name: ROUTE_NAMES.VOCABULARY_ADD,
    componentPath: COMPONENT_PATHS.VOCABULARY_ADD,
  },
  VOCABULARY_EDIT: {
    path: ROUTE_PATHS.VOCABULARY_EDIT,
    name: ROUTE_NAMES.VOCABULARY_EDIT,
    componentPath: COMPONENT_PATHS.VOCABULARY_EDIT,
  },

  // Grammar
  GRAMMAR_LIST: {
    path: ROUTE_PATHS.GRAMMAR,
    name: ROUTE_NAMES.GRAMMAR_LIST,
    componentPath: COMPONENT_PATHS.GRAMMAR_LIST,
  },
  GRAMMAR_DETAIL: {
    path: ROUTE_PATHS.GRAMMAR_DETAIL,
    name: ROUTE_NAMES.GRAMMAR_DETAIL,
    componentPath: COMPONENT_PATHS.GRAMMAR_DETAIL,
  },
  GRAMMAR_PRACTICE: {
    path: ROUTE_PATHS.GRAMMAR_PRACTICE,
    name: ROUTE_NAMES.GRAMMAR_PRACTICE,
    componentPath: COMPONENT_PATHS.GRAMMAR_PRACTICE,
  },
  GRAMMAR_ADD: {
    path: ROUTE_PATHS.GRAMMAR_ADD,
    name: ROUTE_NAMES.GRAMMAR_ADD,
    componentPath: COMPONENT_PATHS.GRAMMAR_ADD,
  },
  GRAMMAR_EDIT: {
    path: ROUTE_PATHS.GRAMMAR_EDIT,
    name: ROUTE_NAMES.GRAMMAR_EDIT,
    componentPath: COMPONENT_PATHS.GRAMMAR_EDIT,
  },

  // Practice
  PRACTICE_FLASHCARD: {
    path: ROUTE_PATHS.PRACTICE_FLASHCARD,
    name: ROUTE_NAMES.PRACTICE_FLASHCARD,
    componentPath: COMPONENT_PATHS.PRACTICE_FLASHCARD,
  },
  PRACTICE_QUIZ: {
    path: ROUTE_PATHS.PRACTICE_QUIZ,
    name: ROUTE_NAMES.PRACTICE_QUIZ,
    componentPath: COMPONENT_PATHS.PRACTICE_QUIZ,
  },

  // Test
  TAILWIND_TEST: {
    path: ROUTE_PATHS.TEST,
    name: ROUTE_NAMES.TAILWIND_TEST,
    componentPath: COMPONENT_PATHS.TAILWIND_TEST,
  },
  
  // Not Found
  NOT_FOUND: {
    path: ROUTE_PATHS.NOT_FOUND,
    name: ROUTE_NAMES.NOT_FOUND,
    componentPath: COMPONENT_PATHS.NOT_FOUND,
  },
} as const
