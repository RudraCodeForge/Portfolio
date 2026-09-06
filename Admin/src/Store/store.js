import { configureStore } from "@reduxjs/toolkit";
import authReducer from "./authSlice";
import messageReducer from "./messageSlice";

const store = configureStore({
  reducer: {
    auth: authReducer,
    messages: messageReducer,
  },
});

export default store;
