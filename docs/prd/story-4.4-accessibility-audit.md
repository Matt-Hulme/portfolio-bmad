# Story 4.4: Accessibility Audit & Improvements (Optional)

**Epic:** Epic 4 - Production Deployment & Quality Assurance
**Status:** Not Started (Optional)
**Branch:** `story/4.4-accessibility-audit`

## User Story

**As a** portfolio visitor with accessibility needs,
**I want** the site to meet WCAG 2.1 AA standards,
**so that** I can fully experience and navigate the portfolio regardless of abilities.

## Context

This story performs an accessibility audit and fixes any critical issues to ensure the portfolio is usable by people with disabilities. This story is OPTIONAL and may be deferred if the site is already sufficiently accessible.

**Note:** Some accessibility work was done in earlier epics (keyboard navigation, ARIA labels on modals, semantic HTML). This story verifies and completes that work.

## Acceptance Criteria

### Automated Accessibility Scan
- [ ] Automated scan performed using axe-DevTools (Chrome DevTools MCP or browser extension)
- [ ] Alternative: Use Lighthouse accessibility audit
- [ ] All critical violations resolved
- [ ] All serious violations resolved
- [ ] Moderate violations addressed or documented as acceptable

### Color Contrast
- [ ] Normal text meets WCAG AA (4.5:1 contrast ratio)
- [ ] Large text meets WCAG AA (3:1 contrast ratio)
- [ ] Interactive elements have sufficient contrast
- [ ] Focus indicators visible against all backgrounds
- [ ] Test with contrast checker tool

### Keyboard Accessibility
- [ ] All interactive elements keyboard accessible (Tab, Enter, Escape)
- [ ] Tab order is logical and follows visual flow
- [ ] No keyboard traps
- [ ] Skip to main content link works
- [ ] Modal keyboard navigation works (Tab cycles within modal)

### Focus Management
- [ ] Focus indicators clearly visible on all focusable elements
- [ ] Focus returns to trigger element when modal closes
- [ ] Focus moves to modal when opened
- [ ] Custom focus styles meet contrast requirements

### ARIA Labels & Roles
- [ ] Modal has proper role="dialog"
- [ ] Modal has aria-labelledby or aria-label
- [ ] Form controls have proper labels
- [ ] Buttons have descriptive aria-labels where text isn't sufficient
- [ ] Navigation landmarks properly labeled

### Images & Media
- [ ] All images have appropriate alt text
- [ ] Decorative images have alt=""
- [ ] Project thumbnails have descriptive alt text
- [ ] Icons used for links have aria-labels

### Headings & Structure
- [ ] Heading hierarchy is logical (h1 → h2 → h3, no skipping)
- [ ] Only one h1 per page
- [ ] Headings describe content accurately
- [ ] Semantic HTML used (nav, main, footer, article, etc.)

### Screen Reader Testing
- [ ] Test with VoiceOver (macOS) or NVDA (Windows)
- [ ] Homepage navigable with screen reader
- [ ] Project cards announce correctly
- [ ] Modal content readable with screen reader
- [ ] Navigation works with screen reader
- [ ] Forms/filters announce correctly

### Accessibility Documentation
- [ ] Document WCAG level achieved (A, AA, or AAA)
- [ ] Document known issues and workarounds
- [ ] Add accessibility statement to site (if required)

## Technical Implementation

### Tools to Use

**Automated Testing:**
- Chrome DevTools → Lighthouse → Accessibility audit
- axe DevTools Chrome extension
- Chrome DevTools MCP (if available)
- WAVE browser extension

**Manual Testing:**
- VoiceOver (macOS): Cmd+F5
- NVDA (Windows): Free download
- Keyboard navigation: Unplug mouse!
- Color contrast checker: WebAIM Contrast Checker

### Common Issues to Fix

**Color Contrast:**
```css
/* Before: Low contrast */
.text-gray-400 { color: #9ca3af; } /* May fail on dark bg */

/* After: Higher contrast */
.text-gray-300 { color: #d1d5db; } /* Better contrast */
```

**Focus Indicators:**
```css
/* Ensure visible focus */
.focus-visible:ring-2 {
  ring-color: theme('colors.primary');
  ring-offset: 2px;
}
```

**ARIA Labels:**
```tsx
<button
  aria-label="Close project details modal"
  onClick={onClose}
>
  <X />
</button>

<img
  src={project.thumbnail}
  alt={`Screenshot of ${project.title} project`}
/>
```

### Example Fixes

**Modal Accessibility:**
```tsx
<Dialog
  role="dialog"
  aria-labelledby="project-title"
  aria-describedby="project-description"
  onClose={handleClose}
>
  <DialogTitle id="project-title">
    {project.title}
  </DialogTitle>
  <DialogDescription id="project-description">
    {project.description}
  </DialogDescription>
</Dialog>
```

**Skip Link:**
```tsx
<a
  href="#main-content"
  className="sr-only focus:not-sr-only focus:absolute focus:top-4 focus:left-4"
>
  Skip to main content
</a>

<main id="main-content" tabIndex={-1}>
  {/* Content */}
</main>
```

## Prerequisites

### Before Starting
- [ ] Chrome DevTools or axe extension installed
- [ ] Access to VoiceOver or NVDA for screen reader testing
- [ ] Understanding of WCAG 2.1 AA guidelines

## Testing Process

### 1. Automated Scan
1. Open site in Chrome
2. Open DevTools → Lighthouse
3. Run Accessibility audit
4. Review issues
5. Fix critical/serious issues
6. Re-run to verify

### 2. Keyboard Testing
1. Unplug mouse
2. Tab through entire site
3. Verify all interactive elements reachable
4. Test modal interactions
5. Test form submissions
6. Verify no keyboard traps

### 3. Screen Reader Testing
1. Enable VoiceOver/NVDA
2. Navigate homepage
3. Open project modal
4. Test filters
5. Navigate to resume
6. Verify all content announced

### 4. Contrast Testing
1. Use WebAIM Contrast Checker
2. Test all text/background combinations
3. Test focus indicators
4. Test buttons and links
5. Fix any failures

## Running Accessibility Tests

```bash
# Run Lighthouse accessibility audit
npx lighthouse http://localhost:5173 --only-categories=accessibility --view

# Run axe-core tests (if integrated)
npm run test:a11y

# Manual keyboard testing
# 1. Unplug mouse
# 2. Press Tab repeatedly
# 3. Test Enter, Escape, Arrow keys
```

## Definition of Done

- [ ] Automated accessibility scan passes (or issues documented)
- [ ] All critical WCAG violations fixed
- [ ] Keyboard navigation fully functional
- [ ] Color contrast meets WCAG AA
- [ ] Screen reader testing completed
- [ ] Focus management works correctly
- [ ] ARIA labels appropriate
- [ ] Accessibility documentation added

## Deprioritization Criteria

**This story may be DEFERRED if:**
- No critical accessibility issues found in quick scan
- Site already keyboard accessible (test: can you tab through everything?)
- Color contrast already meets WCAG AA
- Time constraints require focusing on Stories 4.2-4.3 first

**Minimum viable accessibility** (already likely implemented):
- ✅ Semantic HTML (nav, main, footer)
- ✅ Keyboard navigation works
- ✅ Modal has proper ARIA
- ✅ Skip to content link

## Dependencies

**Requires:**
- Story 4.2: E2E Test Suite - Core Flows (Recommended)
- Story 4.3: E2E Test Suite - Filtering (Recommended)

**Enables:**
- Story 4.5: Production Deployment (accessibility tested before launch)

## Notes

- **WCAG 2.1 Levels:**
  - **A** (minimum): Basic accessibility
  - **AA** (target): Standard for most sites
  - **AAA** (enhanced): Beyond typical requirements

- **Quick Wins:**
  - Add alt text to images
  - Ensure sufficient color contrast
  - Add aria-labels to icon buttons
  - Verify keyboard navigation

- **May Already Be Done:**
  - Previous epics included accessibility considerations
  - Modal already has proper ARIA roles
  - Navigation already semantic
  - Forms already have labels

## Success Metrics

- ✅ Zero critical WCAG violations
- ✅ Lighthouse accessibility score > 90
- ✅ All functionality usable with keyboard only
- ✅ Screen reader can navigate entire site
- ✅ Color contrast meets WCAG AA

## Resources

- [WCAG 2.1 Quick Reference](https://www.w3.org/WAI/WCAG21/quickref/)
- [WebAIM Contrast Checker](https://webaim.org/resources/contrastchecker/)
- [axe DevTools Extension](https://www.deque.com/axe/devtools/)
- [ARIA Authoring Practices](https://www.w3.org/WAI/ARIA/apg/)
