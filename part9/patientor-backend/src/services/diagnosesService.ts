import diagnosesData from '../../data/diagnoses';

import { Diagnosis } from '../types';

const diagnoses: Diagnosis[] = diagnosesData;

const getDiagnoses = (): Diagnosis[] => {
  return diagnoses;
};

const getDiagnosis = (code: string): Diagnosis => {
  const diagnosis = diagnoses.find((element) => element.code === code);

  if (diagnosis) return diagnosis;

  throw new Error('No diagnosis with given code');
};

export default {
  getDiagnoses,
  getDiagnosis,
};
