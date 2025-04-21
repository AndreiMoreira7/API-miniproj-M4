import express from 'express';
import { getRandomDicaSustentavel } from '../data/dicasData.js';

const router = express.Router();

router.get('/sustentavel', (req, res) => {
  const dica = getRandomDicaSustentavel();
  res.json({ dica });
});

export default router;