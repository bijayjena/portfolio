import type { VercelRequest, VercelResponse } from '@vercel/node';
import { chatbotProfileContext } from '../src/data/profileData';
import { getPresetAnswer } from '../src/utils/chatbot';

const GEMINI_API_KEY = process.env.VITE_GEMINI_API_KEY;

const PROFILE_CONTEXT = chatbotProfileContext;

export default async function handler(req: VercelRequest, res: VercelResponse) {
  // CORS headers
  res.setHeader('Access-Control-Allow-Credentials', 'true');
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'GET,OPTIONS,PATCH,DELETE,POST,PUT');
  res.setHeader('Access-Control-Allow-Headers', 'X-CSRF-Token, X-Requested-With, Accept, Accept-Version, Content-Length, Content-MD5, Content-Type, Date, X-Api-Version');

  if (req.method === 'OPTIONS') {
    res.status(200).end();
    return;
  }

  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method not allowed' });
  }

  try {
    const { message, history } = req.body;

    if (!message) {
      return res.status(400).json({ error: 'Message is required' });
    }

    const presetAnswer = getPresetAnswer(message);

    if (presetAnswer) {
      return res.status(200).json({ response: presetAnswer });
    }

    if (!GEMINI_API_KEY) {
      console.error('Gemini API key not configured');
      return res.status(500).json({ error: 'API key not configured' });
    }

    // Build conversation history for Gemini
    const contents = [
      {
        role: 'user',
        parts: [{ text: PROFILE_CONTEXT }]
      },
      {
        role: 'model',
        parts: [{ text: 'Understood. I will only answer questions about Bijay Jena\'s professional profile and redirect any off-topic questions.' }]
      }
    ];

    // Add conversation history
    if (history && Array.isArray(history)) {
      history.forEach((msg: any) => {
        if (msg.role === 'user') {
          contents.push({
            role: 'user',
            parts: [{ text: msg.content }]
          });
        } else if (msg.role === 'assistant') {
          contents.push({
            role: 'model',
            parts: [{ text: msg.content }]
          });
        }
      });
    }

    // Add current message
    contents.push({
      role: 'user',
      parts: [{ text: message }]
    });

    // Call Gemini API
    const response = await fetch(
      `https://generativelanguage.googleapis.com/v1beta/models/gemini-pro:generateContent?key=${GEMINI_API_KEY}`,
      {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          contents,
          generationConfig: {
            temperature: 0.7,
            topK: 40,
            topP: 0.95,
            maxOutputTokens: 1024,
          },
          safetySettings: [
            {
              category: 'HARM_CATEGORY_HARASSMENT',
              threshold: 'BLOCK_MEDIUM_AND_ABOVE'
            },
            {
              category: 'HARM_CATEGORY_HATE_SPEECH',
              threshold: 'BLOCK_MEDIUM_AND_ABOVE'
            },
            {
              category: 'HARM_CATEGORY_SEXUALLY_EXPLICIT',
              threshold: 'BLOCK_MEDIUM_AND_ABOVE'
            },
            {
              category: 'HARM_CATEGORY_DANGEROUS_CONTENT',
              threshold: 'BLOCK_MEDIUM_AND_ABOVE'
            }
          ]
        }),
      }
    );

    if (!response.ok) {
      const errorData = await response.text();
      console.error('Gemini API error:', errorData);
      throw new Error(`Gemini API error: ${response.status}`);
    }

    const data = await response.json();
    
    if (!data.candidates || !data.candidates[0] || !data.candidates[0].content) {
      throw new Error('Invalid response from Gemini API');
    }

    const aiResponse = data.candidates[0].content.parts[0].text;

    return res.status(200).json({ response: aiResponse });
  } catch (error) {
    console.error('Chat API error:', error);
    return res.status(500).json({ 
      error: 'Failed to process chat request',
      details: error instanceof Error ? error.message : 'Unknown error'
    });
  }
}
