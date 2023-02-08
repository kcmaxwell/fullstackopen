import React, { useState } from 'react';
import PropTypes from 'prop-types';
import { useQuery } from '@apollo/client';
import { ALL_BOOKS_BY_GENRE, UNIQUE_GENRES } from '../queries';

const Books = (props) => {
  const [genre, setGenre] = useState('');

  const result = useQuery(ALL_BOOKS_BY_GENRE, {
    variables: { genre },
  });
  const uniqueGenresResult = useQuery(UNIQUE_GENRES);

  if (!props.show) {
    return null;
  }

  if (result.loading || uniqueGenresResult.loading) {
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

      {uniqueGenresResult.data.uniqueGenres.map((uniqueGenre) => (
        <button
          key={uniqueGenre.concat('Button')}
          onClick={() => setGenre(uniqueGenre)}
        >
          {uniqueGenre}
        </button>
      ))}
      <button onClick={() => setGenre('')}>All Genres</button>
    </div>
  );
};

Books.propTypes = {
  show: PropTypes.bool.isRequired,
};

export default Books;
