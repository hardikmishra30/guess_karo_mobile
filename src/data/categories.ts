import { Category } from './types';
import { animals } from './animals';
import { food } from './food';
import { movies } from './movies';
import { actions } from './actions';
import { heroes } from './heroes';
import { heroines } from './heroines';
import { cricketers } from './cricketers';
import { politicians } from './politicians';
import { singers } from './singers';
import { culture } from './culture';

const baseCategories: Category[] = [
  { id: 'animals', label: 'Animals', emoji: '🐘', color: '#15803D', words: animals },
  { id: 'food', label: 'Food', emoji: '🍔', color: '#C2410C', words: food },
  { id: 'movies', label: 'Indian Movies', emoji: '🎬', color: '#7C3AED', words: movies },
  { id: 'actions', label: 'Act It Out', emoji: '🎭', color: '#DB2777', words: actions },
  { id: 'heroes', label: 'Indian Heroes', emoji: '🦸', color: '#2563EB', words: heroes },
  { id: 'heroines', label: 'Indian Heroines', emoji: '👩', color: '#C026D3', words: heroines },
  { id: 'cricketers', label: 'World Cricketers', emoji: '🏏', color: '#0E7490', words: cricketers },
  { id: 'politicians', label: 'Indian Politicians', emoji: '🏛️', color: '#475569', words: politicians },
  { id: 'singers', label: 'Indian Singers', emoji: '🎤', color: '#E11D48', words: singers },
  { id: 'culture', label: 'Indian Culture', emoji: '🇮🇳', color: '#B45309', words: culture },
];

const mixed: Category = {
  id: 'mixed',
  label: 'Mixed',
  emoji: '🔥',
  color: '#E11D48',
  words: baseCategories.flatMap((c) => c.words),
};

export const CATEGORIES: Category[] = [...baseCategories, mixed];

export const getCategory = (id: string): Category =>
  CATEGORIES.find((c) => c.id === id) ?? CATEGORIES[0];
