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
import { Textarea } from "@/components/ui/textarea";
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
  minLength?: number
  
  maxLength?: number
  showLengthHint?: boolean
  disabled?:boolean
}

export  function FormTextArea<T extends FieldValues>({
  name,
  label,
  control,
  placeholder,
  disabled=false
}: FormInputProps<T>) {

  return (
    <FormField
      control={control}
      name={name}
      disabled={disabled}
      render={({ field }) => (
        <FormItem>
          <Label>{label}</Label>
          <FormControl>
            <Textarea  {...field} placeholder={placeholder} 
             value={field.value ?? ''} // ✅ Add fallback
                disabled={disabled}
             onChange={(e) => {
              let  value = e.target.value
             
              field.onChange(value)
            }}
            // onChange={(e) => handleChange(field, e)} // Use optimized onChange
            />
          </FormControl>
         
          {/* <FormMessage /> */}
          <FormMessage />
        </FormItem>
      )}
    />
  );
}
