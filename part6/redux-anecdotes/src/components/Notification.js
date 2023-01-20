import React from 'react';
import { connect } from 'react-redux';

const Notification = (props) => {
  const notification = props.notification.message;
  const style = {
    border: 'solid',
    padding: 10,
    borderWidth: 1,
  };

  if (notification === '' || notification === null) { return null; }

  return (
    <div style={style}>
      {notification}
    </div>
  );
};

const mapStateToProps = (state) => ({
  notification: state.notification,
});

const ConnectedNotification = connect(mapStateToProps)(Notification);

export default ConnectedNotification;
