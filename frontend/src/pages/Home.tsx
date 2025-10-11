import { useState, useMemo } from 'react';
import { Container } from '@/components/layout/Container';
import { ProjectGrid } from '@/components/projects/ProjectGrid';
import { ProjectFilters } from '@/components/projects/ProjectFilters';
import { ProjectDetailModal } from '@/components/projects/ProjectDetailModal';
import { ErrorMessage } from '@/components/common/ErrorMessage';
import { useProjects } from '@/hooks/useProjects';
import {
  filterProjects,
  getUniqueTechnologies,
  getUniqueRoles,
} from '@/lib/projectUtils';
import { useProjectFilters } from '@/hooks/useProjectFilters';
import type { ProjectResponse } from '@/lib/api';

export function Home() {
  // Fetch projects from API
  const { data: projects, isLoading, error, refetch } = useProjects();

  const {
    selectedTechnologies,
    selectedRoles,
    toggleTechnology,
    toggleRole,
    clearFilters,
  } = useProjectFilters();

  const [selectedProject, setSelectedProject] =
    useState<ProjectResponse | null>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);

  // Compute available technologies and roles from fetched projects
  const availableTechnologies = useMemo(
    () => (projects ? getUniqueTechnologies(projects) : []),
    [projects],
  );

  const availableRoles = useMemo(
    () => (projects ? getUniqueRoles(projects) : []),
    [projects],
  );

  // Filter projects client-side
  const filteredProjects = useMemo(
    () =>
      projects
        ? filterProjects(projects, {
            technologies: selectedTechnologies,
            roles: selectedRoles,
          })
        : [],
    [projects, selectedTechnologies, selectedRoles],
  );

  const handleProjectClick = (project: ProjectResponse) => {
    setSelectedProject(project);
    setIsModalOpen(true);
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
    setTimeout(() => setSelectedProject(null), 200);
  };

  return (
    <div className="bg-background overflow-x-hidden py-8 md:py-12">
      <Container>
        <div className="space-y-8">
          {/* Hero Section */}
          <div className="space-y-4">
            <h1 className="text-primary text-4xl font-bold md:text-5xl">
              Portfolio
            </h1>
            <p className="text-lg text-gray-400">
              A showcase of diverse projects spanning frontend development, AI
              engineering, data analysis, product work, and marketing.
            </p>
          </div>

          {/* Error State */}
          {error && <ErrorMessage error={error} onRetry={refetch} />}

          {/* Filters Section - only show if not in error state */}
          {!error && (
            <aside className="p-y-4 md:p-y-6 bg-gray-900/30">
              <ProjectFilters
                selectedTechnologies={selectedTechnologies}
                selectedRoles={selectedRoles}
                availableTechnologies={availableTechnologies}
                availableRoles={availableRoles}
                onTechnologyToggle={toggleTechnology}
                onRoleToggle={toggleRole}
                onClearFilters={clearFilters}
              />
            </aside>
          )}

          {/* Projects Grid - passes loading and error states */}
          {!error && (
            <section>
              <ProjectGrid
                projects={filteredProjects}
                onProjectClick={handleProjectClick}
                isLoading={isLoading}
              />
            </section>
          )}
        </div>
      </Container>

      {/* Project Detail Modal */}
      <ProjectDetailModal
        project={selectedProject}
        isOpen={isModalOpen}
        onClose={handleCloseModal}
      />
    </div>
  );
}
