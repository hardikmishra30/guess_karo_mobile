import { useEffect } from 'react';
import { StyleSheet, Text, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { NativeStackScreenProps } from '@react-navigation/native-stack';
import { RootStackParamList } from '../navigation/types';
import BigButton from '../components/BigButton';
import Confetti from '../components/Confetti';
import PopIn from '../components/PopIn';
import { useFeedback } from '../hooks/useFeedback';
import { Colors, radius } from '../constants/theme';
import { useThemedStyles } from '../hooks/useTheme';

type Props = NativeStackScreenProps<RootStackParamList, 'Result'>;

const praise = (score: number) => (score >= 15 ? 'Legendary! 🔥' : score >= 8 ? 'Great job! 👏' : score >= 1 ? 'Nice try! 🙂' : 'Better luck next time!');

export default function ResultScreen({ navigation, route }: Props) {
  const styles = useThemedStyles(createStyles);
  const feedback = useFeedback();
  const { score, skipped, duration } = route.params;

  useEffect(() => {
    feedback.finish();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <SafeAreaView style={styles.screen}>
      {score > 0 && <Confetti />}
      <View style={styles.top}>
        <Text style={styles.heading}>{praise(score)}</Text>
        <Text style={styles.label}>Final score</Text>
        <PopIn trigger={score}>
          <Text style={styles.score}>{score}</Text>
        </PopIn>
        <View style={styles.stats}>
          <Text style={styles.stat}>✅ Correct: {score}</Text>
          <Text style={styles.stat}>⏭ Skipped: {skipped}</Text>
          <Text style={styles.stat}>⏱ Time: {duration} seconds</Text>
        </View>
      </View>

      <View style={styles.buttons}>
        <BigButton label="Play Again" onPress={() => navigation.replace('Game')} />
        <BigButton variant="secondary" label="Change Category" onPress={() => navigation.popTo('Categories')} />
        <BigButton variant="secondary" label="Home" onPress={() => navigation.popToTop()} />
      </View>
    </SafeAreaView>
  );
}

const createStyles = (c: Colors) =>
  StyleSheet.create({
    screen: { flex: 1, backgroundColor: c.bg, padding: 24, justifyContent: 'space-between' },
    top: { alignItems: 'center' },
    heading: { fontSize: 30, fontWeight: '900', color: c.text, marginTop: 8, textAlign: 'center' },
    label: { fontSize: 18, color: c.muted, marginTop: 16 },
    score: { fontSize: 120, fontWeight: '900', color: c.primary, lineHeight: 130 },
    stats: { backgroundColor: c.card, borderWidth: 1, borderColor: c.border, borderRadius: radius.card, padding: 16, gap: 6, alignSelf: 'stretch' },
    stat: { fontSize: 20, color: c.text, fontWeight: '700' },
    buttons: { gap: 10 },
  });
