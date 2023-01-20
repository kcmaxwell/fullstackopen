import React from 'react';
import { connect } from 'react-redux';
import { addVote } from '../reducers/anecdoteReducer';
import { setNotification } from '../reducers/notificationReducer';

const AnecdoteList = (props) => {
  const { anecdotes, filter } = props;

  const vote = (anecdote) => {
    console.log('vote', anecdote.id);
    props.addVote(anecdote);
    props.setNotification(`Voted for "${anecdote.content}"`, 5);
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
            <button onClick={() => vote(anecdote)}>vote</button>
          </div>
        </div>
      ))}
    </div>
  );
};

const mapStateToProps = (state) => ({
  anecdotes: state.anecdotes,
  filter: state.filter,
});

const mapDispatchToProps = {
  addVote,
  setNotification,
};

const ConnectedAnecdoteList = connect(
  mapStateToProps,
  mapDispatchToProps,
)(AnecdoteList);

export default ConnectedAnecdoteList;
