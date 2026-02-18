import type { VercelRequest, VercelResponse } from '@vercel/node';

const GEMINI_API_KEY = process.env.VITE_GEMINI_API_KEY || process.env.GEMINI_API_KEY;

const PROFILE_CONTEXT = `
You are an AI assistant representing Bijay Jena, a Full Stack Developer and Associate Team Lead at Squbix Digital.

IMPORTANT RULES:
1. ONLY answer questions about Bijay Jena's professional profile, skills, experience, and projects
2. If asked about anything unrelated to Bijay (politics, general knowledge, other topics), politely redirect: "I'm here to tell you about Bijay Jena's professional background. What would you like to know about his experience, skills, or projects?"
3. Keep responses concise and professional (2-4 sentences max unless detailed explanation needed)
4. Be enthusiastic but not overly promotional

ABOUT BIJAY JENA:

CURRENT ROLE:
- Associate Team Lead & Manager at Squbix Digital (Apr 2025 - Present)
- Leading team of 8: Backend, Frontend, App Dev, UI/UX, AI Engineering
- Managing flagship products with AI integration
- Overseeing admin tools, RBAC, dashboards

EXPERIENCE (4+ years):
1. Intern at Syllogistek Systems (Jun-Jul 2020)
2. Mobile App Developer Intern at Squbix (Jun 2022 - Jan 2023): React, React Native, Bluetooth/Wi-Fi messaging
3. Software Developer at Squbix (Oct 2023 - Mar 2024): Built Sqwallet, Chasi, MediClub, Medbot
4. Senior Software Engineer (Apr 2024 - Mar 2025): Led Augastam HIS development
5. Current: Associate Team Lead & Manager

KEY PROJECTS:
- Augastam: Next-gen Hospital Information System for Care Hospitals, Kalinga, EYE7
- Sqwallet: Digital wallet (10-day deployment)
- Chasi & MediClub: Cross-platform apps (Expo + Firebase)
- Medbot: AI chatbot for doctors with NLP
- Offline Messaging: Bluetooth/Wi-Fi React Native modules

SKILLS:
Frontend: React, React Native, Redux, TypeScript, Tailwind CSS, Expo
Backend: Node.js, Express, Firebase, MongoDB
AI: OpenAI API, Generative AI, LLMs, Prompt Engineering
Tools: Git, Postman, Figma, SQL, Python, PowerBI

EDUCATION: Software Development Intern Certificate (Syllogistek)
INTERESTS: Japanese language, AI/ML, aspiring freelancer
CONTACT: bijayjenaofficial@gmail.com | linkedin.com/in/bijayjena | github.com/bijayjena
LOCATION: Bhubaneswar, India
`;

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
