import { ref, watch } from 'vue';

export function useVocabularyFilters() {
  const searchQuery = ref('');
  const selectedCategory = ref('');
  const selectedLevel = ref('');
  const showFavoritesOnly = ref(false);
  const currentPage = ref(1);
  const dateGroupPages = ref<Record<string, number>>({});

  function getStoredValue(key: string, defaultValue: any) {
    try {
      const stored = localStorage.getItem(key);
      return stored !== null ? JSON.parse(stored) : defaultValue;
    } catch {
      return defaultValue;
    }
  }

  function setStoredValue(key: string, value: any) {
    localStorage.setItem(key, JSON.stringify(value));
  }

  showFavoritesOnly.value = getStoredValue('vocabulary-show-favorites-only', false);
  searchQuery.value = getStoredValue('vocabulary-search-query', '');
  selectedCategory.value = getStoredValue('vocabulary-selected-category', '');
  selectedLevel.value = getStoredValue('vocabulary-selected-level', '');

  const updateShowFavoritesOnly = (value: boolean) => {
    showFavoritesOnly.value = value;
    setStoredValue('vocabulary-show-favorites-only', value);
    currentPage.value = 1;
    dateGroupPages.value = {};
  };

  const updateSearchQuery = (value: string) => {
    searchQuery.value = value;
    setStoredValue('vocabulary-search-query', value);
    currentPage.value = 1;
    dateGroupPages.value = {};
  };

  const updateSelectedCategory = (value: string) => {
    selectedCategory.value = value;
    setStoredValue('vocabulary-selected-category', value);
    currentPage.value = 1;
    dateGroupPages.value = {};
  };

  const updateSelectedLevel = (value: string) => {
    selectedLevel.value = value;
    setStoredValue('vocabulary-selected-level', value);
    currentPage.value = 1;
    dateGroupPages.value = {};
  };

  return {
    searchQuery,
    selectedCategory,
    selectedLevel,
    showFavoritesOnly,
    currentPage,
    dateGroupPages,
    updateShowFavoritesOnly,
    updateSearchQuery,
    updateSelectedCategory,
    updateSelectedLevel,
  };
} 