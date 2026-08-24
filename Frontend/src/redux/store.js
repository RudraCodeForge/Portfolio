import { configureStore } from "@reduxjs/toolkit";
import HeaderReducer from "./slices/HeaderSlice.js";
import GithubReducer from "./slices/GithubSlice.js";
import statsReducer from "./slices/StatsSlice.js";
import SkillReducer from "./slices/SkillSlice.js";
import ProjectReducer from "./slices/ProjectSlice.js";
import ExperienceReducer from "./slices/ExperienceSlice.js";
import EducationReducer from "./slices/EducationSlice.js";
export const store = configureStore({
  reducer: {
    HeaderData: HeaderReducer,
    GithubData: GithubReducer,
    StatsData: statsReducer,
    SkillData: SkillReducer,
    ProjectData: ProjectReducer,
    ExperienceData: ExperienceReducer,
    EducationData: EducationReducer,
  },
});
