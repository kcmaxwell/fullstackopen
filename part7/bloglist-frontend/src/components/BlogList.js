import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { addLike, removeBlog } from '../reducers/blogReducer';
import Blog from './Blog';

const BlogList = (props) => (
  <div>
    {[...props.blogs]
      .sort((a, b) => {
        if (a.likes < b.likes) {
          return 1;
        }
        if (a.likes > b.likes) {
          return -1;
        }
        return 0;
      })
      .map((blog) => (
        <Blog
          key={blog.id}
          blog={blog}
          addLike={props.addLike}
          deleteBlog={props.removeBlog}
        />
      ))}
  </div>
);

BlogList.propTypes = {
  addLike: PropTypes.func.isRequired,
  removeBlog: PropTypes.func.isRequired,
  blogs: PropTypes.arrayOf(
    PropTypes.shape({
      title: PropTypes.string,
      author: PropTypes.string,
      url: PropTypes.string,
      likes: PropTypes.number,
    })
  ),
};

const mapStateToProps = (state) => ({
  blogs: state.blogs,
});

const mapDispatchToProps = {
  addLike,
  removeBlog,
};

const ConnectedBlogList = connect(
  mapStateToProps,
  mapDispatchToProps
)(BlogList);

export default ConnectedBlogList;
