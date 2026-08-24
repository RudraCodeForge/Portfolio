import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  data: [],
};

const skillSlice = createSlice({
  name: "skills",

  initialState,

  reducers: {
    setSkillData: (state, action) => {
      state.data = action.payload;
    },

    clearSkillData: (state) => {
      state.data = [];
    },
  },
});

export const { setSkillData, clearSkillData } = skillSlice.actions;

export default skillSlice.reducer;
