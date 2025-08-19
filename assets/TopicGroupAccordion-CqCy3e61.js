const __vite__mapDeps=(i,m=__vite__mapDeps,d=(m.f||(m.f=["assets/ExampleFormDialog-j2zcW8LB.js","assets/vendor-kzGOnAa-.js"])))=>i.map(i=>d[i]);
import { H as useI18n, A as ref, B as computed, K as watch, I as onMounted, D as defineAsyncComponent, d as defineComponent, c as createElementBlock, v as openBlock, e as createCommentVNode, F as Fragment, j as renderList, f as createBaseVNode, y as createVNode, t as toDisplayString, u as unref, n as normalizeClass, w as withCtx, M as Transition } from "./vendor-kzGOnAa-.js";
import { c as useVocabularyStore, i as useTopicName, j as useAudioSystem, _ as __vitePreload, a as _export_sfc } from "./index-CCffuzjZ.js";
import "./vendor-toast-DUxYViPJ.js";
const ExampleFormDialog = defineAsyncComponent(() => __vitePreload(() => import("./ExampleFormDialog-j2zcW8LB.js"), true ? __vite__mapDeps([0,1]) : void 0));
function useTopicGroupAccordion(props) {
  const { t } = useI18n();
  useVocabularyStore();
  const audioSystem = useAudioSystem();
  const { getTopicName } = useTopicName();
  const expandedGroups = ref({});
  const expandedVocabExamples = ref({});
  const examplePages = ref({});
  const examplesPerPage = ref(3);
  const currentPage = ref(1);
  const topicsPerPage = ref(3);
  const topicVocabPages = ref({});
  const topicVocabPerPage = ref(3);
  const playVocabularyAudio = (word) => audioSystem.playVocabularySound(word, "en");
  const playExampleAudio = (text) => audioSystem.playVocabularySound(text, "en");
  const loadExpandedState = () => {
    try {
      const saved = localStorage.getItem("vocabulary-examples-expanded-topics");
      if (saved) expandedGroups.value = { ...JSON.parse(saved) };
    } catch (error) {
      console.error("Error loading expanded state:", error);
    }
  };
  const saveExpandedState = () => {
    try {
      localStorage.setItem("vocabulary-examples-expanded-topics", JSON.stringify(expandedGroups.value));
    } catch (error) {
      console.error("Error saving expanded state:", error);
    }
  };
  const loadExpandedVocabExamplesState = () => {
    try {
      const saved = localStorage.getItem("vocabulary-examples-expanded-vocab-grouped");
      if (saved) expandedVocabExamples.value = { ...JSON.parse(saved) };
    } catch (error) {
      console.error("Error loading expanded vocabulary examples state:", error);
    }
  };
  const saveExpandedVocabExamplesState = () => {
    try {
      localStorage.setItem("vocabulary-examples-expanded-vocab-grouped", JSON.stringify(expandedVocabExamples.value));
    } catch (error) {
      console.error("Error saving expanded vocab examples state:", error);
    }
  };
  const loadExamplePagesState = () => {
    try {
      const saved = localStorage.getItem("vocabulary-examples-pages-grouped");
      if (saved) examplePages.value = { ...JSON.parse(saved) };
    } catch (error) {
      console.error("Error loading example pages state:", error);
    }
  };
  const saveExamplePagesState = () => {
    try {
      localStorage.setItem("vocabulary-examples-pages-grouped", JSON.stringify(examplePages.value));
    } catch (error) {
      console.error("Error saving example pages state:", error);
    }
  };
  const loadTopicVocabPagesState = () => {
    try {
      const saved = localStorage.getItem("vocabulary-topic-vocab-pages");
      if (saved) topicVocabPages.value = { ...JSON.parse(saved) };
    } catch (error) {
      console.error("Error loading topic vocab pages state:", error);
    }
  };
  const saveTopicVocabPagesState = () => {
    try {
      localStorage.setItem("vocabulary-topic-vocab-pages", JSON.stringify(topicVocabPages.value));
    } catch (error) {
      console.error("Error saving topic vocab pages state:", error);
    }
  };
  const allGroupedVocabulary = computed(() => {
    const groups = {};
    props.vocabularyList.forEach((vocab) => {
      const topicKey = vocab.category || "uncategorized";
      if (!groups[topicKey]) groups[topicKey] = [];
      groups[topicKey].push(vocab);
    });
    Object.keys(groups).forEach((key) => {
      groups[key].sort((a, b) => a.word.localeCompare(b.word));
    });
    return groups;
  });
  const groupedVocabulary = computed(() => {
    const allGroups = allGroupedVocabulary.value;
    const topicKeys = Object.keys(allGroups).sort((a, b) => a.localeCompare(b));
    const start = (currentPage.value - 1) * topicsPerPage.value;
    const end = start + topicsPerPage.value;
    const paginatedTopics = topicKeys.slice(start, end);
    const paginatedGroups = {};
    paginatedTopics.forEach((topicKey) => {
      paginatedGroups[topicKey] = allGroups[topicKey];
    });
    return paginatedGroups;
  });
  const paginationInfo = computed(() => {
    const totalTopics = Object.keys(allGroupedVocabulary.value).length;
    const totalPages = Math.ceil(totalTopics / topicsPerPage.value);
    const startIndex = (currentPage.value - 1) * topicsPerPage.value + 1;
    const endIndex = Math.min(currentPage.value * topicsPerPage.value, totalTopics);
    return {
      totalTopics,
      totalPages,
      currentPage: currentPage.value,
      startIndex,
      endIndex,
      hasNext: currentPage.value < totalPages,
      hasPrevious: currentPage.value > 1
    };
  });
  const visiblePages = computed(() => {
    const pages = [];
    const maxVisible = 5;
    const totalP = paginationInfo.value.totalPages;
    if (totalP <= maxVisible) {
      for (let i = 1; i <= totalP; i++) pages.push(i);
    } else {
      const start = Math.max(1, currentPage.value - Math.floor(maxVisible / 2));
      const end = Math.min(totalP, start + maxVisible - 1);
      for (let i = start; i <= end; i++) pages.push(i);
    }
    return pages;
  });
  const getVocabExamples = (vocabId) => props.examples.filter((e) => e.vocabularyId === vocabId);
  const getPaginatedVocabExamples = (vocabId) => {
    const allExamples = getVocabExamples(vocabId);
    const totalPages = Math.max(1, Math.ceil(allExamples.length / examplesPerPage.value));
    const current = Math.min(examplePages.value[vocabId] || 1, totalPages);
    const start = (current - 1) * examplesPerPage.value;
    return allExamples.slice(start, start + examplesPerPage.value);
  };
  const getPaginatedTopicVocabs = (topicKey) => {
    const group = allGroupedVocabulary.value[topicKey] || [];
    const current = topicVocabPages.value[topicKey] || 1;
    const start = (current - 1) * topicVocabPerPage.value;
    return group.slice(start, start + topicVocabPerPage.value);
  };
  const getTopicVocabPagesCount = (topicKey) => {
    const total = (allGroupedVocabulary.value[topicKey] || []).length;
    return Math.max(1, Math.ceil(total / topicVocabPerPage.value));
  };
  const getTopicVocabPaginationInfo = (topicKey) => {
    const totalVocab = (allGroupedVocabulary.value[topicKey] || []).length;
    const totalPages = Math.max(1, Math.ceil(totalVocab / topicVocabPerPage.value));
    const current = Math.min(topicVocabPages.value[topicKey] || 1, totalPages);
    const start = totalVocab === 0 ? 0 : (current - 1) * topicVocabPerPage.value + 1;
    const end = Math.min(current * topicVocabPerPage.value, totalVocab);
    return { totalVocab, totalPages, currentPage: current, start, end, hasNext: current < totalPages, hasPrevious: current > 1 };
  };
  const getVocabExamplePages = (vocabId) => Math.ceil(getVocabExamples(vocabId).length / examplesPerPage.value);
  const getExamplePaginationInfo = (vocabId) => {
    const totalExamples = getVocabExamples(vocabId).length;
    const totalPages = getVocabExamplePages(vocabId);
    const safeTotalPages = Math.max(1, totalPages);
    const current = Math.min(examplePages.value[vocabId] || 1, safeTotalPages);
    const start = (current - 1) * examplesPerPage.value + 1;
    const end = Math.min(current * examplesPerPage.value, totalExamples);
    return { totalExamples, totalPages, currentPage: current, start, end, hasNext: current < totalPages, hasPrevious: current > 1 };
  };
  const getVocabExampleCount = (vocabId) => props.examples.filter((e) => e.vocabularyId === vocabId).length;
  const getTotalExamplesForTopic = (group) => group.reduce((total, vocab) => total + getVocabExampleCount(vocab.id), 0);
  const getTopicVisiblePages = (topicKey) => {
    const pages = [];
    const maxVisible = 5;
    const totalP = getTopicVocabPagesCount(topicKey);
    const current = topicVocabPages.value[topicKey] || 1;
    if (totalP <= maxVisible) {
      for (let i = 1; i <= totalP; i++) pages.push(i);
    } else {
      const start = Math.max(1, current - Math.floor(maxVisible / 2));
      const end = Math.min(totalP, start + maxVisible - 1);
      for (let i = start; i <= end; i++) pages.push(i);
    }
    return pages;
  };
  const goToTopicVocabPage = (topicKey, page) => {
    const totalPages = getTopicVocabPagesCount(topicKey);
    if (page >= 1 && page <= totalPages) {
      topicVocabPages.value[topicKey] = page;
      saveTopicVocabPagesState();
    }
  };
  const previousTopicVocabPage = (topicKey) => {
    const current = topicVocabPages.value[topicKey] || 1;
    if (current > 1) goToTopicVocabPage(topicKey, current - 1);
  };
  const nextTopicVocabPage = (topicKey) => {
    const current = topicVocabPages.value[topicKey] || 1;
    const totalPages = getTopicVocabPagesCount(topicKey);
    if (current < totalPages) goToTopicVocabPage(topicKey, current + 1);
  };
  const goToExamplePage = (vocabId, page) => {
    const totalPages = getVocabExamplePages(vocabId);
    if (page >= 1 && page <= totalPages) {
      examplePages.value[vocabId] = page;
      saveExamplePagesState();
    }
  };
  const previousExamplePage = (vocabId) => {
    const current = examplePages.value[vocabId] || 1;
    if (current > 1) goToExamplePage(vocabId, current - 1);
  };
  const nextExamplePage = (vocabId) => {
    const current = examplePages.value[vocabId] || 1;
    const totalPages = getVocabExamplePages(vocabId);
    if (current < totalPages) goToExamplePage(vocabId, current + 1);
  };
  const goToPage = (page) => {
    if (page >= 1 && page <= paginationInfo.value.totalPages) currentPage.value = page;
  };
  const previousPage = () => {
    if (paginationInfo.value.hasPrevious) currentPage.value--;
  };
  const nextPage = () => {
    if (paginationInfo.value.hasNext) currentPage.value++;
  };
  const toggleGroup = (topicKey) => {
    expandedGroups.value[topicKey] = !expandedGroups.value[topicKey];
    saveExpandedState();
  };
  const toggleVocabExamples = (vocabId) => {
    expandedVocabExamples.value[vocabId] = !expandedVocabExamples.value[vocabId];
    saveExpandedVocabExamplesState();
  };
  const getTypeLabel = (type) => {
    const labels = {
      "sentence": t("vocabulary.examples.types.sentence", "Sentence"),
      "dialogue": t("vocabulary.examples.types.dialogue", "Dialogue"),
      "phrase": t("vocabulary.examples.types.phrase", "Phrase"),
      "context": t("vocabulary.examples.types.context", "Context")
    };
    return labels[type] || type;
  };
  const getTypeColorClass = (type) => {
    const classes = {
      "sentence": "bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-300",
      "dialogue": "bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-300",
      "phrase": "bg-yellow-100 text-yellow-800 dark:bg-yellow-900 dark:text-yellow-300",
      "context": "bg-purple-100 text-purple-800 dark:bg-purple-900 dark:text-purple-300"
    };
    return classes[type] || "bg-gray-100 text-gray-800 dark:bg-gray-700 dark:text-gray-300";
  };
  const getDifficultyLabel = (difficulty) => {
    const labels = {
      "easy": t("common.easy", "Easy"),
      "medium": t("vocabulary.examples.difficulty.medium", "Medium"),
      "hard": t("common.difficult", "Difficult")
    };
    return labels[difficulty] || difficulty;
  };
  const getDifficultyColorClass = (difficulty) => {
    const classes = {
      "easy": "text-green-600 dark:text-green-400",
      "medium": "text-yellow-600 dark:text-yellow-400",
      "hard": "text-red-600 dark:text-red-400"
    };
    return classes[difficulty] || "text-gray-600 dark:text-gray-400";
  };
  const enter = (el) => {
    const element = el;
    element.style.height = "0";
    element.style.overflow = "hidden";
  };
  const afterEnter = (el) => {
    const element = el;
    element.style.height = "auto";
    element.style.overflow = "visible";
  };
  const leave = (el) => {
    const element = el;
    element.style.height = element.scrollHeight + "px";
    element.style.overflow = "hidden";
    element.offsetHeight;
    element.style.height = "0";
  };
  const afterLeave = (el) => {
    const element = el;
    element.style.height = "auto";
    element.style.overflow = "visible";
  };
  const vocabExamplesEnter = (el) => {
    const element = el;
    element.style.height = "0";
    element.style.overflow = "hidden";
  };
  const vocabExamplesAfterEnter = (el) => {
    const element = el;
    element.style.height = "auto";
    element.style.overflow = "visible";
  };
  const vocabExamplesLeave = (el) => {
    const element = el;
    element.style.height = element.scrollHeight + "px";
    element.style.overflow = "hidden";
    element.offsetHeight;
    element.style.height = "0";
  };
  const vocabExamplesAfterLeave = (el) => {
    const element = el;
    element.style.height = "auto";
    element.style.overflow = "visible";
  };
  const deleteExample = (example, emit) => {
    emit("delete-example", example);
  };
  const initializeExpandedVocabExamplesState = () => {
    let examplesChanged = false, pagesChanged = false;
    Object.values(groupedVocabulary.value).forEach((group) => {
      group.forEach((vocab) => {
        if (expandedVocabExamples.value[vocab.id] === void 0) {
          expandedVocabExamples.value[vocab.id] = true;
          examplesChanged = true;
        }
        if (examplePages.value[vocab.id] === void 0) {
          examplePages.value[vocab.id] = 1;
          pagesChanged = true;
        }
      });
    });
    if (examplesChanged) saveExpandedVocabExamplesState();
    if (pagesChanged) saveExamplePagesState();
  };
  const initializeTopicVocabPagesState = () => {
    let changed = false;
    Object.keys(groupedVocabulary.value).forEach((topicKey) => {
      if (topicVocabPages.value[topicKey] === void 0) {
        topicVocabPages.value[topicKey] = 1;
        changed = true;
      }
    });
    if (changed) saveTopicVocabPagesState();
  };
  const initializeExpandedState = () => {
    const topicKeys = Object.keys(groupedVocabulary.value);
    let changed = false;
    topicKeys.forEach((key) => {
      if (expandedGroups.value[key] === void 0) {
        expandedGroups.value[key] = true;
        changed = true;
      }
    });
    if (changed) saveExpandedState();
  };
  const cleanupOldTopicStates = () => {
    try {
      const currentTopicKeys = new Set(Object.keys(allGroupedVocabulary.value));
      const expandedKeys = Object.keys(expandedGroups.value);
      let expandedChanged = false;
      expandedKeys.forEach((topicKey) => {
        if (!currentTopicKeys.has(topicKey)) {
          delete expandedGroups.value[topicKey];
          expandedChanged = true;
        }
      });
      const topicPageKeys = Object.keys(topicVocabPages.value);
      let topicPagesChanged = false;
      topicPageKeys.forEach((topicKey) => {
        if (!currentTopicKeys.has(topicKey)) {
          delete topicVocabPages.value[topicKey];
          topicPagesChanged = true;
        }
      });
      Object.keys(allGroupedVocabulary.value).forEach((topicKey) => {
        const totalPages = getTopicVocabPagesCount(topicKey);
        const current = topicVocabPages.value[topicKey] || 1;
        if (current > totalPages) {
          topicVocabPages.value[topicKey] = totalPages;
          topicPagesChanged = true;
        }
      });
      if (expandedChanged) saveExpandedState();
      if (topicPagesChanged) saveTopicVocabPagesState();
    } catch (error) {
      console.error("Error cleaning up old topic states:", error);
    }
  };
  const cleanupOldVocabularyStates = () => {
    try {
      const currentVocabIds = new Set(props.vocabularyList.map((v) => v.id));
      const expandedKeys = Object.keys(expandedVocabExamples.value);
      let expandedChanged = false;
      expandedKeys.forEach((vocabId) => {
        if (!currentVocabIds.has(vocabId)) {
          delete expandedVocabExamples.value[vocabId];
          expandedChanged = true;
        }
      });
      const pagesKeys = Object.keys(examplePages.value);
      let pagesChanged = false;
      pagesKeys.forEach((vocabId) => {
        if (!currentVocabIds.has(vocabId)) {
          delete examplePages.value[vocabId];
          pagesChanged = true;
        }
      });
      if (expandedChanged) saveExpandedVocabExamplesState();
      if (pagesChanged) saveExamplePagesState();
    } catch (error) {
      console.error("Error cleaning up old vocabulary states:", error);
    }
  };
  watch(() => groupedVocabulary.value, () => {
    initializeExpandedState();
    initializeExpandedVocabExamplesState();
    initializeTopicVocabPagesState();
  });
  watch(() => allGroupedVocabulary.value, () => cleanupOldTopicStates(), { deep: true });
  watch(() => props.vocabularyList, () => cleanupOldVocabularyStates(), { deep: true });
  watch(() => expandedGroups.value, () => saveExpandedState(), { deep: true });
  watch(() => expandedVocabExamples.value, () => saveExpandedVocabExamplesState(), { deep: true });
  watch(() => examplePages.value, () => saveExamplePagesState(), { deep: true });
  watch(() => topicVocabPages.value, () => saveTopicVocabPagesState(), { deep: true });
  onMounted(() => {
    loadExpandedState();
    loadExpandedVocabExamplesState();
    loadExamplePagesState();
    loadTopicVocabPagesState();
    initializeExpandedState();
    initializeExpandedVocabExamplesState();
    initializeTopicVocabPagesState();
    setTimeout(() => {
      cleanupOldTopicStates();
      cleanupOldVocabularyStates();
    }, 100);
  });
  return {
    // External dependencies
    ExampleFormDialog,
    getTopicName,
    t,
    // State
    expandedGroups,
    expandedVocabExamples,
    examplePages,
    examplesPerPage,
    currentPage,
    topicsPerPage,
    topicVocabPages,
    topicVocabPerPage,
    // Computed
    allGroupedVocabulary,
    groupedVocabulary,
    paginationInfo,
    visiblePages,
    // Audio
    playVocabularyAudio,
    playExampleAudio,
    // Data helpers
    getVocabExamples,
    getPaginatedVocabExamples,
    getPaginatedTopicVocabs,
    getTopicVocabPagesCount,
    getTopicVocabPaginationInfo,
    getVocabExamplePages,
    getExamplePaginationInfo,
    getVocabExampleCount,
    getTotalExamplesForTopic,
    getTopicVisiblePages,
    // Navigation
    goToTopicVocabPage,
    previousTopicVocabPage,
    nextTopicVocabPage,
    goToExamplePage,
    previousExamplePage,
    nextExamplePage,
    goToPage,
    previousPage,
    nextPage,
    // Toggle
    toggleGroup,
    toggleVocabExamples,
    // Styling
    getTypeLabel,
    getTypeColorClass,
    getDifficultyLabel,
    getDifficultyColorClass,
    // Animation
    enter,
    afterEnter,
    leave,
    afterLeave,
    vocabExamplesEnter,
    vocabExamplesAfterEnter,
    vocabExamplesLeave,
    vocabExamplesAfterLeave,
    // Actions
    deleteExample
  };
}
const _hoisted_1 = { class: "space-y-4" };
const _hoisted_2 = ["onClick"];
const _hoisted_3 = { class: "flex items-center space-x-3" };
const _hoisted_4 = { class: "text-lg font-bold bg-gradient-to-r from-blue-600 to-purple-600 dark:from-blue-400 dark:to-purple-400 bg-clip-text text-transparent" };
const _hoisted_5 = { class: "text-sm text-gray-600 dark:text-gray-300" };
const _hoisted_6 = { class: "flex items-center space-x-2" };
const _hoisted_7 = { class: "text-sm text-gray-500 dark:text-gray-400" };
const _hoisted_8 = {
  key: 0,
  class: "accordion-content border-t border-gray-200/50 dark:border-gray-700/50"
};
const _hoisted_9 = { class: "p-4 space-y-4" };
const _hoisted_10 = { class: "flex items-center justify-between mb-3 pb-2 border-b border-gray-200/30 dark:border-gray-700/30" };
const _hoisted_11 = { class: "flex items-center space-x-3" };
const _hoisted_12 = { class: "flex items-center space-x-2" };
const _hoisted_13 = { class: "text-base font-bold text-gray-900 dark:text-white" };
const _hoisted_14 = ["onClick", "title"];
const _hoisted_15 = ["onClick", "title"];
const _hoisted_16 = { class: "text-sm text-gray-600 dark:text-gray-300" };
const _hoisted_17 = { class: "flex items-center space-x-2 mt-1" };
const _hoisted_18 = { class: "inline-flex items-center px-2 py-0.5 rounded-full text-xs font-medium bg-blue-100 text-blue-800 dark:bg-blue-900/20 dark:text-blue-300" };
const _hoisted_19 = { class: "text-xs text-gray-500 dark:text-gray-400" };
const _hoisted_20 = ["onClick"];
const _hoisted_21 = { class: "text-sm" };
const _hoisted_22 = {
  key: 0,
  class: "vocab-examples-accordion-content space-y-2"
};
const _hoisted_23 = {
  key: 0,
  class: "text-center py-3 text-gray-500 dark:text-gray-400"
};
const _hoisted_24 = { class: "text-xs" };
const _hoisted_25 = { class: "flex items-start justify-between" };
const _hoisted_26 = { class: "flex-1" };
const _hoisted_27 = { class: "flex items-center space-x-2 mb-2" };
const _hoisted_28 = { class: "mb-2" };
const _hoisted_29 = { class: "flex items-center justify-between" };
const _hoisted_30 = { class: "text-gray-900 dark:text-white font-medium text-sm" };
const _hoisted_31 = ["onClick", "title"];
const _hoisted_32 = { class: "text-gray-700 dark:text-gray-300 mt-1 text-sm" };
const _hoisted_33 = {
  key: 0,
  class: "text-gray-600 dark:text-gray-400 text-xs mt-1 italic"
};
const _hoisted_34 = {
  key: 0,
  class: "flex flex-wrap gap-1"
};
const _hoisted_35 = { class: "flex items-center gap-1.5 ml-3" };
const _hoisted_36 = ["onClick"];
const _hoisted_37 = ["onClick"];
const _hoisted_38 = {
  key: 1,
  class: "border-t border-white/20 dark:border-white/10 px-3 py-2 mt-3"
};
const _hoisted_39 = { class: "flex items-center justify-between" };
const _hoisted_40 = { class: "flex sm:hidden items-center gap-2" };
const _hoisted_41 = ["onClick", "disabled"];
const _hoisted_42 = { class: "text-xs text-slate-600 dark:text-slate-400" };
const _hoisted_43 = ["onClick", "disabled"];
const _hoisted_44 = { class: "hidden sm:flex items-center gap-2" };
const _hoisted_45 = ["onClick", "disabled"];
const _hoisted_46 = { class: "flex gap-1" };
const _hoisted_47 = ["onClick"];
const _hoisted_48 = ["onClick", "disabled"];
const _hoisted_49 = { class: "text-xs text-slate-500 dark:text-slate-400" };
const _hoisted_50 = {
  key: 0,
  class: "border-t border-white/20 dark:border-white/10 px-3 py-2"
};
const _hoisted_51 = { class: "flex items-center justify-between" };
const _hoisted_52 = { class: "flex sm:hidden items-center gap-2" };
const _hoisted_53 = ["onClick", "disabled"];
const _hoisted_54 = { class: "text-xs text-slate-600 dark:text-slate-400" };
const _hoisted_55 = ["onClick", "disabled"];
const _hoisted_56 = { class: "hidden sm:flex items-center gap-2" };
const _hoisted_57 = ["onClick", "disabled"];
const _hoisted_58 = { class: "flex gap-1" };
const _hoisted_59 = ["onClick"];
const _hoisted_60 = ["onClick", "disabled"];
const _hoisted_61 = { class: "text-xs text-slate-500 dark:text-slate-400" };
const _hoisted_62 = {
  key: 0,
  class: "mt-6 group bg-white/80 dark:bg-[#0a0a0a]/80 backdrop-blur-md shadow-xl hover:shadow-2xl rounded-2xl border border-white/20 dark:border-white/10 transition-all duration-500 hover:scale-[1.005] p-4"
};
const _hoisted_63 = { class: "flex items-center justify-between" };
const _hoisted_64 = { class: "flex-1 flex justify-between sm:hidden" };
const _hoisted_65 = ["disabled"];
const _hoisted_66 = ["disabled"];
const _hoisted_67 = { class: "hidden sm:flex-1 sm:flex sm:items-center sm:justify-between" };
const _hoisted_68 = { class: "text-sm text-gray-700 dark:text-gray-300" };
const _hoisted_69 = { class: "relative z-0 inline-flex rounded-md shadow-sm -space-x-px" };
const _hoisted_70 = ["disabled"];
const _hoisted_71 = { class: "sr-only" };
const _hoisted_72 = ["onClick"];
const _hoisted_73 = ["disabled"];
const _hoisted_74 = { class: "sr-only" };
const __default__ = {
  name: "TopicGroupAccordion"
};
const _sfc_main = /* @__PURE__ */ defineComponent({
  ...__default__,
  props: {
    vocabularyList: {},
    examples: {}
  },
  emits: ["add-example", "edit-example", "delete-example"],
  setup(__props, { emit: __emit }) {
    const props = __props;
    const emit = __emit;
    const {
      getTopicName,
      t,
      expandedGroups,
      expandedVocabExamples,
      currentPage,
      groupedVocabulary,
      paginationInfo,
      visiblePages,
      playVocabularyAudio,
      playExampleAudio,
      getVocabExamples,
      getPaginatedVocabExamples,
      getPaginatedTopicVocabs,
      getTopicVocabPagesCount,
      getTopicVocabPaginationInfo,
      getVocabExamplePages,
      getExamplePaginationInfo,
      getVocabExampleCount,
      getTotalExamplesForTopic,
      getTopicVisiblePages,
      goToTopicVocabPage,
      previousTopicVocabPage,
      nextTopicVocabPage,
      goToExamplePage,
      previousExamplePage,
      nextExamplePage,
      goToPage,
      previousPage,
      nextPage,
      toggleGroup,
      toggleVocabExamples,
      getTypeLabel,
      getTypeColorClass,
      getDifficultyLabel,
      getDifficultyColorClass,
      enter,
      afterEnter,
      leave,
      afterLeave,
      vocabExamplesEnter,
      vocabExamplesAfterEnter,
      vocabExamplesLeave,
      vocabExamplesAfterLeave,
      deleteExample
    } = useTopicGroupAccordion(props);
    return (_ctx, _cache) => {
      return openBlock(), createElementBlock("div", _hoisted_1, [
        (openBlock(true), createElementBlock(Fragment, null, renderList(unref(groupedVocabulary), (group, topicKey) => {
          return openBlock(), createElementBlock("div", {
            key: topicKey,
            class: "group bg-white/80 dark:bg-[#0a0a0a]/80 backdrop-blur-md shadow-xl hover:shadow-2xl rounded-2xl border border-white/20 dark:border-white/10 transition-all duration-500 hover:scale-[1.002]"
          }, [
            createBaseVNode("div", {
              onClick: ($event) => unref(toggleGroup)(topicKey),
              class: "flex items-center justify-between p-4 cursor-pointer hover:bg-white/20 dark:hover:bg-[#0a0a0a]/20 rounded-t-2xl transition-all duration-300"
            }, [
              createBaseVNode("div", _hoisted_3, [
                _cache[4] || (_cache[4] = createBaseVNode("div", { class: "animate-pulse-slow" }, [
                  createBaseVNode("div", { class: "w-2.5 h-2.5 bg-gradient-to-r from-blue-400 to-purple-500 rounded-full" })
                ], -1)),
                createBaseVNode("div", null, [
                  createBaseVNode("h3", _hoisted_4, toDisplayString(unref(getTopicName)(topicKey)), 1),
                  createBaseVNode("p", _hoisted_5, toDisplayString(group.length) + " " + toDisplayString(group.length === 1 ? unref(t)("vocabulary.word", "word") : unref(t)("vocabulary.words", "words")), 1)
                ])
              ]),
              createBaseVNode("div", _hoisted_6, [
                createBaseVNode("span", _hoisted_7, toDisplayString(unref(getTotalExamplesForTopic)(group)) + " " + toDisplayString(unref(t)("vocabulary.examples.examples", "examples")), 1),
                (openBlock(), createElementBlock("svg", {
                  class: normalizeClass(["w-5 h-5 text-gray-500 dark:text-gray-400 transition-transform duration-300", { "rotate-180": unref(expandedGroups)[topicKey] }]),
                  fill: "none",
                  stroke: "currentColor",
                  viewBox: "0 0 24 24"
                }, _cache[5] || (_cache[5] = [
                  createBaseVNode("path", {
                    "stroke-linecap": "round",
                    "stroke-linejoin": "round",
                    "stroke-width": "2",
                    d: "M19 9l-7 7-7-7"
                  }, null, -1)
                ]), 2))
              ])
            ], 8, _hoisted_2),
            createVNode(Transition, {
              name: "accordion",
              onEnter: unref(enter),
              onAfterEnter: unref(afterEnter),
              onLeave: unref(leave),
              onAfterLeave: unref(afterLeave)
            }, {
              default: withCtx(() => [
                unref(expandedGroups)[topicKey] ? (openBlock(), createElementBlock("div", _hoisted_8, [
                  createBaseVNode("div", _hoisted_9, [
                    (openBlock(true), createElementBlock(Fragment, null, renderList(unref(getPaginatedTopicVocabs)(topicKey), (vocab) => {
                      return openBlock(), createElementBlock("div", {
                        key: vocab.id,
                        class: "bg-white/60 dark:bg-[#0a0a0a]/60 backdrop-blur-sm rounded-xl border border-white/20 dark:border-white/10 p-4 hover:shadow-lg transition-all duration-300"
                      }, [
                        createBaseVNode("div", _hoisted_10, [
                          createBaseVNode("div", _hoisted_11, [
                            _cache[8] || (_cache[8] = createBaseVNode("div", { class: "animate-pulse-slow" }, [
                              createBaseVNode("div", { class: "w-2 h-2 bg-gradient-to-r from-green-400 to-blue-500 rounded-full" })
                            ], -1)),
                            createBaseVNode("div", null, [
                              createBaseVNode("div", _hoisted_12, [
                                createBaseVNode("h4", _hoisted_13, toDisplayString(vocab.word), 1),
                                createBaseVNode("button", {
                                  onClick: ($event) => unref(playVocabularyAudio)(vocab.word),
                                  class: "p-1 text-blue-600 hover:text-blue-700 hover:bg-blue-50/50 dark:text-blue-400 dark:hover:text-blue-300 dark:hover:bg-blue-900/20 rounded transition-all duration-300 group",
                                  title: unref(t)("vocabulary.examples.playPronunciation", "Play pronunciation")
                                }, _cache[6] || (_cache[6] = [
                                  createBaseVNode("svg", {
                                    class: "w-3.5 h-3.5 group-hover:scale-110 transition-transform duration-200",
                                    fill: "none",
                                    stroke: "currentColor",
                                    viewBox: "0 0 24 24"
                                  }, [
                                    createBaseVNode("path", {
                                      "stroke-linecap": "round",
                                      "stroke-linejoin": "round",
                                      "stroke-width": "2",
                                      d: "M15.536 8.464a5 5 0 010 7.072m2.464-9.536a9 9 0 010 12.728M9 9l3-3v6l-3-3H4a1 1 0 01-1-1V10a1 1 0 011-1h5z"
                                    })
                                  ], -1)
                                ]), 8, _hoisted_14),
                                createBaseVNode("button", {
                                  onClick: ($event) => unref(toggleVocabExamples)(vocab.id),
                                  class: "p-1 text-gray-600 hover:text-gray-700 hover:bg-gray-50/50 dark:text-gray-400 dark:hover:text-gray-300 dark:hover:bg-[#0a0a0a]/20 rounded transition-all duration-300 group",
                                  title: unref(expandedVocabExamples)[vocab.id] ? unref(t)("vocabulary.examples.hideExamples", "Hide examples") : unref(t)("vocabulary.examples.showExamples", "Show examples")
                                }, [
                                  (openBlock(), createElementBlock("svg", {
                                    class: normalizeClass(["w-3.5 h-3.5 group-hover:scale-110 transition-all duration-200", { "rotate-180": unref(expandedVocabExamples)[vocab.id] }]),
                                    fill: "none",
                                    stroke: "currentColor",
                                    viewBox: "0 0 24 24"
                                  }, _cache[7] || (_cache[7] = [
                                    createBaseVNode("path", {
                                      "stroke-linecap": "round",
                                      "stroke-linejoin": "round",
                                      "stroke-width": "2",
                                      d: "M19 9l-7 7-7-7"
                                    }, null, -1)
                                  ]), 2))
                                ], 8, _hoisted_15)
                              ]),
                              createBaseVNode("p", _hoisted_16, toDisplayString(vocab.meaning), 1),
                              createBaseVNode("div", _hoisted_17, [
                                createBaseVNode("span", _hoisted_18, toDisplayString(vocab.partOfSpeech), 1),
                                createBaseVNode("span", _hoisted_19, toDisplayString(unref(getVocabExampleCount)(vocab.id)) + " " + toDisplayString(unref(getVocabExampleCount)(vocab.id) === 1 ? "example" : "examples"), 1)
                              ])
                            ])
                          ]),
                          createBaseVNode("button", {
                            onClick: ($event) => _ctx.$emit("add-example", vocab),
                            class: "px-3 py-1.5 bg-gradient-to-r from-green-600 to-emerald-600 hover:from-green-700 hover:to-emerald-700 text-white rounded-lg font-medium transition-all duration-300 shadow-lg hover:shadow-xl flex items-center space-x-1.5"
                          }, [
                            _cache[9] || (_cache[9] = createBaseVNode("svg", {
                              class: "w-3.5 h-3.5",
                              fill: "none",
                              stroke: "currentColor",
                              viewBox: "0 0 24 24"
                            }, [
                              createBaseVNode("path", {
                                "stroke-linecap": "round",
                                "stroke-linejoin": "round",
                                "stroke-width": "2",
                                d: "M12 4v16m8-8H4"
                              })
                            ], -1)),
                            createBaseVNode("span", _hoisted_21, toDisplayString(unref(t)("vocabulary.examples.addExample", "Add Example")), 1)
                          ], 8, _hoisted_20)
                        ]),
                        createVNode(Transition, {
                          name: "vocab-examples-accordion",
                          onEnter: unref(vocabExamplesEnter),
                          onAfterEnter: unref(vocabExamplesAfterEnter),
                          onLeave: unref(vocabExamplesLeave),
                          onAfterLeave: unref(vocabExamplesAfterLeave)
                        }, {
                          default: withCtx(() => [
                            unref(expandedVocabExamples)[vocab.id] ? (openBlock(), createElementBlock("div", _hoisted_22, [
                              unref(getVocabExamples)(vocab.id).length === 0 ? (openBlock(), createElementBlock("div", _hoisted_23, [
                                _cache[10] || (_cache[10] = createBaseVNode("svg", {
                                  class: "mx-auto h-6 w-6 text-gray-400 mb-1",
                                  fill: "none",
                                  stroke: "currentColor",
                                  viewBox: "0 0 24 24"
                                }, [
                                  createBaseVNode("path", {
                                    "stroke-linecap": "round",
                                    "stroke-linejoin": "round",
                                    "stroke-width": "2",
                                    d: "M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"
                                  })
                                ], -1)),
                                createBaseVNode("p", _hoisted_24, toDisplayString(unref(t)("vocabulary.examples.noExamplesForWord", "No examples yet")), 1)
                              ])) : createCommentVNode("", true),
                              (openBlock(true), createElementBlock(Fragment, null, renderList(unref(getPaginatedVocabExamples)(vocab.id), (example) => {
                                return openBlock(), createElementBlock("div", {
                                  key: example.id,
                                  class: "bg-white/40 dark:bg-[#0a0a0a]/40 backdrop-blur-sm rounded-lg border border-white/20 dark:border-white/10 p-3 hover:shadow-md transition-all duration-300"
                                }, [
                                  createBaseVNode("div", _hoisted_25, [
                                    createBaseVNode("div", _hoisted_26, [
                                      createBaseVNode("div", _hoisted_27, [
                                        createBaseVNode("span", {
                                          class: normalizeClass(["inline-flex items-center px-2 py-0.5 rounded-full text-xs font-medium", unref(getTypeColorClass)(example.type)])
                                        }, toDisplayString(unref(getTypeLabel)(example.type)), 3),
                                        example.difficulty ? (openBlock(), createElementBlock("span", {
                                          key: 0,
                                          class: normalizeClass(["text-sm", unref(getDifficultyColorClass)(example.difficulty)])
                                        }, toDisplayString(unref(getDifficultyLabel)(example.difficulty)), 3)) : createCommentVNode("", true)
                                      ]),
                                      createBaseVNode("div", _hoisted_28, [
                                        createBaseVNode("div", _hoisted_29, [
                                          createBaseVNode("p", _hoisted_30, toDisplayString(example.title), 1),
                                          createBaseVNode("button", {
                                            onClick: ($event) => unref(playExampleAudio)(example.content),
                                            class: "p-1 text-green-600 hover:text-green-700 hover:bg-green-50/50 dark:text-green-400 dark:hover:text-green-300 dark:hover:bg-green-900/20 rounded transition-all duration-300 group",
                                            title: unref(t)("vocabulary.examples.playExample", "Play example")
                                          }, _cache[11] || (_cache[11] = [
                                            createBaseVNode("svg", {
                                              class: "w-3 h-3 group-hover:scale-110 transition-transform duration-200",
                                              fill: "none",
                                              stroke: "currentColor",
                                              viewBox: "0 0 24 24"
                                            }, [
                                              createBaseVNode("path", {
                                                "stroke-linecap": "round",
                                                "stroke-linejoin": "round",
                                                "stroke-width": "2",
                                                d: "M15.536 8.464a5 5 0 010 7.072m2.464-9.536a9 9 0 010 12.728M9 9l3-3v6l-3-3H4a1 1 0 01-1-1V10a1 1 0 011-1h5z"
                                              })
                                            ], -1)
                                          ]), 8, _hoisted_31)
                                        ]),
                                        createBaseVNode("p", _hoisted_32, toDisplayString(example.content), 1),
                                        example.translation ? (openBlock(), createElementBlock("p", _hoisted_33, toDisplayString(example.translation), 1)) : createCommentVNode("", true)
                                      ]),
                                      example.tags && example.tags.length > 0 ? (openBlock(), createElementBlock("div", _hoisted_34, [
                                        (openBlock(true), createElementBlock(Fragment, null, renderList(example.tags, (tag) => {
                                          return openBlock(), createElementBlock("span", {
                                            key: tag,
                                            class: "inline-flex items-center px-1.5 py-0.5 rounded text-xs bg-gray-100 text-gray-800 dark:bg-gray-700 dark:text-gray-300"
                                          }, toDisplayString(tag), 1);
                                        }), 128))
                                      ])) : createCommentVNode("", true)
                                    ]),
                                    createBaseVNode("div", _hoisted_35, [
                                      createBaseVNode("button", {
                                        onClick: ($event) => _ctx.$emit("edit-example", example),
                                        class: "px-2 py-1.5 text-blue-600 hover:text-blue-700 hover:bg-blue-50/50 dark:text-blue-400 dark:hover:text-blue-300 dark:hover:bg-blue-900/20 rounded-md transition-all duration-300 text-sm"
                                      }, toDisplayString(unref(t)("common.edit", "Edit")), 9, _hoisted_36),
                                      createBaseVNode("button", {
                                        onClick: ($event) => unref(deleteExample)(example, emit),
                                        class: "px-2 py-1.5 text-red-600 hover:text-red-700 hover:bg-red-50/50 dark:text-red-400 dark:hover:text-red-300 dark:hover:bg-red-900/20 rounded-md transition-all duration-300 text-sm"
                                      }, toDisplayString(unref(t)("common.delete", "Delete")), 9, _hoisted_37)
                                    ])
                                  ])
                                ]);
                              }), 128)),
                              unref(getVocabExamplePages)(vocab.id) > 1 ? (openBlock(), createElementBlock("div", _hoisted_38, [
                                createBaseVNode("div", _hoisted_39, [
                                  createBaseVNode("div", _hoisted_40, [
                                    createBaseVNode("button", {
                                      onClick: ($event) => unref(previousExamplePage)(vocab.id),
                                      disabled: !unref(getExamplePaginationInfo)(vocab.id).hasPrevious,
                                      class: "px-2 py-1 text-xs bg-slate-200 dark:bg-dark-bg-mute text-slate-700 dark:text-slate-300 rounded disabled:opacity-50 disabled:cursor-not-allowed hover:bg-slate-300 dark:hover:bg-slate-600 transition-colors"
                                    }, toDisplayString(unref(t)("common.previous", "Previous")), 9, _hoisted_41),
                                    createBaseVNode("span", _hoisted_42, toDisplayString(unref(getExamplePaginationInfo)(vocab.id).currentPage) + " / " + toDisplayString(unref(getExamplePaginationInfo)(vocab.id).totalPages), 1),
                                    createBaseVNode("button", {
                                      onClick: ($event) => unref(nextExamplePage)(vocab.id),
                                      disabled: !unref(getExamplePaginationInfo)(vocab.id).hasNext,
                                      class: "px-2 py-1 text-xs bg-slate-200 dark:bg-dark-bg-mute text-slate-700 dark:text-slate-300 rounded disabled:opacity-50 disabled:cursor-not-allowed hover:bg-slate-300 dark:hover:bg-slate-600 transition-colors"
                                    }, toDisplayString(unref(t)("common.next", "Next")), 9, _hoisted_43)
                                  ]),
                                  createBaseVNode("div", _hoisted_44, [
                                    createBaseVNode("button", {
                                      onClick: ($event) => unref(previousExamplePage)(vocab.id),
                                      disabled: !unref(getExamplePaginationInfo)(vocab.id).hasPrevious,
                                      class: "px-3 py-1.5 text-sm bg-slate-200 dark:bg-dark-bg-mute text-slate-700 dark:text-slate-300 rounded disabled:opacity-50 disabled:cursor-not-allowed hover:bg-slate-300 dark:hover:bg-slate-600 transition-colors"
                                    }, toDisplayString(unref(t)("common.previous", "Previous")), 9, _hoisted_45),
                                    createBaseVNode("div", _hoisted_46, [
                                      (openBlock(true), createElementBlock(Fragment, null, renderList(Math.min(unref(getExamplePaginationInfo)(vocab.id).totalPages, 5), (page) => {
                                        return openBlock(), createElementBlock("button", {
                                          key: page,
                                          onClick: ($event) => unref(goToExamplePage)(vocab.id, page),
                                          class: normalizeClass([
                                            "px-3 py-1.5 text-sm rounded transition-colors",
                                            unref(getExamplePaginationInfo)(vocab.id).currentPage === page ? "bg-blue-600 text-white" : "bg-slate-200 dark:bg-dark-bg-mute text-slate-700 dark:text-slate-300 hover:bg-slate-300 dark:hover:bg-slate-600"
                                          ])
                                        }, toDisplayString(page), 11, _hoisted_47);
                                      }), 128))
                                    ]),
                                    createBaseVNode("button", {
                                      onClick: ($event) => unref(nextExamplePage)(vocab.id),
                                      disabled: !unref(getExamplePaginationInfo)(vocab.id).hasNext,
                                      class: "px-3 py-1.5 text-sm bg-slate-200 dark:bg-dark-bg-mute text-slate-700 dark:text-slate-300 rounded disabled:opacity-50 disabled:cursor-not-allowed hover:bg-slate-300 dark:hover:bg-slate-600 transition-colors"
                                    }, toDisplayString(unref(t)("common.next", "Next")), 9, _hoisted_48)
                                  ]),
                                  createBaseVNode("div", _hoisted_49, toDisplayString(unref(t)("vocabulary.examples.showingExamples", { start: unref(getExamplePaginationInfo)(vocab.id).start, end: unref(getExamplePaginationInfo)(vocab.id).end, total: unref(getExamplePaginationInfo)(vocab.id).totalExamples }, "Showing {start} to {end} of {total} examples")), 1)
                                ])
                              ])) : createCommentVNode("", true)
                            ])) : createCommentVNode("", true)
                          ]),
                          _: 2
                        }, 1032, ["onEnter", "onAfterEnter", "onLeave", "onAfterLeave"])
                      ]);
                    }), 128)),
                    unref(getTopicVocabPagesCount)(topicKey) > 1 ? (openBlock(), createElementBlock("div", _hoisted_50, [
                      createBaseVNode("div", _hoisted_51, [
                        createBaseVNode("div", _hoisted_52, [
                          createBaseVNode("button", {
                            onClick: ($event) => unref(previousTopicVocabPage)(topicKey),
                            disabled: !unref(getTopicVocabPaginationInfo)(topicKey).hasPrevious,
                            class: "px-2 py-1 text-xs bg-slate-200 dark:bg-dark-bg-mute text-slate-700 dark:text-slate-300 rounded disabled:opacity-50 disabled:cursor-not-allowed hover:bg-slate-300 dark:hover:bg-slate-600 transition-colors"
                          }, toDisplayString(unref(t)("common.previous", "Previous")), 9, _hoisted_53),
                          createBaseVNode("span", _hoisted_54, toDisplayString(unref(getTopicVocabPaginationInfo)(topicKey).currentPage) + " / " + toDisplayString(unref(getTopicVocabPaginationInfo)(topicKey).totalPages), 1),
                          createBaseVNode("button", {
                            onClick: ($event) => unref(nextTopicVocabPage)(topicKey),
                            disabled: !unref(getTopicVocabPaginationInfo)(topicKey).hasNext,
                            class: "px-2 py-1 text-xs bg-slate-200 dark:bg-dark-bg-mute text-slate-700 dark:text-slate-300 rounded disabled:opacity-50 disabled:cursor-not-allowed hover:bg-slate-300 dark:hover:bg-slate-600 transition-colors"
                          }, toDisplayString(unref(t)("common.next", "Next")), 9, _hoisted_55)
                        ]),
                        createBaseVNode("div", _hoisted_56, [
                          createBaseVNode("button", {
                            onClick: ($event) => unref(previousTopicVocabPage)(topicKey),
                            disabled: !unref(getTopicVocabPaginationInfo)(topicKey).hasPrevious,
                            class: "px-3 py-1.5 text-sm bg-slate-200 dark:bg-dark-bg-mute text-slate-700 dark:text-slate-300 rounded disabled:opacity-50 disabled:cursor-not-allowed hover:bg-slate-300 dark:hover:bg-slate-600 transition-colors"
                          }, toDisplayString(unref(t)("common.previous", "Previous")), 9, _hoisted_57),
                          createBaseVNode("div", _hoisted_58, [
                            (openBlock(true), createElementBlock(Fragment, null, renderList(unref(getTopicVisiblePages)(topicKey), (page) => {
                              return openBlock(), createElementBlock("button", {
                                key: page,
                                onClick: ($event) => unref(goToTopicVocabPage)(topicKey, page),
                                class: normalizeClass([
                                  "px-3 py-1.5 text-sm rounded transition-colors",
                                  unref(getTopicVocabPaginationInfo)(topicKey).currentPage === page ? "bg-blue-600 text-white" : "bg-slate-200 dark:bg-dark-bg-mute text-slate-700 dark:text-slate-300 hover:bg-slate-300 dark:hover:bg-slate-600"
                                ])
                              }, toDisplayString(page), 11, _hoisted_59);
                            }), 128))
                          ]),
                          createBaseVNode("button", {
                            onClick: ($event) => unref(nextTopicVocabPage)(topicKey),
                            disabled: !unref(getTopicVocabPaginationInfo)(topicKey).hasNext,
                            class: "px-3 py-1.5 text-sm bg-slate-200 dark:bg-dark-bg-mute text-slate-700 dark:text-slate-300 rounded disabled:opacity-50 disabled:cursor-not-allowed hover:bg-slate-300 dark:hover:bg-slate-600 transition-colors"
                          }, toDisplayString(unref(t)("common.next", "Next")), 9, _hoisted_60)
                        ]),
                        createBaseVNode("div", _hoisted_61, toDisplayString(unref(t)("vocabulary.examples.showingVocabulary", { start: unref(getTopicVocabPaginationInfo)(topicKey).start, end: unref(getTopicVocabPaginationInfo)(topicKey).end, total: unref(getTopicVocabPaginationInfo)(topicKey).totalVocab }, "Showing {start} to {end} of {total} words")), 1)
                      ])
                    ])) : createCommentVNode("", true)
                  ])
                ])) : createCommentVNode("", true)
              ]),
              _: 2
            }, 1032, ["onEnter", "onAfterEnter", "onLeave", "onAfterLeave"])
          ]);
        }), 128)),
        unref(paginationInfo).totalPages > 1 ? (openBlock(), createElementBlock("div", _hoisted_62, [
          createBaseVNode("div", _hoisted_63, [
            createBaseVNode("div", _hoisted_64, [
              createBaseVNode("button", {
                onClick: _cache[0] || (_cache[0] = //@ts-ignore
                (...args) => unref(previousPage) && unref(previousPage)(...args)),
                disabled: !unref(paginationInfo).hasPrevious,
                class: "relative inline-flex items-center px-4 py-2 border border-gray-300 dark:border-gray-600 text-sm font-medium rounded-md text-gray-700 dark:text-gray-300 bg-white dark:bg-[#0a0a0a] hover:bg-gray-50 dark:hover:bg-gray-600 disabled:opacity-50 disabled:cursor-not-allowed"
              }, toDisplayString(unref(t)("common.previous", "Previous")), 9, _hoisted_65),
              createBaseVNode("button", {
                onClick: _cache[1] || (_cache[1] = //@ts-ignore
                (...args) => unref(nextPage) && unref(nextPage)(...args)),
                disabled: !unref(paginationInfo).hasNext,
                class: "ml-3 relative inline-flex items-center px-4 py-2 border border-gray-300 dark:border-gray-600 text-sm font-medium rounded-md text-gray-700 dark:text-gray-300 bg-white dark:bg-[#0a0a0a] hover:bg-gray-50 dark:hover:bg-gray-600 disabled:opacity-50 disabled:cursor-not-allowed"
              }, toDisplayString(unref(t)("common.next", "Next")), 9, _hoisted_66)
            ]),
            createBaseVNode("div", _hoisted_67, [
              createBaseVNode("div", null, [
                createBaseVNode("p", _hoisted_68, toDisplayString(unref(t)("vocabulary.examples.showingTopics", {
                  start: unref(paginationInfo).startIndex,
                  end: unref(paginationInfo).endIndex,
                  total: unref(paginationInfo).totalTopics
                }, `Showing ${unref(paginationInfo).startIndex} to ${unref(paginationInfo).endIndex} of ${unref(paginationInfo).totalTopics} topics`)), 1)
              ]),
              createBaseVNode("nav", _hoisted_69, [
                createBaseVNode("button", {
                  onClick: _cache[2] || (_cache[2] = //@ts-ignore
                  (...args) => unref(previousPage) && unref(previousPage)(...args)),
                  disabled: !unref(paginationInfo).hasPrevious,
                  class: "relative inline-flex items-center px-2 py-2 rounded-l-md border border-gray-300 dark:border-gray-600 bg-white dark:bg-[#0a0a0a] text-sm font-medium text-gray-500 dark:text-gray-300 hover:bg-gray-50 dark:hover:bg-gray-600 disabled:opacity-50 disabled:cursor-not-allowed"
                }, [
                  createBaseVNode("span", _hoisted_71, toDisplayString(unref(t)("common.previous", "Previous")), 1),
                  _cache[12] || (_cache[12] = createBaseVNode("svg", {
                    class: "h-5 w-5",
                    fill: "currentColor",
                    viewBox: "0 0 20 20"
                  }, [
                    createBaseVNode("path", {
                      "fill-rule": "evenodd",
                      d: "M12.707 5.293a1 1 0 010 1.414L9.414 10l3.293 3.293a1 1 0 01-1.414 1.414l-4-4a1 1 0 010-1.414l4-4a1 1 0 011.414 0z",
                      "clip-rule": "evenodd"
                    })
                  ], -1))
                ], 8, _hoisted_70),
                (openBlock(true), createElementBlock(Fragment, null, renderList(unref(visiblePages), (page) => {
                  return openBlock(), createElementBlock("button", {
                    key: page,
                    onClick: ($event) => unref(goToPage)(page),
                    class: normalizeClass([
                      page === unref(currentPage) ? "z-10 bg-blue-50 dark:bg-blue-900 border-blue-500 dark:border-blue-400 text-blue-600 dark:text-blue-300" : "bg-white dark:bg-[#0a0a0a] border-gray-300 dark:border-gray-600 text-gray-500 dark:text-gray-300 hover:bg-gray-50 dark:hover:bg-gray-600",
                      "relative inline-flex items-center px-4 py-2 border text-sm font-medium"
                    ])
                  }, toDisplayString(page), 11, _hoisted_72);
                }), 128)),
                createBaseVNode("button", {
                  onClick: _cache[3] || (_cache[3] = //@ts-ignore
                  (...args) => unref(nextPage) && unref(nextPage)(...args)),
                  disabled: !unref(paginationInfo).hasNext,
                  class: "relative inline-flex items-center px-2 py-2 rounded-r-md border border-gray-300 dark:border-gray-600 bg-white dark:bg-[#0a0a0a] text-sm font-medium text-gray-500 dark:text-gray-300 hover:bg-gray-50 dark:hover:bg-gray-600 disabled:opacity-50 disabled:cursor-not-allowed"
                }, [
                  createBaseVNode("span", _hoisted_74, toDisplayString(unref(t)("common.next", "Next")), 1),
                  _cache[13] || (_cache[13] = createBaseVNode("svg", {
                    class: "h-5 w-5",
                    fill: "currentColor",
                    viewBox: "0 0 20 20"
                  }, [
                    createBaseVNode("path", {
                      "fill-rule": "evenodd",
                      d: "M7.293 14.707a1 1 0 010-1.414L10.586 10 7.293 6.707a1 1 0 011.414-1.414l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414 0z",
                      "clip-rule": "evenodd"
                    })
                  ], -1))
                ], 8, _hoisted_73)
              ])
            ])
          ])
        ])) : createCommentVNode("", true)
      ]);
    };
  }
});
const TopicGroupAccordion = /* @__PURE__ */ _export_sfc(_sfc_main, [["__scopeId", "data-v-f82b41e3"]]);
export {
  TopicGroupAccordion as default
};
//# sourceMappingURL=TopicGroupAccordion-CqCy3e61.js.map
