import OpenAI from "openai";

const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY,
});

export async function POST(req: Request) {
  const { prompt } = await req.json();

  const response = await openai.images.generate({
    prompt: prompt,
    n: 1,
    size: "512x512",
  });

  return new Response(JSON.stringify({ data: response.data }));
}
