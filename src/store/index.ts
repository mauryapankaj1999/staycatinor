// store.js
import { configureStore, createSlice } from "@reduxjs/toolkit";

// Login Popup Slice
const loginPopupSlice = createSlice({
  name: "loginPopup",
  initialState: {
    isVisible: false,
  },
  reducers: {
    showLoginPopup: (state) => {
      state.isVisible = true;
    },
    hideLoginPopup: (state) => {
      state.isVisible = false;
    },
    toggleLoginPopup: (state) => {
      state.isVisible = !state.isVisible;
    },
  },
});

// Configure the store
const store = configureStore({
  reducer: {
    loginPopup: loginPopupSlice.reducer,
  },
});

// Export actions
export const { showLoginPopup, hideLoginPopup, toggleLoginPopup } =
  loginPopupSlice.actions;

// Export selector
export const selectLoginPopupVisible = (state: { loginPopup: { isVisible: boolean } }) =>
  state.loginPopup.isVisible;

export default store;
