# AI Chatbot Setup Guide

## Overview

Your portfolio now includes an AI-powered chatbot that uses **Google Gemini API** to answer questions about your professional profile, experience, skills, and projects.

## Features

✨ **Smart Context Awareness**: The chatbot is fed with your complete profile information and will only discuss topics related to you.

🛡️ **Topic Enforcement**: Automatically redirects off-topic questions back to your professional profile.

💬 **Suggested Questions**: Provides visitors with helpful conversation starters.

🎨 **Beautiful UI**: Floating chat button with smooth animations and gradient styling.

📱 **Responsive Design**: Works perfectly on mobile and desktop.

## Setup Instructions

### 1. Get Your Gemini API Key

1. Visit [Google AI Studio](https://makersuite.google.com/app/apikey)
2. Sign in with your Google account
3. Click "Create API Key"
4. Copy your API key

### 2. Configure Environment Variables

Open `.env.local` and add your API key:

```env
VITE_GEMINI_API_KEY=your_actual_api_key_here
GEMINI_API_KEY=your_actual_api_key_here
```

### 3. Install Dependencies

```bash
npm install
```

This will install the required `@vercel/node` package for the API route.

### 4. Run Locally

```bash
npm start
```

The chatbot will appear as a floating button in the bottom-right corner.

### 5. Deploy to Vercel

1. Push your code to GitHub
2. Import your repository in Vercel
3. Add environment variable in Vercel dashboard:
   - Go to Project Settings → Environment Variables
   - Add `GEMINI_API_KEY` with your API key
   - Add it for Production, Preview, and Development

## How It Works

### Architecture

```
User Input → AIChatbot Component → /api/chat → Gemini API → Response
```

### Components

1. **AIChatbot.tsx**: Frontend chat interface
   - Floating button
   - Chat window with message history
   - Suggested questions
   - Loading states

2. **api/chat.ts**: Backend API handler
   - Receives user messages
   - Maintains conversation context
   - Calls Gemini API with profile context
   - Returns AI responses

3. **chatbot.ts**: Profile context and configuration
   - Contains your complete professional profile
   - Defines conversation rules
   - Ensures topic enforcement

### Profile Context

The chatbot is pre-loaded with:
- Your current role and responsibilities
- Complete work experience timeline
- All projects with details
- Technical skills across all categories
- Education and certifications
- Contact information
- Personal interests

### Topic Enforcement

The AI is instructed to:
- ONLY answer questions about your professional profile
- Politely redirect off-topic questions
- Keep responses concise and professional
- Be enthusiastic but not overly promotional

## Customization

### Update Profile Information

Edit `api/chat.ts` and modify the `PROFILE_CONTEXT` constant with your latest information.

### Change Suggested Questions

Edit `src/components/AIChatbot.tsx` and modify the `SUGGESTED_QUESTIONS` array:

```typescript
const SUGGESTED_QUESTIONS = [
  "What is Bijay's experience?",
  "Tell me about his projects",
  // Add your custom questions here
];
```

### Styling

The chatbot uses Tailwind CSS and can be customized in `AIChatbot.tsx`:
- Colors: Modify gradient classes (`from-violet-500 to-purple-500`)
- Size: Adjust `w-96 h-[600px]` for chat window dimensions
- Position: Change `bottom-6 right-6` for button placement

### AI Behavior

Modify the Gemini API parameters in `api/chat.ts`:

```typescript
generationConfig: {
  temperature: 0.7,    // Creativity (0-1)
  topK: 40,           // Diversity
  topP: 0.95,         // Nucleus sampling
  maxOutputTokens: 1024, // Response length
}
```

## Testing

### Test Locally

1. Start the dev server: `npm start`
2. Click the chatbot button
3. Try these test questions:
   - "What is your experience?"
   - "Tell me about Augastam"
   - "What technologies do you use?"
   - "What's the weather?" (should redirect)

### Expected Behavior

✅ **On-topic questions**: Detailed, accurate responses about your profile
❌ **Off-topic questions**: Polite redirection to professional topics

## Troubleshooting

### Chatbot not appearing
- Check that `AIChatbot` is imported in `MainLayout.tsx`
- Verify no CSS conflicts hiding the button

### API errors
- Verify API key is set in `.env.local`
- Check browser console for error messages
- Ensure API key has proper permissions

### Slow responses
- Gemini API typically responds in 1-3 seconds
- Check your internet connection
- Verify API quota hasn't been exceeded

### Incorrect information
- Update `PROFILE_CONTEXT` in `api/chat.ts`
- Redeploy to apply changes

## API Costs

Google Gemini API offers:
- **Free tier**: 60 requests per minute
- **Generous quota**: Suitable for portfolio traffic
- **No credit card required** for basic usage

Monitor usage at [Google AI Studio](https://makersuite.google.com/)

## Security

✅ **API Key Protection**: 
- Never commit `.env.local` to Git
- Use environment variables in production
- API key only accessible server-side

✅ **Content Safety**:
- Gemini API includes built-in safety filters
- Blocks harmful content automatically

✅ **CORS Protection**:
- API route only accepts POST requests
- Proper CORS headers configured

## Future Enhancements

Consider adding:
- 📊 Analytics to track popular questions
- 🌐 Multi-language support
- 💾 Conversation persistence
- 📧 Email integration for follow-ups
- 🎯 Lead capture for interested visitors

## Support

If you encounter issues:
1. Check the browser console for errors
2. Verify environment variables are set
3. Test API key at [Google AI Studio](https://makersuite.google.com/)
4. Review Vercel deployment logs

---

**Built with ❤️ using Google Gemini AI**
