import { router, Stack, useLocalSearchParams } from 'expo-router';
import { useMemo, useRef, useState } from 'react';
import { Pressable, ScrollView, StyleSheet, Text, View } from 'react-native';

import { palette, radii, spacing } from '@/constants/theme';
import { flatLessons } from '@/data/course';
import { speakGreek } from '@/services/speech';
import { useProgress } from '@/store/progress';

type Phase = 'listen' | 'check';

// Static export: generate one HTML file per lesson so deep links work on Pages.
export function generateStaticParams(): { id: string }[] {
  return flatLessons.map((lesson) => ({ id: String(lesson.globalIndex) }));
}

export default function LessonScreen() {
  const { id } = useLocalSearchParams<{ id: string }>();
  const index = Number(id ?? '0');
  const lesson = flatLessons[index];

  const markLessonComplete = useProgress((s) => s.markLessonComplete);
  const recordReview = useProgress((s) => s.recordReview);

  const [cardIndex, setCardIndex] = useState(0);
  const [phase, setPhase] = useState<Phase>('listen');
  const [checked, setChecked] = useState(false);
  const [wasCorrect, setWasCorrect] = useState(false);
  const scrollRef = useRef<ScrollView>(null);

  const card = useMemo(() => lesson?.cards[cardIndex], [lesson, cardIndex]);
  const isLastCard = cardIndex === (lesson?.cards.length ?? 1) - 1;
  const isLastLesson = index === flatLessons.length - 1;

  if (!lesson || !card) {
    return <View style={styles.screen}><Text style={styles.missing}>Lesson not found.</Text></View>;
  }

  const play = () => speakGreek(card.greek, 0.68);

  const nextCard = () => {
    setChecked(false);
    if (isLastCard) {
      setPhase('check');
      return;
    }
    setCardIndex((i) => i + 1);
  };

  const answerCheck = (correct: boolean) => {
    setChecked(true);
    setWasCorrect(correct);
    recordReview(card.id, correct);
    if (correct && !isLastCard) {
      // Only complete the lesson at the final card's check
      markLessonComplete(index);
    }
  };

  const finishLesson = () => {
    markLessonComplete(index);
    if (isLastLesson) {
      setChecked(false);
      setCardIndex(0);
      setPhase('listen');
      router.push('/');
      return;
    }
    // Advance to the next lesson instead of re-showing this one.
    router.push(`/lesson/${index + 1}`);
  };

  const distractors = useMemo(() => {
    const pool = flatLessons.filter((l) => l.globalIndex !== index).flatMap((l) => l.cards.map((c) => c.meaning));
    const unique = [...new Set(pool)];
    const chosen = unique.slice(cardIndex % Math.max(unique.length - 2, 1), cardIndex % Math.max(unique.length - 2, 1) + 2);
    return [card.meaning, ...chosen].sort(() => Math.random() - 0.5);
  }, [index, cardIndex, card.meaning]);

  return (
    <ScrollView ref={scrollRef} style={styles.screen} contentContainerStyle={styles.content}>
      <Stack.Screen options={{ title: lesson.title }} />
      <View style={styles.bar}>
        <Text style={styles.stepLabel}>{phase === 'listen' ? 'Listen and repeat' : 'A quick check'}</Text>
        {phase === 'listen' ? (
          <Text style={styles.stepCount}>{cardIndex + 1} / {lesson.cards.length}</Text>
        ) : (
          <Pressable style={({ pressed }) => pressed && styles.pressed} onPress={finishLesson} hitSlop={8}>
            <Text style={styles.doneText}>Done ✓</Text>
          </Pressable>
        )}
      </View>

      {phase === 'listen' ? (
        <>
          <View style={styles.scene}><Text style={styles.sceneEmoji}>{card.scene}</Text></View>
          <Text style={styles.unitLabel}>Unit {lesson.unitIndex + 1} · {lesson.unitTitle}</Text>
          <Text style={styles.greek}>{card.greek}</Text>
          <Text style={styles.say}>{card.say}</Text>
          <Text style={styles.meaning}>{card.meaning}</Text>
          <Pressable style={({ pressed }) => [styles.listenButton, pressed && styles.pressed]} onPress={play}>
            <Text style={styles.listenText}>▶ Listen</Text>
          </Pressable>
          <View style={styles.controls}>
            <Pressable
              style={({ pressed }) => [styles.secondary, pressed && styles.pressed, cardIndex === 0 && styles.disabled]}
              disabled={cardIndex === 0}
              onPress={() => setCardIndex((i) => i - 1)}
            >
              <Text style={styles.secondaryText}>Back</Text>
            </Pressable>
            <Pressable style={({ pressed }) => [styles.primary, pressed && styles.pressed]} onPress={nextCard}>
              <Text style={styles.primaryText}>{isLastCard ? 'Try a quick check' : 'I heard it — next'}</Text>
            </Pressable>
          </View>
        </>
      ) : (
        <>
          <Text style={styles.checkPrompt}>What does “{card.greek}” mean?</Text>
          <View style={styles.choices}>
            {distractors.map((option) => (
              <Pressable
                key={option}
                disabled={checked}
                style={({ pressed }) => [
                  styles.choice,
                  checked && option === card.meaning && styles.choiceCorrect,
                  checked && option !== card.meaning && styles.choiceWrong,
                  pressed && styles.pressed,
                ]}
                onPress={() => answerCheck(option === card.meaning)}
              >
                <Text style={styles.choiceText}>{option}</Text>
              </Pressable>
            ))}
          </View>
          {checked && (
            <View style={styles.feedback}>
              <Text style={styles.feedbackText}>
                {wasCorrect ? `Yes — ${card.meaning}. ${isLastCard ? 'Lesson complete!' : ''}` : `The answer is “${card.meaning}”. You will see it again soon.`}
              </Text>
            </View>
          )}
          {checked && (
            <Pressable style={({ pressed }) => [styles.primary, styles.fullWidth, pressed && styles.pressed]} onPress={finishLesson}>
              <Text style={styles.primaryText}>{isLastLesson ? 'Back to course' : 'Continue to the next lesson'}</Text>
            </Pressable>
          )}
        </>
      )}
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  screen: { flex: 1, backgroundColor: palette.cream },
  content: { padding: spacing.md, paddingBottom: 64 },
  missing: { padding: spacing.lg, color: palette.muted },
  bar: { flexDirection: 'row', justifyContent: 'space-between', marginBottom: spacing.md },
  stepLabel: { fontSize: 12, fontWeight: '800', color: '#8b5a0b', letterSpacing: 1, textTransform: 'uppercase' },
  stepCount: { fontSize: 13, fontWeight: '800', color: palette.muted },
  doneText: { fontSize: 13, fontWeight: '800', color: palette.mintDeep },
  scene: { height: 120, borderRadius: radii.lg, backgroundColor: palette.goldSoft, alignItems: 'center', justifyContent: 'center', marginBottom: spacing.md },
  sceneEmoji: { fontSize: 56 },
  unitLabel: { color: '#657871', fontSize: 12, fontWeight: '800', letterSpacing: 1, textTransform: 'uppercase', marginBottom: 6 },
  greek: { fontSize: 44, fontWeight: '800', color: palette.ink, marginBottom: 4 },
  say: { fontSize: 17, color: palette.mintDeep, fontWeight: '700', marginBottom: 10 },
  meaning: { fontSize: 15, color: palette.muted, marginBottom: spacing.lg },
  listenButton: { alignSelf: 'flex-start', backgroundColor: '#e6f0e9', borderRadius: radii.sm, paddingVertical: 10, paddingHorizontal: 14, marginBottom: spacing.lg },
  listenText: { color: '#254d44', fontWeight: '800', fontSize: 14 },
  pressed: { opacity: 0.75 },
  disabled: { opacity: 0.4 },
  controls: { flexDirection: 'row', gap: spacing.sm, marginTop: 'auto' },
  primary: { backgroundColor: palette.ink, borderRadius: radii.md, paddingVertical: 14, paddingHorizontal: 20 },
  primaryText: { color: palette.white, fontWeight: '800', fontSize: 15 },
  secondary: { borderWidth: 1, borderColor: '#77998e', borderRadius: radii.md, paddingVertical: 14, paddingHorizontal: 20 },
  secondaryText: { color: palette.ink, fontWeight: '800', fontSize: 15 },
  fullWidth: { alignSelf: 'stretch', alignItems: 'center', marginTop: spacing.md },
  checkPrompt: { fontSize: 20, fontWeight: '800', color: palette.ink, marginBottom: spacing.md },
  choices: { gap: spacing.sm, marginBottom: spacing.md },
  choice: { backgroundColor: palette.paper, borderWidth: 1, borderColor: palette.line, borderRadius: radii.md, padding: spacing.md },
  choiceCorrect: { backgroundColor: palette.mint, borderColor: '#93bda3' },
  choiceWrong: { backgroundColor: '#fbe4de', borderColor: '#e0b3a8' },
  choiceText: { fontSize: 15, fontWeight: '700', color: palette.ink },
  feedback: { backgroundColor: palette.paper, borderColor: palette.line, borderWidth: 1, borderRadius: radii.md, padding: spacing.md, marginBottom: spacing.sm },
  feedbackText: { fontSize: 14, color: palette.ink, lineHeight: 20 },
});
