import { describe, it, expect, vi, beforeEach } from 'vitest';
import { render, screen, waitFor } from '@testing-library/react';
import { BrowserRouter } from 'react-router-dom';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import userEvent from '@testing-library/user-event';
import App from './App';
import * as api from '@/lib/api';

// Create a new QueryClient for each test
function createTestQueryClient() {
  return new QueryClient({
    defaultOptions: {
      queries: {
        retry: false,
      },
    },
  });
}

// Wrapper component with all providers
function renderWithProviders(ui: React.ReactElement) {
  const queryClient = createTestQueryClient();
  return render(
    <QueryClientProvider client={queryClient}>
      <BrowserRouter>{ui}</BrowserRouter>
    </QueryClientProvider>,
  );
}

describe('App', () => {
  beforeEach(() => {
    // Mock the API to return empty array by default
    vi.spyOn(api, 'getProjects').mockResolvedValue([]);
  });

  it('renders home page by default', async () => {
    renderWithProviders(<App />);
    // Find all main elements and click the innermost one (Home page's main)
    await waitFor(async () => {
      const mains = screen.getAllByRole('main');
      await userEvent.click(mains[mains.length - 1]);
    });
    // Wait for content to appear after skip
    await waitFor(
      () => {
        expect(screen.getByText('Matt Hulme')).toBeInTheDocument();
      },
      { timeout: 3000 },
    );
  });

  it('displays tagline on home page', async () => {
    renderWithProviders(<App />);
    // Find all main elements and click the innermost one (Home page's main)
    await waitFor(async () => {
      const mains = screen.getAllByRole('main');
      await userEvent.click(mains[mains.length - 1]);
    });
    // Wait for content to appear after skip
    await waitFor(
      () => {
        expect(
          screen.getByText(
            'AI Engineer, Full Stack Developer, Data Engineer, and Marketer',
          ),
        ).toBeInTheDocument();
      },
      { timeout: 3000 },
    );
  });

  it('displays navigation buttons on home page', async () => {
    renderWithProviders(<App />);
    // Find all main elements and click the innermost one (Home page's main)
    await waitFor(async () => {
      const mains = screen.getAllByRole('main');
      await userEvent.click(mains[mains.length - 1]);
    });
    // Wait for content to appear after skip
    await waitFor(
      () => {
        expect(screen.getByText('View Projects')).toBeInTheDocument();
        expect(screen.getByText('View Resume')).toBeInTheDocument();
      },
      { timeout: 3000 },
    );
  });

  it('has navigation to all sections', async () => {
    renderWithProviders(<App />);
    await waitFor(() => {
      // Check navigation links exist in the header navigation
      const nav = screen.getByLabelText('Main navigation');
      const homeLink = screen.getByRole('link', { name: 'Home' });
      const resumeLink = screen.getByRole('link', { name: 'Resume' });

      expect(homeLink).toBeInTheDocument();
      expect(resumeLink).toBeInTheDocument();
      expect(nav).toBeInTheDocument();
    });
  });
});
