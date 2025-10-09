import { describe, it, expect } from 'vitest';
import { render, screen } from '@testing-library/react';
import { BrowserRouter } from 'react-router-dom';
import { NotFound } from './NotFound';

describe('NotFound', () => {
  it('renders 404 heading', () => {
    render(
      <BrowserRouter>
        <NotFound />
      </BrowserRouter>,
    );
    expect(screen.getByText('404')).toBeInTheDocument();
  });

  it('renders page not found message', () => {
    render(
      <BrowserRouter>
        <NotFound />
      </BrowserRouter>,
    );
    expect(screen.getByText('Page Not Found')).toBeInTheDocument();
  });

  it('displays helpful message to user', () => {
    render(
      <BrowserRouter>
        <NotFound />
      </BrowserRouter>,
    );
    expect(
      screen.getByText(/doesn't exist or has been moved/i),
    ).toBeInTheDocument();
  });

  it('renders return home button with link', () => {
    render(
      <BrowserRouter>
        <NotFound />
      </BrowserRouter>,
    );
    const link = screen.getByRole('link', { name: /return home/i });
    expect(link).toBeInTheDocument();
    expect(link).toHaveAttribute('href', '/');
  });

  it('centers content on screen', () => {
    const { container } = render(
      <BrowserRouter>
        <NotFound />
      </BrowserRouter>,
    );
    expect(
      container.querySelector('.flex.items-center.justify-center'),
    ).toBeInTheDocument();
  });
});
