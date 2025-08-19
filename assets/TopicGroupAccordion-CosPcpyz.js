const __vite__mapDeps=(i,m=__vite__mapDeps,d=(m.f||(m.f=["assets/ConfirmToast-CgT2s8MY.js","assets/vendor-kzGOnAa-.js"])))=>i.map(i=>d[i]);
import { c as useVocabularyStore, i as useTopicName, j as useAudioSystem, _ as __vitePreload, a as _export_sfc } from "./index-BX7kJeb0.js";
import { d as defineComponent, H as useI18n, A as ref, B as computed, K as watch, I as onMounted, c as createElementBlock, v as openBlock, e as createCommentVNode, F as Fragment, j as renderList, f as createBaseVNode, y as createVNode, t as toDisplayString, u as unref, n as normalizeClass, w as withCtx, M as Transition, D as defineAsyncComponent } from "./vendor-kzGOnAa-.js";
import { u as useToast, P as POSITION } from "./vendor-toast-DUxYViPJ.js";
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
  class: "mt-6 group bg-white/80 dark:bg-[#0a0a0a]/80 backdrop-blur-md shadow-xl hover:shadow-2xl rounded-2xl border border-white/20 dark:border-white/10 transition-all duration-500 hover:scale-[1.005] p-4"
};
const _hoisted_51 = { class: "flex items-center justify-between" };
const _hoisted_52 = { class: "flex-1 flex justify-between sm:hidden" };
const _hoisted_53 = ["disabled"];
const _hoisted_54 = ["disabled"];
const _hoisted_55 = { class: "hidden sm:flex-1 sm:flex sm:items-center sm:justify-between" };
const _hoisted_56 = { class: "text-sm text-gray-700 dark:text-gray-300" };
const _hoisted_57 = { class: "relative z-0 inline-flex rounded-md shadow-sm -space-x-px" };
const _hoisted_58 = ["disabled"];
const _hoisted_59 = { class: "sr-only" };
const _hoisted_60 = ["onClick"];
const _hoisted_61 = ["disabled"];
const _hoisted_62 = { class: "sr-only" };
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
    const ConfirmToast = defineAsyncComponent(() => __vitePreload(() => import("./ConfirmToast-CgT2s8MY.js"), true ? __vite__mapDeps([0,1]) : void 0));
    const props = __props;
    const emit = __emit;
    const { t } = useI18n();
    const toast = useToast();
    useVocabularyStore();
    const audioSystem = useAudioSystem();
    const { getTopicName } = useTopicName();
    const expandedGroups = ref({});
    const expandedVocabExamples = ref({});
    const examplePages = ref({});
    const examplesPerPage = ref(5);
    const currentPage = ref(1);
    const topicsPerPage = ref(3);
    const playVocabularyAudio = (word) => {
      audioSystem.playVocabularySound(word, "en");
    };
    const playExampleAudio = (text) => {
      audioSystem.playVocabularySound(text, "en");
    };
    const loadExpandedState = () => {
      try {
        const saved = localStorage.getItem("vocabulary-examples-expanded-topics");
        if (saved) {
          const parsed = JSON.parse(saved);
          expandedGroups.value = { ...parsed };
        }
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
        if (saved) {
          const parsed = JSON.parse(saved);
          expandedVocabExamples.value = { ...parsed };
        }
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
        localStorage.setItem("vocabulary-examples-pages-grouped", JSON.stringify(examplePages.value));
      } catch (error) {
        console.error("Error saving example pages state:", error);
      }
    };
    const allGroupedVocabulary = computed(() => {
      const groups = {};
      props.vocabularyList.forEach((vocab) => {
        const topicKey = vocab.category || "uncategorized";
        if (!groups[topicKey]) {
          groups[topicKey] = [];
        }
        groups[topicKey].push(vocab);
      });
      Object.keys(groups).forEach((key) => {
        groups[key].sort((a, b) => a.word.localeCompare(b.word));
      });
      return groups;
    });
    const groupedVocabulary = computed(() => {
      const allGroups = allGroupedVocabulary.value;
      const topicKeys = Object.keys(allGroups);
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
    const initializeExpandedVocabExamplesState = () => {
      Object.values(groupedVocabulary.value).forEach((group) => {
        group.forEach((vocab) => {
          if (expandedVocabExamples.value[vocab.id] === void 0) {
            expandedVocabExamples.value[vocab.id] = true;
          }
          if (examplePages.value[vocab.id] === void 0) {
            examplePages.value[vocab.id] = 1;
          }
        });
      });
      saveExpandedVocabExamplesState();
      saveExamplePagesState();
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
    const getVocabExamples = (vocabId) => {
      return props.examples.filter((e) => e.vocabularyId === vocabId);
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
      const totalPages = getVocabExamplePages(vocabId);
      if (page >= 1 && page <= totalPages) {
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
      const totalPages = getVocabExamplePages(vocabId);
      if (currentPage2 < totalPages) {
        goToExamplePage(vocabId, currentPage2 + 1);
      }
    };
    const getExamplePaginationInfo = (vocabId) => {
      const totalExamples = getVocabExamples(vocabId).length;
      const currentPage2 = examplePages.value[vocabId] || 1;
      const totalPages = getVocabExamplePages(vocabId);
      const start = (currentPage2 - 1) * examplesPerPage.value + 1;
      const end = Math.min(currentPage2 * examplesPerPage.value, totalExamples);
      return {
        totalExamples,
        totalPages,
        currentPage: currentPage2,
        start,
        end,
        hasNext: currentPage2 < totalPages,
        hasPrevious: currentPage2 > 1
      };
    };
    const getVocabExampleCount = (vocabId) => {
      return props.examples.filter((e) => e.vocabularyId === vocabId).length;
    };
    const getTotalExamplesForTopic = (group) => {
      return group.reduce((total, vocab) => total + getVocabExampleCount(vocab.id), 0);
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
    const initializeExpandedState = () => {
      const topicKeys = Object.keys(groupedVocabulary.value);
      topicKeys.forEach((key) => {
        if (expandedGroups.value[key] === void 0) {
          expandedGroups.value[key] = true;
        }
      });
      saveExpandedState();
    };
    watch(() => groupedVocabulary.value, () => {
      initializeExpandedState();
      initializeExpandedVocabExamplesState();
    }, { immediate: true });
    onMounted(() => {
      loadExpandedState();
      loadExpandedVocabExamplesState();
      loadExamplePagesState();
    });
    const deleteExample = (example) => {
      const toastId = toast(
        {
          component: ConfirmToast,
          props: {
            message: t("vocabulary.examples.confirmDelete", "Are you sure you want to delete this example?"),
            confirmText: t("common.confirm", "Confirm"),
            cancelText: t("common.cancel", "Cancel"),
            onConfirm: () => {
              emit("delete-example", example);
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
    const goToPage = (page) => {
      if (page >= 1 && page <= paginationInfo.value.totalPages) {
        currentPage.value = page;
      }
    };
    const previousPage = () => {
      if (paginationInfo.value.hasPrevious) {
        currentPage.value--;
      }
    };
    const nextPage = () => {
      if (paginationInfo.value.hasNext) {
        currentPage.value++;
      }
    };
    const toggleGroup = (topicKey) => {
      expandedGroups.value[topicKey] = !expandedGroups.value[topicKey];
      saveExpandedState();
    };
    const toggleVocabExamples = (vocabId) => {
      expandedVocabExamples.value[vocabId] = !expandedVocabExamples.value[vocabId];
      saveExpandedVocabExamplesState();
    };
    return (_ctx, _cache) => {
      return openBlock(), createElementBlock("div", _hoisted_1, [
        (openBlock(true), createElementBlock(Fragment, null, renderList(groupedVocabulary.value, (group, topicKey) => {
          return openBlock(), createElementBlock("div", {
            key: topicKey,
            class: "group bg-white/80 dark:bg-[#0a0a0a]/80 backdrop-blur-md shadow-xl hover:shadow-2xl rounded-2xl border border-white/20 dark:border-white/10 transition-all duration-500 hover:scale-[1.002]"
          }, [
            createBaseVNode("div", {
              onClick: ($event) => toggleGroup(topicKey),
              class: "flex items-center justify-between p-4 cursor-pointer hover:bg-white/20 dark:hover:bg-[#0a0a0a]/20 rounded-t-2xl transition-all duration-300"
            }, [
              createBaseVNode("div", _hoisted_3, [
                _cache[0] || (_cache[0] = createBaseVNode("div", { class: "animate-pulse-slow" }, [
                  createBaseVNode("div", { class: "w-2.5 h-2.5 bg-gradient-to-r from-blue-400 to-purple-500 rounded-full" })
                ], -1)),
                createBaseVNode("div", null, [
                  createBaseVNode("h3", _hoisted_4, toDisplayString(unref(getTopicName)(topicKey)), 1),
                  createBaseVNode("p", _hoisted_5, toDisplayString(group.length) + " " + toDisplayString(group.length === 1 ? unref(t)("vocabulary.word", "word") : unref(t)("vocabulary.words", "words")), 1)
                ])
              ]),
              createBaseVNode("div", _hoisted_6, [
                createBaseVNode("span", _hoisted_7, toDisplayString(getTotalExamplesForTopic(group)) + " " + toDisplayString(unref(t)("vocabulary.examples.examples", "examples")), 1),
                (openBlock(), createElementBlock("svg", {
                  class: normalizeClass(["w-5 h-5 text-gray-500 dark:text-gray-400 transition-transform duration-300", { "rotate-180": expandedGroups.value[topicKey] }]),
                  fill: "none",
                  stroke: "currentColor",
                  viewBox: "0 0 24 24"
                }, _cache[1] || (_cache[1] = [
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
              onEnter: enter,
              onAfterEnter: afterEnter,
              onLeave: leave,
              onAfterLeave: afterLeave
            }, {
              default: withCtx(() => [
                expandedGroups.value[topicKey] ? (openBlock(), createElementBlock("div", _hoisted_8, [
                  createBaseVNode("div", _hoisted_9, [
                    (openBlock(true), createElementBlock(Fragment, null, renderList(group, (vocab) => {
                      return openBlock(), createElementBlock("div", {
                        key: vocab.id,
                        class: "bg-white/60 dark:bg-[#0a0a0a]/60 backdrop-blur-sm rounded-xl border border-white/20 dark:border-white/10 p-4 hover:shadow-lg transition-all duration-300"
                      }, [
                        createBaseVNode("div", _hoisted_10, [
                          createBaseVNode("div", _hoisted_11, [
                            _cache[4] || (_cache[4] = createBaseVNode("div", { class: "animate-pulse-slow" }, [
                              createBaseVNode("div", { class: "w-2 h-2 bg-gradient-to-r from-green-400 to-blue-500 rounded-full" })
                            ], -1)),
                            createBaseVNode("div", null, [
                              createBaseVNode("div", _hoisted_12, [
                                createBaseVNode("h4", _hoisted_13, toDisplayString(vocab.word), 1),
                                createBaseVNode("button", {
                                  onClick: ($event) => playVocabularyAudio(vocab.word),
                                  class: "p-1 text-blue-600 hover:text-blue-700 hover:bg-blue-50/50 dark:text-blue-400 dark:hover:text-blue-300 dark:hover:bg-blue-900/20 rounded transition-all duration-300 group",
                                  title: unref(t)("vocabulary.examples.playPronunciation", "Play pronunciation")
                                }, _cache[2] || (_cache[2] = [
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
                                getVocabExampleCount(vocab.id) > 0 ? (openBlock(), createElementBlock("button", {
                                  key: 0,
                                  onClick: ($event) => toggleVocabExamples(vocab.id),
                                  class: "p-1 text-gray-600 hover:text-gray-700 hover:bg-gray-50/50 dark:text-gray-400 dark:hover:text-gray-300 dark:hover:bg-[#0a0a0a]/20 rounded transition-all duration-300 group",
                                  title: expandedVocabExamples.value[vocab.id] ? unref(t)("vocabulary.examples.hideExamples", "Hide examples") : unref(t)("vocabulary.examples.showExamples", "Show examples")
                                }, [
                                  (openBlock(), createElementBlock("svg", {
                                    class: normalizeClass(["w-3.5 h-3.5 group-hover:scale-110 transition-all duration-200", { "rotate-180": expandedVocabExamples.value[vocab.id] }]),
                                    fill: "none",
                                    stroke: "currentColor",
                                    viewBox: "0 0 24 24"
                                  }, _cache[3] || (_cache[3] = [
                                    createBaseVNode("path", {
                                      "stroke-linecap": "round",
                                      "stroke-linejoin": "round",
                                      "stroke-width": "2",
                                      d: "M19 9l-7 7-7-7"
                                    }, null, -1)
                                  ]), 2))
                                ], 8, _hoisted_15)) : createCommentVNode("", true)
                              ]),
                              createBaseVNode("p", _hoisted_16, toDisplayString(vocab.meaning), 1),
                              createBaseVNode("div", _hoisted_17, [
                                createBaseVNode("span", _hoisted_18, toDisplayString(vocab.partOfSpeech), 1),
                                createBaseVNode("span", _hoisted_19, toDisplayString(getVocabExampleCount(vocab.id)) + " " + toDisplayString(getVocabExampleCount(vocab.id) === 1 ? "example" : "examples"), 1)
                              ])
                            ])
                          ]),
                          createBaseVNode("button", {
                            onClick: ($event) => _ctx.$emit("add-example", vocab),
                            class: "px-3 py-1.5 bg-gradient-to-r from-green-600 to-emerald-600 hover:from-green-700 hover:to-emerald-700 text-white rounded-lg font-medium transition-all duration-300 shadow-lg hover:shadow-xl flex items-center space-x-1.5"
                          }, [
                            _cache[5] || (_cache[5] = createBaseVNode("svg", {
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
                          onEnter: vocabExamplesEnter,
                          onAfterEnter: vocabExamplesAfterEnter,
                          onLeave: vocabExamplesLeave,
                          onAfterLeave: vocabExamplesAfterLeave
                        }, {
                          default: withCtx(() => [
                            expandedVocabExamples.value[vocab.id] ? (openBlock(), createElementBlock("div", _hoisted_22, [
                              getVocabExamples(vocab.id).length === 0 ? (openBlock(), createElementBlock("div", _hoisted_23, [
                                _cache[6] || (_cache[6] = createBaseVNode("svg", {
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
                              (openBlock(true), createElementBlock(Fragment, null, renderList(getPaginatedVocabExamples(vocab.id), (example) => {
                                return openBlock(), createElementBlock("div", {
                                  key: example.id,
                                  class: "bg-white/40 dark:bg-[#0a0a0a]/40 backdrop-blur-sm rounded-lg border border-white/20 dark:border-white/10 p-3 hover:shadow-md transition-all duration-300"
                                }, [
                                  createBaseVNode("div", _hoisted_25, [
                                    createBaseVNode("div", _hoisted_26, [
                                      createBaseVNode("div", _hoisted_27, [
                                        createBaseVNode("span", {
                                          class: normalizeClass(["inline-flex items-center px-2 py-0.5 rounded-full text-xs font-medium", getTypeColorClass(example.type)])
                                        }, toDisplayString(getTypeLabel(example.type)), 3),
                                        example.difficulty ? (openBlock(), createElementBlock("span", {
                                          key: 0,
                                          class: normalizeClass(["text-sm", getDifficultyColorClass(example.difficulty)])
                                        }, toDisplayString(getDifficultyLabel(example.difficulty)), 3)) : createCommentVNode("", true)
                                      ]),
                                      createBaseVNode("div", _hoisted_28, [
                                        createBaseVNode("div", _hoisted_29, [
                                          createBaseVNode("p", _hoisted_30, toDisplayString(example.title), 1),
                                          createBaseVNode("button", {
                                            onClick: ($event) => playExampleAudio(example.content),
                                            class: "p-1 text-green-600 hover:text-green-700 hover:bg-green-50/50 dark:text-green-400 dark:hover:text-green-300 dark:hover:bg-green-900/20 rounded transition-all duration-300 group",
                                            title: unref(t)("vocabulary.examples.playExample", "Play example")
                                          }, _cache[7] || (_cache[7] = [
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
                                        onClick: ($event) => deleteExample(example),
                                        class: "px-2 py-1.5 text-red-600 hover:text-red-700 hover:bg-red-50/50 dark:text-red-400 dark:hover:text-red-300 dark:hover:bg-red-900/20 rounded-md transition-all duration-300 text-sm"
                                      }, toDisplayString(unref(t)("common.delete", "Delete")), 9, _hoisted_37)
                                    ])
                                  ])
                                ]);
                              }), 128)),
                              getVocabExamplePages(vocab.id) > 1 ? (openBlock(), createElementBlock("div", _hoisted_38, [
                                createBaseVNode("div", _hoisted_39, [
                                  createBaseVNode("div", _hoisted_40, [
                                    createBaseVNode("button", {
                                      onClick: ($event) => previousExamplePage(vocab.id),
                                      disabled: !getExamplePaginationInfo(vocab.id).hasPrevious,
                                      class: "px-2 py-1 text-xs bg-slate-200 dark:bg-dark-bg-mute text-slate-700 dark:text-slate-300 rounded disabled:opacity-50 disabled:cursor-not-allowed hover:bg-slate-300 dark:hover:bg-slate-600 transition-colors"
                                    }, toDisplayString(unref(t)("common.previous", "Previous")), 9, _hoisted_41),
                                    createBaseVNode("span", _hoisted_42, toDisplayString(getExamplePaginationInfo(vocab.id).currentPage) + " / " + toDisplayString(getExamplePaginationInfo(vocab.id).totalPages), 1),
                                    createBaseVNode("button", {
                                      onClick: ($event) => nextExamplePage(vocab.id),
                                      disabled: !getExamplePaginationInfo(vocab.id).hasNext,
                                      class: "px-2 py-1 text-xs bg-slate-200 dark:bg-dark-bg-mute text-slate-700 dark:text-slate-300 rounded disabled:opacity-50 disabled:cursor-not-allowed hover:bg-slate-300 dark:hover:bg-slate-600 transition-colors"
                                    }, toDisplayString(unref(t)("common.next", "Next")), 9, _hoisted_43)
                                  ]),
                                  createBaseVNode("div", _hoisted_44, [
                                    createBaseVNode("button", {
                                      onClick: ($event) => previousExamplePage(vocab.id),
                                      disabled: !getExamplePaginationInfo(vocab.id).hasPrevious,
                                      class: "px-3 py-1.5 text-sm bg-slate-200 dark:bg-dark-bg-mute text-slate-700 dark:text-slate-300 rounded disabled:opacity-50 disabled:cursor-not-allowed hover:bg-slate-300 dark:hover:bg-slate-600 transition-colors"
                                    }, toDisplayString(unref(t)("common.previous", "Previous")), 9, _hoisted_45),
                                    createBaseVNode("div", _hoisted_46, [
                                      (openBlock(true), createElementBlock(Fragment, null, renderList(Math.min(getExamplePaginationInfo(vocab.id).totalPages, 5), (page) => {
                                        return openBlock(), createElementBlock("button", {
                                          key: page,
                                          onClick: ($event) => goToExamplePage(vocab.id, page),
                                          class: normalizeClass([
                                            "px-3 py-1.5 text-sm rounded transition-colors",
                                            getExamplePaginationInfo(vocab.id).currentPage === page ? "bg-blue-600 text-white" : "bg-slate-200 dark:bg-dark-bg-mute text-slate-700 dark:text-slate-300 hover:bg-slate-300 dark:hover:bg-slate-600"
                                          ])
                                        }, toDisplayString(page), 11, _hoisted_47);
                                      }), 128))
                                    ]),
                                    createBaseVNode("button", {
                                      onClick: ($event) => nextExamplePage(vocab.id),
                                      disabled: !getExamplePaginationInfo(vocab.id).hasNext,
                                      class: "px-3 py-1.5 text-sm bg-slate-200 dark:bg-dark-bg-mute text-slate-700 dark:text-slate-300 rounded disabled:opacity-50 disabled:cursor-not-allowed hover:bg-slate-300 dark:hover:bg-slate-600 transition-colors"
                                    }, toDisplayString(unref(t)("common.next", "Next")), 9, _hoisted_48)
                                  ]),
                                  createBaseVNode("div", _hoisted_49, toDisplayString(unref(t)("vocabulary.examples.showingExamples", { start: getExamplePaginationInfo(vocab.id).start, end: getExamplePaginationInfo(vocab.id).end, total: getExamplePaginationInfo(vocab.id).totalExamples }, "Showing {start} to {end} of {total} examples")), 1)
                                ])
                              ])) : createCommentVNode("", true)
                            ])) : createCommentVNode("", true)
                          ]),
                          _: 2
                        }, 1024)
                      ]);
                    }), 128))
                  ])
                ])) : createCommentVNode("", true)
              ]),
              _: 2
            }, 1024)
          ]);
        }), 128)),
        paginationInfo.value.totalPages > 1 ? (openBlock(), createElementBlock("div", _hoisted_50, [
          createBaseVNode("div", _hoisted_51, [
            createBaseVNode("div", _hoisted_52, [
              createBaseVNode("button", {
                onClick: previousPage,
                disabled: !paginationInfo.value.hasPrevious,
                class: "relative inline-flex items-center px-4 py-2 border border-gray-300 dark:border-gray-600 text-sm font-medium rounded-md text-gray-700 dark:text-gray-300 bg-white dark:bg-[#0a0a0a] hover:bg-gray-50 dark:hover:bg-gray-600 disabled:opacity-50 disabled:cursor-not-allowed"
              }, toDisplayString(unref(t)("common.previous", "Previous")), 9, _hoisted_53),
              createBaseVNode("button", {
                onClick: nextPage,
                disabled: !paginationInfo.value.hasNext,
                class: "ml-3 relative inline-flex items-center px-4 py-2 border border-gray-300 dark:border-gray-600 text-sm font-medium rounded-md text-gray-700 dark:text-gray-300 bg-white dark:bg-[#0a0a0a] hover:bg-gray-50 dark:hover:bg-gray-600 disabled:opacity-50 disabled:cursor-not-allowed"
              }, toDisplayString(unref(t)("common.next", "Next")), 9, _hoisted_54)
            ]),
            createBaseVNode("div", _hoisted_55, [
              createBaseVNode("div", null, [
                createBaseVNode("p", _hoisted_56, toDisplayString(unref(t)("vocabulary.examples.showingTopics", {
                  start: paginationInfo.value.startIndex,
                  end: paginationInfo.value.endIndex,
                  total: paginationInfo.value.totalTopics
                }, `Showing ${paginationInfo.value.startIndex} to ${paginationInfo.value.endIndex} of ${paginationInfo.value.totalTopics} topics`)), 1)
              ]),
              createBaseVNode("nav", _hoisted_57, [
                createBaseVNode("button", {
                  onClick: previousPage,
                  disabled: !paginationInfo.value.hasPrevious,
                  class: "relative inline-flex items-center px-2 py-2 rounded-l-md border border-gray-300 dark:border-gray-600 bg-white dark:bg-[#0a0a0a] text-sm font-medium text-gray-500 dark:text-gray-300 hover:bg-gray-50 dark:hover:bg-gray-600 disabled:opacity-50 disabled:cursor-not-allowed"
                }, [
                  createBaseVNode("span", _hoisted_59, toDisplayString(unref(t)("common.previous", "Previous")), 1),
                  _cache[8] || (_cache[8] = createBaseVNode("svg", {
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
                ], 8, _hoisted_58),
                (openBlock(true), createElementBlock(Fragment, null, renderList(visiblePages.value, (page) => {
                  return openBlock(), createElementBlock("button", {
                    key: page,
                    onClick: ($event) => goToPage(page),
                    class: normalizeClass([
                      page === currentPage.value ? "z-10 bg-blue-50 dark:bg-blue-900 border-blue-500 dark:border-blue-400 text-blue-600 dark:text-blue-300" : "bg-white dark:bg-[#0a0a0a] border-gray-300 dark:border-gray-600 text-gray-500 dark:text-gray-300 hover:bg-gray-50 dark:hover:bg-gray-600",
                      "relative inline-flex items-center px-4 py-2 border text-sm font-medium"
                    ])
                  }, toDisplayString(page), 11, _hoisted_60);
                }), 128)),
                createBaseVNode("button", {
                  onClick: nextPage,
                  disabled: !paginationInfo.value.hasNext,
                  class: "relative inline-flex items-center px-2 py-2 rounded-r-md border border-gray-300 dark:border-gray-600 bg-white dark:bg-[#0a0a0a] text-sm font-medium text-gray-500 dark:text-gray-300 hover:bg-gray-50 dark:hover:bg-gray-600 disabled:opacity-50 disabled:cursor-not-allowed"
                }, [
                  createBaseVNode("span", _hoisted_62, toDisplayString(unref(t)("common.next", "Next")), 1),
                  _cache[9] || (_cache[9] = createBaseVNode("svg", {
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
                ], 8, _hoisted_61)
              ])
            ])
          ])
        ])) : createCommentVNode("", true)
      ]);
    };
  }
});
const TopicGroupAccordion = /* @__PURE__ */ _export_sfc(_sfc_main, [["__scopeId", "data-v-4adbde6f"]]);
export {
  TopicGroupAccordion as default
};
//# sourceMappingURL=TopicGroupAccordion-CosPcpyz.js.map
