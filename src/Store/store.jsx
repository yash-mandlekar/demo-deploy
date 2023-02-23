import { configureStore } from "@reduxjs/toolkit";
import { authReducer } from "./Reducers/UserRed";
import { newsReducer } from "./Reducers/NewsRed";
import { themeReducer } from "./Reducers/ThemeRed";
import { categoriesReducer } from "./Reducers/CategoriesRed";
import { shortsReducer } from "./Reducers/ShortsRed";
import { postsReducer } from "./Reducers/UserPosts";
import { singleUserReducer } from "./Reducers/SingleUser";
const store = configureStore({
  reducer: {
    auth: authReducer,
    news: newsReducer,
    theme: themeReducer,
    categories: categoriesReducer,
    shorts: shortsReducer,
    posts: postsReducer,
    singleUser: singleUserReducer,
  },
});

export default store;
