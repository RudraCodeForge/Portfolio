import { configureStore } from "@reduxjs/toolkit";
import HeaderReducer from "./slices/HeaderSlice.js";
import GithubReducer from "./slices/GithubSlice.js";
export const store = configureStore({
  reducer: {
    HeaderData: HeaderReducer,
    GithubData: GithubReducer,
  },
});
