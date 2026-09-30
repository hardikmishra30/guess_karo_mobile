import { ScrollView, StyleSheet, Text, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { NativeStackScreenProps } from '@react-navigation/native-stack';
import { RootStackParamList } from '../navigation/types';
import ScreenHeader from '../components/ScreenHeader';
import { Colors, radius } from '../constants/theme';
import { useThemedStyles } from '../hooks/useTheme';

type Props = NativeStackScreenProps<RootStackParamList, 'HowToPlay'>;

const STEPS = [
  { icon: '🗂️', text: 'Choose a category.' },
  { icon: '⏱️', text: 'Set the timer.' },
  { icon: '🤳', text: 'Hold the phone against your forehead, screen facing your friends.' },
  { icon: '🎭', text: 'Your friends act or give clues.' },
  { icon: '🗣️', text: 'Guess the word!' },
  { icon: '⬇️', text: 'Tilt DOWN for Correct.' },
  { icon: '⬆️', text: 'Tilt UP for Skip.' },
  { icon: '🏆', text: 'Get the highest score before time runs out.' },
];

export default function HowToPlayScreen({ navigation }: Props) {
  const styles = useThemedStyles(createStyles);
  return (
    <SafeAreaView style={styles.screen}>
      <ScreenHeader title="How to play" onBack={() => navigation.goBack()} />
      <ScrollView contentContainerStyle={styles.content}>
        {STEPS.map((step, i) => (
          <View key={i} style={styles.card}>
            <Text style={styles.icon}>{step.icon}</Text>
            <Text style={styles.text}>{step.text}</Text>
          </View>
        ))}
        <Text style={styles.note}>No tilt sensor? Use the big SKIP and CORRECT buttons at the bottom of the game screen.</Text>
      </ScrollView>
    </SafeAreaView>
  );
}

const createStyles = (c: Colors) =>
  StyleSheet.create({
    screen: { flex: 1, backgroundColor: c.bg, paddingHorizontal: 20, paddingTop: 8 },
    content: { gap: 10, paddingBottom: 32 },
    card: { flexDirection: 'row', alignItems: 'center', gap: 16, backgroundColor: c.card, borderWidth: 1, borderColor: c.border, borderRadius: radius.card, padding: 16 },
    icon: { fontSize: 36 },
    text: { flex: 1, fontSize: 20, fontWeight: '700', color: c.text },
    note: { fontSize: 16, color: c.muted, textAlign: 'center', marginTop: 8 },
  });
