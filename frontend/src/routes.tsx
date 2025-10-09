import type { RouteObject } from 'react-router-dom';
import { Home } from '@/pages/Home';
import { Resume } from '@/pages/Resume';
import { Contact } from '@/pages/Contact';
import { NotFound } from '@/pages/NotFound';

export const routes: RouteObject[] = [
  {
    path: '/',
    element: <Home />,
  },
  {
    path: '/resume',
    element: <Resume />,
  },
  {
    path: '/contact',
    element: <Contact />,
  },
  {
    path: '*',
    element: <NotFound />,
  },
];

export const navLinks = [
  { path: '/', label: 'Projects' },
  { path: '/resume', label: 'Resume' },
  { path: '/contact', label: 'Contact' },
];
