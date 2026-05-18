# Finance Tracker - Design System

## Color Strategy: Restrained with Purpose

**Approach**: Tinted neutrals + strategic accent colors for data visualization only.

### Base Palette (OKLCH)

```css
/* Neutrals - tinted toward blue for trust/professionalism */
--gray-50:  oklch(98% 0.005 250);   /* Backgrounds */
--gray-100: oklch(96% 0.006 250);   /* Subtle borders */
--gray-200: oklch(90% 0.008 250);   /* Borders */
--gray-300: oklch(83% 0.010 250);   /* Disabled */
--gray-400: oklch(70% 0.012 250);   /* Placeholders */
--gray-500: oklch(58% 0.014 250);   /* Secondary text */
--gray-600: oklch(48% 0.015 250);   /* Body text */
--gray-700: oklch(38% 0.016 250);   /* Emphasis */
--gray-800: oklch(28% 0.017 250);   /* Strong emphasis */
--gray-900: oklch(18% 0.018 250);   /* Headings */

/* Primary - blue for actions and trust */
--blue-500: oklch(60% 0.18 250);    /* Hover states */
--blue-600: oklch(55% 0.20 250);    /* Primary actions */
--blue-700: oklch(48% 0.18 250);    /* Active states */

/* Data Visualization - distinct, accessible */
--green-500:  oklch(65% 0.18 145);  /* Income, positive */
--red-500:    oklch(60% 0.20 25);   /* Expense, negative */
--amber-500:  oklch(70% 0.16 80);   /* Warning, attention */
--violet-500: oklch(58% 0.18 290);  /* Category accent */
--cyan-500:   oklch(65% 0.16 200);  /* Category accent */
--pink-500:   oklch(62% 0.20 350);  /* Category accent */
```

### Usage Rules

- **Neutrals**: 90% of the interface
- **Blue**: Actions, links, active states only
- **Data colors**: Charts, stats, category indicators only
- **Never**: Decorative gradients, colored backgrounds for cards

## Typography

### Font Stack
```css
font-family: -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, 
             "Helvetica Neue", Arial, sans-serif;
```
**Rationale**: System fonts for speed and native feel. No custom fonts = faster load.

### Scale (1.25 ratio - clear hierarchy)
```css
--text-xs:   0.75rem;   /* 12px - labels, captions */
--text-sm:   0.875rem;  /* 14px - body, inputs */
--text-base: 1rem;      /* 16px - default body */
--text-lg:   1.125rem;  /* 18px - section headers */
--text-xl:   1.25rem;   /* 20px - card headers */
--text-2xl:  1.5rem;    /* 24px - page titles */
--text-3xl:  1.875rem;  /* 30px - stats numbers (mobile) */
--text-4xl:  2.25rem;   /* 36px - stats numbers (desktop) */
```

### Weights
- **400 (normal)**: Body text, descriptions
- **500 (medium)**: Labels, buttons, nav items
- **600 (semibold)**: Card headers, emphasis
- **700 (bold)**: Page titles, stats numbers

### Line Height
- **Tight (1.25)**: Large numbers, headings
- **Normal (1.5)**: Body text, forms
- **Relaxed (1.75)**: Long-form content (if any)

### Rules
- Body text: 14px (text-sm) minimum
- Line length: max 65ch for readability
- Letter spacing: default (no custom tracking)

## Spacing & Layout

### Scale (4px base unit)
```css
--space-1:  0.25rem;  /* 4px  - tight gaps */
--space-2:  0.5rem;   /* 8px  - small gaps */
--space-3:  0.75rem;  /* 12px - compact spacing */
--space-4:  1rem;     /* 16px - default gap */
--space-5:  1.25rem;  /* 20px - card padding (mobile) */
--space-6:  1.5rem;   /* 24px - card padding (desktop) */
--space-8:  2rem;     /* 32px - section spacing */
--space-12: 3rem;     /* 48px - large sections */
```

### Container
- **Max width**: 1152px (6xl)
- **Padding**: 16px mobile, 24px desktop
- **Centered**: Always

### Grid
- **Stats cards**: 1 column mobile, 3 columns desktop
- **Main layout**: 1 column mobile, 2-3 columns desktop (chart + list)
- **Gap**: 16px mobile, 24px desktop

### Rhythm Rules
- Vary spacing intentionally (not same padding everywhere)
- Tighter spacing within components
- Looser spacing between sections
- Consistent vertical rhythm (multiples of 4px)

## Components

### Cards
```css
background: white;
border: 1px solid var(--gray-200);
border-radius: 8px;
padding: 20px (mobile), 24px (desktop);
transition: border-color 200ms;

hover: border-color → var(--gray-300);
```

**Rules**:
- No nested cards (always wrong)
- No shadows (border only)
- No colored backgrounds (white only, except balance card: gray-50)

### Buttons

**Primary**:
```css
background: var(--blue-600);
color: white;
padding: 10px 16px;
border-radius: 8px;
font-weight: 500;
font-size: 14px;

hover: background → var(--blue-700);
disabled: background → var(--blue-400);
```

**Secondary** (text only):
```css
background: transparent;
color: var(--gray-600);
font-weight: 500;

hover: color → var(--gray-900);
```

### Inputs
```css
border: 1px solid var(--gray-300);
border-radius: 8px;
padding: 10px 16px;
font-size: 14px;
color: var(--gray-900);

focus: 
  border-color → var(--blue-600);
  ring: 2px var(--blue-600) with 20% opacity;
```

### Navigation

**Desktop**: Top navbar, clean text
**Mobile**: Bottom navigation, 4 tabs, icon + label

```css
height: 56px (mobile bottom nav);
background: white;
border-top: 1px solid var(--gray-200);

active: color → var(--blue-600);
inactive: color → var(--gray-400);
```

## Elevation

**No shadows**. Use borders only.

Exception: Modals and dropdowns can have subtle shadow for depth:
```css
box-shadow: 0 4px 12px rgba(0, 0, 0, 0.08);
```

## Motion

### Transitions
```css
/* Default for most interactions */
transition: all 200ms ease-out;

/* Color changes only */
transition: color 200ms ease-out;

/* Border changes */
transition: border-color 200ms ease-out;
```

### Easing
- **ease-out**: Default for all transitions
- **No bounce, no elastic, no spring**

### What to Animate
- ✅ Color changes (hover, active)
- ✅ Border colors
- ✅ Opacity (fade in/out)
- ✅ Transform (translate, scale - sparingly)

### What NOT to Animate
- ❌ Layout properties (width, height, padding, margin)
- ❌ Position (top, left, right, bottom)
- ❌ Display/visibility changes

## Responsive Behavior

### Breakpoint
```css
--mobile: < 768px;
--desktop: ≥ 768px;
```

### Mobile Adaptations
- Single column layouts
- Bottom navigation (56px height)
- Smaller text (text-xl vs text-3xl for stats)
- Tighter padding (20px vs 24px)
- Smaller icons (18-20px vs 24px)

### Desktop Enhancements
- Multi-column grids
- Top action buttons
- Larger text for emphasis
- More generous spacing
- Sticky chart sidebar

## Accessibility

### Contrast
- Body text: minimum 4.5:1 (WCAG AA)
- Large text: minimum 3:1
- Interactive elements: minimum 3:1

### Focus States
- Visible focus ring (2px blue-600 with 20% opacity)
- Never remove focus styles
- Keyboard navigation must work everywhere

### Touch Targets
- Minimum 44x44px (mobile)
- Minimum 32x32px (desktop)

## Anti-Patterns (Never Use)

- ❌ Side-stripe borders (colored left/right borders on cards)
- ❌ Gradient text (background-clip: text)
- ❌ Glassmorphism (backdrop-filter blur)
- ❌ Identical card grids (same icon + heading + text repeated)
- ❌ Hero-metric template (big number + gradient accent)
- ❌ Em dashes in copy (use commas, periods, colons)

## Current Implementation

- **Framework**: Tailwind CSS 4
- **Components**: Custom components (no UI library)
- **Icons**: Lucide React (minimal usage, 16-20px)
- **Charts**: Recharts (donut chart for categories)

## Design Principles

1. **Speed over decoration**: Fast load, fast interaction
2. **Clarity over cleverness**: Obvious over clever
3. **Data over chrome**: Show information, not interface
4. **Consistency over variety**: Predictable patterns
5. **Restraint over expression**: Quiet confidence
