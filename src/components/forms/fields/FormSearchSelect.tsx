// components/ui/FormSearchSelect.tsx

import * as React from "react";
import { Control, FieldValues, Path } from "react-hook-form";
import {
  FormField,
  FormItem,
  FormLabel,
  FormControl,
  FormMessage,
} from "@/components/ui/form";
import {
  Popover,
  PopoverTrigger,
  PopoverContent,
} from "@/components/ui/popover";
import {
  Command,
  CommandInput,
  CommandEmpty,
  CommandGroup,
  CommandItem,
} from "@/components/ui/command";
import { Button } from "@/components/ui/button";
import { CheckIcon } from "lucide-react";
import { cn } from "@/lib/utils";

type Option = {
  label: string;
  value: string | number;
};

interface FormSearchSelectProps<T extends FieldValues> {
  name: Path<T>;
  control: Control<T>;
  label: string;
  options: Option[];
  placeholder?: string;
}

export function FormSearchSelect<T extends FieldValues>({
  name,
  control,
  label,
  options,
  placeholder = "Select an option",
}: FormSearchSelectProps<T>) {
  return (
    <FormField
      control={control}
      name={name}
      render={({ field }) => {
        const selected = options.find((opt) => opt.value === field.value);

        return (
          <FormItem className="w-full">
            <FormLabel>{label}</FormLabel>
            <FormControl>
              <Popover>
                <PopoverTrigger asChild>
                  <Button
                    variant="outline"
                    role="combobox"
                    className={cn(
                      "w-full justify-between text-left",
                      !field.value && "text-muted-foreground"
                    )}
                  >
                    {selected ? selected.label : placeholder}
                  </Button>
                </PopoverTrigger>
                <PopoverContent className="w-full p-0">
                  <Command>
                    <CommandInput placeholder="Search..." />
                    <CommandEmpty>No option found.</CommandEmpty>
                    <CommandGroup>
                      {options.map((opt) => (
                        <CommandItem
                          key={opt.value}
                          onSelect={() => field.onChange(opt.value)}
                          className="cursor-pointer"
                        >
                          <div className="flex items-center gap-2">
                            <CheckIcon
                              className={cn(
                                "h-4 w-4",
                                field.value === opt.value
                                  ? "opacity-100"
                                  : "opacity-0"
                              )}
                            />
                            {opt.label}
                          </div>
                        </CommandItem>
                      ))}
                    </CommandGroup>
                  </Command>
                </PopoverContent>
              </Popover>
            </FormControl>
            <FormMessage />
          </FormItem>
        );
      }}
    />
  );
}
