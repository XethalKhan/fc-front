import { createSlice, PayloadAction } from '@reduxjs/toolkit';

interface UserState {
  token: string,
  access: boolean
}

interface UserToken {
  token: string
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
      state.access = true;
    },
    logoutSuccess: (state) => {
      console.log("LOGOUT");
      state.access = false;
    },
  },
});

export const { loginSuccess, logoutSuccess } = userSlice.actions;

export default userSlice.reducer;
