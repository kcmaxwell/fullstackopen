import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import { addLike, removeBlog } from '../reducers/blogReducer';

const blogStyle = {
  paddingTop: 10,
  paddingLeft: 2,
  border: 'solid',
  borderWidth: 1,
  marginBottom: 5,
};

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
        <div
          style={blogStyle}
          key={blog.id}
        >
          <Link to={`/blogs/${blog.id}`}>{blog.title}</Link>
        </div>
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
