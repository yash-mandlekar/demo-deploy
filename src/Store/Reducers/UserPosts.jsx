import { createReducer } from "@reduxjs/toolkit";

const initialState = {
  loading: false,
  posts: [],
  error: "",
};

export const postsReducer = createReducer(initialState, {
  loadPostsRequest: (state) => {
    state.loading = true;
  },
  loadPostsSuccess: (state, action) => {
    state.loading = false;
    state.posts = action.payload;
  },
  loadPostsFail: (state, action) => {
    state.loading = false;
    state.error = action.payload;
  },
  deletePostRequest: (state) => {
    state.loading = true;
  },
  deletePostSuccess: (state, action) => {
    state.loading = false;
    state.posts = state.posts.filter((post) => post._id !== action.payload);
  },
  deletePostFail: (state, action) => {
    state.loading = false;
    state.error = action.payload;
  },
});
