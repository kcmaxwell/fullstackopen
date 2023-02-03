import React from 'react';
import { useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import { Table } from 'react-bootstrap';

const UserList = () => {
  const users = useSelector((state) => state.users);

  return (
    <div>
      <Table>
        <thead>
          <tr>
            <th>Name</th>
            <th>Blogs Created</th>
          </tr>
        </thead>
        <tbody>
          {users.map((user) => (
            <tr key={user.id}>
              <th>
                <Link to={`/users/${user.id}`}>{user.name}</Link>
              </th>
              <th>{user.blogs.length}</th>
            </tr>
          ))}
        </tbody>
      </Table>
    </div>
  );
};

export default UserList;
