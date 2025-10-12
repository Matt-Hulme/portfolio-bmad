# Performance Monitoring

This document describes the performance monitoring setup for the portfolio site.

## Overview

We use Lighthouse CI and Core Web Vitals tracking to ensure the site maintains high performance standards.

## Tools

### Lighthouse CI
Automated performance testing with configurable budgets and assertions.

**Configuration:** `lighthouserc.js`

**Run locally:**
```bash
npm run lighthouse
```

This will:
1. Build the production bundle
2. Start a preview server
3. Run Lighthouse on 3 key pages (home, projects, resume)
4. Assert against performance budgets
5. Upload reports to temporary storage

### Core Web Vitals

Real user monitoring (RUM) for production performance tracking.

**Metrics tracked:**
- **LCP** (Largest Contentful Paint): Loading performance - Target: <2.5s
- **INP** (Interaction to Next Paint): Interactivity - Target: <200ms
- **CLS** (Cumulative Layout Shift): Visual stability - Target: <0.1
- **FCP** (First Contentful Paint): First paint - Target: <1.8s
- **TTFB** (Time to First Byte): Server response - Target: <800ms

**Implementation:** `src/lib/reportWebVitals.ts`

In development, metrics are logged to console. In production, they can be sent to an analytics service.

## Performance Budgets

### Category Scores (Lighthouse)
- Performance: ≥90
- Accessibility: ≥95
- Best Practices: ≥90
- SEO: ≥90

### Core Web Vitals Targets
- First Contentful Paint: <1.8s
- Largest Contentful Paint: <2.5s
- Cumulative Layout Shift: <0.1
- Total Blocking Time: <300ms
- Speed Index: <3s

### Resource Budgets
- JavaScript: <300KB
- CSS: <50KB
- Images: <500KB
- Fonts: <100KB

## Running Lighthouse CI

### Full Test (Build + Test + Upload)
```bash
npm run lighthouse
```

### Individual Steps
```bash
# 1. Collect data only
npm run lighthouse:collect

# 2. Assert against budgets
npm run lighthouse:assert

# 3. Upload reports
npm run lighthouse:upload
```

## Viewing Reports

After running `npm run lighthouse`, the temporary public storage link will be displayed in the terminal. Reports include:
- Performance scores for each page
- Core Web Vitals metrics
- Resource breakdown
- Opportunities for improvement
- Diagnostics

## Integration with CI/CD

The Lighthouse CI configuration is ready to be integrated into GitHub Actions or other CI/CD pipelines. Add the following to your workflow:

```yaml
- name: Run Lighthouse CI
  run: |
    npm ci
    npm run lighthouse
```

## Monitoring in Production

To enable Core Web Vitals tracking in production:

1. **Google Analytics**: Uncomment the gtag section in `reportWebVitals.ts`
2. **Custom Analytics**: Implement your own endpoint in `reportWebVitals.ts`
3. **Third-party service**: Use Vercel Analytics, Sentry, or similar

## Optimization Tips

### JavaScript Bundle
- Code splitting enabled via React.lazy()
- Tree shaking enabled in production builds
- Minification and compression applied

### Images
- Use modern formats (WebP, AVIF)
- Implement lazy loading
- Optimize image dimensions

### CSS
- TailwindCSS purges unused styles
- Critical CSS inlined
- Non-critical CSS lazy loaded

### Fonts
- Preload critical fonts
- Use font-display: swap
- Subset fonts when possible

## Current Bundle Sizes

```
CSS:  ~45KB (gzipped: ~9KB)
JS:   ~570KB (gzipped: ~183KB)
```

The largest chunk is the Projects page due to project data and filtering logic. Consider further code splitting if this grows significantly.
