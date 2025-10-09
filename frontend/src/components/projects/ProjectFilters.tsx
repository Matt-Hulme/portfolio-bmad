import { X } from 'lucide-react';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
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
    <div className="space-y-6">
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

      {/* Technology Filters */}
      <div className="space-y-3">
        <h3 className="text-sm font-medium text-gray-300">Technology</h3>
        <div className="flex flex-wrap gap-2">
          {availableTechnologies.map((tech) => {
            const isSelected = selectedTechnologies.includes(tech);
            return (
              <Badge
                key={tech}
                variant={isSelected ? 'default' : 'outline'}
                className={`cursor-pointer transition-all ${
                  isSelected
                    ? 'bg-primary/20 text-primary hover:bg-primary/30'
                    : 'hover:border-primary/50 hover:text-primary border-gray-600 text-gray-400'
                }`}
                onClick={() => onTechnologyToggle(tech)}
                role="button"
                tabIndex={0}
                onKeyDown={(e) => {
                  if (e.key === 'Enter' || e.key === ' ') {
                    e.preventDefault();
                    onTechnologyToggle(tech);
                  }
                }}
              >
                {tech}
                {isSelected && <X size={14} className="ml-1" />}
              </Badge>
            );
          })}
        </div>
      </div>

      {/* Role Filters */}
      <div className="space-y-3">
        <h3 className="text-sm font-medium text-gray-300">Role</h3>
        <div className="flex flex-wrap gap-2">
          {availableRoles.map((role) => {
            const isSelected = selectedRoles.includes(role);
            return (
              <Badge
                key={role}
                variant={isSelected ? 'default' : 'outline'}
                className={`cursor-pointer transition-all ${
                  isSelected
                    ? 'bg-primary/20 text-primary hover:bg-primary/30'
                    : 'hover:border-primary/50 hover:text-primary border-gray-600 text-gray-400'
                }`}
                onClick={() => onRoleToggle(role)}
                role="button"
                tabIndex={0}
                onKeyDown={(e) => {
                  if (e.key === 'Enter' || e.key === ' ') {
                    e.preventDefault();
                    onRoleToggle(role);
                  }
                }}
              >
                {role}
                {isSelected && <X size={14} className="ml-1" />}
              </Badge>
            );
          })}
        </div>
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
