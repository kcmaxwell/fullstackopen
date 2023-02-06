import React, { useState } from 'react';
import PropTypes from 'prop-types';
import Select from 'react-select';
import { useQuery, useMutation } from '@apollo/client';
import { ALL_AUTHORS, EDIT_AUTHOR } from '../queries';

const Authors = (props) => {
  const result = useQuery(ALL_AUTHORS);

  const [author, setAuthor] = useState();
  const [birthyear, setBirthyear] = useState('');

  const [editAuthor] = useMutation(EDIT_AUTHOR, {
    refetchQueries: [{ query: ALL_AUTHORS }],
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
  });

  const handleSetBirthyear = (e) => {
    e.preventDefault();

    editAuthor({
      variables: { name: author, setBornTo: parseInt(birthyear) },
    });

    setAuthor('');
    setBirthyear('');
  };

  if (!props.show) {
    return null;
  }

  if (result.loading) {
    return <div>Loading...</div>;
  }

  return (
    <div>
      <h2>authors</h2>
      <table>
        <tbody>
          <tr>
            <th>Name</th>
            <th>Born</th>
            <th>Books</th>
          </tr>
          {result.data.allAuthors.map((a) => (
            <tr key={a.id}>
              <td>{a.name}</td>
              <td>{a.born}</td>
              <td>{a.bookCount}</td>
            </tr>
          ))}
        </tbody>
      </table>

      <h3>Set Birthyear</h3>
      <form onSubmit={handleSetBirthyear}>
        <div>
          Name:{' '}
          <Select
            defaultValue={author}
            onChange={(data) => setAuthor(data.value)}
            options={result.data.allAuthors.map((a) => ({
              value: a.name,
              label: a.name,
            }))}
          />
        </div>
        <div>
          Born:{' '}
          <input
            type='number'
            value={birthyear}
            onChange={({ target }) => setBirthyear(target.value)}
          />
        </div>
        <button type='submit'>Update Author</button>
      </form>
    </div>
  );
};

Authors.propTypes = {
  show: PropTypes.bool.isRequired,
  setError: PropTypes.func.isRequired,
};

export default Authors;
{
  /* <select
            value={author}
            onChange={({ target }) => setAuthor(target.value)}
          >
            {result.data.allAuthors.map((a) => (
              <option
                key={a.id.concat('select')}
                value={a.name}
              >
                {a.name}
              </option>
            ))}
          </select> */
}
