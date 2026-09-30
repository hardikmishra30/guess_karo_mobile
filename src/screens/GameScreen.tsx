import { useEffect, useRef, useState } from 'react';
import { Animated, Pressable, StyleSheet, Text, useWindowDimensions, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useKeepAwake } from 'expo-keep-awake';
import * as ScreenOrientation from 'expo-screen-orientation';
import { NativeStackScreenProps } from '@react-navigation/native-stack';
import { RootStackParamList } from '../navigation/types';
import FeedbackFlash, { FlashEvent } from '../components/FeedbackFlash';
import PopIn from '../components/PopIn';
import { useGame } from '../context/GameContext';
import { useSettings } from '../context/SettingsContext';
import { useGameEngine } from '../hooks/useGameEngine';
import { useTilt } from '../hooks/useTilt';
import { useFeedback } from '../hooks/useFeedback';
import { getCategory } from '../data/categories';
import { TICK_SECONDS, WARNING_SECONDS } from '../constants/game';
import { radius } from '../constants/theme';

type Props = NativeStackScreenProps<RootStackParamList, 'Game'>;

const CORRECT_COLOR = '#15803D';
const SKIP_COLOR = '#BE123C';
const WARN_COLOR = '#C81E1E';

export default function GameScreen({ navigation }: Props) {
  useKeepAwake(); // don't let the screen sleep while playing
  const { config, setLastResult } = useGame();
  const { settings } = useSettings();
  const feedback = useFeedback();
  const game = useGameEngine(config);
  const { width, height } = useWindowDimensions();
  const landscape = width > height;
  const category = getCategory(config.categoryId);
  const lowTime = game.status === 'playing' && game.timeLeft <= WARNING_SECONDS;

  const [flash, setFlash] = useState<FlashEvent | null>(null);
  const flashId = useRef(0);

  // Single place that handles Correct / Skip, whether it came from a tilt or a button
  const handleAnswer = (correct: boolean) => {
    const accepted = correct ? game.markCorrect() : game.markSkip();
    if (!accepted) return;
    flashId.current += 1;
    setFlash({ kind: correct ? 'correct' : 'skip', id: flashId.current });
    if (correct) feedback.correct();
    else feedback.skip();
  };

  const tilt = useTilt({
    enabled: settings.motionEnabled && game.status === 'playing',
    onAction: (action) => handleAnswer(action === 'correct'),
  });

  // Landscape while playing (phone on forehead)
  useEffect(() => {
    ScreenOrientation.lockAsync(ScreenOrientation.OrientationLock.LANDSCAPE).catch(() => {});
    return () => {
      ScreenOrientation.unlockAsync().catch(() => {});
    };
  }, []);

  // Countdown ticks in the last seconds
  useEffect(() => {
    if (game.status === 'playing' && game.timeLeft > 0 && game.timeLeft <= TICK_SECONDS) feedback.tick();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [game.timeLeft]);

  // Pulse the timer when time is nearly up
  const pulse = useRef(new Animated.Value(1)).current;
  useEffect(() => {
    if (!lowTime) return;
    const loop = Animated.loop(
      Animated.sequence([
        Animated.timing(pulse, { toValue: 1.18, duration: 450, useNativeDriver: true }),
        Animated.timing(pulse, { toValue: 1, duration: 450, useNativeDriver: true }),
      ])
    );
    loop.start();
    return () => {
      loop.stop();
      pulse.setValue(1);
    };
  }, [lowTime, pulse]);

  useEffect(() => {
    if (game.status !== 'finished') return;
    setLastResult({ score: game.score, categoryId: config.categoryId });
    navigation.replace('Result', { score: game.score, skipped: game.skipped, duration: config.duration });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [game.status]);

  if (game.status === 'ready') {
    return (
      <SafeAreaView style={[styles.screen, styles.center, { backgroundColor: category.color }]}>
        <Text style={styles.readyHint}>Put the phone on your forehead!</Text>
        <PopIn trigger={game.countdown}>
          <Text style={[styles.readyNumber, landscape && { fontSize: 100 }]}>{game.countdown}</Text>
        </PopIn>
      </SafeAreaView>
    );
  }

  const buttonHeight = landscape ? 60 : 84;
  return (
    <SafeAreaView style={[styles.screen, { backgroundColor: lowTime ? WARN_COLOR : category.color }]}>
      <View style={styles.header}>
        <Pressable onPress={() => navigation.popToTop()} hitSlop={12} style={styles.quit}>
          <Text style={styles.quitText}>✕</Text>
        </Pressable>
        {settings.motionEnabled && tilt.available === false && (
          <Text style={styles.notice}>Motion unavailable: use the buttons</Text>
        )}
        <Animated.Text style={[styles.stat, { transform: [{ scale: pulse }] }]}>⏱ {game.timeLeft}</Animated.Text>
        <Text style={styles.stat}>⭐ {game.score}</Text>
      </View>

      <View style={styles.wordArea}>
        <PopIn trigger={game.word.id}>
          <Text style={[styles.word, landscape && { fontSize: 88 }]} adjustsFontSizeToFit numberOfLines={landscape ? 2 : 3}>
            {game.word.text.toUpperCase()}
          </Text>
        </PopIn>
      </View>

      <View style={styles.buttons}>
        <Pressable onPress={() => handleAnswer(false)} style={[styles.actionButton, { backgroundColor: SKIP_COLOR, minHeight: buttonHeight }]}>
          <Text style={styles.actionText}>⬆ SKIP</Text>
        </Pressable>
        <Pressable onPress={() => handleAnswer(true)} style={[styles.actionButton, { backgroundColor: CORRECT_COLOR, minHeight: buttonHeight }]}>
          <Text style={styles.actionText}>⬇ CORRECT</Text>
        </Pressable>
      </View>

      <FeedbackFlash event={flash} />
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  screen: { flex: 1, padding: 16 },
  center: { alignItems: 'center', justifyContent: 'center' },
  readyHint: { color: '#FFFFFF', fontSize: 26, fontWeight: '800', textAlign: 'center' },
  readyNumber: { color: '#FFFFFF', fontSize: 140, fontWeight: '900' },
  header: { flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between', gap: 12 },
  quit: { width: 48, height: 48, borderRadius: 24, backgroundColor: 'rgba(0,0,0,0.25)', alignItems: 'center', justifyContent: 'center' },
  quitText: { color: '#FFFFFF', fontSize: 22, fontWeight: '800' },
  notice: { flex: 1, color: '#FFFFFF', fontSize: 14, textAlign: 'center', opacity: 0.9 },
  stat: { color: '#FFFFFF', fontSize: 32, fontWeight: '900' },
  wordArea: { flex: 1, alignItems: 'center', justifyContent: 'center', paddingHorizontal: 8 },
  word: { color: '#FFFFFF', fontSize: 72, fontWeight: '900', textAlign: 'center' },
  buttons: { flexDirection: 'row', gap: 12 },
  actionButton: { flex: 1, borderRadius: radius.button, alignItems: 'center', justifyContent: 'center' },
  actionText: { color: '#FFFFFF', fontSize: 24, fontWeight: '900' },
});
