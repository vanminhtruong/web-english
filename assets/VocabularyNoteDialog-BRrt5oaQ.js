import { d as defineComponent, H as useI18n, A as ref, B as computed, K as watch, I as onMounted, c as createElementBlock, v as openBlock, y as createVNode, w as withCtx, e as createCommentVNode, N as Transition, f as createBaseVNode, i as withModifiers, t as toDisplayString, u as unref, C as withDirectives, g as createTextVNode, O as vModelText, F as Fragment, j as renderList, a as normalizeStyle, n as normalizeClass } from "./vendor-DI3yOcyn.js";
import { d as useVoiceStore, f as getDateKey, h as formatDate, a as _export_sfc } from "./index-BIrRStLh.js";
import { u as useToast } from "./vendor-toast-BpLwVhAX.js";
const _hoisted_1 = {
  key: 0,
  class: "fixed inset-0 bg-gray-600 bg-opacity-50 flex items-center justify-center p-4 z-50 backdrop-blur-sm"
};
const _hoisted_2 = { class: "w-full max-h-[90vh] flex flex-col max-w-[95vw] sm:max-w-lg md:max-w-xl lg:max-w-2xl" };
const _hoisted_3 = { class: "px-3 sm:px-6 py-3 sm:py-4 border-b border-gray-200 dark:border-gray-700 flex-shrink-0 bg-gradient-to-r from-green-50 to-emerald-50 dark:from-[#0a0a0a] dark:to-[#0a0a0a]" };
const _hoisted_4 = { class: "flex items-center justify-between" };
const _hoisted_5 = { class: "text-lg sm:text-xl md:text-2xl font-semibold text-gray-900 dark:text-white flex items-center space-x-1 sm:space-x-2 flex-1 min-w-0" };
const _hoisted_6 = { class: "truncate" };
const _hoisted_7 = { class: "px-3 sm:px-6 py-3 sm:py-4 flex-1 overflow-y-auto min-h-0 custom-scrollbar" };
const _hoisted_8 = { class: "space-y-6" };
const _hoisted_9 = {
  class: "animate-fade-in-up",
  style: { "animation-delay": "0.1s" }
};
const _hoisted_10 = { class: "text-sm text-gray-600 dark:text-gray-400 p-3 bg-green-50 dark:bg-[#0a0a0a] rounded-lg border border-green-200 dark:border-gray-700" };
const _hoisted_11 = {
  class: "animate-fade-in-up",
  style: { "animation-delay": "0.2s" }
};
const _hoisted_12 = {
  for: "note-content",
  class: "block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2 flex items-center"
};
const _hoisted_13 = ["placeholder"];
const _hoisted_14 = {
  class: "animate-fade-in-up",
  style: { "animation-delay": "0.3s" }
};
const _hoisted_15 = { class: "text-sm font-medium text-gray-700 dark:text-gray-300 mb-2 flex items-center" };
const _hoisted_16 = { class: "ml-2 px-2 py-1 bg-blue-100 dark:bg-blue-900 text-blue-800 dark:text-blue-200 rounded-full text-xs font-semibold" };
const _hoisted_17 = { class: "max-h-60 overflow-y-auto border border-gray-200 dark:border-gray-700 rounded-lg p-3 bg-white dark:bg-[#0a0a0a] custom-scrollbar" };
const _hoisted_18 = {
  key: 0,
  class: "p-4 text-center text-gray-500 dark:text-gray-400"
};
const _hoisted_19 = {
  key: 1,
  class: "space-y-2"
};
const _hoisted_20 = { class: "flex-1 min-w-0" };
const _hoisted_21 = { class: "flex items-center space-x-1 sm:space-x-2 mb-1" };
const _hoisted_22 = { class: "font-medium text-gray-900 dark:text-white truncate" };
const _hoisted_23 = { class: "text-xs sm:text-sm text-gray-500 dark:text-gray-400 font-mono truncate" };
const _hoisted_24 = { class: "text-sm text-gray-600 dark:text-gray-300 truncate" };
const _hoisted_25 = { class: "text-xs px-1 sm:px-2 py-1 bg-gray-100 dark:bg-gray-700 text-gray-600 dark:text-gray-300 rounded-full whitespace-nowrap" };
const _hoisted_26 = { class: "flex items-center space-x-1 sm:space-x-2 flex-shrink-0" };
const _hoisted_27 = ["onClick", "title"];
const _hoisted_28 = ["onClick"];
const _hoisted_29 = {
  class: "w-4 h-4",
  fill: "currentColor",
  viewBox: "0 0 20 20"
};
const _hoisted_30 = {
  key: 0,
  "fill-rule": "evenodd",
  d: "M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z",
  "clip-rule": "evenodd"
};
const _hoisted_31 = {
  key: 1,
  d: "M10 5a1 1 0 011 1v3h3a1 1 0 110 2h-3v3a1 1 0 11-2 0v-3H6a1 1 0 110-2h3V6a1 1 0 011-1z"
};
const _hoisted_32 = { class: "px-6 py-4 border-t border-gray-200 dark:border-gray-700 flex-shrink-0 bg-gradient-to-r from-gray-50 to-green-50 dark:from-[#0a0a0a] dark:to-[#0a0a0a]" };
const _hoisted_33 = { class: "flex justify-end space-x-3" };
const NOTE_STORAGE_KEY = "vocabulary-notes";
const MARKED_WORDS_STORAGE_KEY = "vocabulary-marked-words";
const _sfc_main = /* @__PURE__ */ defineComponent({
  __name: "VocabularyNoteDialog",
  props: {
    modelValue: { type: Boolean },
    date: {},
    todayWords: {}
  },
  emits: ["update:modelValue", "save-note"],
  setup(__props, { emit: __emit }) {
    const { t, locale } = useI18n();
    useToast();
    const { playAudio } = useVoiceStore();
    const props = __props;
    const emit = __emit;
    const noteContent = ref("");
    const markedWords = ref([]);
    const formattedDate = computed(() => {
      const today = /* @__PURE__ */ new Date();
      const todayKey = getDateKey(today.toISOString());
      const yesterday = new Date(today);
      yesterday.setDate(yesterday.getDate() - 1);
      const yesterdayKey = getDateKey(yesterday.toISOString());
      if (props.date === todayKey) {
        return t("vocabulary.notes.today", "Today");
      } else if (props.date === yesterdayKey) {
        return t("vocabulary.notes.yesterday", "Yesterday");
      } else {
        return formatDate(props.date, locale.value);
      }
    });
    const loadNote = () => {
      try {
        const notesData = localStorage.getItem(NOTE_STORAGE_KEY);
        if (notesData) {
          const notes = JSON.parse(notesData);
          if (notes[props.date]) {
            noteContent.value = notes[props.date];
          } else {
            noteContent.value = "";
          }
        }
      } catch (error) {
        console.warn("Failed to load notes from localStorage:", error);
      }
    };
    const loadMarkedWords = () => {
      try {
        const markedData = localStorage.getItem(MARKED_WORDS_STORAGE_KEY);
        if (markedData) {
          const marked = JSON.parse(markedData);
          if (marked[props.date]) {
            markedWords.value = marked[props.date];
          } else {
            markedWords.value = [];
          }
        }
      } catch (error) {
        console.warn("Failed to load marked words from localStorage:", error);
      }
    };
    const saveNoteToStorage = (note) => {
      try {
        const notesData = localStorage.getItem(NOTE_STORAGE_KEY);
        const notes = notesData ? JSON.parse(notesData) : {};
        notes[props.date] = note;
        localStorage.setItem(NOTE_STORAGE_KEY, JSON.stringify(notes));
      } catch (error) {
        console.warn("Failed to save note to localStorage:", error);
      }
    };
    const saveMarkedWordsToStorage = (wordIds) => {
      try {
        const markedData = localStorage.getItem(MARKED_WORDS_STORAGE_KEY);
        const marked = markedData ? JSON.parse(markedData) : {};
        marked[props.date] = wordIds;
        localStorage.setItem(MARKED_WORDS_STORAGE_KEY, JSON.stringify(marked));
      } catch (error) {
        console.warn("Failed to save marked words to localStorage:", error);
      }
    };
    const toggleWordMarked = (wordId) => {
      const index = markedWords.value.indexOf(wordId);
      if (index === -1) {
        markedWords.value.push(wordId);
      } else {
        markedWords.value.splice(index, 1);
      }
    };
    const speakWord = async (word) => {
      try {
        await playAudio(word);
      } catch (error) {
        console.warn("Failed to play word pronunciation:", error);
      }
    };
    const saveNote = () => {
      saveNoteToStorage(noteContent.value);
      saveMarkedWordsToStorage(markedWords.value);
      emit("save-note", noteContent.value, markedWords.value);
      const event = new CustomEvent("vocabulary-notes-updated", {
        detail: {
          date: props.date,
          note: noteContent.value,
          markedWords: markedWords.value
        }
      });
      window.dispatchEvent(event);
      close();
    };
    const close = () => {
      emit("update:modelValue", false);
    };
    watch(
      () => props.modelValue,
      (newValue) => {
        if (newValue) {
          loadNote();
          loadMarkedWords();
        }
      }
    );
    onMounted(() => {
      if (props.modelValue) {
        loadNote();
        loadMarkedWords();
      }
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
            _ctx.modelValue ? (openBlock(), createElementBlock("div", _hoisted_1, [
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
                      class: "bg-white dark:bg-[#0a0a0a] shadow-2xl rounded-xl border border-gray-200 dark:border-gray-700 flex flex-col h-full overflow-hidden transform",
                      onClick: _cache[1] || (_cache[1] = withModifiers(() => {
                      }, ["stop"]))
                    }, [
                      createBaseVNode("div", _hoisted_3, [
                        createBaseVNode("div", _hoisted_4, [
                          createBaseVNode("h2", _hoisted_5, [
                            _cache[2] || (_cache[2] = createBaseVNode("span", { class: "w-2 h-2 bg-green-500 rounded-full animate-pulse flex-shrink-0" }, null, -1)),
                            _cache[3] || (_cache[3] = createBaseVNode("svg", {
                              class: "w-4 h-4 sm:w-5 sm:h-5 md:w-6 md:h-6 text-green-500 flex-shrink-0",
                              fill: "currentColor",
                              viewBox: "0 0 20 20"
                            }, [
                              createBaseVNode("path", { d: "M13.586 3.586a2 2 0 112.828 2.828l-.793.793-2.828-2.828.793-.793zM11.379 5.793L3 14.172V17h2.828l8.38-8.379-2.83-2.828z" })
                            ], -1)),
                            createBaseVNode("span", _hoisted_6, toDisplayString(unref(t)("vocabulary.notes.title", "Vocabulary Notes")) + " - " + toDisplayString(formattedDate.value), 1)
                          ]),
                          createBaseVNode("button", {
                            onClick: close,
                            class: "text-gray-400 hover:text-gray-600 dark:hover:text-gray-200 transition-all duration-300 hover:scale-110 hover:rotate-90 p-1 rounded-full hover:bg-gray-100 dark:hover:bg-gray-800"
                          }, _cache[4] || (_cache[4] = [
                            createBaseVNode("svg", {
                              class: "w-6 h-6",
                              fill: "none",
                              stroke: "currentColor",
                              viewBox: "0 0 24 24"
                            }, [
                              createBaseVNode("path", {
                                "stroke-linecap": "round",
                                "stroke-linejoin": "round",
                                "stroke-width": "2",
                                d: "M6 18L18 6M6 6l12 12"
                              })
                            ], -1)
                          ]))
                        ])
                      ]),
                      createBaseVNode("div", _hoisted_7, [
                        createBaseVNode("div", _hoisted_8, [
                          createBaseVNode("div", _hoisted_9, [
                            createBaseVNode("p", _hoisted_10, toDisplayString(unref(t)("vocabulary.notes.description", "Manage notes for vocabulary words learned today")), 1)
                          ]),
                          createBaseVNode("div", _hoisted_11, [
                            createBaseVNode("label", _hoisted_12, [
                              _cache[5] || (_cache[5] = createBaseVNode("span", { class: "w-1 h-4 bg-green-500 rounded mr-2" }, null, -1)),
                              createTextVNode(" " + toDisplayString(unref(t)("vocabulary.notes.noteLabel", "Notes for vocabulary")), 1)
                            ]),
                            withDirectives(createBaseVNode("textarea", {
                              id: "note-content",
                              "onUpdate:modelValue": _cache[0] || (_cache[0] = ($event) => noteContent.value = $event),
                              rows: "6",
                              class: "w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-[#0a0a0a] text-gray-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-transparent transition-all duration-300 hover:border-green-400 dark:hover:border-green-500 transform hover:scale-[1.02]",
                              placeholder: unref(t)("vocabulary.notes.placeholder", "Write your notes about this vocabulary learning session...")
                            }, null, 8, _hoisted_13), [
                              [vModelText, noteContent.value]
                            ])
                          ]),
                          createBaseVNode("div", _hoisted_14, [
                            createBaseVNode("h4", _hoisted_15, [
                              _cache[6] || (_cache[6] = createBaseVNode("span", { class: "w-1 h-4 bg-blue-500 rounded mr-2" }, null, -1)),
                              createTextVNode(" " + toDisplayString(unref(t)("vocabulary.notes.wordsLearned", "Words in this group")) + " ", 1),
                              createBaseVNode("span", _hoisted_16, toDisplayString(_ctx.todayWords.length), 1)
                            ]),
                            createBaseVNode("div", _hoisted_17, [
                              _ctx.todayWords.length === 0 ? (openBlock(), createElementBlock("div", _hoisted_18, [
                                _cache[7] || (_cache[7] = createBaseVNode("svg", {
                                  class: "w-12 h-12 mx-auto mb-3 text-gray-300 dark:text-gray-600",
                                  fill: "none",
                                  stroke: "currentColor",
                                  viewBox: "0 0 24 24"
                                }, [
                                  createBaseVNode("path", {
                                    "stroke-linecap": "round",
                                    "stroke-linejoin": "round",
                                    "stroke-width": "1",
                                    d: "M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"
                                  })
                                ], -1)),
                                createTextVNode(" " + toDisplayString(unref(t)("vocabulary.notes.noWordsLearned", "No vocabulary words in this group")), 1)
                              ])) : (openBlock(), createElementBlock("div", _hoisted_19, [
                                (openBlock(true), createElementBlock(Fragment, null, renderList(_ctx.todayWords, (word, index) => {
                                  return openBlock(), createElementBlock("div", {
                                    key: word.id,
                                    class: "flex items-center space-x-2 sm:space-x-3 p-2 sm:p-3 rounded-lg hover:bg-white dark:hover:bg-[#0f0f0f] transition-all duration-300 border border-transparent hover:border-green-200 cursor-pointer hover:shadow-md hover:scale-[1.02] animate-fade-in-up",
                                    style: normalizeStyle(`animation-delay: ${0.4 + index * 0.1}s`)
                                  }, [
                                    createBaseVNode("div", _hoisted_20, [
                                      createBaseVNode("div", _hoisted_21, [
                                        createBaseVNode("span", _hoisted_22, toDisplayString(word.word), 1),
                                        createBaseVNode("span", _hoisted_23, toDisplayString(word.pronunciation), 1)
                                      ]),
                                      createBaseVNode("div", _hoisted_24, toDisplayString(word.meaning), 1)
                                    ]),
                                    createBaseVNode("div", _hoisted_25, toDisplayString(word.level), 1),
                                    createBaseVNode("div", _hoisted_26, [
                                      createBaseVNode("button", {
                                        onClick: ($event) => speakWord(word.word),
                                        class: "p-1 rounded-full focus:outline-none focus:ring-2 focus:ring-blue-500 transition-all duration-300 hover:scale-110 bg-blue-100 dark:bg-blue-900 text-blue-600 dark:text-blue-400 hover:bg-blue-200 dark:hover:bg-blue-800",
                                        title: `Play pronunciation: ${word.word}`
                                      }, _cache[8] || (_cache[8] = [
                                        createBaseVNode("svg", {
                                          class: "w-4 h-4",
                                          fill: "currentColor",
                                          viewBox: "0 0 20 20"
                                        }, [
                                          createBaseVNode("path", {
                                            "fill-rule": "evenodd",
                                            d: "M9.383 3.076A1 1 0 0110 4v12a1 1 0 01-1.617.776L4.146 13H2a1 1 0 01-1-1V8a1 1 0 011-1h2.146l4.237-3.776zM12.828 7.172a1 1 0 011.414 0 4 4 0 010 5.656 1 1 0 01-1.414-1.414 2 2 0 000-2.828 1 1 0 010-1.414z",
                                            "clip-rule": "evenodd"
                                          }),
                                          createBaseVNode("path", {
                                            "fill-rule": "evenodd",
                                            d: "M15.536 4.464a1 1 0 011.414 0 8 8 0 010 11.314 1 1 0 11-1.414-1.414 6 6 0 000-8.486 1 1 0 010-1.414z",
                                            "clip-rule": "evenodd"
                                          })
                                        ], -1)
                                      ]), 8, _hoisted_27),
                                      createBaseVNode("button", {
                                        onClick: ($event) => toggleWordMarked(word.id),
                                        class: normalizeClass(["p-1 rounded-full focus:outline-none focus:ring-2 focus:ring-green-500 transition-all duration-300 hover:scale-110", markedWords.value.includes(word.id) ? "bg-green-100 dark:bg-green-900 text-green-600 dark:text-green-400" : "bg-gray-100 dark:bg-gray-600 text-gray-500 dark:text-gray-400"])
                                      }, [
                                        (openBlock(), createElementBlock("svg", _hoisted_29, [
                                          markedWords.value.includes(word.id) ? (openBlock(), createElementBlock("path", _hoisted_30)) : (openBlock(), createElementBlock("path", _hoisted_31))
                                        ]))
                                      ], 10, _hoisted_28)
                                    ])
                                  ], 4);
                                }), 128))
                              ]))
                            ])
                          ])
                        ])
                      ]),
                      createBaseVNode("div", _hoisted_32, [
                        createBaseVNode("div", _hoisted_33, [
                          createBaseVNode("button", {
                            onClick: close,
                            class: "px-4 py-2 bg-white dark:bg-gray-700 border border-gray-300 dark:border-gray-600 rounded-lg text-sm font-medium text-gray-700 dark:text-gray-200 hover:bg-gray-50 dark:hover:bg-gray-600 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-green-500 transition-all duration-300 hover:scale-105 hover:shadow-md transform hover:-translate-y-0.5"
                          }, toDisplayString(unref(t)("common.cancel", "Cancel")), 1),
                          createBaseVNode("button", {
                            onClick: saveNote,
                            class: "px-4 py-2 bg-green-600 hover:bg-green-700 text-white text-sm font-medium rounded-lg focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-green-500 transition-all duration-300 hover:scale-105 hover:shadow-lg transform hover:-translate-y-0.5 flex items-center space-x-2"
                          }, [
                            _cache[9] || (_cache[9] = createBaseVNode("svg", {
                              class: "w-4 h-4",
                              fill: "none",
                              stroke: "currentColor",
                              viewBox: "0 0 24 24"
                            }, [
                              createBaseVNode("path", {
                                "stroke-linecap": "round",
                                "stroke-linejoin": "round",
                                "stroke-width": "2",
                                d: "M5 13l4 4L19 7"
                              })
                            ], -1)),
                            createBaseVNode("span", null, toDisplayString(unref(t)("common.save", "Save")), 1)
                          ])
                        ])
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
const VocabularyNoteDialog = /* @__PURE__ */ _export_sfc(_sfc_main, [["__scopeId", "data-v-6c613da1"]]);
export {
  VocabularyNoteDialog as default
};
//# sourceMappingURL=VocabularyNoteDialog-BRrt5oaQ.js.map
