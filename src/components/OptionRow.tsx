import { Pressable, StyleSheet, Text, View } from 'react-native';
import { Colors, radius } from '../constants/theme';
import { useThemedStyles } from '../hooks/useTheme';

interface Props<T extends string | number> {
  title: string;
  options: T[];
  selected: T;
  format?: (value: T) => string;
  onSelect: (value: T) => void;
}

export default function OptionRow<T extends string | number>({ title, options, selected, format, onSelect }: Props<T>) {
  const styles = useThemedStyles(createStyles);
  return (
    <View style={styles.wrap}>
      <Text style={styles.title}>{title}</Text>
      <View style={styles.row}>
        {options.map((option) => {
          const active = option === selected;
          return (
            <Pressable key={String(option)} onPress={() => onSelect(option)} style={[styles.chip, active && styles.chipActive]}>
              <Text style={[styles.chipText, active && styles.chipTextActive]}>
                {format ? format(option) : String(option)}
              </Text>
            </Pressable>
          );
        })}
      </View>
    </View>
  );
}

const createStyles = (c: Colors) =>
  StyleSheet.create({
    wrap: { marginBottom: 24 },
    title: { color: c.muted, fontSize: 18, fontWeight: '700', marginBottom: 10 },
    row: { flexDirection: 'row', flexWrap: 'wrap', gap: 10 },
    chip: {
      minHeight: 56,
      minWidth: 84,
      paddingHorizontal: 18,
      borderRadius: radius.chip,
      backgroundColor: c.card,
      borderWidth: 1,
      borderColor: c.border,
      alignItems: 'center',
      justifyContent: 'center',
    },
    chipActive: { backgroundColor: c.primary, borderColor: c.primary },
    chipText: { color: c.text, fontSize: 20, fontWeight: '700' },
    chipTextActive: { color: c.onPrimary },
  });
