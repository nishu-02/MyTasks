import React, { useState } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, FlatList, ScrollView, Animated, Dimensions } from 'react-native';
import { useAppSelector } from '@/hooks/useAppSelector';
import { useAppDispatch } from '@/hooks/useAppDispatch';
import { setTheme } from '../hooks/themeSlice';
import { themes } from '../hooks/themeSlice';
import { Ionicons } from '@expo/vector-icons';

const { width } = Dimensions.get('window'); // For responsive design

export default function ThemeSelector() {
  const dispatch = useAppDispatch();
  const currentTheme = useAppSelector((state) => state.theme.currentTheme);
  const [animations] = useState(Object.keys(themes).reduce((acc, key) => {
    acc[key] = new Animated.Value(1); // For scale animations
    return acc;
  }, {}));

  const changeTheme = (themeName: string) => {
    // Animate scale for selected theme
    Object.keys(animations).forEach(key => {
      Animated.spring(animations[key], {
        toValue: key === themeName ? 1.05 : 1,
        useNativeDriver: true,
      }).start();
    });
    dispatch(setTheme(themeName));
  };

  return (
    <ScrollView
      contentContainerStyle={[styles.container, { backgroundColor: themes[currentTheme].background }]}
      showsVerticalScrollIndicator={false}
    >
      <Text style={[styles.title, { color: themes[currentTheme].text }]}>Choose Your Theme</Text>
      <FlatList
        data={Object.keys(themes)}
        keyExtractor={(item) => item}
        renderItem={({ item }) => (
          <Animated.View style={{ transform: [{ scale: animations[item] }] }}>
            <TouchableOpacity
              style={[styles.themeCard, {
                backgroundColor: 'rgba(255,255,255,0.15)', // Enhanced glassmorphism
                borderColor: item === currentTheme ? themes[item].primary : 'transparent',
                borderWidth: item === currentTheme ? 2 : 0,
                shadowColor: themes[item].primary,
                shadowOffset: { width: 0, height: 6 },
                shadowOpacity: 0.3,
                shadowRadius: 12,
                elevation: 6,
              }]}
              onPress={() => changeTheme(item)}
              activeOpacity={0.8}
            >
              <View style={styles.themePreviewRow}>
                <View style={[styles.themePreview, { backgroundColor: themes[item].primary }]} />
                <View style={[styles.themePreview, { backgroundColor: themes[item].accent }]} />
                <View style={[styles.themePreview, { backgroundColor: themes[item].background }]} />
              </View>
              <Text style={[styles.themeName, { color: themes[item].text }]}>{item.charAt(0).toUpperCase() + item.slice(1)}</Text>
              {item === currentTheme && (
                <Ionicons name="checkmark-circle" size={20} color={themes[item].primary} style={styles.selectedIcon} />
              )}
            </TouchableOpacity>
          </Animated.View>
        )}
        numColumns={Math.floor(width / 180)} // Responsive columns (e.g., 2 on phone, more on tablet)
        contentContainerStyle={styles.themeGrid}
        scrollEnabled={false} // Disable inner scroll for better UX
      />
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flexGrow: 1,
    padding: 24,
    paddingTop: 48, // Safe area padding
    alignItems: 'center',
  },
  title: {
    fontSize: 28,
    fontWeight: '700',
    marginBottom: 24,
    textAlign: 'center',
  },
  themeGrid: {
    justifyContent: 'center',
  },
  themeCard: {
    width: 160,
    margin: 12,
    padding: 20,
    borderRadius: 24,
    alignItems: 'center',
    // Enhanced glassmorphism with backdrop blur (simulated via opacity/shadows)
    backgroundColor: 'rgba(255,255,255,0.15)',
    borderRadius: 24,
    // Note: Actual blur requires native modules or images
  },
  themePreviewRow: {
    flexDirection: 'row',
    gap: 12,
    marginBottom: 16,
  },
  themePreview: {
    width: 32,
    height: 32,
    borderRadius: 16,
    borderWidth: 1,
    borderColor: 'rgba(255,255,255,0.3)',
  },
  themeName: {
    fontSize: 18,
    fontWeight: '600',
  },
  selectedIcon: {
    marginTop: 8,
  },
});
