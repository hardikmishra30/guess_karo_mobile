import { ScrollView, StyleSheet, Text, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { NativeStackScreenProps } from '@react-navigation/native-stack';
import { RootStackParamList } from '../navigation/types';
import BigButton from '../components/BigButton';
import OptionRow from '../components/OptionRow';
import ScreenHeader from '../components/ScreenHeader';
import { useGame } from '../context/GameContext';
import { getCategory } from '../data/categories';
import { DIFFICULTIES, TIMER_OPTIONS } from '../constants/game';
import { Colors } from '../constants/theme';
import { useThemedStyles } from '../hooks/useTheme';

type Props = NativeStackScreenProps<RootStackParamList, 'Setup'>;

export default function SetupScreen({ navigation }: Props) {
  const styles = useThemedStyles(createStyles);
  const { config, updateConfig } = useGame();
  const category = getCategory(config.categoryId);

  return (
    <SafeAreaView style={styles.screen}>
      <ScreenHeader title="Game setup" onBack={() => navigation.goBack()} />
      <ScrollView contentContainerStyle={styles.content}>
        <Text style={styles.emoji}>{category.emoji}</Text>
        <Text style={styles.title}>{category.label}</Text>

        <OptionRow
          title="Timer"
          options={TIMER_OPTIONS}
          selected={config.duration}
          format={(s) => `${s}s`}
          onSelect={(duration) => updateConfig({ duration })}
        />
        <OptionRow
          title="Difficulty"
          options={DIFFICULTIES}
          selected={config.difficulty}
          format={(d) => d.charAt(0).toUpperCase() + d.slice(1)}
          onSelect={(difficulty) => updateConfig({ difficulty })}
        />
      </ScrollView>
      <View style={styles.footer}>
        <BigButton label="Start" onPress={() => navigation.navigate('Game')} />
      </View>
    </SafeAreaView>
  );
}

const createStyles = (c: Colors) =>
  StyleSheet.create({
    screen: { flex: 1, backgroundColor: c.bg, paddingHorizontal: 20, paddingTop: 8 },
    content: { paddingVertical: 8 },
    emoji: { fontSize: 64, textAlign: 'center' },
    title: { fontSize: 32, fontWeight: '900', color: c.text, textAlign: 'center', marginBottom: 28 },
    footer: { paddingVertical: 16 },
  });
