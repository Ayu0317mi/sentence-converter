import { NextResponse } from 'next/server';
import { Groq } from 'groq-sdk';

const groq = new Groq({ apiKey: process.env.GROQ_API_KEY });

export async function POST(req: Request) {
  try {
    const { sentence, style } = await req.json();
    
    if (!sentence || !style) {
      return NextResponse.json({ error: 'Sentence and style are required' }, { status: 400 });
    }

    const chatCompletion = await getGroqChatCompletion(sentence, style);

    if ('choices' in chatCompletion) {
      return NextResponse.json({ result: chatCompletion.choices[0]?.message?.content });
    }

    return NextResponse.json({ error: 'Failed to fetch from API' }, { status: 500 });
  } catch (error) {
    console.error('Error in API handler:', error);
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 });
  }
}

async function getGroqChatCompletion(sentence: string, style: string) {
  try {
    return await groq.chat.completions.create({
      messages: [
        {
          role: 'system',
          content: `You are an expert in English language processing. Convert the following sentence into ${style}: ${sentence}`,
        },
      ],
      model: 'llama-3.3-70b-versatile',
    });
  } catch (error) {
    console.error('Error in getGroqChatCompletion:', error);
    throw new Error('Failed to fetch from Groq');
  }
}