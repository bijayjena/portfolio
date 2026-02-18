# Firebase Cloud Functions Architecture

## Complete System Overview

```
┌─────────────────────────────────────────────────────────────────┐
│                        VISITOR'S BROWSER                         │
│                                                                  │
│  ┌────────────────────────────────────────────────────────┐    │
│  │         Your Portfolio (React SPA)                      │    │
│  │         Hosted on Firebase Hosting                      │    │
│  │                                                          │    │
│  │  ┌──────────────────────────────────────────────────┐  │    │
│  │  │      AIChatbot Component                          │  │    │
│  │  │  • Floating button (purple gradient)             │  │    │
│  │  │  • Chat window with messages                     │  │    │
│  │  │  • Suggested questions                           │  │    │
│  │  │  • Input field                                   │  │    │
│  │  └──────────────────────────────────────────────────┘  │    │
│  │                                                          │    │
│  │  ┌──────