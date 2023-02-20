import React, { useState, SyntheticEvent, useEffect } from 'react';

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
  Switch,
  OutlinedInput,
  Box,
  Chip,
} from '@mui/material';

import { EntryFormValues, HealthCheckRating, Diagnosis } from '../../types';
import diagnosesService from '../../services/diagnoses';

interface Props {
  onCancel: () => void;
  onSubmit: (values: EntryFormValues) => void;
}

const AddEntryForm = ({ onCancel, onSubmit }: Props) => {
  const [diagnoses, setDiagnoses] = useState<Diagnosis[]>([]);
  const [type, setType] = useState<string>('Hospital');
  const [description, setDescription] = useState('');
  const [date, setDate] = useState('');
  const [specialist, setSpecialist] = useState('');
  const [diagnosisCodes, setDiagnosisCodes] = useState<
    Array<Diagnosis['code']>
  >([]);
  const [dischargeDate, setDischargeDate] = useState('');
  const [dischargeCriteria, setDischargeCriteria] = useState('');
  const [healthCheckRating, setHealthCheckRating] = useState<HealthCheckRating>(
    HealthCheckRating.Healthy
  );
  const [employerName, setEmployerName] = useState('');
  const [isSickLeave, setIsSickLeave] = useState<boolean>(false);
  const [sickLeaveStartDate, setSickLeaveStartDate] = useState('');
  const [sickLeaveEndDate, setSickLeaveEndDate] = useState('');

  useEffect(() => {
    const fetchDiagnosesList = async () => {
      const fetchedDiagnoses = await diagnosesService.getAll();
      setDiagnoses(fetchedDiagnoses);
    };
    void fetchDiagnosesList();
  }, []);

  const onHealthCheckRatingChange = (event: SelectChangeEvent<string>) => {
    event.preventDefault();

    if (typeof event.target.value === 'number') {
      const value = event.target.value;
      const rating = Object.values(HealthCheckRating).find((v) => v === value);
      if (rating !== undefined && rating in HealthCheckRating) {
        setHealthCheckRating(rating as HealthCheckRating);
      }
    }
  };

  const addEntry = (event: SyntheticEvent) => {
    event.preventDefault();

    switch (type) {
      case 'Hospital':
        onSubmit({
          description,
          date,
          specialist,
          diagnosisCodes,
          discharge: { date: dischargeDate, criteria: dischargeCriteria },
          type,
        });
        break;
      case 'HealthCheck':
        onSubmit({
          description,
          date,
          specialist,
          diagnosisCodes,
          healthCheckRating,
          type,
        });
        break;
      case 'OccupationalHealthcare':
        onSubmit({
          description,
          date,
          specialist,
          diagnosisCodes,
          employerName,
          sickLeave: isSickLeave
            ? {
                startDate: sickLeaveStartDate,
                endDate: sickLeaveEndDate,
              }
            : undefined,
          type,
        });
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

  const handleDiagnosisCodeChange = (
    event: SelectChangeEvent<typeof diagnosisCodes>
  ) => {
    const {
      target: { value },
    } = event;
    setDiagnosisCodes(typeof value === 'string' ? value.split(',') : value);
  };

  const handleSickLeaveChange = (
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    setIsSickLeave(event.target.checked);
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
          type='date'
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
        <Select
          label='Diagnosis Codes'
          multiple
          value={diagnosisCodes}
          onChange={handleDiagnosisCodeChange}
          input={<OutlinedInput label='Chip' />}
          renderValue={(selected) => (
            <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 0.5 }}>
              {selected.map((diagnosis) => (
                <Chip
                  key={diagnosis}
                  label={diagnosis}
                />
              ))}
            </Box>
          )}
        >
          {diagnoses.map((diagnosis) => (
            <MenuItem
              key={diagnosis.code}
              value={diagnosis.code}
            >
              {diagnosis.code}: {diagnosis.name}
            </MenuItem>
          ))}
        </Select>

        {type === 'Hospital' && (
          <>
            <InputLabel id='discharge-label'>Discharge</InputLabel>
            <TextField
              type='date'
              label='Date'
              fullWidth
              value={dischargeDate}
              onChange={({ target }) => setDischargeDate(target.value)}
            />
            <TextField
              label='Criteria'
              fullWidth
              value={dischargeCriteria}
              onChange={({ target }) => setDischargeCriteria(target.value)}
            />
          </>
        )}

        {type === 'HealthCheck' && (
          <>
            <InputLabel id='health-check-rating-select-label'>
              Health Check Rating
            </InputLabel>
            <Select
              labelId='health-check-rating-select-label'
              id='health-check-rating-select'
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

        {type === 'OccupationalHealthcare' && (
          <>
            <TextField
              label='Employer'
              fullWidth
              value={employerName}
              onChange={({ target }) => setEmployerName(target.value)}
            />
            <InputLabel id='sick-leave-label'>Sick Leave</InputLabel>
            <Switch
              checked={isSickLeave}
              onChange={handleSickLeaveChange}
            />
            {isSickLeave && (
              <>
                <TextField
                  type='date'
                  label='Start Date'
                  fullWidth
                  value={sickLeaveStartDate}
                  onChange={({ target }) => setSickLeaveStartDate(target.value)}
                />
                <TextField
                  type='date'
                  label='End Date'
                  fullWidth
                  value={sickLeaveEndDate}
                  onChange={({ target }) => setSickLeaveEndDate(target.value)}
                />
              </>
            )}
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
