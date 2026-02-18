# AI Chatbot Architecture

## System Overview

```
┌─────────────────────────────────────────────────────────────┐
│                     VISITOR'S BROWSER                        │
│                                                              │
│  ┌────────────────────────────────────────────────────┐    │
│  │         Portfolio Website (React App)               │    │
│  │                                                      │    │
│  │  ┌──────────────────────────────────────────────┐  │    │
│  │  │      AIChatbot Component                      │  │    │
│  │  │  ┌────────────────────────────────────────┐  │  │    │
│  │  │  │  • Floating Button                     │  │  │    │
│  │  │  │  • Chat Window                         │  │  │    │
│  │  │  │  • Message History                     │  │  │    │
│  │  │  │  • Input Field                         │  │  │    │
│  │  │  │  • Suggested Questions                 │  │  │    │
│  │  │  └────────────────────────────────────────┘  │  │    │
│  │  └──────────────────────────────────────────────┘  │    │
│  └────────────────────────────────────────────────────┘    │
└─────────────────────────────────────────────────────────────┘
                            │
                            │ HTTP POST /api/chat
                            │ { message, history }
                            ▼
┌─────────────────────────────────────────────────────────────┐
│                    VERCEL SERVERLESS                         │
│                                                              │
│  ┌────────────────────────────────────────────────────┐    │
│  │           API Route: /api/chat.ts                   │    │
│  │                                                      │    │
│  │  1. Receive user message                            │    │
│  │  2. Load PROFILE_CONTEXT                            │    │
│  │  3. Build conversation history                      │    │
│  │  4. Call Gemini API ──────────────────────┐        │    │
│  │  5. Process response                       │        │    │
│  │  6. Return to frontend                     │        │    │
│  └────────────────────────────────────────────┼────────┘    │
└─────────────────────────────────────────────────┼───────────┘
                                                  │
                                                  │ HTTPS
                                                  ▼
┌─────────────────────────────────────────────────────────────┐
│                  GOOGLE GEMINI API                           │
│                                                              │
│  ┌────────────────────────────────────────────────────┐    │
│  │         Gemini Pro Model                            │    │
│  │                                                      │    │
│  │  • Receives profile context                         │    │
│  │  • Processes user question                          │    │
│  │  • Generates contextual response                    │    │
│  │  • Enforces topic boundaries                        │    │
│  │  • Returns AI-generated answer                      │    │
│  └────────────────────────────────────────────────────┘    │
└─────────────────────────────────────────────────────────────┘
```

## Data Flow

### 1. User Interaction
```
User clicks chat button
    ↓
Chat window opens
    ↓
User sees suggested questions
    ↓
User types or clicks a question
    ↓
Message added to UI immediately
```

### 2. API Request
```
Frontend prepares request:
{
  message: "What is your experience?",
  history: [
    { role: "assistant", content: "Hi! I'm Bijay's AI assistant..." },
    { role: "user", content: "What is your experience?" }
  ]
}
    ↓
POST to /api/chat
```

### 3. Backend Processing
```
API receives request
    ↓
Validates message exists
    ↓
Loads PROFILE_CONTEXT (your info)
    ↓
Builds Gemini conversation format:
[
  { role: "user", parts: [{ text: PROFILE_CONTEXT }] },
  { role: "model", parts: [{ text: "Understood..." }] },
  ...conversation history...,
  { role: "user", parts: [{ text: user's question }] }
]
    ↓
Calls Gemini API with:
  • Contents (conversation)
  • Generation config (temperature, etc.)
  • Safety settings
```

### 4. AI Processing
```
Gemini receives:
  • Your complete profile context
  • Conversation history
  • Current question
    ↓
Gemini analyzes:
  • Is question about Bijay?
  • What information is relevant?
  • How to respond professionally?
    ↓
Gemini generates response:
  • Accurate information from context
  • Professional tone
  • Concise answer (2-4 sentences)
  • Redirects if off-topic
```

### 5. Response Delivery
```
Gemini returns response
    ↓
API extracts text from response
    ↓
API returns JSON:
{
  response: "Bijay has 4+ years of experience..."
}
    ↓
Frontend receives response
    ↓
Message added to chat UI
    ↓
User sees answer
```

## Component Architecture

### Frontend Components

```
MainLayout.tsx
    │
    ├── Navigation
    ├── Outlet (page content)
    ├── Footer
    ├── FloatingControls
    └── AIChatbot ◄── NEW
            │
            ├── State Management
            │   ├── messages: Message[]
            │   ├── input: string
            │   ├── isOpen: boolean
            │   └── isLoading: boolean
            │
            ├── UI Elements
            │   ├── Floating Button
            │   ├── Chat Window
            │   │   ├── Header
            │   │   ├── Messages Container
            │   │   │   ├── Assistant Messages
            │   │   │   └── User Messages
            │   │   ├── Suggested Questions
            │   │   └── Input Form
            │   └── Loading Indicator
            │
            └── Functions
                ├── sendMessage()
                ├── handleSuggestionClick()
                └── scrollToBottom()
```

### Backend Structure

```
api/chat.ts
    │
    ├── Request Handler
    │   ├── CORS Headers
    │   ├── Method Validation
    │   └── Request Parsing
    │
    ├── Profile Context
    │   ├── Current Role
    │   ├── Experience Timeline
    │   ├── Projects
    │   ├── Skills
    │   └── Contact Info
    │
    ├── Conversation Builder
    │   ├── System Context
    │   ├── History Processing
    │   └── Current Message
    │
    ├── Gemini Integration
    │   ├── API Call
    │   ├── Configuration
    │   └── Safety Settings
    │
    └── Response Processing
        ├── Extract Text
        ├── Error Handling
        └── JSON Response
```

## State Management

### Message State
```typescript
interface Message {
  role: "user" | "assistant";
  content: string;
}

// Example state:
[
  {
    role: "assistant",
    content: "Hi! I'm Bijay's AI assistant..."
  },
  {
    role: "user",
    content: "What is your experience?"
  },
  {
    role: "assistant",
    content: "Bijay has 4+ years of professional experience..."
  }
]
```

### UI State
```typescript
const [isOpen, setIsOpen] = useState(false);      // Chat window visibility
const [isLoading, setIsLoading] = useState(false); // API call in progress
const [input, setInput] = useState("");            // Current input text
```

## API Integration

### Request Format
```typescript
POST /api/chat
Content-Type: application/json

{
  "message": "What technologies do you use?",
  "history": [
    { "role": "assistant", "content": "..." },
    { "role": "user", "content": "..." }
  ]
}
```

### Response Format
```typescript
200 OK
Content-Type: application/json

{
  "response": "Bijay uses React, React Native, Node.js..."
}
```

### Error Format
```typescript
500 Internal Server Error
Content-Type: application/json

{
  "error": "Failed to process chat request",
  "details": "API key not configured"
}
```

## Security Architecture

### Environment Variables
```
Development:
  .env.local (local machine)
      ↓
  VITE_GEMINI_API_KEY (frontend - not used)
  GEMINI_API_KEY (backend - used)

Production:
  Vercel Environment Variables
      ↓
  GEMINI_API_KEY (backend only)
```

### API Key Protection
```
✅ Stored in environment variables
✅ Never committed to Git (.gitignore)
✅ Only accessible server-side
✅ Not exposed to client
✅ Separate keys for dev/prod
```

### Content Safety
```
Gemini API Safety Settings:
  • HARM_CATEGORY_HARASSMENT: BLOCK_MEDIUM_AND_ABOVE
  • HARM_CATEGORY_HATE_SPEECH: BLOCK_MEDIUM_AND_ABOVE
  • HARM_CATEGORY_SEXUALLY_EXPLICIT: BLOCK_MEDIUM_AND_ABOVE
  • HARM_CATEGORY_DANGEROUS_CONTENT: BLOCK_MEDIUM_AND_ABOVE
```

## Performance Optimization

### Frontend
- Lazy loading of chat interface
- Optimized re-renders with React hooks
- Efficient state updates
- Auto-scroll only when needed

### Backend
- Serverless architecture (scales automatically)
- Minimal processing overhead
- Efficient API calls
- Proper error handling

### API
- Conversation history sent with each request
- Context maintained for coherent responses
- Typical response time: 1-3 seconds

## Deployment Architecture

### Development
```
Local Machine
    ↓
npm start (Vite dev server)
    ↓
http://localhost:5173
    ↓
API calls to /api/chat
    ↓
Handled by Vite proxy or local function
```

### Production
```
GitHub Repository
    ↓
Vercel Deployment
    ↓
Static Assets (CDN)
    ↓
Serverless Functions (API routes)
    ↓
https://your-domain.com
```

## Scalability

### Current Capacity
- Gemini API: 60 requests/minute (free tier)
- Vercel: Unlimited serverless invocations (hobby plan)
- Frontend: CDN-distributed, globally available

### Scaling Options
1. Upgrade Gemini API tier for higher limits
2. Implement rate limiting per user
3. Add caching for common questions
4. Use Redis for session management
5. Implement queue system for high traffic

## Monitoring & Analytics

### Potential Metrics
- Total conversations
- Average conversation length
- Most asked questions
- Response times
- Error rates
- User satisfaction

### Implementation Ideas
```typescript
// Track in API route
await logAnalytics({
  timestamp: new Date(),
  question: message,
  responseTime: endTime - startTime,
  success: true
});
```

## Future Enhancements

### Phase 1 (Easy)
- Add typing indicator animation
- Implement message timestamps
- Add "Copy" button for responses
- Show character count in input

### Phase 2 (Medium)
- Add conversation export (PDF/TXT)
- Implement conversation persistence
- Add voice input/output
- Multi-language support

### Phase 3 (Advanced)
- RAG integration with project docs
- Function calling (download resume, etc.)
- Analytics dashboard
- A/B testing framework

---

**This architecture provides a solid foundation for an intelligent, scalable, and maintainable AI chatbot system!**
