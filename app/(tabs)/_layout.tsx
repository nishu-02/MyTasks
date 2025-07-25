import { DarkTheme, DefaultTheme, ThemeProvider } from '@react-navigation/native';
import { Tabs } from 'expo-router';
import React from 'react';
import { Platform } from 'react-native';

import { HapticTab } from '@/components/HapticTab';
import { IconSymbol } from '@/components/ui/IconSymbol';
import TabBarBackground from '@/components/ui/TabBarBackground';
import { useAppSelector } from '@/hooks/useAppSelector';  // Redux Selector
import { themes } from '@/hooks/themeSlice';  // Import themes
import { Ionicons } from '@expo/vector-icons';

export default function TabLayout() {
  // Get the current theme from Redux
  const currentTheme = useAppSelector((state) => state.theme.currentTheme);
  const themeColors = themes[currentTheme] || themes.default; // Fallback if undefined
  const navigationTheme = currentTheme === 'dark' ? DarkTheme : DefaultTheme;

  return (
    // Wrap the entire tab layout in ThemeProvider
    <ThemeProvider value={navigationTheme}>
      <Tabs
        screenOptions={{
          tabBarActiveTintColor: themeColors.primary,
          headerShown: false,
          tabBarButton: HapticTab,
          tabBarBackground: TabBarBackground,
          tabBarStyle: {
            backgroundColor: themeColors.background,
            borderTopColor: themeColors.borderColor,
            borderTopWidth: 1,
            borderRadius: 18,
            marginHorizontal: 12,
            marginBottom: 8,
            shadowColor: '#000',
            shadowOffset: { width: 0, height: -2 },
            shadowOpacity: 0.12,
            shadowRadius: 8,
            elevation: 8,
            ...Platform.select({
              ios: {
                position: 'absolute',
              },
              default: {},
            }),
          },
        }}
      >
        <Tabs.Screen
          name="index"
          options={{
            title: 'Home',
            tabBarIcon: ({ color }) => <Ionicons name="home" size={28} color={color} />,
          }}
        />
        <Tabs.Screen
          name="explore"
          options={{
            title: 'Calendar',
            tabBarIcon: ({ color }) => <Ionicons name="calendar" size={28} color={color} />,
          }}
        />
        <Tabs.Screen
          name="Profile"
          options={{
            title: 'Profile',
            tabBarIcon: ({ color }) => (
              <Ionicons name="person-circle" size={30} color={color} />
            ),
          }}
        />
      </Tabs>
    </ThemeProvider>
  );
}
