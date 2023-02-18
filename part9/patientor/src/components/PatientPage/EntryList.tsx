import React from 'react';
import { Entry } from '../../types';
import { assertNever } from '../../utils';
import HealthCheckEntry from './HealthCheckEntryPage';
import HospitalEntry from './HospitalEntryPage';
import OccupationalHealthcareEntry from './OccupationalHealthcareEntryPage';

interface Props {
  entries: Entry[];
}

const EntryList = ({ entries }: Props) => {
  if (!entries) return null;

  return (
    <div>
      <h3>Entries</h3>
      {entries.map((entry: Entry) => EntryDetails(entry))}
    </div>
  );
};

const EntryDetails = (entry: Entry) => {
  switch (entry.type) {
    case 'Hospital':
      return (
        <HospitalEntry
          key={entry.id}
          entry={entry}
        />
      );
    case 'HealthCheck':
      return (
        <HealthCheckEntry
          key={entry.id}
          entry={entry}
        />
      );
    case 'OccupationalHealthcare':
      return (
        <OccupationalHealthcareEntry
          key={entry.id}
          entry={entry}
        />
      );
    default:
      return assertNever(entry);
  }
};

export default EntryList;
