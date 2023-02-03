import React from 'react';
import PropTypes from 'prop-types';
import { useDispatch } from 'react-redux';
import { Button, ListGroup, ListGroupItem } from 'react-bootstrap';
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
        <Button
          className='like-button ms-1'
          onClick={() => dispatch(addLike(blog))}
        >
          Like
        </Button>
      </div>
      <div>Added by {blog.user.name}</div>
      <div>
        <Button
          id='delete-button'
          onClick={() => dispatch(removeBlog(blog))}
          variant='danger'
        >
          Remove
        </Button>
      </div>

      <h2>Comments</h2>
      <CommentForm addComment={addBlogComment} />
      <ListGroup className='mt-3'>
        {blog.comments.map((comment, index) => (
          <ListGroupItem key={comment.concat(index)}>{comment}</ListGroupItem>
        ))}
      </ListGroup>
    </div>
  );
};

Blog.propTypes = {
  blog: PropTypes.object,
};

export default Blog;
