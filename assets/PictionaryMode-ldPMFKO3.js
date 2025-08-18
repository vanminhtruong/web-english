const __vite__mapDeps=(i,m=__vite__mapDeps,d=(m.f||(m.f=["assets/FireworkSoundEffect-5lk-zwCP.js","assets/vendor-DMqe9Z5T.js","assets/index-W3xd3TqU.js","assets/vendor-toast-C02QcIAu.js","assets/vendor-toast-jG2HNJHr.css","assets/index-CTBbHH1h.css","assets/FireworkSoundEffect-Z17vpFMM.css"])))=>i.map(i=>d[i]);
import { _ as __vitePreload, e as useVoiceStore, a as _export_sfc } from "./index-W3xd3TqU.js";
import { d as defineComponent, H as useI18n, A as ref, B as computed, K as watch, I as onMounted, a0 as onBeforeUnmount, c as createElementBlock, v as openBlock, f as createBaseVNode, e as createCommentVNode, y as createVNode, t as toDisplayString, u as unref, i as withModifiers, n as normalizeClass, F as Fragment, j as renderList, C as withDirectives, S as vModelText, g as createTextVNode, D as defineAsyncComponent, q as nextTick } from "./vendor-DMqe9Z5T.js";
import "./vendor-toast-C02QcIAu.js";
const _hoisted_1 = { class: "h-full flex flex-col overflow-hidden" };
const _hoisted_2 = { class: "mb-4 flex items-center justify-center gap-3" };
const _hoisted_3 = { class: "px-3 py-1 bg-purple-100 dark:bg-dark-bg-mute text-purple-800 dark:text-purple-300 text-sm font-medium rounded-full" };
const _hoisted_4 = { class: "flex items-center gap-2" };
const _hoisted_5 = { class: "text-xs text-gray-600 dark:text-white/70" };
const _hoisted_6 = ["aria-pressed", "title"];
const _hoisted_7 = { class: "flex-1 flex items-center justify-center mb-4 min-h-0" };
const _hoisted_8 = {
  key: 0,
  class: "flex items-center justify-center bg-gradient-to-br from-teal-50 to-cyan-50 dark:from-teal-900/30 dark:to-cyan-900/30 rounded-xl p-6 w-full max-w-lg border border-teal-200 dark:border-teal-700/50 shadow-sm"
};
const _hoisted_9 = { class: "text-center space-y-3" };
const _hoisted_10 = { class: "max-h-32 overflow-y-auto" };
const _hoisted_11 = { class: "text-lg font-medium text-gray-900 dark:text-white leading-relaxed" };
const _hoisted_12 = { class: "text-sm text-teal-600 dark:text-teal-400 font-medium" };
const _hoisted_13 = {
  key: 0,
  class: "relative"
};
const _hoisted_14 = ["src", "alt"];
const _hoisted_15 = {
  key: 0,
  class: "absolute inset-0 flex items-center justify-center bg-gray-100 dark:bg-dark-bg-mute rounded-lg"
};
const _hoisted_16 = { class: "text-center" };
const _hoisted_17 = { class: "text-sm text-gray-500 dark:text-white/60 mt-2" };
const _hoisted_18 = {
  key: 1,
  class: "flex items-center justify-center bg-gray-100 dark:bg-dark-bg-mute rounded-lg p-8 w-full max-w-sm"
};
const _hoisted_19 = { class: "text-center" };
const _hoisted_20 = { class: "text-sm text-gray-500 dark:text-white/60 mt-2" };
const _hoisted_21 = { class: "flex-shrink-0" };
const _hoisted_22 = { class: "flex flex-wrap gap-2 justify-center items-center" };
const _hoisted_23 = {
  key: 0,
  class: "px-1 text-lg text-gray-700 dark:text-white/80 select-none"
};
const _hoisted_24 = ["onClick", "onDragover", "onDrop"];
const _hoisted_25 = {
  key: 0,
  class: "uppercase tracking-wider"
};
const _hoisted_26 = {
  key: 1,
  class: "caret-block",
  "aria-hidden": "true"
};
const _hoisted_27 = {
  key: 2,
  class: "uppercase tracking-wider"
};
const _hoisted_28 = {
  key: 0,
  class: "mt-3"
};
const _hoisted_29 = { class: "mb-2 flex justify-center" };
const _hoisted_30 = { class: "relative w-48 sm:w-56" };
const _hoisted_31 = ["placeholder"];
const _hoisted_32 = ["aria-label", "title"];
const _hoisted_33 = { class: "flex flex-wrap gap-2 justify-center" };
const _hoisted_34 = ["onDragstart"];
const _hoisted_35 = {
  key: 0,
  class: "text-center space-y-2 max-h-32 overflow-y-auto mt-3"
};
const _hoisted_36 = {
  key: 0,
  class: "w-4 h-4 mr-1",
  fill: "currentColor",
  viewBox: "0 0 20 20"
};
const _hoisted_37 = {
  key: 1,
  class: "w-4 h-4 mr-1",
  fill: "currentColor",
  viewBox: "0 0 20 20"
};
const _hoisted_38 = {
  key: 0,
  class: "text-center"
};
const _hoisted_39 = { class: "text-sm text-gray-600 dark:text-white/70" };
const _hoisted_40 = { class: "font-semibold text-gray-900 dark:text-white" };
const _hoisted_41 = { class: "text-xs text-gray-500 dark:text-white/60 mt-1 line-clamp-2" };
const _hoisted_42 = {
  key: 1,
  class: "text-center"
};
const _hoisted_43 = { class: "text-sm text-gray-600 dark:text-white/70 line-clamp-2" };
const _hoisted_44 = {
  key: 1,
  class: "text-center text-sm text-gray-500 dark:text-white/60 mt-3"
};
const _sfc_main = /* @__PURE__ */ defineComponent({
  __name: "PictionaryMode",
  props: {
    card: {},
    pictionaryAnswer: {},
    pictionaryAnswered: { type: Boolean },
    pictionaryCorrect: { type: Boolean },
    definitionMode: { type: Boolean },
    getTopicName: { type: Function }
  },
  emits: ["update:pictionary-answer", "check-answer", "pictionary-snapshot"],
  setup(__props, { emit: __emit }) {
    const props = __props;
    const emit = __emit;
    const { t } = useI18n();
    const { playAudio } = useVoiceStore();
    const imageError = ref(false);
    const hiddenInput = ref(null);
    const isFocused = ref(false);
    const isComposing = ref(false);
    const dragMode = ref(false);
    const letterBank = Array.from("ABCDEFGHIJKLMNOPQRSTUVWXYZ");
    const letterQuery = ref("");
    const filteredLetterBank = computed(() => {
      const q = letterQuery.value.trim().toUpperCase();
      if (!q) return letterBank;
      const onlyLetters = q.replace(/[^A-Z]/g, "");
      if (!onlyLetters) return letterBank;
      const set = new Set(onlyLetters.split(""));
      return letterBank.filter((ch) => set.has(ch));
    });
    const clearLetterQuery = () => {
      letterQuery.value = "";
    };
    const FireworkSoundEffect = defineAsyncComponent(() => __vitePreload(() => import("./FireworkSoundEffect-5lk-zwCP.js"), true ? __vite__mapDeps([0,1,2,3,4,5,6]) : void 0));
    const triggerFirework = ref(false);
    const triggerSound = ref(false);
    const isCorrectAnswer = ref(false);
    const fireworkEffect = ref();
    const slots = ref([]);
    const normalizeWord = (w) => w.normalize("NFKC");
    const buildSlots = (word) => {
      const letters = normalizeWord(word);
      const arr = [];
      const isAlpha = (c) => /^[a-z]$/i.test(c);
      const meaningfulIndices = [];
      for (let i = 0; i < letters.length; i++) {
        const c = letters[i];
        if (isAlpha(c)) {
          meaningfulIndices.push(i);
        }
      }
      const alphaCount = meaningfulIndices.length;
      const hintCount = alphaCount <= 3 ? 1 : 2;
      const hintSet = /* @__PURE__ */ new Set();
      while (hintSet.size < Math.min(hintCount, alphaCount)) {
        const r = meaningfulIndices[Math.floor(Math.random() * alphaCount)];
        hintSet.add(r);
      }
      for (let i = 0; i < letters.length; i++) {
        const c = letters[i];
        if (!isAlpha(c)) {
          arr.push({ char: c, fixed: true, separator: true });
          continue;
        }
        if (hintSet.has(i)) {
          arr.push({ char: c.toUpperCase(), fixed: true });
        } else {
          arr.push({ char: "", fixed: false });
        }
      }
      slots.value = arr;
      pushAnswer();
    };
    const pushAnswer = () => {
      const answer = slots.value.map((s) => s.separator ? s.char : s.char || "").join("");
      emit("update:pictionary-answer", answer);
    };
    const emitSnapshot = () => {
      const snapshot = slots.value.map((s) => ({ char: s.char, fixed: s.fixed, separator: s.separator }));
      emit("pictionary-snapshot", { slots: snapshot });
    };
    const focusInput = async () => {
      await nextTick();
      try {
        hiddenInput.value?.focus({ preventScroll: true });
      } catch {
        hiddenInput.value?.focus();
      }
      isFocused.value = true;
    };
    const ensureFocusIfNeeded = () => {
      if (!props.pictionaryAnswered && !dragMode.value) {
        if (document.activeElement !== hiddenInput.value) {
          focusInput();
        }
      }
    };
    const onHiddenBlur = () => {
      isFocused.value = false;
      ensureFocusIfNeeded();
    };
    const nextEditableIndex = () => slots.value.findIndex((s) => !s.fixed && !s.char);
    const lastFilledEditableIndex = () => {
      for (let i = slots.value.length - 1; i >= 0; i--) {
        const s = slots.value[i];
        if (!s.fixed && s.char) return i;
      }
      return -1;
    };
    const stripDiacritics = (s) => s.replace(/[ưừứửữự]/g, "w").replace(/[ƯỪỨỬỮỰ]/g, "W").normalize("NFD").replace(/[\u0300-\u036f]/g, "").replace(/đ/g, "d").replace(/Đ/g, "D");
    const handleKeydown = (e) => {
      if (props.pictionaryAnswered) return;
      if (isComposing.value) return;
      const key = e.key;
      if (dragMode.value) {
        if (key === "Enter") {
          emitSnapshot();
          emit("check-answer");
        }
        return;
      }
      const alpha = stripDiacritics(key);
      if (/^[a-z]$/i.test(alpha)) {
        const idx = nextEditableIndex();
        if (idx !== -1) {
          slots.value[idx].char = alpha.toUpperCase();
          pushAnswer();
        }
        return;
      }
      if (key === "Backspace") {
        const idx = lastFilledEditableIndex();
        if (idx !== -1) {
          slots.value[idx].char = "";
          pushAnswer();
        }
      } else if (key === "Enter") {
        emitSnapshot();
        emit("check-answer");
      }
    };
    const handleBeforeInput = (e) => {
      if (props.pictionaryAnswered) return;
      if (isComposing.value) {
        return;
      }
      if (dragMode.value) {
        if (hiddenInput.value) hiddenInput.value.value = "";
        return;
      }
      const ie = e;
      const type = ie.inputType;
      if (type === "insertText") {
        const data = stripDiacritics(ie.data || "");
        if (/^[a-z]$/i.test(data)) {
          const idx = nextEditableIndex();
          if (idx !== -1) {
            slots.value[idx].char = data.toUpperCase();
            pushAnswer();
          }
        }
      } else if (type === "deleteContentBackward") {
        const idx = lastFilledEditableIndex();
        if (idx !== -1) {
          slots.value[idx].char = "";
          pushAnswer();
        }
      } else if (type === "insertLineBreak") {
        emitSnapshot();
        emit("check-answer");
      }
      if (hiddenInput.value) hiddenInput.value.value = "";
    };
    const handleInput = (e) => {
      if (isComposing.value) return;
      if (hiddenInput.value) hiddenInput.value.value = "";
    };
    const onCompositionStart = () => {
      isComposing.value = true;
    };
    const onCompositionUpdate = (e) => {
      const data = (e.data || "").toString();
      stripDiacritics(data);
    };
    const onCompositionEnd = (e) => {
      const dataRaw = (e.data || hiddenInput.value?.value || "").toString();
      const finalized = stripDiacritics(dataRaw).toUpperCase();
      for (const ch of finalized) {
        if (!/^[A-Z]$/.test(ch)) continue;
        const idx = nextEditableIndex();
        if (idx === -1) break;
        slots.value[idx].char = ch;
      }
      pushAnswer();
      if (hiddenInput.value) hiddenInput.value.value = "";
      isComposing.value = false;
    };
    const allEditableFilled = () => {
      return slots.value.every((s) => s.fixed || s.separator || !!s.char);
    };
    const maybeAutoCheck = () => {
      if (dragMode.value && !props.pictionaryAnswered && allEditableFilled()) {
        emitSnapshot();
        emit("check-answer");
      }
    };
    watch(() => props.card, (c) => {
      imageError.value = false;
      if (c?.word) buildSlots(c.word);
      ensureFocusIfNeeded();
    });
    onMounted(() => {
      if (props.card?.word) buildSlots(props.card.word);
      focusInput();
      document.addEventListener("visibilitychange", ensureFocusIfNeeded);
    });
    onBeforeUnmount(() => {
      document.removeEventListener("visibilitychange", ensureFocusIfNeeded);
    });
    const handleImageError = () => {
      imageError.value = true;
    };
    const resetTriggers = () => {
      triggerFirework.value = false;
      triggerSound.value = false;
    };
    watch(() => props.pictionaryAnswered, (newVal) => {
      if (newVal && !triggerFirework.value) {
        isCorrectAnswer.value = props.pictionaryCorrect;
        setTimeout(() => {
          triggerFirework.value = true;
          triggerSound.value = true;
        }, 50);
      }
      if (newVal && props.pictionaryCorrect && props.card?.word) {
        Promise.resolve(playAudio(props.card.word)).catch(() => {
        });
      }
      if (newVal) {
        isFocused.value = false;
      }
      if (!newVal) {
        ensureFocusIfNeeded();
      }
    });
    const toggleDragMode = () => {
      dragMode.value = !dragMode.value;
      if (!dragMode.value) {
        focusInput();
      } else {
        isFocused.value = false;
      }
    };
    const onLetterDragStart = (ch, ev) => {
      ev.dataTransfer?.setData("text/plain", ch);
      ev.dataTransfer?.setDragImage?.(createDragImage(ch), 12, 12);
    };
    const onSlotDragOver = (idx, _ev) => {
      const s = slots.value[idx];
      if (!s || s.fixed || s.separator) return;
    };
    const onSlotDrop = (idx, ev) => {
      const s = slots.value[idx];
      if (!s || s.fixed || s.separator) return;
      const ch = (ev.dataTransfer?.getData("text/plain") || "").toUpperCase();
      if (/^[A-Z]$/.test(ch)) {
        s.char = ch;
        pushAnswer();
        clearLetterQuery();
        maybeAutoCheck();
      }
    };
    const onSlotClick = (idx) => {
      const s = slots.value[idx];
      if (!s || s.separator || s.fixed) return;
      if (dragMode.value) {
        if (s.char) {
          s.char = "";
          pushAnswer();
        }
      } else {
        focusInput();
      }
    };
    const createDragImage = (ch) => {
      const el = document.createElement("div");
      el.textContent = ch;
      el.style.position = "absolute";
      el.style.top = "-1000px";
      el.style.left = "-1000px";
      el.style.padding = "6px 8px";
      el.style.fontWeight = "700";
      el.style.fontSize = "16px";
      el.style.borderRadius = "8px";
      el.style.background = "rgba(37,99,235,0.15)";
      el.style.color = "#1D4ED8";
      el.style.border = "1px solid rgba(37,99,235,0.35)";
      document.body.appendChild(el);
      setTimeout(() => document.body.removeChild(el), 0);
      return el;
    };
    return (_ctx, _cache) => {
      return openBlock(), createElementBlock("div", {
        class: "bg-white dark:bg-black rounded-xl shadow-2xl border border-gray-200 dark:border-dark-bg-mute p-6 min-h-96 max-h-[560px] select-none",
        onCopy: _cache[3] || (_cache[3] = withModifiers(() => {
        }, ["prevent"])),
        onCut: _cache[4] || (_cache[4] = withModifiers(() => {
        }, ["prevent"])),
        onContextmenu: _cache[5] || (_cache[5] = withModifiers(() => {
        }, ["prevent"])),
        onClick: focusInput
      }, [
        createBaseVNode("div", _hoisted_1, [
          createBaseVNode("div", _hoisted_2, [
            createBaseVNode("span", _hoisted_3, toDisplayString(_ctx.card?.category ? _ctx.getTopicName(_ctx.card.category) : ""), 1),
            createBaseVNode("div", _hoisted_4, [
              createBaseVNode("span", _hoisted_5, toDisplayString(unref(t)("flashcard.pictionary.dragToggle", "Drag & Drop")), 1),
              createBaseVNode("button", {
                class: normalizeClass(["relative inline-flex h-5 w-9 items-center rounded-full transition-colors border border-gray-300 dark:border-dark-bg-mute", dragMode.value ? "bg-blue-600" : "bg-gray-200 dark:bg-dark-bg-soft"]),
                onClick: withModifiers(toggleDragMode, ["stop"]),
                "aria-pressed": dragMode.value ? "true" : "false",
                title: unref(t)("flashcard.pictionary.dragToggle", "Drag & Drop")
              }, [
                createBaseVNode("span", {
                  class: normalizeClass(["inline-block h-4 w-4 transform rounded-full bg-white transition-transform", dragMode.value ? "translate-x-5" : "translate-x-1"])
                }, null, 2)
              ], 10, _hoisted_6)
            ])
          ]),
          createBaseVNode("div", _hoisted_7, [
            props.definitionMode ? (openBlock(), createElementBlock("div", _hoisted_8, [
              createBaseVNode("div", _hoisted_9, [
                _cache[6] || (_cache[6] = createBaseVNode("div", { class: "mx-auto w-12 h-12 bg-teal-100 dark:bg-teal-800/50 rounded-full flex items-center justify-center mb-4" }, [
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
                createBaseVNode("div", _hoisted_10, [
                  createBaseVNode("p", _hoisted_11, toDisplayString(_ctx.card?.meaning || unref(t)("flashcard.pictionary.noDefinition", "No definition available")), 1)
                ]),
                createBaseVNode("p", _hoisted_12, toDisplayString(unref(t)("flashcard.pictionary.definitionHint", "Guess the word from this definition")), 1)
              ])
            ])) : (openBlock(), createElementBlock(Fragment, { key: 1 }, [
              _ctx.card?.image ? (openBlock(), createElementBlock("div", _hoisted_13, [
                createBaseVNode("img", {
                  src: _ctx.card.image,
                  alt: unref(t)("flashcard.pictionary.imageAlt", "Pictionary image"),
                  class: "max-w-full max-h-40 object-contain rounded-lg shadow-md border border-gray-200 dark:border-dark-bg-mute",
                  onError: handleImageError
                }, null, 40, _hoisted_14),
                imageError.value ? (openBlock(), createElementBlock("div", _hoisted_15, [
                  createBaseVNode("div", _hoisted_16, [
                    _cache[7] || (_cache[7] = createBaseVNode("svg", {
                      class: "mx-auto h-12 w-12 text-gray-400 dark:text-white/50",
                      fill: "none",
                      viewBox: "0 0 24 24",
                      stroke: "currentColor"
                    }, [
                      createBaseVNode("path", {
                        "stroke-linecap": "round",
                        "stroke-linejoin": "round",
                        "stroke-width": "2",
                        d: "M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 16m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z"
                      })
                    ], -1)),
                    createBaseVNode("p", _hoisted_17, toDisplayString(unref(t)("flashcard.image.imageError", "Could not load image.")), 1)
                  ])
                ])) : createCommentVNode("", true)
              ])) : (openBlock(), createElementBlock("div", _hoisted_18, [
                createBaseVNode("div", _hoisted_19, [
                  _cache[8] || (_cache[8] = createBaseVNode("svg", {
                    class: "mx-auto h-16 w-16 text-gray-400 dark:text-white/50",
                    fill: "none",
                    viewBox: "0 0 24 24",
                    stroke: "currentColor"
                  }, [
                    createBaseVNode("path", {
                      "stroke-linecap": "round",
                      "stroke-linejoin": "round",
                      "stroke-width": "2",
                      d: "M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 16m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z"
                    })
                  ], -1)),
                  createBaseVNode("p", _hoisted_20, toDisplayString(unref(t)("flashcard.image.noImage", "No image available for this card.")), 1)
                ])
              ]))
            ], 64))
          ]),
          createBaseVNode("div", _hoisted_21, [
            createBaseVNode("div", _hoisted_22, [
              (openBlock(true), createElementBlock(Fragment, null, renderList(slots.value, (slot, idx) => {
                return openBlock(), createElementBlock("div", { key: idx }, [
                  slot.separator ? (openBlock(), createElementBlock("div", _hoisted_23, toDisplayString(slot.char), 1)) : (openBlock(), createElementBlock("div", {
                    key: 1,
                    class: normalizeClass(["w-10 h-12 sm:w-12 sm:h-14 flex items-center justify-center rounded-md border text-xl sm:text-2xl font-semibold bg-white dark:bg-dark-bg-soft text-gray-900 dark:text-white border-gray-300 dark:border-dark-bg-mute transition-all duration-200", [
                      slot.fixed ? "opacity-90" : "cursor-pointer hover:bg-gray-50 dark:hover:bg-dark-bg-mute hover:border-blue-300 dark:hover:border-blue-600 hover:shadow-sm",
                      dragMode.value && !slot.fixed ? "ring-0" : ""
                    ]]),
                    onClick: ($event) => onSlotClick(idx),
                    onDragover: withModifiers(($event) => onSlotDragOver(idx), ["prevent"]),
                    onDrop: withModifiers(($event) => onSlotDrop(idx, $event), ["prevent"])
                  }, [
                    slot.char ? (openBlock(), createElementBlock("span", _hoisted_25, toDisplayString(slot.char), 1)) : !dragMode.value && isFocused.value && !_ctx.pictionaryAnswered && idx === nextEditableIndex() ? (openBlock(), createElementBlock("span", _hoisted_26)) : (openBlock(), createElementBlock("span", _hoisted_27, " "))
                  ], 42, _hoisted_24))
                ]);
              }), 128))
            ]),
            dragMode.value && !_ctx.pictionaryAnswered ? (openBlock(), createElementBlock("div", _hoisted_28, [
              createBaseVNode("div", _hoisted_29, [
                createBaseVNode("div", _hoisted_30, [
                  withDirectives(createBaseVNode("input", {
                    "onUpdate:modelValue": _cache[0] || (_cache[0] = ($event) => letterQuery.value = $event),
                    type: "text",
                    inputmode: "text",
                    autocomplete: "off",
                    spellcheck: "false",
                    placeholder: unref(t)("common.search", "Search"),
                    class: "w-full px-3 pr-8 py-1.5 text-sm rounded-md border bg-white text-gray-900 border-gray-300 dark:bg-dark-bg-soft dark:text-white dark:border-dark-bg-mute focus:outline-none focus:ring-2 focus:ring-blue-500",
                    onClick: _cache[1] || (_cache[1] = withModifiers(() => {
                    }, ["stop"]))
                  }, null, 8, _hoisted_31), [
                    [vModelText, letterQuery.value]
                  ]),
                  createBaseVNode("button", {
                    type: "button",
                    class: normalizeClass(["absolute right-1.5 top-1/2 -translate-y-1/2 z-10 p-1 rounded text-gray-500 dark:text-white/70 hover:bg-gray-100 dark:hover:bg-white/10", { "opacity-40 pointer-events-none": !letterQuery.value }]),
                    onClick: withModifiers(clearLetterQuery, ["stop"]),
                    "aria-label": unref(t)("common.clear", "Clear"),
                    title: unref(t)("common.clear", "Clear")
                  }, _cache[9] || (_cache[9] = [
                    createBaseVNode("svg", {
                      class: "w-4 h-4",
                      viewBox: "0 0 20 20",
                      fill: "currentColor",
                      "aria-hidden": "true"
                    }, [
                      createBaseVNode("path", {
                        "fill-rule": "evenodd",
                        d: "M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z",
                        "clip-rule": "evenodd"
                      })
                    ], -1)
                  ]), 10, _hoisted_32)
                ])
              ]),
              createBaseVNode("div", _hoisted_33, [
                (openBlock(true), createElementBlock(Fragment, null, renderList(filteredLetterBank.value, (ch) => {
                  return openBlock(), createElementBlock("button", {
                    key: ch,
                    class: "w-8 h-10 sm:w-9 sm:h-11 inline-flex items-center justify-center rounded-md text-base sm:text-lg font-semibold border bg-blue-50 text-blue-700 border-blue-200 dark:bg-dark-bg-soft dark:text-blue-300 dark:border-blue-900/40 hover:shadow transition",
                    draggable: "true",
                    onDragstart: ($event) => onLetterDragStart(ch, $event)
                  }, toDisplayString(ch), 41, _hoisted_34);
                }), 128))
              ])
            ])) : createCommentVNode("", true),
            createBaseVNode("input", {
              ref_key: "hiddenInput",
              ref: hiddenInput,
              type: "text",
              class: "fixed top-0 left-0 w-px h-px opacity-0",
              tabindex: "-1",
              "aria-hidden": "true",
              autocomplete: "off",
              autocapitalize: "off",
              spellcheck: "false",
              inputmode: "text",
              onBeforeinput: withModifiers(handleBeforeInput, ["stop", "prevent"]),
              onInput: withModifiers(handleInput, ["stop", "prevent"]),
              onKeydown: withModifiers(handleKeydown, ["stop", "prevent"]),
              onCompositionstart: onCompositionStart,
              onCompositionupdate: onCompositionUpdate,
              onCompositionend: onCompositionEnd,
              onFocus: _cache[2] || (_cache[2] = ($event) => isFocused.value = true),
              onBlur: onHiddenBlur
            }, null, 544)
          ]),
          _ctx.pictionaryAnswered ? (openBlock(), createElementBlock("div", _hoisted_35, [
            createBaseVNode("div", {
              class: normalizeClass([
                "inline-flex items-center px-3 py-1 rounded-full text-sm font-medium",
                _ctx.pictionaryCorrect ? "bg-green-100 dark:bg-green-900 text-green-800 dark:text-green-300" : "bg-red-100 dark:bg-red-900 text-red-800 dark:text-red-300"
              ])
            }, [
              _ctx.pictionaryCorrect ? (openBlock(), createElementBlock("svg", _hoisted_36, _cache[10] || (_cache[10] = [
                createBaseVNode("path", {
                  "fill-rule": "evenodd",
                  d: "M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z",
                  "clip-rule": "evenodd"
                }, null, -1)
              ]))) : (openBlock(), createElementBlock("svg", _hoisted_37, _cache[11] || (_cache[11] = [
                createBaseVNode("path", {
                  "fill-rule": "evenodd",
                  d: "M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 0 1 1.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 0 1 0-1.414z",
                  "clip-rule": "evenodd"
                }, null, -1)
              ]))),
              createTextVNode(" " + toDisplayString(_ctx.pictionaryCorrect ? unref(t)("common.correct", "Correct") : unref(t)("common.incorrect", "Incorrect")), 1)
            ], 2),
            !_ctx.pictionaryCorrect ? (openBlock(), createElementBlock("div", _hoisted_38, [
              createBaseVNode("p", _hoisted_39, [
                createTextVNode(toDisplayString(unref(t)("flashcard.image.correctAnswer", "Correct answer")) + ": ", 1),
                createBaseVNode("span", _hoisted_40, toDisplayString(_ctx.card?.word), 1)
              ]),
              createBaseVNode("p", _hoisted_41, toDisplayString(_ctx.card?.meaning), 1)
            ])) : (openBlock(), createElementBlock("div", _hoisted_42, [
              createBaseVNode("p", _hoisted_43, toDisplayString(_ctx.card?.meaning), 1)
            ]))
          ])) : createCommentVNode("", true),
          !_ctx.pictionaryAnswered ? (openBlock(), createElementBlock("p", _hoisted_44, toDisplayString(props.definitionMode ? dragMode.value ? unref(t)("flashcard.pictionary.dragInstructionDefinition", "Look at the definition above, drag letters into the boxes, then press Enter to check.") : unref(t)("flashcard.pictionary.instructionDefinition", "Look at the definition above, click the boxes and type to fill in the missing letters. Press Enter to check.") : dragMode.value ? unref(t)("flashcard.pictionary.dragInstruction", "Drag letters into the boxes, then press Enter to check.") : unref(t)("flashcard.pictionary.instruction", "Click the boxes and type to fill in the missing letters. Press Enter to check.")), 1)) : createCommentVNode("", true),
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
const PictionaryMode = /* @__PURE__ */ _export_sfc(_sfc_main, [["__scopeId", "data-v-66235204"]]);
export {
  PictionaryMode as default
};
//# sourceMappingURL=PictionaryMode-ldPMFKO3.js.map
