import { startSession, endSession } from './../../api/session';

import {
  errorMessage,
  noticeMessage,
  successMessage,
  clearMessage
} from "./../message";

import { start, end } from "./slice";

export const startThunk = () => {

  return async (dispatch: any, getState: any) => {

    let state = getState();
    let token: string = state.user.token;
    let response = await startSession(token);
    let httpStatus = response.status;

    if(httpStatus === 201){

      dispatch(start());
      dispatch(successMessage("Session started!"));

    }else{

      dispatch(errorMessage("Unable to start a new session!"));

    }

  };

}

export const endThunk = () => {

  return async (dispatch: any, getState: any) => {

    let state = getState();
    let token: string = state.user.token;
    let response = await endSession(token);
    let httpStatus = response.status;

    if(httpStatus === 204){

      dispatch(end());
      dispatch(successMessage("Session ended!"));

    }else{

      dispatch(errorMessage("Unable to end current session!"));

    }

  };

}

let toBeExported = {
  startThunk,
  endThunk
}

export default toBeExported;
