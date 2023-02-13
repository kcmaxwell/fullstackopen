import express from 'express';
import patientService from '../services/patientService';

const router = express.Router();

router.get('/', (_req, res) => {
  res.send(patientService.getPatientsNoSSN());
});

router.post('/', (_req, res) => {
  res.send('Posting a patient');
});

export default router;
