import { describe, it, expect } from 'vitest';
import { render, screen } from '@testing-library/react';
import { BrowserRouter } from 'react-router-dom';
import { Resume } from './Resume';

describe('Resume', () => {
  it('renders resume page heading', () => {
    render(
      <BrowserRouter>
        <Resume />
      </BrowserRouter>,
    );
    expect(screen.getByText('Resume')).toBeInTheDocument();
  });

  it('displays placeholder content', () => {
    render(
      <BrowserRouter>
        <Resume />
      </BrowserRouter>,
    );
    expect(
      screen.getByText('Resume page content coming soon...'),
    ).toBeInTheDocument();
  });

  it('uses container layout with background', () => {
    const { container } = render(
      <BrowserRouter>
        <Resume />
      </BrowserRouter>,
    );
    expect(container.querySelector('.bg-background')).toBeInTheDocument();
  });
});
