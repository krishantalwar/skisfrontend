// src/lib/setApiFieldErrors.ts
import { FieldValues, UseFormSetError } from "react-hook-form"

type ErrorPayload = {
  status: number
  data?: {
    errors?: Record<string, string | string[]>
    message?: string
  }
}



export function setApiFieldErrors<T extends FieldValues>(
  error: unknown,
  setError: UseFormSetError<T>
) {
  const err = error as ErrorPayload
  console.log("err",err)
  if (err?.status === 422 && err.data?.errors) {
    Object.entries(err.data.errors).forEach(([field, message]) => {
      console.log(field)
      console.log("message",message)
      const errorMessage = Array.isArray(message) ? message[0] : message
      setError(field as keyof T, {
        type: "server",
        message: errorMessage,
      })
    })
  }
}
