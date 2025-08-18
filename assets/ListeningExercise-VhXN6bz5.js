import { d as defineComponent, H as useI18n, A as ref, B as computed, K as watch, I as onMounted, L as onUnmounted, c as createElementBlock, v as openBlock, f as createBaseVNode, e as createCommentVNode, t as toDisplayString, a as normalizeStyle, C as withDirectives, S as vModelText, F as Fragment, j as renderList, n as normalizeClass, a3 as vModelRadio, y as createVNode, w as withCtx, u as unref, a4 as VueDraggableNext, g as createTextVNode } from "./vendor-DMqe9Z5T.js";
import { e as useVoiceStore } from "./index-W3xd3TqU.js";
import "./vendor-toast-C02QcIAu.js";
const _hoisted_1 = { class: "bg-white dark:bg-[#0a0a0a] rounded-xl shadow-lg border border-gray-200 dark:border-white/10 p-6" };
const _hoisted_2 = { class: "mb-8" };
const _hoisted_3 = { class: "text-center" };
const _hoisted_4 = { class: "text-lg font-semibold text-gray-900 dark:text-white mb-4" };
const _hoisted_5 = { class: "bg-gray-50 dark:bg-[#0a0a0a]/50 rounded-lg p-6 mb-4" };
const _hoisted_6 = { class: "flex items-center justify-center space-x-6 mb-4" };
const _hoisted_7 = ["disabled"];
const _hoisted_8 = {
  key: 0,
  class: "w-8 h-8 ml-1",
  fill: "currentColor",
  viewBox: "0 0 24 24"
};
const _hoisted_9 = {
  key: 1,
  class: "w-8 h-8",
  fill: "currentColor",
  viewBox: "0 0 24 24"
};
const _hoisted_10 = ["disabled"];
const _hoisted_11 = { class: "mb-4" };
const _hoisted_12 = { class: "flex justify-between text-xs text-gray-500 dark:text-white/60 mt-1" };
const _hoisted_13 = { class: "flex items-center justify-center space-x-4 text-sm text-gray-600 dark:text-white/60" };
const _hoisted_14 = { class: "flex items-center space-x-1" };
const _hoisted_15 = {
  key: 0,
  class: "flex items-center space-x-1"
};
const _hoisted_16 = {
  key: 0,
  class: "text-gray-500 dark:text-white/60"
};
const _hoisted_17 = {
  key: 0,
  class: "mb-6"
};
const _hoisted_18 = { class: "block text-sm font-medium text-gray-700 dark:text-white/80 mb-2" };
const _hoisted_19 = ["placeholder"];
const _hoisted_20 = { class: "space-y-6" };
const _hoisted_21 = { class: "text-lg font-semibold text-gray-900 dark:text-white border-b border-gray-200 dark:border-white/10 pb-2" };
const _hoisted_22 = { class: "space-y-6" };
const _hoisted_23 = { class: "mb-4" };
const _hoisted_24 = { class: "font-medium text-gray-900 dark:text-white mb-2" };
const _hoisted_25 = {
  key: 0,
  class: "space-y-2"
};
const _hoisted_26 = ["name", "value", "onUpdate:modelValue", "disabled"];
const _hoisted_27 = { class: "text-gray-900 dark:text-white" };
const _hoisted_28 = { class: "ml-auto" };
const _hoisted_29 = {
  key: 0,
  class: "w-5 h-5 text-green-600 dark:text-green-400",
  fill: "none",
  stroke: "currentColor",
  viewBox: "0 0 24 24"
};
const _hoisted_30 = {
  key: 1,
  class: "w-5 h-5 text-red-600 dark:text-red-400",
  fill: "none",
  stroke: "currentColor",
  viewBox: "0 0 24 24"
};
const _hoisted_31 = {
  key: 1,
  class: "space-y-2"
};
const _hoisted_32 = ["onUpdate:modelValue", "disabled", "placeholder"];
const _hoisted_33 = {
  key: 0,
  class: "text-sm text-green-600 dark:text-green-400"
};
const _hoisted_34 = {
  key: 2,
  class: "space-y-2"
};
const _hoisted_35 = { class: "text-sm text-gray-600 dark:text-white/60 mb-2" };
const _hoisted_36 = { class: "flex items-center space-x-3" };
const _hoisted_37 = { class: "w-6 h-6 bg-blue-600 text-white rounded-full flex items-center justify-center text-sm font-medium" };
const _hoisted_38 = { class: "text-gray-900 dark:text-white" };
const _hoisted_39 = {
  key: 0,
  class: "mt-4 p-3 bg-yellow-50 dark:bg-yellow-900/30 border border-yellow-200 dark:border-yellow-700 rounded-lg"
};
const _hoisted_40 = { class: "text-sm text-yellow-800 dark:text-yellow-200" };
const _hoisted_41 = {
  key: 1,
  class: "mt-8 p-4 bg-blue-50 dark:bg-blue-900/30 border border-blue-200 dark:border-blue-700 rounded-lg"
};
const _hoisted_42 = { class: "grid grid-cols-3 gap-4 text-center" };
const _hoisted_43 = { class: "text-2xl font-bold text-blue-600 dark:text-blue-400" };
const _hoisted_44 = { class: "text-sm text-gray-600 dark:text-white/60" };
const _hoisted_45 = { class: "text-2xl font-bold text-red-600 dark:text-red-400" };
const _hoisted_46 = { class: "text-sm text-gray-600 dark:text-white/60" };
const _hoisted_47 = { class: "text-2xl font-bold text-green-600 dark:text-green-400" };
const _hoisted_48 = { class: "text-sm text-gray-600 dark:text-white/60" };
const _hoisted_49 = { class: "flex justify-between items-center mt-8" };
const _hoisted_50 = { class: "flex space-x-4" };
const _hoisted_51 = { class: "flex space-x-4" };
const _hoisted_52 = ["disabled"];
const _hoisted_53 = {
  key: 2,
  class: "fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50"
};
const _hoisted_54 = { class: "bg-white dark:bg-[#0a0a0a] rounded-xl shadow-2xl border border-gray-200 dark:border-white/10 p-6 max-w-2xl w-full mx-4 max-h-96 overflow-y-auto" };
const _hoisted_55 = { class: "flex items-center justify-between mb-4" };
const _hoisted_56 = { class: "text-lg font-semibold text-gray-900 dark:text-white" };
const _hoisted_57 = { class: "prose dark:prose-invert max-w-none" };
const _hoisted_58 = { class: "text-gray-800 dark:text-gray-200 leading-relaxed" };
const _sfc_main = /* @__PURE__ */ defineComponent({
  __name: "ListeningExercise",
  props: {
    question: {},
    questionIndex: {},
    totalQuestions: {},
    difficulty: {}
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
    let youtubePlayer = null;
    const isYouTubeAudio = ref(false);
    ref("");
    const props = __props;
    const emit = __emit;
    const userAnswers = ref([]);
    const userNotes = ref("");
    const showAnswers = ref(false);
    const showTranscript = ref(false);
    const audioLoaded = ref(false);
    const isPlaying = ref(false);
    const currentTime = ref(0);
    const duration = ref(0);
    const progress = ref(0);
    const playsRemaining = ref(3);
    const audio = ref(null);
    const progressBar = ref(null);
    const youtubePlayerReady = ref(false);
    const hasAllAnswers = computed(() => {
      if (!props.question?.questions) return false;
      return userAnswers.value.length === props.question.questions.length && userAnswers.value.every((answer) => answer !== null && answer !== void 0 && answer !== "");
    });
    const correctAnswers = computed(() => {
      if (!props.question?.questions) return 0;
      return props.question.questions.filter((q, index) => {
        return isAnswerCorrect(index);
      }).length;
    });
    const incorrectAnswers = computed(() => {
      return props.question.questions.length - correctAnswers.value;
    });
    const accuracy = computed(() => {
      return props.question.questions.length > 0 ? Math.round(correctAnswers.value / props.question.questions.length * 100) : 0;
    });
    const playbackSpeed = computed(() => {
      console.log("DEBUG - Question difficulty:", props.question.difficulty);
      console.log("DEBUG - Global difficulty:", props.difficulty);
      console.log("DEBUG - Explicit playbackSpeed:", props.question.playbackSpeed);
      if (props.question.playbackSpeed) {
        console.log("DEBUG - Using explicit playbackSpeed:", props.question.playbackSpeed);
        return props.question.playbackSpeed;
      }
      const difficulty = props.question.difficulty || props.difficulty;
      console.log("DEBUG - Final difficulty used:", difficulty);
      let speed;
      switch (difficulty) {
        case "easy":
          speed = 0.75;
          break;
        case "medium":
          speed = 1;
          break;
        case "hard":
          speed = 3.25;
          break;
        default:
          speed = 1;
      }
      console.log("DEBUG - Computed playback speed:", speed);
      return speed;
    });
    const isAnswerCorrect = (index) => {
      const userAnswer = userAnswers.value[index];
      const correctAnswer = props.question.questions[index].correctAnswer;
      const questionType = props.question.questions[index].type;
      if (questionType === "fill-blank") {
        return userAnswer?.toLowerCase().trim() === correctAnswer?.toLowerCase().trim();
      } else if (questionType === "ordering") {
        return JSON.stringify(userAnswer) === JSON.stringify(correctAnswer);
      }
      return userAnswer === correctAnswer;
    };
    const togglePlayback = () => {
      if (playsRemaining.value <= 0) return;
      if (isYouTubeAudio.value) {
        if (!youtubePlayerReady.value || !youtubePlayer || !youtubePlayer.playVideo || !youtubePlayer.pauseVideo) {
          console.warn("YouTube player not ready yet");
          return;
        }
        if (isPlaying.value) {
          youtubePlayer.pauseVideo();
        } else {
          youtubePlayer.playVideo();
          if (playsRemaining.value > 0) {
            playsRemaining.value--;
          }
        }
        return;
      }
      if (!audio.value) return;
      if (isPlaying.value) {
        audio.value.pause();
      } else {
        audio.value.play();
        if (playsRemaining.value > 0) {
          playsRemaining.value--;
        }
      }
    };
    const restartAudio = () => {
      if (isYouTubeAudio.value) {
        if (youtubePlayer && youtubePlayer.seekTo) {
          youtubePlayer.seekTo(0);
          currentTime.value = 0;
          progress.value = 0;
        }
      } else {
        if (!audio.value) return;
        audio.value.currentTime = 0;
        currentTime.value = 0;
        progress.value = 0;
      }
    };
    const updatePlaybackSpeed = () => {
      console.log("DEBUG - updatePlaybackSpeed called!");
      console.log("DEBUG - Current playbackSpeed.value:", playbackSpeed.value);
      console.log("DEBUG - isYouTubeAudio.value:", isYouTubeAudio.value);
      console.log("DEBUG - audio.value exists:", !!audio.value);
      if (isYouTubeAudio.value) {
        if (youtubePlayer && youtubePlayer.setPlaybackRate) {
          console.log("DEBUG - Setting YouTube playback rate to:", playbackSpeed.value);
          youtubePlayer.setPlaybackRate(parseFloat(playbackSpeed.value.toString()));
        } else {
          console.log("DEBUG - YouTube player not ready for setPlaybackRate");
        }
      } else if (audio.value) {
        console.log("DEBUG - Setting audio playback rate to:", playbackSpeed.value);
        console.log("DEBUG - Audio playbackRate BEFORE setting:", audio.value.playbackRate);
        audio.value.playbackRate = parseFloat(playbackSpeed.value.toString());
        console.log("DEBUG - Audio playbackRate AFTER setting:", audio.value.playbackRate);
        setTimeout(() => {
          console.log("DEBUG - Audio playbackRate after 100ms:", audio.value?.playbackRate);
          if (audio.value && audio.value.playbackRate !== parseFloat(playbackSpeed.value.toString())) {
            console.log("DEBUG - Playback rate was reset! Force re-applying...");
            audio.value.playbackRate = parseFloat(playbackSpeed.value.toString());
            console.log("DEBUG - Force-applied playbackRate:", audio.value.playbackRate);
          }
        }, 100);
      } else {
        console.log("DEBUG - No audio element available to set playback rate");
      }
    };
    const seekAudio = (event) => {
      if (!progressBar.value) return;
      const rect = progressBar.value.getBoundingClientRect();
      const clickX = event.clientX - rect.left;
      const newTime = clickX / rect.width * duration.value;
      if (isYouTubeAudio.value) {
        if (youtubePlayer && youtubePlayer.seekTo) {
          youtubePlayer.seekTo(newTime, true);
          currentTime.value = newTime;
        }
      } else if (audio.value) {
        audio.value.currentTime = newTime;
        currentTime.value = newTime;
      }
    };
    const updateProgress = () => {
      if (audio.value) {
        currentTime.value = audio.value.currentTime;
        progress.value = duration.value > 0 ? currentTime.value / duration.value * 100 : 0;
      }
    };
    const checkAnswers = () => {
      if (!hasAllAnswers.value) return;
      showAnswers.value = true;
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
    const resetExercise = () => {
      userAnswers.value = [];
      userNotes.value = "";
      showAnswers.value = false;
      showTranscript.value = false;
      playsRemaining.value = props.question.maxPlays || 3;
      restartAudio();
    };
    const formatTime = (seconds) => {
      const mins = Math.floor(seconds / 60);
      const secs = Math.floor(seconds % 60);
      return `${mins}:${secs.toString().padStart(2, "0")}`;
    };
    const createYouTubeAudioPlayer = (videoId) => {
      isYouTubeAudio.value = true;
      const playerContainer = document.createElement("div");
      playerContainer.id = `youtube-player-${Date.now()}`;
      playerContainer.style.position = "absolute";
      playerContainer.style.left = "-9999px";
      playerContainer.style.top = "-9999px";
      playerContainer.style.width = "1px";
      playerContainer.style.height = "1px";
      document.body.appendChild(playerContainer);
      if (!window.YT) {
        const script = document.createElement("script");
        script.src = "https://www.youtube.com/iframe_api";
        document.head.appendChild(script);
        window.onYouTubeIframeAPIReady = () => {
          initYouTubePlayer(videoId, playerContainer.id);
        };
      } else {
        initYouTubePlayer(videoId, playerContainer.id);
      }
    };
    const initYouTubePlayer = (videoId, containerId) => {
      youtubePlayer = new window.YT.Player(containerId, {
        height: "1",
        width: "1",
        videoId,
        playerVars: {
          autoplay: 0,
          controls: 0,
          disablekb: 1,
          fs: 0,
          iv_load_policy: 3,
          modestbranding: 1,
          rel: 0,
          showinfo: 0
        },
        events: {
          onReady: (event) => {
            audioLoaded.value = true;
            youtubePlayerReady.value = true;
            duration.value = event.target.getDuration() || 0;
            updatePlaybackSpeed();
          },
          onStateChange: (event) => {
            const state = event.data;
            if (state === window.YT.PlayerState.PLAYING) {
              isPlaying.value = true;
            } else if (state === window.YT.PlayerState.PAUSED || state === window.YT.PlayerState.ENDED) {
              isPlaying.value = false;
              if (state === window.YT.PlayerState.ENDED) {
                currentTime.value = 0;
                progress.value = 0;
              }
            }
          }
        }
      });
      const updateYouTubeProgress = () => {
        if (youtubePlayer && youtubePlayer.getCurrentTime && isPlaying.value) {
          const current = youtubePlayer.getCurrentTime();
          currentTime.value = current;
          if (duration.value > 0) {
            progress.value = current / duration.value * 100;
          }
        }
      };
      setInterval(updateYouTubeProgress, 1e3);
    };
    const initializeAudio = () => {
      let audioUrl = props.question.audioUrl;
      if (audioUrl.startsWith("youtube:")) {
        const videoId = audioUrl.replace("youtube:", "");
        createYouTubeAudioPlayer(videoId);
        return;
      }
      if (audioUrl.includes("youtube.com/watch") || audioUrl.includes("youtu.be/")) {
        let videoId = "";
        if (audioUrl.includes("youtube.com/watch")) {
          const urlParams = new URLSearchParams(audioUrl.split("?")[1]);
          videoId = urlParams.get("v") || "";
        } else if (audioUrl.includes("youtu.be/")) {
          videoId = audioUrl.split("youtu.be/")[1].split("?")[0];
        }
        if (videoId) {
          createYouTubeAudioPlayer(videoId);
          return;
        }
      }
      audio.value = new Audio(audioUrl);
      audio.value.addEventListener("loadedmetadata", () => {
        duration.value = audio.value.duration;
        audioLoaded.value = true;
        updatePlaybackSpeed();
      });
      audio.value.addEventListener("timeupdate", updateProgress);
      audio.value.addEventListener("play", () => {
        isPlaying.value = true;
        updatePlaybackSpeed();
      });
      audio.value.addEventListener("pause", () => {
        isPlaying.value = false;
      });
      audio.value.addEventListener("ended", () => {
        isPlaying.value = false;
        currentTime.value = 0;
        progress.value = 0;
      });
    };
    watch(playbackSpeed, (newSpeed) => {
      updatePlaybackSpeed();
    }, { immediate: false });
    watch(() => props.question, (newQuestion, oldQuestion) => {
      if (newQuestion && oldQuestion && newQuestion.audioUrl !== oldQuestion.audioUrl) {
        if (audio.value) {
          audio.value.pause();
          audio.value = null;
        }
        if (youtubePlayer) {
          youtubePlayer.destroy();
          youtubePlayer = null;
        }
        audioLoaded.value = false;
        isPlaying.value = false;
        currentTime.value = 0;
        duration.value = 0;
        progress.value = 0;
        playsRemaining.value = newQuestion.maxPlays || 3;
        isYouTubeAudio.value = false;
        youtubePlayerReady.value = false;
        initializeAudio();
      }
    }, { deep: true });
    onMounted(() => {
      userAnswers.value = new Array(props.question.questions?.length || 0).fill(null);
      playsRemaining.value = props.question.maxPlays || 3;
      initializeAudio();
    });
    onUnmounted(() => {
      if (audio.value) {
        audio.value.pause();
        audio.value = null;
      }
    });
    return (_ctx, _cache) => {
      return openBlock(), createElementBlock("div", _hoisted_1, [
        createBaseVNode("div", _hoisted_2, [
          createBaseVNode("div", _hoisted_3, [
            createBaseVNode("h3", _hoisted_4, toDisplayString(tf("grammar.practice.exercises.listening.instruction", "Listen carefully and answer the questions")), 1),
            createBaseVNode("div", _hoisted_5, [
              createBaseVNode("div", _hoisted_6, [
                createBaseVNode("button", {
                  onClick: togglePlayback,
                  disabled: !audioLoaded.value,
                  class: "w-16 h-16 bg-blue-600 hover:bg-blue-700 disabled:bg-gray-400 text-white rounded-full flex items-center justify-center transition-colors shadow-lg"
                }, [
                  !isPlaying.value ? (openBlock(), createElementBlock("svg", _hoisted_8, _cache[3] || (_cache[3] = [
                    createBaseVNode("path", { d: "M8 5v14l11-7z" }, null, -1)
                  ]))) : (openBlock(), createElementBlock("svg", _hoisted_9, _cache[4] || (_cache[4] = [
                    createBaseVNode("rect", {
                      x: "6",
                      y: "4",
                      width: "4",
                      height: "16"
                    }, null, -1),
                    createBaseVNode("rect", {
                      x: "14",
                      y: "4",
                      width: "4",
                      height: "16"
                    }, null, -1)
                  ])))
                ], 8, _hoisted_7),
                createBaseVNode("button", {
                  onClick: restartAudio,
                  disabled: !audioLoaded.value,
                  class: "p-3 bg-gray-300 dark:bg-white/10 hover:bg-gray-400 dark:hover:bg-white/15 disabled:bg-gray-200 dark:disabled:bg-white/5 text-gray-700 dark:text-white/80 rounded-full transition-colors"
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
                      d: "M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15"
                    })
                  ], -1)
                ]), 8, _hoisted_10)
              ]),
              createBaseVNode("div", _hoisted_11, [
                createBaseVNode("div", {
                  class: "w-full bg-gray-200 dark:bg-white/10 rounded-full h-2 cursor-pointer",
                  onClick: seekAudio,
                  ref_key: "progressBar",
                  ref: progressBar
                }, [
                  createBaseVNode("div", {
                    class: "bg-blue-600 h-2 rounded-full transition-all duration-100",
                    style: normalizeStyle({ width: `${progress.value}%` })
                  }, null, 4)
                ], 512),
                createBaseVNode("div", _hoisted_12, [
                  createBaseVNode("span", null, toDisplayString(formatTime(currentTime.value)), 1),
                  createBaseVNode("span", null, toDisplayString(formatTime(duration.value)), 1)
                ])
              ]),
              createBaseVNode("div", _hoisted_13, [
                createBaseVNode("div", _hoisted_14, [
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
                      d: "M15.536 8.464a5 5 0 010 7.072m-2.036-5.036a2.5 2.5 0 010 3.536M6 10h4l4.5-4.5v9L10 10H6V8z"
                    })
                  ], -1)),
                  createBaseVNode("span", null, toDisplayString(tf("grammar.practice.exercises.listening.playsLeft", "Plays left")) + ": " + toDisplayString(playsRemaining.value), 1)
                ]),
                _ctx.question.allowNotes ? (openBlock(), createElementBlock("div", _hoisted_15, [
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
                      d: "M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z"
                    })
                  ], -1)),
                  createBaseVNode("span", null, toDisplayString(tf("grammar.practice.exercises.listening.notesAllowed", "Notes are allowed")), 1)
                ])) : createCommentVNode("", true)
              ])
            ]),
            !audioLoaded.value ? (openBlock(), createElementBlock("div", _hoisted_16, toDisplayString(tf("grammar.practice.exercises.listening.loading", "Loading")) + "... ", 1)) : createCommentVNode("", true)
          ])
        ]),
        _ctx.question.allowNotes ? (openBlock(), createElementBlock("div", _hoisted_17, [
          createBaseVNode("label", _hoisted_18, toDisplayString(tf("grammar.practice.exercises.listening.takeNotes", "Take notes")), 1),
          withDirectives(createBaseVNode("textarea", {
            "onUpdate:modelValue": _cache[0] || (_cache[0] = ($event) => userNotes.value = $event),
            placeholder: tf("grammar.practice.exercises.listening.notesPlaceholder", "Type your notes here..."),
            class: "w-full h-32 px-4 py-2 border border-gray-300 dark:border-white/10 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent bg-white dark:bg-[#0a0a0a] text-gray-900 dark:text-white resize-none"
          }, null, 8, _hoisted_19), [
            [vModelText, userNotes.value]
          ])
        ])) : createCommentVNode("", true),
        createBaseVNode("div", _hoisted_20, [
          createBaseVNode("h4", _hoisted_21, toDisplayString(tf("grammar.practice.exercises.listening.questions", "Questions")), 1),
          createBaseVNode("div", _hoisted_22, [
            (openBlock(true), createElementBlock(Fragment, null, renderList(_ctx.question.questions, (q, index) => {
              return openBlock(), createElementBlock("div", {
                key: index,
                class: "border border-gray-200 dark:border-white/10 rounded-lg p-4"
              }, [
                createBaseVNode("div", _hoisted_23, [
                  createBaseVNode("h5", _hoisted_24, toDisplayString(index + 1) + ". " + toDisplayString(q.question), 1),
                  q.type === "multiple-choice" ? (openBlock(), createElementBlock("div", _hoisted_25, [
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
                        }, null, 8, _hoisted_26), [
                          [vModelRadio, userAnswers.value[index]]
                        ]),
                        createBaseVNode("span", _hoisted_27, toDisplayString(option), 1),
                        createBaseVNode("div", _hoisted_28, [
                          showAnswers.value && optionIndex === q.correctAnswer ? (openBlock(), createElementBlock("svg", _hoisted_29, _cache[8] || (_cache[8] = [
                            createBaseVNode("path", {
                              "stroke-linecap": "round",
                              "stroke-linejoin": "round",
                              "stroke-width": "2",
                              d: "M5 13l4 4L19 7"
                            }, null, -1)
                          ]))) : showAnswers.value && userAnswers.value[index] === optionIndex && optionIndex !== q.correctAnswer ? (openBlock(), createElementBlock("svg", _hoisted_30, _cache[9] || (_cache[9] = [
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
                  ])) : q.type === "fill-blank" ? (openBlock(), createElementBlock("div", _hoisted_31, [
                    withDirectives(createBaseVNode("input", {
                      "onUpdate:modelValue": ($event) => userAnswers.value[index] = $event,
                      disabled: showAnswers.value,
                      placeholder: tf("grammar.practice.exercises.listening.fillBlank", "Type the missing word/phrase"),
                      class: normalizeClass([
                        "w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent",
                        showAnswers.value ? isAnswerCorrect(index) ? "border-green-500 bg-green-50 dark:bg-green-900/30" : "border-red-500 bg-red-50 dark:bg-red-900/30" : "border-gray-300 dark:border-white/10 bg-white dark:bg-[#0a0a0a]",
                        "text-gray-900 dark:text-white"
                      ])
                    }, null, 10, _hoisted_32), [
                      [vModelText, userAnswers.value[index]]
                    ]),
                    showAnswers.value && !isAnswerCorrect(index) ? (openBlock(), createElementBlock("div", _hoisted_33, toDisplayString(tf("grammar.practice.exercises.listening.correctAnswer", "Correct answer")) + ": " + toDisplayString(q.correctAnswer), 1)) : createCommentVNode("", true)
                  ])) : q.type === "ordering" ? (openBlock(), createElementBlock("div", _hoisted_34, [
                    createBaseVNode("div", _hoisted_35, toDisplayString(tf("grammar.practice.exercises.listening.dragToOrder", "Drag to order")), 1),
                    createVNode(unref(VueDraggableNext), {
                      modelValue: userAnswers.value[index],
                      "onUpdate:modelValue": ($event) => userAnswers.value[index] = $event,
                      disabled: showAnswers.value,
                      class: "space-y-2",
                      "item-key": "id"
                    }, {
                      item: withCtx(({ element, index: itemIndex }) => [
                        createBaseVNode("div", {
                          class: normalizeClass([
                            "p-3 bg-gray-50 dark:bg-[#0a0a0a] rounded-lg border cursor-move",
                            showAnswers.value && itemIndex === element.correctPosition ? "border-green-500 bg-green-50 dark:bg-green-900/30" : showAnswers.value && itemIndex !== element.correctPosition ? "border-red-500 bg-red-50 dark:bg-red-900/30" : "border-gray-200 dark:border-white/10"
                          ])
                        }, [
                          createBaseVNode("div", _hoisted_36, [
                            createBaseVNode("span", _hoisted_37, toDisplayString(itemIndex + 1), 1),
                            createBaseVNode("span", _hoisted_38, toDisplayString(element.text), 1)
                          ])
                        ], 2)
                      ]),
                      _: 2
                    }, 1032, ["modelValue", "onUpdate:modelValue", "disabled"])
                  ])) : createCommentVNode("", true)
                ]),
                showAnswers.value && q.explanation ? (openBlock(), createElementBlock("div", _hoisted_39, [
                  createBaseVNode("p", _hoisted_40, [
                    createBaseVNode("strong", null, toDisplayString(tf("grammar.practice.exercises.explanation", "Explanation")) + ":", 1),
                    createTextVNode(" " + toDisplayString(q.explanation), 1)
                  ])
                ])) : createCommentVNode("", true)
              ]);
            }), 128))
          ])
        ]),
        showAnswers.value ? (openBlock(), createElementBlock("div", _hoisted_41, [
          createBaseVNode("div", _hoisted_42, [
            createBaseVNode("div", null, [
              createBaseVNode("div", _hoisted_43, toDisplayString(correctAnswers.value), 1),
              createBaseVNode("div", _hoisted_44, toDisplayString(tf("grammar.practice.exercises.listening.correct", "Correct")), 1)
            ]),
            createBaseVNode("div", null, [
              createBaseVNode("div", _hoisted_45, toDisplayString(incorrectAnswers.value), 1),
              createBaseVNode("div", _hoisted_46, toDisplayString(tf("grammar.practice.exercises.listening.incorrect", "Incorrect")), 1)
            ]),
            createBaseVNode("div", null, [
              createBaseVNode("div", _hoisted_47, toDisplayString(accuracy.value) + "%", 1),
              createBaseVNode("div", _hoisted_48, toDisplayString(tf("grammar.practice.exercises.listening.accuracy", "Accuracy")), 1)
            ])
          ])
        ])) : createCommentVNode("", true),
        createBaseVNode("div", _hoisted_49, [
          createBaseVNode("div", _hoisted_50, [
            _ctx.question.transcript && showAnswers.value ? (openBlock(), createElementBlock("button", {
              key: 0,
              onClick: _cache[1] || (_cache[1] = ($event) => showTranscript.value = !showTranscript.value),
              class: "flex items-center space-x-2 px-4 py-2 text-sm text-blue-600 dark:text-blue-400 hover:text-blue-700 dark:hover:text-blue-300 transition-colors"
            }, [
              _cache[10] || (_cache[10] = createBaseVNode("svg", {
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
              createBaseVNode("span", null, toDisplayString(showTranscript.value ? tf("grammar.practice.exercises.listening.hideTranscript", "Hide transcript") : tf("grammar.practice.exercises.listening.showTranscript", "Show transcript")), 1)
            ])) : createCommentVNode("", true)
          ]),
          createBaseVNode("div", _hoisted_51, [
            !showAnswers.value ? (openBlock(), createElementBlock("button", {
              key: 0,
              onClick: checkAnswers,
              disabled: !hasAllAnswers.value,
              class: "px-6 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 disabled:bg-gray-400 disabled:cursor-not-allowed transition-colors"
            }, toDisplayString(tf("grammar.practice.exercises.checkAnswer", "Check answer")), 9, _hoisted_52)) : (openBlock(), createElementBlock("button", {
              key: 1,
              onClick: nextQuestion,
              class: "px-6 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 transition-colors"
            }, toDisplayString(_ctx.questionIndex === _ctx.totalQuestions - 1 ? tf("grammar.practice.exercises.finish", "Finish") : tf("grammar.practice.exercises.next", "Next")), 1))
          ])
        ]),
        showTranscript.value ? (openBlock(), createElementBlock("div", _hoisted_53, [
          createBaseVNode("div", _hoisted_54, [
            createBaseVNode("div", _hoisted_55, [
              createBaseVNode("h3", _hoisted_56, toDisplayString(tf("grammar.practice.exercises.listening.transcript", "Transcript")), 1),
              createBaseVNode("button", {
                onClick: _cache[2] || (_cache[2] = ($event) => showTranscript.value = false),
                class: "p-2 rounded-lg text-gray-500 dark:text-white/60 hover:text-gray-700 dark:hover:text-white hover:bg-gray-100 dark:hover:bg-white/10 transition-colors"
              }, _cache[11] || (_cache[11] = [
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
                    d: "M6 18L18 6M6 6l12 12"
                  })
                ], -1)
              ]))
            ]),
            createBaseVNode("div", _hoisted_57, [
              createBaseVNode("p", _hoisted_58, toDisplayString(_ctx.question.transcript), 1)
            ])
          ])
        ])) : createCommentVNode("", true)
      ]);
    };
  }
});
export {
  _sfc_main as default
};
//# sourceMappingURL=ListeningExercise-VhXN6bz5.js.map
