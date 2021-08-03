import { createSlice, PayloadAction } from '@reduxjs/toolkit';
//import type { RootState } from './store';

interface SessionState {
  active: boolean,
  milisec: number,
  start: number,
  total: number
}

// Define the initial state using that type
const initialState: SessionState = {
  active: false,
  milisec: 0,
  start: new Date().getTime(),
  total: 0
}

export const sessionSlice = createSlice({
  name: 'session',
  initialState,
  reducers: {
    start: (state) => {
      state.active = true;
      state.milisec = 0;
      state.start = new Date().getTime();
    },
    end: (state) => {
      state.active = false;
    },
    increment: (state) => {
      let currentTime: Date = new Date();
      let difference: number = currentTime.getTime() - state.start;

      state.milisec = difference;
    },
    totalSetup: (state, action: PayloadAction<number>) => {
      state.total = action.payload;
    }
  },
})

export const { start, end, increment, totalSetup } = sessionSlice.actions;

export default sessionSlice.reducer;
