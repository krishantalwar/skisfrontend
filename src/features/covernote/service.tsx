import { apiSlice } from '@/app/api'

// Create an API slice using RTK Query
export const extendedApiSlice = apiSlice.injectEndpoints({
    endpoints: (builder) => ({
        // covernote: ({ pageIndex, pageSize, search }) => ({
        //     url: '/sssssssssssss',
        //     params: {
        //       page: pageIndex + 1,
        //       perPage: pageSize,
        //       search,
        //     },
        //   }),

        covernote: builder.query({
        // query: ({ page, perPage }) => `/covernotes?page=${page}&per_page=${perPage}`,
        
        query: (data) => ({
            url: "/covernotes",
            method: "GET",
            params: data,
        }),
        
        // transformResponse: (response) => ({
        //   data: response.data,
        //   total: response.meta.total,
        // }),
        }),

        // ✅ New endpoint: get all users without pagination
        covernoteAll: builder.query({
            query: (data) => ({
            url: "/covernotes/all",
            method: "GET",
            params: data
            }),
        }),
        covernoteExits: builder.query({
            query: (id) => '/covernotes/exist?covernote=' + id, // GET endpoint
            // refetchOnReconnect: true,  // refetch if the connection is restored
            // refetchOnFocus: true,      // refetch when window gets focused
            refetchOnMountOrArgChange: true, // refetch every time the component mounts
            keepUnusedDataFor: 2,
            // You can also add `keepUnusedDataFor: 0` to prevent caching if you want.
        }),
        motorInsert: builder.mutation({
            query: (body) => ({
                url: `covernotes/motor`,
                method: 'post',
                body: body,
            }),
            transformResponse: responseData => {
                return responseData;
            },
        }),
        nonMotorInsert: builder.mutation({
            query: (body) => ({
                url: `covernotes/non-motor`,
                method: 'post',
                body: body,
            }),
            transformResponse: responseData => {
                return responseData;
            },
        }),

        healthInsert: builder.mutation({
            query: (body) => ({
                url: `covernotes/health`,
                method: 'post',
                body: body,
            }),
            transformResponse: responseData => {
                return responseData;
            },
        }),
        licInsert: builder.mutation({
            query: (body) => ({
                url: `covernotes/lic`,
                method: 'post',
                body: body,
            }),
            transformResponse: responseData => {
                return responseData;
            },
        }),


        pendingPayment: builder.query({
        // query: ({ page, perPage }) => `/covernotes?page=${page}&per_page=${perPage}`,
        
        query: (data) => ({
            url: "/pendigPayment",
            method: "GET",
            params: data,
        }),
        
        // transformResponse: (response) => ({
        //   data: response.data,
        //   total: response.meta.total,
        // }),
        }),

        // ✅ New endpoint: get all users without pagination
        pendingPaymentAll: builder.query({
            query: (data) => ({
            url: "/pendigPayment/all",
            method: "GET",
            params: data
            }),
        }),
    }),
    overrideExisting: false,
});


export const {
    useCovernoteExitsQuery,
    useMotorInsertMutation,
    useCovernoteQuery,

    useNonMotorInsertMutation,
    useHealthInsertMutation,
    useLicInsertMutation,
    
    useLazyCovernoteAllQuery,

    usePendingPaymentQuery,
    
    useLazyPendingPaymentAllQuery,

   
} = extendedApiSlice;

export default extendedApiSlice;