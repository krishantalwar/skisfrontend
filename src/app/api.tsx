import { createApi } from "@reduxjs/toolkit/query/react"
import { customBaseQuery } from "./customBaseQuery"

export const apiSlice = createApi({
  reducerPath: "api",
  baseQuery: customBaseQuery,
  tagTypes: ["User", "Form"],
    // global configuration for the api
    // keepUnusedDataFor: 30,
      // global configuration for the api
  // refetchOnFocus: true,
  // global configuration for the api
  // refetchOnReconnect: true,
      // global configuration for the api
  // refetchOnMountOrArgChange: 30,
  endpoints: () => ({}),
})
