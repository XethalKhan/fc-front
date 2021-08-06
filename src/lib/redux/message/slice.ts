import { createSlice, PayloadAction } from '@reduxjs/toolkit';

interface MessageState {
  text: string,
  type: string
}

// Define the initial state using MessageState type
const initialState: MessageState = {
  text: "No messages",
  type: "clear"
}

export const messageSlice = createSlice({
  name: 'message',
  initialState,
  reducers: {
    error: (state, action: PayloadAction<string>) => {
      state.text = action.payload;
      state.type = "error";
    },
    notice: (state, action: PayloadAction<string>) => {
      state.text = action.payload;
      state.type = "notice";
    },
    success: (state, action: PayloadAction<string>) => {
      state.text = action.payload;
      state.type = "success";
    },
    clear: (state) => {
      state.text = "No messages";
      state.type = "clear";
    },
  },
});

export const { error, notice, success, clear } = messageSlice.actions;

export default messageSlice.reducer;
