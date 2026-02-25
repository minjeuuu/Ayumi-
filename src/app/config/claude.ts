export const CLAUDE_API_KEY = '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';
export const CLAUDE_API_URL = 'https://api.anthropic.com/v1/messages';
export const CLAUDE_MODEL = 'claude-3-5-sonnet-20241022';

export async function askClaude(prompt: string, context?: string): Promise<string> {
  try {
    const response = await fetch(CLAUDE_API_URL, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'x-api-key': CLAUDE_API_KEY,
        'anthropic-version': '2023-06-01'
      },
      body: JSON.stringify({
        model: CLAUDE_MODEL,
        max_tokens: 4096,
        messages: [
          {
            role: 'user',
            content: context ? `${context}\n\n${prompt}` : prompt
          }
        ]
      })
    });

    if (!response.ok) {
      throw new Error(`Claude API error: ${response.statusText}`);
    }

    const data = await response.json();
    return data.content[0].text;
  } catch (error) {
    console.error('Claude API Error:', error);
    throw error;
  }
}

export async function explainVerse(verseText: string, reference: string, ageLevel: string = 'adult'): Promise<string> {
  const prompt = `Explain this Bible verse at a ${ageLevel} reading level:\n\n${reference}\n"${verseText}"\n\nProvide:\n1. What the text says\n2. What it means\n3. Why it mattered then\n4. Why it matters now`;
  return askClaude(prompt);
}

export async function answerBibleQuestion(question: string): Promise<string> {
  const prompt = `Answer this Bible question clearly and accurately:\n\n${question}`;
  return askClaude(prompt);
}

export async function rephraseForClarity(text: string, targetLevel: string = 'simple'): Promise<string> {
  const prompt = `Rephrase this Bible text for ${targetLevel} understanding:\n\n${text}`;
  return askClaude(prompt);
}
