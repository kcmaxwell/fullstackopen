import express from 'express';
import { calculateBmi } from './bmiCalculator';
import { calculateExercises } from './exerciseCalculator';
import { isPositiveNumber } from './utils';

const app = express();
app.use(express.json());

app.get('/hello', (_req, res) => {
  res.send('Hello Full Stack!');
});

app.get('/bmi', (req, res) => {
  const weight = Number(req.query.weight);
  const height = Number(req.query.height);

  if (
    !weight ||
    !height ||
    !isPositiveNumber(weight) ||
    !isPositiveNumber(height)
  )
    res.json({ error: 'Malformatted parameters' }).status(400);
  else {
    const bmi = calculateBmi(height, weight);
    res.json({ weight, height, bmi });
  }
});

app.post('/exercises', (req, res) => {
  // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment
  const { daily_exercises: exerciseHours, target } = req.body;

  if (!exerciseHours || !target) res.json({ error: 'parameters missing' });
  else if (
    !isPositiveNumber(target as number) ||
    // eslint-disable-next-line @typescript-eslint/no-unsafe-member-access, @typescript-eslint/no-unsafe-call
    !exerciseHours.every((element: number) => element >= 0)
  )
    res.json({ error: 'malformatted parameters' });
  else {
    const exerciseInfo = calculateExercises(
      exerciseHours as number[],
      target as number
    );
    res.json(exerciseInfo);
  }
});

const PORT = 3002;

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
