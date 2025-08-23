import { d as defineComponent, H as useI18n, A as ref, K as watch, I as onMounted, B as computed, c as createElementBlock, v as openBlock, f as createBaseVNode, t as toDisplayString, u as unref, n as normalizeClass, e as createCommentVNode, g as createTextVNode } from "./vendor-BIIJCJs6.js";
const _hoisted_1 = { class: "bg-white dark:bg-[#0a0a0a] rounded-xl shadow-lg border border-gray-200 dark:border-[#0f0f0f] mb-6 overflow-hidden" };
const _hoisted_2 = { class: "bg-gradient-to-r from-blue-50 to-indigo-50 dark:from-[#0f0f0f] dark:to-[#0a0a0a] px-3 xs:px-4 sm:px-6 py-3 xs:py-4 border-b border-gray-200 dark:border-[#0f0f0f]" };
const _hoisted_3 = { class: "block sm:hidden" };
const _hoisted_4 = { class: "flex items-center justify-between mb-3" };
const _hoisted_5 = { class: "flex items-center space-x-2" };
const _hoisted_6 = { class: "text-base xs:text-lg font-semibold text-gray-900 dark:text-white" };
const _hoisted_7 = { class: "flex items-center justify-between" };
const _hoisted_8 = { class: "text-xs xs:text-sm text-gray-500 dark:text-gray-400 flex-1 pr-2" };
const _hoisted_9 = { class: "text-xs font-medium text-gray-600 dark:text-gray-400 flex-shrink-0" };
const _hoisted_10 = { class: "hidden sm:block" };
const _hoisted_11 = { class: "flex items-center justify-between" };
const _hoisted_12 = { class: "flex items-center space-x-3" };
const _hoisted_13 = { class: "text-lg font-semibold text-gray-900 dark:text-white" };
const _hoisted_14 = { class: "text-sm text-gray-500 dark:text-gray-400" };
const _hoisted_15 = { class: "flex items-center space-x-3" };
const _hoisted_16 = { class: "text-sm font-medium text-gray-600 dark:text-gray-400" };
const _hoisted_17 = { class: "p-3 xs:p-4 sm:p-6" };
const _hoisted_18 = { class: "grid grid-cols-1 lg:grid-cols-3 gap-6 xs:gap-8 sm:gap-10" };
const _hoisted_19 = { class: "lg:col-span-2 space-y-4 xs:space-y-6" };
const _hoisted_20 = {
  key: 0,
  class: "bg-green-50 dark:bg-green-900/10 border border-green-200 dark:border-green-800 rounded-lg p-3 xs:p-4"
};
const _hoisted_21 = { class: "text-xs xs:text-sm font-medium text-green-800 dark:text-green-400 mb-2 xs:mb-3" };
const _hoisted_22 = ["disabled"];
const _hoisted_23 = {
  key: 0,
  class: "animate-spin h-3 xs:h-4 w-3 xs:w-4",
  fill: "none",
  viewBox: "0 0 24 24"
};
const _hoisted_24 = {
  key: 1,
  class: "h-3 xs:h-4 w-3 xs:w-4",
  fill: "none",
  stroke: "currentColor",
  viewBox: "0 0 24 24"
};
const _hoisted_25 = {
  key: 1,
  class: "bg-blue-50 dark:bg-blue-900/10 border border-blue-200 dark:border-blue-800 rounded-lg p-3 xs:p-4"
};
const _hoisted_26 = { class: "text-xs xs:text-sm font-medium text-blue-800 dark:text-blue-400 mb-2 xs:mb-3" };
const _hoisted_27 = { class: "mb-3 xs:mb-4" };
const _hoisted_28 = { class: "block text-xs font-medium text-gray-700 dark:text-gray-300 mb-1.5 xs:mb-2" };
const _hoisted_29 = ["value"];
const _hoisted_30 = { value: "local" };
const _hoisted_31 = { value: "google-drive" };
const _hoisted_32 = { class: "space-y-1.5 xs:space-y-2" };
const _hoisted_33 = { class: "bg-purple-50 dark:bg-purple-900/10 border border-purple-200 dark:border-purple-800 rounded-lg p-3 xs:p-4" };
const _hoisted_34 = { class: "text-xs xs:text-sm font-medium text-purple-800 dark:text-purple-400 mb-2 xs:mb-3" };
const _hoisted_35 = { class: "space-y-2 xs:space-y-2.5" };
const _hoisted_36 = { class: "relative" };
const _hoisted_37 = { class: "space-y-3 xs:space-y-4" };
const _hoisted_38 = { class: "bg-gray-50 dark:bg-[#0f0f0f] border border-gray-200 dark:border-[#0f0f0f] rounded-lg p-3 xs:p-4" };
const _hoisted_39 = { class: "text-xs xs:text-sm font-medium text-gray-800 dark:text-gray-200 mb-2 xs:mb-3" };
const _hoisted_40 = { class: "space-y-2 xs:space-y-3" };
const _hoisted_41 = { class: "flex items-center space-x-1.5 xs:space-x-2" };
const _hoisted_42 = { class: "text-xs xs:text-sm text-gray-600 dark:text-gray-400" };
const _hoisted_43 = { class: "flex items-center space-x-1.5 xs:space-x-2 text-xs xs:text-sm text-gray-500 dark:text-gray-400" };
const _hoisted_44 = { class: "truncate" };
const _hoisted_45 = {
  key: 0,
  class: "bg-indigo-50 dark:bg-indigo-900/10 border border-indigo-200 dark:border-indigo-800 rounded-lg p-3 xs:p-4"
};
const _hoisted_46 = { class: "text-xs xs:text-sm font-medium text-indigo-800 dark:text-indigo-400 mb-2 xs:mb-3" };
const _hoisted_47 = { class: "text-xs xs:text-sm text-gray-600 dark:text-gray-400" };
const _hoisted_48 = { class: "mb-1.5 xs:mb-2" };
const _hoisted_49 = { class: "font-medium" };
const _hoisted_50 = {
  key: 0,
  class: "text-xs text-green-600 dark:text-green-400"
};
const _hoisted_51 = {
  key: 1,
  class: "space-y-1"
};
const _hoisted_52 = { class: "text-xs text-green-600 dark:text-green-400" };
const _hoisted_53 = {
  key: 0,
  class: "text-xs text-gray-600 dark:text-gray-400"
};
const _hoisted_54 = { class: "font-medium" };
const _hoisted_55 = {
  key: 1,
  class: "text-xs text-yellow-600 dark:text-yellow-400"
};
const AUTO_SAVE_KEY = "vocabulary-auto-save-enabled";
const STORAGE_TYPE_KEY = "vocabulary-storage-type";
const HAS_AUTO_SAVE_FILE_KEY = "vocabulary-has-auto-save-file";
const HAS_GOOGLE_DRIVE_FILE_KEY = "vocabulary-has-google-drive-file";
const IS_GOOGLE_SIGNED_IN_KEY = "vocabulary-is-google-signed-in";
const AUTO_SAVE_FILE_PATH_KEY = "vocabulary-auto-save-file-path";
const _sfc_main = /* @__PURE__ */ defineComponent({
  __name: "SaveControlPanel",
  props: {
    autoSaveEnabled: { type: Boolean },
    isSaving: { type: Boolean },
    hasAutoSaveFile: { type: Boolean },
    hasGoogleDriveFile: { type: Boolean },
    isGoogleSignedIn: { type: Boolean },
    googleUserEmail: {},
    lastSaveTime: {},
    saveStatusColor: {},
    saveStatusText: {},
    autoSaveFilePath: {},
    storageType: {}
  },
  emits: [
    "update:autoSaveEnabled",
    "update:storageType",
    "update:hasAutoSaveFile",
    "update:hasGoogleDriveFile",
    "update:isGoogleSignedIn",
    "update:autoSaveFilePath",
    "manual-save",
    "setup-auto-save",
    "reset-auto-save",
    "import-file",
    "google-sign-in",
    "google-sign-out",
    "setup-google-drive",
    "sync-from-google-drive"
  ],
  setup(__props, { emit: __emit }) {
    const props = __props;
    const emit = __emit;
    const { t } = useI18n();
    const fileInputRef = ref(null);
    const loadAutoSaveEnabled = () => {
      try {
        const saved = localStorage.getItem(AUTO_SAVE_KEY);
        return saved !== null ? JSON.parse(saved) : null;
      } catch (error) {
        console.warn("Failed to load auto save setting from localStorage:", error);
        return null;
      }
    };
    const saveAutoSaveEnabled = (enabled) => {
      try {
        localStorage.setItem(AUTO_SAVE_KEY, JSON.stringify(enabled));
      } catch (error) {
        console.warn("Failed to save auto save setting to localStorage:", error);
      }
    };
    const loadStorageType = () => {
      try {
        const saved = localStorage.getItem(STORAGE_TYPE_KEY);
        if (saved && (saved === "local" || saved === "google-drive")) {
          return saved;
        }
        return null;
      } catch (error) {
        console.warn("Failed to load storage type from localStorage:", error);
        return null;
      }
    };
    const saveStorageType = (type) => {
      try {
        localStorage.setItem(STORAGE_TYPE_KEY, type);
      } catch (error) {
        console.warn("Failed to save storage type to localStorage:", error);
      }
    };
    const loadHasAutoSaveFile = () => {
      try {
        const saved = localStorage.getItem(HAS_AUTO_SAVE_FILE_KEY);
        return saved !== null ? JSON.parse(saved) : null;
      } catch (error) {
        console.warn("Failed to load auto save file state from localStorage:", error);
        return null;
      }
    };
    const saveHasAutoSaveFile = (hasFile) => {
      try {
        localStorage.setItem(HAS_AUTO_SAVE_FILE_KEY, JSON.stringify(hasFile));
      } catch (error) {
        console.warn("Failed to save auto save file state to localStorage:", error);
      }
    };
    const loadHasGoogleDriveFile = () => {
      try {
        const saved = localStorage.getItem(HAS_GOOGLE_DRIVE_FILE_KEY);
        return saved !== null ? JSON.parse(saved) : null;
      } catch (error) {
        console.warn("Failed to load Google Drive file state from localStorage:", error);
        return null;
      }
    };
    const saveHasGoogleDriveFile = (hasFile) => {
      try {
        localStorage.setItem(HAS_GOOGLE_DRIVE_FILE_KEY, JSON.stringify(hasFile));
      } catch (error) {
        console.warn("Failed to save Google Drive file state to localStorage:", error);
      }
    };
    const loadIsGoogleSignedIn = () => {
      try {
        const saved = localStorage.getItem(IS_GOOGLE_SIGNED_IN_KEY);
        return saved !== null ? JSON.parse(saved) : null;
      } catch (error) {
        console.warn("Failed to load Google sign-in state from localStorage:", error);
        return null;
      }
    };
    const saveIsGoogleSignedIn = (isSignedIn) => {
      try {
        localStorage.setItem(IS_GOOGLE_SIGNED_IN_KEY, JSON.stringify(isSignedIn));
      } catch (error) {
        console.warn("Failed to save Google sign-in state to localStorage:", error);
      }
    };
    const loadAutoSaveFilePath = () => {
      try {
        return localStorage.getItem(AUTO_SAVE_FILE_PATH_KEY);
      } catch (error) {
        console.warn("Failed to load auto save file path from localStorage:", error);
        return null;
      }
    };
    const saveAutoSaveFilePath = (filePath) => {
      try {
        localStorage.setItem(AUTO_SAVE_FILE_PATH_KEY, filePath);
      } catch (error) {
        console.warn("Failed to save auto save file path to localStorage:", error);
      }
    };
    watch(
      () => props.autoSaveEnabled,
      (newValue) => {
        saveAutoSaveEnabled(newValue);
      }
    );
    watch(
      () => props.storageType,
      (newValue) => {
        saveStorageType(newValue);
      }
    );
    watch(
      () => props.hasAutoSaveFile,
      (newValue) => {
        saveHasAutoSaveFile(newValue);
      }
    );
    watch(
      () => props.hasGoogleDriveFile,
      (newValue) => {
        saveHasGoogleDriveFile(newValue);
      }
    );
    watch(
      () => props.isGoogleSignedIn,
      (newValue) => {
        saveIsGoogleSignedIn(newValue);
      }
    );
    watch(
      () => props.autoSaveFilePath,
      (newValue) => {
        if (newValue) {
          saveAutoSaveFilePath(newValue);
        }
      }
    );
    onMounted(() => {
      const savedAutoSave = loadAutoSaveEnabled();
      const savedStorageType = loadStorageType();
      const savedHasAutoSaveFile = loadHasAutoSaveFile();
      const savedHasGoogleDriveFile = loadHasGoogleDriveFile();
      const savedIsGoogleSignedIn = loadIsGoogleSignedIn();
      const savedAutoSaveFilePath = loadAutoSaveFilePath();
      if (savedAutoSave !== null && savedAutoSave !== props.autoSaveEnabled) {
        emit("update:autoSaveEnabled", savedAutoSave);
      }
      if (savedStorageType !== null && savedStorageType !== props.storageType) {
        emit("update:storageType", savedStorageType);
      }
      if (savedHasAutoSaveFile !== null && savedHasAutoSaveFile !== props.hasAutoSaveFile) {
        emit("update:hasAutoSaveFile", savedHasAutoSaveFile);
      }
      if (savedHasGoogleDriveFile !== null && savedHasGoogleDriveFile !== props.hasGoogleDriveFile) {
        emit("update:hasGoogleDriveFile", savedHasGoogleDriveFile);
      }
      if (savedIsGoogleSignedIn !== null && savedIsGoogleSignedIn !== props.isGoogleSignedIn) {
        emit("update:isGoogleSignedIn", savedIsGoogleSignedIn);
      }
      if (savedAutoSaveFilePath !== null && savedAutoSaveFilePath !== props.autoSaveFilePath) {
        emit("update:autoSaveFilePath", savedAutoSaveFilePath);
      }
    });
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
    const handleStorageTypeChange = (event) => {
      const target = event.target;
      emit("update:storageType", target.value);
    };
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
      return openBlock(), createElementBlock("div", null, [
        createBaseVNode("div", _hoisted_1, [
          createBaseVNode("div", _hoisted_2, [
            createBaseVNode("div", _hoisted_3, [
              createBaseVNode("div", _hoisted_4, [
                createBaseVNode("div", _hoisted_5, [
                  _cache[8] || (_cache[8] = createBaseVNode("div", { class: "p-1.5 bg-blue-100 dark:bg-blue-900/20 rounded-lg" }, [
                    createBaseVNode("svg", {
                      class: "h-4 w-4 text-blue-600 dark:text-blue-400",
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
                    ])
                  ], -1)),
                  createBaseVNode("div", null, [
                    createBaseVNode("h3", _hoisted_6, toDisplayString(unref(t)("vocabulary.save.title", "Save & Sync")), 1)
                  ])
                ]),
                createBaseVNode("button", {
                  onClick: _cache[0] || (_cache[0] = ($event) => emit("update:autoSaveEnabled", !_ctx.autoSaveEnabled)),
                  class: normalizeClass([
                    "relative inline-flex h-5 w-9 items-center rounded-full transition-colors duration-200 flex-shrink-0",
                    _ctx.autoSaveEnabled ? "bg-blue-600" : "bg-gray-200 dark:bg-gray-600"
                  ])
                }, [
                  createBaseVNode("span", {
                    class: normalizeClass([
                      "inline-block h-3 w-3 transform rounded-full bg-white transition-transform duration-200",
                      _ctx.autoSaveEnabled ? "translate-x-5" : "translate-x-1"
                    ])
                  }, null, 2)
                ], 2)
              ]),
              createBaseVNode("div", _hoisted_7, [
                createBaseVNode("p", _hoisted_8, toDisplayString(unref(t)("vocabulary.save.subtitle", "Manage your vocabulary data storage")), 1),
                createBaseVNode("span", _hoisted_9, toDisplayString(_ctx.autoSaveEnabled ? unref(t)("vocabulary.save.auto", "Auto") : unref(t)("vocabulary.save.manual", "Manual")), 1)
              ])
            ]),
            createBaseVNode("div", _hoisted_10, [
              createBaseVNode("div", _hoisted_11, [
                createBaseVNode("div", _hoisted_12, [
                  _cache[9] || (_cache[9] = createBaseVNode("div", { class: "p-2 bg-blue-100 dark:bg-blue-900/20 rounded-lg" }, [
                    createBaseVNode("svg", {
                      class: "h-5 w-5 text-blue-600 dark:text-blue-400",
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
                    ])
                  ], -1)),
                  createBaseVNode("div", null, [
                    createBaseVNode("h3", _hoisted_13, toDisplayString(unref(t)("vocabulary.save.title", "Save & Sync")), 1),
                    createBaseVNode("p", _hoisted_14, toDisplayString(unref(t)("vocabulary.save.subtitle", "Manage your vocabulary data storage")), 1)
                  ])
                ]),
                createBaseVNode("div", _hoisted_15, [
                  createBaseVNode("button", {
                    onClick: _cache[1] || (_cache[1] = ($event) => emit("update:autoSaveEnabled", !_ctx.autoSaveEnabled)),
                    class: normalizeClass([
                      "relative inline-flex h-6 w-11 items-center rounded-full transition-colors duration-200 flex-shrink-0",
                      _ctx.autoSaveEnabled ? "bg-blue-600" : "bg-gray-200 dark:bg-gray-600"
                    ])
                  }, [
                    createBaseVNode("span", {
                      class: normalizeClass([
                        "inline-block h-4 w-4 transform rounded-full bg-white transition-transform duration-200",
                        _ctx.autoSaveEnabled ? "translate-x-6" : "translate-x-1"
                      ])
                    }, null, 2)
                  ], 2),
                  createBaseVNode("span", _hoisted_16, toDisplayString(_ctx.autoSaveEnabled ? unref(t)("vocabulary.save.auto", "Auto") : unref(t)("vocabulary.save.manual", "Manual")), 1)
                ])
              ])
            ])
          ])
        ]),
        createBaseVNode("div", _hoisted_17, [
          createBaseVNode("div", _hoisted_18, [
            createBaseVNode("div", _hoisted_19, [
              !_ctx.autoSaveEnabled ? (openBlock(), createElementBlock("div", _hoisted_20, [
                createBaseVNode("h4", _hoisted_21, toDisplayString(unref(t)("vocabulary.save.manualMode", "Manual Save Mode")), 1),
                createBaseVNode("button", {
                  onClick: _cache[2] || (_cache[2] = ($event) => emit("manual-save")),
                  disabled: _ctx.isSaving,
                  class: "w-full px-3 xs:px-4 py-2 xs:py-2.5 bg-green-600 hover:bg-green-700 disabled:bg-gray-400 text-white text-sm xs:text-base font-medium rounded-lg transition-all duration-200 flex items-center justify-center space-x-2 hover:shadow-md"
                }, [
                  _ctx.isSaving ? (openBlock(), createElementBlock("svg", _hoisted_23, _cache[10] || (_cache[10] = [
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
                  ]))) : (openBlock(), createElementBlock("svg", _hoisted_24, _cache[11] || (_cache[11] = [
                    createBaseVNode("path", {
                      "stroke-linecap": "round",
                      "stroke-linejoin": "round",
                      "stroke-width": "2",
                      d: "M8 7H5a2 2 0 00-2 2v9a2 2 0 002 2h14a2 2 0 002-2V9a2 2 0 00-2-2h-3m-1 4l-3-3m0 0l-3 3m3-3v12"
                    }, null, -1)
                  ]))),
                  createBaseVNode("span", null, toDisplayString(_ctx.isSaving ? unref(t)("common.saving", "Saving...") : unref(t)("vocabulary.save.saveNow", "Save Now")), 1)
                ], 8, _hoisted_22)
              ])) : createCommentVNode("", true),
              _ctx.autoSaveEnabled ? (openBlock(), createElementBlock("div", _hoisted_25, [
                createBaseVNode("h4", _hoisted_26, toDisplayString(unref(t)("vocabulary.save.autoMode", "Auto Save Configuration")), 1),
                createBaseVNode("div", _hoisted_27, [
                  createBaseVNode("label", _hoisted_28, toDisplayString(unref(t)("vocabulary.save.storageType", "Storage Type")), 1),
                  createBaseVNode("select", {
                    value: _ctx.storageType,
                    onChange: handleStorageTypeChange,
                    class: "w-full px-2.5 xs:px-3 py-1.5 xs:py-2 text-xs xs:text-sm border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-[#0a0a0a] text-gray-700 dark:text-gray-300 focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-colors"
                  }, [
                    createBaseVNode("option", _hoisted_30, toDisplayString(unref(t)("vocabulary.save.localStorage", "Local File")), 1),
                    createBaseVNode("option", _hoisted_31, toDisplayString(unref(t)("vocabulary.save.googleDrive", "Google Drive")), 1)
                  ], 40, _hoisted_29)
                ]),
                createBaseVNode("div", _hoisted_32, [
                  _ctx.storageType === "local" && !_ctx.hasAutoSaveFile ? (openBlock(), createElementBlock("button", {
                    key: 0,
                    onClick: _cache[3] || (_cache[3] = ($event) => emit("setup-auto-save")),
                    class: "w-full px-3 xs:px-4 py-2 xs:py-2.5 bg-orange-600 hover:bg-orange-700 text-white text-sm xs:text-base font-medium rounded-lg transition-all duration-200 flex items-center justify-center space-x-1.5 xs:space-x-2 hover:shadow-md"
                  }, [
                    _cache[12] || (_cache[12] = createBaseVNode("svg", {
                      class: "h-3 xs:h-4 w-3 xs:w-4",
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
                    createBaseVNode("span", null, toDisplayString(unref(t)("vocabulary.save.chooseAutoFile", "Choose Auto File")), 1)
                  ])) : createCommentVNode("", true),
                  _ctx.storageType === "google-drive" && !_ctx.isGoogleSignedIn ? (openBlock(), createElementBlock("button", {
                    key: 1,
                    onClick: _cache[4] || (_cache[4] = ($event) => emit("google-sign-in")),
                    class: "w-full px-3 xs:px-4 py-2 xs:py-2.5 bg-red-600 hover:bg-red-700 text-white text-sm xs:text-base font-medium rounded-lg transition-all duration-200 flex items-center justify-center space-x-1.5 xs:space-x-2 hover:shadow-md"
                  }, [
                    _cache[13] || (_cache[13] = createBaseVNode("svg", {
                      class: "h-3 xs:h-4 w-3 xs:w-4",
                      fill: "none",
                      stroke: "currentColor",
                      viewBox: "0 0 24 24"
                    }, [
                      createBaseVNode("path", {
                        "stroke-linecap": "round",
                        "stroke-linejoin": "round",
                        "stroke-width": "2",
                        d: "M11 16l-4-4m0 0l4-4m-4 4h14m-5 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013 3v1"
                      })
                    ], -1)),
                    createBaseVNode("span", null, toDisplayString(unref(t)("vocabulary.save.signInGoogle", "Sign in Google")), 1)
                  ])) : createCommentVNode("", true),
                  _ctx.storageType === "google-drive" && _ctx.isGoogleSignedIn && !_ctx.hasGoogleDriveFile ? (openBlock(), createElementBlock("button", {
                    key: 2,
                    onClick: _cache[5] || (_cache[5] = ($event) => emit("setup-google-drive")),
                    class: "w-full px-3 xs:px-4 py-2 xs:py-2.5 bg-blue-600 hover:bg-blue-700 text-white text-sm xs:text-base font-medium rounded-lg transition-all duration-200 flex items-center justify-center space-x-1.5 xs:space-x-2 hover:shadow-md"
                  }, [
                    _cache[14] || (_cache[14] = createBaseVNode("svg", {
                      class: "h-3 xs:h-4 w-3 xs:w-4",
                      fill: "none",
                      stroke: "currentColor",
                      viewBox: "0 0 24 24"
                    }, [
                      createBaseVNode("path", {
                        "stroke-linecap": "round",
                        "stroke-linejoin": "round",
                        "stroke-width": "2",
                        d: "M7 16a4 4 0 01-.88-7.903A5 5 0 1115.9 6L16 6a5 5 0 011 9.9M15 13l-3-3m0 0l-3 3m3-3v12"
                      })
                    ], -1)),
                    createBaseVNode("span", null, toDisplayString(unref(t)("vocabulary.save.setupDrive", "Setup Google Drive")), 1)
                  ])) : createCommentVNode("", true),
                  _ctx.storageType === "google-drive" && _ctx.isGoogleSignedIn && _ctx.hasGoogleDriveFile ? (openBlock(), createElementBlock("button", {
                    key: 3,
                    onClick: _cache[6] || (_cache[6] = ($event) => emit("sync-from-google-drive")),
                    class: "w-full px-3 xs:px-4 py-2 xs:py-2.5 bg-green-600 hover:bg-green-700 text-white text-sm xs:text-base font-medium rounded-lg transition-all duration-200 flex items-center justify-center space-x-1.5 xs:space-x-2 hover:shadow-md"
                  }, [
                    _cache[15] || (_cache[15] = createBaseVNode("svg", {
                      class: "h-3 xs:h-4 w-3 xs:w-4",
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
                    createBaseVNode("span", null, toDisplayString(unref(t)("vocabulary.save.syncFromDrive", "Sync from Drive")), 1)
                  ])) : createCommentVNode("", true),
                  _ctx.storageType === "local" && _ctx.hasAutoSaveFile || _ctx.storageType === "google-drive" && _ctx.isGoogleSignedIn ? (openBlock(), createElementBlock("button", {
                    key: 4,
                    onClick: _cache[7] || (_cache[7] = ($event) => _ctx.storageType === "local" ? emit("reset-auto-save") : emit("google-sign-out")),
                    class: "w-full px-3 xs:px-4 py-2 xs:py-2.5 bg-gray-500 hover:bg-gray-600 text-white text-sm xs:text-base font-medium rounded-lg transition-all duration-200 flex items-center justify-center space-x-1.5 xs:space-x-2 hover:shadow-md"
                  }, [
                    _cache[16] || (_cache[16] = createBaseVNode("svg", {
                      class: "h-3 xs:h-4 w-3 xs:w-4",
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
                    createBaseVNode("span", null, toDisplayString(_ctx.storageType === "local" ? unref(t)("vocabulary.save.changeAutoFile", "Change Auto File") : unref(t)("vocabulary.save.signOutGoogle", "Sign Out Google")), 1)
                  ])) : createCommentVNode("", true)
                ])
              ])) : createCommentVNode("", true),
              createBaseVNode("div", _hoisted_33, [
                createBaseVNode("h4", _hoisted_34, toDisplayString(unref(t)("vocabulary.save.importExport", "Import & Export")), 1),
                createBaseVNode("div", _hoisted_35, [
                  createBaseVNode("div", _hoisted_36, [
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
                      class: "w-full px-3 xs:px-4 py-2 xs:py-2.5 bg-purple-600 hover:bg-purple-700 text-white text-sm xs:text-base font-medium rounded-lg transition-all duration-200 flex items-center justify-center space-x-1.5 xs:space-x-2 hover:shadow-md"
                    }, [
                      _cache[17] || (_cache[17] = createBaseVNode("svg", {
                        class: "h-3 xs:h-4 w-3 xs:w-4",
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
                      createBaseVNode("span", null, toDisplayString(unref(t)("vocabulary.save.importFromComputer", "Import from Computer")), 1)
                    ])
                  ])
                ])
              ])
            ]),
            createBaseVNode("div", _hoisted_37, [
              createBaseVNode("div", _hoisted_38, [
                createBaseVNode("h4", _hoisted_39, toDisplayString(unref(t)("vocabulary.save.status", "Save Status")), 1),
                createBaseVNode("div", _hoisted_40, [
                  createBaseVNode("div", _hoisted_41, [
                    createBaseVNode("div", {
                      class: normalizeClass(["h-2.5 xs:h-3 w-2.5 xs:w-3 rounded-full", _ctx.saveStatusColor])
                    }, null, 2),
                    createBaseVNode("span", _hoisted_42, toDisplayString(_ctx.saveStatusText), 1)
                  ]),
                  createBaseVNode("div", _hoisted_43, [
                    _cache[18] || (_cache[18] = createBaseVNode("svg", {
                      class: "h-3 xs:h-4 w-3 xs:w-4 flex-shrink-0",
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
                    createBaseVNode("span", _hoisted_44, toDisplayString(formattedLastSave.value), 1)
                  ])
                ])
              ]),
              _ctx.autoSaveEnabled ? (openBlock(), createElementBlock("div", _hoisted_45, [
                createBaseVNode("h4", _hoisted_46, toDisplayString(unref(t)("vocabulary.save.storageInfo", "Storage Information")), 1),
                createBaseVNode("div", _hoisted_47, [
                  createBaseVNode("p", _hoisted_48, [
                    createBaseVNode("span", _hoisted_49, toDisplayString(unref(t)("vocabulary.save.type", "Type")) + ":", 1),
                    createTextVNode(" " + toDisplayString(_ctx.storageType === "local" ? unref(t)("vocabulary.save.localStorage", "Local File") : unref(t)("vocabulary.save.googleDrive", "Google Drive")), 1)
                  ]),
                  _ctx.storageType === "local" && _ctx.hasAutoSaveFile ? (openBlock(), createElementBlock("p", _hoisted_50, " ✓ " + toDisplayString(unref(t)("vocabulary.save.fileConfigured", "Auto-save file configured")), 1)) : createCommentVNode("", true),
                  _ctx.storageType === "google-drive" && _ctx.isGoogleSignedIn ? (openBlock(), createElementBlock("div", _hoisted_51, [
                    createBaseVNode("p", _hoisted_52, " ✓ " + toDisplayString(unref(t)("vocabulary.save.googleConnected", "Google Drive connected")), 1),
                    _ctx.googleUserEmail ? (openBlock(), createElementBlock("p", _hoisted_53, [
                      createBaseVNode("span", _hoisted_54, toDisplayString(unref(t)("vocabulary.save.account", "Account")) + ":", 1),
                      createTextVNode(" " + toDisplayString(_ctx.googleUserEmail), 1)
                    ])) : (openBlock(), createElementBlock("p", _hoisted_55, " ⚠️ Email not loaded - Sign out and sign in again "))
                  ])) : createCommentVNode("", true)
                ])
              ])) : createCommentVNode("", true)
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
//# sourceMappingURL=SaveControlPanel-DIFqtGNF.js.map
