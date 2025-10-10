import { Button } from '@/components/ui/button';
import { MultiSelect } from '@/components/ui/multi-select';
import type { Technology, Role } from '@/types/project';

export interface ProjectFiltersProps {
  selectedTechnologies: Technology[];
  selectedRoles: Role[];
  availableTechnologies: Technology[];
  availableRoles: Role[];
  onTechnologyToggle: (tech: Technology) => void;
  onRoleToggle: (role: Role) => void;
  onClearFilters: () => void;
}

export function ProjectFilters({
  selectedTechnologies,
  selectedRoles,
  availableTechnologies,
  availableRoles,
  onTechnologyToggle,
  onRoleToggle,
  onClearFilters,
}: ProjectFiltersProps) {
  const hasActiveFilters =
    selectedTechnologies.length > 0 || selectedRoles.length > 0;

  return (
    <div className="space-y-4">
      {/* Header with Clear Filters button */}
      <div className="flex items-center justify-between">
        <h2 className="text-primary text-xl font-semibold">Filters</h2>
        {hasActiveFilters && (
          <Button
            variant="ghost"
            size="sm"
            onClick={onClearFilters}
            className="hover:text-primary text-gray-400"
          >
            Clear all
          </Button>
        )}
      </div>

      {/* Filter Dropdowns */}
      <div className="flex flex-row items-start gap-6">
        <MultiSelect
          label="Technology"
          options={availableTechnologies}
          selectedValues={selectedTechnologies}
          onValueToggle={onTechnologyToggle}
          placeholder="Select technologies..."
        />
        <MultiSelect
          label="Role"
          options={availableRoles}
          selectedValues={selectedRoles}
          onValueToggle={onRoleToggle}
          placeholder="Select roles..."
        />
      </div>

      {/* Active filters summary */}
      {hasActiveFilters && (
        <div className="border-primary/20 bg-primary/5 rounded-md border p-3">
          <p className="text-sm text-gray-400">
            Showing projects matching{' '}
            {selectedTechnologies.length > 0 && selectedRoles.length > 0
              ? 'all selected filters'
              : selectedTechnologies.length > 0
                ? 'selected technologies'
                : 'selected roles'}
          </p>
        </div>
      )}
    </div>
  );
}
