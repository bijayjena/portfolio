# 🤖 AI Chatbot - Quick Start Guide

## What You Get

An intelligent AI assistant powered by Google Gemini that answers questions about your professional profile, experience, and projects. The chatbot:

✅ Only discusses YOUR professional background  
✅ Redirects off-topic questions  
✅ Provides instant, accurate responses  
✅ Works on mobile and desktop  
✅ Looks beautiful with gradient styling  

## 3-Minute Setup

### 1️⃣ Get Your Free API Key

Visit: **https://makersuite.google.com/app/apikey**

- Sign in with Google
- Click "Create API Key"
- Copy the key (starts with `AIza...`)

### 2️⃣ Add API Key to Project

Open `.env.local` and paste your key:

```env
VITE_GEMINI_API_KEY=AIzaSy...your_key_here
GEMINI_API_KEY=AIzaSy...your_key_here
```

### 3️⃣ Install & Run

```bash
npm install
npm start
```

### 4️⃣ Test It!

Look for the purple chat button in the bottom-right corner. Click it and ask:

- "What is your experience?"
- "Tell me about Augastam"
- "What technologies do you use?"

## Deploy to Production

### Vercel (Recommended)

1. Push code to GitHub
2. Import project in Vercel
3. Add environment variable:
   - **Name**: `GEMINI_API_KEY`
   - **Value**: Your API key
4. Deploy!

### Other Platforms

Set the `GEMINI_API_KEY` environment variable in your hosting platform's dashboard.

## Files Added

```
📁 Your Project
├── 📄 src/components/AIChatbot.tsx       # Chat UI component
├── 📄 src/utils/chatbot.ts               # Profile context
├── 📄 api/chat.ts                        # Backend API handler
├── 📄 .env.local                         # Your API key (don't commit!)
├── 📄 .env.example                       # Template for others
├── 📄 vercel.json                        # Deployment config
└── 📁 docs/
    ├── 📄 CHATBOT_SETUP.md              # Detailed setup guide
    └── 📄 AI_CHATBOT_FEATURES.md        # Feature documentation
```

## Customization

### Change Colors

Edit `src/components/AIChatbot.tsx`:

```typescript
// Find this line:
className="bg-gradient-to-r from-violet-500 to-purple-500"

// Change to your colors:
className="bg-gradient-to-r from-blue-500 to-cyan-500"
```

### Update Your Info

Edit `api/chat.ts` and modify the `PROFILE_CONTEXT` section with your latest:
- Experience
- Projects
- Skills
- Contact info

### Change Suggested Questions

Edit `src/components/AIChatbot.tsx`:

```typescript
const SUGGESTED_QUESTIONS = [
  "Your custom question 1",
  "Your custom question 2",
  // Add more...
];
```

## Troubleshooting

### Chatbot button not showing?
- Check browser console for errors
- Verify `AIChatbot` is imported in `MainLayout.tsx`

### API errors?
- Confirm API key is in `.env.local`
- Check key is valid at https://makersuite.google.com/
- Restart dev server after adding key

### Wrong information?
- Update `PROFILE_CONTEXT` in `api/chat.ts`
- Redeploy to apply changes

## Cost

**FREE!** Google Gemini offers:
- 60 requests per minute
- Generous free quota
- No credit card required

Perfect for portfolio traffic!

## Documentation

📚 **Full Documentation**: [docs/CHATBOT_SETUP.md](./docs/CHATBOT_SETUP.md)  
✨ **Features Guide**: [docs/AI_CHATBOT_FEATURES.md](./docs/AI_CHATBOT_FEATURES.md)

## Support

Need help? Check:
1. Browser console for errors
2. Vercel deployment logs
3. API key validity
4. Environment variables are set

---

**That's it! Your AI chatbot is ready to impress visitors! 🚀**
