import { Gender, NewPatient, Entry } from './types';

const isString = (text: unknown): text is string => {
  return typeof text === 'string' || text instanceof String;
};

const parseName = (name: unknown): string => {
  if (!isString(name)) {
    throw new Error('Incorrect or missing name');
  }

  return name;
};

const parseDateOfBirth = (dateOfBirth: unknown): string => {
  if (!isString(dateOfBirth)) {
    throw new Error('Incorrect or missing date of birth');
  }

  return dateOfBirth;
};

const parseSSN = (ssn: unknown): string => {
  if (!isString(ssn)) {
    throw new Error('Incorrect or missing ssn');
  }

  return ssn;
};

const parseOccupation = (occupation: unknown): string => {
  if (!isString(occupation)) {
    throw new Error('Incorrect or missing occupation');
  }

  return occupation;
};

const isGender = (param: string): param is Gender => {
  return Object.values(Gender)
    .map((v) => v.toString())
    .includes(param);
};

const parseGender = (gender: unknown): Gender => {
  if (!isString(gender) || !isGender(gender)) {
    throw new Error('Incorrect or missing gender');
  }

  return gender;
};

const isEntryArray = (param: unknown): param is Entry[] => {
  if (!param || !isObjectArray(param)) return false;
  if (!param.every((entry: unknown) => isEntry(entry))) return false;
  return true;
};

const isObjectArray = (param: unknown): param is object[] => {
  if (!Array.isArray(param)) return false;
  if (param.some((v) => typeof v !== 'object')) return false;
  return true;
};

const isEntry = (param: unknown): param is Entry => {
  if (!param || typeof param !== 'object' || !('type' in param)) return false;
  return true;
};

const parseEntries = (object: unknown): Entry[] => {
  if (!object || !isEntryArray(object)) {
    throw new Error('Incorrect or missing data');
  }

  return object;
};

const toNewPatient = (object: unknown): NewPatient => {
  if (!object || typeof object !== 'object') {
    throw new Error('Incorrect or missing data');
  }

  if (
    'name' in object &&
    'dateOfBirth' in object &&
    'ssn' in object &&
    'occupation' in object &&
    'gender' in object &&
    'entries' in object
  ) {
    const newPatient: NewPatient = {
      name: parseName(object.name),
      dateOfBirth: parseDateOfBirth(object.dateOfBirth),
      ssn: parseSSN(object.ssn),
      occupation: parseOccupation(object.occupation),
      gender: parseGender(object.gender),
      entries: parseEntries(object.entries),
    };

    return newPatient;
  }

  throw new Error('Incorrect data: a field missing');
};

export default toNewPatient;
