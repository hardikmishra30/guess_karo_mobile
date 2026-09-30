import { AudioPlayer, createAudioPlayer } from 'expo-audio';
import * as Haptics from 'expo-haptics';

export type Sfx = 'correct' | 'skip' | 'tick' | 'finish';
export type Buzz = 'success' | 'light' | 'heavy';

// Files live in src/assets/sounds (see the README there)
const SOURCES: Record<Sfx, number> = {
  correct: require('../assets/sounds/correct.wav'),
  skip: require('../assets/sounds/skip.wav'),
  tick: require('../assets/sounds/tick.wav'),
  finish: require('../assets/sounds/finish.wav'),
};

const players: Partial<Record<Sfx, AudioPlayer>> = {};

export async function playSound(name: Sfx) {
  try {
    const player = (players[name] ??= createAudioPlayer(SOURCES[name]));
    await player.seekTo(0);
    player.play();
  } catch {
    // Sound is optional: never break the game because of it
  }
}

export function vibrate(kind: Buzz) {
  try {
    if (kind === 'success') Haptics.notificationAsync(Haptics.NotificationFeedbackType.Success).catch(() => {});
    else Haptics.impactAsync(kind === 'heavy' ? Haptics.ImpactFeedbackStyle.Heavy : Haptics.ImpactFeedbackStyle.Light).catch(() => {});
  } catch {
    // Haptics are optional too
  }
}
