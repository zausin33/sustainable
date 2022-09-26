import {createSlice, PayloadAction} from '@reduxjs/toolkit';
import {Error, Status} from "./status.types";
import {showErrorMsg} from "../../utils/toast";

const initialState: Status = {
  isLoading: false,
  isError: false,
  error: undefined,
};

export const statusSlice = createSlice({
  name: 'status',
  initialState,
  reducers: {
    setIsLoading: (state, {payload: {isLoading}}: PayloadAction<{isLoading: boolean}>) => {
      state.isLoading = isLoading
    },
    setError: (state, {payload: {isError, error}}: PayloadAction<{isError: boolean, error:Error}>) => {
      state.isError = isError
      state.error = error
    },
    startRequest: (state) => {
      state.isLoading = true;
      state.isError = false;
      state.error = undefined;
    },
    endRequestWithError: (state, {payload: {error}}: PayloadAction<{error:Error}>) => {
      state.isLoading = false;
      state.isError = true;
      state.error = error;
      showErrorMsg(error.message, error.error)
    },
    endRequestSuccessful: (state) => {
      state.isLoading = false;
      state.isError = false;
      state.error = undefined;
    }
  },
});
export const { setError, setIsLoading, startRequest, endRequestSuccessful, endRequestWithError } = statusSlice.actions;

export default statusSlice.reducer;
