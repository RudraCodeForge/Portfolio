import { configureStore } from "@reduxjs/toolkit";
import HeaderReducer from "./slices/HeaderSlice.js";
import GithubReducer from "./slices/GithubSlice.js";
import statsReducer from "./slices/StatsSlice.js";
import SkillReducer from "./slices/SkillSlice.js";
export const store = configureStore({
  reducer: {
    HeaderData: HeaderReducer,
    GithubData: GithubReducer,
    StatsData: statsReducer,
    SkillData: SkillReducer,
  },
});
