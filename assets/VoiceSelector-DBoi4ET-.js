const __vite__mapDeps=(i,m=__vite__mapDeps,d=(m.f||(m.f=["assets/VoiceSettingsModal-CPVkC_Xs.js","assets/vendor-DoTKyHPB.js","assets/index-B_vvULnT.js","assets/vendor-toast-D1B2ty4j.js","assets/vendor-toast-jG2HNJHr.css","assets/index-BRxbtR_h.css","assets/VoiceSettingsModal-BRnkiQ7s.css"])))=>i.map(i=>d[i]);
import { e as useVoiceStore, _ as __vitePreload } from "./index-B_vvULnT.js";
import { d as defineComponent, H as useI18n, A as ref, B as computed, I as onMounted, L as onUnmounted, K as watch, c as createElementBlock, v as openBlock, f as createBaseVNode, b as createBlock, e as createCommentVNode, t as toDisplayString, u as unref, n as normalizeClass, i as withModifiers, a as normalizeStyle, F as Fragment, j as renderList, a0 as Teleport, D as defineAsyncComponent } from "./vendor-DoTKyHPB.js";
import "./vendor-toast-D1B2ty4j.js";
const _hoisted_1 = { class: "flex flex-col sm:flex-row sm:items-center space-y-2 sm:space-y-0 sm:space-x-3 md:space-x-4 lg:space-x-4" };
const _hoisted_2 = { class: "text-sm md:text-sm lg:text-base font-medium text-gray-700 dark:text-gray-300" };
const _hoisted_3 = { class: "flex items-center space-x-2" };
const _hoisted_4 = { class: "text-sm md:text-base lg:text-lg" };
const _hoisted_5 = { class: "truncate" };
const _hoisted_6 = { class: "overflow-y-auto max-h-60" };
const _hoisted_7 = ["onClick"];
const _hoisted_8 = { class: "flex items-center space-x-2 min-w-0 flex-1" };
const _hoisted_9 = { class: "text-sm md:text-base lg:text-lg flex-shrink-0" };
const _hoisted_10 = { class: "truncate flex-1" };
const _hoisted_11 = { class: "flex items-center space-x-1 flex-shrink-0" };
const _hoisted_12 = {
  key: 0,
  class: "inline-block w-4 h-4 md:w-4 md:h-4 lg:w-5 lg:h-5 text-blue-600 dark:text-blue-400 flex-shrink-0",
  fill: "currentColor",
  viewBox: "0 0 20 20"
};
const _hoisted_13 = ["onClick"];
const _hoisted_14 = {
  key: 0,
  class: "absolute z-[9999] bottom-full left-1/2 transform -translate-x-1/2 mb-2 px-3 py-2 bg-gray-900 dark:bg-gray-700 text-white text-xs rounded-lg shadow-lg whitespace-nowrap"
};
const _hoisted_15 = ["disabled"];
const _hoisted_16 = {
  key: 0,
  class: "w-4 h-4 md:w-4 md:h-4 lg:w-5 lg:h-5",
  fill: "none",
  stroke: "currentColor",
  viewBox: "0 0 24 24"
};
const _hoisted_17 = {
  key: 1,
  class: "w-4 h-4 md:w-4 md:h-4 lg:w-5 lg:h-5 animate-spin",
  fill: "none",
  viewBox: "0 0 24 24"
};
const _sfc_main = /* @__PURE__ */ defineComponent({
  __name: "VoiceSelector",
  props: {
    showVoiceInfo: { type: Boolean, default: true }
  },
  setup(__props) {
    const VoiceSettingsModal = defineAsyncComponent(() => __vitePreload(() => import("./VoiceSettingsModal-CPVkC_Xs.js"), true ? __vite__mapDeps([0,1,2,3,4,5,6]) : void 0));
    const { t } = useI18n();
    const {
      voiceSettings,
      currentVoiceType,
      setVoiceType,
      updateVoiceSettings,
      resetVoiceSettings,
      playAudio,
      getVoiceTypeOptions,
      getCurrentVoiceInfo,
      loadVoices
    } = useVoiceStore();
    const isTesting = ref(false);
    const showTooltip = ref(false);
    const showDropdown = ref(false);
    const dropdownButton = ref(null);
    const dropdownMenu = ref(null);
    const dropdownContainer = ref(null);
    const showSettingsModal = ref(false);
    const selectedVoiceForSettings = ref(null);
    const voiceOptions = computed(() => getVoiceTypeOptions());
    const currentVoiceInfo = computed(() => getCurrentVoiceInfo());
    const currentVoiceOption = computed(() => {
      return voiceOptions.value.find((option) => option.value === currentVoiceType.value);
    });
    const dropdownStyle = computed(() => {
      if (!showDropdown.value || !dropdownButton.value) {
        return { display: "none" };
      }
      const buttonRect = dropdownButton.value.getBoundingClientRect();
      const viewportWidth = window.innerWidth;
      const dropdownWidth = buttonRect.width;
      let leftPosition = buttonRect.left;
      if (leftPosition + dropdownWidth > viewportWidth) {
        leftPosition = viewportWidth - dropdownWidth - 8;
      }
      if (leftPosition < 8) {
        leftPosition = 8;
      }
      return {
        position: "fixed",
        top: `${buttonRect.bottom + 4}px`,
        left: `${leftPosition}px`,
        width: `${buttonRect.width}px`,
        maxWidth: `${viewportWidth - 16}px`,
        // Ensure it never exceeds viewport width
        zIndex: "9999"
      };
    });
    const handleVoiceChange = (voiceType) => {
      setVoiceType(voiceType);
    };
    const selectVoiceOption = (option) => {
      handleVoiceChange(option.value);
      showDropdown.value = false;
    };
    const testVoice = async () => {
      if (isTesting.value) return;
      isTesting.value = true;
      try {
        let testText = t("voice.testText", "Hello, this is a test of the selected voice.");
        if (currentVoiceType.value === "korean-female" || currentVoiceType.value === "korean-male") {
          testText = t("voice.testTextKorean", "안녕하세요! 이것은 음성 테스트입니다.");
        }
        console.log("Testing voice:", currentVoiceType.value, "with text:", testText);
        await playAudio(testText);
      } catch (error) {
        console.error("Error testing voice:", error);
      } finally {
        isTesting.value = false;
      }
    };
    const openVoiceSettings = (option) => {
      selectedVoiceForSettings.value = option;
      showSettingsModal.value = true;
      showDropdown.value = false;
    };
    const handleSaveVoiceSettings = (payload) => {
      updateVoiceSettings(payload.voiceType, payload.settings);
      showSettingsModal.value = false;
    };
    const handleResetVoiceSettings = (voiceType) => {
      resetVoiceSettings(voiceType);
      const option = voiceOptions.value.find((o) => o.value === voiceType);
      if (option) {
        selectedVoiceForSettings.value = option;
      }
    };
    const handleClickOutside = (event) => {
      if (showDropdown.value) {
        const target = event.target;
        if (dropdownButton.value && !dropdownButton.value.contains(target) && dropdownMenu.value && !dropdownMenu.value.contains(target)) {
          showDropdown.value = false;
        }
      }
    };
    const updateDropdownPosition = () => {
      if (showDropdown.value && dropdownButton.value) {
        const buttonRect = dropdownButton.value.getBoundingClientRect();
        const dropdown = dropdownMenu.value;
        if (dropdown) {
          dropdown.style.top = `${buttonRect.bottom + 4}px`;
          dropdown.style.left = `${buttonRect.left}px`;
          dropdown.style.minWidth = `${buttonRect.width}px`;
        }
      }
    };
    let scrollTimeout = null;
    const handleScroll = () => {
      if (showDropdown.value) {
        if (scrollTimeout) {
          cancelAnimationFrame(scrollTimeout);
        }
        scrollTimeout = requestAnimationFrame(updateDropdownPosition);
      }
    };
    const handleResize = () => {
      if (showDropdown.value) {
        showDropdown.value = false;
      }
    };
    onMounted(() => {
      loadVoices();
      document.addEventListener("click", handleClickOutside);
      window.addEventListener("scroll", handleScroll, true);
      window.addEventListener("resize", handleResize);
    });
    onUnmounted(() => {
      document.removeEventListener("click", handleClickOutside);
      window.removeEventListener("scroll", handleScroll, true);
      window.removeEventListener("resize", handleResize);
      if (scrollTimeout) {
        cancelAnimationFrame(scrollTimeout);
      }
    });
    watch(currentVoiceType, (newType) => {
      console.log("VoiceSelector: Voice type changed to:", newType);
    }, { immediate: true });
    return (_ctx, _cache) => {
      return openBlock(), createElementBlock("div", _hoisted_1, [
        createBaseVNode("span", _hoisted_2, toDisplayString(unref(t)("voice.selector.title", "Voice")), 1),
        createBaseVNode("div", {
          class: "relative w-full sm:w-auto",
          onClick: _cache[1] || (_cache[1] = withModifiers(() => {
          }, ["stop"])),
          ref_key: "dropdownContainer",
          ref: dropdownContainer
        }, [
          createBaseVNode("button", {
            onClick: _cache[0] || (_cache[0] = ($event) => showDropdown.value = !showDropdown.value),
            ref_key: "dropdownButton",
            ref: dropdownButton,
            class: "flex w-full min-w-[240px] sm:min-w-[260px] md:min-w-[280px] lg:min-w-[300px] items-center justify-between px-3 py-2 md:px-3 md:py-2 lg:px-4 lg:py-2.5 bg-white dark:bg-[#0f0f0f] border border-gray-300 dark:border-gray-700 rounded-lg text-sm md:text-sm lg:text-base font-medium text-gray-700 dark:text-gray-300 hover:bg-gray-50 dark:hover:bg-[#0a0a0a] transition-colors"
          }, [
            createBaseVNode("div", _hoisted_3, [
              createBaseVNode("span", _hoisted_4, toDisplayString(currentVoiceOption.value?.icon), 1),
              createBaseVNode("span", _hoisted_5, toDisplayString(currentVoiceOption.value?.label), 1)
            ]),
            (openBlock(), createElementBlock("svg", {
              class: normalizeClass(["w-4 h-4 md:w-4 md:h-4 lg:w-5 lg:h-5 flex-shrink-0", { "rotate-180": showDropdown.value }]),
              fill: "none",
              stroke: "currentColor",
              viewBox: "0 0 24 24"
            }, _cache[5] || (_cache[5] = [
              createBaseVNode("path", {
                "stroke-linecap": "round",
                "stroke-linejoin": "round",
                "stroke-width": "2",
                d: "M19 9l-7 7-7-7"
              }, null, -1)
            ]), 2))
          ], 512)
        ], 512),
        (openBlock(), createBlock(Teleport, { to: "body" }, [
          showDropdown.value ? (openBlock(), createElementBlock("div", {
            key: 0,
            ref_key: "dropdownMenu",
            ref: dropdownMenu,
            style: normalizeStyle(dropdownStyle.value),
            class: "bg-white dark:bg-[#0f0f0f] border border-gray-300 dark:border-gray-700 rounded-lg shadow-lg max-h-60 overflow-hidden z-[9998] min-w-[240px] sm:min-w-[260px] md:min-w-[280px] lg:min-w-[300px]"
          }, [
            createBaseVNode("div", _hoisted_6, [
              (openBlock(true), createElementBlock(Fragment, null, renderList(voiceOptions.value, (option) => {
                return openBlock(), createElementBlock("div", {
                  key: option.value,
                  onClick: ($event) => selectVoiceOption(option),
                  class: normalizeClass([
                    "flex items-center justify-between gap-2 px-3 py-2 md:px-3 md:py-2 lg:px-4 lg:py-2.5 text-left text-sm md:text-sm lg:text-base transition-colors cursor-pointer",
                    unref(currentVoiceType) === option.value ? "bg-blue-50 dark:bg-[#2d3436] text-blue-600 dark:text-blue-400" : "text-gray-700 dark:text-gray-300 hover:bg-gray-50 dark:hover:bg-gray-800"
                  ])
                }, [
                  createBaseVNode("div", _hoisted_8, [
                    createBaseVNode("span", _hoisted_9, toDisplayString(option.icon), 1),
                    createBaseVNode("span", _hoisted_10, toDisplayString(option.label), 1)
                  ]),
                  createBaseVNode("div", _hoisted_11, [
                    unref(currentVoiceType) === option.value ? (openBlock(), createElementBlock("svg", _hoisted_12, _cache[6] || (_cache[6] = [
                      createBaseVNode("path", {
                        "fill-rule": "evenodd",
                        d: "M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z",
                        "clip-rule": "evenodd"
                      }, null, -1)
                    ]))) : createCommentVNode("", true),
                    createBaseVNode("button", {
                      onClick: withModifiers(($event) => openVoiceSettings(option), ["stop"]),
                      class: "inline-block p-1 md:p-1 lg:p-1.5 rounded-full hover:bg-gray-200 dark:hover:bg-gray-500 flex-shrink-0"
                    }, _cache[7] || (_cache[7] = [
                      createBaseVNode("svg", {
                        class: "inline-block w-3 h-3 sm:w-4 sm:h-4 md:w-4 md:h-4 lg:w-4 lg:h-4 text-gray-500 dark:text-gray-400",
                        fill: "none",
                        stroke: "currentColor",
                        viewBox: "0 0 24 24"
                      }, [
                        createBaseVNode("path", {
                          "stroke-linecap": "round",
                          "stroke-linejoin": "round",
                          "stroke-width": "2",
                          d: "M10.325 4.317c.426-1.756 2.924-1.756 3.35 0a1.724 1.724 0 002.573 1.066c1.543-.94 3.31.826 2.37 2.37a1.724 1.724 0 001.065 2.572c1.756.426 1.756 2.924 0 3.35a1.724 1.724 0 00-1.066 2.573c.94 1.543-.826 3.31-2.37 2.37a1.724 1.724 0 00-2.572 1.065c-.426 1.756-2.924 1.756-3.35 0a1.724 1.724 0 00-2.573-1.066c-1.543.94-3.31-.826-2.37-2.37a1.724 1.724 0 00-1.065-2.572c-1.756-.426-1.756-2.924 0-3.35a1.724 1.724 0 001.066-2.573c-.94-1.543.826-3.31 2.37-2.37.996.608 2.296.07 2.572-1.065z"
                        }),
                        createBaseVNode("path", {
                          "stroke-linecap": "round",
                          "stroke-linejoin": "round",
                          "stroke-width": "2",
                          d: "M15 12a3 3 0 11-6 0 3 3 0 016 0z"
                        })
                      ], -1)
                    ]), 8, _hoisted_13)
                  ])
                ], 10, _hoisted_7);
              }), 128))
            ])
          ], 4)) : createCommentVNode("", true)
        ])),
        _ctx.showVoiceInfo && currentVoiceInfo.value ? (openBlock(), createElementBlock("div", {
          key: 0,
          class: "relative",
          onMouseenter: _cache[2] || (_cache[2] = ($event) => showTooltip.value = true),
          onMouseleave: _cache[3] || (_cache[3] = ($event) => showTooltip.value = false)
        }, [
          _cache[9] || (_cache[9] = createBaseVNode("button", { class: "p-2 text-gray-500 dark:text-gray-400 hover:text-gray-700 dark:hover:text-gray-200 transition-colors" }, [
            createBaseVNode("svg", {
              class: "w-4 h-4",
              fill: "currentColor",
              viewBox: "0 0 20 20"
            }, [
              createBaseVNode("path", {
                "fill-rule": "evenodd",
                d: "M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7-4a1 1 0 11-2 0 1 1 0 012 0zM9 9a1 1 0 000 2v3a1 1 0 001 1h1a1 1 0 100-2v-3a1 1 0 00-1-1H9z",
                "clip-rule": "evenodd"
              })
            ])
          ], -1)),
          showTooltip.value ? (openBlock(), createElementBlock("div", _hoisted_14, [
            createBaseVNode("div", null, toDisplayString(unref(t)("voice.info.name")) + ": " + toDisplayString(currentVoiceInfo.value.name), 1),
            createBaseVNode("div", null, toDisplayString(unref(t)("voice.info.language")) + ": " + toDisplayString(currentVoiceInfo.value.lang), 1),
            createBaseVNode("div", null, toDisplayString(unref(t)("voice.info.gender")) + ": " + toDisplayString(unref(t)(`voice.gender.${currentVoiceInfo.value.gender}`)), 1),
            _cache[8] || (_cache[8] = createBaseVNode("div", { class: "absolute top-full left-1/2 transform -translate-x-1/2 border-4 border-transparent border-t-gray-900 dark:border-t-gray-700" }, null, -1))
          ])) : createCommentVNode("", true)
        ], 32)) : createCommentVNode("", true),
        createBaseVNode("button", {
          onClick: testVoice,
          disabled: isTesting.value,
          class: "flex items-center space-x-1 px-3 py-2 md:px-3 md:py-2 lg:px-4 lg:py-2.5 text-sm md:text-sm lg:text-base bg-blue-500 hover:bg-blue-600 disabled:bg-gray-400 text-white rounded-lg transition-colors w-full sm:w-auto"
        }, [
          !isTesting.value ? (openBlock(), createElementBlock("svg", _hoisted_16, _cache[10] || (_cache[10] = [
            createBaseVNode("path", {
              "stroke-linecap": "round",
              "stroke-linejoin": "round",
              "stroke-width": "2",
              d: "M15.536 8.464a5 5 0 010 7.072m2.828-9.9a9 9 0 010 14.142M9 9a3 3 0 000 6v-6z"
            }, null, -1)
          ]))) : (openBlock(), createElementBlock("svg", _hoisted_17, _cache[11] || (_cache[11] = [
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
          ]))),
          createBaseVNode("span", null, toDisplayString(isTesting.value ? unref(t)("voice.testing", "Testing...") : unref(t)("voice.test", "Test Voice")), 1)
        ], 8, _hoisted_15),
        (openBlock(), createBlock(Teleport, { to: "body" }, [
          showSettingsModal.value && selectedVoiceForSettings.value ? (openBlock(), createBlock(unref(VoiceSettingsModal), {
            key: 0,
            show: showSettingsModal.value,
            "voice-type": selectedVoiceForSettings.value.value,
            "voice-name": selectedVoiceForSettings.value.label,
            "initial-settings": unref(voiceSettings)[selectedVoiceForSettings.value.value],
            onClose: _cache[4] || (_cache[4] = ($event) => showSettingsModal.value = false),
            onSave: handleSaveVoiceSettings,
            onReset: handleResetVoiceSettings
          }, null, 8, ["show", "voice-type", "voice-name", "initial-settings"])) : createCommentVNode("", true)
        ]))
      ]);
    };
  }
});
export {
  _sfc_main as default
};
//# sourceMappingURL=VoiceSelector-DBoi4ET-.js.map
