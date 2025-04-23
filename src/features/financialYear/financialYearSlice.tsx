
import { createSlice } from '@reduxjs/toolkit';

const authSlice = createSlice({
  name: 'financialYear',
  initialState: {data:null},
  reducers: {
    setFinancialYear: (state, action) => {
      // console.log(state)
      // console.log("setAuth action",action) 
  
      // state.isAuthenticated = action.payload.isAuthenticated;
      // state.user = action.payload.user;
      // state.isAuthenticated = true;
      state.data = action.payload;

      return state; 
    },
    getFinancialYear: (state, action) => {
      console.log(state)
      console.log(action)
      return state;
    },

  },
});

export const { setFinancialYear, getFinancialYear} = authSlice.actions;

// export const selectAuth = (state) => state.auth;

export default authSlice.reducer;
