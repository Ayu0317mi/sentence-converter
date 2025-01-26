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
    natural: `You are an assistant that helps with translating sentences into natural Japanese. Translate the following sentence to natural Japanese and Romanized Japanese: ${sentence}.Output the converted sentence only.`,
    formal: `You are an assistant that helps with translating sentences into formal Japanese. Translate the following sentence to formal Japanese and Romanized Japanese: ${sentence}.Output the converted sentence only.`,
    casual: `You are an assistant that helps with translating sentences into casual Japanese. Translate the following sentence to casual Japanese and Romanized Japanese: ${sentence}.Output the converted sentence only.`,
    shorter: `You are an assistant that helps with translating sentences into shorter Japanese. Translate the following sentence to shorter Japanese and Romanized Japanese: ${sentence}.Output the converted sentence only.`,
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