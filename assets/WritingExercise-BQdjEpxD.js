import { d as defineComponent, H as useI18n, A as ref, B as computed, I as onMounted, L as onUnmounted, c as createElementBlock, v as openBlock, f as createBaseVNode, e as createCommentVNode, t as toDisplayString, F as Fragment, j as renderList, C as withDirectives, n as normalizeClass, Q as vModelText } from "./vendor-kzGOnAa-.js";
const _hoisted_1 = { class: "bg-white dark:bg-[#0a0a0a] rounded-xl shadow-lg border border-gray-200 dark:border-white/10 p-6" };
const _hoisted_2 = { class: "mb-8" };
const _hoisted_3 = { class: "text-lg font-semibold text-gray-900 dark:text-white mb-4" };
const _hoisted_4 = { class: "bg-blue-50 dark:bg-blue-900/30 border border-blue-200 dark:border-blue-700 rounded-lg p-4 mb-6" };
const _hoisted_5 = { class: "flex items-start space-x-3" };
const _hoisted_6 = { class: "font-medium text-blue-800 dark:text-blue-200 mb-2" };
const _hoisted_7 = { class: "text-blue-700 dark:text-blue-300 text-sm" };
const _hoisted_8 = {
  key: 0,
  class: "mb-6"
};
const _hoisted_9 = { class: "text-sm font-medium text-gray-700 dark:text-white/70 mb-2" };
const _hoisted_10 = { class: "space-y-1" };
const _hoisted_11 = { class: "flex items-center space-x-6 text-sm text-gray-600 dark:text-white/60 mb-4" };
const _hoisted_12 = {
  key: 0,
  class: "flex items-center space-x-1"
};
const _hoisted_13 = {
  key: 1,
  class: "flex items-center space-x-1"
};
const _hoisted_14 = { class: "mb-6" };
const _hoisted_15 = { class: "flex items-center justify-between mb-4" };
const _hoisted_16 = { class: "text-lg font-medium text-gray-900 dark:text-white" };
const _hoisted_17 = { class: "flex items-center space-x-4 text-sm" };
const _hoisted_18 = { class: "flex items-center space-x-1" };
const _hoisted_19 = { class: "text-gray-500 dark:text-white/60" };
const _hoisted_20 = {
  key: 0,
  class: "text-gray-400 dark:text-white/50"
};
const _hoisted_21 = {
  key: 0,
  class: "flex items-center space-x-1"
};
const _hoisted_22 = { class: "text-gray-500 dark:text-white/60" };
const _hoisted_23 = ["disabled", "placeholder"];
const _hoisted_24 = { class: "mt-4 text-sm text-gray-600 dark:text-white/60" };
const _hoisted_25 = {
  key: 0,
  class: "mt-2 p-3 bg-yellow-50 dark:bg-yellow-900/30 border border-yellow-200 dark:border-yellow-700 rounded-lg"
};
const _hoisted_26 = { class: "space-y-1" };
const _hoisted_27 = {
  key: 0,
  class: "mb-6"
};
const _hoisted_28 = { class: "text-lg font-medium text-gray-900 dark:text-white mb-4" };
const _hoisted_29 = { class: "bg-gradient-to-r from-blue-50 to-purple-50 dark:from-blue-900/30 dark:to-purple-900/30 border border-blue-200 dark:border-blue-700 rounded-lg p-4 mb-4" };
const _hoisted_30 = { class: "flex items-center justify-between" };
const _hoisted_31 = { class: "font-medium text-gray-900 dark:text-white" };
const _hoisted_32 = { class: "text-2xl font-bold text-blue-600 dark:text-blue-400" };
const _hoisted_33 = { class: "grid grid-cols-2 md:grid-cols-4 gap-4 mt-4" };
const _hoisted_34 = { class: "text-center" };
const _hoisted_35 = { class: "text-lg font-semibold text-gray-900 dark:text-white" };
const _hoisted_36 = { class: "text-xs text-gray-600 dark:text-white/60" };
const _hoisted_37 = { class: "text-center" };
const _hoisted_38 = { class: "text-lg font-semibold text-gray-900 dark:text-white" };
const _hoisted_39 = { class: "text-xs text-gray-600 dark:text-white/60" };
const _hoisted_40 = { class: "text-center" };
const _hoisted_41 = { class: "text-lg font-semibold text-gray-900 dark:text-white" };
const _hoisted_42 = { class: "text-xs text-gray-600 dark:text-white/60" };
const _hoisted_43 = { class: "text-center" };
const _hoisted_44 = { class: "text-lg font-semibold text-gray-900 dark:text-white" };
const _hoisted_45 = { class: "text-xs text-gray-600 dark:text-white/60" };
const _hoisted_46 = { class: "space-y-4" };
const _hoisted_47 = {
  key: 0,
  class: "p-4 bg-green-50 dark:bg-green-900/30 border border-green-200 dark:border-green-700 rounded-lg"
};
const _hoisted_48 = { class: "font-medium text-green-800 dark:text-green-200 mb-2" };
const _hoisted_49 = { class: "space-y-1" };
const _hoisted_50 = {
  key: 1,
  class: "p-4 bg-orange-50 dark:bg-orange-900/30 border border-orange-200 dark:border-orange-700 rounded-lg"
};
const _hoisted_51 = { class: "font-medium text-orange-800 dark:text-orange-200 mb-2" };
const _hoisted_52 = { class: "space-y-1" };
const _hoisted_53 = {
  key: 2,
  class: "p-4 bg-red-50 dark:bg-red-900/30 border border-red-200 dark:border-red-700 rounded-lg"
};
const _hoisted_54 = { class: "font-medium text-red-800 dark:text-red-200 mb-2" };
const _hoisted_55 = { class: "space-y-2" };
const _hoisted_56 = { class: "text-red-700 dark:text-red-300" };
const _hoisted_57 = { class: "text-green-700 dark:text-green-300" };
const _hoisted_58 = {
  key: 0,
  class: "text-gray-600 dark:text-white/60 text-xs mt-1"
};
const _hoisted_59 = { class: "flex justify-between items-center" };
const _hoisted_60 = { class: "flex space-x-4" };
const _hoisted_61 = { class: "flex space-x-4" };
const _hoisted_62 = ["disabled"];
const _sfc_main = /* @__PURE__ */ defineComponent({
  __name: "WritingExercise",
  props: {
    question: {},
    questionIndex: {},
    totalQuestions: {}
  },
  emits: ["answer", "next", "complete"],
  setup(__props, { emit: __emit }) {
    const { t } = useI18n();
    const tf = (key, fallback, params) => {
      const translated = params ? t(key, params) : t(key);
      const text = typeof translated === "string" ? translated : String(translated);
      if (text === key) return fallback;
      return text;
    };
    const props = __props;
    const emit = __emit;
    const userText = ref("");
    const wordCount = ref(0);
    const timeRemaining = ref(0);
    const timeExpired = ref(false);
    const isSubmitted = ref(false);
    const isAnalyzing = ref(false);
    const showTips = ref(false);
    const timer = ref(null);
    const feedback = ref(null);
    const canSubmit = computed(() => {
      return userText.value.trim().length > 0 && wordCount.value >= (props.question.minWords || 0) && !timeExpired.value && !isAnalyzing.value;
    });
    const writingTips = computed(() => {
      const tips = [
        tf("grammar.practice.exercises.writing.tip1", "Plan your structure before writing."),
        tf("grammar.practice.exercises.writing.tip2", "Use clear and concise sentences."),
        tf("grammar.practice.exercises.writing.tip3", "Vary vocabulary and sentence patterns."),
        tf("grammar.practice.exercises.writing.tip4", "Check grammar and punctuation."),
        tf("grammar.practice.exercises.writing.tip5", "Review and edit your response.")
      ];
      return tips;
    });
    const updateWordCount = () => {
      wordCount.value = userText.value.trim().split(/\s+/).filter((word) => word.length > 0).length;
    };
    const getPlaceholderText = () => {
      switch (props.question.taskType) {
        case "essay":
          return tf("grammar.practice.exercises.writing.essayPlaceholder", "Write your essay here...");
        case "email":
          return tf("grammar.practice.exercises.writing.emailPlaceholder", "Write your email here...");
        case "letter":
          return tf("grammar.practice.exercises.writing.letterPlaceholder", "Write your letter here...");
        default:
          return tf("grammar.practice.exercises.writing.paragraphPlaceholder", "Write your paragraph here...");
      }
    };
    const startTimer = () => {
      if (props.question.timeLimit) {
        timeRemaining.value = props.question.timeLimit * 60;
        timer.value = setInterval(() => {
          timeRemaining.value--;
          if (timeRemaining.value <= 0) {
            timeExpired.value = true;
            stopTimer();
            if (!isSubmitted.value) {
              submitForReview();
            }
          }
        }, 1e3);
      }
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
    const saveDraft = () => {
      const draftKey = `writing-draft-${props.question.id}`;
      localStorage.setItem(draftKey, userText.value);
      console.log("Draft saved!");
    };
    const clearText = () => {
      if (confirm(t("grammar.practice.exercises.writing.confirmClear", "Clear all text?"))) {
        userText.value = "";
        wordCount.value = 0;
      }
    };
    const submitForReview = async () => {
      isAnalyzing.value = true;
      stopTimer();
      try {
        await new Promise((resolve) => setTimeout(resolve, 3e3));
        const mockFeedback = {
          overallScore: Math.floor(Math.random() * 30) + 70,
          // 70-100
          grammar: Math.floor(Math.random() * 30) + 70,
          vocabulary: Math.floor(Math.random() * 30) + 70,
          coherence: Math.floor(Math.random() * 30) + 70,
          taskResponse: Math.floor(Math.random() * 30) + 70,
          strengths: [
            "Good use of complex sentence structures",
            "Clear organization of ideas",
            "Appropriate vocabulary for the task"
          ],
          improvements: [
            "Work on paragraph transitions",
            "Use more varied sentence beginnings",
            "Expand on supporting details"
          ],
          corrections: [
            {
              original: "This is very good",
              corrected: "This is excellent",
              explanation: "Use more precise adjectives for better impact"
            }
          ]
        };
        feedback.value = mockFeedback;
        isSubmitted.value = true;
        const score = mockFeedback.overallScore;
        emit("answer", {
          isCorrect: score >= 70,
          score,
          text: userText.value
        });
      } catch (error) {
        console.error("Error analyzing writing:", error);
      } finally {
        isAnalyzing.value = false;
      }
    };
    const nextQuestion = () => {
      if (props.questionIndex === props.totalQuestions - 1) {
        emit("complete");
      } else {
        resetExercise();
        emit("next");
      }
    };
    const resetExercise = () => {
      userText.value = "";
      wordCount.value = 0;
      timeExpired.value = false;
      isSubmitted.value = false;
      isAnalyzing.value = false;
      showTips.value = false;
      feedback.value = null;
      stopTimer();
      startTimer();
    };
    const loadDraft = () => {
      const draftKey = `writing-draft-${props.question.id}`;
      const draft = localStorage.getItem(draftKey);
      if (draft) {
        userText.value = draft;
        updateWordCount();
      }
    };
    onMounted(() => {
      startTimer();
      loadDraft();
    });
    onUnmounted(() => {
      stopTimer();
    });
    return (_ctx, _cache) => {
      return openBlock(), createElementBlock("div", _hoisted_1, [
        createBaseVNode("div", _hoisted_2, [
          createBaseVNode("h3", _hoisted_3, toDisplayString(tf("grammar.practice.exercises.writing.instruction", "Follow the writing instructions")), 1),
          createBaseVNode("div", _hoisted_4, [
            createBaseVNode("div", _hoisted_5, [
              _cache[2] || (_cache[2] = createBaseVNode("div", { class: "w-6 h-6 bg-blue-600 rounded-full flex items-center justify-center flex-shrink-0 mt-1" }, [
                createBaseVNode("svg", {
                  class: "w-4 h-4 text-white",
                  fill: "none",
                  stroke: "currentColor",
                  viewBox: "0 0 24 24"
                }, [
                  createBaseVNode("path", {
                    "stroke-linecap": "round",
                    "stroke-linejoin": "round",
                    "stroke-width": "2",
                    d: "M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
                  })
                ])
              ], -1)),
              createBaseVNode("div", null, [
                createBaseVNode("h4", _hoisted_6, toDisplayString(_ctx.question.taskType === "essay" ? tf("grammar.practice.exercises.writing.essay", "Essay") : _ctx.question.taskType === "email" ? tf("grammar.practice.exercises.writing.email", "Email") : _ctx.question.taskType === "letter" ? tf("grammar.practice.exercises.writing.letter", "Letter") : tf("grammar.practice.exercises.writing.paragraph", "Paragraph")), 1),
                createBaseVNode("p", _hoisted_7, toDisplayString(_ctx.question.prompt), 1)
              ])
            ])
          ]),
          _ctx.question.requirements && _ctx.question.requirements.length > 0 ? (openBlock(), createElementBlock("div", _hoisted_8, [
            createBaseVNode("h4", _hoisted_9, toDisplayString(tf("grammar.practice.exercises.writing.requirements", "Requirements")), 1),
            createBaseVNode("ul", _hoisted_10, [
              (openBlock(true), createElementBlock(Fragment, null, renderList(_ctx.question.requirements, (requirement) => {
                return openBlock(), createElementBlock("li", {
                  key: requirement,
                  class: "flex items-start space-x-2 text-sm text-gray-600 dark:text-white/60"
                }, [
                  _cache[3] || (_cache[3] = createBaseVNode("svg", {
                    class: "w-4 h-4 text-green-600 dark:text-green-400 mt-0.5 flex-shrink-0",
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
                  createBaseVNode("span", null, toDisplayString(requirement), 1)
                ]);
              }), 128))
            ])
          ])) : createCommentVNode("", true),
          createBaseVNode("div", _hoisted_11, [
            _ctx.question.minWords ? (openBlock(), createElementBlock("div", _hoisted_12, [
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
                  d: "M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"
                })
              ], -1)),
              createBaseVNode("span", null, toDisplayString(tf("grammar.practice.exercises.writing.minWords", "Min words")) + ": " + toDisplayString(_ctx.question.minWords), 1)
            ])) : createCommentVNode("", true),
            _ctx.question.timeLimit ? (openBlock(), createElementBlock("div", _hoisted_13, [
              _cache[5] || (_cache[5] = createBaseVNode("svg", {
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
              createBaseVNode("span", null, toDisplayString(tf("grammar.practice.exercises.writing.timeLimit", "Time limit")) + ": " + toDisplayString(_ctx.question.timeLimit) + " " + toDisplayString(tf("common.minutes", "minutes")), 1)
            ])) : createCommentVNode("", true)
          ])
        ]),
        createBaseVNode("div", _hoisted_14, [
          createBaseVNode("div", _hoisted_15, [
            createBaseVNode("h4", _hoisted_16, toDisplayString(tf("grammar.practice.exercises.writing.yourResponse", "Your response")), 1),
            createBaseVNode("div", _hoisted_17, [
              createBaseVNode("div", _hoisted_18, [
                createBaseVNode("span", _hoisted_19, toDisplayString(tf("grammar.practice.exercises.writing.words", "Words")) + ":", 1),
                createBaseVNode("span", {
                  class: normalizeClass([
                    "font-medium",
                    wordCount.value >= (_ctx.question.minWords || 0) ? "text-green-600 dark:text-green-400" : "text-orange-600 dark:text-orange-400"
                  ])
                }, toDisplayString(wordCount.value), 3),
                _ctx.question.minWords ? (openBlock(), createElementBlock("span", _hoisted_20, " / " + toDisplayString(_ctx.question.minWords), 1)) : createCommentVNode("", true)
              ]),
              _ctx.question.timeLimit ? (openBlock(), createElementBlock("div", _hoisted_21, [
                createBaseVNode("span", _hoisted_22, toDisplayString(tf("grammar.practice.exercises.writing.timeLeft", "Time left")) + ":", 1),
                createBaseVNode("span", {
                  class: normalizeClass([
                    "font-medium font-mono",
                    timeRemaining.value <= 300 ? "text-red-600 dark:text-red-400" : "text-blue-600 dark:text-blue-400"
                  ])
                }, toDisplayString(formatTime(timeRemaining.value)), 3)
              ])) : createCommentVNode("", true)
            ])
          ]),
          withDirectives(createBaseVNode("textarea", {
            "onUpdate:modelValue": _cache[0] || (_cache[0] = ($event) => userText.value = $event),
            disabled: timeExpired.value || isSubmitted.value,
            placeholder: getPlaceholderText(),
            class: "w-full h-80 px-4 py-3 border border-gray-300 dark:border-white/10 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent bg-white dark:bg-[#0a0a0a] text-gray-900 dark:text-white resize-none disabled:bg-gray-100 dark:disabled:bg-white/5 disabled:cursor-not-allowed",
            onInput: updateWordCount
          }, null, 40, _hoisted_23), [
            [vModelText, userText.value]
          ]),
          createBaseVNode("div", _hoisted_24, [
            createBaseVNode("button", {
              onClick: _cache[1] || (_cache[1] = ($event) => showTips.value = !showTips.value),
              class: "flex items-center space-x-1 hover:text-gray-800 dark:hover:text-white/80 transition-colors"
            }, [
              _cache[6] || (_cache[6] = createBaseVNode("svg", {
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
              createBaseVNode("span", null, toDisplayString(tf("grammar.practice.exercises.writing.tips", "Tips")), 1)
            ]),
            showTips.value ? (openBlock(), createElementBlock("div", _hoisted_25, [
              createBaseVNode("ul", _hoisted_26, [
                (openBlock(true), createElementBlock(Fragment, null, renderList(writingTips.value, (tip) => {
                  return openBlock(), createElementBlock("li", {
                    key: tip,
                    class: "text-yellow-800 dark:text-yellow-200"
                  }, " • " + toDisplayString(tip), 1);
                }), 128))
              ])
            ])) : createCommentVNode("", true)
          ])
        ]),
        isSubmitted.value && feedback.value ? (openBlock(), createElementBlock("div", _hoisted_27, [
          createBaseVNode("h4", _hoisted_28, toDisplayString(tf("grammar.practice.exercises.writing.feedback", "Feedback")), 1),
          createBaseVNode("div", _hoisted_29, [
            createBaseVNode("div", _hoisted_30, [
              createBaseVNode("h5", _hoisted_31, toDisplayString(tf("grammar.practice.exercises.writing.overallScore", "Overall score")), 1),
              createBaseVNode("div", _hoisted_32, toDisplayString(feedback.value.overallScore) + "/100 ", 1)
            ]),
            createBaseVNode("div", _hoisted_33, [
              createBaseVNode("div", _hoisted_34, [
                createBaseVNode("div", _hoisted_35, toDisplayString(feedback.value.grammar), 1),
                createBaseVNode("div", _hoisted_36, toDisplayString(tf("grammar.practice.exercises.writing.grammar", "Grammar")), 1)
              ]),
              createBaseVNode("div", _hoisted_37, [
                createBaseVNode("div", _hoisted_38, toDisplayString(feedback.value.vocabulary), 1),
                createBaseVNode("div", _hoisted_39, toDisplayString(tf("grammar.practice.exercises.writing.vocabulary", "Vocabulary")), 1)
              ]),
              createBaseVNode("div", _hoisted_40, [
                createBaseVNode("div", _hoisted_41, toDisplayString(feedback.value.coherence), 1),
                createBaseVNode("div", _hoisted_42, toDisplayString(tf("grammar.practice.exercises.writing.coherence", "Coherence")), 1)
              ]),
              createBaseVNode("div", _hoisted_43, [
                createBaseVNode("div", _hoisted_44, toDisplayString(feedback.value.taskResponse), 1),
                createBaseVNode("div", _hoisted_45, toDisplayString(tf("grammar.practice.exercises.writing.taskResponse", "Task response")), 1)
              ])
            ])
          ]),
          createBaseVNode("div", _hoisted_46, [
            feedback.value.strengths.length > 0 ? (openBlock(), createElementBlock("div", _hoisted_47, [
              createBaseVNode("h6", _hoisted_48, toDisplayString(tf("grammar.practice.exercises.writing.strengths", "Strengths")), 1),
              createBaseVNode("ul", _hoisted_49, [
                (openBlock(true), createElementBlock(Fragment, null, renderList(feedback.value.strengths, (strength) => {
                  return openBlock(), createElementBlock("li", {
                    key: strength,
                    class: "text-green-700 dark:text-green-300 text-sm"
                  }, " ✓ " + toDisplayString(strength), 1);
                }), 128))
              ])
            ])) : createCommentVNode("", true),
            feedback.value.improvements.length > 0 ? (openBlock(), createElementBlock("div", _hoisted_50, [
              createBaseVNode("h6", _hoisted_51, toDisplayString(tf("grammar.practice.exercises.writing.improvements", "Areas for improvement")), 1),
              createBaseVNode("ul", _hoisted_52, [
                (openBlock(true), createElementBlock(Fragment, null, renderList(feedback.value.improvements, (improvement) => {
                  return openBlock(), createElementBlock("li", {
                    key: improvement,
                    class: "text-orange-700 dark:text-orange-300 text-sm"
                  }, " → " + toDisplayString(improvement), 1);
                }), 128))
              ])
            ])) : createCommentVNode("", true),
            feedback.value.corrections.length > 0 ? (openBlock(), createElementBlock("div", _hoisted_53, [
              createBaseVNode("h6", _hoisted_54, toDisplayString(tf("grammar.practice.exercises.writing.corrections", "Corrections")), 1),
              createBaseVNode("div", _hoisted_55, [
                (openBlock(true), createElementBlock(Fragment, null, renderList(feedback.value.corrections, (correction) => {
                  return openBlock(), createElementBlock("div", {
                    key: correction.original,
                    class: "text-sm"
                  }, [
                    createBaseVNode("div", _hoisted_56, " ❌ " + toDisplayString(correction.original), 1),
                    createBaseVNode("div", _hoisted_57, " ✅ " + toDisplayString(correction.corrected), 1),
                    correction.explanation ? (openBlock(), createElementBlock("div", _hoisted_58, toDisplayString(correction.explanation), 1)) : createCommentVNode("", true)
                  ]);
                }), 128))
              ])
            ])) : createCommentVNode("", true)
          ])
        ])) : createCommentVNode("", true),
        createBaseVNode("div", _hoisted_59, [
          createBaseVNode("div", _hoisted_60, [
            !isSubmitted.value && userText.value.trim() ? (openBlock(), createElementBlock("button", {
              key: 0,
              onClick: saveDraft,
              class: "flex items-center space-x-2 px-4 py-2 text-sm text-gray-600 dark:text-gray-400 hover:text-gray-800 dark:hover:text-gray-200 transition-colors"
            }, [
              _cache[7] || (_cache[7] = createBaseVNode("svg", {
                class: "w-4 h-4",
                fill: "none",
                stroke: "currentColor",
                viewBox: "0 0 24 24"
              }, [
                createBaseVNode("path", {
                  "stroke-linecap": "round",
                  "stroke-linejoin": "round",
                  "stroke-width": "2",
                  d: "M8 7H5a2 2 0 00-2 2v9a2 2 0 002 2h14a2 2 0 002-2V9a2 2 0 00-2-2h-3m-1 4l-3-3m0 0l-3 3m3-3v12"
                })
              ], -1)),
              createBaseVNode("span", null, toDisplayString(tf("grammar.practice.exercises.writing.saveDraft", "Save draft")), 1)
            ])) : createCommentVNode("", true),
            !isSubmitted.value && userText.value.trim() ? (openBlock(), createElementBlock("button", {
              key: 1,
              onClick: clearText,
              class: "flex items-center space-x-2 px-4 py-2 text-sm text-red-600 dark:text-red-400 hover:text-red-700 dark:hover:text-red-300 transition-colors"
            }, [
              _cache[8] || (_cache[8] = createBaseVNode("svg", {
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
              createBaseVNode("span", null, toDisplayString(tf("grammar.practice.exercises.writing.clear", "Clear")), 1)
            ])) : createCommentVNode("", true)
          ]),
          createBaseVNode("div", _hoisted_61, [
            !isSubmitted.value ? (openBlock(), createElementBlock("button", {
              key: 0,
              onClick: submitForReview,
              disabled: !canSubmit.value,
              class: "px-6 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 disabled:bg-gray-400 disabled:cursor-not-allowed transition-colors"
            }, toDisplayString(isAnalyzing.value ? tf("grammar.practice.exercises.writing.analyzing", "Analyzing...") : tf("grammar.practice.exercises.writing.submit", "Submit for review")), 9, _hoisted_62)) : (openBlock(), createElementBlock("button", {
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
//# sourceMappingURL=WritingExercise-BQdjEpxD.js.map
