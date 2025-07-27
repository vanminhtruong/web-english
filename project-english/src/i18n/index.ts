import { createI18n } from 'vue-i18n'

// Inline translations to avoid bundling issues on GitHub Pages
const en = {
  "common": {
    "easy": "Easy",
    "difficult": "Difficult",
    "reviewed": "Reviewed",
    "correct": "Correct",
    "incorrect": "Incorrect",
    "cancel": "Cancel",
    "apply": "Apply",
    "back": "Back",
    "restart": "Practice Again",
    "vocabulary": "Vocabulary",
    "grammar": "Grammar",
    "practice": "Practice",
    "dashboard": "Dashboard",
    "save": "Save",
    "saving": "Saving...",
    "update": "Update",
    "delete": "Delete",
    "edit": "Edit",
    "add": "Add",
    "search": "Search",
    "all": "All",
    "title": "Title",
    "previous": "Previous",
    "next": "Next",
    "minutes": "minutes",
    "finish": "Finish",
    "close": "Close",
    "confirm": "Confirm",
    "reset": "Reset",
    "resetToDefault": "Reset to Default",
    "actions": "Actions"
  },
  "levels": {
    "beginner": "Beginner",
    "intermediate": "Intermediate",
    "advanced": "Advanced"
  },
  "vocabulary": {
    "title": "Vocabulary",
    "description": "Manage and learn English vocabulary",
    "addNew": "Add New Word",
    "addWord": "Add Word",
    "addVocabulary": "Add New Vocabulary",
    "editVocabulary": "Edit Vocabulary",
    "saveVocabulary": "Save Vocabulary",
    "deleteVocabulary": "Delete Vocabulary",
    "vocabularyList": "Vocabulary List",
    "word": "Word",
    "pronunciation": "Pronunciation",
    "meaning": "Meaning",
    "category": "Category",
    "level": "Level",
    "wordType": "Word Type",
    "note": "Note",
    "favorite": "Favorite",
    "isFavorite": "Mark as favorite vocabulary",
    "showFavoritesOnly": "Show favorites only",
    "searchPlaceholder": "Search vocabulary...",
    "wordPlaceholder": "Enter word...",
    "meaningPlaceholder": "Enter word meaning...",
    "example": "Example",
    "examplePlaceholder": "Enter example sentence...",
    "synonyms": "Synonyms",
    "antonyms": "Antonyms",
    "separateByComma": "Separate by comma",
    "notePlaceholder": "Additional notes about this word...",
    "selectCategory": "Select category",
    "selectLevel": "Select level",
    "selectWordType": "Select word type",
    "confirmDelete": "Are you sure you want to delete \"{word}\"?",
    "confirmDeleteTitle": "Confirm Delete",
    "confirmDeleteMessage": "Are you sure you want to delete this vocabulary? This action cannot be undone.",
    "updateInfo": "Update vocabulary information",
    "vocabInfo": "Vocabulary Information",
    "updateSuccess": "Vocabulary has been updated successfully.",
    "addSuccess": "Vocabulary added successfully!",
    "deleteSuccess": "Deleted \"{word}\" successfully.",
    "words": "words",
    "createdAt": "Created at",
    "updatedAt": "Updated at",
    "grouping": {
      "title": "Group by Date",
      "description": "Display vocabulary grouped by creation date",
      "hoverToExpand": "Hover to Expand",
      "hoverDescription": "Open categories on hover when enabled"
    },
    "notes": {
      "title": "Vocabulary Notes",
      "description": "Manage notes for vocabulary words learned today",
      "manageNotes": "Manage Notes",
      "noteLabel": "Notes for vocabulary",
      "placeholder": "Write your notes about this vocabulary learning session...",
      "wordsLearned": "Words in this group",
      "noWordsLearned": "No vocabulary words in this group",
      "saveSuccess": "Notes saved successfully!",
      "autoSaveNotice": "Auto-save enabled. Your notes will be included in the next backup.",
      "today": "Today",
      "yesterday": "Yesterday"
    },
    "lazyLoading": {
      "loading": "Loading...",
      "componentVisible": "Component is now visible",
      "componentHidden": "Component is hidden"
    },
    "accordion": {
      "expand": "Expand group",
      "collapse": "Collapse group",
      "addTopic": "Add Topic",
      "editTopic": "Edit Topic",
      "topicPlaceholder": "Enter topic for this group...",
      "saveTopic": "Save Topic",
      "cancelTopic": "Cancel"
    },
    "notFound": "Vocabulary not found!",
    "updateError": "An error occurred while updating vocabulary. Please try again.",
    "deleteError": "An error occurred while deleting vocabulary. Please try again.",
    "showingResults": "Showing {start} to {end} of {total} results",
    "showingDateGroups": "Showing {start} to {end} of {total} date groups",
    "categories": {
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
    },
    "levels": {
      "beginner": "Beginner",
      "intermediate": "Intermediate",
      "advanced": "Advanced"
    },
    "wordTypes": {
      "noun": "Noun",
      "verb": "Verb",
      "adjective": "Adjective",
      "adverb": "Adverb",
      "preposition": "Preposition",
      "conjunction": "Conjunction",
      "interjection": "Interjection"
    },
    "image": {
      "title": "Image",
      "upload": "Upload",
      "url": "URL",
      "clickToUpload": "Click to upload",
      "orDragDrop": " or drag and drop here",
      "supportedFormats": "PNG, JPG, GIF, WebP up to 5MB",
      "urlPlaceholder": "Paste image URL from the internet...",
      "loadFromUrl": "Load from URL",
      "loading": "Loading...",
      "preview": "Image preview",
      "change": "Change",
      "changeUrl": "Change URL",
      "remove": "Remove",
      "fromUrl": "From URL",
      "processing": "Processing...",
      "errors": {
        "unsupportedFormat": "Unsupported file format. Please choose PNG, JPG, GIF or WebP.",
        "fileTooLarge": "File too large. Please choose a file under 5MB.",
        "processingFailed": "Unable to process image. Please try again.",
        "emptyUrl": "Please enter an image URL.",
        "invalidUrl": "Invalid URL or not an image.",
        "urlLoadFailed": "Unable to load image from URL. Please check the URL again.",
        "corsWarning": "Image accepted but may not display due to the original website's security settings."
      }
    },
    "save": {
      "mode": "Save Mode:",
      "auto": "Auto",
      "manual": "Manual",
      "saveNow": "Save Now",
      "chooseAutoFile": "Choose Auto-save File",
      "setup": "Setup",
      "changeAutoFile": "Change Auto-save File",
      "change": "Change",
      "importFile": "Import File",
      "importShort": "Import",
      "lastSave": "Last saved: {time}",
      "notSaved": "Not saved",
      "autoSaveFileSetup": "Auto-save file setup successfully!",
      "autoSaveRetry": "Click here to select a new auto-save file",
      "status": {
        "saving": "Saving...",
        "autoSaving": "Auto-saving...",
        "autoWithFile": "Auto (file saved)",
        "autoLocalStorage": "Auto (localStorage)",
        "autoFile": "Auto (file)",
        "autoNoFile": "Auto (no file selected)",
        "fileSaved": "File saved",
        "error": "Save error"
      },
      "errors": {
        "browserNotSupported": "Browser doesn't support this feature. Please use Chrome or Edge.",
        "fileSelectError": "Error selecting file: {error}",
        "invalidFile": "Please select a valid JSON file!",
        "invalidFormat": "Invalid file format",
        "autoSaveFileFailed": "Auto-save to file failed. Please select a new file.",
        "permissionDenied": "Permission to write to file denied. Please select a new file."
      },
      "import": {
        "confirmMessage": "Do you want to import {count} vocabulary from file \"{filename}\"?\n\nCurrent data will be replaced!",
        "successMessage": "Successfully imported {count} vocabulary!"
      }
    },
    "validation": {
      "wordRequired": "Word is required",
      "wordTooShort": "Word must be at least 1 character",
      "wordTooLong": "Word must be less than 100 characters",
      "meaningRequired": "Meaning is required",
      "meaningTooShort": "Meaning must be at least 1 character",
      "meaningTooLong": "Meaning must be less than 500 characters",
      "partOfSpeechRequired": "Part of speech is required",
      "categoryRequired": "Category is required",
      "levelRequired": "Level is required",
      "exampleTooLong": "Example must be less than 500 characters",
      "notesTooLong": "Notes must be less than 500 characters",
      "pronunciationTooLong": "Pronunciation must be less than 100 characters",
      "synonymsInvalid": "Please enter valid synonyms separated by commas",
      "antonymsInvalid": "Please enter valid antonyms separated by commas",
      "saveError": "Error saving vocabulary. Please try again.",
      "saveSuccess": "Vocabulary saved successfully!",
      "updateSuccess": "Vocabulary updated successfully!"
    },
    "details": {
      "title": "Vocabulary Details",
      "playAudio": "Play vocabulary audio",
      "playExample": "Play example audio",
      "addFavorite": "Add to favorites",
      "removeFavorite": "Remove from favorites"
    },
    "topicManager": {
      "title": "Topic Manager",
      "addNewTopic": "Add New Topic",
      "editTopic": "Edit Topic",
      "topicKey": "Topic Key",
      "topicKeyPlaceholder": "Example: cooking, programming...",
      "keyDescription": "This key will be used in the system. Use only lowercase letters, numbers and underscores.",
      "vietnameseName": "Vietnamese Name",
      "vietnameseNamePlaceholder": "Ví dụ: Nấu ăn, Lập trình...",
      "englishName": "English Name",
      "englishNamePlaceholder": "Example: Cooking, Programming...",
      "existingTopics": "Existing Topics",
      "noCustomTopics": "No custom topics yet.",
      "cannotDeleteInUse": "Cannot delete topic in use",
      "confirmDeleteTitle": "Confirm Delete Topic",
      "confirmDeleteMessage": "Are you sure you want to delete topic \"{topic}\"?",
      "duplicateKey": "Topic key already exists!",
      "builtInTopics": "Built-in Topics",
      "builtInTopicsDescription": "The system has 16 built-in topics like Technology, Business, Travel... You can add custom topics here.",
      "builtIn": "Built-in",
      "manageTopics": "Manage Topics"
    }
  },
  "flashcard": {
    "header": {
      "history": "History",
      "settings": "Settings",
      "progress": "Progress",
      "description": "Practice vocabulary with flashcards",
      "exit": "Exit"
    },
    "empty": {
      "title": "No flashcards",
      "description": "Add vocabulary to start practicing.",
      "action": "Add Vocabulary"
    },
    "settings": {
      "title": "Flashcard Settings",
      "category": "Category",
      "level": "Level",
      "all": "All",
      "beginner": "Beginner",
      "intermediate": "Intermediate",
      "advanced": "Advanced",
      "autoFlip": "Auto flip card after 3 seconds",
      "shuffle": "Shuffle order"
    },
    "history": {
      "title": "Practice History",
      "empty": {
        "title": "No history",
        "description": "Start practicing to see your history."
      },
      "totalCards": "Total cards",
      "correct": "Correct",
      "incorrect": "Incorrect",
      "duration": "Duration",
      "categories": "Categories",
      "accuracy": "Accuracy",
      "result": "Result",
      "pass": "Pass",
      "fail": "Fail"
    },
    "completion": {
      "title": "Completed!",
      "description": "You have completed {count} flashcards.",
      "correct": "Correct",
      "incorrect": "Incorrect",
      "accuracy": "Accuracy",
      "result": "Result"
    },
    "modes": {
      "flashcard": "Flashcard",
      "quiz": "Quiz",
      "typing": "Typing",
      "listening": "Listening",
      "image": "Image",
      "pronunciation": "Pronunciation"
    },
    "image": {
      "imageAlt": "Vocabulary image",
      "imageError": "Cannot load image",
      "noImage": "No image available",
      "placeholder": "Type the word...",
      "instruction": "Look at the image and type the corresponding word:",
      "correctAnswer": "Correct answer"
    },
    "listening": {
      "instruction": "Listen and type the word you hear:",
      "placeholder": "Type the word you hear...",
      "correct": "✓ Correct!",
      "incorrect": "✗ Correct answer:"
    },
    "dateFilter": {
      "enable": "Filter by creation date",
      "allDates": "All dates",
      "info": "Showing {count} vocabulary from {date}"
    }
  },
  "grammar": {
    "title": "Grammar",
    "description": "Learn and practice English grammar",
    "addLesson": "Add Lesson",
    "addNewLesson": "Add New Lesson",
    "editLesson": "Edit Lesson",
    "deleteLesson": "Delete Lesson",
    "confirmDelete": "Are you sure you want to delete the lesson \"{title}\"?",
    "search": "Search grammar lessons...",
    "level": "Level",
    "category": "Category",
    "duration": "minutes",
    "durationLabel": "Duration (minutes)",
    "progress": "Progress",
    "continue": "Continue",
    "start": "Start",
    "emptyState": {
      "title": "No lessons found",
      "description": "Try changing your filters or add a new lesson."
    },
    "levels": {
      "beginner": "Beginner",
      "intermediate": "Intermediate",
      "advanced": "Advanced"
    },
    "selectCategory": "Select category",
    "selectLevel": "Select level",
    "titlePlaceholder": "Enter lesson title...",
    "descriptionPlaceholder": "Enter a brief description of the lesson...",
    "lessonContent": "Lesson Content",
    "theory": "Theory",
    "theoryPlaceholder": "Enter the theory content of the lesson...",
    "structure": "Structure",
    "structurePlaceholder": "Enter the grammar structure...",
    "examples": "Examples",
    "examplePlaceholder": "Example {index}",
    "translationPlaceholder": "Translation {index}",
    "addExample": "Add Example",
    "usageRules": "Usage Rules",
    "ruleTitlePlaceholder": "Rule title {index}",
    "ruleDescriptionPlaceholder": "Rule description {index}",
    "addRule": "Add Rule",
    "commonMistakes": "Common Mistakes",
    "wrongSentencePlaceholder": "Wrong sentence {index}",
    "correctSentencePlaceholder": "Correct sentence {index}",
    "explanationPlaceholder": "Explanation {index}",
    "addMistake": "Add Common Mistake",
    "markdownSupported": "Basic Markdown formatting is supported.",
    "practice": {
      "title": "Grammar Practice",
      "subtitle": "Choose an exercise type to practice",
      "chooseExercise": "Choose Exercise Type",
      "chooseDescription": "Select an exercise type to start practicing",
      "score": "Score",
      "question": "Question",
      "checkAnswer": "Check Answer",
      "next": "Next",
      "finish": "Finish",
      "explanation": "Explanation",
      "reading": {
        "passage": "Passage",
        "readingTime": "Reading Time",
        "questions": "Questions",
        "showHighlights": "Show Highlights"
      },
      "exercises": {
        "checkAnswer": "Check Answer",
        "next": "Next",
        "multiple-choice": {
          "title": "Multiple Choice",
          "description": "Choose the correct answer from multiple options"
        },
        "fill-blank": {
          "title": "Fill in the Blanks",
          "description": "Complete sentences with the correct words"
        },
        "pronunciation": {
          "title": "Pronunciation",
          "description": "Practice speaking and pronunciation"
        },
        "reading": {
          "title": "Reading Comprehension",
          "description": "Read passages and answer questions",
          "passage": "Passage",
          "listen": "Listen",
          "readingTime": "Reading Time",
          "questions": "Questions",
          "true": "True",
          "false": "False",
          "yourAnswer": "Your Answer",
          "correctAnswer": "Correct Answer",
          "correct": "Correct",
          "incorrect": "Incorrect",
          "accuracy": "Accuracy",
          "showHighlights": "Show Highlights",
          "hideHighlights": "Hide Highlights"
        },
        "listening": {
          "title": "Listening",
          "description": "Listen to audio and answer questions",
          "instruction": "Listen to the audio and answer the questions:",
          "speed": "Speed",
          "playsLeft": "Plays Left",
          "loading": "Loading...",
          "questions": "Questions",
          "audioUrl": "Audio URL",
          "audioUrlPlaceholder": "Enter audio file URL or YouTube URL...",
          "maxPlays": "Maximum Plays",
          "allowNotes": "Allow Notes",
          "transcript": "Transcript",
          "transcriptPlaceholder": "Enter audio transcript...",
          "question": "Question",
          "multipleChoice": "Multiple Choice",
          "fillBlank": "Fill in the Blank",
          "ordering": "Ordering",
          "addQuestion": "Add Question",
          "correctAnswerPlaceholder": "Enter correct answer...",
          "notesAllowed": "Notes Allowed",
          "takeNotes": "Take Notes",
          "notesPlaceholder": "Write your notes here...",
          "correct": "Correct",
          "incorrect": "Incorrect",
          "accuracy": "Accuracy",
          "showTranscript": "Show Transcript",
          "correctAnswer": "Correct Answer",
          "audioUrlHint": "Enter direct audio URL or YouTube video URL",
          "youtubeDetected": "YouTube URL detected",
          "youtubeNote": "Audio will be extracted from this YouTube video for listening practice"
        },
        "writing": {
          "title": "Writing",
          "description": "Write essays and get feedback",
          "instruction": "Write a paragraph about the following topic:",
          "essay": "Essay",
          "email": "Email",
          "letter": "Letter",
          "paragraph": "Paragraph",
          "requirements": "Requirements",
          "minWords": "Minimum Words",
          "timeLimit": "Time Limit",
          "yourResponse": "Your Response",
          "words": "words",
          "timeRemaining": "Time Remaining",
          "paragraphPlaceholder": "Enter your paragraph here...",
          "essayPlaceholder": "Write your essay here...",
          "emailPlaceholder": "Write your email here...",
          "letterPlaceholder": "Write your letter here...",
          "tips": "Writing Tips",
          "showTips": "Show Tips",
          "hideTips": "Hide Tips",
          "tip1": "Use varied sentence structures",
          "tip2": "Check grammar and spelling",
          "tip3": "Use connecting words to link ideas",
          "tip4": "Ensure your writing has introduction, body, and conclusion",
          "tip5": "Use vocabulary appropriate to the topic",
          "saveDraft": "Save Draft",
          "clear": "Clear",
          "confirmClear": "Are you sure you want to clear all content?",
          "submit": "Submit",
          "analyzing": "Analyzing...",
          "feedback": "Feedback",
          "overallScore": "Overall Score",
          "grammar": "Grammar",
          "vocabulary": "Vocabulary",
          "coherence": "Coherence",
          "taskResponse": "Task Response",
          "strengths": "Strengths",
          "improvements": "Areas for Improvement",
          "corrections": "Specific Corrections",
          "original": "Original",
          "corrected": "Corrected",
          "explanation": "Explanation"
        }
      },
      "fillBlank": {
        "instruction": "Fill in the blanks with appropriate words:",
        "clear": "Clear All"
      },
      "pronunciation": {
        "instruction": "Listen and repeat the following sentence:",
        "listen": "Listen",
        "ready": "Ready",
        "recording": "Recording...",
        "recorded": "Recorded",
        "processing": "Processing...",
        "analyze": "Analyze",
        "feedback": "Feedback",
        "tips": "Tips",
        "tryAgain": "Try Again",
        "yourRecording": "Your Recording",
        "microphoneError": "Microphone error! Please check microphone access permissions."
      },
      "settings": {
        "title": "Exercise Settings",
        "difficulty": "Difficulty",
        "autoPlay": "Auto-play Audio",
        "autoplayAudio": "Auto-play Audio",
        "showExplanations": "Show Explanations",
        "timeLimit": "Time Limit (minutes)",
        "questionCount": "Number of Questions",
        "close": "Close",
        "save": "Save Settings",
        "levels": {
          "easy": "Easy",
          "medium": "Medium",
          "hard": "Hard"
        }
      },
      "exerciseManager": {
        "title": "Exercise Manager",
        "addNew": "Add New Exercise",
        "existing": "Existing Exercises",
        "exerciseType": "Exercise Type",
        "typePlaceholder": "Enter exercise type...",
        "titlePlaceholder": "Enter exercise title...",
        "description": "Description",
        "descriptionPlaceholder": "Enter exercise description...",
        "difficulty": "Difficulty",
        "duration": "Duration",
        "durationPlaceholder": "e.g. 10-15 minutes",
        "add": "Add Exercise",
        "manageQuestions": "Manage Questions"
      },
      "questionManager": {
        "title": "Question Manager",
        "addNew": "Add New Question",
        "editQuestion": "Edit Question",
        "addQuestion": "Add Question",
        "existingQuestions": "Existing Questions",
        "noQuestions": "No questions yet",
        "addFirstQuestion": "Add your first question",
        "question": "Question",
        "questionPlaceholder": "Enter question...",
        "options": "Options",
        "optionPlaceholder": "Enter option...",
        "correctAnswer": "Correct Answer",
        "explanation": "Explanation",
        "explanationPlaceholder": "Enter explanation...",
        "taskType": "Writing Type",
        "prompt": "Prompt",
        "promptPlaceholder": "Enter writing prompt...",
        "requirements": "Requirements",
        "addRequirement": "Add Requirement",
        "requirementPlaceholder": "Enter requirement...",
        "minWords": "Min Words",
        "timeLimit": "Time Limit (minutes)",
        "selectCorrectAnswer": "Select Correct Answer"
      },
      "progress": {
        "question": "Question",
        "of": "of",
        "score": "Score",
        "timeRemaining": "Time Remaining"
      },
      "results": {
        "title": "Exercise Results",
        "score": "Your Score",
        "correct": "Correct",
        "total": "Total",
        "accuracy": "Accuracy",
        "timeSpent": "Time Spent",
        "tryAgain": "Try Again",
        "backToMenu": "Back to Menu",
        "reviewAnswers": "Review Answers"
      },
      "common": {
        "submit": "Submit",
        "next": "Next",
        "previous": "Previous",
        "finish": "Finish",
        "check": "Check Answer",
        "checkAnswer": "Check Answer",
        "showAnswer": "Show Answer",
        "explanation": "Explanation",
        "hint": "Hint",
        "loading": "Loading...",
        "noAnswer": "No answer provided",
        "correct": "Correct!",
        "incorrect": "Incorrect",
        "skip": "Skip",
        "retry": "Retry"
      }
    }
  },
  "categories": {
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
  },
  "dashboard": {
    "title": "Dashboard",
    "description": "Overview of your learning progress",
    "quickActions": "Quick Actions",
    "recentActivity": "Recent Activity",
    "stats": {
      "vocabularyLearned": "Vocabulary Learned",
      "grammarLessons": "Grammar Lessons",
      "currentStreak": "Current Streak",
      "totalTime": "Total Time",
      "days": "days",
      "hours": "hours"
    },
    "actions": {
      "addVocabulary": "Add Vocabulary",
      "practiceFlashcard": "Practice Flashcard",
      "takeQuiz": "Take Quiz",
      "learnGrammar": "Learn Grammar"
    },
    "activity": {
      "updated": "Updated vocabulary \"{word}\" - {category}",
      "added": "Added vocabulary \"{word}\" - {category}",
      "justNow": "Just now",
      "noActivity": "No vocabulary activity yet",
      "addFirstVocab": "Add your first vocabulary!"
    }
  },
  "practice": {
    "controls": {
      "next": "Next",
      "complete": "Complete",
      "difficult": "Difficult",
      "easy": "Easy",
      "exit": "Exit"
    },
    "timer": {
      "startPractice": "Start Practice",
      "timeLimit": "Time limit per question: {seconds} seconds",
      "timeUp": "Time's Up!",
      "timeUpMessage": "You've run out of time for this question. Try again or skip.",
      "tryAgain": "Try Again",
      "skip": "Skip"
    },
    "exitWarning": {
      "title": "Exit Practice Warning",
      "message": "You are currently in a practice session. If you leave now, you will lose your progress and score. Are you sure you want to exit?",
      "continue": "Continue Practice",
      "exit": "Exit Practice"
    }
  },
  "quiz": {
    "progress": {
      "question": "Question"
    },
    "setup": {
      "title": "Quiz Settings",
      "description": "Customize your quiz preferences",
      "type": "Quiz Type",
      "level": "Difficulty Level",
      "questionCount": "Number of Questions",
      "timeLimit": "Time Limit (minutes)",
      "start": "Start Quiz",
      "allLevels": "All Levels",
      "unlimited": "Unlimited"
    },
    "types": {
      "vocabulary": "Vocabulary",
      "grammar": "Grammar",
      "mixed": "Mixed"
    },
    "navigation": {
      "previous": "Previous",
      "next": "Next",
      "finish": "Finish"
    },
    "results": {
      "completed": "Quiz Completed!",
      "yourResults": "Your Results",
      "score": "Score",
      "correct": "Correct",
      "accuracy": "Accuracy",
      "passed": "Passed",
      "failed": "Failed",
      "above": "Above",
      "below": "Below",
      "reviewAnswers": "Review Answers",
      "correctAnswer": "Correct Answer",
      "yourAnswer": "Your Answer",
      "noAnswer": "No Answer",
      "explanation": "Explanation",
      "restartQuiz": "Restart Quiz"
    }
  },
  "voice": {
    "selector": {
      "title": "Voice Selection"
    },
    "gender": {
      "female": "Female",
      "male": "Male"
    },
    "types": {
      "female_sweet": "Sweet Female",
      "female_clear": "Clear Female",
      "female_professional": "Professional Female",
      "male_strong": "Strong Male",
      "male_gentle": "Gentle Male",
      "male_deep": "Deep Male"
    },
    "info": {
      "name": "Voice Name",
      "language": "Language",
      "gender": "Gender"
    },
    "test": "Test Voice",
    "testing": "Testing...",
    "testText": "Hello! This is a voice test.",
    "settings": {
      "title": "Voice Settings",
      "rate": "Rate",
      "pitch": "Pitch",
      "volume": "Volume"
    }
  }
} as const

const vi = {
  "common": {
    "easy": "Dễ",
    "difficult": "Khó",
    "reviewed": "Đã xem",
    "correct": "Đúng",
    "incorrect": "Sai",
    "cancel": "Hủy",
    "back": "Quay lại",
    "restart": "Luyện tập lại",
    "vocabulary": "Từ vựng",
    "grammar": "Ngữ pháp",
    "practice": "Luyện tập",
    "dashboard": "Trang chủ",
    "save": "Lưu",
    "saving": "Đang lưu...",
    "update": "Cập nhật",
    "delete": "Xóa",
    "edit": "Sửa",
    "add": "Thêm",
    "search": "Tìm kiếm",
    "all": "Tất cả",
    "title": "Tiêu đề",
    "previous": "Trước",
    "next": "Tiếp",
    "minutes": "phút",
    "finish": "Hoàn thành",
    "close": "Đóng",
    "confirm": "Xác nhận",
    "reset": "Đặt lại",
    "apply": "Áp dụng",
    "resetToDefault": "Về mặc định",
    "actions": "Thao tác"
  },
  "levels": {
    "beginner": "Cơ bản",
    "intermediate": "Trung cấp",
    "advanced": "Nâng cao"
  },
  "vocabulary": {
    "title": "Từ vựng",
    "description": "Quản lý và học từ vựng tiếng Anh",
    "addNew": "Thêm từ mới",
    "addWord": "Thêm từ",
    "addVocabulary": "Thêm từ vựng mới",
    "editVocabulary": "Chỉnh sửa từ vựng",
    "saveVocabulary": "Lưu từ vựng",
    "deleteVocabulary": "Xóa từ vựng",
    "vocabularyList": "Danh sách từ vựng",
    "word": "Từ vựng",
    "pronunciation": "Phát âm",
    "meaning": "Nghĩa",
    "category": "Chủ đề",
    "level": "Mức độ",
    "wordType": "Từ loại",
    "note": "Ghi chú",
    "favorite": "Yêu thích",
    "isFavorite": "Đánh dấu là từ vựng yêu thích",
    "showFavoritesOnly": "Chỉ hiển thị từ vựng yêu thích",
    "searchPlaceholder": "Tìm từ vựng...",
    "wordPlaceholder": "Nhập từ vựng...",
    "meaningPlaceholder": "Nhập nghĩa của từ...",
    "example": "Ví dụ",
    "examplePlaceholder": "Nhập câu ví dụ...",
    "synonyms": "Từ đồng nghĩa",
    "antonyms": "Từ trái nghĩa",
    "separateByComma": "Cách nhau bằng dấu phẩy",
    "notePlaceholder": "Ghi chú thêm về từ này...",
    "selectCategory": "Chọn chủ đề",
    "selectLevel": "Chọn mức độ",
    "selectWordType": "Chọn từ loại",
    "confirmDelete": "Bạn có chắc chắn muốn xóa từ \"{word}\"?",
    "confirmDeleteTitle": "Xác nhận xóa",
    "confirmDeleteMessage": "Bạn có chắc chắn muốn xóa từ vựng này? Hành động này không thể hoàn tác.",
    "updateInfo": "Cập nhật thông tin từ vựng",
    "vocabInfo": "Thông tin từ vựng",
    "updateSuccess": "Từ vựng đã được cập nhật thành công.",
    "addSuccess": "Thêm từ vựng thành công!",
    "words": "từ",
    "createdAt": "Tạo lúc",
    "updatedAt": "Cập nhật",
    "grouping": {
      "title": "Nhóm theo ngày",
      "description": "Hiển thị từ vựng được nhóm theo ngày tạo",
      "hoverToExpand": "Di chuột để mở rộng",
      "hoverDescription": "Mở danh mục khi di chuột qua (khi bật)"
    },
    "notes": {
      "title": "Ghi chú từ vựng",
      "description": "Quản lý ghi chú cho các từ vựng đã học",
      "manageNotes": "Quản lý ghi chú",
      "noteLabel": "Ghi chú cho từ vựng",
      "placeholder": "Viết ghi chú về buổi học từ vựng này của bạn...",
      "wordsLearned": "Các từ trong nhóm này",
      "noWordsLearned": "Chưa có từ vựng nào trong nhóm này",
      "saveSuccess": "Đã lưu ghi chú thành công!",
      "autoSaveNotice": "Đã bật lưu tự động. Ghi chú của bạn sẽ được đưa vào bản sao lưu tiếp theo.",
      "today": "Hôm nay",
      "yesterday": "Hôm qua"
    },
    "lazyLoading": {
      "loading": "Đang tải...",
      "componentVisible": "Thành phần hiện đã hiển thị",
      "componentHidden": "Thành phần đã ẩn"
    },
    "accordion": {
      "expand": "Mở rộng nhóm",
      "collapse": "Thu gọn nhóm",
      "addTopic": "Thêm chủ đề",
      "editTopic": "Sửa chủ đề",
      "topicPlaceholder": "Nhập chủ đề cho nhóm này...",
      "saveTopic": "Lưu chủ đề",
      "cancelTopic": "Hủy"
    },
    "notFound": "Không tìm thấy từ vựng!",
    "updateError": "Có lỗi xảy ra khi cập nhật từ vựng. Vui lòng thử lại.",
    "deleteError": "Có lỗi xảy ra khi xóa từ vựng. Vui lòng thử lại.",
    "showingResults": "Hiển thị {start} đến {end} của {total} kết quả",
    "showingDateGroups": "Hiển thị {start} đến {end} của {total} nhóm ngày",
    "categories": {
      "technology": "Công nghệ",
      "business": "Kinh doanh",
      "travel": "Du lịch",
      "food": "Ẩm thực",
      "health": "Sức khỏe",
      "education": "Giáo dục",
      "sports": "Thể thao",
      "entertainment": "Giải trí",
      "science": "Khoa học",
      "art": "Nghệ thuật",
      "music": "Âm nhạc",
      "literature": "Văn học",
      "politics": "Chính trị",
      "environment": "Môi trường",
      "fashion": "Thời trang",
      "finance": "Tài chính"
    },
    "levels": {
      "beginner": "Cơ bản",
      "intermediate": "Trung cấp",
      "advanced": "Nâng cao"
    },
    "wordTypes": {
      "noun": "Danh từ (noun)",
      "verb": "Động từ (verb)",
      "adjective": "Tính từ (adjective)",
      "adverb": "Trạng từ (adverb)",
      "preposition": "Giới từ (preposition)",
      "conjunction": "Liên từ (conjunction)",
      "interjection": "Thán từ (interjection)"
    },
    "image": {
      "title": "Hình ảnh",
      "upload": "Tải lên",
      "url": "URL",
      "clickToUpload": "Nhấp để tải lên",
      "orDragDrop": " hoặc kéo thả tại đây",
      "supportedFormats": "PNG, JPG, GIF, WebP tối đa 5MB",
      "urlPlaceholder": "Dán URL hình ảnh từ internet...",
      "loadFromUrl": "Tải từ URL",
      "loading": "Đang tải...",
      "preview": "Xem trước hình ảnh",
      "change": "Thay đổi",
      "changeUrl": "Đổi URL",
      "remove": "Xóa",
      "fromUrl": "Từ URL",
      "processing": "Đang xử lý...",
      "errors": {
        "unsupportedFormat": "Định dạng file không được hỗ trợ. Vui lòng chọn PNG, JPG, GIF hoặc WebP.",
        "fileTooLarge": "File quá lớn. Vui lòng chọn file dưới 5MB.",
        "processingFailed": "Không thể xử lý hình ảnh. Vui lòng thử lại.",
        "emptyUrl": "Vui lòng nhập URL hình ảnh.",
        "invalidUrl": "URL không hợp lệ hoặc không phải là hình ảnh.",
        "urlLoadFailed": "Không thể tải hình ảnh từ URL. Vui lòng kiểm tra lại.",
        "corsWarning": "Hình ảnh đã được chấp nhận nhưng có thể không hiển thị do bảo mật website gốc."
      }
    },
    "save": {
      "mode": "Chế độ lưu:",
      "auto": "Tự động",
      "manual": "Thủ công",
      "saveNow": "Lưu ngay",
      "chooseAutoFile": "Chọn file auto-save",
      "setup": "Thiết lập",
      "changeAutoFile": "Đổi file auto-save",
      "change": "Đổi",
      "importFile": "Nhập file",
      "importShort": "Nhập",
      "lastSave": "Lần cuối: {time}",
      "notSaved": "Chưa lưu",
      "autoSaveFileSetup": "Thiết lập file lưu tự động thành công!",
      "autoSaveRetry": "Nhấp vào đây để chọn file lưu tự động mới",
      "status": {
        "saving": "Đang lưu...",
        "autoSaving": "Đang lưu tự động...",
        "autoWithFile": "Tự động (đã lưu file)",
        "autoLocalStorage": "Tự động (localStorage)",
        "autoFile": "Tự động (file)",
        "autoNoFile": "Tự động (chưa chọn file)",
        "fileSaved": "Đã lưu file",
        "error": "Lỗi lưu"
      },
      "errors": {
        "browserNotSupported": "Trình duyệt không hỗ trợ tính năng này. Vui lòng sử dụng Chrome hoặc Edge.",
        "fileSelectError": "Lỗi khi chọn file: {error}",
        "invalidFile": "Vui lòng chọn file JSON hợp lệ!",
        "invalidFormat": "Định dạng file không hợp lệ",
        "autoSaveFileFailed": "Lưu tự động vào file thất bại. Vui lòng chọn file mới.",
        "permissionDenied": "Quyền ghi vào file bị từ chối. Vui lòng chọn file mới."
      },
      "import": {
        "confirmMessage": "Bạn có muốn nhập {count} từ vựng từ file \"{filename}\"?\n\nDữ liệu hiện tại sẽ được thay thế!",
        "successMessage": "Đã nhập thành công {count} từ vựng!"
      }
    },
    "validation": {
      "wordRequired": "Từ vựng là bắt buộc",
      "wordTooShort": "Từ vựng phải có ít nhất 1 ký tự",
      "wordTooLong": "Từ vựng phải ít hơn 100 ký tự",
      "meaningRequired": "Nghĩa của từ là bắt buộc",
      "meaningTooShort": "Nghĩa của từ phải có ít nhất 1 ký tự",
      "meaningTooLong": "Nghĩa của từ phải ít hơn 500 ký tự",
      "partOfSpeechRequired": "Loại từ là bắt buộc",
      "categoryRequired": "Danh mục là bắt buộc",
      "levelRequired": "Cấp độ là bắt buộc",
      "exampleTooLong": "Ví dụ phải ít hơn 500 ký tự",
      "notesTooLong": "Ghi chú phải ít hơn 500 ký tự",
      "pronunciationTooLong": "Phiên âm phải ít hơn 100 ký tự",
      "synonymsInvalid": "Vui lòng nhập từ đồng nghĩa hợp lệ, ngăn cách bằng dấu phẩy",
      "antonymsInvalid": "Vui lòng nhập từ trái nghĩa hợp lệ, ngăn cách bằng dấu phẩy",
      "saveError": "Có lỗi khi lưu từ vựng. Vui lòng thử lại.",
      "saveSuccess": "Lưu từ vựng thành công!",
      "updateSuccess": "Cập nhật từ vựng thành công!"
    },
    "details": {
      "title": "Chi tiết từ vựng",
      "playAudio": "Phát âm từ vựng",
      "playExample": "Phát âm ví dụ",
      "addFavorite": "Thêm vào yêu thích",
      "removeFavorite": "Bỏ khỏi yêu thích"
    },
    "topicManager": {
      "title": "Quản lý chủ đề",
      "addNewTopic": "Thêm chủ đề mới",
      "editTopic": "Sửa chủ đề",
      "topicKey": "Mã chủ đề",
      "topicKeyPlaceholder": "Ví dụ: cooking, programming...",
      "keyDescription": "Mã này sẽ được dùng trong hệ thống. Chỉ dùng chữ thường, số và dấu gạch dưới.",
      "vietnameseName": "Tên tiếng Việt",
      "vietnameseNamePlaceholder": "Ví dụ: Nấu ăn, Lập trình...",
      "englishName": "Tên tiếng Anh",
      "englishNamePlaceholder": "Example: Cooking, Programming...",
      "existingTopics": "Chủ đề hiện có",
      "noCustomTopics": "Chưa có chủ đề tùy chỉnh nào.",
      "cannotDeleteInUse": "Không thể xóa chủ đề đang được sử dụng",
      "confirmDeleteTitle": "Xác nhận xóa chủ đề",
      "confirmDeleteMessage": "Bạn có chắc chắn muốn xóa chủ đề \"{topic}\"?",
      "duplicateKey": "Mã chủ đề đã tồn tại!",
      "builtInTopics": "Chủ đề có sẵn",
      "builtInTopicsDescription": "Hệ thống có sẵn 16 chủ đề cơ bản như Technology, Business, Travel... Bạn có thể thêm chủ đề tùy chỉnh ở đây.",
      "builtIn": "Có sẵn",
      "manageTopics": "Quản lý chủ đề"
    },
    "deleteSuccess": "Đã xóa \"{word}\" thành công."
  },
  "flashcard": {
    "header": {
      "history": "Lịch sử",
      "settings": "Cài đặt",
      "progress": "Tiến độ",
      "description": "Luyện tập từ vựng với thẻ ghi nhớ",
      "exit": "Thoát"
    },
    "empty": {
      "title": "Không có flashcard nào",
      "description": "Hãy thêm từ vựng để bắt đầu luyện tập.",
      "action": "Thêm từ vựng"
    },
    "settings": {
      "title": "Cài đặt Flashcard",
      "category": "Chủ đề",
      "level": "Mức độ",
      "all": "Tất cả",
      "beginner": "Cơ bản",
      "intermediate": "Trung cấp",
      "advanced": "Nâng cao",
      "autoFlip": "Tự động lật thẻ sau 3 giây",
      "shuffle": "Xáo trộn thứ tự"
    },
    "history": {
      "title": "Lịch sử luyện tập",
      "empty": {
        "title": "Chưa có lịch sử",
        "description": "Bắt đầu luyện tập để xem lịch sử của bạn."
      },
      "totalCards": "Tổng số thẻ",
      "correct": "Đúng",
      "incorrect": "Sai",
      "duration": "Thời gian",
      "categories": "Chủ đề",
      "accuracy": "Độ chính xác",
      "result": "Kết quả",
      "pass": "Đạt",
      "fail": "Chưa đạt"
    },
    "completion": {
      "title": "Hoàn thành!",
      "description": "Bạn đã hoàn thành {count} flashcard.",
      "correct": "Đúng",
      "incorrect": "Sai",
      "accuracy": "Độ chính xác",
      "result": "Kết quả"
    },
    "modes": {
      "flashcard": "Thẻ ghi nhớ",
      "quiz": "Trắc nghiệm",
      "typing": "Gõ từ",
      "listening": "Nghe",
      "image": "Nhìn ảnh",
      "pronunciation": "Phát âm"
    },
    "image": {
      "imageAlt": "Hình ảnh từ vựng",
      "imageError": "Không thể tải hình ảnh",
      "noImage": "Không có hình ảnh",
      "placeholder": "Nhập từ vựng...",
      "instruction": "Nhìn vào hình ảnh và nhập từ vựng tương ứng:",
      "correctAnswer": "Đáp án đúng"
    },
    "listening": {
      "instruction": "Nghe và nhập từ bạn nghe được:",
      "placeholder": "Nhập từ bạn nghe được...",
      "correct": "✓ Chính xác!",
      "incorrect": "✗ Đáp án đúng:"
    },
    "dateFilter": {
      "enable": "Lọc theo ngày tạo",
      "allDates": "Tất cả ngày",
      "info": "Hiển thị {count} từ vựng từ {date}"
    }
  },
  "grammar": {
    "title": "Ngữ pháp",
    "description": "Học và luyện tập ngữ pháp tiếng Anh",
    "addLesson": "Thêm bài học",
    "addNewLesson": "Thêm bài học mới",
    "editLesson": "Sửa bài học",
    "deleteLesson": "Xóa bài học",
    "confirmDelete": "Bạn có chắc chắn muốn xóa bài học \"{title}\"?",
    "search": "Tìm bài học ngữ pháp...",
    "level": "Mức độ",
    "category": "Chủ đề",
    "duration": "phút",
    "durationLabel": "Thời lượng (phút)",
    "progress": "Tiến độ",
    "continue": "Tiếp tục",
    "start": "Bắt đầu",
    "emptyState": {
      "title": "Không tìm thấy bài học nào",
      "description": "Hãy thử thay đổi bộ lọc hoặc thêm bài học mới."
    },
    "levels": {
      "beginner": "Cơ bản",
      "intermediate": "Trung cấp",
      "advanced": "Nâng cao"
    },
    "selectCategory": "Chọn chủ đề",
    "selectLevel": "Chọn mức độ",
    "titlePlaceholder": "Nhập tiêu đề bài học...",
    "descriptionPlaceholder": "Nhập mô tả ngắn về bài học...",
    "lessonContent": "Nội dung bài học",
    "theory": "Lý thuyết",
    "theoryPlaceholder": "Nhập nội dung lý thuyết của bài học...",
    "structure": "Cấu trúc",
    "structurePlaceholder": "Nhập cấu trúc ngữ pháp...",
    "examples": "Ví dụ",
    "examplePlaceholder": "Ví dụ {index}",
    "translationPlaceholder": "Dịch nghĩa {index}",
    "addExample": "Thêm ví dụ",
    "usageRules": "Quy tắc sử dụng",
    "ruleTitlePlaceholder": "Tiêu đề quy tắc {index}",
    "ruleDescriptionPlaceholder": "Mô tả quy tắc {index}",
    "addRule": "Thêm quy tắc",
    "commonMistakes": "Lỗi thường gặp",
    "wrongSentencePlaceholder": "Câu sai {index}",
    "correctSentencePlaceholder": "Câu đúng {index}",
    "explanationPlaceholder": "Giải thích {index}",
    "addMistake": "Thêm lỗi thường gặp",
    "markdownSupported": "Hỗ trợ định dạng Markdown cơ bản.",
    "practice": {
      "title": "Luyện tập ngữ pháp",
      "subtitle": "Chọn loại bài tập để luyện tập",
      "chooseExercise": "Chọn loại bài tập",
      "chooseDescription": "Chọn một loại bài tập để bắt đầu luyện tập",
      "score": "Điểm",
      "question": "Câu hỏi",
      "checkAnswer": "Kiểm tra đáp án",
      "next": "Tiếp theo",
      "finish": "Hoàn thành",
      "explanation": "Giải thích",
      "reading": {
        "passage": "Đoạn văn",
        "readingTime": "Thời gian đọc",
        "questions": "Câu hỏi",
        "showHighlights": "Hiển thị đánh dấu"
      },
      "exercises": {
        "checkAnswer": "Kiểm tra đáp án",
        "next": "Tiếp theo",
        "multiple-choice": {
          "title": "Trắc nghiệm",
          "description": "Chọn đáp án đúng từ nhiều lựa chọn"
        },
        "fill-blank": {
          "title": "Điền vào chỗ trống",
          "description": "Hoàn thành câu với từ đúng"
        },
        "pronunciation": {
          "title": "Phát âm",
          "description": "Luyện tập nói và phát âm"
        },
        "reading": {
          "title": "Đọc hiểu",
          "description": "Đọc đoạn văn và trả lời câu hỏi",
          "passage": "Đoạn văn",
          "listen": "Nghe",
          "readingTime": "Thời gian đọc",
          "questions": "Câu hỏi",
          "true": "Đúng",
          "false": "Sai",
          "yourAnswer": "Câu trả lời của bạn",
          "correctAnswer": "Câu trả lời đúng",
          "correct": "Đúng",
          "incorrect": "Sai",
          "accuracy": "Độ chính xác",
          "showHighlights": "Hiển thị đánh dấu",
          "hideHighlights": "Ẩn đánh dấu"
        },
        "listening": {
          "title": "Nghe",
          "description": "Nghe audio và trả lời câu hỏi",
          "instruction": "Nghe đoạn audio và trả lời câu hỏi:",
          "speed": "Tốc độ",
          "playsLeft": "Lượt nghe còn lại",
          "loading": "Đang tải...",
          "questions": "Câu hỏi",
          "audioUrl": "URL âm thanh",
          "audioUrlPlaceholder": "Nhập đường dẫn file âm thanh...",
          "maxPlays": "Số lần nghe tối đa",
          "allowNotes": "Cho phép ghi chú",
          "transcript": "Bản ghi âm",
          "transcriptPlaceholder": "Nhập nội dung bản ghi âm...",
          "question": "Câu hỏi",
          "multipleChoice": "Trắc nghiệm",
          "fillBlank": "Điền vào chỗ trống",
          "ordering": "Sắp xếp thứ tự",
          "addQuestion": "Thêm câu hỏi",
          "correctAnswerPlaceholder": "Nhập đáp án đúng...",
          "notesAllowed": "Cho phép ghi chú",
          "takeNotes": "Ghi chú",
          "notesPlaceholder": "Viết ghi chú của bạn ở đây...",
          "correct": "Đúng",
          "incorrect": "Sai",
          "accuracy": "Độ chính xác",
          "showTranscript": "Hiện bản ghi âm",
          "correctAnswer": "Đáp án đúng",
          "audioUrlHint": "Nhập URL âm thanh trực tiếp hoặc URL video YouTube",
          "youtubeDetected": "Phát hiện URL YouTube",
          "youtubeNote": "Âm thanh sẽ được trích xuất từ video YouTube này để luyện nghe"
        },
        "writing": {
          "title": "Luyện viết",
          "description": "Viết bài luận và nhận phản hồi",
          "instruction": "Viết một đoạn văn về chủ đề sau:",
          "essay": "Bài luận",
          "email": "Email",
          "letter": "Thư",
          "paragraph": "Đoạn văn",
          "requirements": "Yêu cầu",
          "minWords": "Số từ tối thiểu",
          "timeLimit": "Thời gian giới hạn",
          "yourResponse": "Câu trả lời của bạn",
          "words": "từ",
          "timeRemaining": "Thời gian còn lại",
          "paragraphPlaceholder": "Nhập đoạn văn của bạn ở đây...",
          "essayPlaceholder": "Viết bài luận của bạn ở đây...",
          "emailPlaceholder": "Viết email của bạn ở đây...",
          "letterPlaceholder": "Viết thư của bạn ở đây...",
          "tips": "Mẹo viết",
          "showTips": "Hiển thị mẹo",
          "hideTips": "Ẩn mẹo",
          "tip1": "Sử dụng cấu trúc câu đa dạng",
          "tip2": "Kiểm tra ngữ pháp và chính tả",
          "tip3": "Sử dụng từ nối để liên kết ý tưởng",
          "tip4": "Đảm bảo bài viết có mở bài, thân bài và kết luận",
          "tip5": "Sử dụng từ vựng phù hợp với chủ đề",
          "saveDraft": "Lưu nháp",
          "clear": "Xóa",
          "confirmClear": "Bạn có chắc chắn muốn xóa toàn bộ nội dung?",
          "submit": "Nộp bài",
          "analyzing": "Đang phân tích...",
          "feedback": "Phản hồi",
          "overallScore": "Điểm tổng thể",
          "grammar": "Ngữ pháp",
          "vocabulary": "Từ vựng",
          "coherence": "Tính mạch lạc",
          "taskResponse": "Phản hồi chủ đề",
          "strengths": "Điểm mạnh",
          "improvements": "Cần cải thiện",
          "corrections": "Sửa lỗi cụ thể",
          "original": "Gốc",
          "corrected": "Đã sửa",
          "explanation": "Giải thích"
        }
      },
      "fillBlank": {
        "instruction": "Điền từ thích hợp vào chỗ trống:",
        "clear": "Xóa tất cả"
      },
      "pronunciation": {
        "instruction": "Nghe và lặp lại câu sau:",
        "listen": "Nghe",
        "ready": "Sẵn sàng",
        "recording": "Đang ghi âm...",
        "recorded": "Đã ghi âm",
        "processing": "Đang xử lý...",
        "analyze": "Phân tích",
        "feedback": "Phản hồi",
        "tips": "Mẹo",
        "tryAgain": "Thử lại",
        "yourRecording": "Bản ghi âm của bạn",
        "microphoneError": "Lỗi microphone! Vui lòng kiểm tra quyền truy cập microphone."
      },
      "settings": {
        "title": "Cài đặt bài tập",
        "difficulty": "Độ khó",
        "autoPlay": "Tự động phát âm thanh",
        "autoplayAudio": "Tự động phát âm thanh",
        "showExplanations": "Hiển thị giải thích",
        "timeLimit": "Giới hạn thời gian (phút)",
        "questionCount": "Số câu hỏi",
        "close": "Đóng",
        "save": "Lưu cài đặt",
        "levels": {
          "easy": "Dễ",
          "medium": "Trung bình",
          "hard": "Khó"
        }
      },
      "exerciseManager": {
        "title": "Quản lý bài tập",
        "addNew": "Thêm bài tập mới",
        "existing": "Bài tập hiện có",
        "exerciseType": "Loại bài tập",
        "typePlaceholder": "Nhập loại bài tập...",
        "titlePlaceholder": "Nhập tiêu đề bài tập...",
        "description": "Mô tả",
        "descriptionPlaceholder": "Nhập mô tả bài tập...",
        "difficulty": "Độ khó",
        "duration": "Thời lượng",
        "durationPlaceholder": "Ví dụ: 10-15 phút",
        "add": "Thêm bài tập",
        "manageQuestions": "Quản lý đề bài"
      },
      "questionManager": {
        "title": "Quản lý đề bài",
        "addNew": "Thêm đề bài mới",
        "editQuestion": "Sửa đề bài",
        "addQuestion": "Thêm đề bài",
        "existingQuestions": "Đề bài hiện có",
        "noQuestions": "Chưa có đề bài nào",
        "addFirstQuestion": "Hãy thêm đề bài đầu tiên",
        "question": "Câu hỏi",
        "questionPlaceholder": "Nhập câu hỏi...",
        "options": "Các lựa chọn",
        "optionPlaceholder": "Nhập lựa chọn...",
        "correctAnswer": "Đáp án đúng",
        "explanation": "Giải thích",
        "explanationPlaceholder": "Nhập giải thích...",
        "taskType": "Loại bài viết",
        "prompt": "Đề bài",
        "promptPlaceholder": "Nhập đề bài viết...",
        "requirements": "Yêu cầu",
        "addRequirement": "Thêm yêu cầu",
        "requirementPlaceholder": "Nhập yêu cầu...",
        "minWords": "Số từ tối thiểu",
        "timeLimit": "Thời gian (phút)",
        "selectCorrectAnswer": "Chọn đáp án đúng"
      },
      "progress": {
        "question": "Câu hỏi",
        "of": "của",
        "score": "Điểm",
        "timeRemaining": "Thời gian còn lại"
      },
      "results": {
        "title": "Kết quả bài tập",
        "score": "Điểm của bạn",
        "correct": "Đúng",
        "total": "Tổng",
        "accuracy": "Độ chính xác",
        "timeSpent": "Thời gian làm bài",
        "tryAgain": "Thử lại",
        "backToMenu": "Về menu",
        "reviewAnswers": "Xem lại đáp án"
      },
      "common": {
        "submit": "Nộp bài",
        "next": "Tiếp theo",
        "previous": "Trước",
        "finish": "Hoàn thành",
        "check": "Kiểm tra đáp án",
        "checkAnswer": "Kiểm tra đáp án",
        "showAnswer": "Hiện đáp án",
        "explanation": "Giải thích",
        "hint": "Gợi ý",
        "loading": "Đang tải...",
        "noAnswer": "Không có đáp án",
        "correct": "Đúng!",
        "incorrect": "Sai",
        "skip": "Bỏ qua",
        "retry": "Thử lại"
      }
    }
  },
  "categories": {
    "technology": "Công nghệ",
    "business": "Kinh doanh",
    "travel": "Du lịch",
    "food": "Ẩm thực",
    "health": "Sức khỏe",
    "education": "Giáo dục",
    "sports": "Thể thao",
    "entertainment": "Giải trí",
    "science": "Khoa học",
    "art": "Nghệ thuật",
    "music": "Âm nhạc",
    "literature": "Văn học",
    "politics": "Chính trị",
    "environment": "Môi trường",
    "fashion": "Thời trang",
    "finance": "Tài chính"
  },
  "dashboard": {
    "title": "Trang chủ",
    "description": "Tổng quan về tiến độ học tập của bạn",
    "quickActions": "Hành động nhanh",
    "recentActivity": "Hoạt động gần đây",
    "stats": {
      "vocabularyLearned": "Từ vựng đã học",
      "grammarLessons": "Bài ngữ pháp",
      "currentStreak": "Streak hiện tại",
      "totalTime": "Tổng thời gian",
      "days": "ngày",
      "hours": "giờ"
    },
    "actions": {
      "addVocabulary": "Thêm từ vựng",
      "practiceFlashcard": "Luyện Flashcard",
      "takeQuiz": "Làm Quiz",
      "learnGrammar": "Học ngữ pháp"
    },
    "activity": {
      "updated": "Cập nhật từ vựng \"{word}\" - {category}",
      "added": "Thêm từ vựng \"{word}\" - {category}",
      "justNow": "Vừa xong",
      "noActivity": "Chưa có hoạt động từ vựng nào",
      "addFirstVocab": "Hãy thêm từ vựng đầu tiên!"
    }
  },
  "practice": {
    "controls": {
      "next": "Tiếp theo",
      "complete": "Hoàn thành",
      "difficult": "Khó",
      "easy": "Dễ",
      "exit": "Thoát"
    },
    "timer": {
      "startPractice": "Bắt đầu luyện tập",
      "timeLimit": "Thời gian cho mỗi câu: {seconds} giây",
      "timeUp": "Hết thời gian!",
      "timeUpMessage": "Bạn đã hết thời gian cho câu này. Hãy thử lại hoặc bỏ qua.",
      "tryAgain": "Thử lại",
      "skip": "Bỏ qua"
    },
    "exitWarning": {
      "title": "Cảnh báo rời khỏi bài tập",
      "message": "Bạn đang trong quá trình luyện tập. Nếu rời khỏi bây giờ, bạn sẽ mất tiến độ và không đạt điểm. Bạn có chắc chắn muốn rời?",
      "continue": "Tiếp tục luyện tập",
      "exit": "Rời khỏi bài tập"
    }
  },
  "quiz": {
    "progress": {
      "question": "Câu hỏi"
    },
    "setup": {
      "title": "Cài đặt Quiz",
      "description": "Tùy chỉnh quiz theo sở thích của bạn",
      "type": "Loại quiz",
      "level": "Mức độ",
      "questionCount": "Số câu hỏi",
      "timeLimit": "Thời gian (phút)",
      "start": "Bắt đầu Quiz",
      "allLevels": "Tất cả",
      "unlimited": "Không giới hạn"
    },
    "types": {
      "vocabulary": "Từ vựng",
      "grammar": "Ngữ pháp",
      "mixed": "Hỗn hợp"
    },
    "navigation": {
      "previous": "Câu trước",
      "next": "Câu tiếp",
      "finish": "Hoàn thành"
    },
    "results": {
      "completed": "Quiz hoàn thành!",
      "yourResults": "Kết quả của bạn",
      "score": "Điểm số",
      "correct": "Đúng",
      "accuracy": "Độ chính xác",
      "passed": "Đạt",
      "failed": "Chưa đạt",
      "above": "Trên",
      "below": "Dưới",
      "reviewAnswers": "Xem lại đáp án",
      "correctAnswer": "Đáp án đúng",
      "yourAnswer": "Bạn chọn",
      "noAnswer": "Không chọn",
      "explanation": "Giải thích",
      "restartQuiz": "Làm lại Quiz"
    }
  },
  "voice": {
    "selector": {
      "title": "Giọng đọc"
    },
    "gender": {
      "female": "Nữ",
      "male": "Nam"
    },
    "types": {
      "female_sweet": "Giọng nữ Ngọt ngào",
      "female_clear": "Giọng nữ Trong trẻo",
      "female_professional": "Giọng nữ Chuyên nghiệp",
      "male_strong": "Giọng nam Mạnh mẽ",
      "male_gentle": "Giọng nam Dịu dàng",
      "male_deep": "Giọng nam Trầm ấm"
    },
    "info": {
      "name": "Tên",
      "language": "Ngôn ngữ",
      "gender": "Giới tính"
    },
    "test": "Thử nghiệm giọng",
    "testing": "Đang thử...",
    "testText": "Xin chào! Đây là một bài kiểm tra giọng nói.",
    "settings": {
      "title": "Cài đặt giọng nói",
      "rate": "Tốc độ",
      "pitch": "Cao độ",
      "volume": "Âm lượng"
    }
  }
} as const

// Type definitions for messages
type MessageSchema = typeof en

// Safe locale getter with fallback
function getInitialLocale(): 'en' | 'vi' {
  try {
    const savedLocale = localStorage.getItem('locale')
    return (savedLocale === 'en' || savedLocale === 'vi') ? savedLocale : 'vi'
  } catch (error) {
    console.warn('localStorage not available, using default locale:', error)
    return 'vi'
  }
}

const i18n = createI18n({
  legacy: false, // you must set `false`, to use Composition API
  locale: getInitialLocale(), // set default locale
  fallbackLocale: 'en', // set fallback locale
  messages: {
    en,
    vi
  }
})

export default i18n

// Utility function to change locale
export function setLocale(locale: 'en' | 'vi') {
  i18n.global.locale.value = locale
  try {
    localStorage.setItem('locale', locale)
  } catch (error) {
    console.warn('Could not save locale to localStorage:', error)
  }
  document.querySelector('html')?.setAttribute('lang', locale)
}

// Utility function to get current locale
export function getLocale(): 'en' | 'vi' {
  return i18n.global.locale.value as 'en' | 'vi'
}

// Utility function to check if current locale is English
export function isEnglish(): boolean {
  return i18n.global.locale.value === 'en'
}

// Utility function to toggle locale
export function toggleLocale(): 'en' | 'vi' {
  const newLocale = i18n.global.locale.value === 'en' ? 'vi' : 'en'
  setLocale(newLocale)
  return newLocale
}
