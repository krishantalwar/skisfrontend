import { createSlice, PayloadAction } from "@reduxjs/toolkit"

interface LoaderOverlayState {
    isLoading: boolean
//   loadingText: "error" | "success"
  className?: string
  loadingText?: string
}

const initialState: LoaderOverlayState = {
isLoading: false,
//   type: "success",
  className: "",
  loadingText: "Loading...",
}

export const LoaderOverlaySlice = createSlice({
  name: "globalLoaderOverlay",
  initialState,
  reducers: {
    showLoader: (state, action: PayloadAction<LoaderOverlayState>) => {
      return { ...action.payload, isLoading: true }
    },
    hideLoader: (state) => {
      state.isLoading = false
    },
  },
})

export const { showLoader, hideLoader } = LoaderOverlaySlice.actions
export default LoaderOverlaySlice.reducer
