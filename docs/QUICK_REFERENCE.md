# Quick Reference Card

## 🚀 Commands

```bash
# Development
npm start              # Start dev server with performance monitoring

# Build
npm run build         # Production build with optimizations
npm run preview       # Preview production build locally

# Lint
npm run lint          # Check code quality
```

---

## 📁 New Files Overview

### Components
```
src/components/
├── ErrorBoundary.tsx          # Catches React errors
├── OptimizedImage.tsx         # Lazy loads images
└── LoadingScreen.tsx          # Loading state UI
```

### Hooks
```
src/hooks/
├── useMediaQuery.ts           # Responsive breakpoints
├── useScrollProgress.ts       # Scroll position tracking
└── useIntersectionObserver.ts # Lazy loading utility
```

### Utils
```
src/utils/
├── performance.ts             # Debounce, throttle, lazy loading
└── monitoring.ts              # Performance metrics tracking
```

---

## 🎨 New CSS Utilities

```css
/* Glass morphism */
.glass

/* Hover effects */
.hover-lift

/* Animations */
.shimmer
.animate-pulse-glow
.transition-smooth

/* Gradients */
.gradient-primary
.gradient-text
.bg-gradient-subtle
```

---

## 🪝 Hook Usage

### Media Queries
```tsx
import { useIsMobile, useIsTablet, useIsDesktop, useReducedMotion } from '@/hooks/useMediaQuery';

const isMobile = useIsMobile();        // < 768px
const isTablet = useIsTablet();        // 768-1024px
const isDesktop = useIsDesktop();      // > 1024px
const prefersReduced = useReducedMotion();
```

### Scroll Progress
```tsx
import { useScrollProgress } from '@/hooks/useScrollProgress';

const progress = useScrollProgress(); // 0-100
```

### Intersection Observer
```tsx
import { useIntersectionObserver } from '@/hooks/useIntersectionObserver';

const [ref, isVisible] = useIntersectionObserver({
  threshold: 0.1,
  freezeOnceVisible: true
});
```

---

## 🛠️ Utility Functions

### Performance
```tsx
import { debounce, throttle, preloadImage } from '@/utils/performance';

// Debounce (wait for pause)
const handleSearch = debounce((query) => {
  // Search logic
}, 300);

// Throttle (limit frequency)
const handleScroll = throttle(() => {
  // Scroll logic
}, 100);

// Preload image
await preloadImage('/path/to/image.jpg');
```

### Monitoring (Dev Only)
```tsx
import { measureRender, measureAsync } from '@/utils/monitoring';

// Measure component render
const endMeasure = measureRender('MyComponent');
// ... render logic
endMeasure();

// Measure async operation
const data = await measureAsync('fetchData', async () => {
  return await fetch('/api/data');
});
```

---

## 🎯 Responsive Breakpoints

```
Mobile:   < 768px
Tablet:   768px - 1024px
Desktop:  > 1024px
```

### Tailwind Classes
```tsx
<div className="
  text-sm sm:text-base md:text-lg lg:text-xl
  p-4 sm:p-6 lg:p-8
  grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3
">
```

---

## ✨ Animation Patterns

### Framer Motion
```tsx
import { motion } from 'framer-motion';

// Fade in
<motion.div
  initial={{ opacity: 0, y: 20 }}
  animate={{ opacity: 1, y: 0 }}
  transition={{ duration: 0.5 }}
>

// Spring animation
<motion.div
  animate={{ scale: 1.1 }}
  transition={{ type: "spring", stiffness: 260, damping: 20 }}
>

// Stagger children
<motion.div
  variants={{
    hidden: {},
    visible: { transition: { staggerChildren: 0.1 } }
  }}
>
```

---

## 🎨 Button Variants

```tsx
import { Button } from '@/components/ui/button';

<Button variant="default">Default</Button>
<Button variant="hero">Hero (Gradient)</Button>
<Button variant="outline">Outline</Button>
<Button variant="ghost">Ghost</Button>
<Button variant="secondary">Secondary</Button>
<Button variant="destructive">Destructive</Button>
<Button variant="link">Link</Button>

<Button size="sm">Small</Button>
<Button size="default">Default</Button>
<Button size="lg">Large</Button>
<Button size="icon">Icon</Button>
```

---

## 🔍 Performance Monitoring

### In Development
Open browser console after page load to see:
- First Contentful Paint (FCP)
- Largest Contentful Paint (LCP)
- First Input Delay (FID)
- Cumulative Layout Shift (CLS)
- Time to First Byte (TTFB)
- Long tasks (>50ms)

### Manual Check
```tsx
import { logPerformanceMetrics, checkPerformanceThresholds } from '@/utils/monitoring';

// Log all metrics
logPerformanceMetrics();

// Check Core Web Vitals status
const status = checkPerformanceThresholds();
console.table(status);
```

---

## 🧪 Testing Checklist

### Quick Test
- [ ] `npm start` - Starts without errors
- [ ] Open DevTools - No console errors
- [ ] Resize window - Responsive layout works
- [ ] Click mobile menu - Opens/closes smoothly
- [ ] Scroll page - Animations are smooth
- [ ] Hover elements - Micro-interactions work

### Accessibility
- [ ] Tab through page - Focus visible
- [ ] Enable "Reduce Motion" - Animations disabled
- [ ] Check contrast - Text readable

### Performance
- [ ] Run Lighthouse - Scores > 90
- [ ] Check Network tab - Bundle size reasonable
- [ ] Monitor FPS - Consistent 60fps

---

## 🐛 Troubleshooting

### Issue: Build fails
```bash
# Clear cache and reinstall
rm -rf node_modules package-lock.json
npm install
npm run build
```

### Issue: 3D visualization not loading
- Check browser console for WebGL errors
- Verify browser supports WebGL 2.0
- Try different browser

### Issue: Animations stuttering
- Close other tabs
- Check GPU acceleration enabled
- Test on different device

### Issue: TypeScript errors
```bash
# Check diagnostics
npm run lint
```

---

## 📊 Performance Targets

### Core Web Vitals
- **LCP**: < 2.5s (Good)
- **FID**: < 100ms (Good)
- **CLS**: < 0.1 (Good)

### Lighthouse Scores
- Performance: > 90
- Accessibility: > 95
- Best Practices: > 90
- SEO: > 90

---

## 🎯 Key Features

### Stability
✅ Error boundaries
✅ Optimized queries
✅ Performance utilities
✅ Lazy loading

### Responsiveness
✅ Mobile-first design
✅ Touch-optimized
✅ Adaptive layouts
✅ User preferences

### Wow Factor
✅ 60fps animations
✅ Micro-interactions
✅ Glass morphism
✅ Spring physics

---

## 📚 Documentation

- `SUMMARY.md` - Overview of all changes
- `IMPROVEMENTS.md` - Technical details
- `TESTING_GUIDE.md` - Testing checklist
- `QUICK_REFERENCE.md` - This file

---

## 🔗 Useful Links

- [Framer Motion](https://www.framer.com/motion/)
- [Tailwind CSS](https://tailwindcss.com/)
- [React Three Fiber](https://docs.pmnd.rs/react-three-fiber)
- [Web Vitals](https://web.dev/vitals/)
- [Lighthouse](https://developers.google.com/web/tools/lighthouse)

---

**Keep this card handy for quick reference! 📌**
