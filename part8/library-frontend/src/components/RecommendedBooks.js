import React from 'react';
import PropTypes from 'prop-types';
import { useQuery } from '@apollo/client';
import { FAVOURITE_BOOKS } from '../queries';

const RecommendedBooks = (props) => {
  const result = useQuery(FAVOURITE_BOOKS);

  if (!props.show) {
    return null;
  }

  if (result.loading) {
    return <div>Loading...</div>;
  }

  return (
    <div>
      <h2>Recommendations</h2>

      <p>Books in your favourite genre</p>

      {result.data.favouriteBooks.length > 0 ? (
        <table>
          <tbody>
            <tr>
              <th></th>
              <th>author</th>
              <th>published</th>
            </tr>

            {result.data.favouriteBooks.map((a) => (
              <tr key={a.id}>
                <td>{a.title}</td>
                <td>{a.author.name}</td>
                <td>{a.published}</td>
              </tr>
            ))}
          </tbody>
        </table>
      ) : (
        <div>No books found!</div>
      )}
    </div>
  );
};

RecommendedBooks.propTypes = {
  show: PropTypes.bool.isRequired,
};

export default RecommendedBooks;
