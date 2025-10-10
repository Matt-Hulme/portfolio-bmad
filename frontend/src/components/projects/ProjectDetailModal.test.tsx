import { describe, it, expect, vi } from 'vitest';
import { render, screen } from '@testing-library/react';
import { userEvent } from '@testing-library/user-event';
import { ProjectDetailModal } from './ProjectDetailModal';
import type { Project } from '@/types/project';

const mockProject: Project = {
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
  roles: ['Frontend Developer', 'Backend Developer'],
  technologies: ['React', 'TypeScript', 'Node.js'],
  industry: 'Technology',
  links: [
    { label: 'Live Site', url: 'https://example.com', type: 'live' },
    { label: 'GitHub', url: 'https://github.com/test', type: 'github' },
  ],
  images: [
    {
      url: '/test-image-1.jpg',
      alt: 'Test image 1',
      caption: 'First test image',
    },
    {
      url: '/test-image-2.jpg',
      alt: 'Test image 2',
      caption: 'Second test image',
    },
  ],
  featured: true,
  dateCompleted: '2025-01-15',
};

const mockProjectNoLinksNoImages: Project = {
  id: '2',
  slug: 'minimal-project',
  title: 'Minimal Project',
  summary: 'A minimal project',
  description: 'Simple description',
  roles: ['Developer'],
  technologies: ['JavaScript'],
  industry: 'SaaS',
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

  it('displays completion date', () => {
    render(
      <ProjectDetailModal
        project={mockProject}
        isOpen={true}
        onClose={vi.fn()}
      />,
    );
    expect(screen.getByText(/Completed: January 2025/i)).toBeInTheDocument();
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

  it('displays industry', () => {
    render(
      <ProjectDetailModal
        project={mockProject}
        isOpen={true}
        onClose={vi.fn()}
      />,
    );
    expect(screen.getByText('Technology')).toBeInTheDocument();
  });

  it('displays project links section when links exist', () => {
    render(
      <ProjectDetailModal
        project={mockProject}
        isOpen={true}
        onClose={vi.fn()}
      />,
    );
    expect(
      screen.getByRole('heading', { name: 'Project Links' }),
    ).toBeInTheDocument();
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
      screen.queryByRole('heading', { name: 'Project Links' }),
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
    expect(
      screen.getByRole('heading', { name: 'Gallery' }),
    ).toBeInTheDocument();
    const images = screen.getAllByRole('img');
    expect(images).toHaveLength(2);
    expect(images[0]).toHaveAttribute('src', '/test-image-1.jpg');
    expect(images[0]).toHaveAttribute('alt', 'Test image 1');
    expect(images[1]).toHaveAttribute('src', '/test-image-2.jpg');
    expect(images[1]).toHaveAttribute('alt', 'Test image 2');
  });

  it('displays image captions', () => {
    render(
      <ProjectDetailModal
        project={mockProject}
        isOpen={true}
        onClose={vi.fn()}
      />,
    );
    expect(screen.getByText('First test image')).toBeInTheDocument();
    expect(screen.getByText('Second test image')).toBeInTheDocument();
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
    expect(
      screen.queryByRole('heading', { name: 'Gallery' }),
    ).not.toBeInTheDocument();
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
