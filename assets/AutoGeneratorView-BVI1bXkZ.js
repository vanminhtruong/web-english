import { d as defineComponent, M as useI18n, z as ref, D as computed, c as createElementBlock, v as openBlock, V as createStaticVNode, f as createBaseVNode, t as toDisplayString, u as unref, e as createCommentVNode, n as normalizeClass, E as withDirectives, X as vModelText, Y as vModelSelect, F as Fragment, j as renderList } from "./vendor-CKTvmtu5.js";
import { u as useVocabularyStore } from "./useVocabularyStore-C5HdnbWt.js";
import { u as useToast, P as POSITION } from "./vendor-toast-Blf0QbeM.js";
import { _ as _export_sfc } from "./_plugin-vue_export-helper-1tPrXgE0.js";
const _hoisted_1 = { class: "min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 dark:from-[#0a0a0a] dark:to-[#0f0f0f] relative overflow-x-hidden" };
const _hoisted_2 = { class: "relative z-10 max-w-full sm:max-w-full md:max-w-full lg:max-w-7xl mx-auto px-2 xs:px-3 sm:px-4 md:px-6 lg:px-8 xl:px-10 2xl:px-12 pt-3 sm:pt-6" };
const _hoisted_3 = { class: "group bg-white/80 dark:bg-[#0a0a0a]/80 backdrop-blur-md shadow-xl hover:shadow-2xl rounded-2xl border border-white/20 dark:border-white/10 transition-all duration-500 hover:scale-[1.005] p-2 xs:p-3 sm:p-4 md:p-5 lg:p-6 mb-3 xs:mb-4 sm:mb-6" };
const _hoisted_4 = { class: "flex items-center mb-4" };
const _hoisted_5 = { class: "text-lg sm:text-xl font-bold bg-gradient-to-r from-purple-600 to-pink-600 dark:from-purple-400 dark:to-pink-400 bg-clip-text text-transparent" };
const _hoisted_6 = { class: "text-sm sm:text-base text-gray-600 dark:text-gray-300 mb-4" };
const _hoisted_7 = { class: "relative z-10 max-w-full sm:max-w-full md:max-w-full lg:max-w-7xl mx-auto py-3 px-2 xs:py-4 xs:px-3 sm:py-6 sm:px-4 md:px-6 lg:px-8 xl:px-10 2xl:px-12 overflow-x-hidden" };
const _hoisted_8 = { class: "grid gap-6 md:grid-cols-2 lg:grid-cols-3 mb-6" };
const _hoisted_9 = { class: "group bg-white/80 dark:bg-[#0a0a0a]/80 backdrop-blur-md shadow-xl hover:shadow-2xl rounded-2xl border border-white/20 dark:border-white/10 transition-all duration-500 hover:scale-[1.02] p-4 sm:p-6" };
const _hoisted_10 = { class: "flex items-center mb-4" };
const _hoisted_11 = { class: "text-base sm:text-lg font-semibold text-gray-800 dark:text-white" };
const _hoisted_12 = { class: "text-sm text-gray-600 dark:text-gray-300 mb-4" };
const _hoisted_13 = { class: "group bg-white/80 dark:bg-[#0a0a0a]/80 backdrop-blur-md shadow-xl hover:shadow-2xl rounded-2xl border border-white/20 dark:border-white/10 transition-all duration-500 hover:scale-[1.02] p-4 sm:p-6" };
const _hoisted_14 = { class: "flex items-center mb-4" };
const _hoisted_15 = { class: "text-base sm:text-lg font-semibold text-gray-800 dark:text-white" };
const _hoisted_16 = { class: "text-sm text-gray-600 dark:text-gray-300 mb-4" };
const _hoisted_17 = { class: "group bg-white/80 dark:bg-[#0a0a0a]/80 backdrop-blur-md shadow-xl hover:shadow-2xl rounded-2xl border border-white/20 dark:border-white/10 transition-all duration-500 hover:scale-[1.02] p-4 sm:p-6" };
const _hoisted_18 = { class: "flex items-center mb-4" };
const _hoisted_19 = { class: "text-base sm:text-lg font-semibold text-gray-800 dark:text-white" };
const _hoisted_20 = { class: "text-sm text-gray-600 dark:text-gray-300 mb-4" };
const _hoisted_21 = {
  key: 0,
  class: "bg-white/80 dark:bg-[#0a0a0a]/80 backdrop-blur-md shadow-xl rounded-2xl border border-white/20 dark:border-white/10 p-4 sm:p-6 mb-6"
};
const _hoisted_22 = {
  key: 0,
  class: "space-y-6"
};
const _hoisted_23 = { class: "flex items-center mb-4" };
const _hoisted_24 = { class: "text-lg font-semibold text-gray-800 dark:text-white" };
const _hoisted_25 = { class: "block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2" };
const _hoisted_26 = ["placeholder", "disabled"];
const _hoisted_27 = { class: "grid gap-4 md:grid-cols-2" };
const _hoisted_28 = { class: "block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2" };
const _hoisted_29 = ["disabled"];
const _hoisted_30 = { value: "beginner" };
const _hoisted_31 = { value: "intermediate" };
const _hoisted_32 = { value: "advanced" };
const _hoisted_33 = { value: "mixed" };
const _hoisted_34 = { class: "block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2" };
const _hoisted_35 = ["disabled"];
const _hoisted_36 = { class: "flex justify-end mt-6" };
const _hoisted_37 = ["disabled"];
const _hoisted_38 = {
  key: 0,
  class: "animate-spin w-5 h-5",
  fill: "none",
  viewBox: "0 0 24 24"
};
const _hoisted_39 = {
  key: 1,
  class: "w-5 h-5",
  fill: "currentColor",
  viewBox: "0 0 20 20"
};
const _hoisted_40 = {
  key: 1,
  class: "bg-white/80 dark:bg-[#0a0a0a]/80 backdrop-blur-md shadow-xl rounded-2xl border border-white/20 dark:border-white/10 p-4 sm:p-6"
};
const _hoisted_41 = { class: "flex items-center justify-between mb-6" };
const _hoisted_42 = { class: "flex items-center" };
const _hoisted_43 = { class: "text-lg font-semibold text-gray-800 dark:text-white" };
const _hoisted_44 = { class: "flex space-x-2" };
const _hoisted_45 = ["disabled"];
const _hoisted_46 = { class: "grid gap-4 md:grid-cols-2 lg:grid-cols-3" };
const _hoisted_47 = { class: "flex items-start justify-between mb-2" };
const _hoisted_48 = { class: "font-semibold text-gray-800 dark:text-white text-lg" };
const _hoisted_49 = { class: "text-xs px-2 py-1 bg-blue-100 dark:bg-blue-900/30 text-blue-600 dark:text-blue-400 rounded-full" };
const _hoisted_50 = { class: "text-sm text-gray-600 dark:text-gray-300 mb-3" };
const _hoisted_51 = {
  key: 0,
  class: "text-xs text-gray-500 dark:text-gray-400 italic border-l-2 border-gray-300 dark:border-gray-600 pl-2"
};
const _sfc_main = /* @__PURE__ */ defineComponent({
  __name: "AutoGeneratorView",
  setup(__props) {
    const { t } = useI18n();
    const vocabularyStore = useVocabularyStore();
    const toast = useToast();
    const selectedMethod = ref(null);
    const textInput = ref("");
    const selectedTopic = ref("");
    const aiPreferences = ref("");
    const difficultyLevel = ref("intermediate");
    const maxWords = ref("20");
    ref("vocabulary");
    const isGenerating = ref(false);
    const isSaving = ref(false);
    const generatedWords = ref([]);
    const canGenerate = computed(() => {
      if (selectedMethod.value === "text") {
        return textInput.value.trim().length > 10;
      } else if (selectedMethod.value === "topic") {
        return selectedTopic.value !== "";
      } else if (selectedMethod.value === "ai") {
        return aiPreferences.value.trim().length > 5;
      }
      return false;
    });
    const generateVocabulary = async () => {
      if (!canGenerate.value || isGenerating.value) return;
      isGenerating.value = true;
      try {
        await new Promise((resolve) => setTimeout(resolve, 2e3));
        generatedWords.value = generateMockWords();
      } catch (error) {
        console.error("Error generating vocabulary:", error);
      } finally {
        isGenerating.value = false;
      }
    };
    const generateMockWords = () => {
      const mockWords = [
        { word: "Articulate", meaning: "Having or showing the ability to speak fluently and coherently", type: "Adjective", example: "She gave an articulate presentation to the board." },
        { word: "Resilience", meaning: "The capacity to recover quickly from difficulties", type: "Noun", example: "His resilience helped him overcome many challenges." },
        { word: "Innovative", meaning: "Featuring new methods; advanced and original", type: "Adjective", example: "The company is known for its innovative products." },
        { word: "Collaborate", meaning: "Work jointly on an activity", type: "Verb", example: "We need to collaborate to complete this project." },
        { word: "Efficient", meaning: "Achieving maximum productivity with minimum effort", type: "Adjective", example: "The new system is more efficient than the old one." }
      ];
      const count = Math.min(parseInt(maxWords.value), 10);
      return mockWords.slice(0, count);
    };
    const saveAllWords = async () => {
      if (generatedWords.value.length === 0) return;
      isSaving.value = true;
      try {
        let savedCount = 0;
        for (const word of generatedWords.value) {
          const vocabularyData = {
            word: word.word,
            pronunciation: "",
            // Would be generated by TTS or manual input
            partOfSpeech: word.type,
            meaning: word.meaning,
            example: word.example || "",
            category: selectedTopic.value || "uncategorized",
            level: difficultyLevel.value,
            synonyms: [],
            antonyms: [],
            notes: `Generated via ${selectedMethod.value} method`,
            favorite: false,
            image: void 0
          };
          const result = vocabularyStore.addVocabulary(vocabularyData);
          if (result) {
            savedCount++;
          }
        }
        toast.success(
          t("autoGenerator.saveSuccess", `Successfully saved ${savedCount} words to your vocabulary list`),
          {
            position: POSITION.TOP_RIGHT,
            timeout: 3e3
          }
        );
        generatedWords.value = [];
        selectedMethod.value = null;
        textInput.value = "";
        selectedTopic.value = "";
        aiPreferences.value = "";
      } catch (error) {
        console.error("Error saving vocabulary:", error);
        toast.error(
          t("autoGenerator.saveError", "Failed to save vocabulary words"),
          {
            position: POSITION.TOP_RIGHT,
            timeout: 3e3
          }
        );
      } finally {
        isSaving.value = false;
      }
    };
    const clearGenerated = () => {
      generatedWords.value = [];
    };
    return (_ctx, _cache) => {
      return openBlock(), createElementBlock("div", _hoisted_1, [
        _cache[16] || (_cache[16] = createStaticVNode('<div class="absolute inset-0 overflow-hidden pointer-events-none z-0" data-v-c4401a47><div class="floating-shapes" data-v-c4401a47><div class="absolute top-20 left-10 w-64 h-64 bg-blue-300 dark:bg-blue-500 rounded-full mix-blend-multiply dark:mix-blend-normal filter blur-xl opacity-30 animate-blob" data-v-c4401a47></div><div class="absolute top-40 right-10 w-72 h-72 bg-purple-300 dark:bg-purple-500 rounded-full mix-blend-multiply dark:mix-blend-normal filter blur-xl opacity-30 animate-blob animation-delay-2000" data-v-c4401a47></div><div class="absolute -bottom-8 left-20 w-80 h-80 bg-pink-300 dark:bg-pink-500 rounded-full mix-blend-multiply dark:mix-blend-normal filter blur-xl opacity-30 animate-blob animation-delay-4000" data-v-c4401a47></div></div></div>', 1)),
        createBaseVNode("div", _hoisted_2, [
          createBaseVNode("div", _hoisted_3, [
            createBaseVNode("div", _hoisted_4, [
              _cache[6] || (_cache[6] = createBaseVNode("div", { class: "animate-pulse-slow" }, [
                createBaseVNode("div", { class: "w-2.5 h-2.5 bg-gradient-to-r from-purple-400 to-pink-500 rounded-full mr-2.5" })
              ], -1)),
              createBaseVNode("h1", _hoisted_5, toDisplayString(unref(t)("autoGenerator.title", "Auto Generator")), 1)
            ]),
            createBaseVNode("p", _hoisted_6, toDisplayString(unref(t)("autoGenerator.description", "Generate vocabulary words automatically from text, topics, or AI suggestions")), 1)
          ])
        ]),
        createBaseVNode("div", _hoisted_7, [
          createBaseVNode("div", _hoisted_8, [
            createBaseVNode("div", _hoisted_9, [
              createBaseVNode("div", _hoisted_10, [
                _cache[7] || (_cache[7] = createBaseVNode("div", { class: "w-12 h-12 bg-gradient-to-r from-blue-500 to-cyan-500 rounded-full flex items-center justify-center mr-3" }, [
                  createBaseVNode("svg", {
                    class: "w-6 h-6 text-white",
                    fill: "currentColor",
                    viewBox: "0 0 20 20"
                  }, [
                    createBaseVNode("path", {
                      "fill-rule": "evenodd",
                      d: "M4 4a2 2 0 012-2h8a2 2 0 012 2v12a1 1 0 110 2h-3a1 1 0 01-1-1v-2a1 1 0 00-1-1H9a1 1 0 00-1 1v2a1 1 0 01-1 1H4a1 1 0 110-2V4zm3 1h2v2H7V5zm2 4H7v2h2V9zm2-4h2v2h-2V5zm2 4h-2v2h2V9z",
                      "clip-rule": "evenodd"
                    })
                  ])
                ], -1)),
                createBaseVNode("h3", _hoisted_11, toDisplayString(unref(t)("autoGenerator.methods.textAnalysis", "Text Analysis")), 1)
              ]),
              createBaseVNode("p", _hoisted_12, toDisplayString(unref(t)("autoGenerator.methods.textAnalysisDesc", "Extract vocabulary from articles, books, or any text content")), 1),
              createBaseVNode("button", {
                onClick: _cache[0] || (_cache[0] = ($event) => selectedMethod.value = "text"),
                class: normalizeClass([
                  "w-full py-2 px-4 rounded-lg font-medium transition-all duration-200",
                  selectedMethod.value === "text" ? "bg-gradient-to-r from-blue-500 to-cyan-500 text-white shadow-lg" : "bg-gray-100 dark:bg-dark-bg-mute text-gray-700 dark:text-gray-300 hover:bg-gray-200 dark:hover:bg-dark-bg-soft"
                ])
              }, toDisplayString(unref(t)("common.select", "Select")), 3)
            ]),
            createBaseVNode("div", _hoisted_13, [
              createBaseVNode("div", _hoisted_14, [
                _cache[8] || (_cache[8] = createBaseVNode("div", { class: "w-12 h-12 bg-gradient-to-r from-green-500 to-teal-500 rounded-full flex items-center justify-center mr-3" }, [
                  createBaseVNode("svg", {
                    class: "w-6 h-6 text-white",
                    fill: "currentColor",
                    viewBox: "0 0 20 20"
                  }, [
                    createBaseVNode("path", { d: "M7 3a1 1 0 000 2h6a1 1 0 100-2H7zM4 7a1 1 0 011-1h10a1 1 0 110 2H5a1 1 0 01-1-1zM2 11a2 2 0 012-2h12a2 2 0 012 2v4a2 2 0 01-2 2H4a2 2 0 01-2-2v-4z" })
                  ])
                ], -1)),
                createBaseVNode("h3", _hoisted_15, toDisplayString(unref(t)("autoGenerator.methods.topicBased", "Topic-based")), 1)
              ]),
              createBaseVNode("p", _hoisted_16, toDisplayString(unref(t)("autoGenerator.methods.topicBasedDesc", "Generate words based on specific topics or categories")), 1),
              createBaseVNode("button", {
                onClick: _cache[1] || (_cache[1] = ($event) => selectedMethod.value = "topic"),
                class: normalizeClass([
                  "w-full py-2 px-4 rounded-lg font-medium transition-all duration-200",
                  selectedMethod.value === "topic" ? "bg-gradient-to-r from-green-500 to-teal-500 text-white shadow-lg" : "bg-gray-100 dark:bg-dark-bg-mute text-gray-700 dark:text-gray-300 hover:bg-gray-200 dark:hover:bg-dark-bg-soft"
                ])
              }, toDisplayString(unref(t)("common.select", "Select")), 3)
            ]),
            createBaseVNode("div", _hoisted_17, [
              createBaseVNode("div", _hoisted_18, [
                _cache[9] || (_cache[9] = createBaseVNode("div", { class: "w-12 h-12 bg-gradient-to-r from-purple-500 to-pink-500 rounded-full flex items-center justify-center mr-3" }, [
                  createBaseVNode("svg", {
                    class: "w-6 h-6 text-white",
                    fill: "currentColor",
                    viewBox: "0 0 20 20"
                  }, [
                    createBaseVNode("path", {
                      "fill-rule": "evenodd",
                      d: "M11.49 3.17c-.38-1.56-2.6-1.56-2.98 0a1.532 1.532 0 01-2.286.948c-1.372-.836-2.942.734-2.106 2.106.54.886.061 2.042-.947 2.287-1.561.379-1.561 2.6 0 2.978a1.532 1.532 0 01.947 2.287c-.836 1.372.734 2.942 2.106 2.106a1.532 1.532 0 012.287.947c.379 1.561 2.6 1.561 2.978 0a1.533 1.533 0 012.287-.947c1.372.836 2.942-.734 2.106-2.106a1.533 1.533 0 01.947-2.287c1.561-.379 1.561-2.6 0-2.978a1.532 1.532 0 01-.947-2.287c.836-1.372-.734-2.942-2.106-2.106a1.532 1.532 0 01-2.287-.947zM10 13a3 3 0 100-6 3 3 0 000 6z",
                      "clip-rule": "evenodd"
                    })
                  ])
                ], -1)),
                createBaseVNode("h3", _hoisted_19, toDisplayString(unref(t)("autoGenerator.methods.aiSuggestions", "AI Suggestions")), 1)
              ]),
              createBaseVNode("p", _hoisted_20, toDisplayString(unref(t)("autoGenerator.methods.aiSuggestionsDesc", "Get intelligent word suggestions based on your learning level")), 1),
              createBaseVNode("button", {
                onClick: _cache[2] || (_cache[2] = ($event) => selectedMethod.value = "ai"),
                class: normalizeClass([
                  "w-full py-2 px-4 rounded-lg font-medium transition-all duration-200",
                  selectedMethod.value === "ai" ? "bg-gradient-to-r from-purple-500 to-pink-500 text-white shadow-lg" : "bg-gray-100 dark:bg-dark-bg-mute text-gray-700 dark:text-gray-300 hover:bg-gray-200 dark:hover:bg-dark-bg-soft"
                ])
              }, toDisplayString(unref(t)("common.select", "Select")), 3)
            ])
          ]),
          selectedMethod.value ? (openBlock(), createElementBlock("div", _hoisted_21, [
            selectedMethod.value === "text" ? (openBlock(), createElementBlock("div", _hoisted_22, [
              createBaseVNode("div", _hoisted_23, [
                _cache[10] || (_cache[10] = createBaseVNode("div", { class: "w-8 h-8 bg-gradient-to-r from-blue-500 to-cyan-500 rounded-full flex items-center justify-center mr-3" }, [
                  createBaseVNode("svg", {
                    class: "w-4 h-4 text-white",
                    fill: "currentColor",
                    viewBox: "0 0 20 20"
                  }, [
                    createBaseVNode("path", {
                      "fill-rule": "evenodd",
                      d: "M4 4a2 2 0 012-2h8a2 2 0 012 2v12a1 1 0 110 2h-3a1 1 0 01-1-1v-2a1 1 0 00-1-1H9a1 1 0 00-1 1v2a1 1 0 01-1 1H4a1 1 0 110-2V4zm3 1h2v2H7V5zm2 4H7v2h2V9zm2-4h2v2h-2V5zm2 4h-2v2h2V9z",
                      "clip-rule": "evenodd"
                    })
                  ])
                ], -1)),
                createBaseVNode("h3", _hoisted_24, toDisplayString(unref(t)("autoGenerator.forms.textAnalysis.title", "Analyze Text Content")), 1)
              ]),
              createBaseVNode("div", null, [
                createBaseVNode("label", _hoisted_25, toDisplayString(unref(t)("autoGenerator.forms.textAnalysis.inputLabel", "Paste your text content here:")), 1),
                withDirectives(createBaseVNode("textarea", {
                  "onUpdate:modelValue": _cache[3] || (_cache[3] = ($event) => textInput.value = $event),
                  placeholder: unref(t)("autoGenerator.forms.textAnalysis.placeholder", "Paste article, book excerpt, or any English text..."),
                  class: "w-full h-40 px-4 py-3 border border-gray-300 dark:border-dark-bg-mute rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent bg-white dark:bg-dark-bg-soft text-gray-900 dark:text-white resize-none",
                  disabled: isGenerating.value
                }, null, 8, _hoisted_26), [
                  [vModelText, textInput.value]
                ])
              ]),
              createBaseVNode("div", _hoisted_27, [
                createBaseVNode("div", null, [
                  createBaseVNode("label", _hoisted_28, toDisplayString(unref(t)("autoGenerator.forms.common.difficultyLevel", "Difficulty Level")), 1),
                  withDirectives(createBaseVNode("select", {
                    "onUpdate:modelValue": _cache[4] || (_cache[4] = ($event) => difficultyLevel.value = $event),
                    class: "w-full px-4 py-2 border border-gray-300 dark:border-dark-bg-mute rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent bg-white dark:bg-dark-bg-soft text-gray-900 dark:text-white",
                    disabled: isGenerating.value
                  }, [
                    createBaseVNode("option", _hoisted_30, toDisplayString(unref(t)("autoGenerator.levels.beginner", "Beginner")), 1),
                    createBaseVNode("option", _hoisted_31, toDisplayString(unref(t)("autoGenerator.levels.intermediate", "Intermediate")), 1),
                    createBaseVNode("option", _hoisted_32, toDisplayString(unref(t)("autoGenerator.levels.advanced", "Advanced")), 1),
                    createBaseVNode("option", _hoisted_33, toDisplayString(unref(t)("autoGenerator.levels.mixed", "Mixed Levels")), 1)
                  ], 8, _hoisted_29), [
                    [vModelSelect, difficultyLevel.value]
                  ])
                ]),
                createBaseVNode("div", null, [
                  createBaseVNode("label", _hoisted_34, toDisplayString(unref(t)("autoGenerator.forms.common.maxWords", "Maximum Words")), 1),
                  withDirectives(createBaseVNode("select", {
                    "onUpdate:modelValue": _cache[5] || (_cache[5] = ($event) => maxWords.value = $event),
                    class: "w-full px-4 py-2 border border-gray-300 dark:border-dark-bg-mute rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent bg-white dark:bg-dark-bg-soft text-gray-900 dark:text-white",
                    disabled: isGenerating.value
                  }, _cache[11] || (_cache[11] = [
                    createBaseVNode("option", { value: "10" }, "10", -1),
                    createBaseVNode("option", { value: "20" }, "20", -1),
                    createBaseVNode("option", { value: "30" }, "30", -1),
                    createBaseVNode("option", { value: "50" }, "50", -1)
                  ]), 8, _hoisted_35), [
                    [vModelSelect, maxWords.value]
                  ])
                ])
              ])
            ])) : createCommentVNode("", true),
            createBaseVNode("div", _hoisted_36, [
              createBaseVNode("button", {
                onClick: generateVocabulary,
                disabled: !canGenerate.value || isGenerating.value,
                class: normalizeClass([
                  "px-6 py-3 rounded-lg font-semibold transition-all duration-200 flex items-center space-x-2",
                  canGenerate.value && !isGenerating.value ? "bg-gradient-to-r from-blue-500 to-purple-500 hover:from-blue-600 hover:to-purple-600 text-white shadow-lg hover:shadow-xl transform hover:scale-105" : "bg-gray-300 dark:bg-dark-bg-mute text-gray-500 dark:text-gray-400 cursor-not-allowed"
                ])
              }, [
                isGenerating.value ? (openBlock(), createElementBlock("svg", _hoisted_38, _cache[12] || (_cache[12] = [
                  createBaseVNode("circle", {
                    class: "opacity-25",
                    cx: "12",
                    cy: "12",
                    r: "10",
                    stroke: "currentColor",
                    "stroke-width": "4"
                  }, null, -1),
                  createBaseVNode("path", {
                    class: "opacity-75",
                    fill: "currentColor",
                    d: "M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 002 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                  }, null, -1)
                ]))) : (openBlock(), createElementBlock("svg", _hoisted_39, _cache[13] || (_cache[13] = [
                  createBaseVNode("path", {
                    "fill-rule": "evenodd",
                    d: "M10 3a1 1 0 011 1v5h5a1 1 0 110 2h-5v5a1 1 0 11-2 0v-5H4a1 1 0 110-2h5V4a1 1 0 011-1z",
                    "clip-rule": "evenodd"
                  }, null, -1)
                ]))),
                createBaseVNode("span", null, toDisplayString(isGenerating.value ? unref(t)("autoGenerator.generating", "Generating...") : unref(t)("autoGenerator.generate", "Generate Vocabulary")), 1)
              ], 10, _hoisted_37)
            ])
          ])) : createCommentVNode("", true),
          generatedWords.value.length > 0 ? (openBlock(), createElementBlock("div", _hoisted_40, [
            createBaseVNode("div", _hoisted_41, [
              createBaseVNode("div", _hoisted_42, [
                _cache[14] || (_cache[14] = createBaseVNode("div", { class: "w-8 h-8 bg-gradient-to-r from-green-500 to-blue-500 rounded-full flex items-center justify-center mr-3" }, [
                  createBaseVNode("svg", {
                    class: "w-4 h-4 text-white",
                    fill: "currentColor",
                    viewBox: "0 0 20 20"
                  }, [
                    createBaseVNode("path", {
                      "fill-rule": "evenodd",
                      d: "M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z",
                      "clip-rule": "evenodd"
                    })
                  ])
                ], -1)),
                createBaseVNode("h3", _hoisted_43, toDisplayString(unref(t)("autoGenerator.preview.title", "Generated Vocabulary")), 1)
              ]),
              createBaseVNode("div", _hoisted_44, [
                createBaseVNode("button", {
                  onClick: saveAllWords,
                  disabled: isSaving.value,
                  class: normalizeClass([
                    "px-4 py-2 rounded-lg font-medium transition-all duration-200 flex items-center space-x-2",
                    "bg-gradient-to-r from-green-500 to-teal-500 hover:from-green-600 hover:to-teal-600 text-white shadow-lg hover:shadow-xl transform hover:scale-105"
                  ])
                }, [
                  _cache[15] || (_cache[15] = createBaseVNode("svg", {
                    class: "w-4 h-4",
                    fill: "currentColor",
                    viewBox: "0 0 20 20"
                  }, [
                    createBaseVNode("path", {
                      "fill-rule": "evenodd",
                      d: "M3 17a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1zm3.293-7.707a1 1 0 011.414 0L9 10.586V3a1 1 0 112 0v7.586l1.293-1.293a1 1 0 111.414 1.414l-3 3a1 1 0 01-1.414 0l-3-3a1 1 0 010-1.414z",
                      "clip-rule": "evenodd"
                    })
                  ], -1)),
                  createBaseVNode("span", null, toDisplayString(unref(t)("autoGenerator.saveAll", "Save All")), 1)
                ], 8, _hoisted_45),
                createBaseVNode("button", {
                  onClick: clearGenerated,
                  class: "px-4 py-2 rounded-lg font-medium text-red-600 dark:text-red-400 hover:bg-red-50 dark:hover:bg-red-900/20 transition-all duration-200"
                }, toDisplayString(unref(t)("common.clear", "Clear")), 1)
              ])
            ]),
            createBaseVNode("div", _hoisted_46, [
              (openBlock(true), createElementBlock(Fragment, null, renderList(generatedWords.value, (word, index) => {
                return openBlock(), createElementBlock("div", {
                  key: index,
                  class: "bg-gray-50 dark:bg-dark-bg-mute rounded-lg p-4 hover:shadow-md transition-shadow duration-200"
                }, [
                  createBaseVNode("div", _hoisted_47, [
                    createBaseVNode("h4", _hoisted_48, toDisplayString(word.word), 1),
                    createBaseVNode("span", _hoisted_49, toDisplayString(word.type), 1)
                  ]),
                  createBaseVNode("p", _hoisted_50, toDisplayString(word.meaning), 1),
                  word.example ? (openBlock(), createElementBlock("div", _hoisted_51, ' "' + toDisplayString(word.example) + '" ', 1)) : createCommentVNode("", true)
                ]);
              }), 128))
            ])
          ])) : createCommentVNode("", true)
        ])
      ]);
    };
  }
});
const AutoGeneratorView = /* @__PURE__ */ _export_sfc(_sfc_main, [["__scopeId", "data-v-c4401a47"]]);
export {
  AutoGeneratorView as default
};
//# sourceMappingURL=AutoGeneratorView-BVI1bXkZ.js.map
