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
    setPosts: (state, action) => {
      state.posts = action.payload;
    },
  },
});

export const { createPost, setPosts } = postsSlice.actions;

export default postsSlice.reducer;
