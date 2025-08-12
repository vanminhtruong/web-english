import { d as defineComponent, H as useI18n, A as ref, B as computed, c as createElementBlock, v as openBlock, f as createBaseVNode, t as toDisplayString, u as unref, n as normalizeClass, e as createCommentVNode } from "./vendor-DoTKyHPB.js";
const _hoisted_1 = { class: "bg-white dark:bg-[#0a0a0a] rounded-lg shadow border border-gray-200 dark:border-gray-700 p-3 sm:p-4 md:p-5 lg:p-6 mb-4 sm:mb-6 overflow-hidden" };
const _hoisted_2 = { class: "flex flex-col lg:flex-row lg:items-center lg:justify-between space-y-4 lg:space-y-0 min-w-0" };
const _hoisted_3 = { class: "flex flex-col sm:flex-row sm:items-center space-y-3 sm:space-y-0 sm:space-x-4 md:space-x-5 lg:space-x-6 min-w-0 flex-1" };
const _hoisted_4 = { class: "flex items-center space-x-2 md:space-x-3" };
const _hoisted_5 = { class: "text-sm md:text-base lg:text-base font-medium text-gray-700 dark:text-gray-300" };
const _hoisted_6 = { class: "text-sm md:text-base lg:text-base text-gray-600 dark:text-gray-400" };
const _hoisted_7 = { class: "flex flex-wrap items-center gap-2 sm:gap-2 md:gap-3 lg:gap-3 min-w-0" };
const _hoisted_8 = ["disabled"];
const _hoisted_9 = {
  key: 0,
  class: "animate-spin h-4 w-4",
  fill: "none",
  viewBox: "0 0 24 24"
};
const _hoisted_10 = {
  key: 1,
  class: "h-4 w-4",
  fill: "none",
  stroke: "currentColor",
  viewBox: "0 0 24 24"
};
const _hoisted_11 = { class: "hidden sm:inline" };
const _hoisted_12 = { class: "sm:hidden" };
const _hoisted_13 = { class: "hidden sm:inline" };
const _hoisted_14 = { class: "sm:hidden" };
const _hoisted_15 = { class: "relative" };
const _hoisted_16 = { class: "hidden sm:inline" };
const _hoisted_17 = { class: "sm:hidden" };
const _hoisted_18 = { class: "flex flex-col md:flex-row md:items-center space-y-2 md:space-y-0 md:space-x-4 lg:space-x-6 text-xs sm:text-sm md:text-sm lg:text-base text-gray-500 dark:text-gray-400" };
const _hoisted_19 = { class: "flex items-center space-x-1" };
const _hoisted_20 = { class: "truncate" };
const _hoisted_21 = { class: "flex items-center space-x-1" };
const _sfc_main = /* @__PURE__ */ defineComponent({
  __name: "SaveControlPanel",
  props: {
    autoSaveEnabled: { type: Boolean },
    isSaving: { type: Boolean },
    hasAutoSaveFile: { type: Boolean },
    lastSaveTime: {},
    saveStatusColor: {},
    saveStatusText: {},
    autoSaveFilePath: {}
  },
  emits: [
    "update:autoSaveEnabled",
    "manual-save",
    "setup-auto-save",
    "reset-auto-save",
    "import-file"
  ],
  setup(__props, { emit: __emit }) {
    const props = __props;
    const emit = __emit;
    const { t } = useI18n();
    const fileInputRef = ref(null);
    const formattedLastSave = computed(() => {
      const notSaved = t("vocabulary.save.notSaved", "Not saved");
      if (!props.lastSaveTime) {
        return notSaved;
      }
      const result = t("vocabulary.save.lastSave", { time: props.lastSaveTime }, "Last save: {time}");
      if (result && result.includes("{time}")) {
        return result.replace("{time}", props.lastSaveTime);
      }
      return result || `Last save: ${props.lastSaveTime}`;
    });
    const openFilePicker = () => {
      fileInputRef.value?.click();
    };
    const handleFileSelected = (event) => {
      const target = event.target;
      if (target.files && target.files.length > 0) {
        emit("import-file", target.files[0]);
        target.value = "";
      }
    };
    return (_ctx, _cache) => {
      return openBlock(), createElementBlock("div", _hoisted_1, [
        createBaseVNode("div", _hoisted_2, [
          createBaseVNode("div", _hoisted_3, [
            createBaseVNode("div", _hoisted_4, [
              createBaseVNode("span", _hoisted_5, toDisplayString(unref(t)("vocabulary.save.mode", "Save Mode")), 1),
              createBaseVNode("button", {
                onClick: _cache[0] || (_cache[0] = ($event) => emit("update:autoSaveEnabled", !_ctx.autoSaveEnabled)),
                class: normalizeClass([
                  "relative  inline-flex h-6 w-11 items-center rounded-full transition-colors",
                  _ctx.autoSaveEnabled ? "bg-blue-600" : "bg-gray-200 dark:bg-gray-600"
                ])
              }, [
                createBaseVNode("span", {
                  class: normalizeClass([
                    "inline-block h-4 w-4 transform rounded-full bg-white transition-transform",
                    _ctx.autoSaveEnabled ? "translate-x-6" : "translate-x-1"
                  ])
                }, null, 2)
              ], 2),
              createBaseVNode("span", _hoisted_6, toDisplayString(_ctx.autoSaveEnabled ? unref(t)("vocabulary.save.auto", "Auto") : unref(t)("vocabulary.save.manual", "Manual")), 1)
            ]),
            createBaseVNode("div", _hoisted_7, [
              !_ctx.autoSaveEnabled ? (openBlock(), createElementBlock("button", {
                key: 0,
                onClick: _cache[1] || (_cache[1] = ($event) => emit("manual-save")),
                disabled: _ctx.isSaving,
                class: "px-3 py-1.5 sm:px-4 sm:py-2 md:px-4 md:py-2 lg:px-5 lg:py-2.5 bg-green-500 hover:bg-green-600 disabled:bg-gray-400 text-white text-xs sm:text-sm md:text-sm lg:text-base font-medium rounded-lg transition-colors flex items-center space-x-1 sm:space-x-2"
              }, [
                _ctx.isSaving ? (openBlock(), createElementBlock("svg", _hoisted_9, _cache[4] || (_cache[4] = [
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
                ]))) : (openBlock(), createElementBlock("svg", _hoisted_10, _cache[5] || (_cache[5] = [
                  createBaseVNode("path", {
                    "stroke-linecap": "round",
                    "stroke-linejoin": "round",
                    "stroke-width": "2",
                    d: "M8 7H5a2 2 0 00-2 2v9a2 2 0 002 2h14a2 2 0 002-2V9a2 2 0 00-2-2h-3m-1 4l-3-3m0 0l-3 3m3-3v12"
                  }, null, -1)
                ]))),
                createBaseVNode("span", null, toDisplayString(_ctx.isSaving ? unref(t)("common.saving", "Saving...") : unref(t)("vocabulary.save.saveNow", "Save Now")), 1)
              ], 8, _hoisted_8)) : createCommentVNode("", true),
              _ctx.autoSaveEnabled && !_ctx.hasAutoSaveFile ? (openBlock(), createElementBlock("button", {
                key: 1,
                onClick: _cache[2] || (_cache[2] = ($event) => emit("setup-auto-save")),
                class: "px-3 py-1.5 sm:px-4 sm:py-2 md:px-4 md:py-2 lg:px-5 lg:py-2.5 bg-orange-500 hover:bg-orange-600 text-white text-xs sm:text-sm md:text-sm lg:text-base font-medium rounded-lg transition-colors flex items-center space-x-1 sm:space-x-2"
              }, [
                _cache[6] || (_cache[6] = createBaseVNode("svg", {
                  class: "h-3 w-3 sm:h-4 sm:w-4 md:h-4 md:w-4 lg:h-5 lg:w-5",
                  fill: "none",
                  stroke: "currentColor",
                  viewBox: "0 0 24 24"
                }, [
                  createBaseVNode("path", {
                    "stroke-linecap": "round",
                    "stroke-linejoin": "round",
                    "stroke-width": "2",
                    d: "M12 6v6m0 0v6m0-6h6m-6 0H6"
                  })
                ], -1)),
                createBaseVNode("span", _hoisted_11, toDisplayString(unref(t)("vocabulary.save.chooseAutoFile", "Choose Auto File")), 1),
                createBaseVNode("span", _hoisted_12, toDisplayString(unref(t)("vocabulary.save.setup", "Setup")), 1)
              ])) : createCommentVNode("", true),
              _ctx.autoSaveEnabled && _ctx.hasAutoSaveFile ? (openBlock(), createElementBlock("button", {
                key: 2,
                onClick: _cache[3] || (_cache[3] = ($event) => emit("reset-auto-save")),
                class: "px-3 py-1.5 sm:px-4 sm:py-2 md:px-4 md:py-2 lg:px-5 lg:py-2.5 bg-gray-500 hover:bg-gray-600 text-white text-xs sm:text-sm md:text-sm lg:text-base font-medium rounded-lg transition-colors flex items-center space-x-1 sm:space-x-2"
              }, [
                _cache[7] || (_cache[7] = createBaseVNode("svg", {
                  class: "h-4 w-4 md:h-4 md:w-4 lg:h-5 lg:w-5",
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
                createBaseVNode("span", _hoisted_13, toDisplayString(unref(t)("vocabulary.save.changeAutoFile", "Change Auto File")), 1),
                createBaseVNode("span", _hoisted_14, toDisplayString(unref(t)("vocabulary.save.change", "Change")), 1)
              ])) : createCommentVNode("", true),
              createBaseVNode("div", _hoisted_15, [
                createBaseVNode("input", {
                  ref_key: "fileInputRef",
                  ref: fileInputRef,
                  type: "file",
                  accept: ".json",
                  onChange: handleFileSelected,
                  class: "hidden"
                }, null, 544),
                createBaseVNode("button", {
                  onClick: openFilePicker,
                  class: "px-3 py-1.5 sm:px-4 sm:py-2 md:px-4 md:py-2 lg:px-5 lg:py-2.5 bg-blue-500 hover:bg-blue-600 text-white text-xs sm:text-sm md:text-sm lg:text-base font-medium rounded-lg transition-colors flex items-center space-x-1 sm:space-x-2"
                }, [
                  _cache[8] || (_cache[8] = createBaseVNode("svg", {
                    class: "h-4 w-4 md:h-4 md:w-4 lg:h-5 lg:w-5",
                    fill: "none",
                    stroke: "currentColor",
                    viewBox: "0 0 24 24"
                  }, [
                    createBaseVNode("path", {
                      "stroke-linecap": "round",
                      "stroke-linejoin": "round",
                      "stroke-width": "2",
                      d: "M7 16a4 4 0 01-.88-7.903A5 5 0 1115.9 6L16 6a5 5 0 011 9.9M9 19l3 3m0 0l3-3m-3 3V10"
                    })
                  ], -1)),
                  createBaseVNode("span", _hoisted_16, toDisplayString(unref(t)("vocabulary.save.importFile", "Import File")), 1),
                  createBaseVNode("span", _hoisted_17, toDisplayString(unref(t)("vocabulary.save.importShort", "Import")), 1)
                ])
              ])
            ])
          ]),
          createBaseVNode("div", _hoisted_18, [
            createBaseVNode("div", _hoisted_19, [
              _cache[9] || (_cache[9] = createBaseVNode("svg", {
                class: "h-3 w-3 sm:h-4 sm:w-4 md:h-4 md:w-4 lg:h-5 lg:w-5",
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
              createBaseVNode("span", _hoisted_20, toDisplayString(formattedLastSave.value), 1)
            ]),
            createBaseVNode("div", _hoisted_21, [
              createBaseVNode("div", {
                class: normalizeClass(["h-2 w-2 rounded-full", _ctx.saveStatusColor])
              }, null, 2),
              createBaseVNode("span", null, toDisplayString(_ctx.saveStatusText), 1)
            ]),
            createCommentVNode("", true)
          ])
        ])
      ]);
    };
  }
});
export {
  _sfc_main as default
};
//# sourceMappingURL=SaveControlPanel-BvhjFnL-.js.map
