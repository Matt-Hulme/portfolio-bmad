/**
 * React Query hook for fetching a single project by slug.
 */

import { useQuery } from '@tanstack/react-query';
import { getProjectBySlug } from '@/lib/api';

/**
 * Hook to fetch a single project by slug from the API.
 *
 * @param slug - Project slug (e.g., 'star-wars-archive')
 * @returns React Query result with project data, loading state, and error
 *
 * @example
 * ```tsx
 * const { data: project, isLoading, error } = useProject('star-wars-archive');
 *
 * if (isLoading) return <LoadingState />;
 * if (error) return <ErrorMessage error={error} />;
 * return <ProjectDetail project={project} />;
 * ```
 */
export function useProject(slug: string) {
  return useQuery({
    queryKey: ['project', slug],
    queryFn: () => getProjectBySlug(slug),
    enabled: !!slug, // Only fetch if slug exists
  });
}
