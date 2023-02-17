import React, { useState, useEffect } from 'react';
import { Gender, Patient } from '../../types';
import patientService from '../../services/patients';
import { Male, Female } from '@mui/icons-material';

interface Props {
  id: string | undefined | null;
}

const PatientPage = ({ id }: Props) => {
  const [patient, setPatient] = useState<Patient>();

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
    </div>
  );
};

export default PatientPage;
