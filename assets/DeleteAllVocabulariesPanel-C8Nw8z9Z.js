import { d as defineComponent, H as useI18n, A as ref, K as watch, c as createElementBlock, v as openBlock, f as createBaseVNode, b as createBlock, t as toDisplayString, u as unref, g as createTextVNode, e as createCommentVNode, a0 as Teleport } from "./vendor-Cr_Qcp9o.js";
import { u as useToast } from "./vendor-toast-BrdXiWv_.js";
import { c as useVocabularyStore, i as useThemeStore, d as useVoiceStore } from "./index-C8A7QfHx.js";
const _hoisted_1 = { class: "bg-white/60 dark:bg-[#0a0a0a]/60 backdrop-blur-sm rounded-xl border border-white/20 dark:border-white/10 p-3 sm:p-4 md:p-5" };
const _hoisted_2 = { class: "flex items-center mb-3 sm:mb-4" };
const _hoisted_3 = { class: "text-sm sm:text-base font-semibold bg-gradient-to-r from-red-600 to-red-600 dark:from-red-400 dark:to-red-400 bg-clip-text text-transparent" };
const _hoisted_4 = { class: "flex flex-col space-y-3" };
const _hoisted_5 = { class: "text-xs sm:text-sm text-gray-600 dark:text-gray-300" };
const _hoisted_6 = { class: "flex flex-col sm:flex-row gap-2" };
const _hoisted_7 = {
  key: 0,
  class: "fixed inset-0 z-[9999] flex items-center justify-center p-4",
  "aria-labelledby": "modal-title",
  role: "dialog",
  "aria-modal": "true"
};
const _hoisted_8 = { class: "relative bg-white dark:bg-[#0a0a0a] rounded-lg shadow-xl w-full max-w-lg mx-auto border border-gray-200 dark:border-dark-bg-mute overflow-hidden p-6" };
const _hoisted_9 = { class: "sm:flex sm:items-start" };
const _hoisted_10 = { class: "mt-3 text-center sm:mt-0 sm:ml-4 sm:text-left" };
const _hoisted_11 = {
  class: "text-lg leading-6 font-medium text-gray-900 dark:text-white",
  id: "modal-title"
};
const _hoisted_12 = { class: "mt-2" };
const _hoisted_13 = { class: "text-sm text-gray-500 dark:text-gray-300" };
const _hoisted_14 = { class: "mt-3 p-3 bg-red-50 dark:bg-red-900/20 rounded-md border border-red-200 dark:border-red-800" };
const _hoisted_15 = { class: "text-sm text-red-800 dark:text-red-300 font-medium" };
const _hoisted_16 = { class: "mt-5 sm:mt-4 sm:flex sm:flex-row-reverse" };
const _hoisted_17 = {
  key: 0,
  class: "fixed inset-0 z-[9999] flex items-center justify-center p-4",
  "aria-labelledby": "clear-local-store-modal-title",
  role: "dialog",
  "aria-modal": "true"
};
const _hoisted_18 = { class: "relative bg-white dark:bg-[#0a0a0a] rounded-lg shadow-xl w-full max-w-lg mx-auto border border-gray-200 dark:border-dark-bg-mute overflow-hidden p-6" };
const _hoisted_19 = { class: "sm:flex sm:items-start" };
const _hoisted_20 = { class: "mt-3 text-center sm:mt-0 sm:ml-4 sm:text-left" };
const _hoisted_21 = {
  class: "text-lg leading-6 font-medium text-gray-900 dark:text-white",
  id: "clear-local-store-modal-title"
};
const _hoisted_22 = { class: "mt-2" };
const _hoisted_23 = { class: "text-sm text-gray-500 dark:text-gray-300" };
const _hoisted_24 = { class: "text-sm text-orange-600 dark:text-orange-400 mt-2 font-medium" };
const _hoisted_25 = { class: "mt-3 p-3 bg-orange-50 dark:bg-orange-900/20 rounded-md border border-orange-200 dark:border-orange-800" };
const _hoisted_26 = { class: "text-sm text-orange-800 dark:text-orange-300 font-medium" };
const _hoisted_27 = { class: "mt-5 sm:mt-4 sm:flex sm:flex-row-reverse" };
const _sfc_main = /* @__PURE__ */ defineComponent({
  __name: "DeleteAllVocabulariesPanel",
  props: {
    totalCount: {},
    autoSaveEnabled: { type: Boolean },
    useGrouping: { type: Boolean }
  },
  emits: ["vocabularies-deleted", "local-store-cleared"],
  setup(__props, { emit: __emit }) {
    const emit = __emit;
    const { t } = useI18n();
    const toast = useToast();
    const vocabularyStore = useVocabularyStore();
    const themeStore = useThemeStore();
    const voiceStore = useVoiceStore();
    const showDeleteAllModal = ref(false);
    const showClearLocalStoreModal = ref(false);
    watch(showDeleteAllModal, (newValue) => {
      if (newValue) {
        document.body.classList.add("modal-open");
      } else {
        document.body.classList.remove("modal-open");
      }
    });
    watch(showClearLocalStoreModal, (newValue) => {
      if (newValue) {
        document.body.classList.add("modal-open");
      } else {
        document.body.classList.remove("modal-open");
      }
    });
    const confirmDeleteAll = () => {
      try {
        vocabularyStore.clearAllVocabularies();
        showDeleteAllModal.value = false;
        toast.success(
          t("vocabulary.deleteAll.success", "All vocabulary words have been deleted successfully"),
          { timeout: 3e3 }
        );
        emit("vocabularies-deleted");
        console.log("All vocabularies deleted successfully");
      } catch (error) {
        console.error("Error deleting all vocabularies:", error);
        toast.error(
          t("vocabulary.deleteAll.error", "Failed to delete all vocabularies. Please try again."),
          { timeout: 5e3 }
        );
      }
    };
    const confirmClearLocalStore = () => {
      try {
        vocabularyStore.clearAllVocabularies();
        localStorage.clear();
        sessionStorage.clear();
        if ("indexedDB" in window) {
          try {
            indexedDB.deleteDatabase("vocabulary-db");
            indexedDB.deleteDatabase("practice-sessions-db");
            indexedDB.deleteDatabase("user-settings-db");
            console.log("IndexedDB databases deleted");
          } catch (dbError) {
            console.log("IndexedDB not available or error deleting:", dbError);
          }
        }
        document.cookie.split(";").forEach(function(c) {
          document.cookie = c.replace(/^ +/, "").replace(/=.*/, "=;expires=" + (/* @__PURE__ */ new Date()).toUTCString() + ";path=/");
        });
        if ("caches" in window) {
          caches.keys().then(function(names) {
            for (let name of names) {
              caches.delete(name);
            }
          });
        }
        if ("cacheStorage" in window) {
          caches.keys().then(function(names) {
            for (let name of names) {
              caches.delete(name);
            }
          });
        }
        if ("serviceWorker" in navigator) {
          navigator.serviceWorker.getRegistrations().then(function(registrations) {
            for (let registration of registrations) {
              registration.unregister();
            }
          });
        }
        themeStore.setTheme(false);
        const voiceTypes = ["female-sweet", "female-clear", "female-professional", "male-strong", "male-gentle", "male-deep", "korean-female", "korean-male"];
        voiceTypes.forEach((type) => voiceStore.resetVoiceSettings(type));
        const commonKeys = [
          "vocabulary-data",
          "practice-sessions",
          "user-settings",
          "theme",
          "voice-settings",
          "accordion-state",
          "hover-expand-enabled",
          "auto-save-enabled",
          "move-mode-enabled",
          "grouping-enabled",
          "last-save-time",
          "save-status",
          "google-drive-token",
          "google-drive-refresh-token",
          "google-drive-file-id",
          "auto-save-file-path",
          "vocabulary-notes",
          "grammar-rules",
          "user-preferences",
          "app-settings",
          "vocabulary-filters",
          "search-history",
          "recent-searches",
          "favorite-words",
          "learning-progress",
          "daily-targets",
          "study-sessions",
          "vocabulary-categories",
          "topic-groups",
          "date-grouping",
          "pagination-settings",
          "sort-preferences",
          "display-options",
          "accessibility-settings",
          "performance-settings",
          "debug-settings",
          "error-logs",
          "analytics-data",
          "user-activity",
          "session-data",
          "cache-data",
          "temp-data",
          "backup-data",
          "sync-data",
          "offline-data",
          "pending-changes",
          "auto-save-queue",
          "undo-redo-stack",
          "clipboard-data",
          "drag-drop-state",
          "modal-state",
          "tooltip-state",
          "notification-state",
          "loading-state",
          "error-state",
          "success-state",
          "warning-state",
          "info-state"
        ];
        commonKeys.forEach((key) => {
          try {
            localStorage.removeItem(key);
            sessionStorage.removeItem(key);
          } catch (e) {
            console.log(`Error removing key ${key}:`, e);
          }
        });
        let localStorageLength = localStorage.length;
        while (localStorageLength > 0) {
          try {
            const key = localStorage.key(0);
            if (key) {
              localStorage.removeItem(key);
            }
            localStorageLength = localStorage.length;
          } catch (e) {
            console.log("Error removing dynamic localStorage key:", e);
            break;
          }
        }
        let sessionStorageLength = sessionStorage.length;
        while (sessionStorageLength > 0) {
          try {
            const key = sessionStorage.key(0);
            if (key) {
              sessionStorage.removeItem(key);
            }
            sessionStorageLength = sessionStorage.length;
          } catch (e) {
            console.log("Error removing dynamic sessionStorage key:", e);
            break;
          }
        }
        try {
          localStorage.clear();
          sessionStorage.clear();
        } catch (e) {
          console.log("Error in final clear:", e);
        }
        if ("gc" in window) {
          try {
            window.gc();
          } catch (e) {
            console.log("Garbage collection not available");
          }
        }
        showClearLocalStoreModal.value = false;
        toast.success(
          t("vocabulary.deleteAll.clearLocalStoreSuccess", "All local store data has been cleared successfully"),
          { timeout: 3e3 }
        );
        emit("local-store-cleared");
        console.log("Local store data cleared successfully - 100% complete");
        setTimeout(() => {
          const remainingLocalStorage = localStorage.length;
          const remainingSessionStorage = sessionStorage.length;
          if (remainingLocalStorage > 0 || remainingSessionStorage > 0) {
            console.log(`Warning: ${remainingLocalStorage} localStorage items and ${remainingSessionStorage} sessionStorage items remain`);
            try {
              localStorage.clear();
              sessionStorage.clear();
            } catch (e) {
              console.log("Final clear attempt failed:", e);
            }
          }
          console.log("Reloading page to ensure complete reset...");
          window.location.reload();
        }, 1500);
      } catch (error) {
        console.error("Error clearing local store data:", error);
        toast.error(
          t("vocabulary.deleteAll.clearLocalStoreError", "Failed to clear local store data. Please try again."),
          { timeout: 5e3 }
        );
      }
    };
    return (_ctx, _cache) => {
      return openBlock(), createElementBlock("div", _hoisted_1, [
        createBaseVNode("div", _hoisted_2, [
          _cache[4] || (_cache[4] = createBaseVNode("div", { class: "animate-pulse-slow" }, [
            createBaseVNode("div", { class: "w-2.5 h-2.5 bg-gradient-to-r from-red-400 to-red-500 rounded-full mr-2.5" })
          ], -1)),
          createBaseVNode("h3", _hoisted_3, toDisplayString(unref(t)("vocabulary.deleteAll.title", "Delete All Vocabularies")), 1)
        ]),
        createBaseVNode("div", _hoisted_4, [
          createBaseVNode("p", _hoisted_5, toDisplayString(unref(t)("vocabulary.deleteAll.description", "This will permanently delete all vocabulary words from your collection. This action cannot be undone.")), 1),
          createBaseVNode("div", _hoisted_6, [
            createBaseVNode("button", {
              onClick: _cache[0] || (_cache[0] = ($event) => showDeleteAllModal.value = true),
              class: "inline-flex items-center justify-center px-2 py-1.5 sm:px-3 sm:py-2 text-xs font-medium text-white bg-red-600 hover:bg-red-700 dark:bg-red-500 dark:hover:bg-red-600 rounded-md transition-colors duration-200 focus:outline-none focus:ring-2 focus:ring-red-500 focus:ring-offset-2 dark:focus:ring-offset-[#0a0a0a] w-fit"
            }, [
              _cache[5] || (_cache[5] = createBaseVNode("svg", {
                class: "w-3 h-3 mr-1.5",
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
              createTextVNode(" " + toDisplayString(unref(t)("vocabulary.deleteAll.button", "Delete All Vocabularies")), 1)
            ]),
            createBaseVNode("button", {
              onClick: _cache[1] || (_cache[1] = ($event) => showClearLocalStoreModal.value = true),
              class: "inline-flex items-center justify-center px-2 py-1.5 sm:px-3 sm:py-2 text-xs font-medium text-white bg-orange-600 hover:bg-orange-700 dark:bg-orange-500 dark:hover:bg-orange-600 rounded-md transition-colors duration-200 focus:outline-none focus:ring-2 focus:ring-orange-500 focus:ring-offset-2 dark:focus:ring-offset-[#0a0a0a] w-fit"
            }, [
              _cache[6] || (_cache[6] = createBaseVNode("svg", {
                class: "w-3 h-3 mr-1.5",
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
              createTextVNode(" " + toDisplayString(unref(t)("vocabulary.deleteAll.clearLocalStore", "Clear Local Store")), 1)
            ])
          ])
        ]),
        (openBlock(), createBlock(Teleport, { to: "body" }, [
          showDeleteAllModal.value ? (openBlock(), createElementBlock("div", _hoisted_7, [
            _cache[8] || (_cache[8] = createBaseVNode("div", {
              class: "fixed inset-0 bg-black bg-opacity-50 backdrop-blur-sm transition-opacity",
              "aria-hidden": "true"
            }, null, -1)),
            createBaseVNode("div", _hoisted_8, [
              createBaseVNode("div", _hoisted_9, [
                _cache[7] || (_cache[7] = createBaseVNode("div", { class: "mx-auto flex-shrink-0 flex items-center justify-center h-12 w-12 rounded-full bg-red-100 dark:bg-red-900/30 sm:mx-0 sm:h-10 sm:w-10" }, [
                  createBaseVNode("svg", {
                    class: "h-6 w-6 text-red-600 dark:text-red-400",
                    fill: "none",
                    viewBox: "0 0 24 24",
                    "stroke-width": "1.5",
                    stroke: "currentColor"
                  }, [
                    createBaseVNode("path", {
                      "stroke-linecap": "round",
                      "stroke-linejoin": "round",
                      d: "M12 9v3.75m-9.303 3.376c-.866 1.5.217 3.374 1.948 3.374h14.71c1.73 0 2.813-1.874 1.948-3.374L13.949 3.378c-.866-1.5-3.032-1.5-3.898 0L2.697 16.126zM12 15.75h.007v.008H12v-.008z"
                    })
                  ])
                ], -1)),
                createBaseVNode("div", _hoisted_10, [
                  createBaseVNode("h3", _hoisted_11, toDisplayString(unref(t)("vocabulary.deleteAll.confirmTitle", "Delete All Vocabularies")), 1),
                  createBaseVNode("div", _hoisted_12, [
                    createBaseVNode("p", _hoisted_13, toDisplayString(unref(t)("vocabulary.deleteAll.confirmMessage", "Are you sure you want to delete all vocabulary words? This action cannot be undone and will permanently remove all your saved words.")), 1),
                    createBaseVNode("div", _hoisted_14, [
                      createBaseVNode("p", _hoisted_15, toDisplayString(unref(t)("vocabulary.deleteAll.warningCount", { count: _ctx.totalCount }, `You are about to delete ${_ctx.totalCount} vocabulary words.`)), 1)
                    ])
                  ])
                ])
              ]),
              createBaseVNode("div", _hoisted_16, [
                createBaseVNode("button", {
                  onClick: confirmDeleteAll,
                  type: "button",
                  class: "w-full inline-flex justify-center rounded-md border border-transparent shadow-sm px-4 py-2 bg-red-600 text-base font-medium text-white hover:bg-red-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-red-500 dark:focus:ring-offset-[#0a0a0a] sm:ml-3 sm:w-auto sm:text-sm transition-colors duration-200"
                }, toDisplayString(unref(t)("vocabulary.deleteAll.confirm", "Delete All")), 1),
                createBaseVNode("button", {
                  onClick: _cache[2] || (_cache[2] = ($event) => showDeleteAllModal.value = false),
                  type: "button",
                  class: "mt-3 w-full inline-flex justify-center rounded-md border border-gray-300 dark:border-dark-bg-mute shadow-sm px-4 py-2 bg-white dark:bg-dark-bg-soft text-base font-medium text-gray-700 dark:text-gray-300 hover:bg-gray-50 dark:hover:bg-dark-bg-mute focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 dark:focus:ring-offset-[#0a0a0a] sm:mt-0 sm:w-auto sm:text-sm transition-colors duration-200"
                }, toDisplayString(unref(t)("common.cancel", "Cancel")), 1)
              ])
            ])
          ])) : createCommentVNode("", true)
        ])),
        (openBlock(), createBlock(Teleport, { to: "body" }, [
          showClearLocalStoreModal.value ? (openBlock(), createElementBlock("div", _hoisted_17, [
            _cache[10] || (_cache[10] = createBaseVNode("div", {
              class: "fixed inset-0 bg-black bg-opacity-50 backdrop-blur-sm transition-opacity",
              "aria-hidden": "true"
            }, null, -1)),
            createBaseVNode("div", _hoisted_18, [
              createBaseVNode("div", _hoisted_19, [
                _cache[9] || (_cache[9] = createBaseVNode("div", { class: "mx-auto flex-shrink-0 flex items-center justify-center h-12 w-12 rounded-full bg-orange-100 dark:bg-orange-900/30 sm:mx-0 sm:h-10 sm:w-10" }, [
                  createBaseVNode("svg", {
                    class: "h-6 w-6 text-orange-600 dark:text-orange-400",
                    fill: "none",
                    viewBox: "0 0 24 24",
                    "stroke-width": "1.5",
                    stroke: "currentColor"
                  }, [
                    createBaseVNode("path", {
                      "stroke-linecap": "round",
                      "stroke-linejoin": "round",
                      d: "M12 9v3.75m-9.303 3.376c-.866 1.5.217 3.374 1.948 3.374h14.71c1.73 0 2.813-1.874 1.948-3.374L13.949 3.378c-.866-1.5-3.032-1.5-3.898 0L2.697 16.126zM12 15.75h.007v.008H12v-.008z"
                    })
                  ])
                ], -1)),
                createBaseVNode("div", _hoisted_20, [
                  createBaseVNode("h3", _hoisted_21, toDisplayString(unref(t)("vocabulary.deleteAll.clearLocalStoreTitle", "Clear Local Store Data")), 1),
                  createBaseVNode("div", _hoisted_22, [
                    createBaseVNode("p", _hoisted_23, toDisplayString(unref(t)("vocabulary.deleteAll.clearLocalStoreMessage", "This will clear all data stored in your browser's local storage, including vocabulary words, practice sessions, and user preferences. This action cannot be undone.")), 1),
                    createBaseVNode("p", _hoisted_24, toDisplayString(unref(t)("vocabulary.deleteAll.pageReloadNotice", "Note: Page will automatically reload after clearing to ensure complete reset.")), 1),
                    createBaseVNode("div", _hoisted_25, [
                      createBaseVNode("p", _hoisted_26, toDisplayString(unref(t)("vocabulary.deleteAll.clearLocalStoreWarning", "Warning: This will remove all locally stored data and reset the application to its initial state.")), 1)
                    ])
                  ])
                ])
              ]),
              createBaseVNode("div", _hoisted_27, [
                createBaseVNode("button", {
                  onClick: confirmClearLocalStore,
                  type: "button",
                  class: "w-full inline-flex justify-center rounded-md border border-transparent shadow-sm px-4 py-2 bg-orange-600 text-base font-medium text-white hover:bg-orange-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-orange-500 dark:focus:ring-offset-[#0a0a0a] sm:ml-3 sm:w-auto sm:text-sm transition-colors duration-200"
                }, toDisplayString(unref(t)("vocabulary.deleteAll.clearLocalStoreConfirm", "Clear All Data")), 1),
                createBaseVNode("button", {
                  onClick: _cache[3] || (_cache[3] = ($event) => showClearLocalStoreModal.value = false),
                  type: "button",
                  class: "mt-3 w-full inline-flex justify-center rounded-md border border-gray-300 dark:border-dark-bg-mute shadow-sm px-4 py-2 bg-white dark:bg-dark-bg-soft text-base font-medium text-gray-700 dark:text-gray-300 hover:bg-gray-50 dark:hover:bg-dark-bg-mute focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 dark:focus:ring-offset-[#0a0a0a] sm:mt-0 sm:w-auto sm:text-sm transition-colors duration-200"
                }, toDisplayString(unref(t)("common.cancel", "Cancel")), 1)
              ])
            ])
          ])) : createCommentVNode("", true)
        ]))
      ]);
    };
  }
});
export {
  _sfc_main as default
};
//# sourceMappingURL=DeleteAllVocabulariesPanel-C8Nw8z9Z.js.map
