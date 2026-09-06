import { createSlice } from "@reduxjs/toolkit";
const messageSlice = createSlice({
  name: "messages",
  initialState: [],
  reducers: {
    setMessages: (_, action) => action.payload,
    markMessageAsRead: (state, action) => {
      const message = state.find((item) => item.id === action.payload);
      if (message) message.isRead = true;
    },
    deleteMessage: (state, action) =>
      state.filter((message) => message.id !== action.payload),
    deleteAllMessages: () => [],
    markAllMessagesAsRead: (state) => {
      state.forEach((message) => {
        message.isRead = true;
      });
    },
  },
});

export const {
  setMessages,
  markMessageAsRead,
  deleteMessage,
  deleteAllMessages,
  markAllMessagesAsRead,
} = messageSlice.actions;
export default messageSlice.reducer;
