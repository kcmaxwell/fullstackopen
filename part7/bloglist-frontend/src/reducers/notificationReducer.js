import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  successMessage: '',
  errorMessage: '',
  timeoutId: null,
};

const notificationSlice = createSlice({
  name: 'notification',
  initialState,
  reducers: {
    setMessage(state, action) {
      return action.payload;
    },
    removeMessage(state) {
      clearTimeout(state.timeoutId);
      return initialState;
    },
  },
});

export const { setMessage, removeMessage, getTimeoutId } =
  notificationSlice.actions;

export const setNotification = (message, isError, seconds) => (dispatch) => {
  dispatch(removeMessage());

  const timeoutId = setTimeout(() => {
    dispatch(removeMessage());
  }, seconds * 1000);

  if (isError)
    dispatch(
      setMessage({ successMessage: '', errorMessage: message, timeoutId })
    );
  else
    dispatch(
      setMessage({ successMessage: message, errorMessage: '', timeoutId })
    );
};

export default notificationSlice.reducer;
