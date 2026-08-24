import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  data: [],
};

const statsSlice = createSlice({
  name: "stats",

  initialState,

  reducers: {
    setstatsData: (state, action) => {
      state.data = action.payload;
    },

    clearstatsData: (state) => {
      state.data = [];
    },
  },
});

export const { setstatsData, clearstatsData } = statsSlice.actions;

export default statsSlice.reducer;
