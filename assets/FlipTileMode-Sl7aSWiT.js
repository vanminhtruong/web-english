const __vite__mapDeps=(i,m=__vite__mapDeps,d=(m.f||(m.f=["assets/FireworkSoundEffect-9iWacF7i.js","assets/vendor-CKTvmtu5.js","assets/_plugin-vue_export-helper-1tPrXgE0.js","assets/FireworkSoundEffect-Z17vpFMM.css"])))=>i.map(i=>d[i]);
import { _ as __vitePreload } from "./index-NgYuwt7j.js";
import { d as defineComponent, M as useI18n, D as computed, z as ref, P as watch, A as onMounted, q as nextTick, c as createElementBlock, v as openBlock, f as createBaseVNode, e as createCommentVNode, y as createVNode, t as toDisplayString, u as unref, F as Fragment, j as renderList, n as normalizeClass, E as withDirectives, X as vModelText, Q as withKeys, g as createTextVNode, G as defineAsyncComponent, i as withModifiers } from "./vendor-CKTvmtu5.js";
import { u as useVoiceStore } from "./voiceStore-DiHiYd9f.js";
import { _ as _export_sfc } from "./_plugin-vue_export-helper-1tPrXgE0.js";
import "./vendor-toast-Blf0QbeM.js";
const _hoisted_1 = { class: "h-full flex flex-col overflow-hidden" };
const _hoisted_2 = { class: "mb-4 flex items-center justify-center gap-3" };
const _hoisted_3 = { class: "px-3 py-1 bg-purple-100 dark:bg-dark-bg-mute text-purple-800 dark:text-purple-300 text-sm font-medium rounded-full" };
const _hoisted_4 = { class: "flex items-center gap-2" };
const _hoisted_5 = { class: "text-xs text-gray-600 dark:text-white/70" };
const _hoisted_6 = { class: "flex-1 flex items-center justify-center mb-4 min-h-0" };
const _hoisted_7 = {
  key: 0,
  class: "flex items-center justify-center bg-gradient-to-br from-teal-50 to-cyan-50 dark:from-teal-900/30 dark:to-cyan-900/30 rounded-xl p-6 w-full max-w-lg border border-teal-200 dark:border-teal-700/50 shadow-sm"
};
const _hoisted_8 = { class: "text-center space-y-3" };
const _hoisted_9 = { class: "max-h-32 overflow-y-auto" };
const _hoisted_10 = { class: "text-lg font-medium text-gray-900 dark:text-white leading-relaxed" };
const _hoisted_11 = {
  key: 1,
  class: "relative"
};
const _hoisted_12 = ["src", "alt"];
const _hoisted_13 = {
  key: 0,
  class: "absolute inset-0 flex items-center justify-center bg-gray-100 dark:bg-dark-bg-mute rounded-lg"
};
const _hoisted_14 = { class: "text-center" };
const _hoisted_15 = { class: "text-sm text-gray-500 dark:text-white/60 mt-2" };
const _hoisted_16 = {
  key: 2,
  class: "flex items-center justify-center bg-gray-100 dark:bg-dark-bg-mute rounded-lg p-8 w-full max-w-sm"
};
const _hoisted_17 = { class: "text-center" };
const _hoisted_18 = { class: "text-sm text-gray-500 dark:text-white/60 mt-2" };
const _hoisted_19 = { class: "flex-shrink-0 mb-4" };
const _hoisted_20 = { class: "w-full max-w-full overflow-x-auto" };
const _hoisted_21 = { class: "flex flex-wrap gap-2 xs:gap-1.5 sm:gap-2 md:gap-3 justify-center items-center min-w-fit px-1" };
const _hoisted_22 = {
  key: 0,
  class: "px-1 text-sm xs:text-base sm:text-lg text-gray-700 dark:text-white/80 select-none"
};
const _hoisted_23 = ["onClick"];
const _hoisted_24 = { class: "tile-face tile-back absolute inset-0 flex items-center justify-center rounded-lg border-2 bg-white dark:bg-dark-bg-soft border-green-400 dark:border-green-500 shadow-lg text-sm xs:text-base sm:text-xl md:text-2xl font-bold text-gray-900 dark:text-white" };
const _hoisted_25 = {
  key: 0,
  class: "flex-shrink-0 mb-4"
};
const _hoisted_26 = { class: "max-w-md mx-auto" };
const _hoisted_27 = { class: "relative" };
const _hoisted_28 = ["placeholder", "disabled"];
const _hoisted_29 = {
  key: 1,
  class: "text-center space-y-2 max-h-32 overflow-y-auto"
};
const _hoisted_30 = {
  key: 0,
  class: "w-4 h-4 mr-1",
  fill: "currentColor",
  viewBox: "0 0 20 20"
};
const _hoisted_31 = {
  key: 1,
  class: "w-4 h-4 mr-1",
  fill: "currentColor",
  viewBox: "0 0 20 20"
};
const _hoisted_32 = {
  key: 0,
  class: "text-center"
};
const _hoisted_33 = { class: "text-sm text-gray-600 dark:text-white/70" };
const _hoisted_34 = { class: "font-semibold text-gray-900 dark:text-white" };
const _hoisted_35 = { class: "text-xs text-gray-500 dark:text-white/60 mt-1 line-clamp-2" };
const _hoisted_36 = {
  key: 1,
  class: "text-center"
};
const _hoisted_37 = { class: "text-sm text-gray-600 dark:text-white/70 line-clamp-2" };
const _hoisted_38 = {
  key: 2,
  class: "text-center text-sm text-gray-500 dark:text-white/60 mt-3"
};
const _sfc_main = /* @__PURE__ */ defineComponent({
  __name: "FlipTileMode",
  props: {
    card: {},
    flipTileAnswer: {},
    flipTileAnswered: { type: Boolean },
    flipTileCorrect: { type: Boolean },
    getTopicName: { type: Function },
    useHints: { type: Boolean }
  },
  emits: ["update:flip-tile-answer", "check-answer"],
  setup(__props, { emit: __emit }) {
    const props = __props;
    const emit = __emit;
    const { t } = useI18n();
    const { playAudio } = useVoiceStore();
    const useHints = computed(() => props.useHints ?? true);
    const imageError = ref(false);
    const answerInput = ref(null);
    const userAnswer = ref("");
    const FireworkSoundEffect = defineAsyncComponent(() => __vitePreload(() => import("./FireworkSoundEffect-9iWacF7i.js"), true ? __vite__mapDeps([0,1,2,3]) : void 0));
    const triggerFirework = ref(false);
    const triggerSound = ref(false);
    const isCorrectAnswer = ref(false);
    const fireworkEffect = ref();
    const tiles = ref([]);
    const normalizeWord = (w) => w.normalize("NFKC");
    const buildTiles = (word) => {
      const letters = normalizeWord(word);
      const arr = [];
      const isAlpha = (c) => /^[a-z]$/i.test(c);
      for (let i = 0; i < letters.length; i++) {
        const c = letters[i];
        if (!isAlpha(c)) {
          arr.push({ char: c, flipped: true, separator: true });
          continue;
        }
        arr.push({ char: c, flipped: false });
      }
      tiles.value = arr;
    };
    const flippedCount = computed(() => {
      return tiles.value.filter((tile) => tile.flipped && !tile.separator).length;
    });
    const totalLetterTiles = computed(() => tiles.value.filter((tile) => !tile.separator).length);
    const maxFlips = computed(() => totalLetterTiles.value <= 4 ? 1 : 2);
    const canFlipMore = computed(() => flippedCount.value < maxFlips.value);
    const onTileClick = (idx) => {
      const tile = tiles.value[idx];
      if (!tile || tile.separator || tile.flipped || props.flipTileAnswered) return;
      if (canFlipMore.value) {
        tile.flipped = true;
      }
    };
    const onAnswerInput = () => {
      emit("update:flip-tile-answer", userAnswer.value);
    };
    const checkAnswer = () => {
      if (!userAnswer.value.trim()) return;
      emit("check-answer");
    };
    const handleImageError = () => {
      imageError.value = true;
    };
    const resetTriggers = () => {
      triggerFirework.value = false;
      triggerSound.value = false;
    };
    watch(() => props.flipTileAnswered, (newVal) => {
      if (newVal) {
        tiles.value.forEach((tile) => {
          if (!tile.separator) tile.flipped = true;
        });
        if (!triggerFirework.value) {
          isCorrectAnswer.value = props.flipTileCorrect;
          setTimeout(() => {
            triggerFirework.value = true;
            triggerSound.value = true;
          }, 50);
        }
      }
      if (newVal && props.flipTileCorrect && props.card?.word) {
        Promise.resolve(playAudio(props.card.word)).catch(() => {
        });
      }
    });
    watch(() => props.card, (c) => {
      imageError.value = false;
      userAnswer.value = "";
      if (c?.word) {
        buildTiles(c.word);
      }
      nextTick(() => {
        answerInput.value?.focus();
      });
    });
    watch(() => props.flipTileAnswer, (newVal) => {
      if (newVal !== userAnswer.value) {
        userAnswer.value = newVal;
      }
    });
    onMounted(() => {
      if (props.card?.word) {
        buildTiles(props.card.word);
      }
      nextTick(() => {
        answerInput.value?.focus();
      });
    });
    const enforceInputFocus = () => {
      if (!props.flipTileAnswered) {
        setTimeout(() => {
          answerInput.value?.focus();
        }, 0);
      }
    };
    return (_ctx, _cache) => {
      return openBlock(), createElementBlock("div", {
        class: "bg-white dark:bg-[#0a0a0a] rounded-xl shadow-2xl border border-gray-200 dark:border-dark-bg-mute p-6 min-h-96 max-h-[560px] select-none",
        onCopy: _cache[1] || (_cache[1] = withModifiers(() => {
        }, ["prevent"])),
        onCut: _cache[2] || (_cache[2] = withModifiers(() => {
        }, ["prevent"])),
        onContextmenu: _cache[3] || (_cache[3] = withModifiers(() => {
        }, ["prevent"])),
        onMousedown: enforceInputFocus
      }, [
        createBaseVNode("div", _hoisted_1, [
          createBaseVNode("div", _hoisted_2, [
            createBaseVNode("span", _hoisted_3, toDisplayString(_ctx.card?.category ? _ctx.getTopicName(_ctx.card.category) : ""), 1),
            createBaseVNode("div", _hoisted_4, [
              createBaseVNode("span", _hoisted_5, toDisplayString(unref(t)("flashcard.flipTile.tilesFlipped", "Tiles flipped")) + ": " + toDisplayString(flippedCount.value) + "/" + toDisplayString(maxFlips.value), 1)
            ])
          ]),
          createBaseVNode("div", _hoisted_6, [
            useHints.value || !_ctx.card?.image ? (openBlock(), createElementBlock("div", _hoisted_7, [
              createBaseVNode("div", _hoisted_8, [
                _cache[4] || (_cache[4] = createBaseVNode("div", { class: "mx-auto w-12 h-12 bg-teal-100 dark:bg-teal-800/50 rounded-full flex items-center justify-center mb-4" }, [
                  createBaseVNode("svg", {
                    class: "w-6 h-6 text-teal-600 dark:text-teal-400",
                    fill: "none",
                    viewBox: "0 0 24 24",
                    stroke: "currentColor"
                  }, [
                    createBaseVNode("path", {
                      "stroke-linecap": "round",
                      "stroke-linejoin": "round",
                      "stroke-width": "2",
                      d: "M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.746 0 3.332.477 4.5 1.253v13C19.832 18.477 18.246 18 16.5 18c-1.746 0-3.332.477-4.5 1.253"
                    })
                  ])
                ], -1)),
                createBaseVNode("div", _hoisted_9, [
                  createBaseVNode("p", _hoisted_10, toDisplayString(_ctx.card?.meaning || unref(t)("flashcard.flipTile.noDefinition", "No definition available")), 1)
                ])
              ])
            ])) : !useHints.value && _ctx.card?.image ? (openBlock(), createElementBlock("div", _hoisted_11, [
              createBaseVNode("img", {
                src: _ctx.card.image,
                alt: unref(t)("flashcard.flipTile.imageAlt", "Flip tile image"),
                class: "max-w-full max-h-40 object-contain rounded-lg shadow-md border border-gray-200 dark:border-dark-bg-mute filter blur-sm",
                onError: handleImageError
              }, null, 40, _hoisted_12),
              imageError.value ? (openBlock(), createElementBlock("div", _hoisted_13, [
                createBaseVNode("div", _hoisted_14, [
                  _cache[5] || (_cache[5] = createBaseVNode("svg", {
                    class: "mx-auto h-12 w-12 text-gray-400 dark:text-white/50",
                    fill: "none",
                    viewBox: "0 0 24 24",
                    stroke: "currentColor"
                  }, [
                    createBaseVNode("path", {
                      "stroke-linecap": "round",
                      "stroke-linejoin": "round",
                      "stroke-width": "2",
                      d: "M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 16m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2 2v12a2 2 0 002 2z"
                    })
                  ], -1)),
                  createBaseVNode("p", _hoisted_15, toDisplayString(unref(t)("flashcard.image.imageError", "Could not load image.")), 1)
                ])
              ])) : createCommentVNode("", true)
            ])) : (openBlock(), createElementBlock("div", _hoisted_16, [
              createBaseVNode("div", _hoisted_17, [
                _cache[6] || (_cache[6] = createBaseVNode("svg", {
                  class: "mx-auto h-16 w-16 text-gray-400 dark:text-white/50",
                  fill: "none",
                  viewBox: "0 0 24 24",
                  stroke: "currentColor"
                }, [
                  createBaseVNode("path", {
                    "stroke-linecap": "round",
                    "stroke-linejoin": "round",
                    "stroke-width": "2",
                    d: "M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 16m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2 2v12a2 2 0 002 2z"
                  })
                ], -1)),
                createBaseVNode("p", _hoisted_18, toDisplayString(unref(t)("flashcard.flipTile.noContent", "No content available for this card.")), 1)
              ])
            ]))
          ]),
          createBaseVNode("div", _hoisted_19, [
            createBaseVNode("div", _hoisted_20, [
              createBaseVNode("div", _hoisted_21, [
                (openBlock(true), createElementBlock(Fragment, null, renderList(tiles.value, (tile, idx) => {
                  return openBlock(), createElementBlock("div", { key: idx }, [
                    tile.separator ? (openBlock(), createElementBlock("div", _hoisted_22, toDisplayString(tile.char), 1)) : (openBlock(), createElementBlock("div", {
                      key: 1,
                      class: normalizeClass(["relative w-8 h-10 xs:w-10 xs:h-12 sm:w-12 sm:h-14 md:w-14 md:h-16 transition-all duration-500 tile-3d flex-shrink-0", [{ "cursor-pointer": !tile.flipped && canFlipMore.value }, tile.flipped ? "is-flipped" : "hover:shadow-xl hover:scale-105"]]),
                      onClick: ($event) => onTileClick(idx)
                    }, [
                      _cache[7] || (_cache[7] = createBaseVNode("div", { class: "tile-face absolute inset-0 flex items-center justify-center rounded-lg border-2 bg-gradient-to-br from-blue-500 to-purple-600 dark:from-blue-600 dark:to-purple-700 border-blue-400 dark:border-blue-500 shadow-lg" }, [
                        createBaseVNode("div", { class: "text-white" }, [
                          createBaseVNode("svg", {
                            class: "w-3 h-3 xs:w-4 xs:h-4 sm:w-5 sm:h-5 md:w-6 md:h-6",
                            fill: "currentColor",
                            viewBox: "0 0 20 20"
                          }, [
                            createBaseVNode("path", {
                              "fill-rule": "evenodd",
                              d: "M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-8-3a1 1 0 00-.867.5 1 1 0 11-1.731-1A3 3 0 0113 8a3.001 3.001 0 01-2 2.83V11a1 1 0 11-2 0v-1a1 1 0 011-1 1 1 0 100-2zm0 8a1 1 0 100-2 1 1 0 000 2z",
                              "clip-rule": "evenodd"
                            })
                          ])
                        ])
                      ], -1)),
                      createBaseVNode("div", _hoisted_24, toDisplayString(tile.char.toUpperCase()), 1)
                    ], 10, _hoisted_23))
                  ]);
                }), 128))
              ])
            ])
          ]),
          !_ctx.flipTileAnswered ? (openBlock(), createElementBlock("div", _hoisted_25, [
            createBaseVNode("div", _hoisted_26, [
              createBaseVNode("div", _hoisted_27, [
                withDirectives(createBaseVNode("input", {
                  ref_key: "answerInput",
                  ref: answerInput,
                  "onUpdate:modelValue": _cache[0] || (_cache[0] = ($event) => userAnswer.value = $event),
                  type: "text",
                  placeholder: unref(t)("flashcard.flipTile.answerPlaceholder", "Type your answer..."),
                  class: "w-full px-4 py-3 text-lg font-medium text-center rounded-xl border-2 bg-white dark:bg-dark-bg-soft text-gray-900 dark:text-white border-gray-300 dark:border-dark-bg-mute focus:outline-none focus:border-blue-500 dark:focus:border-blue-400 focus:ring-2 focus:ring-blue-200 dark:focus:ring-blue-800/50 transition-all duration-200",
                  disabled: _ctx.flipTileAnswered,
                  onKeydown: withKeys(checkAnswer, ["enter"]),
                  onInput: onAnswerInput
                }, null, 40, _hoisted_28), [
                  [vModelText, userAnswer.value]
                ]),
                userAnswer.value.trim() ? (openBlock(), createElementBlock("button", {
                  key: 0,
                  onClick: checkAnswer,
                  class: "absolute right-3 top-1/2 transform -translate-y-1/2 px-3 py-1 bg-blue-500 hover:bg-blue-600 dark:bg-blue-600 dark:hover:bg-blue-700 text-white text-sm font-medium rounded-lg transition-colors duration-200"
                }, toDisplayString(unref(t)("flashcard.flipTile.check", "Check")), 1)) : createCommentVNode("", true)
              ])
            ])
          ])) : createCommentVNode("", true),
          _ctx.flipTileAnswered ? (openBlock(), createElementBlock("div", _hoisted_29, [
            createBaseVNode("div", {
              class: normalizeClass([
                "inline-flex items-center px-3 py-1 rounded-full text-sm font-medium",
                _ctx.flipTileCorrect ? "bg-green-100 dark:bg-green-900 text-green-800 dark:text-green-300" : "bg-red-100 dark:bg-red-900 text-red-800 dark:text-red-300"
              ])
            }, [
              _ctx.flipTileCorrect ? (openBlock(), createElementBlock("svg", _hoisted_30, _cache[8] || (_cache[8] = [
                createBaseVNode("path", {
                  "fill-rule": "evenodd",
                  d: "M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z",
                  "clip-rule": "evenodd"
                }, null, -1)
              ]))) : (openBlock(), createElementBlock("svg", _hoisted_31, _cache[9] || (_cache[9] = [
                createBaseVNode("path", {
                  "fill-rule": "evenodd",
                  d: "M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z",
                  "clip-rule": "evenodd"
                }, null, -1)
              ]))),
              createTextVNode(" " + toDisplayString(_ctx.flipTileCorrect ? unref(t)("common.correct", "Correct") : unref(t)("common.incorrect", "Incorrect")), 1)
            ], 2),
            !_ctx.flipTileCorrect ? (openBlock(), createElementBlock("div", _hoisted_32, [
              createBaseVNode("p", _hoisted_33, [
                createTextVNode(toDisplayString(unref(t)("flashcard.image.correctAnswer", "Correct answer")) + ": ", 1),
                createBaseVNode("span", _hoisted_34, toDisplayString(_ctx.card?.word), 1)
              ]),
              createBaseVNode("p", _hoisted_35, toDisplayString(_ctx.card?.meaning), 1)
            ])) : (openBlock(), createElementBlock("div", _hoisted_36, [
              createBaseVNode("p", _hoisted_37, toDisplayString(_ctx.card?.meaning), 1)
            ]))
          ])) : createCommentVNode("", true),
          !_ctx.flipTileAnswered ? (openBlock(), createElementBlock("p", _hoisted_38, toDisplayString(unref(t)("flashcard.flipTile.instruction", `Click on tiles to reveal letters (max ${maxFlips.value}), then type your answer and press Enter.`)), 1)) : createCommentVNode("", true),
          createVNode(unref(FireworkSoundEffect), {
            ref_key: "fireworkEffect",
            ref: fireworkEffect,
            "trigger-firework": triggerFirework.value,
            "trigger-sound": triggerSound.value,
            "is-correct": isCorrectAnswer.value,
            onEffectComplete: resetTriggers
          }, null, 8, ["trigger-firework", "trigger-sound", "is-correct"])
        ])
      ], 32);
    };
  }
});
const FlipTileMode = /* @__PURE__ */ _export_sfc(_sfc_main, [["__scopeId", "data-v-315f8aba"]]);
export {
  FlipTileMode as default
};
//# sourceMappingURL=FlipTileMode-Sl7aSWiT.js.map
