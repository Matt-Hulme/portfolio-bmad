import * as React from 'react';
import { Check, ChevronDown } from 'lucide-react';
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from '@/components/ui/popover';
import { cn } from '@/lib/utils';

export interface MultiSelectProps<T extends string = string> {
  label: string;
  options: T[];
  selectedValues: T[];
  onValueToggle: (value: T) => void;
}

export function MultiSelect<T extends string = string>({
  label,
  options,
  selectedValues,
  onValueToggle,
}: MultiSelectProps<T>) {
  const [open, setOpen] = React.useState(false);

  return (
    <div className="w-full md:w-40 md:flex-shrink-0">
      <label className="mb-2 block text-sm font-medium text-gray-300">
        {label}
      </label>

      <Popover open={open} onOpenChange={setOpen}>
        <PopoverTrigger asChild>
          <button
            role="combobox"
            aria-expanded={open}
            data-testid={`filter-${label.toLowerCase()}`}
            className="focus:ring-primary flex h-9 w-full items-center justify-between rounded-md border border-gray-700 bg-gray-800 px-3 py-2 text-sm text-gray-200 shadow-sm hover:bg-gray-700 hover:text-gray-100 focus:ring-1 focus:outline-none"
          >
            {selectedValues.length > 0 ? (
              <span className="truncate">{`${selectedValues.length} selected`}</span>
            ) : (
              <span className="text-gray-500">-</span>
            )}
            <ChevronDown className="ml-2 h-4 w-4 shrink-0 opacity-50" />
          </button>
        </PopoverTrigger>
        <PopoverContent
          className="w-[--radix-popover-trigger-width] border-gray-700 bg-gray-900 p-0"
          align="start"
        >
          <div className="max-h-[300px] overflow-y-auto p-1 [&::-webkit-scrollbar]:w-2 [&::-webkit-scrollbar-thumb]:rounded-full [&::-webkit-scrollbar-thumb]:bg-gray-600 hover:[&::-webkit-scrollbar-thumb]:bg-gray-500 [&::-webkit-scrollbar-track]:bg-gray-800">
            {options.map((option) => {
              const isSelected = selectedValues.includes(option);
              return (
                <div
                  key={option}
                  role="option"
                  aria-selected={isSelected}
                  className={cn(
                    'text-primary flex cursor-pointer items-center gap-2 rounded-sm px-2 py-1.5 text-sm hover:bg-gray-800',
                    isSelected && 'bg-gray-800/70',
                  )}
                  onClick={() => onValueToggle(option)}
                >
                  <span className="flex-1">{option}</span>
                  {isSelected && (
                    <Check className="text-primary h-5 w-5 stroke-[3]" />
                  )}
                </div>
              );
            })}
          </div>
        </PopoverContent>
      </Popover>
    </div>
  );
}
