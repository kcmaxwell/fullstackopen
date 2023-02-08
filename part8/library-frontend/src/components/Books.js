import React from 'react';
import PropTypes from 'prop-types';
import { useQuery } from '@apollo/client';
import { ALL_BOOKS } from '../queries';

const Books = (props) => {
  const result = useQuery(ALL_BOOKS);

  const getUniqueGenres = (allBooks) => {
    const uniqueGenres = new Set();
    allBooks.map((book) => book.genres.map((genre) => uniqueGenres.add(genre)));
    return Array.from(uniqueGenres);
  };

  if (!props.show) {
    return null;
  }

  if (result.loading) {
    return <div>Loading...</div>;
  }

  return (
    <div>
      <h2>Books</h2>

      <table>
        <tbody>
          <tr>
            <th></th>
            <th>author</th>
            <th>published</th>
          </tr>
          {result.data.allBooks.map((a) => (
            <tr key={a.id}>
              <td>{a.title}</td>
              <td>{a.author.name}</td>
              <td>{a.published}</td>
            </tr>
          ))}
        </tbody>
      </table>

      {getUniqueGenres(result.data.allBooks).map((genre) => (
        <button key={genre.concat('Button')}>{genre}</button>
      ))}
      <button>All Genres</button>
    </div>
  );
};

Books.propTypes = {
  show: PropTypes.bool.isRequired,
};

export default Books;
