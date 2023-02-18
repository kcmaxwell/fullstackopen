import React from 'react';
import { Entry } from '../../types';
import DiagnosisListElement from './DiagnosisListElement';

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
          entry.diagnosisCodes.map((code) => (
            <DiagnosisListElement
              key={entry.id.concat(code)}
              code={code}
            />
          ))}
      </ul>
    </div>
  );
};

export default SingleEntry;
