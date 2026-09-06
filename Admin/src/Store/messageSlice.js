import { createSlice } from "@reduxjs/toolkit";
import { messageData } from "../data/messageData";

const messageSlice = createSlice({
  name: "messages",
  initialState: messageData,
  reducers: {
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
  markMessageAsRead,
  deleteMessage,
  deleteAllMessages,
  markAllMessagesAsRead,
} = messageSlice.actions;
export default messageSlice.reducer;
