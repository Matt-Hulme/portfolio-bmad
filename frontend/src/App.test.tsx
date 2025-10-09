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
      expect(screen.getByText('Design System Showcase')).toBeInTheDocument();
    });
  });

  it('displays color palette section on home page', async () => {
    render(
      <BrowserRouter>
        <App />
      </BrowserRouter>,
    );
    await waitFor(() => {
      expect(screen.getByText('Color Palette')).toBeInTheDocument();
    });
    expect(screen.getByText('Primary Colors')).toBeInTheDocument();
    expect(screen.getByText('Gray Scale')).toBeInTheDocument();
  });

  it('displays typography section on home page', async () => {
    render(
      <BrowserRouter>
        <App />
      </BrowserRouter>,
    );
    await waitFor(() => {
      expect(screen.getByText('Typography')).toBeInTheDocument();
    });
  });

  it('displays component sections on home page', async () => {
    render(
      <BrowserRouter>
        <App />
      </BrowserRouter>,
    );
    await waitFor(() => {
      expect(screen.getByText('Buttons')).toBeInTheDocument();
    });
    expect(screen.getByText('Badges')).toBeInTheDocument();
    expect(screen.getByText('Cards')).toBeInTheDocument();
  });
});
