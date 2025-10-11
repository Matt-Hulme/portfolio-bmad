import { describe, it, expect, vi } from 'vitest';
import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { ProjectCard } from './ProjectCard';
import type { ProjectResponse } from '@/lib/api';

const mockProject: ProjectResponse = {
  id: 1,
  slug: 'test-project',
  title: 'Test Project',
  summary: 'A test project summary',
  description: 'Full description',
  roles: [
    { id: 1, name: 'Frontend Developer' },
    { id: 2, name: 'Backend Developer' },
  ],
  technologies: [
    { id: 1, name: 'React' },
    { id: 2, name: 'TypeScript' },
    { id: 3, name: 'Node.js' },
  ],
  industry: 'Technology',
  liveUrl: null,
  githubUrl: null,
  images: [],
};

const mockProjectWithLiveLink: ProjectResponse = {
  ...mockProject,
  liveUrl: 'https://example.com',
  githubUrl: 'https://github.com/test',
};

const mockProjectWithManyTechs: ProjectResponse = {
  ...mockProject,
  technologies: [
    { id: 1, name: 'React' },
    { id: 2, name: 'TypeScript' },
    { id: 3, name: 'Node.js' },
    { id: 4, name: 'PostgreSQL' },
    { id: 5, name: 'Redis' },
    { id: 6, name: 'Docker' },
    { id: 7, name: 'Kubernetes' },
    { id: 8, name: 'AWS' },
    { id: 9, name: 'GraphQL' },
    { id: 10, name: 'TailwindCSS' },
  ],
};

describe('ProjectCard', () => {
  it('renders project slug as title', () => {
    render(<ProjectCard project={mockProject} />);
    // Slug "test-project" is displayed as "test project" (with spaces, capitalized via CSS)
    expect(screen.getByText('test project')).toBeInTheDocument();
  });

  it('renders project summary', () => {
    render(<ProjectCard project={mockProject} />);
    expect(screen.getByText('A test project summary')).toBeInTheDocument();
  });

  it('renders all role badges', () => {
    render(<ProjectCard project={mockProject} />);
    expect(screen.getByText('Frontend Developer')).toBeInTheDocument();
    expect(screen.getByText('Backend Developer')).toBeInTheDocument();
  });

  it('renders technology line with $ prefix', () => {
    render(<ProjectCard project={mockProject} />);
    const techLine = screen.getByText('React, TypeScript, Node.js');
    expect(techLine).toBeInTheDocument();

    // Check that $ prefix exists in the parent
    const techContainer = techLine.parentElement;
    expect(techContainer?.textContent).toContain('$');
  });

  it('shows LIVE indicator when project has live link', () => {
    render(<ProjectCard project={mockProjectWithLiveLink} />);
    expect(screen.getByText('LIVE')).toBeInTheDocument();
    expect(screen.getByTitle('Live project')).toBeInTheDocument();
  });

  it('does not show LIVE indicator when project has no live link', () => {
    render(<ProjectCard project={mockProject} />);
    expect(screen.queryByText('LIVE')).not.toBeInTheDocument();
  });

  it('truncates long technology list with ellipsis', () => {
    render(<ProjectCard project={mockProjectWithManyTechs} />);
    const techText = screen.getByText(/React, TypeScript/);
    expect(techText.textContent).toContain('...');
  });

  it('calls onClick handler when card is clicked', async () => {
    const user = userEvent.setup();
    const handleClick = vi.fn();

    render(<ProjectCard project={mockProject} onClick={handleClick} />);

    const card = screen.getByRole('button');
    await user.click(card);

    expect(handleClick).toHaveBeenCalledTimes(1);
  });

  it('calls onClick handler when Enter key is pressed', async () => {
    const user = userEvent.setup();
    const handleClick = vi.fn();

    render(<ProjectCard project={mockProject} onClick={handleClick} />);

    const card = screen.getByRole('button');
    card.focus();
    await user.keyboard('{Enter}');

    expect(handleClick).toHaveBeenCalledTimes(1);
  });

  it('calls onClick handler when Space key is pressed', async () => {
    const user = userEvent.setup();
    const handleClick = vi.fn();

    render(<ProjectCard project={mockProject} onClick={handleClick} />);

    const card = screen.getByRole('button');
    card.focus();
    await user.keyboard(' ');

    expect(handleClick).toHaveBeenCalledTimes(1);
  });

  it('is keyboard focusable', () => {
    render(<ProjectCard project={mockProject} />);

    const card = screen.getByRole('button');
    expect(card).toHaveAttribute('tabIndex', '0');
  });

  it('has proper accessibility role', () => {
    render(<ProjectCard project={mockProject} />);

    expect(screen.getByRole('button')).toBeInTheDocument();
  });
});
