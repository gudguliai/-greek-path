import { Link, router } from 'expo-router';
import { Pressable, ScrollView, StyleSheet, Text, View } from 'react-native';

import { palette, radii, spacing } from '@/constants/theme';
import { conversations, course, flatLessons } from '@/data/course';
import { useProgress } from '@/store/progress';

export default function HomeScreen() {
  const completed = useProgress((s) => s.completedLessons);
  const streak = useProgress((s) => s.streak);
  const review = useProgress((s) => s.review);

  const doneCount = completed.filter((i) => i < flatLessons.length).length;
  const dueCount = Object.values(review).filter((r) => r.due <= new Date().toISOString().slice(0, 10)).length;

  const nextLesson = flatLessons.find((l) => !completed.includes(l.globalIndex) && (l.globalIndex === 0 || completed.includes(l.globalIndex - 1)));

  return (
    <ScrollView style={styles.screen} contentContainerStyle={styles.content}>
      <View style={styles.hero}>
        <Text style={styles.eyebrow}>Modern Greek · sound first</Text>
        <Text style={styles.title}>Learn Greek the way it is heard.</Text>
        <Text style={styles.lede}>
          {doneCount === 0
            ? 'Begin with the alphabet. Hear a sound, say it back, then use it in context.'
            : `Continue with ${nextLesson?.title ?? 'the next lesson'}.`}
        </Text>

        {nextLesson ? (
          <Pressable
            style={({ pressed }) => [styles.primary, pressed && styles.pressed]}
            onPress={() => router.push(`/lesson/${nextLesson.globalIndex}`)}
          >
            <Text style={styles.primaryText}>{doneCount === 0 ? 'Start lesson 1' : `Continue: ${nextLesson.title}`}</Text>
          </Pressable>
        ) : (
          <View style={styles.heroDone}>
            <Text style={styles.heroDoneText}>🎉 Course complete — keep reviewing!</Text>
          </View>
        )}
      </View>

      <View style={styles.statsRow}>
        <Stat label="Lessons" value={`${doneCount}/${flatLessons.length}`} />
        <Stat label="Streak" value={`${streak.count}${streak.count ? '🔥' : ''}`} />
        {dueCount > 0 && <Stat label="Due review" value={String(dueCount)} />}
      </View>

      <View style={styles.navRow}>
        <Link href="/review" asChild>
          <Pressable style={({ pressed }) => [styles.navCard, pressed && styles.pressed]}>
            <Text style={styles.navEmoji}>🔁</Text>
            <Text style={styles.navTitle}>Review</Text>
            <Text style={styles.navSub}>{dueCount ? `${dueCount} cards due` : 'Spaced review'}</Text>
          </Pressable>
        </Link>
        <Link href="/tutor" asChild>
          <Pressable style={({ pressed }) => [styles.navCard, pressed && styles.pressed]}>
            <Text style={styles.navEmoji}>💬</Text>
            <Text style={styles.navTitle}>AI Tutor</Text>
            <Text style={styles.navSub}>Practice a conversation</Text>
          </Pressable>
        </Link>
        <Link href="/settings" asChild>
          <Pressable style={({ pressed }) => [styles.navCard, pressed && styles.pressed]}>
            <Text style={styles.navEmoji}>⚙️</Text>
            <Text style={styles.navTitle}>Settings</Text>
            <Text style={styles.navSub}>Voice & AI key</Text>
          </Pressable>
        </Link>
      </View>

      <Text style={styles.sectionLabel}>Conversations</Text>
      <View style={styles.convWrap}>
        {conversations.map((conv) => (
          <Link key={conv.id} href={`/conversation/${conv.id}`} asChild>
            <Pressable style={({ pressed }) => [styles.navCard, styles.convCard, pressed && styles.pressed]}>
              <Text style={styles.navEmoji}>{conv.scene}</Text>
              <Text style={styles.navTitle}>{conv.title}</Text>
              <Text style={styles.navSub}>Unit {conv.unit} · speak a dialogue</Text>
            </Pressable>
          </Link>
        ))}
      </View>

      <Text style={styles.sectionLabel}>Course map</Text>
      {course.map((unit, unitIndex) => {
        const offset = course.slice(0, unitIndex).reduce((n, u) => n + u.lessons.length, 0);
        return (
          <View key={unit.title} style={styles.unit}>
            <Text style={styles.unitLabel}>Unit {unitIndex + 1}</Text>
            <Text style={styles.unitTitle}>{unit.title}</Text>
            <Text style={styles.unitDesc}>{unit.description}</Text>
            {unit.lessons.map((lesson, lessonInUnit) => {
              const globalIndex = offset + lessonInUnit;
              const done = completed.includes(globalIndex);
              const unlocked = globalIndex === 0 || completed.includes(globalIndex - 1);
              return (
                <Pressable
                  key={lesson.title}
                  disabled={!unlocked}
                  style={({ pressed }) => [styles.lesson, done && styles.lessonDone, unlocked && pressed && styles.pressed]}
                  onPress={() => router.push(`/lesson/${globalIndex}`)}
                >
                  <Text style={styles.lessonNum}>{done ? '✓' : globalIndex + 1}</Text>
                  <View style={styles.lessonBody}>
                    <Text style={[styles.lessonTitle, !unlocked && styles.lessonLocked]}>{lesson.title}</Text>
                    <Text style={styles.lessonMeta}>{done ? 'Completed' : unlocked ? 'Ready to learn' : 'Complete the lesson before this'}</Text>
                  </View>
                  <Text style={styles.lessonArrow}>{unlocked ? '→' : '🔒'}</Text>
                </Pressable>
              );
            })}
          </View>
        );
      })}
    </ScrollView>
  );
}

function Stat({ label, value }: { label: string; value: string }) {
  return (
    <View style={styles.stat}>
      <Text style={styles.statValue}>{value}</Text>
      <Text style={styles.statLabel}>{label}</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  screen: { flex: 1, backgroundColor: palette.cream },
  content: { padding: spacing.md, paddingBottom: 64 },
  hero: { paddingVertical: spacing.lg },
  eyebrow: { color: '#8b5a0b', fontSize: 12, fontWeight: '800', letterSpacing: 1.5, textTransform: 'uppercase', marginBottom: 10 },
  title: { fontSize: 42, lineHeight: 44, letterSpacing: -1.5, fontWeight: '800', color: palette.ink, marginBottom: 12 },
  lede: { fontSize: 16, color: palette.muted, maxWidth: 480, marginBottom: 22 },
  primary: { alignSelf: 'flex-start', backgroundColor: palette.ink, paddingVertical: 14, paddingHorizontal: 20, borderRadius: radii.md },
  primaryText: { color: palette.white, fontWeight: '800', fontSize: 16 },
  heroDone: { alignSelf: 'flex-start', backgroundColor: palette.mint, paddingVertical: 12, paddingHorizontal: 18, borderRadius: radii.md },
  heroDoneText: { color: palette.ink, fontWeight: '800' },
  pressed: { opacity: 0.75 },
  statsRow: { flexDirection: 'row', gap: spacing.sm, marginBottom: spacing.md },
  stat: { flex: 1, backgroundColor: palette.paper, borderColor: palette.line, borderWidth: 1, borderRadius: radii.md, padding: spacing.sm, alignItems: 'center' },
  statValue: { fontSize: 18, fontWeight: '800', color: palette.ink },
  statLabel: { fontSize: 12, color: palette.muted },
  navRow: { flexDirection: 'row', gap: spacing.sm, marginBottom: spacing.lg },
  convWrap: { flexDirection: 'row', flexWrap: 'wrap', gap: spacing.sm, marginBottom: spacing.lg },
  convCard: { flexBasis: '31%', flexGrow: 1, minWidth: 120 },
  navCard: { flex: 1, backgroundColor: palette.paper, borderColor: palette.line, borderWidth: 1, borderRadius: radii.md, padding: spacing.sm, alignItems: 'center' },
  navEmoji: { fontSize: 22 },
  navTitle: { fontSize: 14, fontWeight: '800', color: palette.ink, marginTop: 4 },
  navSub: { fontSize: 11, color: palette.muted, textAlign: 'center' },
  sectionLabel: { color: '#657871', fontSize: 12, fontWeight: '800', letterSpacing: 1.2, textTransform: 'uppercase', marginBottom: spacing.sm },
  unit: { marginBottom: spacing.lg },
  unitLabel: { color: '#8b5a0b', fontSize: 12, fontWeight: '800', letterSpacing: 1, textTransform: 'uppercase', marginBottom: 4 },
  unitTitle: { fontSize: 22, fontWeight: '800', color: palette.ink, marginBottom: 2 },
  unitDesc: { fontSize: 14, color: palette.muted, marginBottom: spacing.sm },
  lesson: { flexDirection: 'row', alignItems: 'center', gap: spacing.sm, padding: spacing.sm, borderColor: palette.line, borderWidth: 1, borderRadius: radii.md, backgroundColor: '#f7f3e9', marginBottom: 8, opacity: 0.6 },
  lessonDone: { backgroundColor: '#f7fff8', borderColor: '#93bda3', opacity: 1 },
  lessonNum: { width: 34, height: 34, borderRadius: 17, backgroundColor: '#e1e5df', textAlign: 'center', lineHeight: 34, fontWeight: '800', color: palette.ink, overflow: 'hidden' },
  lessonBody: { flex: 1 },
  lessonTitle: { fontSize: 15, fontWeight: '800', color: palette.ink },
  lessonLocked: { color: '#8a948e' },
  lessonMeta: { fontSize: 12, color: palette.muted },
  lessonArrow: { fontSize: 14, color: '#6e857a', fontWeight: '800' },
});
