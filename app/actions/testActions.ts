//actions/testActions.ts
import dotenv from 'dotenv';

dotenv.config();

type Style = 'natural' | 'professional' | 'casual' | 'shorter' | 'aussie';

export async function testSentenceClient(sentence: string, style: Style) {
  console.log('Sending request to /api/convert-test:', { sentence, style });

  try {
    const response = await fetch('/api/convert-test', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ sentence, style }),
    });

    if (!response.ok) {
      console.error('API response not OK:', response.status, response.statusText);
      throw new Error(`API error: ${response.statusText}`);
    }

    const data = await response.json();
    return { success: true, result: data.result };
  } catch (error) {
    console.error('Error in convertSentenceClient:', error);
    return { success: false, error: 'Failed to fetch from API' };
  }
}
