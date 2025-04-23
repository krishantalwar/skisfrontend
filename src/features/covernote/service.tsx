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
            query: ({ page, perPage }) => `/covernotes?page=${page}&per_page=${perPage}`,
            // transformResponse: (response) => ({
            //   data: response.data,
            //   total: response.meta.total,
            // }),
          }),
        covernoteExits: builder.query({
            query: (id) => '/covernotes/exist/' + id, // GET endpoint
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
    }),
    overrideExisting: false,
});


export const {
    useCovernoteExitsQuery,
    useMotorInsertMutation,
    useCovernoteQuery,
} = extendedApiSlice;

export default extendedApiSlice;