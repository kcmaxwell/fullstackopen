import axios from 'axios';

const baseUrl = '/api/blogs';

let token;

const setToken = (newToken) => {
  token = `bearer ${newToken}`;
};

const getAll = () => {
  const request = axios.get(baseUrl);
  return request.then((response) => response.data);
};

const create = async (newBlog) => {
  const config = {
    headers: { Authorization: token },
  };
  const response = await axios.post(baseUrl, newBlog, config);
  return response.data;
};

const increaseLikes = async (blog) => {
  const updatedBlog = { ...blog, likes: blog.likes + 1, user: blog.user.id };

  const response = await axios.put(`${baseUrl}/${blog.id}`, updatedBlog);
  return response.data;
};

const deleteBlog = async (blog) => {
  const config = {
    headers: { Authorization: token },
  };

  const response = await axios.delete(`${baseUrl}/${blog.id}`, config);
  return response;
};

const addComment = async (blog, comment) => {
  const config = {
    headers: { Authorization: token },
  };

  const response = await axios.post(
    `${baseUrl}/${blog.id}/comments`,
    {
      comment,
    },
    config
  );
  return response.data;
};

const blogService = {
  getAll,
  create,
  setToken,
  increaseLikes,
  deleteBlog,
  addComment,
};

export default blogService;
