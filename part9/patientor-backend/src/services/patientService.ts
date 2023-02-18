import patientsData from '../../data/patients';
import { v1 as uuid } from 'uuid';

import { Patient, PatientNoSSN, NewPatient, Entry } from '../types';

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

const getPatient = (id: string): Patient => {
  const patient = patients.find((element) => element.id === id);

  if (patient) return patient;

  throw new Error('No patient with given id');
};

const addPatient = (patient: NewPatient): Patient => {
  const newPatient = {
    id: uuid(),
    ...patient,
  };

  patients.push(newPatient);
  return newPatient;
};

const addEntryToPatient = (patientId: string, newEntry: Entry) => {
  const patient = getPatient(patientId);
  patient.entries.push(newEntry);
  return patient;
};

export default {
  getPatientsNoSSN,
  getPatient,
  addPatient,
  addEntryToPatient,
};
