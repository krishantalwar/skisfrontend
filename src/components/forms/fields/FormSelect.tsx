// // components/ui/FormSelect.tsx
// import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
// import { FormField, FormItem, FormControl, FormMessage } from "@/components/ui/form";
// import { Control, FieldValues, Path } from "react-hook-form";
// import { Label } from "@/components/ui/label";


// interface Option {
//   label: string;
//   value: string|number;
//   // value: T;  // Make the value generic (it can be string or number)
// }

// interface FormSelectProps<T extends FieldValues> {
//   name: string;
//   label: string;
//   control: Control<any>;
//   options: Option[];
//   // options: Option<V>[];  // options is now an array of Option with the generic V
//   placeholder?: string;
// }

// export function FormSelect<T extends FieldValues>({
//   name,
//   label,
//   control,
//   options,
//   placeholder = "Select an option",
// }: FormSelectProps<T>) {
//   return (
//     <FormField
//       control={control}
//       name={name}
//       render={({ field }) => {
//         console.log(field);
//         return (<FormItem>
//           <Label>{label}</Label>
//           <FormControl>
//             <Select onValueChange={field.onChange} defaultValue={field.value}>
//               <SelectTrigger>
//                 <SelectValue placeholder={placeholder} />
//               </SelectTrigger>
//               <SelectContent>
//                 {options.map((opt) => (
//                   // <SelectItem key={opt.value} value={opt.value}>
//                   <SelectItem key={opt.value} value={opt.value.toString()}> {/* Ensure value is string for compatibility */}
//                     {opt.label}
//                   </SelectItem>
//                 ))}
//               </SelectContent>
//             </Select>
//           </FormControl>
//           <FormMessage />
//         </FormItem>);
//       }}
//     />
//   );
// }

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
  control: Control<any>;
  label: string;
  options: Option[];
  placeholder?: string;
}
export function FormSelect<T extends FieldValues>({
  name,
  control,
  label,
  options,
  placeholder = "Select an option",
}: FormSearchSelectProps<T>) {
  const triggerRef = React.useRef<HTMLButtonElement>(null);
  const [triggerWidth, setTriggerWidth] = React.useState<number | undefined>(undefined);
  const [open, setOpen] = React.useState(false); // 👈 NEW STATE

  React.useEffect(() => {
    if (triggerRef.current) {
      setTriggerWidth(triggerRef.current.offsetWidth);
    }
  }, []);

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
              <Popover open={open} onOpenChange={setOpen}> {/* 👈 Control open state */}
                <PopoverTrigger asChild>
                  <Button
                    variant="outline"
                    role="combobox"
                    className={cn(
                      "w-full justify-between text-left",
                      !field.value && "text-muted-foreground"
                    )}
                    ref={triggerRef} // 👈 Capture button width
                    onClick={() => setOpen((prev) => !prev)} // 👈 Toggle manually
                  >
                    {selected ? selected.label : placeholder}
                  </Button>
                </PopoverTrigger>
                <PopoverContent
                  align="start"
                  style={{ width: triggerWidth }}
                  className="p-0"
                >
                  <Command>
                    <CommandInput placeholder="Search..." />
                    <CommandEmpty>No option found.</CommandEmpty>
                    <CommandGroup className="max-h-60 overflow-y-auto">
                      {options.map((opt) => (
                        <CommandItem
                          key={opt.value}
                          onSelect={() => {
                            field.onChange(opt.value); // 👈 Set form value
                            setOpen(false);             // 👈 Close the dropdown
                          }}
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
