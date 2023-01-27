import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import User from './User';

const UserList = (props) => (
  <div>
    {props.users.map((user) => (
      <User
        key={user.id}
        user={user}
      />
    ))}
  </div>
);

UserList.propTypes = {
  users: PropTypes.arrayOf(
    PropTypes.shape({
      username: PropTypes.string,
    })
  ),
};

const mapStateToProps = (state) => ({
  users: state.users,
});

const ConnectedUserList = connect(mapStateToProps)(UserList);

export default ConnectedUserList;
