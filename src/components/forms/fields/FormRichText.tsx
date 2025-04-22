// components/form/FormRichText.tsx

import { Controller, Control, FieldValues, Path } from "react-hook-form";
import { Label } from "@/components/ui/label";
import { FormItem, FormControl, FormMessage } from "@/components/ui/form";
import { cn } from "@/lib/utils";
import { Editor } from "@/components/blocks/editor-00/editor";
import { EditorState, SerializedEditorState } from "lexical";
import { useState } from 'react'

interface FormRichTextProps<TFieldValues extends FieldValues> {
  name: Path<TFieldValues>;
//   control: Control<TFieldValues>;
control: Control<any>;
  label: string;
  placeholder?: string;
  className?: string;
}


const initialValue = {
    root: {
      children: [
        {
          children: [
            {
              detail: 0,
              format: 0,
              mode: 'normal',
              style: '',
              text: 'Hello World 🚀',
              type: 'text',
              version: 1,
            },
          ],
          direction: 'ltr',
          format: '',
          indent: 0,
          type: 'paragraph',
          version: 1,
        },
      ],
      direction: 'ltr',
      format: '',
      indent: 0,
      type: 'root',
      version: 1,
    },
  } as unknown as SerializedEditorState
  

/**
 * A reusable, type-safe rich text editor field for react-hook-form
 */
export function FormRichText<TFieldValues extends FieldValues>({
  name,
  control,
  label,
  placeholder = "Write here...",
  className,
}: FormRichTextProps<TFieldValues>) {
      const [editorState, setEditorState] =
        useState<SerializedEditorState>(initialValue)
    
  return (
    <FormItem className={cn("w-full", className)}>
      <Label htmlFor={name} className="mb-1 block">
        {label}
      </Label>

      <FormControl>
        <Controller
          name={name}
          control={control}
          render={({ field }) => (
            <Editor
                {...field}
            editorSerializedState={editorState}
            onSerializedChange={(value) => setEditorState(value)}

            //   editorSerializedState={field.value as SerializedEditorState}
            //   onSerializedChange={(newState) => {
            //     // field.onChange(newState);
            //   }}
            //   onPlainTextChange={(plainText) => {
            //     field.onChange(plainText); // Update form state with plain text value
            //   }}
            // onChange={(plainText) => {
            //     console.log("plainText")
            //     field.onChange(plainText); // If you want to store the plain text in the form
            //   }}
              
            />
          )}
        />
      </FormControl>

      <FormMessage />
    </FormItem>
  );
}
