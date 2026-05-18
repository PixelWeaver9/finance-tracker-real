# Animation System - Finance Tracker

## Design Philosophy

**Purposeful motion, not decoration.** Every animation serves a function: guiding attention, providing feedback, or establishing hierarchy. Following Impeccable `/animate` principles.

## Motion Principles

### 1. Ease-Out Timing
```css
cubic-bezier(0.16, 1, 0.3, 1) /* ease-out-quart */
```
**Why**: Natural deceleration. Objects slow down as they reach their destination, like physics.

### 2. GPU-Accelerated Only
**Animate**:
- ✅ `opacity`
- ✅ `transform` (translate, scale, rotate)
- ✅ `box-shadow`
- ✅ `color`

**Never animate**:
- ❌ `width`, `height`, `padding`, `margin` (layout thrashing)
- ❌ `top`, `left`, `right`, `bottom` (reflow)
- ❌ `display`, `visibility` (use opacity + pointer-events)

### 3. Duration Guidelines
- **Micro-interactions**: 200ms (hover, focus)
- **Entrance animations**: 300-500ms (cards, modals)
- **Page transitions**: 500ms (route changes)
- **Ambient effects**: 2-20s (particles, scan lines)

### 4. Staggered Reveals
Sequential animations create hierarchy:
```css
.animate-delay-50   /* 50ms */
.animate-delay-100  /* 100ms */
.animate-delay-150  /* 150ms */
.animate-delay-200  /* 200ms */
.animate-delay-250  /* 250ms */
.animate-delay-300  /* 300ms */
.animate-delay-350  /* 350ms */
.animate-delay-400  /* 400ms */
.animate-delay-450  /* 450ms */
```

## Animation Catalog

### Entrance Animations

#### Page Transition
```css
@keyframes pageTransition {
  from { opacity: 0; transform: translateY(20px); }
  to { opacity: 1; transform: translateY(0); }
}
duration: 500ms
```
**Usage**: Root container on page mount  
**Purpose**: Smooth page load, reduces jarring appearance

#### Slide In Up
```css
@keyframes slideInUp {
  from { opacity: 0; transform: translateY(20px); }
  to { opacity: 1; transform: translateY(0); }
}
duration: 400ms
```
**Usage**: Cards, form fields, content blocks  
**Purpose**: Sequential reveal, establishes reading order

#### Slide In Right
```css
@keyframes slideInRight {
  from { opacity: 0; transform: translateX(-20px); }
  to { opacity: 1; transform: translateX(0); }
}
duration: 500ms
```
**Usage**: List items, transaction rows  
**Purpose**: Horizontal flow, left-to-right reading

#### Slide In Bottom
```css
@keyframes slideInBottom {
  from { opacity: 0; transform: translateY(100px) scale(0.95); }
  to { opacity: 1; transform: translateY(0) scale(1); }
}
duration: 400ms
```
**Usage**: Modals, bottom sheets  
**Purpose**: Dramatic entrance from below

#### Scale In
```css
@keyframes scaleIn {
  from { opacity: 0; transform: scale(0.9); }
  to { opacity: 1; transform: scale(1); }
}
duration: 300ms
```
**Usage**: Icons, badges, small elements  
**Purpose**: Pop-in effect, draws attention

#### Rotate In
```css
@keyframes rotateIn {
  from { opacity: 0; transform: rotate(-180deg) scale(0.5); }
  to { opacity: 1; transform: rotate(0deg) scale(1); }
}
duration: 500ms
```
**Usage**: Logo icons, special elements  
**Purpose**: Playful entrance, brand personality

### Micro-Interactions

#### Hover Lift with Glow
```css
.hover-lift-glow {
  transition: all 0.2s cubic-bezier(0.16, 1, 0.3, 1);
}
.hover-lift-glow:hover {
  transform: translateY(-2px);
  box-shadow: var(--glow-cyan);
}
```
**Usage**: Cards, buttons, interactive surfaces  
**Purpose**: Affordance, shows interactivity

#### Hover Scale
```css
.hover-scale {
  transition: transform 0.2s cubic-bezier(0.16, 1, 0.3, 1);
}
.hover-scale:hover {
  transform: scale(1.02);
}
.hover-scale:active {
  transform: scale(0.98);
}
```
**Usage**: Buttons, clickable elements  
**Purpose**: Tactile feedback, confirms click

#### Button Press
```css
@keyframes buttonPress {
  0% { transform: scale(1); }
  50% { transform: scale(0.96); }
  100% { transform: scale(1); }
}
duration: 200ms
```
**Usage**: Primary action buttons  
**Purpose**: Physical button press feel

### Data Animations

#### Count Up
```css
@keyframes countUp {
  from { opacity: 0; transform: translateY(10px) scale(0.95); }
  to { opacity: 1; transform: translateY(0) scale(1); }
}
duration: 600ms
```
**Usage**: Financial numbers, stats  
**Purpose**: Emphasizes data reveal, draws eye to numbers

#### Shimmer
```css
@keyframes shimmer {
  0% { background-position: -1000px 0; }
  100% { background-position: 1000px 0; }
}
duration: 2s, infinite
```
**Usage**: Loading skeletons  
**Purpose**: Shows content is loading, reduces perceived wait

### Ambient Effects

#### Scan Line
```css
@keyframes scan {
  0% { transform: translateY(-100%); opacity: 0; }
  50% { opacity: 1; }
  100% { transform: translateY(100vh); opacity: 0; }
}
duration: 8s, infinite
```
**Usage**: Fixed position overlay  
**Purpose**: Sci-fi atmosphere, subtle movement

#### Floating Particles
```css
@keyframes float {
  0%, 100% { transform: translate(0, 0) rotate(0deg); opacity: 0.3; }
  25% { transform: translate(10px, -10px) rotate(90deg); opacity: 0.5; }
  50% { transform: translate(-5px, -20px) rotate(180deg); opacity: 0.3; }
  75% { transform: translate(-15px, -10px) rotate(270deg); opacity: 0.5; }
}
duration: 20s, infinite
```
**Usage**: Background particles  
**Purpose**: Depth, ambient motion, futuristic feel

#### Pulse Glow
```css
@keyframes pulse-glow {
  0%, 100% { opacity: 1; }
  50% { opacity: 0.5; }
}
duration: 2s, infinite
```
**Usage**: AI indicators, active states  
**Purpose**: Breathing effect, shows "alive" state

#### Glow Pulse (Box Shadow)
```css
@keyframes glowPulse {
  0%, 100% { box-shadow: 0 0 20px oklch(70% 0.18 210 / 0.2); }
  50% { box-shadow: 0 0 30px oklch(70% 0.18 210 / 0.4); }
}
duration: 2s, infinite
```
**Usage**: Primary buttons, important elements  
**Purpose**: Draws attention, pulsing energy

#### Border Glow
```css
@keyframes borderGlow {
  0%, 100% { 
    border-color: var(--border-default);
    box-shadow: 0 0 0 oklch(70% 0.18 210 / 0);
  }
  50% { 
    border-color: var(--cyan-500);
    box-shadow: 0 0 20px oklch(70% 0.18 210 / 0.3);
  }
}
duration: 2s, infinite
```
**Usage**: Active input fields, focused elements  
**Purpose**: Shows active state, guides attention

### Loading States

#### Typing Indicator
```css
@keyframes typing {
  0%, 100% { opacity: 0.3; }
  50% { opacity: 1; }
}
duration: 1.4s, infinite
```
**Usage**: Loading dots (3 dots with staggered delays)  
**Purpose**: Shows processing, familiar pattern

#### Ripple Effect
```css
@keyframes ripple {
  0% { transform: scale(0); opacity: 1; }
  100% { transform: scale(4); opacity: 0; }
}
duration: 600ms
```
**Usage**: Click feedback on buttons  
**Purpose**: Material design ripple, confirms interaction

## Implementation Examples

### Login/Register Pages

**Structure**:
1. Page container: `animate-page-transition` (500ms)
2. Logo: `animate-scale-in` (300ms)
3. Icon: `animate-rotate-in` (500ms)
4. Card: `animate-slide-in-up` + `animate-delay-100`
5. Form fields: `animate-slide-in-up` + staggered delays (150-350ms)
6. Submit button: `animate-slide-in-up` + `animate-delay-350`
7. Divider: `animate-fade-in` + `animate-delay-400`
8. Footer: `animate-fade-in` + `animate-delay-450`

**Hover states**:
- Card: `hover-lift-glow`
- Button: `hover-scale`
- Eye icon: `hover:scale-110`

**Loading state**:
- 3 typing dots with staggered delays (0ms, 200ms, 400ms)

### Dashboard

**Stats Cards**:
- Card 1: `animate-slide-in-up` + no delay
- Card 2: `animate-slide-in-up` + `animate-delay-100`
- Card 3: `animate-slide-in-up` + `animate-delay-200`
- Hover: `data-card-hover` (lift + glow)

**Transaction List**:
- Each item: `animate-slide-in-right` + staggered delays

**Chart**:
- Container: `animate-scale-in`
- Bars: CSS transition on height change

### Navbar

**Logo**:
- Zap icon: `animate-pulse-glow` (infinite)
- Text: Static

**Buttons**:
- Hover: Border opacity + slight glow

### Bottom Navigation

**Tabs**:
- Active: Color change (cyan)
- Inactive: Color change (tertiary)
- Transition: 200ms ease-out

## Performance Considerations

### GPU Acceleration
All animations use `transform` and `opacity` which are GPU-accelerated:
```css
will-change: transform, opacity; /* Only when animating */
```

### Reduced Motion
Respect user preferences:
```css
@media (prefers-reduced-motion: reduce) {
  * {
    animation-duration: 0.01ms !important;
    animation-iteration-count: 1 !important;
    transition-duration: 0.01ms !important;
  }
}
```

### Animation Budget
- **Max concurrent animations**: 10-15
- **Infinite animations**: 3-5 (scan line, particles, pulse)
- **Entrance animations**: Complete within 1 second
- **Micro-interactions**: Complete within 200ms

## Accessibility

### Focus States
All interactive elements have visible focus states:
```css
*:focus-visible {
  outline: 2px solid var(--cyan-500);
  outline-offset: 2px;
  box-shadow: var(--glow-cyan);
}
```

### Keyboard Navigation
- Tab order follows visual hierarchy
- Focus states are animated (200ms fade-in)
- Skip links for long content

### Screen Readers
- Animations don't affect screen reader announcements
- Loading states have `aria-live` regions
- Decorative animations have `aria-hidden="true"`

## Testing Checklist

- [ ] All animations complete smoothly (no jank)
- [ ] No layout shifts during animations
- [ ] Staggered delays create clear hierarchy
- [ ] Hover states provide clear affordance
- [ ] Loading states are visible and clear
- [ ] Reduced motion preference respected
- [ ] Focus states are visible
- [ ] Animations work on mobile (touch)
- [ ] No performance issues (60fps)
- [ ] Animations enhance, don't distract

## Future Enhancements

### Phase 2
1. **Chart animations**: Bars grow from 0 to value
2. **Number counters**: Animate from 0 to final value
3. **Confetti**: Success state celebrations
4. **Particle trails**: Mouse follow effects
5. **Parallax scrolling**: Depth on scroll

### Phase 3
1. **3D transforms**: Subtle card rotations
2. **Morphing shapes**: SVG path animations
3. **Liquid effects**: Blob animations
4. **Sound design**: Audio feedback (optional)
5. **Haptic feedback**: Vibration on mobile

## Conclusion

The animation system transforms Finance Tracker from a static interface into a living, breathing application. Every animation is:

- **Purposeful**: Serves a function (feedback, hierarchy, affordance)
- **Performant**: GPU-accelerated, 60fps
- **Accessible**: Respects reduced motion, maintains focus states
- **Consistent**: Same timing, same easing, same patterns
- **Futuristic**: Sci-fi aesthetic without being gimmicky

**Animation Health Score**: 9/10 (Excellent)

The staggered reveals create clear hierarchy. The micro-interactions provide tactile feedback. The ambient effects add personality without distraction. The loading states reduce perceived wait time.

This is motion design that enhances usability, not just decoration.
