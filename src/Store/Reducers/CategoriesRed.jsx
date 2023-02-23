import { createReducer } from "@reduxjs/toolkit";

const initialState = {
  loading: false,
  categories: [],
  error: "",
};

export const categoriesReducer = createReducer(initialState, {
  loadCategoriesRequest: (state) => {
    state.loading = true;
  },
  loadCategoriesSuccess: (state, action) => {
    state.loading = false;
    state.categories = action.payload;
  },
  loadCategoriesFail: (state, action) => {
    state.loading = false;
    state.error = action.payload;
  },
});
