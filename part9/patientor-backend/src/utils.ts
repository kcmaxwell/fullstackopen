import {
  Gender,
  NewPatient,
  Entry,
  Diagnosis,
  EntryWithoutId,
  Discharge,
  HealthCheckRating,
  SickLeave,
} from './types';
import { v4 as uuidv4 } from 'uuid';

const isObject = (object: unknown): object is object => {
  return typeof object === 'object' || object instanceof Object;
};

const isString = (text: unknown): text is string => {
  return typeof text === 'string' || text instanceof String;
};

const isNumber = (number: unknown): number is number => {
  return typeof number === 'number' || number instanceof Number;
};

const parseName = (name: unknown): string => {
  if (!isString(name)) {
    throw new Error('Incorrect or missing name');
  }

  return name;
};

const isDate = (date: string): boolean => {
  return Boolean(Date.parse(date));
};

const parseDateOfBirth = (dateOfBirth: unknown): string => {
  if (!isString(dateOfBirth) || !isDate(dateOfBirth)) {
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
  if (!param || typeof param !== 'object') return false;
  if (
    !('type' in param) ||
    !('date' in param) ||
    !('specialist' in param) ||
    !('description' in param) ||
    !('id' in param)
  )
    return false;
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

const parseDiagnosisCodes = (object: unknown): Array<Diagnosis['code']> => {
  if (!object || typeof object !== 'object' || !('diagnosisCodes' in object)) {
    // we will just trust the data to be in correct form
    return [] as Array<Diagnosis['code']>;
  }

  return object.diagnosisCodes as Array<Diagnosis['code']>;
};

const parseDate = (date: unknown): string => {
  if (!isString(date) || !isDate(date)) {
    throw new Error('Incorrect date: ' + date);
  }
  return date;
};

const parseSpecialist = (specialist: unknown): string => {
  if (!isString(specialist))
    throw new Error('Incorrect specialist: ' + specialist);

  return specialist;
};

const parseDescription = (description: unknown): string => {
  if (!isString(description))
    throw new Error('Incorrect description: ' + description);

  return description;
};

const isDischarge = (discharge: unknown): discharge is Discharge => {
  return (
    isObject(discharge) &&
    'date' in discharge &&
    'criteria' in discharge &&
    isString(discharge.date) &&
    isDate(discharge.date) &&
    isString(discharge.criteria)
  );
};

const parseDischarge = (discharge: unknown): Discharge => {
  if (!isDischarge(discharge))
    throw new Error('Incorrect discharge: ' + discharge);

  return discharge;
};

const isHealthCheckRating = (param: number): param is HealthCheckRating => {
  return Object.values(HealthCheckRating)
    .map((v) => v)
    .includes(param);
};

const parseHealthCheckRating = (
  healthCheckRating: unknown
): HealthCheckRating => {
  if (!isNumber(healthCheckRating) || !isHealthCheckRating(healthCheckRating))
    throw new Error('Incorrect health check rating: ' + healthCheckRating);

  return healthCheckRating;
};

const parseEmployerName = (object: unknown): string => {
  if (!isString(object)) throw new Error('Incorrect employer name: ' + object);

  return object;
};

const isSickLeave = (sickLeave: unknown): sickLeave is SickLeave => {
  return (
    isObject(sickLeave) &&
    'startDate' in sickLeave &&
    'endDate' in sickLeave &&
    isString(sickLeave.startDate) &&
    isString(sickLeave.endDate) &&
    isDate(sickLeave.startDate) &&
    isDate(sickLeave.endDate)
  );
};

const parseSickLeave = (object: unknown): SickLeave => {
  if (!isSickLeave(object)) throw new Error('Incorrect sick leave: ' + object);

  return object;
};

const isEntryWithoutId = (param: unknown): param is EntryWithoutId => {
  if (!param || typeof param !== 'object') return false;
  if (
    !('type' in param) ||
    !('date' in param) ||
    !('specialist' in param) ||
    !('description' in param)
  )
    return false;
  return true;
};

const toNewEntry = (object: unknown): Entry => {
  if (!object || typeof object !== 'object' || !isEntryWithoutId(object)) {
    throw new Error('Incorrect or missing data');
  }

  const newEntry = {
    id: uuidv4(),
    date: parseDate(object.date),
    specialist: parseSpecialist(object.specialist),
    description: parseDescription(object.description),
    diagnosisCodes: parseDiagnosisCodes(object),
  };

  switch (object.type) {
    case 'Hospital':
      const hospitalEntry = {
        ...newEntry,
        discharge: parseDischarge(object.discharge),
        type: object.type,
      };
      return hospitalEntry;
    case 'HealthCheck':
      return {
        ...newEntry,
        healthCheckRating: parseHealthCheckRating(object.healthCheckRating),
        type: object.type,
      };
    case 'OccupationalHealthcare':
      return {
        ...newEntry,
        employerName: parseEmployerName(object.employerName),
        sickLeave: object.sickLeave
          ? parseSickLeave(object.sickLeave)
          : undefined,
        type: object.type,
      };
    default:
      return assertNever(object);
  }
};

const assertNever = (value: never): never => {
  throw new Error(
    `Unhandled discriminated union member: ${JSON.stringify(value)}`
  );
};

export { toNewPatient, toNewEntry };
