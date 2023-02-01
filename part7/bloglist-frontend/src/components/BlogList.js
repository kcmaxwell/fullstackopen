import React from 'react';
import { useSelector } from 'react-redux';
import { Link } from 'react-router-dom';

const blogStyle = {
  paddingTop: 10,
  paddingLeft: 2,
  border: 'solid',
  borderWidth: 1,
  marginBottom: 5,
};

const BlogList = () => {
  const blogs = useSelector((state) => state.blogs);

  return (
    <div>
      {[...blogs]
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
};

export default BlogList;
