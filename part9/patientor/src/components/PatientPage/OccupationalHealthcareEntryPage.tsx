import React from 'react';
import { OccupationalHealthcareEntry } from '../../types';
import DiagnosisList from './DiagnosisList';
import WorkIcon from '@mui/icons-material/Work';

interface Props {
  entry: OccupationalHealthcareEntry;
}

const OccupationalHealthcareEntryPage = ({ entry }: Props) => {
  return (
    <div>
      <p>
        {entry.date} <WorkIcon /> {entry.employerName}
      </p>

      <p>
        <i>{entry.description}</i>
      </p>

      <DiagnosisList entry={entry} />

      <p>Diagnosed by {entry.specialist}</p>

      {entry.sickLeave && (
        <p>
          On sick leave from {entry.sickLeave.startDate} to{' '}
          {entry.sickLeave.endDate}
        </p>
      )}
    </div>
  );
};

export default OccupationalHealthcareEntryPage;
