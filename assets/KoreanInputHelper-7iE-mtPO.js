import { d as defineComponent, H as useI18n, A as ref, B as computed, K as watch, c as createElementBlock, v as openBlock, y as createVNode, w as withCtx, e as createCommentVNode, M as Transition, f as createBaseVNode, i as withModifiers, t as toDisplayString, u as unref, C as withDirectives, S as vModelText, g as createTextVNode, F as Fragment, j as renderList, q as nextTick } from "./vendor-DMqe9Z5T.js";
const _hoisted_1 = {
  key: 0,
  class: "fixed inset-0 bg-gray-600 bg-opacity-50 flex items-center justify-center p-4 z-50 backdrop-blur-sm"
};
const _hoisted_2 = { class: "w-full max-h-[90vh] flex flex-col max-w-full sm:max-w-lg md:max-w-2xl lg:max-w-4xl" };
const _hoisted_3 = { class: "px-6 py-4 border-b border-gray-200 dark:border-gray-700 flex-shrink-0 bg-gradient-to-r from-blue-50 to-indigo-50 dark:from-[#0a0a0a] dark:to-[#0a0a0a]" };
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
const _hoisted_19 = { class: "font-bold text-base" };
const _hoisted_20 = { class: "text-xs text-gray-600 dark:text-gray-400" };
const _hoisted_21 = { class: "text-md font-semibold text-gray-800 dark:text-gray-200 mb-3 flex items-center" };
const _hoisted_22 = { class: "grid grid-cols-4 sm:grid-cols-6 md:grid-cols-8 gap-2" };
const _hoisted_23 = ["onClick", "title"];
const _hoisted_24 = { class: "font-bold text-base" };
const _hoisted_25 = { class: "text-xs text-gray-600 dark:text-gray-400" };
const _hoisted_26 = { class: "text-md font-semibold text-gray-800 dark:text-gray-200 mb-3 flex items-center" };
const _hoisted_27 = { class: "grid grid-cols-6 sm:grid-cols-8 md:grid-cols-10 gap-2" };
const _hoisted_28 = ["onClick"];
const _hoisted_29 = { class: "px-6 py-4 border-t border-gray-200 dark:border-gray-700 flex-shrink-0 bg-gray-50 dark:bg-[#0a0a0a]" };
const _hoisted_30 = { class: "flex justify-between items-center space-x-3" };
const _hoisted_31 = { class: "flex space-x-3" };
const HANGEUL_START = 44032;
const JUNGSUNG_COUNT = 21;
const JONGSUNG_COUNT = 28;
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
    const searchQuery = ref("");
    const searchInputRef = ref(null);
    const koreanConsonants = [
      { char: "ㄱ", romanization: "g/k", description: "g as in go, k as in sky" },
      { char: "ㄴ", romanization: "n", description: "n as in no" },
      { char: "ㄷ", romanization: "d/t", description: "d as in do, t as in stop" },
      { char: "ㄹ", romanization: "r/l", description: "r as in run, l as in love" },
      { char: "ㅁ", romanization: "m", description: "m as in moon" },
      { char: "ㅂ", romanization: "b/p", description: "b as in boy, p as in spy" },
      { char: "ㅅ", romanization: "s", description: "s as in see" },
      { char: "ㅇ", romanization: "ng", description: "ng as in sing (silent at start)" },
      { char: "ㅈ", romanization: "j", description: "j as in jump" },
      { char: "ㅊ", romanization: "ch", description: "ch as in chair" },
      { char: "ㅋ", romanization: "k", description: "k as in key" },
      { char: "ㅌ", romanization: "t", description: "t as in top" },
      { char: "ㅍ", romanization: "p", description: "p as in pie" },
      { char: "ㅎ", romanization: "h", description: "h as in home" },
      { char: "ㄲ", romanization: "kk", description: "stronger k sound" },
      { char: "ㄸ", romanization: "tt", description: "stronger t sound" },
      { char: "ㅃ", romanization: "pp", description: "stronger p sound" },
      { char: "ㅆ", romanization: "ss", description: "stronger s sound" },
      { char: "ㅉ", romanization: "jj", description: "stronger j sound" }
    ];
    const koreanVowels = [
      { char: "ㅏ", romanization: "a", description: "a as in father" },
      { char: "ㅑ", romanization: "ya", description: "ya as in yard" },
      { char: "ㅓ", romanization: "eo", description: "uh as in up" },
      { char: "ㅕ", romanization: "yeo", description: "yuh sound" },
      { char: "ㅗ", romanization: "o", description: "o as in go" },
      { char: "ㅛ", romanization: "yo", description: "yo as in yo-yo" },
      { char: "ㅜ", romanization: "u", description: "u as in moon" },
      { char: "ㅠ", romanization: "yu", description: "yu as in you" },
      { char: "ㅡ", romanization: "eu", description: "uh sound (lips spread)" },
      { char: "ㅣ", romanization: "i", description: "i as in machine" },
      { char: "ㅐ", romanization: "ae", description: "ae as in cat" },
      { char: "ㅒ", romanization: "yae", description: "yae sound" },
      { char: "ㅔ", romanization: "e", description: "e as in red" },
      { char: "ㅖ", romanization: "ye", description: "ye as in yes" },
      { char: "ㅘ", romanization: "wa", description: "wa as in water" },
      { char: "ㅙ", romanization: "wae", description: "wae sound" },
      { char: "ㅚ", romanization: "oe", description: "we sound" },
      { char: "ㅝ", romanization: "wo", description: "wo sound" },
      { char: "ㅞ", romanization: "we", description: "we sound" },
      { char: "ㅟ", romanization: "wi", description: "wi as in we" },
      { char: "ㅢ", romanization: "ui", description: "ui sound" }
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
    const chosungMap = ["ㄱ", "ㄲ", "ㄴ", "ㄷ", "ㄸ", "ㄹ", "ㅁ", "ㅂ", "ㅃ", "ㅅ", "ㅆ", "ㅇ", "ㅈ", "ㅉ", "ㅊ", "ㅋ", "ㅌ", "ㅍ", "ㅎ"];
    const jungsungMap = ["ㅏ", "ㅐ", "ㅑ", "ㅒ", "ㅓ", "ㅔ", "ㅕ", "ㅖ", "ㅗ", "ㅘ", "ㅙ", "ㅚ", "ㅛ", "ㅜ", "ㅝ", "ㅞ", "ㅟ", "ㅠ", "ㅡ", "ㅢ", "ㅣ"];
    const jongsungMap = ["", "ㄱ", "ㄲ", "ㄳ", "ㄴ", "ㄵ", "ㄶ", "ㄷ", "ㄹ", "ㄺ", "ㄻ", "ㄼ", "ㄽ", "ㄾ", "ㄿ", "ㅀ", "ㅁ", "ㅂ", "ㅄ", "ㅅ", "ㅆ", "ㅇ", "ㅈ", "ㅊ", "ㅋ", "ㅌ", "ㅍ", "ㅎ"];
    const isConsonant = (char) => {
      const code = char.charCodeAt(0);
      return code >= 12593 && code <= 12622;
    };
    const isVowel = (char) => {
      const code = char.charCodeAt(0);
      return code >= 12623 && code <= 12643;
    };
    const isSyllable = (char) => {
      const code = char.charCodeAt(0);
      return code >= 44032 && code <= 55203;
    };
    const decomposeSyllable = (syllable) => {
      const code = syllable.charCodeAt(0) - HANGEUL_START;
      const chosung = Math.floor(code / (JUNGSUNG_COUNT * JONGSUNG_COUNT));
      const jungsung = Math.floor(code % (JUNGSUNG_COUNT * JONGSUNG_COUNT) / JONGSUNG_COUNT);
      const jongsung = code % JONGSUNG_COUNT;
      return {
        chosung: chosungMap[chosung],
        jungsung: jungsungMap[jungsung],
        jongsung: jongsung > 0 ? jongsungMap[jongsung] : ""
      };
    };
    const composeSyllable = (chosung, jungsung, jongsung = "") => {
      const chosungIndex = chosungMap.indexOf(chosung);
      const jungsungIndex = jungsungMap.indexOf(jungsung);
      const jongsungIndex = jongsung ? jongsungMap.indexOf(jongsung) : 0;
      if (chosungIndex === -1 || jungsungIndex === -1 || jongsungIndex === -1) {
        return null;
      }
      const syllableCode = HANGEUL_START + chosungIndex * JUNGSUNG_COUNT * JONGSUNG_COUNT + jungsungIndex * JONGSUNG_COUNT + jongsungIndex;
      return String.fromCharCode(syllableCode);
    };
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
    const addCharacter = (character) => {
      const currentText = currentInput.value;
      if (isConsonant(character) || isVowel(character)) {
        const lastChar = currentText.slice(-1);
        if (lastChar && isSyllable(lastChar)) {
          const decomposed = decomposeSyllable(lastChar);
          if (isVowel(character) && decomposed.chosung && !decomposed.jungsung) {
            const newSyllable = composeSyllable(decomposed.chosung, character);
            if (newSyllable) {
              currentInput.value = currentText.slice(0, -1) + newSyllable;
              return;
            }
          } else if (isConsonant(character) && decomposed.chosung && decomposed.jungsung && !decomposed.jongsung) {
            const newSyllable = composeSyllable(decomposed.chosung, decomposed.jungsung, character);
            if (newSyllable) {
              currentInput.value = currentText.slice(0, -1) + newSyllable;
              return;
            }
          }
        } else if (lastChar && isConsonant(lastChar) && isVowel(character)) {
          const newSyllable = composeSyllable(lastChar, character);
          if (newSyllable) {
            currentInput.value = currentText.slice(0, -1) + newSyllable;
            return;
          }
        }
      }
      currentInput.value += character;
      setTimeout(() => {
        focusSearchInput();
      }, 10);
    };
    const clearInput = () => {
      currentInput.value = "";
      setTimeout(() => {
        focusSearchInput();
      }, 10);
    };
    const backspaceInput = () => {
      if (currentInput.value.length === 0) return;
      const currentText = currentInput.value;
      const lastChar = currentText.slice(-1);
      if (isSyllable(lastChar)) {
        const decomposed = decomposeSyllable(lastChar);
        if (decomposed.jongsung) {
          const newSyllable = composeSyllable(decomposed.chosung, decomposed.jungsung);
          if (newSyllable) {
            currentInput.value = currentText.slice(0, -1) + newSyllable;
            return;
          }
        } else if (decomposed.jungsung) {
          currentInput.value = currentText.slice(0, -1) + decomposed.chosung;
          return;
        }
      }
      currentInput.value = currentText.slice(0, -1);
      setTimeout(() => {
        focusSearchInput();
      }, 10);
    };
    const closeDialog = () => {
      emit("update:modelValue", false);
    };
    const confirmInput = () => {
      emit("input-confirmed", currentInput.value);
      emit("update:modelValue", false);
    };
    const filteredConsonants = computed(() => {
      if (!searchQuery.value) return koreanConsonants;
      const query = searchQuery.value.toLowerCase();
      return koreanConsonants.filter(
        (consonant) => consonant.char.includes(query) || consonant.romanization.toLowerCase().includes(query) || consonant.description.toLowerCase().includes(query)
      );
    });
    const filteredVowels = computed(() => {
      if (!searchQuery.value) return koreanVowels;
      const query = searchQuery.value.toLowerCase();
      return koreanVowels.filter(
        (vowel) => vowel.char.includes(query) || vowel.romanization.toLowerCase().includes(query) || vowel.description.toLowerCase().includes(query)
      );
    });
    const filteredCommonSyllables = computed(() => {
      if (!searchQuery.value) return commonKoreanSyllables;
      const query = searchQuery.value.toLowerCase();
      return commonKoreanSyllables.filter((syllable) => syllable.includes(query));
    });
    watch(() => props.initialValue, (newValue) => {
      if (newValue !== void 0) {
        currentInput.value = newValue;
      }
    });
    watch(() => props.modelValue, async (isOpen) => {
      if (isOpen) {
        currentInput.value = props.initialValue || "";
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
                            _cache[3] || (_cache[3] = createBaseVNode("span", { class: "w-2 h-2 bg-blue-500 rounded-full animate-pulse" }, null, -1)),
                            createBaseVNode("span", null, toDisplayString(unref(t)("korean.inputHelper.title", "Korean Input Helper")), 1)
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
                            class: "block w-full pl-10 pr-3 py-2 border border-gray-300 dark:border-dark-bg-mute rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 dark:bg-dark-bg-mute dark:text-white",
                            placeholder: unref(t)("common.search", "Search Korean characters..."),
                            onBlur: refocusSearchInput
                          }, null, 40, _hoisted_8), [
                            [vModelText, searchQuery.value]
                          ])
                        ]),
                        createBaseVNode("div", null, [
                          createBaseVNode("label", _hoisted_9, [
                            _cache[6] || (_cache[6] = createBaseVNode("span", { class: "w-1 h-4 bg-green-500 rounded mr-2" }, null, -1)),
                            createTextVNode(" " + toDisplayString(unref(t)("korean.inputHelper.preview", "Preview")), 1)
                          ]),
                          createBaseVNode("div", _hoisted_10, [
                            withDirectives(createBaseVNode("input", {
                              "onUpdate:modelValue": _cache[1] || (_cache[1] = ($event) => currentInput.value = $event),
                              type: "text",
                              class: "w-full px-3 py-2 pr-20 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-[#0a0a0a] text-gray-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-300 text-lg",
                              placeholder: unref(t)("korean.inputHelper.placeholder", "Type or click characters below..."),
                              readonly: ""
                            }, null, 8, _hoisted_11), [
                              [vModelText, currentInput.value]
                            ]),
                            currentInput.value ? (openBlock(), createElementBlock("button", {
                              key: 0,
                              onClick: backspaceInput,
                              class: "absolute right-12 top-1/2 -translate-y-1/2 w-8 h-6 bg-orange-500 hover:bg-orange-600 text-white rounded flex items-center justify-center text-xs font-bold transition-all duration-300 hover:scale-110",
                              title: unref(t)("common.backspace", "Backspace")
                            }, " ⌫ ", 8, _hoisted_12)) : createCommentVNode("", true),
                            currentInput.value ? (openBlock(), createElementBlock("button", {
                              key: 1,
                              onClick: clearInput,
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
                              createTextVNode(" " + toDisplayString(unref(t)("korean.inputHelper.consonants", "Consonants (자음)")), 1)
                            ]),
                            createBaseVNode("div", _hoisted_17, [
                              (openBlock(true), createElementBlock(Fragment, null, renderList(filteredConsonants.value, (consonant) => {
                                return openBlock(), createElementBlock("button", {
                                  key: consonant.char,
                                  onClick: ($event) => addCharacter(consonant.char),
                                  class: "p-2 bg-blue-100 hover:bg-blue-200 dark:bg-blue-900 dark:hover:bg-blue-800 text-gray-800 dark:text-gray-200 rounded-lg transition-all duration-200 hover:scale-105 flex flex-col items-center text-sm",
                                  title: consonant.description
                                }, [
                                  createBaseVNode("span", _hoisted_19, toDisplayString(consonant.char), 1),
                                  createBaseVNode("span", _hoisted_20, toDisplayString(consonant.romanization), 1)
                                ], 8, _hoisted_18);
                              }), 128))
                            ])
                          ]),
                          createBaseVNode("div", null, [
                            createBaseVNode("h3", _hoisted_21, [
                              _cache[8] || (_cache[8] = createBaseVNode("span", { class: "w-1 h-4 bg-green-500 rounded mr-2" }, null, -1)),
                              createTextVNode(" " + toDisplayString(unref(t)("korean.inputHelper.vowels", "Vowels (모음)")), 1)
                            ]),
                            createBaseVNode("div", _hoisted_22, [
                              (openBlock(true), createElementBlock(Fragment, null, renderList(filteredVowels.value, (vowel) => {
                                return openBlock(), createElementBlock("button", {
                                  key: vowel.char,
                                  onClick: ($event) => addCharacter(vowel.char),
                                  class: "p-2 bg-green-100 hover:bg-green-200 dark:bg-green-900 dark:hover:bg-green-800 text-gray-800 dark:text-gray-200 rounded-lg transition-all duration-200 hover:scale-105 flex flex-col items-center text-sm",
                                  title: vowel.description
                                }, [
                                  createBaseVNode("span", _hoisted_24, toDisplayString(vowel.char), 1),
                                  createBaseVNode("span", _hoisted_25, toDisplayString(vowel.romanization), 1)
                                ], 8, _hoisted_23);
                              }), 128))
                            ])
                          ]),
                          createBaseVNode("div", null, [
                            createBaseVNode("h3", _hoisted_26, [
                              _cache[9] || (_cache[9] = createBaseVNode("span", { class: "w-1 h-4 bg-purple-500 rounded mr-2" }, null, -1)),
                              createTextVNode(" " + toDisplayString(unref(t)("korean.inputHelper.commonSyllables", "Common Syllables")), 1)
                            ]),
                            createBaseVNode("div", _hoisted_27, [
                              (openBlock(true), createElementBlock(Fragment, null, renderList(filteredCommonSyllables.value, (syllable) => {
                                return openBlock(), createElementBlock("button", {
                                  key: syllable,
                                  onClick: ($event) => addCharacter(syllable),
                                  class: "px-3 py-2 bg-purple-100 hover:bg-purple-200 dark:bg-purple-900 dark:hover:bg-purple-800 text-gray-800 dark:text-gray-200 rounded-lg transition-all duration-200 hover:scale-105 font-medium"
                                }, toDisplayString(syllable), 9, _hoisted_28);
                              }), 128))
                            ])
                          ])
                        ])
                      ]),
                      createBaseVNode("div", _hoisted_29, [
                        createBaseVNode("div", _hoisted_30, [
                          createBaseVNode("button", {
                            type: "button",
                            onClick: clearInput,
                            class: "px-4 py-2 text-sm font-medium text-gray-600 dark:text-gray-400 bg-gray-200 dark:bg-gray-700 hover:bg-gray-300 dark:hover:bg-gray-600 rounded-lg transition-all duration-300 hover:scale-105"
                          }, toDisplayString(unref(t)("common.clear", "Clear")), 1),
                          createBaseVNode("div", _hoisted_31, [
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
export {
  _sfc_main as default
};
//# sourceMappingURL=KoreanInputHelper-7iE-mtPO.js.map
