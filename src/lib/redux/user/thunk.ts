import { login, logout, createUser } from './../../api/user';

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
      dispatch(loginSuccess({token: parsed.token, user: parsed.user}));

    }else if(httpStatus === 403){
      dispatch(errorMessage("Access denied!"));
    }else if(httpStatus === 500){
      dispatch(errorMessage("Server error! Please try again latter."));
    }

  };

}

export const logoutThunk = () => {

  return async (dispatch: any, getState: any) => {

    let state = getState();
    let token: string = state.user.token;
    let response = await logout(token);
    let httpStatus = response.status;

    if(httpStatus === 200){
      dispatch(logoutSuccess());
    }

  };

}

export const createUserThunk = (
  full_name: string,
  email: string,
  password: string) => {

  return async (dispatch: any) => {

    let response = await createUser(full_name, email, password);

    let httpStatus = response.status;

    if(httpStatus === 201){
      return true;
    }

    return false;

  };

}

const toBeExported = {
  loginThunk,
  logoutThunk,
  createUserThunk
}

export default toBeExported;
