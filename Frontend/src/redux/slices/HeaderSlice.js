import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  data: {},
  loading: false,
  error: null,
};

const HeaderSlice = createSlice({
  name: "header",
  initialState,

  reducers: {
    setHeaderData: (state, action) => {
      state.data = action.payload;
    },

    clearHeaderData: (state) => {
      state.data = {};
      state.error = null;
    },
  },
});

export const { setHeaderData, clearHeaderData } = HeaderSlice.actions;

export default HeaderSlice.reducer;
