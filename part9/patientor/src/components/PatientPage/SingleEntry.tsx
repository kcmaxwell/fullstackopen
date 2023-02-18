import React from 'react';
import { Entry } from '../../types';

interface Props {
  entry: Entry;
}

const SingleEntry = ({ entry }: Props) => {
  return (
    <div>
      <p>
        {entry.date}: {entry.description}
      </p>
      <ul>
        {entry.diagnosisCodes &&
          entry.diagnosisCodes.map((code) => <li key={code}>{code}</li>)}
      </ul>
    </div>
  );
};

export default SingleEntry;
