# Guess Karo!

A "Heads Up" style party game for Android (React Native + Expo). Hold the phone on your forehead, friends act out the word, you guess it, then tilt down for Correct or up for Skip. Works fully offline, no login.

## Features
- 11 categories (Animals, Food, Indian Movies, Act It Out, Heroes, Heroines, Cricketers, Politicians, Singers, Culture, Mixed)
- Timer 30/60/90/120 s, difficulty Easy/Medium/Hard
- Tilt controls with cooldown, plus big SKIP/CORRECT buttons that always work
- Animations, sound effects, vibration, light/dark/system theme
- Settings (saved on the phone), How to Play, and a Tilt Test screen
- Words never repeat until the whole list has been used, even across "Play Again"

## Tech stack
React Native, Expo, TypeScript, React Navigation, expo-sensors, expo-audio, expo-haptics, AsyncStorage. No backend.

## Install and run
```bash
npm install
npx expo install --fix     # aligns package versions with your Expo SDK
npx expo start
```
- **Android phone:** install *Expo Go*, scan the QR code (same Wi-Fi, or `npx expo start --tunnel`).
- **Emulator:** start it in Android Studio and press `a` in the terminal (tilt does not work there; use the buttons).

## Build an APK / AAB
```bash
npm install -g eas-cli
eas login
eas build -p android --profile preview      # installable .apk
eas build -p android --profile production   # .aab for Google Play
```
Set your own `android.package` in `app.json` before the first build.

## Add or change words
Each category has a file in `src/data/`. Add a string to a difficulty list:
```ts
export const animals = makeWords('animals', {
  easy: ['Elephant', 'Lion'],   // add here
  medium: [...],
  hard: [...],
});
```
New category: create a data file, then add one entry in `src/data/categories.ts`.
Difficulty: Easy = easy words, Medium = easy + medium, Hard = all. (If a filter leaves fewer than 15 words, all words are used.)

## Motion controls
The game screen locks to landscape and reads the accelerometer Z axis: screen to the floor = Correct, screen to the ceiling = Skip. After an action the detector locks for a cooldown and waits for the phone to come back upright, so one movement never scores twice. Tune everything in `src/constants/tilt.ts` using **Settings > Test tilt sensor**. If Correct/Skip feel swapped, set `invert: true`.

## Sounds
Four small placeholder beeps are in `src/assets/sounds/`. Replace them with your own files of the same name (see the README there).

## Project structure
```
App.tsx, index.ts            entry
src/navigation/              screen stack
src/screens/                 Home, Categories, Setup, Game, Result, Settings, HowToPlay, TiltTest
src/components/              BigButton, CategoryCard, OptionRow, ScreenHeader, PopIn, FeedbackFlash, Confetti
src/hooks/                   useGameEngine, useTilt, useFeedback, useTheme
src/context/                 SettingsContext (saved), GameContext
src/services/feedback.ts     sound + haptics
src/data/                    word lists and categories
src/utils/                   deck.ts (no-repeat deck), tiltDetector.ts
src/constants/               theme, game, tilt
src/assets/sounds/           sound effects
```

## Troubleshooting
- **Version mismatch warnings:** `npx expo install --fix`
- **Phone can't connect:** same Wi-Fi, or `npx expo start --tunnel`
- **Stale cache:** `npx expo start -c`
- **No sound:** check Settings > Sound and the phone's media volume
