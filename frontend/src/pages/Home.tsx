import { Container } from '@/components/layout/Container';
import { ProjectGrid } from '@/components/projects/ProjectGrid';
import { getAllProjects } from '@/data/projects';

export function Home() {
  const projects = getAllProjects();

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

          {/* Projects Grid */}
          <section>
            <ProjectGrid
              projects={projects}
              onProjectClick={(project) => {
                // TODO: Open modal in Story 1.7
                console.log('Project clicked:', project.slug);
              }}
            />
          </section>
        </div>
      </Container>
    </div>
  );
}
