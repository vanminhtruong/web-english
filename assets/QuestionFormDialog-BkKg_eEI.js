import { d as defineComponent, M as useI18n, z as ref, D as computed, P as watch, A as onMounted, B as onUnmounted, c as createElementBlock, v as openBlock, y as createVNode, w as withCtx, e as createCommentVNode, U as Transition, f as createBaseVNode, i as withModifiers, t as toDisplayString, u as unref, E as withDirectives, g as createTextVNode, F as Fragment, j as renderList, Y as vModelSelect, X as vModelText, a4 as vModelRadio } from "./vendor-CKTvmtu5.js";
const _hoisted_1 = {
  key: 0,
  class: "fixed inset-0 bg-gray-600 bg-opacity-50 flex items-center justify-center p-4 z-50 backdrop-blur-sm"
};
const _hoisted_2 = { class: "w-full max-h-[90vh] flex flex-col max-w-full sm:max-w-lg md:max-w-2xl lg:max-w-4xl" };
const _hoisted_3 = { class: "px-6 py-4 border-b border-gray-200 dark:border-gray-700 flex-shrink-0 bg-gradient-to-r from-blue-50 to-indigo-50 dark:from-[#0a0a0a] dark:to-[#0a0a0a]" };
const _hoisted_4 = { class: "flex items-center justify-between" };
const _hoisted_5 = { class: "text-lg sm:text-xl md:text-2xl font-semibold text-gray-900 dark:text-white flex items-center space-x-2" };
const _hoisted_6 = { class: "px-6 py-4 flex-1 overflow-y-auto min-h-0" };
const _hoisted_7 = {
  class: "animate-fade-in-up",
  style: { "animation-delay": "0.1s" }
};
const _hoisted_8 = { class: "block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2 flex items-center" };
const _hoisted_9 = { value: "" };
const _hoisted_10 = ["value"];
const _hoisted_11 = {
  class: "animate-fade-in-up",
  style: { "animation-delay": "0.2s" }
};
const _hoisted_12 = { class: "block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2 flex items-center" };
const _hoisted_13 = { value: "" };
const _hoisted_14 = { value: "multiple-choice" };
const _hoisted_15 = { value: "fill-blank" };
const _hoisted_16 = { value: "true-false" };
const _hoisted_17 = { value: "short-answer" };
const _hoisted_18 = {
  class: "animate-fade-in-up",
  style: { "animation-delay": "0.3s" }
};
const _hoisted_19 = { class: "block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2 flex items-center" };
const _hoisted_20 = ["placeholder"];
const _hoisted_21 = {
  key: 0,
  class: "space-y-4 animate-fade-in-up",
  style: { "animation-delay": "0.4s" }
};
const _hoisted_22 = { class: "flex items-center justify-between" };
const _hoisted_23 = { class: "block text-sm font-medium text-gray-700 dark:text-gray-300 flex items-center" };
const _hoisted_24 = { class: "flex items-center" };
const _hoisted_25 = ["id", "value"];
const _hoisted_26 = ["for"];
const _hoisted_27 = ["onUpdate:modelValue", "placeholder"];
const _hoisted_28 = ["onClick"];
const _hoisted_29 = {
  key: 1,
  class: "animate-fade-in-up",
  style: { "animation-delay": "0.5s" }
};
const _hoisted_30 = { class: "block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2 flex items-center" };
const _hoisted_31 = ["value"];
const _hoisted_32 = {
  key: 1,
  class: "mt-2 flex space-x-4"
};
const _hoisted_33 = { class: "flex items-center" };
const _hoisted_34 = { class: "ml-2 text-sm text-gray-700 dark:text-gray-300" };
const _hoisted_35 = { class: "flex items-center" };
const _hoisted_36 = { class: "ml-2 text-sm text-gray-700 dark:text-gray-300" };
const _hoisted_37 = ["placeholder"];
const _hoisted_38 = {
  class: "animate-fade-in-up",
  style: { "animation-delay": "0.6s" }
};
const _hoisted_39 = { class: "block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2 flex items-center" };
const _hoisted_40 = { value: "" };
const _hoisted_41 = { value: "easy" };
const _hoisted_42 = { value: "medium" };
const _hoisted_43 = { value: "hard" };
const _hoisted_44 = {
  class: "animate-fade-in-up",
  style: { "animation-delay": "0.7s" }
};
const _hoisted_45 = { class: "block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2 flex items-center" };
const _hoisted_46 = ["placeholder"];
const _hoisted_47 = { class: "flex items-center justify-end space-x-3 p-6 border-t border-gray-200 dark:border-gray-700 bg-gradient-to-r from-gray-50 to-white dark:from-[#0a0a0a] dark:to-[#0a0a0a] flex-shrink-0" };
const _hoisted_48 = ["disabled"];
const __default__ = {};
const _sfc_main = /* @__PURE__ */ defineComponent({
  ...__default__,
  ...{
    name: "QuestionFormDialog"
  },
  __name: "QuestionFormDialog",
  props: {
    show: { type: Boolean },
    question: {},
    vocabularyList: {}
  },
  emits: ["close", "save"],
  setup(__props, { emit: __emit }) {
    const props = __props;
    const emit = __emit;
    const { t } = useI18n();
    const formData = ref({
      vocabularyId: "",
      question: "",
      type: "multiple-choice",
      options: void 0,
      correctAnswer: "",
      difficulty: void 0,
      explanation: ""
    });
    const isFormValid = computed(() => {
      if (!formData.value.vocabularyId || !formData.value.question || !formData.value.type) {
        return false;
      }
      if (formData.value.type === "multiple-choice") {
        return formData.value.options?.every((opt) => opt.trim()) && formData.value.correctAnswer !== "" && formData.value.options?.length >= 2;
      }
      return formData.value.correctAnswer !== "";
    });
    const resetForm = () => {
      formData.value = {
        vocabularyId: "",
        question: "",
        type: "multiple-choice",
        options: void 0,
        correctAnswer: "",
        difficulty: void 0,
        explanation: ""
      };
    };
    const loadQuestion = () => {
      if (props.question) {
        formData.value = {
          vocabularyId: props.question.vocabularyId,
          question: props.question.question,
          type: props.question.type,
          options: props.question.options ? [...props.question.options] : ["", "", "", ""],
          correctAnswer: String(props.question.correctAnswer),
          difficulty: props.question.difficulty || "easy",
          explanation: props.question.explanation || ""
        };
      } else {
        resetForm();
      }
    };
    const onTypeChange = () => {
      if (formData.value.type === "multiple-choice") {
        formData.value.options = ["", "", "", ""];
      } else if (formData.value.type === "true-false") {
        formData.value.options = void 0;
        formData.value.correctAnswer = "true";
      } else {
        formData.value.options = void 0;
        formData.value.correctAnswer = "";
      }
    };
    const addOption = () => {
      if (formData.value.options && formData.value.options.length < 6) {
        formData.value.options.push("");
      }
    };
    const removeOption = (index) => {
      if (formData.value.options && formData.value.options.length > 2) {
        formData.value.options.splice(index, 1);
        const currentAnswerIndex = Number(formData.value.correctAnswer);
        if (currentAnswerIndex === index) {
          formData.value.correctAnswer = "";
        } else if (currentAnswerIndex > index) {
          formData.value.correctAnswer = String(currentAnswerIndex - 1);
        }
      }
    };
    const handleSubmit = () => {
      if (!isFormValid.value) return;
      const questionData = {
        vocabularyId: formData.value.vocabularyId,
        question: formData.value.question,
        type: formData.value.type,
        correctAnswer: formData.value.correctAnswer,
        difficulty: formData.value.difficulty,
        explanation: formData.value.explanation,
        options: formData.value.type === "multiple-choice" ? formData.value.options?.filter((opt) => opt.trim()) : void 0
      };
      emit("save", questionData);
    };
    const lockBodyScroll = () => {
      document.body.style.overflow = "hidden";
    };
    const unlockBodyScroll = () => {
      document.body.style.overflow = "";
    };
    watch(() => props.show, (newShow) => {
      if (newShow) {
        loadQuestion();
        lockBodyScroll();
      } else {
        unlockBodyScroll();
      }
    });
    watch(() => props.question, () => {
      if (props.show) {
        loadQuestion();
      }
    });
    onMounted(() => {
      if (props.show) {
        loadQuestion();
        lockBodyScroll();
      }
    });
    onUnmounted(() => {
      unlockBodyScroll();
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
            _ctx.show ? (openBlock(), createElementBlock("div", _hoisted_1, [
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
                      onClick: _cache[11] || (_cache[11] = withModifiers(() => {
                      }, ["stop"]))
                    }, [
                      createBaseVNode("div", _hoisted_3, [
                        createBaseVNode("div", _hoisted_4, [
                          createBaseVNode("h2", _hoisted_5, [
                            _cache[12] || (_cache[12] = createBaseVNode("span", { class: "w-2 h-2 bg-blue-500 rounded-full animate-pulse" }, null, -1)),
                            createBaseVNode("span", null, toDisplayString(_ctx.question ? unref(t)("vocabulary.questions.editQuestion", "Edit Question") : unref(t)("vocabulary.questions.addQuestion", "Add New Question")), 1)
                          ]),
                          createBaseVNode("button", {
                            onClick: _cache[0] || (_cache[0] = ($event) => _ctx.$emit("close")),
                            class: "text-gray-400 hover:text-gray-600 dark:hover:text-gray-200 transition-all duration-300 hover:scale-110 hover:rotate-90 p-1 rounded-full hover:bg-gray-100 dark:hover:bg-gray-800"
                          }, _cache[13] || (_cache[13] = [
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
                        createBaseVNode("form", {
                          onSubmit: withModifiers(handleSubmit, ["prevent"]),
                          class: "space-y-6"
                        }, [
                          createBaseVNode("div", _hoisted_7, [
                            createBaseVNode("label", _hoisted_8, [
                              _cache[14] || (_cache[14] = createBaseVNode("span", { class: "w-1 h-4 bg-blue-500 rounded mr-2" }, null, -1)),
                              createTextVNode(" " + toDisplayString(unref(t)("vocabulary.questions.selectVocabulary", "Select Vocabulary Word")) + " ", 1),
                              _cache[15] || (_cache[15] = createBaseVNode("span", { class: "text-red-500 ml-1" }, "*", -1))
                            ]),
                            withDirectives(createBaseVNode("select", {
                              "onUpdate:modelValue": _cache[1] || (_cache[1] = ($event) => formData.value.vocabularyId = $event),
                              required: "",
                              class: "w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-[#0a0a0a] text-gray-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-300 hover:border-blue-400 dark:hover:border-blue-500 transform hover:scale-[1.02]"
                            }, [
                              createBaseVNode("option", _hoisted_9, toDisplayString(unref(t)("vocabulary.questions.selectVocabularyPlaceholder", "Choose a vocabulary word...")), 1),
                              (openBlock(true), createElementBlock(Fragment, null, renderList(_ctx.vocabularyList, (vocab) => {
                                return openBlock(), createElementBlock("option", {
                                  key: vocab.id,
                                  value: vocab.id
                                }, toDisplayString(vocab.word) + " - " + toDisplayString(vocab.meaning), 9, _hoisted_10);
                              }), 128))
                            ], 512), [
                              [vModelSelect, formData.value.vocabularyId]
                            ])
                          ]),
                          createBaseVNode("div", _hoisted_11, [
                            createBaseVNode("label", _hoisted_12, [
                              _cache[16] || (_cache[16] = createBaseVNode("span", { class: "w-1 h-4 bg-green-500 rounded mr-2" }, null, -1)),
                              createTextVNode(" " + toDisplayString(unref(t)("vocabulary.questions.questionType", "Question Type")) + " ", 1),
                              _cache[17] || (_cache[17] = createBaseVNode("span", { class: "text-red-500 ml-1" }, "*", -1))
                            ]),
                            withDirectives(createBaseVNode("select", {
                              "onUpdate:modelValue": _cache[2] || (_cache[2] = ($event) => formData.value.type = $event),
                              required: "",
                              onChange: onTypeChange,
                              class: "w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-[#0a0a0a] text-gray-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-transparent transition-all duration-300 hover:border-green-400 dark:hover:border-green-500 transform hover:scale-[1.02]"
                            }, [
                              createBaseVNode("option", _hoisted_13, toDisplayString(unref(t)("vocabulary.questions.selectType", "Select question type...")), 1),
                              createBaseVNode("option", _hoisted_14, toDisplayString(unref(t)("vocabulary.questions.types.multipleChoice", "Multiple Choice")), 1),
                              createBaseVNode("option", _hoisted_15, toDisplayString(unref(t)("vocabulary.questions.types.fillBlank", "Fill in the Blank")), 1),
                              createBaseVNode("option", _hoisted_16, toDisplayString(unref(t)("vocabulary.questions.types.trueFalse", "True/False")), 1),
                              createBaseVNode("option", _hoisted_17, toDisplayString(unref(t)("vocabulary.questions.types.shortAnswer", "Short Answer")), 1)
                            ], 544), [
                              [vModelSelect, formData.value.type]
                            ])
                          ]),
                          createBaseVNode("div", _hoisted_18, [
                            createBaseVNode("label", _hoisted_19, [
                              _cache[18] || (_cache[18] = createBaseVNode("span", { class: "w-1 h-4 bg-purple-500 rounded mr-2" }, null, -1)),
                              createTextVNode(" " + toDisplayString(unref(t)("vocabulary.questions.questionText", "Question")) + " ", 1),
                              _cache[19] || (_cache[19] = createBaseVNode("span", { class: "text-red-500 ml-1" }, "*", -1))
                            ]),
                            withDirectives(createBaseVNode("textarea", {
                              "onUpdate:modelValue": _cache[3] || (_cache[3] = ($event) => formData.value.question = $event),
                              required: "",
                              rows: "3",
                              placeholder: unref(t)("vocabulary.questions.questionPlaceholder", "Enter your question..."),
                              class: "w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-[#0a0a0a] text-gray-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent transition-all duration-300 hover:border-purple-400 dark:hover:border-purple-500 transform hover:scale-[1.02] resize-none"
                            }, null, 8, _hoisted_20), [
                              [vModelText, formData.value.question]
                            ])
                          ]),
                          formData.value.type === "multiple-choice" ? (openBlock(), createElementBlock("div", _hoisted_21, [
                            createBaseVNode("div", _hoisted_22, [
                              createBaseVNode("label", _hoisted_23, [
                                _cache[20] || (_cache[20] = createBaseVNode("span", { class: "w-1 h-4 bg-orange-500 rounded mr-2" }, null, -1)),
                                createTextVNode(" " + toDisplayString(unref(t)("vocabulary.questions.options", "Answer Options")) + " ", 1),
                                _cache[21] || (_cache[21] = createBaseVNode("span", { class: "text-red-500 ml-1" }, "*", -1))
                              ]),
                              createBaseVNode("button", {
                                type: "button",
                                onClick: addOption,
                                class: "text-blue-600 dark:text-blue-400 hover:text-blue-700 dark:hover:text-blue-300 text-sm font-medium transition-all duration-300 hover:scale-105"
                              }, " + " + toDisplayString(unref(t)("vocabulary.questions.addOption", "Add Option")), 1)
                            ]),
                            formData.value.options ? (openBlock(true), createElementBlock(Fragment, { key: 0 }, renderList(formData.value.options, (option, index) => {
                              return openBlock(), createElementBlock("div", {
                                key: index,
                                class: "flex items-center space-x-3"
                              }, [
                                createBaseVNode("div", _hoisted_24, [
                                  withDirectives(createBaseVNode("input", {
                                    id: `option-${index}`,
                                    "onUpdate:modelValue": _cache[4] || (_cache[4] = ($event) => formData.value.correctAnswer = $event),
                                    value: index,
                                    type: "radio",
                                    name: "correctAnswer",
                                    class: "w-4 h-4 text-blue-600 focus:ring-blue-500 border-gray-300 dark:border-gray-600"
                                  }, null, 8, _hoisted_25), [
                                    [vModelRadio, formData.value.correctAnswer]
                                  ]),
                                  createBaseVNode("label", {
                                    for: `option-${index}`,
                                    class: "ml-2 text-sm text-gray-700 dark:text-gray-300"
                                  }, toDisplayString(String.fromCharCode(65 + index)), 9, _hoisted_26)
                                ]),
                                withDirectives(createBaseVNode("input", {
                                  "onUpdate:modelValue": ($event) => formData.value.options[index] = $event,
                                  type: "text",
                                  placeholder: `${unref(t)("vocabulary.questions.optionPlaceholder", "Option")} ${String.fromCharCode(65 + index)}`,
                                  class: "flex-1 px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-[#0a0a0a] text-gray-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-300 hover:border-blue-400 dark:hover:border-blue-500 transform hover:scale-[1.02]"
                                }, null, 8, _hoisted_27), [
                                  [vModelText, formData.value.options[index]]
                                ]),
                                formData.value.options && formData.value.options.length > 2 ? (openBlock(), createElementBlock("button", {
                                  key: 0,
                                  type: "button",
                                  onClick: ($event) => removeOption(index),
                                  class: "p-2 text-red-600 dark:text-red-400 hover:bg-red-50/50 dark:hover:bg-red-900/20 rounded-lg transition-all duration-300 hover:scale-110"
                                }, _cache[22] || (_cache[22] = [
                                  createBaseVNode("svg", {
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
                                  ], -1)
                                ]), 8, _hoisted_28)) : createCommentVNode("", true)
                              ]);
                            }), 128)) : createCommentVNode("", true)
                          ])) : createCommentVNode("", true),
                          formData.value.type && formData.value.type !== "multiple-choice" ? (openBlock(), createElementBlock("div", _hoisted_29, [
                            createBaseVNode("label", _hoisted_30, [
                              _cache[23] || (_cache[23] = createBaseVNode("span", { class: "w-1 h-4 bg-orange-500 rounded mr-2" }, null, -1)),
                              createTextVNode(" " + toDisplayString(unref(t)("vocabulary.questions.correctAnswer", "Correct Answer")) + " ", 1),
                              _cache[24] || (_cache[24] = createBaseVNode("span", { class: "text-red-500 ml-1" }, "*", -1))
                            ]),
                            formData.value.type === "true-false" ? (openBlock(), createElementBlock("input", {
                              key: 0,
                              value: formData.value.correctAnswer === "true" ? unref(t)("vocabulary.questions.true", "True") : unref(t)("vocabulary.questions.false", "False"),
                              type: "text",
                              readonly: "",
                              class: "w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-gray-50/50 dark:bg-[#0a0a0a]/50 text-gray-900 dark:text-white"
                            }, null, 8, _hoisted_31)) : createCommentVNode("", true),
                            formData.value.type === "true-false" ? (openBlock(), createElementBlock("div", _hoisted_32, [
                              createBaseVNode("label", _hoisted_33, [
                                withDirectives(createBaseVNode("input", {
                                  "onUpdate:modelValue": _cache[5] || (_cache[5] = ($event) => formData.value.correctAnswer = $event),
                                  value: "true",
                                  type: "radio",
                                  name: "trueFalse",
                                  class: "w-4 h-4 text-blue-600 focus:ring-blue-500 border-gray-300 dark:border-gray-600"
                                }, null, 512), [
                                  [vModelRadio, formData.value.correctAnswer]
                                ]),
                                createBaseVNode("span", _hoisted_34, toDisplayString(unref(t)("vocabulary.questions.true", "True")), 1)
                              ]),
                              createBaseVNode("label", _hoisted_35, [
                                withDirectives(createBaseVNode("input", {
                                  "onUpdate:modelValue": _cache[6] || (_cache[6] = ($event) => formData.value.correctAnswer = $event),
                                  value: "false",
                                  type: "radio",
                                  name: "trueFalse",
                                  class: "w-4 h-4 text-blue-600 focus:ring-blue-500 border-gray-300 dark:border-gray-600"
                                }, null, 512), [
                                  [vModelRadio, formData.value.correctAnswer]
                                ]),
                                createBaseVNode("span", _hoisted_36, toDisplayString(unref(t)("vocabulary.questions.false", "False")), 1)
                              ])
                            ])) : withDirectives((openBlock(), createElementBlock("input", {
                              key: 2,
                              "onUpdate:modelValue": _cache[7] || (_cache[7] = ($event) => formData.value.correctAnswer = $event),
                              type: "text",
                              required: "",
                              placeholder: unref(t)("vocabulary.questions.correctAnswerPlaceholder", "Enter the correct answer..."),
                              class: "w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-[#0a0a0a] text-gray-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-orange-500 focus:border-transparent transition-all duration-300 hover:border-orange-400 dark:hover:border-orange-500 transform hover:scale-[1.02]"
                            }, null, 8, _hoisted_37)), [
                              [vModelText, formData.value.correctAnswer]
                            ])
                          ])) : createCommentVNode("", true),
                          createBaseVNode("div", _hoisted_38, [
                            createBaseVNode("label", _hoisted_39, [
                              _cache[25] || (_cache[25] = createBaseVNode("span", { class: "w-1 h-4 bg-yellow-500 rounded mr-2" }, null, -1)),
                              createTextVNode(" " + toDisplayString(unref(t)("vocabulary.questions.difficulty", "Difficulty")), 1)
                            ]),
                            withDirectives(createBaseVNode("select", {
                              "onUpdate:modelValue": _cache[8] || (_cache[8] = ($event) => formData.value.difficulty = $event),
                              class: "w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-[#0a0a0a] text-gray-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-yellow-500 focus:border-transparent transition-all duration-300 hover:border-yellow-400 dark:hover:border-yellow-500 transform hover:scale-[1.02]"
                            }, [
                              createBaseVNode("option", _hoisted_40, toDisplayString(unref(t)("vocabulary.questions.selectDifficulty", "Select difficulty...")), 1),
                              createBaseVNode("option", _hoisted_41, toDisplayString(unref(t)("common.easy", "Easy")), 1),
                              createBaseVNode("option", _hoisted_42, toDisplayString(unref(t)("vocabulary.questions.difficulty.medium", "Medium")), 1),
                              createBaseVNode("option", _hoisted_43, toDisplayString(unref(t)("common.difficult", "Difficult")), 1)
                            ], 512), [
                              [vModelSelect, formData.value.difficulty]
                            ])
                          ]),
                          createBaseVNode("div", _hoisted_44, [
                            createBaseVNode("label", _hoisted_45, [
                              _cache[26] || (_cache[26] = createBaseVNode("span", { class: "w-1 h-4 bg-cyan-500 rounded mr-2" }, null, -1)),
                              createTextVNode(" " + toDisplayString(unref(t)("vocabulary.questions.explanation", "Explanation")), 1)
                            ]),
                            withDirectives(createBaseVNode("textarea", {
                              "onUpdate:modelValue": _cache[9] || (_cache[9] = ($event) => formData.value.explanation = $event),
                              rows: "3",
                              placeholder: unref(t)("vocabulary.questions.explanationPlaceholder", "Optional explanation for the answer..."),
                              class: "w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-[#0a0a0a] text-gray-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-cyan-500 focus:border-transparent transition-all duration-300 hover:border-cyan-400 dark:hover:border-cyan-500 transform hover:scale-[1.02] resize-none"
                            }, null, 8, _hoisted_46), [
                              [vModelText, formData.value.explanation]
                            ])
                          ])
                        ], 32)
                      ]),
                      createBaseVNode("div", _hoisted_47, [
                        createBaseVNode("button", {
                          onClick: _cache[10] || (_cache[10] = ($event) => _ctx.$emit("close")),
                          type: "button",
                          class: "px-4 py-2 text-gray-700 dark:text-gray-300 bg-white/50 dark:bg-[#0a0a0a]/50 hover:bg-gray-100/50 dark:hover:bg-[#0a0a0a]/70 border border-gray-300 dark:border-gray-600 rounded-lg font-medium transition-all duration-300 hover:scale-105 shadow-md hover:shadow-lg"
                        }, toDisplayString(unref(t)("common.cancel", "Cancel")), 1),
                        createBaseVNode("button", {
                          onClick: handleSubmit,
                          type: "submit",
                          disabled: !isFormValid.value,
                          class: "px-6 py-2 bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-700 hover:to-indigo-700 disabled:from-gray-400 disabled:to-gray-500 disabled:cursor-not-allowed text-white rounded-lg font-medium transition-all duration-300 hover:scale-105 shadow-lg hover:shadow-xl"
                        }, toDisplayString(_ctx.question ? unref(t)("common.update", "Update") : unref(t)("common.add", "Add")), 9, _hoisted_48)
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
//# sourceMappingURL=QuestionFormDialog-BkKg_eEI.js.map
