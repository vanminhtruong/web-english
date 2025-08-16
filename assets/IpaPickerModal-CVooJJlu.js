import { d as defineComponent, H as useI18n, A as ref, B as computed, K as watch, b as createBlock, v as openBlock, y as createVNode, w as withCtx, c as createElementBlock, e as createCommentVNode, M as Transition, f as createBaseVNode, i as withModifiers, t as toDisplayString, u as unref, C as withDirectives, S as vModelText, g as createTextVNode, F as Fragment, j as renderList, a0 as Teleport, q as nextTick } from "./vendor-DoTKyHPB.js";
import { e as useVoiceStore } from "./index-DNV1vyJL.js";
import "./vendor-toast-D1B2ty4j.js";
const _hoisted_1 = {
  key: 0,
  class: "fixed inset-0 bg-black/50 flex items-center justify-center p-4 z-[60000] backdrop-blur-sm"
};
const _hoisted_2 = { class: "w-full max-w-2xl max-h-[90vh]" };
const _hoisted_3 = { class: "px-5 py-4 border-b border-gray-200 dark:border-dark-bg-mute bg-gradient-to-r from-blue-50 to-indigo-50 dark:from-dark-bg-soft dark:to-dark-bg-soft flex items-center justify-between" };
const _hoisted_4 = { class: "text-lg font-semibold text-gray-900 dark:text-white flex items-center space-x-2" };
const _hoisted_5 = ["title", "aria-label"];
const _hoisted_6 = { class: "px-5 py-4 border-b border-gray-200 dark:border-dark-bg-mute bg-white dark:bg-dark-bg-soft sticky top-0 z-10" };
const _hoisted_7 = { class: "relative mb-4" };
const _hoisted_8 = ["placeholder"];
const _hoisted_9 = { class: "p-3 rounded-lg border border-gray-200 dark:border-dark-bg-mute bg-white dark:bg-dark-bg-mute mb-4" };
const _hoisted_10 = { class: "text-2xl md:text-3xl font-mono text-gray-900 dark:text-white break-words min-h-[2.5rem]" };
const _hoisted_11 = { class: "flex flex-wrap gap-2" };
const _hoisted_12 = ["title", "aria-label"];
const _hoisted_13 = ["title", "aria-label"];
const _hoisted_14 = ["title", "aria-label"];
const _hoisted_15 = ["title", "aria-label"];
const _hoisted_16 = { class: "px-5 py-4 space-y-4 overflow-y-auto flex-1 min-h-0" };
const _hoisted_17 = { class: "space-y-4" };
const _hoisted_18 = { class: "text-sm font-medium text-gray-600 dark:text-white/70 mb-2 flex items-center" };
const _hoisted_19 = { class: "grid grid-cols-3 sm:grid-cols-4 md:grid-cols-6 gap-2" };
const _hoisted_20 = ["onClick", "title"];
const _hoisted_21 = { class: "font-bold text-base" };
const _hoisted_22 = { class: "text-xs text-gray-600 dark:text-gray-400" };
const _hoisted_23 = ["onClick", "title"];
const _hoisted_24 = { class: "text-sm font-medium text-gray-600 dark:text-white/70 mb-2 flex items-center" };
const _hoisted_25 = { class: "grid grid-cols-3 sm:grid-cols-4 md:grid-cols-5 gap-2" };
const _hoisted_26 = ["onClick", "title"];
const _hoisted_27 = { class: "font-bold text-base" };
const _hoisted_28 = { class: "text-xs text-gray-600 dark:text-gray-400" };
const _hoisted_29 = ["onClick", "title"];
const _hoisted_30 = { class: "pb-4" };
const _hoisted_31 = { class: "text-sm font-medium text-gray-600 dark:text-white/70 mb-2 flex items-center" };
const _hoisted_32 = { class: "grid grid-cols-3 sm:grid-cols-4 md:grid-cols-6 gap-2" };
const _hoisted_33 = ["onClick", "title"];
const _hoisted_34 = { class: "font-bold text-base" };
const _hoisted_35 = { class: "text-xs text-gray-600 dark:text-gray-400" };
const _hoisted_36 = ["onClick", "title"];
const _hoisted_37 = { class: "px-5 py-4 border-t border-gray-200 dark:border-dark-bg-mute bg-white dark:bg-[#0a0a0a] sticky bottom-0 z-10" };
const _hoisted_38 = { class: "text-sm font-medium text-gray-600 dark:text-white/70 mb-2 flex items-center" };
const _hoisted_39 = { class: "flex flex-wrap gap-2" };
const _hoisted_40 = ["onClick"];
const _sfc_main = /* @__PURE__ */ defineComponent({
  __name: "IpaPickerModal",
  props: {
    modelValue: { type: Boolean },
    initialValue: { default: "" }
  },
  emits: ["update:modelValue", "apply"],
  setup(__props, { emit: __emit }) {
    const props = __props;
    const emit = __emit;
    const { t } = useI18n();
    const { playAudio } = useVoiceStore();
    const ipaDraft = ref("");
    const searchQuery = ref("");
    const searchInputRef = ref(null);
    const IPA_VOWELS = [
      // Monophthongs (short/long where applicable)
      { symbol: "i", letter: "ee", description: 'Long "ee" sound as in "see"' },
      { symbol: "iː", letter: "ee", description: 'Long "ee" sound as in "see"' },
      { symbol: "ɪ", letter: "i", description: 'Short "i" sound as in "sit"' },
      { symbol: "e", letter: "e", description: '"e" sound as in "bed"' },
      { symbol: "ɛ", letter: "e", description: 'Open "e" sound as in "bet"' },
      { symbol: "æ", letter: "a", description: '"a" sound as in "cat"' },
      { symbol: "u", letter: "oo", description: 'Long "oo" sound as in "boot"' },
      { symbol: "uː", letter: "oo", description: 'Long "oo" sound as in "boot"' },
      { symbol: "ʊ", letter: "u", description: 'Short "u" sound as in "put"' },
      { symbol: "o", letter: "o", description: '"o" sound as in "go"' },
      { symbol: "ɔ", letter: "aw", description: '"aw" sound as in "saw"' },
      { symbol: "ɒ", letter: "o", description: 'Short "o" sound as in "lot"' },
      { symbol: "ɑ", letter: "a", description: '"a" sound as in "father"' },
      { symbol: "ʌ", letter: "u", description: '"u" sound as in "cup"' },
      { symbol: "ɜ", letter: "ur", description: '"ur" sound as in "bird"' },
      { symbol: "ɜː", letter: "ur", description: 'Long "ur" sound as in "bird"' },
      { symbol: "ɝ", letter: "er", description: 'R-colored "er" sound' },
      { symbol: "ɚ", letter: "er", description: 'Unstressed "er" sound' },
      { symbol: "ə", letter: "uh", description: 'Schwa - unstressed "uh" sound' }
    ];
    const IPA_DIPHTHONGS = [
      // Common diphthongs (BrE/AmE variants included)
      { symbol: "eɪ", letter: "ay", description: '"ay" sound as in "day"' },
      { symbol: "aɪ", letter: "i", description: '"i" sound as in "my"' },
      { symbol: "ɔɪ", letter: "oy", description: '"oy" sound as in "boy"' },
      { symbol: "aʊ", letter: "ow", description: '"ow" sound as in "now"' },
      { symbol: "əʊ", letter: "o", description: '"o" sound as in "go" (British)' },
      { symbol: "oʊ", letter: "o", description: '"o" sound as in "go" (American)' },
      { symbol: "ɪə", letter: "ear", description: '"ear" sound as in "near"' },
      { symbol: "eə", letter: "air", description: '"air" sound as in "hair"' },
      { symbol: "ʊə", letter: "oor", description: '"oor" sound as in "poor"' }
    ];
    const IPA_CONSONANTS = [
      // Plosives
      { symbol: "p", letter: "p", description: '"p" sound as in "pat"' },
      { symbol: "b", letter: "b", description: '"b" sound as in "bat"' },
      { symbol: "t", letter: "t", description: '"t" sound as in "tap"' },
      { symbol: "d", letter: "d", description: '"d" sound as in "day"' },
      { symbol: "k", letter: "k", description: '"k" sound as in "cat"' },
      { symbol: "g", letter: "g", description: '"g" sound as in "go"' },
      // Fricatives
      { symbol: "f", letter: "f", description: '"f" sound as in "fat"' },
      { symbol: "v", letter: "v", description: '"v" sound as in "vat"' },
      { symbol: "θ", letter: "th", description: 'Voiceless "th" as in "think"' },
      { symbol: "ð", letter: "th", description: 'Voiced "th" as in "this"' },
      { symbol: "s", letter: "s", description: '"s" sound as in "sat"' },
      { symbol: "z", letter: "z", description: '"z" sound as in "zoo"' },
      { symbol: "ʃ", letter: "sh", description: '"sh" sound as in "she"' },
      { symbol: "ʒ", letter: "zh", description: '"zh" sound as in "measure"' },
      { symbol: "h", letter: "h", description: '"h" sound as in "hat"' },
      // Affricates
      { symbol: "tʃ", letter: "ch", description: '"ch" sound as in "chair"' },
      { symbol: "dʒ", letter: "j", description: '"j" sound as in "jar"' },
      // Nasals
      { symbol: "m", letter: "m", description: '"m" sound as in "mat"' },
      { symbol: "n", letter: "n", description: '"n" sound as in "net"' },
      { symbol: "ŋ", letter: "ng", description: '"ng" sound as in "sing"' },
      // Liquids
      { symbol: "l", letter: "l", description: '"l" sound as in "let"' },
      { symbol: "ɫ", letter: "l", description: 'Dark "l" sound' },
      { symbol: "r", letter: "r", description: 'Rolled "r" sound' },
      { symbol: "ɹ", letter: "r", description: 'English "r" sound as in "red"' },
      // Glides
      { symbol: "w", letter: "w", description: '"w" sound as in "wet"' },
      { symbol: "j", letter: "y", description: '"y" sound as in "yes"' },
      // Other
      { symbol: "ʔ", letter: "'", description: "Glottal stop" },
      { symbol: "ɾ", letter: "t", description: 'Flap "t" as in "butter" (American)' },
      { symbol: "ʍ", letter: "wh", description: 'Voiceless "wh" as in "what"' }
    ];
    const IPA_MARKS = ["ˈ", "ˌ", "ː", ".", " "];
    const filteredVowels = computed(() => {
      if (!searchQuery.value) return IPA_VOWELS;
      const query = searchQuery.value.toLowerCase();
      return IPA_VOWELS.filter(
        (vowel) => vowel.symbol.includes(query) || vowel.letter.toLowerCase().includes(query) || vowel.description.toLowerCase().includes(query)
      );
    });
    const filteredDiphthongs = computed(() => {
      if (!searchQuery.value) return IPA_DIPHTHONGS;
      const query = searchQuery.value.toLowerCase();
      return IPA_DIPHTHONGS.filter(
        (diphthong) => diphthong.symbol.includes(query) || diphthong.letter.toLowerCase().includes(query) || diphthong.description.toLowerCase().includes(query)
      );
    });
    const filteredConsonants = computed(() => {
      if (!searchQuery.value) return IPA_CONSONANTS;
      const query = searchQuery.value.toLowerCase();
      return IPA_CONSONANTS.filter(
        (consonant) => consonant.symbol.includes(query) || consonant.letter.toLowerCase().includes(query) || consonant.description.toLowerCase().includes(query)
      );
    });
    watch(() => props.modelValue, async (isOpen) => {
      if (isOpen) {
        ipaDraft.value = props.initialValue || "";
        searchQuery.value = "";
        await nextTick();
        setTimeout(() => {
          focusSearchInput();
        }, 100);
      }
    });
    const closeModal = () => {
      emit("update:modelValue", false);
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
    const appendIpa = (symbol) => {
      ipaDraft.value += symbol;
      setTimeout(() => {
        focusSearchInput();
      }, 10);
    };
    const clearIpa = () => {
      ipaDraft.value = "";
      setTimeout(() => {
        focusSearchInput();
      }, 10);
    };
    const backspaceIpa = () => {
      if (!ipaDraft.value) return;
      ipaDraft.value = ipaDraft.value.slice(0, -1);
      setTimeout(() => {
        focusSearchInput();
      }, 10);
    };
    const wrapWithSlashes = () => {
      const trimmed = ipaDraft.value.trim();
      if (!trimmed) {
        ipaDraft.value = "/ /";
      } else {
        const alreadyWrapped = trimmed.startsWith("/") && trimmed.endsWith("/");
        ipaDraft.value = alreadyWrapped ? trimmed : `/${trimmed.replace(/^\/+|\/+$/g, "")}/`;
      }
      setTimeout(() => {
        focusSearchInput();
      }, 10);
    };
    const applyIpa = () => {
      emit("apply", ipaDraft.value.trim());
      closeModal();
    };
    const speakIPA = async (symbol, event) => {
      event.stopPropagation();
      const ipaToWord = {
        // Vowels
        "i": "see",
        "iː": "see",
        "ɪ": "sit",
        "e": "bed",
        "ɛ": "bet",
        "æ": "cat",
        "u": "boot",
        "uː": "boot",
        "ʊ": "put",
        "o": "go",
        "ɔ": "saw",
        "ɒ": "lot",
        "ɑ": "father",
        "ʌ": "cup",
        "ɜ": "bird",
        "ɜː": "bird",
        "ɝ": "bird",
        "ɚ": "butter",
        "ə": "about",
        // Diphthongs
        "eɪ": "day",
        "aɪ": "my",
        "ɔɪ": "boy",
        "aʊ": "now",
        "əʊ": "go",
        "oʊ": "go",
        "ɪə": "near",
        "eə": "hair",
        "ʊə": "poor",
        // Consonants
        "p": "pat",
        "b": "bat",
        "t": "tap",
        "d": "day",
        "k": "cat",
        "g": "go",
        "f": "fat",
        "v": "vat",
        "θ": "think",
        "ð": "this",
        "s": "sat",
        "z": "zoo",
        "ʃ": "she",
        "ʒ": "measure",
        "h": "hat",
        "tʃ": "chair",
        "dʒ": "jar",
        "m": "mat",
        "n": "net",
        "ŋ": "sing",
        "l": "let",
        "ɫ": "call",
        "r": "red",
        "ɹ": "red",
        "w": "wet",
        "j": "yes",
        "ʔ": "button",
        "ɾ": "butter",
        "ʍ": "what"
      };
      const textToSpeak = ipaToWord[symbol] || symbol;
      try {
        await playAudio(textToSpeak);
      } catch (error) {
        console.warn("Failed to play IPA pronunciation:", error);
      }
    };
    return (_ctx, _cache) => {
      return openBlock(), createBlock(Teleport, { to: "body" }, [
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
                      class: "bg-white dark:bg-dark-bg-soft shadow-2xl rounded-xl border border-gray-200 dark:border-dark-bg-mute overflow-hidden transform flex flex-col max-h-[90vh]",
                      onClick: _cache[1] || (_cache[1] = withModifiers(() => {
                      }, ["stop"]))
                    }, [
                      createBaseVNode("div", _hoisted_3, [
                        createBaseVNode("h3", _hoisted_4, [
                          _cache[2] || (_cache[2] = createBaseVNode("span", { class: "w-2 h-2 bg-blue-500 rounded-full animate-pulse" }, null, -1)),
                          createBaseVNode("span", null, toDisplayString(unref(t)("vocabulary.pronunciation.ipaPickerTitle", "IPA Picker")), 1)
                        ]),
                        createBaseVNode("button", {
                          type: "button",
                          onClick: closeModal,
                          class: "text-gray-400 hover:text-gray-600 dark:hover:text-white transition-all duration-300 hover:scale-110 hover:rotate-90 p-1 rounded-full hover:bg-gray-100 dark:hover:bg-dark-bg-mute",
                          title: unref(t)("common.close", "Close"),
                          "aria-label": unref(t)("common.close", "Close")
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
                        ]), 8, _hoisted_5)
                      ]),
                      createBaseVNode("div", _hoisted_6, [
                        createBaseVNode("div", _hoisted_7, [
                          _cache[4] || (_cache[4] = createBaseVNode("div", { class: "absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none" }, [
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
                            placeholder: unref(t)("common.search", "Search IPA symbols..."),
                            onBlur: refocusSearchInput
                          }, null, 40, _hoisted_8), [
                            [vModelText, searchQuery.value]
                          ])
                        ]),
                        createBaseVNode("div", _hoisted_9, [
                          createBaseVNode("div", _hoisted_10, toDisplayString(ipaDraft.value || unref(t)("vocabulary.pronunciation.previewPlaceholder", "Start building IPA...")), 1)
                        ]),
                        createBaseVNode("div", _hoisted_11, [
                          createBaseVNode("button", {
                            type: "button",
                            onClick: wrapWithSlashes,
                            class: "px-3 py-1.5 rounded-lg border border-gray-300 dark:border-dark-bg-mute text-gray-800 dark:text-white dark:bg-dark-bg-mute hover:bg-gray-100 dark:hover:bg-dark-bg-soft",
                            title: unref(t)("vocabulary.pronunciation.wrap", "Wrap with slashes"),
                            "aria-label": unref(t)("vocabulary.pronunciation.wrap", "Wrap with slashes")
                          }, " /.../ ", 8, _hoisted_12),
                          createBaseVNode("button", {
                            type: "button",
                            onClick: backspaceIpa,
                            class: "px-3 py-1.5 rounded-lg border border-gray-300 dark:border-dark-bg-mute text-gray-800 dark:text-white dark:bg-dark-bg-mute hover:bg-gray-100 dark:hover:bg-dark-bg-soft",
                            title: unref(t)("common.backspace", "Backspace"),
                            "aria-label": unref(t)("common.backspace", "Backspace")
                          }, toDisplayString(unref(t)("common.backspace", "Backspace")), 9, _hoisted_13),
                          createBaseVNode("button", {
                            type: "button",
                            onClick: clearIpa,
                            class: "px-3 py-1.5 rounded-lg border border-gray-300 dark:border-dark-bg-mute text-gray-800 dark:text-white dark:bg-dark-bg-mute hover:bg-gray-100 dark:hover:bg-dark-bg-soft",
                            title: unref(t)("common.clear", "Clear"),
                            "aria-label": unref(t)("common.clear", "Clear")
                          }, toDisplayString(unref(t)("common.clear", "Clear")), 9, _hoisted_14),
                          createBaseVNode("button", {
                            type: "button",
                            onClick: applyIpa,
                            class: "ml-auto px-3 py-1.5 rounded-lg bg-green-600 hover:bg-green-700 text-white",
                            title: unref(t)("common.apply", "Apply"),
                            "aria-label": unref(t)("common.apply", "Apply")
                          }, toDisplayString(unref(t)("common.apply", "Apply")), 9, _hoisted_15)
                        ])
                      ]),
                      createBaseVNode("div", _hoisted_16, [
                        createBaseVNode("div", _hoisted_17, [
                          createBaseVNode("div", null, [
                            createBaseVNode("div", _hoisted_18, [
                              _cache[5] || (_cache[5] = createBaseVNode("span", { class: "w-1 h-4 bg-blue-500 rounded mr-2" }, null, -1)),
                              createTextVNode(" " + toDisplayString(unref(t)("vocabulary.pronunciation.vowels", "Vowels")), 1)
                            ]),
                            createBaseVNode("div", _hoisted_19, [
                              (openBlock(true), createElementBlock(Fragment, null, renderList(filteredVowels.value, (vowel) => {
                                return openBlock(), createElementBlock("div", {
                                  key: "v-" + vowel.symbol,
                                  class: "relative"
                                }, [
                                  createBaseVNode("button", {
                                    type: "button",
                                    onClick: ($event) => appendIpa(vowel.symbol),
                                    class: "w-full p-2 bg-blue-100 hover:bg-blue-200 dark:bg-blue-900 dark:hover:bg-blue-800 text-gray-800 dark:text-gray-200 rounded-lg transition-all duration-200 hover:scale-105 flex flex-col items-center text-sm border border-gray-300 dark:border-dark-bg-mute",
                                    title: vowel.description
                                  }, [
                                    createBaseVNode("span", _hoisted_21, toDisplayString(vowel.symbol), 1),
                                    createBaseVNode("span", _hoisted_22, toDisplayString(vowel.letter), 1)
                                  ], 8, _hoisted_20),
                                  createBaseVNode("button", {
                                    type: "button",
                                    onClick: ($event) => speakIPA(vowel.symbol, $event),
                                    class: "absolute -top-1 -right-1 w-5 h-5 bg-green-500 hover:bg-green-600 text-white rounded-full flex items-center justify-center text-xs transition-all duration-200 hover:scale-110 shadow-md",
                                    title: `Pronounce ${vowel.symbol}`
                                  }, _cache[6] || (_cache[6] = [
                                    createBaseVNode("svg", {
                                      class: "w-3 h-3",
                                      fill: "currentColor",
                                      viewBox: "0 0 20 20"
                                    }, [
                                      createBaseVNode("path", {
                                        "fill-rule": "evenodd",
                                        d: "M9.383 3.076A1 1 0 0110 4v12a1 1 0 01-1.617.824L4.8 13.6H2a1 1 0 01-1-1V7.4a1 1 0 011-1h2.8l3.583-3.224a1 1 0 01.617-.176zM12 5a1 1 0 011.414 0L15 6.586l1.586-1.586a1 1 0 111.414 1.414L16.414 8 18 9.586a1 1 0 01-1.414 1.414L15 9.414 13.414 11A1 1 0 0112 9.586L13.586 8 12 6.414A1 1 0 0112 5z",
                                        "clip-rule": "evenodd"
                                      })
                                    ], -1)
                                  ]), 8, _hoisted_23)
                                ]);
                              }), 128))
                            ])
                          ]),
                          createBaseVNode("div", null, [
                            createBaseVNode("div", _hoisted_24, [
                              _cache[7] || (_cache[7] = createBaseVNode("span", { class: "w-1 h-4 bg-green-500 rounded mr-2" }, null, -1)),
                              createTextVNode(" " + toDisplayString(unref(t)("vocabulary.pronunciation.diphthongs", "Diphthongs")), 1)
                            ]),
                            createBaseVNode("div", _hoisted_25, [
                              (openBlock(true), createElementBlock(Fragment, null, renderList(filteredDiphthongs.value, (diphthong) => {
                                return openBlock(), createElementBlock("div", {
                                  key: "d-" + diphthong.symbol,
                                  class: "relative"
                                }, [
                                  createBaseVNode("button", {
                                    type: "button",
                                    onClick: ($event) => appendIpa(diphthong.symbol),
                                    class: "w-full p-2 bg-green-100 hover:bg-green-200 dark:bg-green-900 dark:hover:bg-green-800 text-gray-800 dark:text-gray-200 rounded-lg transition-all duration-200 hover:scale-105 flex flex-col items-center text-sm border border-gray-300 dark:border-dark-bg-mute",
                                    title: diphthong.description
                                  }, [
                                    createBaseVNode("span", _hoisted_27, toDisplayString(diphthong.symbol), 1),
                                    createBaseVNode("span", _hoisted_28, toDisplayString(diphthong.letter), 1)
                                  ], 8, _hoisted_26),
                                  createBaseVNode("button", {
                                    type: "button",
                                    onClick: ($event) => speakIPA(diphthong.symbol, $event),
                                    class: "absolute -top-1 -right-1 w-5 h-5 bg-green-500 hover:bg-green-600 text-white rounded-full flex items-center justify-center text-xs transition-all duration-200 hover:scale-110 shadow-md",
                                    title: `Pronounce ${diphthong.symbol}`
                                  }, _cache[8] || (_cache[8] = [
                                    createBaseVNode("svg", {
                                      class: "w-3 h-3",
                                      fill: "currentColor",
                                      viewBox: "0 0 20 20"
                                    }, [
                                      createBaseVNode("path", {
                                        "fill-rule": "evenodd",
                                        d: "M9.383 3.076A1 1 0 0110 4v12a1 1 0 01-1.617.824L4.8 13.6H2a1 1 0 01-1-1V7.4a1 1 0 011-1h2.8l3.583-3.224a1 1 0 01.617-.176zM12 5a1 1 0 011.414 0L15 6.586l1.586-1.586a1 1 0 111.414 1.414L16.414 8 18 9.586a1 1 0 01-1.414 1.414L15 9.414 13.414 11A1 1 0 0112 9.586L13.586 8 12 6.414A1 1 0 0112 5z",
                                        "clip-rule": "evenodd"
                                      })
                                    ], -1)
                                  ]), 8, _hoisted_29)
                                ]);
                              }), 128))
                            ])
                          ]),
                          createBaseVNode("div", _hoisted_30, [
                            createBaseVNode("div", _hoisted_31, [
                              _cache[9] || (_cache[9] = createBaseVNode("span", { class: "w-1 h-4 bg-purple-500 rounded mr-2" }, null, -1)),
                              createTextVNode(" " + toDisplayString(unref(t)("vocabulary.pronunciation.consonants", "Consonants")), 1)
                            ]),
                            createBaseVNode("div", _hoisted_32, [
                              (openBlock(true), createElementBlock(Fragment, null, renderList(filteredConsonants.value, (consonant) => {
                                return openBlock(), createElementBlock("div", {
                                  key: "c-" + consonant.symbol,
                                  class: "relative"
                                }, [
                                  createBaseVNode("button", {
                                    type: "button",
                                    onClick: ($event) => appendIpa(consonant.symbol),
                                    class: "w-full p-2 bg-purple-100 hover:bg-purple-200 dark:bg-purple-900 dark:hover:bg-purple-800 text-gray-800 dark:text-gray-200 rounded-lg transition-all duration-200 hover:scale-105 flex flex-col items-center text-sm border border-gray-300 dark:border-dark-bg-mute",
                                    title: consonant.description
                                  }, [
                                    createBaseVNode("span", _hoisted_34, toDisplayString(consonant.symbol), 1),
                                    createBaseVNode("span", _hoisted_35, toDisplayString(consonant.letter), 1)
                                  ], 8, _hoisted_33),
                                  createBaseVNode("button", {
                                    type: "button",
                                    onClick: ($event) => speakIPA(consonant.symbol, $event),
                                    class: "absolute -top-1 -right-1 w-5 h-5 bg-green-500 hover:bg-green-600 text-white rounded-full flex items-center justify-center text-xs transition-all duration-200 hover:scale-110 shadow-md",
                                    title: `Pronounce ${consonant.symbol}`
                                  }, _cache[10] || (_cache[10] = [
                                    createBaseVNode("svg", {
                                      class: "w-3 h-3",
                                      fill: "currentColor",
                                      viewBox: "0 0 20 20"
                                    }, [
                                      createBaseVNode("path", {
                                        "fill-rule": "evenodd",
                                        d: "M9.383 3.076A1 1 0 0110 4v12a1 1 0 01-1.617.824L4.8 13.6H2a1 1 0 01-1-1V7.4a1 1 0 011-1h2.8l3.583-3.224a1 1 0 01.617-.176zM12 5a1 1 0 011.414 0L15 6.586l1.586-1.586a1 1 0 111.414 1.414L16.414 8 18 9.586a1 1 0 01-1.414 1.414L15 9.414 13.414 11A1 1 0 0112 9.586L13.586 8 12 6.414A1 1 0 0112 5z",
                                        "clip-rule": "evenodd"
                                      })
                                    ], -1)
                                  ]), 8, _hoisted_36)
                                ]);
                              }), 128))
                            ])
                          ])
                        ])
                      ]),
                      createBaseVNode("div", _hoisted_37, [
                        createBaseVNode("div", _hoisted_38, [
                          _cache[11] || (_cache[11] = createBaseVNode("span", { class: "w-1 h-4 bg-orange-500 rounded mr-2" }, null, -1)),
                          createTextVNode(" " + toDisplayString(unref(t)("vocabulary.pronunciation.marks", "Marks")), 1)
                        ]),
                        createBaseVNode("div", _hoisted_39, [
                          (openBlock(), createElementBlock(Fragment, null, renderList(IPA_MARKS, (mark) => {
                            return createBaseVNode("button", {
                              key: "m-" + mark,
                              type: "button",
                              onClick: ($event) => appendIpa(mark),
                              class: "px-3 py-2 bg-orange-100 hover:bg-orange-200 dark:bg-orange-900 dark:hover:bg-orange-800 text-gray-800 dark:text-gray-200 rounded-lg transition-all duration-200 hover:scale-105 border border-gray-300 dark:border-dark-bg-mute font-mono"
                            }, toDisplayString(mark === " " ? unref(t)("common.space", "Space") : mark), 9, _hoisted_40);
                          }), 64))
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
//# sourceMappingURL=IpaPickerModal-CVooJJlu.js.map
