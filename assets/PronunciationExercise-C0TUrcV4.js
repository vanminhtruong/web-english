import { d as defineComponent, H as useI18n, A as ref, B as computed, L as onUnmounted, c as createElementBlock, v as openBlock, f as createBaseVNode, e as createCommentVNode, t as toDisplayString, n as normalizeClass, u as unref, a as normalizeStyle, F as Fragment, j as renderList } from "./vendor-DoTKyHPB.js";
import { e as useVoiceStore } from "./index-B_vvULnT.js";
import "./vendor-toast-D1B2ty4j.js";
const _hoisted_1 = { class: "bg-white dark:bg-[#0a0a0a] rounded-xl shadow-lg border border-gray-200 dark:border-white/10 p-6" };
const _hoisted_2 = { class: "mb-6" };
const _hoisted_3 = { class: "text-lg font-semibold text-gray-900 dark:text-white mb-4" };
const _hoisted_4 = { class: "bg-gray-50 dark:bg-[#0a0a0a]/50 rounded-lg p-4 mb-4" };
const _hoisted_5 = { class: "text-center" };
const _hoisted_6 = { class: "text-2xl font-bold text-gray-900 dark:text-white mb-2" };
const _hoisted_7 = {
  key: 0,
  class: "text-lg text-blue-600 dark:text-blue-400 mb-4"
};
const _hoisted_8 = { class: "text-center" };
const _hoisted_9 = { class: "mb-6" };
const _hoisted_10 = { class: "text-center" };
const _hoisted_11 = ["disabled"];
const _hoisted_12 = {
  key: 0,
  class: "w-10 h-10 text-gray-600 dark:text-white/60",
  fill: "none",
  stroke: "currentColor",
  viewBox: "0 0 24 24"
};
const _hoisted_13 = {
  key: 1,
  class: "w-10 h-10 text-red-600",
  fill: "currentColor",
  viewBox: "0 0 24 24"
};
const _hoisted_14 = {
  key: 2,
  class: "w-10 h-10 text-blue-600 animate-spin",
  fill: "none",
  viewBox: "0 0 24 24"
};
const _hoisted_15 = { class: "text-sm text-gray-600 dark:text-white/60 mb-2" };
const _hoisted_16 = {
  key: 0,
  class: "text-lg font-mono text-blue-600 dark:text-blue-400"
};
const _hoisted_17 = {
  key: 0,
  class: "mb-6"
};
const _hoisted_18 = { class: "bg-blue-50 dark:bg-blue-900/30 rounded-lg p-4" };
const _hoisted_19 = { class: "flex items-center justify-between" };
const _hoisted_20 = { class: "flex items-center space-x-3" };
const _hoisted_21 = { class: "text-blue-700 dark:text-blue-300 font-medium" };
const _hoisted_22 = {
  key: 1,
  class: "mb-6"
};
const _hoisted_23 = { class: "flex items-center justify-between mb-3" };
const _hoisted_24 = { class: "w-full bg-gray-200 dark:bg-white/10 rounded-full h-3 mb-3" };
const _hoisted_25 = {
  key: 2,
  class: "mb-6"
};
const _hoisted_26 = {
  key: 0,
  class: "mt-3 p-4 bg-blue-50 dark:bg-blue-900/30 border border-blue-200 dark:border-blue-700 rounded-lg"
};
const _hoisted_27 = { class: "space-y-2" };
const _hoisted_28 = { class: "flex justify-between items-center" };
const _hoisted_29 = { class: "flex space-x-4" };
const _hoisted_30 = { class: "flex space-x-4" };
const _hoisted_31 = ["disabled"];
const _sfc_main = /* @__PURE__ */ defineComponent({
  __name: "PronunciationExercise",
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
    const isMounted = ref(true);
    const isRecording = ref(false);
    const isProcessing = ref(false);
    const recordedAudio = ref(null);
    const recordingDuration = ref(0);
    const pronunciationScore = ref(null);
    const showTips = ref(false);
    const mediaRecorder = ref(null);
    const audioChunks = ref([]);
    const recordingTimer = ref(null);
    const recordingStatus = computed(() => {
      if (isProcessing.value) return tf("grammar.practice.pronunciation.processing", "Processing...");
      if (isRecording.value) return tf("grammar.practice.pronunciation.recording", "Recording...");
      if (recordedAudio.value) return tf("grammar.practice.pronunciation.recorded", "Recorded");
      return tf("grammar.practice.pronunciation.ready", "Ready to record");
    });
    const toggleRecording = async () => {
      if (!isRecording.value) {
        await startRecording();
      } else {
        stopRecording();
      }
    };
    const startRecording = async () => {
      try {
        const stream = await navigator.mediaDevices.getUserMedia({ audio: true });
        mediaRecorder.value = new MediaRecorder(stream);
        audioChunks.value = [];
        recordingDuration.value = 0;
        mediaRecorder.value.ondataavailable = (event) => {
          audioChunks.value.push(event.data);
        };
        mediaRecorder.value.onstop = () => {
          const audioBlob = new Blob(audioChunks.value, { type: "audio/wav" });
          recordedAudio.value = audioBlob;
          stream.getTracks().forEach((track) => track.stop());
        };
        mediaRecorder.value.start();
        isRecording.value = true;
        recordingTimer.value = setInterval(() => {
          recordingDuration.value += 1;
          if (recordingDuration.value >= 10) {
            stopRecording();
          }
        }, 1e3);
      } catch (error) {
        console.error("Error accessing microphone:", error);
        alert(tf("grammar.practice.pronunciation.microphoneError", "Unable to access microphone. Please check your browser permissions and try again."));
      }
    };
    const stopRecording = () => {
      if (mediaRecorder.value && mediaRecorder.value.state !== "inactive") {
        mediaRecorder.value.stop();
      }
      isRecording.value = false;
      if (recordingTimer.value) {
        clearInterval(recordingTimer.value);
        recordingTimer.value = null;
      }
    };
    const playTargetAudio = async () => {
      try {
        await playAudio(props.question.targetText);
      } catch (error) {
        console.error("Error playing target audio:", error);
      }
    };
    const playRecordedAudio = () => {
      if (recordedAudio.value) {
        const audio = new Audio(URL.createObjectURL(recordedAudio.value));
        audio.play();
      }
    };
    const clearRecording = () => {
      recordedAudio.value = null;
      recordingDuration.value = 0;
      pronunciationScore.value = null;
    };
    const analyzePronunciation = async () => {
      if (!recordedAudio.value) return;
      isProcessing.value = true;
      try {
        await new Promise((resolve) => setTimeout(resolve, 2e3));
        const mockScore = Math.floor(Math.random() * 40) + 60;
        pronunciationScore.value = mockScore;
        emit("answer", {
          isCorrect: mockScore >= 70,
          score: mockScore,
          targetText: props.question.targetText
        });
      } catch (error) {
        console.error("Error analyzing pronunciation:", error);
      } finally {
        isProcessing.value = false;
      }
    };
    const getFeedbackMessage = () => {
      if (pronunciationScore.value === null) return "";
      if (pronunciationScore.value >= 90) {
        return tf("grammar.practice.pronunciation.excellent", "Excellent pronunciation!");
      } else if (pronunciationScore.value >= 80) {
        return tf("grammar.practice.pronunciation.good", "Good pronunciation!");
      } else if (pronunciationScore.value >= 70) {
        return tf("grammar.practice.pronunciation.fair", "Fair pronunciation. Keep practicing!");
      } else {
        return tf("grammar.practice.pronunciation.needsImprovement", "Needs improvement. Try again!");
      }
    };
    const resetExercise = () => {
      clearRecording();
      showTips.value = false;
    };
    const nextQuestion = () => {
      if (props.questionIndex === props.totalQuestions - 1) {
        emit("complete");
      } else {
        resetExercise();
        emit("next");
      }
    };
    const formatTime = (seconds) => {
      const mins = Math.floor(seconds / 60);
      const secs = seconds % 60;
      return `${mins}:${secs.toString().padStart(2, "0")}`;
    };
    onUnmounted(() => {
      isMounted.value = false;
      if (recordingTimer.value) {
        clearInterval(recordingTimer.value);
        recordingTimer.value = null;
      }
      if (mediaRecorder.value && mediaRecorder.value.state !== "inactive") {
        try {
          mediaRecorder.value.stop();
        } catch (error) {
          console.warn("Error stopping media recorder:", error);
        }
      }
      mediaRecorder.value = null;
    });
    return (_ctx, _cache) => {
      return openBlock(), createElementBlock("div", _hoisted_1, [
        createBaseVNode("div", _hoisted_2, [
          createBaseVNode("h3", _hoisted_3, toDisplayString(tf("grammar.practice.pronunciation.instruction", "Pronounce the following correctly")), 1),
          createBaseVNode("div", _hoisted_4, [
            createBaseVNode("div", _hoisted_5, [
              createBaseVNode("div", _hoisted_6, toDisplayString(_ctx.question.targetText), 1),
              _ctx.question.phonetic ? (openBlock(), createElementBlock("div", _hoisted_7, toDisplayString(_ctx.question.phonetic), 1)) : createCommentVNode("", true)
            ]),
            createBaseVNode("div", _hoisted_8, [
              createBaseVNode("button", {
                onClick: playTargetAudio,
                class: "inline-flex items-center space-x-2 px-6 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
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
                createBaseVNode("span", null, toDisplayString(tf("grammar.practice.pronunciation.listen", "Listen")), 1)
              ])
            ])
          ])
        ]),
        createBaseVNode("div", _hoisted_9, [
          createBaseVNode("div", _hoisted_10, [
            createBaseVNode("button", {
              onClick: toggleRecording,
              disabled: isProcessing.value,
              class: normalizeClass([
                "w-24 h-24 rounded-full border-4 flex items-center justify-center transition-all duration-200 mb-4",
                isRecording.value ? "border-red-500 bg-red-100 dark:bg-red-900/30 animate-pulse" : "border-gray-300 dark:border-white/10 bg-gray-100 dark:bg-[#0a0a0a] hover:border-blue-500 hover:bg-blue-50 dark:hover:bg-blue-900/30",
                isProcessing.value ? "opacity-50 cursor-not-allowed" : "cursor-pointer"
              ])
            }, [
              !isRecording.value && !isProcessing.value ? (openBlock(), createElementBlock("svg", _hoisted_12, _cache[2] || (_cache[2] = [
                createBaseVNode("path", {
                  "stroke-linecap": "round",
                  "stroke-linejoin": "round",
                  "stroke-width": "2",
                  d: "M19 11a7 7 0 01-7 7m0 0a7 7 0 01-7-7m7 7v4m0 0H8m4 0h4m-4-8a3 3 0 01-3-3V5a3 3 0 116 0v6a3 3 0 01-3 3z"
                }, null, -1)
              ]))) : isRecording.value ? (openBlock(), createElementBlock("svg", _hoisted_13, _cache[3] || (_cache[3] = [
                createBaseVNode("rect", {
                  x: "6",
                  y: "6",
                  width: "12",
                  height: "12",
                  rx: "2"
                }, null, -1)
              ]))) : (openBlock(), createElementBlock("svg", _hoisted_14, _cache[4] || (_cache[4] = [
                createBaseVNode("circle", {
                  class: "opacity-25",
                  cx: "12",
                  cy: "12",
                  r: "10",
                  stroke: "currentColor",
                  "stroke-width": "4"
                }, null, -1),
                createBaseVNode("path", {
                  class: "opacity-75",
                  fill: "currentColor",
                  d: "M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                }, null, -1)
              ])))
            ], 10, _hoisted_11),
            createBaseVNode("div", _hoisted_15, toDisplayString(recordingStatus.value), 1),
            isRecording.value || recordingDuration.value > 0 ? (openBlock(), createElementBlock("div", _hoisted_16, toDisplayString(formatTime(recordingDuration.value)), 1)) : createCommentVNode("", true)
          ])
        ]),
        recordedAudio.value && !isRecording.value ? (openBlock(), createElementBlock("div", _hoisted_17, [
          createBaseVNode("div", _hoisted_18, [
            createBaseVNode("div", _hoisted_19, [
              createBaseVNode("div", _hoisted_20, [
                createBaseVNode("button", {
                  onClick: playRecordedAudio,
                  class: "p-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
                }, _cache[5] || (_cache[5] = [
                  createBaseVNode("svg", {
                    class: "w-5 h-5",
                    fill: "none",
                    stroke: "currentColor",
                    viewBox: "0 0 24 24"
                  }, [
                    createBaseVNode("path", {
                      "stroke-linecap": "round",
                      "stroke-linejoin": "round",
                      "stroke-width": "2",
                      d: "M14.828 14.828a4 4 0 01-5.656 0M9 10h1m4 0h1m-6 4h8m2-10V9a2 2 0 01-2 2H5a2 2 0 01-2-2V6a2 2 0 012-2h14a2 2 0 012 2z"
                    })
                  ], -1)
                ])),
                createBaseVNode("span", _hoisted_21, toDisplayString(tf("grammar.practice.pronunciation.yourRecording", "Your recording")), 1)
              ]),
              createBaseVNode("button", {
                onClick: clearRecording,
                class: "p-2 text-gray-500 dark:text-white/60 hover:text-red-600 dark:hover:text-red-400 transition-colors"
              }, _cache[6] || (_cache[6] = [
                createBaseVNode("svg", {
                  class: "w-5 h-5",
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
              ]))
            ])
          ])
        ])) : createCommentVNode("", true),
        pronunciationScore.value !== null ? (openBlock(), createElementBlock("div", _hoisted_22, [
          createBaseVNode("div", {
            class: normalizeClass([
              "p-4 rounded-lg border",
              pronunciationScore.value >= 80 ? "bg-green-50 dark:bg-green-900/30 border-green-200 dark:border-green-700" : pronunciationScore.value >= 60 ? "bg-yellow-50 dark:bg-yellow-900/30 border-yellow-200 dark:border-yellow-700" : "bg-red-50 dark:bg-red-900/30 border-red-200 dark:border-red-700"
            ])
          }, [
            createBaseVNode("div", _hoisted_23, [
              createBaseVNode("h4", {
                class: normalizeClass([
                  "font-medium",
                  pronunciationScore.value >= 80 ? "text-green-800 dark:text-green-200" : pronunciationScore.value >= 60 ? "text-yellow-800 dark:text-yellow-200" : "text-red-800 dark:text-red-200"
                ])
              }, toDisplayString(unref(t)("grammar.practice.pronunciation.feedback")), 3),
              createBaseVNode("div", {
                class: normalizeClass([
                  "text-2xl font-bold",
                  pronunciationScore.value >= 80 ? "text-green-600 dark:text-green-400" : pronunciationScore.value >= 60 ? "text-yellow-600 dark:text-yellow-400" : "text-red-600 dark:text-red-400"
                ])
              }, toDisplayString(pronunciationScore.value) + "% ", 3)
            ]),
            createBaseVNode("div", _hoisted_24, [
              createBaseVNode("div", {
                class: normalizeClass([
                  "h-3 rounded-full transition-all duration-500",
                  pronunciationScore.value >= 80 ? "bg-green-600" : pronunciationScore.value >= 60 ? "bg-yellow-600" : "bg-red-600"
                ]),
                style: normalizeStyle({ width: `${pronunciationScore.value}%` })
              }, null, 6)
            ]),
            createBaseVNode("p", {
              class: normalizeClass([
                "text-sm",
                pronunciationScore.value >= 80 ? "text-green-700 dark:text-green-300" : pronunciationScore.value >= 60 ? "text-yellow-700 dark:text-yellow-300" : "text-red-700 dark:text-red-300"
              ])
            }, toDisplayString(getFeedbackMessage()), 3)
          ], 2)
        ])) : createCommentVNode("", true),
        _ctx.question.tips && _ctx.question.tips.length > 0 ? (openBlock(), createElementBlock("div", _hoisted_25, [
          createBaseVNode("button", {
            onClick: _cache[0] || (_cache[0] = ($event) => showTips.value = !showTips.value),
            class: "flex items-center space-x-2 text-blue-600 dark:text-blue-400 hover:text-blue-700 dark:hover:text-blue-300 transition-colors"
          }, [
            _cache[7] || (_cache[7] = createBaseVNode("svg", {
              class: "w-5 h-5",
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
            createBaseVNode("span", null, toDisplayString(tf("grammar.practice.pronunciation.tips", "Tips")), 1)
          ]),
          showTips.value ? (openBlock(), createElementBlock("div", _hoisted_26, [
            createBaseVNode("ul", _hoisted_27, [
              (openBlock(true), createElementBlock(Fragment, null, renderList(_ctx.question.tips, (tip) => {
                return openBlock(), createElementBlock("li", {
                  key: tip,
                  class: "text-sm text-blue-700 dark:text-blue-300 flex items-start space-x-2"
                }, [
                  _cache[8] || (_cache[8] = createBaseVNode("span", { class: "text-blue-500 mt-1" }, "•", -1)),
                  createBaseVNode("span", null, toDisplayString(tip), 1)
                ]);
              }), 128))
            ])
          ])) : createCommentVNode("", true)
        ])) : createCommentVNode("", true),
        createBaseVNode("div", _hoisted_28, [
          createBaseVNode("div", _hoisted_29, [
            pronunciationScore.value !== null && pronunciationScore.value < 80 ? (openBlock(), createElementBlock("button", {
              key: 0,
              onClick: resetExercise,
              class: "flex items-center space-x-2 px-4 py-2 text-sm text-blue-600 dark:text-blue-400 hover:text-blue-700 dark:hover:text-blue-300 transition-colors"
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
                  d: "M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15"
                })
              ], -1)),
              createBaseVNode("span", null, toDisplayString(tf("grammar.practice.pronunciation.tryAgain", "Try again")), 1)
            ])) : createCommentVNode("", true)
          ]),
          createBaseVNode("div", _hoisted_30, [
            pronunciationScore.value === null ? (openBlock(), createElementBlock("button", {
              key: 0,
              onClick: analyzePronunciation,
              disabled: !recordedAudio.value,
              class: "px-6 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 disabled:bg-gray-400 disabled:cursor-not-allowed transition-colors"
            }, toDisplayString(tf("grammar.practice.pronunciation.analyze", "Analyze pronunciation")), 9, _hoisted_31)) : (openBlock(), createElementBlock("button", {
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
//# sourceMappingURL=PronunciationExercise-C0TUrcV4.js.map
