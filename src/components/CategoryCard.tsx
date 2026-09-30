import { Pressable, StyleSheet, Text } from 'react-native';
import { Category } from '../data/types';
import { Colors, radius } from '../constants/theme';
import { useThemedStyles } from '../hooks/useTheme';

interface Props {
  category: Category;
  selected: boolean;
  onPress: () => void;
}

export default function CategoryCard({ category, selected, onPress }: Props) {
  const styles = useThemedStyles(createStyles);
  return (
    <Pressable
      onPress={onPress}
      style={({ pressed }) => [
        styles.card,
        { backgroundColor: category.color, opacity: pressed ? 0.85 : 1, transform: [{ scale: pressed ? 0.97 : 1 }] },
        selected && styles.selected,
      ]}
    >
      <Text style={styles.emoji}>{category.emoji}</Text>
      <Text style={styles.label}>{category.label}</Text>
      <Text style={styles.count}>{category.words.length} words</Text>
    </Pressable>
  );
}

const createStyles = (c: Colors) =>
  StyleSheet.create({
    card: {
      flex: 1,
      margin: 6,
      minHeight: 150,
      borderRadius: radius.card,
      padding: 16,
      justifyContent: 'space-between',
      borderWidth: 4,
      borderColor: 'transparent',
    },
    selected: { borderColor: c.text },
    emoji: { fontSize: 44 },
    label: { fontSize: 20, fontWeight: '800', color: '#FFFFFF' },
    count: { fontSize: 14, color: 'rgba(255,255,255,0.9)' },
  });
