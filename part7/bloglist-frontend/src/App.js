import React, { useState, useEffect, useRef } from 'react';
import { Routes, Route, Link, useMatch } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import { setNotification } from './reducers/notificationReducer';
import { initializeBlogs } from './reducers/blogReducer';
import { initializeUsers } from './reducers/usersReducer';
import { setUserAction } from './reducers/userReducer';
import blogService from './services/blogs';
import loginService from './services/login';
import LoginForm from './components/LoginForm';
import Notification from './components/Notification';
import Users from './components/Users';
import Home from './components/Home';
import User from './components/User';
import Blog from './components/Blog';

const App = () => {
  const dispatch = useDispatch();

  const user = useSelector((state) => state.user);
  const users = useSelector((state) => state.users);
  const reduxBlogs = useSelector((state) => state.blogs);

  const [blogs, setBlogs] = useState([]);
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');

  const blogFormRef = useRef();

  const userMatch = useMatch('/users/:id');
  const matchedUser = userMatch
    ? users.find((u) => u.id === userMatch.params.id)
    : null;

  const blogMatch = useMatch('/blogs/:id');
  const matchedBlog = blogMatch
    ? reduxBlogs.find((b) => b.id === blogMatch.params.id)
    : null;

  useEffect(() => {
    dispatch(initializeBlogs());
  }, [dispatch]);

  useEffect(() => {
    dispatch(initializeUsers());
  }, [dispatch]);

  useEffect(() => {
    if (user) blogService.setToken(user.token);
  }, [user]);

  const displayErrorMessage = (message) => {
    dispatch(setNotification(message, true, 5));
  };

  const displaySuccessMessage = (message) => {
    dispatch(setNotification(message, false, 5));
  };

  const handleLogin = async (event) => {
    event.preventDefault();

    try {
      const newUser = await loginService.login({
        username,
        password,
      });
      dispatch(setUserAction(newUser));
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
      `New blog added: ${blogObject.title} by ${blogObject.author}`
    );

    blogFormRef.current.toggleVisibility();
  };

  if (user === null) {
    return (
      <div>
        <Notification isError={false} />
        <Notification isError={true} />
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
      <div>
        <Link to='/'>Home</Link>
        <Link to='/users'>Users</Link>
      </div>

      <Notification isError={false} />
      <Notification isError={true} />
      <h2>Blogs</h2>
      <Routes>
        <Route
          path='/users/:id'
          element={<User user={matchedUser} />}
        />
        <Route
          path='/users'
          element={<Users />}
        />
        <Route
          path='/blogs/:id'
          element={<Blog blog={matchedBlog} />}
        />
        <Route
          path='/'
          element={
            <Home
              addBlog={addBlog}
              blogFormRef={blogFormRef}
            />
          }
        />
      </Routes>
    </div>
  );
};

export default App;
