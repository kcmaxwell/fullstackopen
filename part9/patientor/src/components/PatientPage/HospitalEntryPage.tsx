import React from 'react';
import { HospitalEntry } from '../../types';
import DiagnosisList from './DiagnosisList';
import LocalHospitalIcon from '@mui/icons-material/LocalHospital';

interface Props {
  entry: HospitalEntry;
}

const HospitalEntryPage = ({ entry }: Props) => {
  return (
    <div>
      <p>
        {entry.date} <LocalHospitalIcon />
      </p>

      <p>
        <i>{entry.description}</i>
      </p>

      <DiagnosisList entry={entry} />

      <p>Diagnosed by {entry.specialist}</p>

      {entry.discharge && (
        <p>
          Discharged {entry.discharge.date}: {entry.discharge.criteria}
        </p>
      )}
    </div>
  );
};

export default HospitalEntryPage;
