// app/api/convert-japanese/route.ts
//For Japanese converter
import { NextRequest, NextResponse } from "next/server";
import OpenAI from "openai";

const apiKey = process.env.OPENAI_API_KEY;

export async function POST(req: NextRequest) {
  if (!apiKey) {
    return NextResponse.json({ error: "Missing OpenAI API key" }, { status: 500 });
  }

  const { sentence, style } = await req.json();

  if (!sentence || !style) {
    return NextResponse.json({ error: "Invalid input" }, { status: 400 });
  }

  const prompts: Record<string, string> = {
    natural: `自然な日本語に変換してください: ${sentence}`,
    shorter: `この文を簡潔な日本語に変換してください: ${sentence}`,
    casual: `この文をカジュアルな日本語に変換してください: ${sentence}`,
    formal: `この文をフォーマルな日本語に変換してください: ${sentence}`,
  };

  const prompt = prompts[style];
  if (!prompt) {
    return NextResponse.json({ error: "Unsupported style" }, { status: 400 });
  }

  try {
    const openai = new OpenAI({ apiKey });

    const response = await openai.chat.completions.create({
      model: "gpt-4",
      messages: [
        { role: "system", content: "You are an expert in Japanese language processing." },
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
