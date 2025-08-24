import { d as defineComponent, H as useI18n, A as ref, K as watch, B as computed, L as onUnmounted, c as createElementBlock, v as openBlock, y as createVNode, w as withCtx, e as createCommentVNode, N as Transition, f as createBaseVNode, i as withModifiers, t as toDisplayString, u as unref, g as createTextVNode, C as withDirectives, S as vModelCheckbox, F as Fragment, j as renderList, P as vModelSelect } from "./vendor-BIIJCJs6.js";
import { g as getTopicName, a as _export_sfc } from "./index-rKhEXjuZ.js";
/* empty css                                                                   */
import "./vendor-toast-0s3J6pvm.js";
const _hoisted_1 = {
  key: 0,
  class: "fixed inset-0 bg-gray-600 bg-opacity-50 flex items-center justify-center p-4 z-50 backdrop-blur-sm"
};
const _hoisted_2 = { class: "w-full max-w-md mx-4" };
const _hoisted_3 = { class: "bg-white dark:bg-[#0a0a0a] p-4 border-b border-gray-200 dark:border-white/10" };
const _hoisted_4 = { class: "flex items-center justify-between" };
const _hoisted_5 = { class: "flex items-center space-x-2" };
const _hoisted_6 = { class: "text-lg font-medium text-gray-900 dark:text-white" };
const _hoisted_7 = { class: "p-4" };
const _hoisted_8 = {
  key: 0,
  class: "mb-4"
};
const _hoisted_9 = {
  key: 0,
  class: "mb-4"
};
const _hoisted_10 = { class: "text-sm text-gray-500 dark:text-white/60 mb-1" };
const _hoisted_11 = { class: "mb-2" };
const _hoisted_12 = { class: "text-lg font-medium text-gray-900 dark:text-white" };
const _hoisted_13 = { class: "text-sm text-gray-600 dark:text-white/70 bg-gray-50 dark:bg-black/20 px-3 py-2 rounded-md" };
const _hoisted_14 = { class: "font-medium" };
const _hoisted_15 = { key: 1 };
const _hoisted_16 = { class: "text-sm text-gray-500 dark:text-white/60 mb-1" };
const _hoisted_17 = { class: "mb-1" };
const _hoisted_18 = { class: "text-lg font-medium text-gray-900 dark:text-white" };
const _hoisted_19 = { class: "text-gray-500 dark:text-white/60 ml-2" };
const _hoisted_20 = { class: "text-sm text-gray-500 dark:text-white/60" };
const _hoisted_21 = { class: "mb-4" };
const _hoisted_22 = { class: "flex items-center justify-between" };
const _hoisted_23 = {
  for: "filterByTopic",
  class: "text-sm font-medium text-gray-700 dark:text-white"
};
const _hoisted_24 = { class: "relative inline-flex items-center cursor-pointer" };
const _hoisted_25 = {
  key: 0,
  class: "text-xs text-gray-500 dark:text-white/60 mt-1"
};
const _hoisted_26 = { class: "font-medium" };
const _hoisted_27 = { class: "mb-4" };
const _hoisted_28 = {
  for: "targetDate",
  class: "block text-sm font-medium text-gray-700 dark:text-white mb-2"
};
const _hoisted_29 = { value: "" };
const _hoisted_30 = ["value"];
const _hoisted_31 = {
  key: 0,
  class: "text-sm text-gray-500 dark:text-white/60 mt-2"
};
const _hoisted_32 = { class: "px-4 py-4 bg-white dark:bg-[#0a0a0a] border-t border-gray-200 dark:border-white/10 flex justify-end space-x-3" };
const _hoisted_33 = ["disabled"];
const _sfc_main = /* @__PURE__ */ defineComponent({
  __name: "MoveModal",
  props: {
    showModal: { type: Boolean },
    wordToMove: {},
    availableDateGroups: {},
    sourceDate: {},
    allVocabularies: {}
  },
  emits: ["close", "confirm-move"],
  setup(__props, { emit: __emit }) {
    const { t, locale } = useI18n();
    const props = __props;
    const emit = __emit;
    const selectedTargetDate = ref("");
    const getStoredFilterState = () => {
      try {
        const stored = localStorage.getItem("vocabulary-move-filter-by-topic");
        return stored ? JSON.parse(stored) : false;
      } catch (error) {
        console.warn("Failed to parse stored filter state:", error);
        return false;
      }
    };
    const setStoredFilterState = (value) => {
      try {
        localStorage.setItem("vocabulary-move-filter-by-topic", JSON.stringify(value));
      } catch (error) {
        console.warn("Failed to store filter state:", error);
      }
    };
    const filterBySameTopic = ref(getStoredFilterState());
    watch(filterBySameTopic, (newValue) => {
      setStoredFilterState(newValue);
    });
    const filteredDateGroups = computed(() => {
      console.log("Filter state:", {
        filterBySameTopic: filterBySameTopic.value,
        hasWordToMove: !!props.wordToMove,
        hasAllVocabularies: !!props.allVocabularies,
        allVocabulariesLength: props.allVocabularies?.length
      });
      if (!filterBySameTopic.value || !props.wordToMove || !props.allVocabularies) {
        return props.availableDateGroups;
      }
      const currentCategory = props.wordToMove.categoryName || props.wordToMove.category;
      console.log("Current category:", currentCategory);
      console.log("Word to move:", props.wordToMove);
      if (!currentCategory) {
        return props.availableDateGroups;
      }
      console.log("Sample vocabularies:", props.allVocabularies.slice(0, 3));
      const filtered = props.availableDateGroups.filter((dateGroup) => {
        const groupDate = new Date(dateGroup.date);
        const groupDateStr = groupDate.toISOString().split("T")[0];
        const hasMatch = props.allVocabularies.some((vocab) => {
          if (vocab.category !== currentCategory) return false;
          const vocabDateStr = vocab.createdAt ? new Date(vocab.createdAt).toISOString().split("T")[0] : null;
          const vocabUpdateDateStr = vocab.updatedAt ? new Date(vocab.updatedAt).toISOString().split("T")[0] : null;
          const matches = vocabDateStr === groupDateStr || vocabUpdateDateStr === groupDateStr;
          if (matches) {
            console.log("Found match:", {
              vocab: vocab.word,
              category: vocab.category,
              vocabDate: vocabDateStr,
              groupDate: groupDateStr
            });
          }
          return matches;
        });
        return hasMatch;
      });
      console.log("Filtered result:", filtered.length, "groups");
      return filtered;
    });
    const formatDateForDisplay = (dateStr) => {
      const date = new Date(dateStr);
      return date.toLocaleDateString(locale.value, {
        year: "numeric",
        month: "short",
        day: "numeric"
      });
    };
    const closeModal = () => {
      selectedTargetDate.value = "";
      emit("close");
    };
    const confirmMove = () => {
      if (props.wordToMove && selectedTargetDate.value) {
        emit("confirm-move", {
          word: props.wordToMove,
          targetDate: selectedTargetDate.value
        });
        closeModal();
      }
    };
    watch(() => props.showModal, (newValue) => {
      if (newValue) {
        document.body.classList.add("modal-open");
      } else {
        document.body.classList.remove("modal-open");
        selectedTargetDate.value = "";
      }
    });
    onUnmounted(() => {
      document.body.classList.remove("modal-open");
    });
    return (_ctx, _cache) => {
      return openBlock(), createElementBlock("div", null, [
        createVNode(Transition, {
          "enter-active-class": "transition-all duration-500 ease-out",
          "enter-from-class": "opacity-0",
          "enter-to-class": "opacity-100",
          "leave-active-class": "transition-all duration-300 ease-in",
          "leave-from-class": "opacity-100",
          "leave-to-class": "opacity-0"
        }, {
          default: withCtx(() => [
            _ctx.showModal ? (openBlock(), createElementBlock("div", _hoisted_1, [
              createVNode(Transition, {
                "enter-active-class": "transition-all duration-500 ease-out",
                "enter-from-class": "opacity-0 scale-90 translate-y-8 rotate-1",
                "enter-to-class": "opacity-100 scale-100 translate-y-0 rotate-0",
                "leave-active-class": "transition-all duration-300 ease-in",
                "leave-from-class": "opacity-100 scale-100 translate-y-0 rotate-0",
                "leave-to-class": "opacity-0 scale-90 translate-y-8 rotate-1"
              }, {
                default: withCtx(() => [
                  createBaseVNode("div", _hoisted_2, [
                    createBaseVNode("div", {
                      class: "bg-white dark:bg-[#0a0a0a] shadow-2xl rounded-xl border border-gray-200 dark:border-white/10 overflow-hidden transform",
                      onClick: _cache[2] || (_cache[2] = withModifiers(() => {
                      }, ["stop"]))
                    }, [
                      createBaseVNode("div", _hoisted_3, [
                        createBaseVNode("div", _hoisted_4, [
                          createBaseVNode("div", _hoisted_5, [
                            _cache[3] || (_cache[3] = createBaseVNode("div", { class: "w-2 h-2 bg-green-500 rounded-full" }, null, -1)),
                            createBaseVNode("h3", _hoisted_6, toDisplayString(unref(t)("vocabulary.moveVocabulary", "Move Vocabulary")), 1)
                          ]),
                          createBaseVNode("button", {
                            onClick: closeModal,
                            class: "text-gray-400 dark:text-white/60 hover:text-gray-600 dark:hover:text-white transition-all duration-300 hover:scale-110 hover:rotate-90 p-1 rounded-full hover:bg-gray-100 dark:hover:bg-black/20"
                          }, _cache[4] || (_cache[4] = [
                            createBaseVNode("svg", {
                              class: "w-5 h-5",
                              fill: "currentColor",
                              viewBox: "0 0 20 20"
                            }, [
                              createBaseVNode("path", {
                                "fill-rule": "evenodd",
                                d: "M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z",
                                "clip-rule": "evenodd"
                              })
                            ], -1)
                          ]))
                        ])
                      ]),
                      createBaseVNode("div", _hoisted_7, [
                        _ctx.wordToMove ? (openBlock(), createElementBlock("div", _hoisted_8, [
                          _ctx.wordToMove.isBatchMove ? (openBlock(), createElementBlock("div", _hoisted_9, [
                            createBaseVNode("p", _hoisted_10, toDisplayString(unref(t)("vocabulary.movingCategory", "Moving all words in category")) + ": ", 1),
                            createBaseVNode("div", _hoisted_11, [
                              createBaseVNode("span", _hoisted_12, toDisplayString(unref(getTopicName)(_ctx.wordToMove.categoryName || _ctx.wordToMove.category, unref(t), unref(locale), _ctx.wordToMove)), 1)
                            ]),
                            createBaseVNode("p", _hoisted_13, [
                              createBaseVNode("span", _hoisted_14, toDisplayString(_ctx.wordToMove.batchWords?.length || 0), 1),
                              createTextVNode(" " + toDisplayString(unref(t)("vocabulary.wordsWillBeMoved", "words will be moved to the selected date")), 1)
                            ])
                          ])) : (openBlock(), createElementBlock("div", _hoisted_15, [
                            createBaseVNode("p", _hoisted_16, toDisplayString(unref(t)("vocabulary.movingWord", "Moving word")) + ": ", 1),
                            createBaseVNode("div", _hoisted_17, [
                              createBaseVNode("span", _hoisted_18, toDisplayString(_ctx.wordToMove.word), 1),
                              createBaseVNode("span", _hoisted_19, "- " + toDisplayString(_ctx.wordToMove.meaning), 1)
                            ]),
                            createBaseVNode("p", _hoisted_20, " Topic: " + toDisplayString(unref(getTopicName)(_ctx.wordToMove.category, unref(t), unref(locale), _ctx.wordToMove)), 1)
                          ]))
                        ])) : createCommentVNode("", true),
                        createBaseVNode("div", _hoisted_21, [
                          createBaseVNode("div", _hoisted_22, [
                            createBaseVNode("label", _hoisted_23, toDisplayString(unref(t)("vocabulary.filterBySameTopic", "Filter by same topic")), 1),
                            createBaseVNode("label", _hoisted_24, [
                              withDirectives(createBaseVNode("input", {
                                id: "filterByTopic",
                                "onUpdate:modelValue": _cache[0] || (_cache[0] = ($event) => filterBySameTopic.value = $event),
                                type: "checkbox",
                                class: "sr-only peer"
                              }, null, 512), [
                                [vModelCheckbox, filterBySameTopic.value]
                              ]),
                              _cache[5] || (_cache[5] = createBaseVNode("div", { class: "w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-1 peer-focus:ring-blue-300 dark:peer-focus:ring-blue-800 rounded-full peer dark:bg-[#0a0a0a] peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all dark:border-white/20 peer-checked:bg-blue-600" }, null, -1))
                            ])
                          ]),
                          filterBySameTopic.value ? (openBlock(), createElementBlock("p", _hoisted_25, [
                            createTextVNode(toDisplayString(unref(t)("vocabulary.showingDatesWithSameTopic", "Showing only dates with same topic")) + ": ", 1),
                            createBaseVNode("span", _hoisted_26, toDisplayString(unref(getTopicName)(_ctx.wordToMove?.categoryName || _ctx.wordToMove?.category || "", unref(t), unref(locale), _ctx.wordToMove)), 1)
                          ])) : createCommentVNode("", true)
                        ]),
                        createBaseVNode("div", _hoisted_27, [
                          createBaseVNode("label", _hoisted_28, toDisplayString(unref(t)("vocabulary.selectTargetDateGroup", "Select target date group")) + ": ", 1),
                          withDirectives(createBaseVNode("select", {
                            id: "targetDate",
                            "onUpdate:modelValue": _cache[1] || (_cache[1] = ($event) => selectedTargetDate.value = $event),
                            class: "w-full px-3 py-2 border border-gray-300 dark:border-white/20 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 bg-white dark:bg-[#0a0a0a] text-gray-900 dark:text-white"
                          }, [
                            createBaseVNode("option", _hoisted_29, toDisplayString(unref(t)("vocabulary.selectDate", "Select a date")), 1),
                            (openBlock(true), createElementBlock(Fragment, null, renderList(filteredDateGroups.value, (dateGroup) => {
                              return openBlock(), createElementBlock("option", {
                                key: dateGroup.date,
                                value: dateGroup.date
                              }, toDisplayString(formatDateForDisplay(dateGroup.date)) + " (" + toDisplayString(dateGroup.count) + " words) ", 9, _hoisted_30);
                            }), 128))
                          ], 512), [
                            [vModelSelect, selectedTargetDate.value]
                          ]),
                          filteredDateGroups.value.length === 0 ? (openBlock(), createElementBlock("p", _hoisted_31, toDisplayString(unref(t)("vocabulary.noMatchingDates", "No dates found with this topic. Try disabling the filter.")), 1)) : createCommentVNode("", true)
                        ])
                      ]),
                      createBaseVNode("div", _hoisted_32, [
                        createBaseVNode("button", {
                          onClick: closeModal,
                          class: "px-4 py-2 text-sm font-medium text-gray-700 dark:text-white bg-gray-100 dark:bg-black/40 rounded-md hover:bg-gray-200 dark:hover:bg-black/60 transition-all duration-200 hover:scale-105 hover:shadow-md active:scale-95"
                        }, toDisplayString(unref(t)("common.cancel", "Cancel")), 1),
                        createBaseVNode("button", {
                          onClick: confirmMove,
                          disabled: !selectedTargetDate.value,
                          class: "px-4 py-2 text-sm font-medium text-white bg-blue-600 rounded-md hover:bg-blue-700 disabled:opacity-50 disabled:cursor-not-allowed transition-all duration-200 hover:scale-105 hover:shadow-md hover:-translate-y-0.5 active:scale-95"
                        }, toDisplayString(_ctx.wordToMove?.isBatchMove ? unref(t)("vocabulary.moveAll", "Move All") : unref(t)("vocabulary.moveWord", "Move Word")), 9, _hoisted_33)
                      ])
                    ])
                  ])
                ]),
                _: 1
              })
            ])) : createCommentVNode("", true)
          ]),
          _: 1
        })
      ]);
    };
  }
});
const MoveModal = /* @__PURE__ */ _export_sfc(_sfc_main, [["__scopeId", "data-v-98e3af71"]]);
export {
  MoveModal as default
};
//# sourceMappingURL=MoveModal-qblb-h8Y.js.map
