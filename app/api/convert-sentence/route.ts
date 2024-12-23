//app/api/convert-sentence/route.ts
//For English converter
import { NextResponse } from 'next/server';
import OpenAI from 'openai';

const apiKey = process.env.OPENAI_API_KEY; // Use a secure server-side key

export async function POST(request: Request) {
  try {
    const { sentence, style } = await request.json(); // Parse JSON from the request body

    if (!sentence || !style) {
      return NextResponse.json({ error: 'Invalid input' }, { status: 400 });
    }

    const prompts = {
      natural: `Convert the following sentence to natural English: ${sentence}`,
      professional: `Convert the following sentence to more professional English: ${sentence}`,
      casual: `Convert the following sentence to more casual English: ${sentence}`,
      shorter: `Shorten the following sentence while maintaining its meaning: ${sentence}`,
      aussie: `Convert the following sentence to Australian slang English: ${sentence}`,
    };

    const prompt = prompts[style as keyof typeof prompts];
    if (!prompt) {
      return NextResponse.json({ error: 'Unsupported style' }, { status: 400 });
    }

    const openai = new OpenAI({ apiKey });

    const response = await openai.chat.completions.create({
      model: 'gpt-4',
      messages: [
        { role: 'system', content: 'You are an expert in English language processing.' },
        { role: 'user', content: prompt },
      ],
      temperature: 0.7,
      max_tokens: 256,
    });

    const result = response.choices[0]?.message?.content?.trim() ?? 'No output generated';

    return NextResponse.json({ result });
  } catch (error) {
    console.error('Error in API handler:', error);
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 });
  }
}