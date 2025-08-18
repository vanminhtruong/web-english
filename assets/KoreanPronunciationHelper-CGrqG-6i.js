import { d as defineComponent, H as useI18n, A as ref, B as computed, K as watch, c as createElementBlock, v as openBlock, y as createVNode, w as withCtx, e as createCommentVNode, M as Transition, f as createBaseVNode, i as withModifiers, t as toDisplayString, u as unref, C as withDirectives, S as vModelText, g as createTextVNode, F as Fragment, j as renderList, q as nextTick } from "./vendor-DMqe9Z5T.js";
import { a as _export_sfc } from "./index-iWRK7fK0.js";
import "./vendor-toast-C02QcIAu.js";
const _hoisted_1 = {
  key: 0,
  class: "fixed inset-0 bg-gray-600 bg-opacity-50 flex items-center justify-center p-4 z-50 backdrop-blur-sm"
};
const _hoisted_2 = { class: "w-full max-h-[90vh] flex flex-col max-w-full sm:max-w-lg md:max-w-2xl lg:max-w-4xl" };
const _hoisted_3 = { class: "px-6 py-4 border-b border-gray-200 dark:border-gray-700 flex-shrink-0 bg-gradient-to-r from-green-50 to-emerald-50 dark:from-[#0a0a0a] dark:to-[#0a0a0a]" };
const _hoisted_4 = { class: "flex items-center justify-between" };
const _hoisted_5 = { class: "text-lg sm:text-xl md:text-2xl font-semibold text-gray-900 dark:text-white flex items-center space-x-2" };
const _hoisted_6 = { class: "px-6 py-4 border-b border-gray-200 dark:border-gray-700 bg-white dark:bg-[#0a0a0a] sticky top-0 z-10" };
const _hoisted_7 = { class: "relative mb-4" };
const _hoisted_8 = ["placeholder"];
const _hoisted_9 = { class: "block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2 flex items-center" };
const _hoisted_10 = { class: "relative" };
const _hoisted_11 = ["placeholder"];
const _hoisted_12 = ["title"];
const _hoisted_13 = ["title"];
const _hoisted_14 = { class: "px-6 py-4 flex-1 overflow-y-auto min-h-0" };
const _hoisted_15 = { class: "space-y-6" };
const _hoisted_16 = { class: "text-md font-semibold text-gray-800 dark:text-gray-200 mb-3 flex items-center" };
const _hoisted_17 = { class: "grid grid-cols-4 sm:grid-cols-6 md:grid-cols-8 gap-2" };
const _hoisted_18 = ["onClick", "title"];
const _hoisted_19 = { class: "font-bold" };
const _hoisted_20 = { class: "text-xs text-gray-600 dark:text-gray-400" };
const _hoisted_21 = { class: "text-md font-semibold text-gray-800 dark:text-gray-200 mb-3 flex items-center" };
const _hoisted_22 = { class: "grid grid-cols-4 sm:grid-cols-6 md:grid-cols-8 gap-2" };
const _hoisted_23 = ["onClick", "title"];
const _hoisted_24 = { class: "font-bold" };
const _hoisted_25 = { class: "text-xs text-gray-600 dark:text-gray-400" };
const _hoisted_26 = { class: "text-md font-semibold text-gray-800 dark:text-gray-200 mb-3 flex items-center" };
const _hoisted_27 = { class: "grid grid-cols-3 sm:grid-cols-4 md:grid-cols-6 gap-2" };
const _hoisted_28 = ["onClick", "title"];
const _hoisted_29 = { class: "font-bold" };
const _hoisted_30 = { class: "text-xs text-gray-600 dark:text-gray-400" };
const _hoisted_31 = { class: "text-md font-semibold text-gray-800 dark:text-gray-200 mb-3 flex items-center" };
const _hoisted_32 = { class: "flex flex-wrap gap-2" };
const _hoisted_33 = ["onClick", "title"];
const _hoisted_34 = { class: "px-6 py-4 border-t border-gray-200 dark:border-gray-700 flex-shrink-0 bg-gray-50 dark:bg-[#0a0a0a]" };
const _hoisted_35 = { class: "flex justify-between items-center space-x-3" };
const _hoisted_36 = { class: "flex space-x-3" };
const _sfc_main = /* @__PURE__ */ defineComponent({
  __name: "KoreanPronunciationHelper",
  props: {
    modelValue: { type: Boolean },
    initialValue: { default: "" }
  },
  emits: ["update:modelValue", "pronunciation-confirmed"],
  setup(__props, { emit: __emit }) {
    const props = __props;
    const emit = __emit;
    const { t } = useI18n();
    const currentPronunciation = ref("");
    const searchQuery = ref("");
    const searchInputRef = ref(null);
    const koreanConsonantSounds = [
      { korean: "ㄱ", romanization: "g/k", description: "g as in go, k as in sky" },
      { korean: "ㄴ", romanization: "n", description: "n as in no" },
      { korean: "ㄷ", romanization: "d/t", description: "d as in do, t as in stop" },
      { korean: "ㄹ", romanization: "r/l", description: "r as in run, l as in love" },
      { korean: "ㅁ", romanization: "m", description: "m as in moon" },
      { korean: "ㅂ", romanization: "b/p", description: "b as in boy, p as in spy" },
      { korean: "ㅅ", romanization: "s", description: "s as in see" },
      { korean: "ㅇ", romanization: "ng", description: "ng as in sing" },
      { korean: "ㅈ", romanization: "j", description: "j as in jump" },
      { korean: "ㅊ", romanization: "ch", description: "ch as in chair" },
      { korean: "ㅋ", romanization: "k", description: "k as in key" },
      { korean: "ㅌ", romanization: "t", description: "t as in top" },
      { korean: "ㅍ", romanization: "p", description: "p as in pie" },
      { korean: "ㅎ", romanization: "h", description: "h as in home" },
      { korean: "ㄲ", romanization: "kk", description: "stronger k sound" },
      { korean: "ㄸ", romanization: "tt", description: "stronger t sound" },
      { korean: "ㅃ", romanization: "pp", description: "stronger p sound" },
      { korean: "ㅆ", romanization: "ss", description: "stronger s sound" },
      { korean: "ㅉ", romanization: "jj", description: "stronger j sound" }
    ];
    const koreanVowelSounds = [
      { korean: "ㅏ", romanization: "a", description: "a as in father" },
      { korean: "ㅑ", romanization: "ya", description: "ya as in yard" },
      { korean: "ㅓ", romanization: "eo", description: "uh as in up" },
      { korean: "ㅕ", romanization: "yeo", description: "yuh sound" },
      { korean: "ㅗ", romanization: "o", description: "o as in go" },
      { korean: "ㅛ", romanization: "yo", description: "yo as in yo-yo" },
      { korean: "ㅜ", romanization: "u", description: "u as in moon" },
      { korean: "ㅠ", romanization: "yu", description: "yu as in you" },
      { korean: "ㅡ", romanization: "eu", description: "uh sound (lips spread)" },
      { korean: "ㅣ", romanization: "i", description: "i as in machine" },
      { korean: "ㅐ", romanization: "ae", description: "ae as in cat" },
      { korean: "ㅒ", romanization: "yae", description: "yae sound" },
      { korean: "ㅔ", romanization: "e", description: "e as in red" },
      { korean: "ㅖ", romanization: "ye", description: "ye as in yes" },
      { korean: "ㅘ", romanization: "wa", description: "wa as in water" },
      { korean: "ㅙ", romanization: "wae", description: "wae sound" },
      { korean: "ㅚ", romanization: "oe", description: "we sound" },
      { korean: "ㅝ", romanization: "wo", description: "wo sound" },
      { korean: "ㅞ", romanization: "we", description: "we sound" },
      { korean: "ㅟ", romanization: "wi", description: "wi as in we" },
      { korean: "ㅢ", romanization: "ui", description: "ui sound" }
    ];
    const commonKoreanPatterns = [
      { korean: "안", romanization: "an", description: "an sound" },
      { korean: "음", romanization: "eum", description: "eum sound" },
      { korean: "이", romanization: "i", description: "i sound" },
      { korean: "은", romanization: "eun", description: "eun sound" },
      { korean: "을", romanization: "eul", description: "eul sound" },
      { korean: "의", romanization: "ui", description: "ui sound" },
      { korean: "에", romanization: "e", description: "e sound" },
      { korean: "게", romanization: "ge", description: "ge sound" },
      { korean: "세", romanization: "se", description: "se sound" },
      { korean: "데", romanization: "de", description: "de sound" },
      { korean: "네", romanization: "ne", description: "ne sound" },
      { korean: "베", romanization: "be", description: "be sound" }
    ];
    const specialChars = [
      { char: "-", description: "Syllable separator" },
      { char: "'", description: "Glottal stop" },
      { char: ":", description: "Long vowel marker" },
      { char: " ", description: "Space" },
      { char: "(", description: "Open parenthesis" },
      { char: ")", description: "Close parenthesis" },
      { char: "[", description: "Open bracket" },
      { char: "]", description: "Close bracket" }
    ];
    const filteredConsonantSounds = computed(() => {
      if (!searchQuery.value) return koreanConsonantSounds;
      const query = searchQuery.value.toLowerCase();
      return koreanConsonantSounds.filter(
        (sound) => sound.korean.includes(query) || sound.romanization.toLowerCase().includes(query) || sound.description.toLowerCase().includes(query)
      );
    });
    const filteredVowelSounds = computed(() => {
      if (!searchQuery.value) return koreanVowelSounds;
      const query = searchQuery.value.toLowerCase();
      return koreanVowelSounds.filter(
        (sound) => sound.korean.includes(query) || sound.romanization.toLowerCase().includes(query) || sound.description.toLowerCase().includes(query)
      );
    });
    const filteredCommonPatterns = computed(() => {
      if (!searchQuery.value) return commonKoreanPatterns;
      const query = searchQuery.value.toLowerCase();
      return commonKoreanPatterns.filter(
        (pattern) => pattern.korean.includes(query) || pattern.romanization.toLowerCase().includes(query) || pattern.description.toLowerCase().includes(query)
      );
    });
    const focusSearchInput = () => {
      if (searchInputRef.value) {
        searchInputRef.value.focus();
      }
    };
    const refocusSearchInput = () => {
      setTimeout(() => {
        focusSearchInput();
      }, 50);
    };
    const addSound = (sound) => {
      currentPronunciation.value += sound;
      setTimeout(() => {
        focusSearchInput();
      }, 10);
    };
    const clearPronunciation = () => {
      currentPronunciation.value = "";
      setTimeout(() => {
        focusSearchInput();
      }, 10);
    };
    const backspacePronunciation = () => {
      if (currentPronunciation.value.length > 0) {
        currentPronunciation.value = currentPronunciation.value.slice(0, -1);
      }
      setTimeout(() => {
        focusSearchInput();
      }, 10);
    };
    const closeDialog = () => {
      emit("update:modelValue", false);
    };
    const confirmPronunciation = () => {
      emit("pronunciation-confirmed", currentPronunciation.value);
      emit("update:modelValue", false);
    };
    watch(() => props.initialValue, (newValue) => {
      currentPronunciation.value = newValue;
    }, { immediate: true });
    watch(() => props.modelValue, async (isOpen) => {
      if (isOpen) {
        currentPronunciation.value = props.initialValue;
        searchQuery.value = "";
        await nextTick();
        setTimeout(() => {
          focusSearchInput();
        }, 100);
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
                      onClick: _cache[2] || (_cache[2] = withModifiers(() => {
                      }, ["stop"]))
                    }, [
                      createBaseVNode("div", _hoisted_3, [
                        createBaseVNode("div", _hoisted_4, [
                          createBaseVNode("h2", _hoisted_5, [
                            _cache[3] || (_cache[3] = createBaseVNode("span", { class: "w-2 h-2 bg-green-500 rounded-full animate-pulse" }, null, -1)),
                            createBaseVNode("span", null, toDisplayString(unref(t)("korean.pronunciationHelper.title", "Korean Pronunciation Helper")), 1)
                          ]),
                          createBaseVNode("button", {
                            onClick: closeDialog,
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
                      createBaseVNode("div", _hoisted_6, [
                        createBaseVNode("div", _hoisted_7, [
                          _cache[5] || (_cache[5] = createBaseVNode("div", { class: "absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none" }, [
                            createBaseVNode("svg", {
                              class: "h-5 w-5 text-gray-400",
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
                            ])
                          ], -1)),
                          withDirectives(createBaseVNode("input", {
                            ref_key: "searchInputRef",
                            ref: searchInputRef,
                            "onUpdate:modelValue": _cache[0] || (_cache[0] = ($event) => searchQuery.value = $event),
                            type: "text",
                            class: "block w-full pl-10 pr-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-green-500 dark:bg-[#0a0a0a] dark:text-white",
                            placeholder: unref(t)("common.search", "Search Korean sounds..."),
                            onBlur: refocusSearchInput
                          }, null, 40, _hoisted_8), [
                            [vModelText, searchQuery.value]
                          ])
                        ]),
                        createBaseVNode("div", null, [
                          createBaseVNode("label", _hoisted_9, [
                            _cache[6] || (_cache[6] = createBaseVNode("span", { class: "w-1 h-4 bg-green-500 rounded mr-2" }, null, -1)),
                            createTextVNode(" " + toDisplayString(unref(t)("korean.pronunciationHelper.preview", "Pronunciation Preview")), 1)
                          ]),
                          createBaseVNode("div", _hoisted_10, [
                            withDirectives(createBaseVNode("input", {
                              "onUpdate:modelValue": _cache[1] || (_cache[1] = ($event) => currentPronunciation.value = $event),
                              type: "text",
                              class: "w-full px-3 py-2 pr-20 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-[#0a0a0a] text-gray-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-transparent transition-all duration-300 text-lg",
                              placeholder: unref(t)("korean.pronunciationHelper.placeholder", "Click Korean sounds below..."),
                              readonly: ""
                            }, null, 8, _hoisted_11), [
                              [vModelText, currentPronunciation.value]
                            ]),
                            currentPronunciation.value ? (openBlock(), createElementBlock("button", {
                              key: 0,
                              onClick: backspacePronunciation,
                              class: "absolute right-12 top-1/2 -translate-y-1/2 w-8 h-6 bg-orange-500 hover:bg-orange-600 text-white rounded flex items-center justify-center text-xs font-bold transition-all duration-300 hover:scale-110",
                              title: unref(t)("common.backspace", "Backspace")
                            }, " ⌫ ", 8, _hoisted_12)) : createCommentVNode("", true),
                            currentPronunciation.value ? (openBlock(), createElementBlock("button", {
                              key: 1,
                              onClick: clearPronunciation,
                              class: "absolute right-2 top-1/2 -translate-y-1/2 w-6 h-6 bg-red-500 hover:bg-red-600 text-white rounded-full flex items-center justify-center text-xs font-bold transition-all duration-300 hover:scale-110",
                              title: unref(t)("common.clear", "Clear")
                            }, " × ", 8, _hoisted_13)) : createCommentVNode("", true)
                          ])
                        ])
                      ]),
                      createBaseVNode("div", _hoisted_14, [
                        createBaseVNode("div", _hoisted_15, [
                          createBaseVNode("div", null, [
                            createBaseVNode("h3", _hoisted_16, [
                              _cache[7] || (_cache[7] = createBaseVNode("span", { class: "w-1 h-4 bg-blue-500 rounded mr-2" }, null, -1)),
                              createTextVNode(" " + toDisplayString(unref(t)("korean.pronunciationHelper.consonantSounds", "Consonant Sounds (자음 소리)")), 1)
                            ]),
                            createBaseVNode("div", _hoisted_17, [
                              (openBlock(true), createElementBlock(Fragment, null, renderList(filteredConsonantSounds.value, (sound) => {
                                return openBlock(), createElementBlock("button", {
                                  key: sound.korean,
                                  onClick: ($event) => addSound(sound.romanization),
                                  class: "p-2 bg-blue-100 hover:bg-blue-200 dark:bg-blue-900 dark:hover:bg-blue-800 text-gray-800 dark:text-gray-200 rounded-lg transition-all duration-200 hover:scale-105 flex flex-col items-center text-sm",
                                  title: sound.description
                                }, [
                                  createBaseVNode("span", _hoisted_19, toDisplayString(sound.korean), 1),
                                  createBaseVNode("span", _hoisted_20, toDisplayString(sound.romanization), 1)
                                ], 8, _hoisted_18);
                              }), 128))
                            ])
                          ]),
                          createBaseVNode("div", null, [
                            createBaseVNode("h3", _hoisted_21, [
                              _cache[8] || (_cache[8] = createBaseVNode("span", { class: "w-1 h-4 bg-green-500 rounded mr-2" }, null, -1)),
                              createTextVNode(" " + toDisplayString(unref(t)("korean.pronunciationHelper.vowelSounds", "Vowel Sounds (모음 소리)")), 1)
                            ]),
                            createBaseVNode("div", _hoisted_22, [
                              (openBlock(true), createElementBlock(Fragment, null, renderList(filteredVowelSounds.value, (sound) => {
                                return openBlock(), createElementBlock("button", {
                                  key: sound.korean,
                                  onClick: ($event) => addSound(sound.romanization),
                                  class: "p-2 bg-green-100 hover:bg-green-200 dark:bg-green-900 dark:hover:bg-green-800 text-gray-800 dark:text-gray-200 rounded-lg transition-all duration-200 hover:scale-105 flex flex-col items-center text-sm",
                                  title: sound.description
                                }, [
                                  createBaseVNode("span", _hoisted_24, toDisplayString(sound.korean), 1),
                                  createBaseVNode("span", _hoisted_25, toDisplayString(sound.romanization), 1)
                                ], 8, _hoisted_23);
                              }), 128))
                            ])
                          ]),
                          createBaseVNode("div", null, [
                            createBaseVNode("h3", _hoisted_26, [
                              _cache[9] || (_cache[9] = createBaseVNode("span", { class: "w-1 h-4 bg-purple-500 rounded mr-2" }, null, -1)),
                              createTextVNode(" " + toDisplayString(unref(t)("korean.pronunciationHelper.commonPatterns", "Common Patterns")), 1)
                            ]),
                            createBaseVNode("div", _hoisted_27, [
                              (openBlock(true), createElementBlock(Fragment, null, renderList(filteredCommonPatterns.value, (pattern) => {
                                return openBlock(), createElementBlock("button", {
                                  key: pattern.korean,
                                  onClick: ($event) => addSound(pattern.romanization),
                                  class: "p-2 bg-purple-100 hover:bg-purple-200 dark:bg-purple-900 dark:hover:bg-purple-800 text-gray-800 dark:text-gray-200 rounded-lg transition-all duration-200 hover:scale-105 flex flex-col items-center text-sm",
                                  title: pattern.description
                                }, [
                                  createBaseVNode("span", _hoisted_29, toDisplayString(pattern.korean), 1),
                                  createBaseVNode("span", _hoisted_30, toDisplayString(pattern.romanization), 1)
                                ], 8, _hoisted_28);
                              }), 128))
                            ])
                          ]),
                          createBaseVNode("div", null, [
                            createBaseVNode("h3", _hoisted_31, [
                              _cache[10] || (_cache[10] = createBaseVNode("span", { class: "w-1 h-4 bg-yellow-500 rounded mr-2" }, null, -1)),
                              createTextVNode(" " + toDisplayString(unref(t)("korean.pronunciationHelper.specialChars", "Special Characters")), 1)
                            ]),
                            createBaseVNode("div", _hoisted_32, [
                              (openBlock(), createElementBlock(Fragment, null, renderList(specialChars, (char) => {
                                return createBaseVNode("button", {
                                  key: char.char,
                                  onClick: ($event) => addSound(char.char),
                                  class: "px-3 py-2 bg-yellow-100 hover:bg-yellow-200 dark:bg-yellow-900 dark:hover:bg-yellow-800 text-gray-800 dark:text-gray-200 rounded-lg transition-all duration-200 hover:scale-105 text-sm font-mono",
                                  title: char.description
                                }, toDisplayString(char.char), 9, _hoisted_33);
                              }), 64))
                            ])
                          ])
                        ])
                      ]),
                      createBaseVNode("div", _hoisted_34, [
                        createBaseVNode("div", _hoisted_35, [
                          createBaseVNode("button", {
                            type: "button",
                            onClick: clearPronunciation,
                            class: "px-4 py-2 text-sm font-medium text-gray-600 dark:text-gray-400 bg-gray-200 dark:bg-gray-700 hover:bg-gray-300 dark:hover:bg-gray-600 rounded-lg transition-all duration-300 hover:scale-105"
                          }, toDisplayString(unref(t)("common.clear", "Clear")), 1),
                          createBaseVNode("div", _hoisted_36, [
                            createBaseVNode("button", {
                              type: "button",
                              onClick: closeDialog,
                              class: "px-4 py-2 text-sm font-medium text-gray-600 dark:text-gray-400 bg-gray-200 dark:bg-gray-700 hover:bg-gray-300 dark:hover:bg-gray-600 rounded-lg transition-all duration-300 hover:scale-105"
                            }, toDisplayString(unref(t)("common.cancel", "Cancel")), 1),
                            createBaseVNode("button", {
                              type: "button",
                              onClick: confirmPronunciation,
                              class: "px-4 py-2 text-sm font-medium text-white bg-green-600 hover:bg-green-700 rounded-lg transition-all duration-300 hover:scale-105 shadow-lg"
                            }, toDisplayString(unref(t)("common.confirm", "Confirm")), 1)
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
const KoreanPronunciationHelper = /* @__PURE__ */ _export_sfc(_sfc_main, [["__scopeId", "data-v-6520a892"]]);
export {
  KoreanPronunciationHelper as default
};
//# sourceMappingURL=KoreanPronunciationHelper-CGrqG-6i.js.map
