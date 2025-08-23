const __vite__mapDeps=(i,m=__vite__mapDeps,d=(m.f||(m.f=["assets/TopicGroupAccordion-4-KPBVXO.js","assets/vendor-CKTvmtu5.js","assets/index-JwMkyzcu.js","assets/vendor-toast-Blf0QbeM.js","assets/vendor-toast-jG2HNJHr.css","assets/index-DUQRsKJD.css","assets/useVocabularyStore-C5HdnbWt.js","assets/useAudioSystem-CpzX5TW1.js","assets/voiceStore-DiHiYd9f.js","assets/topicUtils-Ix3geJ7R.js","assets/_plugin-vue_export-helper-1tPrXgE0.js","assets/TopicGroupAccordion-CyaP2brS.css","assets/ExampleFormDialog-DqsWbCvF.js","assets/ConfirmToast-DsZYvMEQ.js"])))=>i.map(i=>d[i]);
import { _ as __vitePreload } from "./index-JwMkyzcu.js";
import { d as defineComponent, M as useI18n, z as ref, D as computed, P as watch, A as onMounted, c as createElementBlock, v as openBlock, V as createStaticVNode, f as createBaseVNode, b as createBlock, e as createCommentVNode, t as toDisplayString, u as unref, n as normalizeClass, E as withDirectives, X as vModelText, F as Fragment, j as renderList, y as createVNode, i as withModifiers, w as withCtx, U as Transition, G as defineAsyncComponent } from "./vendor-CKTvmtu5.js";
import { u as useToast, P as POSITION } from "./vendor-toast-Blf0QbeM.js";
import { u as useVocabularyStore } from "./useVocabularyStore-C5HdnbWt.js";
import { u as useAudioSystem } from "./useAudioSystem-CpzX5TW1.js";
import { _ as _export_sfc } from "./_plugin-vue_export-helper-1tPrXgE0.js";
import "./voiceStore-DiHiYd9f.js";
const _hoisted_1 = { class: "min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 dark:from-[#0a0a0a] dark:to-[#0f0f0f] relative overflow-x-hidden" };
const _hoisted_2 = { class: "relative z-10 max-w-full sm:max-w-full md:max-w-full lg:max-w-7xl mx-auto px-2 xs:px-3 sm:px-4 md:px-6 lg:px-8 xl:px-10 2xl:px-12 pt-3 sm:pt-6" };
const _hoisted_3 = { class: "group bg-white/80 dark:bg-[#0a0a0a]/80 backdrop-blur-md shadow-xl hover:shadow-2xl rounded-2xl border border-white/20 dark:border-white/10 transition-all duration-500 hover:scale-[1.005] p-2 xs:p-3 sm:p-4 md:p-5 lg:p-6 mb-3 xs:mb-4 sm:mb-6" };
const _hoisted_4 = { class: "flex flex-col xs:flex-col sm:flex-row items-start xs:items-start sm:items-center justify-between mb-3 xs:mb-3 sm:mb-4 gap-3 xs:gap-3 sm:gap-4" };
const _hoisted_5 = { class: "flex items-center" };
const _hoisted_6 = { class: "text-base xs:text-lg sm:text-xl md:text-xl font-bold bg-gradient-to-r from-green-600 to-emerald-600 dark:from-green-400 dark:to-emerald-400 bg-clip-text text-transparent mb-1 xs:mb-1 sm:mb-2" };
const _hoisted_7 = { class: "text-xs xs:text-sm sm:text-base md:text-base text-gray-600 dark:text-gray-300" };
const _hoisted_8 = { class: "flex items-center space-x-2 xs:space-x-3 sm:space-x-4" };
const _hoisted_9 = { class: "flex items-center space-x-2 xs:space-x-2 sm:space-x-3" };
const _hoisted_10 = { class: "text-xs xs:text-sm sm:text-sm md:text-sm font-medium text-gray-700 dark:text-gray-300" };
const _hoisted_11 = { class: "relative z-10 max-w-full sm:max-w-full md:max-w-full lg:max-w-7xl mx-auto py-3 px-2 xs:py-4 xs:px-3 sm:py-6 sm:px-4 md:px-6 lg:px-8 xl:px-10 2xl:px-12 overflow-x-hidden" };
const _hoisted_12 = { class: "group bg-white/80 dark:bg-[#0a0a0a]/80 backdrop-blur-md shadow-xl hover:shadow-2xl rounded-2xl border border-white/20 dark:border-white/10 transition-all duration-500 hover:scale-[1.005] mb-3 xs:mb-4 sm:mb-6 p-2 xs:p-3 sm:p-4 md:p-5 lg:p-6" };
const _hoisted_13 = { class: "flex items-center mb-3 xs:mb-3 sm:mb-4" };
const _hoisted_14 = { class: "text-sm xs:text-base sm:text-lg md:text-lg font-semibold bg-gradient-to-r from-blue-600 to-purple-600 dark:from-blue-400 dark:to-purple-400 bg-clip-text text-transparent" };
const _hoisted_15 = { class: "relative" };
const _hoisted_16 = ["placeholder"];
const _hoisted_17 = { class: "relative z-10 max-w-full sm:max-w-full md:max-w-full lg:max-w-7xl mx-auto py-3 px-2 xs:py-4 xs:px-3 sm:py-6 sm:px-4 md:px-6 lg:px-8 xl:px-10 2xl:px-12 overflow-x-hidden" };
const _hoisted_18 = { class: "space-y-6" };
const _hoisted_19 = {
  key: 0,
  class: "group bg-white/80 dark:bg-[#0a0a0a]/80 backdrop-blur-md shadow-xl hover:shadow-2xl rounded-2xl border border-white/20 dark:border-white/10 transition-all duration-500 hover:scale-[1.005] p-2 xs:p-3 sm:p-4 md:p-5 lg:p-6"
};
const _hoisted_20 = { class: "text-center py-6 xs:py-6 sm:py-8" };
const _hoisted_21 = { class: "text-base xs:text-lg sm:text-lg md:text-lg font-medium text-gray-900 dark:text-white mb-1 xs:mb-1 sm:mb-2" };
const _hoisted_22 = { class: "text-xs xs:text-sm sm:text-base md:text-base text-gray-600 dark:text-gray-300" };
const _hoisted_23 = ["onClick"];
const _hoisted_24 = { class: "flex items-start space-x-2 xs:space-x-2 sm:space-x-3 flex-1" };
const _hoisted_25 = { class: "flex-1 min-w-0" };
const _hoisted_26 = { class: "flex items-center space-x-1 xs:space-x-1 sm:space-x-2 mb-1" };
const _hoisted_27 = { class: "text-base xs:text-lg sm:text-lg md:text-lg font-bold text-gray-900 dark:text-white truncate" };
const _hoisted_28 = ["onClick", "title"];
const _hoisted_29 = ["onClick", "title"];
const _hoisted_30 = { class: "text-xs xs:text-sm sm:text-sm md:text-sm text-gray-600 dark:text-gray-300 mb-1 xs:mb-1 sm:mb-2" };
const _hoisted_31 = { class: "flex items-center space-x-1 xs:space-x-1 sm:space-x-2" };
const _hoisted_32 = { class: "inline-flex items-center px-1.5 xs:px-2 sm:px-2.5 py-0.5 rounded-full text-2xs xs:text-xs sm:text-xs font-medium bg-blue-100 text-blue-800 dark:bg-blue-900/20 dark:text-blue-300" };
const _hoisted_33 = { class: "text-2xs xs:text-xs sm:text-xs text-gray-500 dark:text-gray-400" };
const _hoisted_34 = ["onClick"];
const _hoisted_35 = { class: "hidden xs:inline sm:inline" };
const _hoisted_36 = { class: "xs:hidden sm:hidden" };
const _hoisted_37 = {
  key: 0,
  class: "border-t border-slate-200 dark:border-dark-bg-mute bg-slate-50 dark:bg-dark-bg-mute"
};
const _hoisted_38 = {
  key: 0,
  class: "p-3 xs:p-4 sm:p-6 text-center text-slate-500 dark:text-slate-400"
};
const _hoisted_39 = { class: "text-xs xs:text-sm sm:text-base" };
const _hoisted_40 = { key: 1 };
const _hoisted_41 = { class: "p-2 xs:p-3 sm:p-4 space-y-2 xs:space-y-3 sm:space-y-4" };
const _hoisted_42 = { class: "flex flex-col sm:flex-row sm:items-start sm:justify-between gap-2 xs:gap-2 sm:gap-3" };
const _hoisted_43 = { class: "flex-1 min-w-0" };
const _hoisted_44 = { class: "flex items-center gap-1 xs:gap-1 sm:gap-2 mb-1 xs:mb-1 sm:mb-2" };
const _hoisted_45 = { class: "text-xs xs:text-sm sm:text-sm md:text-sm font-medium text-slate-900 dark:text-slate-100 truncate flex-1" };
const _hoisted_46 = ["onClick", "title"];
const _hoisted_47 = { class: "text-slate-700 dark:text-slate-300 text-xs xs:text-sm sm:text-sm md:text-sm mb-1 xs:mb-1 sm:mb-2 leading-relaxed" };
const _hoisted_48 = { class: "flex flex-wrap gap-1 xs:gap-1 sm:gap-2 text-2xs xs:text-xs sm:text-xs" };
const _hoisted_49 = { class: "px-1.5 xs:px-2 sm:px-2 py-0.5 bg-blue-100 dark:bg-blue-900/30 text-blue-800 dark:text-blue-200 rounded-full capitalize" };
const _hoisted_50 = {
  key: 0,
  class: "px-1.5 xs:px-2 sm:px-2 py-0.5 bg-orange-100 dark:bg-orange-900/30 text-orange-800 dark:text-orange-200 rounded-full capitalize"
};
const _hoisted_51 = {
  key: 1,
  class: "px-1.5 xs:px-2 sm:px-2 py-0.5 bg-purple-100 dark:bg-purple-900/30 text-purple-800 dark:text-purple-200 rounded-full"
};
const _hoisted_52 = { class: "flex flex-row xs:flex-row sm:flex-row gap-1 xs:gap-1 sm:gap-2 flex-shrink-0 mt-2 xs:mt-0 sm:mt-0" };
const _hoisted_53 = ["onClick"];
const _hoisted_54 = { class: "hidden xs:inline sm:inline" };
const _hoisted_55 = ["onClick"];
const _hoisted_56 = { class: "hidden xs:inline sm:inline" };
const _hoisted_57 = {
  key: 0,
  class: "border-t border-slate-200 dark:border-dark-bg-mute px-2 xs:px-3 sm:px-4 py-2 xs:py-2 sm:py-3"
};
const _hoisted_58 = { class: "flex items-center justify-between" };
const _hoisted_59 = { class: "flex sm:hidden items-center gap-1 xs:gap-1 sm:gap-2" };
const _hoisted_60 = ["onClick", "disabled"];
const _hoisted_61 = { class: "text-2xs xs:text-xs text-slate-600 dark:text-slate-400 px-1" };
const _hoisted_62 = ["onClick", "disabled"];
const _hoisted_63 = { class: "hidden sm:flex items-center gap-2" };
const _hoisted_64 = ["onClick", "disabled"];
const _hoisted_65 = { class: "flex gap-1" };
const _hoisted_66 = ["onClick"];
const _hoisted_67 = ["onClick", "disabled"];
const _hoisted_68 = { class: "text-2xs xs:text-xs sm:text-xs text-slate-500 dark:text-slate-400" };
const _hoisted_69 = {
  key: 0,
  class: "group bg-white/80 dark:bg-[#0a0a0a]/80 backdrop-blur-md shadow-xl hover:shadow-2xl rounded-2xl border border-white/20 dark:border-white/10 transition-all duration-500 hover:scale-[1.005] p-2 xs:p-3 sm:p-4 md:p-4"
};
const _hoisted_70 = { class: "flex items-center justify-between" };
const _hoisted_71 = { class: "flex-1 flex justify-between sm:hidden" };
const _hoisted_72 = ["disabled"];
const _hoisted_73 = { class: "flex items-center px-2" };
const _hoisted_74 = { class: "text-2xs xs:text-xs text-gray-600 dark:text-gray-400" };
const _hoisted_75 = ["disabled"];
const _hoisted_76 = { class: "hidden sm:flex-1 sm:flex sm:items-center sm:justify-between" };
const _hoisted_77 = { class: "text-xs xs:text-sm sm:text-sm md:text-sm text-gray-700 dark:text-gray-300" };
const _hoisted_78 = { class: "relative z-0 inline-flex rounded-md shadow-sm -space-x-px" };
const _hoisted_79 = ["disabled"];
const _hoisted_80 = { class: "sr-only" };
const _hoisted_81 = ["onClick"];
const _hoisted_82 = ["disabled"];
const _hoisted_83 = { class: "sr-only" };
const _sfc_main = /* @__PURE__ */ defineComponent({
  __name: "VocabularyExamplesView",
  setup(__props) {
    const TopicGroupAccordion = defineAsyncComponent(() => __vitePreload(() => import("./TopicGroupAccordion-4-KPBVXO.js"), true ? __vite__mapDeps([0,1,2,3,4,5,6,7,8,9,10,11]) : void 0));
    const ExampleFormDialog = defineAsyncComponent(() => __vitePreload(() => import("./ExampleFormDialog-DqsWbCvF.js"), true ? __vite__mapDeps([12,1]) : void 0));
    const ConfirmToast = defineAsyncComponent(() => __vitePreload(() => import("./ConfirmToast-DsZYvMEQ.js"), true ? __vite__mapDeps([13,1]) : void 0));
    const { t } = useI18n();
    const toast = useToast();
    const vocabularyStore = useVocabularyStore();
    const audioSystem = useAudioSystem();
    const examples = ref([]);
    const showCreateDialog = ref(false);
    const showEditDialog = ref(false);
    const currentExample = ref(null);
    const searchTerm = ref("");
    const selectedVocabulary = ref("");
    const selectedType = ref("");
    const groupByTopic = ref(false);
    const currentPage = ref(1);
    const itemsPerPage = ref(5);
    const expandedExamples = ref({});
    const examplePages = ref({});
    const examplesPerPage = ref(5);
    const vocabularyList = computed(() => vocabularyStore.allVocabularies.value.map((v) => ({
      id: v.id.toString(),
      word: v.word,
      meaning: v.meaning,
      partOfSpeech: v.partOfSpeech || "unknown",
      category: v.category || "uncategorized",
      level: v.level || "unknown"
    })));
    const filteredVocabulary = computed(() => {
      let filtered = vocabularyList.value;
      if (searchTerm.value) {
        const term = searchTerm.value.toLowerCase();
        filtered = filtered.filter(
          (v) => v.word.toLowerCase().includes(term) || v.meaning.toLowerCase().includes(term)
        );
      }
      return filtered;
    });
    const totalPages = computed(() => {
      if (groupByTopic.value) return 1;
      return Math.ceil(filteredVocabulary.value.length / itemsPerPage.value);
    });
    const paginatedVocabulary = computed(() => {
      if (groupByTopic.value) return filteredVocabulary.value;
      const start = (currentPage.value - 1) * itemsPerPage.value;
      const end = start + itemsPerPage.value;
      return filteredVocabulary.value.slice(start, end);
    });
    const startIndex = computed(() => {
      if (groupByTopic.value) return 1;
      return (currentPage.value - 1) * itemsPerPage.value + 1;
    });
    const endIndex = computed(() => {
      if (groupByTopic.value) return filteredVocabulary.value.length;
      return Math.min(currentPage.value * itemsPerPage.value, filteredVocabulary.value.length);
    });
    const visiblePages = computed(() => {
      const pages = [];
      const maxVisible = 5;
      const totalP = totalPages.value;
      if (totalP <= maxVisible) {
        for (let i = 1; i <= totalP; i++) {
          pages.push(i);
        }
      } else {
        const start = Math.max(1, currentPage.value - Math.floor(maxVisible / 2));
        const end = Math.min(totalP, start + maxVisible - 1);
        for (let i = start; i <= end; i++) {
          pages.push(i);
        }
      }
      return pages;
    });
    computed(() => {
      let filtered = examples.value;
      if (searchTerm.value) {
        const term = searchTerm.value.toLowerCase();
        filtered = filtered.filter(
          (e) => e.title.toLowerCase().includes(term) || e.content.toLowerCase().includes(term) || e.vocabulary?.word.toLowerCase().includes(term)
        );
      }
      if (selectedVocabulary.value) {
        filtered = filtered.filter((e) => e.vocabularyId === selectedVocabulary.value);
      }
      if (selectedType.value) {
        filtered = filtered.filter((e) => e.type === selectedType.value);
      }
      return filtered;
    });
    const loadExamples = () => {
      const stored = localStorage.getItem("vocabulary-examples");
      if (stored) {
        examples.value = JSON.parse(stored);
        examples.value.forEach((example) => {
          const vocab = vocabularyList.value.find((v) => v.id === example.vocabularyId);
          if (vocab) {
            example.vocabulary = { id: vocab.id, word: vocab.word };
          }
        });
      }
    };
    const saveExamplesToStorage = () => {
      localStorage.setItem("vocabulary-examples", JSON.stringify(examples.value));
    };
    const getVocabExamples = (vocabId) => {
      return examples.value.filter((e) => e.vocabularyId === vocabId);
    };
    const getPaginatedVocabExamples = (vocabId) => {
      const allExamples = getVocabExamples(vocabId);
      const currentPage2 = examplePages.value[vocabId] || 1;
      const start = (currentPage2 - 1) * examplesPerPage.value;
      const end = start + examplesPerPage.value;
      return allExamples.slice(start, end);
    };
    const getVocabExamplePages = (vocabId) => {
      const totalExamples = getVocabExamples(vocabId).length;
      return Math.ceil(totalExamples / examplesPerPage.value);
    };
    const goToExamplePage = (vocabId, page) => {
      const totalPages2 = getVocabExamplePages(vocabId);
      if (page >= 1 && page <= totalPages2) {
        examplePages.value[vocabId] = page;
        saveExamplePagesState();
      }
    };
    const previousExamplePage = (vocabId) => {
      const currentPage2 = examplePages.value[vocabId] || 1;
      if (currentPage2 > 1) {
        goToExamplePage(vocabId, currentPage2 - 1);
      }
    };
    const nextExamplePage = (vocabId) => {
      const currentPage2 = examplePages.value[vocabId] || 1;
      const totalPages2 = getVocabExamplePages(vocabId);
      if (currentPage2 < totalPages2) {
        goToExamplePage(vocabId, currentPage2 + 1);
      }
    };
    const getExamplePaginationInfo = (vocabId) => {
      const totalExamples = getVocabExamples(vocabId).length;
      const currentPage2 = examplePages.value[vocabId] || 1;
      const totalPages2 = getVocabExamplePages(vocabId);
      const start = (currentPage2 - 1) * examplesPerPage.value + 1;
      const end = Math.min(currentPage2 * examplesPerPage.value, totalExamples);
      return {
        totalExamples,
        totalPages: totalPages2,
        currentPage: currentPage2,
        start,
        end,
        hasNext: currentPage2 < totalPages2,
        hasPrevious: currentPage2 > 1
      };
    };
    const getVocabExampleCount = (vocabId) => {
      return examples.value.filter((e) => e.vocabularyId === vocabId).length;
    };
    const openCreateDialogForVocab = (vocab) => {
      currentExample.value = null;
      selectedVocabulary.value = vocab.id;
      showCreateDialog.value = true;
    };
    const editExample = (example) => {
      currentExample.value = { ...example };
      showEditDialog.value = true;
    };
    const deleteExample = (example) => {
      const toastId = toast(
        {
          component: ConfirmToast,
          props: {
            message: t("vocabulary.examples.confirmDelete", "Are you sure you want to delete this example?"),
            confirmText: t("common.confirm", "Confirm"),
            cancelText: t("common.cancel", "Cancel"),
            onConfirm: () => {
              examples.value = examples.value.filter((e) => e.id !== example.id);
              saveExamplesToStorage();
              toast.dismiss(toastId);
              toast.success(t("vocabulary.examples.deleteSuccess", "Example deleted successfully"));
            },
            onCancel: () => {
              toast.dismiss(toastId);
            }
          }
        },
        {
          position: POSITION.TOP_CENTER,
          timeout: false,
          closeButton: false,
          draggable: false,
          icon: false
        }
      );
    };
    const saveExample = (exampleData) => {
      if (currentExample.value && showEditDialog.value) {
        const index = examples.value.findIndex((e) => e.id === currentExample.value.id);
        if (index !== -1) {
          examples.value[index] = {
            ...examples.value[index],
            ...exampleData,
            updatedAt: (/* @__PURE__ */ new Date()).toISOString()
          };
          const vocab = vocabularyList.value.find((v) => v.id === examples.value[index].vocabularyId);
          if (vocab) {
            examples.value[index].vocabulary = { id: vocab.id, word: vocab.word };
          }
        }
      } else {
        const newExample = {
          id: Date.now().toString(),
          vocabularyId: exampleData.vocabularyId,
          title: exampleData.title,
          content: exampleData.content,
          translation: exampleData.translation,
          context: exampleData.context,
          type: exampleData.type,
          difficulty: exampleData.difficulty,
          tags: exampleData.tags,
          createdAt: (/* @__PURE__ */ new Date()).toISOString(),
          updatedAt: (/* @__PURE__ */ new Date()).toISOString()
        };
        const vocab = vocabularyList.value.find((v) => v.id === newExample.vocabularyId);
        if (vocab) {
          newExample.vocabulary = { id: vocab.id, word: vocab.word };
        }
        examples.value.push(newExample);
      }
      saveExamplesToStorage();
      closeDialog();
    };
    const closeDialog = () => {
      showCreateDialog.value = false;
      showEditDialog.value = false;
      currentExample.value = null;
    };
    const playVocabularyAudio = (word) => {
      audioSystem.playVocabularySound(word, "en");
    };
    const previousPage = () => {
      if (currentPage.value > 1) {
        currentPage.value--;
      }
    };
    const nextPage = () => {
      if (currentPage.value < totalPages.value) {
        currentPage.value++;
      }
    };
    const goToPage = (page) => {
      if (page >= 1 && page <= totalPages.value) {
        currentPage.value = page;
      }
    };
    const toggleVocabExamples = (vocabId) => {
      expandedExamples.value[vocabId] = !expandedExamples.value[vocabId];
      saveExpandedExamplesState();
    };
    const loadExpandedExamplesState = () => {
      try {
        const saved = localStorage.getItem("vocabulary-examples-expanded-vocab");
        if (saved) {
          const parsed = JSON.parse(saved);
          expandedExamples.value = { ...parsed };
        }
      } catch (error) {
        console.error("Error loading expanded examples state:", error);
      }
    };
    const saveExpandedExamplesState = () => {
      try {
        localStorage.setItem("vocabulary-examples-expanded-vocab", JSON.stringify(expandedExamples.value));
      } catch (error) {
        console.error("Error saving expanded examples state:", error);
      }
    };
    const loadExamplePagesState = () => {
      try {
        const saved = localStorage.getItem("vocabulary-examples-pages");
        if (saved) {
          const parsed = JSON.parse(saved);
          examplePages.value = { ...parsed };
        }
      } catch (error) {
        console.error("Error loading example pages state:", error);
      }
    };
    const saveExamplePagesState = () => {
      try {
        localStorage.setItem("vocabulary-examples-pages", JSON.stringify(examplePages.value));
      } catch (error) {
        console.error("Error saving example pages state:", error);
      }
    };
    const initializeExpandedExamplesState = () => {
      let hasChanges = false;
      paginatedVocabulary.value.forEach((vocab) => {
        if (expandedExamples.value[vocab.id] === void 0) {
          expandedExamples.value[vocab.id] = false;
          hasChanges = true;
        }
        if (examplePages.value[vocab.id] === void 0) {
          examplePages.value[vocab.id] = 1;
          hasChanges = true;
        }
      });
      if (hasChanges) {
        saveExpandedExamplesState();
        saveExamplePagesState();
      }
    };
    const cleanupOldVocabularyStates = () => {
      try {
        const currentVocabIds = new Set(vocabularyList.value.map((v) => v.id));
        const expandedKeys = Object.keys(expandedExamples.value);
        let expandedChanged = false;
        expandedKeys.forEach((vocabId) => {
          if (!currentVocabIds.has(vocabId)) {
            delete expandedExamples.value[vocabId];
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
        if (expandedChanged) {
          saveExpandedExamplesState();
        }
        if (pagesChanged) {
          saveExamplePagesState();
        }
      } catch (error) {
        console.error("Error cleaning up old vocabulary states:", error);
      }
    };
    const examplesEnter = (el) => {
      const element = el;
      element.style.height = "0";
      element.style.overflow = "hidden";
    };
    const examplesAfterEnter = (el) => {
      const element = el;
      element.style.height = "auto";
      element.style.overflow = "visible";
    };
    const examplesEnterCancelled = (el) => {
      const element = el;
      element.style.height = "auto";
      element.style.overflow = "visible";
    };
    const examplesBeforeLeave = (el) => {
      const element = el;
      element.style.height = element.scrollHeight + "px";
      element.style.overflow = "hidden";
    };
    const examplesLeave = (el) => {
      const element = el;
      element.style.height = element.scrollHeight + "px";
      element.style.overflow = "hidden";
      element.offsetHeight;
      element.style.height = "0";
    };
    const examplesAfterLeave = (el) => {
      const element = el;
      element.style.height = "auto";
      element.style.overflow = "visible";
    };
    const toggleGrouping = () => {
      groupByTopic.value = !groupByTopic.value;
      localStorage.setItem("vocabulary-examples-group-by-topic", JSON.stringify(groupByTopic.value));
    };
    const loadGroupingPreference = () => {
      try {
        const saved = localStorage.getItem("vocabulary-examples-group-by-topic");
        if (saved) {
          groupByTopic.value = JSON.parse(saved);
        }
      } catch (error) {
        console.error("Error loading grouping preference:", error);
        groupByTopic.value = false;
      }
    };
    watch(() => paginatedVocabulary.value, () => {
      initializeExpandedExamplesState();
    }, { immediate: true });
    watch(() => vocabularyList.value, () => {
      cleanupOldVocabularyStates();
    }, { deep: true });
    watch(() => expandedExamples.value, () => {
      saveExpandedExamplesState();
    }, { deep: true });
    watch(() => examplePages.value, () => {
      saveExamplePagesState();
    }, { deep: true });
    onMounted(() => {
      loadExamples();
      loadGroupingPreference();
      loadExpandedExamplesState();
      loadExamplePagesState();
      setTimeout(() => {
        cleanupOldVocabularyStates();
      }, 100);
    });
    return (_ctx, _cache) => {
      return openBlock(), createElementBlock("div", _hoisted_1, [
        _cache[15] || (_cache[15] = createStaticVNode('<div class="absolute inset-0 overflow-hidden pointer-events-none z-0" data-v-42779dea><div class="floating-shapes" data-v-42779dea><div class="absolute top-20 left-10 w-64 h-64 bg-blue-300 dark:bg-blue-500 rounded-full mix-blend-multiply dark:mix-blend-normal filter blur-xl opacity-30 animate-blob" data-v-42779dea></div><div class="absolute top-40 right-10 w-72 h-72 bg-purple-300 dark:bg-purple-500 rounded-full mix-blend-multiply dark:mix-blend-normal filter blur-xl opacity-30 animate-blob animation-delay-2000" data-v-42779dea></div><div class="absolute -bottom-8 left-20 w-80 h-80 bg-pink-300 dark:bg-pink-500 rounded-full mix-blend-multiply dark:mix-blend-normal filter blur-xl opacity-30 animate-blob animation-delay-4000" data-v-42779dea></div><div class="hidden sm:block absolute top-10 left-1/2 -translate-x-1/2 w-40 h-40 bg-cyan-300 dark:bg-cyan-500 rounded-full mix-blend-multiply dark:mix-blend-normal filter blur-xl opacity-25 animate-blob animation-delay-1000" data-v-42779dea></div><div class="hidden sm:block absolute bottom-24 right-24 w-52 h-52 bg-indigo-300 dark:bg-indigo-500 rounded-full mix-blend-multiply dark:mix-blend-normal filter blur-xl opacity-25 animate-blob animation-delay-3000" data-v-42779dea></div></div></div>', 1)),
        createBaseVNode("div", _hoisted_2, [
          createBaseVNode("div", _hoisted_3, [
            createBaseVNode("div", _hoisted_4, [
              createBaseVNode("div", _hoisted_5, [
                _cache[1] || (_cache[1] = createBaseVNode("div", { class: "animate-pulse-slow" }, [
                  createBaseVNode("div", { class: "w-2 xs:w-2.5 sm:w-2.5 h-2 xs:h-2.5 sm:h-2.5 bg-gradient-to-r from-green-400 to-emerald-500 rounded-full mr-2 xs:mr-2.5 sm:mr-2.5" })
                ], -1)),
                createBaseVNode("div", null, [
                  createBaseVNode("h1", _hoisted_6, toDisplayString(unref(t)("vocabulary.examples.title", "Example Manager")), 1),
                  createBaseVNode("p", _hoisted_7, toDisplayString(unref(t)("vocabulary.examples.description", "Create and manage example sentences based on your vocabulary words")), 1)
                ])
              ]),
              createBaseVNode("div", _hoisted_8, [
                createBaseVNode("div", _hoisted_9, [
                  createBaseVNode("span", _hoisted_10, toDisplayString(unref(t)("vocabulary.examples.groupByTopic", "Group by Topic")), 1),
                  createBaseVNode("button", {
                    onClick: toggleGrouping,
                    class: normalizeClass(["relative inline-flex h-5 xs:h-6 sm:h-6 w-9 xs:w-11 sm:w-11 items-center rounded-full transition-colors duration-300", groupByTopic.value ? "bg-gradient-to-r from-green-600 to-emerald-600" : "bg-gray-200 dark:bg-[#0a0a0a]"])
                  }, [
                    createBaseVNode("span", {
                      class: normalizeClass(["inline-block h-3 xs:h-4 sm:h-4 w-3 xs:w-4 sm:w-4 transform rounded-full bg-white transition-transform duration-300 shadow-lg", groupByTopic.value ? "translate-x-5 xs:translate-x-6 sm:translate-x-6" : "translate-x-1"])
                    }, null, 2)
                  ], 2)
                ])
              ])
            ])
          ])
        ]),
        createBaseVNode("div", _hoisted_11, [
          createBaseVNode("div", _hoisted_12, [
            createBaseVNode("div", _hoisted_13, [
              _cache[2] || (_cache[2] = createBaseVNode("div", { class: "animate-pulse-slow" }, [
                createBaseVNode("div", { class: "w-2 xs:w-2.5 sm:w-2.5 h-2 xs:h-2.5 sm:h-2.5 bg-gradient-to-r from-blue-400 to-purple-500 rounded-full mr-2 xs:mr-2.5 sm:mr-2.5" })
              ], -1)),
              createBaseVNode("h3", _hoisted_14, toDisplayString(unref(t)("common.search", "Search")), 1)
            ]),
            createBaseVNode("div", _hoisted_15, [
              withDirectives(createBaseVNode("input", {
                "onUpdate:modelValue": _cache[0] || (_cache[0] = ($event) => searchTerm.value = $event),
                type: "text",
                placeholder: unref(t)("vocabulary.examples.searchVocabulary", "Search vocabulary words..."),
                class: "w-full pl-8 xs:pl-9 sm:pl-10 md:pl-10 pr-3 xs:pr-4 sm:pr-4 py-1.5 xs:py-2 sm:py-2 md:py-2 text-sm xs:text-sm sm:text-base md:text-base border border-gray-300 dark:border-dark-bg-mute rounded-lg bg-white/50 dark:bg-[#0a0a0a]/50 backdrop-blur-sm focus:ring-2 focus:ring-green-500 focus:border-transparent text-gray-900 dark:text-white transition-all duration-300"
              }, null, 8, _hoisted_16), [
                [vModelText, searchTerm.value]
              ]),
              _cache[3] || (_cache[3] = createBaseVNode("svg", {
                class: "absolute left-2 xs:left-2.5 sm:left-3 top-1.5 xs:top-2 sm:top-2.5 h-4 xs:h-4 sm:h-5 w-4 xs:w-4 sm:w-5 text-gray-400",
                fill: "none",
                stroke: "currentColor",
                viewBox: "0 0 24 24"
              }, [
                createBaseVNode("path", {
                  "stroke-linecap": "round",
                  "stroke-linejoin": "round",
                  "stroke-width": "2",
                  d: "M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
                })
              ], -1))
            ])
          ])
        ]),
        createBaseVNode("div", _hoisted_17, [
          createBaseVNode("div", _hoisted_18, [
            filteredVocabulary.value.length === 0 ? (openBlock(), createElementBlock("div", _hoisted_19, [
              createBaseVNode("div", _hoisted_20, [
                _cache[4] || (_cache[4] = createBaseVNode("div", { class: "animate-pulse-slow" }, [
                  createBaseVNode("div", { class: "w-2.5 xs:w-3 sm:w-3 h-2.5 xs:h-3 sm:h-3 bg-gradient-to-r from-gray-400 to-gray-500 rounded-full mx-auto mb-2 xs:mb-2 sm:mb-3" })
                ], -1)),
                _cache[5] || (_cache[5] = createBaseVNode("svg", {
                  class: "mx-auto h-8 xs:h-10 sm:h-12 w-8 xs:w-10 sm:w-12 text-gray-400 mb-3 xs:mb-3 sm:mb-4",
                  fill: "none",
                  stroke: "currentColor",
                  viewBox: "0 0 24 24"
                }, [
                  createBaseVNode("path", {
                    "stroke-linecap": "round",
                    "stroke-linejoin": "round",
                    "stroke-width": "2",
                    d: "M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.746 0 3.332.477 4.5 1.253v13C19.832 18.477 18.246 18 16.5 18c-1.746 0-3.332.477-4.5 1.253"
                  })
                ], -1)),
                createBaseVNode("h3", _hoisted_21, toDisplayString(unref(t)("vocabulary.examples.noVocabulary", "No vocabulary words found")), 1),
                createBaseVNode("p", _hoisted_22, toDisplayString(unref(t)("vocabulary.examples.noVocabularyDescription", "Add some vocabulary words first to create examples for them.")), 1)
              ])
            ])) : !groupByTopic.value ? (openBlock(), createElementBlock(Fragment, { key: 1 }, [
              (openBlock(true), createElementBlock(Fragment, null, renderList(paginatedVocabulary.value, (vocab) => {
                return openBlock(), createElementBlock("div", {
                  key: vocab.id,
                  class: "group bg-white/80 dark:bg-[#0a0a0a]/80 backdrop-blur-md shadow-xl hover:shadow-2xl rounded-2xl border border-white/20 dark:border-white/10 transition-all duration-500 hover:scale-[1.005] p-2 xs:p-3 sm:p-4 md:p-5 lg:p-6"
                }, [
                  createBaseVNode("div", {
                    onClick: ($event) => toggleVocabExamples(vocab.id),
                    class: "flex flex-col xs:flex-col sm:flex-row items-start justify-between mb-3 xs:mb-3 sm:mb-4 pb-2 xs:pb-2 sm:pb-3 border-b border-gray-200/50 dark:border-gray-700/50 gap-3 xs:gap-3 sm:gap-0"
                  }, [
                    createBaseVNode("div", _hoisted_24, [
                      _cache[8] || (_cache[8] = createBaseVNode("div", { class: "animate-pulse-slow mt-1" }, [
                        createBaseVNode("div", { class: "w-2 xs:w-2.5 sm:w-2.5 h-2 xs:h-2.5 sm:h-2.5 bg-gradient-to-r from-green-400 to-blue-500 rounded-full" })
                      ], -1)),
                      createBaseVNode("div", _hoisted_25, [
                        createBaseVNode("div", _hoisted_26, [
                          createBaseVNode("h3", _hoisted_27, toDisplayString(vocab.word), 1),
                          createBaseVNode("button", {
                            onClick: withModifiers(($event) => playVocabularyAudio(vocab.word), ["stop"]),
                            class: "p-1 xs:p-1.5 sm:p-1.5 text-blue-600 hover:text-blue-700 hover:bg-blue-50/50 dark:text-blue-400 dark:hover:text-blue-300 dark:hover:bg-blue-900/20 rounded-lg transition-all duration-300 group flex-shrink-0",
                            title: unref(t)("vocabulary.examples.playPronunciation", "Play pronunciation")
                          }, _cache[6] || (_cache[6] = [
                            createBaseVNode("svg", {
                              class: "w-3 xs:w-4 sm:w-4 h-3 xs:h-4 sm:h-4 group-hover:scale-110 transition-transform duration-200",
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
                          ]), 8, _hoisted_28),
                          getVocabExampleCount(vocab.id) > 0 ? (openBlock(), createElementBlock("button", {
                            key: 0,
                            onClick: withModifiers(($event) => toggleVocabExamples(vocab.id), ["stop"]),
                            class: "p-1 xs:p-1.5 sm:p-1.5 text-gray-600 hover:text-gray-700 hover:bg-gray-50/50 dark:text-gray-400 dark:hover:text-gray-300 dark:hover:bg-[#0a0a0a]/20 rounded-lg transition-all duration-300 group flex-shrink-0",
                            title: expandedExamples.value[vocab.id] ? unref(t)("vocabulary.examples.hideExamples", "Hide examples") : unref(t)("vocabulary.examples.showExamples", "Show examples")
                          }, [
                            (openBlock(), createElementBlock("svg", {
                              class: normalizeClass(["w-3 xs:w-4 sm:w-4 h-3 xs:h-4 sm:h-4 group-hover:scale-110 transition-all duration-200", { "rotate-180": expandedExamples.value[vocab.id] }]),
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
                          ], 8, _hoisted_29)) : createCommentVNode("", true)
                        ]),
                        createBaseVNode("p", _hoisted_30, toDisplayString(vocab.meaning), 1),
                        createBaseVNode("div", _hoisted_31, [
                          createBaseVNode("span", _hoisted_32, toDisplayString(vocab.partOfSpeech), 1),
                          createBaseVNode("span", _hoisted_33, toDisplayString(getVocabExampleCount(vocab.id)) + " " + toDisplayString(getVocabExampleCount(vocab.id) === 1 ? "example" : "examples"), 1)
                        ])
                      ])
                    ]),
                    createBaseVNode("button", {
                      onClick: withModifiers(($event) => openCreateDialogForVocab(vocab), ["stop"]),
                      class: "px-2 xs:px-2.5 sm:px-3 py-1.5 xs:py-1.5 sm:py-2 text-xs xs:text-xs sm:text-sm bg-gradient-to-r from-green-600 to-emerald-600 hover:from-green-700 hover:to-emerald-700 text-white rounded-lg font-medium transition-all duration-300 shadow-lg hover:shadow-xl flex items-center space-x-1 xs:space-x-1 sm:space-x-2 flex-shrink-0"
                    }, [
                      _cache[9] || (_cache[9] = createBaseVNode("svg", {
                        class: "w-3 xs:w-3 sm:w-4 h-3 xs:h-3 sm:h-4",
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
                      createBaseVNode("span", _hoisted_35, toDisplayString(unref(t)("vocabulary.examples.addExample", "Add Example")), 1),
                      createBaseVNode("span", _hoisted_36, toDisplayString(unref(t)("common.add", "Add")), 1)
                    ], 8, _hoisted_34)
                  ], 8, _hoisted_23),
                  createVNode(Transition, {
                    name: "examples-accordion",
                    onEnter: examplesEnter,
                    onAfterEnter: examplesAfterEnter,
                    onEnterCancelled: examplesEnterCancelled,
                    onBeforeLeave: examplesBeforeLeave,
                    onLeave: examplesLeave,
                    onAfterLeave: examplesAfterLeave
                  }, {
                    default: withCtx(() => [
                      expandedExamples.value[vocab.id] ? (openBlock(), createElementBlock("div", _hoisted_37, [
                        getVocabExamples(vocab.id).length === 0 ? (openBlock(), createElementBlock("div", _hoisted_38, [
                          createBaseVNode("p", _hoisted_39, toDisplayString(unref(t)("vocabulary.examples.noExamples", "No examples found for this vocabulary.")), 1)
                        ])) : (openBlock(), createElementBlock("div", _hoisted_40, [
                          createBaseVNode("div", _hoisted_41, [
                            (openBlock(true), createElementBlock(Fragment, null, renderList(getPaginatedVocabExamples(vocab.id), (example) => {
                              return openBlock(), createElementBlock("div", {
                                key: example.id,
                                class: "bg-white dark:bg-dark-bg border border-slate-200 dark:border-dark-bg-mute rounded-lg p-2 xs:p-3 sm:p-4 md:p-4 shadow-sm hover:shadow-md transition-shadow duration-200"
                              }, [
                                createBaseVNode("div", _hoisted_42, [
                                  createBaseVNode("div", _hoisted_43, [
                                    createBaseVNode("div", _hoisted_44, [
                                      createBaseVNode("h4", _hoisted_45, toDisplayString(example.title), 1),
                                      createBaseVNode("button", {
                                        onClick: ($event) => unref(audioSystem).playVocabularySound(example.content, "en"),
                                        class: "flex-shrink-0 p-1 xs:p-1.5 sm:p-1.5 text-emerald-600 hover:text-emerald-700 dark:text-emerald-400 dark:hover:text-emerald-300 bg-emerald-50 dark:bg-emerald-900/20 rounded-full hover:bg-emerald-100 dark:hover:bg-emerald-900/30 transition-all duration-200 transform hover:scale-110",
                                        title: unref(t)("vocabulary.examples.playExample", "Play example pronunciation")
                                      }, _cache[10] || (_cache[10] = [
                                        createBaseVNode("svg", {
                                          class: "w-3 xs:w-4 sm:w-4 h-3 xs:h-4 sm:h-4",
                                          fill: "none",
                                          stroke: "currentColor",
                                          viewBox: "0 0 24 24"
                                        }, [
                                          createBaseVNode("path", {
                                            "stroke-linecap": "round",
                                            "stroke-linejoin": "round",
                                            "stroke-width": "2",
                                            d: "M15.536 8.464a5 5 0 010 7.072m2.828-9.9a9 9 0 010 14.142M9 9l3-3v12l-3-3H5a2 2 0 01-2-2V9a2 2 0 012-2h4z"
                                          })
                                        ], -1)
                                      ]), 8, _hoisted_46)
                                    ]),
                                    createBaseVNode("p", _hoisted_47, toDisplayString(example.content), 1),
                                    createBaseVNode("div", _hoisted_48, [
                                      createBaseVNode("span", _hoisted_49, toDisplayString(example.type), 1),
                                      example.difficulty ? (openBlock(), createElementBlock("span", _hoisted_50, toDisplayString(example.difficulty), 1)) : createCommentVNode("", true),
                                      example.context ? (openBlock(), createElementBlock("span", _hoisted_51, toDisplayString(example.context), 1)) : createCommentVNode("", true)
                                    ])
                                  ]),
                                  createBaseVNode("div", _hoisted_52, [
                                    createBaseVNode("button", {
                                      onClick: ($event) => editExample(example),
                                      class: "px-2 xs:px-2.5 sm:px-3 py-1 xs:py-1 sm:py-1.5 text-2xs xs:text-xs sm:text-xs bg-blue-600 hover:bg-blue-700 text-white rounded-md transition-colors duration-200 flex items-center gap-1"
                                    }, [
                                      _cache[11] || (_cache[11] = createBaseVNode("svg", {
                                        class: "w-2.5 xs:w-3 sm:w-3 h-2.5 xs:h-3 sm:h-3",
                                        fill: "none",
                                        stroke: "currentColor",
                                        viewBox: "0 0 24 24"
                                      }, [
                                        createBaseVNode("path", {
                                          "stroke-linecap": "round",
                                          "stroke-linejoin": "round",
                                          "stroke-width": "2",
                                          d: "M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z"
                                        })
                                      ], -1)),
                                      createBaseVNode("span", _hoisted_54, toDisplayString(unref(t)("common.edit", "Edit")), 1)
                                    ], 8, _hoisted_53),
                                    createBaseVNode("button", {
                                      onClick: ($event) => deleteExample(example),
                                      class: "px-2 xs:px-2.5 sm:px-3 py-1 xs:py-1 sm:py-1.5 text-2xs xs:text-xs sm:text-xs bg-red-600 hover:bg-red-700 text-white rounded-md transition-colors duration-200 flex items-center gap-1"
                                    }, [
                                      _cache[12] || (_cache[12] = createBaseVNode("svg", {
                                        class: "w-2.5 xs:w-3 sm:w-3 h-2.5 xs:h-3 sm:h-3",
                                        fill: "none",
                                        stroke: "currentColor",
                                        viewBox: "0 0 24 24"
                                      }, [
                                        createBaseVNode("path", {
                                          "stroke-linecap": "round",
                                          "stroke-linejoin": "round",
                                          "stroke-width": "2",
                                          d: "M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16"
                                        })
                                      ], -1)),
                                      createBaseVNode("span", _hoisted_56, toDisplayString(unref(t)("common.delete", "Delete")), 1)
                                    ], 8, _hoisted_55)
                                  ])
                                ])
                              ]);
                            }), 128))
                          ]),
                          getVocabExamplePages(vocab.id) > 1 ? (openBlock(), createElementBlock("div", _hoisted_57, [
                            createBaseVNode("div", _hoisted_58, [
                              createBaseVNode("div", _hoisted_59, [
                                createBaseVNode("button", {
                                  onClick: ($event) => previousExamplePage(vocab.id),
                                  disabled: !getExamplePaginationInfo(vocab.id).hasPrevious,
                                  class: "px-1.5 xs:px-2 py-0.5 xs:py-1 text-2xs xs:text-xs bg-slate-200 dark:bg-dark-bg-mute text-slate-700 dark:text-slate-300 rounded disabled:opacity-50 disabled:cursor-not-allowed hover:bg-slate-300 dark:hover:bg-slate-600 transition-colors"
                                }, toDisplayString(unref(t)("common.previous", "Prev")), 9, _hoisted_60),
                                createBaseVNode("span", _hoisted_61, toDisplayString(getExamplePaginationInfo(vocab.id).currentPage) + " / " + toDisplayString(getExamplePaginationInfo(vocab.id).totalPages), 1),
                                createBaseVNode("button", {
                                  onClick: ($event) => nextExamplePage(vocab.id),
                                  disabled: !getExamplePaginationInfo(vocab.id).hasNext,
                                  class: "px-1.5 xs:px-2 py-0.5 xs:py-1 text-2xs xs:text-xs bg-slate-200 dark:bg-dark-bg-mute text-slate-700 dark:text-slate-300 rounded disabled:opacity-50 disabled:cursor-not-allowed hover:bg-slate-300 dark:hover:bg-slate-600 transition-colors"
                                }, toDisplayString(unref(t)("common.next", "Next")), 9, _hoisted_62)
                              ]),
                              createBaseVNode("div", _hoisted_63, [
                                createBaseVNode("button", {
                                  onClick: ($event) => previousExamplePage(vocab.id),
                                  disabled: !getExamplePaginationInfo(vocab.id).hasPrevious,
                                  class: "px-3 py-1.5 text-sm bg-slate-200 dark:bg-dark-bg-mute text-slate-700 dark:text-slate-300 rounded disabled:opacity-50 disabled:cursor-not-allowed hover:bg-slate-300 dark:hover:bg-slate-600 transition-colors"
                                }, toDisplayString(unref(t)("common.previous", "Previous")), 9, _hoisted_64),
                                createBaseVNode("div", _hoisted_65, [
                                  (openBlock(true), createElementBlock(Fragment, null, renderList(Math.min(getExamplePaginationInfo(vocab.id).totalPages, 5), (page) => {
                                    return openBlock(), createElementBlock("button", {
                                      key: page,
                                      onClick: ($event) => goToExamplePage(vocab.id, page),
                                      class: normalizeClass([
                                        "px-3 py-1.5 text-sm rounded transition-colors",
                                        getExamplePaginationInfo(vocab.id).currentPage === page ? "bg-blue-600 text-white" : "bg-slate-200 dark:bg-dark-bg-mute text-slate-700 dark:text-slate-300 hover:bg-slate-300 dark:hover:bg-slate-600"
                                      ])
                                    }, toDisplayString(page), 11, _hoisted_66);
                                  }), 128))
                                ]),
                                createBaseVNode("button", {
                                  onClick: ($event) => nextExamplePage(vocab.id),
                                  disabled: !getExamplePaginationInfo(vocab.id).hasNext,
                                  class: "px-3 py-1.5 text-sm bg-slate-200 dark:bg-dark-bg-mute text-slate-700 dark:text-slate-300 rounded disabled:opacity-50 disabled:cursor-not-allowed hover:bg-slate-300 dark:hover:bg-slate-600 transition-colors"
                                }, toDisplayString(unref(t)("common.next", "Next")), 9, _hoisted_67)
                              ]),
                              createBaseVNode("div", _hoisted_68, toDisplayString(unref(t)("vocabulary.examples.showingExamples", { start: getExamplePaginationInfo(vocab.id).start, end: getExamplePaginationInfo(vocab.id).end, total: getExamplePaginationInfo(vocab.id).totalExamples }, "Showing {start} to {end} of {total} examples")), 1)
                            ])
                          ])) : createCommentVNode("", true)
                        ]))
                      ])) : createCommentVNode("", true)
                    ]),
                    _: 2
                  }, 1024)
                ]);
              }), 128)),
              totalPages.value > 1 ? (openBlock(), createElementBlock("div", _hoisted_69, [
                createBaseVNode("div", _hoisted_70, [
                  createBaseVNode("div", _hoisted_71, [
                    createBaseVNode("button", {
                      onClick: previousPage,
                      disabled: currentPage.value === 1,
                      class: "relative inline-flex items-center px-2 xs:px-3 py-1 xs:py-1.5 border border-gray-300 dark:border-gray-600 text-xs xs:text-sm font-medium rounded-md text-gray-700 dark:text-gray-300 bg-white dark:bg-[#0a0a0a] hover:bg-gray-50 dark:hover:bg-gray-600 disabled:opacity-50 disabled:cursor-not-allowed"
                    }, toDisplayString(unref(t)("common.previous", "Prev")), 9, _hoisted_72),
                    createBaseVNode("div", _hoisted_73, [
                      createBaseVNode("span", _hoisted_74, toDisplayString(currentPage.value) + " / " + toDisplayString(totalPages.value), 1)
                    ]),
                    createBaseVNode("button", {
                      onClick: nextPage,
                      disabled: currentPage.value === totalPages.value,
                      class: "relative inline-flex items-center px-2 xs:px-3 py-1 xs:py-1.5 border border-gray-300 dark:border-gray-600 text-xs xs:text-sm font-medium rounded-md text-gray-700 dark:text-gray-300 bg-white dark:bg-[#0a0a0a] hover:bg-gray-50 dark:hover:bg-gray-600 disabled:opacity-50 disabled:cursor-not-allowed"
                    }, toDisplayString(unref(t)("common.next", "Next")), 9, _hoisted_75)
                  ]),
                  createBaseVNode("div", _hoisted_76, [
                    createBaseVNode("div", null, [
                      createBaseVNode("p", _hoisted_77, toDisplayString(unref(t)("vocabulary.examples.showingVocabulary", {
                        start: startIndex.value,
                        end: endIndex.value,
                        total: filteredVocabulary.value.length
                      }, `Showing ${startIndex.value} to ${endIndex.value} of ${filteredVocabulary.value.length} vocabulary words`)), 1)
                    ]),
                    createBaseVNode("nav", _hoisted_78, [
                      createBaseVNode("button", {
                        onClick: previousPage,
                        disabled: currentPage.value === 1,
                        class: "relative inline-flex items-center px-2 py-2 rounded-l-md border border-gray-300 dark:border-gray-600 bg-white dark:bg-[#0a0a0a] text-sm font-medium text-gray-500 dark:text-gray-300 hover:bg-gray-50 dark:hover:bg-gray-600 disabled:opacity-50 disabled:cursor-not-allowed"
                      }, [
                        createBaseVNode("span", _hoisted_80, toDisplayString(unref(t)("common.previous", "Previous")), 1),
                        _cache[13] || (_cache[13] = createBaseVNode("svg", {
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
                      ], 8, _hoisted_79),
                      (openBlock(true), createElementBlock(Fragment, null, renderList(visiblePages.value, (page) => {
                        return openBlock(), createElementBlock("button", {
                          key: page,
                          onClick: ($event) => goToPage(page),
                          class: normalizeClass([
                            page === currentPage.value ? "z-10 bg-blue-50 dark:bg-blue-900 border-blue-500 dark:border-blue-400 text-blue-600 dark:text-blue-300" : "bg-white dark:bg-[#0a0a0a] border-gray-300 dark:border-gray-600 text-gray-500 dark:text-gray-300 hover:bg-gray-50 dark:hover:bg-gray-600",
                            "relative inline-flex items-center px-4 py-2 border text-sm font-medium"
                          ])
                        }, toDisplayString(page), 11, _hoisted_81);
                      }), 128)),
                      createBaseVNode("button", {
                        onClick: nextPage,
                        disabled: currentPage.value === totalPages.value,
                        class: "relative inline-flex items-center px-2 py-2 rounded-r-md border border-gray-300 dark:border-gray-600 bg-white dark:bg-[#0a0a0a] text-sm font-medium text-gray-500 dark:text-gray-300 hover:bg-gray-50 dark:hover:bg-gray-600 disabled:opacity-50 disabled:cursor-not-allowed"
                      }, [
                        createBaseVNode("span", _hoisted_83, toDisplayString(unref(t)("common.next", "Next")), 1),
                        _cache[14] || (_cache[14] = createBaseVNode("svg", {
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
                      ], 8, _hoisted_82)
                    ])
                  ])
                ])
              ])) : createCommentVNode("", true)
            ], 64)) : (openBlock(), createBlock(unref(TopicGroupAccordion), {
              key: 2,
              "vocabulary-list": filteredVocabulary.value,
              examples: examples.value,
              onAddExample: openCreateDialogForVocab,
              onEditExample: editExample,
              onDeleteExample: deleteExample
            }, null, 8, ["vocabulary-list", "examples"]))
          ])
        ]),
        showCreateDialog.value || showEditDialog.value ? (openBlock(), createBlock(unref(ExampleFormDialog), {
          key: 0,
          show: showCreateDialog.value || showEditDialog.value,
          example: currentExample.value,
          "vocabulary-id": selectedVocabulary.value,
          "vocabulary-list": vocabularyList.value,
          onClose: closeDialog,
          onSave: saveExample
        }, null, 8, ["show", "example", "vocabulary-id", "vocabulary-list"])) : createCommentVNode("", true)
      ]);
    };
  }
});
const VocabularyExamplesView = /* @__PURE__ */ _export_sfc(_sfc_main, [["__scopeId", "data-v-42779dea"]]);
export {
  VocabularyExamplesView as default
};
//# sourceMappingURL=VocabularyExamplesView-Bd7qPa7g.js.map
