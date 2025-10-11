import type { ProjectResponse } from '@/lib/api';
import { ProjectCard } from './ProjectCard';
import { LoadingState } from '@/components/common/LoadingState';

interface ProjectGridProps {
  projects: ProjectResponse[];
  onProjectClick?: (project: ProjectResponse) => void;
  isLoading?: boolean;
}

export function ProjectGrid({
  projects,
  onProjectClick,
  isLoading = false,
}: ProjectGridProps) {
  // Show skeleton loading state
  if (isLoading) {
    return <LoadingState type="skeleton" count={6} />;
  }

  // Show empty state when no projects match filters
  if (projects.length === 0) {
    return (
      <div className="py-12 text-center">
        <p className="text-lg text-gray-500">No projects match your filters</p>
        <p className="mt-2 text-sm text-gray-600">
          Try adjusting or clearing your filters to see more projects
        </p>
      </div>
    );
  }

  return (
    <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
      {projects.map((project) => (
        <ProjectCard
          key={project.id}
          project={project}
          onClick={() => onProjectClick?.(project)}
        />
      ))}
    </div>
  );
}
