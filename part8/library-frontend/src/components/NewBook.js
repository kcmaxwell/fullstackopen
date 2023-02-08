import React, { useState } from 'react';
import PropTypes from 'prop-types';
import { useMutation } from '@apollo/client';
import {
  ADD_BOOK,
  ALL_AUTHORS,
  ALL_BOOKS_BY_GENRE,
  FAVOURITE_BOOKS,
  UNIQUE_GENRES,
} from '../queries';

const NewBook = (props) => {
  const [title, setTitle] = useState('');
  const [author, setAuthor] = useState('');
  const [published, setPublished] = useState('');
  const [genre, setGenre] = useState('');
  const [genres, setGenres] = useState([]);

  const [addBook] = useMutation(ADD_BOOK, {
    refetchQueries: [
      { query: ALL_AUTHORS },
      { query: FAVOURITE_BOOKS },
      { query: UNIQUE_GENRES },
    ],
    onError: ({ graphQLErrors, networkError }) => {
      if (graphQLErrors) {
        const messages = [];
        graphQLErrors.forEach(({ message, locations, path }) =>
          messages.push(
            `[GraphQL error]: Message: ${message}, Location: ${locations}, Path: ${path}`
          )
        );
        props.setError(messages.join('\n'));
      }
      if (networkError) props.setError(`Please fill all fields.`);
    },
    update: (cache, response) => {
      cache.updateQuery(
        { query: ALL_BOOKS_BY_GENRE, variables: { genre: '' } },
        (data) => {
          if (data)
            return {
              allBooks: data.allBooks.concat(response.data.addBook),
            };
        }
      );

      // update each query for the genres of the given book
      response.data.addBook.genres.forEach((genre) => {
        cache.updateQuery(
          { query: ALL_BOOKS_BY_GENRE, variables: { genre } },
          (data) => {
            if (data)
              return {
                allBooks: data.allBooks.concat(response.data.addBook),
              };
          }
        );
      });
    },
  });

  if (!props.show) {
    return null;
  }

  const submit = async (event) => {
    event.preventDefault();

    addBook({
      variables: { title, author, published: parseInt(published), genres },
    });

    setTitle('');
    setPublished('');
    setAuthor('');
    setGenres([]);
    setGenre('');
  };

  const addGenre = () => {
    setGenres(genres.concat(genre));
    setGenre('');
  };

  return (
    <div>
      <h2>Add Book</h2>

      <form onSubmit={submit}>
        <div>
          title
          <input
            value={title}
            onChange={({ target }) => setTitle(target.value)}
          />
        </div>
        <div>
          author
          <input
            value={author}
            onChange={({ target }) => setAuthor(target.value)}
          />
        </div>
        <div>
          published
          <input
            type='number'
            value={published}
            onChange={({ target }) => setPublished(target.value)}
          />
        </div>
        <div>
          <input
            value={genre}
            onChange={({ target }) => setGenre(target.value)}
          />
          <button
            onClick={addGenre}
            type='button'
          >
            add genre
          </button>
        </div>
        <div>genres: {genres.join(' ')}</div>
        <button type='submit'>create book</button>
      </form>
    </div>
  );
};

NewBook.propTypes = {
  show: PropTypes.bool.isRequired,
  setError: PropTypes.func.isRequired,
};

export default NewBook;
