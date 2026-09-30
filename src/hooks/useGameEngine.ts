import { useCallback, useEffect, useRef, useState } from 'react';
import { GameConfig } from '../context/GameContext';
import { getCategory } from '../data/categories';
import { createDeck, filterByDifficulty } from '../utils/deck';
import { GET_READY_SECONDS } from '../constants/game';

export type GameStatus = 'ready' | 'playing' | 'finished';

/** All game rules live here: get-ready countdown, timer, deck, score. */
export function useGameEngine(config: GameConfig) {
  const [deck] = useState(() =>
    createDeck(
      `${config.categoryId}:${config.difficulty}`,
      filterByDifficulty(getCategory(config.categoryId).words, config.difficulty)
    )
  );
  const [word, setWord] = useState(() => deck.next());
  const [status, setStatus] = useState<GameStatus>('ready');
  const [countdown, setCountdown] = useState(GET_READY_SECONDS);
  const [timeLeft, setTimeLeft] = useState(config.duration);
  const [score, setScore] = useState(0);
  const [skipped, setSkipped] = useState(0);

  // The ref flips synchronously, so an action arriving after time is up is ignored.
  const statusRef = useRef<GameStatus>('ready');
  const endTimeRef = useRef(0);

  // Get-ready countdown
  useEffect(() => {
    if (status !== 'ready') return;
    if (countdown <= 0) {
      endTimeRef.current = Date.now() + config.duration * 1000;
      statusRef.current = 'playing';
      setStatus('playing');
      return;
    }
    const t = setTimeout(() => setCountdown((c) => c - 1), 1000);
    return () => clearTimeout(t);
  }, [status, countdown, config.duration]);

  // Main timer (based on the clock, so it doesn't drift)
  useEffect(() => {
    if (status !== 'playing') return;
    const id = setInterval(() => {
      const remaining = Math.max(0, Math.ceil((endTimeRef.current - Date.now()) / 1000));
      setTimeLeft(remaining);
      if (remaining === 0) {
        statusRef.current = 'finished';
        setStatus('finished');
        clearInterval(id);
      }
    }, 200);
    return () => clearInterval(id);
  }, [status]);

  const answer = useCallback(
    (correct: boolean): boolean => {
      if (statusRef.current !== 'playing') return false; // too late: time is up
      if (correct) setScore((s) => s + 1);
      else setSkipped((s) => s + 1);
      setWord(deck.next());
      return true;
    },
    [deck]
  );

  return {
    status,
    countdown,
    timeLeft,
    word,
    score,
    skipped,
    markCorrect: useCallback(() => answer(true), [answer]),
    markSkip: useCallback(() => answer(false), [answer]),
  };
}
