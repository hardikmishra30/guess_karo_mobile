import { useEffect, useMemo } from 'react';
import { Animated, StyleSheet, useWindowDimensions } from 'react-native';

const EMOJI = ['🎉', '✨', '🎊', '⭐', '🥳'];
const COUNT = 18;

/** Light one-shot celebration: a few emoji falling once (native-driven, no extra libraries). */
export default function Confetti() {
  const { height } = useWindowDimensions();
  const pieces = useMemo(
    () =>
      Array.from({ length: COUNT }, (_, i) => ({
        left: `${Math.random() * 90}%` as const,
        delay: Math.random() * 700,
        duration: 2200 + Math.random() * 1200,
        size: 22 + Math.random() * 16,
        emoji: EMOJI[i % EMOJI.length],
        progress: new Animated.Value(0),
      })),
    []
  );

  useEffect(() => {
    Animated.parallel(
      pieces.map((p) => Animated.timing(p.progress, { toValue: 1, duration: p.duration, delay: p.delay, useNativeDriver: true }))
    ).start();
  }, [pieces]);

  return (
    <>
      {pieces.map((p, i) => (
        <Animated.Text
          key={i}
          pointerEvents="none"
          style={[
            styles.piece,
            {
              left: p.left,
              fontSize: p.size,
              opacity: p.progress.interpolate({ inputRange: [0, 0.1, 0.85, 1], outputRange: [0, 1, 1, 0] }),
              transform: [{ translateY: p.progress.interpolate({ inputRange: [0, 1], outputRange: [-40, height] }) }],
            },
          ]}
        >
          {p.emoji}
        </Animated.Text>
      ))}
    </>
  );
}

const styles = StyleSheet.create({ piece: { position: 'absolute', top: 0 } });
