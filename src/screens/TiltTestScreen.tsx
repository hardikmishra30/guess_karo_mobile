import { useState } from 'react';
import { ScrollView, StyleSheet, Text, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { NativeStackScreenProps } from '@react-navigation/native-stack';
import { RootStackParamList } from '../navigation/types';
import ScreenHeader from '../components/ScreenHeader';
import { useTilt } from '../hooks/useTilt';
import { TILT } from '../constants/tilt';
import { TiltAction } from '../utils/tiltDetector';
import { Colors, radius } from '../constants/theme';
import { useThemedStyles } from '../hooks/useTheme';

type Props = NativeStackScreenProps<RootStackParamList, 'TiltTest'>;

const STATE_TEXT = {
  waiting: 'Hold the phone upright to arm it',
  ready: 'Armed: tilt now',
  cooldown: 'Cooldown: return upright',
};

export default function TiltTestScreen({ navigation }: Props) {
  const styles = useThemedStyles(createStyles);
  const [counts, setCounts] = useState({ correct: 0, skip: 0 });
  const [last, setLast] = useState<TiltAction | null>(null);

  const { available, live } = useTilt({
    enabled: true,
    debug: true,
    onAction: (action) => {
      setLast(action);
      setCounts((c) => ({ ...c, [action]: c[action] + 1 }));
    },
  });

  // Bar runs from -1 (screen to floor = correct) to +1 (screen to ceiling = skip)
  const clamped = Math.max(-1, Math.min(1, live.z));
  const markerLeft = `${((clamped + 1) / 2) * 100}%` as const;
  const correctFlex = (1 + TILT.downThreshold) / 2;
  const skipFlex = (1 - TILT.upThreshold) / 2;

  return (
    <SafeAreaView style={styles.screen}>
      <ScreenHeader title="Tilt test" onBack={() => navigation.goBack()} />
      <ScrollView contentContainerStyle={styles.content}>
        {available === false && (
          <Text style={styles.error}>
            Motion sensor unavailable (emulator, or permission denied). Games still work with the buttons.
          </Text>
        )}

        <Text style={styles.z}>{live.z.toFixed(2)}</Text>
        <Text style={styles.state}>{STATE_TEXT[live.state]}</Text>

        <View style={styles.track}>
          <View style={[styles.zone, { flex: correctFlex, backgroundColor: '#15803D' }]} />
          <View style={[styles.zone, { flex: 1 - correctFlex - skipFlex, backgroundColor: styles.neutralZone.backgroundColor }]} />
          <View style={[styles.zone, { flex: skipFlex, backgroundColor: '#BE123C' }]} />
          <View style={[styles.marker, { left: markerLeft }]} />
        </View>
        <View style={styles.labels}>
          <Text style={styles.label}>⬇ CORRECT</Text>
          <Text style={styles.label}>⬆ SKIP</Text>
        </View>

        <View style={styles.card}>
          <Text style={styles.big}>Last: {last === 'correct' ? '✅ Correct' : last === 'skip' ? '⏭ Skip' : '-'}</Text>
          <Text style={styles.line}>Correct detected: {counts.correct}</Text>
          <Text style={styles.line}>Skip detected: {counts.skip}</Text>
        </View>

        <View style={styles.card}>
          <Text style={styles.line}>Down at z ≤ {TILT.downThreshold}, up at z ≥ {TILT.upThreshold}</Text>
          <Text style={styles.line}>Neutral zone ±{TILT.neutralZone}, cooldown {TILT.cooldownMs} ms</Text>
          <Text style={styles.hint}>
            Lay the phone flat, screen up: z should be about +1. If it shows -1, set invert: true in
            src/constants/tilt.ts.
          </Text>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}

const createStyles = (c: Colors) =>
  StyleSheet.create({
    screen: { flex: 1, backgroundColor: c.bg, paddingHorizontal: 20, paddingTop: 8 },
    content: { gap: 14, paddingBottom: 32 },
    error: { color: c.warn, fontSize: 16, fontWeight: '700' },
    z: { fontSize: 72, fontWeight: '900', color: c.primary, textAlign: 'center' },
    state: { fontSize: 18, color: c.muted, textAlign: 'center' },
    track: { height: 36, flexDirection: 'row', borderRadius: 18, overflow: 'hidden' },
    zone: { height: '100%' },
    neutralZone: { backgroundColor: c.border },
    marker: { position: 'absolute', top: 0, width: 6, height: '100%', marginLeft: -3, backgroundColor: c.text },
    labels: { flexDirection: 'row', justifyContent: 'space-between' },
    label: { color: c.muted, fontWeight: '800' },
    card: { backgroundColor: c.card, borderWidth: 1, borderColor: c.border, borderRadius: radius.card, padding: 16, gap: 6 },
    big: { fontSize: 24, fontWeight: '900', color: c.text },
    line: { fontSize: 16, color: c.text },
    hint: { fontSize: 14, color: c.muted, marginTop: 4 },
  });
