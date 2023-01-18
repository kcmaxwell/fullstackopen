import React from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { addVote } from '../reducers/anecdoteReducer';
import { setMessage, removeMessage } from '../reducers/notificationReducer';

const AnecdoteList = () => {
  const dispatch = useDispatch();
  const anecdotes = useSelector((state) => state.anecdotes);
  const filter = useSelector((state) => state.filter);

  const vote = (id, content) => {
    console.log('vote', id);
    dispatch(addVote(id));
    dispatch(setMessage(`Voted for "${content}"`));
    setTimeout(() => {
      dispatch(removeMessage());
    }, 5000);
  };

  const compareAnecdotes = (a, b) => {
    if (a.votes > b.votes) { return -1; }
    if (b.votes < a.votes) { return 1; }
    return 0;
  };

  const filteredAnecdotes = anecdotes.filter(
    (anecdote) => anecdote.content.toLowerCase().includes(filter.toLowerCase()),
  );

  return (
    <div>
      {filteredAnecdotes.sort(compareAnecdotes).map((anecdote) => (
        <div key={anecdote.id}>
          <div>{anecdote.content}</div>
          <div>
            has {anecdote.votes}
            <button onClick={() => vote(anecdote.id, anecdote.content)}>vote</button>
          </div>
        </div>
      ))}
    </div>
  );
};

export default AnecdoteList;
