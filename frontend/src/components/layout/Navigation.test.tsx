import { describe, it, expect } from 'vitest';
import { render, screen } from '@testing-library/react';
import { BrowserRouter, MemoryRouter } from 'react-router-dom';
import { Navigation } from './Navigation';

describe('Navigation', () => {
  it('renders all navigation links', () => {
    render(
      <BrowserRouter>
        <Navigation />
      </BrowserRouter>,
    );

    expect(screen.getByRole('link', { name: /projects/i })).toBeInTheDocument();
    expect(screen.getByRole('link', { name: /resume/i })).toBeInTheDocument();
    expect(screen.getByRole('link', { name: /contact/i })).toBeInTheDocument();
  });

  it('has correct navigation role and aria-label', () => {
    render(
      <BrowserRouter>
        <Navigation />
      </BrowserRouter>,
    );

    const nav = screen.getByRole('navigation');
    expect(nav).toBeInTheDocument();
    expect(nav).toHaveAttribute('aria-label', 'Main navigation');
  });

  it('links have correct href attributes', () => {
    render(
      <BrowserRouter>
        <Navigation />
      </BrowserRouter>,
    );

    expect(screen.getByRole('link', { name: /projects/i })).toHaveAttribute(
      'href',
      '/',
    );
    expect(screen.getByRole('link', { name: /resume/i })).toHaveAttribute(
      'href',
      '/resume',
    );
    expect(screen.getByRole('link', { name: /contact/i })).toHaveAttribute(
      'href',
      '/contact',
    );
  });

  it('highlights active route', () => {
    render(
      <MemoryRouter initialEntries={['/resume']}>
        <Navigation />
      </MemoryRouter>,
    );

    const resumeLink = screen.getByRole('link', { name: /resume/i });
    expect(resumeLink.className).toContain('text-primary');
  });

  it('does not highlight inactive routes', () => {
    render(
      <MemoryRouter initialEntries={['/resume']}>
        <Navigation />
      </MemoryRouter>,
    );

    const projectsLink = screen.getByRole('link', { name: /projects/i });
    const contactLink = screen.getByRole('link', { name: /contact/i });

    expect(projectsLink.className).toContain('text-foreground');
    expect(contactLink.className).toContain('text-foreground');
  });

  it('applies custom className prop', () => {
    const { container } = render(
      <BrowserRouter>
        <Navigation className="custom-class" />
      </BrowserRouter>,
    );

    const nav = container.querySelector('nav');
    expect(nav).toHaveClass('custom-class');
  });

  it('has keyboard navigation support (focus-visible styles)', () => {
    render(
      <BrowserRouter>
        <Navigation />
      </BrowserRouter>,
    );

    const links = screen.getAllByRole('link');
    links.forEach((link) => {
      expect(link.className).toContain('focus-visible:ring-primary');
    });
  });
});
