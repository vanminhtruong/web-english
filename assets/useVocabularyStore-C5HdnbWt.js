import { D as computed, z as ref } from "./vendor-CKTvmtu5.js";
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
    const levels = new Set(vocabularies.value.map((vocab) => vocab.level));
    return Array.from(levels).sort();
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
  const clearAllVocabularies = () => {
    try {
      vocabularies.value = [];
      nextId = 1;
      saveToLocalStorage();
      console.log("All vocabularies cleared successfully");
      return true;
    } catch (error) {
      console.error("Error clearing all vocabularies:", error);
      return false;
    }
  };
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
    clearAllVocabularies,
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
export {
  useVocabularyStore as u
};
//# sourceMappingURL=useVocabularyStore-C5HdnbWt.js.map
