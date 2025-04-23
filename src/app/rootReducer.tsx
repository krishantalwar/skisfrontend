import { combineReducers } from "@reduxjs/toolkit"
import uiReducer from "@/features/ui/uiSlice"
import { apiSlice } from "./api"
import globalMessageReducer from "@/features/ui/globalMessageSlice"
import globalLoaderOverlayReducer from "@/features/ui/LoaderOverlaySlice"
import authSlice from "@/features/auth/authSlice"



const rootReducer = combineReducers({
  ui: uiReducer,
  auth:authSlice,
  [apiSlice.reducerPath]: apiSlice.reducer,
  // [extendedApiSlice.reducerPath]: extendedApiSlice.reducer,
  globalMessage:globalMessageReducer,
  globalLoaderOverlay:globalLoaderOverlayReducer
})

export default rootReducer
