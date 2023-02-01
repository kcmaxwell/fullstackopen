import React from 'react';
import PropTypes from 'prop-types';
import { useSelector } from 'react-redux';

function Notification(props) {
  const notification = useSelector((state) => state.notification);

  const message = props.isError
    ? notification.errorMessage
    : notification.successMessage;

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

  if (props.isError) {
    style.color = 'red';
    className = 'error-message';
  }

  if (message === null || message === '') {
    return null;
  }

  return (
    <div
      className={className}
      style={style}
    >
      {message}
    </div>
  );
}

Notification.propTypes = {
  isError: PropTypes.bool.isRequired,
};

export default Notification;
