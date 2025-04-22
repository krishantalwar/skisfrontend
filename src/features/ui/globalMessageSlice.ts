import { createSlice, PayloadAction } from "@reduxjs/toolkit"

interface GlobalMessageState {
  show: boolean
  type: "error" | "success"
  title: string
  description?: string
}

const initialState: GlobalMessageState = {
  show: false,
  type: "success",
  title: "",
  description: "",
}

export const globalMessageSlice = createSlice({
  name: "globalMessage",
  initialState,
  reducers: {
    showMessage: (state, action: PayloadAction<GlobalMessageState>) => {
      return { ...action.payload, show: true }
    },
    hideMessage: (state) => {
      state.show = false
    },
  },
})

export const { showMessage, hideMessage } = globalMessageSlice.actions
export default globalMessageSlice.reducer
