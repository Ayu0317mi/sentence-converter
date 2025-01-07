import { NextResponse } from 'next/server';
import { Groq } from 'groq-sdk';

const groq = new Groq({ apiKey: process.env.GROQ_API_KEY });

const prompts = {
  natural: (sentence: string) => `Convert the following sentence to natural English: ${sentence}. Output the converted sentence only.`,
  professional: (sentence: string) => `Convert the following sentence to more professional English: ${sentence}. Output the converted sentence only.`,
  casual: (sentence: string) => `Convert the following sentence to more casual English: ${sentence}. Output the converted sentence only.`,
  shorter: (sentence: string) => `Shorten the following sentence while maintaining its meaning: ${sentence}. Output the shortened sentence only.`,
  aussie: (sentence: string) => `Convert the following sentence to Australian slang English: ${sentence}. Output the converted sentence only.`,
};

export async function POST(req: Request) {
  try {
    const { sentence, style }: { sentence: string; style: keyof typeof prompts } = await req.json();
    
    if (!sentence || !style || !(style in prompts)) {
      return NextResponse.json({ error: 'Invalid sentence or style' }, { status: 400 });
    }

    const prompt = prompts[style](sentence);
    const result = await getGroqChatCompletion(prompt);

    if ('choices' in result) {
      const convertedSentence = result.choices[0]?.message?.content?.trim();
      return NextResponse.json({ result: convertedSentence });
    }

    return NextResponse.json({ error: 'Failed to fetch from API' }, { status: 500 });
  } catch (error) {
    console.error('Error in API handler:', error);
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 });
  }
}

async function getGroqChatCompletion(prompt: string) {
  try {
    return await groq.chat.completions.create({
      messages: [
        {
          role: 'user',
          content: prompt,
        },
      ],
      model: 'llama-3.3-70b-versatile',
    });
  } catch (error) {
    console.error('Error in getGroqChatCompletion:', error);
    throw new Error('Failed to fetch from Groq');
  }
}