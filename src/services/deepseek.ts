// DeepSeek AI Tutor client — direct API, no backend.
// CORS verified working from the GitHub Pages origin (preflight 200).
// Key is user-supplied, stored locally, never bundled.

export type TutorRole = 'user' | 'assistant';

export type TutorMessage = {
  role: TutorRole;
  content: string;
};

export type TutorError =
  | { kind: 'no-key' }
  | { kind: 'unauthorized' }
  | { kind: 'rate-limited' }
  | { kind: 'network' }
  | { kind: 'server'; detail?: string };

const SYSTEM_PROMPT = `You are "Greek Path Tutor", a friendly Modern Greek teacher for a true beginner.
Rules:
- Reply in short, simple sentences. Use Greek with a transliteration and an English gloss on first use.
- Correct any mistakes the learner makes: give the corrected Greek, say why briefly, in plain English.
- Keep vocabulary within everyday beginner topics (greetings, café, travel, family, food, directions).
- Never lecture. Keep it conversational, like a patient friend.
- If the learner writes in English, gently encourage them to try Greek, then give them the phrase to use.
- Max 4 sentences per reply.`;

export async function tutorChat(
  apiKey: string,
  model: string,
  history: TutorMessage[]
): Promise<{ text: string; error?: TutorError }> {
  if (!apiKey) {
    return { text: '', error: { kind: 'no-key' } };
  }

  let response: Response;
  try {
    response = await fetch('https://api.deepseek.com/chat/completions', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${apiKey}`,
      },
      body: JSON.stringify({
        model,
        messages: [{ role: 'system', content: SYSTEM_PROMPT }, ...history],
        temperature: 0.7,
        max_tokens: 400,
      }),
    });
  } catch {
    return { text: '', error: { kind: 'network' } };
  }

  if (response.status === 401 || response.status === 403) {
    return { text: '', error: { kind: 'unauthorized' } };
  }
  if (response.status === 429) {
    return { text: '', error: { kind: 'rate-limited' } };
  }
  if (!response.ok) {
    return { text: '', error: { kind: 'server', detail: `HTTP ${response.status}` } };
  }

  try {
    const data = await response.json();
    const text = data?.choices?.[0]?.message?.content ?? '';
    return { text };
  } catch {
    return { text: '', error: { kind: 'server', detail: 'unparseable response' } };
  }
}
