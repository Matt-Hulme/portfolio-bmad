/**
 * API client for the portfolio backend.
 *
 * Provides typed functions for fetching project data from the FastAPI backend.
 */

// API base URL from environment variables
const API_BASE = import.meta.env.VITE_API_URL || '/api';

/**
 * Custom error class for API errors.
 * Includes HTTP status code for error handling.
 */
export class ApiError extends Error {
  status: number;

  constructor(status: number, message: string) {
    super(message);
    this.status = status;
    this.name = 'ApiError';
  }
}

/**
 * Generic fetch wrapper with error handling.
 *
 * @param endpoint - API endpoint (e.g., '/projects')
 * @returns Parsed JSON response
 * @throws {ApiError} If the response is not ok
 */
async function fetchApi<T>(endpoint: string): Promise<T> {
  const response = await fetch(`${API_BASE}${endpoint}`);

  if (!response.ok) {
    // Try to extract error detail from response
    const error = await response.json().catch(() => ({
      detail: `HTTP ${response.status}: ${response.statusText}`,
    }));

    throw new ApiError(
      response.status,
      error.detail || `HTTP ${response.status}`,
    );
  }

  return response.json();
}

/**
 * API response types matching backend schemas
 */

export interface Technology {
  id: string;
  name: string;
}

export interface Role {
  id: string;
  name: string;
}

export interface ProjectImage {
  id: string;
  projectId: string;
  url: string;
  altText: string;
  order: number;
}

export interface ProjectResponse {
  id: string;
  title: string;
  slug: string;
  summary: string;
  description: string;
  liveUrl: string | null;
  githubUrl: string | null;
  roles: Role[];
  technologies: Technology[];
  images: ProjectImage[];
  createdAt: string;
  updatedAt: string;
}

/**
 * Fetch all projects from the API.
 *
 * @returns Array of projects
 * @throws {ApiError} If the request fails
 */
export async function getProjects(): Promise<ProjectResponse[]> {
  return fetchApi<ProjectResponse[]>('/projects');
}

/**
 * Fetch a single project by slug.
 *
 * @param slug - Project slug (e.g., 'star-wars-archive')
 * @returns Project details
 * @throws {ApiError} If the request fails or project not found
 */
export async function getProjectBySlug(slug: string): Promise<ProjectResponse> {
  return fetchApi<ProjectResponse>(`/projects/${slug}`);
}
