import { createReducer } from "@reduxjs/toolkit";

const initialState = {
  loading: false,
  news: [],
  error: "",
};

export const newsReducer = createReducer(initialState, {
  loadNewsRequest: (state) => {
    state.loading = true;
  },
  loadNewsSuccess: (state, action) => {
    state.loading = false;
    state.news = action.payload;
  },
  loadNewsFail: (state, action) => {
    state.loading = false;
    state.error = action.payload;
  },
  filterNewsRequest: (state) => {
    state.loading = true;
  },
  filterNewsSuccess: (state, action) => {
    state.loading = false;
    state.news = action.payload;
  },
  filterNewsFail: (state, action) => {
    state.loading = false;
    state.error = action.payload;
  },
});
