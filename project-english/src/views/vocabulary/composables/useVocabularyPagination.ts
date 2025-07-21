import { ref, computed } from 'vue';

export function useVocabularyPagination(filteredVocabulary: any, useGrouping: any, itemsPerPage: any) {
  const currentPage = ref(1);

  const totalPages = computed(() => {
    if (useGrouping.value) return 1;
    return Math.ceil(filteredVocabulary.value.length / itemsPerPage.value);
  });

  const paginatedVocabulary = computed(() => {
    if (useGrouping.value) return filteredVocabulary.value;
    const start = (currentPage.value - 1) * itemsPerPage.value;
    const end = start + itemsPerPage.value;
    return filteredVocabulary.value.slice(start, end);
  });

  const startIndex = computed(() => (currentPage.value - 1) * itemsPerPage.value + 1);
  const endIndex = computed(() => Math.min(currentPage.value * itemsPerPage.value, filteredVocabulary.value.length));

  const visiblePages = computed(() => {
    const pages = [];
    const start = Math.max(1, currentPage.value - 2);
    const end = Math.min(totalPages.value, currentPage.value + 2);
    for (let i = start; i <= end; i++) {
      pages.push(i);
    }
    return pages;
  });

  const previousPage = () => {
    if (currentPage.value > 1) currentPage.value--;
  };

  const nextPage = () => {
    if (currentPage.value < totalPages.value) currentPage.value++;
  };

  const goToPage = (page: number) => {
    currentPage.value = page;
  };

  return {
    currentPage,
    totalPages,
    paginatedVocabulary,
    startIndex,
    endIndex,
    visiblePages,
    previousPage,
    nextPage,
    goToPage,
  };
} 