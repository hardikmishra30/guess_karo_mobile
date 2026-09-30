import { useEffect, useRef } from 'react';
import { Animated, StyleSheet, Text } from 'react-native';

export interface FlashEvent {
  kind: 'correct' | 'skip';
  id: number;
}

const CONTENT = {
  correct: { text: '✓ Correct!', sub: '+1', color: '#15803D' },
  skip: { text: '→ Skipped', sub: '', color: '#BE123C' },
};

/** Full-screen colour flash shown briefly after Correct or Skip. */
export default function FeedbackFlash({ event }: { event: FlashEvent | null }) {
  const opacity = useRef(new Animated.Value(0)).current;

  useEffect(() => {
    if (!event) return;
    opacity.setValue(0);
    Animated.sequence([
      Animated.timing(opacity, { toValue: 1, duration: 80, useNativeDriver: true }),
      Animated.delay(220),
      Animated.timing(opacity, { toValue: 0, duration: 250, useNativeDriver: true }),
    ]).start();
  }, [event, opacity]);

  if (!event) return null;
  const c = CONTENT[event.kind];
  return (
    <Animated.View pointerEvents="none" style={[styles.overlay, { backgroundColor: c.color, opacity }]}>
      <Text style={styles.text}>{c.text}</Text>
      {c.sub !== '' && <Text style={styles.sub}>{c.sub}</Text>}
    </Animated.View>
  );
}

const styles = StyleSheet.create({
  overlay: { ...StyleSheet.absoluteFillObject, alignItems: 'center', justifyContent: 'center' },
  text: { color: '#FFFFFF', fontSize: 64, fontWeight: '900' },
  sub: { color: '#FFFFFF', fontSize: 40, fontWeight: '900' },
});
