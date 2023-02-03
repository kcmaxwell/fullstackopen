import React, { useState } from 'react';
import PropTypes from 'prop-types';
import { Form, Button } from 'react-bootstrap';

function BlogForm({ addBlog }) {
  const [title, setTitle] = useState('');
  const [author, setAuthor] = useState('');
  const [url, setUrl] = useState('');

  const createBlog = (event) => {
    event.preventDefault();

    addBlog({
      title,
      author,
      url,
    });

    setTitle('');
    setAuthor('');
    setUrl('');
  };

  return (
    <div>
      <h2>Create new blog</h2>
      <Form onSubmit={createBlog}>
        <Form.Group>
          <div>
            <Form.Label>Title:</Form.Label>
            <Form.Control
              type='text'
              value={title}
              onChange={({ target }) => setTitle(target.value)}
              id='title-input'
            />
          </div>
          <div>
            <Form.Label>Author:</Form.Label>
            <Form.Control
              type='text'
              value={author}
              onChange={({ target }) => setAuthor(target.value)}
              id='author-input'
            />
          </div>
          <div>
            <Form.Label>URL:</Form.Label>
            <Form.Control
              type='text'
              value={url}
              onChange={({ target }) => setUrl(target.value)}
              id='url-input'
            />
          </div>
          <Button
            type='submit'
            id='create-blog-button'
            className='mt-2'
          >
            Create
          </Button>
        </Form.Group>
      </Form>
    </div>
  );
}

BlogForm.propTypes = {
  addBlog: PropTypes.func.isRequired,
};

export default BlogForm;
