import {
  NewDiaryEntry,
  Weather,
  Visibility,
  NonSensitiveDiaryEntry,
  DiaryEntry,
} from './types';

const isString = (text: unknown): text is string => {
  return typeof text === 'string' || text instanceof String;
};

const isNumber = (number: unknown): number is number => {
  return typeof number === 'number' || number instanceof Number;
};

const parseComment = (comment: unknown): string => {
  if (!isString(comment)) {
    throw new Error('Incorrect or missing comment');
  }

  return comment;
};

const isDate = (date: string): boolean => {
  return Boolean(Date.parse(date));
};

const parseDate = (date: unknown): string => {
  if (!isString(date) || !isDate(date)) {
    throw new Error('Incorrect date: ' + date);
  }
  return date;
};

const isWeather = (param: string): param is Weather => {
  return Object.values(Weather)
    .map((v) => v.toString())
    .includes(param);
};

const parseWeather = (weather: unknown): Weather => {
  if (!isString(weather) || !isWeather(weather)) {
    throw new Error('Incorrect weather: ' + weather);
  }
  return weather;
};

const isVisibility = (param: string): param is Visibility => {
  return Object.values(Visibility)
    .map((v) => v.toString())
    .includes(param);
};

const parseVisibility = (visibility: unknown): Visibility => {
  if (!isString(visibility) || !isVisibility(visibility)) {
    throw new Error('Incorrect visibility: ' + visibility);
  }
  return visibility;
};

export const toNewDiaryEntry = (object: unknown): NewDiaryEntry => {
  if (!object || typeof object !== 'object') {
    throw new Error('Incorrect or missing data');
  }

  if (
    'comment' in object &&
    'date' in object &&
    'weather' in object &&
    'visibility' in object
  ) {
    const newEntry: NewDiaryEntry = {
      weather: parseWeather(object.weather),
      visibility: parseVisibility(object.visibility),
      date: parseDate(object.date),
      comment: parseComment(object.comment),
    };

    return newEntry;
  }

  throw new Error('Incorrect data: a field missing');
};

const parseId = (id: unknown): number => {
  if (!isNumber(id)) {
    throw new Error('Incorred id: ' + id);
  }
  return id;
};

export const toNonSensitiveDiaryEntry = (
  object: unknown
): NonSensitiveDiaryEntry => {
  if (!object || typeof object !== 'object') {
    throw new Error('Incorrect or missing data');
  }

  if (
    'id' in object &&
    'date' in object &&
    'weather' in object &&
    'visibility' in object
  ) {
    const newEntry: NonSensitiveDiaryEntry = {
      weather: parseWeather(object.weather),
      visibility: parseVisibility(object.visibility),
      date: parseDate(object.date),
      id: parseId(object.id),
    };

    return newEntry;
  }

  throw new Error('Incorrect data: a field missing');
};

const isObjectArray = (param: unknown): param is object[] => {
  if (!Array.isArray(param)) return false;
  if (param.some((v) => typeof v !== 'object')) return false;
  return true;
};

export const toNonSensitiveDiaryEntryArray = (
  object: unknown
): NonSensitiveDiaryEntry[] => {
  if (!object || !isObjectArray(object)) {
    throw new Error('Incorrect or missing data');
  }

  return object.map((entry: unknown) => toNonSensitiveDiaryEntry(entry));
};

export const addCommentsToNonSensitiveDiaryEntryArray = (
  array: NonSensitiveDiaryEntry[]
): DiaryEntry[] => {
  return array.map((entry) => ({ comment: '', ...entry }));
};
