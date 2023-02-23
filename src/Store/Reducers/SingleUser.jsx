import { createReducer } from "@reduxjs/toolkit";
const initialState = {
  loading: false,
  user: null,
  error: null,
};

export const singleUserReducer = createReducer(initialState, {
  singleUserRequest: (state) => {
    state.loading = true;
  },
  singleUserSuccess: (state, action) => {
    state.loading = false;
    state.user = action.payload;
    state.error = null;
  },
  singleUserFail: (state, action) => {
    state.loading = false;
    state.user = null;
    state.error = action.payload;
  },
});
