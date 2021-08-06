import { start, end, increment, totalSetup } from "./slice";
import { startThunk, endThunk } from "./thunk";

export const startAttemptThunk = startThunk;
export const endAttemptThunk = endThunk;

export const startAction = start;
export const endAction = end;
export const incrementAction = increment;
export const totalSetupAction = totalSetup;

export default {
  startAction,
  endAction,
  incrementAction,
  totalSetupAction,
  startAttemptThunk,
  endAttemptThunk
};
