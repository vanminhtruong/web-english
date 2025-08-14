import { d as defineComponent, H as useI18n, A as ref, B as computed, K as watch, c as createElementBlock, v as openBlock, f as createBaseVNode, e as createCommentVNode, t as toDisplayString, F as Fragment, j as renderList, C as withDirectives, S as vModelText, n as normalizeClass } from "./vendor-DoTKyHPB.js";
import { e as useVoiceStore } from "./index-DbNvohV4.js";
import "./vendor-toast-D1B2ty4j.js";
const _hoisted_1 = { class: "bg-white dark:bg-[#0a0a0a] rounded-xl shadow-lg border border-gray-200 dark:border-white/10 p-6" };
const _hoisted_2 = { class: "mb-6" };
const _hoisted_3 = { class: "text-lg font-semibold text-gray-900 dark:text-white mb-4" };
const _hoisted_4 = { class: "bg-gray-50 dark:bg-[#0a0a0a]/50 rounded-lg p-4 mb-4" };
const _hoisted_5 = { class: "text-lg leading-relaxed text-gray-900 dark:text-white" };
const _hoisted_6 = { key: 0 };
const _hoisted_7 = ["onUpdate:modelValue", "placeholder", "disabled"];
const _hoisted_8 = {
  key: 0,
  class: "mb-4"
};
const _hoisted_9 = { class: "text-sm font-medium text-gray-700 dark:text-white/80 mb-2" };
const _hoisted_10 = { class: "flex flex-wrap gap-2" };
const _hoisted_11 = ["onClick", "disabled"];
const _hoisted_12 = {
  key: 1,
  class: "mb-4"
};
const _hoisted_13 = {
  key: 0,
  class: "mb-6 space-y-4"
};
const _hoisted_14 = { class: "p-4 bg-green-50 dark:bg-green-900/30 border border-green-200 dark:border-green-700 rounded-lg" };
const _hoisted_15 = { class: "font-medium text-green-800 dark:text-green-200 mb-2" };
const _hoisted_16 = { class: "text-lg leading-relaxed text-green-700 dark:text-green-300" };
const _hoisted_17 = { key: 0 };
const _hoisted_18 = {
  key: 1,
  class: "inline-block mx-1 px-2 py-1 bg-green-100 dark:bg-green-800 rounded border font-medium"
};
const _hoisted_19 = {
  key: 0,
  class: "p-4 bg-red-50 dark:bg-red-900/30 border border-red-200 dark:border-red-700 rounded-lg"
};
const _hoisted_20 = { class: "font-medium text-red-800 dark:text-red-200 mb-2" };
const _hoisted_21 = { class: "text-lg leading-relaxed text-red-700 dark:text-red-300" };
const _hoisted_22 = { key: 0 };
const _hoisted_23 = {
  key: 1,
  class: "mb-6 p-4 bg-yellow-50 dark:bg-yellow-900/30 border border-yellow-200 dark:border-yellow-700 rounded-lg"
};
const _hoisted_24 = { class: "font-medium text-yellow-800 dark:text-yellow-200 mb-2" };
const _hoisted_25 = { class: "text-yellow-700 dark:text-yellow-300 text-sm" };
const _hoisted_26 = { class: "flex justify-between items-center" };
const _hoisted_27 = { class: "flex items-center space-x-4" };
const _hoisted_28 = {
  key: 1,
  class: "text-sm text-blue-600 dark:text-blue-400"
};
const _hoisted_29 = { class: "flex space-x-4" };
const _hoisted_30 = ["disabled"];
const _sfc_main = /* @__PURE__ */ defineComponent({
  __name: "FillBlankExercise",
  props: {
    question: {},
    questionIndex: {},
    totalQuestions: {}
  },
  emits: ["answer", "next", "complete"],
  setup(__props, { emit: __emit }) {
    const { t } = useI18n();
    const tf = (key, fallback, params) => {
      try {
        const translated = t(key, params);
        return typeof translated === "string" && translated !== key ? translated : fallback;
      } catch {
        return fallback;
      }
    };
    const { playAudio } = useVoiceStore();
    const props = __props;
    const emit = __emit;
    const userAnswers = ref([]);
    const showAnswer = ref(false);
    const showHint = ref(false);
    const focusedBlankIndex = ref(null);
    const sentenceParts = computed(() => {
      if (!props.question?.sentence) return [];
      const parts = [];
      const regex = /___+/g;
      let lastIndex = 0;
      let match;
      let blankIndex = 0;
      while ((match = regex.exec(props.question.sentence)) !== null) {
        if (match.index > lastIndex) {
          parts.push({
            type: "text",
            content: props.question.sentence.slice(lastIndex, match.index)
          });
        }
        parts.push({
          type: "blank",
          index: blankIndex++
        });
        lastIndex = regex.lastIndex;
      }
      if (lastIndex < props.question.sentence.length) {
        parts.push({
          type: "text",
          content: props.question.sentence.slice(lastIndex)
        });
      }
      return parts;
    });
    const hasAllAnswers = computed(() => {
      if (!props.question?.correctAnswers) return false;
      return userAnswers.value.length === props.question.correctAnswers.length && userAnswers.value.every((answer) => answer && answer.trim() !== "");
    });
    const hasIncorrectAnswers = computed(() => {
      if (!props.question?.correctAnswers) return false;
      return userAnswers.value.some(
        (answer, index) => answer.toLowerCase().trim() !== props.question.correctAnswers[index].toLowerCase().trim()
      );
    });
    const correctCount = computed(() => {
      if (!props.question?.correctAnswers) return 0;
      return userAnswers.value.filter(
        (answer, index) => answer.toLowerCase().trim() === props.question.correctAnswers[index].toLowerCase().trim()
      ).length;
    });
    const isBlankPart = (part) => {
      return part.type === "blank";
    };
    const isAnswerCorrect = (index) => {
      if (!showAnswer.value || !userAnswers.value[index] || !props.question?.correctAnswers?.[index]) return false;
      return userAnswers.value[index].toLowerCase().trim() === props.question.correctAnswers[index].toLowerCase().trim();
    };
    const insertWord = (word) => {
      if (focusedBlankIndex.value !== null) {
        userAnswers.value[focusedBlankIndex.value] = word;
      } else {
        const emptyIndex = userAnswers.value.findIndex((answer) => !answer || answer.trim() === "");
        if (emptyIndex !== -1) {
          userAnswers.value[emptyIndex] = word;
        }
      }
    };
    const clearAnswers = () => {
      userAnswers.value = [];
    };
    const checkAnswer = () => {
      if (!hasAllAnswers.value || !props.question?.correctAnswers) return;
      showAnswer.value = true;
      const isCorrect = correctCount.value === props.question.correctAnswers.length;
      emit("answer", {
        isCorrect,
        userAnswer: [...userAnswers.value],
        correctAnswer: [...props.question.correctAnswers]
      });
    };
    const nextQuestion = () => {
      if (props.questionIndex === props.totalQuestions - 1) {
        emit("complete");
      } else {
        userAnswers.value = [];
        showAnswer.value = false;
        showHint.value = false;
        focusedBlankIndex.value = null;
        emit("next");
      }
    };
    const playSentenceAudio = async () => {
      try {
        let completeSentence = props.question.sentence;
        props.question.correctAnswers.forEach((answer, index) => {
          completeSentence = completeSentence.replace(/___+/, answer);
        });
        await playAudio(completeSentence);
      } catch (error) {
        console.error("Error playing audio:", error);
      }
    };
    watch(() => props.question, (newQuestion) => {
      if (newQuestion && newQuestion.correctAnswers && newQuestion.correctAnswers.length > 0) {
        userAnswers.value = new Array(newQuestion.correctAnswers.length).fill("");
      }
    }, { immediate: true });
    return (_ctx, _cache) => {
      return openBlock(), createElementBlock("div", _hoisted_1, [
        createBaseVNode("div", _hoisted_2, [
          createBaseVNode("h3", _hoisted_3, toDisplayString(tf("grammar.practice.fillBlank.instruction", "Fill in the blanks")), 1),
          createBaseVNode("div", _hoisted_4, [
            createBaseVNode("div", _hoisted_5, [
              (openBlock(true), createElementBlock(Fragment, null, renderList(sentenceParts.value, (part, index) => {
                return openBlock(), createElementBlock("span", { key: index }, [
                  part.type === "text" ? (openBlock(), createElementBlock("span", _hoisted_6, toDisplayString(part.content), 1)) : part.type === "blank" ? withDirectives((openBlock(), createElementBlock("input", {
                    key: 1,
                    "onUpdate:modelValue": ($event) => userAnswers.value[part.index] = $event,
                    class: normalizeClass([
                      "inline-block mx-1 px-3 py-1 border-b-2 bg-transparent text-center min-w-20 focus:outline-none transition-colors",
                      showAnswer.value ? isAnswerCorrect(part.index) ? "border-green-500 text-green-600 dark:text-green-400" : "border-red-500 text-red-600 dark:text-red-400" : "border-blue-500 focus:border-blue-600"
                    ]),
                    placeholder: `(${part.index + 1})`,
                    disabled: showAnswer.value
                  }, null, 10, _hoisted_7)), [
                    [vModelText, userAnswers.value[part.index]]
                  ]) : createCommentVNode("", true)
                ]);
              }), 128))
            ])
          ]),
          _ctx.question.wordBank && _ctx.question.wordBank.length > 0 ? (openBlock(), createElementBlock("div", _hoisted_8, [
            createBaseVNode("h4", _hoisted_9, toDisplayString(tf("grammar.practice.fillBlank.wordBank", "Word bank")), 1),
            createBaseVNode("div", _hoisted_10, [
              (openBlock(true), createElementBlock(Fragment, null, renderList(_ctx.question.wordBank, (word) => {
                return openBlock(), createElementBlock("button", {
                  key: word,
                  onClick: ($event) => insertWord(word),
                  disabled: showAnswer.value,
                  class: "px-3 py-1 bg-blue-100 dark:bg-blue-900/30 text-blue-700 dark:text-blue-300 rounded-lg hover:bg-blue-200 dark:hover:bg-blue-900/50 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
                }, toDisplayString(word), 9, _hoisted_11);
              }), 128))
            ])
          ])) : createCommentVNode("", true),
          _ctx.question.audio ? (openBlock(), createElementBlock("div", _hoisted_12, [
            createBaseVNode("button", {
              onClick: playSentenceAudio,
              class: "flex items-center space-x-2 px-4 py-2 bg-blue-100 dark:bg-blue-900/30 text-blue-700 dark:text-blue-300 rounded-lg hover:bg-blue-200 dark:hover:bg-blue-900/50 transition-colors"
            }, [
              _cache[1] || (_cache[1] = createBaseVNode("svg", {
                class: "w-5 h-5",
                fill: "none",
                stroke: "currentColor",
                viewBox: "0 0 24 24"
              }, [
                createBaseVNode("path", {
                  "stroke-linecap": "round",
                  "stroke-linejoin": "round",
                  "stroke-width": "2",
                  d: "M15.536 8.464a5 5 0 010 7.072m-2.036-5.036a2.5 2.5 0 010 3.536M6 10h4l4.5-4.5v9L10 10H6V8z"
                })
              ], -1)),
              createBaseVNode("span", null, toDisplayString(tf("grammar.practice.playAudio", "Play audio")), 1)
            ])
          ])) : createCommentVNode("", true)
        ]),
        showAnswer.value ? (openBlock(), createElementBlock("div", _hoisted_13, [
          createBaseVNode("div", _hoisted_14, [
            createBaseVNode("h4", _hoisted_15, toDisplayString(tf("grammar.practice.correctAnswers", "Correct answers")), 1),
            createBaseVNode("div", _hoisted_16, [
              (openBlock(true), createElementBlock(Fragment, null, renderList(sentenceParts.value, (part, index) => {
                return openBlock(), createElementBlock("span", {
                  key: `correct-${index}`
                }, [
                  part.type === "text" ? (openBlock(), createElementBlock("span", _hoisted_17, toDisplayString(part.content), 1)) : part.type === "blank" ? (openBlock(), createElementBlock("span", _hoisted_18, toDisplayString(_ctx.question.correctAnswers[part.index]), 1)) : createCommentVNode("", true)
                ]);
              }), 128))
            ])
          ]),
          hasIncorrectAnswers.value ? (openBlock(), createElementBlock("div", _hoisted_19, [
            createBaseVNode("h4", _hoisted_20, toDisplayString(tf("grammar.practice.yourAnswers", "Your answers")), 1),
            createBaseVNode("div", _hoisted_21, [
              (openBlock(true), createElementBlock(Fragment, null, renderList(sentenceParts.value, (part, index) => {
                return openBlock(), createElementBlock("span", {
                  key: `user-${index}`
                }, [
                  part.type === "text" ? (openBlock(), createElementBlock("span", _hoisted_22, toDisplayString(part.content), 1)) : isBlankPart(part) ? (openBlock(), createElementBlock("span", {
                    key: 1,
                    class: normalizeClass([
                      "inline-block mx-1 px-2 py-1 rounded border font-medium",
                      isAnswerCorrect(part.index) ? "bg-green-100 dark:bg-green-800 text-green-700 dark:text-green-300" : "bg-red-100 dark:bg-red-800 text-red-700 dark:text-red-300"
                    ])
                  }, toDisplayString(userAnswers.value[part.index] || "(empty)"), 3)) : createCommentVNode("", true)
                ]);
              }), 128))
            ])
          ])) : createCommentVNode("", true)
        ])) : createCommentVNode("", true),
        showAnswer.value && _ctx.question.explanation ? (openBlock(), createElementBlock("div", _hoisted_23, [
          createBaseVNode("h4", _hoisted_24, toDisplayString(tf("grammar.practice.explanation", "Explanation")), 1),
          createBaseVNode("p", _hoisted_25, toDisplayString(_ctx.question.explanation), 1)
        ])) : createCommentVNode("", true),
        createBaseVNode("div", _hoisted_26, [
          createBaseVNode("div", _hoisted_27, [
            !showAnswer.value && _ctx.question.hint ? (openBlock(), createElementBlock("button", {
              key: 0,
              onClick: _cache[0] || (_cache[0] = ($event) => showHint.value = !showHint.value),
              class: "flex items-center space-x-2 px-4 py-2 text-sm text-gray-600 dark:text-white/60 hover:text-gray-800 dark:hover:text-white transition-colors"
            }, [
              _cache[2] || (_cache[2] = createBaseVNode("svg", {
                class: "w-4 h-4",
                fill: "none",
                stroke: "currentColor",
                viewBox: "0 0 24 24"
              }, [
                createBaseVNode("path", {
                  "stroke-linecap": "round",
                  "stroke-linejoin": "round",
                  "stroke-width": "2",
                  d: "M9.663 17h4.673M12 3v1m6.364 1.636l-.707.707M21 12h-1M4 12H3m3.343-5.657l-.707-.707m2.828 9.9a5 5 0 117.072 0l-.548.547A3.374 3.374 0 0014 18.469V19a2 2 0 11-4 0v-.531c0-.895-.356-1.754-.988-2.386l-.548-.547z"
                })
              ], -1)),
              createBaseVNode("span", null, toDisplayString(tf("grammar.practice.hint", "Hint")), 1)
            ])) : createCommentVNode("", true),
            showHint.value && _ctx.question.hint ? (openBlock(), createElementBlock("div", _hoisted_28, " 💡 " + toDisplayString(_ctx.question.hint), 1)) : createCommentVNode("", true),
            !showAnswer.value ? (openBlock(), createElementBlock("button", {
              key: 2,
              onClick: clearAnswers,
              class: "flex items-center space-x-2 px-4 py-2 text-sm text-gray-600 dark:text-white/60 hover:text-gray-800 dark:hover:text-white transition-colors"
            }, [
              _cache[3] || (_cache[3] = createBaseVNode("svg", {
                class: "w-4 h-4",
                fill: "none",
                stroke: "currentColor",
                viewBox: "0 0 24 24"
              }, [
                createBaseVNode("path", {
                  "stroke-linecap": "round",
                  "stroke-linejoin": "round",
                  "stroke-width": "2",
                  d: "M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16"
                })
              ], -1)),
              createBaseVNode("span", null, toDisplayString(tf("grammar.practice.clear", "Clear")), 1)
            ])) : createCommentVNode("", true)
          ]),
          createBaseVNode("div", _hoisted_29, [
            !showAnswer.value ? (openBlock(), createElementBlock("button", {
              key: 0,
              onClick: checkAnswer,
              disabled: !hasAllAnswers.value,
              class: "px-6 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 disabled:bg-gray-400 dark:disabled:bg-white/20 disabled:cursor-not-allowed transition-colors"
            }, toDisplayString(tf("grammar.practice.checkAnswer", "Check answer")), 9, _hoisted_30)) : (openBlock(), createElementBlock("button", {
              key: 1,
              onClick: nextQuestion,
              class: "px-6 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 transition-colors"
            }, toDisplayString(_ctx.questionIndex === _ctx.totalQuestions - 1 ? tf("grammar.practice.finish", "Finish") : tf("grammar.practice.next", "Next")), 1))
          ])
        ])
      ]);
    };
  }
});
export {
  _sfc_main as default
};
//# sourceMappingURL=FillBlankExercise-DLzrD9S_.js.map
