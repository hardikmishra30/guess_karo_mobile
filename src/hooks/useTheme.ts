import { useMemo } from 'react';
import { useColorScheme } from 'react-native';
import { useSettings } from '../context/SettingsContext';
import { Colors, darkColors, lightColors } from '../constants/theme';

export function useTheme() {
  const { settings } = useSettings();
  const system = useColorScheme();
  const isDark = settings.theme === 'system' ? system !== 'light' : settings.theme === 'dark';
  return { colors: isDark ? darkColors : lightColors, isDark };
}

/** Usage: const createStyles = (c: Colors) => StyleSheet.create({...}); const styles = useThemedStyles(createStyles); */
export function useThemedStyles<T>(factory: (colors: Colors) => T): T {
  const { colors } = useTheme();
  return useMemo(() => factory(colors), [factory, colors]);
}
