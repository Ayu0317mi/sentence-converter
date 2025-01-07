// route.ts
import { NextApiRequest, NextApiResponse } from 'next';
import { Groq } from "groq-sdk";

const groq = new Groq({ apiKey: process.env.GROQ_API_KEY });

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  console.log('Received request method:', req.method);
  if (req.method === 'POST') {
    try {
      const { sentence, style } = req.body;
      if (!sentence || !style) {
        return res.status(400).json({ error: 'Sentence and style are required' });
      }
      const chatCompletion = await getGroqChatCompletion(sentence, style);
      if ('choices' in chatCompletion) {
        res.status(200).json({ result: chatCompletion.choices[0]?.message?.content });
      } else {
        res.status(500).json({ error: 'Failed to fetch from API' });
      }
    } catch (error) {
      console.error('Error in API handler:', error);
      res.status(500).json({ error: 'Internal server error' });
    }
  } else {
    console.log('Method not allowed:', req.method);
    res.status(405).json({ error: 'Method not allowed' });
  }
}

async function getGroqChatCompletion(sentence: string, style: string) {
  try {
    return await groq.chat.completions.create({
      messages: [
        {
          role: "system",
          content: "You are an expert in English language processing. Convert the following sentence into " + style + ": " + sentence,
        },
      ],
      model: "llama-3.3-70b-versatile",
    });
  } catch (error) {
    console.error("Error in getGroqChatCompletion:", error);
    return { error: "Internal server error" };
  }
}