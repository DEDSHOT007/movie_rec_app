import { NextResponse } from 'next/server';
import OpenAI from 'openai';

// Initialize OpenAI only if key is present
const openai = process.env.OPENAI_API_KEY
    ? new OpenAI({ apiKey: process.env.OPENAI_API_KEY })
    : null;

export async function POST(req: Request) {
    try {
        const { messages } = await req.json();

        if (!openai) {
            // Mock response if no API key
            await new Promise(resolve => setTimeout(resolve, 1000));
            return NextResponse.json({
                role: 'assistant',
                content: "I'm currently running in demo mode (no OpenAI API key found). If I were real, I'd recommend 'The Matrix' based on your request!"
            });
        }

        const completion = await openai.chat.completions.create({
            model: "gpt-4-turbo",
            messages: [
                { role: "system", content: "You are a helpful movie recommendation assistant. Suggest movies based on the user's mood or query. Return the response in JSON format with a 'recommendations' array of movie titles and a 'message' field." },
                ...messages
            ],
            response_format: { type: "json_object" },
        });

        const content = completion.choices[0].message.content;
        return NextResponse.json(JSON.parse(content || "{}"));

    } catch (error) {
        console.error('Chat API Error:', error);
        return NextResponse.json(
            { error: 'Internal Server Error' },
            { status: 500 }
        );
    }
}
