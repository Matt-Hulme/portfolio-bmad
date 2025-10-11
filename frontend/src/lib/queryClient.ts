/**
 * React Query client configuration.
 *
 * Centralized configuration for data fetching, caching, and refetching behavior.
 */

import { QueryClient } from '@tanstack/react-query';

/**
 * Create and configure the React Query client.
 *
 * Configuration:
 * - staleTime: 5 minutes - data is considered fresh for 5 minutes
 * - gcTime: 10 minutes - unused data is garbage collected after 10 minutes
 * - retry: 1 - retry failed requests once before giving up
 * - refetchOnWindowFocus: false - don't refetch when window regains focus
 */
export const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      staleTime: 5 * 60 * 1000, // 5 minutes
      gcTime: 10 * 60 * 1000, // 10 minutes (formerly cacheTime)
      retry: 1, // Retry failed requests once
      refetchOnWindowFocus: false, // Don't refetch on window focus
    },
  },
});
