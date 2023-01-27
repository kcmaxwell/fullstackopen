import { createSlice } from '@reduxjs/toolkit';

const loggedUserJSON = window.localStorage.getItem('loggedUser');
const initialState = loggedUserJSON ? JSON.parse(loggedUserJSON) : null;

const userSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {
    setUser(state, action) {
      return action.payload;
    },
  },
});

export const { setUser } = userSlice.actions;

export const setUserAction = (user) => (dispatch) => {
  dispatch(setUser(user));
  window.localStorage.setItem('loggedUser', JSON.stringify(user));
};

export default userSlice.reducer;
