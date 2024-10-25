import { NextResponse } from 'next/server';

export async function POST(request: Request) {
    try {
        const { userPrompt } = await request.json();
        console.log("/api/generateSticker/route.ts userPrompt: ", userPrompt);

        // Make the API call to the external service
        const response = await fetch('https://api.openai.com/v1/images/generations', {
            method: 'POST',
            headers: {
                "Content-Type": "application/json",
                "Authorization": `Bearer ${process.env.NEXT_PUBLIC_OPENAI_API_KEY}`
            },
            body: JSON.stringify({
                model: 'dall-e-3', // Ensure this is the correct model name
                prompt: userPrompt,
                n: 1, // Number of images to generate
                size: '1024x1024', // Image size
            }),
        });

        console.log("response: ", response);

        if (!response.ok) {
            // If the API response isn't successful, return an error response
            return NextResponse.json({ error: "Failed to fetch completion data" }, { status: response.status });
        }

        const data = await response.json();
        console.log("data: ", data);

        const assistantResponse = data.data[0]?.url || "No response available";

        console.log("assistantResponse: ", assistantResponse);

        // Return the assistant's message content
        return NextResponse.json({ message: assistantResponse });
    } catch (error) {
        console.error("Error fetching the data:", error);
        return NextResponse.json({ error: "An error occurred while processing your request." }, { status: 500 });
    }
}