# Greek Path — React Native Phase 1 Plan

## Goal

Rebuild Greek Path as a single Expo (React Native + TypeScript) codebase that runs
**on web today** (GitHub Pages) and **packages to iOS/Android later** with zero
architecture change. Add Jumpspeak-style features: conversation immersion, AI
Tutor chat (DeepSeek), pronunciation check seam, spaced review.

## Architecture decisions

1. **Expo SDK 53+ / React Native 0.79+ / TypeScript / expo-router** — file-based
   routing renders identically on web and native. This is the "don't rebuild"
   bet: screens, hooks, content all carry over.
2. **react-native-web** (bundled with Expo web) — same components become HTML on
   Pages. No duplicate web app.
3. **State**: zustand + AsyncStorage persistence (localStorage on web). No
   backend, no accounts (Greek Path privacy principle preserved).
4. **Speech**: `expo-speech` for TTS (works on web via browser speech API).
   **Speech recognition**: an abstract `SpeechRecognizer` interface with a web
   impl (Web Speech API, Chrome-only, progressive enhancement) and a no-op
   fallback — native on-device recognizer plugs in later at the same seam.
5. **AI Tutor**: DeepSeek API (direct, no OpenRouter). Key stored in Settings
   (AsyncStorage), never bundled. `fetch` call to DeepSeek chat completions;
   system prompt keeps Greek at learner level; corrections on grammar/vocab.
6. **Content**: lessons + conversations as bundled JSON (ported from course.js).
   Linear path preserved (6 units, 30 lessons). Conversations authored per unit.
7. **Deploy**: `npx expo export -p web` → `dist/` → GitHub Actions workflow
   builds and deploys to Pages. Public URL unchanged.

## Screens (expo-router app/ directory)

- `/` — Course Map (units, lessons, lock state, progress, streak)
- `/lesson/[id]` — Lesson Player (listen → repeat → quick check)
- `/conversation/[id]` — Conversation Player (Listen → Repeat → Respond → Review)
- `/tutor` — AI Tutor chat (type or speak; DeepSeek replies + corrects)
- `/review` — Spaced review queue (SM-2: new/learning/due/mastered)
- `/settings` — API key, voice rate, reset

## Data model

```ts
type Card = { scene: string; greek: string; say: string; meaning: string };
type Lesson = { title: string; cards: Card[] };
type Unit = { title: string; description: string; lessons: Lesson[] };

type ConversationStep = { speaker: 'native' | 'learner'; greek: string; say: string; meaning: string };
type Conversation = { id: string; unit: number; title: string; scene: string; steps: ConversationStep[] };

// progress
type Progress = { completedLessons: number[]; sm2: Record<string, { box: number; due: number; lapses: number }>; streak: { last: string; count: number } };
```

## Milestones

1. Scaffold Expo app, theme (teal/cream from styles.css), router shell
2. Port course content to JSON + author 6 conversations (one per unit)
3. Lesson Player (port of app.js flow) + Course Map with progress
4. Conversation Player: Listen → Repeat (speak/type) → Respond → Review
5. AI Tutor: Settings screen + DeepSeek chat service + chat UI
6. Spaced review queue + streak
7. Web export + GitHub Actions Pages deploy
8. Council verification pass, then commit

## Council review conditions (2026-08-10, PASS with conditions)

### HIGH — Pages subpath export config (bake into milestone 7)
- `baseUrl: "/-greek-path"` in app.json (top-level, SDK 53+) — required for
  `https://gudguliai.github.io/-greek-path/`, otherwise asset URLs break.
- `web.output: "static"` + `generateStaticParams` for `/lesson/[id]` and
  `/conversation/[id]` (ids from bundled JSON) so deep links don't 404.
- Switch repo Pages settings from "Deploy from a branch" to "GitHub Actions",
  and add a **smoke test at the final subpath URL** to the deploy workflow —
  exit-0 alone doesn't prove the deployed site renders.

### MEDIUM — decisions locked
- **Progress migration**: on first launch, read old `greek-path-course-progress`
  key (array of lesson indices) and convert into new `Progress` shape. One-time.
- **Review queue data source**: add `id` to `Card` (`unit-lesson-card` key),
  capture correct/incorrect at the quick check, feed those into the queue.
- **Conversation Respond validation**: accent-insensitive normalization (fold
  Greek accents/tonos before compare) + accepted-answer variants; exact-match
  fallback with "try again" hint. PLAN.md's normalization requirement honored.
- **PLAN.md carryover**: keep import/export of progress, service-worker offline
  cache, cross-browser/device/keyboard/screen-reader test matrix, and
  native-speaker QA of learner-facing Greek (incl. new conversation scripts) —
  all in milestones, or explicitly descoped. Not silently dropped.

### SUGGESTIONS — adopted
- Model is **Leitner boxes** (not SM-2): box 0-5, intervals 0/1/2/4/7/15/30d.
- Schema version field on `Progress`; guard rehydration (`try/catch` JSON.parse,
  corrupt storage → start fresh). Fixes the latent crash bug in old app.js.
- **AI Tutor failure UX**: no-key → route to Settings with prompt; 401/429/network
  → inline error states. Render tutor output as plain text only (RN `<Text>`,
  safe — no raw-HTML markdown, avoids XSS vector near the stored key).
- **Mic fallback UI**: on unsupported browsers hide/disable mic button with
  "type instead" hint — never a silent no-op.
- Pin export config in app.json now (not a milestone-7 discovery exercise);
  toolchain precondition: Node ≥20 (v26 installed locally).

## Risks / mitigations

- **Web Speech Recognition is Chrome-only + weak Greek ASR** → typed answers are
  first-class; mic is progressive enhancement behind `SpeechRecognizer` seam.
- **expo-speech voice quality on web** → device voice acceptable for Phase 1;
  native recordings are the later production upgrade (matches existing PLAN.md).
- **DeepSeek key on device** → stored locally, user-provided; no bundling; warn
  in Settings that key stays on device. CORS verified working from Pages origin.
- **AsyncStorage on web** → backed by localStorage, fine for this scale.

## Definition of done (Phase 1)

`npx expo export -p web` exits 0; site serves at existing Pages URL; all 30
lessons playable; conversations work with typed responses; AI Tutor answers via
DeepSeek; progress survives reload; RN entry (`npx expo start`) runs for later
native packaging.
