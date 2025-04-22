// components/form/fields/FormCombobox.tsx
import {
    Command,
    CommandEmpty,
    CommandGroup,
    CommandInput,
    CommandItem,
  } from "@/components/ui/command"
  import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover"
  import { Button } from "@/components/ui/button"
  import { Label } from "@/components/ui/label"
  import { Check, ChevronsUpDown } from "lucide-react"
  import { useFormContext, Controller } from "react-hook-form"
  import { cn } from "@/lib/utils"
  import { useState } from "react"
  
  interface Option {
    label: string
    value: string
  }
  
  interface FormComboboxProps {
    name: string
    label: string
    options: Option[]
    placeholder?: string
  }
  
  export const FormCombobox: React.FC<FormComboboxProps> = ({
    name,
    label,
    options,
    placeholder = "Select an option",
  }) => {
    const { control } = useFormContext()
    const [open, setOpen] = useState(false)
  
    return (
      <div className="space-y-1.5">
        <Label>{label}</Label>
        <Controller
          control={control}
          name={name}
          render={({ field }) => (
            <Popover open={open} onOpenChange={setOpen}>
              <PopoverTrigger asChild>
                <Button
                  variant="outline"
                  role="combobox"
                  className={cn("w-full justify-between", !field.value && "text-muted-foreground")}
                >
                  {options.find((opt) => opt.value === field.value)?.label || placeholder}
                  <ChevronsUpDown className="ml-2 h-4 w-4 shrink-0 opacity-50" />
                </Button>
              </PopoverTrigger>
              <PopoverContent className="w-full p-0">
                <Command>
                  <CommandInput placeholder="Search..." />
                  <CommandEmpty>No options found.</CommandEmpty>
                  <CommandGroup>
                    {options.map((opt) => (
                      <CommandItem
                        key={opt.value}
                        value={opt.value}
                        onSelect={() => {
                          field.onChange(opt.value)
                          setOpen(false)
                        }}
                        className="w-full p-0"
                      >
                        <Check
                          className={cn(
                            "mr-2 h-4 w-4",
                            opt.value === field.value ? "opacity-100" : "opacity-0"
                          )}
                        />
                        {opt.label}
                      </CommandItem>
                    ))}
                  </CommandGroup>
                </Command>
              </PopoverContent>
            </Popover>
          )}
        />
      </div>
    )
  }
  