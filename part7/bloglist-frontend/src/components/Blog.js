import React from 'react';
import PropTypes from 'prop-types';
import { useDispatch } from 'react-redux';
import { addLike, removeBlog, addComment } from '../reducers/blogReducer';
import CommentForm from './CommentForm';

const Blog = (props) => {
  const dispatch = useDispatch();

  const { blog } = props;

  const addBlogComment = (comment) => {
    dispatch(addComment(blog, comment));
  };

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

      <h2>Comments</h2>
      <CommentForm addComment={addBlogComment} />
      <ul>
        {blog.comments.map((comment, index) => (
          <li key={comment.concat(index)}>{comment}</li>
        ))}
      </ul>
    </div>
  );
};

Blog.propTypes = {
  blog: PropTypes.object,
};

export default Blog;
