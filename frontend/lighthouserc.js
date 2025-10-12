module.exports = {
  ci: {
    collect: {
      // Build production bundle before running Lighthouse
      startServerCommand: 'npm run preview',
      startServerReadyPattern: 'Local:',
      url: [
        'http://localhost:4173/',
        'http://localhost:4173/projects',
        'http://localhost:4173/resume',
      ],
      numberOfRuns: 3, // Run Lighthouse 3 times and take median
    },
    assert: {
      preset: 'lighthouse:recommended',
      assertions: {
        // Performance budgets
        'categories:performance': ['error', { minScore: 0.9 }],
        'categories:accessibility': ['error', { minScore: 0.95 }],
        'categories:best-practices': ['error', { minScore: 0.9 }],
        'categories:seo': ['error', { minScore: 0.9 }],

        // Core Web Vitals
        'first-contentful-paint': ['warn', { maxNumericValue: 1800 }],
        'largest-contentful-paint': ['warn', { maxNumericValue: 2500 }],
        'cumulative-layout-shift': ['warn', { maxNumericValue: 0.1 }],
        'total-blocking-time': ['warn', { maxNumericValue: 300 }],
        'speed-index': ['warn', { maxNumericValue: 3000 }],

        // Resource budgets
        'resource-summary:script:size': ['warn', { maxNumericValue: 300000 }], // 300KB
        'resource-summary:stylesheet:size': ['warn', { maxNumericValue: 50000 }], // 50KB
        'resource-summary:image:size': ['warn', { maxNumericValue: 500000 }], // 500KB
        'resource-summary:font:size': ['warn', { maxNumericValue: 100000 }], // 100KB

        // Disable some overly strict checks
        'unused-javascript': 'off',
        'unused-css-rules': 'off',
      },
    },
    upload: {
      target: 'temporary-public-storage', // Free temporary storage for reports
    },
  },
};
