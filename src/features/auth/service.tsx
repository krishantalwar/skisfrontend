import { apiSlice } from '@/app/api'
import { setAuth, logout as logouts } from './authSlice';
// Create an API slice using RTK Query
export const extendedApiSlice = apiSlice.injectEndpoints({
    endpoints: (builder) => ({
        login: builder.mutation({
            query: (body) => ({
                url: `auth/login`,
                method: 'post',
                body: body,
            }),
            transformResponse: responseData => {
                // console.log(responseData)
                return responseData;
            },
            async onQueryStarted(args, { dispatch, getState, queryFulfilled, requestId, extra, getCacheEntry }) {
                console.log(args);
                try {
                    const { data } = await queryFulfilled;
                    console.log(data);
                    // cookie('ssstoken', "sss", { httpOnly: true, secure: true, path: "/" });
                    // document.cookie = 'authToken=asssadas; path=/; secure; HttpOnly';
                    dispatch(setAuth(data));
                } catch (error) {
                    console.log("error", error)
                }
            },
        }),
        logout: builder.mutation({
            query: (body) => ({
                url: `auth/login`,
                method: 'post',
                body: body,
            }),
            transformResponse: responseData => {
                // console.log(responseData)
                return responseData;
            },
            async onQueryStarted(args, { dispatch, getState, queryFulfilled, requestId, extra, getCacheEntry }) {
                // console.log(args);
                try {
                    const { data } = await queryFulfilled;
                    console.log(data);
                    // cookie('ssstoken', "sss", { httpOnly: true, secure: true, path: "/" });
                    // document.cookie = 'authToken=asssadas; path=/; secure; HttpOnly';
                    dispatch(logouts(data));
                } catch (error) {
                    console.log("error", error)
                }
            },
        }),
    }),
    overrideExisting: false,
});


export const {
    useLoginMutation,
    useLogoutMutation
    

} = extendedApiSlice;

export default extendedApiSlice;