
import { createSlice } from '@reduxjs/toolkit';

const authSlice = createSlice({
  name: 'auth',
  initialState: { isAuthenticated: false, user: null ,token: null},
  reducers: {
    setAuth: (state, action) => {
      console.log(state)
      console.log("setAuth action",action) 
  
      // state.isAuthenticated = action.payload.isAuthenticated;
      // state.user = action.payload.user;
      state.isAuthenticated = true;
      state.user = action.payload;
      state.token = action.payload?.access_token;
      // state.refresh_token = action.payload.data?.refresh_token;
      // state.userName = action.payload.data?.user?.name;
      // state.financial_year = action.payload.data?.financial_year;
      // state.user_id = action.payload.data?.id;
      return state; 
    },
    getAuth: (state, action) => {
      console.log(state)
      console.log(action)
      return state;
    },
    logout: (state) => {
      state.isAuthenticated = false;
      state.token = null;
      state.user = null;
      // state = undefined

      return state;
    },
  },
});

export const { setAuth, logout } = authSlice.actions;

// export const selectAuth = (state) => state.auth;

export default authSlice.reducer;
