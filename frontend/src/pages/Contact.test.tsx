import { describe, it, expect } from 'vitest';
import { render, screen } from '@testing-library/react';
import { BrowserRouter } from 'react-router-dom';
import { Contact } from './Contact';

describe('Contact', () => {
  it('renders contact page heading', () => {
    render(
      <BrowserRouter>
        <Contact />
      </BrowserRouter>,
    );
    expect(screen.getByText('Contact')).toBeInTheDocument();
  });

  it('displays placeholder content', () => {
    render(
      <BrowserRouter>
        <Contact />
      </BrowserRouter>,
    );
    expect(
      screen.getByText('Contact page content coming soon...'),
    ).toBeInTheDocument();
  });

  it('uses container layout with background', () => {
    const { container } = render(
      <BrowserRouter>
        <Contact />
      </BrowserRouter>,
    );
    expect(container.querySelector('.bg-background')).toBeInTheDocument();
  });
});
