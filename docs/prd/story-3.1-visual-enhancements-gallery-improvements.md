# Story 3.1: Visual Enhancements & Gallery Improvements

**Parent Epic:** Epic 3 - UI/UX Polish & Navigation

## User Story
**As a** portfolio visitor,
**I want** visually engaging project displays with images and carousels,
**so that** I can better preview and explore project work.

## Acceptance Criteria

### Project Card Visuals
- [ ] Project cards WITH images display first image as thumbnail
- [ ] Thumbnail uses consistent aspect ratio (16:9 or similar)
- [ ] Project cards WITHOUT images show gradient background + tech icons
- [ ] Gradient colors are deterministic based on project slug (same project = same colors)
- [ ] Tech icons are pulled from project's technology stack (2-3 prominent ones)
- [ ] Card visual area has consistent height across all cards
- [ ] Images use `object-cover` to fill space without distortion

### Modal Gallery Carousel
- [ ] Modal gallery implements carousel with navigation arrows
- [ ] Gallery has dot indicators showing total images and current position
- [ ] Images are displayed with fixed height (500-600px) container
- [ ] Images use `object-contain` to show full image without cropping
- [ ] Container has black background for letterboxing
- [ ] Portrait images (9:16) show with black bars on sides
- [ ] Landscape images (16:9) show with black bars on top/bottom
- [ ] Videos maintain same fixed height and layout consistency
- [ ] Carousel supports keyboard navigation (arrow keys)
- [ ] Carousel is touch-friendly on mobile devices

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


## Testing Requirements
- [ ] All carousel controls work with mouse/touch/keyboard
- [ ] Images maintain aspect ratios correctly
- [ ] Videos play correctly in modal carousel
- [ ] Cards without images show gradients + icons
- [ ] Same project always shows same gradient (deterministic)
- [ ] Responsive behavior tested on mobile/tablet/desktop
- [ ] Accessibility: Screen readers can navigate carousels
- [ ] Performance: No jank, smooth animations

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
