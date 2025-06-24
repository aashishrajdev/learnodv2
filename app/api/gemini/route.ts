import { NextRequest, NextResponse } from "next/server";

export async function POST(request: NextRequest) {
  try {
    const body = await request.text();

    if (!body) {
      return NextResponse.json(
        { error: "Request body is empty" },
        { status: 400 },
      );
    }

    let parsedBody;
    try {
      parsedBody = JSON.parse(body);
    } catch (parseError) {
      console.error("JSON parsing error:", parseError);
      return NextResponse.json(
        { error: "Invalid JSON in request body" },
        { status: 400 },
      );
    }

    const { message, currentCode, currentLanguage, videoUrl } = parsedBody;

    if (!message || !message.trim()) {
      return NextResponse.json(
        { error: "Message is required" },
        { status: 400 },
      );
    }
    const GEMINI_API_KEY = process.env.NEXT_PUBLIC_GEMINI_API_KEY;

    console.log("API Key exists:", !!GEMINI_API_KEY);
    console.log("API Key length:", GEMINI_API_KEY?.length);

    if (!GEMINI_API_KEY) {
      console.error("GEMINI_API_KEY is not configured");
      return NextResponse.json(
        { error: "AI service is not properly configured" },
        { status: 500 },
      );
    }

    // Prepare context for Gemini
    let contextPrompt = `You are an AI programming mentor helping a student. The student is asking: "${message}"\n\n`;

    if (currentCode && currentCode.trim()) {
      contextPrompt += `CURRENT CODE (${currentLanguage.toUpperCase()}):\n\`\`\`${currentLanguage}\n${currentCode}\n\`\`\`\n\n`;
    }

    if (videoUrl) {
      contextPrompt += `CONTEXT: The student is watching a programming tutorial video: ${videoUrl}\n\n`;
    }

    contextPrompt += `Please provide a helpful, educational response that:\n`;
    contextPrompt += `- Answers their specific question\n`;
    contextPrompt += `- References their code if relevant\n`;
    contextPrompt += `- Explains concepts clearly\n`;
    contextPrompt += `- Provides practical examples if needed\n`;
    contextPrompt += `- Encourages learning and understanding\n\n`;
    contextPrompt += `Keep your response concise but thorough, and use a friendly, encouraging tone.`; // Call Google Gemini API
    const geminiResponse = await fetch(
      `https://generativelanguage.googleapis.com/v1beta/models/gemini-1.5-flash:generateContent?key=${GEMINI_API_KEY}`,
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          contents: [
            {
              parts: [
                {
                  text: contextPrompt,
                },
              ],
            },
          ],
          generationConfig: {
            temperature: 0.7,
            topK: 40,
            topP: 0.95,
            maxOutputTokens: 1024,
          },
        }),
      },
    );
    if (!geminiResponse.ok) {
      const errorData = await geminiResponse.text();
      console.error("Gemini API error status:", geminiResponse.status);
      console.error("Gemini API error:", errorData);

      // Fallback response
      let fallbackResponse = `I'd be happy to help with your question: "${message}"\n\n`;

      if (currentCode) {
        fallbackResponse += `Looking at your ${currentLanguage} code, I can see you're working on something interesting. `;
      }

      fallbackResponse += `Unfortunately, I'm having trouble connecting to my AI service right now. Please try asking your question again in a moment, or feel free to rephrase it.\n\n`;
      fallbackResponse += `In the meantime, here are some general tips:\n`;
      fallbackResponse += `• Break down complex problems into smaller parts\n`;
      fallbackResponse += `• Check for syntax errors first\n`;
      fallbackResponse += `• Use console.log() to debug your code\n`;
      fallbackResponse += `• Look for patterns in working examples`;

      return NextResponse.json({
        response: fallbackResponse,
        timestamp: new Date().toISOString(),
      });
    }

    const geminiData = await geminiResponse.json();

    if (
      !geminiData.candidates ||
      !geminiData.candidates[0] ||
      !geminiData.candidates[0].content
    ) {
      throw new Error("Invalid response from Gemini API");
    }

    const aiResponse = geminiData.candidates[0].content.parts[0].text;

    return NextResponse.json({
      response: aiResponse,
      timestamp: new Date().toISOString(),
    });
  } catch (error) {
    console.error("Gemini API error:", error);

    // Provide a helpful fallback response instead of a generic error
    return NextResponse.json({
      response:
        "I'm having trouble processing your request right now. Please try again in a moment, or rephrase your question. I'm here to help with your coding journey!",
      timestamp: new Date().toISOString(),
    });
  }
}
