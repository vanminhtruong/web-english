export type PracticeMode = 'flashcard' | 'quiz' | 'typing' | 'image' | 'pronunciation' | 'listening' | 'pictionary';

export interface GameSettings {
  cardCount: number;
  difficulty: 'all' | 'easy' | 'medium' | 'hard';
  autoFlip: boolean;
  flipDelay: number;
  showDefinition: boolean;
  showExample: boolean;
  showPronunciation: boolean;
  shuffleCards: boolean;
  voiceType: 'female' | 'male';
  practiceMode?: PracticeMode;
  category?: string;
  level?: string;
}