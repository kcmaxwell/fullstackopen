import React from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { addVote } from '../reducers/anecdoteReducer';

function AnecdoteList() {
  const dispatch = useDispatch();
  const anecdotes = useSelector((state) => state.anecdotes);

  const vote = (id) => {
    console.log('vote', id);
    dispatch(addVote(id));
  };

  const compareAnecdotes = (a, b) => {
    if (a.votes > b.votes) { return -1; }
    if (b.votes < a.votes) { return 1; }
    return 0;
  };

  return (
    <div>
      {[...anecdotes].sort(compareAnecdotes).map((anecdote) => (
        <div key={anecdote.id}>
          <div>{anecdote.content}</div>
          <div>
            has {anecdote.votes}
            <button onClick={() => vote(anecdote.id)}>vote</button>
          </div>
        </div>
      ))}
    </div>
  );
}

export default AnecdoteList;
