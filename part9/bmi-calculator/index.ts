import express from 'express';
import { calculateBmi } from './bmiCalculator';
import { isPositiveNumber } from './utils';

const app = express();

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

const PORT = 3003;

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
