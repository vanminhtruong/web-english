import { ref, watch } from 'vue';
import { useVocabularyStore } from '../../../composables/useVocabularyStore';
import { useModalStore } from '../../../stores/modalStore';

export function useTopicManager(debounceAutoSave: () => void) {
  const showTopicManager = ref(false);
  const vocabularyStore = useVocabularyStore();
  const modalStore = useModalStore();

  const openTopicManager = () => {
    showTopicManager.value = true;
    modalStore.setTopicManager(true);
  };

  // Watch for changes to sync with modal store
  watch(showTopicManager, (newValue: boolean) => {
    modalStore.setTopicManager(newValue);
  });

  const onTopicAdded = (topic: { key: string; vi: string; en: string }) => {
    vocabularyStore.addCustomTopic(topic);
    debounceAutoSave();
    window.dispatchEvent(new CustomEvent('topics-updated'));
  };

  const onTopicUpdated = (oldKey: string, topic: { key: string; vi: string; en: string }) => {
    vocabularyStore.allVocabularies.value.forEach(vocab => {
      if (vocab.category === oldKey) {
        vocabularyStore.updateVocabulary(vocab.id, { category: topic.key });
      }
    });
    vocabularyStore.updateCustomTopic(oldKey, topic);
    debounceAutoSave();
    window.dispatchEvent(new CustomEvent('topics-updated'));
  };

  const onTopicDeleted = (key: string) => {
    vocabularyStore.deleteCustomTopic(key);
    debounceAutoSave();
    window.dispatchEvent(new CustomEvent('topics-updated'));
  };

  return {
    showTopicManager,
    openTopicManager,
    onTopicAdded,
    onTopicUpdated,
    onTopicDeleted,
  };
} 