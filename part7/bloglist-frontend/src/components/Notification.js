import React from 'react';
import PropTypes from 'prop-types';

function Notification({ message, isError }) {
  const style = {
    color: 'green',
    background: 'lightgrey',
    fontSize: 20,
    borderStyle: 'solid',
    borderRadius: 5,
    padding: 10,
    marginBottom: 10,
  };

  let className = 'success-message';

  if (isError) { style.color = 'red'; className = 'error-message'; }

  if (message === null) {
    return null;
  }

  return <div className={className} style={style}>{message}</div>;
}

Notification.propTypes = {
  message: PropTypes.string,
  isError: PropTypes.bool.isRequired,
};

export default Notification;
