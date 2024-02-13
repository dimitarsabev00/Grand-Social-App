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
    deletePost: (state, action) => {
      state.posts = state.posts.filter((post) => post.id !== action.payload.postID);
    },
    setPosts: (state, action) => {
      state.posts = action.payload;
    },
  },
});

export const { createPost, deletePost, setPosts } = postsSlice.actions;

export default postsSlice.reducer;
