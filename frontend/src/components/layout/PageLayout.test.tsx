import { describe, it, expect } from 'vitest';
import { render, screen } from '@testing-library/react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { PageLayout } from './PageLayout';

describe('PageLayout', () => {
  const TestPage = () => <div>Test Page Content</div>;

  const renderWithRouter = () => {
    return render(
      <BrowserRouter>
        <Routes>
          <Route element={<PageLayout />}>
            <Route path="/" element={<TestPage />} />
          </Route>
        </Routes>
      </BrowserRouter>,
    );
  };

  it('renders header with logo', () => {
    renderWithRouter();
    const logo = screen.getByRole('link', { name: /bmad\.dev/i });
    expect(logo).toBeInTheDocument();
    expect(logo).toHaveAttribute('href', '/');
  });

  it('renders navigation in header', () => {
    renderWithRouter();
    const header = document.querySelector('header');
    expect(header).toBeInTheDocument();

    // Navigation should be inside header
    const nav = screen.getByRole('navigation', { name: /main navigation/i });
    expect(header).toContain(nav);
  });

  it('renders main content area', () => {
    renderWithRouter();
    const main = document.querySelector('main');
    expect(main).toBeInTheDocument();
  });

  it('renders page content via Outlet', () => {
    renderWithRouter();
    expect(screen.getByText('Test Page Content')).toBeInTheDocument();
  });

  it('renders footer with copyright', () => {
    renderWithRouter();
    const footer = document.querySelector('footer');
    expect(footer).toBeInTheDocument();
    expect(screen.getByText(/© 2025 bmad\.dev/i)).toBeInTheDocument();
  });

  it('renders footer links', () => {
    renderWithRouter();
    const githubLink = screen.getByRole('link', { name: /github/i });
    const linkedinLink = screen.getByRole('link', { name: /linkedin/i });

    expect(githubLink).toBeInTheDocument();
    expect(githubLink).toHaveAttribute(
      'href',
      'https://github.com/bmad4ever',
    );
    expect(githubLink).toHaveAttribute('target', '_blank');
    expect(githubLink).toHaveAttribute('rel', 'noopener noreferrer');

    expect(linkedinLink).toBeInTheDocument();
    expect(linkedinLink).toHaveAttribute(
      'href',
      'https://www.linkedin.com/in/bruno-fonseca-bmad/',
    );
    expect(linkedinLink).toHaveAttribute('target', '_blank');
    expect(linkedinLink).toHaveAttribute('rel', 'noopener noreferrer');
  });

  it('has sticky header', () => {
    renderWithRouter();
    const header = document.querySelector('header');
    expect(header?.className).toContain('sticky');
    expect(header?.className).toContain('top-0');
  });

  it('uses flexbox layout with flex-1 main', () => {
    renderWithRouter();
    const wrapper = document.querySelector('.flex.min-h-screen.flex-col');
    const main = document.querySelector('main');

    expect(wrapper).toBeInTheDocument();
    expect(main?.className).toContain('flex-1');
  });

  it('has skip to content link for accessibility', () => {
    renderWithRouter();
    const skipLink = screen.getByRole('link', { name: /skip to main content/i });
    expect(skipLink).toBeInTheDocument();
    expect(skipLink).toHaveAttribute('href', '#main-content');
  });

  it('main content has id for skip link target', () => {
    renderWithRouter();
    const main = document.querySelector('main');
    expect(main).toHaveAttribute('id', 'main-content');
    expect(main).toHaveAttribute('tabIndex', '-1');
  });
});
