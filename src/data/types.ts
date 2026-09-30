export type Difficulty = 'easy' | 'medium' | 'hard';

export interface Word {
  id: string;
  text: string;
  category: string;
  difficulty: Difficulty;
}

export interface Category {
  id: string;
  label: string;
  emoji: string;
  color: string;
  words: Word[];
}
