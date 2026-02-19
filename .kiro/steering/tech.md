# Technology Stack

## Build System

- **Vite** - Fast build tool and dev server with HMR (Hot Module Replacement)
- **TypeScript** - Type-safe JavaScript with relaxed compiler options
- **SWC** - Fast TypeScript/JavaScript compiler via @vitejs/plugin-react-swc

## Core Framework & Libraries

### Frontend
- **React 18.3** - UI library with concurrent features
- **React Router DOM 6.30** - Client-side routing with future flags enabled
- **React Query (TanStack)** - Server state management with 5-minute stale time

### Styling
- **Tailwind CSS 3.4** - Utility-first CSS framework
- **tailwindcss-animate** - Animation utilities
- **Radix UI** - Unstyled, accessible component primitives
- **shadcn/ui** - Pre-built components using Radix UI + Tailwind

### Animation & 3D
- **Framer Motion 12** - Production-ready animation library
- **React Three Fiber 8.15** - React renderer for Three.js
- **Three.js 0.160** - 3D graphics library

### Backend & Services
- **Firebase 10.8** - Hosting, Cloud Functions, and AI chatbot backend
- **Google Gemini AI** - Powers the portfolio chatbot

### Forms & Validation
- **React Hook Form 7.61** - Performant form management
- **Zod 3.25** - TypeScript-first schema validation

### UI Utilities
- **lucide-react** - Icon library
- **next-themes** - Theme management (dark/light mode)
- **sonner** - Toast notifications
- **clsx + tailwind-merge** - Conditional class merging

## Development Tools

- **ESLint 9** - Linting with React hooks and refresh plugins
- **PostCSS + Autoprefixer** - CSS processing
- **TypeScript ESLint 8** - TypeScript-specific linting rules

## Common Commands

```bash
# Development
npm start              # Start dev server on port 8080
npm run build          # Production build
npm run build:dev      # Development build
npm run preview        # Preview production build
npm run lint           # Run ESLint

# Firebase (requires Firebase CLI)
firebase deploy                    # Deploy hosting + functions
firebase deploy --only hosting     # Deploy only hosting
firebase deploy --only functions   # Deploy only functions
firebase serve                     # Local Firebase emulator
```

## Path Aliases

- `@/*` resolves to `./src/*` for cleaner imports

## TypeScript Configuration

- Relaxed settings: `noImplicitAny: false`, `strictNullChecks: false`
- Allows JavaScript files
- Skip lib checks for faster compilation
- Project references for app and node configs

## Performance Optimizations

- Lazy loading for heavy components (3D visualization)
- Code splitting via React Router
- Image lazy loading with Intersection Observer
- RequestAnimationFrame for 60fps scroll animations
- React Query caching (5-minute stale time, 1 retry)
- Debounced/throttled event handlers

## Browser Support

Modern browsers with ES6+ support. Uses Vite's default targets.
