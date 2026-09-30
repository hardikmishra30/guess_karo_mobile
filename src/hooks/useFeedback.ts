import { useMemo } from 'react';
import { useSettings } from '../context/SettingsContext';
import { Buzz, playSound, Sfx, vibrate } from '../services/feedback';

/** Sound + vibration that respect the Settings toggles. */
export function useFeedback() {
  const { settings } = useSettings();
  return useMemo(() => {
    const fire = (sfx: Sfx, buzz: Buzz) => {
      if (settings.sound) playSound(sfx);
      if (settings.vibration) vibrate(buzz);
    };
    return {
      correct: () => fire('correct', 'success'),
      skip: () => fire('skip', 'light'),
      tick: () => fire('tick', 'light'),
      finish: () => fire('finish', 'heavy'),
    };
  }, [settings.sound, settings.vibration]);
}
