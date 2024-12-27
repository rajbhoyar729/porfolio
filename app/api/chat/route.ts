import { GoogleGenerativeAI } from '@google/generative-ai'

const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY!)

export async function POST(request: Request) {
  const { message } = await request.json()

  try {
    const model = genAI.getGenerativeModel({ model: 'gemini-pro' })

    const chat = model.startChat({
      history: [
        {
          role: 'user',
          parts: [{ text: 'You are an AI assistant for Raj Bhoyar. Only provide information about his skills, experience, and projects based on his portfolio. Do not answer any other questions.' }],
        },
        {
          role: 'model',
          parts: [{ text: 'Understood. I am an AI assistant representing Raj Bhoyar. I will only provide information about his skills, experience, and projects based on his portfolio. How may I assist you today?' }],
        },
      ],
      generationConfig: {
        maxOutputTokens: 100,
      },
    })

    const result = await chat.sendMessage(message)
    const response = result.response.text()

    return new Response(JSON.stringify({ response }), {
      headers: { 'Content-Type': 'application/json' },
    })
  } catch (error) {
    console.error('Error:', error)
    return new Response(JSON.stringify({ error: 'Failed to process the request' }), {
      status: 500,
      headers: { 'Content-Type': 'application/json' },
    })
  }
}

