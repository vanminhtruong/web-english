import { d as defineComponent, H as useI18n, A as ref, B as computed, I as onMounted, L as onUnmounted, c as createElementBlock, v as openBlock, f as createBaseVNode, e as createCommentVNode, t as toDisplayString, F as Fragment, j as renderList, n as normalizeClass, C as withDirectives, a4 as vModelRadio, O as vModelText, g as createTextVNode } from "./vendor-BIIJCJs6.js";
import { d as useVoiceStore } from "./index-BXUEqV_l.js";
import "./vendor-toast-0s3J6pvm.js";
const _hoisted_1 = { class: "bg-white dark:bg-[#0a0a0a] rounded-xl shadow-lg border border-gray-200 dark:border-white/10 p-6" };
const _hoisted_2 = { class: "mb-8" };
const _hoisted_3 = { class: "flex items-center justify-between mb-4" };
const _hoisted_4 = { class: "text-lg font-semibold text-gray-900 dark:text-white" };
const _hoisted_5 = { class: "flex items-center space-x-4" };
const _hoisted_6 = { class: "text-sm text-gray-500 dark:text-white/60" };
const _hoisted_7 = { class: "bg-gray-50 dark:bg-[#0a0a0a]/50 rounded-lg p-6 max-h-96 overflow-y-auto" };
const _hoisted_8 = { class: "prose dark:prose-invert max-w-none" };
const _hoisted_9 = ["innerHTML"];
const _hoisted_10 = { class: "space-y-6" };
const _hoisted_11 = { class: "text-lg font-semibold text-gray-900 dark:text-white border-b border-gray-200 dark:border-white/10 pb-2" };
const _hoisted_12 = { class: "space-y-6" };
const _hoisted_13 = { class: "mb-4" };
const _hoisted_14 = { class: "font-medium text-gray-900 dark:text-white mb-2" };
const _hoisted_15 = {
  key: 0,
  class: "space-y-2"
};
const _hoisted_16 = ["name", "value", "onUpdate:modelValue", "disabled"];
const _hoisted_17 = { class: "text-gray-900 dark:text-white" };
const _hoisted_18 = { class: "ml-auto" };
const _hoisted_19 = {
  key: 0,
  class: "w-5 h-5 text-green-600 dark:text-green-400",
  fill: "none",
  stroke: "currentColor",
  viewBox: "0 0 24 24"
};
const _hoisted_20 = {
  key: 1,
  class: "w-5 h-5 text-red-600 dark:text-red-400",
  fill: "none",
  stroke: "currentColor",
  viewBox: "0 0 24 24"
};
const _hoisted_21 = {
  key: 1,
  class: "space-y-2"
};
const _hoisted_22 = ["name", "value", "onUpdate:modelValue", "disabled"];
const _hoisted_23 = { class: "text-gray-900 dark:text-white" };
const _hoisted_24 = {
  key: 2,
  class: "space-y-2"
};
const _hoisted_25 = ["onUpdate:modelValue", "disabled", "placeholder"];
const _hoisted_26 = {
  key: 0,
  class: "text-sm text-green-600 dark:text-green-400"
};
const _hoisted_27 = {
  key: 0,
  class: "mt-4 p-3 bg-yellow-50 dark:bg-yellow-900/30 border border-yellow-200 dark:border-yellow-700 rounded-lg"
};
const _hoisted_28 = { class: "text-sm text-yellow-800 dark:text-yellow-200" };
const _hoisted_29 = {
  key: 0,
  class: "mt-8 p-4 bg-blue-50 dark:bg-blue-900/30 border border-blue-200 dark:border-blue-700 rounded-lg"
};
const _hoisted_30 = { class: "grid grid-cols-3 gap-4 text-center" };
const _hoisted_31 = { class: "text-2xl font-bold text-blue-600 dark:text-blue-400" };
const _hoisted_32 = { class: "text-sm text-gray-600 dark:text-white/60" };
const _hoisted_33 = { class: "text-2xl font-bold text-red-600 dark:text-red-400" };
const _hoisted_34 = { class: "text-sm text-gray-600 dark:text-white/60" };
const _hoisted_35 = { class: "text-2xl font-bold text-green-600 dark:text-green-400" };
const _hoisted_36 = { class: "text-sm text-gray-600 dark:text-white/60" };
const _hoisted_37 = { class: "flex justify-between items-center mt-8" };
const _hoisted_38 = { class: "flex space-x-4" };
const _hoisted_39 = { class: "flex items-center space-x-2 text-sm text-gray-600 dark:text-white/60" };
const _hoisted_40 = { class: "flex space-x-4" };
const _hoisted_41 = ["disabled"];
const _sfc_main = /* @__PURE__ */ defineComponent({
  __name: "ReadingExercise",
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
    const showAnswers = ref(false);
    const showHighlights = ref(false);
    const readingTime = ref(0);
    const timer = ref(null);
    const formattedPassage = computed(() => {
      let passage = props.question.passage;
      if (showHighlights.value && props.question.keywords) {
        props.question.keywords.forEach((keyword) => {
          const regex = new RegExp(`\\b${keyword}\\b`, "gi");
          passage = passage.replace(regex, `<mark class="bg-yellow-200 dark:bg-yellow-700 px-1 rounded">${keyword}</mark>`);
        });
      }
      return passage;
    });
    const hasAllAnswers = computed(() => {
      if (!props.question?.questions) return false;
      return userAnswers.value.length === props.question.questions.length && userAnswers.value.every((answer) => answer !== null && answer !== void 0 && answer !== "");
    });
    const correctAnswers = computed(() => {
      if (!props.question?.questions) return 0;
      return props.question.questions.filter((q, index) => {
        if (q.type === "short-answer") {
          return isShortAnswerCorrect(index);
        }
        return userAnswers.value[index] === q.correctAnswer;
      }).length;
    });
    const incorrectAnswers = computed(() => {
      if (!props.question?.questions) return 0;
      return props.question.questions.length - correctAnswers.value;
    });
    const accuracy = computed(() => {
      return props.question.questions.length > 0 ? Math.round(correctAnswers.value / props.question.questions.length * 100) : 0;
    });
    const isShortAnswerCorrect = (index) => {
      const userAnswer = userAnswers.value[index];
      const correctAnswer = props.question.questions[index].correctAnswer;
      if (!userAnswer || !correctAnswer) return false;
      return userAnswer.toLowerCase().trim() === correctAnswer.toLowerCase().trim();
    };
    const toggleHighlights = () => {
      showHighlights.value = !showHighlights.value;
    };
    const checkAnswers = () => {
      if (!hasAllAnswers.value) return;
      showAnswers.value = true;
      stopTimer();
      const isCorrect = correctAnswers.value === props.question.questions.length;
      emit("answer", {
        isCorrect,
        correctAnswers: correctAnswers.value,
        totalQuestions: props.question.questions.length
      });
    };
    const nextQuestion = () => {
      if (props.questionIndex === props.totalQuestions - 1) {
        emit("complete");
      } else {
        resetExercise();
        emit("next");
      }
    };
    const playPassageAudio = async () => {
      try {
        await playAudio(props.question.passage);
      } catch (error) {
        console.error("Error playing passage audio:", error);
      }
    };
    const resetExercise = () => {
      userAnswers.value = [];
      showAnswers.value = false;
      showHighlights.value = false;
      readingTime.value = 0;
      startTimer();
    };
    const startTimer = () => {
      timer.value = setInterval(() => {
        readingTime.value += 1;
      }, 1e3);
    };
    const stopTimer = () => {
      if (timer.value) {
        clearInterval(timer.value);
        timer.value = null;
      }
    };
    const formatTime = (seconds) => {
      const mins = Math.floor(seconds / 60);
      const secs = seconds % 60;
      return `${mins}:${secs.toString().padStart(2, "0")}`;
    };
    onMounted(() => {
      if (props.question?.questions && Array.isArray(props.question.questions)) {
        userAnswers.value = new Array(props.question.questions.length).fill(null);
      } else {
        userAnswers.value = [];
      }
      startTimer();
    });
    onUnmounted(() => {
      stopTimer();
    });
    return (_ctx, _cache) => {
      return openBlock(), createElementBlock("div", _hoisted_1, [
        createBaseVNode("div", _hoisted_2, [
          createBaseVNode("div", _hoisted_3, [
            createBaseVNode("h3", _hoisted_4, toDisplayString(_ctx.question.title || tf("grammar.practice.reading.passage", "Reading passage")), 1),
            createBaseVNode("div", _hoisted_5, [
              _ctx.question.audio ? (openBlock(), createElementBlock("button", {
                key: 0,
                onClick: playPassageAudio,
                class: "flex items-center space-x-2 px-3 py-2 bg-blue-100 dark:bg-blue-900/30 text-blue-700 dark:text-blue-300 rounded-lg hover:bg-blue-200 dark:hover:bg-blue-900/50 transition-colors"
              }, [
                _cache[0] || (_cache[0] = createBaseVNode("svg", {
                  class: "w-4 h-4",
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
                createBaseVNode("span", null, toDisplayString(tf("grammar.practice.reading.listen", "Listen")), 1)
              ])) : createCommentVNode("", true),
              createBaseVNode("div", _hoisted_6, toDisplayString(tf("grammar.practice.reading.readingTime", "Reading time")) + ": " + toDisplayString(formatTime(readingTime.value)), 1)
            ])
          ]),
          createBaseVNode("div", _hoisted_7, [
            createBaseVNode("div", _hoisted_8, [
              createBaseVNode("div", {
                innerHTML: formattedPassage.value,
                class: "text-gray-800 dark:text-gray-200 leading-relaxed text-justify"
              }, null, 8, _hoisted_9)
            ])
          ])
        ]),
        createBaseVNode("div", _hoisted_10, [
          createBaseVNode("h4", _hoisted_11, toDisplayString(tf("grammar.practice.reading.questions", "Questions")), 1),
          createBaseVNode("div", _hoisted_12, [
            (openBlock(true), createElementBlock(Fragment, null, renderList(_ctx.question.questions, (q, index) => {
              return openBlock(), createElementBlock("div", {
                key: index,
                class: "border border-gray-200 dark:border-white/10 rounded-lg p-4"
              }, [
                createBaseVNode("div", _hoisted_13, [
                  createBaseVNode("h5", _hoisted_14, toDisplayString(index + 1) + ". " + toDisplayString(q.question), 1),
                  q.type === "multiple-choice" ? (openBlock(), createElementBlock("div", _hoisted_15, [
                    (openBlock(true), createElementBlock(Fragment, null, renderList(q.options, (option, optionIndex) => {
                      return openBlock(), createElementBlock("label", {
                        key: optionIndex,
                        class: normalizeClass([
                          "flex items-start space-x-3 p-3 rounded-lg cursor-pointer transition-all",
                          userAnswers.value[index] === optionIndex ? "bg-blue-50 dark:bg-blue-900/30 border border-blue-300 dark:border-blue-600" : "bg-gray-50 dark:bg-[#0a0a0a]/50 hover:bg-gray-100 dark:hover:bg-[#0a0a0a]/70 border border-transparent",
                          showAnswers.value && optionIndex === q.correctAnswer ? "bg-green-50 dark:bg-green-900/30 border border-green-300 dark:border-green-600" : "",
                          showAnswers.value && userAnswers.value[index] === optionIndex && optionIndex !== q.correctAnswer ? "bg-red-50 dark:bg-red-900/30 border border-red-300 dark:border-red-600" : ""
                        ])
                      }, [
                        withDirectives(createBaseVNode("input", {
                          type: "radio",
                          name: `question-${index}`,
                          value: optionIndex,
                          "onUpdate:modelValue": ($event) => userAnswers.value[index] = $event,
                          disabled: showAnswers.value,
                          class: "mt-1"
                        }, null, 8, _hoisted_16), [
                          [vModelRadio, userAnswers.value[index]]
                        ]),
                        createBaseVNode("span", _hoisted_17, toDisplayString(option), 1),
                        createBaseVNode("div", _hoisted_18, [
                          showAnswers.value && optionIndex === q.correctAnswer ? (openBlock(), createElementBlock("svg", _hoisted_19, _cache[1] || (_cache[1] = [
                            createBaseVNode("path", {
                              "stroke-linecap": "round",
                              "stroke-linejoin": "round",
                              "stroke-width": "2",
                              d: "M5 13l4 4L19 7"
                            }, null, -1)
                          ]))) : showAnswers.value && userAnswers.value[index] === optionIndex && optionIndex !== q.correctAnswer ? (openBlock(), createElementBlock("svg", _hoisted_20, _cache[2] || (_cache[2] = [
                            createBaseVNode("path", {
                              "stroke-linecap": "round",
                              "stroke-linejoin": "round",
                              "stroke-width": "2",
                              d: "M6 18L18 6M6 6l12 12"
                            }, null, -1)
                          ]))) : createCommentVNode("", true)
                        ])
                      ], 2);
                    }), 128))
                  ])) : q.type === "true-false" ? (openBlock(), createElementBlock("div", _hoisted_21, [
                    (openBlock(), createElementBlock(Fragment, null, renderList(["true", "false"], (option) => {
                      return createBaseVNode("label", {
                        key: option,
                        class: normalizeClass([
                          "flex items-center space-x-3 p-3 rounded-lg cursor-pointer transition-all",
                          userAnswers.value[index] === option ? "bg-blue-50 dark:bg-blue-900/30 border border-blue-300 dark:border-blue-600" : "bg-gray-50 dark:bg-gray-700/50 hover:bg-gray-100 dark:hover:bg-gray-700 border border-transparent",
                          showAnswers.value && option === q.correctAnswer ? "bg-green-50 dark:bg-green-900/30 border border-green-300 dark:border-green-600" : "",
                          showAnswers.value && userAnswers.value[index] === option && option !== q.correctAnswer ? "bg-red-50 dark:bg-red-900/30 border border-red-300 dark:border-red-600" : ""
                        ])
                      }, [
                        withDirectives(createBaseVNode("input", {
                          type: "radio",
                          name: `question-${index}`,
                          value: option,
                          "onUpdate:modelValue": ($event) => userAnswers.value[index] = $event,
                          disabled: showAnswers.value
                        }, null, 8, _hoisted_22), [
                          [vModelRadio, userAnswers.value[index]]
                        ]),
                        createBaseVNode("span", _hoisted_23, toDisplayString(option === "true" ? tf("grammar.practice.reading.true", "True") : tf("grammar.practice.reading.false", "False")), 1)
                      ], 2);
                    }), 64))
                  ])) : q.type === "short-answer" ? (openBlock(), createElementBlock("div", _hoisted_24, [
                    withDirectives(createBaseVNode("input", {
                      "onUpdate:modelValue": ($event) => userAnswers.value[index] = $event,
                      disabled: showAnswers.value,
                      placeholder: tf("grammar.practice.reading.yourAnswer", "Your answer"),
                      class: normalizeClass([
                        "w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent",
                        showAnswers.value ? isShortAnswerCorrect(index) ? "border-green-500 bg-green-50 dark:bg-green-900/30" : "border-red-500 bg-red-50 dark:bg-red-900/30" : "border-gray-300 dark:border-white/10 bg-white dark:bg-[#0a0a0a]",
                        "text-gray-900 dark:text-white"
                      ])
                    }, null, 10, _hoisted_25), [
                      [vModelText, userAnswers.value[index]]
                    ]),
                    showAnswers.value && !isShortAnswerCorrect(index) ? (openBlock(), createElementBlock("div", _hoisted_26, toDisplayString(tf("grammar.practice.reading.correctAnswer", "Correct answer")) + ": " + toDisplayString(q.correctAnswer), 1)) : createCommentVNode("", true)
                  ])) : createCommentVNode("", true)
                ]),
                showAnswers.value && q.explanation ? (openBlock(), createElementBlock("div", _hoisted_27, [
                  createBaseVNode("p", _hoisted_28, [
                    createBaseVNode("strong", null, toDisplayString(tf("grammar.practice.explanation", "Explanation")) + ":", 1),
                    createTextVNode(" " + toDisplayString(q.explanation), 1)
                  ])
                ])) : createCommentVNode("", true)
              ]);
            }), 128))
          ])
        ]),
        showAnswers.value ? (openBlock(), createElementBlock("div", _hoisted_29, [
          createBaseVNode("div", _hoisted_30, [
            createBaseVNode("div", null, [
              createBaseVNode("div", _hoisted_31, toDisplayString(correctAnswers.value), 1),
              createBaseVNode("div", _hoisted_32, toDisplayString(tf("grammar.practice.reading.correct", "Correct")), 1)
            ]),
            createBaseVNode("div", null, [
              createBaseVNode("div", _hoisted_33, toDisplayString(incorrectAnswers.value), 1),
              createBaseVNode("div", _hoisted_34, toDisplayString(tf("grammar.practice.reading.incorrect", "Incorrect")), 1)
            ]),
            createBaseVNode("div", null, [
              createBaseVNode("div", _hoisted_35, toDisplayString(accuracy.value) + "%", 1),
              createBaseVNode("div", _hoisted_36, toDisplayString(tf("grammar.practice.reading.accuracy", "Accuracy")), 1)
            ])
          ])
        ])) : createCommentVNode("", true),
        createBaseVNode("div", _hoisted_37, [
          createBaseVNode("div", _hoisted_38, [
            createBaseVNode("button", {
              onClick: toggleHighlights,
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
                  d: "M7 20l4-16m2 16l4-16M6 9h14M4 15h14"
                })
              ], -1)),
              createBaseVNode("span", null, toDisplayString(showHighlights.value ? tf("grammar.practice.reading.hideHighlights", "Hide highlights") : tf("grammar.practice.reading.showHighlights", "Show highlights")), 1)
            ]),
            createBaseVNode("div", _hoisted_39, [
              _cache[4] || (_cache[4] = createBaseVNode("svg", {
                class: "w-4 h-4",
                fill: "none",
                stroke: "currentColor",
                viewBox: "0 0 24 24"
              }, [
                createBaseVNode("path", {
                  "stroke-linecap": "round",
                  "stroke-linejoin": "round",
                  "stroke-width": "2",
                  d: "M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z"
                })
              ], -1)),
              createBaseVNode("span", null, toDisplayString(formatTime(readingTime.value)), 1)
            ])
          ]),
          createBaseVNode("div", _hoisted_40, [
            !showAnswers.value ? (openBlock(), createElementBlock("button", {
              key: 0,
              onClick: checkAnswers,
              disabled: !hasAllAnswers.value,
              class: "px-6 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 disabled:bg-gray-400 disabled:cursor-not-allowed transition-colors"
            }, toDisplayString(tf("grammar.practice.checkAnswer", "Check answer")), 9, _hoisted_41)) : (openBlock(), createElementBlock("button", {
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
//# sourceMappingURL=ReadingExercise-CdQgXz30.js.map
