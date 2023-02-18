import React from 'react';
import { HealthCheckEntry, HealthCheckRating } from '../../types';
import DiagnosisList from './DiagnosisList';
import FavoriteIcon from '@mui/icons-material/Favorite';
import WarningIcon from '@mui/icons-material/Warning';
import ReportIcon from '@mui/icons-material/Report';
import HealingIcon from '@mui/icons-material/Healing';

interface Props {
  entry: HealthCheckEntry;
}

const HealthCheckEntryPage = ({ entry }: Props) => {
  const healthCheckRating = (rating: HealthCheckRating) => {
    switch (rating) {
      case 0:
        return <FavoriteIcon />;
      case 1:
        return <HealingIcon />;
      case 2:
        return <WarningIcon />;
      case 3:
        return <ReportIcon />;
      default:
        return null;
    }
  };

  return (
    <div>
      <p>
        {entry.date} <FavoriteIcon />
      </p>

      <p>
        <i>{entry.description}</i>
      </p>

      {healthCheckRating(entry.healthCheckRating)}

      <DiagnosisList entry={entry} />

      <p>Diagnosed by {entry.specialist}</p>
    </div>
  );
};

export default HealthCheckEntryPage;
