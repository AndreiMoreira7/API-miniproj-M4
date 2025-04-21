import express from 'express';
import { getQualidadeAr } from '../data/arData.js';

const router = express.Router();

router.get('/qualidade', (req, res) => {
  const { lat, lon } = req.query;

  if (!lat || !lon) {
    return res.status(400).json({ erro: 'Parâmetros de latitude (lat) e longitude (lon) são obrigatórios.' });
  }

  const qualidadeAr = getQualidadeAr(parseFloat(lat), parseFloat(lon));

  if (qualidadeAr) {
    res.json(qualidadeAr);
  } else {
    res.status(404).json({ erro: 'Dados de qualidade do ar não encontrados para a localização fornecida.' });
  }
});

export default router;