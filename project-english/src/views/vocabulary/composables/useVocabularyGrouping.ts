import { ref } from 'vue';
import { getDateKey } from '../../../utils/dateUtils';

export function useVocabularyGrouping() {
  const useGrouping = ref(false);
  const itemsPerPageGrouped = ref(5);
  const dateGroupPages = ref<Record<string, number>>({});

  const getStoredUseGrouping = (): boolean => {
    const stored = localStorage.getItem('vocabulary-use-grouping');
    return stored ? JSON.parse(stored) : false;
  };

  const setStoredUseGrouping = (value: boolean) => {
    localStorage.setItem('vocabulary-use-grouping', JSON.stringify(value));
  };

  useGrouping.value = getStoredUseGrouping();

  const toggleGrouping = () => {
    useGrouping.value = !useGrouping.value;
    setStoredUseGrouping(useGrouping.value);
    // Resetting page state is handled in the main component
  };
  
  const reloadGroupingState = () => {
    useGrouping.value = getStoredUseGrouping();
  };
  
  const dateGroupPrevious = (date: string, filteredVocabulary: any[]) => {
    const currentPage = dateGroupPages.value[date] || 1;
    if (currentPage > 1) {
      dateGroupPages.value[date] = currentPage - 1;
    }
  };

  const dateGroupNext = (date: string, filteredVocabulary: any[]) => {
    const currentPage = dateGroupPages.value[date] || 1;
    const dateGroup = filteredVocabulary.filter(word => getDateKey(word.createdAt) === date);
    const totalPages = Math.ceil(dateGroup.length / itemsPerPageGrouped.value);
    if (currentPage < totalPages) {
      dateGroupPages.value[date] = currentPage + 1;
    }
  };

  const dateGroupGoToPage = (date: string, page: number) => {
    dateGroupPages.value[date] = page;
  };

  return {
    useGrouping,
    itemsPerPageGrouped,
    dateGroupPages,
    toggleGrouping,
    reloadGroupingState,
    dateGroupPrevious,
    dateGroupNext,
    dateGroupGoToPage,
  };
} 