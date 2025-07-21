import { ref } from 'vue';
import type { Vocabulary } from '../../../composables/useVocabularyStore';

export function useVocabularyDialogs() {
  const showFormDialog = ref(false);
  const selectedVocabulary = ref<Vocabulary | null>(null);
  const showDetailDialog = ref(false);
  const selectedVocabularyForDetail = ref<Vocabulary | null>(null);

  const openAddDialog = () => {
    selectedVocabulary.value = null;
    showFormDialog.value = true;
  };

  const openEditDialog = (word: Vocabulary) => {
    selectedVocabulary.value = word;
    showFormDialog.value = true;
  };

  const onVocabularySaved = () => {
    showFormDialog.value = false;
    selectedVocabulary.value = null;
  };

  const openDetailsDialog = (word: Vocabulary) => {
    selectedVocabularyForDetail.value = word;
    showDetailDialog.value = true;
  };

  const openEditFromDetail = (word: Vocabulary) => {
    showDetailDialog.value = false;
    selectedVocabulary.value = word;
    showFormDialog.value = true;
  };

  return {
    showFormDialog,
    selectedVocabulary,
    showDetailDialog,
    selectedVocabularyForDetail,
    openAddDialog,
    openEditDialog,
    onVocabularySaved,
    openDetailsDialog,
    openEditFromDetail,
  };
} 