import express from 'express';
import diagnosesRouter from './routes/diagnoses';
import patientRouter from './routes/patients';

const app = express();
const cors = require('cors'); // eslint-disable-line @typescript-eslint/no-unsafe-assignment, @typescript-eslint/no-var-requires

app.use(cors()); // eslint-disable-line @typescript-eslint/no-unsafe-call
app.use(express.json());

const PORT = 3001;

app.get('/api/ping', (_req, res) => {
  console.log('someone pinged here');
  res.send('pong');
});

app.use('/api/diagnoses', diagnosesRouter);
app.use('/api/patients', patientRouter);

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
