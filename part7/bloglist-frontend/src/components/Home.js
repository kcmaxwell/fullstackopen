import React from 'react';
import PropTypes from 'prop-types';
import BlogList from './BlogList';
import Togglable from './Togglable';
import BlogForm from './BlogForm';

const Home = ({ addBlog, blogFormRef }) => (
  <div>
    <BlogList />

    <Togglable
      buttonLabel='Add new blog'
      ref={blogFormRef}
    >
      <BlogForm addBlog={addBlog} />
    </Togglable>
  </div>
);

Home.propTypes = {
  addBlog: PropTypes.func.isRequired,
  blogFormRef: PropTypes.object.isRequired,
};

export default Home;
