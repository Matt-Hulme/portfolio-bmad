# Story 2.6: Contact Page

**Status:** Pending

**As a** portfolio visitor,
**I want** a contact page with links to professional networks and email,
**so that** I can easily reach out through my preferred communication channel.

## Acceptance Criteria

- [ ] Contact page component created at `/contact` route
- [ ] Page displays clear heading and brief contact invitation text
- [ ] Contact links displayed for: X (Twitter), LinkedIn, Email
- [ ] Each link includes appropriate icon and label
- [ ] Email link uses `mailto:` protocol
- [ ] Social links open in new tab with `rel="noopener noreferrer"`
- [ ] Links are styled consistently with portfolio design (hover states, focus indicators)
- [ ] Page layout is clean and focused on contact options
- [ ] Page is responsive and accessible
- [ ] Optional: Display brief "preferred contact method" guidance if applicable

## Task Breakdown

### 1. Contact Data Structure
- [ ] Create frontend/src/data/contact.ts
- [ ] Define ContactLink interface (type, label, url, icon)
- [ ] Export contact links array with Email, LinkedIn, X (Twitter)
- [ ] Include actual contact URLs/emails

### 2. Contact Page Component
- [ ] Create frontend/src/pages/Contact.tsx
- [ ] Import Container from layout
- [ ] Import contact data
- [ ] Create page structure with semantic HTML
- [ ] Use proper heading hierarchy (h1 for page title)
- [ ] Style with Tailwind classes
- [ ] Match hacker minimalist design

### 3. Contact Header Section
- [ ] Display page title as h1 ("Get in Touch", "Contact", etc.)
- [ ] Add brief invitation text (1-2 sentences)
- [ ] Style heading with primary green color
- [ ] Style invitation text with gray-400

### 4. Contact Links Display
- [ ] Map over contact links array
- [ ] For each link, display:
  - Icon (from lucide-react or custom)
  - Label (e.g., "Email", "LinkedIn", "X")
  - Link destination
- [ ] Style links as large, clickable cards or list items
- [ ] Add hover and focus states
- [ ] Ensure sufficient touch target size (min 44x44px)

### 5. Email Link
- [ ] Use `mailto:` protocol (e.g., `mailto:matt@example.com`)
- [ ] Include Mail icon from lucide-react
- [ ] Label clearly as "Email"
- [ ] Ensure link opens default email client

### 6. Social Links
- [ ] LinkedIn link opens in new tab (`target="_blank"`)
- [ ] X (Twitter) link opens in new tab
- [ ] Both use `rel="noopener noreferrer"` for security
- [ ] Use appropriate icons (LinkedIn icon, X/Twitter icon)
- [ ] Style consistently with other links

### 7. Responsive Design
- [ ] Test on mobile (< 640px)
- [ ] Ensure links stack vertically on small screens
- [ ] Test on tablet (640-1024px)
- [ ] Test on desktop (> 1024px)
- [ ] Use Tailwind responsive classes (sm:, md:, lg:)
- [ ] Ensure comfortable spacing between links

### 8. Accessibility
- [ ] Use semantic HTML (<nav> or <ul> for links)
- [ ] Ensure proper heading hierarchy
- [ ] Add aria-label to icon-only elements if needed
- [ ] Ensure links have descriptive text
- [ ] Test keyboard navigation (Tab through links)
- [ ] Test with screen reader (VoiceOver or NVDA)
- [ ] Ensure color contrast meets WCAG AA
- [ ] Add focus indicators to all links

### 9. Route Configuration
- [ ] Open frontend/src/App.tsx
- [ ] Import Contact page component
- [ ] Add route: <Route path="/contact" element={<Contact />} />
- [ ] Verify route works in browser

### 10. Navigation Link
- [ ] Ensure navigation has link to /contact
- [ ] Verify link is styled consistently
- [ ] Verify active state shows on /contact page
- [ ] Test navigation from all pages

### 11. Testing
- [ ] Create frontend/src/pages/Contact.test.tsx
- [ ] Test contact page renders without crashing
- [ ] Test all contact links are present
- [ ] Test email link has correct mailto: href
- [ ] Test social links have correct target and rel attributes
- [ ] Test keyboard navigation
- [ ] Test responsive behavior (mock viewport sizes)

### 12. Verification
- [ ] Navigate to /contact in browser
- [ ] Verify all content displays correctly
- [ ] Verify styling matches design system
- [ ] Click email link and verify email client opens
- [ ] Click LinkedIn link and verify it opens in new tab
- [ ] Click X link and verify it opens in new tab
- [ ] Test on mobile device or Chrome DevTools mobile emulation
- [ ] Test with keyboard only (no mouse)
- [ ] Run Lighthouse accessibility audit (score ≥ 90)
- [ ] All tests pass

## Files to Create

- `/frontend/src/data/contact.ts` - Contact links data
- `/frontend/src/pages/Contact.tsx` - Contact page component
- `/frontend/src/pages/Contact.test.tsx` - Contact tests

## Files to Modify

- `/frontend/src/App.tsx` - Add /contact route

## Dependencies

- Story 1.3 complete (routing setup)
- lucide-react icons installed

## Technical Notes

### Contact Data Example
```typescript
// contact.ts
import { Mail, Linkedin, Twitter } from 'lucide-react';

export interface ContactLink {
  type: 'email' | 'social';
  label: string;
  url: string;
  icon: typeof Mail;
}

export const contactLinks: ContactLink[] = [
  {
    type: 'email',
    label: 'Email',
    url: 'mailto:matt@example.com',
    icon: Mail,
  },
  {
    type: 'social',
    label: 'LinkedIn',
    url: 'https://linkedin.com/in/matt-hulme',
    icon: Linkedin,
  },
  {
    type: 'social',
    label: 'X (Twitter)',
    url: 'https://x.com/matthulme',
    icon: Twitter,
  },
];
```

### Component Structure
```tsx
<main className="py-8 md:py-12">
  <Container>
    <div className="space-y-8">
      <header>
        <h1>Get in Touch</h1>
        <p>Feel free to reach out through any of these channels.</p>
      </header>

      <nav>
        <ul className="space-y-4">
          {contactLinks.map(link => (
            <li key={link.label}>
              <a href={link.url} {...linkProps}>
                <link.icon />
                {link.label}
              </a>
            </li>
          ))}
        </ul>
      </nav>
    </div>
  </Container>
</main>
```

### Design Considerations
- Use consistent spacing between links
- Use primary green for icons or hover states
- Use monospace font to match site aesthetic
- Keep layout centered and focused
- Ensure touch targets are large enough (min 44x44px)
- Use sufficient padding inside link cards/buttons
