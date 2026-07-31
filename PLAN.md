# Greek Path build plan

## Goal

Create a fast, friendly Modern Greek practice app for a single learner that works entirely on GitHub Pages. The learning experience should favor short, repeatable sessions over a large course catalog.

## Product principles

- Static-first: HTML, CSS, JavaScript, and content files only.
- Useful language first: phrases for greetings, food, travel, and everyday conversation.
- Short feedback loops: 3–8 prompts per lesson and a clear next step.
- Private by default: browser-only progress, no account required.
- Accessible and mobile-first: large touch targets, keyboard support, readable Greek text.

## Milestones

### 1. Learning loop — complete starter

- Lesson picker, three starter lessons, multiple-choice practice, feedback, and local progress.
- Responsive single-page interface with no dependencies.

### 2. Content foundation

- Move lessons into `content/lessons.json` with fields for Greek, transliteration, English, topic, and audio URL.
- Add the Greek alphabet and pronunciation mini-course.
- Build 20 everyday lessons across greetings, café, directions, shopping, family, and common verbs.
- Review all learner-facing Greek with a native speaker or qualified teacher.

### 3. Better practice

- Add flashcards, Greek-to-English and English-to-Greek prompts, and typed answers with normalization for accents.
- Add spaced review using a small browser-stored queue (new, learning, due, mastered).
- Add optional text-to-speech only where browser voices pronounce Greek reliably; use recorded audio otherwise.

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
