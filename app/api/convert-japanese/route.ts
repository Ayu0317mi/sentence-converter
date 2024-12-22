// app/api/convert-japanese/route.ts
//For Japanese converter
import { NextResponse } from "next/server";
import OpenAI from "openai";

const apiKey = process.env.OPENAI_API_KEY;

export async function POST(request: Request) {
  const { sentence, style } = await request.json();

  if (!sentence || !style) {
    return NextResponse.json({ error: "Invalid input" }, { status: 400 });
  }

  const prompts = {
    polite: `Make the following sentence polite in Japanese: ${sentence}`,
    casual: `Make the following sentence casual in Japanese: ${sentence}`,
    formal: `Make the following sentence formal in Japanese: ${sentence}`,
  };

  const prompt = prompts[style as keyof typeof prompts];
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
    return NextResponse.json({ result });
  } catch (error) {
    console.error("Error in API handler:", error);
    return NextResponse.json({ error: "Internal server error" }, { status: 500 });
  }
}
