// Progress store — zustand + AsyncStorage (localStorage on web).
// Includes one-time migration from the original web app's localStorage key
// (greek-path-course-progress: array of completed lesson indices).

import AsyncStorage from '@react-native-async-storage/async-storage';
import { create } from 'zustand';
import { createJSONStorage, persist } from 'zustand/middleware';

export const STORAGE_KEY = 'greek-path-progress-v1';
export const OLD_STORAGE_KEY = 'greek-path-course-progress';

export type ReviewEntry = {
  box: number; // 0..5 Leitner box
  due: string; // ISO date when next due
  lapses: number;
};

export type ProgressState = {
  version: 1;
  completedLessons: number[]; // global lesson indices (0-based)
  review: Record<string, ReviewEntry>; // cardId -> review record
  streak: { last: string; count: number }; // last = YYYY-MM-DD local
  migrated: boolean;
};

const LEITNER_DAYS = [0, 1, 2, 4, 7, 15, 30];

export function dueInDays(box: number): number {
  return LEITNER_DAYS[Math.min(box, LEITNER_DAYS.length - 1)];
}

export function todayISO(): string {
  const d = new Date();
  const m = `${d.getMonth() + 1}`.padStart(2, '0');
  const day = `${d.getDate()}`.padStart(2, '0');
  return `${d.getFullYear()}-${m}-${day}`;
}

function isYesterday(iso: string): boolean {
  const d = new Date(iso + 'T12:00:00');
  d.setDate(d.getDate() + 1);
  return todayISO() === `${d.getFullYear()}-${`${d.getMonth() + 1}`.padStart(2, '0')}-${`${d.getDate()}`.padStart(2, '0')}`;
}

function bumpStreak(streak: ProgressState['streak']): ProgressState['streak'] {
  const today = todayISO();
  if (streak.last === today) return streak;
  if (isYesterday(streak.last)) return { last: today, count: streak.count + 1 };
  return { last: today, count: 1 };
}

// Accent-insensitive Greek normalization (fold tonos/dialytika to base letter).
export function normalizeGreek(input: string): string {
  return input
    .toLowerCase()
    .normalize('NFD')
    .replace(/[\u0300-\u036f]/g, '') // strip combining marks
    .replace(/[\u0386\u03AC]/g, 'α')
    .replace(/[\u0388\u03AD]/g, 'ε')
    .replace(/[\u0389\u03AE]/g, 'η')
    .replace(/[\u038A\u03AF]/g, 'ι')
    .replace(/[\u038C\u03CC]/g, 'ο')
    .replace(/[\u038E\u03CD]/g, 'υ')
    .replace(/[\u038F\u03CE]/g, 'ω')
    .replace(/[\u0390]/g, 'ι') // ΐ (iota dialytika+tonos)
    .replace(/[\u03B0]/g, 'υ') // ΰ (upsilon dialytika+tonos)
    .replace(/[!?;:.,…«»"'()\-–—]/g, ' ') // punctuation -> space (so "Γεια σου!" matches "γεια σου")
    .replace(/\s+/g, ' ')
    .trim();
}

function safeParse(raw: string | null): ProgressState | null {
  if (!raw) return null;
  try {
    const parsed = JSON.parse(raw);
    if (parsed && typeof parsed === 'object' && Array.isArray(parsed.completedLessons)) {
      return parsed as ProgressState;
    }
    return null;
  } catch {
    return null; // corrupt storage -> start fresh (fixes old app.js latent crash)
  }
}

export const useProgress = create<ProgressState & {
  markLessonComplete: (globalIndex: number) => void;
  recordReview: (cardId: string, correct: boolean) => void;
  reset: () => void;
  hydrate: () => Promise<void>;
}>()(
  persist(
    (set, get) => ({
      version: 1,
      completedLessons: [],
      review: {},
      streak: { last: '', count: 0 },
      migrated: false,

      hydrate: async () => {
        const raw = await AsyncStorage.getItem(STORAGE_KEY);
        const state = safeParse(raw);
        if (state) {
          set({ ...state, streak: bumpStreak(state.streak) });
          return;
        }
        // Try migrating the old web app key
        try {
          const old = await AsyncStorage.getItem(OLD_STORAGE_KEY);
          if (old) {
            const oldArr = safeParse(old);
            if (oldArr && Array.isArray(oldArr.completedLessons)) {
              set({
                completedLessons: oldArr.completedLessons,
                migrated: true,
                streak: { last: todayISO(), count: 1 },
              });
              await AsyncStorage.removeItem(OLD_STORAGE_KEY);
              return;
            }
          }
        } catch {
          // ignore old-key issues; start fresh
        }
        set({ migrated: true, streak: bumpStreak(get().streak) });
      },

      markLessonComplete: (globalIndex) => {
        const { completedLessons, streak } = get();
        if (!completedLessons.includes(globalIndex)) {
          completedLessons.push(globalIndex);
          completedLessons.sort((a, b) => a - b);
        }
        set({ completedLessons: [...completedLessons], streak: bumpStreak(streak) });
      },

      recordReview: (cardId, correct) => {
        const review = { ...get().review };
        const entry = review[cardId] ?? { box: 0, due: todayISO(), lapses: 0 };
        if (correct) {
          entry.box = Math.min(entry.box + 1, 6);
          entry.lapses = 0;
        } else {
          entry.box = 0;
          entry.lapses = entry.lapses + 1;
        }
        const due = new Date();
        due.setDate(due.getDate() + dueInDays(entry.box));
        entry.due = `${due.getFullYear()}-${`${due.getMonth() + 1}`.padStart(2, '0')}-${`${due.getDate()}`.padStart(2, '0')}`;
        review[cardId] = entry;
        set({ review });
      },

      reset: () =>
        set({ completedLessons: [], review: {}, streak: { last: '', count: 0 }, migrated: true }),
    }),
    {
      name: STORAGE_KEY,
      storage: createJSONStorage(() => AsyncStorage),
      partialize: (s) => ({
        version: s.version,
        completedLessons: s.completedLessons,
        review: s.review,
        streak: s.streak,
        migrated: s.migrated,
      }),
    }
  )
);
