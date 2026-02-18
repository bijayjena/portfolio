# AI Chatbot UI Guide

## Button Layout

### Desktop View
```
┌─────────────────────────────────────────────────────────┐
│                                                          │
│                    Portfolio Content                     │
│                                                          │
│                                                          │
│                                                          │
│                                              ┌─────────┐ │
│                                              │  Scroll │ │
│                                              │   Top   │ │
│                                              └─────────┘ │
│                                                          │
│                                    ┌───┐  ┌───────────┐ │
│                                    │ 💬│  │ Download  │ │
│                                    │ AI│  │  Resume   │ │
│                                    └───┘  └───────────┘ │
└─────────────────────────────────────────────────────────┘
     Chatbot Button (left)    Resume Button (right)
```

### Mobile View
```
┌──────────────────────────┐
│                          │
│   Portfolio Content      │
│                          │
│                          │
│                          │
│                          │
│                          │
│                          │
│              ┌─────┐     │
│              │ Top │     │
│              └─────┘     │
│                          │
│        ┌──┐  ┌────────┐  │
│        │💬│  │ Resume │  │
│        └──┘  └────────┘  │
└──────────────────────────┘
```

## Button Specifications

### Chatbot Button
```css
Position: fixed
Bottom: 24px (mobile) / 32px (desktop)
Right: 88px (mobile) / 208px (desktop)
Size: 48x48px (mobile) / 56x56px (desktop)
Background: Linear gradient (violet-500 to purple-500)
Border Radius: 50% (fully rounded)
Shadow: Large shadow
Z-Index: 50
```

### Resume Button (Reference)
```css
Position: fixed
Bottom: 24px (mobile) / 32px (desktop)
Right: 16px (mobile) / 32px (desktop)
Size: Auto width / 56px height
Background: Primary color
Border Radius: 9999px (fully rounded)
Shadow: Extra large shadow
Z-Index: 40
```

### Spacing Between Buttons
- Mobile: ~8px gap
- Desktop: ~16px gap

## Chat Window Specifications

### Dimensions
```css
Width: calc(100vw - 2rem) on mobile / 384px on desktop
Height: 600px (max 80vh)
Position: fixed
Bottom: 24px (mobile) / 32px (desktop)
Right: 16px (mobile) / 32px (desktop)
Z-Index: 50
```

### Layout
```
┌─────────────────────────────────────┐
│ ┌─────────────────────────────────┐ │ ← Header (Purple Gradient)
│ │ ✨ Bijay's AI Assistant      ✕ │ │
│ │ Powered by Gemini               │ │
│ └─────────────────────────────────┘ │
│                                     │
│ ┌─────────────────────────────────┐ │
│ │ Hi! I'm Bijay's AI assistant... │ │ ← Assistant Message
│ └─────────────────────────────────┘ │
│                                     │
│                 ┌─────────────────┐ │
│                 │ What is your... │ │ ← User Message
│                 └─────────────────┘ │
│                                     │
│ ┌─────────────────────────────────┐ │
│ │ Bijay has 4+ years of...       │ │ ← Assistant Response
│ └─────────────────────────────────┘ │
│                                     │
├─────────────────────────────────────┤
│ [What is...] [Tell me...] [What...] │ ← Suggested Questions
├─────────────────────────────────────┤
│ [Type your message...        ] [→] │ ← Input Area
└─────────────────────────────────────┘
```

## Color Scheme

### Chatbot Button
- **Background**: `linear-gradient(to right, #8b5cf6, #a855f7)`
- **Hover**: `linear-gradient(to right, #7c3aed, #9333ea)`
- **Icon**: White
- **Pulse Indicator**: Green (#10b981)

### Chat Window
- **Header Background**: `linear-gradient(to right, #8b5cf6, #a855f7)`
- **Header Text**: White
- **Window Background**: Background color (theme-dependent)
- **User Messages**: Purple gradient
- **Assistant Messages**: Muted background
- **Input Border**: Border color (theme-dependent)

## Responsive Breakpoints

### Mobile (< 640px)
- Chatbot button: 48x48px
- Right position: 88px (5.5rem)
- Chat window: Full width minus 2rem
- Suggested questions: Wrap to multiple lines

### Desktop (≥ 640px)
- Chatbot button: 56x56px
- Right position: 208px (13rem)
- Chat window: Fixed 384px width
- Suggested questions: Single line with scroll

## Animations

### Button Entrance
```typescript
Initial: { opacity: 0, scale: 0.5 }
Animate: { opacity: 1, scale: 1 }
Duration: 200ms
Type: Spring (stiffness: 260, damping: 20)
```

### Pulse Indicator
```css
Animation: pulse
Duration: 2s
Iteration: Infinite
```

### Chat Window
```typescript
Open: Fade in + slide up
Close: Fade out + slide down
Duration: 300ms
```

### Message Appearance
```typescript
User Message: Slide from right
Assistant Message: Slide from left
Duration: 200ms
```

## Accessibility

### ARIA Labels
- Chatbot button: `aria-label="Open AI Chat Assistant"`
- Close button: `aria-label="Close chat"`
- Send button: `aria-label="Send message"`

### Keyboard Navigation
- Tab: Navigate between buttons
- Enter: Activate button / Send message
- Escape: Close chat window

### Screen Reader Support
- Proper semantic HTML
- ARIA roles for chat messages
- Live region for new messages

## States

### Button States
1. **Default**: Purple gradient, visible
2. **Hover**: Darker gradient, scale 1.05
3. **Active**: Scale 0.95
4. **Disabled**: Opacity 0.5 (when chat open)

### Chat Window States
1. **Closed**: Hidden (display: none)
2. **Open**: Visible with animation
3. **Loading**: Show spinner in messages
4. **Error**: Show error message

### Input States
1. **Empty**: Send button disabled
2. **Typing**: Send button enabled
3. **Sending**: Input disabled, loading indicator
4. **Error**: Show error, re-enable input

## Z-Index Hierarchy

```
Navigation: 50
Chat Window: 50
Chatbot Button: 50
Floating Controls: 40
Scroll Top Button: 40
Content: 0-10
```

## Touch Targets

### Minimum Sizes (Mobile)
- Chatbot button: 48x48px ✅
- Close button: 44x44px ✅
- Send button: 44x44px ✅
- Suggested questions: 36px height ✅

### Spacing
- Between buttons: 8px minimum ✅
- Around touch targets: 4px minimum ✅

## Performance Considerations

### Optimization
- Lazy load chat window (only render when open)
- Debounce scroll events
- Optimize re-renders with React.memo
- Use CSS transforms for animations

### Loading Strategy
1. Button loads immediately
2. Chat window renders on first open
3. Messages load progressively
4. Images lazy load

## Browser Compatibility

### Supported Browsers
- Chrome/Edge: 90+
- Firefox: 88+
- Safari: 14+
- Mobile Safari: 14+
- Chrome Mobile: 90+

### Fallbacks
- Gradient: Solid color fallback
- Animations: Reduced motion support
- Backdrop blur: Solid background fallback

## Testing Checklist

### Visual Tests
- [ ] Buttons don't overlap
- [ ] Proper spacing maintained
- [ ] Gradient renders correctly
- [ ] Pulse animation smooth
- [ ] Chat window positioned correctly

### Interaction Tests
- [ ] Button click opens chat
- [ ] Close button works
- [ ] Can send messages
- [ ] Suggested questions clickable
- [ ] Keyboard navigation works

### Responsive Tests
- [ ] Mobile layout correct
- [ ] Desktop layout correct
- [ ] Tablet layout correct
- [ ] Landscape orientation works
- [ ] Portrait orientation works

### Accessibility Tests
- [ ] Screen reader compatible
- [ ] Keyboard accessible
- [ ] Focus indicators visible
- [ ] Color contrast sufficient
- [ ] Touch targets adequate

## Customization Guide

### Change Button Position
```typescript
// In AIChatbot.tsx
className="fixed bottom-6 sm:bottom-8 right-[5.5rem] sm:right-[13rem]"

// Adjust right value to move left/right
// Adjust bottom value to move up/down
```

### Change Colors
```typescript
// Button gradient
className="bg-gradient-to-r from-violet-500 to-purple-500"

// Change to blue
className="bg-gradient-to-r from-blue-500 to-cyan-500"

// Change to green
className="bg-gradient-to-r from-green-500 to-emerald-500"
```

### Change Size
```typescript
// Button size
className="h-12 w-12 sm:h-14 sm:w-14"

// Larger
className="h-14 w-14 sm:h-16 sm:w-16"

// Smaller
className="h-10 w-10 sm:h-12 sm:w-12"
```

### Change Chat Window Size
```typescript
// Window dimensions
className="w-[calc(100vw-2rem)] sm:w-96 h-[600px]"

// Wider
className="w-[calc(100vw-2rem)] sm:w-[28rem] h-[600px]"

// Taller
className="w-[calc(100vw-2rem)] sm:w-96 h-[700px]"
```

## Design Tokens

### Spacing
```typescript
gap-2: 8px
gap-3: 12px
gap-4: 16px
p-3: 12px
p-4: 16px
```

### Border Radius
```typescript
rounded-lg: 8px
rounded-full: 9999px
```

### Shadows
```typescript
shadow-lg: Large shadow
shadow-xl: Extra large shadow
shadow-2xl: 2X large shadow
```

### Transitions
```typescript
transition-all: All properties
duration-200: 200ms
duration-300: 300ms
```

---

**This guide ensures consistent and accessible UI implementation across all devices and screen sizes!**
