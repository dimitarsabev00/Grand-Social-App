import { createSlice } from "@reduxjs/toolkit";

export const userSlice = createSlice({
  name: "user",
  initialState: {
    authUser: JSON.parse(localStorage.getItem("user-info")) || null,
    userProfile: null,
    isLoading: false,
  },
  reducers: {
    startLoading: (state) => ({ ...state, isLoading: true }),
    stopLoading: (state) => ({ ...state, isLoading: false }),
    login: (state, action) => {
      state.authUser = action.payload;
    },
    logout: (state) => {
      state.authUser = null;
    },
    setAuthUser: (state, action) => {
      state.authUser = action.payload;
    },
    setUserProfile: (state, action) => {
      state.userProfile = action.payload;
    },
  },
});

export const {
  login,
  logout,
  setUserProfile,
  setAuthUser,
  startLoading,
  stopLoading,
} = userSlice.actions;
export const selectUser = (state) => state.user.authUser;
export const selectUserProfile = (state) => state.user.userProfile;

export default userSlice.reducer;
