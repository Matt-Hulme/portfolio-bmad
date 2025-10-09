import * as React from 'react';
import { Check, ChevronDown, X } from 'lucide-react';
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from '@/components/ui/popover';
import { Badge } from '@/components/ui/badge';
import { cn } from '@/lib/utils';

export interface MultiSelectProps {
  label: string;
  options: string[];
  selectedValues: string[];
  onValueToggle: (value: string) => void;
  placeholder?: string;
}

export function MultiSelect({
  label,
  options,
  selectedValues,
  onValueToggle,
  placeholder = 'Select...',
}: MultiSelectProps) {
  const [open, setOpen] = React.useState(false);

  return (
    <div className="space-y-2">
      <label className="text-sm font-medium text-gray-300">{label}</label>

      <Popover open={open} onOpenChange={setOpen}>
        <PopoverTrigger asChild>
          <button
            role="combobox"
            aria-expanded={open}
            className="focus:ring-primary flex h-9 w-full items-center justify-between rounded-md border border-gray-700 bg-gray-900/50 px-3 py-2 text-sm shadow-sm hover:bg-gray-800/50 hover:text-gray-100 focus:ring-1 focus:outline-none"
          >
            {selectedValues.length > 0
              ? `${selectedValues.length} selected`
              : placeholder}
            <ChevronDown className="ml-2 h-4 w-4 shrink-0 opacity-50" />
          </button>
        </PopoverTrigger>
        <PopoverContent
          className="w-[--radix-popover-trigger-width] p-0"
          align="start"
        >
          <div className="max-h-[300px] overflow-y-auto p-1">
            {options.map((option) => {
              const isSelected = selectedValues.includes(option);
              return (
                <div
                  key={option}
                  className={cn(
                    'hover:bg-accent flex cursor-pointer items-center gap-2 rounded-sm px-2 py-1.5 text-sm',
                    isSelected && 'bg-accent/50',
                  )}
                  onClick={() => onValueToggle(option)}
                >
                  <span className="flex-1">{option}</span>
                  {isSelected && <Check className="text-primary h-4 w-4" />}
                </div>
              );
            })}
          </div>
        </PopoverContent>
      </Popover>

      {/* Selected values as dismissible chips */}
      {selectedValues.length > 0 && (
        <div className="flex flex-wrap gap-2">
          {selectedValues.map((value) => (
            <Badge
              key={value}
              variant="default"
              className="bg-primary/20 text-primary hover:bg-primary/30 cursor-pointer"
              onClick={() => onValueToggle(value)}
            >
              {value}
              <X size={14} className="ml-1" />
            </Badge>
          ))}
        </div>
      )}
    </div>
  );
}
