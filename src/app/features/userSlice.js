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
    addNewPostInUserProfile: (state, action) => {
      state.userProfile = {
        ...state.userProfile,
        posts: [action.payload.id, ...state.userProfile.posts],
      };
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
  addNewPostInUserProfile,
} = userSlice.actions;
export const selectUser = (state) => state.user.authUser;
export const selectUserProfile = (state) => state.user.userProfile;

export default userSlice.reducer;
