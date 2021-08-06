import { login } from './../../api/user';

import {
  errorMessage,
  noticeMessage,
  successMessage,
  clearMessage
} from "./../message";

import { loginSuccess, logoutSuccess } from "./slice";

export const loginThunk = (email: string, password: string) => {

  return async (dispatch: any) => {

    dispatch(clearMessage());

    let response = await login(email, password);

    let httpStatus = response.status;

    if(httpStatus === 200){
      dispatch(successMessage("Welcome back!"));

      let parsed = await response.json();
      dispatch(loginSuccess({token: parsed.token}));

    }else if(httpStatus === 403){
      dispatch(errorMessage("Access denied!"));
    }else if(httpStatus === 500){
      dispatch(errorMessage("Server error! Please try again latter."));
    }

  };

}


export default loginThunk;
