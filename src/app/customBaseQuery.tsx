import { fetchBaseQuery, FetchBaseQueryError } from "@reduxjs/toolkit/query/react"
import { BaseQueryFn } from "@reduxjs/toolkit/query"
// import { toast } from "@/components/ui/use-toast"
import { showMessage } from "../features/ui/globalMessageSlice"

export const baseQuery = fetchBaseQuery({
  baseUrl: "http://127.0.0.1:8000/api/",
  // credentials: "include",
  // prepareHeaders: (headers) => {
  //   headers.set("Accept", "application/json")
  //   return headers
  // },

  prepareHeaders: (headers, { getState }) => {
    const token = (getState() as RootState)?.auth?.token // or localStorage.getItem("token")
    console.log("auth",token)
    if (token) {
      headers.set("Authorization", `Bearer ${token}`)
    }
    headers.set("Accept", "application/json")
    return headers
  },
})

export const customBaseQuery: BaseQueryFn<any, unknown, FetchBaseQueryError> = async (
  args,
  api,
  extraOptions
) => {
  const result = await baseQuery(args, api, extraOptions)
  const dispatch = api.dispatch as typeof api.dispatch

  const { error } = result

  if (error) {
    const status = error.status
    const message = (error.data as any)?.message || "Something went wrong."

    // 🔥 SKIP field-level validation errors
    if (status === 422) {
      dispatch(
        showMessage({
          type: "error",
          title: "Error",
          description: message,
          show: true,
        })
      )
      return result
    }

    dispatch(
      showMessage({
        type: "error",
        title: "Error",
        description: message,
        show: true,
      })
    )

    // ✅ Show global toast for true API/server errors
    // switch (status) {
    //   case "FETCH_ERROR":
    //     // toast({ variant: "destructive", title: "Network Error", description: "Check your internet connection." })
    //     break

    //   case 401:
    //     // toast({ variant: "destructive", title: "Unauthorized", description: "Please login again." })
    //     break

    //   case 403:
    //     // toast({ variant: "destructive", title: "Access Denied", description: "You don't have permission." })
    //     break

    //   case 404:
    //     // toast({ variant: "destructive", title: "Not Found", description: "The requested resource was not found." })
    //     break

    //   case 500:
    //     // toast({ variant: "destructive", title: "Server Error", description: message })
    //     break

    //   default:
    //     // toast({ variant: "destructive", title: "Error", description: message })
        
    //     break
    // }
  }

  return result
}
