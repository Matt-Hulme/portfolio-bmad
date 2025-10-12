# Story 3.1: Visual Enhancements & Gallery Improvements

**Parent Epic:** Epic 3 - UI/UX Polish & Navigation

## User Story
**As a** portfolio visitor,
**I want** visually engaging project displays with images and carousels,
**so that** I can better preview and explore project work.

## Acceptance Criteria

### Project Card Visuals
- [x] Project cards WITH images display first image as thumbnail
- [x] Thumbnail uses consistent aspect ratio (16:9 or similar)
- [ ] ~~Project cards WITHOUT images show gradient background + tech icons~~ (Removed - see Phase 3)
- [ ] Cards without images have no visual area (text content only)
- [x] ~~Gradient colors are deterministic based on project slug~~ (No longer applicable)
- [x] ~~Tech icons are pulled from project's technology stack~~ (No longer applicable)
- [ ] Card heights vary naturally based on content (images vs no images)
- [x] Images use `object-cover` to fill space without distortion
- [ ] Images stay within rounded card borders (no bleeding)
- [ ] Project titles use full title from API data

### Modal Gallery Carousel
- [x] Modal gallery implements carousel with navigation arrows
- [x] Gallery has dot indicators showing total images and current position
- [x] Images are displayed with fixed height (500-600px) container
- [x] Images use `object-contain` to show full image without cropping
- [x] Container has black background for letterboxing
- [x] Portrait images (9:16) show with black bars on sides
- [x] Landscape images (16:9) show with black bars on top/bottom
- [x] Videos maintain same fixed height and layout consistency
- [x] Carousel supports keyboard navigation (arrow keys)
- [x] Carousel is touch-friendly on mobile devices
- [ ] Navigation arrows are subtle with color states (green=active, grey=disabled)
- [ ] Gallery positioned prominently above roles/technologies section

### Modal Content Layout
- [ ] Technologies displayed as badge tags (not `$ ** tech **` format)
- [ ] Role badges use green color scheme
- [ ] Technology badges use blue/purple outline color scheme
- [ ] Clear visual distinction between role and technology tags

## Technical Approach

### Components to Create/Modify
1. `HeroCarousel.tsx` - New component for featured projects
2. `ProjectCard.tsx` - Enhanced with thumbnail/gradient logic
3. `ProjectDetailModal.tsx` - Add carousel functionality to gallery
4. `GradientGenerator.ts` - Utility for deterministic gradient generation

### Libraries to Consider
- **embla-carousel-react** - Lightweight, accessible carousel
- **swiper** - Feature-rich, mobile-friendly
- **Custom implementation** - Full control, lighter weight

### Image Handling
- Cards: `aspect-ratio: 16/9`, `object-fit: cover`
- Modal: `height: 600px`, `object-fit: contain`, `background: black`

### Gradient Algorithm
```typescript
function generateGradient(slug: string): string {
  // Use slug hash to generate consistent colors
  const hash = slug.split('').reduce((acc, char) => acc + char.charCodeAt(0), 0);
  const hue1 = hash % 360;
  const hue2 = (hash * 137) % 360; // Golden angle for good color separation
  return `linear-gradient(135deg, hsl(${hue1}, 70%, 50%), hsl(${hue2}, 70%, 30%))`;
}
```

### Tech Icon Selection
- Parse project.technologies array
- Map technology names to icon components (lucide-react or similar)
- Display 2-3 most prominent/recognizable icons
- Fallback to generic code icon if no match

## Implementation Tasks

### Phase 1: Modal Gallery Carousel (Foundation)
1. Install carousel library (embla-carousel-react recommended)
2. Update ProjectDetailModal with carousel wrapper
3. Add navigation arrows (ChevronLeft, ChevronRight icons)
4. Add dot indicators for image position
5. Implement keyboard navigation
6. Style with fixed height container and black background
7. Test with various image aspect ratios
8. Test with videos

### Phase 2: Project Card Thumbnails
1. Add visual area to ProjectCard component
2. Check if project has images
3. If yes: Display first image with aspect-ratio CSS
4. If no: Generate gradient + select tech icons
5. Ensure consistent card heights
6. Test responsive behavior

### Phase 3: Visual Refinements & Polish
1. Remove Brainstormer image from backend data (keep only video)
2. Fix card height consistency - remove visual area entirely for cards without images
3. Fix image bleeding/borders - ensure images stay within rounded card borders
4. Fix project titles - use full project title from API, not image filename
5. Update modal carousel navigation buttons - more subtle styling, green when active, grey when disabled
6. Convert technology display from `$ ** tech **` format to badge tags matching roles
7. Improve tag styling - distinct visual schemes for roles vs technologies (roles: green, technologies: blue/purple outline)
8. Reorder modal content - move gallery above roles/technologies for prominence


## Testing Requirements
- [x] All carousel controls work with mouse/touch/keyboard
- [x] Images maintain aspect ratios correctly
- [x] Videos play correctly in modal carousel
- [x] Cards without images show gradients + icons
- [x] Same project always shows same gradient (deterministic)
- [x] Responsive behavior tested on mobile/tablet/desktop
- [x] Accessibility: Screen readers can navigate carousels
- [x] Performance: No jank, smooth animations

## Out of Scope
- Backend changes (using existing image data)
- Adding `featured` flag to projects (future enhancement)
- Image lazy loading optimization (can be added later)
- Lightbox/fullscreen mode for images (future enhancement)

## Success Metrics
- Projects with images are more visually prominent
- Users can easily browse multiple project images
- Portfolio feels more polished and professional
- No negative performance impact
- Accessibility standards maintained

---

## Implementation Summary

**Status:** 🔄 IN PROGRESS (Phase 3 - Refinements)

**Commits:**
1. `581e318` - feat: Implement modal gallery carousel with fixed height container
2. `9c1c07e` - feat: Add visual thumbnails to project cards
3. `c2083c1` - refactor: Remove Brainstormer poster image from seed data
4. `ddc9624` - refactor: Remove visual area from cards without images
5. `c0222b1` - fix: Add rounded corners to card images
6. `063aaa2` - feat: Display project slugs as titles in Title Case
7. `0067ecd` - fix: Preserve case in image filenames for correct URLs

**Files Created:**
- `frontend/src/components/projects/ImageCarousel.tsx` - Carousel component
- `frontend/src/lib/gradientGenerator.ts` - Deterministic gradient utility

**Files Modified:**
- `frontend/src/components/projects/ProjectDetailModal.tsx` - Uses ImageCarousel
- `frontend/src/components/projects/ProjectCard.tsx` - Added visual thumbnails
- `frontend/src/test/setup.ts` - Added browser API mocks for carousel tests
- `frontend/package.json` - Added embla-carousel-react dependency

**Test Results:**
- All 86 tests passing
- ProjectDetailModal: 14/14 tests ✓
- ProjectCard: 12/12 tests ✓

**Key Features Delivered:**
- Modal gallery with embla-carousel-react (600px fixed height, black letterboxing)
- Navigation arrows with proper disabled states
- Dot indicators for image position tracking
- Keyboard navigation (arrow keys)
- Touch-friendly mobile support
- Video support in carousel
- Project cards with 16:9 thumbnails (with images)
- Deterministic gradient backgrounds (without images)
- Generic tech icons (Code2, Palette, Boxes) on gradient cards
- Hover effects on cards (scale effect on thumbnails)
- Lazy loading for images
