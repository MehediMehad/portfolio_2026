"use client";

import { Button } from "@/components/ui/button";
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
import { Check, ChevronsUpDown } from "lucide-react";
import { useState } from "react";

export interface SingleSelectOption {
  value: string;
  label: string;
}

interface SingleSelectProps {
  value?: string;
  onChange: (value: string) => void;
  options: SingleSelectOption[];
  placeholder?: string;
  searchPlaceholder?: string;
  emptyMessage?: string;
  triggerClassName?: string;
}

const SingleSelect = ({
  value,
  onChange,
  options,
  placeholder = "Select an option",
  searchPlaceholder = "Search...",
  emptyMessage = "No options found.",
  triggerClassName = "w-full",
}: SingleSelectProps) => {
  const [open, setOpen] = useState(false);

  const selectedOption = options.find((option) => option.value === value);

  const handleSelect = (optionValue: string) => {
    onChange(optionValue);
    setOpen(false);
  };

  return (
    <Popover open={open} onOpenChange={setOpen}>
      <PopoverTrigger asChild>
        <Button
          type="button"
          variant="outline"
          role="combobox"
          aria-expanded={open}
          className={`h-11 justify-between border-white/10 bg-[#0b1222] text-white hover:bg-[#0b1222] hover:text-white ${triggerClassName}`}
        >
          <span className="truncate">
            {selectedOption ? selectedOption.label : placeholder}
          </span>
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
                const isSelected = option.value === value;

                return (
                  <CommandItem
                    key={option.value}
                    value={option.label}
                    onSelect={() => handleSelect(option.value)}
                    className={isSelected ? "bg-white/10 " : ""}
                  >
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
  );
};

export default SingleSelect;
