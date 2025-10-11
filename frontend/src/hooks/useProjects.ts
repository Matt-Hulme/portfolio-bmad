/**
 * React Query hook for fetching all projects.
 */

import { useQuery } from '@tanstack/react-query';
import { getProjects } from '@/lib/api';

/**
 * Hook to fetch all projects from the API.
 *
 * @returns React Query result with projects data, loading state, and error
 *
 * @example
 * ```tsx
 * const { data: projects, isLoading, error, refetch } = useProjects();
 *
 * if (isLoading) return <LoadingState />;
 * if (error) return <ErrorMessage error={error} onRetry={refetch} />;
 * return <ProjectGrid projects={projects} />;
 * ```
 */
export function useProjects() {
  return useQuery({
    queryKey: ['projects'],
    queryFn: getProjects,
  });
}
