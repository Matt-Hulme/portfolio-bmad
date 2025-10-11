# Story 3.1: Home Page & Persistent Navigation

**Epic:** Epic 3 - UI/UX Polish & Navigation

**As a** portfolio visitor,
**I want** a clear landing page and consistent navigation,
**so that** I can easily orient myself and access all sections of the portfolio.

## Acceptance Criteria

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

## Technical Implementation

### Files to Create/Modify

**Create:**
- `frontend/src/pages/Home.tsx` - Simple landing page component

**Modify:**
- `frontend/src/routes.tsx` - Update routes array and navLinks
- `frontend/src/components/layout/Navigation.tsx` - Fix mobile hamburger visibility
- `frontend/src/components/layout/Navigation.test.tsx` - Update tests for 3 nav items

### Home Page Structure

```tsx
export function Home() {
  return (
    <main className="py-12 md:py-20">
      <Container>
        <div className="flex flex-col items-center text-center space-y-8">
          {/* Name */}
          <h1 className="text-5xl md:text-6xl font-bold font-mono text-primary">
            Matt Hulme
          </h1>

          {/* Title/Tagline */}
          <p className="text-xl md:text-2xl text-gray-300 max-w-2xl">
            Applied AI Engineer & Full-Stack Developer
          </p>

          {/* Quick Navigation */}
          <div className="flex gap-4 pt-4">
            <Link to="/projects">
              <Button size="lg">View Projects</Button>
            </Link>
            <Link to="/resume">
              <Button size="lg" variant="outline">View Resume</Button>
            </Link>
          </div>
        </div>
      </Container>
    </main>
  );
}
```

### Navigation Updates

**routes.tsx changes:**
```tsx
export const navLinks = [
  { path: '/', label: 'Home' },
  { path: '/projects', label: 'Projects' },
  { path: '/resume', label: 'Resume' },
];
```

**Note:** Currently Home route loads Projects page. After this story, Home will be its own page and we can optionally create `/projects` as a separate route or keep it as is.

### Mobile Hamburger Visibility Fix

The hamburger menu is currently invisible until hover. This is likely a contrast issue. Check:
- `Navigation.tsx` menu button styling
- Ensure icon has proper color/contrast
- May need to adjust from `text-foreground` to `text-primary` or add explicit color

## Task Breakdown

1. Create `frontend/src/pages/Home.tsx` with placeholder landing page
2. Create `frontend/src/pages/Home.test.tsx` with basic tests
3. Update `frontend/src/routes.tsx`:
   - Add Home route at `/`
   - Move Projects to separate `/projects` route (or keep as is for now)
   - Update navLinks to include Home
4. Fix mobile hamburger visibility in `Navigation.tsx`
5. Update `Navigation.test.tsx` to expect 3 nav items instead of 2
6. Test navigation on mobile and desktop
7. Verify active states work correctly on all pages

## Testing Plan

- [ ] Home page renders with correct content
- [ ] Navigation shows Home | Projects | Resume on all pages
- [ ] Active route is highlighted correctly
- [ ] Mobile hamburger menu is visible without hover
- [ ] Mobile menu displays all 3 items
- [ ] Clicking navigation items navigates correctly
- [ ] All existing tests still pass (update count from 2 to 3 nav items)

## Notes

- Keep Home page simple - it's a placeholder that can be enhanced later
- Focus on structure and navigation consistency
- Mobile hamburger visibility is a quick win for UX
- Consider if `/projects` should be separate route or if Home continues to serve Projects (decision can be deferred)

---
