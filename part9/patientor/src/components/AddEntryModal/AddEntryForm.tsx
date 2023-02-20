import { useState, SyntheticEvent } from 'react';

import {
  TextField,
  InputLabel,
  MenuItem,
  Select,
  Grid,
  Button,
  ToggleButton,
  ToggleButtonGroup,
  SelectChangeEvent,
} from '@mui/material';

import { EntryFormValues, HealthCheckRating } from '../../types';
import { assertNever } from '../../utils';

interface Props {
  onCancel: () => void;
  onSubmit: (values: EntryFormValues) => void;
}

const AddEntryForm = ({ onCancel, onSubmit }: Props) => {
  const [type, setType] = useState<string>('Hospital');
  const [description, setDescription] = useState('');
  const [date, setDate] = useState('');
  const [specialist, setSpecialist] = useState('');
  const [diagnosisCodes, setDiagnosisCodes] = useState('');
  const [healthCheckRating, setHealthCheckRating] = useState<HealthCheckRating>(
    HealthCheckRating.Healthy
  );

  const onHealthCheckRatingChange = (event: SelectChangeEvent<string>) => {
    event.preventDefault();

    console.log('onHealthCheckRatingChange entered');
    console.log(event.target.value);

    if (typeof event.target.value === 'number') {
      const value = event.target.value;
      const rating = Object.values(HealthCheckRating).find((v) => v === value);
      console.log('passed the event target value if');
      if (rating !== undefined && rating in HealthCheckRating) {
        console.log('passed the second if, should set healthCheckRating');
        setHealthCheckRating(rating as HealthCheckRating);
      }
    }
  };

  const addEntry = (event: SyntheticEvent) => {
    event.preventDefault();

    switch (type) {
      case 'Hospital':
        break;
      case 'HealthCheck':
        onSubmit({
          description,
          date,
          specialist,
          diagnosisCodes: diagnosisCodes.split(','),
          healthCheckRating,
          type,
        });
        break;
      case 'OccupationalHealthcare':
        break;
      default:
        return;
    }
  };

  const handleTypeChange = (
    event: React.MouseEvent<HTMLElement>,
    newType: string
  ) => {
    setType(newType);
  };

  return (
    <div>
      <form onSubmit={addEntry}>
        <ToggleButtonGroup
          color='primary'
          value={type}
          exclusive
          onChange={handleTypeChange}
          aria-label='text alignment'
        >
          <ToggleButton value='Hospital'>Hospital</ToggleButton>
          <ToggleButton value='HealthCheck'>Health Check</ToggleButton>
          <ToggleButton value='OccupationalHealthcare'>
            Occupational Healthcare
          </ToggleButton>
        </ToggleButtonGroup>

        <TextField
          label='Description'
          fullWidth
          value={description}
          onChange={({ target }) => setDescription(target.value)}
        />
        <TextField
          label='Date'
          placeholder='YYYY-MM-DD'
          fullWidth
          value={date}
          onChange={({ target }) => setDate(target.value)}
        />
        <TextField
          label='Specialist'
          fullWidth
          value={specialist}
          onChange={({ target }) => setSpecialist(target.value)}
        />
        <TextField
          label='Diagnosis Codes'
          fullWidth
          value={diagnosisCodes}
          onChange={({ target }) => setDiagnosisCodes(target.value)}
        />

        {type === 'Hospital' && (
          <>
            <InputLabel id='demo-simple-select-label'>Age</InputLabel>
            <Select
              labelId='demo-simple-select-label'
              id='demo-simple-select'
              value={healthCheckRating.toString()}
              label='Age'
              onChange={onHealthCheckRatingChange}
            >
              <MenuItem value={HealthCheckRating.Healthy}>Healthy</MenuItem>
              <MenuItem value={HealthCheckRating.LowRisk}>Low Risk</MenuItem>
              <MenuItem value={HealthCheckRating.HighRisk}>High Risk</MenuItem>
              <MenuItem value={HealthCheckRating.CriticalRisk}>
                Critical Risk
              </MenuItem>
            </Select>
          </>
        )}

        <Grid>
          <Grid item>
            <Button
              color='secondary'
              variant='contained'
              style={{ float: 'left' }}
              type='button'
              onClick={onCancel}
            >
              Cancel
            </Button>
          </Grid>
          <Grid item>
            <Button
              style={{
                float: 'right',
              }}
              type='submit'
              variant='contained'
            >
              Add
            </Button>
          </Grid>
        </Grid>
      </form>
    </div>
  );
};

export default AddEntryForm;
