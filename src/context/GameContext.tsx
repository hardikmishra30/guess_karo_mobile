import { createContext, ReactNode, useContext, useEffect, useState } from 'react';
import { Difficulty } from '../data/types';
import { DEFAULT_TIMER } from '../constants/game';
import { useSettings } from './SettingsContext';

export interface GameConfig {
  categoryId: string;
  duration: number;
  difficulty: Difficulty;
}

export interface LastResult {
  score: number;
  categoryId: string;
}

interface GameContextValue {
  config: GameConfig;
  updateConfig: (patch: Partial<GameConfig>) => void;
  lastResult: LastResult | null;
  setLastResult: (r: LastResult) => void;
}

const GameContext = createContext<GameContextValue | null>(null);

export function GameProvider({ children }: { children: ReactNode }) {
  const { settings } = useSettings();
  const [config, setConfig] = useState<GameConfig>({
    categoryId: 'animals',
    duration: DEFAULT_TIMER,
    difficulty: 'easy',
  });
  const [lastResult, setLastResult] = useState<LastResult | null>(null);

  // The timer follows the default from Settings (also once settings finish loading)
  useEffect(() => {
    setConfig((c) => ({ ...c, duration: settings.defaultTimer }));
  }, [settings.defaultTimer]);

  const updateConfig = (patch: Partial<GameConfig>) => setConfig((c) => ({ ...c, ...patch }));

  return (
    <GameContext.Provider value={{ config, updateConfig, lastResult, setLastResult }}>
      {children}
    </GameContext.Provider>
  );
}

export function useGame() {
  const ctx = useContext(GameContext);
  if (!ctx) throw new Error('useGame must be used inside GameProvider');
  return ctx;
}
