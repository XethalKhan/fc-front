import { loginSuccess, logoutSuccess } from "./slice";

import { loginThunk } from "./thunk";

export const loginAttemptThunk = loginThunk;
export const loginSuccessAction = loginSuccess;

export default { loginSuccessAction, logoutSuccess, loginAttemptThunk };
