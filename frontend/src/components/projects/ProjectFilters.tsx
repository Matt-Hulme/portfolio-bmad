import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { MultiSelect } from '@/components/ui/multi-select';
import { X } from 'lucide-react';

export interface ProjectFiltersProps {
  selectedTechnologies: string[];
  selectedRoles: string[];
  availableTechnologies: string[];
  availableRoles: string[];
  onTechnologyToggle: (tech: string) => void;
  onRoleToggle: (role: string) => void;
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
      {/* Filter Dropdowns */}
      <div className="flex flex-col gap-4 md:flex-row md:gap-6">
        <MultiSelect
          label="Role"
          options={availableRoles}
          selectedValues={selectedRoles}
          onValueToggle={onRoleToggle}
        />
        <MultiSelect
          label="Technology"
          options={availableTechnologies}
          selectedValues={selectedTechnologies}
          onValueToggle={onTechnologyToggle}
        />
        <div className="flex flex-row md:items-end">
          {hasActiveFilters && (
            <Button
              variant="ghost"
              size="sm"
              onClick={onClearFilters}
              className="hover:text-primary text-gray-400"
            >
              Clear
            </Button>
          )}
        </div>
      </div>

      {/* Selected filters badges */}
      <div className="flex min-h-[40px] flex-wrap items-center gap-2">
        {!hasActiveFilters ? (
          <Badge
            variant="outline"
            className="border-gray-700 bg-gray-800/50 text-gray-400"
          >
            All Projects
          </Badge>
        ) : (
          <>
            {selectedRoles.map((role) => (
              <Badge
                key={role}
                variant="default"
                className="hover:bg-primary/90 cursor-pointer text-gray-900"
                onClick={() => onRoleToggle(role)}
              >
                {role}
                <X size={14} className="ml-1" />
              </Badge>
            ))}
            {selectedTechnologies.map((tech) => (
              <Badge
                key={tech}
                variant="outline"
                className="border-primary/20 bg-primary/5 text-primary hover:bg-primary/10 cursor-pointer font-mono"
                onClick={() => onTechnologyToggle(tech)}
              >
                {tech}
                <X size={14} className="ml-1" />
              </Badge>
            ))}
          </>
        )}
      </div>
    </div>
  );
}
