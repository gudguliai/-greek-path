import { Stack, useLocalSearchParams } from 'expo-router';
import { useEffect, useMemo, useState } from 'react';
import { Pressable, ScrollView, StyleSheet, Text, TextInput, View } from 'react-native';

import { palette, radii, spacing } from '@/constants/theme';
import { conversations } from '@/data/course';
import { speechRecognizer } from '@/services/recognizer';
import { speakGreek } from '@/services/speech';
import { normalizeGreek, useProgress } from '@/store/progress';

type StepPhase = 'listen' | 'repeat' | 'respond' | 'review';

// Static export: generate one HTML file per conversation so deep links work on Pages.
export function generateStaticParams(): { id: string }[] {
  return conversations.map((c) => ({ id: c.id }));
}

const PHASE_LABEL: Record<StepPhase, string> = {
  listen: 'Listen',
  repeat: 'Say it',
  respond: 'Your turn',
  review: 'Review',
};

export default function ConversationScreen() {
  const { id } = useLocalSearchParams<{ id: string }>();
  const conv = conversations.find((c) => c.id === id) ?? conversations[0];

  const markLessonComplete = useProgress((s) => s.markLessonComplete);
  const recordReview = useProgress((s) => s.recordReview);

  const [stepIndex, setStepIndex] = useState(0);
  const [phase, setPhase] = useState<StepPhase>('listen');
  const [answer, setAnswer] = useState('');
  const [feedback, setFeedback] = useState<string | null>(null);
  const [micBusy, setMicBusy] = useState(false);

  const step = conv.steps[stepIndex];
  const isLearnerStep = step?.speaker === 'learner';
  const isLastStep = stepIndex === conv.steps.length - 1;
  const stepId = step ? `${conv.id}-s${stepIndex}` : '';

  // Auto-play native lines on listen phase
  useEffect(() => {
    if (phase === 'listen' && step && step.speaker === 'native') {
      const t = setTimeout(() => speakGreek(step.greek), 250);
      return () => clearTimeout(t);
    }
  }, [phase, stepIndex, step]);

  const advance = () => {
    setAnswer('');
    setFeedback(null);
    setPhase('listen');
    if (isLastStep) {
      markLessonComplete(30 + conv.unit - 1); // conversations beyond lessons
      return;
    }
    setStepIndex((i) => i + 1);
  };

  const checkAnswer = (typed: string) => {
    const norm = normalizeGreek(typed);
    const accepted = [step.greek, ...(step.accepted ?? [])].map(normalizeGreek);
    const correct = accepted.includes(norm);
    recordReview(stepId, correct);
    setFeedback(correct ? '✅ Σωστά! Correct.' : `Almost — “${step.greek}” (${step.say})`);
  };

  const useMic = async () => {
    setMicBusy(true);
    setFeedback(null);
    const result = await speechRecognizer.recognize(step.greek);
    setMicBusy(false);
    if (result.available && result.transcript) {
      setAnswer(result.transcript);
      checkAnswer(result.transcript);
    } else if (!result.available) {
      setFeedback('Speech input is not available in this browser — type your answer instead.');
    } else {
      setFeedback('Did not catch that — try again or type it.');
    }
  };

  const stepMeaning = useMemo(() => step?.meaning ?? '', [step]);

  return (
    <ScrollView style={styles.screen} contentContainerStyle={styles.content}>
      <Stack.Screen options={{ title: conv.title }} />
      <View style={styles.header}>
        <Text style={styles.scene}>{conv.scene}</Text>
        <Text style={styles.title}>{conv.title}</Text>
        <Text style={styles.subtitle}>Conversation · unit {conv.unit}</Text>
      </View>

      <View style={styles.stepBar}>
        <Text style={styles.phaseLabel}>{PHASE_LABEL[phase]}</Text>
        <Text style={styles.stepCount}>{stepIndex + 1} / {conv.steps.length}</Text>
      </View>

      {step && (
        <View style={[styles.bubble, isLearnerStep ? styles.bubbleLearner : styles.bubbleNative]}>
          <Text style={styles.bubbleSpeaker}>{isLearnerStep ? 'You' : 'Greek speaker'}</Text>
          <Text style={styles.bubbleGreek}>{step.greek}</Text>
          <Text style={styles.bubbleSay}>{step.say}</Text>
          <Text style={styles.bubbleMeaning}>{step.meaning}</Text>
        </View>
      )}

      {phase === 'listen' && (
        <Pressable style={({ pressed }) => [styles.primary, pressed && styles.pressed]} onPress={() => speakGreek(step?.greek ?? '')}>
          <Text style={styles.primaryText}>▶ Listen again</Text>
        </Pressable>
      )}

      {phase === 'repeat' && isLearnerStep && (
        <>
          <Pressable style={({ pressed }) => [styles.primary, pressed && styles.pressed]} onPress={() => speakGreek(step?.greek ?? '')}>
            <Text style={styles.primaryText}>▶ Hear it</Text>
          </Pressable>
          <Text style={styles.hint}>Now try saying it out loud — then tap “I said it”.</Text>
        </>
      )}

      {phase === 'respond' && isLearnerStep && (
        <>
          <TextInput
            style={styles.input}
            value={answer}
            onChangeText={(t) => { setAnswer(t); setFeedback(null); }}
            placeholder="Type your answer in Greek…"
            placeholderTextColor={palette.muted}
            autoCapitalize="none"
          />
          <View style={styles.row}>
            {speechRecognizer.supported && (
              <Pressable style={({ pressed }) => [styles.secondary, pressed && styles.pressed, micBusy && styles.disabled]} disabled={micBusy} onPress={useMic}>
                <Text style={styles.secondaryText}>{micBusy ? 'Listening…' : '🎤 Speak'}</Text>
              </Pressable>
            )}
            <Pressable style={({ pressed }) => [styles.primary, styles.flex, pressed && styles.pressed]} onPress={() => checkAnswer(answer)}>
              <Text style={styles.primaryText}>Check</Text>
            </Pressable>
          </View>
        </>
      )}

      {feedback && <Text style={styles.feedback}>{feedback}</Text>}

      <View style={styles.controls}>
        {phase === 'listen' && (
          <Pressable
            style={({ pressed }) => [styles.primary, styles.flex, pressed && styles.pressed]}
            onPress={() => setPhase(isLearnerStep ? 'repeat' : 'listen')}
          >
            <Text style={styles.primaryText}>{isLearnerStep ? 'It’s my turn' : 'Continue'}</Text>
          </Pressable>
        )}
        {phase === 'repeat' && (
          <Pressable
            style={({ pressed }) => [styles.primary, styles.flex, pressed && styles.pressed]}
            onPress={() => setPhase('respond')}
          >
            <Text style={styles.primaryText}>I said it — next</Text>
          </Pressable>
        )}
        {(phase === 'respond' && feedback) || (phase === 'listen' && isLastStep) ? (
          <Pressable
            style={({ pressed }) => [styles.primary, styles.flex, pressed && styles.pressed]}
            onPress={advance}
          >
            <Text style={styles.primaryText}>
              {isLastStep && phase === 'listen' ? 'Finish conversation' : feedback ? 'Next line' : 'Continue'}
            </Text>
          </Pressable>
        ) : null}
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  screen: { flex: 1, backgroundColor: palette.cream },
  content: { padding: spacing.md, paddingBottom: 64 },
  header: { alignItems: 'center', marginBottom: spacing.md },
  scene: { fontSize: 52, marginBottom: 6 },
  title: { fontSize: 24, fontWeight: '800', color: palette.ink },
  subtitle: { fontSize: 13, color: palette.muted, marginTop: 2 },
  stepBar: { flexDirection: 'row', justifyContent: 'space-between', marginBottom: spacing.sm },
  phaseLabel: { fontSize: 12, fontWeight: '800', color: '#8b5a0b', letterSpacing: 1, textTransform: 'uppercase' },
  stepCount: { fontSize: 13, fontWeight: '800', color: palette.muted },
  bubble: { borderRadius: radii.lg, padding: spacing.md, marginBottom: spacing.md, maxWidth: '92%' },
  bubbleNative: { backgroundColor: palette.mint, alignSelf: 'flex-start' },
  bubbleLearner: { backgroundColor: '#e8ecf5', alignSelf: 'flex-end' },
  bubbleSpeaker: { fontSize: 12, fontWeight: '800', color: palette.muted, marginBottom: 4 },
  bubbleGreek: { fontSize: 26, fontWeight: '800', color: palette.ink, marginBottom: 4 },
  bubbleSay: { fontSize: 14, color: palette.mintDeep, fontWeight: '700', marginBottom: 4 },
  bubbleMeaning: { fontSize: 13, color: palette.muted },
  hint: { fontSize: 13, color: palette.muted, marginTop: spacing.sm, fontStyle: 'italic' },
  input: { borderWidth: 1, borderColor: palette.line, backgroundColor: palette.paper, borderRadius: radii.md, padding: spacing.sm, fontSize: 17, color: palette.ink, marginBottom: spacing.sm, minHeight: 48 },
  row: { flexDirection: 'row', gap: spacing.sm },
  flex: { flex: 1 },
  primary: { backgroundColor: palette.ink, borderRadius: radii.md, paddingVertical: 14, paddingHorizontal: 20, alignItems: 'center' },
  primaryText: { color: palette.white, fontWeight: '800', fontSize: 15 },
  secondary: { borderWidth: 1, borderColor: '#77998e', borderRadius: radii.md, paddingVertical: 14, paddingHorizontal: 20 },
  secondaryText: { color: palette.ink, fontWeight: '800', fontSize: 15 },
  disabled: { opacity: 0.5 },
  pressed: { opacity: 0.75 },
  feedback: { marginTop: spacing.sm, fontSize: 14, color: palette.ink, backgroundColor: palette.paper, borderColor: palette.line, borderWidth: 1, borderRadius: radii.md, padding: spacing.sm, lineHeight: 20 },
  controls: { marginTop: spacing.lg, flexDirection: 'row', gap: spacing.sm },
});
