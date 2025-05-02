import { apiSlice } from '@/app/api'
import { setAuth, logout as logouts } from './agentSlice';
// Create an API slice using RTK Query
export const extendedApiSlice = apiSlice.injectEndpoints({
    endpoints: (builder) => ({
        // agent: builder.query({
        //     query: ({ page, perPage }) => `/covernotes?page=${page}&per_page=${perPage}`,
            
        //     // transformResponse: (response) => ({
        //     //   data: response.data,
        //     //   total: response.meta.total,
        //     // }),
        //   }),
        agentAdd: builder.mutation({
            query: (body) => ({
                url: `register`,
                method: 'post',
                body: body,
            }),
            invalidatesTags: ['User'],
            transformResponse: responseData => {
                // console.log(responseData)
                return responseData;
            },
            async onQueryStarted(args, { dispatch, getState, queryFulfilled, requestId, extra, getCacheEntry }) {
                // console.log(args);
                try {
                    const { data } = await queryFulfilled;
                    console.log(data);
                } catch (error) {
                    console.log("error", error)
                }
            },
        }),
    }),
    overrideExisting: false,
});


export const {

    useAgentAddMutation,
    // useAgentQuery,

} = extendedApiSlice;

export default extendedApiSlice;