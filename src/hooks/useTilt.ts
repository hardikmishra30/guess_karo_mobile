import { useEffect, useRef, useState } from 'react';
import { Accelerometer } from 'expo-sensors';
import { TILT } from '../constants/tilt';
import { createTiltDetector, TiltAction, TiltState } from '../utils/tiltDetector';

interface Options {
  enabled: boolean;
  onAction: (action: TiltAction) => void;
  /** Only the Tilt Test screen needs live values; keep false during a game to avoid re-renders. */
  debug?: boolean;
}

/** Listens to the accelerometer while `enabled` and calls onAction('correct' | 'skip'). */
export function useTilt({ enabled, onAction, debug = false }: Options) {
  const [available, setAvailable] = useState<boolean | null>(null); // null = still checking
  const [live, setLive] = useState<{ z: number; state: TiltState }>({ z: 0, state: 'waiting' });
  const onActionRef = useRef(onAction);

  useEffect(() => {
    onActionRef.current = onAction;
  });

  useEffect(() => {
    if (!enabled) return;
    let cancelled = false;
    let subscription: { remove: () => void } | null = null;
    const detector = createTiltDetector();

    (async () => {
      try {
        if (!(await Accelerometer.isAvailableAsync())) return setAvailable(false);
        const permission = await Accelerometer.requestPermissionsAsync();
        if (cancelled) return;
        if (!permission.granted) return setAvailable(false);

        Accelerometer.setUpdateInterval(TILT.updateIntervalMs);
        subscription = Accelerometer.addListener(({ z }) => {
          const result = detector.process(z, Date.now());
          if (result.action) onActionRef.current(result.action);
          if (debug) setLive({ z: result.z, state: result.state });
        });
        setAvailable(true);
      } catch {
        if (!cancelled) setAvailable(false);
      }
    })();

    return () => {
      cancelled = true;
      subscription?.remove();
    };
  }, [enabled, debug]);

  return { available, live };
}
