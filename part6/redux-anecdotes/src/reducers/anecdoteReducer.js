import { createSlice } from '@reduxjs/toolkit';
import anecdoteService from '../services/anecdotes';

const anecdoteSlice = createSlice({
  name: 'anecdotes',
  initialState: [],
  reducers: {
    vote(state, action) {
      const id = action.payload;
      const anecdoteVoted = state.find((n) => n.id === id);
      const changedAnecdote = {
        ...anecdoteVoted,
        votes: anecdoteVoted.votes + 1,
      };
      return state.map((anecdote) => (anecdote.id !== id ? anecdote : changedAnecdote));
    },
    appendAnecdote(state, action) {
      return [...state, action.payload];
    },
    setAnecdotes(state, action) {
      return action.payload;
    },
  },
});

export const { vote, appendAnecdote, setAnecdotes } = anecdoteSlice.actions;

export const initializeAnecdotes = () => async (dispatch) => {
  const anecdotes = await anecdoteService.getAll();
  dispatch(setAnecdotes(anecdotes));
};

export const createAnecdote = (anecdote) => async (dispatch) => {
  const newAnecdote = await anecdoteService.createNew(anecdote);
  dispatch(appendAnecdote(newAnecdote));
};

export const addVote = (anecdote) => async (dispatch) => {
  await anecdoteService.vote(anecdote);
  dispatch(vote(anecdote.id));
};

export default anecdoteSlice.reducer;
