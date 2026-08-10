import { router } from 'expo-router';
import { useState } from 'react';
import { KeyboardAvoidingView, Platform, Pressable, ScrollView, StyleSheet, Text, TextInput, View } from 'react-native';

import { palette, radii, spacing } from '@/constants/theme';
import { tutorChat, type TutorError, type TutorMessage } from '@/services/deepseek';
import { useSettings } from '@/store/settings';

const SUGGESTIONS = ['Γεια σου!', 'Θέλω έναν καφέ.', 'Πού είναι η παραλία;', 'Μου αρέσει η Ελλάδα.'];

export default function TutorScreen() {
  const apiKey = useSettings((s) => s.apiKey);
  const model = useSettings((s) => s.model);
  const [messages, setMessages] = useState<TutorMessage[]>([]);
  const [input, setInput] = useState('');
  const [busy, setBusy] = useState(false);
  const [error, setError] = useState<TutorError | null>(null);

  const send = async (text: string) => {
    const trimmed = text.trim();
    if (!trimmed || busy) return;
    if (!apiKey) {
      router.push('/settings');
      return;
    }
    setError(null);
    const history = [...messages, { role: 'user' as const, content: trimmed }];
    setMessages(history);
    setInput('');
    setBusy(true);
    const { text: reply, error: err } = await tutorChat(apiKey, model, history);
    setBusy(false);
    if (err) {
      setError(err);
      return;
    }
    setMessages((m) => [...m, { role: 'assistant', content: reply }]);
  };

  const errorText = (e: TutorError | null) => {
    if (!e) return null;
    switch (e.kind) {
      case 'no-key': return 'Add your DeepSeek API key in Settings to chat with the tutor.';
      case 'unauthorized': return 'That API key was rejected (401). Check it in Settings.';
      case 'rate-limited': return 'DeepSeek is rate-limiting — wait a moment and try again.';
      case 'network': return 'Network error — check your connection and try again.';
      default: return 'The tutor had a problem. Try again.';
    }
  };

  return (
    <KeyboardAvoidingView
      style={styles.flex}
      behavior={Platform.OS === 'ios' ? 'padding' : undefined}
      keyboardVerticalOffset={80}
    >
      <View style={styles.flex}>
        <ScrollView style={styles.screen} contentContainerStyle={styles.content}>
          {messages.length === 0 && (
            <View style={styles.empty}>
              <Text style={styles.emptyTitle}>💬 Practice with your Greek tutor</Text>
              <Text style={styles.emptyBody}>
                Type in Greek (or English) and the tutor will reply in simple Greek with
                transliteration, correct your mistakes, and keep it conversational.
              </Text>
              <View style={styles.suggestions}>
                {SUGGESTIONS.map((s) => (
                  <Pressable key={s} style={({ pressed }) => [styles.chip, pressed && styles.pressed]} onPress={() => send(s)}>
                    <Text style={styles.chipText}>{s}</Text>
                  </Pressable>
                ))}
              </View>
            </View>
          )}

          {messages.map((m, i) => (
            <View key={i} style={[styles.msg, m.role === 'user' ? styles.msgUser : styles.msgTutor]}>
              <Text style={[styles.msgText, m.role === 'user' && styles.msgTextUser]}>{m.content}</Text>
            </View>
          ))}

          {busy && <Text style={styles.busy}>Tutor is thinking…</Text>}
          {error && <Text style={styles.error}>{errorText(error)}</Text>}
        </ScrollView>

        <View style={styles.inputBar}>
          <TextInput
            style={styles.input}
            value={input}
            onChangeText={setInput}
            placeholder="Type in Greek or English…"
            placeholderTextColor={palette.muted}
            autoCapitalize="none"
            onSubmitEditing={() => send(input)}
            editable={!busy}
          />
          <Pressable style={({ pressed }) => [styles.send, pressed && styles.pressed, !input.trim() && styles.disabled]} disabled={!input.trim() || busy} onPress={() => send(input)}>
            <Text style={styles.sendText}>Send</Text>
          </Pressable>
        </View>
      </View>
    </KeyboardAvoidingView>
  );
}

const styles = StyleSheet.create({
  flex: { flex: 1 },
  screen: { flex: 1, backgroundColor: palette.cream },
  content: { padding: spacing.md, paddingBottom: 24 },
  empty: { marginTop: spacing.lg, marginBottom: spacing.md },
  emptyTitle: { fontSize: 20, fontWeight: '800', color: palette.ink, marginBottom: 8 },
  emptyBody: { fontSize: 14, color: palette.muted, lineHeight: 21, marginBottom: spacing.md },
  suggestions: { flexDirection: 'row', flexWrap: 'wrap', gap: spacing.sm },
  chip: { backgroundColor: palette.paper, borderWidth: 1, borderColor: palette.line, borderRadius: radii.pill, paddingVertical: 8, paddingHorizontal: 14 },
  chipText: { color: palette.ink, fontWeight: '700', fontSize: 14 },
  pressed: { opacity: 0.75 },
  msg: { maxWidth: '86%', borderRadius: radii.lg, padding: spacing.sm, marginBottom: spacing.sm },
  msgTutor: { backgroundColor: palette.paper, borderColor: palette.line, borderWidth: 1, alignSelf: 'flex-start' },
  msgUser: { backgroundColor: palette.ink, alignSelf: 'flex-end' },
  msgText: { fontSize: 15, color: palette.ink, lineHeight: 21 },
  msgTextUser: { color: palette.white },
  busy: { fontSize: 13, color: palette.muted, fontStyle: 'italic', marginBottom: spacing.sm },
  error: { fontSize: 13, color: palette.coral, marginBottom: spacing.sm },
  inputBar: { flexDirection: 'row', gap: spacing.sm, padding: spacing.sm, borderTopWidth: 1, borderTopColor: palette.line, backgroundColor: palette.paper },
  input: { flex: 1, borderWidth: 1, borderColor: palette.line, borderRadius: radii.md, padding: 10, fontSize: 16, color: palette.ink, backgroundColor: palette.cream },
  send: { backgroundColor: palette.ink, borderRadius: radii.md, paddingVertical: 10, paddingHorizontal: 16, justifyContent: 'center' },
  sendText: { color: palette.white, fontWeight: '800' },
  disabled: { opacity: 0.4 },
});
