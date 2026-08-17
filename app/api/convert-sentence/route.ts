//app/api/convert-sentence/route.ts
//For English converter
import { NextResponse } from 'next/server';
import { Groq } from 'groq-sdk';

const groq = new Groq({ apiKey: process.env.GROQ_API_KEY });

const prompts = {
  natural: (sentence: string) => `Convert the following sentence to natural English: ${sentence}. Do not include any thinking process or explanations. Output only the converted sentence.`,
  professional: (sentence: string) => `Convert the following sentence to more professional English: ${sentence}. Do not include any thinking process or explanations. Output only the converted sentence.`,
  casual: (sentence: string) => `Convert the following sentence to more casual English: ${sentence}. Do not include any thinking process or explanations. Output only the converted sentence.`,
  shorter: (sentence: string) => `Shorten the following sentence while maintaining its meaning: ${sentence}. Do not include any thinking process or explanations. Output only the shortened sentence.`,
  aussie: (sentence: string) => `Convert the following sentence to Australian slang English: ${sentence}. Do not include any thinking process or explanations. Output only the converted sentence.`,
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
      const rawContent = result.choices[0]?.message?.content?.trim() || '';
      // Remove thinking tags and extract only the final response
      const convertedSentence = rawContent.replace(/<think>[\s\S]*?<\/think>/g, '').trim();
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
      model: 'qwen/qwen3.6-27b',
      temperature: 0.7,
      max_tokens: 512,
    });
  } catch (error) {
    console.error('Error in getGroqChatCompletion:', error);
    throw new Error('Failed to fetch from Groq');
  }
}