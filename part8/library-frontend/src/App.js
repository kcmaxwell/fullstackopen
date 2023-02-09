import { useApolloClient, useSubscription } from '@apollo/client';
import React, { useEffect, useState } from 'react';
import Authors from './components/Authors';
import Books from './components/Books';
import LoginForm from './components/LoginForm';
import NewBook from './components/NewBook';
import Notification from './components/Notification';
import RecommendedBooks from './components/RecommendedBooks';
import { ALL_BOOKS_BY_GENRE, BOOK_ADDED } from './queries';

export const updateCache = (cache, query, addedBook) => {
  const uniqueByName = (allBooks) => {
    const seen = new Set();
    return allBooks.filter((book) => {
      return seen.has(book.title) ? false : seen.add(book.title);
    });
  };

  cache.updateQuery(query, (data) => {
    if (data)
      return {
        allBooks: uniqueByName(data.allBooks.concat(addedBook)),
      };
  });
};

const App = () => {
  const [token, setToken] = useState(null);
  const [page, setPage] = useState('authors');
  const [message, setMessage] = useState(null);
  const [errorMessage, setErrorMessage] = useState(null);

  const client = useApolloClient();

  useEffect(() => {
    if (!token) {
      setToken(localStorage.getItem('library-user-token'));
    }
  }, [token]);

  useSubscription(BOOK_ADDED, {
    onData: ({ data }) => {
      const addedBook = data.data.bookAdded;
      notifyMessage(`${addedBook.title} added`);

      // update all genres view
      updateCache(
        client.cache,
        { query: ALL_BOOKS_BY_GENRE, variables: { genre: '' } },
        addedBook
      );

      // update each genre view of the book's genres
      addedBook.genres.forEach((genre) => {
        updateCache(
          client.cache,
          { query: ALL_BOOKS_BY_GENRE, variables: { genre } },
          addedBook
        );
      });
    },
  });

  const notifyMessage = (msg) => {
    setMessage(msg);
    setTimeout(() => {
      setMessage(null);
    }, 5000);
  };

  const notifyError = (msg) => {
    setErrorMessage(msg);
    setTimeout(() => {
      setErrorMessage(null);
    }, 5000);
  };

  const logout = () => {
    setToken(null);
    localStorage.clear();
    client.resetStore();
    setPage('authors');
  };

  return (
    <div>
      <div>
        <button onClick={() => setPage('authors')}>authors</button>
        <button onClick={() => setPage('books')}>books</button>
        {token && (
          <button onClick={() => setPage('recommended')}>recommended</button>
        )}
        {token && <button onClick={() => setPage('add')}>add book</button>}
        {!token && <button onClick={() => setPage('login')}>login</button>}
        {token && <button onClick={logout}>logout</button>}
      </div>

      <Notification
        message={message}
        isError={false}
      />
      <Notification
        message={errorMessage}
        isError={true}
      />

      <Authors
        show={page === 'authors'}
        setError={notifyError}
        login={token === null}
      />

      <Books show={page === 'books'} />

      <RecommendedBooks show={page === 'recommended'} />

      <NewBook
        show={page === 'add'}
        setError={notifyError}
      />

      <LoginForm
        show={page === 'login'}
        setError={notifyError}
        setToken={setToken}
        setPage={setPage}
      />
    </div>
  );
};

export default App;
