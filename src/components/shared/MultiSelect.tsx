"use client";

import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";
import {
  Command,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
} from "@/components/ui/command";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { Check, ChevronsUpDown, X } from "lucide-react";
import { useState } from "react";

export interface MultiSelectOption {
  value: string;
  label: string;
}

interface MultiSelectProps {
  value: string[];
  onChange: (value: string[]) => void;
  options: MultiSelectOption[];
  placeholder?: string;
  searchPlaceholder?: string;
  emptyMessage?: string;
  triggerClassName?: string;
  showBadges?: boolean;
}

const MultiSelect = ({
  value = [],
  onChange,
  options,
  placeholder = "Select options",
  searchPlaceholder = "Search...",
  emptyMessage = "No options found.",
  triggerClassName = "w-full",
  showBadges = true,
}: MultiSelectProps) => {
  const [open, setOpen] = useState(false);

  const toggleOption = (optionValue: string) => {
    const newValue = value.includes(optionValue)
      ? value.filter((item) => item !== optionValue)
      : [...value, optionValue];

    onChange(newValue);
  };

  const removeOption = (optionValue: string) => {
    onChange(value.filter((item) => item !== optionValue));
  };

  const selectedOptions = options.filter((option) =>
    value.includes(option.value),
  );

  return (
    <div className="flex flex-col gap-2">
      <Popover open={open} onOpenChange={setOpen}>
        <PopoverTrigger asChild>
          <Button
            type="button"
            variant="outline"
            role="combobox"
            aria-expanded={open}
            className={`h-11 justify-between border-white/10 bg-[#0b1222] text-white hover:bg-[#0b1222] hover:text-white ${triggerClassName}`}
          >
            {value.length > 0 ? `${value.length} selected` : placeholder}
            <ChevronsUpDown className="ml-2 h-4 w-4 shrink-0 opacity-50" />
          </Button>
        </PopoverTrigger>

        <PopoverContent className={`p-0 ${triggerClassName}`} align="start">
          <Command className="bg-[#0b1222] text-white">
            <CommandInput placeholder={searchPlaceholder} />
            <CommandList>
              <CommandEmpty>{emptyMessage}</CommandEmpty>

              <CommandGroup>
                {options.map((option) => {
                  const isSelected = value.includes(option.value);

                  return (
                    <CommandItem
                      key={option.value}
                      value={option.label}
                      onSelect={() => toggleOption(option.value)}
                      className={isSelected ? "bg-white/10" : ""}
                    >
                      <Checkbox checked={isSelected} className="mr-2" />
                      <span className={isSelected ? "font-medium" : ""}>
                        {option.label}
                      </span>
                      {isSelected && (
                        <Check className="ml-auto h-4 w-4 text-purple-400" />
                      )}
                    </CommandItem>
                  );
                })}
              </CommandGroup>
            </CommandList>
          </Command>
        </PopoverContent>
      </Popover>

      {showBadges && selectedOptions.length > 0 && (
        <div className="flex flex-wrap gap-2">
          {selectedOptions.map((option) => (
            <Badge
              key={option.value}
              variant="outline"
              className="h-7 border-white/10 px-2.5 py-1 text-white"
            >
              {option.label}
              <button
                type="button"
                onClick={() => removeOption(option.value)}
                className="ml-1.5 hover:text-red-400"
                aria-label={`Remove ${option.label}`}
              >
                <X className="h-3 w-3" />
              </button>
            </Badge>
          ))}
        </div>
      )}
    </div>
  );
};

export default MultiSelect;
