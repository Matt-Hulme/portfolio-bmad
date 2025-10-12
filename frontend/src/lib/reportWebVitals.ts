import { onCLS, onFCP, onINP, onLCP, onTTFB, type Metric } from 'web-vitals';

/**
 * Report Core Web Vitals metrics.
 *
 * This function sends performance metrics to an analytics endpoint.
 * In development, it logs to console. In production, you can send to
 * an analytics service like Google Analytics, Vercel Analytics, etc.
 *
 * Core Web Vitals tracked:
 * - LCP (Largest Contentful Paint): Loading performance
 * - FID (First Input Delay) / INP (Interaction to Next Paint): Interactivity
 * - CLS (Cumulative Layout Shift): Visual stability
 *
 * Additional metrics:
 * - FCP (First Contentful Paint): First paint
 * - TTFB (Time to First Byte): Server response time
 */
function sendToAnalytics(metric: Metric) {
  // In development, log to console
  if (import.meta.env.DEV) {
    console.log(
      `[Web Vitals] ${metric.name}:`,
      metric.value.toFixed(2),
      metric.rating,
    );
    return;
  }

  // In production, send to analytics endpoint
  // Example: Google Analytics
  // if (window.gtag) {
  //   window.gtag('event', metric.name, {
  //     value: Math.round(metric.name === 'CLS' ? metric.value * 1000 : metric.value),
  //     event_label: metric.id,
  //     non_interaction: true,
  //   });
  // }

  // Example: Custom analytics endpoint
  // fetch('/api/analytics', {
  //   method: 'POST',
  //   body: JSON.stringify(metric),
  //   headers: { 'Content-Type': 'application/json' },
  // });
}

export function reportWebVitals() {
  onCLS(sendToAnalytics);
  onFCP(sendToAnalytics);
  onINP(sendToAnalytics);
  onLCP(sendToAnalytics);
  onTTFB(sendToAnalytics);
}
