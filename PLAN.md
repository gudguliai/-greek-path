# Greek Path build plan

## Goal

Create a fast, friendly Modern Greek course for a true beginner that works entirely on GitHub Pages. The learning experience should teach sounds and context before recall quizzes or grammar labels.

## Product principles

- Static-first: HTML, CSS, JavaScript, and content files only.
- Sound and context first: introduce the alphabet with audio before presenting Greek-only prompts.
- Picture-led lessons: introduce meaning through original scenes, then use translation sparingly as support.
- Private by default: browser-only progress, no account required.
- Accessible and mobile-first: large touch targets, keyboard support, readable Greek text.

## Milestones

### 1. Learning loop — complete starter

- Welcome lesson that starts with the Greek alphabet, plain-English sound cues, and device speech synthesis.
- A progressive course path; no quiz is shown before the learner has heard the relevant sounds.

### 2. Content foundation

- Move lessons into `content/lessons.json` with fields for Greek, transliteration, English, topic, and audio URL.
- Complete the Greek alphabet and pronunciation mini-course, including letter combinations and accent marks.
- Build 20 everyday lessons across greetings, café, directions, shopping, family, and common verbs.
- Review all learner-facing Greek with a native speaker or qualified teacher.

### 3. Better practice

- Add flashcards, Greek-to-English and English-to-Greek prompts, and typed answers with normalization for accents.
- Add spaced review using a small browser-stored queue (new, learning, due, mastered).
- Replace device speech synthesis with native-speaker recordings for every teachable word and phrase. Keep the device voice only as a fallback.

### 4. Polish and launch

- Add an offline cache via a simple service worker.
- Add an import/export button for learner progress.
- Test on Safari/iPhone, Chrome/Android, desktop keyboard navigation, and a screen reader pass.
- Add a GitHub Pages deployment workflow only if automatic deployment beyond branch publishing is wanted.

## Suggested content model

```json
{
  "id": "greetings-01",
  "topic": "Greetings",
  "prompt": "How do you say hello?",
  "answer": "Γεια σου",
  "transliteration": "ya sou",
  "translation": "hello",
  "acceptedAnswers": ["γεια σου", "γεια"],
  "audio": "audio/geia-sou.mp3"
}
```

## Definition of a good first release

Twenty short lessons, alphabet basics, four exercise types, simple spaced review, and progress that survives normal browser restarts — all under a lightweight static site with no sign-in.

## Known issues

- Alphabet cards currently pass both the uppercase and lowercase glyphs (for example, `Α α`) to device speech synthesis, so the voice repeats the letter name. Keep both forms in the display, but send one Greek letter name (for example, `άλφα`) to the audio function.
