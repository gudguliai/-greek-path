import { Stack } from 'expo-router';
import { StatusBar } from 'expo-status-bar';
import { useEffect } from 'react';
import { View, StyleSheet } from 'react-native';

import { HomeButton } from '@/components/HomeButton';
import { palette } from '@/constants/theme';
import { useProgress } from '@/store/progress';

export default function RootLayout() {
  const hydrate = useProgress((s) => s.hydrate);

  useEffect(() => {
    hydrate();
  }, [hydrate]);

  return (
    <View style={styles.root}>
      <StatusBar style="dark" />
      <Stack
        screenOptions={{
          headerStyle: { backgroundColor: palette.cream },
          headerTintColor: palette.ink,
          headerTitleStyle: { fontWeight: '800' },
          contentStyle: { backgroundColor: palette.cream },
        }}
      >
        <Stack.Screen name="index" options={{ title: 'Greek Path', headerShown: false }} />
        <Stack.Screen name="lesson/[id]" options={{ title: 'Lesson', headerRight: () => <HomeButton /> }} />
        <Stack.Screen name="conversation/[id]" options={{ title: 'Conversation', headerRight: () => <HomeButton /> }} />
        <Stack.Screen name="tutor" options={{ title: 'AI Tutor', headerRight: () => <HomeButton /> }} />
        <Stack.Screen name="review" options={{ title: 'Review', headerRight: () => <HomeButton /> }} />
        <Stack.Screen name="settings" options={{ title: 'Settings', headerRight: () => <HomeButton /> }} />
      </Stack>
    </View>
  );
}

const styles = StyleSheet.create({
  root: { flex: 1, backgroundColor: palette.cream },
});
