// components/form/FormMultiSelect.tsx
import React from "react";
import { Controller, Control, FieldValues, Path } from "react-hook-form";
import { Label } from "@/components/ui/label";
import { FormItem, FormControl, FormMessage } from "@/components/ui/form";
import { MultiSelect } from "@/components/ui/multi-select"; // Your custom MultiSelect
import { cn } from "@/lib/utils";

interface Option {
  label: string;
  value: string | number;
  icon?: React.ComponentType<{ className?: string }>;
}

interface FormMultiSelectProps<TFieldValues extends FieldValues> {
  name: Path<TFieldValues>;
  control: Control<any>;
  label: string;
  options: Option[];
  placeholder?: string;
  animation?: number;
  maxCount?: number;
  className?: string;
}

export function FormMultiSelect<TFieldValues extends FieldValues>({
  name,
  control,
  label,
  options,
  placeholder = "Select options",
  animation,
  maxCount = 3,
  className,
}: FormMultiSelectProps<TFieldValues>) {
  return (
    <FormItem className={cn("w-full", className)}>
      <Label htmlFor={name} className="mb-1 block">
        {label}
      </Label>
      <FormControl>
        <Controller
          control={control}
          name={name}
          render={({ field }) => (
            <MultiSelect
              options={options}
              defaultValue={field.value || []}
              onValueChange={(val) => field.onChange(val)}
              placeholder={placeholder}
              animation={animation}
              maxCount={maxCount}
            />
          )}
        />
      </FormControl>
      <FormMessage />
    </FormItem>
  );
}
