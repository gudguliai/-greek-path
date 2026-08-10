// Speech service — expo-speech wrapper for Greek TTS.
// On web this uses the browser's SpeechSynthesis; on native, the OS voices.
// Fallback-safe: if no Greek voice exists, it still speaks (device default).

import * as Speech from 'expo-speech';

export function speakGreek(text: string, rate = 0.68): Promise<void> {
  return new Promise((resolve) => {
    try {
      stopSpeaking();
      Speech.speak(text, {
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
