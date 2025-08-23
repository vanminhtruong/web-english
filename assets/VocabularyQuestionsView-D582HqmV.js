const __vite__mapDeps=(i,m=__vite__mapDeps,d=(m.f||(m.f=["assets/QuestionFormDialog-BkKg_eEI.js","assets/vendor-CKTvmtu5.js"])))=>i.map(i=>d[i]);
import { _ as __vitePreload } from "./index-NgYuwt7j.js";
import { d as defineComponent, M as useI18n, z as ref, D as computed, A as onMounted, c as createElementBlock, v as openBlock, V as createStaticVNode, f as createBaseVNode, b as createBlock, e as createCommentVNode, t as toDisplayString, u as unref, E as withDirectives, X as vModelText, Y as vModelSelect, F as Fragment, j as renderList, n as normalizeClass, g as createTextVNode, G as defineAsyncComponent } from "./vendor-CKTvmtu5.js";
import { u as useVocabularyStore } from "./useVocabularyStore-C5HdnbWt.js";
import "./vendor-toast-Blf0QbeM.js";
const _hoisted_1 = { class: "min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 dark:from-[#0a0a0a] dark:to-[#0f0f0f] relative overflow-x-hidden" };
const _hoisted_2 = { class: "relative z-10 max-w-full sm:max-w-full md:max-w-full lg:max-w-7xl mx-auto px-2 xs:px-3 sm:px-4 md:px-6 lg:px-8 xl:px-10 2xl:px-12 pt-3 sm:pt-6" };
const _hoisted_3 = { class: "group bg-white/80 dark:bg-[#0a0a0a]/80 backdrop-blur-md shadow-xl hover:shadow-2xl rounded-2xl border border-white/20 dark:border-white/10 transition-all duration-500 hover:scale-[1.005] p-2 xs:p-3 sm:p-4 md:p-5 lg:p-6 mb-3 xs:mb-4 sm:mb-6" };
const _hoisted_4 = { class: "flex items-center justify-between mb-4" };
const _hoisted_5 = { class: "flex items-center" };
const _hoisted_6 = { class: "text-lg sm:text-xl font-bold bg-gradient-to-r from-blue-600 to-indigo-600 dark:from-blue-400 dark:to-indigo-400 bg-clip-text text-transparent mb-2" };
const _hoisted_7 = { class: "text-sm sm:text-base text-gray-600 dark:text-gray-300" };
const _hoisted_8 = { class: "relative z-10 max-w-full sm:max-w-full md:max-w-full lg:max-w-7xl mx-auto py-3 px-2 xs:py-4 xs:px-3 sm:py-6 sm:px-4 md:px-6 lg:px-8 xl:px-10 2xl:px-12 overflow-x-hidden" };
const _hoisted_9 = { class: "group bg-white/80 dark:bg-[#0a0a0a]/80 backdrop-blur-md shadow-xl hover:shadow-2xl rounded-2xl border border-white/20 dark:border-white/10 transition-all duration-500 hover:scale-[1.005] mb-3 xs:mb-4 sm:mb-6 p-2 xs:p-3 sm:p-4 md:p-5 lg:p-6" };
const _hoisted_10 = { class: "flex items-center mb-4" };
const _hoisted_11 = { class: "text-base sm:text-lg font-semibold bg-gradient-to-r from-blue-600 to-purple-600 dark:from-blue-400 dark:to-purple-400 bg-clip-text text-transparent" };
const _hoisted_12 = { class: "grid grid-cols-1 md:grid-cols-3 gap-4" };
const _hoisted_13 = { class: "block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2" };
const _hoisted_14 = ["placeholder"];
const _hoisted_15 = { class: "block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2" };
const _hoisted_16 = { value: "" };
const _hoisted_17 = ["value"];
const _hoisted_18 = { class: "block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2" };
const _hoisted_19 = { value: "" };
const _hoisted_20 = { value: "multiple-choice" };
const _hoisted_21 = { value: "fill-blank" };
const _hoisted_22 = { value: "true-false" };
const _hoisted_23 = { value: "short-answer" };
const _hoisted_24 = { class: "relative z-10 max-w-full sm:max-w-full md:max-w-full lg:max-w-7xl mx-auto py-3 px-2 xs:py-4 xs:px-3 sm:py-6 sm:px-4 md:px-6 lg:px-8 xl:px-10 2xl:px-12 overflow-x-hidden" };
const _hoisted_25 = { class: "group bg-white/80 dark:bg-[#0a0a0a]/80 backdrop-blur-md shadow-xl hover:shadow-2xl rounded-2xl border border-white/20 dark:border-white/10 transition-all duration-500 hover:scale-[1.005] p-2 xs:p-3 sm:p-4 md:p-5 lg:p-6" };
const _hoisted_26 = { class: "flex items-center mb-4" };
const _hoisted_27 = { class: "text-base sm:text-lg font-semibold bg-gradient-to-r from-green-600 to-blue-600 dark:from-green-400 dark:to-blue-400 bg-clip-text text-transparent" };
const _hoisted_28 = { class: "space-y-4" };
const _hoisted_29 = {
  key: 0,
  class: "text-center py-8"
};
const _hoisted_30 = { class: "text-gray-500 dark:text-gray-400" };
const _hoisted_31 = { class: "flex items-start justify-between" };
const _hoisted_32 = { class: "flex-1" };
const _hoisted_33 = { class: "flex items-center gap-3 mb-3" };
const _hoisted_34 = {
  key: 1,
  class: "text-sm text-gray-600 dark:text-gray-400"
};
const _hoisted_35 = { class: "text-lg font-semibold text-gray-900 dark:text-white mb-2" };
const _hoisted_36 = {
  key: 0,
  class: "mb-3"
};
const _hoisted_37 = { class: "grid grid-cols-1 sm:grid-cols-2 gap-2" };
const _hoisted_38 = {
  key: 1,
  class: "mb-3"
};
const _hoisted_39 = { class: "text-sm text-gray-600 dark:text-gray-400" };
const _hoisted_40 = { class: "ml-2 px-2 py-1 bg-green-50/50 dark:bg-green-900/20 text-green-700 dark:text-green-400 rounded" };
const _hoisted_41 = {
  key: 2,
  class: "mb-3"
};
const _hoisted_42 = { class: "text-sm text-gray-600 dark:text-gray-400" };
const _hoisted_43 = { class: "text-xs text-gray-500 dark:text-gray-400" };
const _hoisted_44 = { class: "flex items-center gap-2 ml-4" };
const _hoisted_45 = ["onClick"];
const _hoisted_46 = ["onClick"];
const _sfc_main = /* @__PURE__ */ defineComponent({
  __name: "VocabularyQuestionsView",
  setup(__props) {
    const QuestionFormDialog = defineAsyncComponent(() => __vitePreload(() => import("./QuestionFormDialog-BkKg_eEI.js"), true ? __vite__mapDeps([0,1]) : void 0));
    const { t } = useI18n();
    const vocabularyStore = useVocabularyStore();
    const questions = ref([]);
    const showCreateDialog = ref(false);
    const showEditDialog = ref(false);
    const currentQuestion = ref(null);
    const searchTerm = ref("");
    const selectedVocabulary = ref("");
    const selectedType = ref("");
    const vocabularyList = computed(() => vocabularyStore.allVocabularies.value.map((v) => ({ id: v.id.toString(), word: v.word, meaning: v.meaning })));
    const filteredQuestions = computed(() => {
      let filtered = questions.value;
      if (searchTerm.value) {
        const term = searchTerm.value.toLowerCase();
        filtered = filtered.filter(
          (q) => q.question.toLowerCase().includes(term) || q.vocabulary?.word.toLowerCase().includes(term)
        );
      }
      if (selectedVocabulary.value) {
        filtered = filtered.filter((q) => q.vocabularyId === selectedVocabulary.value);
      }
      if (selectedType.value) {
        filtered = filtered.filter((q) => q.type === selectedType.value);
      }
      return filtered;
    });
    const loadQuestions = () => {
      const stored = localStorage.getItem("vocabulary-questions");
      if (stored) {
        questions.value = JSON.parse(stored);
        questions.value.forEach((question) => {
          const vocab = vocabularyList.value.find((v) => v.id === question.vocabularyId);
          if (vocab) {
            question.vocabulary = { id: vocab.id, word: vocab.word };
          }
        });
      }
    };
    const saveQuestionsToStorage = () => {
      localStorage.setItem("vocabulary-questions", JSON.stringify(questions.value));
    };
    const editQuestion = (question) => {
      currentQuestion.value = { ...question };
      showEditDialog.value = true;
    };
    const deleteQuestion = (question) => {
      if (confirm(t("vocabulary.questions.confirmDelete", "Are you sure you want to delete this question?"))) {
        questions.value = questions.value.filter((q) => q.id !== question.id);
        saveQuestionsToStorage();
      }
    };
    const saveQuestion = (questionData) => {
      if (currentQuestion.value && showEditDialog.value) {
        const index = questions.value.findIndex((q) => q.id === currentQuestion.value.id);
        if (index !== -1) {
          questions.value[index] = {
            ...questions.value[index],
            vocabularyId: questionData.vocabularyId || questions.value[index].vocabularyId,
            question: questionData.question || questions.value[index].question,
            type: questionData.type || questions.value[index].type,
            options: questionData.options || questions.value[index].options,
            correctAnswer: questionData.correctAnswer || questions.value[index].correctAnswer,
            difficulty: questionData.difficulty || questions.value[index].difficulty,
            explanation: questionData.explanation || questions.value[index].explanation,
            updatedAt: (/* @__PURE__ */ new Date()).toISOString()
          };
          const vocab = vocabularyList.value.find((v) => v.id === questions.value[index].vocabularyId);
          if (vocab) {
            questions.value[index].vocabulary = { id: vocab.id, word: vocab.word };
          }
        }
      } else {
        const newQuestion = {
          id: Date.now().toString(),
          vocabularyId: questionData.vocabularyId,
          question: questionData.question,
          type: questionData.type,
          options: questionData.options,
          correctAnswer: questionData.correctAnswer,
          difficulty: questionData.difficulty || "medium",
          explanation: questionData.explanation,
          createdAt: (/* @__PURE__ */ new Date()).toISOString(),
          updatedAt: (/* @__PURE__ */ new Date()).toISOString()
        };
        const vocab = vocabularyList.value.find((v) => v.id === newQuestion.vocabularyId);
        if (vocab) {
          newQuestion.vocabulary = { id: vocab.id, word: vocab.word };
        }
        questions.value.push(newQuestion);
      }
      saveQuestionsToStorage();
      closeDialog();
    };
    const openCreateDialog = () => {
      currentQuestion.value = null;
      showCreateDialog.value = true;
    };
    const closeDialog = () => {
      showCreateDialog.value = false;
      showEditDialog.value = false;
      currentQuestion.value = null;
    };
    const getTypeLabel = (type) => {
      const labels = {
        "multiple-choice": t("vocabulary.questions.types.multipleChoice", "Multiple Choice"),
        "fill-blank": t("vocabulary.questions.types.fillBlank", "Fill in the Blank"),
        "true-false": t("vocabulary.questions.types.trueFalse", "True/False"),
        "short-answer": t("vocabulary.questions.types.shortAnswer", "Short Answer")
      };
      return labels[type] || type;
    };
    const getTypeColorClass = (type) => {
      const classes = {
        "multiple-choice": "bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-300",
        "fill-blank": "bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-300",
        "true-false": "bg-yellow-100 text-yellow-800 dark:bg-yellow-900 dark:text-yellow-300",
        "short-answer": "bg-purple-100 text-purple-800 dark:bg-purple-900 dark:text-purple-300"
      };
      return classes[type] || "bg-gray-100 text-gray-800 dark:bg-gray-700 dark:text-gray-300";
    };
    const getDifficultyLabel = (difficulty) => {
      if (!difficulty) return "";
      const labels = {
        "easy": t("common.easy", "Easy"),
        "medium": t("vocabulary.questions.difficulty.medium", "Medium"),
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
    const formatDate = (dateString) => {
      return new Date(dateString).toLocaleDateString();
    };
    onMounted(() => {
      loadQuestions();
    });
    return (_ctx, _cache) => {
      return openBlock(), createElementBlock("div", _hoisted_1, [
        _cache[7] || (_cache[7] = createStaticVNode('<div class="absolute inset-0 overflow-hidden pointer-events-none z-0"><div class="floating-shapes"><div class="absolute top-20 left-10 w-64 h-64 bg-blue-300 dark:bg-blue-500 rounded-full mix-blend-multiply dark:mix-blend-normal filter blur-xl opacity-30 animate-blob"></div><div class="absolute top-40 right-10 w-72 h-72 bg-purple-300 dark:bg-purple-500 rounded-full mix-blend-multiply dark:mix-blend-normal filter blur-xl opacity-30 animate-blob animation-delay-2000"></div><div class="absolute -bottom-8 left-20 w-80 h-80 bg-pink-300 dark:bg-pink-500 rounded-full mix-blend-multiply dark:mix-blend-normal filter blur-xl opacity-30 animate-blob animation-delay-4000"></div><div class="hidden sm:block absolute top-10 left-1/2 -translate-x-1/2 w-40 h-40 bg-cyan-300 dark:bg-cyan-500 rounded-full mix-blend-multiply dark:mix-blend-normal filter blur-xl opacity-25 animate-blob animation-delay-1000"></div><div class="hidden sm:block absolute bottom-24 right-24 w-52 h-52 bg-indigo-300 dark:bg-indigo-500 rounded-full mix-blend-multiply dark:mix-blend-normal filter blur-xl opacity-25 animate-blob animation-delay-3000"></div></div></div>', 1)),
        createBaseVNode("div", _hoisted_2, [
          createBaseVNode("div", _hoisted_3, [
            createBaseVNode("div", _hoisted_4, [
              createBaseVNode("div", _hoisted_5, [
                _cache[3] || (_cache[3] = createBaseVNode("div", { class: "animate-pulse-slow" }, [
                  createBaseVNode("div", { class: "w-2.5 h-2.5 bg-gradient-to-r from-blue-400 to-indigo-500 rounded-full mr-2.5" })
                ], -1)),
                createBaseVNode("div", null, [
                  createBaseVNode("h1", _hoisted_6, toDisplayString(unref(t)("vocabulary.questions.title", "Question Manager")), 1),
                  createBaseVNode("p", _hoisted_7, toDisplayString(unref(t)("vocabulary.questions.description", "Create and manage questions based on your vocabulary words")), 1)
                ])
              ]),
              createBaseVNode("button", {
                onClick: openCreateDialog,
                class: "px-4 sm:px-6 py-2 sm:py-3 bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-700 hover:to-indigo-700 text-white rounded-lg font-medium transition-all duration-300 shadow-lg hover:shadow-xl"
              }, toDisplayString(unref(t)("vocabulary.questions.addQuestion", "Add New Question")), 1)
            ])
          ])
        ]),
        createBaseVNode("div", _hoisted_8, [
          createBaseVNode("div", _hoisted_9, [
            createBaseVNode("div", _hoisted_10, [
              _cache[4] || (_cache[4] = createBaseVNode("div", { class: "animate-pulse-slow" }, [
                createBaseVNode("div", { class: "w-2.5 h-2.5 bg-gradient-to-r from-blue-400 to-purple-500 rounded-full mr-2.5" })
              ], -1)),
              createBaseVNode("h3", _hoisted_11, toDisplayString(unref(t)("vocabulary.filters.title", "Filters")), 1)
            ]),
            createBaseVNode("div", _hoisted_12, [
              createBaseVNode("div", null, [
                createBaseVNode("label", _hoisted_13, toDisplayString(unref(t)("vocabulary.questions.searchQuestions", "Search questions...")), 1),
                withDirectives(createBaseVNode("input", {
                  "onUpdate:modelValue": _cache[0] || (_cache[0] = ($event) => searchTerm.value = $event),
                  type: "text",
                  placeholder: unref(t)("vocabulary.questions.searchQuestions", "Search questions..."),
                  class: "w-full px-3 py-2 border border-gray-300 dark:border-dark-bg-mute rounded-lg bg-white/50 dark:bg-[#0a0a0a]/50 backdrop-blur-sm focus:ring-2 focus:ring-blue-500 focus:border-transparent text-gray-900 dark:text-white transition-all duration-300"
                }, null, 8, _hoisted_14), [
                  [vModelText, searchTerm.value]
                ])
              ]),
              createBaseVNode("div", null, [
                createBaseVNode("label", _hoisted_15, toDisplayString(unref(t)("vocabulary.questions.filterByVocabulary", "Filter by vocabulary")), 1),
                withDirectives(createBaseVNode("select", {
                  "onUpdate:modelValue": _cache[1] || (_cache[1] = ($event) => selectedVocabulary.value = $event),
                  class: "w-full px-3 py-2 border border-gray-300 dark:border-dark-bg-mute rounded-lg bg-white/50 dark:bg-[#0a0a0a]/50 backdrop-blur-sm text-gray-900 dark:text-white transition-all duration-300"
                }, [
                  createBaseVNode("option", _hoisted_16, toDisplayString(unref(t)("vocabulary.questions.allVocabulary", "All Vocabulary")), 1),
                  (openBlock(true), createElementBlock(Fragment, null, renderList(vocabularyList.value, (vocab) => {
                    return openBlock(), createElementBlock("option", {
                      key: vocab.id,
                      value: vocab.id
                    }, toDisplayString(vocab.word) + " - " + toDisplayString(vocab.meaning), 9, _hoisted_17);
                  }), 128))
                ], 512), [
                  [vModelSelect, selectedVocabulary.value]
                ])
              ]),
              createBaseVNode("div", null, [
                createBaseVNode("label", _hoisted_18, toDisplayString(unref(t)("vocabulary.questions.filterByType", "Filter by type")), 1),
                withDirectives(createBaseVNode("select", {
                  "onUpdate:modelValue": _cache[2] || (_cache[2] = ($event) => selectedType.value = $event),
                  class: "w-full px-3 py-2 border border-gray-300 dark:border-dark-bg-mute rounded-lg bg-white/50 dark:bg-[#0a0a0a]/50 backdrop-blur-sm text-gray-900 dark:text-white transition-all duration-300"
                }, [
                  createBaseVNode("option", _hoisted_19, toDisplayString(unref(t)("vocabulary.questions.allTypes", "All Types")), 1),
                  createBaseVNode("option", _hoisted_20, toDisplayString(unref(t)("vocabulary.questions.multipleChoice", "Multiple Choice")), 1),
                  createBaseVNode("option", _hoisted_21, toDisplayString(unref(t)("vocabulary.questions.fillBlank", "Fill in the Blank")), 1),
                  createBaseVNode("option", _hoisted_22, toDisplayString(unref(t)("vocabulary.questions.trueFalse", "True/False")), 1),
                  createBaseVNode("option", _hoisted_23, toDisplayString(unref(t)("vocabulary.questions.shortAnswer", "Short Answer")), 1)
                ], 512), [
                  [vModelSelect, selectedType.value]
                ])
              ])
            ])
          ])
        ]),
        createBaseVNode("div", _hoisted_24, [
          createBaseVNode("div", _hoisted_25, [
            createBaseVNode("div", _hoisted_26, [
              _cache[5] || (_cache[5] = createBaseVNode("div", { class: "animate-pulse-slow" }, [
                createBaseVNode("div", { class: "w-2.5 h-2.5 bg-gradient-to-r from-green-400 to-blue-500 rounded-full mr-2.5" })
              ], -1)),
              createBaseVNode("h3", _hoisted_27, toDisplayString(unref(t)("vocabulary.questions.title", "Questions List")), 1)
            ]),
            createBaseVNode("div", _hoisted_28, [
              filteredQuestions.value.length === 0 ? (openBlock(), createElementBlock("div", _hoisted_29, [
                _cache[6] || (_cache[6] = createBaseVNode("div", { class: "animate-pulse-slow" }, [
                  createBaseVNode("div", { class: "w-3 h-3 bg-gradient-to-r from-gray-400 to-gray-500 rounded-full mx-auto mb-3" })
                ], -1)),
                createBaseVNode("p", _hoisted_30, toDisplayString(unref(t)("vocabulary.questions.noQuestions", "No questions found")), 1)
              ])) : createCommentVNode("", true),
              (openBlock(true), createElementBlock(Fragment, null, renderList(filteredQuestions.value, (question) => {
                return openBlock(), createElementBlock("div", {
                  key: question.id,
                  class: "bg-white/60 dark:bg-[#0a0a0a]/60 backdrop-blur-sm rounded-xl border border-white/20 dark:border-white/10 p-3 sm:p-4 md:p-5 hover:shadow-lg transition-all duration-300 hover:scale-[1.002]"
                }, [
                  createBaseVNode("div", _hoisted_31, [
                    createBaseVNode("div", _hoisted_32, [
                      createBaseVNode("div", _hoisted_33, [
                        createBaseVNode("span", {
                          class: normalizeClass(["px-2 py-1 text-xs font-medium rounded-full", getTypeColorClass(question.type)])
                        }, toDisplayString(getTypeLabel(question.type)), 3),
                        question.difficulty ? (openBlock(), createElementBlock("span", {
                          key: 0,
                          class: normalizeClass(["px-2 py-1 text-xs font-medium rounded-full", getDifficultyColorClass(question.difficulty)])
                        }, toDisplayString(getDifficultyLabel(question.difficulty)), 3)) : createCommentVNode("", true),
                        question.vocabulary ? (openBlock(), createElementBlock("span", _hoisted_34, toDisplayString(question.vocabulary.word), 1)) : createCommentVNode("", true)
                      ]),
                      createBaseVNode("h3", _hoisted_35, toDisplayString(question.question), 1),
                      question.options && question.type === "multiple-choice" ? (openBlock(), createElementBlock("div", _hoisted_36, [
                        createBaseVNode("div", _hoisted_37, [
                          (openBlock(true), createElementBlock(Fragment, null, renderList(question.options, (option, index) => {
                            return openBlock(), createElementBlock("div", {
                              key: index,
                              class: normalizeClass(["px-3 py-2 bg-white/50 dark:bg-[#0a0a0a]/50 backdrop-blur-sm rounded border border-gray-200 dark:border-white/10", { "border-green-500 bg-green-50/50 dark:bg-green-900/20": index === Number(question.correctAnswer) }])
                            }, toDisplayString(option), 3);
                          }), 128))
                        ])
                      ])) : (openBlock(), createElementBlock("div", _hoisted_38, [
                        createBaseVNode("p", _hoisted_39, [
                          createBaseVNode("strong", null, toDisplayString(unref(t)("vocabulary.questions.correctAnswer", "Correct Answer")) + ":", 1),
                          createBaseVNode("span", _hoisted_40, toDisplayString(question.correctAnswer), 1)
                        ])
                      ])),
                      question.explanation ? (openBlock(), createElementBlock("div", _hoisted_41, [
                        createBaseVNode("p", _hoisted_42, [
                          createBaseVNode("strong", null, toDisplayString(unref(t)("vocabulary.questions.explanation", "Explanation")) + ":", 1),
                          createTextVNode(" " + toDisplayString(question.explanation), 1)
                        ])
                      ])) : createCommentVNode("", true),
                      createBaseVNode("p", _hoisted_43, toDisplayString(unref(t)("vocabulary.questions.createdAt", "Created At")) + ": " + toDisplayString(formatDate(question.createdAt)), 1)
                    ]),
                    createBaseVNode("div", _hoisted_44, [
                      createBaseVNode("button", {
                        onClick: ($event) => editQuestion(question),
                        class: "px-3 py-2 text-blue-600 hover:text-blue-700 hover:bg-blue-50/50 dark:text-blue-400 dark:hover:text-blue-300 dark:hover:bg-blue-900/20 rounded-lg transition-all duration-300"
                      }, toDisplayString(unref(t)("common.edit", "Edit")), 9, _hoisted_45),
                      createBaseVNode("button", {
                        onClick: ($event) => deleteQuestion(question),
                        class: "px-3 py-2 text-red-600 hover:text-red-700 hover:bg-red-50/50 dark:text-red-400 dark:hover:text-red-300 dark:hover:bg-red-900/20 rounded-lg transition-all duration-300"
                      }, toDisplayString(unref(t)("common.delete", "Delete")), 9, _hoisted_46)
                    ])
                  ])
                ]);
              }), 128))
            ])
          ])
        ]),
        showCreateDialog.value || showEditDialog.value ? (openBlock(), createBlock(unref(QuestionFormDialog), {
          key: 0,
          show: showCreateDialog.value || showEditDialog.value,
          question: currentQuestion.value,
          "vocabulary-list": vocabularyList.value,
          onClose: closeDialog,
          onSave: saveQuestion
        }, null, 8, ["show", "question", "vocabulary-list"])) : createCommentVNode("", true)
      ]);
    };
  }
});
export {
  _sfc_main as default
};
//# sourceMappingURL=VocabularyQuestionsView-D582HqmV.js.map
