import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Gender, Patient, PatientFormValues } from '../../types';
import patientService from '../../services/patients';
import { Male, Female } from '@mui/icons-material';
import EntryList from './EntryList';

import { Button } from '@mui/material';
import AddEntryModal from '../AddEntryModal';

interface Props {
  id: string | undefined | null;
}

const PatientPage = ({ id }: Props) => {
  const [patient, setPatient] = useState<Patient>();
  const [modalOpen, setModalOpen] = useState<boolean>(false);
  const [error, setError] = useState<string>();

  const openModal = (): void => setModalOpen(true);

  const closeModal = (): void => {
    setModalOpen(false);
    setError(undefined);
  };

  const submitNewEntry = async (values: PatientFormValues) => {
    if (!patient) return;
    try {
      const updatedPatient = await patientService.addEntry(patient.id, values);
      setPatient(updatedPatient);
      setModalOpen(false);
    } catch (e: unknown) {
      if (axios.isAxiosError(e)) {
        if (e?.response?.data && typeof e?.response?.data === 'string') {
          const message = e.response.data.replace(
            'Something went wrong. Error: ',
            ''
          );
          console.error(message);
          setError(message);
        } else {
          setError('Unrecognized axios error');
        }
      } else {
        console.error('Unknown error', e);
        setError('Unknown error');
      }
    }
  };

  useEffect(() => {
    if (id) {
      const fetchPatient = async () => {
        const patient = await patientService.getOne(id);
        setPatient(patient);
      };
      void fetchPatient();
    }
  }, []);

  if (!patient) return <div>index</div>;

  return (
    <div>
      <h2>
        {patient.name} {patient.gender === Gender.Male ? <Male /> : null}
        {patient.gender === Gender.Female ? <Female /> : null}
      </h2>

      <div>SSN: {patient.ssn}</div>
      <div>Occupation: {patient.occupation}</div>

      <div>
        <AddEntryModal
          modalOpen={modalOpen}
          onSubmit={submitNewEntry}
          error={error}
          onClose={closeModal}
        />
        <Button
          variant='contained'
          onClick={() => openModal()}
        >
          Add New Entry
        </Button>
      </div>

      <EntryList entries={patient.entries} />
    </div>
  );
};

export default PatientPage;
