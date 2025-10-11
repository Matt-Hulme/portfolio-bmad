import { useState, useEffect, useCallback, useMemo } from 'react';
import { useSearchParams } from 'react-router-dom';

export function useProjectFilters() {
  const [searchParams, setSearchParams] = useSearchParams();

  // Initialize state from URL params ONCE on mount
  const initialTechnologies = useMemo((): string[] => {
    const techParam = searchParams.get('tech');
    if (!techParam) return [];
    return techParam.split(',').filter(Boolean);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []); // Empty deps = only run once on mount

  const initialRoles = useMemo((): string[] => {
    const roleParam = searchParams.get('role');
    if (!roleParam) return [];
    return roleParam.split(',').filter(Boolean);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []); // Empty deps = only run once on mount

  const [selectedTechnologies, setSelectedTechnologies] =
    useState<string[]>(initialTechnologies);
  const [selectedRoles, setSelectedRoles] = useState<string[]>(initialRoles);

  // Sync state with URL params
  useEffect(() => {
    const newParams = new URLSearchParams();

    if (selectedTechnologies.length > 0) {
      newParams.set('tech', selectedTechnologies.join(','));
    }

    if (selectedRoles.length > 0) {
      newParams.set('role', selectedRoles.join(','));
    }

    // Only update if params actually changed
    const currentParamStr = searchParams.toString();
    const newParamStr = newParams.toString();
    if (currentParamStr !== newParamStr) {
      setSearchParams(newParams, { replace: true });
    }
  }, [selectedTechnologies, selectedRoles, setSearchParams, searchParams]);

  const toggleTechnology = useCallback((tech: string) => {
    setSelectedTechnologies((prev) =>
      prev.includes(tech) ? prev.filter((t) => t !== tech) : [...prev, tech],
    );
  }, []);

  const toggleRole = useCallback((role: string) => {
    setSelectedRoles((prev) =>
      prev.includes(role) ? prev.filter((r) => r !== role) : [...prev, role],
    );
  }, []);

  const clearFilters = useCallback(() => {
    setSelectedTechnologies([]);
    setSelectedRoles([]);
  }, []);

  return {
    selectedTechnologies,
    selectedRoles,
    toggleTechnology,
    toggleRole,
    clearFilters,
  };
}
