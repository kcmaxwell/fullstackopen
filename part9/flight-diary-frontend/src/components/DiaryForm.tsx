import React, { useState } from 'react';
import Notification from './Notification';
import { NewDiaryEntry, Visibility, Weather } from '../types';

interface DiaryFormProps {
  addDiary(newDiary: NewDiaryEntry): void;
}

const DiaryForm = ({ addDiary }: DiaryFormProps) => {
  const [date, setDate] = useState('');
  const [visibility, setVisibility] = useState<Visibility>(Visibility.Great);
  const [weather, setWeather] = useState<Weather>(Weather.Sunny);
  const [comment, setComment] = useState('');

  const submit = (event: React.SyntheticEvent) => {
    event.preventDefault();

    addDiary({ date, visibility, weather, comment });

    setDate('');
    setVisibility(Visibility.Great);
    setWeather(Weather.Sunny);
    setComment('');
  };

  return (
    <div>
      <h2>Add new entry</h2>
      <Notification />

      <form onSubmit={submit}>
        <div>
          Date:{' '}
          <input
            type='text'
            value={date}
            onChange={({ target }) => setDate(target.value)}
          />
        </div>
        <div>
          Visibility: Great
          <input
            type='radio'
            name='visibility'
            onChange={() => setVisibility(Visibility.Great)}
          />
          Good
          <input
            type='radio'
            name='visibility'
            onChange={() => setVisibility(Visibility.Good)}
          />
          Ok
          <input
            type='radio'
            name='visibility'
            onChange={() => setVisibility(Visibility.Ok)}
          />
          Poor
          <input
            type='radio'
            name='visibility'
            onChange={() => setVisibility(Visibility.Poor)}
          />
        </div>
        <div>
          Weather: Sunny
          <input
            type='radio'
            name='weather'
            onChange={() => setWeather(Weather.Sunny)}
          />
          Cloudy
          <input
            type='radio'
            name='weather'
            onChange={() => setWeather(Weather.Cloudy)}
          />
          Windy
          <input
            type='radio'
            name='weather'
            onChange={() => setWeather(Weather.Windy)}
          />
          Rainy
          <input
            type='radio'
            name='weather'
            onChange={() => setWeather(Weather.Rainy)}
          />
          Stormy
          <input
            type='radio'
            name='weather'
            onChange={() => setWeather(Weather.Stormy)}
          />
        </div>
        <div>
          Comment:{' '}
          <input
            type='text'
            value={comment}
            onChange={({ target }) => setComment(target.value)}
          />
        </div>
        <button type='submit'>Add</button>
      </form>
    </div>
  );
};

export default DiaryForm;
