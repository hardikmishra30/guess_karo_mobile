import { Difficulty, Word } from '../data/types';
import { MIN_POOL_SIZE } from '../constants/game';

const ALLOWED: Record<Difficulty, Difficulty[]> = {
  easy: ['easy'],
  medium: ['easy', 'medium'],
  hard: ['easy', 'medium', 'hard'],
};

/** Keeps words up to the chosen difficulty. Falls back to all words if too few remain. */
export function filterByDifficulty(words: Word[], difficulty: Difficulty): Word[] {
  const pool = words.filter((w) => ALLOWED[difficulty].includes(w.difficulty));
  return pool.length >= MIN_POOL_SIZE ? pool : words;
}

// Remembers what was already shown for each category + difficulty, even across games
// ("Play Again" continues with unseen words instead of restarting the same sequence).
const history = new Map<string, { used: Set<string>; lastId: string | null }>();

export function createDeck(key: string, words: Word[]) {
  return {
    next(): Word {
      let h = history.get(key);
      if (!h) {
        h = { used: new Set(), lastId: null };
        history.set(key, h);
      }
      let fresh = words.filter((w) => !h.used.has(w.id));
      if (fresh.length === 0) {
        // Every word was shown: start over, but never repeat the word we just showed
        h.used.clear();
        fresh = words.filter((w) => w.id !== h.lastId);
        if (fresh.length === 0) fresh = words;
      }
      const pick = fresh[Math.floor(Math.random() * fresh.length)];
      h.used.add(pick.id);
      h.lastId = pick.id;
      return pick;
    },
  };
}
