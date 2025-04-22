// import { fetchBaseQuery, FetchBaseQueryError } from "@reduxjs/toolkit/query/react"
// import { BaseQueryFn } from "@reduxjs/toolkit/query"
// import { toast } from "@/components/ui/use-toast"

// export const baseQuery = fetchBaseQuery({
//   baseUrl: "/api",
//   credentials: "include",
//   prepareHeaders: (headers) => {
//     headers.set("Accept", "application/json")
//     return headers
//   },
// })

// export const customBaseQuery: BaseQueryFn<any, unknown, FetchBaseQueryError> = async (
//   args,
//   api,
//   extraOptions
// ) => {
//   const result = await baseQuery(args, api, extraOptions)
//   const { error } = result

//   if (error) {
//     const status = error.status
//     const message = (error.data as any)?.message || "Something went wrong."

//     // ❌ Skip validation error toast (form will show these)
//     if (status === 422) return result

//     switch (status) {
//       case "FETCH_ERROR":
//         toast({ variant: "destructive", title: "Network Error", description: "Check your internet connection." })
//         break
//       case 401:
//         toast({ variant: "destructive", title: "Unauthorized", description: "Please login again." })
//         break
//       case 403:
//         toast({ variant: "destructive", title: "Forbidden", description: "You do not have permission." })
//         break
//       case 404:
//         toast({ variant: "destructive", title: "Not Found", description: "Resource not found." })
//         break
//       case 500:
//         toast({ variant: "destructive", title: "Server Error", description: message })
//         break
//       default:
//         toast({ variant: "destructive", title: "Error", description: message })
//     }
//   }

//   return result
// }
