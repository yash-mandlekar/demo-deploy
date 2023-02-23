import { createReducer } from "@reduxjs/toolkit";

const initialState = {
  loading: false,
  shorts: [],
  error: "",
  short: {},
};

export const shortsReducer = createReducer(initialState, {
  loadShortsRequest: (state) => {
    state.loading = true;
  },
  loadShortsSuccess: (state, action) => {
    state.loading = false;
    state.shorts = action.payload;
  },
  loadShortsFail: (state, action) => {
    state.loading = false;
    state.error = action.payload;
  },
  loadShortRequest: (state) => {
    state.loading = true;
  },
  loadShortSuccess: (state, action) => {
    state.loading = false;
    state.short = action.payload;
  },
  loadShortFail: (state, action) => {
    state.loading = false;
    state.error = action.payload;
  },
  likeShortRequest: (state) => {
    state.loading = true;
  },
  likeShortSuccess: (state, action) => {
    state.loading = false;
    state.short = action.payload;
  },
  likeShortFail: (state, action) => { 
    state.loading = false;
    state.error = action.payload;
  }

});
