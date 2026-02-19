# Project Structure

## Root Directory

```
portfolio/
├── src/                    # Source code
├── public/                 # Static assets (favicon, resume, etc.)
├── functions/              # Firebase Cloud Functions
├── docs/                   # Project documentation
├── .kiro/                  # Kiro AI configuration
├── dist/                   # Production build output
└── node_modules/           # Dependencies
```

## Source Directory (`src/`)

### Core Files
- `main.tsx` - Application entry point with performance monitoring
- `App.tsx` - Root component with providers and routing
- `index.css` - Global styles and CSS variables
- `vite-env.d.ts` - Vite type definitions

### Components (`src/components/`)

**Page Components** (major sections):
- `ParallaxHero.tsx` - Hero section with 3D visualization
- `About.tsx` - About section
- `CareerJourney.tsx` - Experience timeline
- `CaseStudiesSection.tsx` - Project case studies
- `Skills.tsx` - Skills showcase
- `Projects.tsx` - Projects grid
- `Education.tsx` - Education history
- `Contact.tsx` - Contact form
- `AIChatbot.tsx` - AI-powered chatbot

**Layout Components**:
- `Navigation.tsx` - Header navigation with mobile menu
- `Footer.tsx` - Footer section
- `FloatingControls.tsx` - Scroll-to-top and download resume buttons

**Utility Components**:
- `ErrorBoundary.tsx` - Error handling wrapper
- `ThemeProvider.tsx` - Dark/light theme context
- `LoadingScreen.tsx` - Loading state
- `AnimatedSection.tsx` - Scroll-triggered animations
- `PageTransition.tsx` - Route transition animations
- `OptimizedImage.tsx` - Lazy-loaded images
- `SEO.tsx` - Meta tags and SEO
- `ScrollingTechIcons.tsx` - Animated tech icons
- `TechStackVisualization.tsx` - 3D tech stack (lazy loaded)

**UI Components** (`src/components/ui/`):
- shadcn/ui components (40+ components)
- Radix UI primitives with Tailwind styling
- Reusable, accessible, and customizable

### Pages (`src/pages/`)

Route-based page components:
- `HomePage.tsx` - Landing page
- `AboutPage.tsx` - About page
- `ExperiencePage.tsx` - Experience page
- `CaseStudiesPage.tsx` - Case studies page
- `SkillsPage.tsx` - Skills page
- `ProjectsPage.tsx` - Projects page
- `EducationPage.tsx` - Education page
- `ContactPage.tsx` - Contact page
- `NotFound.tsx` - 404 page
- `Index.tsx` - Legacy index (if exists)

### Layouts (`src/layouts/`)

- `MainLayout.tsx` - Main layout wrapper with navigation and footer

### Hooks (`src/hooks/`)

Custom React hooks:
- `useIntersectionObserver.ts` - Lazy loading and scroll animations
- `useMediaQuery.ts` - Responsive breakpoint detection
- `useScrollProgress.ts` - Scroll position tracking
- `use-mobile.tsx` - Mobile device detection
- `use-toast.ts` - Toast notification hook

### Data (`src/data/`)

Static data and content:
- `experienceData.ts` - Work experience data
- `skillsData.ts` - Skills and technologies data

### Utils (`src/utils/`)

Utility functions:
- `chatbot.ts` - Chatbot integration logic
- `monitoring.ts` - Performance monitoring (dev only)
- `performance.ts` - Performance utilities

### Lib (`src/lib/`)

Third-party integrations:
- `firebase.ts` - Firebase configuration
- `utils.ts` - General utility functions (cn helper)

## Assets (`src/assets/`)

Images and media files:
- `hero-bg.jpg` - Hero background
- `profile-photo.jpg` - Profile image
- `logo.png` - Logo
- Certificate images
- Company logos

## Public Directory (`public/`)

Static files served as-is:
- `favicon.ico` - Site favicon
- `resume.pdf` - Downloadable resume
- `robots.txt` - SEO robots file
- `sitemap.xml` - SEO sitemap
- `_redirects` - Netlify/Vercel redirects
- `placeholder.svg` - Placeholder image

## Firebase (`functions/`)

Cloud Functions for chatbot:
- `index.js` - Cloud Function entry point
- `package.json` - Function dependencies

## Documentation (`docs/`)

Comprehensive project documentation:
- `README.md` - Documentation index
- `ARCHITECTURE.md` - System architecture
- `CHATBOT_ARCHITECTURE.md` - Chatbot design
- `IMPROVEMENTS.md` - Enhancement details
- `TESTING_GUIDE.md` - QA checklist
- `QUICK_REFERENCE.md` - Developer guide
- Additional guides and summaries

## Configuration Files

- `vite.config.ts` - Vite build configuration
- `tailwind.config.ts` - Tailwind CSS configuration
- `tsconfig.json` - TypeScript configuration (project references)
- `tsconfig.app.json` - App-specific TypeScript config
- `tsconfig.node.json` - Node-specific TypeScript config
- `eslint.config.js` - ESLint configuration
- `postcss.config.js` - PostCSS configuration
- `components.json` - shadcn/ui configuration
- `firebase.json` - Firebase hosting and functions config
- `.firebaserc` - Firebase project configuration
- `vercel.json` - Vercel deployment configuration

## Naming Conventions

### Files
- **Components**: PascalCase (e.g., `ParallaxHero.tsx`)
- **Hooks**: camelCase with `use` prefix (e.g., `useMediaQuery.ts`)
- **Utils**: camelCase (e.g., `monitoring.ts`)
- **Data**: camelCase with `Data` suffix (e.g., `skillsData.ts`)
- **Pages**: PascalCase with `Page` suffix (e.g., `HomePage.tsx`)

### Imports
- Use `@/` alias for src imports: `import { Button } from "@/components/ui/button"`
- Relative imports for same-directory files

## Component Organization

### Component Structure
```tsx
// 1. Imports (external, then internal)
import { useState } from "react";
import { Button } from "@/components/ui/button";

// 2. Types/Interfaces
interface ComponentProps {
  title: string;
}

// 3. Component definition
const Component = ({ title }: ComponentProps) => {
  // 4. Hooks
  const [state, setState] = useState();
  
  // 5. Event handlers
  const handleClick = () => {};
  
  // 6. Render
  return <div>{title}</div>;
};

// 7. Export
export default Component;
```

### Page Structure
- Pages are thin wrappers that compose components
- Use `AnimatedSection` for scroll animations
- Include `SEO` component for meta tags
- Wrap in `PageTransition` for route transitions

## Key Architectural Patterns

### Provider Hierarchy
```
ErrorBoundary
  → HelmetProvider (SEO)
    → QueryClientProvider (React Query)
      → ThemeProvider (Dark/Light mode)
        → TooltipProvider
          → BrowserRouter
            → Routes
```

### Layout Pattern
- `MainLayout` wraps all pages
- Includes Navigation, page content, Footer
- Floating controls overlay

### Error Handling
- Top-level ErrorBoundary catches all errors
- Component-level boundaries for heavy components (3D)
- Graceful fallbacks for loading states

### Performance Pattern
- Lazy load heavy components with `React.lazy()`
- Use Intersection Observer for scroll-triggered content
- Memoize expensive calculations
- Debounce/throttle event handlers

## Adding New Features

### New Page
1. Create component in `src/pages/`
2. Add route in `App.tsx`
3. Add navigation link in `Navigation.tsx`
4. Include SEO and PageTransition

### New Component
1. Create in appropriate `src/components/` subdirectory
2. Use TypeScript for props
3. Follow component structure pattern
4. Export as default

### New UI Component
1. Use shadcn/ui CLI: `npx shadcn-ui@latest add [component]`
2. Component added to `src/components/ui/`
3. Customize as needed

### New Hook
1. Create in `src/hooks/`
2. Prefix with `use`
3. Return values and functions
4. Document usage in comments
