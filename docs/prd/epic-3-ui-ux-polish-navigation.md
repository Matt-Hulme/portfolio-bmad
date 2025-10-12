# Epic 3: UI/UX Polish & Navigation

**Epic Goal:** Enhance the user experience with visual improvements to project displays, a proper home page, persistent navigation, improved mobile menu visibility, and terminal-inspired visual styling that adds personality and interactivity to the portfolio.

**Value Delivered:** At the end of this epic, the portfolio has engaging project visuals with carousels and thumbnails, a professional landing page, consistent navigation across all views, better mobile usability, and distinctive terminal-inspired styling that makes the site memorable and engaging while maintaining professionalism.

## Story 3.1: Visual Enhancements & Gallery Improvements

**As a** portfolio visitor,
**I want** visually engaging project displays with images and carousels,
**so that** I can better preview and explore project work.

### Acceptance Criteria

#### Project Card Visuals
1. Project cards WITH images display first image as thumbnail
2. Thumbnail uses consistent aspect ratio (16:9 or similar)
3. Project cards WITHOUT images show gradient background + tech icons
4. Gradient colors are deterministic based on project slug (same project = same colors)
5. Tech icons are pulled from project's technology stack (2-3 prominent ones)
6. Card visual area has consistent height across all cards
7. Images use `object-cover` to fill space without distortion

#### Modal Gallery Carousel
8. Modal gallery implements carousel with navigation arrows
9. Gallery has dot indicators showing total images and current position
10. Images are displayed with fixed height (500-600px) container
11. Images use `object-contain` to show full image without cropping
12. Container has black background for letterboxing
13. Portrait images (9:16) show with black bars on sides
14. Landscape images (16:9) show with black bars on top/bottom
15. Videos maintain same fixed height and layout consistency
16. Carousel supports keyboard navigation (arrow keys)
17. Carousel is touch-friendly on mobile devices

### Technical Notes
- Use existing image data from backend API
- Consider using a lightweight carousel library (e.g., embla-carousel, swiper) or build custom
- Ensure all interactions are performant (no layout shifts, smooth transitions)
- Maintain accessibility standards for all carousel controls
- Gradient generation should be deterministic (same slug = same colors every time)
- Tech icons should be mapped from project technologies to visual icons

## Story 3.2: Home Page & Persistent Navigation

**As a** portfolio visitor,
**I want** a clear landing page and consistent navigation,
**so that** I can easily orient myself and access all sections of the portfolio.

### Acceptance Criteria

1. New Home page created at `/` route with placeholder content
2. Home page displays: Name, title/tagline, and quick navigation to Projects and Resume
3. Home page styled consistently with portfolio design system
4. Navigation updated to show all three routes: Home | Projects | Resume
5. Navigation is persistent - always shows all links regardless of current page
6. Active route is visually indicated in navigation on all pages
7. Mobile hamburger menu displays all three navigation items
8. Mobile hamburger menu has proper visibility/contrast (currently invisible until hover)
9. Mobile menu closes when navigation item is clicked
10. `/projects` route created as alias/redirect to Projects view (optional for future expansion)
11. All navigation tests updated to reflect new structure
12. All navigation tests pass

### Technical Notes
- Home page should be a simple placeholder that can be expanded later with hero section, featured projects, etc.
- Keep implementation minimal to avoid scope creep - focus on structure over content
- Mobile hamburger visibility issue likely a contrast/color problem with current theme

## Story 3.3: Terminal-Style Visual Enhancements

**As a** portfolio visitor,
**I want** interactive terminal-inspired styling,
**so that** the portfolio feels distinctive and reflects a developer's personality.

### Acceptance Criteria

1. Terminal-inspired color scheme evaluated and applied if appropriate (optional color tweaks)
2. Monospace font usage expanded where appropriate (code blocks, tech stacks, etc.)
3. Terminal-style prompts or indicators added to key UI elements ($ prompts, > indicators, etc.)
4. Hover states enhanced with terminal-inspired effects (cursor changes, glow effects, etc.)
5. Command-line inspired interactions added where appropriate (e.g., "$ view project" on cards)
6. ASCII art or terminal-style borders considered for section separators (if tasteful)
7. Typing animation or cursor blink effects evaluated for headings (if not distracting)
8. Focus states maintain terminal aesthetic while meeting accessibility standards
9. Terminal styling is consistent across all pages and components
10. Changes are tested on mobile and desktop
11. Performance is not negatively impacted by animation effects
12. All existing tests still pass after styling changes

### Technical Notes
- **Goal:** Add personality without sacrificing professionalism
- Balance is key - terminal aesthetic should enhance, not overwhelm
- Keep animations subtle and performant
- Maintain WCAG AA accessibility standards
- Consider using CSS custom properties for easy theme adjustments
- Test with users to ensure styling enhances rather than detracts from content

---
