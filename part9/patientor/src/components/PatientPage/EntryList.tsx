import React from 'react';
import { Entry } from '../../types';
import SingleEntry from './SingleEntry';

interface Props {
  entries: Entry[];
}

const EntryList = ({ entries }: Props) => {
  if (!entries) return null;

  return (
    <div>
      <h3>Entries</h3>
      {entries.map((entry: Entry) => (
        <SingleEntry
          key={entry.id}
          entry={entry}
        />
      ))}
    </div>
  );
};

export default EntryList;
