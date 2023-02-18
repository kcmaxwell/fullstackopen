import express from 'express';
import diagnosesService from '../services/diagnosesService';

const router = express.Router();

router.get('/', (_req, res) => {
  res.send(diagnosesService.getDiagnoses());
});

router.get('/:code', (req, res) => {
  res.send(diagnosesService.getDiagnosis(req.params.code));
});

router.post('/', (_req, res) => {
  res.send('Posting a diagnosis');
});

export default router;
