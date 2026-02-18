# 🔥 Firebase Quick Commands

## Initial Setup

```bash
# 1. Install dependencies
cd functions && npm install && cd ..
npm install

# 2. Set Gemini API key as secret
firebase functions:secrets:set GEMINI_API_KEY
# Paste your key when prompted

# 3. Deploy functions
firebase deploy --only functions
```

## Daily Development

```bash
# Start local development
npm start

# Build for production
npm run build

# Deploy everything (hosting + functions)
firebase deploy

# Deploy only functions
firebase deploy --only functions

# Deploy only hosting
firebase deploy --only hosting
```

## Monitoring

```bash
# View real-time logs
firebase functions:log

# View specific function logs
firebase functions:log --only chatWithGemini

# List all deployed functions
firebase functions:list

# Check function status
firebase functions:list --filter chatWithGemini
```

## Secrets Management

```bash
# Set a secret
firebase functions:secrets:set GEMINI_API_KEY

# View secret value (requires permissions)
firebase functions:secrets:access GEMINI_API_KEY

# List all secrets
firebase functions:secrets:list

# Delete a secret
firebase functions:secrets:destroy GEMINI_API_KEY
```

## Testing

```bash
# Start Firebase emulators
firebase emulators:start

# Start only functions emulator
firebase emulators:start --only functions

# Start functions shell (interactive testing)
firebase functions:shell
```

## Troubleshooting

```bash
# View recent errors
firebase functions:log --only chatWithGemini | grep ERROR

# Check function configuration
firebase functions:config:get

# Verify deployment
firebase functions:list

# Check project info
firebase projects:list
firebase use
```

## Cleanup

```bash
# Delete a function
firebase functions:delete chatWithGemini

# Delete all functions
firebase functions:delete --force
```

## Environment Setup

```bash
# Check current project
firebase use

# Switch project
firebase use your-project-id

# List available projects
firebase projects:list

# Login/logout
firebase login
firebase logout
```

## Quick Test Sequence

```bash
# 1. Deploy
firebase deploy --only functions

# 2. Check deployment
firebase functions:list

# 3. View logs
firebase functions:log --only chatWithGemini

# 4. Test in browser
# Open your site and try the chatbot
```

## Emergency Commands

```bash
# Rollback to previous version
firebase rollback functions:chatWithGemini

# View deployment history
firebase functions:list --filter chatWithGemini

# Force redeploy
firebase deploy --only functions --force
```

## Common Workflows

### Update Profile Context

```bash
# 1. Edit functions/index.js (update PROFILE_CONTEXT)
# 2. Deploy
firebase deploy --only functions
# 3. Verify
firebase functions:log
```

### Update API Key

```bash
# 1. Set new key
firebase functions:secrets:set GEMINI_API_KEY
# 2. Redeploy
firebase deploy --only functions
```

### Debug Issues

```bash
# 1. Check logs
firebase functions:log --only chatWithGemini

# 2. Verify secrets
firebase functions:secrets:list

# 3. Test locally
firebase emulators:start
```

---

**Keep this file handy for quick reference! 📋**
