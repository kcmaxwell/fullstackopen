import React, { useState, useEffect, useRef } from 'react';
import PropTypes from 'prop-types';
import { Routes, Route, useMatch } from 'react-router-dom';
import { connect } from 'react-redux';
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

const App = (props) => {
  const {
    initializeBlogs: initBlogs,
    initializeUsers: initUsers,
    user,
  } = props;

  const [blogs, setBlogs] = useState([]);
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');

  const blogFormRef = useRef();

  const match = useMatch('/users/:id');
  const matchedUser = match
    ? props.users.find((u) => u.id === match.params.id)
    : null;

  useEffect(() => {
    initBlogs();
  }, [initBlogs]);

  useEffect(() => {
    initUsers();
  }, [initUsers]);

  useEffect(() => {
    if (user) blogService.setToken(user.token);
  }, [user]);

  const displayErrorMessage = (message) => {
    props.setNotification(message, true, 5);
  };

  const displaySuccessMessage = (message) => {
    props.setNotification(message, false, 5);
  };

  const handleLogin = async (event) => {
    event.preventDefault();

    try {
      const newUser = await loginService.login({
        username,
        password,
      });
      props.setUserAction(newUser);
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

  if (props.user === null) {
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

App.propTypes = {
  setNotification: PropTypes.func.isRequired,
  initializeBlogs: PropTypes.func.isRequired,
  setUserAction: PropTypes.func.isRequired,
  initializeUsers: PropTypes.func.isRequired,
  blogs: PropTypes.arrayOf(
    PropTypes.shape({
      title: PropTypes.string,
      author: PropTypes.string,
      url: PropTypes.string,
      likes: PropTypes.number,
    })
  ),
  users: PropTypes.arrayOf(PropTypes.object),
  user: PropTypes.object,
};

const mapStateToProps = (state) => ({
  blogs: state.blogs,
  user: state.user,
  users: state.users,
});

const mapDispatchToProps = {
  setNotification,
  initializeBlogs,
  setUserAction,
  initializeUsers,
};

const ConnectedApp = connect(mapStateToProps, mapDispatchToProps)(App);

export default ConnectedApp;
