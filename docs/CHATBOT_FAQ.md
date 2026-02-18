# AI Chatbot - Frequently Asked Questions

## Setup & Configuration

### Q: Where do I get the Gemini API key?
**A:** Visit https://makersuite.google.com/app/apikey, sign in with your Google account, and click "Create API Key". The key will start with `AIza...`

### Q: Is the Gemini API free?
**A:** Yes! Google offers a generous free tier with 60 requests per minute, which is more than enough for portfolio traffic. No credit card required.

### Q: Where do I add the API key?
**A:** Add it to the `.env.local` file in your project root:
```env
VITE_GEMINI_API_KEY=your_key_here
GEMINI_API_KEY=your_key_here
```

### Q: Why do I need two environment variables?
**A:** `VITE_GEMINI_API_KEY` is for Vite's client-side (not used), and `GEMINI_API_KEY` is for the server-side API route (actually used). This ensures the key is never exposed to the client.

### Q: Do I need to restart the server after adding the API key?
**A:** Yes, always restart your development server (`npm start`) after modifying `.env.local` files.

## Deployment

### Q: How do I deploy to Vercel?
**A:** 
1. Push your code to GitHub
2. Import the project in Vercel
3. Add `GEMINI_API_KEY` as an environment variable in Vercel dashboard
4. Deploy!

### Q: Can I deploy to other platforms?
**A:** Yes, but you'll need to ensure:
- The platform supports serverless functions or Node.js API routes
- You can set environment variables
- The `/api` directory is properly configured

### Q: What if I'm using Firebase Hosting?
**A:** You'll need to adapt the API route to use Firebase Functions instead of Vercel serverless functions. See the Firebase documentation for details.

## Functionality

### Q: What questions can the chatbot answer?
**A:** The chatbot can answer questions about:
- Your work experience and career journey
- Your projects (Augastam, Sqwallet, Medbot, etc.)
- Your technical skills and expertise
- Your current role and responsibilities
- Your education and certifications
- Your contact information

### Q: What happens if someone asks off-topic questions?
**A:** The chatbot will politely redirect them back to your professional profile. For example:
```
User: "What's the weather?"
Bot: "I'm here to tell you about Bijay Jena's professional background. 
     What would you like to know about his experience, skills, or projects?"
```

### Q: Can I customize the chatbot's responses?
**A:** Yes! Edit the `PROFILE_CONTEXT` in `api/chat.ts` to update the information the chatbot uses. You can also adjust the `temperature` and other parameters to change response style.

### Q: How do I add new projects or experience?
**A:** Update the `PROFILE_CONTEXT` section in `api/chat.ts` with your new information, then redeploy.

## UI & Design

### Q: Why are the chatbot and resume buttons overlapping?
**A:** This has been fixed! The chatbot button is now positioned to the left of the resume button with proper spacing.

### Q: Can I change the chatbot button color?
**A:** Yes! Edit `src/components/AIChatbot.tsx` and change the gradient classes:
```typescript
// Current: Purple
from-violet-500 to-purple-500

// Change to blue
from-blue-500 to-cyan-500
```

### Q: Can I move the chatbot button to a different position?
**A:** Yes! Modify the positioning classes in `AIChatbot.tsx`:
```typescript
className="fixed bottom-6 right-[5.5rem]"
// Adjust bottom and right values as needed
```

### Q: How do I change the suggested questions?
**A:** Edit the `SUGGESTED_QUESTIONS` array in `src/components/AIChatbot.tsx`:
```typescript
const SUGGESTED_QUESTIONS = [
  "Your custom question 1",
  "Your custom question 2",
];
```

### Q: Can I disable the pulse animation on the button?
**A:** Yes, remove this line from `AIChatbot.tsx`:
```typescript
<span className="absolute -top-1 -right-1 h-4 w-4 bg-green-500 rounded-full animate-pulse" />
```

## Troubleshooting

### Q: The chatbot button isn't showing up. What's wrong?
**A:** Check these things:
1. Verify `AIChatbot` is imported in `MainLayout.tsx`
2. Check browser console for errors
3. Ensure no CSS conflicts with z-index
4. Clear browser cache and reload

### Q: I'm getting API errors. What should I do?
**A:** 
1. Verify your API key is correctly set in `.env.local`
2. Check the key is valid at https://makersuite.google.com/
3. Restart your development server
4. Check browser network tab for detailed error messages
5. Ensure you haven't exceeded API quota

### Q: The chatbot is giving wrong information. How do I fix it?
**A:** Update the `PROFILE_CONTEXT` in `api/chat.ts` with the correct information, then redeploy your application.

### Q: Responses are very slow. What can I do?
**A:** 
1. Check your internet connection
2. Verify Gemini API status
3. Check if you've hit API rate limits
4. Monitor Vercel function logs for issues

### Q: The chat window is too small/large. How do I resize it?
**A:** Edit the dimensions in `AIChatbot.tsx`:
```typescript
className="w-[calc(100vw-2rem)] sm:w-96 h-[600px]"
// Adjust w-96 (width) and h-[600px] (height)
```

### Q: Messages aren't scrolling automatically. Why?
**A:** This should work automatically. If not, check:
1. Browser console for errors
2. The `messagesEndRef` is properly set
3. The `scrollToBottom` function is being called

## Performance

### Q: Will the chatbot slow down my website?
**A:** No! The chatbot:
- Loads asynchronously
- Only renders the chat window when opened
- Uses efficient React patterns
- Has minimal impact on page load time

### Q: How many API calls does each conversation use?
**A:** One API call per user message. The conversation history is sent with each request to maintain context.

### Q: What's the typical response time?
**A:** Usually 1-3 seconds, depending on:
- Your internet connection
- Gemini API load
- Message complexity
- Conversation history length

### Q: Can I cache responses?
**A:** Yes, you could implement caching for common questions, but it's not necessary for typical portfolio traffic.

## Security & Privacy

### Q: Is my API key secure?
**A:** Yes! The key is:
- Stored in environment variables
- Never exposed to the client
- Only used server-side
- Not committed to Git (in .gitignore)

### Q: Can visitors see my API key?
**A:** No, the API key is only accessible server-side in the Vercel function.

### Q: What data is collected?
**A:** By default, no data is stored. Each conversation is independent. If you want analytics, you'd need to implement logging separately.

### Q: Is the chatbot GDPR compliant?
**A:** The chatbot itself doesn't store personal data. However, Gemini API processes messages according to Google's privacy policy. Review Google's terms if GDPR compliance is critical.

### Q: Can I add content filtering?
**A:** Yes! Gemini API includes built-in safety filters that are already configured in `api/chat.ts`.

## Customization

### Q: Can I add more personality to the chatbot?
**A:** Yes! Adjust the `temperature` parameter in `api/chat.ts`:
```typescript
temperature: 0.7,  // Higher = more creative (0-1)
```

### Q: Can I make responses longer/shorter?
**A:** Yes! Modify `maxOutputTokens` in `api/chat.ts`:
```typescript
maxOutputTokens: 1024,  // Increase for longer responses
```

### Q: Can I add images to responses?
**A:** Not directly with the current setup, but you could:
1. Parse response text for image markers
2. Render images separately in the UI
3. Use Gemini's multimodal capabilities (requires code changes)

### Q: Can I add voice input/output?
**A:** Yes, but it requires additional implementation:
- Voice input: Use Web Speech API
- Voice output: Use Text-to-Speech API
- Both are browser-native features

### Q: Can I save conversation history?
**A:** Yes, you could:
1. Store in localStorage (client-side)
2. Store in database (server-side)
3. Send via email
4. Export as PDF/TXT

## Analytics

### Q: How do I track chatbot usage?
**A:** You could add analytics in `api/chat.ts`:
```typescript
// Log to your analytics service
await analytics.track({
  event: 'chatbot_message',
  question: message,
  timestamp: new Date()
});
```

### Q: What metrics should I track?
**A:** Consider tracking:
- Total conversations
- Messages per conversation
- Most asked questions
- Response times
- Error rates
- User satisfaction

### Q: Can I see what questions people ask?
**A:** Not by default. You'd need to implement logging in the API route.

## Advanced Features

### Q: Can I integrate with my CRM?
**A:** Yes! Add CRM integration in `api/chat.ts` to:
- Capture leads
- Log conversations
- Trigger follow-ups

### Q: Can I add a feedback system?
**A:** Yes! Add thumbs up/down buttons to messages and log feedback.

### Q: Can I make the chatbot proactive?
**A:** Yes! You could:
- Auto-open after X seconds
- Show prompts based on page visited
- Trigger on scroll depth

### Q: Can I add multiple languages?
**A:** Yes! Gemini supports multiple languages. You could:
- Detect user language
- Translate profile context
- Respond in user's language

### Q: Can I connect to my project documentation?
**A:** Yes! Implement RAG (Retrieval Augmented Generation):
1. Index your documentation
2. Retrieve relevant sections
3. Include in context
4. Generate informed responses

## Cost & Limits

### Q: What are the API limits?
**A:** Free tier:
- 60 requests per minute
- Generous monthly quota
- No credit card required

### Q: What happens if I exceed limits?
**A:** You'll receive rate limit errors. Consider:
- Upgrading to paid tier
- Implementing rate limiting
- Caching common responses

### Q: How much does it cost at scale?
**A:** Check current pricing at https://ai.google.dev/pricing. For typical portfolio traffic, the free tier is sufficient.

## Support

### Q: Where can I get help?
**A:** 
1. Check this FAQ
2. Review documentation in `/docs` folder
3. Check browser console for errors
4. Review Vercel deployment logs
5. Check Gemini API status

### Q: How do I report a bug?
**A:** 
1. Check if it's a known issue
2. Verify your setup is correct
3. Collect error messages
4. Document steps to reproduce

### Q: Can I contribute improvements?
**A:** Yes! The chatbot is part of your portfolio codebase. Feel free to enhance it and share improvements.

## Best Practices

### Q: What makes a good chatbot question?
**A:** Good questions are:
- Specific ("Tell me about Augastam" vs "Tell me about your work")
- Professional (related to your career)
- Clear and concise

### Q: How should I maintain the chatbot?
**A:** 
1. Update profile context regularly
2. Monitor API usage
3. Test periodically
4. Gather user feedback
5. Keep documentation current

### Q: Should I announce the chatbot to visitors?
**A:** Consider:
- Subtle pulse animation (already included)
- Brief tooltip on first visit
- Mention in about section
- Let users discover naturally

---

## Still Have Questions?

Check the comprehensive documentation:
- [Quick Start Guide](../CHATBOT_QUICKSTART.md)
- [Setup Guide](./CHATBOT_SETUP.md)
- [Features Guide](./AI_CHATBOT_FEATURES.md)
- [Architecture Guide](./CHATBOT_ARCHITECTURE.md)
- [UI Guide](./CHATBOT_UI_GUIDE.md)

---

**Last Updated**: February 19, 2026
