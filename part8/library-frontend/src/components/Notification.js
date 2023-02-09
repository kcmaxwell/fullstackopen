import React from 'react';
import PropTypes from 'prop-types';

const Notification = ({ message, isError }) => {
  const errorStyle = {
    color: 'red',
  };

  const messageStyle = {
    color: 'green',
  };

  if (message === null) return null;

  return <div style={isError ? errorStyle : messageStyle}>{message}</div>;
};

Notification.propTypes = {
  message: PropTypes.string,
  isError: PropTypes.bool.isRequired,
};

export default Notification;
