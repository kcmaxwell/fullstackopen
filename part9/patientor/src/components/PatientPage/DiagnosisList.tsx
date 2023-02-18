import React from 'react';
import { Entry } from '../../types';
import DiagnosisListElement from './DiagnosisListElement';

interface Props {
  entry: Entry;
}

const DiagnosisList = ({ entry }: Props) => {
  return (
    <ul>
      {entry.diagnosisCodes &&
        entry.diagnosisCodes.map((code) => (
          <DiagnosisListElement
            key={entry.id.concat(code)}
            code={code}
          />
        ))}
    </ul>
  );
};

export default DiagnosisList;
