import OpenAI from "openai";
import { NextResponse } from "next/server";

const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY,
});

export async function POST(req: Request, response: any) {
  try {
    const { content } = await req.json();

    const response = await openai.completions.create({
      model: "gpt-3.5-turbo-instruct",
      prompt: `Ignore o texto que contém índice e capítulos. Escreva um parágrafo de 5 linhas fazendo uma reviravolta no texto de: ${content}`,
      temperature: 0.8,
      max_tokens: 256,
      top_p: 1,
      frequency_penalty: 0,
      presence_penalty: 0,
    });

    return new Response(JSON.stringify({ data: response }));
  } catch (error) {
    console.error("request error", error);
    NextResponse.json({ error: "error completing prompt" }, { status: 500 });
  }
}
