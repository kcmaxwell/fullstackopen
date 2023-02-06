import React from 'react';
import PropTypes from 'prop-types';

const Notification = ({ errorMessage }) => {
  const errorStyle = {
    color: 'red',
  };

  if (errorMessage === null) return null;

  return <div style={errorStyle}>{errorMessage}</div>;
};

Notification.propTypes = {
  errorMessage: PropTypes.string,
};

export default Notification;
