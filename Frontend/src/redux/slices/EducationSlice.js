import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  data: [],
};

const EducationSlice = createSlice({
  name: "Education",
  initialState,

  reducers: {
    setEducationData: (state, action) => {
      state.data = action.payload;
    },

    clearEducationData: (state) => {
      state.data = {};
    },
  },
});

export const { setEducationData, clearEducationeData } = EducationSlice.actions;

export default EducationSlice.reducer;
