import { describe, it, expect } from 'vitest';
import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { BrowserRouter, MemoryRouter } from 'react-router-dom';
import { Navigation } from './Navigation';

describe('Navigation', () => {
  describe('Desktop Navigation', () => {
    it('renders all desktop navigation links', () => {
      render(
        <BrowserRouter>
          <Navigation />
        </BrowserRouter>,
      );

      expect(
        screen.getByRole('link', { name: /projects/i }),
      ).toBeInTheDocument();
      expect(screen.getByRole('link', { name: /resume/i })).toBeInTheDocument();
    });

    it('has correct navigation role and aria-label', () => {
      render(
        <BrowserRouter>
          <Navigation />
        </BrowserRouter>,
      );

      const nav = screen.getByLabelText('Main navigation');
      expect(nav).toBeInTheDocument();
      expect(nav.tagName).toBe('NAV');
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

      expect(projectsLink.className).toContain('text-foreground');
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

  describe('Mobile Navigation', () => {
    it('renders mobile menu button', () => {
      render(
        <BrowserRouter>
          <Navigation />
        </BrowserRouter>,
      );

      const menuButton = screen.getByRole('button', {
        name: /open navigation menu/i,
      });
      expect(menuButton).toBeInTheDocument();
    });

    it('opens mobile menu when hamburger is clicked', async () => {
      const user = userEvent.setup();
      render(
        <BrowserRouter>
          <Navigation />
        </BrowserRouter>,
      );

      const menuButton = screen.getByRole('button', {
        name: /open navigation menu/i,
      });
      await user.click(menuButton);

      expect(screen.getByText('Menu')).toBeInTheDocument();
      expect(screen.getByLabelText('Mobile navigation')).toBeInTheDocument();
    });

    it('displays all navigation items in mobile menu', async () => {
      const user = userEvent.setup();
      render(
        <BrowserRouter>
          <Navigation />
        </BrowserRouter>,
      );

      const menuButton = screen.getByRole('button', {
        name: /open navigation menu/i,
      });
      await user.click(menuButton);

      const mobileNav = screen.getByLabelText('Mobile navigation');
      const buttons = mobileNav.querySelectorAll('button');
      expect(buttons).toHaveLength(2);
      expect(buttons[0]).toHaveTextContent('Projects');
      expect(buttons[1]).toHaveTextContent('Resume');
    });

    it('closes mobile menu when a navigation item is clicked', async () => {
      const user = userEvent.setup();
      render(
        <BrowserRouter>
          <Navigation />
        </BrowserRouter>,
      );

      const menuButton = screen.getByRole('button', {
        name: /open navigation menu/i,
      });
      await user.click(menuButton);

      const mobileNav = screen.getByLabelText('Mobile navigation');
      const resumeButton = mobileNav.querySelector(
        'button:nth-of-type(2)',
      ) as HTMLButtonElement;
      await user.click(resumeButton);

      // Menu should close - checking by seeing if Menu title is gone
      expect(screen.queryByText('Menu')).not.toBeInTheDocument();
    });
  });
});
