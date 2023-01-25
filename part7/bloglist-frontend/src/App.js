import React, { useState, useEffect, useRef } from 'react';
import Blog from './components/Blog';
import blogService from './services/blogs';
import loginService from './services/login';
import LoginForm from './components/LoginForm';
import BlogForm from './components/BlogForm';
import Notification from './components/Notification';
import Togglable from './components/Togglable';

const App = () => {
  const [blogs, setBlogs] = useState([]);
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [user, setUser] = useState(null);
  const [successMessage, setSuccessMessage] = useState(null);
  const [errorMessage, setErrorMessage] = useState(null);

  const blogFormRef = useRef();

  useEffect(() => {
    blogService.getAll().then((newBlogs) => setBlogs(newBlogs));
  }, []);

  useEffect(() => {
    const loggedUserJSON = window.localStorage.getItem('loggedUser');
    if (loggedUserJSON) {
      const newUser = JSON.parse(loggedUserJSON);
      setUser(newUser);
      blogService.setToken(newUser.token);
    }
  }, []);

  const displayErrorMessage = (message) => {
    setErrorMessage(message);
    setTimeout(() => {
      setErrorMessage(null);
    }, 5000);
  };

  const displaySuccessMessage = (message) => {
    setSuccessMessage(message);
    setTimeout(() => {
      setSuccessMessage(null);
    }, 5000);
  };

  const handleLogin = async (event) => {
    event.preventDefault();

    try {
      const newUser = await loginService.login({
        username,
        password,
      });
      setUser(newUser);
      window.localStorage.setItem('loggedUser', JSON.stringify(newUser));
      blogService.setToken(newUser.token);

      displaySuccessMessage(`${newUser.name} logged in`);

      setUsername('');
      setPassword('');
    } catch (error) {
      displayErrorMessage('Wrong username or password');
    }
  };

  const addBlog = async (blogObject) => {
    const returnedBlog = await blogService.create(blogObject);
    setBlogs(blogs.concat(returnedBlog));

    displaySuccessMessage(
      `New blog added: ${blogObject.title} by ${blogObject.author}`,
    );

    blogFormRef.current.toggleVisibility();
  };

  const addLike = async (likedBlog) => {
    const updatedBlog = await blogService.increaseLikes(likedBlog);
    const newBlogs = blogs.map((blog) => (blog.id === updatedBlog.id ? updatedBlog : blog));
    setBlogs(newBlogs);
  };

  const deleteBlog = async (blogToDelete) => {
    try {
      const response = await blogService.deleteBlog(blogToDelete);
      if (response.status === 204) {
        const newBlogs = blogs.filter((blog) => blog.id !== blogToDelete.id);
        setBlogs(newBlogs);
      } else {
        displayErrorMessage('Cannot delete another user\'s blog');
      }
    } catch (error) {
      displayErrorMessage('Cannot delete another user\'s blog');
    }
  };

  if (user === null) {
    return (
      <div>
        <Notification message={successMessage} isError={false} />
        <Notification message={errorMessage} isError={true} />
        <LoginForm
          handleLogin={handleLogin}
          username={username}
          setUsername={setUsername}
          password={password}
          setPassword={setPassword}
        />
      </div>
    );
  }
  return (
    <div>
      <Notification message={successMessage} isError={false} />
      <Notification message={errorMessage} isError={true} />
      <h2>Blogs</h2>
      {blogs
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
            addLike={addLike}
            deleteBlog={deleteBlog}
          />
        ))}

      <Togglable buttonLabel="Add new blog" ref={blogFormRef}>
        <BlogForm addBlog={addBlog} />
      </Togglable>
    </div>
  );
};

export default App;
