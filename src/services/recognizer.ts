// SpeechRecognizer — abstraction seam for mic input.
// Web: uses the browser Web Speech API (Chrome-only, progressive enhancement).
// Native (later): swap in an on-device recognizer behind the same interface.
// Unsupported platforms expose `supported === false`; UI hides/disables the mic.

export type RecognizeResult = {
  transcript: string;
  available: boolean;
};

export interface SpeechRecognizer {
  readonly supported: boolean;
  recognize(expectedHint: string): Promise<RecognizeResult>;
}

class WebRecognizer implements SpeechRecognizer {
  readonly supported: boolean;

  constructor() {
    this.supported =
      typeof window !== 'undefined' &&
      typeof (window as any).webkitSpeechRecognition !== 'undefined';
  }

  recognize(expectedHint: string): Promise<RecognizeResult> {
    return new Promise((resolve) => {
      if (!this.supported) {
        resolve({ transcript: '', available: false });
        return;
      }
      const SR = (window as any).webkitSpeechRecognition;
      const rec = new SR();
      rec.lang = 'el-GR';
      rec.interimResults = false;
      rec.maxAlternatives = 1;
      rec.onresult = (event: any) => {
        const transcript = event.results?.[0]?.[0]?.transcript ?? '';
        resolve({ transcript, available: true });
      };
      rec.onerror = () => resolve({ transcript: '', available: false });
      rec.onend = () => resolve({ transcript: '', available: false });
      try {
        rec.start();
        // Safety timeout — if recognition never ends, don't hang.
        setTimeout(() => {
          try {
            rec.stop();
          } catch {
            // ignore
          }
          resolve({ transcript: '', available: false });
        }, 12000);
      } catch {
        resolve({ transcript: '', available: false });
      }
    });
  }
}

class NoopRecognizer implements SpeechRecognizer {
  readonly supported = false;
  async recognize(): Promise<RecognizeResult> {
    return { transcript: '', available: false };
  }
}

export const speechRecognizer: SpeechRecognizer = new WebRecognizer();
