import { createSlice } from "@reduxjs/toolkit"

interface UIState {
  showProfileDropdown: boolean
  showNotificationDropdown: boolean
}

const initialState: UIState = {
  showProfileDropdown: false,
  showNotificationDropdown: false,
}

const uiSlice = createSlice({
  name: "ui",
  initialState,
  reducers: {
    toggleProfileDropdown: (state) => {
      state.showProfileDropdown = !state.showProfileDropdown
      state.showNotificationDropdown = false
    },
    toggleNotificationDropdown: (state) => {
      state.showNotificationDropdown = !state.showNotificationDropdown
      state.showProfileDropdown = false
    },
    closeAllDropdowns: (state) => {
      state.showProfileDropdown = false
      state.showNotificationDropdown = false
    },
  },
})

export const {
  toggleProfileDropdown,
  toggleNotificationDropdown,
  closeAllDropdowns,
} = uiSlice.actions

export default uiSlice.reducer
