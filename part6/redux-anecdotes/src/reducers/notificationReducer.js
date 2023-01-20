import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  message: '',
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

export const { setMessage, removeMessage, getTimeoutId } = notificationSlice.actions;

export const setNotification = (message, seconds) => (dispatch) => {
  dispatch(removeMessage());

  const timeoutId = setTimeout(() => {
    dispatch(removeMessage());
  }, seconds * 1000);
  dispatch(setMessage({ message, timeoutId }));
};

export default notificationSlice.reducer;
