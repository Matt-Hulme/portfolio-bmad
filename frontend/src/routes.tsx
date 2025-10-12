import { lazy, Suspense } from 'react';
import type { RouteObject } from 'react-router-dom';
import { RouteLoading } from '@/components/layout/RouteLoading';

// Lazy load page components for code splitting
const Home = lazy(() =>
  import('@/pages/Home').then((module) => ({ default: module.Home })),
);
const Projects = lazy(() =>
  import('@/pages/Projects').then((module) => ({ default: module.Projects })),
);
const Resume = lazy(() => import('@/pages/Resume'));
const NotFound = lazy(() =>
  import('@/pages/NotFound').then((module) => ({ default: module.NotFound })),
);

// Wrap lazy components in Suspense
function withSuspense(
  Component: React.LazyExoticComponent<() => React.ReactElement>,
) {
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
    path: '/projects',
    element: withSuspense(Projects),
  },
  {
    path: '/resume',
    element: withSuspense(Resume),
  },
  {
    path: '*',
    element: withSuspense(NotFound),
  },
];

export const navLinks = [
  { path: '/projects', label: 'Projects' },
  { path: '/resume', label: 'Resume' },
];

export const homeLink = { path: '/', label: 'Home' };
