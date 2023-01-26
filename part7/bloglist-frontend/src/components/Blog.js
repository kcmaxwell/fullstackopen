import React, { useState } from 'react';
import PropTypes from 'prop-types';

const Blog = ({ blog, addLike, deleteBlog }) => {
  const [visible, setVisible] = useState(false);

  // const hideWhenVisible = { display: visible ? 'none' : '' };
  const showWhenVisible = { display: visible ? '' : 'none' };

  const blogStyle = {
    paddingTop: 10,
    paddingLeft: 2,
    border: 'solid',
    borderWidth: 1,
    marginBottom: 5,
  };

  return (
    <div style={blogStyle}>
      <div className='blog-content'>
        {blog.title}
        {' by '}
        {blog.author}
        <button
          className='show-button'
          onClick={() => setVisible(!visible)}
        >
          {visible ? 'hide' : 'view'}
        </button>
      </div>
      <div
        style={showWhenVisible}
        className='hidden-content'
      >
        <div>{blog.url}</div>
        <div id='likes'>
          Likes: {blog.likes}{' '}
          <button
            className='like-button'
            onClick={() => addLike(blog)}
          >
            Like
          </button>
        </div>
        <div>{blog.user.name}</div>
        <div>
          <button
            id='delete-button'
            onClick={() => deleteBlog(blog)}
          >
            Remove
          </button>
        </div>
      </div>
    </div>
  );
};

Blog.propTypes = {
  blog: PropTypes.object.isRequired,
  addLike: PropTypes.func.isRequired,
  deleteBlog: PropTypes.func.isRequired,
};

export default Blog;
