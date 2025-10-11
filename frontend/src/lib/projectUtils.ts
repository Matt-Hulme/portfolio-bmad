/**
 * Utility functions for working with project data.
 *
 * These utilities provide filtering and extraction capabilities
 * for projects fetched from the API.
 */

import type { ProjectResponse } from './api';

/**
 * Get unique technologies from a list of projects.
 *
 * @param projects - Array of projects
 * @returns Sorted array of unique technology names
 */
export function getUniqueTechnologies(projects: ProjectResponse[]): string[] {
  const techs = new Set<string>();
  projects.forEach((p) => p.technologies.forEach((t) => techs.add(t.name)));
  return Array.from(techs).sort();
}

/**
 * Get unique roles from a list of projects.
 *
 * @param projects - Array of projects
 * @returns Sorted array of unique role names
 */
export function getUniqueRoles(projects: ProjectResponse[]): string[] {
  const roles = new Set<string>();
  projects.forEach((p) => p.roles.forEach((r) => roles.add(r.name)));
  return Array.from(roles).sort();
}

/**
 * Filter projects by selected technologies and roles.
 *
 * Uses AND logic: projects must match ALL selected technologies
 * and ALL selected roles to be included.
 *
 * @param projects - Array of projects to filter
 * @param filters - Optional filter criteria
 * @returns Filtered array of projects
 *
 * @example
 * ```ts
 * const filtered = filterProjects(projects, {
 *   technologies: ['React', 'TypeScript'],
 *   roles: ['Frontend Developer']
 * });
 * ```
 */
export function filterProjects(
  projects: ProjectResponse[],
  filters?: {
    technologies?: string[];
    roles?: string[];
  },
): ProjectResponse[] {
  if (!filters || (!filters.technologies?.length && !filters.roles?.length)) {
    return projects;
  }

  return projects.filter((project) => {
    // AND logic: If technologies are selected, project must have ALL selected technologies
    const matchesTech =
      !filters.technologies?.length ||
      filters.technologies.every((tech) =>
        project.technologies.some((t) => t.name === tech),
      );

    // AND logic: If roles are selected, project must have ALL selected roles
    const matchesRole =
      !filters.roles?.length ||
      filters.roles.every((role) => project.roles.some((r) => r.name === role));

    // Project must match both technology AND role filters
    return matchesTech && matchesRole;
  });
}
