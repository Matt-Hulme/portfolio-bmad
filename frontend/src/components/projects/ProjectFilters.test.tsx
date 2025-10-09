import { describe, it, expect, vi } from 'vitest';
import { render, screen } from '@testing-library/react';
import { userEvent } from '@testing-library/user-event';
import { ProjectFilters } from './ProjectFilters';
import type { Technology, Role } from '@/types/project';

describe('ProjectFilters', () => {
  const mockTechnologies: Technology[] = ['React', 'TypeScript', 'Python'];
  const mockRoles: Role[] = ['Frontend Developer', 'Backend Developer'];
  const mockOnTechnologyToggle = vi.fn();
  const mockOnRoleToggle = vi.fn();
  const mockOnClearFilters = vi.fn();

  const defaultProps = {
    selectedTechnologies: [] as Technology[],
    selectedRoles: [] as Role[],
    availableTechnologies: mockTechnologies,
    availableRoles: mockRoles,
    onTechnologyToggle: mockOnTechnologyToggle,
    onRoleToggle: mockOnRoleToggle,
    onClearFilters: mockOnClearFilters,
  };

  beforeEach(() => {
    vi.clearAllMocks();
  });

  describe('rendering', () => {
    it('renders filters heading', () => {
      render(<ProjectFilters {...defaultProps} />);
      expect(screen.getByText('Filters')).toBeInTheDocument();
    });

    it('renders technology section', () => {
      render(<ProjectFilters {...defaultProps} />);
      expect(screen.getByText('Technology')).toBeInTheDocument();
    });

    it('renders role section', () => {
      render(<ProjectFilters {...defaultProps} />);
      expect(screen.getByText('Role')).toBeInTheDocument();
    });

    it('renders all available technologies', () => {
      render(<ProjectFilters {...defaultProps} />);
      mockTechnologies.forEach((tech) => {
        expect(screen.getByText(tech)).toBeInTheDocument();
      });
    });

    it('renders all available roles', () => {
      render(<ProjectFilters {...defaultProps} />);
      mockRoles.forEach((role) => {
        expect(screen.getByText(role)).toBeInTheDocument();
      });
    });

    it('does not show clear button when no filters active', () => {
      render(<ProjectFilters {...defaultProps} />);
      expect(screen.queryByText('Clear all')).not.toBeInTheDocument();
    });

    it('shows clear button when technologies selected', () => {
      render(
        <ProjectFilters {...defaultProps} selectedTechnologies={['React']} />,
      );
      expect(screen.getByText('Clear all')).toBeInTheDocument();
    });

    it('shows clear button when roles selected', () => {
      render(
        <ProjectFilters
          {...defaultProps}
          selectedRoles={['Frontend Developer']}
        />,
      );
      expect(screen.getByText('Clear all')).toBeInTheDocument();
    });

    it('does not show active filters summary when no filters', () => {
      render(<ProjectFilters {...defaultProps} />);
      expect(
        screen.queryByText(/Showing projects matching/),
      ).not.toBeInTheDocument();
    });

    it('shows active filters summary when filters selected', () => {
      render(
        <ProjectFilters {...defaultProps} selectedTechnologies={['React']} />,
      );
      expect(screen.getByText(/Showing projects matching/)).toBeInTheDocument();
    });
  });

  describe('technology filter interaction', () => {
    it('calls onTechnologyToggle when technology clicked', async () => {
      const user = userEvent.setup();
      render(<ProjectFilters {...defaultProps} />);

      const reactBadge = screen.getByText('React');
      await user.click(reactBadge);

      expect(mockOnTechnologyToggle).toHaveBeenCalledWith('React');
      expect(mockOnTechnologyToggle).toHaveBeenCalledTimes(1);
    });

    it('calls onTechnologyToggle when technology pressed with Enter', async () => {
      const user = userEvent.setup();
      render(<ProjectFilters {...defaultProps} />);

      const reactBadge = screen.getByText('React');
      reactBadge.focus();
      await user.keyboard('{Enter}');

      expect(mockOnTechnologyToggle).toHaveBeenCalledWith('React');
    });

    it('calls onTechnologyToggle when technology pressed with Space', async () => {
      const user = userEvent.setup();
      render(<ProjectFilters {...defaultProps} />);

      const reactBadge = screen.getByText('React');
      reactBadge.focus();
      await user.keyboard(' ');

      expect(mockOnTechnologyToggle).toHaveBeenCalledWith('React');
    });

    it('shows X icon for selected technology', () => {
      render(
        <ProjectFilters {...defaultProps} selectedTechnologies={['React']} />,
      );

      const reactBadge = screen.getByText('React').parentElement;
      expect(reactBadge).not.toBeNull();
      // X icon is rendered within the badge
      const svg = reactBadge?.querySelector('svg');
      expect(svg).not.toBeNull();
    });
  });

  describe('role filter interaction', () => {
    it('calls onRoleToggle when role clicked', async () => {
      const user = userEvent.setup();
      render(<ProjectFilters {...defaultProps} />);

      const frontendBadge = screen.getByText('Frontend Developer');
      await user.click(frontendBadge);

      expect(mockOnRoleToggle).toHaveBeenCalledWith('Frontend Developer');
      expect(mockOnRoleToggle).toHaveBeenCalledTimes(1);
    });

    it('calls onRoleToggle when role pressed with Enter', async () => {
      const user = userEvent.setup();
      render(<ProjectFilters {...defaultProps} />);

      const frontendBadge = screen.getByText('Frontend Developer');
      frontendBadge.focus();
      await user.keyboard('{Enter}');

      expect(mockOnRoleToggle).toHaveBeenCalledWith('Frontend Developer');
    });

    it('calls onRoleToggle when role pressed with Space', async () => {
      const user = userEvent.setup();
      render(<ProjectFilters {...defaultProps} />);

      const frontendBadge = screen.getByText('Frontend Developer');
      frontendBadge.focus();
      await user.keyboard(' ');

      expect(mockOnRoleToggle).toHaveBeenCalledWith('Frontend Developer');
    });

    it('shows X icon for selected role', () => {
      render(
        <ProjectFilters
          {...defaultProps}
          selectedRoles={['Frontend Developer']}
        />,
      );

      const frontendBadge =
        screen.getByText('Frontend Developer').parentElement;
      expect(frontendBadge).not.toBeNull();
      const svg = frontendBadge?.querySelector('svg');
      expect(svg).not.toBeNull();
    });
  });

  describe('clear filters', () => {
    it('calls onClearFilters when clear button clicked', async () => {
      const user = userEvent.setup();
      render(
        <ProjectFilters {...defaultProps} selectedTechnologies={['React']} />,
      );

      const clearButton = screen.getByText('Clear all');
      await user.click(clearButton);

      expect(mockOnClearFilters).toHaveBeenCalledTimes(1);
    });
  });

  describe('filter summary messages', () => {
    it('shows technologies message when only technologies selected', () => {
      render(
        <ProjectFilters {...defaultProps} selectedTechnologies={['React']} />,
      );
      expect(screen.getByText(/selected technologies/)).toBeInTheDocument();
    });

    it('shows roles message when only roles selected', () => {
      render(
        <ProjectFilters
          {...defaultProps}
          selectedRoles={['Frontend Developer']}
        />,
      );
      expect(screen.getByText(/selected roles/)).toBeInTheDocument();
    });

    it('shows all filters message when both selected', () => {
      render(
        <ProjectFilters
          {...defaultProps}
          selectedTechnologies={['React']}
          selectedRoles={['Frontend Developer']}
        />,
      );
      expect(screen.getByText(/all selected filters/)).toBeInTheDocument();
    });
  });

  describe('accessibility', () => {
    it('technology badges have role="button"', () => {
      render(<ProjectFilters {...defaultProps} />);
      const reactBadge = screen.getByText('React');
      expect(reactBadge).toHaveAttribute('role', 'button');
    });

    it('role badges have role="button"', () => {
      render(<ProjectFilters {...defaultProps} />);
      const frontendBadge = screen.getByText('Frontend Developer');
      expect(frontendBadge).toHaveAttribute('role', 'button');
    });

    it('technology badges are keyboard accessible', () => {
      render(<ProjectFilters {...defaultProps} />);
      const reactBadge = screen.getByText('React');
      expect(reactBadge).toHaveAttribute('tabIndex', '0');
    });

    it('role badges are keyboard accessible', () => {
      render(<ProjectFilters {...defaultProps} />);
      const frontendBadge = screen.getByText('Frontend Developer');
      expect(frontendBadge).toHaveAttribute('tabIndex', '0');
    });
  });

  describe('visual states', () => {
    it('applies selected styles to selected technology', () => {
      render(
        <ProjectFilters {...defaultProps} selectedTechnologies={['React']} />,
      );
      const reactBadge = screen.getByText('React');
      expect(reactBadge.className).toContain('bg-primary/20');
      expect(reactBadge.className).toContain('text-primary');
    });

    it('applies unselected styles to unselected technology', () => {
      render(<ProjectFilters {...defaultProps} />);
      const reactBadge = screen.getByText('React');
      expect(reactBadge.className).toContain('border-gray-600');
      expect(reactBadge.className).toContain('text-gray-400');
    });

    it('applies selected styles to selected role', () => {
      render(
        <ProjectFilters
          {...defaultProps}
          selectedRoles={['Frontend Developer']}
        />,
      );
      const frontendBadge = screen.getByText('Frontend Developer');
      expect(frontendBadge.className).toContain('bg-primary/20');
      expect(frontendBadge.className).toContain('text-primary');
    });

    it('applies unselected styles to unselected role', () => {
      render(<ProjectFilters {...defaultProps} />);
      const frontendBadge = screen.getByText('Frontend Developer');
      expect(frontendBadge.className).toContain('border-gray-600');
      expect(frontendBadge.className).toContain('text-gray-400');
    });
  });
});
