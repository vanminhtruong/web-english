const __vite__mapDeps=(i,m=__vite__mapDeps,d=(m.f||(m.f=["assets/AppHeader-DxtgvUrm.js","assets/vendor-DoTKyHPB.js","assets/vendor-toast-D1B2ty4j.js","assets/vendor-toast-jG2HNJHr.css","assets/AppHeader-CWhSJRNu.css","assets/BackToTop-yc7qOubw.js","assets/BackToTop-MxKm-eHR.css","assets/LazyLoadComponent-C_G5IP7H.js","assets/LazyLoadComponent-DWULbbXY.css","assets/DashboardHeader-BK1hS-2p.js","assets/DashboardStats-CWs5SZHg.js","assets/ConfirmToast-C2z7ONQ6.js","assets/GroupingToggle-CLGsUdN4.js","assets/TopicManagerPanel-CArn7IHK.js","assets/SaveControlPanel-BvhjFnL-.js","assets/VocabularyHeader-CStp18uX.js","assets/VocabularyFilters-CZiJjeY8.js","assets/VocabularyList-r5RLX8Q1.js","assets/VocabularyFormDialog-DmLdxJ7p.js","assets/VocabularyFormDialog-259DIqwh.css","assets/VocabularyDetailDialog-CMoqV-aF.js","assets/VocabularyDetailDialog-2zu8wUUX.css","assets/VocabularyNoteDialog-rJeDJU3b.js","assets/VocabularyNoteDialog-KWtUVEUK.css","assets/GrammarManagerModal-BbXcg-Er.js","assets/GrammarManagerModal-DHQPPZ-6.css","assets/VoiceSelector-BXW_Bt2k.js","assets/TopicManager-B6adKRRq.js","assets/TopicManager-SGNt9NVM.css","assets/GrammarHeader-G66gEm0C.js","assets/GrammarFilters-BW_K4GAe.js","assets/GrammarCard-D_BW31yO.js","assets/GrammarEmptyState-Y7UYn9u5.js","assets/GrammarFormDialog-DQrj0wgw.js","assets/GrammarFormDialog-ebJCDif4.css","assets/MultipleChoiceExercise-CaUDvXw5.js","assets/FillBlankExercise-CG01xr0b.js","assets/PronunciationExercise-CkuWQIlU.js","assets/ReadingExercise-DOf_grDe.js","assets/ListeningExercise-DrqGOgVv.js","assets/WritingExercise-B62sLIzP.js","assets/ExerciseManager-DsdTXUe4.js","assets/FlashcardHeader-C7KBYCuA.js","assets/FlashcardProgress-DENgkUAi.js","assets/FlashcardDateFilter-CsYlWK85.js","assets/FlashcardCard-qrUezX-s.js","assets/FlashcardCard-CuDdyFnL.css","assets/FlashcardQuiz-BZoUfkBD.js","assets/FlashcardTyping-BEZNRDAw.js","assets/FlashcardImage-Dpy1F9ks.js","assets/FlashcardControls-D4ub00a_.js","assets/PracticeTimer-DdQKBZql.js","assets/PracticeTimer-DnI5CziQ.css","assets/ExitWarningModal-Ce1mPY_e.js","assets/CompletionModal-BgOmYYU1.js","assets/CompletionModal-f93s1iQw.css","assets/HistoryModal-Bl4_DIN7.js","assets/SessionDetailModal-C-FwU_wy.js","assets/SettingsModal-BlC_fqJx.js","assets/PronunciationMode-y3SAxA6E.js","assets/ListeningMode-DrDFbumt.js","assets/ListeningMode-DLNJ-re-.css","assets/PracticeStats-sod-YaTN.js","assets/FlashcardEmptyState-DEBSzveU.js","assets/PictionaryMode-fIGKSRm0.js","assets/PictionaryMode-Ch2swG3x.css","assets/BubbleShooterMode-hBkWH8XW.js","assets/BubbleShooterMode-CI5dIgp2.css","assets/SnakeGameMode-dUbdS0HZ.js","assets/SnakeGameMode-CoB0bMog.css","assets/QuizHeader-bRwvgeFh.js","assets/QuizProgress-BnDntSBo.js","assets/QuizSetup-DDzyljJ5.js","assets/QuizQuestion-CcIxL0ZU.js","assets/QuizResults-CiL9dR_R.js"])))=>i.map(i=>d[i]);
import { z as defineStore, A as ref, B as computed, d as defineComponent, c as createElementBlock, v as openBlock, y as createVNode, f as createBaseVNode, C as withDirectives, u as unref, D as defineAsyncComponent, R as RouterView, E as vShow, G as useRouter, H as useI18n, I as onMounted, J as createStaticVNode, w as withCtx, t as toDisplayString, F as Fragment, j as renderList, a as normalizeStyle, n as normalizeClass, K as watch, L as onUnmounted, M as Transition, e as createCommentVNode, i as withModifiers, g as createTextVNode, N as vModelCheckbox, O as vModelSelect, P as isRef, q as nextTick, b as createBlock, Q as useRoute, r as resolveDynamicComponent, S as vModelText, U as h, l as resolveComponent, V as createRouter, W as createWebHashHistory, X as createI18n, s as createApp, Y as createPinia } from "./vendor-DoTKyHPB.js";
import { u as useToast, P as POSITION, s as src_default } from "./vendor-toast-D1B2ty4j.js";
(function polyfill() {
  const relList = document.createElement("link").relList;
  if (relList && relList.supports && relList.supports("modulepreload")) return;
  for (const link of document.querySelectorAll('link[rel="modulepreload"]')) processPreload(link);
  new MutationObserver((mutations) => {
    for (const mutation of mutations) {
      if (mutation.type !== "childList") continue;
      for (const node of mutation.addedNodes) if (node.tagName === "LINK" && node.rel === "modulepreload") processPreload(node);
    }
  }).observe(document, {
    childList: true,
    subtree: true
  });
  function getFetchOpts(link) {
    const fetchOpts = {};
    if (link.integrity) fetchOpts.integrity = link.integrity;
    if (link.referrerPolicy) fetchOpts.referrerPolicy = link.referrerPolicy;
    if (link.crossOrigin === "use-credentials") fetchOpts.credentials = "include";
    else if (link.crossOrigin === "anonymous") fetchOpts.credentials = "omit";
    else fetchOpts.credentials = "same-origin";
    return fetchOpts;
  }
  function processPreload(link) {
    if (link.ep) return;
    link.ep = true;
    const fetchOpts = getFetchOpts(link);
    fetch(link.href, fetchOpts);
  }
})();
const scriptRel = "modulepreload";
const assetsURL = function(dep) {
  return "/web-english/" + dep;
};
const seen = {};
const __vitePreload = function preload(baseModule, deps, importerUrl) {
  let promise = Promise.resolve();
  if (deps && deps.length > 0) {
    let allSettled = function(promises$2) {
      return Promise.all(promises$2.map((p$1) => Promise.resolve(p$1).then((value$1) => ({
        status: "fulfilled",
        value: value$1
      }), (reason) => ({
        status: "rejected",
        reason
      }))));
    };
    document.getElementsByTagName("link");
    const cspNonceMeta = document.querySelector("meta[property=csp-nonce]");
    const cspNonce = cspNonceMeta?.nonce || cspNonceMeta?.getAttribute("nonce");
    promise = allSettled(deps.map((dep) => {
      dep = assetsURL(dep);
      if (dep in seen) return;
      seen[dep] = true;
      const isCss = dep.endsWith(".css");
      const cssSelector = isCss ? '[rel="stylesheet"]' : "";
      if (document.querySelector(`link[href="${dep}"]${cssSelector}`)) return;
      const link = document.createElement("link");
      link.rel = isCss ? "stylesheet" : scriptRel;
      if (!isCss) link.as = "script";
      link.crossOrigin = "";
      link.href = dep;
      if (cspNonce) link.setAttribute("nonce", cspNonce);
      document.head.appendChild(link);
      if (isCss) return new Promise((res, rej) => {
        link.addEventListener("load", res);
        link.addEventListener("error", () => rej(/* @__PURE__ */ new Error(`Unable to preload CSS for ${dep}`)));
      });
    }));
  }
  function handlePreloadError(err$2) {
    const e$1 = new Event("vite:preloadError", { cancelable: true });
    e$1.payload = err$2;
    window.dispatchEvent(e$1);
    if (!e$1.defaultPrevented) throw err$2;
  }
  return promise.then((res) => {
    for (const item of res || []) {
      if (item.status !== "rejected") continue;
      handlePreloadError(item.reason);
    }
    return baseModule().catch(handlePreloadError);
  });
};
function loadComponentSafely(importFn) {
  return async () => {
    try {
      const module = await importFn();
      return module.default || module;
    } catch (error) {
      console.error("Component loading failed:", error);
      return {
        template: '<div class="error-component">Component failed to load</div>'
      };
    }
  };
}
const useModalStore = defineStore("modal", () => {
  const showVocabularyForm = ref(false);
  const showTopicManager = ref(false);
  const showNoteDialog = ref(false);
  const showVocabularyDetail = ref(false);
  const showGrammarManager = ref(false);
  const showCompletionModal = ref(false);
  const shouldHideBackToTop = computed(() => {
    return showVocabularyForm.value || showTopicManager.value || showNoteDialog.value || showGrammarManager.value || showVocabularyDetail.value || showCompletionModal.value;
  });
  const shouldHideAddNewWord = computed(() => {
    return showTopicManager.value || showNoteDialog.value || showGrammarManager.value || showVocabularyDetail.value;
  });
  const setVocabularyForm = (show) => {
    showVocabularyForm.value = show;
  };
  const setTopicManager = (show) => {
    showTopicManager.value = show;
  };
  const setNoteDialog = (show) => {
    showNoteDialog.value = show;
  };
  const setVocabularyDetail = (show) => {
    showVocabularyDetail.value = show;
  };
  const setGrammarManager = (show) => {
    showGrammarManager.value = show;
  };
  const setCompletionModal = (show) => {
    showCompletionModal.value = show;
    if (show) {
      document.body.classList.add("modal-open");
    } else {
      document.body.classList.remove("modal-open");
    }
  };
  return {
    // States
    showVocabularyForm,
    showTopicManager,
    showNoteDialog,
    showVocabularyDetail,
    showGrammarManager,
    showCompletionModal,
    // Computed
    shouldHideBackToTop,
    shouldHideAddNewWord,
    // Actions
    setVocabularyForm,
    setTopicManager,
    setNoteDialog,
    setVocabularyDetail,
    setGrammarManager,
    setCompletionModal
  };
});
const _hoisted_1$a = {
  id: "app",
  class: "min-h-screen"
};
const _hoisted_2$a = { class: "flex-1 pt-16" };
const _sfc_main$a = /* @__PURE__ */ defineComponent({
  __name: "App",
  setup(__props) {
    const AppHeader = defineAsyncComponent(
      () => __vitePreload(() => import("./AppHeader-DxtgvUrm.js"), true ? __vite__mapDeps([0,1,2,3,4]) : void 0)
    );
    const BackToTop = defineAsyncComponent(
      () => __vitePreload(() => import("./BackToTop-yc7qOubw.js"), true ? __vite__mapDeps([5,1,2,3,6]) : void 0)
    );
    const modalStore = useModalStore();
    return (_ctx, _cache) => {
      return openBlock(), createElementBlock("div", _hoisted_1$a, [
        createVNode(unref(AppHeader)),
        createBaseVNode("main", _hoisted_2$a, [
          createVNode(unref(RouterView))
        ]),
        withDirectives(createVNode(unref(BackToTop), null, null, 512), [
          [vShow, !unref(modalStore).shouldHideBackToTop]
        ])
      ]);
    };
  }
});
const vocabularies = ref([]);
let nextId = 1;
let isInitialized = false;
const isStoreReady = ref(false);
const customTopics = ref([]);
const loadCustomTopics = () => {
  try {
    const saved = localStorage.getItem("customTopics");
    if (saved) {
      const parsedTopics = JSON.parse(saved);
      if (Array.isArray(parsedTopics)) {
        customTopics.value = parsedTopics;
      }
    }
  } catch (error) {
    console.error("Error loading custom topics:", error);
    customTopics.value = [];
  }
};
const loadFromLocalStorage = () => {
  try {
    const saved = localStorage.getItem("vocabularies");
    const savedNextId = localStorage.getItem("nextVocabId");
    if (saved) {
      const parsedVocabs = JSON.parse(saved);
      if (Array.isArray(parsedVocabs)) {
        vocabularies.value = parsedVocabs;
      }
    }
    if (savedNextId) {
      nextId = parseInt(savedNextId, 10) || 1;
    }
    loadCustomTopics();
    isInitialized = true;
    isStoreReady.value = true;
  } catch (error) {
    console.error("Error loading vocabularies from localStorage:", error);
    isInitialized = true;
    isStoreReady.value = true;
  }
};
const saveToLocalStorage = () => {
  try {
    localStorage.setItem("vocabularies", JSON.stringify(vocabularies.value));
    localStorage.setItem("nextVocabId", nextId.toString());
    localStorage.setItem("customTopics", JSON.stringify(customTopics.value));
  } catch (error) {
    console.error("Error saving data to localStorage:", error);
  }
};
function normalizeCategoryKeys() {
  const categoryKeys = [
    "technology",
    "business",
    "travel",
    "food",
    "health",
    "education",
    "sports",
    "entertainment",
    "science",
    "art",
    "music",
    "literature",
    "politics",
    "environment",
    "fashion",
    "finance"
  ];
  const translationMap = {
    technology: ["Technology", "Công nghệ"],
    business: ["Business", "Kinh doanh"],
    travel: ["Travel", "Du lịch"],
    food: ["Food", "Ẩm thực"],
    health: ["Health", "Sức khỏe"],
    education: ["Education", "Giáo dục"],
    sports: ["Sports", "Thể thao"],
    entertainment: ["Entertainment", "Giải trí"],
    science: ["Science", "Khoa học"],
    art: ["Art", "Nghệ thuật"],
    music: ["Music", "Âm nhạc"],
    literature: ["Literature", "Văn học"],
    politics: ["Politics", "Chính trị"],
    environment: ["Environment", "Môi trường"],
    fashion: ["Fashion", "Thời trang"],
    finance: ["Finance", "Tài chính"]
  };
  vocabularies.value.forEach((vocab) => {
    for (const key of categoryKeys) {
      if (vocab.category === key || translationMap[key].includes(vocab.category)) {
        vocab.category = key;
        break;
      }
    }
  });
  saveToLocalStorage();
}
if (typeof window !== "undefined") {
  loadFromLocalStorage();
  normalizeCategoryKeys();
}
function useVocabularyStore() {
  const allVocabularies = computed(() => vocabularies.value);
  const totalCount = computed(() => vocabularies.value.length);
  const getVocabularyById = (id) => {
    return vocabularies.value.find((vocab) => vocab.id === Number(id));
  };
  const addVocabulary = (vocabularyData) => {
    const newVocabulary = {
      ...vocabularyData,
      id: nextId++,
      createdAt: vocabularyData.createdAt || (/* @__PURE__ */ new Date()).toISOString()
    };
    vocabularies.value.unshift(newVocabulary);
    saveToLocalStorage();
    return newVocabulary;
  };
  const updateVocabulary = (id, updates) => {
    const index = vocabularies.value.findIndex((vocab) => vocab.id === id);
    if (index !== -1) {
      const existingVocab = vocabularies.value[index];
      vocabularies.value[index] = {
        ...existingVocab,
        ...updates,
        synonyms: updates.synonyms !== void 0 ? updates.synonyms : existingVocab.synonyms,
        antonyms: updates.antonyms !== void 0 ? updates.antonyms : existingVocab.antonyms,
        updatedAt: (/* @__PURE__ */ new Date()).toISOString()
      };
      saveToLocalStorage();
      return true;
    }
    return false;
  };
  const deleteVocabulary = (id) => {
    const index = vocabularies.value.findIndex((vocab) => vocab.id === id);
    if (index !== -1) {
      vocabularies.value.splice(index, 1);
      saveToLocalStorage();
      return true;
    }
    return false;
  };
  const importVocabularies = (newVocabularies) => {
    try {
      let importedCount = 0;
      let updatedCount = 0;
      newVocabularies.forEach((importedVocab) => {
        const existingIndex = vocabularies.value.findIndex(
          (vocab) => vocab.word.toLowerCase() === importedVocab.word.toLowerCase()
        );
        if (existingIndex !== -1) {
          const existingVocab = vocabularies.value[existingIndex];
          vocabularies.value[existingIndex] = {
            ...existingVocab,
            // Keep original id and createdAt
            ...importedVocab,
            // Override with imported data
            id: existingVocab.id,
            // Preserve original ID
            createdAt: existingVocab.createdAt,
            // Preserve original creation date
            updatedAt: (/* @__PURE__ */ new Date()).toISOString()
            // Update modification time
          };
          updatedCount++;
        } else {
          const newVocab = {
            ...importedVocab,
            id: nextId++,
            createdAt: importedVocab.createdAt || (/* @__PURE__ */ new Date()).toISOString(),
            updatedAt: (/* @__PURE__ */ new Date()).toISOString()
          };
          vocabularies.value.unshift(newVocab);
          importedCount++;
        }
      });
      saveToLocalStorage();
      console.log(`Import completed: ${importedCount} new vocabularies added, ${updatedCount} existing vocabularies updated`);
      return true;
    } catch (error) {
      console.error("Error importing vocabularies:", error);
      return false;
    }
  };
  const filterVocabularies = (filters) => {
    return computed(() => {
      return vocabularies.value.filter((vocab) => {
        const matchesSearch = !filters.search || vocab.word.toLowerCase().includes(filters.search.toLowerCase()) || vocab.meaning.toLowerCase().includes(filters.search.toLowerCase());
        const matchesCategory = !filters.category || vocab.category === filters.category;
        const matchesLevel = !filters.level || vocab.level === filters.level;
        return matchesSearch && matchesCategory && matchesLevel;
      });
    });
  };
  const getCategories = computed(() => {
    const standardCategories = [
      "technology",
      "business",
      "travel",
      "food",
      "health",
      "education",
      "sports",
      "entertainment",
      "science",
      "art",
      "music",
      "literature",
      "politics",
      "environment",
      "fashion",
      "finance"
    ];
    const customTopicKeys = customTopics.value.map((topic) => topic.key);
    const usedCategories = new Set(vocabularies.value.map((vocab) => vocab.category));
    const additionalCategories = Array.from(usedCategories).filter(
      (cat) => !standardCategories.includes(cat) && !customTopicKeys.includes(cat)
    );
    return [...standardCategories, ...customTopicKeys, ...additionalCategories].sort();
  });
  const getCategoryUsage = computed(() => {
    const usage = {};
    vocabularies.value.forEach((vocab) => {
      usage[vocab.category] = (usage[vocab.category] || 0) + 1;
    });
    return usage;
  });
  const getLevels = computed(() => {
    const levels2 = new Set(vocabularies.value.map((vocab) => vocab.level));
    return Array.from(levels2).sort();
  });
  const toggleFavorite = (id) => {
    const index = vocabularies.value.findIndex((vocab) => vocab.id === id);
    if (index !== -1) {
      vocabularies.value[index] = {
        ...vocabularies.value[index],
        favorite: !vocabularies.value[index].favorite,
        updatedAt: (/* @__PURE__ */ new Date()).toISOString()
      };
      saveToLocalStorage();
      return true;
    }
    return false;
  };
  const favoriteVocabularies = computed(() => {
    return vocabularies.value.filter((vocab) => vocab.favorite);
  });
  const initializeStore = () => {
    if (!isInitialized) {
      loadFromLocalStorage();
    }
    return isStoreReady;
  };
  const refreshCustomTopics = () => {
    loadCustomTopics();
  };
  const addCustomTopic = (topic) => {
    const existingTopic = customTopics.value.find((t) => t.key === topic.key);
    if (!existingTopic) {
      customTopics.value.push(topic);
      saveToLocalStorage();
    }
  };
  const updateCustomTopic = (oldKey, topic) => {
    const index = customTopics.value.findIndex((t) => t.key === oldKey);
    if (index !== -1) {
      customTopics.value[index] = topic;
      saveToLocalStorage();
    }
  };
  const deleteCustomTopic = (key) => {
    const index = customTopics.value.findIndex((t) => t.key === key);
    if (index !== -1) {
      customTopics.value.splice(index, 1);
      saveToLocalStorage();
    }
  };
  return {
    // State
    allVocabularies,
    totalCount,
    favoriteVocabularies,
    isStoreReady,
    // Getters
    getVocabularyById,
    getCategories,
    getLevels,
    getCategoryUsage,
    // Actions
    addVocabulary,
    updateVocabulary,
    deleteVocabulary,
    importVocabularies,
    toggleFavorite,
    filterVocabularies,
    initializeStore,
    // Utils
    saveToLocalStorage,
    // Custom topics management
    customTopics,
    refreshCustomTopics,
    addCustomTopic,
    updateCustomTopic,
    deleteCustomTopic
  };
}
const formatDate = (dateString, locale = "vi-VN") => {
  if (!dateString) return "";
  try {
    const date = new Date(dateString);
    return date.toLocaleDateString(locale, {
      year: "numeric",
      month: "long",
      day: "numeric"
    });
  } catch (error) {
    return "";
  }
};
const getRelativeTime = (dateString, t) => {
  if (!dateString) return "";
  try {
    const date = new Date(dateString);
    const now = /* @__PURE__ */ new Date();
    const diffInMs = now.getTime() - date.getTime();
    const diffInHours = Math.floor(diffInMs / (1e3 * 60 * 60));
    const diffInDays = Math.floor(diffInHours / 24);
    if (diffInHours < 1) {
      const diffInMinutes = Math.floor(diffInMs / (1e3 * 60));
      if (diffInMinutes < 1) {
        return t ? t("time.ago.justNow") : "Just now";
      }
      return t ? t("time.ago.minutesAgo", { minutes: diffInMinutes }) : `${diffInMinutes} minutes ago`;
    } else if (diffInHours < 24) {
      return t ? t("time.ago.hoursAgo", { hours: diffInHours }) : `${diffInHours} hours ago`;
    } else if (diffInDays === 1) {
      return t ? t("time.ago.yesterday") : "Yesterday";
    } else if (diffInDays < 7) {
      return t ? t("time.ago.daysAgo", { days: diffInDays }) : `${diffInDays} days ago`;
    } else {
      return formatDate(dateString);
    }
  } catch (error) {
    return "";
  }
};
const getDateKey = (dateString) => {
  if (!dateString) return "";
  try {
    const date = new Date(dateString);
    return date.toISOString().split("T")[0];
  } catch (error) {
    return "";
  }
};
const groupVocabulariesByTopic = (vocabularies2) => {
  const grouped = /* @__PURE__ */ new Map();
  const uncategorizedKey = "Uncategorized";
  vocabularies2.forEach((vocab) => {
    const topic = vocab.category || uncategorizedKey;
    if (!grouped.has(topic)) {
      grouped.set(topic, []);
    }
    grouped.get(topic).push(vocab);
  });
  const result = Array.from(grouped.entries()).map(([topic, vocabs]) => {
    const firstVocab = vocabs[0];
    const categoryName = firstVocab?.categoryName || null;
    return {
      topic,
      categoryName,
      // Preserve category name from imported data
      vocabularies: vocabs.sort((a, b) => {
        const timeA = new Date(a.createdAt || "").getTime();
        const timeB = new Date(b.createdAt || "").getTime();
        return timeB - timeA;
      })
    };
  });
  return result.sort((a, b) => {
    if (a.topic === uncategorizedKey) return 1;
    if (b.topic === uncategorizedKey) return -1;
    return a.topic.localeCompare(b.topic);
  });
};
const groupVocabulariesByDateAndTopic = (vocabularies2, locale = "vi-VN", t) => {
  const groupedByDate = groupVocabulariesByDate(vocabularies2, locale, t);
  return groupedByDate.map((dateGroup) => {
    return {
      ...dateGroup,
      topics: groupVocabulariesByTopic(dateGroup.vocabularies)
    };
  });
};
const groupVocabulariesByDate = (vocabularies2, locale = "vi-VN", t) => {
  const grouped = /* @__PURE__ */ new Map();
  vocabularies2.forEach((vocab) => {
    const dateKey = getDateKey(vocab.createdAt);
    if (!dateKey) return;
    if (!grouped.has(dateKey)) {
      grouped.set(dateKey, []);
    }
    grouped.get(dateKey).push(vocab);
  });
  const result = Array.from(grouped.entries()).map(([dateKey, vocabs]) => ({
    date: dateKey,
    displayDate: getGroupDisplayDate(dateKey, locale, t),
    vocabularies: vocabs.sort((a, b) => {
      const timeA = new Date(a.createdAt || "").getTime();
      const timeB = new Date(b.createdAt || "").getTime();
      return timeB - timeA;
    })
  })).sort((a, b) => {
    return b.date.localeCompare(a.date);
  });
  return result;
};
const getGroupDisplayDate = (dateKey, locale = "vi-VN", t) => {
  try {
    const date = /* @__PURE__ */ new Date(dateKey + "T00:00:00");
    const today = /* @__PURE__ */ new Date();
    const yesterday = new Date(today);
    yesterday.setDate(today.getDate() - 1);
    const todayKey = getDateKey(today.toISOString());
    const yesterdayKey = getDateKey(yesterday.toISOString());
    if (dateKey === todayKey) {
      if (t) return t("time.today") || "Today";
      const l = locale.toLowerCase();
      if (l.startsWith("vi")) return "Hôm nay";
      if (l.startsWith("ko")) return "오늘";
      return "Today";
    } else if (dateKey === yesterdayKey) {
      if (t) return t("time.yesterday") || "Yesterday";
      const l = locale.toLowerCase();
      if (l.startsWith("vi")) return "Hôm qua";
      if (l.startsWith("ko")) return "어제";
      return "Yesterday";
    } else {
      return formatDate(date.toISOString(), locale);
    }
  } catch (error) {
    return dateKey;
  }
};
const _hoisted_1$9 = { class: "min-h-screen overflow-x-hidden bg-gradient-to-br from-blue-50 to-indigo-100 dark:from-[#0a0a0a] dark:to-[#0f0f0f] relative" };
const _hoisted_2$9 = { class: "max-w-7xl mx-auto py-3 sm:py-5 px-3 sm:px-6 lg:px-8 relative" };
const _hoisted_3$8 = { class: "grid grid-cols-1 sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-2 gap-4 sm:gap-6 mb-6 sm:mb-8" };
const _hoisted_4$7 = { class: "group bg-white/80 dark:bg-[#0a0a0a]/80 backdrop-blur-md shadow-xl hover:shadow-2xl rounded-2xl border border-white/20 dark:border-white/10 transition-all duration-500 hover:scale-105 hover:-translate-y-2 h-full min-h-[360px] sm:min-h-[420px] flex flex-col" };
const _hoisted_5$7 = { class: "px-4 py-5 sm:p-8 flex-1 flex flex-col" };
const _hoisted_6$7 = { class: "flex items-center mb-6" };
const _hoisted_7$6 = { class: "text-lg sm:text-xl md:text-2xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 dark:from-blue-400 dark:to-purple-400 bg-clip-text text-transparent" };
const _hoisted_8$5 = { class: "grid grid-cols-1 sm:grid-cols-2 gap-3 sm:gap-4 flex-1" };
const _hoisted_9$5 = { class: "relative z-10 text-center" };
const _hoisted_10$5 = { class: "text-xs sm:text-sm md:text-base font-medium" };
const _hoisted_11$5 = { class: "relative z-10 text-center" };
const _hoisted_12$4 = { class: "text-xs sm:text-sm md:text-base font-medium" };
const _hoisted_13$4 = { class: "relative z-10 text-center" };
const _hoisted_14$4 = { class: "text-xs sm:text-sm md:text-base font-medium" };
const _hoisted_15$4 = { class: "relative z-10 text-center" };
const _hoisted_16$4 = { class: "text-xs sm:text-sm md:text-base font-medium" };
const _hoisted_17$4 = { class: "group bg-white/80 dark:bg-[#0a0a0a]/80 backdrop-blur-md shadow-xl hover:shadow-2xl rounded-2xl border border-white/20 dark:border-white/10 transition-all duration-500 hover:scale-105 hover:-translate-y-2 h-full min-h-[420px] flex flex-col" };
const _hoisted_18$4 = { class: "px-6 py-8 sm:p-8 flex-1 flex flex-col" };
const _hoisted_19$4 = { class: "flex items-center mb-6" };
const _hoisted_20$4 = { class: "text-lg sm:text-xl md:text-2xl font-bold bg-gradient-to-r from-green-600 to-blue-600 dark:from-green-400 dark:to-blue-400 bg-clip-text text-transparent" };
const _hoisted_21$4 = { class: "space-y-4 flex-1" };
const _hoisted_22$4 = { class: "flex-shrink-0" };
const _hoisted_23$4 = { class: "flex-1 min-w-0" };
const _hoisted_24$4 = { class: "text-xs sm:text-sm md:text-base font-semibold text-gray-900 dark:text-white truncate" };
const _hoisted_25$3 = { class: "text-xs sm:text-sm text-blue-600 dark:text-blue-400 font-medium" };
const _sfc_main$9 = /* @__PURE__ */ defineComponent({
  __name: "DashboardView",
  setup(__props) {
    const LazyLoadComponent2 = defineAsyncComponent(
      loadComponentSafely(() => __vitePreload(() => import("./LazyLoadComponent-C_G5IP7H.js"), true ? __vite__mapDeps([7,1,2,3,8]) : void 0))
    );
    const DashboardHeader = defineAsyncComponent(
      loadComponentSafely(() => __vitePreload(() => import("./DashboardHeader-BK1hS-2p.js"), true ? __vite__mapDeps([9,1]) : void 0))
    );
    const DashboardStats = defineAsyncComponent(
      loadComponentSafely(() => __vitePreload(() => import("./DashboardStats-CWs5SZHg.js"), true ? __vite__mapDeps([10,1]) : void 0))
    );
    const router2 = useRouter();
    const { t } = useI18n();
    const vocabularyStore = useVocabularyStore();
    const stats = computed(() => {
      const allVocabs = vocabularyStore.allVocabularies.value;
      const favoriteCount = vocabularyStore.favoriteVocabularies.value.length;
      const categories2 = vocabularyStore.getCategories.value.length;
      const today = /* @__PURE__ */ new Date();
      const todayStr = today.toISOString().split("T")[0];
      const todayVocabs = allVocabs.filter(
        (v) => v.createdAt && v.createdAt.split("T")[0] === todayStr
      ).length;
      return {
        vocabularyLearned: allVocabs.length,
        grammarLessons: categories2,
        // Use categories count as grammar lessons
        currentStreak: Math.max(1, todayVocabs),
        // At least 1 if there are vocabularies
        totalTime: favoriteCount * 5
        // Estimate 5 minutes per favorite vocabulary
      };
    });
    const recentActivities = computed(() => {
      const allVocabs = vocabularyStore.allVocabularies.value;
      const activities = [];
      const recentVocabs = [...allVocabs].sort((a, b) => {
        const aTime = a.updatedAt || a.createdAt || "";
        const bTime = b.updatedAt || b.createdAt || "";
        return new Date(bTime).getTime() - new Date(aTime).getTime();
      }).slice(0, 4);
      recentVocabs.forEach((vocab, index) => {
        const isUpdated = vocab.updatedAt && vocab.updatedAt !== vocab.createdAt;
        const timeStr = vocab.updatedAt || vocab.createdAt || "";
        const categoryTranslated = t(`categories.${vocab.category}`, vocab.category);
        activities.push({
          id: index + 1,
          title: isUpdated ? t("dashboard.activity.updated", { word: vocab.word, category: categoryTranslated }, `Updated '${vocab.word}' in ${categoryTranslated}`) : t("dashboard.activity.added", { word: vocab.word, category: categoryTranslated }, `Added '${vocab.word}' to ${categoryTranslated}`),
          time: timeStr ? getRelativeTime(timeStr, t) : t("dashboard.activity.justNow", "Just now"),
          iconColor: isUpdated ? "bg-blue-500" : "bg-green-500"
        });
      });
      if (activities.length === 0) {
        activities.push({
          id: 1,
          title: t("dashboard.activity.noActivity", "No recent activity"),
          time: t("dashboard.activity.addFirstVocab", "Add your first vocabulary to get started!"),
          iconColor: "bg-gray-500"
        });
      }
      return activities;
    });
    const navigateTo = (path) => {
      router2.push(path);
    };
    onMounted(() => {
      vocabularyStore.initializeStore();
      console.log("Dashboard mounted with real data");
    });
    return (_ctx, _cache) => {
      return openBlock(), createElementBlock("div", _hoisted_1$9, [
        _cache[20] || (_cache[20] = createStaticVNode('<div class="absolute inset-0 overflow-hidden pointer-events-none z-0"><div class="floating-shapes"><div class="absolute top-20 left-10 w-40 h-40 sm:w-64 sm:h-64 bg-blue-300 dark:bg-blue-500 rounded-full mix-blend-multiply dark:mix-blend-normal filter blur-xl opacity-30 animate-blob"></div><div class="absolute top-40 right-10 w-48 h-48 sm:w-72 sm:h-72 bg-purple-300 dark:bg-purple-500 rounded-full mix-blend-multiply dark:mix-blend-normal filter blur-xl opacity-30 animate-blob animation-delay-2000"></div><div class="absolute -bottom-8 left-20 w-56 h-56 sm:w-80 sm:h-80 bg-pink-300 dark:bg-pink-500 rounded-full mix-blend-multiply dark:mix-blend-normal filter blur-xl opacity-30 animate-blob animation-delay-4000"></div></div></div>', 1)),
        createVNode(unref(LazyLoadComponent2), { "animation-type": "fade-up" }, {
          default: withCtx(() => [
            createVNode(unref(DashboardHeader))
          ]),
          _: 1
        }),
        createBaseVNode("div", _hoisted_2$9, [
          createVNode(unref(LazyLoadComponent2), {
            "animation-type": "slide-up",
            threshold: 0.2
          }, {
            default: withCtx(() => [
              createVNode(unref(DashboardStats), {
                stats: stats.value,
                class: "mb-8"
              }, null, 8, ["stats"])
            ]),
            _: 1
          }),
          createBaseVNode("div", _hoisted_3$8, [
            createVNode(unref(LazyLoadComponent2), {
              "animation-type": "slide-left",
              threshold: 0.15
            }, {
              default: withCtx(() => [
                createBaseVNode("div", _hoisted_4$7, [
                  createBaseVNode("div", _hoisted_5$7, [
                    createBaseVNode("div", _hoisted_6$7, [
                      _cache[4] || (_cache[4] = createBaseVNode("div", { class: "animate-pulse-slow" }, [
                        createBaseVNode("div", { class: "w-3 h-3 bg-gradient-to-r from-blue-400 to-purple-500 rounded-full mr-3" })
                      ], -1)),
                      createBaseVNode("h3", _hoisted_7$6, toDisplayString(unref(t)("dashboard.quickActions", "Quick Actions")), 1)
                    ]),
                    createBaseVNode("div", _hoisted_8$5, [
                      createBaseVNode("button", {
                        onClick: _cache[0] || (_cache[0] = ($event) => navigateTo("/vocabulary")),
                        class: "group/btn relative overflow-hidden bg-gradient-to-r from-blue-500 to-blue-600 hover:from-blue-600 hover:to-blue-700 text-white font-semibold py-3 px-3 sm:py-4 sm:px-4 rounded-xl transition-all duration-300 transform hover:scale-105 hover:shadow-lg active:scale-95"
                      }, [
                        _cache[6] || (_cache[6] = createBaseVNode("div", { class: "absolute inset-0 bg-gradient-to-r from-blue-400 to-blue-500 opacity-0 group-hover/btn:opacity-100 transition-opacity duration-300" }, null, -1)),
                        createBaseVNode("div", _hoisted_9$5, [
                          _cache[5] || (_cache[5] = createBaseVNode("svg", {
                            class: "w-6 h-6 sm:w-7 sm:h-7 md:w-8 md:h-8 mx-auto mb-2 transform group-hover/btn:rotate-180 transition-transform duration-500",
                            fill: "currentColor",
                            viewBox: "0 0 20 20"
                          }, [
                            createBaseVNode("path", {
                              "fill-rule": "evenodd",
                              d: "M10 3a1 1 0 011 1v5h5a1 1 0 110 2h-5v5a1 1 0 11-2 0v-5H4a1 1 0 110-2h5V4a1 1 0 011-1z",
                              "clip-rule": "evenodd"
                            })
                          ], -1)),
                          createBaseVNode("span", _hoisted_10$5, toDisplayString(unref(t)("dashboard.actions.addVocabulary", "Add Vocabulary")), 1)
                        ]),
                        _cache[7] || (_cache[7] = createBaseVNode("div", { class: "absolute inset-0 bg-white opacity-0 group-hover/btn:opacity-20 transition-opacity duration-300" }, null, -1))
                      ]),
                      createBaseVNode("button", {
                        onClick: _cache[1] || (_cache[1] = ($event) => navigateTo("/practice/flashcard")),
                        class: "group/btn relative overflow-hidden bg-gradient-to-r from-green-500 to-green-600 hover:from-green-600 hover:to-green-700 text-white font-semibold py-3 px-3 sm:py-4 sm:px-4 rounded-xl transition-all duration-300 transform hover:scale-105 hover:shadow-lg active:scale-95"
                      }, [
                        _cache[9] || (_cache[9] = createBaseVNode("div", { class: "absolute inset-0 bg-gradient-to-r from-green-400 to-green-500 opacity-0 group-hover/btn:opacity-100 transition-opacity duration-300" }, null, -1)),
                        createBaseVNode("div", _hoisted_11$5, [
                          _cache[8] || (_cache[8] = createBaseVNode("svg", {
                            class: "w-6 h-6 sm:w-7 sm:h-7 md:w-8 md:h-8 mx-auto mb-2 transform group-hover/btn:scale-110 transition-transform duration-300",
                            fill: "currentColor",
                            viewBox: "0 0 20 20"
                          }, [
                            createBaseVNode("path", { d: "M7 3a1 1 0 000 2h6a1 1 0 100-2H7zM4 7a1 1 0 011-1h10a1 1 0 110 2H5a1 1 0 01-1-1zM2 11a2 2 0 012-2h12a2 2 0 012 2v4a2 2 0 01-2 2H4a2 2 0 01-2-2v-4z" })
                          ], -1)),
                          createBaseVNode("span", _hoisted_12$4, toDisplayString(unref(t)("dashboard.actions.practiceFlashcard", "Practice Flashcard")), 1)
                        ]),
                        _cache[10] || (_cache[10] = createBaseVNode("div", { class: "absolute inset-0 bg-white opacity-0 group-hover/btn:opacity-20 transition-opacity duration-300" }, null, -1))
                      ]),
                      createBaseVNode("button", {
                        onClick: _cache[2] || (_cache[2] = ($event) => navigateTo("/practice/quiz")),
                        class: "group/btn relative overflow-hidden bg-gradient-to-r from-yellow-500 to-yellow-600 hover:from-yellow-600 hover:to-yellow-700 text-white font-semibold py-3 px-3 sm:py-4 sm:px-4 rounded-xl transition-all duration-300 transform hover:scale-105 hover:shadow-lg active:scale-95"
                      }, [
                        _cache[12] || (_cache[12] = createBaseVNode("div", { class: "absolute inset-0 bg-gradient-to-r from-yellow-400 to-yellow-500 opacity-0 group-hover/btn:opacity-100 transition-opacity duration-300" }, null, -1)),
                        createBaseVNode("div", _hoisted_13$4, [
                          _cache[11] || (_cache[11] = createBaseVNode("svg", {
                            class: "w-6 h-6 sm:w-7 sm:h-7 md:w-8 md:h-8 mx-auto mb-2 transform group-hover/btn:bounce",
                            fill: "currentColor",
                            viewBox: "0 0 20 20"
                          }, [
                            createBaseVNode("path", {
                              "fill-rule": "evenodd",
                              d: "M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-8-3a1 1 0 00-.867.5 1 1 0 11-1.731-1A3 3 0 0113 8a3.001 3.001 0 01-2 2.83V11a1 1 0 11-2 0v-1a1 1 0 011-1 1 1 0 100-2zm0 8a1 1 0 100-2 1 1 0 000 2z",
                              "clip-rule": "evenodd"
                            })
                          ], -1)),
                          createBaseVNode("span", _hoisted_14$4, toDisplayString(unref(t)("dashboard.actions.takeQuiz", "Take a Quiz")), 1)
                        ]),
                        _cache[13] || (_cache[13] = createBaseVNode("div", { class: "absolute inset-0 bg-white opacity-0 group-hover/btn:opacity-20 transition-opacity duration-300" }, null, -1))
                      ]),
                      createBaseVNode("button", {
                        onClick: _cache[3] || (_cache[3] = ($event) => navigateTo("/grammar")),
                        class: "group/btn relative overflow-hidden bg-gradient-to-r from-purple-500 to-purple-600 hover:from-purple-600 hover:to-purple-700 text-white font-semibold py-3 px-3 sm:py-4 sm:px-4 rounded-xl transition-all duration-300 transform hover:scale-105 hover:shadow-lg active:scale-95"
                      }, [
                        _cache[15] || (_cache[15] = createBaseVNode("div", { class: "absolute inset-0 bg-gradient-to-r from-purple-400 to-purple-500 opacity-0 group-hover/btn:opacity-100 transition-opacity duration-300" }, null, -1)),
                        createBaseVNode("div", _hoisted_15$4, [
                          _cache[14] || (_cache[14] = createBaseVNode("svg", {
                            class: "w-6 h-6 sm:w-7 sm:h-7 md:w-8 md:h-8 mx-auto mb-2 transform group-hover/btn:rotate-12 transition-transform duration-300",
                            fill: "currentColor",
                            viewBox: "0 0 20 20"
                          }, [
                            createBaseVNode("path", { d: "M9 4.804A7.968 7.968 0 005.5 4c-1.255 0-2.443.29-3.5.804v10A7.969 7.969 0 015.5 14c1.669 0 3.218.51 4.5 1.385A7.962 7.962 0 0114.5 14c1.255 0 2.443.29 3.5.804v-10A7.968 7.968 0 0014.5 4c-1.255 0-2.443.29-3.5.804V12a1 1 0 11-2 0V4.804z" })
                          ], -1)),
                          createBaseVNode("span", _hoisted_16$4, toDisplayString(unref(t)("dashboard.actions.learnGrammar", "Learn Grammar")), 1)
                        ]),
                        _cache[16] || (_cache[16] = createBaseVNode("div", { class: "absolute inset-0 bg-white opacity-0 group-hover/btn:opacity-20 transition-opacity duration-300" }, null, -1))
                      ])
                    ])
                  ])
                ])
              ]),
              _: 1
            }),
            createVNode(unref(LazyLoadComponent2), {
              "animation-type": "slide-right",
              threshold: 0.15
            }, {
              default: withCtx(() => [
                createBaseVNode("div", _hoisted_17$4, [
                  createBaseVNode("div", _hoisted_18$4, [
                    createBaseVNode("div", _hoisted_19$4, [
                      _cache[17] || (_cache[17] = createBaseVNode("div", { class: "animate-pulse-slow" }, [
                        createBaseVNode("div", { class: "w-3 h-3 bg-gradient-to-r from-green-400 to-blue-500 rounded-full mr-3" })
                      ], -1)),
                      createBaseVNode("h3", _hoisted_20$4, toDisplayString(unref(t)("dashboard.recentActivity", "Recent Activity")), 1)
                    ]),
                    createBaseVNode("div", _hoisted_21$4, [
                      (openBlock(true), createElementBlock(Fragment, null, renderList(recentActivities.value, (activity, index) => {
                        return openBlock(), createElementBlock("div", {
                          key: activity.id,
                          class: "group/activity flex items-center space-x-4 p-3 rounded-xl hover:bg-white/50 dark:hover:bg-white/5 transition-all duration-300 transform hover:scale-105",
                          style: normalizeStyle({ animationDelay: `${index * 100}ms` })
                        }, [
                          createBaseVNode("div", _hoisted_22$4, [
                            createBaseVNode("div", {
                              class: normalizeClass(["w-10 h-10 rounded-full flex items-center justify-center transform group-hover/activity:rotate-12 group-hover/activity:scale-110 transition-all duration-300", activity.iconColor])
                            }, _cache[18] || (_cache[18] = [
                              createBaseVNode("svg", {
                                class: "w-5 h-5 text-white",
                                fill: "currentColor",
                                viewBox: "0 0 20 20"
                              }, [
                                createBaseVNode("path", {
                                  "fill-rule": "evenodd",
                                  d: "M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z",
                                  "clip-rule": "evenodd"
                                })
                              ], -1)
                            ]), 2)
                          ]),
                          createBaseVNode("div", _hoisted_23$4, [
                            createBaseVNode("p", _hoisted_24$4, toDisplayString(activity.title), 1),
                            createBaseVNode("p", _hoisted_25$3, toDisplayString(activity.time), 1)
                          ]),
                          _cache[19] || (_cache[19] = createBaseVNode("div", { class: "opacity-0 group-hover/activity:opacity-100 transition-opacity duration-300" }, [
                            createBaseVNode("svg", {
                              class: "w-5 h-5 text-blue-500 dark:text-blue-400",
                              fill: "none",
                              stroke: "currentColor",
                              viewBox: "0 0 24 24"
                            }, [
                              createBaseVNode("path", {
                                "stroke-linecap": "round",
                                "stroke-linejoin": "round",
                                "stroke-width": "2",
                                d: "M9 5l7 7-7 7"
                              })
                            ])
                          ], -1))
                        ], 4);
                      }), 128))
                    ])
                  ])
                ])
              ]),
              _: 1
            })
          ])
        ])
      ]);
    };
  }
});
const debugAvailableVoices = () => {
  if ("speechSynthesis" in window) {
    const voices = speechSynthesis.getVoices();
    console.log("=== AVAILABLE VOICES DEBUG ====");
    console.log(`Total voices found: ${voices.length}`);
    voices.forEach((voice2, index) => {
      console.log(`${index + 1}. Name: "${voice2.name}" | Lang: ${voice2.lang} | Local: ${voice2.localService} | Default: ${voice2.default}`);
    });
    const koreanVoices = voices.filter((voice2) => voice2.lang.startsWith("ko"));
    console.log("\n=== KOREAN VOICES DETAIL ====");
    console.log(`Korean voices found: ${koreanVoices.length}`);
    koreanVoices.forEach((voice2, index) => {
      const name = voice2.name.toLowerCase();
      const genderGuess = name.includes("female") || name.includes("woman") ? "👩 Female" : name.includes("male") || name.includes("man") ? "👨 Male" : "❓ Unknown";
      console.log(`🇰🇷 ${index + 1}. "${voice2.name}" | ${genderGuess} | Lang: ${voice2.lang}`);
    });
    console.log("===============================");
    return voices;
  }
  return [];
};
const defaultSettings = {
  "female-sweet": { rate: 0.85, pitch: 1.1, volume: 1 },
  "female-clear": { rate: 1, pitch: 0.95, volume: 1 },
  "female-professional": { rate: 0.9, pitch: 0.85, volume: 1 },
  "male-strong": { rate: 0.8, pitch: 0.7, volume: 1 },
  "male-gentle": { rate: 0.9, pitch: 0.9, volume: 1 },
  "male-deep": { rate: 0.75, pitch: 0.6, volume: 1 },
  "korean-female": { rate: 0.95, pitch: 1.15, volume: 1 },
  "korean-male": { rate: 0.85, pitch: 0.5, volume: 1 }
};
const voiceSettings = ref({ ...defaultSettings });
const currentVoiceType = ref("female-sweet");
const availableVoices = ref([]);
const selectedVoice = ref(null);
const loadVoices = () => {
  if ("speechSynthesis" in window) {
    const voices = speechSynthesis.getVoices();
    console.log("Loading voices, total found:", voices.length);
    debugAvailableVoices();
    const englishVoices = voices.filter((voice2) => voice2.lang.startsWith("en"));
    const koreanVoices = voices.filter((voice2) => voice2.lang.startsWith("ko"));
    const allSupportedVoices = [...englishVoices, ...koreanVoices];
    console.log("English voices found:", englishVoices.length);
    console.log("Korean voices found:", koreanVoices.length);
    console.log("Total supported voices:", allSupportedVoices.length);
    availableVoices.value = allSupportedVoices;
    if (allSupportedVoices.length > 0) {
      updateSelectedVoice();
    }
  }
};
const updateSelectedVoice = () => {
  const voices = availableVoices.value;
  console.log("Updating voice selection, available voices:", voices.length);
  console.log("Current voice type:", currentVoiceType.value);
  if (voices.length === 0) {
    console.log("No voices available, loading voices...");
    loadVoices();
    return;
  }
  let targetVoice = null;
  const englishVoices = voices.filter((voice2) => voice2.lang.startsWith("en"));
  const koreanVoices = voices.filter((voice2) => voice2.lang.startsWith("ko"));
  const femaleVoices = englishVoices.filter((voice2) => {
    const name = voice2.name.toLowerCase();
    return name.includes("female") || name.includes("woman") || name.includes("zira") || name.includes("hazel") || name.includes("cortana") || name.includes("helena") || name.includes("susan") || name.includes("samantha") || name.includes("karen");
  });
  const maleVoices = englishVoices.filter((voice2) => {
    const name = voice2.name.toLowerCase();
    return name.includes("male") || name.includes("man") || name.includes("david") || name.includes("mark") || name.includes("daniel") || name.includes("richard") || name.includes("alex") || name.includes("tom") || name.includes("aaron");
  });
  const koreanFemaleVoices = koreanVoices.filter((voice2) => {
    const name = voice2.name.toLowerCase();
    if (name.includes("female") || name.includes("woman")) return true;
    if (name.includes("heami") || name.includes("yuna") || name.includes("seoyeon") || name.includes("sora") || name.includes("inha") || name.includes("nayeon") || name.includes("clara") || name.includes("aria")) return true;
    if (name.includes("male") || name.includes("man")) return false;
    return false;
  });
  const koreanMaleVoices = koreanVoices.filter((voice2) => {
    const name = voice2.name.toLowerCase();
    if (name.includes("male") || name.includes("man")) return true;
    if (name.includes("minho") || name.includes("woojin") || name.includes("taehyun") || name.includes("jun") || name.includes("alex") || name.includes("david") || name.includes("injoo")) return true;
    if (name.includes("female") || name.includes("woman")) return false;
    return false;
  });
  const remainingKoreanVoices = koreanVoices.filter(
    (voice2) => !koreanFemaleVoices.includes(voice2) && !koreanMaleVoices.includes(voice2)
  );
  if (remainingKoreanVoices.length > 0) {
    const midPoint = Math.ceil(remainingKoreanVoices.length / 2);
    koreanFemaleVoices.push(...remainingKoreanVoices.slice(0, midPoint));
    koreanMaleVoices.push(...remainingKoreanVoices.slice(midPoint));
  }
  console.log(`English Female voices found: ${femaleVoices.length}`, femaleVoices.map((v) => v.name));
  console.log(`English Male voices found: ${maleVoices.length}`, maleVoices.map((v) => v.name));
  console.log(`Korean Female voices found: ${koreanFemaleVoices.length}`, koreanFemaleVoices.map((v) => v.name));
  console.log(`Korean Male voices found: ${koreanMaleVoices.length}`, koreanMaleVoices.map((v) => v.name));
  if (koreanFemaleVoices.length === 0 && koreanMaleVoices.length === 0 && koreanVoices.length > 0) {
    const halfPoint = Math.floor(koreanVoices.length / 2);
    koreanFemaleVoices.push(...koreanVoices.slice(0, halfPoint));
    koreanMaleVoices.push(...koreanVoices.slice(halfPoint));
    console.log("No Korean gender-specific voices found, splitting by index");
  }
  if (femaleVoices.length === 0 && maleVoices.length === 0 && englishVoices.length > 0) {
    const halfPoint = Math.floor(englishVoices.length / 2);
    femaleVoices.push(...englishVoices.slice(0, halfPoint));
    maleVoices.push(...englishVoices.slice(halfPoint));
    console.log("No English gender-specific voices found, splitting by index");
  }
  switch (currentVoiceType.value) {
    case "female-sweet":
      targetVoice = femaleVoices[0] || voices[0];
      console.log("Selected female-sweet:", targetVoice?.name);
      break;
    case "female-clear":
      targetVoice = femaleVoices[1] || femaleVoices[0] || voices[1] || voices[0];
      console.log("Selected female-clear:", targetVoice?.name);
      break;
    case "female-professional":
      targetVoice = femaleVoices[2] || femaleVoices[0] || voices[2] || voices[0];
      console.log("Selected female-professional:", targetVoice?.name);
      break;
    case "male-strong":
      targetVoice = maleVoices[0] || voices[Math.floor(voices.length / 2)] || voices[0];
      console.log("Selected male-strong:", targetVoice?.name);
      break;
    case "male-gentle":
      targetVoice = maleVoices[1] || maleVoices[0] || voices[Math.floor(voices.length / 2) + 1] || voices[0];
      console.log("Selected male-gentle:", targetVoice?.name);
      break;
    case "male-deep":
      targetVoice = maleVoices[2] || maleVoices[0] || voices[Math.floor(voices.length / 2) + 2] || voices[0];
      console.log("Selected male-deep:", targetVoice?.name);
      break;
    case "korean-female":
      targetVoice = koreanVoices[0] || voices[0];
      console.log("🇰🇷👩 KOREAN FEMALE - Selected voice:", targetVoice?.name, "Lang:", targetVoice?.lang);
      break;
    case "korean-male":
      if (koreanVoices.length >= 2) {
        targetVoice = koreanVoices[1];
        console.log("🇰🇷👨 KOREAN MALE - Using second Korean voice:", targetVoice?.name);
      } else if (koreanVoices.length === 1) {
        targetVoice = koreanVoices[0];
        console.log("🇰🇷👨 KOREAN MALE - Using same Korean voice with deep pitch (0.5):", targetVoice?.name);
      } else {
        targetVoice = maleVoices[0] || voices[0];
        console.log("🇰🇷👨 KOREAN MALE - No Korean voices, using male voice:", targetVoice?.name);
      }
      if (!targetVoice) {
        targetVoice = voices[0];
        console.log("⚠️ FALLBACK: Using first available voice:", targetVoice?.name);
      }
      console.log("🇰🇷 Total Korean voices:", koreanVoices.length, koreanVoices.map((v) => v.name));
      console.log("🎯 Final selected voice for Korean Male:", targetVoice?.name, "Lang:", targetVoice?.lang);
      break;
  }
  console.log(`Looking for ${currentVoiceType.value} voice, found:`, targetVoice?.name);
  const previousVoice = selectedVoice.value?.name;
  selectedVoice.value = targetVoice || voices[0] || null;
  console.log("Voice changed from", previousVoice, "to", selectedVoice.value?.name);
};
const loadSettings = () => {
  const saved = localStorage.getItem("voice-settings");
  const savedType = localStorage.getItem("voice-type");
  if (saved) {
    try {
      const parsedSettings = JSON.parse(saved);
      voiceSettings.value = {
        ...defaultSettings,
        ...Object.keys(parsedSettings).reduce((acc, key) => {
          const voiceType = key;
          if (defaultSettings[voiceType]) {
            acc[voiceType] = { ...defaultSettings[voiceType], ...parsedSettings[voiceType] };
          }
          return acc;
        }, {})
      };
    } catch (error) {
      console.error("Error loading voice settings:", error);
      voiceSettings.value = { ...defaultSettings };
    }
  }
  if (savedType) {
    currentVoiceType.value = savedType;
  }
};
const saveSettings = () => {
  localStorage.setItem("voice-settings", JSON.stringify(voiceSettings.value));
  localStorage.setItem("voice-type", currentVoiceType.value);
};
const createUtterance = (text) => {
  updateSelectedVoice();
  const utterance = new SpeechSynthesisUtterance(text);
  utterance.lang = "en-US";
  const settings = voiceSettings.value[currentVoiceType.value];
  utterance.rate = Math.max(0.1, Math.min(10, settings.rate));
  utterance.pitch = Math.max(0, Math.min(2, settings.pitch));
  utterance.volume = Math.max(0, Math.min(1, settings.volume));
  console.log("Creating utterance with voice type:", currentVoiceType.value);
  console.log("Selected voice for utterance:", selectedVoice.value?.name);
  if (selectedVoice.value) {
    utterance.voice = selectedVoice.value;
  }
  return utterance;
};
const playAudio = (text) => {
  return new Promise((resolve, reject) => {
    if (!("speechSynthesis" in window)) {
      console.warn("Speech synthesis not supported");
      reject(new Error("Speech synthesis not supported"));
      return;
    }
    const utterance = createUtterance(text);
    utterance.onend = () => resolve();
    utterance.onerror = (event) => reject(event.error);
    speechSynthesis.speak(utterance);
  });
};
const setVoiceType = (type) => {
  console.log("Setting voice type to:", type);
  currentVoiceType.value = type;
  if (availableVoices.value.length === 0) {
    loadVoices();
  }
  updateSelectedVoice();
  saveSettings();
  console.log("Voice updated to:", selectedVoice.value?.name);
};
const updateVoiceSettings = (type, newSettings) => {
  if (voiceSettings.value[type]) {
    voiceSettings.value[type] = { ...voiceSettings.value[type], ...newSettings };
    saveSettings();
  }
};
const resetVoiceSettings = (type) => {
  if (defaultSettings[type]) {
    voiceSettings.value[type] = { ...defaultSettings[type] };
    saveSettings();
  }
};
const getVoiceTypeOptions = () => {
  const { t } = useI18n();
  return [
    { value: "female-sweet", label: t("voice.types.female_sweet", "Female Sweet"), icon: "👩💖" },
    { value: "female-clear", label: t("voice.types.female_clear", "Female Clear"), icon: "👩💼" },
    { value: "female-professional", label: t("voice.types.female_professional", "Female Professional"), icon: "👩🎯" },
    { value: "male-strong", label: t("voice.types.male_strong", "Male Strong"), icon: "👨💪" },
    { value: "male-gentle", label: t("voice.types.male_gentle", "Male Gentle"), icon: "👨😊" },
    { value: "male-deep", label: t("voice.types.male_deep", "Male Deep"), icon: "👨🎭" },
    { value: "korean-female", label: t("voice.types.korean_female", "Korean Female"), icon: "🇰🇷👩" },
    { value: "korean-male", label: t("voice.types.korean_male", "Korean Male"), icon: "🇰🇷👨" }
  ];
};
const getCurrentVoiceInfo = () => {
  if (!selectedVoice.value) return null;
  const gender = currentVoiceType.value.includes("female") ? "female" : "male";
  return {
    name: selectedVoice.value.name,
    lang: selectedVoice.value.lang,
    gender
  };
};
watch(voiceSettings, () => {
  saveSettings();
}, { deep: true });
watch(currentVoiceType, (newType, oldType) => {
  if (newType !== oldType) {
    console.log("Voice type changed from", oldType, "to", newType);
    updateSelectedVoice();
    saveSettings();
  }
});
if ("speechSynthesis" in window) {
  speechSynthesis.onvoiceschanged = () => {
    loadVoices();
  };
}
loadSettings();
loadVoices();
const forceReloadVoices = () => {
  console.log("🔄 Force reloading voices...");
  if ("speechSynthesis" in window) {
    speechSynthesis.cancel();
    speechSynthesis.getVoices();
    loadVoices();
    debugAvailableVoices();
  }
};
function useVoiceStore() {
  return {
    voiceSettings,
    currentVoiceType,
    availableVoices,
    selectedVoice,
    setVoiceType,
    updateVoiceSettings,
    resetVoiceSettings,
    playAudio,
    createUtterance,
    getVoiceTypeOptions,
    getCurrentVoiceInfo,
    loadVoices,
    forceReloadVoices,
    debugAvailableVoices
  };
}
function getTopicName(categoryKey, vocabularyItem) {
  const { t, locale } = useI18n();
  if (vocabularyItem && vocabularyItem.categoryName) {
    return vocabularyItem.categoryName;
  }
  const customTopics2 = getCustomTopics();
  const customTopic = customTopics2.find((topic) => topic.key === categoryKey);
  if (customTopic) {
    return locale.value === "vi" ? customTopic.vi : customTopic.en;
  }
  const translationKey = `vocabulary.categories.${categoryKey}`;
  const translatedName = t(translationKey);
  if (translatedName && translatedName !== translationKey) {
    return translatedName;
  }
  const builtInCategories = {
    "technology": { vi: "Công nghệ", en: "Technology" },
    "business": { vi: "Kinh doanh", en: "Business" },
    "travel": { vi: "Du lịch", en: "Travel" },
    "food": { vi: "Ẩm thực", en: "Food" },
    "health": { vi: "Sức khỏe", en: "Health" },
    "education": { vi: "Giáo dục", en: "Education" },
    "sports": { vi: "Thể thao", en: "Sports" },
    "entertainment": { vi: "Giải trí", en: "Entertainment" },
    "science": { vi: "Khoa học", en: "Science" },
    "art": { vi: "Nghệ thuật", en: "Art" },
    "music": { vi: "Âm nhạc", en: "Music" },
    "literature": { vi: "Văn học", en: "Literature" },
    "politics": { vi: "Chính trị", en: "Politics" },
    "environment": { vi: "Môi trường", en: "Environment" },
    "fashion": { vi: "Thời trang", en: "Fashion" },
    "finance": { vi: "Tài chính", en: "Finance" }
  };
  if (builtInCategories[categoryKey]) {
    return locale.value === "vi" ? builtInCategories[categoryKey].vi : builtInCategories[categoryKey].en;
  }
  return categoryKey.charAt(0).toUpperCase() + categoryKey.slice(1);
}
function getCustomTopics() {
  try {
    const saved = localStorage.getItem("customTopics");
    if (saved) {
      const topics = JSON.parse(saved);
      return Array.isArray(topics) ? topics : [];
    }
  } catch (error) {
    console.error("Error loading custom topics:", error);
  }
  return [];
}
const _hoisted_1$8 = {
  key: 0,
  class: "fixed inset-0 bg-gray-600 bg-opacity-50 flex items-center justify-center p-4 z-50 backdrop-blur-sm"
};
const _hoisted_2$8 = { class: "w-full max-w-md mx-4" };
const _hoisted_3$7 = { class: "bg-white dark:bg-[#0a0a0a] p-4 border-b border-gray-200 dark:border-white/10" };
const _hoisted_4$6 = { class: "flex items-center justify-between" };
const _hoisted_5$6 = { class: "flex items-center space-x-2" };
const _hoisted_6$6 = { class: "text-lg font-medium text-gray-900 dark:text-white" };
const _hoisted_7$5 = { class: "p-4" };
const _hoisted_8$4 = {
  key: 0,
  class: "mb-4"
};
const _hoisted_9$4 = {
  key: 0,
  class: "mb-4"
};
const _hoisted_10$4 = { class: "text-sm text-gray-500 dark:text-white/60 mb-1" };
const _hoisted_11$4 = { class: "mb-2" };
const _hoisted_12$3 = { class: "text-lg font-medium text-gray-900 dark:text-white" };
const _hoisted_13$3 = { class: "text-sm text-gray-600 dark:text-white/70 bg-gray-50 dark:bg-black/20 px-3 py-2 rounded-md" };
const _hoisted_14$3 = { class: "font-medium" };
const _hoisted_15$3 = { key: 1 };
const _hoisted_16$3 = { class: "text-sm text-gray-500 dark:text-white/60 mb-1" };
const _hoisted_17$3 = { class: "mb-1" };
const _hoisted_18$3 = { class: "text-lg font-medium text-gray-900 dark:text-white" };
const _hoisted_19$3 = { class: "text-gray-500 dark:text-white/60 ml-2" };
const _hoisted_20$3 = { class: "text-sm text-gray-500 dark:text-white/60" };
const _hoisted_21$3 = { class: "mb-4" };
const _hoisted_22$3 = { class: "flex items-center justify-between" };
const _hoisted_23$3 = {
  for: "filterByTopic",
  class: "text-sm font-medium text-gray-700 dark:text-white"
};
const _hoisted_24$3 = { class: "relative inline-flex items-center cursor-pointer" };
const _hoisted_25$2 = {
  key: 0,
  class: "text-xs text-gray-500 dark:text-white/60 mt-1"
};
const _hoisted_26$2 = { class: "font-medium" };
const _hoisted_27$2 = { class: "mb-4" };
const _hoisted_28$2 = {
  for: "targetDate",
  class: "block text-sm font-medium text-gray-700 dark:text-white mb-2"
};
const _hoisted_29$2 = { value: "" };
const _hoisted_30$2 = ["value"];
const _hoisted_31$2 = {
  key: 0,
  class: "text-sm text-gray-500 dark:text-white/60 mt-2"
};
const _hoisted_32$2 = { class: "px-4 py-4 bg-white dark:bg-[#0a0a0a] border-t border-gray-200 dark:border-white/10 flex justify-end space-x-3" };
const _hoisted_33$2 = ["disabled"];
const _sfc_main$8 = /* @__PURE__ */ defineComponent({
  __name: "MoveModal",
  props: {
    showModal: { type: Boolean },
    wordToMove: {},
    availableDateGroups: {},
    sourceDate: {},
    allVocabularies: {}
  },
  emits: ["close", "confirm-move"],
  setup(__props, { emit: __emit }) {
    const { t, locale } = useI18n();
    const props = __props;
    const emit = __emit;
    const selectedTargetDate = ref("");
    const getStoredFilterState = () => {
      try {
        const stored = localStorage.getItem("vocabulary-move-filter-by-topic");
        return stored ? JSON.parse(stored) : false;
      } catch (error) {
        console.warn("Failed to parse stored filter state:", error);
        return false;
      }
    };
    const setStoredFilterState = (value) => {
      try {
        localStorage.setItem("vocabulary-move-filter-by-topic", JSON.stringify(value));
      } catch (error) {
        console.warn("Failed to store filter state:", error);
      }
    };
    const filterBySameTopic = ref(getStoredFilterState());
    watch(filterBySameTopic, (newValue) => {
      setStoredFilterState(newValue);
    });
    const filteredDateGroups = computed(() => {
      console.log("Filter state:", {
        filterBySameTopic: filterBySameTopic.value,
        hasWordToMove: !!props.wordToMove,
        hasAllVocabularies: !!props.allVocabularies,
        allVocabulariesLength: props.allVocabularies?.length
      });
      if (!filterBySameTopic.value || !props.wordToMove || !props.allVocabularies) {
        return props.availableDateGroups;
      }
      const currentCategory = props.wordToMove.categoryName || props.wordToMove.category;
      console.log("Current category:", currentCategory);
      console.log("Word to move:", props.wordToMove);
      if (!currentCategory) {
        return props.availableDateGroups;
      }
      console.log("Sample vocabularies:", props.allVocabularies.slice(0, 3));
      const filtered = props.availableDateGroups.filter((dateGroup) => {
        const groupDate = new Date(dateGroup.date);
        const groupDateStr = groupDate.toISOString().split("T")[0];
        const hasMatch = props.allVocabularies.some((vocab) => {
          if (vocab.category !== currentCategory) return false;
          const vocabDateStr = vocab.createdAt ? new Date(vocab.createdAt).toISOString().split("T")[0] : null;
          const vocabUpdateDateStr = vocab.updatedAt ? new Date(vocab.updatedAt).toISOString().split("T")[0] : null;
          const matches = vocabDateStr === groupDateStr || vocabUpdateDateStr === groupDateStr;
          if (matches) {
            console.log("Found match:", {
              vocab: vocab.word,
              category: vocab.category,
              vocabDate: vocabDateStr,
              groupDate: groupDateStr
            });
          }
          return matches;
        });
        return hasMatch;
      });
      console.log("Filtered result:", filtered.length, "groups");
      return filtered;
    });
    const formatDateForDisplay = (dateStr) => {
      const date = new Date(dateStr);
      return date.toLocaleDateString(locale.value, {
        year: "numeric",
        month: "short",
        day: "numeric"
      });
    };
    const closeModal = () => {
      selectedTargetDate.value = "";
      emit("close");
    };
    const confirmMove = () => {
      if (props.wordToMove && selectedTargetDate.value) {
        emit("confirm-move", {
          word: props.wordToMove,
          targetDate: selectedTargetDate.value
        });
        closeModal();
      }
    };
    watch(() => props.showModal, (newValue) => {
      if (newValue) {
        document.body.classList.add("modal-open");
      } else {
        document.body.classList.remove("modal-open");
        selectedTargetDate.value = "";
      }
    });
    onUnmounted(() => {
      document.body.classList.remove("modal-open");
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
            _ctx.showModal ? (openBlock(), createElementBlock("div", _hoisted_1$8, [
              createVNode(Transition, {
                "enter-active-class": "transition-all duration-500 ease-out",
                "enter-from-class": "opacity-0 scale-90 translate-y-8 rotate-1",
                "enter-to-class": "opacity-100 scale-100 translate-y-0 rotate-0",
                "leave-active-class": "transition-all duration-300 ease-in",
                "leave-from-class": "opacity-100 scale-100 translate-y-0 rotate-0",
                "leave-to-class": "opacity-0 scale-90 translate-y-8 rotate-1"
              }, {
                default: withCtx(() => [
                  createBaseVNode("div", _hoisted_2$8, [
                    createBaseVNode("div", {
                      class: "bg-white dark:bg-[#0a0a0a] shadow-2xl rounded-xl border border-gray-200 dark:border-white/10 overflow-hidden transform",
                      onClick: _cache[2] || (_cache[2] = withModifiers(() => {
                      }, ["stop"]))
                    }, [
                      createBaseVNode("div", _hoisted_3$7, [
                        createBaseVNode("div", _hoisted_4$6, [
                          createBaseVNode("div", _hoisted_5$6, [
                            _cache[3] || (_cache[3] = createBaseVNode("div", { class: "w-2 h-2 bg-green-500 rounded-full" }, null, -1)),
                            createBaseVNode("h3", _hoisted_6$6, toDisplayString(unref(t)("vocabulary.moveVocabulary", "Move Vocabulary")), 1)
                          ]),
                          createBaseVNode("button", {
                            onClick: closeModal,
                            class: "text-gray-400 dark:text-white/60 hover:text-gray-600 dark:hover:text-white transition-all duration-300 hover:scale-110 hover:rotate-90 p-1 rounded-full hover:bg-gray-100 dark:hover:bg-black/20"
                          }, _cache[4] || (_cache[4] = [
                            createBaseVNode("svg", {
                              class: "w-5 h-5",
                              fill: "currentColor",
                              viewBox: "0 0 20 20"
                            }, [
                              createBaseVNode("path", {
                                "fill-rule": "evenodd",
                                d: "M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z",
                                "clip-rule": "evenodd"
                              })
                            ], -1)
                          ]))
                        ])
                      ]),
                      createBaseVNode("div", _hoisted_7$5, [
                        _ctx.wordToMove ? (openBlock(), createElementBlock("div", _hoisted_8$4, [
                          _ctx.wordToMove.isBatchMove ? (openBlock(), createElementBlock("div", _hoisted_9$4, [
                            createBaseVNode("p", _hoisted_10$4, toDisplayString(unref(t)("vocabulary.movingCategory", "Moving all words in category")) + ": ", 1),
                            createBaseVNode("div", _hoisted_11$4, [
                              createBaseVNode("span", _hoisted_12$3, toDisplayString(unref(getTopicName)(_ctx.wordToMove.categoryName || _ctx.wordToMove.category)), 1)
                            ]),
                            createBaseVNode("p", _hoisted_13$3, [
                              createBaseVNode("span", _hoisted_14$3, toDisplayString(_ctx.wordToMove.batchWords?.length || 0), 1),
                              createTextVNode(" " + toDisplayString(unref(t)("vocabulary.wordsWillBeMoved", "words will be moved to the selected date")), 1)
                            ])
                          ])) : (openBlock(), createElementBlock("div", _hoisted_15$3, [
                            createBaseVNode("p", _hoisted_16$3, toDisplayString(unref(t)("vocabulary.movingWord", "Moving word")) + ": ", 1),
                            createBaseVNode("div", _hoisted_17$3, [
                              createBaseVNode("span", _hoisted_18$3, toDisplayString(_ctx.wordToMove.word), 1),
                              createBaseVNode("span", _hoisted_19$3, "- " + toDisplayString(_ctx.wordToMove.meaning), 1)
                            ]),
                            createBaseVNode("p", _hoisted_20$3, " Topic: " + toDisplayString(unref(getTopicName)(_ctx.wordToMove.category)), 1)
                          ]))
                        ])) : createCommentVNode("", true),
                        createBaseVNode("div", _hoisted_21$3, [
                          createBaseVNode("div", _hoisted_22$3, [
                            createBaseVNode("label", _hoisted_23$3, toDisplayString(unref(t)("vocabulary.filterBySameTopic", "Filter by same topic")), 1),
                            createBaseVNode("label", _hoisted_24$3, [
                              withDirectives(createBaseVNode("input", {
                                id: "filterByTopic",
                                "onUpdate:modelValue": _cache[0] || (_cache[0] = ($event) => filterBySameTopic.value = $event),
                                type: "checkbox",
                                class: "sr-only peer"
                              }, null, 512), [
                                [vModelCheckbox, filterBySameTopic.value]
                              ]),
                              _cache[5] || (_cache[5] = createBaseVNode("div", { class: "w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-1 peer-focus:ring-blue-300 dark:peer-focus:ring-blue-800 rounded-full peer dark:bg-gray-700 peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all dark:border-gray-600 peer-checked:bg-blue-600" }, null, -1))
                            ])
                          ]),
                          filterBySameTopic.value ? (openBlock(), createElementBlock("p", _hoisted_25$2, [
                            createTextVNode(toDisplayString(unref(t)("vocabulary.showingDatesWithSameTopic", "Showing only dates with same topic")) + ": ", 1),
                            createBaseVNode("span", _hoisted_26$2, toDisplayString(unref(getTopicName)(_ctx.wordToMove?.categoryName || _ctx.wordToMove?.category || "")), 1)
                          ])) : createCommentVNode("", true)
                        ]),
                        createBaseVNode("div", _hoisted_27$2, [
                          createBaseVNode("label", _hoisted_28$2, toDisplayString(unref(t)("vocabulary.selectTargetDateGroup", "Select target date group")) + ": ", 1),
                          withDirectives(createBaseVNode("select", {
                            id: "targetDate",
                            "onUpdate:modelValue": _cache[1] || (_cache[1] = ($event) => selectedTargetDate.value = $event),
                            class: "w-full px-3 py-2 border border-gray-300 dark:border-white/20 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 bg-white dark:bg-[#0a0a0a] text-gray-900 dark:text-white"
                          }, [
                            createBaseVNode("option", _hoisted_29$2, toDisplayString(unref(t)("vocabulary.selectDate", "Select a date")), 1),
                            (openBlock(true), createElementBlock(Fragment, null, renderList(filteredDateGroups.value, (dateGroup) => {
                              return openBlock(), createElementBlock("option", {
                                key: dateGroup.date,
                                value: dateGroup.date
                              }, toDisplayString(formatDateForDisplay(dateGroup.date)) + " (" + toDisplayString(dateGroup.count) + " words) ", 9, _hoisted_30$2);
                            }), 128))
                          ], 512), [
                            [vModelSelect, selectedTargetDate.value]
                          ]),
                          filteredDateGroups.value.length === 0 ? (openBlock(), createElementBlock("p", _hoisted_31$2, toDisplayString(unref(t)("vocabulary.noMatchingDates", "No dates found with this topic. Try disabling the filter.")), 1)) : createCommentVNode("", true)
                        ])
                      ]),
                      createBaseVNode("div", _hoisted_32$2, [
                        createBaseVNode("button", {
                          onClick: closeModal,
                          class: "px-4 py-2 text-sm font-medium text-gray-700 dark:text-white bg-gray-100 dark:bg-black/40 rounded-md hover:bg-gray-200 dark:hover:bg-black/60 transition-all duration-200 hover:scale-105 hover:shadow-md active:scale-95"
                        }, toDisplayString(unref(t)("common.cancel", "Cancel")), 1),
                        createBaseVNode("button", {
                          onClick: confirmMove,
                          disabled: !selectedTargetDate.value,
                          class: "px-4 py-2 text-sm font-medium text-white bg-blue-600 rounded-md hover:bg-blue-700 disabled:opacity-50 disabled:cursor-not-allowed transition-all duration-200 hover:scale-105 hover:shadow-md hover:-translate-y-0.5 active:scale-95"
                        }, toDisplayString(_ctx.wordToMove?.isBatchMove ? unref(t)("vocabulary.moveAll", "Move All") : unref(t)("vocabulary.moveWord", "Move Word")), 9, _hoisted_33$2)
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
const _export_sfc = (sfc, props) => {
  const target = sfc.__vccOpts || sfc;
  for (const [key, val] of props) {
    target[key] = val;
  }
  return target;
};
const MoveModal = /* @__PURE__ */ _export_sfc(_sfc_main$8, [["__scopeId", "data-v-486a7a22"]]);
function useVocabularyFilters() {
  const searchQuery = ref("");
  const selectedCategory = ref("");
  const selectedLevel = ref("");
  const showFavoritesOnly = ref(false);
  const currentPage = ref(1);
  const dateGroupPages = ref({});
  function getStoredValue(key, defaultValue) {
    try {
      const stored = localStorage.getItem(key);
      return stored !== null ? JSON.parse(stored) : defaultValue;
    } catch {
      return defaultValue;
    }
  }
  function setStoredValue(key, value) {
    localStorage.setItem(key, JSON.stringify(value));
  }
  showFavoritesOnly.value = getStoredValue("vocabulary-show-favorites-only", false);
  searchQuery.value = getStoredValue("vocabulary-search-query", "");
  selectedCategory.value = getStoredValue("vocabulary-selected-category", "");
  selectedLevel.value = getStoredValue("vocabulary-selected-level", "");
  const updateShowFavoritesOnly = (value) => {
    showFavoritesOnly.value = value;
    setStoredValue("vocabulary-show-favorites-only", value);
    currentPage.value = 1;
    dateGroupPages.value = {};
  };
  const updateSearchQuery = (value) => {
    searchQuery.value = value;
    setStoredValue("vocabulary-search-query", value);
    currentPage.value = 1;
    dateGroupPages.value = {};
  };
  const updateSelectedCategory = (value) => {
    selectedCategory.value = value;
    setStoredValue("vocabulary-selected-category", value);
    currentPage.value = 1;
    dateGroupPages.value = {};
  };
  const updateSelectedLevel = (value) => {
    selectedLevel.value = value;
    setStoredValue("vocabulary-selected-level", value);
    currentPage.value = 1;
    dateGroupPages.value = {};
  };
  return {
    searchQuery,
    selectedCategory,
    selectedLevel,
    showFavoritesOnly,
    currentPage,
    dateGroupPages,
    updateShowFavoritesOnly,
    updateSearchQuery,
    updateSelectedCategory,
    updateSelectedLevel
  };
}
function useVocabularyPagination(filteredVocabulary, useGrouping, itemsPerPage) {
  const currentPage = ref(1);
  const totalPages = computed(() => {
    if (useGrouping.value) return 1;
    return Math.ceil(filteredVocabulary.value.length / itemsPerPage.value);
  });
  const paginatedVocabulary = computed(() => {
    if (useGrouping.value) return filteredVocabulary.value;
    const start = (currentPage.value - 1) * itemsPerPage.value;
    const end = start + itemsPerPage.value;
    return filteredVocabulary.value.slice(start, end);
  });
  const startIndex = computed(() => (currentPage.value - 1) * itemsPerPage.value + 1);
  const endIndex = computed(() => Math.min(currentPage.value * itemsPerPage.value, filteredVocabulary.value.length));
  const visiblePages = computed(() => {
    const pages = [];
    const start = Math.max(1, currentPage.value - 2);
    const end = Math.min(totalPages.value, currentPage.value + 2);
    for (let i = start; i <= end; i++) {
      pages.push(i);
    }
    return pages;
  });
  const previousPage = () => {
    if (currentPage.value > 1) currentPage.value--;
  };
  const nextPage = () => {
    if (currentPage.value < totalPages.value) currentPage.value++;
  };
  const goToPage = (page) => {
    currentPage.value = page;
  };
  return {
    currentPage,
    totalPages,
    paginatedVocabulary,
    startIndex,
    endIndex,
    visiblePages,
    previousPage,
    nextPage,
    goToPage
  };
}
function useVocabularyGrouping() {
  const useGrouping = ref(false);
  const itemsPerPageGrouped = ref(5);
  const dateGroupPages = ref({});
  const getStoredUseGrouping = () => {
    const stored = localStorage.getItem("vocabulary-use-grouping");
    return stored ? JSON.parse(stored) : false;
  };
  const setStoredUseGrouping = (value) => {
    localStorage.setItem("vocabulary-use-grouping", JSON.stringify(value));
  };
  useGrouping.value = getStoredUseGrouping();
  const toggleGrouping = () => {
    useGrouping.value = !useGrouping.value;
    setStoredUseGrouping(useGrouping.value);
  };
  const reloadGroupingState = () => {
    useGrouping.value = getStoredUseGrouping();
  };
  const dateGroupPrevious = (date, filteredVocabulary) => {
    const currentPage = dateGroupPages.value[date] || 1;
    if (currentPage > 1) {
      dateGroupPages.value[date] = currentPage - 1;
    }
  };
  const dateGroupNext = (date, filteredVocabulary) => {
    const currentPage = dateGroupPages.value[date] || 1;
    const dateGroup = filteredVocabulary.filter((word) => getDateKey(word.createdAt) === date);
    const totalPages = Math.ceil(dateGroup.length / itemsPerPageGrouped.value);
    if (currentPage < totalPages) {
      dateGroupPages.value[date] = currentPage + 1;
    }
  };
  const dateGroupGoToPage = (date, page) => {
    dateGroupPages.value[date] = page;
  };
  return {
    useGrouping,
    itemsPerPageGrouped,
    dateGroupPages,
    toggleGrouping,
    reloadGroupingState,
    dateGroupPrevious,
    dateGroupNext,
    dateGroupGoToPage
  };
}
function useVocabularyDialogs() {
  const showFormDialog = ref(false);
  const selectedVocabulary = ref(null);
  const showDetailDialog = ref(false);
  const selectedVocabularyForDetail = ref(null);
  const openAddDialog = () => {
    selectedVocabulary.value = null;
    showFormDialog.value = true;
    window.dispatchEvent(new CustomEvent("vocabulary-edit-word"));
  };
  const openEditDialog = (word) => {
    selectedVocabulary.value = word;
    showFormDialog.value = true;
    window.dispatchEvent(new CustomEvent("vocabulary-edit-word"));
  };
  const onVocabularySaved = () => {
    showFormDialog.value = false;
    selectedVocabulary.value = null;
  };
  const openDetailsDialog = (word) => {
    selectedVocabularyForDetail.value = word;
    showDetailDialog.value = true;
    window.dispatchEvent(new CustomEvent("vocabulary-view-details"));
  };
  const openEditFromDetail = (word) => {
    showDetailDialog.value = false;
    selectedVocabulary.value = word;
    showFormDialog.value = true;
    window.dispatchEvent(new CustomEvent("vocabulary-edit-word"));
  };
  return {
    showFormDialog,
    selectedVocabulary,
    showDetailDialog,
    selectedVocabularyForDetail,
    openAddDialog,
    openEditDialog,
    onVocabularySaved,
    openDetailsDialog,
    openEditFromDetail
  };
}
function useTopicManager(debounceAutoSave) {
  const showTopicManager = ref(false);
  const vocabularyStore = useVocabularyStore();
  const modalStore = useModalStore();
  const openTopicManager = () => {
    showTopicManager.value = true;
    modalStore.setTopicManager(true);
  };
  watch(showTopicManager, (newValue) => {
    modalStore.setTopicManager(newValue);
  });
  const onTopicAdded = (topic) => {
    vocabularyStore.addCustomTopic(topic);
    debounceAutoSave();
    window.dispatchEvent(new CustomEvent("topics-updated"));
  };
  const onTopicUpdated = (oldKey, topic) => {
    vocabularyStore.allVocabularies.value.forEach((vocab) => {
      if (vocab.category === oldKey) {
        vocabularyStore.updateVocabulary(vocab.id, { category: topic.key });
      }
    });
    vocabularyStore.updateCustomTopic(oldKey, topic);
    debounceAutoSave();
    window.dispatchEvent(new CustomEvent("topics-updated"));
  };
  const onTopicDeleted = (key) => {
    vocabularyStore.deleteCustomTopic(key);
    debounceAutoSave();
    window.dispatchEvent(new CustomEvent("topics-updated"));
  };
  return {
    showTopicManager,
    openTopicManager,
    onTopicAdded,
    onTopicUpdated,
    onTopicDeleted
  };
}
const ConfirmToast = defineAsyncComponent(() => __vitePreload(() => import("./ConfirmToast-C2z7ONQ6.js"), true ? __vite__mapDeps([11,1]) : void 0));
function useVocabularySaving() {
  const { t } = useI18n();
  const vocabularyStore = useVocabularyStore();
  const toast = useToast();
  const autoSaveEnabled = ref(true);
  const isSaving = ref(false);
  const lastSaveTime = ref("");
  const saveStatus = ref("idle");
  const autoSaveFileHandle = ref(null);
  const hasAutoSaveFile = ref(false);
  const autoSaveFileName = "vocabulary-auto-backup.json";
  let autoSaveTimer = null;
  let debounceTimer = null;
  const autoSaveFilePath = ref("");
  const DB_NAME = "vocabulary-file-handles";
  const DB_VERSION = 1;
  const STORE_NAME = "file-handles";
  const FILE_HANDLE_KEY = "auto-save-file-handle";
  const openDB = () => {
    return new Promise((resolve, reject) => {
      const request = indexedDB.open(DB_NAME, DB_VERSION);
      request.onerror = () => reject(request.error);
      request.onsuccess = () => resolve(request.result);
      request.onupgradeneeded = (event) => {
        const db = event.target.result;
        if (!db.objectStoreNames.contains(STORE_NAME)) {
          db.createObjectStore(STORE_NAME);
        }
      };
    });
  };
  const saveFileHandleToIDB = async (fileHandle) => {
    try {
      const db = await openDB();
      const transaction = db.transaction([STORE_NAME], "readwrite");
      const store = transaction.objectStore(STORE_NAME);
      await new Promise((resolve, reject) => {
        const request = store.put(fileHandle, FILE_HANDLE_KEY);
        request.onerror = () => reject(request.error);
        request.onsuccess = () => resolve();
      });
      console.log("File handle saved to IndexedDB");
    } catch (error) {
      console.error("Error saving file handle to IndexedDB:", error);
    }
  };
  const loadFileHandleFromIDB = async () => {
    try {
      const db = await openDB();
      const transaction = db.transaction([STORE_NAME], "readonly");
      const store = transaction.objectStore(STORE_NAME);
      return new Promise((resolve, reject) => {
        const request = store.get(FILE_HANDLE_KEY);
        request.onerror = () => reject(request.error);
        request.onsuccess = () => resolve(request.result || null);
      });
    } catch (error) {
      console.error("Error loading file handle from IndexedDB:", error);
      return null;
    }
  };
  const clearFileHandleFromIDB = async () => {
    try {
      const db = await openDB();
      const transaction = db.transaction([STORE_NAME], "readwrite");
      const store = transaction.objectStore(STORE_NAME);
      await new Promise((resolve, reject) => {
        const request = store.delete(FILE_HANDLE_KEY);
        request.onerror = () => reject(request.error);
        request.onsuccess = () => resolve();
      });
      console.log("File handle cleared from IndexedDB");
    } catch (error) {
      console.error("Error clearing file handle from IndexedDB:", error);
    }
  };
  const getStoredValue = (key, defaultValue) => {
    try {
      const stored = localStorage.getItem(key);
      return stored !== null ? JSON.parse(stored) : defaultValue;
    } catch {
      return defaultValue;
    }
  };
  const setStoredValue = (key, value) => {
    localStorage.setItem(key, JSON.stringify(value));
  };
  autoSaveEnabled.value = getStoredValue("vocabulary-auto-save-enabled", true);
  hasAutoSaveFile.value = getStoredValue("vocabulary-has-auto-save-file", false);
  lastSaveTime.value = getStoredValue("vocabulary-last-save-time", "");
  const initializeAutoSave = async () => {
    console.log("🔧 Initializing auto-save, hasAutoSaveFile:", hasAutoSaveFile.value);
    if (hasAutoSaveFile.value && "showSaveFilePicker" in window) {
      try {
        console.log("🔍 Attempting to restore file handle from IndexedDB...");
        const savedFileHandle = await loadFileHandleFromIDB();
        if (savedFileHandle) {
          console.log("✅ Found saved file handle in IndexedDB");
          try {
            const opts = { mode: "readwrite" };
            const permission = await savedFileHandle.queryPermission(opts);
            console.log("🔐 File handle permission:", permission);
            if (permission === "granted" || permission === "prompt") {
              autoSaveFileHandle.value = savedFileHandle;
              console.log("✅ File handle restored to autoSaveFileHandle");
              try {
                const fileProps = await savedFileHandle.getFile();
                autoSaveFilePath.value = fileProps.name;
                console.log("📁 File handle restored successfully:", fileProps.name);
                if (permission === "prompt") {
                  console.log("🔄 Requesting permission for file handle...");
                  await savedFileHandle.requestPermission(opts);
                }
              } catch (e) {
                console.log("⚠️ Could not get file properties, but handle seems valid:", e);
              }
            } else {
              console.log("❌ File handle permission denied, clearing stored handle");
              await clearFileHandleFromIDB();
              hasAutoSaveFile.value = false;
              setStoredValue("vocabulary-has-auto-save-file", false);
            }
          } catch (error) {
            console.log("❌ Saved file handle is invalid, clearing:", error);
            await clearFileHandleFromIDB();
            hasAutoSaveFile.value = false;
            setStoredValue("vocabulary-has-auto-save-file", false);
          }
        } else {
          console.log("❌ No file handle found in IndexedDB");
          hasAutoSaveFile.value = false;
          setStoredValue("vocabulary-has-auto-save-file", false);
        }
      } catch (error) {
        console.error("❌ Error initializing auto-save:", error);
        hasAutoSaveFile.value = false;
        setStoredValue("vocabulary-has-auto-save-file", false);
      }
    } else {
      console.log("ℹ️ Auto-save not enabled or File System API not supported");
    }
  };
  const saveToFileSystem = async (data) => {
    try {
      const fileHandle = await window.showSaveFilePicker({
        suggestedName: `vocabulary-backup-${(/* @__PURE__ */ new Date()).toISOString().split("T")[0]}.json`,
        types: [{
          description: "JSON files",
          accept: { "application/json": [".json"] }
        }]
      });
      const writable = await fileHandle.createWritable();
      await writable.write(JSON.stringify(data, null, 2));
      await writable.close();
      autoSaveFileHandle.value = fileHandle;
      hasAutoSaveFile.value = true;
      setStoredValue("vocabulary-has-auto-save-file", true);
      await saveFileHandleToIDB(fileHandle);
    } catch (error) {
      if (error.name !== "AbortError") {
        await downloadJsonFile(data);
      }
    }
  };
  const downloadJsonFile = async (data) => {
    const jsonString = JSON.stringify(data, null, 2);
    const blob = new Blob([jsonString], { type: "application/json" });
    const url = URL.createObjectURL(blob);
    const link = document.createElement("a");
    link.href = url;
    link.download = `vocabulary-backup-${(/* @__PURE__ */ new Date()).toISOString().split("T")[0]}.json`;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    URL.revokeObjectURL(url);
  };
  const getVocabularyData = () => {
    const getGroupTopics = () => {
      try {
        const stored = localStorage.getItem("vocabulary-group-topics");
        return stored ? JSON.parse(stored) : {};
      } catch (error) {
        return {};
      }
    };
    const getVocabularyNotes = () => {
      try {
        const stored = localStorage.getItem("vocabulary-notes");
        return stored ? JSON.parse(stored) : {};
      } catch (error) {
        return {};
      }
    };
    const getMarkedWords = () => {
      try {
        const stored = localStorage.getItem("vocabulary-marked-words");
        return stored ? JSON.parse(stored) : {};
      } catch (error) {
        return {};
      }
    };
    const getGrammarRules = () => {
      try {
        const stored = localStorage.getItem("grammar-rules");
        return stored ? JSON.parse(stored) : [];
      } catch (error) {
        return [];
      }
    };
    const getCategoryName = (categoryKey) => {
      const customTopics2 = getCustomTopics();
      const customTopic = customTopics2.find((topic) => topic.key === categoryKey);
      if (customTopic) {
        return customTopic.en;
      }
      const builtInCategories = {
        "technology": "Technology",
        "business": "Business",
        "travel": "Travel",
        "food": "Food",
        "health": "Health",
        "education": "Education",
        "sports": "Sports",
        "entertainment": "Entertainment",
        "science": "Science",
        "art": "Art",
        "music": "Music",
        "literature": "Literature",
        "politics": "Politics",
        "environment": "Environment",
        "fashion": "Fashion",
        "finance": "Finance"
      };
      return builtInCategories[categoryKey] || categoryKey.charAt(0).toUpperCase() + categoryKey.slice(1);
    };
    const enhancedVocabularies = vocabularyStore.allVocabularies.value.map((vocab) => ({
      ...vocab,
      categoryName: getCategoryName(vocab.category)
      // Add category name alongside category key
    }));
    return {
      vocabularies: enhancedVocabularies,
      customTopics: vocabularyStore.customTopics.value,
      groupTopics: getGroupTopics(),
      vocabularyNotes: getVocabularyNotes(),
      markedWords: getMarkedWords(),
      grammarRules: getGrammarRules(),
      // Include grammar rules in export
      accordionState: JSON.parse(localStorage.getItem("vocabulary-accordion-state") || "{}"),
      useGrouping: JSON.parse(localStorage.getItem("vocabulary-use-grouping") || "false"),
      // Save grouping state
      exportDate: (/* @__PURE__ */ new Date()).toISOString(),
      version: "1.5",
      // Increment version to indicate grammar rules support
      totalCount: vocabularyStore.totalCount.value
    };
  };
  const manualSave = async () => {
    if (isSaving.value) return;
    isSaving.value = true;
    saveStatus.value = "saving";
    try {
      const vocabularyData = getVocabularyData();
      if ("showSaveFilePicker" in window) {
        await saveToFileSystem(vocabularyData);
      } else {
        await downloadJsonFile(vocabularyData);
      }
      vocabularyStore.saveToLocalStorage();
      const now = (/* @__PURE__ */ new Date()).toLocaleString("vi-VN");
      lastSaveTime.value = now;
      setStoredValue("vocabulary-last-save-time", now);
      saveStatus.value = "success";
      setTimeout(() => {
        if (saveStatus.value === "success") saveStatus.value = "idle";
      }, 2e3);
    } catch (error) {
      saveStatus.value = "error";
      setTimeout(() => {
        if (saveStatus.value === "error") saveStatus.value = "idle";
      }, 3e3);
    } finally {
      isSaving.value = false;
    }
  };
  const performAutoSave = async () => {
    if (!autoSaveEnabled.value) return;
    try {
      saveStatus.value = "saving";
      const vocabularyData = getVocabularyData();
      vocabularyStore.saveToLocalStorage();
      let fileSaveSuccess = false;
      if (hasAutoSaveFile.value) {
        fileSaveSuccess = await tryAutoSaveToFile(vocabularyData);
      }
      const now = (/* @__PURE__ */ new Date()).toLocaleString("vi-VN");
      lastSaveTime.value = now;
      setStoredValue("vocabulary-last-save-time", now);
      saveStatus.value = "success";
      setTimeout(() => {
        if (saveStatus.value === "success") {
          saveStatus.value = "idle";
        }
      }, 1e3);
      return fileSaveSuccess;
    } catch (error) {
      console.error("Auto-save error:", error);
      saveStatus.value = "error";
      setTimeout(() => {
        if (saveStatus.value === "error") {
          saveStatus.value = "idle";
        }
      }, 2e3);
      return false;
    }
  };
  const tryAutoSaveToFile = async (data) => {
    if (!("showSaveFilePicker" in window)) {
      console.log("Browser doesn't support File System Access API");
      return false;
    }
    if (!autoSaveFileHandle.value) {
      console.log("No auto-save file handle available");
      return false;
    }
    try {
      console.log("Attempting to auto-save to file...", autoSaveFilePath.value);
      const opts = { mode: "readwrite" };
      const permission = await autoSaveFileHandle.value.queryPermission(opts);
      if (permission !== "granted") {
        console.log("Requesting permission to write to file...");
        const newPermission = await autoSaveFileHandle.value.requestPermission(opts);
        if (newPermission !== "granted") {
          console.error("Permission to write to file denied");
          toast.error(t("vocabulary.save.errors.permissionDenied", "Permission denied"));
          return false;
        }
      }
      console.log("Creating writable stream...");
      const writable = await autoSaveFileHandle.value.createWritable();
      const jsonString = JSON.stringify(data, null, 2);
      console.log(`Writing ${jsonString.length} characters to file...`);
      await writable.write(jsonString);
      console.log("Closing writable stream...");
      await writable.close();
      console.log("Auto-save to file completed successfully:", autoSaveFilePath.value);
      const now = (/* @__PURE__ */ new Date()).toLocaleString("vi-VN");
      lastSaveTime.value = now;
      setStoredValue("vocabulary-last-save-time", now);
      return true;
    } catch (error) {
      console.error("Error auto-saving to file:", error);
      if (error instanceof DOMException && error.name === "NotAllowedError") {
        toast.error(t("vocabulary.save.errors.permissionDenied", "Permission denied"));
      } else {
        toast.error(t("vocabulary.save.errors.autoSaveFileFailed", "Auto save file failed"));
      }
      if (!(error instanceof DOMException && error.name === "NotAllowedError")) {
        autoSaveFileHandle.value = null;
        hasAutoSaveFile.value = false;
        setStoredValue("vocabulary-has-auto-save-file", false);
        await clearFileHandleFromIDB();
      }
      return false;
    }
  };
  const debounceAutoSave = () => {
    if (!autoSaveEnabled.value) {
      console.log("Auto-save is disabled, skipping debounce");
      return;
    }
    console.log("Setting up debounce auto-save timer...");
    if (debounceTimer) {
      console.log("Clearing existing debounce timer");
      clearTimeout(debounceTimer);
      debounceTimer = null;
    }
    console.log("Creating new debounce timer");
    debounceTimer = setTimeout(async () => {
      console.log("Debounce timer triggered, performing auto-save...");
      if (!hasAutoSaveFile.value) {
        console.log("No auto-save file selected, saving to localStorage only");
        vocabularyStore.saveToLocalStorage();
        return;
      }
      const result = await performAutoSave();
      console.log("Auto-save result:", result ? "Success" : "Failed");
      if (!result) {
        toast.info(t("vocabulary.save.autoSaveRetry", "Auto save failed. Click to select a new file.") || "Auto save failed. Click to select a new file.", {
          timeout: 5e3,
          onClick: () => {
            setupAutoSaveFile();
          }
        });
      }
    }, 500);
  };
  const scheduleAutoSave = () => {
    if (autoSaveTimer) clearTimeout(autoSaveTimer);
    autoSaveTimer = window.setTimeout(() => {
      if (autoSaveEnabled.value) {
        performAutoSave();
        scheduleAutoSave();
      }
    }, 1e4);
  };
  const setupAutoSaveFile = async () => {
    if ("showSaveFilePicker" in window) {
      try {
        console.log("Setting up auto-save file...");
        const fileHandle = await window.showSaveFilePicker({
          suggestedName: autoSaveFileName,
          types: [{ description: "JSON files", accept: { "application/json": [".json"] } }]
        });
        autoSaveFileHandle.value = fileHandle;
        await saveFileHandleToIDB(fileHandle);
        try {
          const fileProps = await fileHandle.getFile();
          autoSaveFilePath.value = fileProps.name;
          console.log("Selected auto-save file:", fileProps.name);
        } catch (e) {
          console.log("Could not get file properties:", e);
        }
        hasAutoSaveFile.value = true;
        setStoredValue("vocabulary-has-auto-save-file", true);
        const vocabularyData = getVocabularyData();
        console.log("Testing auto-save with file handle:", autoSaveFileHandle.value);
        const saveResult = await tryAutoSaveToFile(vocabularyData);
        if (saveResult) {
          toast.success(t("vocabulary.save.autoSaveFileSetup", "Auto save file setup"));
          console.log("Auto-save file setup successful!");
        } else {
          toast.error(t("vocabulary.save.errors.autoSaveFileFailed", "Auto save file failed"));
          console.error("Auto-save file setup failed!");
        }
      } catch (error) {
        if (error.name !== "AbortError") {
          console.error("Error setting up auto-save file:", error);
          toast.error(t("vocabulary.save.errors.fileSelectError", { error: error.message }) || `File selection error: ${error.message}`);
        }
      }
    } else {
      toast.error(t("vocabulary.save.errors.browserNotSupported", "Browser not supported"));
    }
  };
  const handleFileImport = (file) => {
    if (!file || !file.name.endsWith(".json")) {
      toast.error(t("vocabulary.save.errors.invalidFile", "Invalid file"));
      return;
    }
    const toastId = toast(
      {
        component: ConfirmToast,
        props: {
          message: t("vocabulary.save.import.confirmMessage", { filename: file.name }, `Import ${file.name}? This will replace all current vocabulary.`),
          confirmText: t("common.confirm", "Confirm"),
          cancelText: t("common.cancel", "Cancel"),
          onConfirm: () => {
            const reader = new FileReader();
            reader.onload = (e) => {
              isSaving.value = true;
              try {
                const text = e.target?.result;
                const data = JSON.parse(text);
                if (!data.vocabularies || !Array.isArray(data.vocabularies)) {
                  toast.error(t("vocabulary.save.errors.invalidFile", "Invalid file"));
                  isSaving.value = false;
                  return;
                }
                vocabularyStore.importVocabularies(data.vocabularies);
                if (data.customTopics && Array.isArray(data.customTopics)) {
                  localStorage.setItem("customTopics", JSON.stringify(data.customTopics));
                  vocabularyStore.refreshCustomTopics();
                  console.log("Imported custom topics:", data.customTopics);
                }
                if (data.topics && Array.isArray(data.topics)) {
                  localStorage.setItem("customTopics", JSON.stringify(data.topics));
                  vocabularyStore.refreshCustomTopics();
                  console.log("Imported legacy topics:", data.topics);
                }
                if (data.groupTopics && typeof data.groupTopics === "object") {
                  localStorage.setItem("vocabulary-group-topics", JSON.stringify(data.groupTopics));
                  console.log("Imported group topics:", data.groupTopics);
                }
                if (data.accordionState && typeof data.accordionState === "object") {
                  localStorage.setItem("vocabulary-accordion-state", JSON.stringify(data.accordionState));
                  console.log("Imported accordion state:", data.accordionState);
                }
                if (typeof data.useGrouping === "boolean") {
                  localStorage.setItem("vocabulary-use-grouping", JSON.stringify(data.useGrouping));
                  console.log("Imported grouping state:", data.useGrouping);
                }
                if (data.vocabularyNotes && typeof data.vocabularyNotes === "object") {
                  localStorage.setItem("vocabulary-notes", JSON.stringify(data.vocabularyNotes));
                  console.log("Imported vocabulary notes:", data.vocabularyNotes);
                }
                if (data.markedWords && typeof data.markedWords === "object") {
                  localStorage.setItem("vocabulary-marked-words", JSON.stringify(data.markedWords));
                  console.log("Imported marked words:", data.markedWords);
                }
                if (data.grammarRules && Array.isArray(data.grammarRules)) {
                  localStorage.setItem("grammar-rules", JSON.stringify(data.grammarRules));
                  console.log("Imported grammar rules:", data.grammarRules);
                }
                isSaving.value = false;
                let importMessage = t("vocabulary.save.import.successMessage", { count: data.vocabularies.length }, `Successfully imported ${data.vocabularies.length} vocabulary words`);
                if (data.customTopics?.length > 0) {
                  importMessage += ` + ${data.customTopics.length} custom categories`;
                }
                if (data.groupTopics && Object.keys(data.groupTopics).length > 0) {
                  importMessage += ` + ${Object.keys(data.groupTopics).length} group topics`;
                }
                if (typeof data.useGrouping === "boolean") {
                  importMessage += ` + grouping preference`;
                }
                if (data.vocabularyNotes && Object.keys(data.vocabularyNotes).length > 0) {
                  importMessage += ` + ${Object.keys(data.vocabularyNotes).length} vocabulary notes`;
                }
                if (data.markedWords && Object.keys(data.markedWords).length > 0) {
                  let totalMarkedWords = 0;
                  Object.values(data.markedWords).forEach((words) => {
                    if (Array.isArray(words)) {
                      totalMarkedWords += words.length;
                    }
                  });
                  importMessage += ` + ${totalMarkedWords} marked words`;
                }
                if (data.grammarRules && data.grammarRules.length > 0) {
                  importMessage += ` + ${data.grammarRules.length} grammar rules`;
                }
                toast.success(importMessage);
                window.dispatchEvent(new CustomEvent("vocabularyImportComplete", {
                  detail: { useGrouping: data.useGrouping }
                }));
                if (autoSaveEnabled.value) {
                  debounceAutoSave();
                }
              } catch (error) {
                isSaving.value = false;
                console.error(t("vocabulary.save.errors.invalidFile"), error);
                toast.error(t("vocabulary.save.errors.invalidFile", "Invalid file"));
              }
            };
            reader.onerror = () => {
              isSaving.value = false;
              console.error("Error reading file");
              toast.error(t("vocabulary.save.errors.fileReadError", { error: reader.error?.message || "Unknown error" }) || `Error reading file: ${reader.error?.message || "Unknown error"}`);
            };
            reader.readAsText(file);
            toast.dismiss(toastId);
          },
          onCancel: () => {
            isSaving.value = false;
            toast.dismiss(toastId);
          }
        }
      },
      {
        position: POSITION.TOP_CENTER,
        timeout: false,
        closeButton: false,
        draggable: false,
        icon: false
      }
    );
  };
  const resetAutoSaveFile = async () => {
    autoSaveFileHandle.value = null;
    hasAutoSaveFile.value = false;
    setStoredValue("vocabulary-has-auto-save-file", false);
    autoSaveFilePath.value = "";
    await clearFileHandleFromIDB();
    console.log("Auto-save file reset completed");
  };
  const getSaveStatusColor = computed(() => {
    switch (saveStatus.value) {
      case "saving":
        return "bg-yellow-500";
      case "success":
        return "bg-green-500";
      case "error":
        return "bg-red-500";
      default:
        return "bg-gray-400";
    }
  });
  const getSaveStatusText = computed(() => {
    switch (saveStatus.value) {
      case "saving":
        return autoSaveEnabled.value ? t("vocabulary.save.status.autoSaving", "Auto Saving...") : t("vocabulary.save.status.saving", "Saving...");
      case "success":
        if (autoSaveEnabled.value) {
          return hasAutoSaveFile.value ? t("vocabulary.save.status.autoWithFile", "Auto saved to file") : t("vocabulary.save.status.autoLocalStorage", "Auto saved locally");
        }
        return t("vocabulary.save.status.fileSaved", "Saved to file");
      case "error":
        return t("vocabulary.save.status.error", "Save error");
      default:
        if (autoSaveEnabled.value) {
          return hasAutoSaveFile.value ? t("vocabulary.save.status.autoFile", "Auto save ready") : t("vocabulary.save.status.autoNoFile", "Auto save (no file)");
        }
        return t("vocabulary.save.manual", "Manual save");
    }
  });
  onMounted(() => {
    console.log("🚀 Component mounted, initializing auto-save...");
    initializeAutoSave();
  });
  onUnmounted(() => {
    if (autoSaveTimer) clearTimeout(autoSaveTimer);
    if (debounceTimer) clearTimeout(debounceTimer);
  });
  return {
    autoSaveEnabled,
    isSaving,
    lastSaveTime,
    hasAutoSaveFile,
    autoSaveFilePath,
    saveStatus,
    getSaveStatusColor,
    getSaveStatusText,
    manualSave,
    debounceAutoSave,
    scheduleAutoSave,
    setupAutoSaveFile,
    handleFileImport,
    resetAutoSaveFile
  };
}
function useMoveMode() {
  const { t, locale } = useI18n();
  const vocabularyStore = useVocabularyStore();
  const toast = useToast();
  const globalMoveMode = ref(getStoredMoveMode());
  const showMoveModal = ref(false);
  const wordToMove = ref(null);
  const selectedTargetDate = ref("");
  const availableDateGroups = ref([]);
  const currentSourceDate = ref("");
  function getStoredMoveMode() {
    try {
      const stored = localStorage.getItem("vocabulary-global-move-mode-enabled");
      return stored ? JSON.parse(stored) : false;
    } catch (error) {
      console.warn("Failed to parse stored move mode preference:", error);
      return false;
    }
  }
  function setStoredMoveMode(enabled) {
    try {
      localStorage.setItem("vocabulary-global-move-mode-enabled", JSON.stringify(enabled));
    } catch (error) {
      console.warn("Failed to store move mode preference:", error);
    }
  }
  const toggleMoveMode = (enabled) => {
    globalMoveMode.value = enabled;
    setStoredMoveMode(enabled);
  };
  const handleMoveVocabulary = (data) => {
    if (!data.targetDate) {
      wordToMove.value = {
        ...data.word,
        categoryName: data.word.category,
        isBatchMove: false
      };
      currentSourceDate.value = data.sourceDate || "";
      loadAvailableDateGroups(data.word.category);
      showMoveModal.value = true;
    } else {
      performMoveVocabulary(data);
    }
  };
  const loadAvailableDateGroups = (topic) => {
    const allDateGroups = groupVocabulariesByDate(vocabularyStore.allVocabularies.value);
    availableDateGroups.value = allDateGroups.filter((group) => group.date !== currentSourceDate.value).map((group) => ({
      date: group.date,
      count: group.vocabularies.length
    })).sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime());
  };
  const performMoveVocabulary = async (data) => {
    try {
      const wordIndex = vocabularyStore.allVocabularies.value.findIndex((w) => w.id === data.word.id);
      if (wordIndex !== -1) {
        const updatedWord = {
          ...data.word,
          createdAt: data.targetDate,
          updatedAt: data.targetDate
        };
        vocabularyStore.allVocabularies.value[wordIndex] = updatedWord;
        toast.success(
          t(
            "vocabulary.moveSuccess",
            { word: data.word.word, date: formatDateForDisplay(data.targetDate) },
            `Successfully moved "${data.word.word}" to ${formatDateForDisplay(data.targetDate)}`
          ),
          { timeout: 3e3 }
        );
        console.log(`Moved vocabulary "${data.word.word}" to ${data.targetDate}`);
      } else {
        throw new Error("Word not found");
      }
    } catch (error) {
      console.error("Failed to move vocabulary:", error);
      toast.error(
        t(
          "vocabulary.moveError",
          { word: data.word.word, error: error.message },
          `Failed to move "${data.word.word}": ${error.message}`
        ),
        { timeout: 5e3 }
      );
    }
  };
  const formatDateForDisplay = (dateStr) => {
    const date = new Date(dateStr);
    return date.toLocaleDateString(locale.value, {
      year: "numeric",
      month: "short",
      day: "numeric"
    });
  };
  const closeMoveModal = () => {
    showMoveModal.value = false;
    wordToMove.value = null;
    selectedTargetDate.value = "";
    availableDateGroups.value = [];
    currentSourceDate.value = "";
  };
  const confirmMove = (data) => {
    if (data.word.isBatchMove) {
      performBatchMove(data.targetDate);
    } else {
      performMoveVocabulary(data);
    }
    closeMoveModal();
  };
  const handleBatchMoveCategory = (data) => {
    const batchWords = data.words;
    const categoryName = data.topic;
    wordToMove.value = {
      ...batchWords[0],
      isBatchMove: true,
      batchWords,
      categoryName
    };
    currentSourceDate.value = data.sourceDate;
    const allGroups = groupVocabulariesByDate(vocabularyStore.allVocabularies.value);
    availableDateGroups.value = allGroups.filter((group) => group.date !== data.sourceDate).map((group) => ({
      date: group.date,
      count: group.vocabularies.length
    })).sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime());
    showMoveModal.value = true;
  };
  const performBatchMove = async (targetDate) => {
    try {
      const batchWords = wordToMove.value?.batchWords || [];
      const categoryName = wordToMove.value?.categoryName || "";
      batchWords.forEach((word) => {
        const wordIndex = vocabularyStore.allVocabularies.value.findIndex((w) => w.id === word.id);
        if (wordIndex !== -1) {
          const updatedWord = {
            ...word,
            createdAt: targetDate,
            updatedAt: targetDate
          };
          vocabularyStore.allVocabularies.value[wordIndex] = updatedWord;
        }
      });
      toast.success(
        t(
          "vocabulary.batchMoveSuccess",
          { count: batchWords.length, category: categoryName, date: formatDateForDisplay(targetDate) },
          `Successfully moved ${batchWords.length} words from "${categoryName}" to ${formatDateForDisplay(targetDate)}`
        ),
        { timeout: 3e3 }
      );
      console.log(`Batch moved ${batchWords.length} words from category "${categoryName}" to ${targetDate}`);
    } catch (error) {
      console.error("Failed to batch move vocabulary:", error);
      toast.error(
        t(
          "vocabulary.batchMoveError",
          { error: error.message },
          `Failed to batch move: ${error.message}`
        ),
        { timeout: 5e3 }
      );
    }
  };
  return {
    // State
    globalMoveMode,
    showMoveModal,
    wordToMove,
    selectedTargetDate,
    availableDateGroups,
    currentSourceDate,
    // Actions
    toggleMoveMode,
    handleMoveVocabulary,
    handleBatchMoveCategory,
    loadAvailableDateGroups,
    performMoveVocabulary,
    performBatchMove,
    closeMoveModal,
    confirmMove,
    formatDateForDisplay,
    // Helpers
    getStoredMoveMode,
    setStoredMoveMode
  };
}
const _hoisted_1$7 = { class: "min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 dark:from-[#0a0a0a] dark:to-[#0f0f0f] relative overflow-x-hidden" };
const _hoisted_2$7 = { class: "relative z-10 max-w-full sm:max-w-full md:max-w-full lg:max-w-7xl mx-auto px-2 xs:px-3 sm:px-4 md:px-6 lg:px-8 xl:px-10 2xl:px-12 pt-3 sm:pt-6" };
const _hoisted_3$6 = { class: "group bg-white/80 dark:bg-[#0a0a0a]/80 backdrop-blur-md shadow-xl hover:shadow-2xl rounded-2xl border border-white/20 dark:border-white/10 transition-all duration-500 hover:scale-[1.005] p-2 xs:p-3 sm:p-4 md:p-5 lg:p-6 mb-3 xs:mb-4 sm:mb-6" };
const _hoisted_4$5 = { class: "flex items-center mb-4" };
const _hoisted_5$5 = { class: "text-lg sm:text-xl font-bold bg-gradient-to-r from-blue-600 to-indigo-600 dark:from-blue-400 dark:to-indigo-400 bg-clip-text text-transparent" };
const _hoisted_6$5 = { class: "relative z-10 max-w-full sm:max-w-full md:max-w-full lg:max-w-7xl mx-auto py-3 px-2 xs:py-4 xs:px-3 sm:py-6 sm:px-4 md:px-6 lg:px-8 xl:px-10 2xl:px-12 overflow-x-hidden" };
const _hoisted_7$4 = { class: "group bg-white/80 dark:bg-[#0a0a0a]/80 backdrop-blur-md shadow-xl hover:shadow-2xl rounded-2xl border border-white/20 dark:border-white/10 transition-all duration-500 hover:scale-[1.005] mb-3 xs:mb-4 sm:mb-6 p-2 xs:p-3 sm:p-4 md:p-5 lg:p-6" };
const _hoisted_8$3 = { class: "flex items-center mb-4" };
const _hoisted_9$3 = { class: "text-base sm:text-lg font-semibold bg-gradient-to-r from-blue-600 to-purple-600 dark:from-blue-400 dark:to-purple-400 bg-clip-text text-transparent" };
const _hoisted_10$3 = { class: "group bg-white/80 dark:bg-[#0a0a0a]/80 backdrop-blur-md shadow-xl hover:shadow-2xl rounded-2xl border border-white/20 dark:border-white/10 transition-all duration-500 hover:scale-[1.005] mb-3 xs:mb-4 sm:mb-6 p-2 xs:p-3 sm:p-4 md:p-5 lg:p-6" };
const _hoisted_11$3 = { class: "flex items-center mb-4" };
const _hoisted_12$2 = { class: "text-base sm:text-lg font-semibold bg-gradient-to-r from-green-600 to-blue-600 dark:from-green-400 dark:to-blue-400 bg-clip-text text-transparent" };
const _hoisted_13$2 = { class: "group bg-white/80 dark:bg-[#0a0a0a]/80 backdrop-blur-md shadow-xl hover:shadow-2xl rounded-2xl border border-white/20 dark:border-white/10 transition-all duration-500 hover:scale-[1.01] p-2 xs:p-3 sm:p-4 md:p-5 lg:p-6 mb-3 xs:mb-4 sm:mb-6 overflow-x-hidden" };
const _hoisted_14$2 = { class: "flex items-center mb-4" };
const _hoisted_15$2 = { class: "text-base sm:text-lg font-semibold bg-gradient-to-r from-purple-600 to-pink-600 dark:from-purple-400 dark:to-pink-400 bg-clip-text text-transparent" };
const _hoisted_16$2 = { class: "group bg-white/80 dark:bg-[#0a0a0a]/80 backdrop-blur-md shadow-xl hover:shadow-2xl rounded-2xl border border-white/20 dark:border-white/10 transition-all duration-500 hover:scale-[1.005] mb-3 xs:mb-4 sm:mb-6 p-2 xs:p-3 sm:p-4 md:p-5 lg:p-6" };
const _hoisted_17$2 = { class: "flex items-center mb-4" };
const _hoisted_18$2 = { class: "text-base sm:text-lg font-semibold bg-gradient-to-r from-yellow-600 to-orange-600 dark:from-yellow-400 dark:to-orange-400 bg-clip-text text-transparent" };
const _hoisted_19$2 = { class: "group bg-white/80 dark:bg-[#0a0a0a]/80 backdrop-blur-md shadow-xl hover:shadow-2xl rounded-2xl border border-white/20 dark:border-white/10 transition-all duration-500 hover:scale-[1.005] mb-3 xs:mb-4 sm:mb-6 p-2 xs:p-3 sm:p-4 md:p-5 lg:p-6" };
const _hoisted_20$2 = { class: "flex items-center mb-4" };
const _hoisted_21$2 = { class: "text-base sm:text-lg font-semibold bg-gradient-to-r from-cyan-600 to-blue-600 dark:from-cyan-400 dark:to-blue-400 bg-clip-text text-transparent" };
const _hoisted_22$2 = { class: "group bg-white/80 dark:bg-[#0a0a0a]/80 backdrop-blur-md shadow-xl hover:shadow-2xl rounded-2xl border border-white/20 dark:border-white/10 transition-all duration-500 hover:scale-[1.003] p-2 xs:p-3 sm:p-4 md:p-5 lg:p-6" };
const _hoisted_23$2 = { class: "fixed bottom-6 z-50 left-1/2 translate-x-4 md:translate-x-4 lg:left-auto lg:right-6 lg:translate-x-0" };
const _hoisted_24$2 = {
  key: 0,
  class: "absolute bottom-full left-1/2 transform -translate-x-1/2 mb-2 px-2 py-1 text-xs font-medium text-white bg-gray-900 dark:bg-black dark:text-white dark:border dark:border-dark-bg-mute rounded shadow-lg whitespace-nowrap z-50"
};
const HOVER_EXPAND_STORAGE_KEY = "vocabulary-hover-expand-enabled";
const _sfc_main$7 = /* @__PURE__ */ defineComponent({
  __name: "VocabularyListView",
  setup(__props) {
    const LazyLoadComponent2 = defineAsyncComponent(() => __vitePreload(() => import("./LazyLoadComponent-C_G5IP7H.js"), true ? __vite__mapDeps([7,1,2,3,8]) : void 0));
    const GroupingToggle = defineAsyncComponent(() => __vitePreload(() => import("./GroupingToggle-CLGsUdN4.js"), true ? __vite__mapDeps([12,1]) : void 0));
    const TopicManagerPanel = defineAsyncComponent(() => __vitePreload(() => import("./TopicManagerPanel-CArn7IHK.js"), true ? __vite__mapDeps([13,1]) : void 0));
    const SaveControlPanel = defineAsyncComponent(() => __vitePreload(() => import("./SaveControlPanel-BvhjFnL-.js"), true ? __vite__mapDeps([14,1]) : void 0));
    const VocabularyHeader = defineAsyncComponent(() => __vitePreload(() => import("./VocabularyHeader-CStp18uX.js"), true ? __vite__mapDeps([15,1]) : void 0));
    const VocabularyFilters = defineAsyncComponent(() => __vitePreload(() => import("./VocabularyFilters-CZiJjeY8.js"), true ? __vite__mapDeps([16,1,2,3]) : void 0));
    const VocabularyList = defineAsyncComponent(() => __vitePreload(() => import("./VocabularyList-r5RLX8Q1.js"), true ? __vite__mapDeps([17,1,2,3]) : void 0));
    const VocabularyFormDialog = defineAsyncComponent(() => __vitePreload(() => import("./VocabularyFormDialog-DmLdxJ7p.js"), true ? __vite__mapDeps([18,1,2,3,19]) : void 0));
    const VocabularyDetailDialog = defineAsyncComponent(() => __vitePreload(() => import("./VocabularyDetailDialog-CMoqV-aF.js"), true ? __vite__mapDeps([20,1,2,3,21]) : void 0));
    const VocabularyNoteDialog = defineAsyncComponent(() => __vitePreload(() => import("./VocabularyNoteDialog-rJeDJU3b.js"), true ? __vite__mapDeps([22,1,2,3,23]) : void 0));
    const GrammarManagerModal = defineAsyncComponent(() => __vitePreload(() => import("./GrammarManagerModal-BbXcg-Er.js"), true ? __vite__mapDeps([24,1,2,3,25]) : void 0));
    const VoiceSelector2 = defineAsyncComponent(() => __vitePreload(() => import("./VoiceSelector-BXW_Bt2k.js"), true ? __vite__mapDeps([26,1,2,3]) : void 0));
    const TopicManager = defineAsyncComponent(() => __vitePreload(() => import("./TopicManager-B6adKRRq.js"), true ? __vite__mapDeps([27,1,2,3,28]) : void 0));
    const ConfirmToast2 = defineAsyncComponent(() => __vitePreload(() => import("./ConfirmToast-C2z7ONQ6.js"), true ? __vite__mapDeps([11,1]) : void 0));
    const { t, locale } = useI18n();
    const toast = useToast();
    const vocabularyStore = useVocabularyStore();
    const voiceStore = useVoiceStore();
    const modalStore = useModalStore();
    const itemsPerPage = ref(5);
    const {
      searchQuery,
      selectedCategory,
      selectedLevel,
      showFavoritesOnly,
      updateShowFavoritesOnly,
      updateSearchQuery,
      updateSelectedCategory,
      updateSelectedLevel
    } = useVocabularyFilters();
    const {
      useGrouping,
      itemsPerPageGrouped,
      dateGroupPages,
      toggleGrouping,
      reloadGroupingState,
      dateGroupPrevious,
      dateGroupNext,
      dateGroupGoToPage
    } = useVocabularyGrouping();
    const getStoredHoverState = () => {
      try {
        const stored = localStorage.getItem(HOVER_EXPAND_STORAGE_KEY);
        return stored ? JSON.parse(stored) : false;
      } catch (error) {
        console.warn("Failed to load hover expand state from localStorage:", error);
        return false;
      }
    };
    const setStoredHoverState = (enabled) => {
      try {
        localStorage.setItem(HOVER_EXPAND_STORAGE_KEY, JSON.stringify(enabled));
      } catch (error) {
        console.warn("Failed to save hover expand state to localStorage:", error);
      }
    };
    const hoverToExpandEnabled = ref(getStoredHoverState());
    const {
      globalMoveMode,
      showMoveModal,
      wordToMove,
      availableDateGroups,
      currentSourceDate,
      toggleMoveMode,
      handleMoveVocabulary,
      handleBatchMoveCategory,
      closeMoveModal,
      confirmMove
    } = useMoveMode();
    const showNoteDialog = ref(false);
    const noteDialogDate = ref("");
    const noteDialogWords = ref([]);
    const filteredVocabulary = computed(() => {
      return vocabularyStore.allVocabularies.value.filter((word) => {
        const matchesSearch = !searchQuery.value || word.word.toLowerCase().includes(searchQuery.value.toLowerCase()) || word.meaning.toLowerCase().includes(searchQuery.value.toLowerCase());
        const matchesCategory = !selectedCategory.value || word.category === selectedCategory.value;
        const matchesLevel = !selectedLevel.value || word.level === selectedLevel.value;
        const matchesFavorite = !showFavoritesOnly.value || word.favorite === true;
        return matchesSearch && matchesCategory && matchesLevel && matchesFavorite;
      });
    });
    const {
      currentPage,
      totalPages,
      paginatedVocabulary,
      startIndex,
      endIndex,
      visiblePages,
      previousPage,
      nextPage,
      goToPage
    } = useVocabularyPagination(filteredVocabulary, useGrouping, itemsPerPage);
    const {
      showFormDialog,
      selectedVocabulary,
      showDetailDialog,
      selectedVocabularyForDetail,
      openAddDialog,
      openEditDialog,
      onVocabularySaved: originalOnVocabularySaved,
      openDetailsDialog,
      openEditFromDetail
    } = useVocabularyDialogs();
    const recentlyAddedCategory = ref(null);
    const onVocabularySaved = (data) => {
      originalOnVocabularySaved();
      targetDateForNewVocabulary.value = null;
      if (data?.category) {
        recentlyAddedCategory.value = data.category;
        console.log("Recently added category:", data.category);
      }
      if (autoSaveEnabled.value) {
        debounceAutoSave();
        console.log("Auto-save triggered from Add Word in date group");
      }
      if (useGrouping.value) {
        nextTick(() => {
          reloadGroupingState();
          console.log("Grouping state reloaded after vocabulary saved");
        });
      }
    };
    const {
      autoSaveEnabled,
      isSaving,
      lastSaveTime,
      hasAutoSaveFile,
      saveStatus,
      getSaveStatusColor,
      getSaveStatusText,
      manualSave,
      debounceAutoSave,
      scheduleAutoSave,
      setupAutoSaveFile,
      handleFileImport,
      resetAutoSaveFile,
      autoSaveFilePath
    } = useVocabularySaving();
    const {
      showTopicManager,
      openTopicManager,
      onTopicAdded,
      onTopicUpdated,
      onTopicDeleted
    } = useTopicManager(debounceAutoSave);
    const categories2 = computed(() => {
      const usedCategories = new Set(vocabularyStore.allVocabularies.value.map((vocab) => vocab.category));
      return Array.from(usedCategories).sort();
    });
    const categoryUsage = computed(() => vocabularyStore.getCategoryUsage.value);
    const showStickyButtonVisible = computed(() => {
      return showStickyButton.value && !showFormDialog.value && !modalStore.shouldHideAddNewWord;
    });
    const deleteWord = (word) => {
      const toastId = toast(
        {
          component: ConfirmToast2,
          props: {
            message: t("vocabulary.confirmDelete", { word: word.word }),
            confirmText: t("common.confirm"),
            cancelText: t("common.cancel"),
            onConfirm: () => {
              vocabularyStore.deleteVocabulary(word.id);
              debounceAutoSave();
              toast.dismiss(toastId);
              toast.success(t("vocabulary.deleteSuccess", { word: word.word }) || `Successfully deleted "${word.word}"`);
            },
            onCancel: () => {
              toast.dismiss(toastId);
            }
          }
        },
        {
          position: POSITION.TOP_CENTER,
          timeout: false,
          closeButton: false,
          draggable: false,
          icon: false
        }
      );
    };
    const toggleFavorite = (word) => {
      vocabularyStore.toggleFavorite(word.id);
      if (selectedVocabularyForDetail.value && selectedVocabularyForDetail.value.id === word.id) {
        selectedVocabularyForDetail.value.favorite = !selectedVocabularyForDetail.value.favorite;
      }
      debounceAutoSave();
    };
    const playAudio2 = async (word) => {
      try {
        const utterance = voiceStore.createUtterance(word);
        await new Promise((resolve, reject) => {
          utterance.onend = () => resolve();
          utterance.onerror = (event) => reject(event.error);
          if ("speechSynthesis" in window) {
            speechSynthesis.speak(utterance);
          } else {
            reject(new Error("Speech synthesis not supported"));
          }
        });
      } catch (error) {
        console.error("Error playing audio:", error);
        if ("speechSynthesis" in window) {
          const utterance = new SpeechSynthesisUtterance(word);
          utterance.lang = "en-US";
          speechSynthesis.speak(utterance);
        }
      }
    };
    watch(
      () => vocabularyStore.allVocabularies.value,
      (newVocabularies, oldVocabularies) => {
        const newCount = newVocabularies?.length || 0;
        const oldCount = oldVocabularies?.length || 0;
        if (autoSaveEnabled.value && newCount > 0 && oldCount !== void 0 && newCount !== oldCount) {
          saveStatus.value = "saving";
          debounceAutoSave();
        }
        if (useGrouping.value && newCount !== oldCount && newCount > 0) {
          nextTick(() => {
            reloadGroupingState();
            console.log("Grouping state reloaded due to vocabulary count change");
          });
        }
      },
      { deep: true, immediate: false }
    );
    watch(
      () => vocabularyStore.allVocabularies.value.map((v) => ({ id: v.id, favorite: v.favorite, word: v.word, meaning: v.meaning })),
      (newData, oldData) => {
        if (autoSaveEnabled.value && newData.length > 0 && oldData && JSON.stringify(newData) !== JSON.stringify(oldData)) {
          debounceAutoSave();
        }
      },
      { deep: true }
    );
    watch(
      hoverToExpandEnabled,
      (newValue) => {
        setStoredHoverState(newValue);
      }
    );
    watch(showNoteDialog, (newValue) => {
      if (newValue) {
        document.body.classList.add("modal-open");
      } else {
        if (!showFormDialog.value) {
          document.body.classList.remove("modal-open");
        }
      }
      modalStore.setNoteDialog(newValue);
    });
    watch(showFormDialog, (newValue) => {
      if (newValue) {
        document.body.classList.add("modal-open");
        showStickyTooltip.value = false;
      } else {
        if (!showNoteDialog.value) {
          document.body.classList.remove("modal-open");
        }
      }
      modalStore.setVocabularyForm(newValue);
    });
    onMounted(() => {
      vocabularyStore.initializeStore();
      if (autoSaveEnabled.value) {
        scheduleAutoSave();
      }
      window.addEventListener("vocabulary-notes-updated", () => {
        if (autoSaveEnabled.value) {
          debounceAutoSave();
        }
      });
      window.addEventListener("grammar-rules-updated", () => {
        if (autoSaveEnabled.value) {
          debounceAutoSave();
        }
      });
      window.addEventListener("scroll", handleScroll, { passive: true });
      handleScroll();
    });
    const handleFileImportWithReload = (file) => {
      const handleImportComplete = (event) => {
        nextTick(() => {
          reloadGroupingState();
          console.log("Grouping state reloaded after import");
        });
        window.removeEventListener("vocabularyImportComplete", handleImportComplete);
      };
      window.addEventListener("vocabularyImportComplete", handleImportComplete);
      handleFileImport(file);
    };
    const showStickyButton = ref(false);
    const showStickyTooltip = ref(false);
    const headerHeight = ref(0);
    ref(false);
    const lastScrollY = ref(0);
    const handleScroll = () => {
      const scrollY = window.scrollY;
      const headerElement = document.querySelector("[data-vocabulary-header]") || document.querySelector("header");
      if (headerHeight.value === 0 && headerElement) {
        headerHeight.value = headerElement.offsetHeight;
      }
      const originalAddButton = document.querySelector("[data-original-add-button]") || document.querySelector(".vocabulary-header button");
      let originalButtonVisible = false;
      if (originalAddButton) {
        const rect = originalAddButton.getBoundingClientRect();
        originalButtonVisible = rect.top >= 0 && rect.top < window.innerHeight / 2;
      }
      const headerBottom = headerHeight.value || 120;
      const shouldShowSticky = scrollY > headerBottom && !originalButtonVisible;
      showStickyButton.value = shouldShowSticky;
      lastScrollY.value = scrollY;
    };
    const openNoteDialog = (date, words) => {
      noteDialogDate.value = date;
      noteDialogWords.value = words;
      showNoteDialog.value = true;
    };
    const targetDateForNewVocabulary = ref(null);
    const showGrammarManagerModal = ref(false);
    const grammarManagerDate = ref(null);
    const openAddVocabularyForDate = (date) => {
      targetDateForNewVocabulary.value = date;
      selectedVocabulary.value = null;
      showFormDialog.value = true;
      window.dispatchEvent(new CustomEvent("vocabulary-edit-word"));
    };
    const openGrammarManagerForDate = (date) => {
      console.log("Opening grammar manager for date:", date);
      grammarManagerDate.value = date;
      showGrammarManagerModal.value = true;
      modalStore.setGrammarManager(true);
      console.log("Modal state:", showGrammarManagerModal.value);
    };
    watch(showGrammarManagerModal, (newValue) => {
      if (newValue) {
        document.body.classList.add("modal-open");
      } else {
        if (!showNoteDialog.value && !showFormDialog.value) {
          document.body.classList.remove("modal-open");
        }
      }
      modalStore.setGrammarManager(newValue);
    });
    const handleNoteSaved = (note, markedWords) => {
      toast.success(t("vocabulary.notes.saveSuccess", "Notes saved successfully"), {
        timeout: 2e3
      });
      if (autoSaveEnabled.value) {
        toast.info(t("vocabulary.notes.autoSaveNotice", "Notes will be included in auto-save"), {
          timeout: 3e3
        });
        debounceAutoSave();
      }
      console.log(`Note saved for ${noteDialogDate.value} with ${markedWords.length} marked words`);
    };
    watch(hoverToExpandEnabled, (newValue) => {
      setStoredHoverState(newValue);
    });
    watch(globalMoveMode, (newValue) => {
      toggleMoveMode(newValue);
    });
    onUnmounted(() => {
      window.removeEventListener("vocabularyImportComplete", () => {
      });
      window.removeEventListener("vocabulary-notes-updated", () => {
      });
      window.removeEventListener("grammar-rules-updated", () => {
      });
      window.removeEventListener("scroll", handleScroll);
      document.body.classList.remove("modal-open");
    });
    return (_ctx, _cache) => {
      return openBlock(), createElementBlock("div", _hoisted_1$7, [
        _cache[21] || (_cache[21] = createStaticVNode('<div class="absolute inset-0 overflow-hidden pointer-events-none z-0"><div class="floating-shapes"><div class="absolute top-20 left-10 w-64 h-64 bg-blue-300 dark:bg-blue-500 rounded-full mix-blend-multiply dark:mix-blend-normal filter blur-xl opacity-30 animate-blob"></div><div class="absolute top-40 right-10 w-72 h-72 bg-purple-300 dark:bg-purple-500 rounded-full mix-blend-multiply dark:mix-blend-normal filter blur-xl opacity-30 animate-blob animation-delay-2000"></div><div class="absolute -bottom-8 left-20 w-80 h-80 bg-pink-300 dark:bg-pink-500 rounded-full mix-blend-multiply dark:mix-blend-normal filter blur-xl opacity-30 animate-blob animation-delay-4000"></div><div class="hidden sm:block absolute top-10 left-1/2 -translate-x-1/2 w-40 h-40 bg-cyan-300 dark:bg-cyan-500 rounded-full mix-blend-multiply dark:mix-blend-normal filter blur-xl opacity-25 animate-blob animation-delay-1000"></div><div class="hidden sm:block absolute bottom-24 right-24 w-52 h-52 bg-indigo-300 dark:bg-indigo-500 rounded-full mix-blend-multiply dark:mix-blend-normal filter blur-xl opacity-25 animate-blob animation-delay-3000"></div><div class="hidden md:block absolute top-1/3 right-1/3 w-36 h-36 bg-emerald-300 dark:bg-emerald-500 rounded-full mix-blend-multiply dark:mix-blend-normal filter blur-xl opacity-30 animate-blob animation-delay-1500"></div><div class="hidden md:block absolute -bottom-20 -right-10 w-96 h-96 bg-blue-200 dark:bg-blue-600 rounded-full mix-blend-multiply dark:mix-blend-normal filter blur-2xl opacity-20 animate-blob animation-delay-2500"></div><div class="hidden lg:block absolute top-1/2 -left-16 w-72 h-72 bg-fuchsia-300 dark:bg-fuchsia-500 rounded-full mix-blend-multiply dark:mix-blend-normal filter blur-xl opacity-25 animate-blob animation-delay-3500"></div><div class="hidden xl:block absolute top-6 right-1/4 w-44 h-44 bg-teal-300 dark:bg-teal-500 rounded-full mix-blend-multiply dark:mix-blend-normal filter blur-xl opacity-25 animate-blob animation-delay-500"></div><div class="hidden sm:block absolute top-1/4 left-6 w-24 h-24 bg-sky-300 dark:bg-sky-500 rounded-full mix-blend-multiply dark:mix-blend-normal filter blur-lg opacity-20 animate-blob animation-delay-4500"></div><div class="hidden sm:block absolute bottom-8 left-1/3 w-28 h-28 bg-rose-300 dark:bg-rose-500 rounded-full mix-blend-multiply dark:mix-blend-normal filter blur-lg opacity-20 animate-blob animation-delay-5500"></div><div class="hidden md:block absolute top-16 right-1/3 w-20 h-20 bg-violet-300 dark:bg-violet-500 rounded-full mix-blend-multiply dark:mix-blend-normal filter blur-lg opacity-20 animate-blob animation-delay-6500"></div><div class="hidden md:block absolute bottom-1/3 right-6 w-24 h-24 bg-lime-300 dark:bg-lime-500 rounded-full mix-blend-multiply dark:mix-blend-normal filter blur-lg opacity-20 animate-blob animation-delay-7500"></div><div class="hidden lg:block absolute top-3/4 left-1/4 w-32 h-32 bg-amber-300 dark:bg-amber-500 rounded-full mix-blend-multiply dark:mix-blend-normal filter blur-xl opacity-20 animate-blob animation-delay-8500"></div><div class="hidden lg:block absolute top-8 right-8 w-16 h-16 bg-orange-300 dark:bg-orange-500 rounded-full mix-blend-multiply dark:mix-blend-normal filter blur-md opacity-25 animate-blob animation-delay-1200"></div><div class="hidden xl:block absolute bottom-10 left-1/2 -translate-x-1/2 w-28 h-28 bg-cyan-200 dark:bg-cyan-600 rounded-full mix-blend-multiply dark:mix-blend-normal filter blur-xl opacity-15 animate-blob animation-delay-2200"></div><div class="hidden 2xl:block absolute top-1/5 right-1/5 w-40 h-40 bg-indigo-200 dark:bg-indigo-600 rounded-full mix-blend-multiply dark:mix-blend-normal filter blur-2xl opacity-15 animate-blob animation-delay-5200"></div><div class="hidden lg:block absolute -top-24 left-1/3 w-96 h-96 bg-blue-100 dark:bg-blue-700 rounded-full mix-blend-multiply dark:mix-blend-normal filter blur-3xl opacity-10 animate-blob animation-delay-900"></div><div class="hidden lg:block absolute bottom-[-120px] left-[-80px] w-[420px] h-[420px] bg-purple-100 dark:bg-purple-700 rounded-full mix-blend-multiply dark:mix-blend-normal filter blur-3xl opacity-10 animate-blob animation-delay-1900"></div><div class="hidden xl:block absolute top-1/3 left-[70%] w-48 h-48 bg-pink-200 dark:bg-pink-600 rounded-full mix-blend-multiply dark:mix-blend-normal filter blur-2xl opacity-15 animate-blob animation-delay-3300"></div><div class="hidden xl:block absolute bottom-1/4 right-[35%] w-32 h-32 bg-cyan-300 dark:bg-cyan-500 rounded-full mix-blend-multiply dark:mix-blend-normal filter blur-xl opacity-15 animate-blob animation-delay-6100"></div><div class="hidden 2xl:block absolute top-[12%] left-[12%] w-56 h-56 bg-emerald-200 dark:bg-emerald-600 rounded-full mix-blend-multiply dark:mix-blend-normal filter blur-2xl opacity-15 animate-blob animation-delay-7100"></div><div class="hidden 2xl:block absolute bottom-[8%] right-[12%] w-64 h-64 bg-teal-200 dark:bg-teal-600 rounded-full mix-blend-multiply dark:mix-blend-normal filter blur-2xl opacity-15 animate-blob animation-delay-9100"></div></div></div>', 1)),
        createBaseVNode("div", _hoisted_2$7, [
          createVNode(unref(LazyLoadComponent2), {
            "animation-type": "fade-up",
            threshold: 0.1,
            "root-margin": "0px"
          }, {
            default: withCtx(() => [
              createBaseVNode("div", _hoisted_3$6, [
                createBaseVNode("div", _hoisted_4$5, [
                  _cache[13] || (_cache[13] = createBaseVNode("div", { class: "animate-pulse-slow" }, [
                    createBaseVNode("div", { class: "w-2.5 h-2.5 bg-gradient-to-r from-blue-400 to-indigo-500 rounded-full mr-2.5" })
                  ], -1)),
                  createBaseVNode("h1", _hoisted_5$5, toDisplayString(unref(t)("vocabulary.header.title", "Vocabulary")), 1)
                ]),
                createVNode(unref(VocabularyHeader), { onAddVocabulary: unref(openAddDialog) }, null, 8, ["onAddVocabulary"])
              ])
            ]),
            _: 1
          })
        ]),
        createBaseVNode("div", _hoisted_6$5, [
          createVNode(unref(LazyLoadComponent2), {
            "animation-type": "slide-left",
            threshold: 0.1,
            "root-margin": "-50px"
          }, {
            default: withCtx(() => [
              createBaseVNode("div", _hoisted_7$4, [
                createBaseVNode("div", _hoisted_8$3, [
                  _cache[14] || (_cache[14] = createBaseVNode("div", { class: "animate-pulse-slow" }, [
                    createBaseVNode("div", { class: "w-2.5 h-2.5 bg-gradient-to-r from-blue-400 to-purple-500 rounded-full mr-2.5" })
                  ], -1)),
                  createBaseVNode("h3", _hoisted_9$3, toDisplayString(unref(t)("vocabulary.filters.title", "Filters")), 1)
                ]),
                createVNode(unref(VocabularyFilters), {
                  "search-query": unref(searchQuery),
                  "selected-category": unref(selectedCategory),
                  "selected-level": unref(selectedLevel),
                  categories: categories2.value,
                  "show-favorites-only": unref(showFavoritesOnly),
                  "onUpdate:searchQuery": unref(updateSearchQuery),
                  "onUpdate:selectedCategory": unref(updateSelectedCategory),
                  "onUpdate:selectedLevel": unref(updateSelectedLevel),
                  "onUpdate:showFavoritesOnly": unref(updateShowFavoritesOnly)
                }, null, 8, ["search-query", "selected-category", "selected-level", "categories", "show-favorites-only", "onUpdate:searchQuery", "onUpdate:selectedCategory", "onUpdate:selectedLevel", "onUpdate:showFavoritesOnly"])
              ])
            ]),
            _: 1
          }),
          createVNode(unref(LazyLoadComponent2), {
            "animation-type": "slide-right",
            threshold: 0.1,
            "root-margin": "-50px"
          }, {
            default: withCtx(() => [
              createBaseVNode("div", _hoisted_10$3, [
                createBaseVNode("div", _hoisted_11$3, [
                  _cache[15] || (_cache[15] = createBaseVNode("div", { class: "animate-pulse-slow" }, [
                    createBaseVNode("div", { class: "w-2.5 h-2.5 bg-gradient-to-r from-green-400 to-blue-500 rounded-full mr-2.5" })
                  ], -1)),
                  createBaseVNode("h3", _hoisted_12$2, toDisplayString(unref(t)("vocabulary.grouping.title", "Grouping & Move Mode")), 1)
                ]),
                createVNode(unref(GroupingToggle), {
                  "model-value": unref(useGrouping),
                  "hover-enabled": hoverToExpandEnabled.value,
                  "move-mode": unref(globalMoveMode),
                  "onUpdate:modelValue": unref(toggleGrouping),
                  "onUpdate:hoverEnabled": _cache[0] || (_cache[0] = ($event) => hoverToExpandEnabled.value = $event),
                  "onUpdate:moveMode": _cache[1] || (_cache[1] = ($event) => globalMoveMode.value = $event)
                }, null, 8, ["model-value", "hover-enabled", "move-mode", "onUpdate:modelValue"])
              ])
            ]),
            _: 1
          }),
          createVNode(unref(LazyLoadComponent2), {
            "animation-type": "scale",
            threshold: 0.1,
            "root-margin": "-50px"
          }, {
            default: withCtx(() => [
              createBaseVNode("div", _hoisted_13$2, [
                createBaseVNode("div", _hoisted_14$2, [
                  _cache[16] || (_cache[16] = createBaseVNode("div", { class: "animate-pulse-slow" }, [
                    createBaseVNode("div", { class: "w-2.5 h-2.5 bg-gradient-to-r from-purple-400 to-pink-500 rounded-full mr-2.5" })
                  ], -1)),
                  createBaseVNode("h3", _hoisted_15$2, toDisplayString(unref(t)("voice.settings.title", "Voice Settings")), 1)
                ]),
                createVNode(unref(VoiceSelector2), { "show-voice-info": true })
              ])
            ]),
            _: 1
          }),
          createVNode(unref(LazyLoadComponent2), {
            "animation-type": "blur",
            threshold: 0.1,
            "root-margin": "-50px"
          }, {
            default: withCtx(() => [
              createBaseVNode("div", _hoisted_16$2, [
                createBaseVNode("div", _hoisted_17$2, [
                  _cache[17] || (_cache[17] = createBaseVNode("div", { class: "animate-pulse-slow" }, [
                    createBaseVNode("div", { class: "w-2.5 h-2.5 bg-gradient-to-r from-yellow-400 to-orange-500 rounded-full mr-2.5" })
                  ], -1)),
                  createBaseVNode("h3", _hoisted_18$2, toDisplayString(unref(t)("vocabulary.topicManager.title", "Topic Manager")), 1)
                ]),
                createVNode(unref(TopicManagerPanel), { onOpen: unref(openTopicManager) }, null, 8, ["onOpen"])
              ])
            ]),
            _: 1
          }),
          createVNode(unref(LazyLoadComponent2), {
            "animation-type": "fade-up",
            threshold: 0.1,
            "root-margin": "-50px"
          }, {
            default: withCtx(() => [
              createBaseVNode("div", _hoisted_19$2, [
                createBaseVNode("div", _hoisted_20$2, [
                  _cache[18] || (_cache[18] = createBaseVNode("div", { class: "animate-pulse-slow" }, [
                    createBaseVNode("div", { class: "w-2.5 h-2.5 bg-gradient-to-r from-cyan-400 to-blue-500 rounded-full mr-2.5" })
                  ], -1)),
                  createBaseVNode("h3", _hoisted_21$2, toDisplayString(unref(t)("vocabulary.save.title", "Save & Sync")), 1)
                ]),
                createVNode(unref(SaveControlPanel), {
                  "auto-save-enabled": unref(autoSaveEnabled),
                  "onUpdate:autoSaveEnabled": _cache[2] || (_cache[2] = ($event) => autoSaveEnabled.value = $event),
                  "is-saving": unref(isSaving),
                  "has-auto-save-file": unref(hasAutoSaveFile),
                  "auto-save-file-path": unref(autoSaveFilePath),
                  "last-save-time": unref(lastSaveTime),
                  "save-status-color": unref(getSaveStatusColor),
                  "save-status-text": unref(getSaveStatusText),
                  onManualSave: unref(manualSave),
                  onSetupAutoSave: unref(setupAutoSaveFile),
                  onResetAutoSave: unref(resetAutoSaveFile),
                  onImportFile: handleFileImportWithReload
                }, null, 8, ["auto-save-enabled", "is-saving", "has-auto-save-file", "auto-save-file-path", "last-save-time", "save-status-color", "save-status-text", "onManualSave", "onSetupAutoSave", "onResetAutoSave"])
              ])
            ]),
            _: 1
          }),
          createVNode(unref(LazyLoadComponent2), {
            "animation-type": "slide-left",
            threshold: 0.05,
            "root-margin": "-50px"
          }, {
            default: withCtx(() => [
              createBaseVNode("div", _hoisted_22$2, [
                createVNode(unref(VocabularyList), {
                  "paginated-words": unref(useGrouping) ? [] : unref(paginatedVocabulary),
                  "current-page": unref(currentPage),
                  "total-pages": unref(totalPages),
                  "total-count": filteredVocabulary.value.length,
                  "start-index": unref(startIndex),
                  "end-index": unref(endIndex),
                  "visible-pages": unref(visiblePages),
                  "use-grouping": unref(useGrouping),
                  "all-words": unref(useGrouping) ? filteredVocabulary.value : void 0,
                  "date-group-pages": unref(dateGroupPages),
                  "items-per-page-grouped": unref(itemsPerPageGrouped),
                  "hover-to-expand-enabled": hoverToExpandEnabled.value,
                  "global-move-mode": unref(globalMoveMode),
                  "recently-added-category": recentlyAddedCategory.value,
                  onPlayAudio: playAudio2,
                  onEditWord: unref(openEditDialog),
                  onDeleteWord: deleteWord,
                  onToggleFavorite: toggleFavorite,
                  onViewDetails: unref(openDetailsDialog),
                  onPreviousPage: unref(previousPage),
                  onNextPage: unref(nextPage),
                  onGoToPage: unref(goToPage),
                  onDateGroupPrevious: _cache[3] || (_cache[3] = (date) => unref(dateGroupPrevious)(date, filteredVocabulary.value)),
                  onDateGroupNext: _cache[4] || (_cache[4] = (date) => unref(dateGroupNext)(date, filteredVocabulary.value)),
                  onDateGroupGoToPage: unref(dateGroupGoToPage),
                  onMoveVocabulary: unref(handleMoveVocabulary),
                  onOpenNoteDialog: openNoteDialog,
                  onOpenAddVocabularyDialog: openAddVocabularyForDate,
                  onOpenGrammarManager: openGrammarManagerForDate,
                  onBatchMoveCategory: unref(handleBatchMoveCategory)
                }, null, 8, ["paginated-words", "current-page", "total-pages", "total-count", "start-index", "end-index", "visible-pages", "use-grouping", "all-words", "date-group-pages", "items-per-page-grouped", "hover-to-expand-enabled", "global-move-mode", "recently-added-category", "onEditWord", "onViewDetails", "onPreviousPage", "onNextPage", "onGoToPage", "onDateGroupGoToPage", "onMoveVocabulary", "onBatchMoveCategory"])
              ])
            ]),
            _: 1
          })
        ]),
        createVNode(unref(VocabularyFormDialog), {
          modelValue: unref(showFormDialog),
          "onUpdate:modelValue": _cache[5] || (_cache[5] = ($event) => isRef(showFormDialog) ? showFormDialog.value = $event : null),
          vocabulary: unref(selectedVocabulary),
          "target-date": targetDateForNewVocabulary.value,
          onVocabularySaved
        }, null, 8, ["modelValue", "vocabulary", "target-date"]),
        createVNode(unref(VocabularyDetailDialog), {
          modelValue: unref(showDetailDialog),
          "onUpdate:modelValue": _cache[6] || (_cache[6] = ($event) => isRef(showDetailDialog) ? showDetailDialog.value = $event : null),
          vocabulary: unref(selectedVocabularyForDetail),
          onEditVocabulary: unref(openEditFromDetail),
          onToggleFavorite: toggleFavorite
        }, null, 8, ["modelValue", "vocabulary", "onEditVocabulary"]),
        createVNode(unref(TopicManager), {
          modelValue: unref(showTopicManager),
          "onUpdate:modelValue": _cache[7] || (_cache[7] = ($event) => isRef(showTopicManager) ? showTopicManager.value = $event : null),
          "vocabulary-usage": categoryUsage.value,
          onTopicAdded: unref(onTopicAdded),
          onTopicUpdated: unref(onTopicUpdated),
          onTopicDeleted: unref(onTopicDeleted)
        }, null, 8, ["modelValue", "vocabulary-usage", "onTopicAdded", "onTopicUpdated", "onTopicDeleted"]),
        createVNode(unref(VocabularyNoteDialog), {
          modelValue: showNoteDialog.value,
          "onUpdate:modelValue": _cache[8] || (_cache[8] = ($event) => showNoteDialog.value = $event),
          date: noteDialogDate.value,
          "today-words": noteDialogWords.value,
          onSaveNote: handleNoteSaved
        }, null, 8, ["modelValue", "date", "today-words"]),
        createVNode(unref(GrammarManagerModal), {
          modelValue: showGrammarManagerModal.value,
          "onUpdate:modelValue": _cache[9] || (_cache[9] = ($event) => showGrammarManagerModal.value = $event),
          selectedDate: grammarManagerDate.value
        }, null, 8, ["modelValue", "selectedDate"]),
        createVNode(Transition, { name: "fade-scale" }, {
          default: withCtx(() => [
            withDirectives(createBaseVNode("div", _hoisted_23$2, [
              createBaseVNode("button", {
                onClick: _cache[10] || (_cache[10] = //@ts-ignore
                (...args) => unref(openAddDialog) && unref(openAddDialog)(...args)),
                onMouseenter: _cache[11] || (_cache[11] = ($event) => showStickyTooltip.value = true),
                onMouseleave: _cache[12] || (_cache[12] = ($event) => showStickyTooltip.value = false),
                class: "relative bg-blue-500 hover:bg-blue-600 text-white font-medium w-12 h-12 sm:w-14 sm:h-14 md:w-16 md:h-16 rounded-full shadow-lg hover:shadow-xl transition-all duration-300 transform hover:scale-105 flex items-center justify-center"
              }, [
                _cache[20] || (_cache[20] = createBaseVNode("svg", {
                  class: "w-6 h-6 sm:w-7 sm:h-7 md:w-8 md:h-8",
                  fill: "currentColor",
                  viewBox: "0 0 20 20"
                }, [
                  createBaseVNode("path", {
                    "fill-rule": "evenodd",
                    d: "M10 3a1 1 0 011 1v5h5a1 1 0 110 2h-5v5a1 1 0 11-2 0v-5H4a1 1 0 110-2h5V4a1 1 0 011-1z",
                    "clip-rule": "evenodd"
                  })
                ], -1)),
                showStickyTooltip.value ? (openBlock(), createElementBlock("div", _hoisted_24$2, [
                  createTextVNode(toDisplayString(unref(t)("vocabulary.addNew", "Add New Word")) + " ", 1),
                  _cache[19] || (_cache[19] = createBaseVNode("div", { class: "absolute top-full left-1/2 transform -translate-x-1/2 w-0 h-0 border-l-4 border-r-4 border-t-4 border-transparent border-t-gray-900 dark:border-t-black" }, null, -1))
                ])) : createCommentVNode("", true)
              ], 32)
            ], 512), [
              [vShow, showStickyButtonVisible.value]
            ])
          ]),
          _: 1
        }),
        createVNode(unref(MoveModal), {
          "show-modal": unref(showMoveModal),
          "word-to-move": unref(wordToMove),
          "available-date-groups": unref(availableDateGroups),
          "source-date": unref(currentSourceDate),
          "all-vocabularies": unref(vocabularyStore).allVocabularies.value,
          onClose: unref(closeMoveModal),
          onConfirmMove: unref(confirmMove)
        }, null, 8, ["show-modal", "word-to-move", "available-date-groups", "source-date", "all-vocabularies", "onClose", "onConfirmMove"])
      ]);
    };
  }
});
const grammarLessons = ref([
  {
    id: "1",
    title: "Present Perfect Tense",
    description: "Học cách sử dụng thì hiện tại hoàn thành trong tiếng Anh với các ví dụ thực tế và bài tập.",
    level: "intermediate",
    category: "Tenses",
    duration: 30,
    rating: 4.8,
    progress: 75,
    exercises: 15,
    theory: `
      <h3>Cấu trúc Present Perfect</h3>
      <p><strong>Khẳng định:</strong> S + have/has + V3/ed</p>
      <p><strong>Phủ định:</strong> S + have/has + not + V3/ed</p>
      <p><strong>Nghi vấn:</strong> Have/Has + S + V3/ed?</p>
      
      <h3>Cách sử dụng</h3>
      <p>Thì hiện tại hoàn thành được sử dụng để:</p>
      <ul>
        <li>Diễn tả hành động đã xảy ra trong quá khứ nhưng không rõ thời gian</li>
        <li>Diễn tả hành động bắt đầu trong quá khứ và tiếp tục đến hiện tại</li>
        <li>Diễn tả kinh nghiệm sống</li>
      </ul>
    `,
    structure: "Subject + have/has + past participle",
    examples: [
      {
        id: 1,
        text: "I have lived in this city for 5 years.",
        translation: "Tôi đã sống ở thành phố này được 5 năm.",
        note: "Hành động bắt đầu trong quá khứ và tiếp tục đến hiện tại"
      },
      {
        id: 2,
        text: "She has just finished her homework.",
        translation: "Cô ấy vừa mới hoàn thành bài tập về nhà.",
        note: "Hành động vừa mới hoàn thành"
      }
    ],
    rules: [
      {
        id: 1,
        title: "Sử dụng với 'for' và 'since'",
        description: "'For' + khoảng thời gian, 'since' + mốc thời gian"
      },
      {
        id: 2,
        title: "Sử dụng với 'already', 'yet', 'just'",
        description: "Các trạng từ này thường đi kèm với thì hiện tại hoàn thành"
      }
    ],
    usageRules: [
      { title: "Sử dụng với 'for' và 'since'", description: "'For' + khoảng thời gian, 'since' + mốc thời gian" },
      { title: "Sử dụng với 'already', 'yet', 'just'", description: "Các trạng từ này thường đi kèm với thì hiện tại hoàn thành" }
    ],
    commonMistakes: [
      {
        id: 1,
        wrong: "I have seen him yesterday.",
        correct: "I saw him yesterday.",
        explanation: "Không dùng Present Perfect với thời gian cụ thể trong quá khứ"
      }
    ]
  }
]);
const useGrammarStore = () => {
  const allLessons = computed(() => grammarLessons.value);
  const getLesson = (id) => {
    return grammarLessons.value.find((lesson) => lesson.id === id);
  };
  const updateLesson = (id, updates) => {
    const index = grammarLessons.value.findIndex((lesson) => lesson.id === id);
    if (index !== -1) {
      grammarLessons.value[index] = { ...grammarLessons.value[index], ...updates };
    }
  };
  const addLesson = (lesson) => {
    grammarLessons.value.push(lesson);
  };
  const deleteLesson = (id) => {
    const index = grammarLessons.value.findIndex((lesson) => lesson.id === id);
    if (index !== -1) {
      grammarLessons.value.splice(index, 1);
    }
  };
  const getRelatedLessons = (currentId, category) => {
    return grammarLessons.value.filter((lesson) => lesson.id !== currentId && lesson.category === category).slice(0, 3).map((lesson) => ({
      id: lesson.id,
      title: lesson.title,
      category: lesson.category
    }));
  };
  return {
    allLessons,
    getLesson,
    updateLesson,
    addLesson,
    deleteLesson,
    getRelatedLessons
  };
};
const _hoisted_1$6 = { class: "min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 dark:from-[#0a0a0a] dark:to-[#0f0f0f] relative overflow-x-hidden" };
const _hoisted_2$6 = { class: "relative z-10 max-w-7xl mx-auto py-6 px-4 sm:px-6 lg:px-8" };
const _hoisted_3$5 = {
  key: 0,
  class: "grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6"
};
const _sfc_main$6 = /* @__PURE__ */ defineComponent({
  __name: "GrammarListView",
  setup(__props) {
    const LazyLoadComponent2 = defineAsyncComponent(() => __vitePreload(() => import("./LazyLoadComponent-C_G5IP7H.js"), true ? __vite__mapDeps([7,1,2,3,8]) : void 0));
    const GrammarHeader = defineAsyncComponent(
      loadComponentSafely(() => __vitePreload(() => import("./GrammarHeader-G66gEm0C.js"), true ? __vite__mapDeps([29,1]) : void 0))
    );
    const GrammarFilters = defineAsyncComponent(
      loadComponentSafely(() => __vitePreload(() => import("./GrammarFilters-BW_K4GAe.js"), true ? __vite__mapDeps([30,1]) : void 0))
    );
    const GrammarCard = defineAsyncComponent(
      loadComponentSafely(() => __vitePreload(() => import("./GrammarCard-D_BW31yO.js"), true ? __vite__mapDeps([31,1]) : void 0))
    );
    const GrammarEmptyState = defineAsyncComponent(
      loadComponentSafely(() => __vitePreload(() => import("./GrammarEmptyState-Y7UYn9u5.js"), true ? __vite__mapDeps([32,1]) : void 0))
    );
    const GrammarFormDialog = defineAsyncComponent(
      loadComponentSafely(() => __vitePreload(() => import("./GrammarFormDialog-DQrj0wgw.js"), true ? __vite__mapDeps([33,1,2,3,34]) : void 0))
    );
    const router2 = useRouter();
    const { t } = useI18n();
    const grammarStore = useGrammarStore();
    const showFormDialog = ref(false);
    const currentEditId = ref("");
    const searchQuery = ref("");
    const selectedLevel = ref("");
    const selectedCategory = ref("");
    const categories2 = ref([
      "Tenses",
      "Conditionals",
      "Passive Voice",
      "Modal Verbs",
      "Reported Speech",
      "Articles",
      "Prepositions",
      "Adjectives & Adverbs",
      "Phrasal Verbs",
      "Gerunds & Infinitives"
    ]);
    const filteredLessons = computed(() => {
      return grammarStore.allLessons.value.filter((lesson) => {
        const matchesSearch = lesson.title.toLowerCase().includes(searchQuery.value.toLowerCase()) || lesson.description.toLowerCase().includes(searchQuery.value.toLowerCase());
        const matchesLevel = !selectedLevel.value || lesson.level === selectedLevel.value;
        const matchesCategory = !selectedCategory.value || lesson.category === selectedCategory.value;
        return matchesSearch && matchesLevel && matchesCategory;
      });
    });
    const openAddDialog = () => {
      currentEditId.value = "";
      showFormDialog.value = true;
    };
    const openEditDialog = (lesson) => {
      currentEditId.value = lesson.id;
      showFormDialog.value = true;
    };
    const onLessonSaved = (lesson) => {
      console.log("Lesson saved:", lesson);
    };
    const viewLesson = (lesson) => {
      router2.push(`/grammar/${lesson.id}`);
    };
    const practiceLesson = (lesson) => {
      router2.push(`/grammar/${lesson.id}/practice`);
    };
    const deleteLesson = (lesson) => {
      if (confirm(t("grammar.confirmDelete", { title: lesson.title }) || `Delete lesson "${lesson.title}"?`)) {
        grammarStore.deleteLesson(lesson.id);
      }
    };
    onMounted(() => {
      console.log("Grammar list mounted");
    });
    return (_ctx, _cache) => {
      return openBlock(), createElementBlock("div", _hoisted_1$6, [
        _cache[4] || (_cache[4] = createStaticVNode('<div class="absolute inset-0 overflow-hidden pointer-events-none z-0" data-v-41de1874><div class="floating-shapes" data-v-41de1874><div class="absolute top-20 left-10 w-64 h-64 bg-blue-300 dark:bg-blue-500 rounded-full mix-blend-multiply dark:mix-blend-normal filter blur-xl opacity-30 animate-blob" data-v-41de1874></div><div class="absolute top-40 right-10 w-72 h-72 bg-purple-300 dark:bg-purple-500 rounded-full mix-blend-multiply dark:mix-blend-normal filter blur-xl opacity-30 animate-blob animation-delay-2000" data-v-41de1874></div><div class="absolute -bottom-8 left-20 w-80 h-80 bg-pink-300 dark:bg-pink-500 rounded-full mix-blend-multiply dark:mix-blend-normal filter blur-xl opacity-30 animate-blob animation-delay-4000" data-v-41de1874></div></div></div>', 1)),
        createVNode(unref(LazyLoadComponent2), { "animation-type": "fade-up" }, {
          default: withCtx(() => [
            createVNode(unref(GrammarHeader), { onAddLesson: openAddDialog })
          ]),
          _: 1
        }),
        createBaseVNode("div", _hoisted_2$6, [
          createVNode(unref(LazyLoadComponent2), {
            "animation-type": "slide-left",
            threshold: 0.2,
            "root-margin": "100px"
          }, {
            default: withCtx(() => [
              createVNode(unref(GrammarFilters), {
                searchQuery: searchQuery.value,
                selectedLevel: selectedLevel.value,
                selectedCategory: selectedCategory.value,
                categories: categories2.value,
                "onUpdate:searchQuery": _cache[0] || (_cache[0] = ($event) => searchQuery.value = $event),
                "onUpdate:selectedLevel": _cache[1] || (_cache[1] = ($event) => selectedLevel.value = $event),
                "onUpdate:selectedCategory": _cache[2] || (_cache[2] = ($event) => selectedCategory.value = $event)
              }, null, 8, ["searchQuery", "selectedLevel", "selectedCategory", "categories"])
            ]),
            _: 1
          }),
          createVNode(unref(LazyLoadComponent2), {
            "animation-type": "scale",
            threshold: 0.2,
            "root-margin": "150px"
          }, {
            default: withCtx(() => [
              filteredLessons.value.length > 0 ? (openBlock(), createElementBlock("div", _hoisted_3$5, [
                (openBlock(true), createElementBlock(Fragment, null, renderList(filteredLessons.value, (lesson) => {
                  return openBlock(), createBlock(unref(GrammarCard), {
                    key: lesson.id,
                    lesson,
                    onViewLesson: viewLesson,
                    onPracticeLesson: practiceLesson,
                    onEditLesson: openEditDialog,
                    onDeleteLesson: deleteLesson
                  }, null, 8, ["lesson"]);
                }), 128))
              ])) : (openBlock(), createBlock(unref(GrammarEmptyState), {
                key: 1,
                onAddLesson: openAddDialog
              }))
            ]),
            _: 1
          })
        ]),
        createVNode(unref(GrammarFormDialog), {
          modelValue: showFormDialog.value,
          "onUpdate:modelValue": _cache[3] || (_cache[3] = ($event) => showFormDialog.value = $event),
          "edit-id": currentEditId.value,
          onSaved: onLessonSaved
        }, null, 8, ["modelValue", "edit-id"])
      ]);
    };
  }
});
const GrammarListView = /* @__PURE__ */ _export_sfc(_sfc_main$6, [["__scopeId", "data-v-41de1874"]]);
const _hoisted_1$5 = { class: "min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 dark:from-[#0a0a0a] dark:to-[#0f0f0f] relative overflow-x-hidden" };
const _hoisted_2$5 = {
  key: 0,
  class: "relative z-10 max-w-4xl mx-auto py-6 px-4 sm:px-6 lg:px-8"
};
const _hoisted_3$4 = {
  key: 1,
  class: "relative z-10 max-w-4xl mx-auto py-6 px-4 sm:px-6 lg:px-8"
};
const _hoisted_4$4 = { class: "group bg-white/80 dark:bg-[#0a0a0a]/80 backdrop-blur-md shadow-xl hover:shadow-2xl rounded-2xl border border-white/20 dark:border-white/10 p-6 mb-6 transition-all duration-500" };
const _hoisted_5$4 = { class: "flex items-center justify-between mb-4" };
const _hoisted_6$4 = { class: "flex space-x-2" };
const _hoisted_7$3 = { class: "flex items-center justify-between" };
const _hoisted_8$2 = { class: "flex items-center mb-1" };
const _hoisted_9$2 = { class: "text-2xl sm:text-3xl font-bold bg-gradient-to-r from-blue-600 to-indigo-600 dark:from-blue-400 dark:to-indigo-400 bg-clip-text text-transparent" };
const _hoisted_10$2 = { class: "mt-2 text-gray-700 dark:text-white/80" };
const _hoisted_11$2 = { class: "text-right" };
const _hoisted_12$1 = { class: "text-sm text-gray-500 dark:text-white/60 mt-2" };
const _hoisted_13$1 = { class: "mt-6" };
const _hoisted_14$1 = { class: "flex justify-between text-sm text-gray-700 dark:text-white/80 mb-2" };
const _hoisted_15$1 = { class: "w-full bg-gray-200 dark:bg-dark-bg-mute rounded-full h-3" };
const _hoisted_16$1 = { class: "grid grid-cols-1 lg:grid-cols-3 gap-6" };
const _hoisted_17$1 = { class: "lg:col-span-2 space-y-6" };
const _hoisted_18$1 = { class: "bg-white/80 dark:bg-[#0a0a0a]/80 backdrop-blur-md shadow-xl rounded-2xl border border-white/20 dark:border-white/10 p-6" };
const _hoisted_19$1 = { class: "text-xl font-semibold text-gray-900 dark:text-white mb-4" };
const _hoisted_20$1 = { class: "prose dark:prose-invert max-w-none" };
const _hoisted_21$1 = ["innerHTML"];
const _hoisted_22$1 = { class: "bg-white/80 dark:bg-[#0a0a0a]/80 backdrop-blur-md shadow-xl rounded-2xl border border-white/20 dark:border-white/10 p-6" };
const _hoisted_23$1 = { class: "text-xl font-semibold text-gray-900 dark:text-white mb-4" };
const _hoisted_24$1 = { class: "space-y-4" };
const _hoisted_25$1 = { class: "text-gray-900 dark:text-white font-medium" };
const _hoisted_26$1 = { class: "text-gray-600 dark:text-white/80 text-sm mt-1" };
const _hoisted_27$1 = {
  key: 0,
  class: "text-gray-500 dark:text-white/60 text-xs mt-1"
};
const _hoisted_28$1 = { class: "bg-white/80 dark:bg-[#0a0a0a]/80 backdrop-blur-md shadow-xl rounded-2xl border border-white/20 dark:border-white/10 p-6" };
const _hoisted_29$1 = { class: "text-xl font-semibold text-gray-900 dark:text-white mb-4" };
const _hoisted_30$1 = { class: "space-y-3" };
const _hoisted_31$1 = { class: "flex-shrink-0 w-6 h-6 bg-blue-100 dark:bg-dark-bg-mute rounded-full flex items-center justify-center" };
const _hoisted_32$1 = { class: "text-blue-600 dark:text-blue-400 text-sm font-medium" };
const _hoisted_33$1 = { class: "text-gray-900 dark:text-white" };
const _hoisted_34$1 = { class: "text-gray-600 dark:text-white/80 text-sm" };
const _hoisted_35$1 = {
  key: 0,
  class: "bg-white/80 dark:bg-[#0a0a0a]/80 backdrop-blur-md shadow-xl rounded-2xl border border-white/20 dark:border-white/10 p-6"
};
const _hoisted_36$1 = { class: "text-xl font-semibold text-gray-900 dark:text-white mb-4" };
const _hoisted_37$1 = { class: "space-y-4" };
const _hoisted_38$1 = { class: "flex items-start space-x-3" };
const _hoisted_39$1 = { class: "text-red-800 dark:text-red-400 font-medium" };
const _hoisted_40$1 = { class: "text-green-800 dark:text-green-400 font-medium mt-1" };
const _hoisted_41$1 = { class: "text-gray-600 dark:text-white/80 text-sm mt-1" };
const _hoisted_42$1 = { class: "space-y-6" };
const _hoisted_43$1 = { class: "bg-white/80 dark:bg-[#0a0a0a]/80 backdrop-blur-md shadow-xl rounded-2xl border border-white/20 dark:border-white/10 p-6" };
const _hoisted_44$1 = { class: "text-lg font-medium text-gray-900 dark:text-white mb-4" };
const _hoisted_45$1 = { class: "space-y-3" };
const _hoisted_46$1 = { class: "flex justify-between" };
const _hoisted_47$1 = { class: "text-gray-600 dark:text-white/60" };
const _hoisted_48$1 = { class: "text-gray-900 dark:text-white" };
const _hoisted_49$1 = { class: "flex justify-between" };
const _hoisted_50$1 = { class: "text-gray-600 dark:text-white/60" };
const _hoisted_51$1 = { class: "text-gray-900 dark:text-white" };
const _hoisted_52$1 = { class: "flex justify-between" };
const _hoisted_53$1 = { class: "text-gray-600 dark:text-white/60" };
const _hoisted_54$1 = { class: "text-gray-900 dark:text-white" };
const _hoisted_55$1 = { class: "flex justify-between" };
const _hoisted_56$1 = { class: "text-gray-600 dark:text-white/60" };
const _hoisted_57$1 = { class: "flex items-center" };
const _hoisted_58$1 = { class: "text-gray-900 dark:text-white" };
const _hoisted_59$1 = { class: "bg-white/80 dark:bg-[#0a0a0a]/80 backdrop-blur-md shadow-xl rounded-2xl border border-white/20 dark:border-white/10 p-6" };
const _hoisted_60$1 = { class: "text-lg font-medium text-gray-900 dark:text-white mb-4" };
const _hoisted_61$1 = { class: "space-y-3" };
const _hoisted_62$1 = ["onClick"];
const _hoisted_63$1 = { class: "text-sm font-medium text-gray-900 dark:text-white" };
const _hoisted_64$1 = { class: "text-xs text-gray-500 dark:text-white/60" };
const _hoisted_65$1 = { class: "bg-white/80 dark:bg-[#0a0a0a]/80 backdrop-blur-md shadow-xl rounded-2xl border border-white/20 dark:border-white/10 p-6" };
const _hoisted_66$1 = { class: "text-lg font-medium text-gray-900 dark:text-white mb-4" };
const _hoisted_67$1 = { class: "space-y-3" };
const _sfc_main$5 = /* @__PURE__ */ defineComponent({
  __name: "GrammarDetailView",
  setup(__props) {
    const GrammarFormDialog = defineAsyncComponent(
      loadComponentSafely(() => __vitePreload(() => import("./GrammarFormDialog-DQrj0wgw.js"), true ? __vite__mapDeps([33,1,2,3,34]) : void 0))
    );
    const router2 = useRouter();
    const route = useRoute();
    const grammarStore = useGrammarStore();
    const { t } = useI18n();
    const showEditDialog = ref(false);
    const currentLessonId = ref("");
    const isLoading = ref(true);
    const lesson = ref({});
    const relatedLessons = ref([]);
    const loadLesson = async () => {
      const id = route.params.id;
      currentLessonId.value = id;
      try {
        await new Promise((resolve) => setTimeout(resolve, 500));
        const grammarLesson = grammarStore.getLesson(id);
        if (grammarLesson) {
          lesson.value = {
            id: grammarLesson.id,
            title: grammarLesson.title,
            description: grammarLesson.description,
            level: grammarLesson.level,
            category: grammarLesson.category,
            duration: grammarLesson.duration,
            rating: grammarLesson.rating,
            progress: grammarLesson.progress,
            exercises: grammarLesson.exercises,
            theory: grammarLesson.theory,
            examples: grammarLesson.examples.map((ex) => ({
              id: ex.id,
              sentence: ex.text,
              translation: ex.translation,
              note: ex.note
            })),
            rules: grammarLesson.rules,
            commonMistakes: grammarLesson.commonMistakes || []
          };
          const related = grammarStore.getRelatedLessons(id, grammarLesson.category);
          relatedLessons.value = related.map((rel) => ({
            id: parseInt(rel.id),
            title: rel.title,
            category: rel.category
          }));
        } else {
          console.error("Lesson not found:", id);
        }
      } catch (error) {
        console.error("Error loading lesson:", error);
      } finally {
        isLoading.value = false;
      }
    };
    const goBack = () => {
      router2.back();
    };
    const practiceLesson = () => {
      router2.push(`/grammar/${route.params.id}/practice`);
    };
    const openEditDialog = () => {
      showEditDialog.value = true;
    };
    const onLessonUpdated = () => {
      loadLesson();
    };
    const viewRelatedLesson = (relatedLesson) => {
      router2.push(`/grammar/${relatedLesson.id}`);
    };
    const markAsCompleted = () => {
      lesson.value.progress = 100;
      grammarStore.updateLesson(currentLessonId.value, { progress: 100 });
    };
    const addToFavorites = () => {
      alert(t("grammar.detail.addedToFavorites", "Added to favorites"));
    };
    const shareLesson = () => {
      if (navigator.share) {
        navigator.share({
          title: lesson.value.title,
          text: lesson.value.description,
          url: window.location.href
        });
      } else {
        navigator.clipboard.writeText(window.location.href);
        alert(t("grammar.detail.linkCopied", "Link copied to clipboard"));
      }
    };
    const getLevelColor = (level) => {
      switch (level) {
        case "beginner":
          return "bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-300";
        case "intermediate":
          return "bg-yellow-100 text-yellow-800 dark:bg-yellow-900 dark:text-yellow-300";
        case "advanced":
          return "bg-red-100 text-red-800 dark:bg-red-900 dark:text-red-300";
        default:
          return "bg-gray-100 text-gray-800 dark:bg-dark-bg-mute dark:text-white/80";
      }
    };
    const getLevelText = (level) => {
      const fallbackMap = {
        beginner: "Beginner",
        intermediate: "Intermediate",
        advanced: "Advanced"
      };
      return t(`grammar.levels.${level}`, fallbackMap[level] || "Level");
    };
    onMounted(() => {
      loadLesson();
    });
    return (_ctx, _cache) => {
      return openBlock(), createElementBlock("div", _hoisted_1$5, [
        _cache[8] || (_cache[8] = createStaticVNode('<div class="absolute inset-0 overflow-hidden pointer-events-none z-0" data-v-4d2c13f2><div class="floating-shapes" data-v-4d2c13f2><div class="absolute top-20 left-10 w-64 h-64 bg-blue-300 dark:bg-blue-500 rounded-full mix-blend-multiply dark:mix-blend-normal filter blur-xl opacity-30 animate-blob" data-v-4d2c13f2></div><div class="absolute top-40 right-10 w-72 h-72 bg-purple-300 dark:bg-purple-500 rounded-full mix-blend-multiply dark:mix-blend-normal filter blur-xl opacity-30 animate-blob animation-delay-2000" data-v-4d2c13f2></div><div class="absolute -bottom-8 left-20 w-80 h-80 bg-pink-300 dark:bg-pink-500 rounded-full mix-blend-multiply dark:mix-blend-normal filter blur-xl opacity-30 animate-blob animation-delay-4000" data-v-4d2c13f2></div></div></div>', 1)),
        isLoading.value ? (openBlock(), createElementBlock("div", _hoisted_2$5, _cache[1] || (_cache[1] = [
          createStaticVNode('<div class="bg-white/80 dark:bg-[#0a0a0a]/80 backdrop-blur-md shadow-xl rounded-2xl border border-white/20 dark:border-white/10 p-6" data-v-4d2c13f2><div class="animate-pulse" data-v-4d2c13f2><div class="h-8 bg-gray-200 dark:bg-dark-bg-mute rounded w-1/2 mb-4" data-v-4d2c13f2></div><div class="space-y-3" data-v-4d2c13f2><div class="h-4 bg-gray-200 dark:bg-dark-bg-mute rounded" data-v-4d2c13f2></div><div class="h-4 bg-gray-200 dark:bg-dark-bg-mute rounded w-5/6" data-v-4d2c13f2></div><div class="h-4 bg-gray-200 dark:bg-dark-bg-mute rounded w-3/4" data-v-4d2c13f2></div></div></div></div>', 1)
        ]))) : (openBlock(), createElementBlock("div", _hoisted_3$4, [
          createBaseVNode("div", _hoisted_4$4, [
            createBaseVNode("div", _hoisted_5$4, [
              createBaseVNode("button", {
                onClick: goBack,
                class: "p-2 rounded-lg text-gray-600 dark:text-white/70 hover:text-gray-800 dark:hover:text-white hover:bg-gray-100 dark:hover:bg-[#0f0f0f] transition-colors"
              }, _cache[2] || (_cache[2] = [
                createBaseVNode("svg", {
                  class: "w-6 h-6",
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
              createBaseVNode("div", _hoisted_6$4, [
                createBaseVNode("button", {
                  onClick: practiceLesson,
                  class: "bg-green-500 hover:bg-green-600 text-white font-medium py-2 px-4 rounded-lg transition-colors"
                }, [
                  _cache[3] || (_cache[3] = createBaseVNode("svg", {
                    class: "w-5 h-5 inline mr-2",
                    fill: "currentColor",
                    viewBox: "0 0 20 20"
                  }, [
                    createBaseVNode("path", {
                      "fill-rule": "evenodd",
                      d: "M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-8-3a1 1 0 00-.867.5 1 1 0 11-1.731-1A3 3 0 0113 8a3.001 3.001 0 01-2 2.83V11a1 1 0 11-2 0v-1a1 1 0 011-1 1 1 0 100-2zm0 8a1 1 0 100-2 1 1 0 000 2z",
                      "clip-rule": "evenodd"
                    })
                  ], -1)),
                  createTextVNode(" " + toDisplayString(unref(t)("grammar.practice.title", "Practice")), 1)
                ]),
                createBaseVNode("button", {
                  onClick: openEditDialog,
                  class: "bg-blue-500 hover:bg-blue-600 text-white font-medium py-2 px-4 rounded-lg transition-colors"
                }, [
                  _cache[4] || (_cache[4] = createBaseVNode("svg", {
                    class: "w-5 h-5 inline mr-2",
                    fill: "currentColor",
                    viewBox: "0 0 20 20"
                  }, [
                    createBaseVNode("path", { d: "M13.586 3.586a2 2 0 112.828 2.828l-.793.793-2.828-2.828.793-.793zM11.379 5.793L3 14.172V17h2.828l8.38-8.379-2.83-2.828z" })
                  ], -1)),
                  createTextVNode(" " + toDisplayString(unref(t)("common.edit", "Edit")), 1)
                ])
              ])
            ]),
            createBaseVNode("div", _hoisted_7$3, [
              createBaseVNode("div", null, [
                createBaseVNode("div", _hoisted_8$2, [
                  _cache[5] || (_cache[5] = createBaseVNode("div", { class: "animate-pulse-slow" }, [
                    createBaseVNode("div", { class: "w-2.5 h-2.5 bg-gradient-to-r from-blue-400 to-indigo-500 rounded-full mr-2.5" })
                  ], -1)),
                  createBaseVNode("h1", _hoisted_9$2, toDisplayString(lesson.value.title), 1)
                ]),
                createBaseVNode("p", _hoisted_10$2, toDisplayString(lesson.value.description), 1)
              ]),
              createBaseVNode("div", _hoisted_11$2, [
                createBaseVNode("span", {
                  class: normalizeClass([getLevelColor(lesson.value.level), "px-3 py-1 text-sm font-medium rounded-full"])
                }, toDisplayString(getLevelText(lesson.value.level)), 3),
                createBaseVNode("p", _hoisted_12$1, toDisplayString(lesson.value.duration) + " " + toDisplayString(unref(t)("grammar.duration", "mins")), 1)
              ])
            ]),
            createBaseVNode("div", _hoisted_13$1, [
              createBaseVNode("div", _hoisted_14$1, [
                createBaseVNode("span", null, toDisplayString(unref(t)("grammar.progress", "Progress")), 1),
                createBaseVNode("span", null, toDisplayString(lesson.value.progress) + "%", 1)
              ]),
              createBaseVNode("div", _hoisted_15$1, [
                createBaseVNode("div", {
                  class: "bg-blue-500 h-3 rounded-full transition-all duration-300",
                  style: normalizeStyle({ width: lesson.value.progress + "%" })
                }, null, 4)
              ])
            ])
          ]),
          createBaseVNode("div", _hoisted_16$1, [
            createBaseVNode("div", _hoisted_17$1, [
              createBaseVNode("div", _hoisted_18$1, [
                createBaseVNode("h2", _hoisted_19$1, toDisplayString(unref(t)("grammar.detail.theory", "Theory")), 1),
                createBaseVNode("div", _hoisted_20$1, [
                  createBaseVNode("div", {
                    innerHTML: lesson.value.theory
                  }, null, 8, _hoisted_21$1)
                ])
              ]),
              createBaseVNode("div", _hoisted_22$1, [
                createBaseVNode("h2", _hoisted_23$1, toDisplayString(unref(t)("grammar.detail.examples", "Examples")), 1),
                createBaseVNode("div", _hoisted_24$1, [
                  (openBlock(true), createElementBlock(Fragment, null, renderList(lesson.value.examples, (example) => {
                    return openBlock(), createElementBlock("div", {
                      key: example.id,
                      class: "border-l-4 border-blue-500 pl-4"
                    }, [
                      createBaseVNode("p", _hoisted_25$1, toDisplayString(example.sentence), 1),
                      createBaseVNode("p", _hoisted_26$1, toDisplayString(example.translation), 1),
                      example.note ? (openBlock(), createElementBlock("p", _hoisted_27$1, toDisplayString(example.note), 1)) : createCommentVNode("", true)
                    ]);
                  }), 128))
                ])
              ]),
              createBaseVNode("div", _hoisted_28$1, [
                createBaseVNode("h2", _hoisted_29$1, toDisplayString(unref(t)("grammar.detail.usageRules", "Usage Rules")), 1),
                createBaseVNode("div", _hoisted_30$1, [
                  (openBlock(true), createElementBlock(Fragment, null, renderList(lesson.value.rules, (rule) => {
                    return openBlock(), createElementBlock("div", {
                      key: rule.id,
                      class: "flex items-start space-x-3"
                    }, [
                      createBaseVNode("div", _hoisted_31$1, [
                        createBaseVNode("span", _hoisted_32$1, toDisplayString(rule.id), 1)
                      ]),
                      createBaseVNode("div", null, [
                        createBaseVNode("p", _hoisted_33$1, toDisplayString(rule.title), 1),
                        createBaseVNode("p", _hoisted_34$1, toDisplayString(rule.description), 1)
                      ])
                    ]);
                  }), 128))
                ])
              ]),
              lesson.value.commonMistakes && lesson.value.commonMistakes.length > 0 ? (openBlock(), createElementBlock("div", _hoisted_35$1, [
                createBaseVNode("h2", _hoisted_36$1, toDisplayString(unref(t)("grammar.detail.commonMistakes", "Common Mistakes")), 1),
                createBaseVNode("div", _hoisted_37$1, [
                  (openBlock(true), createElementBlock(Fragment, null, renderList(lesson.value.commonMistakes, (mistake) => {
                    return openBlock(), createElementBlock("div", {
                      key: mistake.id,
                      class: "bg-red-50 dark:bg-dark-bg-mute border border-red-200 dark:border-red-900 rounded-lg p-4"
                    }, [
                      createBaseVNode("div", _hoisted_38$1, [
                        _cache[6] || (_cache[6] = createBaseVNode("svg", {
                          class: "w-5 h-5 text-red-500 dark:text-red-400 mt-0.5",
                          fill: "currentColor",
                          viewBox: "0 0 20 20"
                        }, [
                          createBaseVNode("path", {
                            "fill-rule": "evenodd",
                            d: "M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7 4a1 1 0 11-2 0 1 1 0 012 0zm-1-9a1 1 0 00-1 1v4a1 1 0 102 0V6a1 1 0 00-1-1 1 1 0 100-2zm0 8a1 1 0 100-2 1 1 0 000 2z",
                            "clip-rule": "evenodd"
                          })
                        ], -1)),
                        createBaseVNode("div", null, [
                          createBaseVNode("p", _hoisted_39$1, "❌ " + toDisplayString(mistake.wrong), 1),
                          createBaseVNode("p", _hoisted_40$1, "✅ " + toDisplayString(mistake.correct), 1),
                          createBaseVNode("p", _hoisted_41$1, toDisplayString(mistake.explanation), 1)
                        ])
                      ])
                    ]);
                  }), 128))
                ])
              ])) : createCommentVNode("", true)
            ]),
            createBaseVNode("div", _hoisted_42$1, [
              createBaseVNode("div", _hoisted_43$1, [
                createBaseVNode("h3", _hoisted_44$1, toDisplayString(unref(t)("grammar.detail.info", "Info")), 1),
                createBaseVNode("div", _hoisted_45$1, [
                  createBaseVNode("div", _hoisted_46$1, [
                    createBaseVNode("span", _hoisted_47$1, toDisplayString(unref(t)("grammar.detail.topic", "Topic")) + ":", 1),
                    createBaseVNode("span", _hoisted_48$1, toDisplayString(lesson.value.category), 1)
                  ]),
                  createBaseVNode("div", _hoisted_49$1, [
                    createBaseVNode("span", _hoisted_50$1, toDisplayString(unref(t)("grammar.detail.duration", "Duration")) + ":", 1),
                    createBaseVNode("span", _hoisted_51$1, toDisplayString(lesson.value.duration) + " " + toDisplayString(unref(t)("grammar.duration", "mins")), 1)
                  ]),
                  createBaseVNode("div", _hoisted_52$1, [
                    createBaseVNode("span", _hoisted_53$1, toDisplayString(unref(t)("grammar.detail.exercises", "Exercises")) + ":", 1),
                    createBaseVNode("span", _hoisted_54$1, toDisplayString(lesson.value.exercises), 1)
                  ]),
                  createBaseVNode("div", _hoisted_55$1, [
                    createBaseVNode("span", _hoisted_56$1, toDisplayString(unref(t)("grammar.detail.rating", "Rating")) + ":", 1),
                    createBaseVNode("div", _hoisted_57$1, [
                      _cache[7] || (_cache[7] = createBaseVNode("svg", {
                        class: "w-4 h-4 text-yellow-400 mr-1",
                        fill: "currentColor",
                        viewBox: "0 0 20 20"
                      }, [
                        createBaseVNode("path", { d: "M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" })
                      ], -1)),
                      createBaseVNode("span", _hoisted_58$1, toDisplayString(lesson.value.rating), 1)
                    ])
                  ])
                ])
              ]),
              createBaseVNode("div", _hoisted_59$1, [
                createBaseVNode("h3", _hoisted_60$1, toDisplayString(unref(t)("grammar.detail.relatedLessons", "Related Lessons")), 1),
                createBaseVNode("div", _hoisted_61$1, [
                  (openBlock(true), createElementBlock(Fragment, null, renderList(relatedLessons.value, (related) => {
                    return openBlock(), createElementBlock("div", {
                      key: related.id,
                      class: "border border-white/20 dark:border-white/10 rounded-lg p-3 hover:bg-white/60 dark:hover:bg-[#0f0f0f] transition-colors cursor-pointer",
                      onClick: ($event) => viewRelatedLesson(related)
                    }, [
                      createBaseVNode("p", _hoisted_63$1, toDisplayString(related.title), 1),
                      createBaseVNode("p", _hoisted_64$1, toDisplayString(related.category), 1)
                    ], 8, _hoisted_62$1);
                  }), 128))
                ])
              ]),
              createBaseVNode("div", _hoisted_65$1, [
                createBaseVNode("h3", _hoisted_66$1, toDisplayString(unref(t)("common.actions", "Actions")), 1),
                createBaseVNode("div", _hoisted_67$1, [
                  createBaseVNode("button", {
                    onClick: markAsCompleted,
                    class: "w-full bg-green-500 hover:bg-green-600 text-white font-medium py-2 px-4 rounded-lg transition-colors"
                  }, toDisplayString(unref(t)("grammar.detail.markCompleted", "Mark as Completed")), 1),
                  createBaseVNode("button", {
                    onClick: addToFavorites,
                    class: "w-full bg-yellow-500 hover:bg-yellow-600 text-white font-medium py-2 px-4 rounded-lg transition-colors"
                  }, toDisplayString(unref(t)("grammar.detail.addToFavorites", "Add to Favorites")), 1),
                  createBaseVNode("button", {
                    onClick: shareLesson,
                    class: "w-full bg-blue-500 hover:bg-blue-600 text-white font-medium py-2 px-4 rounded-lg transition-colors"
                  }, toDisplayString(unref(t)("grammar.detail.shareLesson", "Share Lesson")), 1)
                ])
              ])
            ])
          ])
        ])),
        createVNode(unref(GrammarFormDialog), {
          modelValue: showEditDialog.value,
          "onUpdate:modelValue": _cache[0] || (_cache[0] = ($event) => showEditDialog.value = $event),
          "edit-id": currentLessonId.value,
          onSaved: onLessonUpdated
        }, null, 8, ["modelValue", "edit-id"])
      ]);
    };
  }
});
const GrammarDetailView = /* @__PURE__ */ _export_sfc(_sfc_main$5, [["__scopeId", "data-v-4d2c13f2"]]);
const _hoisted_1$4 = { class: "min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 dark:from-[#0a0a0a] dark:to-[#0f0f0f] relative overflow-x-hidden" };
const _hoisted_2$4 = { class: "relative z-10 max-w-full sm:max-w-full md:max-w-full lg:max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-3 sm:pt-6" };
const _hoisted_3$3 = { class: "group bg-white/80 dark:bg-[#0a0a0a]/80 backdrop-blur-md shadow-xl hover:shadow-2xl rounded-2xl border border-white/20 dark:border-white/10 transition-all duration-500 hover:scale-[1.005] p-3 sm:p-4 md:p-5 lg:p-6" };
const _hoisted_4$3 = { class: "flex items-center justify-between" };
const _hoisted_5$3 = { class: "flex items-center space-x-4" };
const _hoisted_6$3 = { class: "flex items-center mb-1" };
const _hoisted_7$2 = { class: "text-xl sm:text-2xl font-bold bg-gradient-to-r from-blue-600 to-indigo-600 dark:from-blue-400 dark:to-indigo-400 bg-clip-text text-transparent" };
const _hoisted_8$1 = { class: "text-sm text-gray-600 dark:text-white/70" };
const _hoisted_9$1 = { class: "flex items-center space-x-4" };
const _hoisted_10$1 = { class: "text-sm text-gray-600 dark:text-white/70" };
const _hoisted_11$1 = { class: "font-medium text-blue-600 dark:text-blue-400" };
const _hoisted_12 = ["title"];
const _hoisted_13 = ["title"];
const _hoisted_14 = { class: "relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8" };
const _hoisted_15 = {
  key: 0,
  class: "space-y-6"
};
const _hoisted_16 = { class: "text-center" };
const _hoisted_17 = { class: "text-2xl font-bold bg-gradient-to-r from-blue-600 to-indigo-600 dark:from-blue-400 dark:to-indigo-400 bg-clip-text text-transparent mb-4" };
const _hoisted_18 = { class: "text-gray-700 dark:text-white/70 mb-8" };
const _hoisted_19 = { class: "grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6" };
const _hoisted_20 = ["onClick"];
const _hoisted_21 = { class: "text-center" };
const _hoisted_22 = { class: "text-lg font-semibold text-gray-900 dark:text-white mb-2" };
const _hoisted_23 = { class: "text-sm text-gray-600 dark:text-white/70 mb-4" };
const _hoisted_24 = { class: "flex items-center justify-center space-x-4 text-xs text-gray-500 dark:text-white/60" };
const _hoisted_25 = {
  key: 1,
  class: "space-y-6"
};
const _hoisted_26 = { class: "bg-white dark:bg-[#0a0a0a] rounded-xl shadow-lg border border-gray-200 dark:border-gray-700 p-6" };
const _hoisted_27 = { class: "flex items-center justify-between" };
const _hoisted_28 = { class: "flex items-center space-x-4" };
const _hoisted_29 = { class: "text-xl font-semibold text-gray-900 dark:text-white" };
const _hoisted_30 = { class: "text-sm text-gray-500 dark:text-gray-400" };
const _hoisted_31 = { class: "flex items-center space-x-4" };
const _hoisted_32 = { class: "w-32 bg-gray-200 dark:bg-mute rounded-full h-2" };
const _hoisted_33 = { class: "text-sm font-medium text-gray-700 dark:text-gray-300" };
const _hoisted_34 = {
  key: 0,
  class: "fixed inset-0 bg-black/50 dark:bg-black/60 flex items-center justify-center p-4 z-50 backdrop-blur-sm"
};
const _hoisted_35 = { class: "bg-white dark:bg-[#0a0a0a] shadow-2xl rounded-xl border border-gray-200 dark:border-dark-bg-mute flex flex-col h-full overflow-hidden transform" };
const _hoisted_36 = { class: "px-6 py-4 border-b border-gray-200 dark:border-dark-bg-mute flex-shrink-0 bg-gradient-to-r from-blue-50 to-indigo-50 dark:from-[#0a0a0a] dark:to-[#0a0a0a]" };
const _hoisted_37 = { class: "flex items-center justify-between" };
const _hoisted_38 = { class: "text-lg sm:text-xl font-semibold text-gray-900 dark:text-white flex items-center space-x-2" };
const _hoisted_39 = { class: "px-6 py-4 flex-1 overflow-y-auto min-h-0 space-y-4" };
const _hoisted_40 = { class: "block text-sm font-medium text-gray-700 dark:text-white mb-2" };
const _hoisted_41 = { value: "easy" };
const _hoisted_42 = { value: "medium" };
const _hoisted_43 = { value: "hard" };
const _hoisted_44 = { class: "flex items-center justify-between" };
const _hoisted_45 = { class: "text-sm font-medium text-gray-700 dark:text-white" };
const _hoisted_46 = { class: "flex items-center justify-between" };
const _hoisted_47 = { class: "text-sm font-medium text-gray-700 dark:text-white" };
const _hoisted_48 = { class: "px-6 py-4 border-t border-gray-200 dark:border-dark-bg-mute flex-shrink-0 bg-gradient-to-r from-gray-50 to-blue-50 dark:from-[#0a0a0a] dark:to-[#0a0a0a]" };
const _hoisted_49 = { class: "flex justify-end space-x-3" };
const _hoisted_50 = {
  key: 0,
  class: "fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50"
};
const _hoisted_51 = { class: "bg-white dark:bg-[#0a0a0a] rounded-xl shadow-2xl border border-gray-200 dark:border-gray-700 p-6 max-w-lg w-full mx-4" };
const _hoisted_52 = { class: "text-center" };
const _hoisted_53 = { class: "text-2xl font-bold text-gray-900 dark:text-white mb-2" };
const _hoisted_54 = { class: "space-y-4 mb-6" };
const _hoisted_55 = { class: "grid grid-cols-3 gap-4 text-center" };
const _hoisted_56 = { class: "bg-blue-50 dark:bg-blue-900/30 rounded-lg p-4" };
const _hoisted_57 = { class: "text-2xl font-bold text-blue-600 dark:text-blue-400" };
const _hoisted_58 = { class: "text-sm text-gray-600 dark:text-gray-400" };
const _hoisted_59 = { class: "bg-red-50 dark:bg-red-900/30 rounded-lg p-4" };
const _hoisted_60 = { class: "text-2xl font-bold text-red-600 dark:text-red-400" };
const _hoisted_61 = { class: "text-sm text-gray-600 dark:text-gray-400" };
const _hoisted_62 = { class: "bg-green-50 dark:bg-green-900/30 rounded-lg p-4" };
const _hoisted_63 = { class: "text-2xl font-bold text-green-600 dark:text-green-400" };
const _hoisted_64 = { class: "text-sm text-gray-600 dark:text-gray-400" };
const _hoisted_65 = { class: "flex justify-center space-x-4" };
const _hoisted_66 = {
  key: 1,
  class: "fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50"
};
const _hoisted_67 = { class: "bg-white dark:bg-[#0a0a0a] rounded-xl shadow-2xl border border-gray-200 dark:border-gray-700 p-6 max-w-6xl w-full mx-4 max-h-[90vh] overflow-y-auto" };
const _hoisted_68 = { class: "flex items-center justify-between mb-6" };
const _hoisted_69 = { class: "text-lg font-semibold text-gray-900 dark:text-white" };
const _hoisted_70 = { class: "space-y-6" };
const _hoisted_71 = { class: "bg-gray-50 dark:bg-gray-800/30 border border-gray-200 dark:border-gray-600 rounded-lg p-4" };
const _hoisted_72 = { class: "text-md font-medium text-gray-900 dark:text-white mb-4" };
const _hoisted_73 = {
  key: 0,
  class: "space-y-4"
};
const _hoisted_74 = { class: "grid grid-cols-1 md:grid-cols-2 gap-4" };
const _hoisted_75 = { class: "block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2" };
const _hoisted_76 = { value: "essay" };
const _hoisted_77 = { value: "email" };
const _hoisted_78 = { value: "letter" };
const _hoisted_79 = { value: "paragraph" };
const _hoisted_80 = { class: "grid grid-cols-2 gap-2" };
const _hoisted_81 = { class: "block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2" };
const _hoisted_82 = { class: "block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2" };
const _hoisted_83 = { class: "block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2" };
const _hoisted_84 = ["placeholder"];
const _hoisted_85 = { class: "flex items-center justify-between mb-2" };
const _hoisted_86 = { class: "block text-sm font-medium text-gray-700 dark:text-gray-300" };
const _hoisted_87 = { class: "space-y-2" };
const _hoisted_88 = ["onUpdate:modelValue", "placeholder"];
const _hoisted_89 = ["onClick", "disabled"];
const _hoisted_90 = {
  key: 1,
  class: "space-y-4"
};
const _hoisted_91 = { class: "block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2" };
const _hoisted_92 = ["placeholder"];
const _hoisted_93 = { class: "block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2" };
const _hoisted_94 = { class: "space-y-2" };
const _hoisted_95 = { class: "text-sm font-medium text-gray-500 dark:text-gray-400 w-6" };
const _hoisted_96 = ["onUpdate:modelValue", "placeholder"];
const _hoisted_97 = { class: "block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2" };
const _hoisted_98 = ["value"];
const _hoisted_99 = { class: "block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2" };
const _hoisted_100 = ["placeholder"];
const _hoisted_101 = {
  key: 2,
  class: "space-y-4"
};
const _hoisted_102 = { class: "block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2" };
const _hoisted_103 = { class: "relative" };
const _hoisted_104 = ["placeholder"];
const _hoisted_105 = { class: "mt-2 text-xs text-gray-500 dark:text-gray-400" };
const _hoisted_106 = {
  key: 0,
  class: "mt-3 p-3 bg-blue-50 dark:bg-blue-900/30 border border-blue-200 dark:border-blue-700 rounded-lg"
};
const _hoisted_107 = { class: "flex items-center space-x-2 text-sm text-blue-800 dark:text-blue-200" };
const _hoisted_108 = { class: "mt-2 text-xs text-gray-600 dark:text-gray-400" };
const _hoisted_109 = { class: "grid grid-cols-1 md:grid-cols-3 gap-4" };
const _hoisted_110 = { class: "block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2" };
const _hoisted_111 = { class: "block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2" };
const _hoisted_112 = { value: "easy" };
const _hoisted_113 = { value: "medium" };
const _hoisted_114 = { value: "hard" };
const _hoisted_115 = { class: "flex items-center" };
const _hoisted_116 = { class: "flex items-center space-x-2 cursor-pointer" };
const _hoisted_117 = { class: "text-sm font-medium text-gray-700 dark:text-gray-300" };
const _hoisted_118 = { class: "block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2" };
const _hoisted_119 = ["placeholder"];
const _hoisted_120 = { class: "block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2" };
const _hoisted_121 = { class: "space-y-3" };
const _hoisted_122 = { class: "flex items-center justify-between mb-2" };
const _hoisted_123 = { class: "text-sm font-medium text-gray-700 dark:text-gray-300" };
const _hoisted_124 = ["onClick", "disabled"];
const _hoisted_125 = { class: "space-y-2" };
const _hoisted_126 = ["onUpdate:modelValue"];
const _hoisted_127 = { value: "multiple-choice" };
const _hoisted_128 = { value: "fill-blank" };
const _hoisted_129 = { value: "ordering" };
const _hoisted_130 = ["onUpdate:modelValue", "placeholder"];
const _hoisted_131 = {
  key: 0,
  class: "space-y-1"
};
const _hoisted_132 = { class: "text-xs font-medium text-gray-500 dark:text-gray-400 w-4" };
const _hoisted_133 = ["onUpdate:modelValue", "placeholder"];
const _hoisted_134 = ["onUpdate:modelValue"];
const _hoisted_135 = { value: "" };
const _hoisted_136 = ["value"];
const _hoisted_137 = { key: 1 };
const _hoisted_138 = ["onUpdate:modelValue", "placeholder"];
const _hoisted_139 = {
  key: 3,
  class: "space-y-4"
};
const _hoisted_140 = { class: "block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2" };
const _hoisted_141 = ["placeholder"];
const _hoisted_142 = { class: "block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2" };
const _hoisted_143 = ["placeholder"];
const _hoisted_144 = { class: "flex justify-end mt-4" };
const _hoisted_145 = { key: 0 };
const _hoisted_146 = { class: "text-md font-medium text-gray-900 dark:text-white mb-4" };
const _hoisted_147 = { class: "space-y-4 max-h-96 overflow-y-auto" };
const _hoisted_148 = { class: "flex items-start justify-between" };
const _hoisted_149 = { class: "flex-1" };
const _hoisted_150 = { class: "mb-2" };
const _hoisted_151 = { class: "inline-flex items-center px-2 py-1 rounded-full text-xs font-medium bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-200" };
const _hoisted_152 = {
  key: 0,
  class: "ml-2 inline-flex items-center px-2 py-1 rounded-full text-xs font-medium bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-200"
};
const _hoisted_153 = { class: "text-sm text-gray-900 dark:text-white mb-2" };
const _hoisted_154 = { class: "mt-1" };
const _hoisted_155 = {
  key: 0,
  class: "text-xs text-gray-600 dark:text-gray-400"
};
const _hoisted_156 = { class: "list-disc list-inside mt-1" };
const _hoisted_157 = {
  key: 1,
  class: "text-xs text-gray-600 dark:text-gray-400 mt-2"
};
const _hoisted_158 = { class: "flex items-center space-x-2 ml-4" };
const _hoisted_159 = ["onClick", "title"];
const _hoisted_160 = ["onClick", "title"];
const _hoisted_161 = {
  key: 1,
  class: "text-center py-8"
};
const _hoisted_162 = { class: "text-gray-500 dark:text-gray-400" };
const _hoisted_163 = { class: "text-sm mt-1" };
const _hoisted_164 = { class: "flex justify-end space-x-4 mt-6" };
const _sfc_main$4 = /* @__PURE__ */ defineComponent({
  __name: "GrammarPracticeView",
  setup(__props) {
    const { t } = useI18n();
    const tf = (key, fallback, params) => {
      const translated = params ? t(key, params) : t(key);
      const text = typeof translated === "string" ? translated : String(translated);
      if (text === key) return fallback;
      return text;
    };
    const route = useRoute();
    const router2 = useRouter();
    const { playAudio: playAudio2 } = useVoiceStore();
    const MultipleChoiceExercise = defineAsyncComponent(() => __vitePreload(() => import("./MultipleChoiceExercise-CaUDvXw5.js"), true ? __vite__mapDeps([35,1,2,3]) : void 0));
    const FillBlankExercise = defineAsyncComponent(() => __vitePreload(() => import("./FillBlankExercise-CG01xr0b.js"), true ? __vite__mapDeps([36,1,2,3]) : void 0));
    const PronunciationExercise = defineAsyncComponent(() => __vitePreload(() => import("./PronunciationExercise-CkuWQIlU.js"), true ? __vite__mapDeps([37,1,2,3]) : void 0));
    const ReadingExercise = defineAsyncComponent(() => __vitePreload(() => import("./ReadingExercise-DOf_grDe.js"), true ? __vite__mapDeps([38,1,2,3]) : void 0));
    const ListeningExercise = defineAsyncComponent(() => __vitePreload(() => import("./ListeningExercise-DrqGOgVv.js"), true ? __vite__mapDeps([39,1,2,3]) : void 0));
    const WritingExercise = defineAsyncComponent(() => __vitePreload(() => import("./WritingExercise-B62sLIzP.js"), true ? __vite__mapDeps([40,1]) : void 0));
    const ExerciseManager = defineAsyncComponent(() => __vitePreload(() => import("./ExerciseManager-DsdTXUe4.js"), true ? __vite__mapDeps([41,1]) : void 0));
    const BookOpenIcon = () => h("svg", { class: "w-8 h-8 text-white", fill: "none", stroke: "currentColor", viewBox: "0 0 24 24" }, [
      h("path", { "stroke-linecap": "round", "stroke-linejoin": "round", "stroke-width": "2", d: "M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.746 0 3.332.477 4.5 1.253v13C20.168 18.477 18.582 18 16.5 18c-1.746 0-3.332.477-4.5 1.253" })
    ]);
    const PencilIcon = () => h("svg", { class: "w-8 h-8 text-white", fill: "none", stroke: "currentColor", viewBox: "0 0 24 24" }, [
      h("path", { "stroke-linecap": "round", "stroke-linejoin": "round", "stroke-width": "2", d: "M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z" })
    ]);
    const SpeakerWaveIcon = () => h("svg", { class: "w-8 h-8 text-white", fill: "none", stroke: "currentColor", viewBox: "0 0 24 24" }, [
      h("path", { "stroke-linecap": "round", "stroke-linejoin": "round", "stroke-width": "2", d: "M19.114 5.636a9 9 0 010 12.728M16.463 8.288a5.25 5.25 0 010 7.424M6.75 8.25l4.72-4.72a.75.75 0 011.28.53v15.88a.75.75 0 01-1.28.53l-4.72-4.72H4.51c-.88 0-1.59-.71-1.59-1.59V9.84c0-.88.71-1.59 1.59-1.59h2.24z" })
    ]);
    const MicrophoneIcon = () => h("svg", { class: "w-8 h-8 text-white", fill: "none", stroke: "currentColor", viewBox: "0 0 24 24" }, [
      h("path", { "stroke-linecap": "round", "stroke-linejoin": "round", "stroke-width": "2", d: "M12 1a3 3 0 0 0-3 3v8a3 3 0 0 0 6 0V4a3 3 0 0 0-3-3zM19 10v2a7 7 0 0 1-14 0v-2M12 19v4M8 23h8" })
    ]);
    const EyeIcon = () => h("svg", { class: "w-8 h-8 text-white", fill: "none", stroke: "currentColor", viewBox: "0 0 24 24" }, [
      h("path", { "stroke-linecap": "round", "stroke-linejoin": "round", "stroke-width": "2", d: "M15 12a3 3 0 11-6 0 3 3 0 016 0z" }),
      h("path", { "stroke-linecap": "round", "stroke-linejoin": "round", "stroke-width": "2", d: "M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" })
    ]);
    const EditIcon = () => h("svg", { class: "w-8 h-8 text-white", fill: "none", stroke: "currentColor", viewBox: "0 0 24 24" }, [
      h("path", { "stroke-linecap": "round", "stroke-linejoin": "round", "stroke-width": "2", d: "M15.232 5.232l3.536 3.536m-2.036-5.036a2.5 2.5 0 113.536 3.536L6.5 21.036H3v-3.572L16.732 3.732z" })
    ]);
    computed(() => route.params.id);
    const selectedExercise = ref(null);
    const currentQuestionIndex = ref(0);
    const totalQuestions = ref(10);
    const currentQuestion = ref(null);
    const exerciseResults = ref({
      correct: 0,
      incorrect: 0,
      percentage: 0,
      answers: []
    });
    const showSettings = ref(false);
    const showResults = ref(false);
    const showExerciseManager = ref(false);
    const totalScore = ref(0);
    const newExercise = ref({
      type: "",
      title: "",
      description: "",
      difficulty: "medium",
      duration: ""
    });
    const exerciseQuestions = ref({});
    const showQuestionManager = ref(false);
    const selectedExerciseTypeForQuestions = ref("");
    const newQuestion = ref({
      id: "",
      type: "",
      question: "",
      options: ["", "", "", ""],
      correctAnswer: "",
      explanation: "",
      difficulty: "medium",
      // Writing specific fields
      taskType: "essay",
      prompt: "",
      requirements: [""],
      minWords: 100,
      timeLimit: 20,
      // Listening specific fields
      audioUrl: "",
      originalUrl: "",
      maxPlays: 3,
      allowNotes: false,
      transcript: "",
      questions: []
    });
    const editingQuestionIndex = ref(-1);
    const settings = ref({
      difficulty: "medium",
      autoPlayAudio: true,
      showExplanations: true
    });
    const exerciseTypes = ref([
      {
        type: "multiple-choice",
        title: "Multiple Choice",
        description: "Choose the correct answer from multiple options",
        icon: BookOpenIcon,
        colorClass: "bg-gray-500",
        duration: "10-15 min",
        difficulty: "Easy"
      },
      {
        type: "fill-blank",
        title: "Fill in the Blanks",
        description: "Complete sentences by filling in missing words",
        icon: PencilIcon,
        colorClass: "bg-green-500",
        duration: "15-20 min",
        difficulty: "Medium"
      },
      {
        type: "pronunciation",
        title: "Pronunciation Practice",
        description: "Practice speaking and pronunciation skills",
        icon: MicrophoneIcon,
        colorClass: "bg-purple-500",
        duration: "10-15 min",
        difficulty: "Medium"
      },
      {
        type: "reading",
        title: "Reading Comprehension",
        description: "Read passages and answer comprehension questions",
        icon: EyeIcon,
        colorClass: "bg-orange-500",
        duration: "20-25 min",
        difficulty: "Hard"
      },
      {
        type: "listening",
        title: "Listening Exercise",
        description: "Listen to audio and answer related questions",
        icon: SpeakerWaveIcon,
        colorClass: "bg-indigo-500",
        duration: "15-20 min",
        difficulty: "Medium"
      },
      {
        type: "writing",
        title: "Writing Practice",
        description: "Practice writing skills with various prompts",
        icon: EditIcon,
        colorClass: "bg-red-500",
        duration: "25-30 min",
        difficulty: "Hard"
      }
    ]);
    const currentExerciseComponent = computed(() => {
      const componentMap = {
        "multiple-choice": MultipleChoiceExercise,
        "fill-blank": FillBlankExercise,
        "pronunciation": PronunciationExercise,
        "reading": ReadingExercise,
        "listening": ListeningExercise,
        "writing": WritingExercise
      };
      return selectedExercise.value ? componentMap[selectedExercise.value] || null : null;
    });
    const startExercise = (exerciseType) => {
      selectedExercise.value = exerciseType;
      currentQuestionIndex.value = 0;
      exerciseResults.value = {
        correct: 0,
        incorrect: 0,
        percentage: 0,
        answers: []
      };
      generateQuestions();
      const newQuery = { ...route.query, exercise: exerciseType };
      router2.replace({ query: newQuery });
    };
    const generateQuestions = () => {
      if (!selectedExercise.value) return;
      const savedQuestions = exerciseQuestions.value[selectedExercise.value] || [];
      if (savedQuestions.length > 0) {
        const questionIndex = currentQuestionIndex.value % savedQuestions.length;
        currentQuestion.value = savedQuestions[questionIndex];
      } else {
        generateDefaultQuestions();
      }
    };
    const generateDefaultQuestions = () => {
      if (selectedExercise.value === "writing") {
        const writingTasks = [
          {
            id: 1,
            type: "writing",
            taskType: "essay",
            prompt: "Write an essay about the importance of learning English in today's globalized world. Discuss how English proficiency can benefit individuals in their personal and professional lives.",
            requirements: [
              "Write at least 250 words",
              "Include an introduction, body paragraphs, and conclusion",
              "Use specific examples to support your points",
              "Demonstrate proper grammar and vocabulary usage"
            ],
            minWords: 250,
            timeLimit: 30
          },
          {
            id: 2,
            type: "writing",
            taskType: "email",
            prompt: "Write a formal email to your manager requesting time off for a family vacation. Include the dates, reason, and any work arrangements you have made.",
            requirements: [
              "Use formal email format",
              "Include appropriate subject line",
              "Be polite and professional",
              "Provide all necessary details"
            ],
            minWords: 150,
            timeLimit: 20
          },
          {
            id: 3,
            type: "writing",
            taskType: "letter",
            prompt: "Write a letter to a friend describing your recent trip to a new city. Share your experiences, what you liked most, and recommend places to visit.",
            requirements: [
              "Use informal, friendly tone",
              "Include specific details about places visited",
              "Share personal experiences and feelings",
              "Make recommendations"
            ],
            minWords: 200,
            timeLimit: 25
          }
        ];
        const taskIndex = currentQuestionIndex.value % writingTasks.length;
        currentQuestion.value = writingTasks[taskIndex];
      } else if (selectedExercise.value === "multiple-choice") {
        const mcQuestions = [
          {
            id: 1,
            type: "multiple-choice",
            question: 'Choose the correct form of the verb: "She _____ to the store yesterday."',
            options: ["go", "goes", "went", "going"],
            correctAnswer: "went",
            explanation: "Past tense is used for actions completed in the past."
          },
          {
            id: 2,
            type: "multiple-choice",
            question: "Which sentence is grammatically correct?",
            options: [
              "I have been living here since 5 years.",
              "I have been living here for 5 years.",
              "I am living here since 5 years.",
              "I live here since 5 years."
            ],
            correctAnswer: "I have been living here for 5 years.",
            explanation: 'Use "for" with duration and present perfect continuous for ongoing actions.'
          }
        ];
        const questionIndex = currentQuestionIndex.value % mcQuestions.length;
        currentQuestion.value = mcQuestions[questionIndex];
      } else if (selectedExercise.value === "fill-blank") {
        const fillBlankQuestions = [
          {
            id: 1,
            type: "fill-blank",
            question: 'Complete the sentence: "I _____ been studying English _____ three years."',
            blanks: ["have", "for"],
            sentence: "I _____ been studying English _____ three years.",
            explanation: 'Present perfect continuous with "have" and duration with "for".'
          }
        ];
        const questionIndex = currentQuestionIndex.value % fillBlankQuestions.length;
        currentQuestion.value = fillBlankQuestions[questionIndex];
      } else {
        currentQuestion.value = {
          id: 1,
          type: selectedExercise.value,
          question: `Sample ${selectedExercise.value} question`,
          options: ["Option A", "Option B", "Option C", "Option D"],
          correctAnswer: "Option A",
          explanation: "This is the correct answer because..."
        };
      }
    };
    const handleAnswer = (answer) => {
      const isCorrect = answer.isCorrect;
      if (isCorrect) {
        exerciseResults.value.correct++;
      } else {
        exerciseResults.value.incorrect++;
      }
      exerciseResults.value.answers.push({
        questionIndex: currentQuestionIndex.value,
        userAnswer: answer.userAnswer,
        correctAnswer: answer.correctAnswer,
        isCorrect
      });
    };
    const nextQuestion = () => {
      if (currentQuestionIndex.value < totalQuestions.value - 1) {
        currentQuestionIndex.value++;
        generateQuestions();
      } else {
        completeExercise();
      }
    };
    const completeExercise = () => {
      const total = exerciseResults.value.correct + exerciseResults.value.incorrect;
      exerciseResults.value.percentage = total > 0 ? Math.round(exerciseResults.value.correct / total * 100) : 0;
      totalScore.value += exerciseResults.value.correct * 10;
      showResults.value = true;
    };
    const restartExercise = () => {
      showResults.value = false;
      currentQuestionIndex.value = 0;
      exerciseResults.value = {
        correct: 0,
        incorrect: 0,
        percentage: 0,
        answers: []
      };
      generateQuestions();
    };
    const goBackToSelection = () => {
      selectedExercise.value = null;
      showResults.value = false;
      currentQuestionIndex.value = 0;
      const newQuery = { ...route.query };
      delete newQuery.exercise;
      router2.replace({ query: newQuery });
    };
    const saveSettings2 = () => {
      localStorage.setItem("grammarPracticeSettings", JSON.stringify(settings.value));
      showSettings.value = false;
    };
    const goBackToGrammarDetail = () => {
      const grammarId2 = route.params.id;
      if (grammarId2) {
        router2.push(`/grammar/${grammarId2}`);
      } else {
        router2.push("/grammar");
      }
    };
    const addExerciseType = () => {
      if (!newExercise.value.type || !newExercise.value.title) {
        return;
      }
      const exerciseToAdd = {
        type: newExercise.value.type,
        title: newExercise.value.title,
        description: newExercise.value.description,
        difficulty: newExercise.value.difficulty,
        duration: newExercise.value.duration,
        icon: BookOpenIcon,
        colorClass: "bg-blue-500"
      };
      exerciseTypes.value.push(exerciseToAdd);
      newExercise.value = {
        type: "",
        title: "",
        description: "",
        difficulty: "medium",
        duration: ""
      };
    };
    const editExerciseType = (index) => {
      const exercise = exerciseTypes.value[index];
      newExercise.value = {
        type: exercise.type,
        title: exercise.title,
        description: exercise.description,
        difficulty: exercise.difficulty,
        duration: exercise.duration
      };
      exerciseTypes.value.splice(index, 1);
    };
    const deleteExerciseType = (index) => {
      if (confirm(t("common.confirmDelete", "Are you sure you want to delete this?"))) {
        exerciseTypes.value.splice(index, 1);
      }
    };
    const saveExerciseTypes = () => {
      localStorage.setItem("grammarExerciseTypes", JSON.stringify(exerciseTypes.value));
      showExerciseManager.value = false;
    };
    const openQuestionManager = (exerciseType) => {
      selectedExerciseTypeForQuestions.value = exerciseType;
      showQuestionManager.value = true;
      resetNewQuestionForm();
    };
    const closeQuestionManager = () => {
      showQuestionManager.value = false;
      selectedExerciseTypeForQuestions.value = "";
      resetNewQuestionForm();
      editingQuestionIndex.value = -1;
    };
    const resetNewQuestionForm = () => {
      if (selectedExerciseTypeForQuestions.value === "listening") {
        newQuestion.value = {
          id: "",
          type: "listening",
          audioUrl: "",
          maxPlays: 3,
          allowNotes: true,
          difficulty: "medium",
          transcript: "",
          questions: [{
            question: "",
            type: "multiple-choice",
            options: ["", "", "", ""],
            correctAnswer: ""
          }]
        };
      } else if (selectedExerciseTypeForQuestions.value === "writing") {
        newQuestion.value = {
          id: "",
          type: "writing",
          question: "",
          options: ["", "", "", ""],
          correctAnswer: "",
          explanation: "",
          difficulty: "medium",
          // Writing specific fields
          taskType: "essay",
          prompt: "",
          requirements: [""],
          minWords: 100,
          timeLimit: 20,
          // Listening specific fields (default values)
          audioUrl: "",
          originalUrl: "",
          maxPlays: 3,
          allowNotes: false,
          transcript: "",
          questions: []
        };
      } else {
        newQuestion.value = {
          id: "",
          type: selectedExerciseTypeForQuestions.value || "",
          question: "",
          options: ["", "", "", ""],
          correctAnswer: "",
          explanation: "",
          difficulty: "medium",
          // Add missing properties to satisfy TypeScript
          taskType: "essay",
          prompt: "",
          requirements: [""],
          minWords: 100,
          timeLimit: 20,
          // Listening specific fields (default values)
          audioUrl: "",
          originalUrl: "",
          maxPlays: 3,
          allowNotes: false,
          transcript: "",
          questions: []
        };
      }
    };
    const addQuestion = () => {
      const exerciseType = selectedExerciseTypeForQuestions.value;
      if (!exerciseType) return;
      const id = Date.now().toString();
      const questionToAdd = {
        ...newQuestion.value,
        id,
        type: exerciseType
      };
      if (exerciseType === "writing") {
        questionToAdd.requirements = questionToAdd.requirements.filter((req) => req.trim() !== "");
      }
      if (!exerciseQuestions.value[exerciseType]) {
        exerciseQuestions.value[exerciseType] = [];
      }
      if (editingQuestionIndex.value >= 0) {
        exerciseQuestions.value[exerciseType][editingQuestionIndex.value] = questionToAdd;
        editingQuestionIndex.value = -1;
      } else {
        exerciseQuestions.value[exerciseType].push(questionToAdd);
      }
      saveQuestionsToStorage();
      resetNewQuestionForm();
    };
    const editQuestion = (index) => {
      const exerciseType = selectedExerciseTypeForQuestions.value;
      const question = exerciseQuestions.value[exerciseType][index];
      newQuestion.value = { ...question };
      editingQuestionIndex.value = index;
    };
    const deleteQuestion = (index) => {
      if (confirm(t("common.confirmDelete", "Are you sure you want to delete this?"))) {
        const exerciseType = selectedExerciseTypeForQuestions.value;
        exerciseQuestions.value[exerciseType].splice(index, 1);
        saveQuestionsToStorage();
      }
    };
    const addRequirement = () => {
      newQuestion.value.requirements.push("");
    };
    const removeRequirement = (index) => {
      if (newQuestion.value.requirements.length > 1) {
        newQuestion.value.requirements.splice(index, 1);
      }
    };
    const addListeningQuestion = () => {
      const listeningQuestion = newQuestion.value;
      if (listeningQuestion.questions) {
        listeningQuestion.questions.push({
          question: "",
          type: "multiple-choice",
          options: ["", "", "", ""],
          correctAnswer: ""
        });
      }
    };
    const removeListeningQuestion = (index) => {
      const listeningQuestion = newQuestion.value;
      if (listeningQuestion.questions && listeningQuestion.questions.length > 1) {
        listeningQuestion.questions.splice(index, 1);
      }
    };
    const isYouTubeUrl = (url) => {
      if (!url) return false;
      const youtubeRegex = /^(https?\:\/\/)?(www\.)?(youtube\.com|youtu\.be)\/.+/;
      return youtubeRegex.test(url);
    };
    const extractYouTubeVideoId = (url) => {
      const regex = /(?:youtube\.com\/(?:[^\/]+\/.+\/|(?:v|e(?:mbed)?)\/|.*[?&]v=)|youtu\.be\/)([^"&?\/\s]{11})/;
      const match = url.match(regex);
      return match ? match[1] : null;
    };
    const convertYouTubeToAudioUrl = (url) => {
      const videoId = extractYouTubeVideoId(url);
      if (videoId) {
        return `youtube:${videoId}`;
      }
      return url;
    };
    const handleAudioUrlChange = () => {
      if (isYouTubeUrl(newQuestion.value.audioUrl)) {
        const convertedUrl = convertYouTubeToAudioUrl(newQuestion.value.audioUrl);
        newQuestion.value.originalUrl = newQuestion.value.audioUrl;
        newQuestion.value.audioUrl = convertedUrl;
      }
    };
    const handleUrlPaste = (event) => {
      const pastedText = event.clipboardData?.getData("text") || "";
      if (pastedText) {
        let cleanUrl = pastedText.trim();
        if (cleanUrl.includes("youtube.com") || cleanUrl.includes("youtu.be")) {
          const url = new URL(cleanUrl);
          if (url.hostname.includes("youtube.com")) {
            const videoId = url.searchParams.get("v");
            if (videoId) {
              cleanUrl = `https://www.youtube.com/watch?v=${videoId}`;
            }
          } else if (url.hostname.includes("youtu.be")) {
            const videoId = url.pathname.slice(1);
            if (videoId) {
              cleanUrl = `https://youtu.be/${videoId}`;
            }
          }
        }
        newQuestion.value.audioUrl = cleanUrl;
        event.preventDefault();
        handleAudioUrlChange();
      }
    };
    const clearAudioUrl = () => {
      newQuestion.value.audioUrl = "";
      newQuestion.value.originalUrl = "";
    };
    const saveQuestionsToStorage = () => {
      localStorage.setItem("grammarExerciseQuestions", JSON.stringify(exerciseQuestions.value));
    };
    const loadQuestionsFromStorage = () => {
      const saved = localStorage.getItem("grammarExerciseQuestions");
      if (saved) {
        exerciseQuestions.value = JSON.parse(saved);
      }
    };
    const initializeFromUrl = () => {
      const exerciseFromUrl = route.query.exercise;
      if (exerciseFromUrl && exerciseTypes.value.some((ex) => ex.type === exerciseFromUrl)) {
        selectedExercise.value = exerciseFromUrl;
        generateQuestions();
      } else {
        selectedExercise.value = null;
      }
    };
    watch(() => route.query.exercise, (newExercise2) => {
      if (newExercise2 && exerciseTypes.value.some((ex) => ex.type === newExercise2)) {
        if (selectedExercise.value !== newExercise2) {
          selectedExercise.value = newExercise2;
          currentQuestionIndex.value = 0;
          exerciseResults.value = {
            correct: 0,
            incorrect: 0,
            percentage: 0,
            answers: []
          };
          generateQuestions();
        }
      } else {
        selectedExercise.value = null;
      }
    });
    watch([showQuestionManager, showSettings, showResults, showExerciseManager], ([questionManager, settings2, results, exerciseManager]) => {
      const anyModalOpen = questionManager || settings2 || results || exerciseManager;
      if (anyModalOpen) {
        document.body.style.overflow = "hidden";
      } else {
        document.body.style.overflow = "";
      }
    });
    onMounted(() => {
      const savedSettings = localStorage.getItem("grammarPracticeSettings");
      if (savedSettings) {
        settings.value = { ...settings.value, ...JSON.parse(savedSettings) };
      }
      const savedScore = localStorage.getItem("grammarPracticeScore");
      if (savedScore) {
        totalScore.value = parseInt(savedScore);
      }
      loadQuestionsFromStorage();
      initializeFromUrl();
    });
    return (_ctx, _cache) => {
      return openBlock(), createElementBlock("div", _hoisted_1$4, [
        _cache[40] || (_cache[40] = createStaticVNode('<div class="absolute inset-0 overflow-hidden pointer-events-none z-0"><div class="floating-shapes"><div class="absolute top-16 left-8 w-64 h-64 bg-blue-300 dark:bg-blue-500 rounded-full mix-blend-multiply dark:mix-blend-normal filter blur-xl opacity-30 animate-blob"></div><div class="absolute top-36 right-8 w-72 h-72 bg-purple-300 dark:bg-purple-500 rounded-full mix-blend-multiply dark:mix-blend-normal filter blur-xl opacity-30 animate-blob animation-delay-2000"></div><div class="absolute -bottom-10 left-24 w-80 h-80 bg-pink-300 dark:bg-pink-500 rounded-full mix-blend-multiply dark:mix-blend-normal filter blur-xl opacity-30 animate-blob animation-delay-4000"></div></div></div>', 1)),
        createBaseVNode("div", _hoisted_2$4, [
          createBaseVNode("div", _hoisted_3$3, [
            createBaseVNode("div", _hoisted_4$3, [
              createBaseVNode("div", _hoisted_5$3, [
                createBaseVNode("button", {
                  onClick: goBackToGrammarDetail,
                  class: "p-2 rounded-lg text-gray-600 dark:text-white/70 hover:text-gray-800 dark:hover:text-white hover:bg-gray-100 dark:hover:bg-[#0f0f0f] transition-colors"
                }, _cache[23] || (_cache[23] = [
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
                      d: "M15 19l-7-7 7-7"
                    })
                  ], -1)
                ])),
                createBaseVNode("div", null, [
                  createBaseVNode("div", _hoisted_6$3, [
                    _cache[24] || (_cache[24] = createBaseVNode("div", { class: "animate-pulse-slow" }, [
                      createBaseVNode("div", { class: "w-2.5 h-2.5 bg-gradient-to-r from-blue-400 to-indigo-500 rounded-full mr-2.5" })
                    ], -1)),
                    createBaseVNode("h1", _hoisted_7$2, toDisplayString(unref(t)("grammar.practice.title", "Practice")), 1)
                  ]),
                  createBaseVNode("p", _hoisted_8$1, toDisplayString(unref(t)("grammar.practice.subtitle", "Choose a mode to practice grammar with interactive exercises")), 1)
                ])
              ]),
              createBaseVNode("div", _hoisted_9$1, [
                createBaseVNode("div", _hoisted_10$1, [
                  createTextVNode(toDisplayString(unref(t)("grammar.practice.score", "Score")) + ": ", 1),
                  createBaseVNode("span", _hoisted_11$1, toDisplayString(totalScore.value), 1)
                ]),
                createBaseVNode("button", {
                  onClick: _cache[0] || (_cache[0] = ($event) => showExerciseManager.value = true),
                  class: "p-2 rounded-lg text-gray-600 dark:text-white/70 hover:text-gray-800 dark:hover:text-white hover:bg-gray-100 dark:hover:bg-[#0f0f0f] transition-colors",
                  title: unref(t)("grammar.practice.exerciseManager.title", "Manage exercises")
                }, _cache[25] || (_cache[25] = [
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
                      d: "M12 6V4m0 2a2 2 0 100 4m0-4a2 2 0 110 4m-6 8a2 2 0 100-4m0 4a2 2 0 100 4m0-4v2m0-6V4m6 6v10m6-2a2 2 0 100-4m0 4a2 2 0 100 4m0-4v2m0-6V4"
                    })
                  ], -1)
                ]), 8, _hoisted_12),
                createBaseVNode("button", {
                  onClick: _cache[1] || (_cache[1] = ($event) => showSettings.value = true),
                  class: "p-2 rounded-lg text-gray-600 dark:text-white/70 hover:text-gray-800 dark:hover:text-white hover:bg-gray-100 dark:hover:bg-[#0f0f0f] transition-colors",
                  title: unref(t)("grammar.practice.settings.title", "Settings")
                }, _cache[26] || (_cache[26] = [
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
            ])
          ])
        ]),
        createBaseVNode("div", _hoisted_14, [
          !selectedExercise.value ? (openBlock(), createElementBlock("div", _hoisted_15, [
            createBaseVNode("div", _hoisted_16, [
              createBaseVNode("h2", _hoisted_17, toDisplayString(unref(t)("grammar.practice.chooseExercise", "Choose an exercise")), 1),
              createBaseVNode("p", _hoisted_18, toDisplayString(unref(t)("grammar.practice.chooseDescription", "Select a practice type below to get started")), 1)
            ]),
            createBaseVNode("div", _hoisted_19, [
              (openBlock(true), createElementBlock(Fragment, null, renderList(exerciseTypes.value, (exercise) => {
                return openBlock(), createElementBlock("div", {
                  key: exercise.type,
                  onClick: ($event) => startExercise(exercise.type),
                  class: "group bg-white/80 dark:bg-[#0a0a0a]/80 backdrop-blur-md rounded-2xl shadow-xl border border-white/20 dark:border-white/10 p-6 cursor-pointer hover:shadow-2xl hover:scale-[1.03] transition-all duration-300"
                }, [
                  createBaseVNode("div", _hoisted_21, [
                    createBaseVNode("div", {
                      class: normalizeClass(["w-16 h-16 mx-auto mb-4 rounded-full flex items-center justify-center", exercise.colorClass])
                    }, [
                      (openBlock(), createBlock(resolveDynamicComponent(exercise.icon), { class: "w-8 h-8 text-white" }))
                    ], 2),
                    createBaseVNode("h3", _hoisted_22, toDisplayString(tf(`grammar.practice.exercises.${exercise.type}.title`, exercise.title)), 1),
                    createBaseVNode("p", _hoisted_23, toDisplayString(tf(`grammar.practice.exercises.${exercise.type}.description`, exercise.description)), 1),
                    createBaseVNode("div", _hoisted_24, [
                      createBaseVNode("span", null, toDisplayString(exercise.duration), 1),
                      _cache[27] || (_cache[27] = createBaseVNode("span", null, "•", -1)),
                      createBaseVNode("span", null, toDisplayString(exercise.difficulty), 1)
                    ])
                  ])
                ], 8, _hoisted_20);
              }), 128))
            ])
          ])) : (openBlock(), createElementBlock("div", _hoisted_25, [
            createBaseVNode("div", _hoisted_26, [
              createBaseVNode("div", _hoisted_27, [
                createBaseVNode("div", _hoisted_28, [
                  createBaseVNode("button", {
                    onClick: goBackToSelection,
                    class: "p-2 rounded-lg text-gray-500 dark:text-gray-400 hover:text-gray-700 dark:hover:text-gray-200 hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors"
                  }, _cache[28] || (_cache[28] = [
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
                        d: "M15 19l-7-7 7-7"
                      })
                    ], -1)
                  ])),
                  createBaseVNode("div", null, [
                    createBaseVNode("h2", _hoisted_29, toDisplayString(tf(`grammar.practice.exercises.${selectedExercise.value}.title`, "Exercise")), 1),
                    createBaseVNode("p", _hoisted_30, toDisplayString(unref(t)("grammar.practice.question", "Question")) + " " + toDisplayString(currentQuestionIndex.value + 1) + " / " + toDisplayString(totalQuestions.value), 1)
                  ])
                ]),
                createBaseVNode("div", _hoisted_31, [
                  createBaseVNode("div", _hoisted_32, [
                    createBaseVNode("div", {
                      class: "bg-blue-600 h-2 rounded-full transition-all duration-300",
                      style: normalizeStyle({ width: `${currentQuestionIndex.value / totalQuestions.value * 100}%` })
                    }, null, 4)
                  ]),
                  createBaseVNode("span", _hoisted_33, toDisplayString(Math.round(currentQuestionIndex.value / totalQuestions.value * 100)) + "% ", 1)
                ])
              ])
            ]),
            (openBlock(), createBlock(resolveDynamicComponent(currentExerciseComponent.value), {
              question: currentQuestion.value,
              "question-index": currentQuestionIndex.value,
              "total-questions": totalQuestions.value,
              difficulty: settings.value.difficulty,
              onAnswer: handleAnswer,
              onNext: nextQuestion,
              onComplete: completeExercise
            }, null, 40, ["question", "question-index", "total-questions", "difficulty"]))
          ]))
        ]),
        createVNode(Transition, {
          "enter-active-class": "transition-all duration-500 ease-out",
          "enter-from-class": "opacity-0",
          "enter-to-class": "opacity-100",
          "leave-active-class": "transition-all duration-300 ease-in",
          "leave-from-class": "opacity-100",
          "leave-to-class": "opacity-0"
        }, {
          default: withCtx(() => [
            showSettings.value ? (openBlock(), createElementBlock("div", _hoisted_34, [
              createVNode(Transition, {
                "enter-active-class": "transition-all duration-500 ease-out",
                "enter-from-class": "opacity-0 scale-90 translate-y-8 rotate-1",
                "enter-to-class": "opacity-100 scale-100 translate-y-0 rotate-0",
                "leave-active-class": "transition-all duration-300 ease-in",
                "leave-from-class": "opacity-100 scale-100 translate-y-0 rotate-0",
                "leave-to-class": "opacity-0 scale-90 translate-y-8 rotate-1"
              }, {
                default: withCtx(() => [
                  createBaseVNode("div", {
                    class: "w-full max-h-[90vh] flex flex-col max-w-md sm:max-w-md md:max-w-lg",
                    onClick: _cache[7] || (_cache[7] = withModifiers(() => {
                    }, ["stop"]))
                  }, [
                    createBaseVNode("div", _hoisted_35, [
                      createBaseVNode("div", _hoisted_36, [
                        createBaseVNode("div", _hoisted_37, [
                          createBaseVNode("h3", _hoisted_38, [
                            _cache[29] || (_cache[29] = createBaseVNode("span", { class: "w-2 h-2 bg-blue-500 rounded-full animate-pulse" }, null, -1)),
                            createBaseVNode("span", null, toDisplayString(unref(t)("grammar.practice.settings.title", "Settings")), 1)
                          ]),
                          createBaseVNode("button", {
                            onClick: _cache[2] || (_cache[2] = ($event) => showSettings.value = false),
                            class: "text-gray-400 dark:text-white hover:text-gray-600 dark:hover:text-white transition-all duration-300 hover:scale-110 hover:rotate-90 p-1 rounded-full hover:bg-gray-100 dark:hover:bg-dark-bg-mute"
                          }, _cache[30] || (_cache[30] = [
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
                      createBaseVNode("div", _hoisted_39, [
                        createBaseVNode("div", null, [
                          createBaseVNode("label", _hoisted_40, toDisplayString(unref(t)("grammar.practice.settings.difficulty", "Difficulty")), 1),
                          withDirectives(createBaseVNode("select", {
                            "onUpdate:modelValue": _cache[3] || (_cache[3] = ($event) => settings.value.difficulty = $event),
                            class: "w-full px-3 py-2 border border-gray-300 dark:border-dark-bg-mute rounded-lg bg-white dark:bg-[#0a0a0a] text-gray-900 dark:text-white focus:ring-2 focus:ring-blue-500 focus:border-blue-500 dark:focus:border-blue-500"
                          }, [
                            createBaseVNode("option", _hoisted_41, toDisplayString(unref(t)("grammar.practice.settings.levels.easy", "Easy")), 1),
                            createBaseVNode("option", _hoisted_42, toDisplayString(unref(t)("grammar.practice.settings.levels.medium", "Medium")), 1),
                            createBaseVNode("option", _hoisted_43, toDisplayString(unref(t)("grammar.practice.settings.levels.hard", "Hard")), 1)
                          ], 512), [
                            [vModelSelect, settings.value.difficulty]
                          ])
                        ]),
                        createBaseVNode("div", _hoisted_44, [
                          createBaseVNode("label", _hoisted_45, toDisplayString(unref(t)("grammar.practice.settings.autoPlay", "Auto-play audio")), 1),
                          createBaseVNode("button", {
                            onClick: _cache[4] || (_cache[4] = ($event) => settings.value.autoPlayAudio = !settings.value.autoPlayAudio),
                            class: normalizeClass([
                              "relative inline-flex h-6 w-11 items-center rounded-full transition-colors",
                              settings.value.autoPlayAudio ? "bg-blue-600" : "bg-gray-200 dark:bg-dark-bg-mute"
                            ])
                          }, [
                            createBaseVNode("span", {
                              class: normalizeClass([
                                "inline-block h-4 w-4 transform rounded-full bg-white transition-transform",
                                settings.value.autoPlayAudio ? "translate-x-6" : "translate-x-1"
                              ])
                            }, null, 2)
                          ], 2)
                        ]),
                        createBaseVNode("div", _hoisted_46, [
                          createBaseVNode("label", _hoisted_47, toDisplayString(unref(t)("grammar.practice.settings.showExplanations", "Show explanations")), 1),
                          createBaseVNode("button", {
                            onClick: _cache[5] || (_cache[5] = ($event) => settings.value.showExplanations = !settings.value.showExplanations),
                            class: normalizeClass([
                              "relative inline-flex h-6 w-11 items-center rounded-full transition-colors",
                              settings.value.showExplanations ? "bg-blue-600" : "bg-gray-200 dark:bg-dark-bg-mute"
                            ])
                          }, [
                            createBaseVNode("span", {
                              class: normalizeClass([
                                "inline-block h-4 w-4 transform rounded-full bg-white transition-transform",
                                settings.value.showExplanations ? "translate-x-6" : "translate-x-1"
                              ])
                            }, null, 2)
                          ], 2)
                        ])
                      ]),
                      createBaseVNode("div", _hoisted_48, [
                        createBaseVNode("div", _hoisted_49, [
                          createBaseVNode("button", {
                            onClick: _cache[6] || (_cache[6] = ($event) => showSettings.value = false),
                            class: "px-6 py-2 text-gray-700 dark:text-white bg-gray-100 dark:bg-dark-bg-mute hover:bg-gray-200 dark:hover:bg-dark-bg-soft rounded-lg transition-all duration-300 hover:scale-105 hover:shadow-lg font-medium"
                          }, toDisplayString(unref(t)("common.cancel", "Cancel")), 1),
                          createBaseVNode("button", {
                            onClick: saveSettings2,
                            class: "px-6 py-2 bg-gradient-to-r from-blue-500 to-blue-600 text-white rounded-lg hover:from-blue-600 hover:to-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 transition-all duration-300 hover:scale-105 hover:shadow-lg font-medium"
                          }, toDisplayString(unref(t)("common.save", "Save")), 1)
                        ])
                      ])
                    ])
                  ])
                ]),
                _: 1
              })
            ])) : createCommentVNode("", true)
          ]),
          _: 1
        }),
        showResults.value ? (openBlock(), createElementBlock("div", _hoisted_50, [
          createBaseVNode("div", _hoisted_51, [
            createBaseVNode("div", _hoisted_52, [
              _cache[31] || (_cache[31] = createBaseVNode("div", { class: "w-20 h-20 mx-auto mb-4 rounded-full bg-green-100 dark:bg-green-900/30 flex items-center justify-center" }, [
                createBaseVNode("svg", {
                  class: "w-10 h-10 text-green-600 dark:text-green-400",
                  fill: "none",
                  stroke: "currentColor",
                  viewBox: "0 0 24 24"
                }, [
                  createBaseVNode("path", {
                    "stroke-linecap": "round",
                    "stroke-linejoin": "round",
                    "stroke-width": "2",
                    d: "M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"
                  })
                ])
              ], -1)),
              createBaseVNode("h3", _hoisted_53, toDisplayString(unref(t)("grammar.practice.results.title", "Great job!")), 1),
              createBaseVNode("div", _hoisted_54, [
                createBaseVNode("div", _hoisted_55, [
                  createBaseVNode("div", _hoisted_56, [
                    createBaseVNode("div", _hoisted_57, toDisplayString(exerciseResults.value.correct), 1),
                    createBaseVNode("div", _hoisted_58, toDisplayString(unref(t)("grammar.practice.results.correct", "Correct")), 1)
                  ]),
                  createBaseVNode("div", _hoisted_59, [
                    createBaseVNode("div", _hoisted_60, toDisplayString(exerciseResults.value.incorrect), 1),
                    createBaseVNode("div", _hoisted_61, toDisplayString(unref(t)("grammar.practice.results.incorrect", "Incorrect")), 1)
                  ]),
                  createBaseVNode("div", _hoisted_62, [
                    createBaseVNode("div", _hoisted_63, toDisplayString(exerciseResults.value.percentage) + "%", 1),
                    createBaseVNode("div", _hoisted_64, toDisplayString(unref(t)("grammar.practice.results.accuracy", "Accuracy")), 1)
                  ])
                ])
              ]),
              createBaseVNode("div", _hoisted_65, [
                createBaseVNode("button", {
                  onClick: restartExercise,
                  class: "px-6 py-3 text-sm font-medium text-gray-700 dark:text-gray-300 bg-gray-100 dark:bg-gray-700 rounded-lg hover:bg-gray-200 dark:hover:bg-gray-600 transition-colors"
                }, toDisplayString(unref(t)("grammar.practice.results.tryAgain", "Try again")), 1),
                createBaseVNode("button", {
                  onClick: goBackToSelection,
                  class: "px-6 py-3 text-sm font-medium text-white bg-blue-600 rounded-lg hover:bg-blue-700 transition-colors"
                }, toDisplayString(unref(t)("grammar.practice.results.chooseAnother", "Choose another exercise")), 1)
              ])
            ])
          ])
        ])) : createCommentVNode("", true),
        createVNode(unref(ExerciseManager), {
          modelValue: showExerciseManager.value,
          "onUpdate:modelValue": _cache[8] || (_cache[8] = ($event) => showExerciseManager.value = $event),
          "exercise-types": exerciseTypes.value,
          onAddExercise: addExerciseType,
          onEditExercise: editExerciseType,
          onDeleteExercise: deleteExerciseType,
          onSaveExercises: saveExerciseTypes,
          onOpenQuestionManager: openQuestionManager
        }, null, 8, ["modelValue", "exercise-types"]),
        showQuestionManager.value ? (openBlock(), createElementBlock("div", _hoisted_66, [
          createBaseVNode("div", _hoisted_67, [
            createBaseVNode("div", _hoisted_68, [
              createBaseVNode("h3", _hoisted_69, toDisplayString(unref(t)("grammar.practice.questionManager.title")) + ": " + toDisplayString(unref(t)(`grammar.practice.exercises.${selectedExerciseTypeForQuestions.value}.title`)), 1),
              createBaseVNode("button", {
                onClick: closeQuestionManager,
                class: "p-2 rounded-lg text-gray-500 dark:text-gray-400 hover:text-gray-700 dark:hover:text-gray-200 hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors"
              }, _cache[32] || (_cache[32] = [
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
            createBaseVNode("div", _hoisted_70, [
              createBaseVNode("div", _hoisted_71, [
                createBaseVNode("h4", _hoisted_72, toDisplayString(editingQuestionIndex.value >= 0 ? unref(t)("grammar.practice.questionManager.editQuestion") : unref(t)("grammar.practice.questionManager.addNew")), 1),
                selectedExerciseTypeForQuestions.value === "writing" ? (openBlock(), createElementBlock("div", _hoisted_73, [
                  createBaseVNode("div", _hoisted_74, [
                    createBaseVNode("div", null, [
                      createBaseVNode("label", _hoisted_75, toDisplayString(unref(t)("grammar.practice.questionManager.taskType")), 1),
                      withDirectives(createBaseVNode("select", {
                        "onUpdate:modelValue": _cache[9] || (_cache[9] = ($event) => newQuestion.value.taskType = $event),
                        class: "w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-[#0a0a0a] text-gray-900 dark:text-white focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                      }, [
                        createBaseVNode("option", _hoisted_76, toDisplayString(unref(t)("grammar.practice.exercises.writing.essay")), 1),
                        createBaseVNode("option", _hoisted_77, toDisplayString(unref(t)("grammar.practice.exercises.writing.email")), 1),
                        createBaseVNode("option", _hoisted_78, toDisplayString(unref(t)("grammar.practice.exercises.writing.letter")), 1),
                        createBaseVNode("option", _hoisted_79, toDisplayString(unref(t)("grammar.practice.exercises.writing.paragraph")), 1)
                      ], 512), [
                        [vModelSelect, newQuestion.value.taskType]
                      ])
                    ]),
                    createBaseVNode("div", _hoisted_80, [
                      createBaseVNode("div", null, [
                        createBaseVNode("label", _hoisted_81, toDisplayString(unref(t)("grammar.practice.questionManager.minWords")), 1),
                        withDirectives(createBaseVNode("input", {
                          "onUpdate:modelValue": _cache[10] || (_cache[10] = ($event) => newQuestion.value.minWords = $event),
                          type: "number",
                          min: "50",
                          class: "w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-[#0a0a0a] text-gray-900 dark:text-white focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                        }, null, 512), [
                          [
                            vModelText,
                            newQuestion.value.minWords,
                            void 0,
                            { number: true }
                          ]
                        ])
                      ]),
                      createBaseVNode("div", null, [
                        createBaseVNode("label", _hoisted_82, toDisplayString(unref(t)("grammar.practice.questionManager.timeLimit")), 1),
                        withDirectives(createBaseVNode("input", {
                          "onUpdate:modelValue": _cache[11] || (_cache[11] = ($event) => newQuestion.value.timeLimit = $event),
                          type: "number",
                          min: "5",
                          class: "w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-[#0a0a0a] text-gray-900 dark:text-white focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                        }, null, 512), [
                          [
                            vModelText,
                            newQuestion.value.timeLimit,
                            void 0,
                            { number: true }
                          ]
                        ])
                      ])
                    ])
                  ]),
                  createBaseVNode("div", null, [
                    createBaseVNode("label", _hoisted_83, toDisplayString(unref(t)("grammar.practice.questionManager.prompt")), 1),
                    withDirectives(createBaseVNode("textarea", {
                      "onUpdate:modelValue": _cache[12] || (_cache[12] = ($event) => newQuestion.value.prompt = $event),
                      rows: "3",
                      class: "w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-[#0a0a0a] text-gray-900 dark:text-white focus:ring-2 focus:ring-blue-500 focus:border-transparent",
                      placeholder: unref(t)("grammar.practice.questionManager.promptPlaceholder")
                    }, null, 8, _hoisted_84), [
                      [vModelText, newQuestion.value.prompt]
                    ])
                  ]),
                  createBaseVNode("div", null, [
                    createBaseVNode("div", _hoisted_85, [
                      createBaseVNode("label", _hoisted_86, toDisplayString(unref(t)("grammar.practice.questionManager.requirements")), 1),
                      createBaseVNode("button", {
                        onClick: addRequirement,
                        class: "text-sm text-blue-600 dark:text-blue-400 hover:text-blue-800 dark:hover:text-blue-300"
                      }, " + " + toDisplayString(unref(t)("grammar.practice.questionManager.addRequirement")), 1)
                    ]),
                    createBaseVNode("div", _hoisted_87, [
                      (openBlock(true), createElementBlock(Fragment, null, renderList(newQuestion.value.requirements, (requirement, index) => {
                        return openBlock(), createElementBlock("div", {
                          key: index,
                          class: "flex items-center space-x-2"
                        }, [
                          withDirectives(createBaseVNode("input", {
                            "onUpdate:modelValue": ($event) => newQuestion.value.requirements[index] = $event,
                            type: "text",
                            class: "flex-1 px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-700 text-gray-900 dark:text-white focus:ring-2 focus:ring-blue-500 focus:border-transparent",
                            placeholder: unref(t)("grammar.practice.questionManager.requirementPlaceholder")
                          }, null, 8, _hoisted_88), [
                            [vModelText, newQuestion.value.requirements[index]]
                          ]),
                          createBaseVNode("button", {
                            onClick: ($event) => removeRequirement(index),
                            class: "p-2 text-red-600 dark:text-red-400 hover:bg-red-100 dark:hover:bg-red-900/30 rounded",
                            disabled: newQuestion.value.requirements.length === 1
                          }, _cache[33] || (_cache[33] = [
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
                          ]), 8, _hoisted_89)
                        ]);
                      }), 128))
                    ])
                  ])
                ])) : selectedExerciseTypeForQuestions.value === "multiple-choice" ? (openBlock(), createElementBlock("div", _hoisted_90, [
                  createBaseVNode("div", null, [
                    createBaseVNode("label", _hoisted_91, toDisplayString(unref(t)("grammar.practice.questionManager.question")), 1),
                    withDirectives(createBaseVNode("textarea", {
                      "onUpdate:modelValue": _cache[13] || (_cache[13] = ($event) => newQuestion.value.question = $event),
                      rows: "2",
                      class: "w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-[#0a0a0a] text-gray-900 dark:text-white focus:ring-2 focus:ring-blue-500 focus:border-transparent",
                      placeholder: unref(t)("grammar.practice.questionManager.questionPlaceholder")
                    }, null, 8, _hoisted_92), [
                      [vModelText, newQuestion.value.question]
                    ])
                  ]),
                  createBaseVNode("div", null, [
                    createBaseVNode("label", _hoisted_93, toDisplayString(unref(t)("grammar.practice.questionManager.options")), 1),
                    createBaseVNode("div", _hoisted_94, [
                      (openBlock(true), createElementBlock(Fragment, null, renderList(newQuestion.value.options, (option, index) => {
                        return openBlock(), createElementBlock("div", {
                          key: index,
                          class: "flex items-center space-x-2"
                        }, [
                          createBaseVNode("span", _hoisted_95, toDisplayString(String.fromCharCode(65 + index)) + ".", 1),
                          withDirectives(createBaseVNode("input", {
                            "onUpdate:modelValue": ($event) => newQuestion.value.options[index] = $event,
                            type: "text",
                            class: "flex-1 px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-700 text-gray-900 dark:text-white focus:ring-2 focus:ring-blue-500 focus:border-transparent",
                            placeholder: unref(t)("grammar.practice.questionManager.optionPlaceholder")
                          }, null, 8, _hoisted_96), [
                            [vModelText, newQuestion.value.options[index]]
                          ])
                        ]);
                      }), 128))
                    ])
                  ]),
                  createBaseVNode("div", null, [
                    createBaseVNode("label", _hoisted_97, toDisplayString(unref(t)("grammar.practice.questionManager.correctAnswer")), 1),
                    withDirectives(createBaseVNode("select", {
                      "onUpdate:modelValue": _cache[14] || (_cache[14] = ($event) => newQuestion.value.correctAnswer = $event),
                      class: "w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-[#0a0a0a] text-gray-900 dark:text-white focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    }, [
                      (openBlock(true), createElementBlock(Fragment, null, renderList(newQuestion.value.options, (option, index) => {
                        return openBlock(), createElementBlock("option", {
                          key: index,
                          value: option
                        }, toDisplayString(String.fromCharCode(65 + index)) + ". " + toDisplayString(option), 9, _hoisted_98);
                      }), 128))
                    ], 512), [
                      [vModelSelect, newQuestion.value.correctAnswer]
                    ])
                  ]),
                  createBaseVNode("div", null, [
                    createBaseVNode("label", _hoisted_99, toDisplayString(unref(t)("grammar.practice.questionManager.explanation")), 1),
                    withDirectives(createBaseVNode("textarea", {
                      "onUpdate:modelValue": _cache[15] || (_cache[15] = ($event) => newQuestion.value.explanation = $event),
                      rows: "2",
                      class: "w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-[#0a0a0a] text-gray-900 dark:text-white focus:ring-2 focus:ring-blue-500 focus:border-transparent",
                      placeholder: unref(t)("grammar.practice.questionManager.explanationPlaceholder")
                    }, null, 8, _hoisted_100), [
                      [vModelText, newQuestion.value.explanation]
                    ])
                  ])
                ])) : selectedExerciseTypeForQuestions.value === "listening" ? (openBlock(), createElementBlock("div", _hoisted_101, [
                  createBaseVNode("div", null, [
                    createBaseVNode("label", _hoisted_102, toDisplayString(unref(t)("grammar.practice.exercises.listening.audioUrl")), 1),
                    createBaseVNode("div", _hoisted_103, [
                      withDirectives(createBaseVNode("input", {
                        "onUpdate:modelValue": _cache[16] || (_cache[16] = ($event) => newQuestion.value.audioUrl = $event),
                        type: "text",
                        onInput: handleAudioUrlChange,
                        onPaste: handleUrlPaste,
                        class: "w-full px-3 py-2 pr-20 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-[#0a0a0a] text-gray-900 dark:text-white focus:ring-2 focus:ring-blue-500 focus:border-transparent",
                        placeholder: unref(t)("grammar.practice.exercises.listening.audioUrlPlaceholder")
                      }, null, 40, _hoisted_104), [
                        [vModelText, newQuestion.value.audioUrl]
                      ]),
                      newQuestion.value.audioUrl ? (openBlock(), createElementBlock("button", {
                        key: 0,
                        onClick: clearAudioUrl,
                        type: "button",
                        class: "absolute right-2 top-1/2 transform -translate-y-1/2 p-1 text-gray-400 hover:text-gray-600 dark:hover:text-gray-300 transition-colors"
                      }, _cache[34] || (_cache[34] = [
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
                            d: "M6 18L18 6M6 6l12 12"
                          })
                        ], -1)
                      ]))) : createCommentVNode("", true)
                    ]),
                    createBaseVNode("div", _hoisted_105, toDisplayString(unref(t)("grammar.practice.exercises.listening.audioUrlHint")), 1),
                    isYouTubeUrl(newQuestion.value.audioUrl) ? (openBlock(), createElementBlock("div", _hoisted_106, [
                      createBaseVNode("div", _hoisted_107, [
                        _cache[35] || (_cache[35] = createBaseVNode("svg", {
                          class: "w-4 h-4",
                          fill: "currentColor",
                          viewBox: "0 0 24 24"
                        }, [
                          createBaseVNode("path", { d: "M23.498 6.186a3.016 3.016 0 0 0-2.122-2.136C19.505 3.545 12 3.545 12 3.545s-7.505 0-9.377.505A3.017 3.017 0 0 0 .502 6.186C0 8.07 0 12 0 12s0 3.93.502 5.814a3.016 3.016 0 0 0 2.122 2.136c1.871.505 9.376.505 9.376.505s7.505 0 9.377-.505a3.015 3.015 0 0 0 2.122-2.136C24 15.93 24 12 24 12s0-3.93-.502-5.814zM9.545 15.568V8.432L15.818 12l-6.273 3.568z" })
                        ], -1)),
                        createBaseVNode("span", null, toDisplayString(unref(t)("grammar.practice.exercises.listening.youtubeDetected")), 1)
                      ]),
                      createBaseVNode("div", _hoisted_108, toDisplayString(unref(t)("grammar.practice.exercises.listening.youtubeNote")), 1)
                    ])) : createCommentVNode("", true)
                  ]),
                  createBaseVNode("div", _hoisted_109, [
                    createBaseVNode("div", null, [
                      createBaseVNode("label", _hoisted_110, toDisplayString(unref(t)("grammar.practice.exercises.listening.maxPlays")), 1),
                      withDirectives(createBaseVNode("input", {
                        "onUpdate:modelValue": _cache[17] || (_cache[17] = ($event) => newQuestion.value.maxPlays = $event),
                        type: "number",
                        min: "1",
                        max: "10",
                        class: "w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-[#0a0a0a] text-gray-900 dark:text-white focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                      }, null, 512), [
                        [
                          vModelText,
                          newQuestion.value.maxPlays,
                          void 0,
                          { number: true }
                        ]
                      ])
                    ]),
                    createBaseVNode("div", null, [
                      createBaseVNode("label", _hoisted_111, toDisplayString(unref(t)("grammar.practice.settings.difficulty")), 1),
                      withDirectives(createBaseVNode("select", {
                        "onUpdate:modelValue": _cache[18] || (_cache[18] = ($event) => newQuestion.value.difficulty = $event),
                        class: "w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-[#0a0a0a] text-gray-900 dark:text-white focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                      }, [
                        createBaseVNode("option", _hoisted_112, toDisplayString(unref(t)("grammar.practice.settings.levels.easy")), 1),
                        createBaseVNode("option", _hoisted_113, toDisplayString(unref(t)("grammar.practice.settings.levels.medium")), 1),
                        createBaseVNode("option", _hoisted_114, toDisplayString(unref(t)("grammar.practice.settings.levels.hard")), 1)
                      ], 512), [
                        [vModelSelect, newQuestion.value.difficulty]
                      ])
                    ]),
                    createBaseVNode("div", _hoisted_115, [
                      createBaseVNode("label", _hoisted_116, [
                        withDirectives(createBaseVNode("input", {
                          "onUpdate:modelValue": _cache[19] || (_cache[19] = ($event) => newQuestion.value.allowNotes = $event),
                          type: "checkbox",
                          class: "w-4 h-4 text-blue-600 border-gray-300 rounded focus:ring-blue-500"
                        }, null, 512), [
                          [vModelCheckbox, newQuestion.value.allowNotes]
                        ]),
                        createBaseVNode("span", _hoisted_117, toDisplayString(unref(t)("grammar.practice.exercises.listening.allowNotes")), 1)
                      ])
                    ])
                  ]),
                  createBaseVNode("div", null, [
                    createBaseVNode("label", _hoisted_118, toDisplayString(unref(t)("grammar.practice.exercises.listening.transcript")), 1),
                    withDirectives(createBaseVNode("textarea", {
                      "onUpdate:modelValue": _cache[20] || (_cache[20] = ($event) => newQuestion.value.transcript = $event),
                      rows: "3",
                      class: "w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-[#0a0a0a] text-gray-900 dark:text-white focus:ring-2 focus:ring-blue-500 focus:border-transparent",
                      placeholder: unref(t)("grammar.practice.exercises.listening.transcriptPlaceholder")
                    }, null, 8, _hoisted_119), [
                      [vModelText, newQuestion.value.transcript]
                    ])
                  ]),
                  createBaseVNode("div", null, [
                    createBaseVNode("label", _hoisted_120, toDisplayString(unref(t)("grammar.practice.exercises.listening.questions")), 1),
                    createBaseVNode("div", _hoisted_121, [
                      (openBlock(true), createElementBlock(Fragment, null, renderList(newQuestion.value.questions, (question, qIndex) => {
                        return openBlock(), createElementBlock("div", {
                          key: qIndex,
                          class: "border border-gray-200 dark:border-gray-600 rounded-lg p-3"
                        }, [
                          createBaseVNode("div", _hoisted_122, [
                            createBaseVNode("span", _hoisted_123, toDisplayString(unref(t)("grammar.practice.exercises.listening.question")) + " " + toDisplayString(qIndex + 1), 1),
                            createBaseVNode("button", {
                              onClick: ($event) => removeListeningQuestion(qIndex),
                              class: "p-1 text-red-600 dark:text-red-400 hover:bg-red-100 dark:hover:bg-red-900/30 rounded",
                              disabled: newQuestion.value.questions.length === 1
                            }, _cache[36] || (_cache[36] = [
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
                            ]), 8, _hoisted_124)
                          ]),
                          createBaseVNode("div", _hoisted_125, [
                            createBaseVNode("div", null, [
                              withDirectives(createBaseVNode("select", {
                                "onUpdate:modelValue": ($event) => question.type = $event,
                                class: "w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-[#0a0a0a] text-gray-900 dark:text-white focus:ring-2 focus:ring-blue-500 focus:border-transparent text-sm"
                              }, [
                                createBaseVNode("option", _hoisted_127, toDisplayString(unref(t)("grammar.practice.exercises.listening.multipleChoice")), 1),
                                createBaseVNode("option", _hoisted_128, toDisplayString(unref(t)("grammar.practice.exercises.listening.fillBlank")), 1),
                                createBaseVNode("option", _hoisted_129, toDisplayString(unref(t)("grammar.practice.exercises.listening.ordering")), 1)
                              ], 8, _hoisted_126), [
                                [vModelSelect, question.type]
                              ])
                            ]),
                            createBaseVNode("div", null, [
                              withDirectives(createBaseVNode("textarea", {
                                "onUpdate:modelValue": ($event) => question.question = $event,
                                rows: "2",
                                class: "w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-[#0a0a0a] text-gray-900 dark:text-white focus:ring-2 focus:ring-blue-500 focus:border-transparent text-sm",
                                placeholder: unref(t)("grammar.practice.questionManager.questionPlaceholder")
                              }, null, 8, _hoisted_130), [
                                [vModelText, question.question]
                              ])
                            ]),
                            question.type === "multiple-choice" ? (openBlock(), createElementBlock("div", _hoisted_131, [
                              (openBlock(true), createElementBlock(Fragment, null, renderList(question.options, (option, oIndex) => {
                                return openBlock(), createElementBlock("div", {
                                  key: oIndex,
                                  class: "flex items-center space-x-2"
                                }, [
                                  createBaseVNode("span", _hoisted_132, toDisplayString(String.fromCharCode(65 + oIndex)) + ".", 1),
                                  withDirectives(createBaseVNode("input", {
                                    "onUpdate:modelValue": ($event) => question.options[oIndex] = $event,
                                    type: "text",
                                    class: "flex-1 px-2 py-1 border border-gray-300 dark:border-gray-600 rounded bg-white dark:bg-[#0a0a0a] text-gray-900 dark:text-white focus:ring-1 focus:ring-blue-500 focus:border-transparent text-sm",
                                    placeholder: unref(t)("grammar.practice.questionManager.optionPlaceholder")
                                  }, null, 8, _hoisted_133), [
                                    [vModelText, question.options[oIndex]]
                                  ])
                                ]);
                              }), 128)),
                              createBaseVNode("div", null, [
                                withDirectives(createBaseVNode("select", {
                                  "onUpdate:modelValue": ($event) => question.correctAnswer = $event,
                                  class: "w-full px-2 py-1 border border-gray-300 dark:border-gray-600 rounded bg-white dark:bg-[#0a0a0a] text-gray-900 dark:text-white focus:ring-1 focus:ring-blue-500 focus:border-transparent text-sm"
                                }, [
                                  createBaseVNode("option", _hoisted_135, toDisplayString(unref(t)("grammar.practice.questionManager.selectCorrectAnswer")), 1),
                                  (openBlock(true), createElementBlock(Fragment, null, renderList(question.options, (option, oIndex) => {
                                    return openBlock(), createElementBlock("option", {
                                      key: oIndex,
                                      value: oIndex
                                    }, toDisplayString(String.fromCharCode(65 + oIndex)) + ". " + toDisplayString(option), 9, _hoisted_136);
                                  }), 128))
                                ], 8, _hoisted_134), [
                                  [vModelSelect, question.correctAnswer]
                                ])
                              ])
                            ])) : question.type === "fill-blank" ? (openBlock(), createElementBlock("div", _hoisted_137, [
                              withDirectives(createBaseVNode("input", {
                                "onUpdate:modelValue": ($event) => question.correctAnswer = $event,
                                type: "text",
                                class: "w-full px-2 py-1 border border-gray-300 dark:border-gray-600 rounded bg-white dark:bg-gray-700 text-gray-900 dark:text-white focus:ring-1 focus:ring-blue-500 focus:border-transparent text-sm",
                                placeholder: unref(t)("grammar.practice.exercises.listening.correctAnswerPlaceholder")
                              }, null, 8, _hoisted_138), [
                                [vModelText, question.correctAnswer]
                              ])
                            ])) : createCommentVNode("", true)
                          ])
                        ]);
                      }), 128)),
                      createBaseVNode("button", {
                        onClick: addListeningQuestion,
                        class: "w-full px-3 py-2 border-2 border-dashed border-gray-300 dark:border-gray-600 rounded-lg text-gray-500 dark:text-gray-400 hover:border-blue-400 hover:text-blue-500 transition-colors text-sm"
                      }, " + " + toDisplayString(unref(t)("grammar.practice.exercises.listening.addQuestion")), 1)
                    ])
                  ])
                ])) : (openBlock(), createElementBlock("div", _hoisted_139, [
                  createBaseVNode("div", null, [
                    createBaseVNode("label", _hoisted_140, toDisplayString(unref(t)("grammar.practice.questionManager.question")), 1),
                    withDirectives(createBaseVNode("textarea", {
                      "onUpdate:modelValue": _cache[21] || (_cache[21] = ($event) => newQuestion.value.question = $event),
                      rows: "3",
                      class: "w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-[#0a0a0a] text-gray-900 dark:text-white focus:ring-2 focus:ring-blue-500 focus:border-transparent",
                      placeholder: unref(t)("grammar.practice.questionManager.questionPlaceholder")
                    }, null, 8, _hoisted_141), [
                      [vModelText, newQuestion.value.question]
                    ])
                  ]),
                  createBaseVNode("div", null, [
                    createBaseVNode("label", _hoisted_142, toDisplayString(unref(t)("grammar.practice.questionManager.explanation")), 1),
                    withDirectives(createBaseVNode("textarea", {
                      "onUpdate:modelValue": _cache[22] || (_cache[22] = ($event) => newQuestion.value.explanation = $event),
                      rows: "2",
                      class: "w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-[#0a0a0a] text-gray-900 dark:text-white focus:ring-2 focus:ring-blue-500 focus:border-transparent",
                      placeholder: unref(t)("grammar.practice.questionManager.explanationPlaceholder")
                    }, null, 8, _hoisted_143), [
                      [vModelText, newQuestion.value.explanation]
                    ])
                  ])
                ])),
                createBaseVNode("div", _hoisted_144, [
                  createBaseVNode("button", {
                    onClick: addQuestion,
                    class: "px-4 py-2 text-sm font-medium text-white bg-blue-600 rounded-lg hover:bg-blue-700 transition-colors"
                  }, toDisplayString(editingQuestionIndex.value >= 0 ? unref(t)("common.update") : unref(t)("grammar.practice.questionManager.addQuestion")), 1)
                ])
              ]),
              exerciseQuestions.value[selectedExerciseTypeForQuestions.value]?.length > 0 ? (openBlock(), createElementBlock("div", _hoisted_145, [
                createBaseVNode("h4", _hoisted_146, toDisplayString(unref(t)("grammar.practice.questionManager.existingQuestions")) + " (" + toDisplayString(exerciseQuestions.value[selectedExerciseTypeForQuestions.value].length) + ") ", 1),
                createBaseVNode("div", _hoisted_147, [
                  (openBlock(true), createElementBlock(Fragment, null, renderList(exerciseQuestions.value[selectedExerciseTypeForQuestions.value], (question, index) => {
                    return openBlock(), createElementBlock("div", {
                      key: question.id,
                      class: "bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-lg p-4"
                    }, [
                      createBaseVNode("div", _hoisted_148, [
                        createBaseVNode("div", _hoisted_149, [
                          createBaseVNode("div", _hoisted_150, [
                            createBaseVNode("span", _hoisted_151, " #" + toDisplayString(index + 1), 1),
                            selectedExerciseTypeForQuestions.value === "writing" ? (openBlock(), createElementBlock("span", _hoisted_152, toDisplayString(unref(t)(`grammar.practice.exercises.writing.${question.taskType}`)), 1)) : createCommentVNode("", true)
                          ]),
                          createBaseVNode("div", _hoisted_153, [
                            createBaseVNode("strong", null, toDisplayString(selectedExerciseTypeForQuestions.value === "writing" ? unref(t)("grammar.practice.questionManager.prompt") : unref(t)("grammar.practice.questionManager.question")) + ":", 1),
                            createBaseVNode("p", _hoisted_154, toDisplayString(selectedExerciseTypeForQuestions.value === "writing" ? question.prompt : question.question), 1)
                          ]),
                          selectedExerciseTypeForQuestions.value === "writing" && question.requirements?.length > 0 ? (openBlock(), createElementBlock("div", _hoisted_155, [
                            createBaseVNode("strong", null, toDisplayString(unref(t)("grammar.practice.questionManager.requirements")) + ":", 1),
                            createBaseVNode("ul", _hoisted_156, [
                              (openBlock(true), createElementBlock(Fragment, null, renderList(question.requirements, (req) => {
                                return openBlock(), createElementBlock("li", { key: req }, toDisplayString(req), 1);
                              }), 128))
                            ])
                          ])) : createCommentVNode("", true),
                          selectedExerciseTypeForQuestions.value === "multiple-choice" && question.options ? (openBlock(), createElementBlock("div", _hoisted_157, [
                            createBaseVNode("strong", null, toDisplayString(unref(t)("grammar.practice.questionManager.correctAnswer")) + ":", 1),
                            createTextVNode(" " + toDisplayString(question.correctAnswer), 1)
                          ])) : createCommentVNode("", true)
                        ]),
                        createBaseVNode("div", _hoisted_158, [
                          createBaseVNode("button", {
                            onClick: ($event) => editQuestion(index),
                            class: "p-1 rounded text-blue-600 dark:text-blue-400 hover:bg-blue-100 dark:hover:bg-blue-900/30 transition-colors",
                            title: unref(t)("common.edit")
                          }, _cache[37] || (_cache[37] = [
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
                                d: "M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z"
                              })
                            ], -1)
                          ]), 8, _hoisted_159),
                          createBaseVNode("button", {
                            onClick: ($event) => deleteQuestion(index),
                            class: "p-1 rounded text-red-600 dark:text-red-400 hover:bg-red-100 dark:hover:bg-red-900/30 transition-colors",
                            title: unref(t)("common.delete")
                          }, _cache[38] || (_cache[38] = [
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
                          ]), 8, _hoisted_160)
                        ])
                      ])
                    ]);
                  }), 128))
                ])
              ])) : (openBlock(), createElementBlock("div", _hoisted_161, [
                createBaseVNode("div", _hoisted_162, [
                  _cache[39] || (_cache[39] = createBaseVNode("svg", {
                    class: "w-12 h-12 mx-auto mb-4",
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
                  createBaseVNode("p", null, toDisplayString(unref(t)("grammar.practice.questionManager.noQuestions")), 1),
                  createBaseVNode("p", _hoisted_163, toDisplayString(unref(t)("grammar.practice.questionManager.addFirstQuestion")), 1)
                ])
              ]))
            ]),
            createBaseVNode("div", _hoisted_164, [
              createBaseVNode("button", {
                onClick: closeQuestionManager,
                class: "px-4 py-2 text-sm font-medium text-gray-700 dark:text-gray-300 bg-gray-100 dark:bg-[#0a0a0a] rounded-lg hover:bg-gray-200 dark:hover:bg-gray-600 transition-colors"
              }, toDisplayString(unref(t)("common.close")), 1)
            ])
          ])
        ])) : createCommentVNode("", true)
      ]);
    };
  }
});
const LazyLoadComponent = defineAsyncComponent(() => __vitePreload(() => import("./LazyLoadComponent-C_G5IP7H.js"), true ? __vite__mapDeps([7,1,2,3,8]) : void 0));
const VoiceSelector = defineAsyncComponent(() => __vitePreload(() => import("./VoiceSelector-BXW_Bt2k.js"), true ? __vite__mapDeps([26,1,2,3]) : void 0));
const FlashcardHeader = defineAsyncComponent(() => __vitePreload(() => import("./FlashcardHeader-C7KBYCuA.js"), true ? __vite__mapDeps([42,1]) : void 0));
const FlashcardProgress = defineAsyncComponent(() => __vitePreload(() => import("./FlashcardProgress-DENgkUAi.js"), true ? __vite__mapDeps([43,1]) : void 0));
const FlashcardDateFilter = defineAsyncComponent(() => __vitePreload(() => import("./FlashcardDateFilter-CsYlWK85.js"), true ? __vite__mapDeps([44,1,2,3]) : void 0));
const FlashcardCard = defineAsyncComponent(() => __vitePreload(() => import("./FlashcardCard-qrUezX-s.js"), true ? __vite__mapDeps([45,1,2,3,46]) : void 0));
const FlashcardQuiz = defineAsyncComponent(() => __vitePreload(() => import("./FlashcardQuiz-BZoUfkBD.js"), true ? __vite__mapDeps([47,1,2,3]) : void 0));
const FlashcardTyping = defineAsyncComponent(() => __vitePreload(() => import("./FlashcardTyping-BEZNRDAw.js"), true ? __vite__mapDeps([48,1,2,3]) : void 0));
const FlashcardImage = defineAsyncComponent(() => __vitePreload(() => import("./FlashcardImage-Dpy1F9ks.js"), true ? __vite__mapDeps([49,1,2,3]) : void 0));
const FlashcardControls = defineAsyncComponent(() => __vitePreload(() => import("./FlashcardControls-D4ub00a_.js"), true ? __vite__mapDeps([50,1]) : void 0));
const PracticeTimer = defineAsyncComponent(() => __vitePreload(() => import("./PracticeTimer-DdQKBZql.js"), true ? __vite__mapDeps([51,1,2,3,52]) : void 0));
const ExitWarningModal = defineAsyncComponent(() => __vitePreload(() => import("./ExitWarningModal-Ce1mPY_e.js"), true ? __vite__mapDeps([53,1]) : void 0));
const CompletionModal = defineAsyncComponent(() => __vitePreload(() => import("./CompletionModal-BgOmYYU1.js"), true ? __vite__mapDeps([54,1,2,3,55]) : void 0));
const HistoryModal = defineAsyncComponent(() => __vitePreload(() => import("./HistoryModal-Bl4_DIN7.js"), true ? __vite__mapDeps([56,1]) : void 0));
const SessionDetailModal = defineAsyncComponent(() => __vitePreload(() => import("./SessionDetailModal-C-FwU_wy.js"), true ? __vite__mapDeps([57,1,2,3]) : void 0));
const SettingsModal = defineAsyncComponent(() => __vitePreload(() => import("./SettingsModal-BlC_fqJx.js"), true ? __vite__mapDeps([58,1,2,3]) : void 0));
const PronunciationMode = defineAsyncComponent(() => __vitePreload(() => import("./PronunciationMode-y3SAxA6E.js"), true ? __vite__mapDeps([59,1,2,3]) : void 0));
const ListeningMode = defineAsyncComponent(() => __vitePreload(() => import("./ListeningMode-DrDFbumt.js"), true ? __vite__mapDeps([60,1,2,3,61]) : void 0));
const PracticeStats = defineAsyncComponent(() => __vitePreload(() => import("./PracticeStats-sod-YaTN.js"), true ? __vite__mapDeps([62,1]) : void 0));
const FlashcardEmptyState = defineAsyncComponent(() => __vitePreload(() => import("./FlashcardEmptyState-DEBSzveU.js"), true ? __vite__mapDeps([63,1]) : void 0));
const PictionaryMode = defineAsyncComponent(() => __vitePreload(() => import("./PictionaryMode-fIGKSRm0.js"), true ? __vite__mapDeps([64,1,2,3,65]) : void 0));
const BubbleShooterMode = defineAsyncComponent(() => __vitePreload(() => import("./BubbleShooterMode-hBkWH8XW.js"), true ? __vite__mapDeps([66,1,2,3,67]) : void 0));
const SnakeGameMode = defineAsyncComponent(() => __vitePreload(() => import("./SnakeGameMode-dUbdS0HZ.js"), true ? __vite__mapDeps([68,1,2,3,69]) : void 0));
const AsyncComponents = {
  LazyLoadComponent,
  VoiceSelector,
  FlashcardHeader,
  FlashcardProgress,
  FlashcardDateFilter,
  FlashcardCard,
  FlashcardQuiz,
  FlashcardTyping,
  FlashcardImage,
  FlashcardControls,
  PracticeTimer,
  ExitWarningModal,
  CompletionModal,
  HistoryModal,
  SessionDetailModal,
  SettingsModal,
  PronunciationMode,
  ListeningMode,
  PracticeStats,
  FlashcardEmptyState,
  PictionaryMode,
  BubbleShooterMode,
  SnakeGameMode
};
function useFlashcardGame(flashcards) {
  const router2 = useRouter();
  const PRACTICE_MODE_STORAGE_KEY = "flashcard-practice-mode";
  const loadPracticeModeFromStorage = () => {
    try {
      const saved = localStorage.getItem(PRACTICE_MODE_STORAGE_KEY);
      if (saved && ["flashcard", "quiz", "typing", "image", "listening", "pronunciation", "pictionary", "bubble-shooter", "snake-game"].includes(saved)) {
        return saved;
      }
    } catch (error) {
      console.error("Error loading practice mode from localStorage:", error);
    }
    return "flashcard";
  };
  const savePracticeModeToStorage = (mode) => {
    try {
      localStorage.setItem(PRACTICE_MODE_STORAGE_KEY, mode);
    } catch (error) {
      console.error("Error saving practice mode to localStorage:", error);
    }
  };
  const currentIndex = ref(0);
  const isFlipped = ref(false);
  const practiceMode = ref(loadPracticeModeFromStorage());
  const showSettings = ref(false);
  const showCompletionModal = ref(false);
  const isCompleted = ref(false);
  const settings = ref({
    cardCount: 20,
    difficulty: "all",
    autoFlip: false,
    flipDelay: 3,
    showDefinition: true,
    showExample: true,
    showPronunciation: true,
    shuffleCards: false,
    voiceType: "female",
    practiceMode: loadPracticeModeFromStorage()
  });
  const stats = ref({
    easy: 0,
    difficult: 0,
    reviewed: 0,
    correct: 0,
    incorrect: 0,
    total: 0,
    startTime: /* @__PURE__ */ new Date(),
    endTime: null,
    mode: "flashcard"
  });
  stats.value.mode = practiceMode.value;
  watch(practiceMode, (mode) => {
    stats.value.mode = mode;
  });
  const currentCard = computed(() => {
    if (flashcards.value.length === 0) return null;
    return flashcards.value[currentIndex.value];
  });
  const nextCard = () => {
    if (currentIndex.value < flashcards.value.length - 1) {
      currentIndex.value++;
      resetCurrentCard();
    } else {
      completeSession();
    }
  };
  const previousCard = () => {
    if (currentIndex.value > 0) {
      currentIndex.value--;
      resetCurrentCard();
    }
  };
  const flipCard = () => {
    isFlipped.value = !isFlipped.value;
  };
  const resetCurrentCard = () => {
    isFlipped.value = false;
  };
  const completeSession = () => {
    isCompleted.value = true;
    stats.value.endTime = /* @__PURE__ */ new Date();
    showCompletionModal.value = true;
  };
  const restartSession = () => {
    currentIndex.value = 0;
    isCompleted.value = false;
    showCompletionModal.value = false;
    stats.value = {
      easy: 0,
      difficult: 0,
      reviewed: 0,
      correct: 0,
      incorrect: 0,
      total: 0,
      startTime: /* @__PURE__ */ new Date(),
      endTime: null,
      mode: practiceMode.value
    };
    resetCurrentCard();
  };
  const changePracticeMode = (mode) => {
    practiceMode.value = mode;
    settings.value.practiceMode = mode;
    savePracticeModeToStorage(mode);
    resetCurrentCard();
  };
  const applySettings = () => {
    showSettings.value = false;
  };
  const goBack = () => {
    router2.push("/");
  };
  const goToVocabulary = () => {
    router2.push("/practice/flashcard");
  };
  const markEasy = () => {
    nextCard();
  };
  const markDifficult = () => {
    nextCard();
  };
  let autoFlipTimer = null;
  watch([currentIndex, isFlipped], () => {
    if (autoFlipTimer) {
      clearTimeout(autoFlipTimer);
    }
    if (settings.value.autoFlip && !isFlipped.value) {
      autoFlipTimer = window.setTimeout(() => {
        if (!isFlipped.value) {
          flipCard();
        }
      }, settings.value.flipDelay * 1e3);
    }
  });
  const cleanup = () => {
    if (autoFlipTimer) {
      clearTimeout(autoFlipTimer);
    }
  };
  return {
    // State
    currentIndex,
    isFlipped,
    practiceMode,
    showSettings,
    showCompletionModal,
    isCompleted,
    settings,
    stats,
    // Computed
    flashcards,
    currentCard,
    // Methods
    nextCard,
    previousCard,
    flipCard,
    resetCurrentCard,
    completeSession,
    restartSession,
    changePracticeMode,
    applySettings,
    goBack,
    goToVocabulary,
    markEasy,
    markDifficult,
    cleanup
  };
}
function useFlashcardModes(currentCard, flashcards, allVocabularies, onCorrectAnswer, onIncorrectAnswer) {
  const { playAudio: playVoiceAudio } = useVoiceStore();
  const quizOptions = ref([]);
  const selectedAnswer = ref("");
  const quizAnswered = ref(false);
  const typingAnswer = ref("");
  const typingAnswered = ref(false);
  const typingCorrect = ref(false);
  const typingQuizEnabled = ref(false);
  const typingQuizOptions = ref([]);
  const typingQuizSelected = ref("");
  const typingQuizAnswered = ref(false);
  const listeningAnswer = ref("");
  const listeningAnswered = ref(false);
  const listeningCorrect = ref(false);
  const listeningQuizEnabled = ref(false);
  const listeningQuizOptions = ref([]);
  const listeningQuizSelected = ref("");
  const listeningQuizAnswered = ref(false);
  const imageAnswer = ref("");
  const imageAnswered = ref(false);
  const imageCorrect = ref(false);
  const imageQuizEnabled = ref(false);
  const imageQuizOptions = ref([]);
  const imageQuizSelected = ref("");
  const imageQuizAnswered = ref(false);
  const pictionaryAnswer = ref("");
  const pictionaryAnswered = ref(false);
  const pictionaryCorrect = ref(false);
  const bubbleShooterVietnameseMode = ref(false);
  const STORAGE_KEYS = {
    image: "pe_imageQuizEnabled",
    listening: "pe_listeningQuizEnabled",
    typing: "pe_typingQuizEnabled",
    bubbleShooterVietnamese: "pe_bubbleShooterVietnameseMode",
    imagePos: "pe_imageQuiz_correct_pos",
    listeningPos: "pe_listeningQuiz_correct_pos",
    typingPos: "pe_typingQuiz_correct_pos"
  };
  const readBool = (key, def = false) => {
    try {
      const v = localStorage.getItem(key);
      return v === null ? def : v === "true";
    } catch {
      return def;
    }
  };
  imageQuizEnabled.value = readBool(STORAGE_KEYS.image, false);
  listeningQuizEnabled.value = readBool(STORAGE_KEYS.listening, false);
  typingQuizEnabled.value = readBool(STORAGE_KEYS.typing, false);
  bubbleShooterVietnameseMode.value = readBool(STORAGE_KEYS.bubbleShooterVietnamese, false);
  const writeBool = (key, val) => {
    try {
      localStorage.setItem(key, String(val));
    } catch {
    }
  };
  const readNumber = (key, def = 0) => {
    try {
      const v = localStorage.getItem(key);
      const n = v === null ? def : Number(v);
      return Number.isFinite(n) && n >= 0 ? n : def;
    } catch {
      return def;
    }
  };
  const writeNumber = (key, val) => {
    try {
      localStorage.setItem(key, String(val));
    } catch {
    }
  };
  watch(imageQuizEnabled, (v) => writeBool(STORAGE_KEYS.image, v));
  watch(listeningQuizEnabled, (v) => writeBool(STORAGE_KEYS.listening, v));
  watch(typingQuizEnabled, (v) => writeBool(STORAGE_KEYS.typing, v));
  watch(bubbleShooterVietnameseMode, (v) => writeBool(STORAGE_KEYS.bubbleShooterVietnamese, v));
  const imageCorrectPos = ref(readNumber(STORAGE_KEYS.imagePos, Math.floor(Math.random() * 4)));
  const listeningCorrectPos = ref(readNumber(STORAGE_KEYS.listeningPos, Math.floor(Math.random() * 4)));
  const typingCorrectPos = ref(readNumber(STORAGE_KEYS.typingPos, Math.floor(Math.random() * 4)));
  watch(imageCorrectPos, (n) => writeNumber(STORAGE_KEYS.imagePos, n));
  watch(listeningCorrectPos, (n) => writeNumber(STORAGE_KEYS.listeningPos, n));
  watch(typingCorrectPos, (n) => writeNumber(STORAGE_KEYS.typingPos, n));
  const placeWithRotation = (correct, wrongs, posRef) => {
    const options2 = new Array(4);
    const idx = posRef.value % 4;
    options2[idx] = correct;
    const shuffledWrongs = [...wrongs].sort(() => Math.random() - 0.5);
    let wi = 0;
    for (let i = 0; i < 4; i++) {
      if (i === idx) continue;
      options2[i] = shuffledWrongs[wi++] ?? "";
    }
    posRef.value = (posRef.value + 1) % 4;
    return options2;
  };
  const isRecording = ref(false);
  const pronunciationResult = ref("");
  const pronunciationAnswered = ref(false);
  const pronunciationCorrect = ref(false);
  let recognition = null;
  const SpeechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition;
  const isSpeechRecognitionSupported = !!SpeechRecognition;
  if (isSpeechRecognitionSupported) {
    recognition = new SpeechRecognition();
    recognition.continuous = false;
    recognition.lang = "en-US";
    recognition.interimResults = false;
    recognition.maxAlternatives = 1;
    recognition.onresult = (event) => {
      const transcript = event.results[0][0].transcript;
      pronunciationResult.value = transcript;
      checkPronunciationAnswer(transcript);
    };
    recognition.onerror = (event) => {
      console.error("Speech recognition error", event.error);
      isRecording.value = false;
    };
    recognition.onend = () => {
      isRecording.value = false;
    };
  }
  const startRecording = () => {
    if (isRecording.value || !isSpeechRecognitionSupported) return;
    pronunciationResult.value = "";
    pronunciationAnswered.value = false;
    pronunciationCorrect.value = false;
    isRecording.value = true;
    recognition.start();
  };
  const checkPronunciationAnswer = (transcript) => {
    if (!currentCard.value) return false;
    pronunciationAnswered.value = true;
    const userAnswer = transcript.toLowerCase().trim().replace(/[.,/#!$%^&*;:{}=\-_`~()]/g, "");
    const correctAnswer = currentCard.value.word.toLowerCase().trim().replace(/[.,/#!$%^&*;:{}=\-_`~()]/g, "");
    pronunciationCorrect.value = userAnswer === correctAnswer;
    if (pronunciationCorrect.value) ;
    return pronunciationCorrect.value;
  };
  const generateQuizOptions = () => {
    if (!currentCard.value) return;
    const correctAnswer = getShortMeaning(currentCard.value.meaning);
    const allOptions = allVocabularies.value.filter((card) => card.id !== currentCard.value?.id).map((card) => getShortMeaning(card.meaning)).filter((meaning) => meaning !== correctAnswer).sort(() => Math.random() - 0.5).slice(0, 3);
    const wrongOptions = allOptions.length >= 3 ? allOptions.slice(0, 3) : allOptions;
    quizOptions.value = [correctAnswer, ...wrongOptions].sort(() => Math.random() - 0.5);
  };
  const selectQuizAnswer = (answer) => {
    if (quizAnswered.value) return;
    selectedAnswer.value = answer;
    quizAnswered.value = true;
    const correctAnswer = currentCard.value ? getShortMeaning(currentCard.value.meaning) : "";
    const isCorrect = answer === correctAnswer;
    return isCorrect;
  };
  const generateImageQuizOptions = () => {
    if (!currentCard.value) return;
    const correctWord = currentCard.value.word.trim();
    const allWrong = allVocabularies.value.filter((card) => card.id !== currentCard.value?.id).map((card) => card.word.trim()).filter((word) => word.toLowerCase() !== correctWord.toLowerCase()).sort(() => Math.random() - 0.5).slice(0, 3);
    const wrongOptions = allWrong.length >= 3 ? allWrong.slice(0, 3) : allWrong;
    const paddedWrongs = [...new Set(wrongOptions)];
    while (paddedWrongs.length < 3) paddedWrongs.push("");
    imageQuizOptions.value = placeWithRotation(correctWord, paddedWrongs, imageCorrectPos);
  };
  const selectImageQuizAnswer = (answer) => {
    if (imageQuizAnswered.value) return;
    imageQuizSelected.value = answer;
    imageQuizAnswered.value = true;
    const correctWord = currentCard.value ? currentCard.value.word.trim().toLowerCase() : "";
    const isCorrect = answer.trim().toLowerCase() === correctWord;
    imageAnswered.value = true;
    imageCorrect.value = isCorrect;
    return isCorrect;
  };
  const checkTypingAnswer = () => {
    if (!currentCard.value || typingAnswered.value) return;
    typingAnswered.value = true;
    const userAnswer = typingAnswer.value.toLowerCase().trim();
    const correctAnswer = currentCard.value.word.toLowerCase().trim();
    typingCorrect.value = userAnswer === correctAnswer;
    if (typingCorrect.value) ;
    return typingCorrect.value;
  };
  const generateTypingQuizOptions = () => {
    if (!currentCard.value) return;
    const correctWord = currentCard.value.word.trim();
    const allWrong = allVocabularies.value.filter((card) => card.id !== currentCard.value?.id).map((card) => card.word.trim()).filter((word) => word.toLowerCase() !== correctWord.toLowerCase()).sort(() => Math.random() - 0.5).slice(0, 3);
    const wrongOptions = allWrong.length >= 3 ? allWrong.slice(0, 3) : allWrong;
    const paddedWrongs = [...new Set(wrongOptions)];
    while (paddedWrongs.length < 3) paddedWrongs.push("");
    typingQuizOptions.value = placeWithRotation(correctWord, paddedWrongs, typingCorrectPos);
  };
  const selectTypingQuizAnswer = (answer) => {
    if (typingQuizAnswered.value) return;
    typingQuizSelected.value = answer;
    typingQuizAnswered.value = true;
    const correctWord = currentCard.value ? currentCard.value.word.trim().toLowerCase() : "";
    const isCorrect = answer.trim().toLowerCase() === correctWord;
    typingAnswered.value = true;
    typingCorrect.value = isCorrect;
    return isCorrect;
  };
  const checkListeningAnswer = () => {
    if (!currentCard.value || listeningAnswered.value) return;
    listeningAnswered.value = true;
    const userAnswer = listeningAnswer.value.toLowerCase().trim();
    const correctAnswer = currentCard.value.word.toLowerCase().trim();
    listeningCorrect.value = userAnswer === correctAnswer;
    if (listeningCorrect.value) ;
    return listeningCorrect.value;
  };
  const generateListeningQuizOptions = () => {
    if (!currentCard.value) return;
    const correctWord = currentCard.value.word.trim();
    const allWrong = allVocabularies.value.filter((card) => card.id !== currentCard.value?.id).map((card) => card.word.trim()).filter((word) => word.toLowerCase() !== correctWord.toLowerCase()).sort(() => Math.random() - 0.5).slice(0, 3);
    const wrongOptions = allWrong.length >= 3 ? allWrong.slice(0, 3) : allWrong;
    const paddedWrongs = [...new Set(wrongOptions)];
    while (paddedWrongs.length < 3) paddedWrongs.push("");
    listeningQuizOptions.value = placeWithRotation(correctWord, paddedWrongs, listeningCorrectPos);
  };
  const selectListeningQuizAnswer = (answer) => {
    if (listeningQuizAnswered.value) return;
    listeningQuizSelected.value = answer;
    listeningQuizAnswered.value = true;
    const correctWord = currentCard.value ? currentCard.value.word.trim().toLowerCase() : "";
    const isCorrect = answer.trim().toLowerCase() === correctWord;
    listeningAnswered.value = true;
    listeningCorrect.value = isCorrect;
    return isCorrect;
  };
  const checkImageAnswer = () => {
    if (!currentCard.value || imageAnswered.value) return;
    imageAnswered.value = true;
    const userAnswer = imageAnswer.value.toLowerCase().trim();
    const correctAnswer = currentCard.value.word.toLowerCase().trim();
    imageCorrect.value = userAnswer === correctAnswer;
    if (imageCorrect.value) ;
    return imageCorrect.value;
  };
  const checkPictionaryAnswer = () => {
    if (!currentCard.value || pictionaryAnswered.value) return;
    pictionaryAnswered.value = true;
    const userAnswer = pictionaryAnswer.value.toLowerCase().trim();
    const correctAnswer = currentCard.value.word.toLowerCase().trim();
    pictionaryCorrect.value = userAnswer === correctAnswer;
    if (pictionaryCorrect.value) ;
    return pictionaryCorrect.value;
  };
  const playAudio2 = async () => {
    if (!currentCard.value) return;
    try {
      await playVoiceAudio(currentCard.value.word);
    } catch (error) {
      console.error("Error playing audio:", error);
      const utterance = new SpeechSynthesisUtterance(currentCard.value.word);
      utterance.lang = "en-US";
      utterance.rate = 0.8;
      speechSynthesis.speak(utterance);
    }
  };
  const resetQuizMode = () => {
    quizOptions.value = [];
    selectedAnswer.value = "";
    quizAnswered.value = false;
  };
  const resetTypingMode = () => {
    typingAnswer.value = "";
    typingAnswered.value = false;
    typingCorrect.value = false;
    typingQuizOptions.value = [];
    typingQuizSelected.value = "";
    typingQuizAnswered.value = false;
  };
  const resetListeningMode = () => {
    listeningAnswer.value = "";
    listeningAnswered.value = false;
    listeningCorrect.value = false;
    listeningQuizOptions.value = [];
    listeningQuizSelected.value = "";
    listeningQuizAnswered.value = false;
  };
  const resetImageMode = () => {
    imageAnswer.value = "";
    imageAnswered.value = false;
    imageCorrect.value = false;
    imageQuizOptions.value = [];
    imageQuizSelected.value = "";
    imageQuizAnswered.value = false;
  };
  const resetPictionaryMode = () => {
    pictionaryAnswer.value = "";
    pictionaryAnswered.value = false;
    pictionaryCorrect.value = false;
  };
  const resetPronunciationMode = () => {
    if (recognition && isRecording.value) {
      recognition.stop();
    }
    isRecording.value = false;
    pronunciationResult.value = "";
    pronunciationAnswered.value = false;
    pronunciationCorrect.value = false;
  };
  const resetAllModes = () => {
    resetQuizMode();
    resetTypingMode();
    resetListeningMode();
    resetImageMode();
    resetPronunciationMode();
    resetPictionaryMode();
  };
  const getCanProceed = () => {
    return {
      flashcard: true,
      quiz: quizAnswered.value,
      typing: typingAnswered.value,
      listening: listeningAnswered.value,
      image: imageAnswered.value,
      pronunciation: pronunciationAnswered.value,
      pictionary: pictionaryAnswered.value,
      "snake-game": true,
      "bubble-shooter": true
    };
  };
  const getShortMeaning = (meaning) => {
    return meaning.split(" - ")[0].trim();
  };
  return {
    // Quiz mode
    quizOptions,
    selectedAnswer,
    quizAnswered,
    generateQuizOptions,
    selectQuizAnswer,
    resetQuizMode,
    // Typing mode
    typingAnswer,
    typingAnswered,
    typingCorrect,
    checkTypingAnswer,
    resetTypingMode,
    // Typing-Quiz (within Typing mode)
    typingQuizEnabled,
    typingQuizOptions,
    typingQuizSelected,
    typingQuizAnswered,
    generateTypingQuizOptions,
    selectTypingQuizAnswer,
    // Listening mode
    listeningAnswer,
    listeningAnswered,
    listeningCorrect,
    checkListeningAnswer,
    playAudio: playAudio2,
    resetListeningMode,
    // Listening-Quiz (within Listening mode)
    listeningQuizEnabled,
    listeningQuizOptions,
    listeningQuizSelected,
    listeningQuizAnswered,
    generateListeningQuizOptions,
    selectListeningQuizAnswer,
    // Image mode
    imageAnswer,
    imageAnswered,
    imageCorrect,
    checkImageAnswer,
    resetImageMode,
    // Image-Quiz (within Image mode)
    imageQuizEnabled,
    imageQuizOptions,
    imageQuizSelected,
    imageQuizAnswered,
    generateImageQuizOptions,
    selectImageQuizAnswer,
    // Pictionary mode
    pictionaryAnswer,
    pictionaryAnswered,
    pictionaryCorrect,
    checkPictionaryAnswer,
    resetPictionaryMode,
    // Bubble Shooter mode
    bubbleShooterVietnameseMode,
    // Pronunciation mode
    isRecording,
    pronunciationResult,
    pronunciationAnswered,
    pronunciationCorrect,
    isSpeechRecognitionSupported,
    startRecording,
    resetPronunciationMode,
    // General
    resetAllModes,
    getCanProceed,
    getShortMeaning
  };
}
function useFlashcardHistory() {
  const showHistory = ref(false);
  const practiceHistory = ref([]);
  const { t, locale } = useI18n();
  const loadPracticeHistory = () => {
    const saved = localStorage.getItem("flashcard-practice-history");
    if (saved) {
      const parsed = JSON.parse(saved);
      practiceHistory.value = parsed.map((item) => {
        if (item.hasDetails === void 0) {
          const has = !!localStorage.getItem(`flashcard-session-details:${item.id}`);
          return { ...item, hasDetails: has };
        }
        return item;
      });
      savePracticeHistory();
    }
  };
  const savePracticeHistory = () => {
    localStorage.setItem("flashcard-practice-history", JSON.stringify(practiceHistory.value));
  };
  const saveSessionToHistory = (stats, totalCards, sessionId) => {
    const duration = stats.endTime && stats.startTime ? Math.round((stats.endTime.getTime() - stats.startTime.getTime()) / 1e3) : 0;
    const total = stats.correct + stats.incorrect;
    const accuracy = total > 0 ? Math.round(stats.correct / total * 100) : 0;
    const score = Math.round(accuracy * (totalCards / 100));
    const id = sessionId || Date.now().toString();
    const historyItem = {
      id,
      date: (/* @__PURE__ */ new Date()).toISOString(),
      mode: stats.mode,
      totalCards,
      correctAnswers: stats.correct,
      incorrectAnswers: stats.incorrect,
      accuracy,
      duration,
      score,
      categories: stats.categories || [],
      hasDetails: true
    };
    practiceHistory.value.unshift(historyItem);
    if (practiceHistory.value.length > 50) {
      practiceHistory.value = practiceHistory.value.slice(0, 50);
    }
    savePracticeHistory();
    return id;
  };
  const getModeColor = (mode) => {
    switch (mode) {
      case "flashcard":
        return "bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-200";
      case "quiz":
        return "bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-200";
      case "typing":
        return "bg-purple-100 text-purple-800 dark:bg-purple-900 dark:text-purple-200";
      case "listening":
        return "bg-orange-100 text-orange-800 dark:bg-orange-900 dark:text-orange-200";
      case "image":
        return "bg-pink-100 text-pink-800 dark:bg-pink-900 dark:text-pink-200";
      case "pictionary":
        return "bg-yellow-100 text-yellow-800 dark:bg-yellow-900 dark:text-yellow-200";
      case "pronunciation":
        return "bg-indigo-100 text-indigo-800 dark:bg-indigo-900 dark:text-indigo-200";
      case "bubble-shooter":
        return "bg-teal-100 text-teal-800 dark:bg-teal-900 dark:text-teal-200";
      case "snake-game":
        return "bg-red-100 text-red-800 dark:bg-red-900 dark:text-red-200";
      default:
        return "bg-cyan-100 text-cyan-800 dark:bg-cyan-900 dark:text-cyan-200";
    }
  };
  const getModeText = (mode) => {
    switch (mode) {
      case "flashcard":
        return t("flashcard.modes.flashcard", "Flashcard");
      case "quiz":
        return t("flashcard.modes.quiz", "Quiz");
      case "typing":
        return t("flashcard.modes.typing", "Typing");
      case "listening":
        return t("flashcard.modes.listening", "Listening");
      case "image":
        return t("flashcard.modes.image", "Image");
      case "pictionary":
        return t("flashcard.modes.pictionary", "Pictionary");
      case "pronunciation":
        return t("flashcard.modes.pronunciation", "Pronunciation");
      case "bubble-shooter":
        return t("flashcard.modes.bubbleShooter", "Bubble Shooter");
      case "snake-game":
        return t("flashcard.modes.snakeGame", "Snake Hunt");
      default:
        return "Unknown";
    }
  };
  const formatDate2 = (dateString) => {
    const date = new Date(dateString);
    const now = /* @__PURE__ */ new Date();
    const diffTime = now.getTime() - date.getTime();
    const diffDays = Math.floor(diffTime / (1e3 * 60 * 60 * 24));
    const currentLocale = locale.value === "en" ? "en-US" : "vi-VN";
    if (diffDays === 0) {
      return locale.value === "en" ? "Today" : "Hôm nay";
    } else if (diffDays === 1) {
      return locale.value === "en" ? "Yesterday" : "Hôm qua";
    } else if (diffDays < 7) {
      return locale.value === "en" ? `${diffDays} days ago` : `${diffDays} ngày trước`;
    } else {
      return date.toLocaleDateString(currentLocale);
    }
  };
  const formatDuration = (seconds) => {
    const minutes = Math.floor(seconds / 60);
    const remainingSeconds = seconds % 60;
    return `${minutes}:${remainingSeconds.toString().padStart(2, "0")}`;
  };
  const clearHistory = () => {
    practiceHistory.value = [];
    savePracticeHistory();
  };
  const getHistoryStats = () => {
    if (practiceHistory.value.length === 0) {
      return {
        totalSessions: 0,
        averageAccuracy: 0,
        totalCards: 0,
        totalTime: 0,
        bestScore: 0,
        favoriteMode: ""
      };
    }
    const totalSessions = practiceHistory.value.length;
    const totalCards = practiceHistory.value.reduce((sum, item) => sum + item.totalCards, 0);
    const totalTime = practiceHistory.value.reduce((sum, item) => sum + item.duration, 0);
    const averageAccuracy = Math.round(
      practiceHistory.value.reduce((sum, item) => sum + item.accuracy, 0) / totalSessions
    );
    const bestScore = Math.max(...practiceHistory.value.map((item) => item.score));
    const modeCount = practiceHistory.value.reduce((acc, item) => {
      acc[item.mode] = (acc[item.mode] || 0) + 1;
      return acc;
    }, {});
    const favoriteMode = Object.entries(modeCount).sort(([, a], [, b]) => b - a)[0]?.[0] || "";
    return {
      totalSessions,
      averageAccuracy,
      totalCards,
      totalTime,
      bestScore,
      favoriteMode
    };
  };
  onMounted(() => {
    loadPracticeHistory();
  });
  return {
    showHistory,
    practiceHistory,
    saveSessionToHistory,
    getModeColor,
    getModeText,
    formatDate: formatDate2,
    formatDuration,
    clearHistory,
    getHistoryStats
  };
}
function useFlashcardSettings() {
  const showSettings = ref(false);
  const defaultSettings2 = {
    cardCount: 20,
    difficulty: "all",
    autoFlip: false,
    flipDelay: 3,
    showDefinition: true,
    showExample: true,
    showPronunciation: true,
    shuffleCards: false,
    voiceType: "female",
    practiceMode: "flashcard",
    category: "",
    level: ""
  };
  const settings = ref({ ...defaultSettings2 });
  const localSettings = ref({ ...defaultSettings2 });
  const loadSettings2 = () => {
    const saved = localStorage.getItem("flashcard-settings");
    if (saved) {
      try {
        const parsedSettings = JSON.parse(saved);
        settings.value = { ...defaultSettings2, ...parsedSettings };
        localSettings.value = { ...settings.value };
      } catch (error) {
        console.error("Error loading settings:", error);
        settings.value = { ...defaultSettings2 };
        localSettings.value = { ...defaultSettings2 };
      }
    }
  };
  const saveSettings2 = () => {
    localStorage.setItem("flashcard-settings", JSON.stringify(settings.value));
  };
  const applySettings = () => {
    settings.value = { ...localSettings.value };
    saveSettings2();
    showSettings.value = false;
  };
  const resetSettings = () => {
    settings.value = { ...defaultSettings2 };
    localSettings.value = { ...defaultSettings2 };
    saveSettings2();
  };
  const cancelSettings = () => {
    localSettings.value = { ...settings.value };
    showSettings.value = false;
  };
  const openSettings = () => {
    localSettings.value = { ...settings.value };
    showSettings.value = true;
  };
  const validateSettings = (settingsToValidate) => {
    const errors = [];
    if (settingsToValidate.cardCount < 1 || settingsToValidate.cardCount > 100) {
      errors.push("Số lượng thẻ phải từ 1 đến 100");
    }
    if (settingsToValidate.flipDelay < 1 || settingsToValidate.flipDelay > 10) {
      errors.push("Thời gian lật thẻ phải từ 1 đến 10 giây");
    }
    return errors;
  };
  const getDifficultyLevels = () => {
    return [
      { value: "all", label: "Tất cả" },
      { value: "easy", label: "Dễ" },
      { value: "medium", label: "Trung bình" },
      { value: "hard", label: "Khó" }
    ];
  };
  const getFlipDelayOptions = () => {
    return [
      { value: 1, label: "1 giây" },
      { value: 2, label: "2 giây" },
      { value: 3, label: "3 giây" },
      { value: 4, label: "4 giây" },
      { value: 5, label: "5 giây" },
      { value: 10, label: "10 giây" }
    ];
  };
  const getCardCountOptions = () => {
    return [
      { value: 10, label: "10 thẻ" },
      { value: 20, label: "20 thẻ" },
      { value: 30, label: "30 thẻ" },
      { value: 50, label: "50 thẻ" },
      { value: 100, label: "100 thẻ" }
    ];
  };
  const getVoiceTypeOptions2 = () => {
    return [
      { value: "female", label: "Giọng nữ", icon: "👩" },
      { value: "male", label: "Giọng nam", icon: "👨" }
    ];
  };
  const getSettingsPresets = () => {
    return {
      beginner: {
        ...defaultSettings2,
        cardCount: 10,
        difficulty: "easy",
        autoFlip: true,
        flipDelay: 5,
        showDefinition: true,
        showExample: true,
        showPronunciation: true
      },
      intermediate: {
        ...defaultSettings2,
        cardCount: 20,
        difficulty: "medium",
        autoFlip: false,
        showDefinition: true,
        showExample: true,
        showPronunciation: false
      },
      advanced: {
        ...defaultSettings2,
        cardCount: 50,
        difficulty: "hard",
        autoFlip: false,
        showDefinition: false,
        showExample: false,
        showPronunciation: false
      }
    };
  };
  const applyPreset = (presetName) => {
    const presets = getSettingsPresets();
    localSettings.value = { ...presets[presetName] };
  };
  watch(settings, () => {
    saveSettings2();
  }, { deep: true });
  onMounted(() => {
    loadSettings2();
  });
  return {
    showSettings,
    settings,
    localSettings,
    applySettings,
    resetSettings,
    cancelSettings,
    openSettings,
    validateSettings,
    getDifficultyLevels,
    getFlipDelayOptions,
    getCardCountOptions,
    getVoiceTypeOptions: getVoiceTypeOptions2,
    getSettingsPresets,
    applyPreset
  };
}
function useFlashcardStats(stats) {
  const sessionStats = ref({
    totalCards: 0,
    currentCard: 0,
    correctAnswers: 0,
    incorrectAnswers: 0,
    accuracy: 0,
    streak: 0,
    maxStreak: 0,
    timeSpent: 0,
    averageTimePerCard: 0,
    score: 0
  });
  const currentStreak = ref(0);
  const maxStreak = ref(0);
  const cardStartTime = ref(null);
  const cardTimes = ref([]);
  const initializeStats = (totalCards) => {
    sessionStats.value = {
      totalCards,
      currentCard: 0,
      correctAnswers: 0,
      incorrectAnswers: 0,
      accuracy: 0,
      streak: 0,
      maxStreak: 0,
      timeSpent: 0,
      averageTimePerCard: 0,
      score: 0
    };
    currentStreak.value = 0;
    maxStreak.value = 0;
    cardTimes.value = [];
    cardStartTime.value = /* @__PURE__ */ new Date();
  };
  const recordAnswer = (isCorrect) => {
    if (isCorrect) {
      sessionStats.value.correctAnswers++;
      stats.value.correct++;
      currentStreak.value++;
      if (currentStreak.value > maxStreak.value) {
        maxStreak.value = currentStreak.value;
      }
    } else {
      sessionStats.value.incorrectAnswers++;
      stats.value.incorrect++;
      currentStreak.value = 0;
    }
    stats.value.total++;
    if (cardStartTime.value) {
      const timeSpent = (/* @__PURE__ */ new Date()).getTime() - cardStartTime.value.getTime();
      cardTimes.value.push(timeSpent);
      cardStartTime.value = /* @__PURE__ */ new Date();
    }
    nextCardStats();
  };
  const nextCardStats = () => {
    stats.value.reviewed++;
    sessionStats.value.currentCard++;
    cardStartTime.value = /* @__PURE__ */ new Date();
  };
  const getPerformanceLevel = computed(() => {
    const accuracy = sessionStats.value.accuracy;
    if (accuracy >= 90) return { level: "Xuất sắc", color: "text-green-600 dark:text-green-400" };
    if (accuracy >= 80) return { level: "Tốt", color: "text-blue-600 dark:text-blue-400" };
    if (accuracy >= 70) return { level: "Khá", color: "text-yellow-600 dark:text-yellow-400" };
    if (accuracy >= 60) return { level: "Trung bình", color: "text-orange-600 dark:text-orange-400" };
    return { level: "Cần cải thiện", color: "text-red-600 dark:text-red-400" };
  });
  const getStreakMessage = computed(() => {
    const streak = currentStreak.value;
    if (streak === 0) return "";
    if (streak < 3) return "Bắt đầu tốt!";
    if (streak < 5) return "Đang tiến bộ!";
    if (streak < 10) return "Tuyệt vời!";
    return "Xuất sắc!";
  });
  const getSpeedRating = computed(() => {
    const avgTime = sessionStats.value.averageTimePerCard / 1e3;
    if (avgTime === 0) return { rating: "", color: "" };
    if (avgTime < 2) return { rating: "Rất nhanh", color: "text-green-600 dark:text-green-400" };
    if (avgTime < 4) return { rating: "Nhanh", color: "text-blue-600 dark:text-blue-400" };
    if (avgTime < 6) return { rating: "Trung bình", color: "text-yellow-600 dark:text-yellow-400" };
    if (avgTime < 10) return { rating: "Chậm", color: "text-orange-600 dark:text-orange-400" };
    return { rating: "Rất chậm", color: "text-red-600 dark:text-red-400" };
  });
  const formatTime = (milliseconds) => {
    const seconds = Math.floor(milliseconds / 1e3);
    const minutes = Math.floor(seconds / 60);
    const remainingSeconds = seconds % 60;
    if (minutes > 0) {
      return `${minutes}:${remainingSeconds.toString().padStart(2, "0")}`;
    }
    return `${remainingSeconds}s`;
  };
  const getDetailedStats = computed(() => {
    return {
      ...sessionStats.value,
      performanceLevel: getPerformanceLevel.value,
      streakMessage: getStreakMessage.value,
      speedRating: getSpeedRating.value,
      timeSpentFormatted: formatTime(sessionStats.value.timeSpent),
      averageTimeFormatted: formatTime(sessionStats.value.averageTimePerCard),
      completion: sessionStats.value.totalCards > 0 ? Math.round(sessionStats.value.currentCard / sessionStats.value.totalCards * 100) : 0
    };
  });
  return {
    sessionStats,
    currentStreak,
    maxStreak,
    initializeStats,
    recordAnswer,
    nextCardStats,
    getPerformanceLevel,
    getStreakMessage,
    getSpeedRating,
    formatTime,
    getDetailedStats
  };
}
const makeKey = (sessionId) => `flashcard-session-details:${sessionId}`;
function usePracticeSessionDetails() {
  const currentSessionId = ref(null);
  const currentMode = ref("");
  const startSessionDetails = (sessionId, mode) => {
    currentSessionId.value = sessionId;
    currentMode.value = mode;
    const initial = {
      sessionId,
      mode,
      total: 0,
      correct: 0,
      incorrect: 0,
      entries: []
    };
    try {
      localStorage.setItem(makeKey(sessionId), JSON.stringify(initial));
    } catch {
    }
  };
  const appendAnswer = (payload) => {
    if (!currentSessionId.value) return;
    const key = makeKey(currentSessionId.value);
    let data = null;
    try {
      const raw = localStorage.getItem(key);
      data = raw ? JSON.parse(raw) : null;
    } catch {
    }
    if (!data) {
      data = {
        sessionId: currentSessionId.value,
        mode: currentMode.value,
        total: 0,
        correct: 0,
        incorrect: 0,
        entries: []
      };
    }
    const entry = {
      ...payload,
      timestamp: payload.timestamp || (/* @__PURE__ */ new Date()).toISOString()
    };
    data.entries.push(entry);
    data.total += 1;
    if (entry.isCorrect) data.correct += 1;
    else data.incorrect += 1;
    try {
      localStorage.setItem(key, JSON.stringify(data));
    } catch {
    }
  };
  const loadDetails = (sessionId) => {
    try {
      const raw = localStorage.getItem(makeKey(sessionId));
      return raw ? JSON.parse(raw) : null;
    } catch {
      return null;
    }
  };
  const clearDetails = (sessionId) => {
    try {
      localStorage.removeItem(makeKey(sessionId));
    } catch {
    }
  };
  return {
    currentSessionId,
    currentMode,
    startSessionDetails,
    appendAnswer,
    loadDetails,
    clearDetails
  };
}
const _hoisted_1$3 = { class: "min-h-screen overflow-x-hidden bg-gradient-to-br from-blue-50 to-indigo-100 dark:from-dark-bg-soft dark:to-dark-bg-mute relative" };
const _hoisted_2$3 = { class: "max-w-4xl mx-auto px-3 sm:px-4 md:px-6 py-2 sm:py-3 md:py-4" };
const _hoisted_3$2 = { class: "group bg-white/80 dark:bg-dark-bg-soft/80 backdrop-blur-md rounded-2xl shadow-xl hover:shadow-2xl border border-white/20 dark:border-dark-bg-mute transition-all duration-500 hover:scale-[1.01] hover:-translate-y-0.5 p-3 sm:p-4 md:p-5" };
const _hoisted_4$2 = { class: "max-w-4xl mx-auto px-3 sm:px-4 md:px-6 py-2 sm:py-3 md:py-4" };
const _hoisted_5$2 = { class: "group relative overflow-visible bg-white/80 dark:bg-dark-bg-soft/80 backdrop-blur-md rounded-2xl shadow-xl hover:shadow-2xl border border-white/20 dark:border-dark-bg-mute transition-all duration-500 hover:scale-[1.01] hover:-translate-y-0.5 p-3 sm:p-4 md:p-5" };
const _hoisted_6$2 = { class: "max-w-4xl mx-auto px-3 sm:px-4 md:px-6 py-4 sm:py-6 md:py-8" };
const _hoisted_7$1 = {
  key: 0,
  class: "relative"
};
const _hoisted_8 = { class: "group relative overflow-hidden bg-white/80 dark:bg-dark-bg-soft/80 backdrop-blur-md rounded-2xl shadow-xl hover:shadow-2xl border border-white/20 dark:border-dark-bg-mute transition-all duration-500 p-3 sm:p-4 md:p-6" };
const _hoisted_9 = { class: "space-y-4 sm:space-y-5 md:space-y-6" };
const _hoisted_10 = { class: "flex justify-center max-w-md mx-auto" };
const _hoisted_11 = { key: 0 };
const STORAGE_KEY = "flashcard-date-filter";
const _sfc_main$3 = /* @__PURE__ */ defineComponent({
  ...{ components: AsyncComponents },
  __name: "FlashcardView",
  setup(__props) {
    const { t } = useI18n();
    const router2 = useRouter();
    const { allVocabularies } = useVocabularyStore();
    const modalStore = useModalStore();
    const {
      startSessionDetails,
      appendAnswer,
      loadDetails
    } = usePracticeSessionDetails();
    const activeSessionId = ref(null);
    const showSessionDetail = ref(false);
    const selectedSessionDetails = ref(null);
    const latestPictionarySnapshot = ref(null);
    const onPictionarySnapshot = (payload) => {
      latestPictionarySnapshot.value = payload;
    };
    const openHistoryDetails = (sessionId) => {
      const details = loadDetails(sessionId);
      selectedSessionDetails.value = details;
      showSessionDetail.value = true;
    };
    const loadDateFilterState = () => {
      try {
        const saved = localStorage.getItem(STORAGE_KEY);
        if (saved) {
          const parsed = JSON.parse(saved);
          return {
            selectedDate: parsed.selectedDate || ""
          };
        }
      } catch (error) {
        console.error("Error loading date filter state:", error);
      }
      return { selectedDate: "" };
    };
    const saveDateFilterState = () => {
      try {
        const state = { selectedDate: selectedDate.value };
        localStorage.setItem(STORAGE_KEY, JSON.stringify(state));
      } catch (error) {
        console.error("Error saving date filter state:", error);
      }
    };
    const initialState = loadDateFilterState();
    const dateFilterEnabled = ref(true);
    const selectedDate = ref(initialState.selectedDate);
    watch(selectedDate, () => {
      saveDateFilterState();
    });
    const bubbleShooterVietnameseMode = ref(false);
    const snakeDoubleBaitMode = ref(false);
    const loadBubbleShooterVietnameseModeFromStorage = () => {
      try {
        const saved = localStorage.getItem("pe_bubbleShooterVietnameseMode");
        return saved === null ? false : saved === "true";
      } catch {
        return false;
      }
    };
    const saveBubbleShooterVietnameseModeToStorage = (enabled) => {
      try {
        localStorage.setItem("pe_bubbleShooterVietnameseMode", String(enabled));
      } catch {
      }
    };
    const loadSnakeDoubleBaitModeFromStorage = () => {
      try {
        const saved = localStorage.getItem("pe_snakeDoubleBaitMode");
        return saved === null ? false : saved === "true";
      } catch {
        return false;
      }
    };
    const saveSnakeDoubleBaitModeToStorage = (enabled) => {
      try {
        localStorage.setItem("pe_snakeDoubleBaitMode", String(enabled));
      } catch {
      }
    };
    bubbleShooterVietnameseMode.value = loadBubbleShooterVietnameseModeFromStorage();
    snakeDoubleBaitMode.value = loadSnakeDoubleBaitModeFromStorage();
    watch(bubbleShooterVietnameseMode, (newVal) => {
      saveBubbleShooterVietnameseModeToStorage(newVal);
    });
    watch(snakeDoubleBaitMode, (newVal) => {
      saveSnakeDoubleBaitModeToStorage(newVal);
    });
    const {
      showSettings: showSettingsDialog,
      settings: flashcardSettings,
      localSettings,
      applySettings: applyGameSettings,
      cancelSettings
    } = useFlashcardSettings();
    const filteredVocabularies = computed(() => {
      let vocabularies2 = allVocabularies.value;
      if (selectedDate.value) {
        vocabularies2 = vocabularies2.filter((vocab) => {
          const vocabDateKey = getDateKey(vocab.createdAt);
          return vocabDateKey === selectedDate.value;
        });
      }
      if (flashcardSettings.value.category) {
        vocabularies2 = vocabularies2.filter((vocab) => vocab.category === flashcardSettings.value.category);
      }
      return vocabularies2;
    });
    const baseFlashcards = computed(() => {
      return filteredVocabularies.value.filter((vocab) => {
        const category = flashcardSettings.value.category;
        const difficulty = flashcardSettings.value.difficulty;
        const categoryMatch = !category || vocab.category === category;
        const levelMatch = !difficulty || difficulty === "all" || vocab.level === difficulty;
        return categoryMatch && levelMatch;
      });
    });
    const imageModeAvailable = computed(() => {
      const cards = baseFlashcards.value;
      if (cards.length === 0) return false;
      return cards.every((v) => {
        const img = v.image;
        if (img == null) return false;
        const s = typeof img === "string" ? img : String(img);
        return s.trim().length > 0;
      });
    });
    const pictionaryModeAvailable = computed(() => {
      const cards = baseFlashcards.value;
      if (cards.length === 0) return false;
      return cards.every((v) => {
        const img = v.image;
        if (img == null) return false;
        const s = typeof img === "string" ? img : String(img);
        return s.trim().length > 0;
      });
    });
    const bubbleShooterModeAvailable = computed(() => {
      if (!selectedDate.value) {
        return filteredVocabularies.value.length <= 8;
      }
      const dateFilteredVocabs = allVocabularies.value.filter((vocab) => {
        const vocabDateKey = getDateKey(vocab.createdAt);
        return vocabDateKey === selectedDate.value;
      });
      return dateFilteredVocabs.length <= 8;
    });
    const practiceStarted = ref(false);
    const practiceTimerRef = ref();
    const showExitWarning = ref(false);
    const allowExit = ref(false);
    const handlePracticeStart = () => {
      practiceStarted.value = true;
      console.log("Practice started!");
      activeSessionId.value = `${Date.now()}`;
      startSessionDetails(activeSessionId.value, practiceMode.value);
    };
    const handleExitPractice = () => {
      if (practiceStarted.value && !allowExit.value) {
        showExitWarning.value = true;
      } else {
        router2.push("/");
      }
    };
    const handleTimeout = () => {
      console.log("Time out for current card!");
    };
    const handleTimerRestart = () => {
      console.log("Timer restarted: restarting from the first card");
      practiceStarted.value = true;
      if (flashcardSettings.value.shuffleCards && baseFlashcards.value.length > 0) {
        shuffleFlashcards();
      }
      cardStateStorage.value = {};
      currentIndex.value = 0;
      resetAndRestoreCard();
      if (practiceTimerRef.value) {
        practiceTimerRef.value.startTimer();
      }
    };
    const handleSkip = () => {
      console.log("Skip current card");
      practiceStarted.value = false;
      if (practiceTimerRef.value) {
        practiceTimerRef.value.resetPractice();
      }
      restartSession();
      router2.push("/practice/flashcard");
    };
    const continueSession = () => {
      showExitWarning.value = false;
    };
    const confirmExit = () => {
      allowExit.value = true;
      showExitWarning.value = false;
      practiceStarted.value = false;
      if (practiceTimerRef.value) {
        practiceTimerRef.value.resetPractice();
      }
      removeNavigationGuard();
      router2.push("/");
    };
    let unregisterGuard = null;
    const setupNavigationGuard = () => {
      if (unregisterGuard) {
        unregisterGuard();
      }
      unregisterGuard = router2.beforeEach((to, from, next) => {
        if (practiceStarted.value && !allowExit.value && from.path.includes("/practice/flashcard")) {
          showExitWarning.value = true;
          return false;
        }
        next();
      });
    };
    const removeNavigationGuard = () => {
      if (unregisterGuard) {
        unregisterGuard();
        unregisterGuard = null;
      }
    };
    const handleImageAnswer = () => {
      checkImageAnswer();
      recordAnswer(imageCorrect.value);
      if (practiceStarted.value && typeof window !== "undefined" && window.innerWidth < 768) {
        setTimeout(() => {
          enhancedNextCard();
        }, 2100);
      }
    };
    const handleBeforeUnload = (event) => {
      if (practiceStarted.value && !allowExit.value) {
        event.preventDefault();
        event.returnValue = "";
        return "";
      }
    };
    const {
      showHistory,
      practiceHistory,
      saveSessionToHistory,
      getModeColor,
      getModeText,
      formatDate: formatDate2,
      formatDuration
    } = useFlashcardHistory();
    const {
      currentIndex,
      isFlipped,
      practiceMode,
      showCompletionModal,
      settings,
      stats,
      flashcards,
      flipCard,
      completeSession,
      restartSession,
      changePracticeMode,
      goBack,
      goToVocabulary,
      cleanup
    } = useFlashcardGame(baseFlashcards);
    watch(imageModeAvailable, (available) => {
      if (practiceMode.value === "image" && !available) {
        if (practiceStarted.value) {
          console.log("[Flashcard] Image mode became unavailable but practice is active; not switching mode.");
          return;
        }
        console.log("[Flashcard] Image mode unavailable for current filter; switching to flashcard mode.");
        changePracticeMode("flashcard");
      }
    }, { immediate: true });
    watch(pictionaryModeAvailable, (available) => {
      if (practiceMode.value === "pictionary" && !available) {
        if (practiceStarted.value) {
          console.log("[Flashcard] Pictionary mode became unavailable but practice is active; not switching mode.");
          return;
        }
        console.log("[Flashcard] Pictionary mode unavailable for current filter; switching to flashcard mode.");
        changePracticeMode("flashcard");
      }
    }, { immediate: true });
    const {
      initializeStats,
      recordAnswer
    } = useFlashcardStats(stats);
    const currentFlashcards = computed(() => {
      if (flashcardSettings.value.shuffleCards && shuffledFlashcards.value.length > 0) {
        return shuffledFlashcards.value;
      }
      return baseFlashcards.value;
    });
    const currentShuffledCard = computed(() => {
      if (currentFlashcards.value.length === 0) return null;
      return currentFlashcards.value[currentIndex.value];
    });
    const currentProgressPercentage = computed(() => {
      if (currentFlashcards.value.length === 0) return 0;
      if (typeof currentIndex.value !== "number" || isNaN(currentIndex.value)) return 0;
      if (currentIndex.value >= currentFlashcards.value.length) return 100;
      return (currentIndex.value + 1) / currentFlashcards.value.length * 100;
    });
    const shuffleEnabled = computed(() => flashcardSettings.value.shuffleCards);
    const shuffledFlashcards = ref([]);
    const shuffleFlashcards = (cards = baseFlashcards.value) => {
      const shuffled = [...cards];
      for (let i = shuffled.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [shuffled[i], shuffled[j]] = [shuffled[j], shuffled[i]];
      }
      shuffledFlashcards.value = shuffled;
    };
    const {
      quizOptions,
      selectedAnswer,
      quizAnswered,
      generateQuizOptions,
      selectQuizAnswer,
      typingAnswer,
      typingAnswered,
      typingCorrect,
      checkTypingAnswer,
      // Typing-quiz
      typingQuizEnabled,
      typingQuizOptions,
      typingQuizSelected,
      typingQuizAnswered,
      generateTypingQuizOptions,
      selectTypingQuizAnswer,
      listeningAnswer,
      listeningAnswered,
      listeningCorrect,
      checkListeningAnswer,
      playAudio: playAudio2,
      imageAnswer,
      imageAnswered,
      imageCorrect,
      checkImageAnswer,
      resetImageMode,
      // Pictionary
      pictionaryAnswer,
      pictionaryAnswered,
      pictionaryCorrect,
      checkPictionaryAnswer,
      imageQuizEnabled,
      imageQuizOptions,
      imageQuizSelected,
      imageQuizAnswered,
      generateImageQuizOptions,
      selectImageQuizAnswer,
      resetAllModes,
      getCanProceed,
      getShortMeaning,
      // Pronunciation mode
      isRecording,
      pronunciationResult,
      pronunciationAnswered,
      pronunciationCorrect,
      isSpeechRecognitionSupported,
      startRecording,
      listeningQuizEnabled,
      listeningQuizOptions,
      listeningQuizSelected,
      listeningQuizAnswered,
      generateListeningQuizOptions,
      selectListeningQuizAnswer
    } = useFlashcardModes(currentShuffledCard, currentFlashcards, allVocabularies);
    const cardStateStorage = ref({});
    const saveCurrentCardState = () => {
      if (!currentShuffledCard.value) return;
      const cardId = currentShuffledCard.value.id;
      cardStateStorage.value[cardId] = {
        // Quiz mode
        quizAnswer: selectedAnswer.value,
        quizAnswered: quizAnswered.value,
        quizOptions: quizOptions.value,
        // Typing mode
        typingAnswer: typingAnswer.value || void 0,
        typingAnswered: typingAnswered.value || void 0,
        typingCorrect: typingCorrect.value || void 0,
        // Typing-quiz
        typingQuizOptions: typingQuizOptions.value || void 0,
        typingQuizSelected: typingQuizSelected.value || void 0,
        typingQuizAnswered: typingQuizAnswered.value || void 0,
        // Listening mode
        listeningAnswer: listeningAnswer.value || void 0,
        listeningAnswered: listeningAnswered.value || void 0,
        listeningCorrect: listeningCorrect.value || void 0,
        // Listening-quiz
        listeningQuizOptions: listeningQuizOptions.value || void 0,
        listeningQuizSelected: listeningQuizSelected.value || void 0,
        listeningQuizAnswered: listeningQuizAnswered.value || void 0,
        // Image mode
        imageAnswer: imageAnswer.value || void 0,
        imageAnswered: imageAnswered.value || void 0,
        imageCorrect: imageCorrect.value || void 0,
        imageQuizOptions: imageQuizOptions.value && imageQuizOptions.value.length ? imageQuizOptions.value : void 0,
        imageQuizSelected: imageQuizSelected.value || void 0,
        imageQuizAnswered: imageQuizAnswered.value || void 0,
        // Pronunciation mode
        pronunciationResult: pronunciationResult.value || void 0,
        pronunciationAnswered: pronunciationAnswered.value || void 0,
        pronunciationCorrect: pronunciationCorrect.value || void 0,
        // Pictionary mode
        pictionaryAnswer: pictionaryAnswer.value || void 0,
        pictionaryAnswered: pictionaryAnswered.value || void 0,
        pictionaryCorrect: pictionaryCorrect.value || void 0
      };
    };
    const restoreCardState = () => {
      if (!currentShuffledCard.value) return;
      const cardId = currentShuffledCard.value.id;
      const savedState = cardStateStorage.value[cardId];
      if (savedState) {
        if (savedState.quizOptions) {
          quizOptions.value = savedState.quizOptions;
        }
        if (savedState.quizAnswer !== void 0) {
          selectedAnswer.value = savedState.quizAnswer;
        }
        if (savedState.quizAnswered !== void 0) {
          quizAnswered.value = savedState.quizAnswered;
        }
        if (savedState.typingAnswer !== void 0) {
          typingAnswer.value = savedState.typingAnswer;
        }
        if (savedState.typingAnswered !== void 0) {
          typingAnswered.value = savedState.typingAnswered;
        }
        if (savedState.typingCorrect !== void 0) {
          typingCorrect.value = savedState.typingCorrect;
        }
        if (savedState.typingQuizOptions !== void 0) {
          typingQuizOptions.value = savedState.typingQuizOptions;
        }
        if (savedState.typingQuizSelected !== void 0) {
          typingQuizSelected.value = savedState.typingQuizSelected;
        }
        if (savedState.typingQuizAnswered !== void 0) {
          typingQuizAnswered.value = savedState.typingQuizAnswered;
        }
        if (savedState.listeningAnswer !== void 0) {
          listeningAnswer.value = savedState.listeningAnswer;
        }
        if (savedState.listeningAnswered !== void 0) {
          listeningAnswered.value = savedState.listeningAnswered;
        }
        if (savedState.listeningCorrect !== void 0) {
          listeningCorrect.value = savedState.listeningCorrect;
        }
        if (savedState.listeningQuizOptions !== void 0) {
          listeningQuizOptions.value = savedState.listeningQuizOptions;
        }
        if (savedState.listeningQuizSelected !== void 0) {
          listeningQuizSelected.value = savedState.listeningQuizSelected;
        }
        if (savedState.listeningQuizAnswered !== void 0) {
          listeningQuizAnswered.value = savedState.listeningQuizAnswered;
        }
        if (savedState.imageAnswer !== void 0) {
          imageAnswer.value = savedState.imageAnswer;
        }
        if (savedState.imageAnswered !== void 0) {
          imageAnswered.value = savedState.imageAnswered;
        }
        if (savedState.imageCorrect !== void 0) {
          imageCorrect.value = savedState.imageCorrect;
        }
        if (savedState.imageQuizOptions !== void 0) {
          imageQuizOptions.value = savedState.imageQuizOptions;
        }
        if (savedState.imageQuizSelected !== void 0) {
          imageQuizSelected.value = savedState.imageQuizSelected;
        }
        if (savedState.imageQuizAnswered !== void 0) {
          imageQuizAnswered.value = savedState.imageQuizAnswered;
        }
        if (savedState.pronunciationResult !== void 0) {
          pronunciationResult.value = savedState.pronunciationResult;
        }
        if (savedState.pronunciationAnswered !== void 0) {
          pronunciationAnswered.value = savedState.pronunciationAnswered;
        }
        if (savedState.pronunciationCorrect !== void 0) {
          pronunciationCorrect.value = savedState.pronunciationCorrect;
        }
        if (savedState.pictionaryAnswer !== void 0) {
          pictionaryAnswer.value = savedState.pictionaryAnswer;
        }
        if (savedState.pictionaryAnswered !== void 0) {
          pictionaryAnswered.value = savedState.pictionaryAnswered;
        }
        if (savedState.pictionaryCorrect !== void 0) {
          pictionaryCorrect.value = savedState.pictionaryCorrect;
        }
      }
    };
    const handleQuizAnswer = (answer) => {
      const isCorrect = selectQuizAnswer(answer);
      recordAnswer(!!isCorrect);
      if (currentShuffledCard.value && activeSessionId.value) {
        appendAnswer({
          cardId: currentShuffledCard.value.id,
          word: currentShuffledCard.value.word,
          meaningShort: getShortMeaning(currentShuffledCard.value.meaning),
          userAnswer: answer,
          correctAnswer: getShortMeaning(currentShuffledCard.value.meaning),
          isCorrect: !!isCorrect,
          mode: "quiz"
        });
      }
      if (practiceStarted.value && typeof window !== "undefined" && window.innerWidth < 768) {
        setTimeout(() => {
          enhancedNextCard();
        }, 2100);
      }
    };
    const handleTypingAnswer = () => {
      checkTypingAnswer();
      recordAnswer(typingCorrect.value);
      if (currentShuffledCard.value && activeSessionId.value) {
        appendAnswer({
          cardId: currentShuffledCard.value.id,
          word: currentShuffledCard.value.word,
          meaningShort: getShortMeaning(currentShuffledCard.value.meaning),
          userAnswer: typingAnswer.value,
          correctAnswer: currentShuffledCard.value.word,
          isCorrect: !!typingCorrect.value,
          mode: "typing"
        });
      }
      if (practiceStarted.value && typeof window !== "undefined" && window.innerWidth < 768) {
        setTimeout(() => {
          enhancedNextCard();
        }, 2100);
      }
    };
    const handleTypingQuizAnswer = (answer) => {
      const isCorrect = selectTypingQuizAnswer(answer);
      recordAnswer(!!isCorrect);
      if (currentShuffledCard.value && activeSessionId.value) {
        appendAnswer({
          cardId: currentShuffledCard.value.id,
          word: currentShuffledCard.value.word,
          meaningShort: getShortMeaning(currentShuffledCard.value.meaning),
          userAnswer: answer,
          correctAnswer: currentShuffledCard.value.word,
          isCorrect: !!isCorrect,
          mode: "typing-quiz"
        });
      }
      if (practiceStarted.value && typeof window !== "undefined" && window.innerWidth < 768) {
        setTimeout(() => {
          enhancedNextCard();
        }, 2100);
      }
    };
    const handleListeningAnswer = () => {
      checkListeningAnswer();
      recordAnswer(listeningCorrect.value);
      if (currentShuffledCard.value && activeSessionId.value) {
        appendAnswer({
          cardId: currentShuffledCard.value.id,
          word: currentShuffledCard.value.word,
          meaningShort: getShortMeaning(currentShuffledCard.value.meaning),
          userAnswer: listeningAnswer.value,
          correctAnswer: currentShuffledCard.value.word,
          isCorrect: !!listeningCorrect.value,
          mode: "listening"
        });
      }
      if (practiceStarted.value && typeof window !== "undefined" && window.innerWidth < 768) {
        setTimeout(() => {
          enhancedNextCard();
        }, 2100);
      }
    };
    const handleListeningQuizAnswer = (answer) => {
      const isCorrect = selectListeningQuizAnswer(answer);
      recordAnswer(!!isCorrect);
      if (currentShuffledCard.value && activeSessionId.value) {
        appendAnswer({
          cardId: currentShuffledCard.value.id,
          word: currentShuffledCard.value.word,
          meaningShort: getShortMeaning(currentShuffledCard.value.meaning),
          userAnswer: answer,
          correctAnswer: currentShuffledCard.value.word,
          isCorrect: !!isCorrect,
          mode: "listening-quiz"
        });
      }
      if (practiceStarted.value && typeof window !== "undefined" && window.innerWidth < 768) {
        setTimeout(() => {
          enhancedNextCard();
        }, 2100);
      }
    };
    const onToggleImageQuiz = (enabled) => {
      imageQuizEnabled.value = enabled;
      resetImageMode();
      if (enabled) {
        generateImageQuizOptions();
      }
    };
    const handleImageQuizAnswer = (answer) => {
      const isCorrect = selectImageQuizAnswer(answer);
      recordAnswer(!!isCorrect);
      if (currentShuffledCard.value && activeSessionId.value) {
        appendAnswer({
          cardId: currentShuffledCard.value.id,
          word: currentShuffledCard.value.word,
          meaningShort: getShortMeaning(currentShuffledCard.value.meaning),
          userAnswer: answer,
          correctAnswer: currentShuffledCard.value.word,
          isCorrect: !!isCorrect,
          mode: "image-quiz"
        });
      }
      if (practiceStarted.value && typeof window !== "undefined" && window.innerWidth < 768) {
        setTimeout(() => {
          enhancedNextCard();
        }, 2100);
      }
    };
    const handlePictionaryAnswer = () => {
      checkPictionaryAnswer();
      recordAnswer(pictionaryCorrect.value);
      if (currentShuffledCard.value && activeSessionId.value) {
        appendAnswer({
          cardId: currentShuffledCard.value.id,
          word: currentShuffledCard.value.word,
          meaningShort: getShortMeaning(currentShuffledCard.value.meaning),
          userAnswer: pictionaryAnswer.value || "",
          correctAnswer: currentShuffledCard.value.word,
          isCorrect: !!pictionaryCorrect.value,
          mode: "pictionary",
          extra: {
            pictionary: {
              image: currentShuffledCard.value.image,
              slots: latestPictionarySnapshot.value?.slots || []
            }
          }
        });
        latestPictionarySnapshot.value = null;
      }
      if (practiceStarted.value && typeof window !== "undefined" && window.innerWidth < 768) {
        setTimeout(() => {
          enhancedNextCard();
        }, 2100);
      }
    };
    const handleBubbleShooterComplete = () => {
      recordAnswer(true);
      if (currentShuffledCard.value && activeSessionId.value) {
        appendAnswer({
          cardId: currentShuffledCard.value.id,
          word: currentShuffledCard.value.word,
          meaningShort: getShortMeaning(currentShuffledCard.value.meaning),
          userAnswer: "completed",
          correctAnswer: currentShuffledCard.value.word,
          isCorrect: true,
          mode: "bubble-shooter"
        });
      }
      handleSessionComplete();
    };
    const resetAndRestoreCard = () => {
      resetAllModes();
      restoreCardState();
      if (practiceMode.value === "quiz" && currentShuffledCard.value) {
        const cardId = currentShuffledCard.value.id;
        const savedState = cardStateStorage.value[cardId];
        if (!savedState || savedState.quizAnswer === void 0) {
          generateQuizOptions();
        }
      }
      if (practiceMode.value === "image" && imageQuizEnabled.value && currentShuffledCard.value) {
        if (!imageQuizOptions.value || imageQuizOptions.value.length === 0) {
          generateImageQuizOptions();
        }
      }
      if (practiceMode.value === "typing" && typingQuizEnabled.value && currentShuffledCard.value) {
        if (!typingQuizOptions.value || typingQuizOptions.value.length === 0) {
          generateTypingQuizOptions();
        }
      }
      if (practiceMode.value === "listening" && listeningQuizEnabled.value && currentShuffledCard.value) {
        if (!listeningQuizOptions.value || listeningQuizOptions.value.length === 0) {
          generateListeningQuizOptions();
        }
      }
    };
    const toggleShuffle = () => {
      flashcardSettings.value.shuffleCards = !flashcardSettings.value.shuffleCards;
      if (flashcardSettings.value.shuffleCards) {
        shuffleFlashcards();
      } else {
        shuffledFlashcards.value = [];
      }
      cardStateStorage.value = {};
      currentIndex.value = 0;
      resetAndRestoreCard();
    };
    const enhancedNextCard = () => {
      saveCurrentCardState();
      if (practiceMode.value === "pronunciation" && pronunciationAnswered.value) {
        recordAnswer(pronunciationCorrect.value);
        if (currentShuffledCard.value && activeSessionId.value) {
          appendAnswer({
            cardId: currentShuffledCard.value.id,
            word: currentShuffledCard.value.word,
            meaningShort: getShortMeaning(currentShuffledCard.value.meaning),
            userAnswer: pronunciationResult.value,
            correctAnswer: currentShuffledCard.value.word,
            isCorrect: !!pronunciationCorrect.value,
            mode: "pronunciation"
          });
        }
      }
      if (currentIndex.value < currentFlashcards.value.length - 1) {
        currentIndex.value++;
        resetAndRestoreCard();
        if (practiceStarted.value && practiceTimerRef.value) {
          practiceTimerRef.value.nextCard();
        }
      } else {
        handleSessionComplete();
      }
    };
    const enhancedPreviousCard = () => {
      saveCurrentCardState();
      if (currentIndex.value > 0) {
        currentIndex.value--;
        resetAndRestoreCard();
        if (practiceStarted.value && practiceTimerRef.value) {
          practiceTimerRef.value.stopTimer();
        }
      }
    };
    const enhancedMarkEasy = () => {
      recordAnswer(true);
      enhancedNextCard();
    };
    const enhancedMarkDifficult = () => {
      recordAnswer(false);
      enhancedNextCard();
    };
    const handleSessionComplete = () => {
      completeSession();
      const totalCards = currentFlashcards.value.length;
      const id = saveSessionToHistory(stats.value, totalCards, activeSessionId.value || void 0);
      if (!activeSessionId.value) {
        activeSessionId.value = id;
      }
    };
    const handleRestartSession = () => {
      restartSession();
      practiceStarted.value = false;
      cardStateStorage.value = {};
      modalStore.setCompletionModal(false);
      if (flashcardSettings.value.shuffleCards && baseFlashcards.value.length > 0) {
        shuffleFlashcards();
      }
      resetAndRestoreCard();
      if (practiceTimerRef.value) {
        practiceTimerRef.value.resetPractice();
      }
    };
    const handleCompletionGoBack = () => {
      modalStore.setCompletionModal(false);
      goBack();
    };
    const handleSnakeGameComplete = () => {
      const expectedCorrect = currentFlashcards.value.length;
      const actualCorrect = stats.value.correct;
      if (actualCorrect < expectedCorrect) {
        recordAnswer(true);
      }
      handleSessionComplete();
    };
    const handleSnakeCorrectFoodEaten = (details) => {
      console.log("[DEBUG] Snake correct food eaten, recording answer true");
      console.log("[DEBUG] Stats before:", { correct: stats.value.correct, incorrect: stats.value.incorrect, total: stats.value.total });
      recordAnswer(true);
      console.log("[DEBUG] Stats after:", { correct: stats.value.correct, incorrect: stats.value.incorrect, total: stats.value.total });
      if (details && activeSessionId.value) {
        console.log("[DEBUG] FlashcardView - Recording snake correct food:", details);
        console.log("[DEBUG] FlashcardView - Snake body to save:", details.snakeBody);
        console.log("[DEBUG] FlashcardView - Snake direction to save:", details.direction);
        appendAnswer({
          cardId: Date.now(),
          // Unique numeric ID for snake game food eaten
          word: details.word,
          meaningShort: details.meaningShort,
          userAnswer: details.word,
          // Correct food eaten
          correctAnswer: details.word,
          isCorrect: true,
          mode: "snake-game",
          extra: {
            snakeGame: {
              position: details.position,
              wasCorrect: true,
              foodType: "primary",
              // Correct food is always primary target
              snakeLength: details.snakeLength,
              gameScore: details.gameScore,
              wordsCompleted: details.wordsCompleted,
              wrongEatenCount: details.wrongEatenCount,
              snakeBody: details.snakeBody,
              direction: details.direction,
              timelineFrames: details.timelineFrames
            }
          }
        });
      }
    };
    const handleSnakeWrongFoodEaten = (details) => {
      recordAnswer(false);
      if (details && activeSessionId.value) {
        appendAnswer({
          cardId: Date.now(),
          // Unique numeric ID for snake game food eaten
          word: details.word,
          meaningShort: details.meaningShort,
          userAnswer: details.word,
          // Wrong food eaten
          correctAnswer: "",
          // No specific correct answer for wrong food
          isCorrect: false,
          mode: "snake-game",
          extra: {
            snakeGame: {
              position: details.position,
              wasCorrect: false,
              foodType: "secondary",
              // Wrong food is secondary/decoy
              snakeLength: details.snakeLength,
              gameScore: details.gameScore,
              wordsCompleted: details.wordsCompleted,
              wrongEatenCount: details.wrongEatenCount,
              snakeBody: details.snakeBody,
              direction: details.direction,
              timelineFrames: details.timelineFrames
            }
          }
        });
      }
    };
    let autoFlipTimer = null;
    watch([currentIndex, isFlipped], () => {
      if (autoFlipTimer) {
        clearTimeout(autoFlipTimer);
      }
      if (flashcardSettings.value.autoFlip && !isFlipped.value) {
        autoFlipTimer = setTimeout(() => {
          isFlipped.value = true;
        }, 3e3);
      }
    });
    watch(practiceMode, () => {
      resetAndRestoreCard();
      if (flashcardSettings.value.shuffleCards && shuffledFlashcards.value.length === 0) {
        shuffleFlashcards();
      }
    });
    watch(showCompletionModal, (newValue) => {
      if (newValue) {
        if (practiceTimerRef.value) {
          practiceTimerRef.value.stopTimer();
        }
        modalStore.setCompletionModal(true);
      } else {
        modalStore.setCompletionModal(false);
      }
    });
    watch(showHistory, (newValue) => {
      if (newValue) {
        document.body.classList.add("modal-open");
      } else {
        document.body.classList.remove("modal-open");
      }
    });
    watch(showSessionDetail, (newValue) => {
      if (newValue) {
        document.body.classList.add("modal-open");
      } else {
        document.body.classList.remove("modal-open");
      }
    });
    watch(showSettingsDialog, (newValue) => {
      if (newValue) {
        document.body.classList.add("modal-open");
      } else {
        document.body.classList.remove("modal-open");
      }
    });
    watch(dateFilterEnabled, () => {
      saveDateFilterState();
    });
    watch(selectedDate, () => {
      saveDateFilterState();
    });
    watch(baseFlashcards, (newCards) => {
      if (flashcardSettings.value.shuffleCards && newCards.length > 0) {
        shuffleFlashcards(newCards);
        currentIndex.value = 0;
        resetAndRestoreCard();
      } else if (flashcardSettings.value.shuffleCards && newCards.length === 0) {
        shuffledFlashcards.value = [];
        currentIndex.value = 0;
      }
    }, { immediate: false });
    onMounted(() => {
      console.log("FlashcardView mounted");
      initializeStats(currentFlashcards.value.length);
      if (practiceMode.value === "quiz") {
        generateQuizOptions();
      }
      if (flashcardSettings.value.shuffleCards) {
        shuffleFlashcards();
      }
      setupNavigationGuard();
      window.addEventListener("beforeunload", handleBeforeUnload);
    });
    onUnmounted(() => {
      document.body.classList.remove("modal-open");
      cleanup();
      removeNavigationGuard();
      window.removeEventListener("beforeunload", handleBeforeUnload);
    });
    return (_ctx, _cache) => {
      const _component_FlashcardHeader = resolveComponent("FlashcardHeader");
      const _component_FlashcardProgress = resolveComponent("FlashcardProgress");
      const _component_LazyLoadComponent = resolveComponent("LazyLoadComponent");
      const _component_VoiceSelector = resolveComponent("VoiceSelector");
      const _component_FlashcardDateFilter = resolveComponent("FlashcardDateFilter");
      const _component_PracticeTimer = resolveComponent("PracticeTimer");
      const _component_FlashcardCard = resolveComponent("FlashcardCard");
      const _component_PictionaryMode = resolveComponent("PictionaryMode");
      const _component_FlashcardQuiz = resolveComponent("FlashcardQuiz");
      const _component_FlashcardTyping = resolveComponent("FlashcardTyping");
      const _component_FlashcardImage = resolveComponent("FlashcardImage");
      const _component_ListeningMode = resolveComponent("ListeningMode");
      const _component_PronunciationMode = resolveComponent("PronunciationMode");
      const _component_BubbleShooterMode = resolveComponent("BubbleShooterMode");
      const _component_SnakeGameMode = resolveComponent("SnakeGameMode");
      const _component_FlashcardControls = resolveComponent("FlashcardControls");
      const _component_PracticeStats = resolveComponent("PracticeStats");
      const _component_FlashcardEmptyState = resolveComponent("FlashcardEmptyState");
      const _component_SettingsModal = resolveComponent("SettingsModal");
      const _component_HistoryModal = resolveComponent("HistoryModal");
      const _component_SessionDetailModal = resolveComponent("SessionDetailModal");
      const _component_CompletionModal = resolveComponent("CompletionModal");
      const _component_ExitWarningModal = resolveComponent("ExitWarningModal");
      return openBlock(), createElementBlock("div", _hoisted_1$3, [
        _cache[21] || (_cache[21] = createStaticVNode('<div class="absolute inset-0 overflow-hidden pointer-events-none" data-v-bf2f0424><div class="floating-shapes" data-v-bf2f0424><div class="absolute top-24 left-8 w-64 h-64 bg-blue-300 dark:bg-blue-500 rounded-full mix-blend-multiply dark:mix-blend-normal filter blur-xl opacity-30 animate-blob" data-v-bf2f0424></div><div class="absolute top-40 right-10 w-72 h-72 bg-purple-300 dark:bg-purple-500 rounded-full mix-blend-multiply dark:mix-blend-normal filter blur-xl opacity-30 animate-blob animation-delay-2000" data-v-bf2f0424></div><div class="absolute -bottom-10 left-24 w-80 h-80 bg-pink-300 dark:bg-pink-500 rounded-full mix-blend-multiply dark:mix-blend-normal filter blur-xl opacity-30 animate-blob animation-delay-4000" data-v-bf2f0424></div></div></div>', 1)),
        createVNode(_component_FlashcardHeader, {
          "current-index": unref(currentIndex),
          "total-cards": currentFlashcards.value.length,
          "practice-mode": unref(practiceMode),
          "shuffle-enabled": shuffleEnabled.value,
          "practice-started": practiceStarted.value,
          "image-quiz-enabled": unref(imageQuizEnabled),
          "listening-quiz-enabled": unref(listeningQuizEnabled),
          "typing-quiz-enabled": unref(typingQuizEnabled),
          "image-mode-available": imageModeAvailable.value,
          "pictionary-mode-available": pictionaryModeAvailable.value,
          "bubble-shooter-mode-available": bubbleShooterModeAvailable.value,
          "bubble-shooter-vietnamese-mode": bubbleShooterVietnameseMode.value,
          "snake-double-bait-enabled": snakeDoubleBaitMode.value,
          onGoBack: unref(goBack),
          onShowHistory: _cache[0] || (_cache[0] = ($event) => showHistory.value = true),
          onChangePracticeMode: _cache[1] || (_cache[1] = ($event) => unref(changePracticeMode)($event)),
          onShowSettings: _cache[2] || (_cache[2] = ($event) => showSettingsDialog.value = true),
          onToggleShuffle: toggleShuffle,
          "onUpdate:imageQuizEnabled": _cache[3] || (_cache[3] = ($event) => imageQuizEnabled.value = $event),
          "onUpdate:listeningQuizEnabled": _cache[4] || (_cache[4] = ($event) => listeningQuizEnabled.value = $event),
          "onUpdate:typingQuizEnabled": _cache[5] || (_cache[5] = ($event) => typingQuizEnabled.value = $event),
          "onUpdate:bubbleShooterVietnameseMode": _cache[6] || (_cache[6] = ($event) => bubbleShooterVietnameseMode.value = $event),
          "onUpdate:snakeDoubleBaitEnabled": _cache[7] || (_cache[7] = ($event) => snakeDoubleBaitMode.value = $event)
        }, null, 8, ["current-index", "total-cards", "practice-mode", "shuffle-enabled", "practice-started", "image-quiz-enabled", "listening-quiz-enabled", "typing-quiz-enabled", "image-mode-available", "pictionary-mode-available", "bubble-shooter-mode-available", "bubble-shooter-vietnamese-mode", "snake-double-bait-enabled", "onGoBack"]),
        createVNode(_component_LazyLoadComponent, {
          "animation-type": "slide-left",
          threshold: 0.1,
          "root-margin": "-50px"
        }, {
          default: withCtx(() => [
            createVNode(_component_FlashcardProgress, { "progress-percentage": currentProgressPercentage.value }, null, 8, ["progress-percentage"])
          ]),
          _: 1
        }),
        createVNode(_component_LazyLoadComponent, {
          "animation-type": "scale",
          threshold: 0.1,
          "root-margin": "-50px"
        }, {
          default: withCtx(() => [
            createBaseVNode("div", _hoisted_2$3, [
              createBaseVNode("div", _hoisted_3$2, [
                createVNode(_component_VoiceSelector, { "show-voice-info": false })
              ])
            ])
          ]),
          _: 1
        }),
        createVNode(_component_LazyLoadComponent, {
          "animation-type": "slide-right",
          threshold: 0.1,
          "root-margin": "-50px"
        }, {
          default: withCtx(() => [
            createBaseVNode("div", _hoisted_4$2, [
              createBaseVNode("div", _hoisted_5$2, [
                createVNode(_component_FlashcardDateFilter, {
                  vocabularies: unref(allVocabularies),
                  selectedDate: selectedDate.value,
                  "practice-started": practiceStarted.value,
                  "onUpdate:selectedDate": _cache[8] || (_cache[8] = ($event) => selectedDate.value = $event)
                }, null, 8, ["vocabularies", "selectedDate", "practice-started"])
              ])
            ])
          ]),
          _: 1
        }),
        createBaseVNode("div", _hoisted_6$2, [
          currentFlashcards.value.length > 0 ? (openBlock(), createElementBlock("div", _hoisted_7$1, [
            createBaseVNode("div", _hoisted_8, [
              createBaseVNode("div", _hoisted_9, [
                createVNode(_component_LazyLoadComponent, {
                  "animation-type": "fade-up",
                  threshold: 0.1,
                  "root-margin": "-50px"
                }, {
                  default: withCtx(() => [
                    createBaseVNode("div", _hoisted_10, [
                      unref(practiceMode) === "bubble-shooter" || unref(practiceMode) === "snake-game" ? (openBlock(), createElementBlock(Fragment, { key: 0 }, [
                        !practiceStarted.value ? (openBlock(), createElementBlock("button", {
                          key: 0,
                          onClick: handlePracticeStart,
                          class: "px-8 py-4 bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-700 hover:to-pink-700 dark:from-purple-700 dark:to-pink-700 dark:hover:from-purple-800 dark:hover:to-pink-800 text-white font-semibold rounded-xl shadow-lg hover:shadow-xl transform hover:scale-105 transition-all duration-200"
                        }, toDisplayString(unref(t)("practice.startGame", "Start Game")), 1)) : createCommentVNode("", true)
                      ], 64)) : (openBlock(), createBlock(_component_PracticeTimer, {
                        key: 1,
                        ref_key: "practiceTimerRef",
                        ref: practiceTimerRef,
                        "max-time": 30,
                        onStart: handlePracticeStart,
                        onTimeout: handleTimeout,
                        onRestart: handleTimerRestart,
                        onSkip: handleSkip
                      }, null, 512))
                    ])
                  ]),
                  _: 1
                }),
                practiceStarted.value ? (openBlock(), createElementBlock("div", _hoisted_11, [
                  createVNode(_component_LazyLoadComponent, {
                    "animation-type": "scale",
                    threshold: 0.1,
                    "root-margin": "-50px"
                  }, {
                    default: withCtx(() => [
                      unref(practiceMode) === "flashcard" ? (openBlock(), createBlock(_component_FlashcardCard, {
                        key: 0,
                        "current-card": currentShuffledCard.value,
                        "is-flipped": unref(isFlipped),
                        onFlipCard: unref(flipCard)
                      }, null, 8, ["current-card", "is-flipped", "onFlipCard"])) : unref(practiceMode) === "pictionary" ? (openBlock(), createBlock(_component_PictionaryMode, {
                        key: 1,
                        card: currentShuffledCard.value,
                        "pictionary-answer": unref(pictionaryAnswer),
                        "pictionary-answered": unref(pictionaryAnswered),
                        "pictionary-correct": unref(pictionaryCorrect),
                        "get-topic-name": unref(getTopicName),
                        "onUpdate:pictionaryAnswer": _cache[9] || (_cache[9] = ($event) => pictionaryAnswer.value = $event),
                        onPictionarySnapshot: _cache[10] || (_cache[10] = ($event) => onPictionarySnapshot($event)),
                        onCheckAnswer: handlePictionaryAnswer
                      }, null, 8, ["card", "pictionary-answer", "pictionary-answered", "pictionary-correct", "get-topic-name"])) : unref(practiceMode) === "quiz" ? (openBlock(), createBlock(_component_FlashcardQuiz, {
                        key: 2,
                        "current-card": currentShuffledCard.value,
                        "quiz-options": unref(quizOptions),
                        "selected-answer": unref(selectedAnswer),
                        "quiz-answered": unref(quizAnswered),
                        onSelectAnswer: handleQuizAnswer
                      }, null, 8, ["current-card", "quiz-options", "selected-answer", "quiz-answered"])) : unref(practiceMode) === "typing" ? (openBlock(), createBlock(_component_FlashcardTyping, {
                        key: 3,
                        "current-card": currentShuffledCard.value,
                        "typing-answer": unref(typingAnswer),
                        "typing-answered": unref(typingAnswered),
                        "typing-correct": unref(typingCorrect),
                        "typing-quiz-enabled": unref(typingQuizEnabled),
                        "typing-quiz-options": unref(typingQuizOptions),
                        "typing-quiz-selected": unref(typingQuizSelected),
                        "typing-quiz-answered": unref(typingQuizAnswered),
                        "onUpdate:typingAnswer": _cache[11] || (_cache[11] = ($event) => typingAnswer.value = $event),
                        onCheckAnswer: handleTypingAnswer,
                        onSelectTypingQuizAnswer: _cache[12] || (_cache[12] = ($event) => handleTypingQuizAnswer($event))
                      }, null, 8, ["current-card", "typing-answer", "typing-answered", "typing-correct", "typing-quiz-enabled", "typing-quiz-options", "typing-quiz-selected", "typing-quiz-answered"])) : unref(practiceMode) === "image" ? (openBlock(), createBlock(_component_FlashcardImage, {
                        key: 4,
                        "current-card": currentShuffledCard.value,
                        "image-answer": unref(imageAnswer),
                        "image-answered": unref(imageAnswered),
                        "image-correct": unref(imageCorrect),
                        "image-quiz-enabled": unref(imageQuizEnabled),
                        "image-quiz-options": unref(imageQuizOptions),
                        "image-quiz-selected": unref(imageQuizSelected),
                        "image-quiz-answered": unref(imageQuizAnswered),
                        "onUpdate:imageAnswer": _cache[13] || (_cache[13] = ($event) => imageAnswer.value = $event),
                        onCheckAnswer: handleImageAnswer,
                        "onUpdate:imageQuizEnabled": _cache[14] || (_cache[14] = ($event) => onToggleImageQuiz($event)),
                        onSelectImageQuizAnswer: _cache[15] || (_cache[15] = ($event) => handleImageQuizAnswer($event))
                      }, null, 8, ["current-card", "image-answer", "image-answered", "image-correct", "image-quiz-enabled", "image-quiz-options", "image-quiz-selected", "image-quiz-answered"])) : unref(practiceMode) === "listening" ? (openBlock(), createBlock(_component_ListeningMode, {
                        key: 5,
                        card: currentShuffledCard.value,
                        "listening-answer": unref(listeningAnswer),
                        "onUpdate:listeningAnswer": _cache[16] || (_cache[16] = ($event) => listeningAnswer.value = $event),
                        "listening-answered": unref(listeningAnswered),
                        "listening-correct": unref(listeningCorrect),
                        "listening-quiz-enabled": unref(listeningQuizEnabled),
                        "listening-quiz-options": unref(listeningQuizOptions),
                        "listening-quiz-selected": unref(listeningQuizSelected),
                        "listening-quiz-answered": unref(listeningQuizAnswered),
                        "get-topic-name": unref(getTopicName),
                        onCheckAnswer: handleListeningAnswer,
                        onPlayAudio: unref(playAudio2),
                        onSelectListeningQuizAnswer: _cache[17] || (_cache[17] = ($event) => handleListeningQuizAnswer($event))
                      }, null, 8, ["card", "listening-answer", "listening-answered", "listening-correct", "listening-quiz-enabled", "listening-quiz-options", "listening-quiz-selected", "listening-quiz-answered", "get-topic-name", "onPlayAudio"])) : unref(practiceMode) === "pronunciation" ? (openBlock(), createBlock(_component_PronunciationMode, {
                        key: 6,
                        card: currentShuffledCard.value,
                        "is-recording": unref(isRecording),
                        "pronunciation-result": unref(pronunciationResult),
                        "pronunciation-answered": unref(pronunciationAnswered),
                        "pronunciation-correct": unref(pronunciationCorrect),
                        "is-speech-recognition-supported": unref(isSpeechRecognitionSupported),
                        "get-topic-name": unref(getTopicName),
                        onStartRecording: unref(startRecording)
                      }, null, 8, ["card", "is-recording", "pronunciation-result", "pronunciation-answered", "pronunciation-correct", "is-speech-recognition-supported", "get-topic-name", "onStartRecording"])) : unref(practiceMode) === "bubble-shooter" ? (openBlock(), createBlock(_component_BubbleShooterMode, {
                        key: 7,
                        words: currentFlashcards.value,
                        "vietnamese-mode": bubbleShooterVietnameseMode.value,
                        onGameComplete: handleBubbleShooterComplete
                      }, null, 8, ["words", "vietnamese-mode"])) : unref(practiceMode) === "snake-game" ? (openBlock(), createBlock(_component_SnakeGameMode, {
                        key: 8,
                        words: currentFlashcards.value,
                        "vietnamese-mode": bubbleShooterVietnameseMode.value,
                        "double-bait-mode": snakeDoubleBaitMode.value,
                        "record-timeline": true,
                        onGameComplete: handleSnakeGameComplete,
                        onCorrectFoodEaten: handleSnakeCorrectFoodEaten,
                        onWrongFoodEaten: handleSnakeWrongFoodEaten
                      }, null, 8, ["words", "vietnamese-mode", "double-bait-mode"])) : createCommentVNode("", true)
                    ]),
                    _: 1
                  }),
                  createVNode(_component_LazyLoadComponent, {
                    "animation-type": "slide-left",
                    threshold: 0.1,
                    "root-margin": "-50px"
                  }, {
                    default: withCtx(() => [
                      createVNode(_component_FlashcardControls, {
                        "practice-mode": unref(practiceMode),
                        "current-index": unref(currentIndex),
                        "total-cards": currentFlashcards.value.length,
                        "can-proceed": unref(getCanProceed)()[unref(practiceMode)],
                        "practice-started": practiceStarted.value,
                        "typing-answer": unref(typingAnswer),
                        "typing-answered": unref(typingAnswered),
                        "listening-answer": unref(listeningAnswer),
                        "listening-answered": unref(listeningAnswered),
                        "image-answer": unref(imageAnswer),
                        "image-answered": unref(imageAnswered),
                        onMarkDifficult: enhancedMarkDifficult,
                        onMarkEasy: enhancedMarkEasy,
                        onPreviousCard: enhancedPreviousCard,
                        onNextCard: enhancedNextCard,
                        onCheckTypingAnswer: handleTypingAnswer,
                        onCheckListeningAnswer: handleListeningAnswer,
                        onCheckImageAnswer: handleImageAnswer,
                        onExitPractice: handleExitPractice
                      }, null, 8, ["practice-mode", "current-index", "total-cards", "can-proceed", "practice-started", "typing-answer", "typing-answered", "listening-answer", "listening-answered", "image-answer", "image-answered"])
                    ]),
                    _: 1
                  }),
                  createVNode(_component_LazyLoadComponent, {
                    "animation-type": "scale",
                    threshold: 0.1,
                    "root-margin": "-50px"
                  }, {
                    default: withCtx(() => [
                      createVNode(_component_PracticeStats, {
                        stats: unref(stats),
                        mode: unref(practiceMode)
                      }, null, 8, ["stats", "mode"])
                    ]),
                    _: 1
                  })
                ])) : createCommentVNode("", true)
              ])
            ])
          ])) : createCommentVNode("", true),
          createVNode(_component_LazyLoadComponent, {
            "animation-type": "fade-up",
            threshold: 0.1,
            "root-margin": "-50px"
          }, {
            default: withCtx(() => [
              currentFlashcards.value.length === 0 ? (openBlock(), createBlock(_component_FlashcardEmptyState, {
                key: 0,
                onGoToVocabulary: unref(goToVocabulary)
              }, null, 8, ["onGoToVocabulary"])) : createCommentVNode("", true)
            ]),
            _: 1
          })
        ]),
        createVNode(_component_SettingsModal, {
          show: unref(showSettingsDialog),
          settings: unref(settings),
          "local-settings": unref(localSettings),
          "date-filter-enabled": dateFilterEnabled.value,
          "selected-date": selectedDate.value,
          "onUpdate:localSettings": _cache[18] || (_cache[18] = ($event) => localSettings.value = $event),
          onCancel: unref(cancelSettings),
          onApply: unref(applyGameSettings)
        }, null, 8, ["show", "settings", "local-settings", "date-filter-enabled", "selected-date", "onCancel", "onApply"]),
        createVNode(_component_HistoryModal, {
          show: unref(showHistory),
          history: unref(practiceHistory),
          "get-mode-color": unref(getModeColor),
          "get-mode-text": unref(getModeText),
          "format-date": unref(formatDate2),
          "format-duration": unref(formatDuration),
          onClose: _cache[19] || (_cache[19] = ($event) => showHistory.value = false),
          onOpenDetails: openHistoryDetails
        }, null, 8, ["show", "history", "get-mode-color", "get-mode-text", "format-date", "format-duration"]),
        createVNode(_component_SessionDetailModal, {
          show: showSessionDetail.value,
          details: selectedSessionDetails.value,
          onClose: _cache[20] || (_cache[20] = ($event) => showSessionDetail.value = false)
        }, null, 8, ["show", "details"]),
        createVNode(_component_CompletionModal, {
          show: unref(showCompletionModal),
          stats: unref(stats),
          "card-count": unref(flashcards).length,
          onRestart: handleRestartSession,
          onGoBack: handleCompletionGoBack
        }, null, 8, ["show", "stats", "card-count"]),
        createVNode(_component_ExitWarningModal, {
          show: showExitWarning.value,
          onContinue: continueSession,
          onConfirm: confirmExit
        }, null, 8, ["show"])
      ]);
    };
  }
});
const FlashcardView = /* @__PURE__ */ _export_sfc(_sfc_main$3, [["__scopeId", "data-v-bf2f0424"]]);
const _hoisted_1$2 = { class: "min-h-screen bg-gradient-to-br from-purple-50 to-pink-100 dark:from-gray-900 dark:to-[#0a0a0a]" };
const _hoisted_2$2 = { class: "max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8" };
const _sfc_main$2 = /* @__PURE__ */ defineComponent({
  __name: "QuizView",
  setup(__props) {
    const QuizHeader = defineAsyncComponent(
      loadComponentSafely(() => __vitePreload(() => import("./QuizHeader-bRwvgeFh.js"), true ? __vite__mapDeps([70,1]) : void 0))
    );
    const QuizProgress = defineAsyncComponent(
      loadComponentSafely(() => __vitePreload(() => import("./QuizProgress-BnDntSBo.js"), true ? __vite__mapDeps([71,1]) : void 0))
    );
    const QuizSetup = defineAsyncComponent(
      loadComponentSafely(() => __vitePreload(() => import("./QuizSetup-DDzyljJ5.js"), true ? __vite__mapDeps([72,1]) : void 0))
    );
    const QuizQuestion = defineAsyncComponent(
      loadComponentSafely(() => __vitePreload(() => import("./QuizQuestion-CcIxL0ZU.js"), true ? __vite__mapDeps([73,1]) : void 0))
    );
    const QuizResults = defineAsyncComponent(
      loadComponentSafely(() => __vitePreload(() => import("./QuizResults-CiL9dR_R.js"), true ? __vite__mapDeps([74,1]) : void 0))
    );
    const router2 = useRouter();
    const vocabularyStore = useVocabularyStore();
    const quizStarted = ref(false);
    const quizCompleted = ref(false);
    const currentQuestionIndex = ref(0);
    const selectedAnswer = ref(null);
    const userAnswers = ref([]);
    const score = ref(0);
    const timeRemaining = ref(0);
    let timer = null;
    const quizSettings = ref({
      type: "vocabulary",
      level: "",
      questionCount: "10",
      timeLimit: "10"
    });
    const questions = ref([]);
    const generateQuestionsFromVocabulary = (vocabularies2) => {
      console.log("Generating questions from", vocabularies2.length, "vocabularies");
      if (vocabularies2.length === 0) return [];
      const vocabQuestions = vocabularies2.map((vocab, index) => {
        const otherVocabs = vocabularies2.filter((v) => v.id !== vocab.id);
        let incorrectOptions = [];
        if (otherVocabs.length > 0) {
          incorrectOptions = otherVocabs.slice(0, 3).map((v) => v.meaning.split(" - ")[0]);
        }
        const genericOptions = ["Không có nghĩa", "Từ khác", "Khái niệm khác", "Nghĩa khác", "Ý nghĩa khác"];
        while (incorrectOptions.length < 3) {
          const randomGeneric = genericOptions[Math.floor(Math.random() * genericOptions.length)];
          if (!incorrectOptions.includes(randomGeneric)) {
            incorrectOptions.push(randomGeneric);
          }
        }
        const correctMeaning = vocab.meaning.split(" - ")[0];
        const allOptions = [correctMeaning, ...incorrectOptions.slice(0, 3)];
        const shuffledOptions = allOptions.sort(() => Math.random() - 0.5);
        const correctAnswer = shuffledOptions.indexOf(correctMeaning);
        return {
          id: vocab.id,
          type: "vocabulary",
          level: vocab.level,
          question: `What does "${vocab.word}" mean?`,
          options: shuffledOptions,
          correctAnswer,
          explanation: `"${vocab.word}" có nghĩa là: ${vocab.meaning}`
        };
      });
      return vocabQuestions.sort(() => Math.random() - 0.5);
    };
    const updateQuestions = () => {
      const vocabularies2 = vocabularyStore.allVocabularies.value;
      console.log("Updating questions from", vocabularies2.length, "total vocabularies");
      const filteredVocabs = vocabularies2.filter((vocab) => {
        if (quizSettings.value.level && vocab.level !== quizSettings.value.level) {
          return false;
        }
        return true;
      });
      console.log("Filtered to", filteredVocabs.length, "vocabularies for quiz");
      const generatedQuestions = generateQuestionsFromVocabulary(filteredVocabs);
      const questionCount = parseInt(quizSettings.value.questionCount);
      questions.value = generatedQuestions.slice(0, questionCount);
      console.log("Generated", questions.value.length, "questions");
    };
    const availableLevels = computed(() => {
      return vocabularyStore.getLevels.value;
    });
    const currentQuestion = computed(() => questions.value[currentQuestionIndex.value] || {});
    const progressPercentage = computed(() => (currentQuestionIndex.value + 1) / questions.value.length * 100);
    const correctAnswers = computed(() => {
      return userAnswers.value.filter((answer, index) => answer === questions.value[index].correctAnswer).length;
    });
    const accuracy = computed(() => correctAnswers.value / questions.value.length * 100);
    const startQuiz = (settings) => {
      if (settings) {
        quizSettings.value = { ...settings };
      }
      if (questions.value.length === 0) {
        updateQuestions();
      }
      if (questions.value.length === 0) {
        alert("Không có từ vựng nào để luyện tập. Vui lòng thêm từ vựng trước!");
        return;
      }
      quizStarted.value = true;
      if (quizSettings.value.timeLimit !== "0") {
        timeRemaining.value = parseInt(quizSettings.value.timeLimit) * 60;
        startTimer();
      }
      userAnswers.value = new Array(questions.value.length).fill(-1);
    };
    const startTimer = () => {
      timer = setInterval(() => {
        timeRemaining.value--;
        if (timeRemaining.value <= 0) {
          completeQuiz();
        }
      }, 1e3);
    };
    const selectAnswer = (index) => {
      selectedAnswer.value = index;
    };
    const nextQuestion = () => {
      if (selectedAnswer.value !== null) {
        userAnswers.value[currentQuestionIndex.value] = selectedAnswer.value;
        if (currentQuestionIndex.value === questions.value.length - 1) {
          completeQuiz();
        } else {
          currentQuestionIndex.value++;
          selectedAnswer.value = userAnswers.value[currentQuestionIndex.value] !== -1 ? userAnswers.value[currentQuestionIndex.value] : null;
        }
      }
    };
    const previousQuestion = () => {
      if (currentQuestionIndex.value > 0) {
        userAnswers.value[currentQuestionIndex.value] = selectedAnswer.value || -1;
        currentQuestionIndex.value--;
        selectedAnswer.value = userAnswers.value[currentQuestionIndex.value] !== -1 ? userAnswers.value[currentQuestionIndex.value] : null;
      }
    };
    const completeQuiz = () => {
      if (selectedAnswer.value !== null) {
        userAnswers.value[currentQuestionIndex.value] = selectedAnswer.value;
      }
      score.value = correctAnswers.value * 10;
      quizCompleted.value = true;
      if (timer) {
        clearInterval(timer);
      }
    };
    const restartQuiz = () => {
      quizStarted.value = false;
      quizCompleted.value = false;
      currentQuestionIndex.value = 0;
      selectedAnswer.value = null;
      userAnswers.value = [];
      score.value = 0;
      timeRemaining.value = 0;
      updateQuestions();
      if (timer) {
        clearInterval(timer);
      }
    };
    const goBack = () => {
      router2.back();
    };
    onMounted(async () => {
      const isReady = vocabularyStore.initializeStore();
      if (!isReady.value) {
        await new Promise(
          (resolve) => watch(isReady, (ready) => {
            if (ready) resolve(true);
          }, { immediate: true })
        );
      }
      updateQuestions();
      console.log("Quiz view mounted", vocabularyStore.allVocabularies.value.length, "vocabularies loaded");
    });
    watch(
      () => vocabularyStore.isStoreReady.value,
      (isReady) => {
        if (isReady) {
          updateQuestions();
        }
      },
      { immediate: true }
    );
    watch(
      () => vocabularyStore.allVocabularies.value,
      () => {
        if (vocabularyStore.isStoreReady.value) {
          updateQuestions();
        }
      },
      { deep: true }
    );
    watch(
      () => quizSettings.value,
      () => {
        updateQuestions();
      },
      { deep: true }
    );
    onUnmounted(() => {
      if (timer) {
        clearInterval(timer);
      }
    });
    return (_ctx, _cache) => {
      return openBlock(), createElementBlock("div", _hoisted_1$2, [
        createVNode(unref(QuizHeader), {
          "time-remaining": timeRemaining.value,
          score: score.value,
          onGoBack: goBack
        }, null, 8, ["time-remaining", "score"]),
        createVNode(unref(QuizProgress), {
          "current-question-index": currentQuestionIndex.value,
          "total-questions": questions.value.length,
          "progress-percentage": progressPercentage.value
        }, null, 8, ["current-question-index", "total-questions", "progress-percentage"]),
        createBaseVNode("div", _hoisted_2$2, [
          !quizStarted.value ? (openBlock(), createBlock(unref(QuizSetup), {
            key: 0,
            settings: quizSettings.value,
            "available-levels": availableLevels.value,
            onStartQuiz: startQuiz
          }, null, 8, ["settings", "available-levels"])) : !quizCompleted.value ? (openBlock(), createBlock(unref(QuizQuestion), {
            key: 1,
            question: currentQuestion.value,
            "selected-answer": selectedAnswer.value,
            "is-first-question": currentQuestionIndex.value === 0,
            "is-last-question": currentQuestionIndex.value === questions.value.length - 1,
            onSelectAnswer: selectAnswer,
            onPreviousQuestion: previousQuestion,
            onNextQuestion: nextQuestion
          }, null, 8, ["question", "selected-answer", "is-first-question", "is-last-question"])) : (openBlock(), createBlock(unref(QuizResults), {
            key: 2,
            score: score.value,
            "correct-answers": correctAnswers.value,
            "total-questions": questions.value.length,
            accuracy: Math.round(accuracy.value),
            questions: questions.value,
            "user-answers": userAnswers.value,
            onRestartQuiz: restartQuiz,
            onGoBack: goBack
          }, null, 8, ["score", "correct-answers", "total-questions", "accuracy", "questions", "user-answers"]))
        ])
      ]);
    };
  }
});
const useThemeStore = defineStore("theme", () => {
  const isDarkMode = ref(false);
  const toggleTheme = () => {
    isDarkMode.value = !isDarkMode.value;
    applyTheme();
    saveThemeToStorage();
  };
  const setTheme = (dark) => {
    isDarkMode.value = dark;
    applyTheme();
    saveThemeToStorage();
  };
  const applyTheme = () => {
    const html = document.documentElement;
    if (isDarkMode.value) {
      html.classList.add("dark");
      html.style.colorScheme = "dark";
    } else {
      html.classList.remove("dark");
      html.style.colorScheme = "light";
    }
  };
  const saveThemeToStorage = () => {
    localStorage.setItem("theme", isDarkMode.value ? "dark" : "light");
  };
  const loadThemeFromStorage = () => {
    const savedTheme = localStorage.getItem("theme");
    if (savedTheme) {
      isDarkMode.value = savedTheme === "dark";
    } else {
      isDarkMode.value = window.matchMedia("(prefers-color-scheme: dark)").matches;
    }
    applyTheme();
  };
  const initTheme = () => {
    loadThemeFromStorage();
    const mediaQuery = window.matchMedia("(prefers-color-scheme: dark)");
    mediaQuery.addEventListener("change", (e) => {
      if (!localStorage.getItem("theme")) {
        isDarkMode.value = e.matches;
        applyTheme();
      }
    });
  };
  const currentTheme = () => isDarkMode.value ? "dark" : "light";
  const themeIcon = () => isDarkMode.value ? "🌙" : "☀️";
  const themeLabel = () => isDarkMode.value ? "Chế độ tối" : "Chế độ sáng";
  return {
    // State
    isDarkMode,
    // Actions
    toggleTheme,
    setTheme,
    initTheme,
    // Getters
    currentTheme,
    themeIcon,
    themeLabel
  };
});
const _hoisted_1$1 = { class: "max-w-4xl mx-auto space-y-8" };
const _hoisted_2$1 = { class: "grid grid-cols-1 md:grid-cols-2 gap-6" };
const _hoisted_3$1 = { class: "bg-white dark:bg-black rounded-xl shadow-md overflow-hidden border border-gray-200 dark:border-gray-700" };
const _hoisted_4$1 = { class: "p-6" };
const _hoisted_5$1 = { class: "mt-4" };
const _hoisted_6$1 = { class: "flex items-center space-x-2" };
const _hoisted_7 = { class: "px-2 py-1 bg-blue-100 dark:bg-blue-900 text-blue-800 dark:text-blue-200 text-xs font-medium rounded-full" };
const _sfc_main$1 = /* @__PURE__ */ defineComponent({
  __name: "TailwindTest",
  setup(__props) {
    const themeStore2 = useThemeStore();
    return (_ctx, _cache) => {
      return openBlock(), createElementBlock("div", _hoisted_1$1, [
        _cache[5] || (_cache[5] = createBaseVNode("div", { class: "text-center" }, [
          createBaseVNode("h1", { class: "text-4xl font-bold text-gray-900 dark:text-white mb-4" }, " Tailwind CSS & Dark Mode Test "),
          createBaseVNode("p", { class: "text-lg text-gray-600 dark:text-gray-300" }, " Test các component với chế độ sáng/tối ")
        ], -1)),
        createBaseVNode("div", _hoisted_2$1, [
          _cache[4] || (_cache[4] = createStaticVNode('<div class="bg-white dark:bg-gray-800 rounded-xl shadow-md overflow-hidden border border-gray-200 dark:border-gray-700"><div class="p-6"><div class="uppercase tracking-wide text-sm text-indigo-500 dark:text-indigo-400 font-semibold"> Tailwind CSS </div><h2 class="block mt-1 text-lg leading-tight font-medium text-gray-900 dark:text-white"> Dark Mode Support </h2><p class="mt-2 text-gray-500 dark:text-gray-400"> Tailwind CSS đã được cấu hình với dark mode sử dụng màu đen. </p><div class="mt-4 space-x-2"><button class="bg-blue-500 hover:bg-blue-600 dark:bg-blue-600 dark:hover:bg-blue-700 text-white font-medium py-2 px-4 rounded-lg transition-colors"> Primary Button </button><button class="bg-gray-200 hover:bg-gray-300 dark:bg-gray-700 dark:hover:bg-gray-600 text-gray-900 dark:text-white font-medium py-2 px-4 rounded-lg transition-colors"> Secondary Button </button></div></div></div>', 1)),
          createBaseVNode("div", _hoisted_3$1, [
            createBaseVNode("div", _hoisted_4$1, [
              _cache[1] || (_cache[1] = createBaseVNode("div", { class: "uppercase tracking-wide text-sm text-green-500 dark:text-green-400 font-semibold" }, " Pinia Store ", -1)),
              _cache[2] || (_cache[2] = createBaseVNode("h2", { class: "block mt-1 text-lg leading-tight font-medium text-gray-900 dark:text-white" }, " Theme Management ", -1)),
              _cache[3] || (_cache[3] = createBaseVNode("p", { class: "mt-2 text-gray-500 dark:text-gray-400" }, " Sử dụng Pinia để quản lý state của theme. ", -1)),
              createBaseVNode("div", _hoisted_5$1, [
                createBaseVNode("div", _hoisted_6$1, [
                  _cache[0] || (_cache[0] = createBaseVNode("span", { class: "text-sm text-gray-600 dark:text-gray-300" }, "Current theme:", -1)),
                  createBaseVNode("span", _hoisted_7, toDisplayString(unref(themeStore2).currentTheme()), 1)
                ])
              ])
            ])
          ])
        ]),
        _cache[6] || (_cache[6] = createStaticVNode('<div class="bg-white dark:bg-black rounded-xl shadow-md p-6 border border-gray-200 dark:border-gray-700"><h3 class="text-lg font-medium text-gray-900 dark:text-white mb-4">Form Elements</h3><div class="grid grid-cols-1 md:grid-cols-2 gap-4"><div><label class="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2"> Text Input </label><input type="text" placeholder="Enter text..." class="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-md bg-white dark:bg-gray-800 text-gray-900 dark:text-white placeholder-gray-500 dark:placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500 dark:focus:ring-blue-400 transition-colors"></div><div><label class="block text-sm font-medium text-gray-700 dark:text-dark-text-secondary mb-2"> Select </label><select class="w-full px-3 py-2 border border-gray-300 dark:border-dark-border rounded-md bg-white dark:bg-dark-surface text-gray-900 dark:text-dark-text-primary focus:outline-none focus:ring-2 focus:ring-blue-500 dark:focus:ring-blue-400 transition-colors"><option>Option 1</option><option>Option 2</option><option>Option 3</option></select></div></div></div><div class="bg-white dark:bg-black rounded-xl shadow-md p-6 border border-gray-200 dark:border-gray-700"><h3 class="text-lg font-medium text-gray-900 dark:text-white mb-4">Color Palette</h3><div class="grid grid-cols-2 md:grid-cols-4 gap-4"><div class="text-center"><div class="w-16 h-16 bg-blue-500 dark:bg-blue-600 rounded-lg mx-auto mb-2"></div><span class="text-sm text-gray-600 dark:text-gray-300">Blue</span></div><div class="text-center"><div class="w-16 h-16 bg-green-500 dark:bg-green-600 rounded-lg mx-auto mb-2"></div><span class="text-sm text-gray-600 dark:text-gray-300">Green</span></div><div class="text-center"><div class="w-16 h-16 bg-red-500 dark:bg-red-600 rounded-lg mx-auto mb-2"></div><span class="text-sm text-gray-600 dark:text-gray-300">Red</span></div><div class="text-center"><div class="w-16 h-16 bg-purple-500 dark:bg-purple-600 rounded-lg mx-auto mb-2"></div><span class="text-sm text-gray-600 dark:text-gray-300">Purple</span></div></div></div>', 2))
      ]);
    };
  }
});
const _hoisted_1 = { class: "min-h-screen bg-gray-50 dark:bg-black flex flex-col justify-center py-12 sm:px-6 lg:px-8" };
const _hoisted_2 = { class: "sm:mx-auto sm:w-full sm:max-w-md" };
const _hoisted_3 = { class: "text-center" };
const _hoisted_4 = { class: "mt-8 space-y-4" };
const _hoisted_5 = { class: "text-center" };
const _hoisted_6 = { class: "mt-4 flex justify-center space-x-6" };
const _sfc_main = /* @__PURE__ */ defineComponent({
  __name: "NotFoundView",
  setup(__props) {
    const router2 = useRouter();
    const goBack = () => {
      router2.back();
    };
    const goHome = () => {
      router2.push("/dashboard");
    };
    return (_ctx, _cache) => {
      const _component_router_link = resolveComponent("router-link");
      return openBlock(), createElementBlock("div", _hoisted_1, [
        createBaseVNode("div", _hoisted_2, [
          createBaseVNode("div", _hoisted_3, [
            _cache[7] || (_cache[7] = createStaticVNode('<div class="mx-auto h-24 w-24 flex items-center justify-center rounded-full bg-red-100 dark:bg-red-900"><svg class="h-12 w-12 text-red-600 dark:text-red-300" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-2.5L13.732 4c-.77-.833-1.964-.833-2.732 0L3.732 16.5c-.77.833.192 2.5 1.732 2.5z"></path></svg></div><h1 class="mt-6 text-6xl font-bold text-gray-900 dark:text-white">404</h1><h2 class="mt-4 text-3xl font-bold text-gray-900 dark:text-white">Không tìm thấy trang</h2><p class="mt-2 text-lg text-gray-600 dark:text-gray-300"> Xin lỗi, chúng tôi không thể tìm thấy trang bạn đang tìm kiếm. </p>', 4)),
            createBaseVNode("div", _hoisted_4, [
              createBaseVNode("div", { class: "flex justify-center space-x-4" }, [
                createBaseVNode("button", {
                  onClick: goBack,
                  class: "bg-gray-500 hover:bg-gray-600 text-white font-medium py-2 px-4 rounded-lg transition-colors"
                }, _cache[0] || (_cache[0] = [
                  createBaseVNode("svg", {
                    class: "w-5 h-5 inline mr-2",
                    fill: "currentColor",
                    viewBox: "0 0 20 20"
                  }, [
                    createBaseVNode("path", {
                      "fill-rule": "evenodd",
                      d: "M12.707 5.293a1 1 0 010 1.414L9.414 10l3.293 3.293a1 1 0 01-1.414 1.414l-4-4a1 1 0 010-1.414l4-4a1 1 0 011.414 0z",
                      "clip-rule": "evenodd"
                    })
                  ], -1),
                  createTextVNode(" Quay lại ")
                ])),
                createBaseVNode("button", {
                  onClick: goHome,
                  class: "bg-blue-500 hover:bg-blue-600 text-white font-medium py-2 px-4 rounded-lg transition-colors"
                }, _cache[1] || (_cache[1] = [
                  createBaseVNode("svg", {
                    class: "w-5 h-5 inline mr-2",
                    fill: "currentColor",
                    viewBox: "0 0 20 20"
                  }, [
                    createBaseVNode("path", { d: "M10.707 2.293a1 1 0 00-1.414 0l-7 7a1 1 0 001.414 1.414L4 10.414V17a1 1 0 001 1h2a1 1 0 001-1v-2a1 1 0 011-1h2a1 1 0 011 1v2a1 1 0 001 1h2a1 1 0 001-1v-6.586l.293.293a1 1 0 001.414-1.414l-7-7z" })
                  ], -1),
                  createTextVNode(" Về trang chủ ")
                ]))
              ]),
              createBaseVNode("div", _hoisted_5, [
                _cache[6] || (_cache[6] = createBaseVNode("p", { class: "text-sm text-gray-500 dark:text-gray-400" }, " Hoặc thử các liên kết hữu ích dưới đây: ", -1)),
                createBaseVNode("div", _hoisted_6, [
                  createVNode(_component_router_link, {
                    to: "/vocabulary",
                    class: "text-blue-600 hover:text-blue-500 dark:text-blue-400 dark:hover:text-blue-300 text-sm font-medium"
                  }, {
                    default: withCtx(() => _cache[2] || (_cache[2] = [
                      createTextVNode(" Từ vựng ")
                    ])),
                    _: 1,
                    __: [2]
                  }),
                  createVNode(_component_router_link, {
                    to: "/grammar",
                    class: "text-blue-600 hover:text-blue-500 dark:text-blue-400 dark:hover:text-blue-300 text-sm font-medium"
                  }, {
                    default: withCtx(() => _cache[3] || (_cache[3] = [
                      createTextVNode(" Ngữ pháp ")
                    ])),
                    _: 1,
                    __: [3]
                  }),
                  createVNode(_component_router_link, {
                    to: "/practice/flashcard",
                    class: "text-blue-600 hover:text-blue-500 dark:text-blue-400 dark:hover:text-blue-300 text-sm font-medium"
                  }, {
                    default: withCtx(() => _cache[4] || (_cache[4] = [
                      createTextVNode(" Luyện tập ")
                    ])),
                    _: 1,
                    __: [4]
                  }),
                  createVNode(_component_router_link, {
                    to: "/test",
                    class: "text-blue-600 hover:text-blue-500 dark:text-blue-400 dark:hover:text-blue-300 text-sm font-medium"
                  }, {
                    default: withCtx(() => _cache[5] || (_cache[5] = [
                      createTextVNode(" Test Tailwind ")
                    ])),
                    _: 1,
                    __: [5]
                  })
                ])
              ])
            ])
          ])
        ])
      ]);
    };
  }
});
const router = createRouter({
  history: createWebHashHistory("/web-english/"),
  routes: [
    {
      path: "/",
      redirect: "/dashboard"
    },
    {
      path: "/dashboard",
      name: "dashboard",
      component: _sfc_main$9
    },
    {
      path: "/vocabulary",
      name: "vocabulary-list",
      component: _sfc_main$7
    },
    {
      path: "/grammar",
      name: "grammar-list",
      component: GrammarListView
    },
    {
      path: "/grammar/:id",
      name: "grammar-detail",
      component: GrammarDetailView
    },
    {
      path: "/grammar/:id/practice",
      name: "grammar-practice",
      component: _sfc_main$4
    },
    {
      path: "/practice/flashcard",
      name: "practice-flashcard",
      component: FlashcardView
    },
    {
      path: "/practice/quiz",
      name: "practice-quiz",
      component: _sfc_main$2
    },
    {
      path: "/test",
      name: "tailwind-test",
      component: _sfc_main$1
    },
    {
      path: "/:pathMatch(.*)*",
      name: "NotFound",
      component: _sfc_main
    }
  ]
});
const common$2 = { "easy": "Easy", "difficult": "Difficult", "reviewed": "Reviewed", "correct": "Correct", "incorrect": "Incorrect", "cancel": "Cancel", "apply": "Apply", "back": "Back", "restart": "Practice Again", "vocabulary": "Vocabulary", "grammar": "Grammar", "practice": "Practice", "dashboard": "Dashboard", "save": "Save", "saving": "Saving...", "update": "Update", "delete": "Delete", "edit": "Edit", "add": "Add", "search": "Search", "all": "All", "title": "Title", "previous": "Previous", "next": "Next", "minutes": "minutes", "finish": "Finish", "close": "Close", "confirm": "Confirm", "reset": "Reset", "resetToDefault": "Reset to Default", "actions": "Actions", "backToTop": "Back to Top", "backToTopTooltip": "Back to Top ({percent}%)" };
const vocabulary$2 = { "title": "Vocabulary", "description": "Manage and learn English vocabulary", "header": { "title": "Vocabulary" }, "addNew": "Add New Word", "addWord": "Add Word", "addVocabulary": "Add New Vocabulary", "editVocabulary": "Edit Vocabulary", "saveVocabulary": "Save Vocabulary", "deleteVocabulary": "Delete Vocabulary", "vocabularyList": "Vocabulary List", "word": "Word", "pronunciation": "Pronunciation", "meaning": "Meaning", "category": "Category", "level": "Level", "wordType": "Word Type", "note": "Note", "favorite": "Favorite", "isFavorite": "Mark as favorite vocabulary", "showFavoritesOnly": "Show favorites only", "searchPlaceholder": "Search vocabulary...", "wordPlaceholder": "Enter word...", "meaningPlaceholder": "Enter word meaning...", "example": "Example", "examplePlaceholder": "Enter example sentence...", "synonyms": "Synonyms", "antonyms": "Antonyms", "separateByComma": "Separate by comma", "notePlaceholder": "Additional notes about this word...", "selectCategory": "Select category", "selectLevel": "Select level", "selectWordType": "Select word type", "confirmDelete": 'Are you sure you want to delete "{word}"?', "confirmDeleteTitle": "Confirm Delete", "confirmDeleteMessage": "Are you sure you want to delete this vocabulary? This action cannot be undone.", "updateInfo": "Update vocabulary information", "vocabInfo": "Vocabulary Information", "updateSuccess": "Vocabulary has been updated successfully.", "addSuccess": "Vocabulary added successfully!", "deleteSuccess": 'Deleted "{word}" successfully.', "words": "words", "createdAt": "Created at", "updatedAt": "Updated at", "grouping": { "title": "Group by Date", "description": "Display vocabulary grouped by creation date", "hoverToExpand": "Hover to Expand", "hoverDescription": "Open categories on hover when enabled" }, "notes": { "title": "Vocabulary Notes", "description": "Manage notes for vocabulary words learned today", "manageNotes": "Manage Notes", "noteLabel": "Notes for vocabulary", "placeholder": "Write your notes about this vocabulary learning session...", "wordsLearned": "Words in this group", "noWordsLearned": "No vocabulary words in this group", "saveSuccess": "Notes saved successfully!", "autoSaveNotice": "Auto-save enabled. Your notes will be included in the next backup.", "today": "Today", "yesterday": "Yesterday" }, "filters": { "title": "Filters" }, "lazyLoading": { "loading": "Loading...", "componentVisible": "Component is now visible", "componentHidden": "Component is hidden" }, "accordion": { "expand": "Expand group", "collapse": "Collapse group", "addTopic": "Add Topic", "editTopic": "Edit Topic", "topicPlaceholder": "Enter topic for this group...", "saveTopic": "Save Topic", "cancelTopic": "Cancel" }, "sameTopicDatesTitle": "Dates with same topic", "sameTopicDatesEmpty": "No other dates found for this topic", "sameTopicDatesAria": "Show dates with same topic", "notFound": "Vocabulary not found!", "updateError": "An error occurred while updating vocabulary. Please try again.", "deleteError": "An error occurred while deleting vocabulary. Please try again.", "showingResults": "Showing {start} to {end} of {total} results", "showingDateGroups": "Showing {start} to {end} of {total} date groups", "showingCategoryItems": "Showing {start} to {end} of {total} items", "categories": { "technology": "Technology", "business": "Business", "travel": "Travel", "food": "Food", "health": "Health", "education": "Education", "sports": "Sports", "entertainment": "Entertainment", "science": "Science", "art": "Art", "music": "Music", "literature": "Literature", "politics": "Politics", "environment": "Environment", "fashion": "Fashion", "finance": "Finance" }, "levels": { "beginner": "Beginner", "intermediate": "Intermediate", "advanced": "Advanced" }, "wordTypes": { "noun": "Noun", "verb": "Verb", "adjective": "Adjective", "adverb": "Adverb", "preposition": "Preposition", "conjunction": "Conjunction", "interjection": "Interjection" }, "image": { "title": "Image", "upload": "Upload", "url": "URL", "clickToUpload": "Click to upload", "orDragDrop": " or drag and drop here", "supportedFormats": "PNG, JPG, GIF, WebP up to 5MB", "urlPlaceholder": "Paste image URL from the internet...", "loadFromUrl": "Load from URL", "loading": "Loading...", "preview": "Image preview", "change": "Change", "changeUrl": "Change URL", "remove": "Remove", "fromUrl": "From URL", "processing": "Processing...", "errors": { "unsupportedFormat": "Unsupported file format. Please choose PNG, JPG, GIF or WebP.", "fileTooLarge": "File too large. Please choose a file under 5MB.", "processingFailed": "Unable to process image. Please try again.", "emptyUrl": "Please enter an image URL.", "invalidUrl": "Invalid URL or not an image.", "urlLoadFailed": "Unable to load image from URL. Please check the URL again.", "corsWarning": "Image accepted but may not display due to the original website's security settings." } }, "imageInfo": { "title": "Missing images", "none": "All vocabulary have images", "date": "Date", "category": "Category", "missingCount": "{count} without image", "aria": "Show info about missing images" }, "save": { "title": "Save & Sync", "mode": "Save Mode:", "auto": "Auto", "manual": "Manual", "saveNow": "Save Now", "chooseAutoFile": "Choose Auto-save File", "setup": "Setup", "changeAutoFile": "Change Auto-save File", "change": "Change", "importFile": "Import File", "importShort": "Import", "lastSave": "Last saved: {time}", "notSaved": "Not saved", "autoSaveFileSetup": "Auto-save file setup successfully!", "autoSaveRetry": "Click here to select a new auto-save file", "status": { "saving": "Saving...", "autoSaving": "Auto-saving...", "autoWithFile": "Auto (file saved)", "autoLocalStorage": "Auto (localStorage)", "autoFile": "Auto (file)", "autoNoFile": "Auto (no file selected)", "fileSaved": "File saved", "error": "Save error" }, "errors": { "browserNotSupported": "Browser doesn't support this feature. Please use Chrome or Edge.", "fileSelectError": "Error selecting file: {error}", "invalidFile": "Please select a valid JSON file!", "invalidFormat": "Invalid file format", "autoSaveFileFailed": "Auto-save to file failed. Please select a new file.", "permissionDenied": "Permission to write to file denied. Please select a new file." }, "import": { "confirmMessage": 'Do you want to import {count} vocabulary from file "{filename}"?\n\nCurrent data will be replaced!', "successMessage": "Successfully imported {count} vocabulary!" } }, "validation": { "wordRequired": "Word is required", "wordTooShort": "Word must be at least 1 character", "wordTooLong": "Word must be less than 100 characters", "meaningRequired": "Meaning is required", "meaningTooShort": "Meaning must be at least 1 character", "meaningTooLong": "Meaning must be less than 500 characters", "partOfSpeechRequired": "Part of speech is required", "categoryRequired": "Category is required", "levelRequired": "Level is required", "exampleTooLong": "Example must be less than 500 characters", "notesTooLong": "Notes must be less than 500 characters", "pronunciationTooLong": "Pronunciation must be less than 100 characters", "synonymsInvalid": "Please enter valid synonyms separated by commas", "antonymsInvalid": "Please enter valid antonyms separated by commas", "saveError": "Error saving vocabulary. Please try again.", "saveSuccess": "Vocabulary saved successfully!", "updateSuccess": "Vocabulary updated successfully!" }, "details": { "title": "Vocabulary Details", "playAudio": "Play vocabulary audio", "playExample": "Play example audio", "addFavorite": "Add to favorites", "removeFavorite": "Remove from favorites" }, "moveMode": { "title": "Move Mode", "active": "Active - Click arrows to move words", "inactive": "Inactive", "moveVocabulary": "Move Vocabulary", "movingWord": "Moving word", "movingCategory": "Moving all words in category", "wordsWillBeMoved": "words will be moved to the selected date", "selectTargetDate": "Select target date", "moveToDateGroup": "Move to another date group", "moveToDate": "Move to Date", "moveWord": "Move Word", "moveAll": "Move All", "moveSuccess": "Successfully moved {count} word(s) to {date}", "moveError": "Failed to move vocabulary", "moveAutoSaveNotice": "Word moved and will be included in auto-save", "batchMoveSuccess": "Successfully moved {count} words to {date}", "batchMoveError": "Failed to move category", "filterBySameTopic": "Filter by same topic", "noMatchingDates": "No dates with vocabularies in the same topic" }, "topicManager": { "title": "Topic Manager", "addNewTopic": "Add New Topic", "editTopic": "Edit Topic", "topicKey": "Topic Key", "topicKeyPlaceholder": "Example: cooking, programming...", "keyDescription": "This key will be used in the system. Use only lowercase letters, numbers and underscores.", "vietnameseName": "Vietnamese Name", "vietnameseNamePlaceholder": "Ví dụ: Nấu ăn, Lập trình...", "englishName": "English Name", "englishNamePlaceholder": "Example: Cooking, Programming...", "existingTopics": "Existing Topics", "noCustomTopics": "No custom topics yet.", "cannotDeleteInUse": "Cannot delete topic in use", "confirmDeleteTitle": "Confirm Delete Topic", "confirmDeleteMessage": 'Are you sure you want to delete topic "{topic}"?', "duplicateKey": "Topic key already exists!", "builtInTopics": "Built-in Topics", "builtInTopicsDescription": "The system has 16 built-in topics like Technology, Business, Travel... You can add custom topics here.", "builtIn": "Built-in", "manageTopics": "Manage Topics" } };
const flashcard$2 = { "header": { "history": "History", "settings": "Settings", "progress": "Progress", "description": "Practice vocabulary with flashcards", "exit": "Exit", "selectMode": "Select mode" }, "empty": { "title": "No flashcards", "description": "Add vocabulary to start practicing.", "action": "Add Vocabulary" }, "settings": { "title": "Flashcard Settings", "category": "Category", "level": "Level", "all": "All", "beginner": "Beginner", "intermediate": "Intermediate", "advanced": "Advanced", "autoFlip": "Auto flip card after 3 seconds", "shuffle": "Shuffle order", "shuffle_disabled_during_practice": "Shuffle is disabled during practice", "disabledDuringPractice": "Settings are disabled during practice" }, "history": { "title": "Practice History", "empty": { "title": "No history", "description": "Start practicing to see your history." }, "totalCards": "Total cards", "correct": "Correct", "incorrect": "Incorrect", "duration": "Duration", "categories": "Categories", "accuracy": "Accuracy", "result": "Result", "pass": "Pass", "fail": "Fail", "viewDetails": "View details", "noDetails": "No details available", "details": { "title": "Session Details", "noData": "No details available for this session", "yourAnswer": "Your answer", "noAnswer": "No answer", "correctAnswer": "Correct answer" } }, "completion": { "title": "Completed!", "description": "You have completed {count} flashcards.", "correct": "Correct", "incorrect": "Incorrect", "accuracy": "Accuracy", "result": "Result" }, "modes": { "flashcard": "Flashcard", "quiz": "Quiz", "typing": "Typing", "listening": "Listening", "image": "Image", "pictionary": "Pictionary", "bubbleShooter": "Bubble Shooter", "snakeGame": "Snake Hunt", "pronunciation": "Pronunciation", "change_disabled_during_practice": "Mode change is disabled during practice", "selectMode": "Select mode", "mode": "Mode" }, "image": { "imageAlt": "Vocabulary image", "imageError": "Cannot load image", "noImage": "No image available", "placeholder": "Type the word...", "instruction": "Look at the image and type the corresponding word:", "correctAnswer": "Correct answer", "unavailable": "Image mode is unavailable for the selected date", "quizToggle": "Multiple Choice" }, "pictionary": { "imageAlt": "Pictionary image", "instruction": "Click the boxes and type to fill in the missing letters. Press Enter to check.", "unavailable": "Pictionary mode is unavailable for the selected date" }, "bubbleShooter": { "title": "Bubble Shooter", "instruction": "Shoot bubbles to match 4 or more words!", "score": "Score", "currentWord": "Current Word", "gameComplete": "Game Complete!", "finalScore": "Final Score: {score}", "wordsMatched": "Words Matched: {count}", "playAgain": "Play Again" }, "snakeGame": { "title": "Snake Hunt", "instruction": "Guide the snake to eat the foods with matching first letters!", "score": "Score", "currentWord": "Current Word", "gameComplete": "Game Complete!", "finalScore": "Final Score: {score}", "wordsEaten": "Words Eaten: {count}", "playAgain": "Play Again", "gameOver": "Game Over!" }, "listening": { "instruction": "Listen and type the word you hear:", "placeholder": "Type the word you hear...", "correct": "✓ Correct!", "incorrect": "✗ Correct answer:", "quizToggle": "Multiple Choice" }, "typing": { "quizToggle": "Multiple Choice" }, "dateFilter": { "enable": "Filter by creation date", "allDates": "All dates", "info": "Showing {count} vocabulary from {date}" } };
const grammar$2 = { "title": "Grammar", "description": "Learn and practice English grammar", "addLesson": "Add Lesson", "addNewLesson": "Add New Lesson", "editLesson": "Edit Lesson", "deleteLesson": "Delete Lesson", "confirmDelete": 'Are you sure you want to delete the lesson "{title}"?', "search": "Search grammar lessons...", "level": "Level", "category": "Category", "duration": "minutes", "durationLabel": "Duration (minutes)", "progress": "Progress", "continue": "Continue", "start": "Start", "emptyState": { "title": "No lessons found", "description": "Try changing your filters or add a new lesson." }, "levels": { "beginner": "Beginner", "intermediate": "Intermediate", "advanced": "Advanced" }, "manager": { "title": "Grammar Manager", "manageGrammar": "Manage Grammar", "addNew": "Add New Grammar Rule", "editGrammar": "Edit Grammar Rule", "existingRules": "Grammar Rules", "category": "Category", "level": "Level", "formula": "Grammar Formula", "description": "Description", "examples": "Examples", "titlePlaceholder": "e.g., Present Perfect Tense", "formulaPlaceholder": "e.g., Subject + have/has + past participle", "descriptionPlaceholder": "Explain how and when to use this grammar rule...", "examplePlaceholder": "e.g., I have studied English for 5 years.", "selectCategory": "Select Category", "selectLevel": "Select Level", "addExample": "Add Example", "removeExample": "Remove Example", "noRulesYet": "No grammar rules added yet", "createdAt": "Created", "lastModified": "Last Modified", "confirmDelete": "Are you sure you want to delete this grammar rule?", "ruleAdded": "Grammar rule added successfully", "ruleUpdated": "Grammar rule updated successfully", "ruleDeleted": "Grammar rule deleted successfully", "globalMode": "Global", "perDateMode": "Per Date", "perDateDescription": "Managing grammar rules for date: {date}", "noDateSelected": "No date selected for per-date mode", "showVocabulary": "Show Vocabulary", "vocabularyForDate": "Vocabulary for {date}", "noVocabularyFound": "No vocabulary found for this date" }, "categories": { "tenses": "Tenses", "conditionals": "Conditionals", "passive": "Passive Voice", "modals": "Modal Verbs", "articles": "Articles", "prepositions": "Prepositions", "conjunctions": "Conjunctions", "other": "Other" }, "selectCategory": "Select category", "selectLevel": "Select level", "titlePlaceholder": "Enter lesson title...", "descriptionPlaceholder": "Enter a brief description of the lesson...", "lessonContent": "Lesson Content", "theory": "Theory", "theoryPlaceholder": "Enter the theory content of the lesson...", "structure": "Structure", "structurePlaceholder": "Enter the grammar structure...", "examples": "Examples", "examplePlaceholder": "Example {index}", "translationPlaceholder": "Translation {index}", "addExample": "Add Example", "usageRules": "Usage Rules", "ruleTitlePlaceholder": "Rule title {index}", "ruleDescriptionPlaceholder": "Rule description {index}", "addRule": "Add Rule", "commonMistakes": "Common Mistakes", "wrongSentencePlaceholder": "Wrong sentence {index}", "correctSentencePlaceholder": "Correct sentence {index}", "explanationPlaceholder": "Explanation {index}", "addMistake": "Add Common Mistake", "markdownSupported": "Basic Markdown formatting is supported.", "practice": { "title": "Grammar Practice", "subtitle": "Choose an exercise type to practice", "chooseExercise": "Choose Exercise Type", "chooseDescription": "Select an exercise type to start practicing", "score": "Score", "question": "Question", "checkAnswer": "Check Answer", "next": "Next", "finish": "Finish", "explanation": "Explanation", "reading": { "passage": "Passage", "readingTime": "Reading Time", "questions": "Questions", "showHighlights": "Show Highlights" }, "exercises": { "checkAnswer": "Check Answer", "next": "Next", "multiple-choice": { "title": "Multiple Choice", "description": "Choose the correct answer from multiple options" }, "fill-blank": { "title": "Fill in the Blanks", "description": "Complete sentences with the correct words" }, "pronunciation": { "title": "Pronunciation", "description": "Practice speaking and pronunciation" }, "reading": { "title": "Reading Comprehension", "description": "Read passages and answer questions", "passage": "Passage", "listen": "Listen", "readingTime": "Reading Time", "questions": "Questions", "true": "True", "false": "False", "yourAnswer": "Your Answer", "correctAnswer": "Correct Answer", "correct": "Correct", "incorrect": "Incorrect", "accuracy": "Accuracy", "showHighlights": "Show Highlights", "hideHighlights": "Hide Highlights" }, "listening": { "title": "Listening", "description": "Listen to audio and answer questions", "instruction": "Listen to the audio and answer the questions:", "speed": "Speed", "playsLeft": "Plays Left", "loading": "Loading...", "questions": "Questions", "audioUrl": "Audio URL", "audioUrlPlaceholder": "Enter audio file URL or YouTube URL...", "maxPlays": "Maximum Plays", "allowNotes": "Allow Notes", "transcript": "Transcript", "transcriptPlaceholder": "Enter audio transcript...", "question": "Question", "multipleChoice": "Multiple Choice", "fillBlank": "Fill in the Blank", "ordering": "Ordering", "addQuestion": "Add Question", "correctAnswerPlaceholder": "Enter correct answer...", "notesAllowed": "Notes Allowed", "takeNotes": "Take Notes", "notesPlaceholder": "Write your notes here...", "correct": "Correct", "incorrect": "Incorrect", "accuracy": "Accuracy", "showTranscript": "Show Transcript", "correctAnswer": "Correct Answer", "audioUrlHint": "Enter direct audio URL or YouTube video URL", "youtubeDetected": "YouTube URL detected", "youtubeNote": "Audio will be extracted from this YouTube video for listening practice" }, "writing": { "title": "Writing", "description": "Write essays and get feedback", "instruction": "Write a paragraph about the following topic:", "essay": "Essay", "email": "Email", "letter": "Letter", "paragraph": "Paragraph", "requirements": "Requirements", "minWords": "Minimum Words", "timeLimit": "Time Limit", "yourResponse": "Your Response", "words": "words", "timeRemaining": "Time Remaining", "paragraphPlaceholder": "Enter your paragraph here...", "essayPlaceholder": "Write your essay here...", "emailPlaceholder": "Write your email here...", "letterPlaceholder": "Write your letter here...", "tips": "Writing Tips", "showTips": "Show Tips", "hideTips": "Hide Tips", "tip1": "Use varied sentence structures", "tip2": "Check grammar and spelling", "tip3": "Use connecting words to link ideas", "tip4": "Ensure your writing has introduction, body, and conclusion", "tip5": "Use vocabulary appropriate to the topic", "saveDraft": "Save Draft", "clear": "Clear", "confirmClear": "Are you sure you want to clear all content?", "submit": "Submit", "analyzing": "Analyzing...", "feedback": "Feedback", "overallScore": "Overall Score", "grammar": "Grammar", "vocabulary": "Vocabulary", "coherence": "Coherence", "taskResponse": "Task Response", "strengths": "Strengths", "improvements": "Areas for Improvement", "corrections": "Specific Corrections", "original": "Original", "corrected": "Corrected", "explanation": "Explanation" } }, "fillBlank": { "instruction": "Fill in the blanks with appropriate words:", "clear": "Clear All" }, "pronunciation": { "instruction": "Listen and repeat the following sentence:", "listen": "Listen", "ready": "Ready", "recording": "Recording...", "recorded": "Recorded", "processing": "Processing...", "analyze": "Analyze", "feedback": "Feedback", "tips": "Tips", "tryAgain": "Try Again", "yourRecording": "Your Recording", "microphoneError": "Microphone error! Please check microphone access permissions." }, "settings": { "title": "Exercise Settings", "difficulty": "Difficulty", "autoPlay": "Auto-play Audio", "autoplayAudio": "Auto-play Audio", "showExplanations": "Show Explanations", "timeLimit": "Time Limit (minutes)", "questionCount": "Number of Questions", "close": "Close", "save": "Save Settings", "levels": { "easy": "Easy", "medium": "Medium", "hard": "Hard" } }, "exerciseManager": { "title": "Exercise Manager", "addNew": "Add New Exercise", "existing": "Existing Exercises", "exerciseType": "Exercise Type", "typePlaceholder": "Enter exercise type...", "titlePlaceholder": "Enter exercise title...", "description": "Description", "descriptionPlaceholder": "Enter exercise description...", "difficulty": "Difficulty", "duration": "Duration", "durationPlaceholder": "e.g. 10-15 minutes", "add": "Add Exercise", "manageQuestions": "Manage Questions" }, "questionManager": { "title": "Question Manager", "addNew": "Add New Question", "editQuestion": "Edit Question", "addQuestion": "Add Question", "existingQuestions": "Existing Questions", "noQuestions": "No questions yet", "addFirstQuestion": "Add your first question", "question": "Question", "questionPlaceholder": "Enter question...", "options": "Options", "optionPlaceholder": "Enter option...", "correctAnswer": "Correct Answer", "explanation": "Explanation", "explanationPlaceholder": "Enter explanation...", "taskType": "Writing Type", "prompt": "Prompt", "promptPlaceholder": "Enter writing prompt...", "requirements": "Requirements", "addRequirement": "Add Requirement", "requirementPlaceholder": "Enter requirement...", "minWords": "Min Words", "timeLimit": "Time Limit (minutes)", "selectCorrectAnswer": "Select Correct Answer" }, "progress": { "question": "Question", "of": "of", "score": "Score", "timeRemaining": "Time Remaining" }, "results": { "title": "Exercise Results", "score": "Your Score", "correct": "Correct", "total": "Total", "accuracy": "Accuracy", "timeSpent": "Time Spent", "tryAgain": "Try Again", "backToMenu": "Back to Menu", "reviewAnswers": "Review Answers" }, "common": { "submit": "Submit", "next": "Next", "previous": "Previous", "finish": "Finish", "check": "Check Answer", "checkAnswer": "Check Answer", "showAnswer": "Show Answer", "explanation": "Explanation", "hint": "Hint", "loading": "Loading...", "noAnswer": "No answer provided", "correct": "Correct!", "incorrect": "Incorrect", "skip": "Skip", "retry": "Retry" } } };
const categories$2 = { "technology": "Technology", "business": "Business", "travel": "Travel", "food": "Food", "health": "Health", "education": "Education", "sports": "Sports", "entertainment": "Entertainment", "science": "Science", "art": "Art", "music": "Music", "literature": "Literature", "politics": "Politics", "environment": "Environment", "fashion": "Fashion", "finance": "Finance" };
const dashboard$2 = { "title": "Dashboard", "description": "Overview of your learning progress", "quickActions": "Quick Actions", "recentActivity": "Recent Activity", "stats": { "vocabularyLearned": "Vocabulary Learned", "grammarLessons": "Grammar Lessons", "currentStreak": "Current Streak", "totalTime": "Total Time", "days": "days", "hours": "hours" }, "actions": { "addVocabulary": "Add Vocabulary", "practiceFlashcard": "Practice Flashcard", "takeQuiz": "Take Quiz", "learnGrammar": "Learn Grammar" }, "activity": { "updated": 'Updated vocabulary "{word}" - {category}', "added": 'Added vocabulary "{word}" - {category}', "justNow": "Just now", "noActivity": "No vocabulary activity yet", "addFirstVocab": "Add your first vocabulary!" } };
const app$3 = { "title": "English Learning App", "titleShort": "English App" };
const time$2 = { "today": "Today", "yesterday": "Yesterday", "ago": { "justNow": "Just now", "minutesAgo": "{minutes} minutes ago", "hoursAgo": "{hours} hours ago", "daysAgo": "{days} days ago", "yesterday": "Yesterday" } };
const practice$2 = { "controls": { "next": "Next", "complete": "Complete", "difficult": "Difficult", "easy": "Easy", "exit": "Exit" }, "timer": { "startPractice": "Start Practice", "timeLimit": "Time limit per question: {seconds} seconds", "timeUp": "Time's Up!", "timeUpMessage": "You've run out of time for this question. Try again or skip.", "tryAgain": "Try Again", "skip": "Skip" }, "exitWarning": { "title": "Exit Practice Warning", "message": "You are currently in a practice session. If you leave now, you will lose your progress and score. Are you sure you want to exit?", "continue": "Continue Practice", "exit": "Exit Practice" } };
const quiz$2 = { "progress": { "question": "Question" }, "setup": { "title": "Quiz Settings", "description": "Customize your quiz preferences", "type": "Quiz Type", "level": "Difficulty Level", "questionCount": "Number of Questions", "timeLimit": "Time Limit (minutes)", "start": "Start Quiz", "allLevels": "All Levels", "unlimited": "Unlimited" }, "types": { "vocabulary": "Vocabulary", "grammar": "Grammar", "mixed": "Mixed" }, "navigation": { "previous": "Previous", "next": "Next", "finish": "Finish" }, "results": { "completed": "Quiz Completed!", "yourResults": "Your Results", "score": "Score", "correct": "Correct", "accuracy": "Accuracy", "passed": "Passed", "failed": "Failed", "above": "Above", "below": "Below", "reviewAnswers": "Review Answers", "correctAnswer": "Correct Answer", "yourAnswer": "Your Answer", "noAnswer": "No Answer", "explanation": "Explanation", "restartQuiz": "Restart Quiz" } };
const voice$2 = { "selector": { "title": "Voice Selection" }, "gender": { "female": "Female", "male": "Male" }, "types": { "female_sweet": "Sweet Female", "female_clear": "Clear Female", "female_professional": "Professional Female", "male_strong": "Strong Male", "male_gentle": "Gentle Male", "male_deep": "Deep Male", "korean_female": "Korean Female", "korean_male": "Korean Male" }, "info": { "name": "Voice Name", "language": "Language", "gender": "Gender" }, "test": "Test Voice", "testing": "Testing...", "testText": "Hello! This is a voice test.", "testTextKorean": "안녕하세요! 이것은 음성 테스트입니다.", "settings": { "title": "Voice Settings", "rate": "Rate", "pitch": "Pitch", "volume": "Volume" } };
const en = {
  common: common$2,
  vocabulary: vocabulary$2,
  flashcard: flashcard$2,
  grammar: grammar$2,
  categories: categories$2,
  dashboard: dashboard$2,
  app: app$3,
  time: time$2,
  practice: practice$2,
  quiz: quiz$2,
  voice: voice$2
};
const common$1 = { "easy": "Dễ", "difficult": "Khó", "reviewed": "Đã xem", "correct": "Đúng", "incorrect": "Sai", "cancel": "Hủy", "back": "Quay lại", "restart": "Luyện tập lại", "vocabulary": "Từ vựng", "grammar": "Ngữ pháp", "practice": "Luyện tập", "dashboard": "Trang chủ", "save": "Lưu", "saving": "Đang lưu...", "update": "Cập nhật", "delete": "Xóa", "edit": "Sửa", "add": "Thêm", "search": "Tìm kiếm", "all": "Tất cả", "title": "Tiêu đề", "previous": "Trước", "next": "Tiếp", "minutes": "phút", "finish": "Hoàn thành", "close": "Đóng", "confirm": "Xác nhận", "reset": "Đặt lại", "apply": "Áp dụng", "resetToDefault": "Về mặc định", "actions": "Thao tác", "backToTop": "Lên đầu trang", "backToTopTooltip": "Lên đầu trang ({percent}%)", "checking": "Đang kiểm tra..." };
const levels = { "beginner": "Cơ bản", "intermediate": "Trung cấp", "advanced": "Nâng cao" };
const vocabulary$1 = /* @__PURE__ */ JSON.parse('{"title":"Từ vựng","description":"Quản lý và học từ vựng tiếng Anh","header":{"title":"Từ vựng"},"addNew":"Thêm từ mới","addWord":"Thêm từ","addVocabulary":"Thêm từ vựng mới","editVocabulary":"Chỉnh sửa từ vựng","saveVocabulary":"Lưu từ vựng","deleteVocabulary":"Xóa từ vựng","vocabularyList":"Danh sách từ vựng","word":"Từ vựng","pronunciation":"Phát âm","meaning":"Nghĩa","category":"Chủ đề","level":"Mức độ","wordType":"Từ loại","note":"Ghi chú","favorite":"Yêu thích","isFavorite":"Đánh dấu là từ vựng yêu thích","showFavoritesOnly":"Chỉ hiển thị từ vựng yêu thích","searchPlaceholder":"Tìm từ vựng...","wordPlaceholder":"Nhập từ vựng...","meaningPlaceholder":"Nhập nghĩa của từ...","example":"Ví dụ","examplePlaceholder":"Nhập câu ví dụ...","synonyms":"Từ đồng nghĩa","antonyms":"Từ trái nghĩa","separateByComma":"Cách nhau bằng dấu phẩy","notePlaceholder":"Ghi chú thêm về từ này...","selectCategory":"Chọn chủ đề","selectLevel":"Chọn mức độ","selectWordType":"Chọn từ loại","confirmDelete":"Bạn có chắc chắn muốn xóa từ \\"{word}\\"?","confirmDeleteTitle":"Xác nhận xóa","confirmDeleteMessage":"Bạn có chắc chắn muốn xóa từ vựng này? Hành động này không thể hoàn tác.","updateInfo":"Cập nhật thông tin từ vựng","vocabInfo":"Thông tin từ vựng","updateSuccess":"Từ vựng đã được cập nhật thành công.","addSuccess":"Thêm từ vựng thành công!","deleteSuccess":"Đã xóa \\"{word}\\" thành công.","moveSuccess":"Đã di chuyển \\"{word}\\" thành công đến {date}","moveError":"Không thể di chuyển \\"{word}\\": {error}","moveAutoSaveNotice":"Từ đã được di chuyển và sẽ được lưu tự động","moveVocabulary":"Di chuyển từ vựng","selectDate":"Chọn một ngày","selectTargetDateGroup":"Chọn nhóm ngày đích","showingDatesWithSameTopic":"Chỉ hiển thị các ngày có cùng chủ đề","movingWord":"Đang di chuyển từ","movingCategory":"Di chuyển tất cả từ trong chủ đề","wordsWillBeMoved":"từ sẽ được di chuyển đến ngày đã chọn","filterBySameTopic":"Lọc theo cùng chủ đề","topic":"Chủ đề","words":"từ","createdAt":"Tạo lúc","updatedAt":"Cập nhật","grouping":{"title":"Nhóm theo ngày","description":"Hiển thị từ vựng được nhóm theo ngày tạo","hoverToExpand":"Di chuột để mở rộng","hoverDescription":"Mở danh mục khi di chuột qua (khi bật)"},"notes":{"title":"Ghi chú từ vựng","description":"Quản lý ghi chú cho các từ vựng đã học","manageNotes":"Quản lý ghi chú","noteLabel":"Ghi chú cho từ vựng","placeholder":"Viết ghi chú về buổi học từ vựng này của bạn...","wordsLearned":"Các từ trong nhóm này","noWordsLearned":"Chưa có từ vựng nào trong nhóm này","saveSuccess":"Đã lưu ghi chú thành công!","autoSaveNotice":"Đã bật lưu tự động. Ghi chú của bạn sẽ được đưa vào bản sao lưu tiếp theo.","today":"Hôm nay","yesterday":"Hôm qua","grammarCheck":"Bật kiểm tra ngữ pháp (tiếng Anh)","preview":"Xem trước với gợi ý ngữ pháp","grammarDisclaimer":"Kiểm tra ngữ pháp sử dụng LanguageTool (public API) và có thể bị giới hạn tần suất.","grammarError":"Kiểm tra ngữ pháp thất bại. Vui lòng thử lại sau.","lt":{"spelling":"Có thể có lỗi chính tả.","grammar":"Lỗi ngữ pháp","punctuation":"Lỗi chấm câu","style":"Lỗi phong cách","typographical":"Lỗi đánh máy","suggestion":"Gợi ý"}},"lazyLoading":{"loading":"Đang tải...","componentVisible":"Thành phần hiện đã hiển thị","componentHidden":"Thành phần đã ẩn"},"accordion":{"expand":"Mở rộng nhóm","collapse":"Thu gọn nhóm","addTopic":"Thêm chủ đề","editTopic":"Sửa chủ đề","topicPlaceholder":"Nhập chủ đề cho nhóm này...","saveTopic":"Lưu chủ đề","cancelTopic":"Hủy"},"sameTopicDatesTitle":"Các ngày có cùng chủ đề","sameTopicDatesEmpty":"Không tìm thấy ngày nào khác cho chủ đề này","sameTopicDatesAria":"Hiển thị các ngày có cùng chủ đề","notFound":"Không tìm thấy từ vựng!","updateError":"Có lỗi xảy ra khi cập nhật từ vựng. Vui lòng thử lại.","deleteError":"Có lỗi xảy ra khi xóa từ vựng. Vui lòng thử lại.","showingResults":"Hiển thị {start} đến {end} của {total} kết quả","showingDateGroups":"Hiển thị {start} đến {end} của {total} nhóm ngày","showingCategoryItems":"Hiển thị {start} đến {end} của {total} mục","categories":{"technology":"Công nghệ","business":"Kinh doanh","travel":"Du lịch","food":"Ẩm thực","health":"Sức khỏe","education":"Giáo dục","sports":"Thể thao","entertainment":"Giải trí","science":"Khoa học","art":"Nghệ thuật","music":"Âm nhạc","literature":"Văn học","politics":"Chính trị","environment":"Môi trường","fashion":"Thời trang","finance":"Tài chính"},"levels":{"beginner":"Cơ bản","intermediate":"Trung cấp","advanced":"Nâng cao"},"wordTypes":{"noun":"Danh từ (noun)","verb":"Động từ (verb)","adjective":"Tính từ (adjective)","adverb":"Trạng từ (adverb)","preposition":"Giới từ (preposition)","conjunction":"Liên từ (conjunction)","interjection":"Thán từ (interjection)"},"image":{"title":"Hình ảnh","upload":"Tải lên","url":"URL","clickToUpload":"Nhấp để tải lên","orDragDrop":" hoặc kéo thả tại đây","supportedFormats":"PNG, JPG, GIF, WebP tối đa 5MB","urlPlaceholder":"Dán URL hình ảnh từ internet...","loadFromUrl":"Tải từ URL","loading":"Đang tải...","preview":"Xem trước hình ảnh","change":"Thay đổi","changeUrl":"Đổi URL","remove":"Xóa","fromUrl":"Từ URL","processing":"Đang xử lý...","errors":{"unsupportedFormat":"Định dạng file không được hỗ trợ. Vui lòng chọn PNG, JPG, GIF hoặc WebP.","fileTooLarge":"File quá lớn. Vui lòng chọn file dưới 5MB.","processingFailed":"Không thể xử lý hình ảnh. Vui lòng thử lại.","emptyUrl":"Vui lòng nhập URL hình ảnh.","invalidUrl":"URL không hợp lệ hoặc không phải là hình ảnh.","urlLoadFailed":"Không thể tải hình ảnh từ URL. Vui lòng kiểm tra lại.","corsWarning":"Hình ảnh đã được chấp nhận nhưng có thể không hiển thị do bảo mật website gốc."}},"imageInfo":{"title":"Thiếu hình ảnh","none":"Tất cả từ vựng đều có hình ảnh","date":"Ngày","category":"Chủ đề","missingCount":"{count} không có ảnh","aria":"Hiển thị thông tin về các từ thiếu hình ảnh"},"filters":{"title":"Bộ lọc"},"save":{"title":"Lưu & Đồng bộ","mode":"Chế độ lưu:","auto":"Tự động","manual":"Thủ công","saveNow":"Lưu ngay","chooseAutoFile":"Chọn file auto-save","setup":"Thiết lập","changeAutoFile":"Đổi file auto-save","change":"Đổi","importFile":"Nhập file","importShort":"Nhập","lastSave":"Lần cuối: {time}","notSaved":"Chưa lưu","autoSaveFileSetup":"Thiết lập file lưu tự động thành công!","autoSaveRetry":"Nhấp vào đây để chọn file lưu tự động mới","status":{"saving":"Đang lưu...","autoSaving":"Đang lưu tự động...","autoWithFile":"Tự động (đã lưu file)","autoLocalStorage":"Tự động (localStorage)","autoFile":"Tự động (file)","autoNoFile":"Tự động (chưa chọn file)","fileSaved":"Đã lưu file","error":"Lỗi lưu"},"errors":{"browserNotSupported":"Trình duyệt không hỗ trợ tính năng này. Vui lòng sử dụng Chrome hoặc Edge.","fileSelectError":"Lỗi khi chọn file: {error}","invalidFile":"Vui lòng chọn file JSON hợp lệ!","invalidFormat":"Định dạng file không hợp lệ","autoSaveFileFailed":"Lưu tự động vào file thất bại. Vui lòng chọn file mới.","permissionDenied":"Quyền ghi vào file bị từ chối. Vui lòng chọn file mới."},"import":{"confirmMessage":"Bạn có muốn nhập {count} từ vựng từ file \\"{filename}\\"?\\n\\nDữ liệu hiện tại sẽ được thay thế!","successMessage":"Đã nhập thành công {count} từ vựng!"}},"validation":{"wordRequired":"Từ vựng là bắt buộc","wordTooShort":"Từ vựng phải có ít nhất 1 ký tự","wordTooLong":"Từ vựng phải ít hơn 100 ký tự","meaningRequired":"Nghĩa của từ là bắt buộc","meaningTooShort":"Nghĩa của từ phải có ít nhất 1 ký tự","meaningTooLong":"Nghĩa của từ phải ít hơn 500 ký tự","partOfSpeechRequired":"Loại từ là bắt buộc","categoryRequired":"Danh mục là bắt buộc","levelRequired":"Cấp độ là bắt buộc","exampleTooLong":"Ví dụ phải ít hơn 500 ký tự","notesTooLong":"Ghi chú phải ít hơn 500 ký tự","pronunciationTooLong":"Phiên âm phải ít hơn 100 ký tự","synonymsInvalid":"Vui lòng nhập từ đồng nghĩa hợp lệ, ngăn cách bằng dấu phẩy","antonymsInvalid":"Vui lòng nhập từ trái nghĩa hợp lệ, ngăn cách bằng dấu phẩy","saveError":"Có lỗi khi lưu từ vựng. Vui lòng thử lại.","saveSuccess":"Lưu từ vựng thành công!","updateSuccess":"Cập nhật từ vựng thành công!"},"details":{"title":"Chi tiết từ vựng","playAudio":"Phát âm thanh từ vựng","playExample":"Phát âm thanh ví dụ","addFavorite":"Thêm vào yêu thích","removeFavorite":"Xóa khỏi yêu thích"},"moveMode":{"title":"Chế độ di chuyển","active":"Đang bật - Nhấn mũi tên để di chuyển từ","inactive":"Không hoạt động","moveVocabulary":"Di chuyển từ vựng","movingWord":"Đang di chuyển từ","movingCategory":"Di chuyển tất cả từ trong chủ đề","wordsWillBeMoved":"từ sẽ được di chuyển đến ngày đã chọn","selectTargetDate":"Chọn ngày đích","moveToDateGroup":"Di chuyển đến nhóm ngày khác","moveToDate":"Di chuyển đến ngày","moveWord":"Di chuyển từ","moveAll":"Di chuyển tất cả","moveSuccess":"Đã di chuyển thành công {count} từ đến {date}","moveError":"Lỗi khi di chuyển từ vựng","moveAutoSaveNotice":"Từ đã di chuyển và sẽ được tự động lưu","batchMoveSuccess":"Đã di chuyển thành công {count} từ đến {date}","batchMoveError":"Lỗi khi di chuyển chủ đề","filterBySameTopic":"Lọc theo cùng chủ đề","noMatchingDates":"Không có ngày nào chứa từ vựng cùng chủ đề"},"topicManager":{"title":"Quản lý chủ đề","editTopic":"Sửa chủ đề","addNewTopic":"Thêm chủ đề mới","topicKey":"Mã chủ đề","topicKeyPlaceholder":"Ví dụ: cooking, programming...","keyDescription":"Mã này sẽ được sử dụng trong hệ thống. Chỉ dùng chữ thường, số và dấu gạch dưới.","vietnameseName":"Tên tiếng Việt","vietnameseNamePlaceholder":"Ví dụ: Nấu ăn, Lập trình...","englishName":"Tên tiếng Anh","englishNamePlaceholder":"Ví dụ: Cooking, Programming...","existingTopics":"Chủ đề hiện có","noCustomTopics":"Chưa có chủ đề tùy chỉnh nào.","cannotDeleteInUse":"Không thể xóa chủ đề đang được sử dụng","confirmDeleteTitle":"Xác nhận xóa chủ đề","confirmDeleteMessage":"Bạn có chắc chắn muốn xóa chủ đề \\"{topic}\\"?","duplicateKey":"Mã chủ đề đã tồn tại!","builtInTopics":"Chủ đề có sẵn","builtInTopicsDescription":"Hệ thống có 16 chủ đề có sẵn như Công nghệ, Kinh doanh, Du lịch... Bạn có thể thêm chủ đề tùy chỉnh tại đây.","builtIn":"Có sẵn","manageTopics":"Quản lý chủ đề"},"flashcard":{"header":{"history":"Lịch sử","settings":"Cài đặt","progress":"Tiến độ","description":"Luyện tập từ vựng với thẻ ghi nhớ","exit":"Thoát"},"topicKey":"Mã chủ đề","topicKeyPlaceholder":"Ví dụ: cooking, programming...","keyDescription":"Mã này sẽ được dùng trong hệ thống. Chỉ dùng chữ thường, số và dấu gạch dưới.","vietnameseName":"Tên tiếng Việt","vietnameseNamePlaceholder":"Ví dụ: Nấu ăn, Lập trình...","englishName":"Tên tiếng Anh","englishNamePlaceholder":"Example: Cooking, Programming...","existingTopics":"Chủ đề hiện có","noCustomTopics":"Chưa có chủ đề tùy chỉnh nào.","cannotDeleteInUse":"Không thể xóa chủ đề đang được sử dụng","confirmDeleteTitle":"Xác nhận xóa chủ đề","confirmDeleteMessage":"Bạn có chắc chắn muốn xóa chủ đề \\"{topic}\\"?","duplicateKey":"Mã chủ đề đã tồn tại!","builtInTopics":"Chủ đề có sẵn","builtInTopicsDescription":"Hệ thống có sẵn 16 chủ đề cơ bản như Technology, Business, Travel... Bạn có thể thêm chủ đề tùy chỉnh ở đây.","builtIn":"Có sẵn","manageTopics":"Quản lý chủ đề"}}');
const flashcard$1 = { "header": { "history": "Lịch sử", "settings": "Cài đặt", "progress": "Tiến độ", "description": "Luyện tập từ vựng với thẻ ghi nhớ", "exit": "Thoát", "selectMode": "Chọn chế độ" }, "empty": { "title": "Không có flashcard nào", "description": "Hãy thêm từ vựng để bắt đầu luyện tập.", "action": "Thêm từ vựng" }, "settings": { "title": "Cài đặt Flashcard", "category": "Chủ đề", "level": "Mức độ", "all": "Tất cả", "beginner": "Cơ bản", "intermediate": "Trung cấp", "advanced": "Nâng cao", "autoFlip": "Tự động lật thẻ sau 3 giây", "shuffle": "Xáo trộn thứ tự", "shuffle_disabled_during_practice": "Không thể xáo trộn trong quá trình luyện tập", "disabledDuringPractice": "Cài đặt bị vô hiệu hóa trong quá trình luyện tập" }, "history": { "title": "Lịch sử luyện tập", "empty": { "title": "Chưa có lịch sử", "description": "Bắt đầu luyện tập để xem lịch sử của bạn." }, "totalCards": "Tổng số thẻ", "correct": "Đúng", "incorrect": "Sai", "duration": "Thời gian", "categories": "Chủ đề", "accuracy": "Độ chính xác", "result": "Kết quả", "pass": "Đạt", "fail": "Chưa đạt", "viewDetails": "Xem chi tiết", "noDetails": "Không có chi tiết", "details": { "title": "Chi tiết phiên luyện tập", "noData": "Không có chi tiết cho phiên luyện tập này", "yourAnswer": "Câu trả lời của bạn", "noAnswer": "Chưa trả lời", "correctAnswer": "Đáp án đúng" } }, "completion": { "title": "Hoàn thành!", "description": "Bạn đã hoàn thành {count} flashcard.", "correct": "Đúng", "incorrect": "Sai", "accuracy": "Độ chính xác", "result": "Kết quả" }, "modes": { "flashcard": "Thẻ ghi nhớ", "quiz": "Trắc nghiệm", "typing": "Gõ từ", "listening": "Nghe", "image": "Nhìn ảnh", "pictionary": "Đuổi hình bắt chữ", "bubbleShooter": "Bắn bóng từ vựng", "snakeGame": "Rắn săn từ", "pronunciation": "Phát âm", "change_disabled_during_practice": "Không thể thay đổi chế độ trong quá trình luyện tập", "selectMode": "Chọn chế độ", "mode": "Chế độ" }, "image": { "imageAlt": "Hình ảnh từ vựng", "imageError": "Không thể tải hình ảnh", "noImage": "Không có hình ảnh", "placeholder": "Nhập từ vựng...", "instruction": "Nhìn vào hình ảnh và nhập từ vựng tương ứng:", "correctAnswer": "Đáp án đúng", "unavailable": "Chế độ nhìn ảnh không khả dụng cho ngày đã chọn", "quizToggle": "Trắc nghiệm" }, "pictionary": { "imageAlt": "Hình ảnh đuổi hình bắt chữ", "instruction": "Nhấp vào các ô và gõ để điền các chữ cái còn thiếu. Nhấn Enter để kiểm tra.", "unavailable": "Chế độ đuổi hình bắt chữ không khả dụng cho ngày đã chọn" }, "bubbleShooter": { "title": "Bắn Bóng Từ Vựng", "instruction": "Bắn những quả bóng để ghép 4 từ giống nhau trở lên!", "score": "Điểm", "currentWord": "Từ Hiện Tại", "gameComplete": "Hoàn Thành Game!", "finalScore": "Điểm Cuối: {score}", "wordsMatched": "Từ Đã Ghép: {count}", "playAgain": "Chơi Lại" }, "snakeGame": { "title": "Rắn Săn Từ", "instruction": "Điều khiển rắn ăn những thức ăn có chữ cái đầu phù hợp!", "score": "Điểm", "currentWord": "Từ Hiện Tại", "gameComplete": "Hoàn Thành Game!", "finalScore": "Điểm Cuối: {score}", "wordsEaten": "Từ Đã Ăn: {count}", "playAgain": "Chơi Lại", "gameOver": "Game Over!" }, "listening": { "instruction": "Nghe và nhập từ bạn nghe được:", "placeholder": "Nhập từ bạn nghe được...", "correct": "✓ Chính xác!", "incorrect": "✗ Đáp án đúng:", "quizToggle": "Trắc nghiệm" }, "typing": { "quizToggle": "Trắc nghiệm" }, "dateFilter": { "enable": "Lọc theo ngày tạo", "allDates": "Tất cả ngày", "info": "Hiển thị {count} từ vựng từ {date}" } };
const grammar$1 = { "title": "Ngữ pháp", "description": "Học và luyện tập ngữ pháp tiếng Anh", "addLesson": "Thêm bài học", "addNewLesson": "Thêm bài học mới", "editLesson": "Sửa bài học", "deleteLesson": "Xóa bài học", "confirmDelete": 'Bạn có chắc chắn muốn xóa bài học "{title}"?', "search": "Tìm bài học ngữ pháp...", "level": "Mức độ", "category": "Chủ đề", "duration": "phút", "durationLabel": "Thời lượng (phút)", "progress": "Tiến độ", "continue": "Tiếp tục", "start": "Bắt đầu", "emptyState": { "title": "Không tìm thấy bài học nào", "description": "Hãy thử thay đổi bộ lọc hoặc thêm bài học mới." }, "levels": { "beginner": "Cơ bản", "intermediate": "Trung cấp", "advanced": "Nâng cao" }, "manager": { "title": "Quản lý ngữ pháp", "manageGrammar": "Quản lý ngữ pháp", "addNew": "Thêm quy tắc ngữ pháp mới", "editGrammar": "Sửa quy tắc ngữ pháp", "existingRules": "Quy tắc ngữ pháp", "category": "Chủ đề", "level": "Mức độ", "formula": "Công thức ngữ pháp", "description": "Mô tả", "examples": "Ví dụ", "titlePlaceholder": "vd: Thì hiện tại hoàn thành", "formulaPlaceholder": "vd: Chủ ngữ + have/has + quá khứ phân từ", "descriptionPlaceholder": "Giải thích cách và khi nào sử dụng quy tắc ngữ pháp này...", "examplePlaceholder": "vd: Tôi đã học tiếng Anh được 5 năm.", "selectCategory": "Chọn chủ đề", "selectLevel": "Chọn mức độ", "addExample": "Thêm ví dụ", "removeExample": "Xóa ví dụ", "noRulesYet": "Chưa có quy tắc ngữ pháp nào", "createdAt": "Tạo lúc", "lastModified": "Sửa lần cuối", "confirmDelete": "Bạn có chắc chắn muốn xóa quy tắc ngữ pháp này?", "ruleAdded": "Đã thêm quy tắc ngữ pháp thành công", "ruleUpdated": "Đã cập nhật quy tắc ngữ pháp thành công", "ruleDeleted": "Đã xóa quy tắc ngữ pháp thành công", "globalMode": "Chung", "perDateMode": "Theo ngày", "perDateDescription": "Đang quản lý quy tắc ngữ pháp cho ngày: {date}", "noDateSelected": "Chưa chọn ngày cho chế độ theo ngày", "showVocabulary": "Hiển thị từ vựng", "vocabularyForDate": "Từ vựng ngày {date}", "noVocabularyFound": "Không tìm thấy từ vựng nào cho ngày này" }, "categories": { "tenses": "Thì", "conditionals": "Câu điều kiện", "passive": "Câu bị động", "modals": "Động từ khuyết thiếu", "articles": "Mạo từ", "prepositions": "Giới từ", "conjunctions": "Liên từ", "other": "Khác" }, "selectCategory": "Chọn chủ đề", "selectLevel": "Chọn mức độ", "titlePlaceholder": "Nhập tiêu đề bài học...", "descriptionPlaceholder": "Nhập mô tả ngắn về bài học...", "lessonContent": "Nội dung bài học", "theory": "Lý thuyết", "theoryPlaceholder": "Nhập nội dung lý thuyết của bài học...", "structure": "Cấu trúc", "structurePlaceholder": "Nhập cấu trúc ngữ pháp...", "examples": "Ví dụ", "examplePlaceholder": "Ví dụ {index}", "translationPlaceholder": "Dịch nghĩa {index}", "addExample": "Thêm ví dụ", "usageRules": "Quy tắc sử dụng", "ruleTitlePlaceholder": "Tiêu đề quy tắc {index}", "ruleDescriptionPlaceholder": "Mô tả quy tắc {index}", "addRule": "Thêm quy tắc", "commonMistakes": "Lỗi thường gặp", "wrongSentencePlaceholder": "Câu sai {index}", "correctSentencePlaceholder": "Câu đúng {index}", "explanationPlaceholder": "Giải thích {index}", "addMistake": "Thêm lỗi thường gặp", "markdownSupported": "Hỗ trợ định dạng Markdown cơ bản.", "practice": { "title": "Luyện tập ngữ pháp", "subtitle": "Chọn loại bài tập để luyện tập", "chooseExercise": "Chọn loại bài tập", "chooseDescription": "Chọn một loại bài tập để bắt đầu luyện tập", "score": "Điểm", "question": "Câu hỏi", "checkAnswer": "Kiểm tra đáp án", "next": "Tiếp theo", "finish": "Hoàn thành", "explanation": "Giải thích", "reading": { "passage": "Đoạn văn", "readingTime": "Thời gian đọc", "questions": "Câu hỏi", "showHighlights": "Hiển thị đánh dấu" }, "exercises": { "checkAnswer": "Kiểm tra đáp án", "next": "Tiếp theo", "multiple-choice": { "title": "Trắc nghiệm", "description": "Chọn đáp án đúng từ nhiều lựa chọn" }, "fill-blank": { "title": "Điền vào chỗ trống", "description": "Hoàn thành câu với từ đúng" }, "pronunciation": { "title": "Phát âm", "description": "Luyện tập nói và phát âm" }, "reading": { "title": "Đọc hiểu", "description": "Đọc đoạn văn và trả lời câu hỏi", "passage": "Đoạn văn", "listen": "Nghe", "readingTime": "Thời gian đọc", "questions": "Câu hỏi", "true": "Đúng", "false": "Sai", "yourAnswer": "Câu trả lời của bạn", "correctAnswer": "Câu trả lời đúng", "correct": "Đúng", "incorrect": "Sai", "accuracy": "Độ chính xác", "showHighlights": "Hiển thị đánh dấu", "hideHighlights": "Ẩn đánh dấu" }, "listening": { "title": "Nghe", "description": "Nghe audio và trả lời câu hỏi", "instruction": "Nghe đoạn audio và trả lời câu hỏi:", "speed": "Tốc độ", "playsLeft": "Lượt nghe còn lại", "loading": "Đang tải...", "questions": "Câu hỏi", "audioUrl": "URL âm thanh", "audioUrlPlaceholder": "Nhập đường dẫn file âm thanh...", "maxPlays": "Số lần nghe tối đa", "allowNotes": "Cho phép ghi chú", "transcript": "Bản ghi âm", "transcriptPlaceholder": "Nhập nội dung bản ghi âm...", "question": "Câu hỏi", "multipleChoice": "Trắc nghiệm", "fillBlank": "Điền vào chỗ trống", "ordering": "Sắp xếp thứ tự", "addQuestion": "Thêm câu hỏi", "correctAnswerPlaceholder": "Nhập đáp án đúng...", "notesAllowed": "Cho phép ghi chú", "takeNotes": "Ghi chú", "notesPlaceholder": "Viết ghi chú của bạn ở đây...", "correct": "Đúng", "incorrect": "Sai", "accuracy": "Độ chính xác", "showTranscript": "Hiện bản ghi âm", "correctAnswer": "Đáp án đúng", "audioUrlHint": "Nhập URL âm thanh trực tiếp hoặc URL video YouTube", "youtubeDetected": "Phát hiện URL YouTube", "youtubeNote": "Âm thanh sẽ được trích xuất từ video YouTube này để luyện nghe" }, "writing": { "title": "Luyện viết", "description": "Viết bài luận và nhận phản hồi", "instruction": "Viết một đoạn văn về chủ đề sau:", "essay": "Bài luận", "email": "Email", "letter": "Thư", "paragraph": "Đoạn văn", "requirements": "Yêu cầu", "minWords": "Số từ tối thiểu", "timeLimit": "Thời gian giới hạn", "yourResponse": "Câu trả lời của bạn", "words": "từ", "timeRemaining": "Thời gian còn lại", "paragraphPlaceholder": "Nhập đoạn văn của bạn ở đây...", "essayPlaceholder": "Viết bài luận của bạn ở đây...", "emailPlaceholder": "Viết email của bạn ở đây...", "letterPlaceholder": "Viết thư của bạn ở đây...", "tips": "Mẹo viết", "showTips": "Hiển thị mẹo", "hideTips": "Ẩn mẹo", "tip1": "Sử dụng cấu trúc câu đa dạng", "tip2": "Kiểm tra ngữ pháp và chính tả", "tip3": "Sử dụng từ nối để liên kết ý tưởng", "tip4": "Đảm bảo bài viết có mở bài, thân bài và kết luận", "tip5": "Sử dụng từ vựng phù hợp với chủ đề", "saveDraft": "Lưu nháp", "clear": "Xóa", "confirmClear": "Bạn có chắc chắn muốn xóa toàn bộ nội dung?", "submit": "Nộp bài", "analyzing": "Đang phân tích...", "feedback": "Phản hồi", "overallScore": "Điểm tổng thể", "grammar": "Ngữ pháp", "vocabulary": "Từ vựng", "coherence": "Tính mạch lạc", "taskResponse": "Phản hồi chủ đề", "strengths": "Điểm mạnh", "improvements": "Cần cải thiện", "corrections": "Sửa lỗi cụ thể", "original": "Gốc", "corrected": "Đã sửa", "explanation": "Giải thích" } }, "fillBlank": { "instruction": "Điền từ thích hợp vào chỗ trống:", "clear": "Xóa tất cả" }, "pronunciation": { "instruction": "Nghe và lặp lại câu sau:", "listen": "Nghe", "ready": "Sẵn sàng", "recording": "Đang ghi âm...", "recorded": "Đã ghi âm", "processing": "Đang xử lý...", "analyze": "Phân tích", "feedback": "Phản hồi", "tips": "Mẹo", "tryAgain": "Thử lại", "yourRecording": "Bản ghi âm của bạn", "microphoneError": "Lỗi microphone! Vui lòng kiểm tra quyền truy cập microphone." }, "settings": { "title": "Cài đặt bài tập", "difficulty": "Độ khó", "autoPlay": "Tự động phát âm thanh", "autoplayAudio": "Tự động phát âm thanh", "showExplanations": "Hiển thị giải thích", "timeLimit": "Giới hạn thời gian (phút)", "questionCount": "Số câu hỏi", "close": "Đóng", "save": "Lưu cài đặt", "levels": { "easy": "Dễ", "medium": "Trung bình", "hard": "Khó" } }, "exerciseManager": { "title": "Quản lý bài tập", "addNew": "Thêm bài tập mới", "existing": "Bài tập hiện có", "exerciseType": "Loại bài tập", "typePlaceholder": "Nhập loại bài tập...", "titlePlaceholder": "Nhập tiêu đề bài tập...", "description": "Mô tả", "descriptionPlaceholder": "Nhập mô tả bài tập...", "difficulty": "Độ khó", "duration": "Thời lượng", "durationPlaceholder": "Ví dụ: 10-15 phút", "add": "Thêm bài tập", "manageQuestions": "Quản lý đề bài" }, "questionManager": { "title": "Quản lý đề bài", "addNew": "Thêm đề bài mới", "editQuestion": "Sửa đề bài", "addQuestion": "Thêm đề bài", "existingQuestions": "Đề bài hiện có", "noQuestions": "Chưa có đề bài nào", "addFirstQuestion": "Hãy thêm đề bài đầu tiên", "question": "Câu hỏi", "questionPlaceholder": "Nhập câu hỏi...", "options": "Các lựa chọn", "optionPlaceholder": "Nhập lựa chọn...", "correctAnswer": "Đáp án đúng", "explanation": "Giải thích", "explanationPlaceholder": "Nhập giải thích...", "taskType": "Loại bài viết", "prompt": "Đề bài", "promptPlaceholder": "Nhập đề bài viết...", "requirements": "Yêu cầu", "addRequirement": "Thêm yêu cầu", "requirementPlaceholder": "Nhập yêu cầu...", "minWords": "Số từ tối thiểu", "timeLimit": "Thời gian (phút)", "selectCorrectAnswer": "Chọn đáp án đúng" }, "progress": { "question": "Câu hỏi", "of": "của", "score": "Điểm", "timeRemaining": "Thời gian còn lại" }, "results": { "title": "Kết quả bài tập", "score": "Điểm của bạn", "correct": "Đúng", "total": "Tổng", "accuracy": "Độ chính xác", "timeSpent": "Thời gian làm bài", "tryAgain": "Thử lại", "backToMenu": "Về menu", "reviewAnswers": "Xem lại đáp án" }, "common": { "submit": "Nộp bài", "next": "Tiếp theo", "previous": "Trước", "finish": "Hoàn thành", "check": "Kiểm tra đáp án", "checkAnswer": "Kiểm tra đáp án", "showAnswer": "Hiện đáp án", "explanation": "Giải thích", "hint": "Gợi ý", "loading": "Đang tải...", "noAnswer": "Không có đáp án", "correct": "Đúng!", "incorrect": "Sai", "skip": "Bỏ qua", "retry": "Thử lại" } } };
const categories$1 = { "technology": "Công nghệ", "business": "Kinh doanh", "travel": "Du lịch", "food": "Ẩm thực", "health": "Sức khỏe", "education": "Giáo dục", "sports": "Thể thao", "entertainment": "Giải trí", "science": "Khoa học", "art": "Nghệ thuật", "music": "Âm nhạc", "literature": "Văn học", "politics": "Chính trị", "environment": "Môi trường", "fashion": "Thời trang", "finance": "Tài chính" };
const dashboard$1 = { "title": "Trang chủ", "description": "Tổng quan về tiến độ học tập của bạn", "quickActions": "Hành động nhanh", "recentActivity": "Hoạt động gần đây", "stats": { "vocabularyLearned": "Từ vựng đã học", "grammarLessons": "Bài ngữ pháp", "currentStreak": "Streak hiện tại", "totalTime": "Tổng thời gian", "days": "ngày", "hours": "giờ" }, "actions": { "addVocabulary": "Thêm từ vựng", "practiceFlashcard": "Luyện Flashcard", "takeQuiz": "Làm Quiz", "learnGrammar": "Học ngữ pháp" }, "activity": { "updated": 'Cập nhật từ vựng "{word}" - {category}', "added": 'Thêm từ vựng "{word}" - {category}', "justNow": "Vừa xong", "noActivity": "Chưa có hoạt động từ vựng nào", "addFirstVocab": "Hãy thêm từ vựng đầu tiên!" } };
const app$2 = { "title": "Ứng dụng Học Tiếng Anh", "titleShort": "Ứng dụng Tiếng Anh" };
const time$1 = { "today": "Hôm nay", "yesterday": "Hôm qua", "ago": { "justNow": "Vừa xong", "minutesAgo": "{minutes} phút trước", "hoursAgo": "{hours} giờ trước", "daysAgo": "{days} ngày trước", "yesterday": "Hôm qua" } };
const practice$1 = { "controls": { "next": "Tiếp theo", "complete": "Hoàn thành", "difficult": "Khó", "easy": "Dễ", "exit": "Thoát" }, "timer": { "startPractice": "Bắt đầu luyện tập", "timeLimit": "Thời gian cho mỗi câu: {seconds} giây", "timeUp": "Hết thời gian!", "timeUpMessage": "Bạn đã hết thời gian cho câu này. Hãy thử lại hoặc bỏ qua.", "tryAgain": "Thử lại", "skip": "Bỏ qua" }, "exitWarning": { "title": "Cảnh báo rời khỏi bài tập", "message": "Bạn đang trong quá trình luyện tập. Nếu rời khỏi bây giờ, bạn sẽ mất tiến độ và không đạt điểm. Bạn có chắc chắn muốn rời?", "continue": "Tiếp tục luyện tập", "exit": "Rời khỏi bài tập" } };
const quiz$1 = { "progress": { "question": "Câu hỏi" }, "setup": { "title": "Cài đặt Quiz", "description": "Tùy chỉnh quiz theo sở thích của bạn", "type": "Loại quiz", "level": "Mức độ", "questionCount": "Số câu hỏi", "timeLimit": "Thời gian (phút)", "start": "Bắt đầu Quiz", "allLevels": "Tất cả", "unlimited": "Không giới hạn" }, "types": { "vocabulary": "Từ vựng", "grammar": "Ngữ pháp", "mixed": "Hỗn hợp" }, "navigation": { "previous": "Câu trước", "next": "Câu tiếp", "finish": "Hoàn thành" }, "results": { "completed": "Quiz hoàn thành!", "yourResults": "Kết quả của bạn", "score": "Điểm số", "correct": "Đúng", "accuracy": "Độ chính xác", "passed": "Đạt", "failed": "Chưa đạt", "above": "Trên", "below": "Dưới", "reviewAnswers": "Xem lại đáp án", "correctAnswer": "Đáp án đúng", "yourAnswer": "Bạn chọn", "noAnswer": "Không chọn", "explanation": "Giải thích", "restartQuiz": "Làm lại Quiz" } };
const voice$1 = { "selector": { "title": "Giọng đọc" }, "gender": { "female": "Nữ", "male": "Nam" }, "types": { "female_sweet": "Giọng nữ Ngọt ngào", "female_clear": "Giọng nữ Trong trẻo", "female_professional": "Giọng nữ Chuyên nghiệp", "male_strong": "Giọng nam Mạnh mẽ", "male_gentle": "Giọng nam Dịu dàng", "male_deep": "Giọng nam Trầm ấm", "korean_female": "Giọng nữ Hàn Quốc", "korean_male": "Giọng nam Hàn Quốc" }, "info": { "name": "Tên", "language": "Ngôn ngữ", "gender": "Giới tính" }, "test": "Thử nghiệm giọng", "testing": "Đang thử nghiệm...", "testText": "Xin chào! Đây là bài kiểm tra giọng nói.", "testTextKorean": "안녕하세요! 이것은 음성 테스트입니다.", "settings": { "title": "Cài đặt giọng nói", "rate": "Tốc độ", "pitch": "Cao độ", "volume": "Âm lượng" } };
const vi = {
  common: common$1,
  levels,
  vocabulary: vocabulary$1,
  flashcard: flashcard$1,
  grammar: grammar$1,
  categories: categories$1,
  dashboard: dashboard$1,
  app: app$2,
  time: time$1,
  practice: practice$1,
  quiz: quiz$1,
  voice: voice$1
};
const common = { "easy": "쉬움", "difficult": "어려움", "reviewed": "복습 완료", "correct": "정답", "incorrect": "오답", "cancel": "취소", "apply": "적용", "back": "뒤로", "restart": "다시 연습", "vocabulary": "어휘", "grammar": "문법", "practice": "연습", "dashboard": "대시보드", "save": "저장", "saving": "저장 중...", "update": "업데이트", "delete": "삭제", "edit": "편집", "add": "추가", "search": "검색", "all": "전체", "title": "제목", "previous": "이전", "next": "다음", "minutes": "분", "finish": "완료", "close": "닫기", "confirm": "확인", "reset": "초기화", "resetToDefault": "기본값으로 재설정", "actions": "작업", "backToTop": "맨 위로", "backToTopTooltip": "맨 위로 ({percent}%)" };
const vocabulary = { "title": "어휘", "description": "영어 어휘를 관리하고 학습하세요", "header": { "title": "어휘" }, "addNew": "새 단어 추가", "addWord": "단어 추가", "addVocabulary": "새 어휘 추가", "editVocabulary": "어휘 편집", "saveVocabulary": "어휘 저장", "deleteVocabulary": "어휘 삭제", "vocabularyList": "어휘 목록", "word": "단어", "pronunciation": "발음", "meaning": "의미", "category": "카테고리", "level": "난이도", "wordType": "품사", "note": "메모", "favorite": "즐겨찾기", "isFavorite": "즐겨찾는 어휘로 표시", "showFavoritesOnly": "즐겨찾기만 보기", "searchPlaceholder": "어휘 검색...", "wordPlaceholder": "단어 입력...", "meaningPlaceholder": "단어의 의미 입력...", "example": "예문", "examplePlaceholder": "예문을 입력하세요...", "synonyms": "유의어", "antonyms": "반의어", "separateByComma": "쉼표로 구분", "notePlaceholder": "이 단어에 대한 추가 메모...", "selectCategory": "카테고리 선택", "selectLevel": "난이도 선택", "selectWordType": "품사 선택", "confirmDelete": '"{word}"를 삭제하시겠습니까?', "confirmDeleteTitle": "삭제 확인", "confirmDeleteMessage": "이 어휘를 삭제하시겠습니까? 이 작업은 되돌릴 수 없습니다.", "updateInfo": "어휘 정보 업데이트", "vocabInfo": "어휘 정보", "updateSuccess": "어휘가 성공적으로 업데이트되었습니다.", "addSuccess": "어휘가 성공적으로 추가되었습니다!", "deleteSuccess": '"{word}"를 성공적으로 삭제했습니다.', "words": "단어", "createdAt": "생성일", "updatedAt": "수정일", "grouping": { "title": "날짜별 그룹", "description": "생성일 기준으로 어휘를 묶어 표시", "hoverToExpand": "호버하여 펼치기", "hoverDescription": "활성화 시 호버로 카테고리를 엽니다" }, "notes": { "title": "어휘 메모", "description": "오늘 학습한 어휘에 대한 메모를 관리하세요", "manageNotes": "메모 관리", "noteLabel": "어휘 메모", "placeholder": "이번 어휘 학습에 대한 메모를 작성하세요...", "wordsLearned": "이 그룹의 단어", "noWordsLearned": "이 그룹에 어휘가 없습니다", "saveSuccess": "메모가 성공적으로 저장되었습니다!", "autoSaveNotice": "자동 저장이 활성화되었습니다. 메모는 다음 백업에 포함됩니다.", "today": "오늘", "yesterday": "어제" }, "lazyLoading": { "loading": "로딩 중...", "componentVisible": "컴포넌트가 표시되었습니다", "componentHidden": "컴포넌트가 숨겨졌습니다" }, "accordion": { "expand": "그룹 펼치기", "collapse": "그룹 접기", "addTopic": "주제 추가", "editTopic": "주제 편집", "topicPlaceholder": "이 그룹의 주제를 입력하세요...", "saveTopic": "주제 저장", "cancelTopic": "취소" }, "sameTopicDatesTitle": "같은 주제의 다른 날짜", "sameTopicDatesEmpty": "이 주제의 다른 날짜가 없습니다", "sameTopicDatesAria": "같은 주제의 날짜 표시", "notFound": "어휘를 찾을 수 없습니다!", "updateError": "어휘 업데이트 중 오류가 발생했습니다. 다시 시도하세요.", "deleteError": "어휘 삭제 중 오류가 발생했습니다. 다시 시도하세요.", "showingResults": "총 {total}개 중 {start}–{end} 표시", "showingDateGroups": "총 {total}개 날짜 그룹 중 {start}–{end} 표시", "showingCategoryItems": "총 {total}개 항목 중 {start}–{end} 표시", "categories": { "technology": "기술", "business": "비즈니스", "travel": "여행", "food": "음식", "health": "건강", "education": "교육", "sports": "스포츠", "entertainment": "엔터테인먼트", "science": "과학", "art": "예술", "music": "음악", "literature": "문학", "politics": "정치", "environment": "환경", "fashion": "패션", "finance": "금융" }, "levels": { "beginner": "초급", "intermediate": "중급", "advanced": "고급" }, "wordTypes": { "noun": "명사", "verb": "동사", "adjective": "형용사", "adverb": "부사", "preposition": "전치사", "conjunction": "접속사", "interjection": "감탄사" }, "image": { "title": "이미지", "upload": "업로드", "url": "URL", "clickToUpload": "클릭하여 업로드", "orDragDrop": " 또는 여기로 드래그 앤 드롭", "supportedFormats": "PNG, JPG, GIF, WebP (최대 5MB)", "urlPlaceholder": "인터넷의 이미지 URL을 붙여넣으세요...", "loadFromUrl": "URL에서 불러오기", "loading": "로딩 중...", "preview": "이미지 미리보기", "change": "변경", "changeUrl": "URL 변경", "remove": "제거", "fromUrl": "URL에서", "processing": "처리 중...", "errors": { "unsupportedFormat": "지원되지 않는 파일 형식입니다. PNG, JPG, GIF 또는 WebP를 선택하세요.", "fileTooLarge": "파일이 너무 큽니다. 5MB 이하 파일을 선택하세요.", "processingFailed": "이미지를 처리할 수 없습니다. 다시 시도하세요.", "emptyUrl": "이미지 URL을 입력하세요.", "invalidUrl": "유효하지 않은 URL이거나 이미지가 아닙니다.", "urlLoadFailed": "URL에서 이미지를 불러올 수 없습니다. URL을 다시 확인하세요.", "corsWarning": "이미지가 허용되었지만 원본 사이트의 보안 설정으로 표시되지 않을 수 있습니다." } }, "imageInfo": { "title": "누락된 이미지", "none": "모든 어휘에 이미지가 있습니다", "date": "날짜", "category": "카테고리", "missingCount": "이미지 없음 {count}개", "aria": "누락된 이미지 정보 보기" }, "filters": { "title": "필터" }, "save": { "title": "저장 및 동기화", "mode": "저장 모드:", "auto": "자동", "manual": "수동", "saveNow": "지금 저장", "chooseAutoFile": "자동 저장 파일 선택", "setup": "설정", "changeAutoFile": "자동 저장 파일 변경", "change": "변경", "importFile": "파일 가져오기", "importShort": "가져오기", "lastSave": "마지막 저장: {time}", "notSaved": "저장되지 않음", "autoSaveFileSetup": "자동 저장 파일이 성공적으로 설정되었습니다!", "autoSaveRetry": "자동 저장 파일을 새로 선택하려면 여기를 클릭하세요", "status": { "saving": "저장 중...", "autoSaving": "자동 저장 중...", "autoWithFile": "자동(파일 저장됨)", "autoLocalStorage": "자동(localStorage)", "autoFile": "자동(파일)", "autoNoFile": "자동(선택된 파일 없음)", "fileSaved": "파일 저장됨", "error": "저장 오류" }, "errors": { "browserNotSupported": "브라우저가 이 기능을 지원하지 않습니다. Chrome 또는 Edge를 사용하세요.", "fileSelectError": "파일 선택 오류: {error}", "invalidFile": "올바른 JSON 파일을 선택하세요!", "invalidFormat": "유효하지 않은 파일 형식", "autoSaveFileFailed": "파일 자동 저장에 실패했습니다. 새 파일을 선택하세요.", "permissionDenied": "파일 쓰기 권한이 거부되었습니다. 새 파일을 선택하세요." }, "import": { "confirmMessage": '파일 "{filename}"에서 {count}개의 어휘를 가져오시겠습니까?\n\n현재 데이터가 대체됩니다!', "successMessage": "{count}개의 어휘를 성공적으로 가져왔습니다!" } }, "validation": { "wordRequired": "단어는 필수입니다", "wordTooShort": "단어는 최소 1자 이상이어야 합니다", "wordTooLong": "단어는 100자 미만이어야 합니다", "meaningRequired": "의미는 필수입니다", "meaningTooShort": "의미는 최소 1자 이상이어야 합니다", "meaningTooLong": "의미는 500자 미만이어야 합니다", "partOfSpeechRequired": "품사는 필수입니다", "categoryRequired": "카테고리는 필수입니다", "levelRequired": "난이도는 필수입니다", "exampleTooLong": "예문은 500자 미만이어야 합니다", "notesTooLong": "메모는 500자 미만이어야 합니다", "pronunciationTooLong": "발음은 100자 미만이어야 합니다", "synonymsInvalid": "쉼표로 구분된 올바른 유의어를 입력하세요", "antonymsInvalid": "쉼표로 구분된 올바른 반의어를 입력하세요", "saveError": "어휘 저장 중 오류가 발생했습니다. 다시 시도하세요.", "saveSuccess": "어휘가 성공적으로 저장되었습니다!", "updateSuccess": "어휘가 성공적으로 업데이트되었습니다!" }, "details": { "title": "어휘 상세", "playAudio": "어휘 발음 재생", "playExample": "예문 오디오 재생", "addFavorite": "즐겨찾기에 추가", "removeFavorite": "즐겨찾기에서 제거" }, "moveMode": { "title": "이동 모드", "active": "활성 - 화살표를 클릭해 단어 이동", "inactive": "비활성", "moveVocabulary": "어휘 이동", "movingWord": "단어 이동 중", "movingCategory": "카테고리의 모든 단어 이동 중", "wordsWillBeMoved": "선택한 날짜로 이동될 예정입니다", "selectTargetDate": "대상 날짜 선택", "moveToDateGroup": "다른 날짜 그룹으로 이동", "moveToDate": "날짜로 이동", "moveWord": "단어 이동", "moveAll": "모두 이동", "moveSuccess": "{date}로 {count}개 단어를 성공적으로 이동했습니다", "moveError": "어휘 이동 실패", "moveAutoSaveNotice": "단어가 이동되었으며 자동 저장에 포함됩니다", "batchMoveSuccess": "{date}로 {count}개 단어를 성공적으로 이동했습니다", "batchMoveError": "카테고리 이동 실패", "filterBySameTopic": "동일 주제로 필터", "noMatchingDates": "동일 주제의 어휘가 있는 날짜가 없습니다" }, "topicManager": { "title": "주제 관리자", "addNewTopic": "새 주제 추가", "editTopic": "주제 편집", "topicKey": "주제 키", "topicKeyPlaceholder": "예: cooking, programming...", "keyDescription": "이 키는 시스템에서 사용됩니다. 소문자, 숫자, 밑줄만 사용하세요.", "vietnameseName": "베트남어 이름", "vietnameseNamePlaceholder": "예: Nấu ăn, Lập trình...", "englishName": "영어 이름", "englishNamePlaceholder": "예: Cooking, Programming...", "existingTopics": "기존 주제", "noCustomTopics": "사용자 지정 주제가 없습니다.", "cannotDeleteInUse": "사용 중인 주제는 삭제할 수 없습니다", "confirmDeleteTitle": "주제 삭제 확인", "confirmDeleteMessage": '주제 "{topic}"를 삭제하시겠습니까?', "duplicateKey": "주제 키가 이미 존재합니다!", "builtInTopics": "기본 제공 주제", "builtInTopicsDescription": "시스템에는 기술, 비즈니스, 여행 등 16개의 기본 제공 주제가 있습니다. 여기에서 사용자 지정 주제를 추가할 수 있습니다.", "builtIn": "기본 제공", "manageTopics": "주제 관리" } };
const flashcard = { "header": { "history": "기록", "settings": "설정", "progress": "진행", "description": "플래시카드로 어휘를 연습하세요", "exit": "나가기", "selectMode": "모드 선택" }, "empty": { "title": "플래시카드 없음", "description": "어휘를 추가하고 연습을 시작하세요.", "action": "어휘 추가" }, "settings": { "title": "플래시카드 설정", "category": "카테고리", "level": "난이도", "all": "전체", "beginner": "초급", "intermediate": "중급", "advanced": "고급", "autoFlip": "3초 후 자동으로 카드 뒤집기", "shuffle": "순서 섞기", "shuffle_disabled_during_practice": "연습 중에는 섞기가 비활성화됩니다", "disabledDuringPractice": "연습 중에는 설정이 비활성화됩니다" }, "history": { "title": "연습 기록", "empty": { "title": "기록 없음", "description": "연습을 시작하여 기록을 확인하세요." }, "totalCards": "총 카드 수", "correct": "정답", "incorrect": "오답", "duration": "소요 시간", "categories": "카테고리", "accuracy": "정확도", "result": "결과", "pass": "통과", "fail": "실패", "viewDetails": "자세히 보기", "noDetails": "세부 정보가 없습니다", "details": { "title": "세션 세부 정보", "noData": "이 세션에 대한 세부 정보가 없습니다", "yourAnswer": "당신의 답변", "noAnswer": "답변 없음", "correctAnswer": "정답" } }, "completion": { "title": "완료!", "description": "{count}개의 플래시카드를 완료했습니다.", "correct": "정답", "incorrect": "오답", "accuracy": "정확도", "result": "결과" }, "modes": { "flashcard": "플래시카드", "quiz": "퀴즈", "typing": "타이핑", "listening": "리스닝", "image": "이미지", "pictionary": "픽셔너리", "bubbleShooter": "버블 슈터", "snakeGame": "스네이크 헌트", "pronunciation": "발음", "change_disabled_during_practice": "연습 중에는 모드 변경이 비활성화됩니다", "selectMode": "모드 선택", "mode": "모드" }, "image": { "imageAlt": "어휘 이미지", "imageError": "이미지를 불러올 수 없습니다", "noImage": "사용 가능한 이미지가 없습니다", "placeholder": "단어를 입력하세요...", "instruction": "이미지를 보고 해당하는 단어를 입력하세요:", "correctAnswer": "정답", "unavailable": "선택한 날짜에는 이미지 모드를 사용할 수 없습니다", "quizToggle": "객관식" }, "pictionary": { "imageAlt": "픽셔너리 이미지", "instruction": "칸을 클릭하고 입력하여 빠진 글자를 채우세요. Enter 키로 확인합니다.", "unavailable": "선택한 날짜에는 픽셔너리 모드를 사용할 수 없습니다" }, "bubbleShooter": { "title": "버블 슈터", "instruction": "버블을 쏴서 4개 이상의 단어를 매칭하세요!", "score": "점수", "currentWord": "현재 단어", "gameComplete": "게임 완료!", "finalScore": "최종 점수: {score}", "wordsMatched": "매칭된 단어: {count}", "playAgain": "다시 하기" }, "snakeGame": { "title": "스네이크 헌트", "instruction": "뱀이 첫 글자가 같은 먹이를 먹도록 유도하세요!", "score": "점수", "currentWord": "현재 단어", "gameComplete": "게임 완료!", "finalScore": "최종 점수: {score}", "wordsEaten": "먹은 단어: {count}", "playAgain": "다시 하기", "gameOver": "게임 오버!" }, "listening": { "instruction": "듣고 들은 단어를 입력하세요:", "placeholder": "들은 단어를 입력하세요...", "correct": "✓ 정답!", "incorrect": "✗ 정답:", "quizToggle": "객관식" }, "typing": { "quizToggle": "객관식" }, "dateFilter": { "enable": "생성 날짜로 필터", "allDates": "모든 날짜", "info": "{date}의 어휘 {count}개 표시" } };
const grammar = { "title": "문법", "description": "영어 문법을 학습하고 연습하세요", "addLesson": "수업 추가", "addNewLesson": "새 수업 추가", "editLesson": "수업 편집", "deleteLesson": "수업 삭제", "confirmDelete": '레슨 "{title}"을(를) 삭제하시겠습니까?', "search": "문법 수업 검색...", "level": "레벨", "category": "카테고리", "duration": "분", "durationLabel": "소요 시간(분)", "progress": "진행도", "continue": "계속", "start": "시작", "emptyState": { "title": "수업을 찾을 수 없습니다", "description": "필터를 변경하거나 새 수업을 추가해 보세요." }, "levels": { "beginner": "초급", "intermediate": "중급", "advanced": "고급" }, "manager": { "title": "문법 관리자", "manageGrammar": "문법 관리", "addNew": "새 문법 규칙 추가", "editGrammar": "문법 규칙 편집", "existingRules": "문법 규칙", "category": "카테고리", "level": "레벨", "formula": "문법 공식", "description": "설명", "examples": "예시", "titlePlaceholder": "예: 현재완료 시제", "formulaPlaceholder": "예: 주어 + have/has + 과거분사", "descriptionPlaceholder": "해당 문법 규칙의 사용 방법과 시기를 설명하세요...", "examplePlaceholder": "예: I have studied English for 5 years.", "selectCategory": "카테고리 선택", "selectLevel": "레벨 선택", "addExample": "예시 추가", "removeExample": "예시 제거", "noRulesYet": "아직 추가된 문법 규칙이 없습니다", "createdAt": "생성됨", "lastModified": "마지막 수정", "confirmDelete": "이 문법 규칙을 삭제하시겠습니까?", "ruleAdded": "문법 규칙이 성공적으로 추가되었습니다", "ruleUpdated": "문법 규칙이 성공적으로 업데이트되었습니다", "ruleDeleted": "문법 규칙이 성공적으로 삭제되었습니다", "globalMode": "전체", "perDateMode": "날짜별", "perDateDescription": "날짜 {date}의 문법 규칙 관리", "noDateSelected": "날짜별 모드에서 날짜가 선택되지 않았습니다", "showVocabulary": "어휘 보기", "vocabularyForDate": "{date}의 어휘", "noVocabularyFound": "이 날짜의 어휘가 없습니다" }, "categories": { "tenses": "시제", "conditionals": "조건문", "passive": "수동태", "modals": "조동사", "articles": "관사", "prepositions": "전치사", "conjunctions": "접속사", "other": "기타" }, "selectCategory": "카테고리 선택", "selectLevel": "레벨 선택", "titlePlaceholder": "수업 제목을 입력하세요...", "descriptionPlaceholder": "수업에 대한 간단한 설명을 입력하세요...", "lessonContent": "수업 내용", "theory": "이론", "theoryPlaceholder": "수업의 이론 내용을 입력하세요...", "structure": "구조", "structurePlaceholder": "문법 구조를 입력하세요...", "examples": "예시", "examplePlaceholder": "예시 {index}", "translationPlaceholder": "번역 {index}", "addExample": "예시 추가", "usageRules": "사용 규칙", "ruleTitlePlaceholder": "규칙 제목 {index}", "ruleDescriptionPlaceholder": "규칙 설명 {index}", "addRule": "규칙 추가", "commonMistakes": "흔한 실수", "wrongSentencePlaceholder": "잘못된 문장 {index}", "correctSentencePlaceholder": "올바른 문장 {index}", "explanationPlaceholder": "설명 {index}", "addMistake": "흔한 실수 추가", "markdownSupported": "기본 Markdown 서식이 지원됩니다.", "practice": { "title": "문법 연습", "subtitle": "연습할 연습 유형을 선택하세요", "chooseExercise": "연습 유형 선택", "chooseDescription": "연습을 시작할 연습 유형을 선택하세요", "score": "점수", "question": "문제", "checkAnswer": "답안 확인", "next": "다음", "finish": "완료", "explanation": "설명", "reading": { "passage": "지문", "readingTime": "읽기 시간", "questions": "문제", "showHighlights": "하이라이트 표시" }, "exercises": { "checkAnswer": "답안 확인", "next": "다음", "multiple-choice": { "title": "객관식", "description": "여러 선택지 중에서 정답을 선택하세요" }, "fill-blank": { "title": "빈칸 채우기", "description": "올바른 단어로 문장을 완성하세요" }, "pronunciation": { "title": "발음", "description": "말하기와 발음을 연습하세요" }, "reading": { "title": "독해", "description": "지문을 읽고 문제에 답하세요", "passage": "지문", "listen": "듣기", "readingTime": "읽기 시간", "questions": "문제", "true": "참", "false": "거짓", "yourAnswer": "당신의 답", "correctAnswer": "정답", "correct": "정답", "incorrect": "오답", "accuracy": "정확도", "showHighlights": "하이라이트 표시", "hideHighlights": "하이라이트 숨기기" }, "listening": { "title": "듣기", "description": "오디오를 듣고 문제에 답하세요", "instruction": "오디오를 듣고 문제에 답하세요:", "speed": "속도", "playsLeft": "남은 재생 횟수", "loading": "로딩 중...", "questions": "문제", "audioUrl": "오디오 URL", "audioUrlPlaceholder": "오디오 파일 URL 또는 YouTube URL을 입력하세요...", "maxPlays": "최대 재생 횟수", "allowNotes": "메모 허용", "transcript": "대본", "transcriptPlaceholder": "오디오 대본을 입력하세요...", "question": "문제", "multipleChoice": "객관식", "fillBlank": "빈칸 채우기", "ordering": "순서 맞추기", "addQuestion": "문제 추가", "correctAnswerPlaceholder": "정답을 입력하세요...", "notesAllowed": "메모 허용됨", "takeNotes": "메모하기", "notesPlaceholder": "여기에 메모를 작성하세요...", "correct": "정답", "incorrect": "오답", "accuracy": "정확도", "showTranscript": "대본 표시", "correctAnswer": "정답", "audioUrlHint": "직접 오디오 URL 또는 YouTube 비디오 URL을 입력하세요", "youtubeDetected": "YouTube URL이 감지되었습니다", "youtubeNote": "이 YouTube 비디오에서 오디오를 추출하여 듣기 연습에 사용됩니다" }, "writing": { "title": "쓰기", "description": "에세이를 쓰고 피드백을 받으세요", "instruction": "다음 주제에 대한 단락을 작성하세요:", "essay": "에세이", "email": "이메일", "letter": "편지", "paragraph": "단락", "requirements": "요구 사항", "minWords": "최소 단어 수", "timeLimit": "제한 시간", "yourResponse": "당신의 답안", "words": "단어", "timeRemaining": "남은 시간", "paragraphPlaceholder": "여기에 단락을 입력하세요...", "essayPlaceholder": "여기에 에세이를 작성하세요...", "emailPlaceholder": "여기에 이메일을 작성하세요...", "letterPlaceholder": "여기에 편지를 작성하세요...", "tips": "쓰기 팁", "showTips": "팁 보기", "hideTips": "팁 숨기기", "tip1": "다양한 문장 구조를 사용하세요", "tip2": "문법과 맞춤법을 확인하세요", "tip3": "아이디어를 연결하는 연결어를 사용하세요", "tip4": "서론, 본론, 결론이 있는지 확인하세요", "tip5": "주제에 적합한 어휘를 사용하세요", "saveDraft": "초안 저장", "clear": "지우기", "confirmClear": "모든 내용을 지우시겠습니까?", "submit": "제출", "analyzing": "분석 중...", "feedback": "피드백", "overallScore": "종합 점수", "grammar": "문법", "vocabulary": "어휘", "coherence": "일관성", "taskResponse": "과제 응답", "strengths": "강점", "improvements": "개선이 필요한 부분", "corrections": "구체적인 수정 사항", "original": "원본", "corrected": "수정됨", "explanation": "설명" } }, "fillBlank": { "instruction": "적절한 단어로 빈칸을 채우세요:", "clear": "모두 지우기" }, "pronunciation": { "instruction": "다음 문장을 듣고 따라 하세요:", "listen": "듣기", "ready": "준비", "recording": "녹음 중...", "recorded": "녹음 완료", "processing": "처리 중...", "analyze": "분석", "feedback": "피드백", "tips": "팁", "tryAgain": "다시 시도", "yourRecording": "당신의 녹음", "microphoneError": "마이크 오류! 마이크 접근 권한을 확인하세요." }, "settings": { "title": "연습 설정", "difficulty": "난이도", "autoPlay": "오디오 자동 재생", "autoplayAudio": "오디오 자동 재생", "showExplanations": "설명 표시", "timeLimit": "제한 시간 (분)", "questionCount": "문제 수", "close": "닫기", "save": "설정 저장", "levels": { "easy": "쉬움", "medium": "보통", "hard": "어려움" } }, "exerciseManager": { "title": "연습 관리자", "addNew": "새 연습 추가", "existing": "기존 연습", "exerciseType": "연습 유형", "typePlaceholder": "연습 유형을 입력하세요...", "titlePlaceholder": "연습 제목을 입력하세요...", "description": "설명", "descriptionPlaceholder": "연습 설명을 입력하세요...", "difficulty": "난이도", "duration": "소요 시간", "durationPlaceholder": "예: 10-15분", "add": "연습 추가", "manageQuestions": "문제 관리" }, "questionManager": { "title": "문제 관리자", "addNew": "새 문제 추가", "editQuestion": "문제 편집", "addQuestion": "문제 추가", "existingQuestions": "기존 문제", "noQuestions": "아직 문제가 없습니다", "addFirstQuestion": "첫 번째 문제를 추가하세요", "question": "문제", "questionPlaceholder": "문제를 입력하세요...", "options": "선택지", "optionPlaceholder": "선택지를 입력하세요...", "correctAnswer": "정답", "explanation": "설명", "explanationPlaceholder": "설명을 입력하세요...", "taskType": "쓰기 유형", "prompt": "프롬프트", "promptPlaceholder": "쓰기 프롬프트를 입력하세요...", "requirements": "요구 사항", "addRequirement": "요구 사항 추가", "requirementPlaceholder": "요구 사항을 입력하세요...", "minWords": "최소 단어 수", "timeLimit": "제한 시간 (분)", "selectCorrectAnswer": "정답 선택" }, "progress": { "question": "문제", "of": "/", "score": "점수", "timeRemaining": "남은 시간" }, "results": { "title": "연습 결과", "score": "당신의 점수", "correct": "정답", "total": "총개", "accuracy": "정확도", "timeSpent": "소요 시간", "tryAgain": "다시 시도", "backToMenu": "메뉴로 돌아가기", "reviewAnswers": "답안 검토" }, "common": { "submit": "제출", "next": "다음", "previous": "이전", "finish": "완료", "check": "답안 확인", "checkAnswer": "답안 확인", "showAnswer": "답안 보기", "explanation": "설명", "hint": "힌트", "loading": "로딩 중...", "noAnswer": "답안이 제공되지 않음", "correct": "정답!", "incorrect": "오답", "skip": "건너뛰기", "retry": "다시 시도" } } };
const categories = { "technology": "기술", "business": "비즈니스", "travel": "여행", "food": "음식", "health": "건강", "education": "교육", "sports": "스포츠", "entertainment": "엔터테인먼트", "science": "과학", "art": "예술", "music": "음악", "literature": "문학", "politics": "정치", "environment": "환경", "fashion": "패션", "finance": "금융" };
const dashboard = { "title": "대시보드", "description": "학습 진행 상황 개요", "quickActions": "빠른 작업", "recentActivity": "최근 활동", "stats": { "vocabularyLearned": "학습한 어휘", "grammarLessons": "문법 수업", "currentStreak": "현재 연속 기록", "totalTime": "총 시간", "days": "일", "hours": "시간" }, "actions": { "addVocabulary": "어휘 추가", "practiceFlashcard": "플래시카드 연습", "takeQuiz": "퀴즈 보기", "learnGrammar": "문법 학습" }, "activity": { "updated": '어휘 "{word}" 업데이트 - {category}', "added": '어휘 "{word}" 추가 - {category}', "justNow": "방금 전", "noActivity": "아직 어휘 활동이 없습니다", "addFirstVocab": "첫 번째 어휘를 추가하세요!" } };
const app$1 = { "title": "영어 학습 앱", "titleShort": "영어 앱" };
const time = { "today": "오늘", "yesterday": "어제", "ago": { "justNow": "방금 전", "minutesAgo": "{minutes}분 전", "hoursAgo": "{hours}시간 전", "daysAgo": "{days}일 전", "yesterday": "어제" } };
const practice = { "controls": { "next": "다음", "complete": "완료", "difficult": "어려움", "easy": "쉬움", "exit": "나가기" }, "timer": { "startPractice": "연습 시작", "timeLimit": "문제당 제한 시간: {seconds}초", "timeUp": "시간 종료!", "timeUpMessage": "이 문제의 시간이 다 되었습니다. 다시 시도하거나 건너뛰세요.", "tryAgain": "다시 시도", "skip": "건너뛰기" }, "exitWarning": { "title": "연습 종료 경고", "message": "현재 연습 세션 중입니다. 지금 나가면 진행 상황과 점수를 잃게 됩니다. 정말 나가시겠습니까?", "continue": "연습 계속", "exit": "연습 종료" } };
const quiz = { "progress": { "question": "문제" }, "setup": { "title": "퀴즈 설정", "description": "퀴즈 설정을 사용자 정의하세요", "type": "퀴즈 유형", "level": "난이도", "questionCount": "문제 수", "timeLimit": "제한 시간 (분)", "start": "퀴즈 시작", "allLevels": "모든 난이도", "unlimited": "무제한" }, "types": { "vocabulary": "어휘", "grammar": "문법", "mixed": "혼합" }, "navigation": { "previous": "이전", "next": "다음", "finish": "완료" }, "results": { "completed": "퀴즈 완료!", "yourResults": "당신의 결과", "score": "점수", "correct": "정답", "accuracy": "정확도", "passed": "합격", "failed": "불합격", "above": "이상", "below": "이하", "reviewAnswers": "답안 검토", "correctAnswer": "정답", "yourAnswer": "당신의 답", "noAnswer": "답 없음", "explanation": "설명", "restartQuiz": "퀴즈 다시 시작" } };
const voice = { "selector": { "title": "음성 선택" }, "gender": { "female": "여성", "male": "남성" }, "types": { "female_sweet": "달콤한 여성", "female_clear": "명확한 여성", "female_professional": "전문적인 여성", "male_strong": "강한 남성", "male_gentle": "부드러운 남성", "male_deep": "깊은 남성", "korean_female": "한국어 여성", "korean_male": "한국어 남성" }, "info": { "name": "음성 이름", "language": "언어", "gender": "성별" }, "test": "음성 테스트", "testing": "테스트 중...", "testText": "안녕하세요! 이것은 음성 테스트입니다.", "testTextKorean": "안녕하세요! 한국어 음성 테스트입니다. 자연스럽게 들리나요?", "settings": { "title": "음성 설정", "rate": "속도", "pitch": "음조", "volume": "음량" } };
const ko = {
  common,
  vocabulary,
  flashcard,
  grammar,
  categories,
  dashboard,
  app: app$1,
  time,
  practice,
  quiz,
  voice
};
function getInitialLocale() {
  try {
    const savedLocale = localStorage.getItem("locale");
    return savedLocale === "en" || savedLocale === "vi" || savedLocale === "ko" ? savedLocale : "vi";
  } catch (error) {
    console.warn("localStorage not available, using default locale:", error);
    return "vi";
  }
}
const i18n = createI18n({
  legacy: false,
  locale: getInitialLocale(),
  fallbackLocale: "en",
  globalInjection: true,
  missingWarn: false,
  fallbackWarn: false,
  silentTranslationWarn: true,
  silentFallbackWarn: true,
  messages: {
    en,
    vi,
    ko
  }
});
function setLocale(locale) {
  if (typeof i18n.global.locale === "object" && "value" in i18n.global.locale) {
    i18n.global.locale.value = locale;
  } else {
    i18n.global.locale = locale;
  }
  try {
    localStorage.setItem("locale", locale);
  } catch (error) {
    console.warn("Could not save locale to localStorage:", error);
  }
  document.querySelector("html")?.setAttribute("lang", locale);
}
function getLocale() {
  const locale = typeof i18n.global.locale === "object" && "value" in i18n.global.locale ? i18n.global.locale.value : i18n.global.locale;
  return locale;
}
function toggleLocale() {
  const currentLocale = getLocale();
  const order = ["en", "vi", "ko"];
  const idx = order.indexOf(currentLocale);
  const newLocale = order[(idx + 1) % order.length];
  setLocale(newLocale);
  return newLocale;
}
const app = createApp(_sfc_main$a);
const pinia = createPinia();
app.use(pinia);
app.use(router);
app.use(i18n);
const options = {
  transition: "Vue-Toastification__bounce",
  maxToasts: 5,
  newestOnTop: true,
  filterBeforeCreate: (toast, toasts) => {
    if (toasts.filter((t) => t.content === toast.content).length !== 0) {
      return false;
    }
    return toast;
  },
  bodyClassName: ["font-sans", "text-sm"],
  toastClassName: ["custom-toast"],
  closeButtonClassName: "dark:text-white dark:hover:text-gray-200"
};
app.use(src_default, options);
const themeStore = useThemeStore();
themeStore.initTheme();
app.mount("#app");
export {
  __vitePreload as _,
  _export_sfc as a,
  groupVocabulariesByDateAndTopic as b,
  useVocabularyStore as c,
  getRelativeTime as d,
  useVoiceStore as e,
  getDateKey as f,
  getTopicName as g,
  formatDate as h,
  useGrammarStore as i,
  groupVocabulariesByDate as j,
  useThemeStore as k,
  loadComponentSafely as l,
  getLocale as m,
  toggleLocale as t,
  useModalStore as u
};
//# sourceMappingURL=index-BQmcadNx.js.map
