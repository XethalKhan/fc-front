import { createSlice, PayloadAction } from '@reduxjs/toolkit';

interface UserState {
  token: string,
  user?: {
    id: number,
    full_name: string,
    email: string
  },
  access: boolean
}

interface UserToken {
  token: string,
  user: {
    id: number,
    full_name: string,
    email: string
  }
}

// Define the initial state using UserState type
const initialState: UserState = {
  token: "",
  access: false
}

export const userSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {
    loginSuccess: (state, action: PayloadAction<UserToken>) => {
      state.token = action.payload.token;
      state.user = action.payload.user;
      state.access = true;
    },
    logoutSuccess: (state) => {
      state.access = false;
    },
  },
});

export const { loginSuccess, logoutSuccess } = userSlice.actions;

export default userSlice.reducer;
