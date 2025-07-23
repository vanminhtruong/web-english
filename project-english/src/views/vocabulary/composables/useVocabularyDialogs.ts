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
    // Dispatch edit word event
    window.dispatchEvent(new CustomEvent('vocabulary-edit-word'));
  };

  const openEditDialog = (word: Vocabulary) => {
    selectedVocabulary.value = word;
    showFormDialog.value = true;
    // Dispatch edit word event
    window.dispatchEvent(new CustomEvent('vocabulary-edit-word'));
  };

  const onVocabularySaved = () => {
    showFormDialog.value = false;
    selectedVocabulary.value = null;
  };

  const openDetailsDialog = (word: Vocabulary) => {
    selectedVocabularyForDetail.value = word;
    showDetailDialog.value = true;
    // Dispatch view details event
    window.dispatchEvent(new CustomEvent('vocabulary-view-details'));
  };

  const openEditFromDetail = (word: Vocabulary) => {
    showDetailDialog.value = false;
    selectedVocabulary.value = word;
    showFormDialog.value = true;
    // Dispatch edit word event
    window.dispatchEvent(new CustomEvent('vocabulary-edit-word'));
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