# Quick Chatbot Setup

Follow these steps to get your AI chatbot running:

## Step 1: Get Gemini API Key

1. Visit: https://makersuite.google.com/app/apikey
2. Sign in with Google
3. Click "Create API Key"
4. Copy the key

## Step 2: Configure Environment

1. Open `.env.local` file in the root directory
2. Replace the empty values with your API key:

```
VITE_GEMINI_API_KEY=paste_your_key_here
GEMINI_API_KEY=paste_your_key_here
```

## Step 3: Install Dependencies

```bash
npm install
```

## Step 4: Run the Project

```bash
npm start
```

## Step 5: Test the Chatbot

1. Look for the purple chat button in the bottom-right corner
2. Click it to open the chat
3. Try asking: "What is your experience?"

## Deploy to Production

### For Vercel:

1. Push code to GitHub
2. Import project in Vercel
3. Add environment variable:
   - Name: `GEMINI_API_KEY`
   - Value: Your API key
4. Deploy!

### For Other Platforms:

Make sure to set the `GEMINI_API_KEY` environment variable in your hosting platform's settings.

---

## Need Help?

See the full documentation: [docs/CHATBOT_SETUP.md](./docs/CHATBOT_SETUP.md)

## Test Questions

Try these to test the chatbot:
- "What is your experience?"
- "Tell me about Augastam"
- "What technologies do you know?"
- "What projects have you built?"
- "What is your current role?"

The chatbot will only answer questions about your professional profile and will politely redirect any off-topic questions!
