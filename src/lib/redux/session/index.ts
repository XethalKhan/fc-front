import { start, end, increment, totalSetup } from "./slice";
import { startThunk, endThunk, activeThunk } from "./thunk";

export const startAttemptThunk = startThunk;
export const endAttemptThunk = endThunk;
export const activeAttemptThunk = activeThunk;

export const startAction = start;
export const endAction = end;
export const incrementAction = increment;
export const totalSetupAction = totalSetup;

const toBeExported = {
  startAction,
  endAction,
  incrementAction,
  totalSetupAction,
  startAttemptThunk,
  endAttemptThunk,
  activeAttemptThunk
};

export default toBeExported;
