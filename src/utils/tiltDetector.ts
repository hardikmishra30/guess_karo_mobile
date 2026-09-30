import { TILT, TiltConfig } from '../constants/tilt';

export type TiltAction = 'correct' | 'skip';
export type TiltState = 'waiting' | 'ready' | 'cooldown';

/**
 * Pure tilt logic (no React, no sensors) so it is easy to test.
 * One action fires per movement: after firing, the detector stays locked for the
 * cooldown AND until the phone comes back to the neutral position.
 */
export function createTiltDetector(cfg: TiltConfig = TILT) {
  let smoothed: number | null = null;
  let armed = false; // starts false: the phone must be seen upright first
  let lockedUntil = 0;

  return {
    process(rawZ: number, now: number): { z: number; action: TiltAction | null; state: TiltState } {
      const value = cfg.invert ? -rawZ : rawZ;
      smoothed = smoothed === null ? value : smoothed + cfg.smoothing * (value - smoothed);
      const z = smoothed;

      if (now < lockedUntil) return { z, action: null, state: 'cooldown' };

      if (!armed) {
        if (Math.abs(z) < cfg.neutralZone) armed = true;
        return { z, action: null, state: armed ? 'ready' : 'waiting' };
      }

      let action: TiltAction | null = null;
      if (z <= cfg.downThreshold) action = 'correct';
      else if (z >= cfg.upThreshold) action = 'skip';

      if (action) {
        armed = false;
        lockedUntil = now + cfg.cooldownMs;
        return { z, action, state: 'cooldown' };
      }
      return { z, action: null, state: 'ready' };
    },
  };
}
