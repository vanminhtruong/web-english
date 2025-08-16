import { d as defineComponent, H as useI18n, A as ref, K as watch, c as createElementBlock, v as openBlock, y as createVNode, w as withCtx, e as createCommentVNode, M as Transition, f as createBaseVNode, i as withModifiers, t as toDisplayString, u as unref, g as createTextVNode, C as withDirectives, S as vModelText, F as Fragment, j as renderList } from "./vendor-DoTKyHPB.js";
import { a as _export_sfc } from "./index-BxypgJoH.js";
import "./vendor-toast-D1B2ty4j.js";
const _hoisted_1 = {
  key: 0,
  class: "fixed inset-0 bg-gray-600 bg-opacity-50 flex items-center justify-center p-4 z-50 backdrop-blur-sm"
};
const _hoisted_2 = { class: "w-full max-h-[90vh] flex flex-col max-w-full sm:max-w-lg md:max-w-2xl lg:max-w-4xl" };
const _hoisted_3 = { class: "px-6 py-4 border-b border-gray-200 dark:border-gray-700 flex-shrink-0 bg-gradient-to-r from-blue-50 to-indigo-50 dark:from-[#0a0a0a] dark:to-[#0a0a0a]" };
const _hoisted_4 = { class: "flex items-center justify-between" };
const _hoisted_5 = { class: "text-lg sm:text-xl md:text-2xl font-semibold text-gray-900 dark:text-white flex items-center space-x-2" };
const _hoisted_6 = { class: "px-6 py-4 flex-1 overflow-y-auto min-h-0" };
const _hoisted_7 = { class: "mb-6" };
const _hoisted_8 = { class: "block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2 flex items-center" };
const _hoisted_9 = { class: "relative" };
const _hoisted_10 = ["placeholder"];
const _hoisted_11 = ["title"];
const _hoisted_12 = ["title"];
const _hoisted_13 = { class: "space-y-6" };
const _hoisted_14 = { class: "text-md font-semibold text-gray-800 dark:text-gray-200 mb-3 flex items-center" };
const _hoisted_15 = { class: "grid grid-cols-8 sm:grid-cols-10 md:grid-cols-14 gap-2" };
const _hoisted_16 = ["onClick"];
const _hoisted_17 = { class: "text-md font-semibold text-gray-800 dark:text-gray-200 mb-3 flex items-center" };
const _hoisted_18 = { class: "grid grid-cols-8 sm:grid-cols-10 md:grid-cols-14 gap-2" };
const _hoisted_19 = ["onClick"];
const _hoisted_20 = { class: "text-md font-semibold text-gray-800 dark:text-gray-200 mb-3 flex items-center" };
const _hoisted_21 = { class: "grid grid-cols-6 sm:grid-cols-8 md:grid-cols-10 gap-2" };
const _hoisted_22 = ["onClick"];
const _hoisted_23 = { class: "px-6 py-4 border-t border-gray-200 dark:border-gray-700 flex-shrink-0 bg-gray-50 dark:bg-[#0a0a0a]" };
const _hoisted_24 = { class: "flex justify-between items-center space-x-3" };
const _hoisted_25 = { class: "flex space-x-3" };
const _sfc_main = /* @__PURE__ */ defineComponent({
  __name: "KoreanInputHelper",
  props: {
    modelValue: { type: Boolean },
    initialValue: { default: "" }
  },
  emits: ["update:modelValue", "input-confirmed"],
  setup(__props, { emit: __emit }) {
    const props = __props;
    const emit = __emit;
    const { t } = useI18n();
    const currentInput = ref("");
    const koreanConsonants = [
      "ㄱ",
      "ㄴ",
      "ㄷ",
      "ㄹ",
      "ㅁ",
      "ㅂ",
      "ㅅ",
      "ㅇ",
      "ㅈ",
      "ㅊ",
      "ㅋ",
      "ㅌ",
      "ㅍ",
      "ㅎ",
      "ㄲ",
      "ㄸ",
      "ㅃ",
      "ㅆ",
      "ㅉ"
    ];
    const koreanVowels = [
      "ㅏ",
      "ㅑ",
      "ㅓ",
      "ㅕ",
      "ㅗ",
      "ㅛ",
      "ㅜ",
      "ㅠ",
      "ㅡ",
      "ㅣ",
      "ㅐ",
      "ㅒ",
      "ㅔ",
      "ㅖ",
      "ㅘ",
      "ㅙ",
      "ㅚ",
      "ㅝ",
      "ㅞ",
      "ㅟ",
      "ㅢ"
    ];
    const commonKoreanSyllables = [
      // Basic syllables (기본 음절)
      "가",
      "나",
      "다",
      "라",
      "마",
      "바",
      "사",
      "아",
      "자",
      "차",
      "카",
      "타",
      "파",
      "하",
      // Common particles & endings (조사 및 어미)
      "은",
      "을",
      "이",
      "가",
      "의",
      "에",
      "로",
      "와",
      "과",
      "나",
      "도",
      "만",
      "부터",
      "까지",
      // Frequent syllables (자주 쓰이는 음절)
      "고",
      "수",
      "한",
      "그",
      "요",
      "지",
      "시",
      "인",
      "대",
      "중",
      "모",
      "서",
      "있",
      "있다",
      // Common verbs/adjectives (동사/형용사)
      "하다",
      "되다",
      "있다",
      "없다",
      "같다",
      "다르다",
      "좋다",
      "나쁘다",
      "크다",
      "작다",
      // Common nouns (명사)
      "사람",
      "시간",
      "일",
      "날",
      "년",
      "월",
      "주",
      "분",
      "초",
      "때",
      "곳",
      "것",
      "말",
      "글",
      // Common adverbs (부사)
      "정말",
      "진짜",
      "아주",
      "매우",
      "너무",
      "조금",
      "많이",
      "잘",
      "못",
      "안",
      "또",
      "다시",
      // Numbers (숫자)
      "일",
      "이",
      "삼",
      "사",
      "오",
      "육",
      "칠",
      "팔",
      "구",
      "십",
      "백",
      "천",
      "만"
    ];
    const addCharacter = (character) => {
      currentInput.value += character;
    };
    const clearInput = () => {
      currentInput.value = "";
    };
    const backspaceInput = () => {
      if (currentInput.value.length > 0) {
        currentInput.value = currentInput.value.slice(0, -1);
      }
    };
    const closeDialog = () => {
      emit("update:modelValue", false);
    };
    const confirmInput = () => {
      emit("input-confirmed", currentInput.value);
      emit("update:modelValue", false);
    };
    watch(() => props.initialValue, (newValue) => {
      currentInput.value = newValue;
    }, { immediate: true });
    watch(() => props.modelValue, (isOpen) => {
      if (isOpen) {
        currentInput.value = props.initialValue;
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
                            _cache[2] || (_cache[2] = createBaseVNode("span", { class: "w-2 h-2 bg-blue-500 rounded-full animate-pulse" }, null, -1)),
                            createBaseVNode("span", null, toDisplayString(unref(t)("korean.inputHelper.title", "Korean Input Helper")), 1)
                          ]),
                          createBaseVNode("button", {
                            onClick: closeDialog,
                            class: "text-gray-400 hover:text-gray-600 dark:hover:text-gray-200 transition-all duration-300 hover:scale-110 hover:rotate-90 p-1 rounded-full hover:bg-gray-100 dark:hover:bg-gray-800"
                          }, _cache[3] || (_cache[3] = [
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
                          createBaseVNode("label", _hoisted_8, [
                            _cache[4] || (_cache[4] = createBaseVNode("span", { class: "w-1 h-4 bg-green-500 rounded mr-2" }, null, -1)),
                            createTextVNode(" " + toDisplayString(unref(t)("korean.inputHelper.preview", "Preview")), 1)
                          ]),
                          createBaseVNode("div", _hoisted_9, [
                            withDirectives(createBaseVNode("input", {
                              "onUpdate:modelValue": _cache[0] || (_cache[0] = ($event) => currentInput.value = $event),
                              type: "text",
                              class: "w-full px-3 py-2 pr-20 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-[#0a0a0a] text-gray-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-300 text-lg",
                              placeholder: unref(t)("korean.inputHelper.placeholder", "Type or click characters below..."),
                              readonly: ""
                            }, null, 8, _hoisted_10), [
                              [vModelText, currentInput.value]
                            ]),
                            currentInput.value ? (openBlock(), createElementBlock("button", {
                              key: 0,
                              onClick: backspaceInput,
                              class: "absolute right-12 top-1/2 -translate-y-1/2 w-8 h-6 bg-orange-500 hover:bg-orange-600 text-white rounded flex items-center justify-center text-xs font-bold transition-all duration-300 hover:scale-110",
                              title: unref(t)("common.backspace", "Backspace")
                            }, " ⌫ ", 8, _hoisted_11)) : createCommentVNode("", true),
                            currentInput.value ? (openBlock(), createElementBlock("button", {
                              key: 1,
                              onClick: clearInput,
                              class: "absolute right-2 top-1/2 -translate-y-1/2 w-6 h-6 bg-red-500 hover:bg-red-600 text-white rounded-full flex items-center justify-center text-xs font-bold transition-all duration-300 hover:scale-110",
                              title: unref(t)("common.clear", "Clear")
                            }, " × ", 8, _hoisted_12)) : createCommentVNode("", true)
                          ])
                        ]),
                        createBaseVNode("div", _hoisted_13, [
                          createBaseVNode("div", null, [
                            createBaseVNode("h3", _hoisted_14, [
                              _cache[5] || (_cache[5] = createBaseVNode("span", { class: "w-1 h-4 bg-blue-500 rounded mr-2" }, null, -1)),
                              createTextVNode(" " + toDisplayString(unref(t)("korean.inputHelper.consonants", "Consonants (자음)")), 1)
                            ]),
                            createBaseVNode("div", _hoisted_15, [
                              (openBlock(), createElementBlock(Fragment, null, renderList(koreanConsonants, (consonant) => {
                                return createBaseVNode("button", {
                                  key: consonant,
                                  onClick: ($event) => addCharacter(consonant),
                                  class: "w-8 h-8 sm:w-10 sm:h-10 bg-blue-100 hover:bg-blue-200 dark:bg-blue-900 dark:hover:bg-blue-800 text-gray-800 dark:text-gray-200 rounded-lg transition-all duration-200 hover:scale-110 flex items-center justify-center font-bold text-sm sm:text-base"
                                }, toDisplayString(consonant), 9, _hoisted_16);
                              }), 64))
                            ])
                          ]),
                          createBaseVNode("div", null, [
                            createBaseVNode("h3", _hoisted_17, [
                              _cache[6] || (_cache[6] = createBaseVNode("span", { class: "w-1 h-4 bg-green-500 rounded mr-2" }, null, -1)),
                              createTextVNode(" " + toDisplayString(unref(t)("korean.inputHelper.vowels", "Vowels (모음)")), 1)
                            ]),
                            createBaseVNode("div", _hoisted_18, [
                              (openBlock(), createElementBlock(Fragment, null, renderList(koreanVowels, (vowel) => {
                                return createBaseVNode("button", {
                                  key: vowel,
                                  onClick: ($event) => addCharacter(vowel),
                                  class: "w-8 h-8 sm:w-10 sm:h-10 bg-green-100 hover:bg-green-200 dark:bg-green-900 dark:hover:bg-green-800 text-gray-800 dark:text-gray-200 rounded-lg transition-all duration-200 hover:scale-110 flex items-center justify-center font-bold text-sm sm:text-base"
                                }, toDisplayString(vowel), 9, _hoisted_19);
                              }), 64))
                            ])
                          ]),
                          createBaseVNode("div", null, [
                            createBaseVNode("h3", _hoisted_20, [
                              _cache[7] || (_cache[7] = createBaseVNode("span", { class: "w-1 h-4 bg-purple-500 rounded mr-2" }, null, -1)),
                              createTextVNode(" " + toDisplayString(unref(t)("korean.inputHelper.commonSyllables", "Common Syllables")), 1)
                            ]),
                            createBaseVNode("div", _hoisted_21, [
                              (openBlock(), createElementBlock(Fragment, null, renderList(commonKoreanSyllables, (syllable) => {
                                return createBaseVNode("button", {
                                  key: syllable,
                                  onClick: ($event) => addCharacter(syllable),
                                  class: "w-10 h-10 sm:w-12 sm:h-12 bg-purple-100 hover:bg-purple-200 dark:bg-purple-900 dark:hover:bg-purple-800 text-gray-800 dark:text-gray-200 rounded-lg transition-all duration-200 hover:scale-110 flex items-center justify-center font-bold text-base"
                                }, toDisplayString(syllable), 9, _hoisted_22);
                              }), 64))
                            ])
                          ])
                        ])
                      ]),
                      createBaseVNode("div", _hoisted_23, [
                        createBaseVNode("div", _hoisted_24, [
                          createBaseVNode("button", {
                            type: "button",
                            onClick: clearInput,
                            class: "px-4 py-2 text-sm font-medium text-gray-600 dark:text-gray-400 bg-gray-200 dark:bg-gray-700 hover:bg-gray-300 dark:hover:bg-gray-600 rounded-lg transition-all duration-300 hover:scale-105"
                          }, toDisplayString(unref(t)("common.clear", "Clear")), 1),
                          createBaseVNode("div", _hoisted_25, [
                            createBaseVNode("button", {
                              type: "button",
                              onClick: closeDialog,
                              class: "px-4 py-2 text-sm font-medium text-gray-600 dark:text-gray-400 bg-gray-200 dark:bg-gray-700 hover:bg-gray-300 dark:hover:bg-gray-600 rounded-lg transition-all duration-300 hover:scale-105"
                            }, toDisplayString(unref(t)("common.cancel", "Cancel")), 1),
                            createBaseVNode("button", {
                              type: "button",
                              onClick: confirmInput,
                              class: "px-4 py-2 text-sm font-medium text-white bg-blue-600 hover:bg-blue-700 rounded-lg transition-all duration-300 hover:scale-105 shadow-lg"
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
const KoreanInputHelper = /* @__PURE__ */ _export_sfc(_sfc_main, [["__scopeId", "data-v-4de06e4e"]]);
export {
  KoreanInputHelper as default
};
//# sourceMappingURL=KoreanInputHelper-c5FnVm6c.js.map
