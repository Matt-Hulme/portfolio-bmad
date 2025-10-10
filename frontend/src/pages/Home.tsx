import { useState } from 'react';
import { Container } from '@/components/layout/Container';
import { ProjectGrid } from '@/components/projects/ProjectGrid';
import { ProjectFilters } from '@/components/projects/ProjectFilters';
import { ProjectDetailModal } from '@/components/projects/ProjectDetailModal';
import {
  filterProjects,
  getUniqueTechnologies,
  getUniqueRoles,
} from '@/data/projects';
import { useProjectFilters } from '@/hooks/useProjectFilters';
import type { Project } from '@/types/project';

export function Home() {
  const {
    selectedTechnologies,
    selectedRoles,
    toggleTechnology,
    toggleRole,
    clearFilters,
  } = useProjectFilters();

  const [selectedProject, setSelectedProject] = useState<Project | null>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);

  const availableTechnologies = getUniqueTechnologies();
  const availableRoles = getUniqueRoles();

  const filteredProjects = filterProjects({
    technologies: selectedTechnologies,
    roles: selectedRoles,
  });

  const handleProjectClick = (project: Project) => {
    setSelectedProject(project);
    setIsModalOpen(true);
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
    setTimeout(() => setSelectedProject(null), 200);
  };

  return (
    <div className="bg-background py-12">
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

          {/* Filters Section */}
          <aside className="rounded-lg border border-gray-800 bg-gray-900/30 p-6">
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

          {/* Projects Grid */}
          <section>
            <ProjectGrid
              projects={filteredProjects}
              onProjectClick={handleProjectClick}
            />
          </section>
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
