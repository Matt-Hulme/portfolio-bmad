# Design System Documentation

## Overview

This design system implements a **Hacker Minimalist** aesthetic for the portfolio application. It prioritizes terminal-inspired visuals, monospace typography, and strategic use of muted green accents against a very dark background.

---

## Responsive Strategy

### Mobile-First Approach

This project follows a **mobile-first** responsive design strategy. All components and layouts are designed for mobile devices first, then progressively enhanced for larger screens using Tailwind's responsive breakpoints.

### Breakpoints

Tailwind CSS provides the following breakpoints (configured in `tailwind.config.ts`):

| Breakpoint | Min Width | Target Devices |
|------------|-----------|----------------|
| `sm`       | 640px     | Large phones (landscape), small tablets |
| `md`       | 768px     | Tablets (portrait) |
| `lg`       | 1024px    | Tablets (landscape), small laptops |
| `xl`       | 1280px    | Laptops, desktops |
| `2xl`      | 1536px    | Large desktops, monitors |

### Usage Patterns

**Basic Responsive Pattern:**
```tsx
<div className="p-4 md:p-8 lg:p-12">
  <h1 className="text-2xl md:text-4xl lg:text-5xl">
    Responsive Heading
  </h1>
</div>
```

**Grid Layout Pattern:**
```tsx
<div className="grid grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-3">
  {/* Content adapts from 1 column on mobile to 3 on large screens */}
</div>
```

**Container Pattern:**
```tsx
<div className="container mx-auto max-w-7xl px-4 md:px-8 lg:px-12">
  {/* Content with responsive horizontal padding */}
</div>
```

---

## Color Palette

### Primary Colors

```typescript
{
  primary: '#7fda89',      // Muted green - interactive elements, accents
  background: '#0f0f0f',   // Very dark background
}
```

### Gray Scale

Used for text hierarchy and subtle UI elements:

```typescript
{
  gray: {
    50: '#fafafa',   // Lightest - high contrast text
    100: '#f5f5f5',  // Headings (h1, h2)
    200: '#e5e5e5',  // Headings (h3, h4)
    300: '#d4d4d4',  // Headings (h5, h6)
    400: '#a3a3a3',  // Body text, paragraphs
    500: '#737373',  // Secondary text
    600: '#525252',  // Tertiary text
    700: '#404040',  // Muted text
    800: '#262626',  // Borders, dividers
    900: '#171717',  // Dark backgrounds
  }
}
```

### Color Usage Guidelines

- **Primary Green (#7fda89)**: Use for interactive elements (buttons, links), accents, and to draw attention
- **Gray 100-200**: High contrast headings
- **Gray 300-400**: Body text, readable content
- **Gray 500-700**: Secondary information, metadata
- **Gray 800-900**: Borders, subtle backgrounds

---

## Typography

### Font Stack

All text uses a **monospace** font stack for the terminal aesthetic:

```css
font-family: 'SF Mono', 'Monaco', 'Inconsolata', 'Courier New', monospace;
```

### Type Scale

| Element | Size | Line Height | Color | Weight |
|---------|------|-------------|-------|--------|
| h1      | 3rem (48px) | 1.2 | gray-100 | 700 (bold) |
| h2      | 2.25rem (36px) | 1.2 | gray-100 | 700 (bold) |
| h3      | 1.875rem (30px) | 1.3 | gray-200 | 600 (semibold) |
| h4      | 1.5rem (24px) | 1.3 | gray-200 | 600 (semibold) |
| h5      | 1.25rem (20px) | 1.5 | gray-300 | 500 (medium) |
| h6      | 1.125rem (18px) | 1.5 | gray-300 | 500 (medium) |
| body    | 1rem (16px) | 1.75 | gray-400 | 400 (normal) |
| small   | 0.875rem (14px) | 1.5 | gray-500 | 400 (normal) |

### Typography Guidelines

- **Headings**: Automatically styled via global CSS (see `src/index.css`)
- **Body text**: Default paragraph color is `gray-400` for comfortable reading
- **Links**: Primary green color with underline on hover
- **Code blocks**: Already monospace, use slightly lighter gray for differentiation

---

## Spacing

Use Tailwind's default spacing scale:

- `space-y-4`: Vertical spacing for related elements
- `gap-4`, `gap-6`, `gap-8`: Grid/flex gaps
- `p-4`, `p-8`, `p-12`: Padding (responsive)
- `m-4`, `m-8`, `m-12`: Margins (use sparingly)

---

## Components

### Installed shadcn/ui Components

The following components are available in `src/components/ui/`:

1. **Button** (`button.tsx`)
   - Variants: default, secondary, outline, ghost, link
   - Sizes: default, sm, lg, icon

2. **Card** (`card.tsx`)
   - Sub-components: CardHeader, CardTitle, CardDescription, CardContent, CardFooter

3. **Badge** (`badge.tsx`)
   - Variants: default, secondary, outline, destructive

### Component Patterns

**Card with Border Accent:**
```tsx
<Card className="border-l-4 border-l-primary">
  <CardHeader>
    <CardTitle>Title</CardTitle>
  </CardHeader>
  <CardContent>
    Content here
  </CardContent>
</Card>
```

**Button Group:**
```tsx
<div className="flex gap-2">
  <Button variant="default">Primary</Button>
  <Button variant="outline">Secondary</Button>
</div>
```

---

## Layout

### Container Component

Use the `Container` component (see `src/components/layout/Container.tsx`) for consistent page-level constraints:

```tsx
<Container>
  {/* Content automatically gets max-width and responsive padding */}
</Container>
```

### Max Width Guidelines

- **Primary content**: `max-w-7xl` (1280px)
- **Narrow content** (articles, forms): `max-w-3xl` (768px)
- **Wide content** (galleries): `max-w-screen-2xl` (1536px)

---

## Dark Mode

The design system is **dark mode by default**. The `.dark` class strategy is configured in `src/index.css` with shadcn theme variables.

- Background: `#0f0f0f` (very dark)
- Text colors use the gray scale for hierarchy
- Interactive elements use primary green for contrast

---

## Best Practices

1. **Mobile-first**: Always design for mobile, then add breakpoint classes
2. **Consistent spacing**: Use Tailwind spacing scale (4, 8, 12, 16, etc.)
3. **Color hierarchy**: Use gray scale strategically to guide user attention
4. **Accessibility**: Ensure sufficient contrast ratios (primary green passes WCAG AA)
5. **Component reuse**: Use shadcn components and extend them as needed

---

## Examples

### Responsive Card Grid

```tsx
<div className="grid grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-3">
  <Card>
    <CardHeader>
      <CardTitle className="text-primary">Project 1</CardTitle>
    </CardHeader>
    <CardContent>
      <p>Project description here</p>
    </CardContent>
  </Card>
  {/* More cards... */}
</div>
```

### Responsive Typography

```tsx
<div className="space-y-4">
  <h1 className="text-3xl md:text-4xl lg:text-5xl">
    Main Heading
  </h1>
  <p className="text-sm md:text-base lg:text-lg">
    Responsive paragraph text
  </p>
</div>
```

---

## File References

- **Tailwind Config**: `frontend/tailwind.config.ts`
- **Global CSS**: `frontend/src/index.css`
- **shadcn Components**: `frontend/src/components/ui/`
- **Utilities**: `frontend/src/lib/utils.ts` (cn helper)

---

*Last updated: 2025-10-08*
