import { ref, computed } from 'vue'

interface GrammarExample {
  id: number
  text: string
  translation: string
  note?: string
}

interface GrammarRule {
  id: number
  title: string
  description: string
}

interface GrammarMistake {
  id: number
  wrong: string
  correct: string
  explanation: string
}

interface GrammarLesson {
  id: string
  title: string
  description: string
  level: string
  category: string
  duration: number
  rating: number
  progress: number
  exercises: number
  theory: string
  structure?: string
  examples: GrammarExample[]
  rules: GrammarRule[]
  usageRules?: { title: string; description: string }[]
  commonMistakes?: GrammarMistake[]
}

// Grammar Store
const grammarLessons = ref<GrammarLesson[]>([
  {
    id: '1',
    title: 'Present Perfect Tense',
    description: 'Học cách sử dụng thì hiện tại hoàn thành trong tiếng Anh với các ví dụ thực tế và bài tập.',
    level: 'intermediate',
    category: 'Tenses',
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
    structure: 'Subject + have/has + past participle',
    examples: [
      {
        id: 1,
        text: 'I have lived in this city for 5 years.',
        translation: 'Tôi đã sống ở thành phố này được 5 năm.',
        note: 'Hành động bắt đầu trong quá khứ và tiếp tục đến hiện tại'
      },
      {
        id: 2,
        text: 'She has just finished her homework.',
        translation: 'Cô ấy vừa mới hoàn thành bài tập về nhà.',
        note: 'Hành động vừa mới hoàn thành'
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
        wrong: 'I have seen him yesterday.',
        correct: 'I saw him yesterday.',
        explanation: 'Không dùng Present Perfect với thời gian cụ thể trong quá khứ'
      }
    ]
  }
])

export const useGrammarStore = () => {
  // Computed properties
  const allLessons = computed(() => grammarLessons.value)

  // Methods
  const getLesson = (id: string): GrammarLesson | undefined => {
    return grammarLessons.value.find(lesson => lesson.id === id)
  }

  const updateLesson = (id: string, updates: Partial<GrammarLesson>) => {
    const index = grammarLessons.value.findIndex(lesson => lesson.id === id)
    if (index !== -1) {
      grammarLessons.value[index] = { ...grammarLessons.value[index], ...updates }
    }
  }

  const addLesson = (lesson: GrammarLesson) => {
    grammarLessons.value.push(lesson)
  }

  const deleteLesson = (id: string) => {
    const index = grammarLessons.value.findIndex(lesson => lesson.id === id)
    if (index !== -1) {
      grammarLessons.value.splice(index, 1)
    }
  }

  const getRelatedLessons = (currentId: string, category: string) => {
    return grammarLessons.value
      .filter(lesson => lesson.id !== currentId && lesson.category === category)
      .slice(0, 3)
      .map(lesson => ({
        id: lesson.id,
        title: lesson.title,
        category: lesson.category
      }))
  }

  return {
    allLessons,
    getLesson,
    updateLesson,
    addLesson,
    deleteLesson,
    getRelatedLessons
  }
}
