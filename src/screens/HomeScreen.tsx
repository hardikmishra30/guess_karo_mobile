import { useEffect, useRef } from 'react';
import { Animated, StyleSheet, Text, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { NativeStackScreenProps } from '@react-navigation/native-stack';
import { RootStackParamList } from '../navigation/types';
import BigButton from '../components/BigButton';
import { useGame } from '../context/GameContext';
import { getCategory } from '../data/categories';
import { Colors, radius } from '../constants/theme';
import { useThemedStyles } from '../hooks/useTheme';

type Props = NativeStackScreenProps<RootStackParamList, 'Home'>;

export default function HomeScreen({ navigation }: Props) {
  const styles = useThemedStyles(createStyles);
  const { config, lastResult } = useGame();
  const category = getCategory(config.categoryId);

  // Gentle bobbing logo
  const bob = useRef(new Animated.Value(0)).current;
  useEffect(() => {
    const loop = Animated.loop(
      Animated.sequence([
        Animated.timing(bob, { toValue: -12, duration: 1100, useNativeDriver: true }),
        Animated.timing(bob, { toValue: 0, duration: 1100, useNativeDriver: true }),
      ])
    );
    loop.start();
    return () => loop.stop();
  }, [bob]);

  return (
    <SafeAreaView style={styles.screen}>
      <View style={styles.hero}>
        <Animated.Text style={[styles.logo, { transform: [{ translateY: bob }] }]}>🤳</Animated.Text>
        <Text style={styles.title}>Guess Karo!</Text>
        <Text style={styles.tagline}>Phone on forehead. Friends act. You guess.</Text>
      </View>

      <View style={styles.bottom}>
        {lastResult && (
          <View style={styles.lastCard}>
            <Text style={styles.lastLabel}>Last score</Text>
            <Text style={styles.lastScore}>
              {lastResult.score} · {getCategory(lastResult.categoryId).emoji}
            </Text>
          </View>
        )}
        <Text style={styles.selected}>
          {category.emoji} {category.label}
        </Text>
        <BigButton label="Play Game" onPress={() => navigation.navigate('Categories')} />
        <View style={styles.row}>
          <BigButton variant="secondary" label="⚙️ Settings" style={styles.half} onPress={() => navigation.navigate('Settings')} />
          <BigButton variant="secondary" label="❓ How to Play" style={styles.half} onPress={() => navigation.navigate('HowToPlay')} />
        </View>
      </View>
    </SafeAreaView>
  );
}

const createStyles = (c: Colors) =>
  StyleSheet.create({
    screen: { flex: 1, backgroundColor: c.bg, padding: 24, justifyContent: 'space-between' },
    hero: { flex: 1, alignItems: 'center', justifyContent: 'center' },
    logo: { fontSize: 88 },
    title: { fontSize: 52, fontWeight: '900', color: c.text, marginTop: 8 },
    tagline: { fontSize: 18, color: c.muted, textAlign: 'center', marginTop: 8 },
    bottom: { gap: 12 },
    lastCard: {
      backgroundColor: c.card,
      borderWidth: 1,
      borderColor: c.border,
      borderRadius: radius.card,
      padding: 16,
      flexDirection: 'row',
      justifyContent: 'space-between',
      alignItems: 'center',
    },
    lastLabel: { color: c.muted, fontSize: 18, fontWeight: '700' },
    lastScore: { color: c.text, fontSize: 28, fontWeight: '900' },
    selected: { color: c.muted, fontSize: 16, textAlign: 'center' },
    row: { flexDirection: 'row', gap: 12 },
    half: { flex: 1 },
  });
