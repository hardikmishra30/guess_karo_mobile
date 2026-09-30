import { Difficulty, Word } from './types';

const slug = (s: string) => s.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/(^-|-$)/g, '');

/** Turns { easy: ['Lion'], hard: [...] } into Word objects. Add words by just adding strings. */
export function makeWords(category: string, entries: Partial<Record<Difficulty, string[]>>): Word[] {
  return (Object.keys(entries) as Difficulty[]).flatMap((difficulty) =>
    (entries[difficulty] ?? []).map((text) => ({
      id: `${category}-${slug(text)}`,
      text,
      category,
      difficulty,
    }))
  );
}
