import patientsData from '../../data/patients';

import { Patient, PatientNoSSN } from '../types';

const patients: Patient[] = patientsData;

const getPatientsNoSSN = (): PatientNoSSN[] => {
  return patients.map(({ id, name, dateOfBirth, gender, occupation }) => ({
    id,
    name,
    dateOfBirth,
    gender,
    occupation,
  }));
};

export default {
  getPatientsNoSSN,
};
