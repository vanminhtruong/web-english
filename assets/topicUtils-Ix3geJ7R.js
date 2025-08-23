import { M as useI18n } from "./vendor-CKTvmtu5.js";
const BUILT_IN_CATEGORIES = [
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
function normalizeLocale(input) {
  const s = (input || "").toLowerCase();
  if (s.startsWith("vi")) return "vi";
  if (s.startsWith("ko")) return "ko";
  return "en";
}
function getTopicName(categoryKey, t, locale, vocabularyItem) {
  const customTopics = getCustomTopics();
  const builtInKeys = BUILT_IN_CATEGORIES;
  const rawLocale = typeof locale === "string" ? locale : locale?.value;
  const currentLocale = normalizeLocale(rawLocale);
  let key = String(categoryKey || "").trim();
  const isNumericLike = /^\d+$/.test(key);
  if (isNumericLike && vocabularyItem && vocabularyItem.category && !/^\d+$/.test(String(vocabularyItem.category))) {
    key = String(vocabularyItem.category);
  }
  const keyLower = key.toLowerCase();
  if (vocabularyItem && vocabularyItem.categoryName) {
    const cn = String(vocabularyItem.categoryName).trim();
    const cnLower = cn.toLowerCase();
    const isKnownKey = builtInKeys.includes(cnLower) || customTopics.some((ct) => (ct.key || "").toLowerCase() === cnLower);
    if (!isKnownKey && currentLocale === "en") {
      return cn;
    }
  }
  const customTopic = customTopics.find((topic) => topic.key === key) || customTopics.find((topic) => (topic.key || "").toLowerCase() === keyLower);
  if (customTopic) {
    if (currentLocale === "vi") {
      return customTopic.vi || customTopic.en || customTopic.ko || key;
    }
    if (currentLocale === "ko") {
      return customTopic.ko || customTopic.en || customTopic.vi || key;
    }
    return customTopic.en || customTopic.vi || customTopic.ko || key;
  }
  if (t) {
    const translationKey = `vocabulary.categories.${keyLower}`;
    const translatedName = t(translationKey);
    if (translatedName && translatedName !== translationKey) {
      return translatedName;
    }
  }
  const builtInCategories = {
    "technology": { vi: "Công nghệ", en: "Technology", ko: "기술" },
    "business": { vi: "Kinh doanh", en: "Business", ko: "비즈니스" },
    "travel": { vi: "Du lịch", en: "Travel", ko: "여행" },
    "food": { vi: "Ẩm thực", en: "Food", ko: "음식" },
    "health": { vi: "Sức khỏe", en: "Health", ko: "건강" },
    "education": { vi: "Giáo dục", en: "Education", ko: "교육" },
    "sports": { vi: "Thể thao", en: "Sports", ko: "스포츠" },
    "entertainment": { vi: "Giải trí", en: "Entertainment", ko: "엔터테인먼트" },
    "science": { vi: "Khoa học", en: "Science", ko: "과학" },
    "art": { vi: "Nghệ thuật", en: "Art", ko: "예술" },
    "music": { vi: "Âm nhạc", en: "Music", ko: "음악" },
    "literature": { vi: "Văn học", en: "Literature", ko: "문학" },
    "politics": { vi: "Chính trị", en: "Politics", ko: "정치" },
    "environment": { vi: "Môi trường", en: "Environment", ko: "환경" },
    "fashion": { vi: "Thời trang", en: "Fashion", ko: "패션" },
    "finance": { vi: "Tài chính", en: "Finance", ko: "금융" }
  };
  if (builtInCategories[keyLower]) {
    if (currentLocale === "vi") return builtInCategories[keyLower].vi;
    if (currentLocale === "ko") return builtInCategories[keyLower].ko;
    return builtInCategories[keyLower].en;
  }
  if (vocabularyItem && vocabularyItem.categoryName) {
    return String(vocabularyItem.categoryName);
  }
  return key.charAt(0).toUpperCase() + key.slice(1);
}
function getAllTopicsWithNames(t, locale) {
  const builtInCategories = BUILT_IN_CATEGORIES;
  const result = [];
  builtInCategories.forEach((key) => {
    result.push({
      key,
      name: getTopicName(key, t, locale)
    });
  });
  const customTopics = getCustomTopics();
  customTopics.forEach((topic) => {
    result.push({
      key: topic.key,
      name: getTopicName(topic.key, t, locale)
    });
  });
  return result.sort((a, b) => a.name.localeCompare(b.name));
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
function useTopicName() {
  const { t, locale } = useI18n();
  return {
    getTopicName: (categoryKey) => {
      return getTopicName(categoryKey, t, locale);
    },
    getAllTopicsWithNames: () => {
      return getAllTopicsWithNames(t, locale);
    },
    currentLocale: locale
  };
}
export {
  getTopicName as a,
  getCustomTopics as g,
  useTopicName as u
};
//# sourceMappingURL=topicUtils-Ix3geJ7R.js.map
