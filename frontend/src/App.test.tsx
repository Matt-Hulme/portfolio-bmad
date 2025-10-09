import { describe, it, expect } from 'vitest';
import { render, screen, waitFor } from '@testing-library/react';
import { BrowserRouter } from 'react-router-dom';
import App from './App';

describe('App', () => {
  it('renders home page by default', async () => {
    render(
      <BrowserRouter>
        <App />
      </BrowserRouter>,
    );
    await waitFor(() => {
      expect(screen.getByText('Portfolio')).toBeInTheDocument();
    });
  });

  it('displays portfolio description on home page', async () => {
    render(
      <BrowserRouter>
        <App />
      </BrowserRouter>,
    );
    await waitFor(() => {
      expect(
        screen.getByText(/A showcase of diverse projects/),
      ).toBeInTheDocument();
    });
  });

  it('displays project grid on home page', async () => {
    render(
      <BrowserRouter>
        <App />
      </BrowserRouter>,
    );
    await waitFor(() => {
      // Check for first project card
      expect(screen.getByText('Modern Portfolio Website')).toBeInTheDocument();
    });
  });

  it('displays multiple project cards', async () => {
    render(
      <BrowserRouter>
        <App />
      </BrowserRouter>,
    );
    await waitFor(() => {
      const projectCards = screen.getAllByRole('button');
      // Should have at least 7 project cards
      expect(projectCards.length).toBeGreaterThanOrEqual(7);
    });
  });
});
