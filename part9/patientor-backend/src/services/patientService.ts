import patientsData from '../../data/patients';
import { v1 as uuid } from 'uuid';

import { Patient, PatientNoSSN, NewPatient } from '../types';

const patients: Patient[] = patientsData;

const getPatientsNoSSN = (): PatientNoSSN[] => {
  return patients.map(
    ({ id, name, dateOfBirth, gender, occupation, entries }) => ({
      id,
      name,
      dateOfBirth,
      gender,
      occupation,
      entries,
    })
  );
};

const addPatient = (patient: NewPatient): Patient => {
  const newPatient = {
    id: uuid(),
    ...patient,
  };

  patients.push(newPatient);
  return newPatient;
};

export default {
  getPatientsNoSSN,
  addPatient,
};
