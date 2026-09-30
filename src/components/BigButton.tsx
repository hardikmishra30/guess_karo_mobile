import { Pressable, StyleProp, StyleSheet, Text, ViewStyle } from 'react-native';
import { Colors, radius } from '../constants/theme';
import { useThemedStyles } from '../hooks/useTheme';

interface Props {
  label: string;
  onPress: () => void;
  variant?: 'primary' | 'secondary';
  style?: StyleProp<ViewStyle>;
}

export default function BigButton({ label, onPress, variant = 'primary', style }: Props) {
  const styles = useThemedStyles(createStyles);
  const secondary = variant === 'secondary';
  return (
    <Pressable
      onPress={onPress}
      style={({ pressed }) => [
        styles.button,
        secondary ? styles.secondary : styles.primary,
        { opacity: pressed ? 0.85 : 1, transform: [{ scale: pressed ? 0.98 : 1 }] },
        style,
      ]}
    >
      <Text style={[styles.label, secondary ? styles.secondaryText : styles.primaryText]}>{label}</Text>
    </Pressable>
  );
}

const createStyles = (c: Colors) =>
  StyleSheet.create({
    button: { minHeight: 64, borderRadius: radius.button, paddingHorizontal: 20, alignItems: 'center', justifyContent: 'center' },
    primary: { backgroundColor: c.primary },
    secondary: { backgroundColor: c.card, borderWidth: 1, borderColor: c.border },
    label: { fontSize: 20, fontWeight: '800' },
    primaryText: { color: c.onPrimary },
    secondaryText: { color: c.text },
  });
