import { router } from 'expo-router';
import { Pressable, StyleSheet, Text } from 'react-native';

import { palette } from '@/constants/theme';

// Header "home" button shown on every sub-page so users can always get back
// to the course home from lessons, conversations, tutor, review, settings.
export function HomeButton() {
  return (
    <Pressable
      onPress={() => router.push('/')}
      style={({ pressed }) => [styles.btn, pressed && styles.pressed]}
      hitSlop={8}
    >
      <Text style={styles.text}>🏠 Home</Text>
    </Pressable>
  );
}

const styles = StyleSheet.create({
  btn: { paddingVertical: 6, paddingHorizontal: 10 },
  pressed: { opacity: 0.6 },
  text: { color: palette.ink, fontWeight: '800', fontSize: 14 },
});
