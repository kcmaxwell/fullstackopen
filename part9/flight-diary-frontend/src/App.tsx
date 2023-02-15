import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { DiaryEntry } from './types';
import {
  toNonSensitiveDiaryEntryArray,
  addCommentsToNonSensitiveDiaryEntryArray,
} from './utils';
import DiaryForm from './components/DiaryForm';
import diaryService from './services/diaries';

function App() {
  const [diaries, setDiaries] = useState<DiaryEntry[]>([]);

  useEffect(() => {
    axios.get(`http://localhost:3001/api/diaries`).then((response) => {
      setDiaries(
        addCommentsToNonSensitiveDiaryEntryArray(
          toNonSensitiveDiaryEntryArray(response.data)
        )
      );
    });
  }, []);

  const addDiary = async (newDiary: DiaryEntry) => {
    const response = await diaryService.addDiary(newDiary);
    setDiaries(diaries.concat(response));
  };

  return (
    <div>
      <h1>Diary</h1>
      <DiaryForm addDiary={addDiary} />
      {diaries &&
        diaries.map((entry) => (
          <div key={entry.id}>
            <div>
              <p>
                <b>{entry.date}</b>
              </p>
            </div>
            <div>Visibility: {entry.visibility}</div>
            <div>Weather: {entry.weather}</div>
            {entry.comment !== '' ? <div>{entry.comment}</div> : <></>}
          </div>
        ))}
    </div>
  );
}

export default App;
