import { loginSuccess, logoutSuccess } from "./slice";

import { loginThunk, logoutThunk, createUserThunk } from "./thunk";

export const loginAttemptThunk = loginThunk;
export const logoutAttemptThunk = logoutThunk
export const createUserAttemptThunk = createUserThunk;
export const loginSuccessAction = loginSuccess;
export const logoutSuccessAction = logoutSuccess;

export default { loginSuccessAction, logoutSuccess, loginAttemptThunk, createUserAttemptThunk };
