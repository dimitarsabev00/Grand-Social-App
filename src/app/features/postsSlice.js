import { createSlice } from "@reduxjs/toolkit";

export const postsSlice = createSlice({
  name: "postsSlice",
  initialState: {
    posts: [],
  },
  reducers: {
    createPost: (state, action) => {
      state.posts = [action.payload, ...state.posts];
    },
  },
});

export const {createPost} = postsSlice.actions;

export default postsSlice.reducer;
