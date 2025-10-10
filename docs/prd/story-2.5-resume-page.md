# Story 2.5: Resume Page with PDF Download

**Status:** Pending

**As a** portfolio visitor,
**I want** a styled HTML resume page with PDF download option,
**so that** I can review qualifications online or download for offline review.

## Acceptance Criteria

- [ ] Resume page component created at `/resume` route
- [ ] Resume content structured with semantic HTML (sections for experience, education, skills, etc.)
- [ ] Resume styled to match portfolio design system (Tailwind + shadcn components)
- [ ] Resume layout is clean, scannable, and professional
- [ ] "Download PDF" button prominently displayed at top of page
- [ ] PDF file stored in public/ directory and served statically
- [ ] PDF download button triggers file download (not open in new tab)
- [ ] Resume page is responsive (readable on mobile, optimized for desktop)
- [ ] Resume content matches PDF content (no significant discrepancies)
- [ ] Page is accessible with proper heading hierarchy and semantic structure

## Task Breakdown

### 1. PDF Preparation
- [ ] Locate existing Resume.pdf in project root
- [ ] Review PDF content and quality
- [ ] Move Resume.pdf to frontend/public/ directory
- [ ] Verify PDF is <5MB file size
- [ ] Test PDF opens correctly in browser

### 2. Resume Data Structure
- [ ] Create frontend/src/data/resume.ts
- [ ] Define ResumeData interface with:
  - name, title, location, email, linkedin, github
  - summary (string)
  - experience (array of jobs)
  - education (array of degrees)
  - skills (array of skill categories)
  - certifications (optional array)
- [ ] Populate with actual resume content
- [ ] Ensure data matches PDF exactly

### 3. Resume Page Component
- [ ] Create frontend/src/pages/Resume.tsx
- [ ] Import Container from layout
- [ ] Import resume data
- [ ] Create page structure with semantic HTML
- [ ] Use proper heading hierarchy (h1, h2, h3)
- [ ] Style with Tailwind classes
- [ ] Match hacker minimalist design

### 4. Resume Header Section
- [ ] Create ResumeHeader component (or inline)
- [ ] Display name as h1
- [ ] Display title/role
- [ ] Display location
- [ ] Display contact links (email, LinkedIn, GitHub)
- [ ] Style contact links consistently
- [ ] Make links accessible (aria-labels)

### 5. Download PDF Button
- [ ] Create prominent "Download PDF" button at top
- [ ] Use shadcn Button component
- [ ] Use download icon from lucide-react
- [ ] Create anchor tag with download attribute
- [ ] Point href to /resume.pdf
- [ ] Style button to stand out (primary color)
- [ ] Add hover and focus states

### 6. Summary Section
- [ ] Create summary section with semantic <section>
- [ ] Use h2 heading "Summary" or "About"
- [ ] Display resume summary paragraph
- [ ] Style for readability (line-height, max-width)

### 7. Experience Section
- [ ] Create experience section
- [ ] Use h2 heading "Experience"
- [ ] Map over experience array
- [ ] For each job, display:
  - Job title and company (h3)
  - Employment dates
  - Location
  - Responsibilities/achievements (bullet list)
- [ ] Style dates and location consistently
- [ ] Use proper list semantics (<ul>)

### 8. Education Section
- [ ] Create education section
- [ ] Use h2 heading "Education"
- [ ] Map over education array
- [ ] For each degree, display:
  - Degree name and field (h3)
  - Institution name
  - Graduation date
  - GPA or honors (if applicable)
- [ ] Style consistently with experience section

### 9. Skills Section
- [ ] Create skills section
- [ ] Use h2 heading "Skills"
- [ ] Group skills by category (e.g., Languages, Frameworks, Tools)
- [ ] Use h3 for each category
- [ ] Display skills as comma-separated list or badges
- [ ] Use shadcn Badge component for skill tags
- [ ] Style badges consistently

### 10. Certifications Section (Optional)
- [ ] Create certifications section if applicable
- [ ] Use h2 heading "Certifications"
- [ ] List certifications with:
  - Certification name
  - Issuing organization
  - Date obtained
- [ ] Style consistently with other sections

### 11. Responsive Design
- [ ] Test resume page on mobile (< 640px)
- [ ] Ensure text is readable (font size ≥ 16px)
- [ ] Ensure button is easily tappable (min 44x44px)
- [ ] Test on tablet (640-1024px)
- [ ] Test on desktop (> 1024px)
- [ ] Adjust spacing/layout for each breakpoint
- [ ] Use Tailwind responsive classes (sm:, md:, lg:)

### 12. Accessibility
- [ ] Use semantic HTML5 elements (<header>, <section>, <article>)
- [ ] Ensure proper heading hierarchy (no skipped levels)
- [ ] Add aria-label to icon-only buttons
- [ ] Ensure links have descriptive text
- [ ] Test keyboard navigation (Tab through all links)
- [ ] Test with screen reader (VoiceOver or NVDA)
- [ ] Ensure color contrast meets WCAG AA standards
- [ ] Add focus indicators to all interactive elements

### 13. Route Configuration
- [ ] Open frontend/src/App.tsx
- [ ] Import Resume page component
- [ ] Add route: <Route path="/resume" element={<Resume />} />
- [ ] Verify route works in browser

### 14. Navigation Link
- [ ] Ensure navigation has link to /resume
- [ ] Verify link is styled consistently
- [ ] Verify active state shows on /resume page
- [ ] Test navigation from all pages

### 15. Testing
- [ ] Create frontend/src/pages/Resume.test.tsx
- [ ] Test resume page renders without crashing
- [ ] Test all sections render correctly
- [ ] Test download button has correct href
- [ ] Test download attribute is present
- [ ] Test contact links are present and correct
- [ ] Test responsive behavior (mock viewport sizes)
- [ ] Test keyboard navigation

### 16. Verification
- [ ] Navigate to /resume in browser
- [ ] Verify all content displays correctly
- [ ] Verify styling matches design system
- [ ] Click "Download PDF" button
- [ ] Verify PDF downloads (not opens in new tab)
- [ ] Verify PDF content matches page content
- [ ] Test on mobile device or Chrome DevTools mobile emulation
- [ ] Test with keyboard only (no mouse)
- [ ] Run Lighthouse accessibility audit (score ≥ 90)
- [ ] All tests pass

## Files to Create

- `/frontend/src/data/resume.ts` - Resume data structure
- `/frontend/src/pages/Resume.tsx` - Resume page component
- `/frontend/src/pages/Resume.test.tsx` - Resume tests

## Files to Move

- `/Resume.pdf` → `/frontend/public/resume.pdf`

## Files to Modify

- `/frontend/src/App.tsx` - Add /resume route

## Dependencies

- Story 1.3 complete (routing setup)
- Existing Resume.pdf available

## Technical Notes

### Download Button Implementation
```tsx
<a
  href="/resume.pdf"
  download="Matt-Hulme-Resume.pdf"
  className="inline-flex items-center gap-2"
>
  <Button>
    <Download className="h-4 w-4" />
    Download PDF
  </Button>
</a>
```

### Semantic HTML Structure
```tsx
<main className="py-8 md:py-12">
  <Container>
    <header>
      <h1>{name}</h1>
      <p>{title}</p>
      {/* Contact info */}
    </header>

    <section aria-labelledby="summary-heading">
      <h2 id="summary-heading">Summary</h2>
      <p>{summary}</p>
    </section>

    <section aria-labelledby="experience-heading">
      <h2 id="experience-heading">Experience</h2>
      {/* Experience list */}
    </section>
  </Container>
</main>
```

### Design Considerations
- Use consistent spacing between sections
- Use gray-scale colors for dates/locations
- Use primary green for headings
- Use monospace font to match site aesthetic
- Keep line length readable (max-w-4xl)
- Use sufficient white space
