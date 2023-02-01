import React, { useState } from 'react';
import PropTypes from 'prop-types';

const CommentForm = ({ addComment }) => {
  const [comment, setComment] = useState('');

  const submitComment = (event) => {
    event.preventDefault();

    addComment(comment);

    setComment('');
  };

  return (
    <div>
      <form onSubmit={submitComment}>
        <input
          value={comment}
          onChange={({ target }) => setComment(target.value)}
        />
        <button
          type='submit'
          id='add-comment-button'
        >
          Add Comment
        </button>
      </form>
    </div>
  );
};

CommentForm.propTypes = {
  addComment: PropTypes.func.isRequired,
};

export default CommentForm;
