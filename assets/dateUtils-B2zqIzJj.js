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
const groupVocabulariesByTopic = (vocabularies) => {
  const grouped = /* @__PURE__ */ new Map();
  const uncategorizedKey = "Uncategorized";
  vocabularies.forEach((vocab) => {
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
const groupVocabulariesByDateAndTopic = (vocabularies, locale = "vi-VN", t) => {
  const groupedByDate = groupVocabulariesByDate(vocabularies, locale, t);
  return groupedByDate.map((dateGroup) => {
    return {
      ...dateGroup,
      topics: groupVocabulariesByTopic(dateGroup.vocabularies)
    };
  });
};
const groupVocabulariesByDate = (vocabularies, locale = "vi-VN", t) => {
  const grouped = /* @__PURE__ */ new Map();
  vocabularies.forEach((vocab) => {
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
export {
  getDateKey as a,
  groupVocabulariesByDate as b,
  groupVocabulariesByDateAndTopic as c,
  formatDate as f,
  getRelativeTime as g
};
//# sourceMappingURL=dateUtils-B2zqIzJj.js.map
