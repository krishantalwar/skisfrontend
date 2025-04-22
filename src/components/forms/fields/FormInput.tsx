// // components/form/fields/FormInput.tsx
// import { Input } from "@/components/ui/input"
// import { Label } from "@/components/ui/label"
// import { useFormContext } from "react-hook-form"

// interface FormInputProps {
//   name: string
//   label: string
//   type?: string
//   placeholder?: string
// }

// export const FormInput: React.FC<FormInputProps> = ({
//   name,
//   label,
//   type = "text",
//   placeholder,
// }) => {
//   const {
//     register,
//     formState: { errors },
//   } = useFormContext()

//   return (
//     <div className="space-y-1.5">
//       <Label htmlFor={name}>{label}</Label>
//       <Input
//         id={name}
//         type={type}
//         placeholder={placeholder}
//         {...register(name)}
//       />
//       {errors[name] && (
//         <p className="text-sm text-red-500">{errors[name]?.message as string}</p>
//       )}
//     </div>
//   )
// }


// components/ui/FormInput.tsx
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { FormField, FormItem, FormControl, FormMessage ,FormDescription} from "@/components/ui/form";
import { Control, FieldValues, Path } from "react-hook-form";


interface FormInputProps<T extends FieldValues> {
  name: Path<T>;
  label: string;
  // control: Control<T>;
  control: Control<any>;
  
  placeholder?: string;
  type?: string;
  minLength?: number;
  
  maxLength?: number;
  showLengthHint?: boolean;
  disabled?:boolean;
  readonly?:boolean;
}

export  function FormInput<T extends FieldValues>({
  name,
  label,
  control,
  placeholder,
  type = "text",  
  minLength,
  maxLength,
  showLengthHint = true,
  disabled=false,
  readonly=false
}: FormInputProps<T>) {
  const isNumberType = type === "number" || type === "tel"

  const getHintText = () => {
    if (minLength && maxLength) {
      return `Must be between ${minLength} and ${maxLength} characters`
    }
    if (minLength) return `Must be at least ${minLength} characters`
    if (maxLength) return `Must be at most ${maxLength} characters`
    return null
  }
  return (
    <FormField
      control={control}
      name={name}
      disabled={disabled}
      readOnly={readonly}
      render={({ field }) => (
        <FormItem>
          <Label>{label}</Label>
          <FormControl>
            <Input {...field} placeholder={placeholder} type={type} 
                disabled={disabled}
                readOnly={readonly}
             onChange={(e) => {
              let  value = e.target.value
              if (isNumberType) {
                value = value.replace(/[^0-9]/g, "")
              }

              if (maxLength && value.length > maxLength) {
                value = value.slice(0, maxLength)
              }
              field.onChange(value)
            }}
            // onChange={(e) => handleChange(field, e)} // Use optimized onChange
            />
          </FormControl>
          {showLengthHint && getHintText() && (
            <FormDescription>{getHintText()}</FormDescription>
          )}
          {/* <FormMessage /> */}
          <FormMessage />
        </FormItem>
      )}
    />
  );
}
