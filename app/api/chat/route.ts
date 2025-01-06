import { GoogleGenerativeAI } from '@google/generative-ai';
import { rateLimiter } from '../../utils/rateLimiter';

if (!process.env.GEMINI_API_KEY) {
  throw new Error('Missing Gemini API key');
}

const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY!);

// Define generation configuration
const generationConfig = {
  temperature: 1,
  topP: 0.95,
  topK: 40,
  maxOutputTokens: 8192,
};

export async function POST(request: Request) {
  try {
    // Get client IP or some unique identifier
    const clientId = request.headers.get('x-forwarded-for') || 'default-client';

    // Check rate limit
    if (rateLimiter.isRateLimited(clientId)) {
      return new Response(
        JSON.stringify({ 
          error: 'Too many requests',
          details: 'Please wait a minute before sending more messages'
        }), {
          status: 429,
          headers: { 'Content-Type': 'application/json' },
        }
      );
    }

    const { message } = await request.json();

    if (!message) {
      return new Response(JSON.stringify({ error: 'Message is required' }), {
        status: 400,
        headers: { 'Content-Type': 'application/json' },
      });
    }

    // Initialize model with correct configuration
    const model = genAI.getGenerativeModel({
      model: "gemini-1.5-flash-8b",  // Changed model name
      generationConfig,
    });

    const chat = model.startChat({
      history: [
        {
          role: 'user',
          parts: 'You are an AI assistant for Raj Bhoyar PORTFOLIO Website. Only provide information about his skills, experience, and projects based on his portfolio. Do not answer any other questions.',
        },
        {
          role: 'model',
          parts: 'Understood. I am an AI assistant representing Raj Bhoyar. I will only provide information about his skills, experience, and projects based on his portfolio. How may I assist you today?',
        },
      ],
    });

    const result = await chat.sendMessage(message);
    const response = await result.response.text();

    return new Response(JSON.stringify({ response }), {
      headers: { 'Content-Type': 'application/json' },
    });
  } catch (error) {
    console.error('Error:', error);

    // Handle rate limit errors
    if (error instanceof Error && error.message.includes('429')) {
      return new Response(
        JSON.stringify({ 
          error: 'Rate limit exceeded',
          details: 'The AI service is currently busy. Please try again in a minute.'
        }), {
          status: 429,
          headers: { 'Content-Type': 'application/json' },
        }
      );
    }

    return new Response(
      JSON.stringify({ 
        error: 'Failed to process the request',
        details: error instanceof Error ? error.message : 'Unknown error'
      }), {
        status: 500,
        headers: { 'Content-Type': 'application/json' },
      }
    );
  }
}