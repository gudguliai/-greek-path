import { useState } from 'react';
import { Pressable, ScrollView, StyleSheet, Text, TextInput, View } from 'react-native';

import { palette, radii, spacing } from '@/constants/theme';
import { useProgress } from '@/store/progress';
import { useSettings } from '@/store/settings';

export default function SettingsScreen() {
  const apiKey = useSettings((s) => s.apiKey);
  const setApiKey = useSettings((s) => s.setApiKey);
  const model = useSettings((s) => s.model);
  const setModel = useSettings((s) => s.setModel);
  const voiceRate = useSettings((s) => s.voiceRate);
  const setVoiceRate = useSettings((s) => s.setVoiceRate);
  const reset = useProgress((s) => s.reset);

  const [draftKey, setDraftKey] = useState(apiKey);
  const [confirmReset, setConfirmReset] = useState(false);

  return (
    <ScrollView style={styles.screen} contentContainerStyle={styles.content}>
      <Text style={styles.section}>AI Tutor</Text>
      <View style={styles.card}>
        <Text style={styles.label}>DeepSeek API key</Text>
        <Text style={styles.help}>
          Stored only on this device (localStorage on web). Never bundled, never sent anywhere except DeepSeek when you chat.
        </Text>
        <TextInput
          style={styles.input}
          value={draftKey}
          onChangeText={setDraftKey}
          placeholder="sk-…"
          placeholderTextColor={palette.muted}
          autoCapitalize="none"
          autoCorrect={false}
          secureTextEntry
        />
        <Pressable
          style={({ pressed }) => [styles.primary, pressed && styles.pressed, !draftKey.trim() && styles.disabled]}
          disabled={!draftKey.trim()}
          onPress={() => setApiKey(draftKey)}
        >
          <Text style={styles.primaryText}>Save key</Text>
        </Pressable>
        {apiKey && <Text style={styles.saved}>✓ Key saved ({apiKey.slice(0, 6)}…)</Text>}
      </View>

      <View style={styles.card}>
        <Text style={styles.label}>Model</Text>
        <View style={styles.row}>
          {['deepseek-chat', 'deepseek-reasoner'].map((m) => (
            <Pressable
              key={m}
              style={({ pressed }) => [styles.chip, model === m && styles.chipActive, pressed && styles.pressed]}
              onPress={() => setModel(m)}
            >
              <Text style={[styles.chipText, model === m && styles.chipTextActive]}>{m}</Text>
            </Pressable>
          ))}
        </View>
      </View>

      <Text style={styles.section}>Voice</Text>
      <View style={styles.card}>
        <Text style={styles.label}>Speaking rate: {voiceRate.toFixed(2)}</Text>
        <View style={styles.row}>
          <Pressable style={({ pressed }) => [styles.chip, pressed && styles.pressed]} onPress={() => setVoiceRate(Math.max(0.4, voiceRate - 0.1))}>
            <Text style={styles.chipText}>Slower</Text>
          </Pressable>
          <Pressable style={({ pressed }) => [styles.chip, pressed && styles.pressed]} onPress={() => setVoiceRate(Math.min(1.2, voiceRate + 0.1))}>
            <Text style={styles.chipText}>Faster</Text>
          </Pressable>
        </View>
      </View>

      <Text style={styles.section}>Data</Text>
      <View style={styles.card}>
        <Text style={styles.help}>Progress lives in this browser/device only. No account, no tracking.</Text>
        {!confirmReset ? (
          <Pressable style={({ pressed }) => [styles.danger, pressed && styles.pressed]} onPress={() => setConfirmReset(true)}>
            <Text style={styles.dangerText}>Reset all progress</Text>
          </Pressable>
        ) : (
          <View style={styles.row}>
            <Pressable style={({ pressed }) => [styles.dangerSolid, pressed && styles.pressed]} onPress={() => { reset(); setConfirmReset(false); }}>
              <Text style={styles.dangerSolidText}>Yes, wipe it</Text>
            </Pressable>
            <Pressable style={({ pressed }) => [styles.secondary, pressed && styles.pressed]} onPress={() => setConfirmReset(false)}>
              <Text style={styles.secondaryText}>Cancel</Text>
            </Pressable>
          </View>
        )}
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  screen: { flex: 1, backgroundColor: palette.cream },
  content: { padding: spacing.md, paddingBottom: 64 },
  section: { fontSize: 12, fontWeight: '800', color: '#8b5a0b', letterSpacing: 1, textTransform: 'uppercase', marginTop: spacing.lg, marginBottom: spacing.sm },
  card: { backgroundColor: palette.paper, borderColor: palette.line, borderWidth: 1, borderRadius: radii.md, padding: spacing.md, marginBottom: spacing.md },
  label: { fontSize: 15, fontWeight: '800', color: palette.ink, marginBottom: 6 },
  help: { fontSize: 13, color: palette.muted, lineHeight: 19, marginBottom: spacing.sm },
  input: { borderWidth: 1, borderColor: palette.line, borderRadius: radii.md, padding: 10, fontSize: 16, color: palette.ink, backgroundColor: palette.cream, marginBottom: spacing.sm },
  primary: { backgroundColor: palette.ink, borderRadius: radii.md, paddingVertical: 12, alignItems: 'center' },
  primaryText: { color: palette.white, fontWeight: '800' },
  saved: { marginTop: spacing.sm, fontSize: 13, color: '#2e7d5b', fontWeight: '700' },
  disabled: { opacity: 0.4 },
  pressed: { opacity: 0.75 },
  row: { flexDirection: 'row', gap: spacing.sm, flexWrap: 'wrap' },
  chip: { borderWidth: 1, borderColor: palette.line, borderRadius: radii.pill, paddingVertical: 8, paddingHorizontal: 14, backgroundColor: palette.cream },
  chipActive: { backgroundColor: palette.ink, borderColor: palette.ink },
  chipText: { color: palette.ink, fontWeight: '700', fontSize: 13 },
  chipTextActive: { color: palette.white },
  danger: { borderWidth: 1, borderColor: '#e0b3a8', borderRadius: radii.md, paddingVertical: 12, alignItems: 'center', backgroundColor: '#fbe4de' },
  dangerText: { color: palette.coral, fontWeight: '800' },
  dangerSolid: { backgroundColor: palette.coral, borderRadius: radii.md, paddingVertical: 12, paddingHorizontal: 20 },
  dangerSolidText: { color: palette.white, fontWeight: '800' },
  secondary: { borderWidth: 1, borderColor: '#77998e', borderRadius: radii.md, paddingVertical: 12, paddingHorizontal: 20 },
  secondaryText: { color: palette.ink, fontWeight: '800' },
});
