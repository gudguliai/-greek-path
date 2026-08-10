// Speech service — expo-speech wrapper for Greek TTS.
// On web this uses the browser's SpeechSynthesis; on native, the OS voices.
// Fallback-safe: if no Greek voice exists, it still speaks (device default).

import * as Speech from 'expo-speech';

// Alphabet cards display both glyph forms ("Α α"). Speaking both makes the
// voice repeat the letter name. Detect a single-letter pair and speak only
// the first form (same letter name either way).
export function speechText(greek: string): string {
  const m = greek.match(/^(\p{L})\s+(\p{L})$/u);
  return m ? m[1] : greek;
}

export function speakGreek(text: string, rate = 0.68): Promise<void> {
  const spoken = speechText(text);
  return new Promise((resolve) => {
    try {
      stopSpeaking();
      Speech.speak(spoken, {
        language: 'el-GR',
        rate,
        onDone: () => resolve(),
        onStopped: () => resolve(),
        onError: () => resolve(),
      });
      // Safety: if no callback fires, don't hang callers.
      setTimeout(resolve, 15000);
    } catch {
      resolve();
    }
  });
}

export function stopSpeaking() {
  try {
    Speech.stop();
  } catch {
    // ignore
  }
}

export async function hasGreekVoice(): Promise<boolean> {
  try {
    const voices = await Speech.getAvailableVoicesAsync();
    return voices.some((v) => v.language?.toLowerCase().startsWith('el'));
  } catch {
    return false;
  }
}
