import { d as defineComponent, B as computed, H as useI18n, A as ref, K as watch, I as onMounted, a1 as onBeforeUnmount, c as createElementBlock, v as openBlock, f as createBaseVNode, t as toDisplayString, u as unref, n as normalizeClass, y as createVNode, w as withCtx, e as createCommentVNode, i as withModifiers, N as Transition } from "./vendor-Cr_Qcp9o.js";
import { u as useModalStore } from "./index-DuWxEn3P.js";
import "./vendor-toast-BrdXiWv_.js";
const _hoisted_1 = { class: "bg-white dark:bg-black shadow border-b border-gray-200 dark:border-gray-800" };
const _hoisted_2 = { class: "max-w-4xl mx-auto py-3 sm:py-4 md:py-6 px-3 sm:px-4 md:px-6" };
const _hoisted_3 = { class: "sm:hidden" };
const _hoisted_4 = { class: "flex items-center justify-between mb-3" };
const _hoisted_5 = { class: "flex items-center" };
const _hoisted_6 = { class: "text-xl font-bold text-gray-900 dark:text-transparent bg-clip-text bg-gradient-to-r from-blue-500 via-purple-500 to-pink-500 dark:from-blue-400 dark:via-purple-400 dark:to-pink-400" };
const _hoisted_7 = { class: "text-right" };
const _hoisted_8 = { class: "text-xs text-gray-500 dark:text-white/60" };
const _hoisted_9 = { class: "text-sm font-semibo ld text-gray-900 dark:text-white" };
const _hoisted_10 = { class: "flex items-center justify-between" };
const _hoisted_11 = { class: "flex items-center space-x-2" };
const _hoisted_12 = ["title"];
const _hoisted_13 = ["disabled", "aria-disabled", "title"];
const _hoisted_14 = { class: "flex items-center space-x-2" };
const _hoisted_15 = { class: "relative" };
const _hoisted_16 = ["disabled", "aria-disabled", "title", "aria-label"];
const _hoisted_17 = { class: "truncate" };
const _hoisted_18 = {
  key: 0,
  class: "absolute right-0 mt-1 w-44 z-[9999] rounded-md shadow-lg border border-gray-200 dark:border-gray-700 bg-white dark:bg-[#0f0f0f] overflow-hidden"
};
const _hoisted_19 = { class: "py-1 text-xs text-gray-900 dark:text-white" };
const _hoisted_20 = { class: "px-3 py-2 hover:bg-gray-100 dark:hover:bg-white/10 flex items-center justify-between gap-2" };
const _hoisted_21 = ["title", "aria-label"];
const _hoisted_22 = { class: "px-3 py-2 hover:bg-gray-100 dark:hover:bg-white/10 flex items-center justify-between gap-2" };
const _hoisted_23 = ["title", "aria-label"];
const _hoisted_24 = { class: "px-3 py-2 hover:bg-gray-100 dark:hover:bg-white/10 flex items-center justify-between gap-2" };
const _hoisted_25 = ["title", "aria-label"];
const _hoisted_26 = { class: "px-3 py-2 hover:bg-gray-100 dark:hover:bg-white/10 flex items-center justify-between gap-2" };
const _hoisted_27 = ["disabled", "aria-disabled", "title"];
const _hoisted_28 = ["title", "aria-label"];
const _hoisted_29 = { class: "px-3 py-2 hover:bg-gray-100 dark:hover:bg-white/10 flex items-center justify-between gap-2" };
const _hoisted_30 = ["disabled", "aria-disabled", "title"];
const _hoisted_31 = ["title", "aria-label"];
const _hoisted_32 = { class: "px-3 py-2 hover:bg-gray-100 dark:hover:bg-white/10 flex items-center justify-between gap-2" };
const _hoisted_33 = ["disabled", "aria-disabled", "title"];
const _hoisted_34 = ["title", "aria-label"];
const _hoisted_35 = { class: "px-3 py-2 hover:bg-gray-100 dark:hover:bg-white/10 flex items-center justify-between gap-2" };
const _hoisted_36 = ["disabled", "aria-disabled", "title"];
const _hoisted_37 = ["title", "aria-label"];
const _hoisted_38 = { class: "px-3 py-2 hover:bg-gray-100 dark:hover:bg-white/10 flex items-center justify-between gap-2" };
const _hoisted_39 = ["title"];
const _hoisted_40 = ["title", "aria-label"];
const _hoisted_41 = { class: "px-3 py-2 hover:bg-gray-100 dark:hover:bg-white/10 flex items-center justify-between gap-2" };
const _hoisted_42 = ["title", "aria-label"];
const _hoisted_43 = ["disabled", "title"];
const _hoisted_44 = { class: "hidden sm:flex items-center justify-between" };
const _hoisted_45 = { class: "flex items-center" };
const _hoisted_46 = { class: "text-2xl md:text-3xl font-bold text-gray-900 dark:text-transparent bg-clip-text bg-gradient-to-r from-blue-500 via-purple-500 to-pink-500 dark:from-blue-400 dark:via-purple-400 dark:to-pink-400" };
const _hoisted_47 = { class: "mt-1 md:mt-2 text-sm md:text-base text-gray-600 dark:text-white/70" };
const _hoisted_48 = { class: "flex items-center space-x-3 md:space-x-4" };
const _hoisted_49 = ["title"];
const _hoisted_50 = { class: "flex items-center space-x-2 md:space-x-3" };
const _hoisted_51 = { class: "text-sm md:text-base text-gray-600 dark:text-white/70" };
const _hoisted_52 = ["disabled", "title"];
const _hoisted_53 = { class: "text-right" };
const _hoisted_54 = { class: "text-sm md:text-base text-gray-500 dark:text-white/60" };
const _hoisted_55 = { class: "text-lg md:text-xl font-semibold text-gray-900 dark:text-white" };
const _hoisted_56 = { class: "flex items-center space-x-2 md:space-x-3" };
const _hoisted_57 = { class: "relative" };
const _hoisted_58 = ["disabled", "aria-disabled", "title", "aria-label"];
const _hoisted_59 = { class: "truncate" };
const _hoisted_60 = {
  key: 0,
  class: "absolute right-0 mt-1 w-52 z-[9999] rounded-md shadow-xl border border-gray-200 dark:border-gray-700 bg-white dark:bg-[#0f0f0f] overflow-hidden"
};
const _hoisted_61 = { class: "py-1 text-sm text-gray-900 dark:text-white" };
const _hoisted_62 = { class: "px-4 py-2 hover:bg-gray-100 dark:hover:bg-white/10 flex items-center justify-between gap-3" };
const _hoisted_63 = ["title", "aria-label"];
const _hoisted_64 = { class: "px-4 py-2 hover:bg-gray-100 dark:hover:bg-white/10 flex items-center justify-between gap-3" };
const _hoisted_65 = ["title", "aria-label"];
const _hoisted_66 = { class: "px-4 py-2 hover:bg-gray-100 dark:hover:bg-white/10 flex items-center justify-between gap-3" };
const _hoisted_67 = ["title", "aria-label"];
const _hoisted_68 = { class: "px-4 py-2 hover:bg-gray-100 dark:hover:bg-white/10 flex items-center justify-between gap-3" };
const _hoisted_69 = ["disabled", "aria-disabled", "title"];
const _hoisted_70 = ["title", "aria-label"];
const _hoisted_71 = { class: "px-4 py-2 hover:bg-gray-100 dark:hover:bg-white/10 flex items-center justify-between gap-3" };
const _hoisted_72 = ["disabled", "aria-disabled", "title"];
const _hoisted_73 = ["title", "aria-label"];
const _hoisted_74 = { class: "px-4 py-2 hover:bg-gray-100 dark:hover:bg-white/10 flex items-center justify-between gap-3" };
const _hoisted_75 = ["disabled", "aria-disabled", "title"];
const _hoisted_76 = ["title", "aria-label"];
const _hoisted_77 = { class: "px-4 py-2 hover:bg-gray-100 dark:hover:bg-white/10 flex items-center justify-between gap-3" };
const _hoisted_78 = ["disabled", "aria-disabled", "title"];
const _hoisted_79 = ["title", "aria-label"];
const _hoisted_80 = { class: "px-4 py-2 hover:bg-gray-100 dark:hover:bg-white/10 flex items-center justify-between gap-3" };
const _hoisted_81 = ["title"];
const _hoisted_82 = ["title", "aria-label"];
const _hoisted_83 = { class: "px-4 py-2 hover:bg-gray-100 dark:hover:bg-white/10 flex items-center justify-between gap-3" };
const _hoisted_84 = ["title", "aria-label"];
const _hoisted_85 = ["disabled", "aria-disabled", "title"];
const _sfc_main = /* @__PURE__ */ defineComponent({
  __name: "FlashcardHeader",
  props: {
    currentIndex: {},
    totalCards: {},
    practiceMode: {},
    shuffleEnabled: { type: Boolean },
    practiceStarted: { type: Boolean },
    imageQuizEnabled: { type: Boolean },
    listeningQuizEnabled: { type: Boolean },
    typingQuizEnabled: { type: Boolean },
    imageModeAvailable: { type: Boolean },
    pictionaryModeAvailable: { type: Boolean },
    flipTileModeAvailable: { type: Boolean },
    bubbleShooterModeAvailable: { type: Boolean },
    bubbleShooterVietnameseMode: { type: Boolean },
    snakeDoubleBaitEnabled: { type: Boolean },
    pictionaryDefinitionMode: { type: Boolean },
    scrambleWordsEnabled: { type: Boolean },
    wordsCrushEnabled: { type: Boolean },
    useFlipTileHints: { type: Boolean }
  },
  emits: ["go-back", "show-history", "change-practice-mode", "show-settings", "toggle-shuffle", "update:image-quiz-enabled", "update:listening-quiz-enabled", "update:typing-quiz-enabled", "update:bubble-shooter-vietnamese-mode", "update:snake-double-bait-enabled", "update:pictionary-definition-mode", "update:scramble-words-enabled", "update:words-crush-enabled", "update:use-flip-tile-hints"],
  setup(__props, { emit: __emit }) {
    const props = __props;
    const imageQuizEnabled = computed(() => props.imageQuizEnabled ?? false);
    const listeningQuizEnabled = computed(() => props.listeningQuizEnabled ?? false);
    const typingQuizEnabled = computed(() => props.typingQuizEnabled ?? false);
    const imageModeAvailable = computed(() => props.imageModeAvailable ?? true);
    const pictionaryModeAvailable = computed(() => props.pictionaryModeAvailable ?? true);
    const flipTileModeAvailable = computed(() => props.flipTileModeAvailable ?? true);
    const bubbleShooterModeAvailable = computed(() => props.bubbleShooterModeAvailable ?? true);
    const bubbleShooterVietnameseMode = computed(() => props.bubbleShooterVietnameseMode ?? false);
    const snakeDoubleBaitEnabled = computed(() => props.snakeDoubleBaitEnabled ?? false);
    const pictionaryDefinitionMode = computed(() => props.pictionaryDefinitionMode ?? false);
    const scrambleWordsEnabled = computed(() => props.scrambleWordsEnabled ?? false);
    const wordsCrushEnabled = computed(() => props.wordsCrushEnabled ?? false);
    const useFlipTileHints = computed(() => props.useFlipTileHints ?? false);
    const { t } = useI18n();
    const modalStore = useModalStore();
    const emit = __emit;
    const mobileDropdownOpen = ref(false);
    const desktopDropdownOpen = ref(false);
    const closeAll = () => {
      mobileDropdownOpen.value = false;
      desktopDropdownOpen.value = false;
    };
    const toggleMobileDropdown = () => {
      if (props.practiceStarted) return;
      mobileDropdownOpen.value = !mobileDropdownOpen.value;
      if (mobileDropdownOpen.value) desktopDropdownOpen.value = false;
    };
    const toggleDesktopDropdown = () => {
      if (props.practiceStarted) return;
      desktopDropdownOpen.value = !desktopDropdownOpen.value;
      if (desktopDropdownOpen.value) mobileDropdownOpen.value = false;
    };
    const selectMode = (mode) => {
      if (props.practiceStarted) {
        closeAll();
        return;
      }
      if (mode === "image" && !imageModeAvailable.value) {
        closeAll();
        return;
      }
      if (mode === "pictionary" && !pictionaryModeAvailable.value) {
        closeAll();
        return;
      }
      if (mode === "bubble-shooter" && !bubbleShooterModeAvailable.value) {
        closeAll();
        return;
      }
      emit("change-practice-mode", mode);
      closeAll();
    };
    const toggleImageQuizFromDropdown = () => {
      if (props.practiceStarted) return;
      if (!imageModeAvailable.value) return;
      emit("update:image-quiz-enabled", !imageQuizEnabled.value);
    };
    const toggleListeningQuizFromDropdown = () => {
      if (props.practiceStarted) return;
      emit("update:listening-quiz-enabled", !listeningQuizEnabled.value);
    };
    const toggleTypingQuizFromDropdown = () => {
      if (props.practiceStarted) return;
      emit("update:typing-quiz-enabled", !typingQuizEnabled.value);
    };
    const toggleSnakeDoubleBaitFromDropdown = () => {
      if (props.practiceStarted) return;
      emit("update:snake-double-bait-enabled", !snakeDoubleBaitEnabled.value);
    };
    const toggleBubbleShooterVietnameseMode = () => {
      if (props.practiceStarted) return;
      if (!bubbleShooterModeAvailable.value) return;
      emit("update:bubble-shooter-vietnamese-mode", !bubbleShooterVietnameseMode.value);
    };
    const togglePictionaryDefinitionModeFromDropdown = () => {
      if (props.practiceStarted) return;
      if (!pictionaryModeAvailable.value) return;
      emit("update:pictionary-definition-mode", !pictionaryDefinitionMode.value);
    };
    const toggleFlipTileHintsFromDropdown = () => {
      if (props.practiceStarted) return;
      if (!flipTileModeAvailable.value) return;
      emit("update:use-flip-tile-hints", !useFlipTileHints.value);
    };
    const toggleScrambleWordsFromDropdown = () => {
      if (props.practiceStarted) return;
      emit("update:scramble-words-enabled", !scrambleWordsEnabled.value);
    };
    const toggleWordsCrushFromDropdown = () => {
      if (props.practiceStarted) return;
      emit("update:words-crush-enabled", !wordsCrushEnabled.value);
    };
    const onShowSettings = () => {
      if (props.practiceStarted) return;
      closeAll();
      emit("show-settings");
    };
    const onClickOutside = (e) => {
      const target = e.target;
      if (!target.closest(".relative")) {
        closeAll();
      }
    };
    watch(() => modalStore.shouldHideDropdowns, (shouldHide) => {
      if (shouldHide) {
        closeAll();
      }
    });
    onMounted(() => {
      window.addEventListener("click", onClickOutside, { capture: true });
    });
    onBeforeUnmount(() => {
      window.removeEventListener("click", onClickOutside, { capture: true });
    });
    return (_ctx, _cache) => {
      return openBlock(), createElementBlock("div", _hoisted_1, [
        createBaseVNode("div", _hoisted_2, [
          createBaseVNode("div", _hoisted_3, [
            createBaseVNode("div", _hoisted_4, [
              createBaseVNode("div", _hoisted_5, [
                createBaseVNode("button", {
                  onClick: _cache[0] || (_cache[0] = ($event) => _ctx.$emit("go-back")),
                  class: "mr-3 text-gray-500 dark:text-white/70 hover:text-gray-700 dark:hover:text-white"
                }, _cache[44] || (_cache[44] = [
                  createBaseVNode("svg", {
                    class: "w-5 h-5",
                    fill: "currentColor",
                    viewBox: "0 0 20 20"
                  }, [
                    createBaseVNode("path", {
                      "fill-rule": "evenodd",
                      d: "M12.707 5.293a1 1 0 010 1.414L9.414 10l3.293 3.293a1 1 0 01-1.414 1.414l-4-4a1 1 0 010-1.414l4-4a1 1 0 011.414 0z",
                      "clip-rule": "evenodd"
                    })
                  ], -1)
                ])),
                createBaseVNode("div", null, [
                  createBaseVNode("h1", _hoisted_6, toDisplayString(unref(t)("flashcard.modes.flashcard", "Flashcard")), 1)
                ])
              ]),
              createBaseVNode("div", _hoisted_7, [
                createBaseVNode("p", _hoisted_8, toDisplayString(unref(t)("flashcard.header.progress", "Progress")), 1),
                createBaseVNode("p", _hoisted_9, toDisplayString(_ctx.currentIndex + 1) + "/" + toDisplayString(_ctx.totalCards), 1)
              ])
            ]),
            createBaseVNode("div", _hoisted_10, [
              createBaseVNode("div", _hoisted_11, [
                createBaseVNode("button", {
                  onClick: _cache[1] || (_cache[1] = ($event) => _ctx.$emit("show-history")),
                  class: "text-gray-500 dark:text-white/70 hover:text-gray-700 dark:hover:text-white",
                  title: unref(t)("flashcard.header.history", "History")
                }, _cache[45] || (_cache[45] = [
                  createBaseVNode("svg", {
                    class: "w-5 h-5",
                    fill: "currentColor",
                    viewBox: "0 0 20 20"
                  }, [
                    createBaseVNode("path", {
                      "fill-rule": "evenodd",
                      d: "M10 18a8 8 0 100-16 8 8 0 000 16zm1-12a1 1 0 10-2 0v4a1 1 0 00.293.707l2.828 2.829a1 1 0 101.415-1.415L11 9.586V6z",
                      "clip-rule": "evenodd"
                    })
                  ], -1)
                ]), 8, _hoisted_12),
                createBaseVNode("button", {
                  onClick: onShowSettings,
                  disabled: _ctx.practiceStarted,
                  "aria-disabled": _ctx.practiceStarted ? "true" : "false",
                  class: normalizeClass(["text-gray-500 dark:text-white/70 hover:text-gray-700 dark:hover:text-white", _ctx.practiceStarted ? "opacity-50 cursor-not-allowed" : ""]),
                  title: _ctx.practiceStarted ? unref(t)("flashcard.settings.disabledDuringPractice", "Settings are disabled during practice") : unref(t)("flashcard.header.settings", "Settings")
                }, _cache[46] || (_cache[46] = [
                  createBaseVNode("svg", {
                    class: "w-5 h-5",
                    fill: "currentColor",
                    viewBox: "0 0 20 20"
                  }, [
                    createBaseVNode("path", {
                      "fill-rule": "evenodd",
                      d: "M11.49 3.17c-.38-1.56-2.6-1.56-2.98 0a1.532 1.532 0 01-2.286.948c-1.372-.836-2.942.734-2.106 2.106.54.886.061 2.042-.947 2.287-1.561.379-1.561 2.6 0 2.978a1.532 1.532 0 01.947 2.287c-.836 1.372.734 2.942 2.106 2.106a1.532 1.532 0 012.287.947c.379 1.561 2.6 1.561 2.978 0a1.533 1.533 0 012.287-.947c1.372.836 2.942-.734 2.106-2.106a1.533 1.533 0 01.947-2.287c1.561-.379 1.561-2.6 0-2.978a1.532 1.532 0 01-.947-2.287c.836-1.372-.734-2.942-2.106-2.106a1.532 1.532 0 01-2.287-.947zM10 13a3 3 0 100-6 3 3 0 000 6z",
                      "clip-rule": "evenodd"
                    })
                  ], -1)
                ]), 10, _hoisted_13)
              ]),
              createBaseVNode("div", _hoisted_14, [
                createBaseVNode("div", _hoisted_15, [
                  createBaseVNode("button", {
                    type: "button",
                    onClick: toggleMobileDropdown,
                    class: normalizeClass(["relative pl-2 pr-8 py-1 text-xs border border-gray-300 dark:border-gray-600 rounded-md bg-white dark:bg-[#0f0f0f] cursor-pointer text-gray-900 dark:text-white flex items-center min-w-[120px]", _ctx.practiceStarted ? "opacity-50 cursor-not-allowed" : ""]),
                    disabled: _ctx.practiceStarted,
                    "aria-disabled": _ctx.practiceStarted ? "true" : "false",
                    title: _ctx.practiceStarted ? unref(t)("flashcard.modes.change_disabled_during_practice", "Mode change is disabled during practice") : unref(t)("flashcard.header.selectMode", "Select mode"),
                    "aria-label": unref(t)("flashcard.header.selectMode", "Select mode")
                  }, [
                    createBaseVNode("span", _hoisted_17, toDisplayString(_ctx.practiceMode === "flashcard" ? unref(t)("flashcard.modes.flashcard", "Flashcard") : _ctx.practiceMode === "quiz" ? unref(t)("flashcard.modes.quiz", "Quiz") : _ctx.practiceMode === "typing" ? unref(t)("flashcard.modes.typing", "Typing") : _ctx.practiceMode === "listening" ? unref(t)("flashcard.modes.listening", "Listening") : _ctx.practiceMode === "image" ? unref(t)("flashcard.modes.image", "Image") : _ctx.practiceMode === "pictionary" ? unref(t)("flashcard.modes.pictionary", "Pictionary") : _ctx.practiceMode === "flip-tile" ? unref(t)("flashcard.modes.flipTile", "Flip Tile") : _ctx.practiceMode === "bubble-shooter" ? unref(t)("flashcard.modes.bubbleShooter", "Bubble Shooter") : _ctx.practiceMode === "snake-game" ? unref(t)("flashcard.modes.snakeGame", "Snake Hunt") : unref(t)("flashcard.modes.pronunciation", "Pronunciation")), 1),
                    _cache[47] || (_cache[47] = createBaseVNode("svg", {
                      class: "w-3.5 h-3.5 opacity-80 absolute right-2 top-1/2 -translate-y-1/2 pointer-events-none",
                      fill: "currentColor",
                      viewBox: "0 0 20 20"
                    }, [
                      createBaseVNode("path", {
                        "fill-rule": "evenodd",
                        d: "M5.23 7.21a.75.75 0 011.06.02L10 11.17l3.71-3.94a.75.75 0 111.08 1.04l-4.24 4.5a.75.75 0 01-1.08 0L5.21 8.27a.75.75 0 01.02-1.06z",
                        "clip-rule": "evenodd"
                      })
                    ], -1))
                  ], 10, _hoisted_16),
                  createVNode(Transition, {
                    name: "fade",
                    appear: ""
                  }, {
                    default: withCtx(() => [
                      mobileDropdownOpen.value && !_ctx.practiceStarted ? (openBlock(), createElementBlock("div", _hoisted_18, [
                        createBaseVNode("ul", _hoisted_19, [
                          createBaseVNode("li", _hoisted_20, [
                            createBaseVNode("button", {
                              class: "text-left flex-1 truncate",
                              onClick: _cache[2] || (_cache[2] = ($event) => selectMode("flashcard"))
                            }, toDisplayString(unref(t)("flashcard.modes.flashcard", "Flashcard")), 1),
                            createBaseVNode("button", {
                              class: normalizeClass(["relative inline-flex h-4 w-8 items-center rounded-full transition-colors border border-gray-300 dark:border-gray-600", scrambleWordsEnabled.value ? "bg-green-600" : "bg-gray-200 dark:bg-[#0a0a0a]"]),
                              onClick: _cache[3] || (_cache[3] = withModifiers(($event) => toggleScrambleWordsFromDropdown(), ["stop"])),
                              title: unref(t)("flashcard.scrambleWords.toggle", "Scramble Words"),
                              "aria-label": unref(t)("flashcard.scrambleWords.toggle", "Scramble Words")
                            }, [
                              createBaseVNode("span", {
                                class: normalizeClass(["inline-block h-3.5 w-3.5 transform rounded-full bg-white transition-transform", scrambleWordsEnabled.value ? "translate-x-4" : "translate-x-0.5"])
                              }, null, 2)
                            ], 10, _hoisted_21)
                          ]),
                          createBaseVNode("li", null, [
                            createBaseVNode("button", {
                              class: "w-full text-left px-3 py-2 hover:bg-gray-100 dark:hover:bg-white/10",
                              onClick: _cache[4] || (_cache[4] = ($event) => selectMode("quiz"))
                            }, toDisplayString(unref(t)("flashcard.modes.quiz", "Quiz")), 1)
                          ]),
                          createBaseVNode("li", _hoisted_22, [
                            createBaseVNode("button", {
                              class: "text-left flex-1 truncate",
                              onClick: _cache[5] || (_cache[5] = ($event) => selectMode("typing"))
                            }, toDisplayString(unref(t)("flashcard.modes.typing", "Typing")), 1),
                            createBaseVNode("button", {
                              class: normalizeClass(["relative inline-flex h-4 w-8 items-center rounded-full transition-colors border border-gray-300 dark:border-gray-600", typingQuizEnabled.value ? "bg-purple-600" : "bg-gray-200 dark:bg-[#0a0a0a]"]),
                              onClick: _cache[6] || (_cache[6] = withModifiers(($event) => toggleTypingQuizFromDropdown(), ["stop"])),
                              title: unref(t)("flashcard.typing.quizToggle", "Multiple Choice"),
                              "aria-label": unref(t)("flashcard.typing.quizToggle", "Multiple Choice")
                            }, [
                              createBaseVNode("span", {
                                class: normalizeClass(["inline-block h-3.5 w-3.5 transform rounded-full bg-white transition-transform", typingQuizEnabled.value ? "translate-x-4" : "translate-x-0.5"])
                              }, null, 2)
                            ], 10, _hoisted_23)
                          ]),
                          createBaseVNode("li", _hoisted_24, [
                            createBaseVNode("button", {
                              class: "text-left flex-1 truncate",
                              onClick: _cache[7] || (_cache[7] = ($event) => selectMode("listening"))
                            }, toDisplayString(unref(t)("flashcard.modes.listening", "Listening")), 1),
                            createBaseVNode("button", {
                              class: normalizeClass(["relative inline-flex h-4 w-8 items-center rounded-full transition-colors border border-gray-300 dark:border-gray-600", listeningQuizEnabled.value ? "bg-cyan-600" : "bg-gray-200 dark:bg-[#0a0a0a]"]),
                              onClick: _cache[8] || (_cache[8] = withModifiers(($event) => toggleListeningQuizFromDropdown(), ["stop"])),
                              title: unref(t)("flashcard.listening.quizToggle", "Multiple Choice"),
                              "aria-label": unref(t)("flashcard.listening.quizToggle", "Multiple Choice")
                            }, [
                              createBaseVNode("span", {
                                class: normalizeClass(["inline-block h-3.5 w-3.5 transform rounded-full bg-white transition-transform", listeningQuizEnabled.value ? "translate-x-4" : "translate-x-0.5"])
                              }, null, 2)
                            ], 10, _hoisted_25)
                          ]),
                          createBaseVNode("li", _hoisted_26, [
                            createBaseVNode("button", {
                              class: normalizeClass(["text-left flex-1 truncate", !imageModeAvailable.value ? "opacity-50 cursor-not-allowed" : ""]),
                              onClick: _cache[9] || (_cache[9] = ($event) => selectMode("image")),
                              disabled: !imageModeAvailable.value,
                              "aria-disabled": !imageModeAvailable.value ? "true" : "false",
                              title: !imageModeAvailable.value ? unref(t)("flashcard.image.unavailable", "Image mode is unavailable for the selected date") : unref(t)("flashcard.modes.image", "Image")
                            }, toDisplayString(unref(t)("flashcard.modes.image", "Image")), 11, _hoisted_27),
                            createBaseVNode("button", {
                              class: normalizeClass(["relative inline-flex h-4 w-8 items-center rounded-full transition-colors border border-gray-300 dark:border-gray-600", [
                                imageModeAvailable.value ? imageQuizEnabled.value ? "bg-purple-600" : "bg-gray-200 dark:bg-[#0a0a0a]" : "opacity-50 cursor-not-allowed pointer-events-none bg-gray-200 dark:bg-[#0a0a0a]"
                              ]]),
                              onClick: _cache[10] || (_cache[10] = withModifiers(($event) => imageModeAvailable.value && toggleImageQuizFromDropdown(), ["stop"])),
                              title: unref(t)("flashcard.image.quizToggle", "Multiple Choice"),
                              "aria-label": unref(t)("flashcard.image.quizToggle", "Multiple Choice")
                            }, [
                              createBaseVNode("span", {
                                class: normalizeClass(["inline-block h-3.5 w-3.5 transform rounded-full bg-white transition-transform", imageQuizEnabled.value ? "translate-x-4" : "translate-x-0.5"])
                              }, null, 2)
                            ], 10, _hoisted_28)
                          ]),
                          createBaseVNode("li", _hoisted_29, [
                            createBaseVNode("button", {
                              class: normalizeClass(["text-left flex-1 truncate", !pictionaryModeAvailable.value ? "opacity-50 cursor-not-allowed" : ""]),
                              onClick: _cache[11] || (_cache[11] = ($event) => selectMode("pictionary")),
                              disabled: !pictionaryModeAvailable.value,
                              "aria-disabled": !pictionaryModeAvailable.value ? "true" : "false",
                              title: !pictionaryModeAvailable.value ? unref(t)("flashcard.pictionary.unavailable", "Pictionary mode is unavailable for the selected date") : unref(t)("flashcard.modes.pictionary", "Pictionary")
                            }, toDisplayString(unref(t)("flashcard.modes.pictionary", "Pictionary")), 11, _hoisted_30),
                            createBaseVNode("button", {
                              class: normalizeClass(["relative inline-flex h-4 w-8 items-center rounded-full transition-colors border border-gray-300 dark:border-gray-600", [
                                pictionaryModeAvailable.value ? pictionaryDefinitionMode.value ? "bg-teal-600" : "bg-gray-200 dark:bg-[#0a0a0a]" : "opacity-50 cursor-not-allowed pointer-events-none bg-gray-200 dark:bg-[#0a0a0a]"
                              ]]),
                              onClick: _cache[12] || (_cache[12] = withModifiers(($event) => pictionaryModeAvailable.value && togglePictionaryDefinitionModeFromDropdown(), ["stop"])),
                              title: unref(t)("flashcard.pictionary.definitionToggle", "Definition Mode"),
                              "aria-label": unref(t)("flashcard.pictionary.definitionToggle", "Definition Mode")
                            }, [
                              createBaseVNode("span", {
                                class: normalizeClass(["inline-block h-3.5 w-3.5 transform rounded-full bg-white transition-transform", pictionaryDefinitionMode.value ? "translate-x-4" : "translate-x-0.5"])
                              }, null, 2)
                            ], 10, _hoisted_31)
                          ]),
                          createBaseVNode("li", _hoisted_32, [
                            createBaseVNode("button", {
                              class: normalizeClass(["text-left flex-1 truncate", !flipTileModeAvailable.value ? "opacity-50 cursor-not-allowed" : ""]),
                              onClick: _cache[13] || (_cache[13] = ($event) => selectMode("flip-tile")),
                              disabled: !flipTileModeAvailable.value,
                              "aria-disabled": !flipTileModeAvailable.value ? "true" : "false",
                              title: !flipTileModeAvailable.value ? unref(t)("flashcard.flipTile.unavailable", "Flip Tile mode is unavailable for the selected date") : unref(t)("flashcard.modes.flipTile", "Flip Tile")
                            }, toDisplayString(unref(t)("flashcard.modes.flipTile", "Flip Tile")), 11, _hoisted_33),
                            createBaseVNode("button", {
                              class: normalizeClass(["relative inline-flex h-4 w-8 items-center rounded-full transition-colors border border-gray-300 dark:border-gray-600", [
                                flipTileModeAvailable.value ? useFlipTileHints.value ? "bg-teal-600" : "bg-gray-200 dark:bg-[#0a0a0a]" : "opacity-50 cursor-not-allowed pointer-events-none bg-gray-200 dark:bg-[#0a0a0a]"
                              ]]),
                              onClick: _cache[14] || (_cache[14] = withModifiers(($event) => flipTileModeAvailable.value && toggleFlipTileHintsFromDropdown(), ["stop"])),
                              title: unref(t)("flashcard.flipTile.hintsToggle", "Use Definition Hints"),
                              "aria-label": unref(t)("flashcard.flipTile.hintsToggle", "Use Definition Hints")
                            }, [
                              createBaseVNode("span", {
                                class: normalizeClass(["inline-block h-3.5 w-3.5 transform rounded-full bg-white transition-transform", useFlipTileHints.value ? "translate-x-4" : "translate-x-0.5"])
                              }, null, 2)
                            ], 10, _hoisted_34)
                          ]),
                          createBaseVNode("li", _hoisted_35, [
                            createBaseVNode("button", {
                              class: normalizeClass(["text-left flex-1 truncate", !bubbleShooterModeAvailable.value ? "opacity-50 cursor-not-allowed" : ""]),
                              onClick: _cache[15] || (_cache[15] = ($event) => selectMode("bubble-shooter")),
                              disabled: !bubbleShooterModeAvailable.value,
                              "aria-disabled": !bubbleShooterModeAvailable.value ? "true" : "false",
                              title: !bubbleShooterModeAvailable.value ? unref(t)("flashcard.bubbleShooter.unavailable", "Bubble Shooter mode is disabled for dates with more than 8 vocabulary words") : unref(t)("flashcard.modes.bubbleShooter", "Bubble Shooter")
                            }, toDisplayString(unref(t)("flashcard.modes.bubbleShooter", "Bubble Shooter")), 11, _hoisted_36),
                            createBaseVNode("button", {
                              class: normalizeClass(["relative inline-flex h-4 w-8 items-center rounded-full transition-colors border border-gray-300 dark:border-gray-600", [
                                bubbleShooterModeAvailable.value ? bubbleShooterVietnameseMode.value ? "bg-orange-600" : "bg-gray-200 dark:bg-[#0a0a0a]" : "opacity-50 cursor-not-allowed pointer-events-none bg-gray-200 dark:bg-[#0a0a0a]"
                              ]]),
                              onClick: _cache[16] || (_cache[16] = withModifiers(($event) => bubbleShooterModeAvailable.value && toggleBubbleShooterVietnameseMode(), ["stop"])),
                              title: unref(t)("flashcard.bubbleShooter.vietnameseModeToggle", "Vietnamese First Letter Mode"),
                              "aria-label": unref(t)("flashcard.bubbleShooter.vietnameseModeToggle", "Vietnamese First Letter Mode")
                            }, [
                              createBaseVNode("span", {
                                class: normalizeClass(["inline-block h-3.5 w-3.5 transform rounded-full bg-white transition-transform", bubbleShooterVietnameseMode.value ? "translate-x-4" : "translate-x-0.5"])
                              }, null, 2)
                            ], 10, _hoisted_37)
                          ]),
                          createBaseVNode("li", _hoisted_38, [
                            createBaseVNode("button", {
                              class: "text-left flex-1 truncate",
                              onClick: _cache[17] || (_cache[17] = ($event) => selectMode("snake-game")),
                              title: unref(t)("flashcard.modes.snakeGame", "Snake Hunt")
                            }, toDisplayString(unref(t)("flashcard.modes.snakeGame", "Snake Hunt")), 9, _hoisted_39),
                            createBaseVNode("button", {
                              class: normalizeClass(["relative inline-flex h-4 w-8 items-center rounded-full transition-colors border border-gray-300 dark:border-gray-600", [
                                snakeDoubleBaitEnabled.value ? "bg-emerald-600" : "bg-gray-200 dark:bg-[#0a0a0a]",
                                _ctx.practiceStarted ? "opacity-50 cursor-not-allowed pointer-events-none" : ""
                              ]]),
                              onClick: _cache[18] || (_cache[18] = withModifiers(($event) => toggleSnakeDoubleBaitFromDropdown(), ["stop"])),
                              title: _ctx.practiceStarted ? unref(t)("flashcard.settings.disabledDuringPractice", "Settings are disabled during practice") : unref(t)("flashcard.snake.doubleBaitToggle", "Double Bait Mode"),
                              "aria-label": unref(t)("flashcard.snake.doubleBaitToggle", "Double Bait Mode")
                            }, [
                              createBaseVNode("span", {
                                class: normalizeClass(["inline-block h-3.5 w-3.5 transform rounded-full bg-white transition-transform", snakeDoubleBaitEnabled.value ? "translate-x-4" : "translate-x-0.5"])
                              }, null, 2)
                            ], 10, _hoisted_40)
                          ]),
                          createBaseVNode("li", _hoisted_41, [
                            createBaseVNode("button", {
                              class: "text-left flex-1 truncate",
                              onClick: _cache[19] || (_cache[19] = ($event) => selectMode("pronunciation"))
                            }, toDisplayString(unref(t)("flashcard.modes.pronunciation", "Pronunciation")), 1),
                            createBaseVNode("button", {
                              class: normalizeClass(["relative inline-flex h-4 w-8 items-center rounded-full transition-colors border border-gray-300 dark:border-gray-600", wordsCrushEnabled.value ? "bg-amber-600" : "bg-gray-200 dark:bg-[#0a0a0a]"]),
                              onClick: _cache[20] || (_cache[20] = withModifiers(($event) => toggleWordsCrushFromDropdown(), ["stop"])),
                              title: unref(t)("flashcard.pronunciation.wordsCrushToggle", "Hidden Words Mode"),
                              "aria-label": unref(t)("flashcard.pronunciation.wordsCrushToggle", "Hidden Words Mode")
                            }, [
                              createBaseVNode("span", {
                                class: normalizeClass(["inline-block h-3.5 w-3.5 transform rounded-full bg-white transition-transform", wordsCrushEnabled.value ? "translate-x-4" : "translate-x-0.5"])
                              }, null, 2)
                            ], 10, _hoisted_42)
                          ])
                        ])
                      ])) : createCommentVNode("", true)
                    ]),
                    _: 1
                  })
                ]),
                createBaseVNode("button", {
                  onClick: _cache[21] || (_cache[21] = ($event) => _ctx.$emit("toggle-shuffle")),
                  disabled: _ctx.practiceStarted,
                  class: normalizeClass([
                    "relative inline-flex h-5 w-9 items-center rounded-full transition-colors",
                    _ctx.shuffleEnabled ? "bg-blue-600" : "bg-gray-200 dark:bg-gray-600",
                    _ctx.practiceStarted ? "opacity-50 cursor-not-allowed" : ""
                  ]),
                  title: _ctx.practiceStarted ? unref(t)("flashcard.settings.shuffle_disabled_during_practice", "Shuffle is disabled during practice") : unref(t)("flashcard.settings.shuffle", "Shuffle")
                }, [
                  createBaseVNode("span", {
                    class: normalizeClass([
                      "inline-block h-3 w-3 transform rounded-full bg-white transition-transform",
                      _ctx.shuffleEnabled ? "translate-x-5" : "translate-x-1"
                    ])
                  }, null, 2)
                ], 10, _hoisted_43)
              ])
            ])
          ]),
          createBaseVNode("div", _hoisted_44, [
            createBaseVNode("div", _hoisted_45, [
              createBaseVNode("button", {
                onClick: _cache[22] || (_cache[22] = ($event) => _ctx.$emit("go-back")),
                class: "mr-4 text-gray-500 dark:text-white/70 hover:text-gray-700 dark:hover:text-white"
              }, _cache[48] || (_cache[48] = [
                createBaseVNode("svg", {
                  class: "w-6 h-6 md:w-7 md:h-7",
                  fill: "currentColor",
                  viewBox: "0 0 20 20"
                }, [
                  createBaseVNode("path", {
                    "fill-rule": "evenodd",
                    d: "M12.707 5.293a1 1 0 010 1.414L9.414 10l3.293 3.293a1 1 0 01-1.414 1.414l-4-4a1 1 0 010-1.414l4-4a1 1 0 011.414 0z",
                    "clip-rule": "evenodd"
                  })
                ], -1)
              ])),
              createBaseVNode("div", null, [
                createBaseVNode("h1", _hoisted_46, toDisplayString(unref(t)("flashcard.modes.flashcard", "Flashcard")), 1),
                createBaseVNode("p", _hoisted_47, toDisplayString(unref(t)("flashcard.header.description", "Practice vocabulary with flashcards")), 1)
              ])
            ]),
            createBaseVNode("div", _hoisted_48, [
              createBaseVNode("button", {
                onClick: _cache[23] || (_cache[23] = ($event) => _ctx.$emit("show-history")),
                class: "text-gray-500 dark:text-gray-400 hover:text-gray-700 dark:hover:text-gray-300",
                title: unref(t)("flashcard.header.history", "History")
              }, _cache[49] || (_cache[49] = [
                createBaseVNode("svg", {
                  class: "w-6 h-6 md:w-7 md:h-7",
                  fill: "currentColor",
                  viewBox: "0 0 20 20"
                }, [
                  createBaseVNode("path", {
                    "fill-rule": "evenodd",
                    d: "M10 18a8 8 0 100-16 8 8 0 000 16zm1-12a1 1 0 10-2 0v4a1 1 0 00.293.707l2.828 2.829a1 1 0 101.415-1.415L11 9.586V6z",
                    "clip-rule": "evenodd"
                  })
                ], -1)
              ]), 8, _hoisted_49),
              createBaseVNode("div", _hoisted_50, [
                createBaseVNode("span", _hoisted_51, toDisplayString(unref(t)("flashcard.settings.shuffle", "Shuffle")), 1),
                createBaseVNode("button", {
                  onClick: _cache[24] || (_cache[24] = ($event) => _ctx.$emit("toggle-shuffle")),
                  disabled: _ctx.practiceStarted,
                  class: normalizeClass([
                    "relative inline-flex items-center rounded-full transition-colors",
                    "h-6 w-11 md:h-7 md:w-12",
                    _ctx.shuffleEnabled ? "bg-blue-600" : "bg-gray-200 dark:bg-gray-600",
                    _ctx.practiceStarted ? "opacity-50 cursor-not-allowed" : ""
                  ]),
                  title: _ctx.practiceStarted ? unref(t)("flashcard.settings.shuffle_disabled_during_practice", "Shuffle is disabled during practice") : unref(t)("flashcard.settings.shuffle", "Shuffle")
                }, [
                  createBaseVNode("span", {
                    class: normalizeClass([
                      "inline-block transform rounded-full bg-white transition-transform",
                      "h-4 w-4 md:h-5 md:w-5",
                      _ctx.shuffleEnabled ? "translate-x-6 md:translate-x-6" : "translate-x-1"
                    ])
                  }, null, 2)
                ], 10, _hoisted_52)
              ]),
              createBaseVNode("div", _hoisted_53, [
                createBaseVNode("p", _hoisted_54, toDisplayString(unref(t)("flashcard.header.progress", "Progress")), 1),
                createBaseVNode("p", _hoisted_55, toDisplayString(_ctx.currentIndex + 1) + " / " + toDisplayString(_ctx.totalCards), 1)
              ]),
              createBaseVNode("div", _hoisted_56, [
                createBaseVNode("div", _hoisted_57, [
                  createBaseVNode("button", {
                    type: "button",
                    onClick: toggleDesktopDropdown,
                    class: normalizeClass(["relative pl-3 pr-10 py-1 md:pl-4 md:pr-12 md:py-2 text-sm md:text-base border border-gray-300 dark:border-gray-600 rounded-md bg-white dark:bg-[#0f0f0f] cursor-pointer text-gray-900 dark:text-white flex items-center min-w-[140px]", _ctx.practiceStarted ? "opacity-50 cursor-not-allowed" : ""]),
                    disabled: _ctx.practiceStarted,
                    "aria-disabled": _ctx.practiceStarted ? "true" : "false",
                    title: _ctx.practiceStarted ? unref(t)("flashcard.modes.change_disabled_during_practice", "Mode change is disabled during practice") : unref(t)("flashcard.header.selectMode", "Select mode"),
                    "aria-label": unref(t)("flashcard.header.selectMode", "Select mode")
                  }, [
                    createBaseVNode("span", _hoisted_59, toDisplayString(_ctx.practiceMode === "flashcard" ? unref(t)("flashcard.modes.flashcard", "Flashcard") : _ctx.practiceMode === "quiz" ? unref(t)("flashcard.modes.quiz", "Quiz") : _ctx.practiceMode === "typing" ? unref(t)("flashcard.modes.typing", "Typing") : _ctx.practiceMode === "listening" ? unref(t)("flashcard.modes.listening", "Listening") : _ctx.practiceMode === "image" ? unref(t)("flashcard.modes.image", "Image") : _ctx.practiceMode === "pictionary" ? unref(t)("flashcard.modes.pictionary", "Pictionary") : _ctx.practiceMode === "flip-tile" ? unref(t)("flashcard.modes.flipTile", "Flip Tile") : _ctx.practiceMode === "bubble-shooter" ? unref(t)("flashcard.modes.bubbleShooter", "Bubble Shooter") : _ctx.practiceMode === "snake-game" ? unref(t)("flashcard.modes.snakeGame", "Snake Hunt") : unref(t)("flashcard.modes.pronunciation", "Pronunciation")), 1),
                    _cache[50] || (_cache[50] = createBaseVNode("svg", {
                      class: "w-4 h-4 opacity-80 absolute right-2 md:right-3 top-1/2 -translate-y-1/2 pointer-events-none",
                      fill: "currentColor",
                      viewBox: "0 0 20 20"
                    }, [
                      createBaseVNode("path", {
                        "fill-rule": "evenodd",
                        d: "M5.23 7.21a.75.75 0 011.06.02L10 11.17l3.71-3.94a.75.75 0 111.08 1.04l-4.24 4.5a.75.75 0 01-1.08 0L5.21 8.27a.75.75 0 01.02-1.06z",
                        "clip-rule": "evenodd"
                      })
                    ], -1))
                  ], 10, _hoisted_58),
                  createVNode(Transition, {
                    name: "fade",
                    appear: ""
                  }, {
                    default: withCtx(() => [
                      desktopDropdownOpen.value && !_ctx.practiceStarted ? (openBlock(), createElementBlock("div", _hoisted_60, [
                        createBaseVNode("ul", _hoisted_61, [
                          createBaseVNode("li", _hoisted_62, [
                            createBaseVNode("button", {
                              class: "text-left flex-1 truncate",
                              onClick: _cache[25] || (_cache[25] = ($event) => selectMode("flashcard"))
                            }, toDisplayString(unref(t)("flashcard.modes.flashcard", "Flashcard")), 1),
                            createBaseVNode("button", {
                              class: normalizeClass(["relative inline-flex h-5 w-10 items-center rounded-full transition-colors border border-gray-300 dark:border-gray-600", scrambleWordsEnabled.value ? "bg-green-600" : "bg-gray-200 dark:bg-[#0a0a0a]"]),
                              onClick: _cache[26] || (_cache[26] = withModifiers(($event) => toggleScrambleWordsFromDropdown(), ["stop"])),
                              title: unref(t)("flashcard.scrambleWords.toggle", "Scramble Words"),
                              "aria-label": unref(t)("flashcard.scrambleWords.toggle", "Scramble Words")
                            }, [
                              createBaseVNode("span", {
                                class: normalizeClass(["inline-block h-4 w-4 transform rounded-full bg-white transition-transform", scrambleWordsEnabled.value ? "translate-x-5" : "translate-x-0.5"])
                              }, null, 2)
                            ], 10, _hoisted_63)
                          ]),
                          createBaseVNode("li", null, [
                            createBaseVNode("button", {
                              class: "w-full text-left px-4 py-2 hover:bg-gray-100 dark:hover:bg-white/10",
                              onClick: _cache[27] || (_cache[27] = ($event) => selectMode("quiz"))
                            }, toDisplayString(unref(t)("flashcard.modes.quiz", "Quiz")), 1)
                          ]),
                          createBaseVNode("li", _hoisted_64, [
                            createBaseVNode("button", {
                              class: "text-left flex-1 truncate",
                              onClick: _cache[28] || (_cache[28] = ($event) => selectMode("typing"))
                            }, toDisplayString(unref(t)("flashcard.modes.typing", "Typing")), 1),
                            createBaseVNode("button", {
                              class: normalizeClass(["relative inline-flex h-5 w-10 items-center rounded-full transition-colors border border-gray-300 dark:border-gray-600", typingQuizEnabled.value ? "bg-purple-600" : "bg-gray-200 dark:bg-[#0a0a0a]"]),
                              onClick: _cache[29] || (_cache[29] = withModifiers(($event) => toggleTypingQuizFromDropdown(), ["stop"])),
                              title: unref(t)("flashcard.typing.quizToggle", "Multiple Choice"),
                              "aria-label": unref(t)("flashcard.typing.quizToggle", "Multiple Choice")
                            }, [
                              createBaseVNode("span", {
                                class: normalizeClass(["inline-block h-4 w-4 transform rounded-full bg-white transition-transform", typingQuizEnabled.value ? "translate-x-5" : "translate-x-0.5"])
                              }, null, 2)
                            ], 10, _hoisted_65)
                          ]),
                          createBaseVNode("li", _hoisted_66, [
                            createBaseVNode("button", {
                              class: "text-left flex-1 truncate",
                              onClick: _cache[30] || (_cache[30] = ($event) => selectMode("listening"))
                            }, toDisplayString(unref(t)("flashcard.modes.listening", "Listening")), 1),
                            createBaseVNode("button", {
                              class: normalizeClass(["relative inline-flex h-5 w-10 items-center rounded-full transition-colors border border-gray-300 dark:border-gray-600", listeningQuizEnabled.value ? "bg-cyan-600" : "bg-gray-200 dark:bg-[#0a0a0a]"]),
                              onClick: _cache[31] || (_cache[31] = withModifiers(($event) => toggleListeningQuizFromDropdown(), ["stop"])),
                              title: unref(t)("flashcard.listening.quizToggle", "Multiple Choice"),
                              "aria-label": unref(t)("flashcard.listening.quizToggle", "Multiple Choice")
                            }, [
                              createBaseVNode("span", {
                                class: normalizeClass(["inline-block h-4 w-4 transform rounded-full bg-white transition-transform", listeningQuizEnabled.value ? "translate-x-5" : "translate-x-0.5"])
                              }, null, 2)
                            ], 10, _hoisted_67)
                          ]),
                          createBaseVNode("li", _hoisted_68, [
                            createBaseVNode("button", {
                              class: normalizeClass(["text-left flex-1 truncate", !imageModeAvailable.value ? "opacity-50 cursor-not-allowed" : ""]),
                              onClick: _cache[32] || (_cache[32] = ($event) => selectMode("image")),
                              disabled: !imageModeAvailable.value,
                              "aria-disabled": !imageModeAvailable.value ? "true" : "false",
                              title: !imageModeAvailable.value ? unref(t)("flashcard.image.unavailable", "Image mode is unavailable for the selected date") : unref(t)("flashcard.modes.image", "Image")
                            }, toDisplayString(unref(t)("flashcard.modes.image", "Image")), 11, _hoisted_69),
                            createBaseVNode("button", {
                              class: normalizeClass(["relative inline-flex h-5 w-10 items-center rounded-full transition-colors border border-gray-300 dark:border-gray-600", [
                                imageModeAvailable.value ? imageQuizEnabled.value ? "bg-purple-600" : "bg-gray-200 dark:bg-[#0a0a0a]" : "opacity-50 cursor-not-allowed pointer-events-none bg-gray-200 dark:bg-[#0a0a0a]"
                              ]]),
                              onClick: _cache[33] || (_cache[33] = withModifiers(($event) => imageModeAvailable.value && toggleImageQuizFromDropdown(), ["stop"])),
                              title: unref(t)("flashcard.image.quizToggle", "Multiple Choice"),
                              "aria-label": unref(t)("flashcard.image.quizToggle", "Multiple Choice")
                            }, [
                              createBaseVNode("span", {
                                class: normalizeClass(["inline-block h-4 w-4 transform rounded-full bg-white transition-transform", imageQuizEnabled.value ? "translate-x-5" : "translate-x-0.5"])
                              }, null, 2)
                            ], 10, _hoisted_70)
                          ]),
                          createBaseVNode("li", _hoisted_71, [
                            createBaseVNode("button", {
                              class: normalizeClass(["text-left flex-1 truncate", !pictionaryModeAvailable.value ? "opacity-50 cursor-not-allowed" : ""]),
                              onClick: _cache[34] || (_cache[34] = ($event) => selectMode("pictionary")),
                              disabled: !pictionaryModeAvailable.value,
                              "aria-disabled": !pictionaryModeAvailable.value ? "true" : "false",
                              title: !pictionaryModeAvailable.value ? unref(t)("flashcard.pictionary.unavailable", "Pictionary mode is unavailable for the selected date") : unref(t)("flashcard.modes.pictionary", "Pictionary")
                            }, toDisplayString(unref(t)("flashcard.modes.pictionary", "Pictionary")), 11, _hoisted_72),
                            createBaseVNode("button", {
                              class: normalizeClass(["relative inline-flex h-5 w-10 items-center rounded-full transition-colors border border-gray-300 dark:border-gray-600", [
                                pictionaryModeAvailable.value ? pictionaryDefinitionMode.value ? "bg-teal-600" : "bg-gray-200 dark:bg-[#0a0a0a]" : "opacity-50 cursor-not-allowed pointer-events-none bg-gray-200 dark:bg-[#0a0a0a]"
                              ]]),
                              onClick: _cache[35] || (_cache[35] = withModifiers(($event) => pictionaryModeAvailable.value && togglePictionaryDefinitionModeFromDropdown(), ["stop"])),
                              title: unref(t)("flashcard.pictionary.definitionToggle", "Definition Mode"),
                              "aria-label": unref(t)("flashcard.pictionary.definitionToggle", "Definition Mode")
                            }, [
                              createBaseVNode("span", {
                                class: normalizeClass(["inline-block h-4 w-4 transform rounded-full bg-white transition-transform", pictionaryDefinitionMode.value ? "translate-x-5" : "translate-x-0.5"])
                              }, null, 2)
                            ], 10, _hoisted_73)
                          ]),
                          createBaseVNode("li", _hoisted_74, [
                            createBaseVNode("button", {
                              class: normalizeClass(["text-left flex-1 truncate", !flipTileModeAvailable.value ? "opacity-50 cursor-not-allowed" : ""]),
                              onClick: _cache[36] || (_cache[36] = ($event) => selectMode("flip-tile")),
                              disabled: !flipTileModeAvailable.value,
                              "aria-disabled": !flipTileModeAvailable.value ? "true" : "false",
                              title: !flipTileModeAvailable.value ? unref(t)("flashcard.flipTile.unavailable", "Flip Tile mode is unavailable for the selected date") : unref(t)("flashcard.modes.flipTile", "Flip Tile")
                            }, toDisplayString(unref(t)("flashcard.modes.flipTile", "Flip Tile")), 11, _hoisted_75),
                            createBaseVNode("button", {
                              class: normalizeClass(["relative inline-flex h-5 w-10 items-center rounded-full transition-colors border border-gray-300 dark:border-gray-600", [
                                flipTileModeAvailable.value ? useFlipTileHints.value ? "bg-teal-600" : "bg-gray-200 dark:bg-[#0a0a0a]" : "opacity-50 cursor-not-allowed pointer-events-none bg-gray-200 dark:bg-[#0a0a0a]"
                              ]]),
                              onClick: _cache[37] || (_cache[37] = withModifiers(($event) => flipTileModeAvailable.value && toggleFlipTileHintsFromDropdown(), ["stop"])),
                              title: unref(t)("flashcard.flipTile.hintsToggle", "Use Definition Hints"),
                              "aria-label": unref(t)("flashcard.flipTile.hintsToggle", "Use Definition Hints")
                            }, [
                              createBaseVNode("span", {
                                class: normalizeClass(["inline-block h-4 w-4 transform rounded-full bg-white transition-transform", useFlipTileHints.value ? "translate-x-5" : "translate-x-0.5"])
                              }, null, 2)
                            ], 10, _hoisted_76)
                          ]),
                          createBaseVNode("li", _hoisted_77, [
                            createBaseVNode("button", {
                              class: normalizeClass(["text-left flex-1 truncate", !bubbleShooterModeAvailable.value ? "opacity-50 cursor-not-allowed" : ""]),
                              onClick: _cache[38] || (_cache[38] = ($event) => selectMode("bubble-shooter")),
                              disabled: !bubbleShooterModeAvailable.value,
                              "aria-disabled": !bubbleShooterModeAvailable.value ? "true" : "false",
                              title: !bubbleShooterModeAvailable.value ? unref(t)("flashcard.bubbleShooter.unavailable", "Bubble Shooter mode is disabled for dates with more than 8 vocabulary words") : unref(t)("flashcard.modes.bubbleShooter", "Bubble Shooter")
                            }, toDisplayString(unref(t)("flashcard.modes.bubbleShooter", "Bubble Shooter")), 11, _hoisted_78),
                            createBaseVNode("button", {
                              class: normalizeClass(["relative inline-flex h-5 w-10 items-center rounded-full transition-colors border border-gray-300 dark:border-gray-600", [
                                bubbleShooterModeAvailable.value ? bubbleShooterVietnameseMode.value ? "bg-orange-600" : "bg-gray-200 dark:bg-[#0a0a0a]" : "opacity-50 cursor-not-allowed pointer-events-none bg-gray-200 dark:bg-[#0a0a0a]"
                              ]]),
                              onClick: _cache[39] || (_cache[39] = withModifiers(($event) => bubbleShooterModeAvailable.value && toggleBubbleShooterVietnameseMode(), ["stop"])),
                              title: unref(t)("flashcard.bubbleShooter.vietnameseModeToggle", "Vietnamese First Letter Mode"),
                              "aria-label": unref(t)("flashcard.bubbleShooter.vietnameseModeToggle", "Vietnamese First Letter Mode")
                            }, [
                              createBaseVNode("span", {
                                class: normalizeClass(["inline-block h-4 w-4 transform rounded-full bg-white transition-transform", bubbleShooterVietnameseMode.value ? "translate-x-5" : "translate-x-0.5"])
                              }, null, 2)
                            ], 10, _hoisted_79)
                          ]),
                          createBaseVNode("li", _hoisted_80, [
                            createBaseVNode("button", {
                              class: "text-left flex-1 truncate",
                              onClick: _cache[40] || (_cache[40] = ($event) => selectMode("snake-game")),
                              title: unref(t)("flashcard.modes.snakeGame", "Snake Hunt")
                            }, toDisplayString(unref(t)("flashcard.modes.snakeGame", "Snake Hunt")), 9, _hoisted_81),
                            createBaseVNode("button", {
                              class: normalizeClass(["relative inline-flex h-5 w-10 items-center rounded-full transition-colors border border-gray-300 dark:border-gray-600", [
                                snakeDoubleBaitEnabled.value ? "bg-emerald-600" : "bg-gray-200 dark:bg-[#0a0a0a]",
                                _ctx.practiceStarted ? "opacity-50 cursor-not-allowed pointer-events-none" : ""
                              ]]),
                              onClick: _cache[41] || (_cache[41] = withModifiers(($event) => toggleSnakeDoubleBaitFromDropdown(), ["stop"])),
                              title: _ctx.practiceStarted ? unref(t)("flashcard.settings.disabledDuringPractice", "Settings are disabled during practice") : unref(t)("flashcard.snake.doubleBaitToggle", "Double Bait Mode"),
                              "aria-label": unref(t)("flashcard.snake.doubleBaitToggle", "Double Bait Mode")
                            }, [
                              createBaseVNode("span", {
                                class: normalizeClass(["inline-block h-4 w-4 transform rounded-full bg-white transition-transform", snakeDoubleBaitEnabled.value ? "translate-x-5" : "translate-x-0.5"])
                              }, null, 2)
                            ], 10, _hoisted_82)
                          ]),
                          createBaseVNode("li", _hoisted_83, [
                            createBaseVNode("button", {
                              class: "text-left flex-1 truncate",
                              onClick: _cache[42] || (_cache[42] = ($event) => selectMode("pronunciation"))
                            }, toDisplayString(unref(t)("flashcard.modes.pronunciation", "Pronunciation")), 1),
                            createBaseVNode("button", {
                              class: normalizeClass(["relative inline-flex h-5 w-10 items-center rounded-full transition-colors border border-gray-300 dark:border-gray-600", wordsCrushEnabled.value ? "bg-amber-600" : "bg-gray-200 dark:bg-[#0a0a0a]"]),
                              onClick: _cache[43] || (_cache[43] = withModifiers(($event) => toggleWordsCrushFromDropdown(), ["stop"])),
                              title: unref(t)("flashcard.pronunciation.wordsCrushToggle", "Hidden Words Mode"),
                              "aria-label": unref(t)("flashcard.pronunciation.wordsCrushToggle", "Hidden Words Mode")
                            }, [
                              createBaseVNode("span", {
                                class: normalizeClass(["inline-block h-4 w-4 transform rounded-full bg-white transition-transform", wordsCrushEnabled.value ? "translate-x-5" : "translate-x-0.5"])
                              }, null, 2)
                            ], 10, _hoisted_84)
                          ])
                        ])
                      ])) : createCommentVNode("", true)
                    ]),
                    _: 1
                  })
                ]),
                createBaseVNode("button", {
                  onClick: onShowSettings,
                  disabled: _ctx.practiceStarted,
                  "aria-disabled": _ctx.practiceStarted ? "true" : "false",
                  class: normalizeClass(["text-gray-500 dark:text-gray-400 hover:text-gray-700 dark:hover:text-gray-300", _ctx.practiceStarted ? "opacity-50 cursor-not-allowed" : ""]),
                  title: _ctx.practiceStarted ? unref(t)("flashcard.settings.disabledDuringPractice", "Settings are disabled during practice") : unref(t)("flashcard.header.settings", "Settings")
                }, _cache[51] || (_cache[51] = [
                  createBaseVNode("svg", {
                    class: "w-6 h-6 md:w-7 md:h-7",
                    fill: "currentColor",
                    viewBox: "0 0 20 20"
                  }, [
                    createBaseVNode("path", {
                      "fill-rule": "evenodd",
                      d: "M11.49 3.17c-.38-1.56-2.6-1.56-2.98 0a1.532 1.532 0 01-2.286.948c-1.372-.836-2.942.734-2.106 2.106.54.886.061 2.042-.947 2.287-1.561.379-1.561 2.6 0 2.978a1.532 1.532 0 01.947 2.287c-.836 1.372.734 2.942 2.106 2.106a1.532 1.532 0 012.287.947c.379 1.561 2.6 1.561 2.978 0a1.533 1.533 0 012.287-.947c1.372.836 2.942-.734 2.106-2.106a1.533 1.533 0 01.947-2.287c1.561-.379 1.561-2.6 0-2.978a1.532 1.532 0 01-.947-2.287c.836-1.372-.734-2.942-2.106-2.106a1.532 1.532 0 01-2.287-.947zM10 13a3 3 0 100-6 3 3 0 000 6z",
                      "clip-rule": "evenodd"
                    })
                  ], -1)
                ]), 10, _hoisted_85)
              ])
            ])
          ])
        ])
      ]);
    };
  }
});
export {
  _sfc_main as default
};
//# sourceMappingURL=FlashcardHeader-B0s3WeLz.js.map
