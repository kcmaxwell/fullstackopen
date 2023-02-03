import React, { useState } from 'react';
import PropTypes from 'prop-types';
import { Button, Form } from 'react-bootstrap';

const CommentForm = ({ addComment }) => {
  const [comment, setComment] = useState('');

  const submitComment = (event) => {
    event.preventDefault();

    addComment(comment);

    setComment('');
  };

  return (
    <div>
      <Form onSubmit={submitComment}>
        <Form.Group>
          <Form.Control
            type='text'
            value={comment}
            onChange={({ target }) => setComment(target.value)}
          />
          <Button
            type='submit'
            id='add-comment-button'
            className='mt-2'
          >
            Add Comment
          </Button>
        </Form.Group>
      </Form>
    </div>
  );
};

CommentForm.propTypes = {
  addComment: PropTypes.func.isRequired,
};

export default CommentForm;
