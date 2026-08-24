import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  data: [],
};

const projectSlice = createSlice({
  name: "projects",

  initialState,

  reducers: {
    setProjectData: (state, action) => {
      state.data = action.payload;
    },

    clearProjectData: (state) => {
      state.data = [];
    },
  },
});

export const { setProjectData, clearProjectData } = projectSlice.actions;

export default projectSlice.reducer;
