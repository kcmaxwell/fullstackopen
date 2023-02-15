import axios from 'axios';
import { NewDiaryEntry } from '../types';

const baseUrl = 'http://localhost:3001/api/diaries';

const addDiary = async (newDiary: NewDiaryEntry) => {
  const response = await axios.post(baseUrl, newDiary);
  return response.data;
};

const diaryService = {
  addDiary,
};

export default diaryService;
