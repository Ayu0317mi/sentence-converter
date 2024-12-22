//actions.ts 
//server-side rendering for the API route
//English sentence converter
import dotenv from 'dotenv';

dotenv.config();

type Style = 'natural' | 'professional' | 'casual' | 'shorter';

export async function convertSentenceClient(sentence: string, style: Style) {
  console.log('Sending request to /api/convert-sentence:', { sentence, style });

  try {
    const response = await fetch('/api/convert-sentence', {
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
