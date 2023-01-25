import React, { useState } from 'react';
import PropTypes from 'prop-types';

function BlogForm({ addBlog }) {
  const [title, setTitle] = useState('');
  const [author, setAuthor] = useState('');
  const [url, setUrl] = useState('');

  const createBlog = (event) => {
    event.preventDefault();

    addBlog({
      title, author, url,
    });

    setTitle('');
    setAuthor('');
    setUrl('');
  };

  return (
    <div>
      <h2>Create new blog</h2>
      <form onSubmit={createBlog}>
        <div>
          Title:
          <input
            value={title}
            onChange={({ target }) => setTitle(target.value)}
            id='title-input'
          />
        </div>
        <div>
          Author:
          <input
            value={author}
            onChange={({ target }) => setAuthor(target.value)}
            id='author-input'
          />
        </div>
        <div>
          URL:
          <input
            value={url}
            onChange={({ target }) => setUrl(target.value)}
            id='url-input'
          />
        </div>
        <button type="submit" id='create-blog-button'>Create</button>
      </form>
    </div>
  );
}

BlogForm.propTypes = {
  addBlog: PropTypes.func.isRequired,
};

export default BlogForm;
