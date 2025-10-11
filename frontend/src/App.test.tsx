import { describe, it, expect, vi, beforeEach } from 'vitest';
import { render, screen, waitFor } from '@testing-library/react';
import { BrowserRouter } from 'react-router-dom';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
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
    await waitFor(() => {
      expect(screen.getByText('Portfolio')).toBeInTheDocument();
    });
  });

  it('displays portfolio description on home page', async () => {
    renderWithProviders(<App />);
    await waitFor(() => {
      expect(
        screen.getByText(/A showcase of diverse projects/),
      ).toBeInTheDocument();
    });
  });

  it('displays project grid on home page', async () => {
    const mockProjects: api.ProjectResponse[] = [
      {
        id: '1',
        slug: 'test-project',
        title: 'Modern Portfolio Website',
        summary: 'Test summary',
        description: 'Test description',
        liveUrl: null,
        githubUrl: null,
        roles: [],
        technologies: [],
        images: [],
      },
    ];
    vi.spyOn(api, 'getProjects').mockResolvedValue(mockProjects);

    renderWithProviders(<App />);
    await waitFor(() => {
      // Check for first project card
      expect(screen.getByText('Modern Portfolio Website')).toBeInTheDocument();
    });
  });

  it('displays multiple project cards', async () => {
    const mockProjects: api.ProjectResponse[] = Array.from(
      { length: 7 },
      (_, i) => ({
        id: String(i + 1),
        slug: `project-${i + 1}`,
        title: `Project ${i + 1}`,
        summary: `Summary ${i + 1}`,
        description: `Description ${i + 1}`,
        liveUrl: null,
        githubUrl: null,
        roles: [],
        technologies: [],
        images: [],
      }),
    );
    vi.spyOn(api, 'getProjects').mockResolvedValue(mockProjects);

    renderWithProviders(<App />);
    await waitFor(() => {
      const projectCards = screen.getAllByRole('button');
      // Should have at least 7 project cards
      expect(projectCards.length).toBeGreaterThanOrEqual(7);
    });
  });
});
