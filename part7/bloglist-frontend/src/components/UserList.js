import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';

const UserList = (props) => (
  <div>
    <table>
      <thead>
        <tr>
          <th>Name</th>
          <th>Blogs Created</th>
        </tr>
      </thead>
      <tbody>
        {props.users.map((user) => (
          <tr key={user.id}>
            <th>
              <Link to={`/users/${user.id}`}>{user.name}</Link>
            </th>
            <th>{user.blogs.length}</th>
          </tr>
        ))}
      </tbody>
    </table>
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
