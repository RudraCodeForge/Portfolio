import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  data: [],
};

const ExperienceSlice = createSlice({
  name: "Experience",
  initialState,

  reducers: {
    setExperienceData: (state, action) => {
      state.data = action.payload;
    },

    clearExperienceData: (state) => {
      state.data = {};
    },
  },
});

export const { setExperienceData, clearExperienceData } =
  ExperienceSlice.actions;

export default ExperienceSlice.reducer;
