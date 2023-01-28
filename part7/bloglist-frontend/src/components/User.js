import React from 'react';
import PropTypes from 'prop-types';

const User = ({ user }) => (
  <>
    <tr>
      <th>{user.name}</th>
      <th>{user.blogs.length}</th>
    </tr>
  </>
);

User.propTypes = {
  user: PropTypes.object.isRequired,
};

export default User;
