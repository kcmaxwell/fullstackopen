import React from 'react';
import PropTypes from 'prop-types';
import { useDispatch } from 'react-redux';
import { addLike, removeBlog } from '../reducers/blogReducer';

const Blog = (props) => {
  const dispatch = useDispatch();

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
          onClick={() => dispatch(addLike(blog))}
        >
          Like
        </button>
      </div>
      <div>Added by {blog.user.name}</div>
      <div>
        <button
          id='delete-button'
          onClick={() => dispatch(removeBlog(blog))}
        >
          Remove
        </button>
      </div>
    </div>
  );
};

Blog.propTypes = {
  blog: PropTypes.object,
};

export default Blog;
