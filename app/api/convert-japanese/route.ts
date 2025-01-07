// app/api/convert-japanese/route.ts
//For Japanese converter
import { NextRequest, NextResponse } from "next/server";
import { Groq } from "groq-sdk";

const apiKey = process.env.GROQ_API_KEY;

export async function POST(req: NextRequest) {
  if (!apiKey) {
    return NextResponse.json({ error: "Missing GROQ API key" }, { status: 500 });
  }

  const { sentence, style } = await req.json();

  if (!sentence || !style) {
    return NextResponse.json({ error: "Invalid input" }, { status: 400 });
  }

  const prompts: Record<string, string> = {
    natural: `Case 1: If the sentence is in Japanese, convert it to natural Japanese and provide the output in both Japanese characters and Romanized (Latin) alphabet: ${sentence}. Format the output as follows: Japanese sentence (Romanized version). Case 2: If the sentence is in English, convert it to natural Japanese and provide the output in both Japanese characters and Romanized (Latin) alphabet: ${sentence}. Format the output as follows: Japanese sentence (Romanized version). Output the converted sentence only.`,
    formal: `Case 1: If the sentence is in Japanese, convert it to formal Japanese and provide the output in both Japanese characters and Romanized (Latin) alphabet: ${sentence}. Format the output as follows: Japanese sentence (Romanized version). Case 2: If the sentence is in English, convert it to formal Japanese and provide the output in both Japanese characters and Romanized (Latin) alphabet: ${sentence}. Format the output as follows: Japanese sentence (Romanized version). Output the converted sentence only.`,
    casual: `Case 1: If the sentence is in Japanese, convert it to casual Japanese and provide the output in both Japanese characters and Romanized (Latin) alphabet: ${sentence}. Format the output as follows: Japanese sentence (Romanized version). Case 2: If the sentence is in English, convert it to casual Japanese and provide the output in both Japanese characters and Romanized (Latin) alphabet: ${sentence}. Format the output as follows: Japanese sentence (Romanized version). Output the converted sentence only.`,
    shorter: `Case 1: If the sentence is in Japanese, shorten it to natural Japanese and provide the output in both Japanese characters and Romanized (Latin) alphabet: ${sentence}. Format the output as follows: Japanese sentence (Romanized version). Case 2: If the sentence is in English, shorten it to natural Japanese and provide the output in both Japanese characters and Romanized (Latin) alphabet: ${sentence}. Format the output as follows: Japanese sentence (Romanized version). Output the shortened sentence only.`,
    kansai: `Case 1: If the sentence is in Japanese, convert it to Kansai dialect Japanese and provide the output in both Japanese characters and Romanized (Latin) alphabet: ${sentence}. Format the output as follows: Japanese sentence (Romanized version). Case 2: If the sentence is in English, convert it to Kansai dialect Japanese and provide the output in both Japanese characters and Romanized (Latin) alphabet: ${sentence}. Format the output as follows: Japanese sentence (Romanized version). Output the converted sentence only.`,
  };

  const prompt = prompts[style];
  if (!prompt) {
    return NextResponse.json({ error: "Unsupported style" }, { status: 400 });
  }

  try {
    const groq = new Groq({ apiKey });

    const response = await groq.chat.completions.create({
      model: "llama-3.3-70b-versatile",
      messages: [
        { role: "user", content: prompt },
      ],
      temperature: 0.7,
      max_tokens: 256,
    });

    const result = response.choices[0]?.message?.content?.trim() ?? "No output generated";
    return NextResponse.json({ result }, { status: 200 });
  } catch (error) {
    console.error("Error in Japanese sentence conversion:", error);
    return NextResponse.json({ error: "Internal server error" }, { status: 500 });
  }
}