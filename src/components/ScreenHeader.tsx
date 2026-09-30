import { Pressable, StyleSheet, Text, View } from 'react-native';
import { Colors } from '../constants/theme';
import { useThemedStyles } from '../hooks/useTheme';

interface Props {
  title: string;
  onBack: () => void;
}

export default function ScreenHeader({ title, onBack }: Props) {
  const styles = useThemedStyles(createStyles);
  return (
    <View style={styles.row}>
      <Pressable onPress={onBack} hitSlop={10} style={styles.back}>
        <Text style={styles.backText}>←</Text>
      </Pressable>
      <Text style={styles.title}>{title}</Text>
    </View>
  );
}

const createStyles = (c: Colors) =>
  StyleSheet.create({
    row: { flexDirection: 'row', alignItems: 'center', gap: 12, paddingBottom: 12 },
    back: { width: 48, height: 48, borderRadius: 24, backgroundColor: c.card, borderWidth: 1, borderColor: c.border, alignItems: 'center', justifyContent: 'center' },
    backText: { color: c.text, fontSize: 24, fontWeight: '800' },
    title: { color: c.text, fontSize: 28, fontWeight: '900', flexShrink: 1 },
  });
