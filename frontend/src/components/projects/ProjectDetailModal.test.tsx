import { describe, it, expect, vi } from 'vitest';
import { render, screen } from '@testing-library/react';
import { userEvent } from '@testing-library/user-event';
import { ProjectDetailModal } from './ProjectDetailModal';
import type { ProjectResponse } from '@/lib/api';

const mockProject: ProjectResponse = {
  id: '1',
  slug: 'test-project',
  title: 'Test Project',
  summary: 'A test project summary',
  description: `# Test Project

This is a **test** project with markdown support.

## Features
- Feature 1
- Feature 2

\`\`\`javascript
const test = true;
\`\`\`
`,
  roles: [
    { id: '1', name: 'Frontend Developer' },
    { id: '2', name: 'Backend Developer' },
  ],
  technologies: [
    { id: '1', name: 'React' },
    { id: '2', name: 'TypeScript' },
    { id: '3', name: 'Node.js' },
  ],
  liveUrl: 'https://example.com',
  githubUrl: 'https://github.com/test',
  images: [
    {
      id: '1',
      projectId: '1',
      url: '/test-image-1.jpg',
      altText: 'Test image 1',
      order: 1,
    },
    {
      id: '2',
      projectId: '1',
      url: '/test-image-2.jpg',
      altText: 'Test image 2',
      order: 2,
    },
  ],
};

const mockProjectNoLinksNoImages: ProjectResponse = {
  id: '2',
  slug: 'minimal-project',
  title: 'Minimal Project',
  summary: 'A minimal project',
  description: 'Simple description',
  roles: [{ id: '3', name: 'Full-Stack Developer' }],
  technologies: [{ id: '4', name: 'JavaScript' }],
  liveUrl: null,
  githubUrl: null,
  images: [],
};

describe('ProjectDetailModal', () => {
  it('renders nothing when project is null', () => {
    const { container } = render(
      <ProjectDetailModal project={null} isOpen={true} onClose={vi.fn()} />,
    );
    expect(container.firstChild).toBeNull();
  });

  it('renders nothing when isOpen is false', () => {
    render(
      <ProjectDetailModal
        project={mockProject}
        isOpen={false}
        onClose={vi.fn()}
      />,
    );
    // Dialog should not be visible when closed
    expect(screen.queryByRole('dialog')).not.toBeInTheDocument();
  });

  it('renders modal when open with project', () => {
    render(
      <ProjectDetailModal
        project={mockProject}
        isOpen={true}
        onClose={vi.fn()}
      />,
    );
    expect(screen.getByRole('dialog')).toBeInTheDocument();
  });

  it('displays project title', () => {
    render(
      <ProjectDetailModal
        project={mockProject}
        isOpen={true}
        onClose={vi.fn()}
      />,
    );
    // Dialog title should be present (there may be multiple "Test Project" headings from markdown)
    const headings = screen.getAllByRole('heading', { name: 'Test Project' });
    expect(headings.length).toBeGreaterThan(0);
  });

  it('renders markdown description', () => {
    render(
      <ProjectDetailModal
        project={mockProject}
        isOpen={true}
        onClose={vi.fn()}
      />,
    );
    // Check for markdown-rendered heading
    expect(
      screen.getByRole('heading', { name: 'Features' }),
    ).toBeInTheDocument();
    // Check for bold text
    expect(screen.getByText('test')).toBeInTheDocument();
    // Check for list items
    expect(screen.getByText('Feature 1')).toBeInTheDocument();
    expect(screen.getByText('Feature 2')).toBeInTheDocument();
  });

  it('displays all roles', () => {
    render(
      <ProjectDetailModal
        project={mockProject}
        isOpen={true}
        onClose={vi.fn()}
      />,
    );
    expect(screen.getByText('Frontend Developer')).toBeInTheDocument();
    expect(screen.getByText('Backend Developer')).toBeInTheDocument();
  });

  it('displays all technologies', () => {
    render(
      <ProjectDetailModal
        project={mockProject}
        isOpen={true}
        onClose={vi.fn()}
      />,
    );
    expect(screen.getByText('React')).toBeInTheDocument();
    expect(screen.getByText('TypeScript')).toBeInTheDocument();
    expect(screen.getByText('Node.js')).toBeInTheDocument();
  });

  it('displays project links section when links exist', () => {
    render(
      <ProjectDetailModal
        project={mockProject}
        isOpen={true}
        onClose={vi.fn()}
      />,
    );
    expect(screen.getByRole('link', { name: /Live Site/i })).toHaveAttribute(
      'href',
      'https://example.com',
    );
    expect(screen.getByRole('link', { name: /GitHub/i })).toHaveAttribute(
      'href',
      'https://github.com/test',
    );
  });

  it('displays links with correct target and rel attributes', () => {
    render(
      <ProjectDetailModal
        project={mockProject}
        isOpen={true}
        onClose={vi.fn()}
      />,
    );
    const liveLink = screen.getByRole('link', { name: /Live Site/i });
    expect(liveLink).toHaveAttribute('target', '_blank');
    expect(liveLink).toHaveAttribute('rel', 'noopener noreferrer');
  });

  it('hides links section when no links exist', () => {
    render(
      <ProjectDetailModal
        project={mockProjectNoLinksNoImages}
        isOpen={true}
        onClose={vi.fn()}
      />,
    );
    expect(
      screen.queryByRole('link', { name: /Live Site/i }),
    ).not.toBeInTheDocument();
    expect(
      screen.queryByRole('link', { name: /GitHub/i }),
    ).not.toBeInTheDocument();
  });

  it('displays gallery section when images exist', () => {
    render(
      <ProjectDetailModal
        project={mockProject}
        isOpen={true}
        onClose={vi.fn()}
      />,
    );
    const images = screen.getAllByRole('img');
    expect(images).toHaveLength(2);
    expect(images[0]).toHaveAttribute('src', '/test-image-1.jpg');
    expect(images[0]).toHaveAttribute('alt', 'Test image 1'); // altText in API
    expect(images[1]).toHaveAttribute('src', '/test-image-2.jpg');
    expect(images[1]).toHaveAttribute('alt', 'Test image 2'); // altText in API
  });

  it('images have lazy loading attribute', () => {
    render(
      <ProjectDetailModal
        project={mockProject}
        isOpen={true}
        onClose={vi.fn()}
      />,
    );
    const images = screen.getAllByRole('img');
    images.forEach((img) => {
      expect(img).toHaveAttribute('loading', 'lazy');
    });
  });

  it('hides gallery section when no images exist', () => {
    render(
      <ProjectDetailModal
        project={mockProjectNoLinksNoImages}
        isOpen={true}
        onClose={vi.fn()}
      />,
    );
    expect(screen.queryByRole('img')).not.toBeInTheDocument();
  });

  it('calls onClose when dialog close event triggered', async () => {
    const onClose = vi.fn();
    const user = userEvent.setup();

    render(
      <ProjectDetailModal
        project={mockProject}
        isOpen={true}
        onClose={onClose}
      />,
    );

    // Find and click the close button (X button in DialogContent)
    const closeButton = screen.getByRole('button', { name: /close/i });
    await user.click(closeButton);

    expect(onClose).toHaveBeenCalled();
  });
});
