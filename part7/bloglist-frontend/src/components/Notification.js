import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';

function Notification(props) {
  const notification = props.isError
    ? props.notification.errorMessage
    : props.notification.successMessage;

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

  if (notification === null || notification === '') {
    return null;
  }

  return (
    <div
      className={className}
      style={style}
    >
      {notification}
    </div>
  );
}

Notification.propTypes = {
  notification: PropTypes.object,
  isError: PropTypes.bool.isRequired,
};

const mapStateToProps = (state) => ({
  notification: state.notification,
});

const ConnectedNotification = connect(mapStateToProps)(Notification);

export default ConnectedNotification;
