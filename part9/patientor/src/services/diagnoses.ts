import axios from 'axios';

import { apiBaseUrl } from '../constants';
import { Diagnosis } from '../types';

const getAll = async () => {
  const { data } = await axios.get<Diagnosis[]>(`${apiBaseUrl}/diagnoses`);

  return data;
};

const getOne = async (code: string) => {
  const { data } = await axios.get<Diagnosis>(
    `${apiBaseUrl}/diagnoses/${code}`
  );

  return data;
};

// const create = async (object) => {
//   const { data } = await axios.post<Diagnosis>(
//     `${apiBaseUrl}/diagnoses`,
//     object
//   );

//   return data;
// };

export default {
  getAll,
  getOne,
};
