/**
 * All tilt tuning lives here. The value used is the accelerometer Z axis (in g):
 *   +1 = screen faces the ceiling  -> SKIP
 *    0 = phone upright on your forehead (neutral)
 *   -1 = screen faces the floor    -> CORRECT
 */
export const TILT = {
  updateIntervalMs: 50,
  downThreshold: -0.6, // z at or below this = CORRECT (about 37 degrees of tilt)
  upThreshold: 0.6, // z at or above this = SKIP
  neutralZone: 0.35, // phone must return inside +-this before the next action can fire
  cooldownMs: 800, // ignore all movement for this long after an action
  smoothing: 0.4, // 0..1, lower = smoother but slower to react
  invert: false, // set to true if Correct/Skip feel swapped on your phone
};

export type TiltConfig = typeof TILT;
