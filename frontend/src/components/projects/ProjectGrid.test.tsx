import { describe, it, expect, vi } from 'vitest';
import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { ProjectGrid } from './ProjectGrid';
import type { Project } from '@/types/project';

const mockProjects: Project[] = [
  {
    id: '1',
    slug: 'project-one',
    title: 'Project One',
    summary: 'First project summary',
    description: 'Description one',
    roles: ['Frontend Developer'],
    technologies: ['React', 'TypeScript'],
    industry: 'Technology',
  },
  {
    id: '2',
    slug: 'project-two',
    title: 'Project Two',
    summary: 'Second project summary',
    description: 'Description two',
    roles: ['Backend Developer'],
    technologies: ['Node.js', 'PostgreSQL'],
    industry: 'Finance',
  },
  {
    id: '3',
    slug: 'project-three',
    title: 'Project Three',
    summary: 'Third project summary',
    description: 'Description three',
    roles: ['Full-Stack Developer'],
    technologies: ['React', 'Node.js'],
    industry: 'E-commerce',
  },
];

describe('ProjectGrid', () => {
  it('renders all projects', () => {
    render(<ProjectGrid projects={mockProjects} />);

    // Slugs are displayed with hyphens replaced by spaces
    expect(screen.getByText('project one')).toBeInTheDocument();
    expect(screen.getByText('project two')).toBeInTheDocument();
    expect(screen.getByText('project three')).toBeInTheDocument();
  });

  it('renders correct number of project cards', () => {
    render(<ProjectGrid projects={mockProjects} />);

    const cards = screen.getAllByRole('button');
    expect(cards).toHaveLength(3);
  });

  it('displays empty state when no projects', () => {
    render(<ProjectGrid projects={[]} />);

    expect(
      screen.getByText('No projects match your filters'),
    ).toBeInTheDocument();
    expect(
      screen.getByText(/Try adjusting or clearing your filters/),
    ).toBeInTheDocument();
  });

  it('calls onProjectClick with correct project when card is clicked', async () => {
    const user = userEvent.setup();
    const handleProjectClick = vi.fn();

    render(
      <ProjectGrid
        projects={mockProjects}
        onProjectClick={handleProjectClick}
      />,
    );

    const firstCard = screen
      .getByText('project one')
      .closest('[role="button"]');
    if (firstCard) {
      await user.click(firstCard);
    }

    expect(handleProjectClick).toHaveBeenCalledTimes(1);
    expect(handleProjectClick).toHaveBeenCalledWith(mockProjects[0]);
  });

  it('uses grid layout with responsive columns', () => {
    const { container } = render(<ProjectGrid projects={mockProjects} />);

    const grid = container.querySelector('.grid');
    expect(grid).toHaveClass('grid-cols-1');
    expect(grid).toHaveClass('md:grid-cols-2');
  });

  it('renders projects with unique keys', () => {
    const { container } = render(<ProjectGrid projects={mockProjects} />);

    const cards = container.querySelectorAll('[role="button"]');
    expect(cards).toHaveLength(3);

    // Each card should have unique content (slugs displayed with spaces)
    mockProjects.forEach((project) => {
      const slugAsText = project.slug.replace(/-/g, ' ');
      expect(screen.getByText(slugAsText)).toBeInTheDocument();
    });
  });
});
