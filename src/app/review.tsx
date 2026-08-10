import { useMemo, useState } from 'react';
import { Pressable, ScrollView, StyleSheet, Text, View } from 'react-native';

import { palette, radii, spacing } from '@/constants/theme';
import { allCards, findCard } from '@/data/course';
import { speakGreek } from '@/services/speech';
import { useProgress } from '@/store/progress';

export default function ReviewScreen() {
  const review = useProgress((s) => s.review);
  const recordReview = useProgress((s) => s.recordReview);

  const dueCards = useMemo(() => {
    const today = new Date().toISOString().slice(0, 10);
    return Object.entries(review)
      .filter(([, entry]) => entry.due <= today)
      .map(([cardId]) => findCard(cardId))
      .filter((c): c is NonNullable<typeof c> => Boolean(c));
  }, [review]);

  const [queue, setQueue] = useState<typeof dueCards>([]);
  const [index, setIndex] = useState(0);
  const [revealed, setRevealed] = useState(false);

  const start = () => {
    setQueue(dueCards);
    setIndex(0);
    setRevealed(false);
  };

  const card = queue[index];

  const grade = (correct: boolean) => {
    if (!card) return;
    recordReview(card.id, correct);
    setRevealed(false);
    if (index < queue.length - 1) setIndex((i) => i + 1);
    else setQueue([]);
  };

  if (dueCards.length === 0 && queue.length === 0) {
    return (
      <View style={styles.screen}>
        <View style={styles.empty}>
          <Text style={styles.emptyEmoji}>🎉</Text>
          <Text style={styles.emptyTitle}>All caught up!</Text>
          <Text style={styles.emptyBody}>No cards are due right now. Complete lessons or conversations to build your review queue.</Text>
        </View>
      </View>
    );
  }

  if (!card) {
    return (
      <View style={styles.screen}>
        <View style={styles.empty}>
          <Text style={styles.emptyEmoji}>✅</Text>
          <Text style={styles.emptyTitle}>Review finished</Text>
          <Text style={styles.emptyBody}>You reviewed {queue.length === 0 && dueCards.length > 0 ? dueCards.length : 'all'} due cards. Come back tomorrow!</Text>
          <Pressable style={({ pressed }) => [styles.primary, pressed && styles.pressed]} onPress={start}>
            <Text style={styles.primaryText}>Start again</Text>
          </Pressable>
        </View>
      </View>
    );
  }

  return (
    <ScrollView style={styles.screen} contentContainerStyle={styles.content}>
      <View style={styles.bar}>
        <Text style={styles.count}>{index + 1} / {queue.length}</Text>
      </View>

      <View style={styles.card}>
        <Text style={styles.scene}>{card.scene}</Text>
        {revealed ? (
          <>
            <Text style={styles.greek}>{card.greek}</Text>
            <Text style={styles.say}>{card.say}</Text>
            <Text style={styles.meaning}>{card.meaning}</Text>
          </>
        ) : (
          <Text style={styles.prompt}>Do you remember this?</Text>
        )}
        <Pressable style={({ pressed }) => [styles.listen, pressed && styles.pressed]} onPress={() => speakGreek(card.greek)}>
          <Text style={styles.listenText}>▶ Listen</Text>
        </Pressable>
      </View>

      {revealed ? (
        <View style={styles.buttons}>
          <Pressable style={({ pressed }) => [styles.wrong, pressed && styles.pressed]} onPress={() => grade(false)}>
            <Text style={styles.wrongText}>Still learning</Text>
          </Pressable>
          <Pressable style={({ pressed }) => [styles.right, pressed && styles.pressed]} onPress={() => grade(true)}>
            <Text style={styles.rightText}>Got it</Text>
          </Pressable>
        </View>
      ) : (
        <Pressable style={({ pressed }) => [styles.primary, pressed && styles.pressed]} onPress={() => setRevealed(true)}>
          <Text style={styles.primaryText}>Show answer</Text>
        </Pressable>
      )}
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  screen: { flex: 1, backgroundColor: palette.cream },
  content: { padding: spacing.md, paddingBottom: 64 },
  bar: { marginBottom: spacing.md },
  count: { fontSize: 13, fontWeight: '800', color: palette.muted, textAlign: 'right' },
  card: { backgroundColor: palette.paper, borderColor: palette.line, borderWidth: 1, borderRadius: radii.lg, padding: spacing.xl, alignItems: 'center', marginBottom: spacing.lg },
  scene: { fontSize: 48, marginBottom: spacing.md },
  prompt: { fontSize: 18, fontWeight: '700', color: palette.muted, textAlign: 'center', marginBottom: spacing.sm },
  greek: { fontSize: 40, fontWeight: '800', color: palette.ink, textAlign: 'center', marginBottom: 6 },
  say: { fontSize: 17, color: palette.mintDeep, fontWeight: '700', marginBottom: 8, textAlign: 'center' },
  meaning: { fontSize: 16, color: palette.muted, marginBottom: spacing.md, textAlign: 'center' },
  listen: { backgroundColor: '#e6f0e9', borderRadius: radii.sm, paddingVertical: 10, paddingHorizontal: 14 },
  listenText: { color: '#254d44', fontWeight: '800', fontSize: 14 },
  pressed: { opacity: 0.75 },
  primary: { backgroundColor: palette.ink, borderRadius: radii.md, paddingVertical: 14, paddingHorizontal: 24, alignItems: 'center' },
  primaryText: { color: palette.white, fontWeight: '800', fontSize: 15 },
  buttons: { flexDirection: 'row', gap: spacing.sm },
  wrong: { flex: 1, backgroundColor: '#fbe4de', borderColor: '#e0b3a8', borderWidth: 1, borderRadius: radii.md, paddingVertical: 14, alignItems: 'center' },
  wrongText: { color: palette.coral, fontWeight: '800' },
  right: { flex: 1, backgroundColor: palette.mint, borderColor: '#93bda3', borderWidth: 1, borderRadius: radii.md, paddingVertical: 14, alignItems: 'center' },
  rightText: { color: palette.ink, fontWeight: '800' },
  empty: { flex: 1, alignItems: 'center', justifyContent: 'center', padding: spacing.xl, marginTop: 80 },
  emptyEmoji: { fontSize: 48, marginBottom: spacing.sm },
  emptyTitle: { fontSize: 22, fontWeight: '800', color: palette.ink, marginBottom: 8 },
  emptyBody: { fontSize: 14, color: palette.muted, textAlign: 'center', lineHeight: 21, marginBottom: spacing.md },
});
