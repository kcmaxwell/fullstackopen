import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { addLike, removeBlog } from '../reducers/blogReducer';

const Blog = (props) => {
  const { blog } = props;

  if (!blog) return null;

  return (
    <div>
      <h2>{blog.title}</h2>

      <div>{blog.url}</div>
      <div>
        {blog.likes}
        <button
          className='like-button'
          onClick={() => props.addLike(blog)}
        >
          Like
        </button>
      </div>
      <div>Added by {blog.user.name}</div>
      <div>
        <button
          id='delete-button'
          onClick={() => props.removeBlog(blog)}
        >
          Remove
        </button>
      </div>
    </div>
  );
};

Blog.propTypes = {
  blog: PropTypes.object,
  addLike: PropTypes.func.isRequired,
  removeBlog: PropTypes.func.isRequired,
};

const mapDispatchToProps = {
  addLike,
  removeBlog,
};

const ConnectedBlog = connect(null, mapDispatchToProps)(Blog);

export default ConnectedBlog;
