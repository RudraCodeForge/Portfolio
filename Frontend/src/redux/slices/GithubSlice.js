import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  data: {},
};

const GithubSlice = createSlice({
  name: "github",
  initialState,

  reducers: {
    setGithubData: (state, action) => {
      state.data = action.payload;
    },

    clearGithubData: (state) => {
      state.data = {};
    },
  },
});

export const { setGithubData, clearGithubData } = GithubSlice.actions;

export default GithubSlice.reducer;
