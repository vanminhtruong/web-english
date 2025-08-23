import { computed } from 'vue'
import type { Topic } from './useTopicCRUD'

export function useBuiltInTopics() {
  // Built-in topics data
  const builtInTopics = computed<Topic[]>(() => {
    return [
      { key: 'technology', vi: 'Công nghệ', en: 'Technology', ko: '기술' },
      { key: 'business', vi: 'Kinh doanh', en: 'Business', ko: '비즈니스' },
      { key: 'travel', vi: 'Du lịch', en: 'Travel', ko: '여행' },
      { key: 'food', vi: 'Ẩm thực', en: 'Food', ko: '음식' },
      { key: 'health', vi: 'Sức khỏe', en: 'Health', ko: '건강' },
      { key: 'education', vi: 'Giáo dục', en: 'Education', ko: '교육' },
      { key: 'sports', vi: 'Thể thao', en: 'Sports', ko: '스포츠' },
      { key: 'entertainment', vi: 'Giải trí', en: 'Entertainment', ko: '엔터테인먼트' },
      { key: 'science', vi: 'Khoa học', en: 'Science', ko: '과학' },
      { key: 'art', vi: 'Nghệ thuật', en: 'Art', ko: '예술' },
      { key: 'music', vi: 'Âm nhạc', en: 'Music', ko: '음악' },
      { key: 'literature', vi: 'Văn học', en: 'Literature', ko: '문학' },
      { key: 'politics', vi: 'Chính trị', en: 'Politics', ko: '정치' },
      { key: 'environment', vi: 'Môi trường', en: 'Environment', ko: '환경' },
      { key: 'fashion', vi: 'Thời trang', en: 'Fashion', ko: '패션' },
      { key: 'finance', vi: 'Tài chính', en: 'Finance', ko: '금융' }
    ]
  })

  // Get built-in topic keys as array
  const builtInTopicKeys = computed(() => {
    return builtInTopics.value.map(topic => topic.key)
  })

  // Check if a topic key is built-in
  const isBuiltInTopic = (key: string): boolean => {
    return builtInTopicKeys.value.includes(key)
  }

  // Get built-in topic by key
  const getBuiltInTopic = (key: string): Topic | undefined => {
    return builtInTopics.value.find(topic => topic.key === key)
  }

  return {
    // Computed
    builtInTopics,
    builtInTopicKeys,
    
    // Methods
    isBuiltInTopic,
    getBuiltInTopic
  }
}
