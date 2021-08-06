import { error, notice, success, clear } from "./slice";

export const errorMessage = error;
export const noticeMessage = notice;
export const successMessage = success;
export const clearMessage = clear;

const out = {
  errorMessage,
  noticeMessage,
  successMessage,
  clearMessage
};

export default out;
