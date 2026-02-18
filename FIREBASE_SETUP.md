# 🔥 Firebase Cloud Functions Setup Guide

## Overview

This guide will help you set up Firebase Cloud Functions to securely handle your AI chatbot's Gemini API calls. This is more secure than client-side API calls and integrates perfectly with your existing Firebase hosting.

## Prerequisites

- Firebase CLI installed: `npm install -g firebase-tools`
- Firebase project already created (you have one!)
- Node.js 18 or higher

## Step-by-Step Setup

### 1. Install Firebase CLI (if not already installed)

```bash
npm install -g firebase-tools
```

### 2. Login to Firebase

```bash
firebase login
```

### 3. Install Function Dependencies

```bash
cd functions
npm install
cd ..
```

### 4. Get Your Firebase Configuration

1. Go to [Firebase Console](https://console.firebase.google.com/)
2. Select your project
3. Click the gear icon ⚙️ > Project Settings
4. Scroll down to "Your apps" section
5. If you don't have a web app, click "Add app" > Web
6. Copy the configuration values

### 5. Update .env.local

Add your Firebase configuration to `.env.local`:

```env
# Firebase Configuration
VITE_FIREBASE_API_KEY=AIzaSy...
VITE_FIREBASE_AUTH_DOMAIN=your-project.firebaseapp.com
VITE_FIREBASE_PROJECT_ID=your-project-id
VITE_FIREBASE_STORAGE_BUCKET=your-project.appspot.com
VITE_FIREBASE_MESSAGING_SENDER_ID=123456789
VITE_FIREBASE_APP_ID=1:123456789:web:abc123
```

### 6. Set Gemini API Key as Secret

This stores your API key securely in Google Secret Manager:

```bash
firebase functions:secrets:set GEMINI_API_KEY
```

When prompted, paste your Gemini API key (get it from https://makersuite.google.com/app/apikey)

### 7. Enable Anonymous Authentication

1. Go to Firebase Console > Authentication
2. Click "Get Started" (if not already enabled)
3. Go to "Sign-in method" tab
4. Enable "Anonymous" provider
5. Click "Save"

This allows visitors to use the chatbot without creating accounts.

### 8. Deploy Functions

```bash
firebase deploy --only functions
```

This will:
- Upload your functions to Firebase
- Configure the secret (Gemini API key)
- Make the functions available at your Firebase project URL

### 9. Install Frontend Dependencies

```bash
npm install
```

This installs the Firebase SDK for your React app.

### 10. Test Locally (Optional)

To test functions locally before deploying:

```bash
# Start Firebase emulators
firebase emulators:start

# In another terminal, start your dev server
npm start
```

Set `VITE_USE_FIREBASE_EMULATOR=true` in `.env.local` to use the emulator.

### 11. Deploy Everything

```bash
# Build your app
npm run build

# Deploy hosting and functions
firebase deploy
```

## Configuration Files Created

### functions/package.json
- Defines function dependencies
- Includes Gemini AI SDK

### functions/index.js
- `chatWithGemini` - Main chat function
- `healthCheck` - Status monitoring
- Includes your complete profile context
- Handles authentication and errors

### src/lib/firebase.ts
- Firebase initialization
- Authentication setup
- Functions configuration

### firebase.json
- Updated to include functions configuration

## Security Features

✅ **API Key Protection**
- Stored in Google Secret Manager
- Never exposed to client
- Rotatable without code changes

✅ **Authentication Required**
- Anonymous auth for visitors
- Prevents unauthorized access
- Rate limiting by Firebase

✅ **Content Safety**
- Gemini API safety filters
- Input validation
- Error handling

## Testing Your Setup

### 1. Check Function Deployment

```bash
firebase functions:list
```

You should see:
- `chatWithGemini`
- `healthCheck`

### 2. Test Health Check

Visit: `https://YOUR_REGION-YOUR_PROJECT_ID.cloudfunctions.net/healthCheck`

Should return:
```json
{
  "status": "healthy",
  "timestamp": "2026-02-18T...",
  "version": "1.0.0"
}
```

### 3. Test Chatbot

1. Open your deployed site
2. Click the purple chat button
3. Ask: "What is your experience?"
4. Should get a response about your professional background

## Troubleshooting

### "unauthenticated" Error
- Enable Anonymous Authentication in Firebase Console
- Check that `ensureAuthenticated()` is called before function

### "API key not configured" Error
- Run: `firebase functions:secrets:set GEMINI_API_KEY`
- Redeploy: `firebase deploy --only functions`

### Function Not Found
- Check deployment: `firebase functions:list`
- Verify function name matches in code: `chatWithGemini`
- Check Firebase Console > Functions

### CORS Errors
- Functions already configured with `cors: true`
- Check browser console for specific error
- Verify Firebase initialization in `src/lib/firebase.ts`

### Slow Responses
- First call after deployment may be slow (cold start)
- Subsequent calls should be 1-3 seconds
- Check function logs: `firebase functions:log`

## Monitoring & Logs

### View Function Logs

```bash
# Real-time logs
firebase functions:log

# Specific function
firebase functions:log --only chatWithGemini
```

### Firebase Console

1. Go to Firebase Console > Functions
2. Click on function name
3. View:
   - Invocations count
   - Execution time
   - Error rate
   - Logs

## Cost Estimation

### Firebase Functions (Blaze Plan Required)
- **Free tier**: 2M invocations/month
- **After free tier**: $0.40 per million invocations
- **Typical portfolio**: Well within free tier

### Gemini API
- **Free tier**: 60 requests/minute
- **Generous quota**: Suitable for portfolio traffic
- **No credit card required**

### Total Cost
**Expected: $0/month** for typical portfolio traffic

## Updating Profile Information

When you get new experience or projects:

1. Edit `functions/index.js`
2. Update the `PROFILE_CONTEXT` constant
3. Deploy: `firebase deploy --only functions`

## Advanced Configuration

### Increase Timeout

In `functions/index.js`:

```javascript
exports.chatWithGemini = onCall(
  {
    secrets: [geminiKey],
    cors: true,
    maxInstances: 10,
    timeoutSeconds: 60, // Add this
  },
  async (request) => {
    // ...
  }
);
```

### Add Rate Limiting

Install: `npm install express-rate-limit` in functions folder

### Enable App Check

1. Firebase Console > App Check
2. Enable for your web app
3. Add to function:

```javascript
exports.chatWithGemini = onCall(
  {
    secrets: [geminiKey],
    cors: true,
    consumeAppCheckToken: true, // Add this
  },
  async (request) => {
    // ...
  }
);
```

## Migration from Vercel

The old `api/chat.ts` file is no longer needed. You can delete:
- `api/` folder
- `vercel.json`
- `@vercel/node` from package.json

Firebase Functions provides:
- Better integration with your existing Firebase project
- More secure secret management
- Built-in authentication
- Better monitoring and logging

## Commands Reference

```bash
# Deploy everything
firebase deploy

# Deploy only functions
firebase deploy --only functions

# Deploy only hosting
firebase deploy --only hosting

# View logs
firebase functions:log

# List functions
firebase functions:list

# Set secret
firebase functions:secrets:set GEMINI_API_KEY

# View secrets
firebase functions:secrets:access GEMINI_API_KEY

# Delete function
firebase functions:delete chatWithGemini

# Start emulators
firebase emulators:start

# Test function locally
firebase functions:shell
```

## Next Steps

1. ✅ Complete this setup
2. ✅ Test the chatbot thoroughly
3. ✅ Monitor function usage in Firebase Console
4. ✅ Update profile context as needed
5. ✅ Consider adding analytics
6. ✅ Implement rate limiting if needed

## Support

If you encounter issues:
1. Check Firebase Console > Functions for errors
2. View logs: `firebase functions:log`
3. Verify secrets: `firebase functions:secrets:access GEMINI_API_KEY`
4. Check authentication is enabled
5. Review browser console for client-side errors

---

**Your AI chatbot is now powered by secure, scalable Firebase Cloud Functions! 🚀**
