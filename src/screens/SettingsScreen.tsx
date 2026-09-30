import { ScrollView, StyleSheet } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { NativeStackScreenProps } from '@react-navigation/native-stack';
import { RootStackParamList } from '../navigation/types';
import BigButton from '../components/BigButton';
import OptionRow from '../components/OptionRow';
import ScreenHeader from '../components/ScreenHeader';
import { ThemeMode, useSettings } from '../context/SettingsContext';
import { TIMER_OPTIONS } from '../constants/game';
import { Colors } from '../constants/theme';
import { useThemedStyles } from '../hooks/useTheme';

type Props = NativeStackScreenProps<RootStackParamList, 'Settings'>;

const ON_OFF: string[] = ['on', 'off'];
const THEMES: ThemeMode[] = ['system', 'light', 'dark'];
const onOffLabel = (v: string) => (v === 'on' ? 'On' : 'Off');
const flag = (value: boolean) => (value ? 'on' : 'off');

export default function SettingsScreen({ navigation }: Props) {
  const styles = useThemedStyles(createStyles);
  const { settings, updateSettings } = useSettings();

  return (
    <SafeAreaView style={styles.screen}>
      <ScreenHeader title="Settings" onBack={() => navigation.goBack()} />
      <ScrollView contentContainerStyle={styles.content}>
        <OptionRow title="Sound" options={ON_OFF} selected={flag(settings.sound)} format={onOffLabel} onSelect={(v) => updateSettings({ sound: v === 'on' })} />
        <OptionRow title="Vibration" options={ON_OFF} selected={flag(settings.vibration)} format={onOffLabel} onSelect={(v) => updateSettings({ vibration: v === 'on' })} />
        <OptionRow title="Tilt controls" options={ON_OFF} selected={flag(settings.motionEnabled)} format={onOffLabel} onSelect={(v) => updateSettings({ motionEnabled: v === 'on' })} />
        <OptionRow
          title="Theme"
          options={THEMES}
          selected={settings.theme}
          format={(t) => t.charAt(0).toUpperCase() + t.slice(1)}
          onSelect={(theme) => updateSettings({ theme })}
        />
        <OptionRow
          title="Default timer"
          options={TIMER_OPTIONS}
          selected={settings.defaultTimer}
          format={(s) => `${s}s`}
          onSelect={(defaultTimer) => updateSettings({ defaultTimer })}
        />
        <BigButton variant="secondary" label="🧪 Test tilt sensor" onPress={() => navigation.navigate('TiltTest')} />
      </ScrollView>
    </SafeAreaView>
  );
}

const createStyles = (c: Colors) =>
  StyleSheet.create({
    screen: { flex: 1, backgroundColor: c.bg, paddingHorizontal: 20, paddingTop: 8 },
    content: { paddingBottom: 32 },
  });
