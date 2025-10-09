import { lazy, Suspense } from 'react';
import type { RouteObject } from 'react-router-dom';

// Lazy load page components for code splitting
const Home = lazy(() =>
  import('@/pages/Home').then((module) => ({ default: module.Home })),
);
const Resume = lazy(() =>
  import('@/pages/Resume').then((module) => ({ default: module.Resume })),
);
const Contact = lazy(() =>
  import('@/pages/Contact').then((module) => ({ default: module.Contact })),
);
const NotFound = lazy(() =>
  import('@/pages/NotFound').then((module) => ({ default: module.NotFound })),
);

// Loading component shown during lazy loading
function RouteLoading() {
  return (
    <div className="flex min-h-[50vh] items-center justify-center">
      <div className="text-center space-y-4">
        <div className="h-8 w-8 mx-auto animate-spin rounded-full border-4 border-primary border-t-transparent"></div>
        <p className="text-sm text-muted-foreground font-mono">Loading...</p>
      </div>
    </div>
  );
}

// Wrap lazy components in Suspense
function withSuspense(Component: React.LazyExoticComponent<() => JSX.Element>) {
  return (
    <Suspense fallback={<RouteLoading />}>
      <Component />
    </Suspense>
  );
}

export const routes: RouteObject[] = [
  {
    path: '/',
    element: withSuspense(Home),
  },
  {
    path: '/resume',
    element: withSuspense(Resume),
  },
  {
    path: '/contact',
    element: withSuspense(Contact),
  },
  {
    path: '*',
    element: withSuspense(NotFound),
  },
];

export const navLinks = [
  { path: '/', label: 'Projects' },
  { path: '/resume', label: 'Resume' },
  { path: '/contact', label: 'Contact' },
];
