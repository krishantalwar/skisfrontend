// authSlice.js
import { createSlice } from '@reduxjs/toolkit';

const authSlice = createSlice({
  name: 'financialYear',
  initialState: [],
  reducers: {
    setFinancialYear: (state, action) => {
      // console.log(state)
      // console.log("setAuth action",action) 
  
      // state.isAuthenticated = action.payload.isAuthenticated;
      // state.user = action.payload.user;
      // state.isAuthenticated = true;
      state.data = action.payload;


      // state.token = action.payload.data?.accessToken;
      // state.userEamil = action.payload.data?.emailaddress;
      // state.userName = action.payload.data?.name;
      // state.ip = action.payload.data?.ip;
      return state; 
    },
    getFinancialYear: (state, action) => {
      console.log(state)
      console.log(action)
      return state;
    },
    logout: (state, action) => {
      // state.isAuthenticated = false;
      state.data = "";
      // state.user = "";
      // state = undefined

      return state;
    },
  },
});

export const { setAuth, logout } = authSlice.actions;

// export const selectAuth = (state) => state.auth;

export default authSlice.reducer;
