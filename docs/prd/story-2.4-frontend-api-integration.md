# Story 2.4: Frontend API Integration

**Status:** Pending

**As a** portfolio visitor,
**I want** project data loaded from the real backend API,
**so that** the portfolio content can be updated without code changes.

## Acceptance Criteria

- [ ] API client service created for frontend with typed functions (getProjects(), getProjectBySlug())
- [ ] Vite proxy configuration routes `/api/*` requests to FastAPI backend during development
- [ ] Project grid fetches data from `GET /api/projects` on page load
- [ ] Modal fetches detailed data from `GET /api/projects/{slug}` when opened (or uses cached list data)
- [ ] Enhanced loading states displayed while API requests are in progress:
  - Progress bar that fills (not simple spinner)
  - Skeleton screens for content loading
  - Smooth transitions between loading and loaded states
  - Loading indicators appropriate for each context (grid vs modal)
- [ ] Error states handled gracefully (show user-friendly message if API fails)
- [ ] Mock data from Story 1.4 removed and replaced with API calls
- [ ] TypeScript interfaces updated if needed to match API response schemas
- [ ] Filtering system works correctly with API-sourced data
- [ ] React Testing Library tests updated to mock API calls and verify integration

## Task Breakdown

### 1. API Client Setup
- [ ] Create frontend/src/lib/api.ts
- [ ] Define API_BASE constant from import.meta.env.VITE_API_URL
- [ ] Create ApiError class extending Error with status property
- [ ] Implement fetchApi<T>(endpoint: string) helper function
- [ ] Handle response.ok check and error extraction
- [ ] Export async getProjects(): Promise<Project[]>
- [ ] Export async getProjectBySlug(slug: string): Promise<Project>

### 2. Type Definitions Update
- [ ] Review frontend/src/types/project.ts
- [ ] Ensure interfaces match API response (camelCase fields)
- [ ] Verify ProjectLink has projectId field
- [ ] Verify ProjectImage has projectId, altText, order fields
- [ ] Update any mismatched field names
- [ ] Add JSDoc comments if helpful

### 3. React Query Setup
- [ ] Create frontend/src/lib/queryClient.ts
- [ ] Import QueryClient from @tanstack/react-query
- [ ] Create and export queryClient with default options
- [ ] Set staleTime: 5 * 60 * 1000 (5 minutes)
- [ ] Set gcTime: 10 * 60 * 1000 (10 minutes)

### 4. React Query Hooks
- [ ] Create frontend/src/hooks/useProjects.ts
- [ ] Import useQuery and getProjects
- [ ] Export useProjects() hook
- [ ] Set queryKey: ['projects']
- [ ] Set queryFn: getProjects
- [ ] Return query result with data, isLoading, error

- [ ] Create frontend/src/hooks/useProject.ts
- [ ] Import useQuery and getProjectBySlug
- [ ] Export useProject(slug: string) hook
- [ ] Set queryKey: ['project', slug]
- [ ] Set queryFn: () => getProjectBySlug(slug)
- [ ] Set enabled: !!slug (only fetch if slug exists)
- [ ] Return query result

### 5. Vite Proxy Configuration
- [ ] Open frontend/vite.config.ts
- [ ] Add server.proxy configuration
- [ ] Route '/api' to 'http://localhost:8000'
- [ ] Set changeOrigin: true
- [ ] Test proxy with dev server running

### 6. Loading Components
- [ ] Create frontend/src/components/common/ProgressBar.tsx
- [ ] Implement animated progress bar (0-100%)
- [ ] Use CSS transitions for smooth animation
- [ ] Accept progress prop (number 0-100)

- [ ] Create frontend/src/components/common/SkeletonCard.tsx
- [ ] Mimic ProjectCard dimensions
- [ ] Use gray animated backgrounds
- [ ] Show skeleton for title, summary, badges, tech line

- [ ] Create frontend/src/components/common/LoadingState.tsx
- [ ] Accept type: 'progress' | 'skeleton' | 'spinner'
- [ ] Render appropriate loading indicator
- [ ] Add smooth fade-in animation

### 7. Error Components
- [ ] Create frontend/src/components/common/ErrorMessage.tsx
- [ ] Accept error prop (Error | null)
- [ ] Display user-friendly error message
- [ ] Show retry button if onRetry prop provided
- [ ] Style with error colors from design system
- [ ] Handle network errors vs API errors differently

### 8. Update Home Page
- [ ] Open frontend/src/pages/Home.tsx
- [ ] Remove filterProjects import from data/projects
- [ ] Import useProjects hook
- [ ] Call const { data: projects, isLoading, error, refetch } = useProjects()
- [ ] Pass isLoading to ProjectGrid
- [ ] Pass error and refetch to ErrorMessage
- [ ] Remove mock data references

### 9. Update ProjectGrid Component
- [ ] Open frontend/src/components/projects/ProjectGrid.tsx
- [ ] Accept isLoading prop
- [ ] Accept error prop
- [ ] Render SkeletonCard grid when isLoading
- [ ] Render ErrorMessage when error
- [ ] Filter projects client-side (keep existing logic)
- [ ] Add smooth transition when data loads

### 10. Update ProjectDetailModal
- [ ] Open frontend/src/components/projects/ProjectDetailModal.tsx
- [ ] Determine if we need to fetch by slug or use passed project
- [ ] If using slug: integrate useProject(slug) hook
- [ ] Show loading state in modal while fetching
- [ ] Show error state if fetch fails
- [ ] Keep existing modal close behavior

### 11. Remove Mock Data
- [ ] Archive frontend/src/data/projects.ts (rename to projects.backup.ts)
- [ ] Remove imports of mock data from components
- [ ] Remove filterProjects, getUniqueTechnologies, getUniqueRoles exports
- [ ] Move filtering logic to hooks or utils if needed
- [ ] Verify no broken imports remain

### 12. Update Tests
- [ ] Create frontend/src/lib/__mocks__/api.ts
- [ ] Mock getProjects to return sample data
- [ ] Mock getProjectBySlug to return sample project or throw 404

- [ ] Update frontend/src/pages/Home.test.tsx
- [ ] Mock React Query with QueryClientProvider
- [ ] Mock API responses for tests
- [ ] Test loading state rendering
- [ ] Test error state rendering
- [ ] Test successful data rendering
- [ ] Test filtering still works with API data

- [ ] Update frontend/src/components/projects/ProjectGrid.test.tsx
- [ ] Mock useProjects hook
- [ ] Test skeleton rendering during load
- [ ] Test error message rendering
- [ ] Test project card rendering with API data

### 13. Environment Configuration
- [ ] Create frontend/.env.example
- [ ] Add VITE_API_URL=http://localhost:8000/api
- [ ] Copy to frontend/.env for local dev
- [ ] Document in frontend README

### 14. Integration Testing
- [ ] Start backend server (port 8000)
- [ ] Start frontend server (port 5173)
- [ ] Open browser to http://localhost:5173
- [ ] Verify projects load from API
- [ ] Check Network tab for /api/projects call
- [ ] Test filtering (should work client-side)
- [ ] Click project card to open modal
- [ ] Verify modal data displays correctly
- [ ] Test error handling (stop backend, refresh)
- [ ] Verify error message and retry button

### 15. Verification
- [ ] All unit tests pass
- [ ] All integration tests pass
- [ ] No console errors in browser
- [ ] Network requests visible in DevTools
- [ ] Loading states display smoothly
- [ ] Error states display with retry option
- [ ] Filtering works correctly with API data
- [ ] Modal displays full project details
- [ ] No mock data references remain

## Files to Create

- `/frontend/src/lib/api.ts` - API client
- `/frontend/src/lib/queryClient.ts` - React Query config
- `/frontend/src/hooks/useProjects.ts` - Projects query hook
- `/frontend/src/hooks/useProject.ts` - Single project query hook
- `/frontend/src/components/common/ProgressBar.tsx` - Progress loading
- `/frontend/src/components/common/SkeletonCard.tsx` - Skeleton loading
- `/frontend/src/components/common/LoadingState.tsx` - Generic loading
- `/frontend/src/components/common/ErrorMessage.tsx` - Error display
- `/frontend/src/lib/__mocks__/api.ts` - API mocks for tests
- `/frontend/.env.example` - Environment variable template

## Files to Modify

- `/frontend/vite.config.ts` - Add proxy configuration
- `/frontend/src/pages/Home.tsx` - Use API instead of mock data
- `/frontend/src/components/projects/ProjectGrid.tsx` - Handle loading/error states
- `/frontend/src/components/projects/ProjectDetailModal.tsx` - Integrate API if needed
- `/frontend/src/types/project.ts` - Update if needed for API response
- `/frontend/src/pages/Home.test.tsx` - Mock API calls
- `/frontend/src/components/projects/ProjectGrid.test.tsx` - Mock hooks

## Files to Archive

- `/frontend/src/data/projects.ts` → `/frontend/src/data/projects.backup.ts`

## Dependencies

- Story 2.3 must be complete (API endpoints working)
- Backend server must be running during development

## Technical Notes

### Vite Proxy Example
```typescript
// vite.config.ts
export default defineConfig({
  server: {
    proxy: {
      '/api': {
        target: 'http://localhost:8000',
        changeOrigin: true,
      },
    },
  },
});
```

### API Client Error Handling
```typescript
class ApiError extends Error {
  constructor(public status: number, message: string) {
    super(message);
    this.name = 'ApiError';
  }
}

async function fetchApi<T>(endpoint: string): Promise<T> {
  const response = await fetch(`${API_BASE}${endpoint}`);

  if (!response.ok) {
    const error = await response.json().catch(() => ({ detail: 'Unknown error' }));
    throw new ApiError(response.status, error.detail || `HTTP ${response.status}`);
  }

  return response.json();
}
```

### Loading State Transitions
- Use CSS transitions for smooth state changes
- Skeleton cards should match final card dimensions
- Progress bar should feel responsive (update every 100ms)
- Error messages should fade in, not flash
