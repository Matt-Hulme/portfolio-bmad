# User Interface Design Goals

## Overall UX Vision

The portfolio should feel like a curated gallery—clean, focused, and professional. Emphasis on content over decoration. Navigation should be intuitive and unobtrusive. The modal-based project detail pattern creates a focused viewing experience without losing context of the overall portfolio. Every interaction should reinforce the perception of technical competence and attention to detail.

## Key Interaction Paradigms

- **Card-based browsing**: Grid of project cards as primary discovery mechanism
- **Modal-based detail view**: Focus on individual project without navigation overhead
- **Filter-driven exploration**: Dynamic filtering allows users to slice by technology or role
- **Keyboard-first accessibility**: All interactions must be keyboard-navigable (Tab, Enter, Escape)
- **Responsive-first approach**: Mobile experience is co-equal with desktop, not an afterthought

## Core Screens and Views

1. **Home + Projects Grid** (combined landing page)
2. **Project Detail Modal** (overlay, not routed)
3. **Resume Page** (`/resume`)
4. **Contact Page** (`/contact`)

## Accessibility: WCAG AA

Target WCAG 2.1 Level AA compliance with focus on keyboard navigation, semantic HTML, proper ARIA labels for modals, and sufficient color contrast.

## Branding

**Design Direction: "Hacker Minimalist"**

Clean terminal/hacker aesthetic with muted green accents on dark background. Professional and modern while signaling technical depth. Key characteristics:

- **Color Palette**: Muted green (#7fda89) as primary accent on very dark background (#0f0f0f)
- **Typography**: Monospace fonts (SF Mono, Courier New) for terminal feel
- **Visual Elements**: Left border accents on cards, `$` prompt on tech lines, subtle hover effects
- **Visual Hierarchy**: Green used strategically for interactive elements and accents—most content stays in comfortable gray tones to avoid overwhelming the page
- **Philosophy**: Terminal touches without overwhelming; content over decoration

Use shadcn/ui component library as baseline, customized with terminal-inspired styling via Tailwind.

## Target Platforms: Web Responsive

Optimized for desktop, tablet, and mobile browsers. Single responsive implementation covering all breakpoints. No native mobile app or platform-specific versions.

---
