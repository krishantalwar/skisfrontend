import { apiSlice } from '@/app/api'

// Create an API slice using RTK Query
export const extendedApiSlice = apiSlice.injectEndpoints({
    endpoints: (builder) => ({
        company: builder.query({
            query: () => '/getCompany', // GET endpoint
            refetchOnReconnect: true,  // refetch if the connection is restored
            refetchOnFocus: true,      // refetch when window gets focused
            refetchOnMountOrArgChange: true, // refetch every time the component mounts
            // You can also add `keepUnusedDataFor: 0` to prevent caching if you want.
        }),
        agent: builder.query({
            query: () => '/getUsers', // GET endpoint
            refetchOnReconnect: true,  // refetch if the connection is restored
            refetchOnFocus: true,      // refetch when window gets focused
            refetchOnMountOrArgChange: true, // refetch every time the component mounts
            // You can also add `keepUnusedDataFor: 0` to prevent caching if you want.
        }),
        product: builder.query({
            query: (id) => '/getProduct/' + id, // GET endpoint
            refetchOnReconnect: true,  // refetch if the connection is restored
            refetchOnFocus: true,      // refetch when window gets focused
            refetchOnMountOrArgChange: true, // refetch every time the component mounts
            // You can also add `keepUnusedDataFor: 0` to prevent caching if you want.
        }),
    }),
    overrideExisting: false,
});


export const {
    useCompanyQuery,
    useAgentQuery,
    useProductQuery,
} = extendedApiSlice;

export default extendedApiSlice;