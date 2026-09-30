import { FlatList, StyleSheet, useWindowDimensions } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { NativeStackScreenProps } from '@react-navigation/native-stack';
import { RootStackParamList } from '../navigation/types';
import CategoryCard from '../components/CategoryCard';
import ScreenHeader from '../components/ScreenHeader';
import { CATEGORIES } from '../data/categories';
import { useGame } from '../context/GameContext';
import { Colors } from '../constants/theme';
import { useThemedStyles } from '../hooks/useTheme';

type Props = NativeStackScreenProps<RootStackParamList, 'Categories'>;

export default function CategoriesScreen({ navigation }: Props) {
  const styles = useThemedStyles(createStyles);
  const { config, updateConfig } = useGame();
  const { width } = useWindowDimensions();
  const columns = width > 700 ? 3 : 2;

  return (
    <SafeAreaView style={styles.screen}>
      <ScreenHeader title="Pick a category" onBack={() => navigation.goBack()} />
      <FlatList
        key={columns}
        data={CATEGORIES}
        numColumns={columns}
        keyExtractor={(c) => c.id}
        contentContainerStyle={styles.list}
        renderItem={({ item }) => (
          <CategoryCard
            category={item}
            selected={item.id === config.categoryId}
            onPress={() => {
              updateConfig({ categoryId: item.id });
              navigation.navigate('Setup');
            }}
          />
        )}
      />
    </SafeAreaView>
  );
}

const createStyles = (c: Colors) =>
  StyleSheet.create({
    screen: { flex: 1, backgroundColor: c.bg, paddingHorizontal: 12, paddingTop: 8 },
    list: { paddingBottom: 24 },
  });
