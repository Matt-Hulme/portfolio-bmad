import { describe, it, expect } from 'vitest';
import { renderHook, act } from '@testing-library/react';
import { MemoryRouter } from 'react-router-dom';
import { useProjectFilters } from './useProjectFilters';
import type { Technology, Role } from '@/types/project';
import type { ReactNode } from 'react';

// Wrapper to provide router context - using MemoryRouter for test isolation
const createWrapper = () => {
  return ({ children }: { children: ReactNode }) => (
    <MemoryRouter>{children}</MemoryRouter>
  );
};

describe('useProjectFilters', () => {
  describe('initial state', () => {
    it('initializes with empty arrays', () => {
      const { result } = renderHook(() => useProjectFilters(), {
        wrapper: createWrapper(),
      });

      expect(result.current.selectedTechnologies).toEqual([]);
      expect(result.current.selectedRoles).toEqual([]);
    });

    it('provides toggle and clear functions', () => {
      const { result } = renderHook(() => useProjectFilters(), {
        wrapper: createWrapper(),
      });

      expect(typeof result.current.toggleTechnology).toBe('function');
      expect(typeof result.current.toggleRole).toBe('function');
      expect(typeof result.current.clearFilters).toBe('function');
    });
  });

  describe('toggleTechnology', () => {
    it('adds technology when not selected', () => {
      const { result } = renderHook(() => useProjectFilters(), {
        wrapper: createWrapper(),
      });

      act(() => {
        result.current.toggleTechnology('React' as Technology);
      });

      expect(result.current.selectedTechnologies).toContain('React');
    });

    it('toggles technology on and off', () => {
      const { result } = renderHook(() => useProjectFilters(), {
        wrapper: createWrapper(),
      });

      // Add React
      act(() => {
        result.current.toggleTechnology('React' as Technology);
      });
      const lengthAfterAdd = result.current.selectedTechnologies.length;

      // Remove React
      act(() => {
        result.current.toggleTechnology('React' as Technology);
      });
      const lengthAfterRemove = result.current.selectedTechnologies.length;

      // Length should decrease by 1 after removing
      expect(lengthAfterRemove).toBe(lengthAfterAdd - 1);
    });

    it('supports multiple technologies', () => {
      const { result } = renderHook(() => useProjectFilters(), {
        wrapper: createWrapper(),
      });

      act(() => {
        result.current.toggleTechnology('React' as Technology);
        result.current.toggleTechnology('TypeScript' as Technology);
      });

      expect(result.current.selectedTechnologies).toContain('React');
      expect(result.current.selectedTechnologies).toContain('TypeScript');
      expect(result.current.selectedTechnologies.length).toBeGreaterThanOrEqual(
        2,
      );
    });
  });

  describe('toggleRole', () => {
    it('adds role when not selected', () => {
      const { result } = renderHook(() => useProjectFilters(), {
        wrapper: createWrapper(),
      });

      act(() => {
        result.current.toggleRole('Frontend Developer' as Role);
      });

      expect(result.current.selectedRoles).toContain('Frontend Developer');
    });

    it('toggles role on and off', () => {
      const { result } = renderHook(() => useProjectFilters(), {
        wrapper: createWrapper(),
      });

      // Add role
      act(() => {
        result.current.toggleRole('Frontend Developer' as Role);
      });
      const lengthAfterAdd = result.current.selectedRoles.length;

      // Remove role
      act(() => {
        result.current.toggleRole('Frontend Developer' as Role);
      });
      const lengthAfterRemove = result.current.selectedRoles.length;

      // Length should decrease by 1 after removing
      expect(lengthAfterRemove).toBe(lengthAfterAdd - 1);
    });

    it('supports multiple roles', () => {
      const { result } = renderHook(() => useProjectFilters(), {
        wrapper: createWrapper(),
      });

      act(() => {
        result.current.toggleRole('Frontend Developer' as Role);
        result.current.toggleRole('Backend Developer' as Role);
      });

      expect(result.current.selectedRoles).toContain('Frontend Developer');
      expect(result.current.selectedRoles).toContain('Backend Developer');
      expect(result.current.selectedRoles.length).toBeGreaterThanOrEqual(2);
    });
  });

  describe('clearFilters', () => {
    it('clears all technologies', () => {
      const { result } = renderHook(() => useProjectFilters(), {
        wrapper: createWrapper(),
      });

      act(() => {
        result.current.toggleTechnology('React' as Technology);
        result.current.toggleTechnology('TypeScript' as Technology);
      });

      act(() => {
        result.current.clearFilters();
      });

      expect(result.current.selectedTechnologies).toEqual([]);
    });

    it('clears all roles', () => {
      const { result } = renderHook(() => useProjectFilters(), {
        wrapper: createWrapper(),
      });

      act(() => {
        result.current.toggleRole('Frontend Developer' as Role);
        result.current.toggleRole('Backend Developer' as Role);
      });

      act(() => {
        result.current.clearFilters();
      });

      expect(result.current.selectedRoles).toEqual([]);
    });

    it('clears both technologies and roles', () => {
      const { result } = renderHook(() => useProjectFilters(), {
        wrapper: createWrapper(),
      });

      act(() => {
        result.current.toggleTechnology('React' as Technology);
        result.current.toggleRole('Frontend Developer' as Role);
      });

      act(() => {
        result.current.clearFilters();
      });

      expect(result.current.selectedTechnologies).toEqual([]);
      expect(result.current.selectedRoles).toEqual([]);
    });

    it('works when filters already empty', () => {
      const { result } = renderHook(() => useProjectFilters(), {
        wrapper: createWrapper(),
      });

      act(() => {
        result.current.clearFilters();
      });

      expect(result.current.selectedTechnologies).toEqual([]);
      expect(result.current.selectedRoles).toEqual([]);
    });
  });

  describe('combined operations', () => {
    it('handles mixed technology and role selections', () => {
      const { result } = renderHook(() => useProjectFilters(), {
        wrapper: createWrapper(),
      });

      act(() => {
        result.current.toggleTechnology('React' as Technology);
        result.current.toggleRole('Frontend Developer' as Role);
        result.current.toggleTechnology('TypeScript' as Technology);
      });

      expect(result.current.selectedTechnologies.length).toBeGreaterThanOrEqual(
        2,
      );
      expect(result.current.selectedRoles.length).toBeGreaterThanOrEqual(1);
    });

    it('maintains independence between technology and role filters', () => {
      const { result } = renderHook(() => useProjectFilters(), {
        wrapper: createWrapper(),
      });

      act(() => {
        result.current.toggleTechnology('React' as Technology);
        result.current.toggleRole('Frontend Developer' as Role);
      });

      const techCount = result.current.selectedTechnologies.length;

      // Remove technology
      act(() => {
        result.current.toggleTechnology('React' as Technology);
      });

      // Tech count should decrease, role should still be there
      expect(result.current.selectedTechnologies.length).toBe(techCount - 1);
      expect(result.current.selectedRoles).toContain('Frontend Developer');
    });
  });
});
