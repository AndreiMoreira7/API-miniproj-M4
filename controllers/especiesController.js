import express from 'express';
import { getEspeciesAmeacadas } from '../data/especiesData.js';

const router = express.Router();

router.get('/ameacadas', (req, res) => {
  const { pais } = req.query;

  if (!pais) {
    return res.status(400).json({ erro: 'O parâmetro de país (pais) é obrigatório.' });
  }

  const especies = getEspeciesAmeacadas(pais.toUpperCase()); // Assumindo que o código do país é ISO 3166-1 alpha-2 em maiúsculas

  if (especies) {
    res.json(especies);
  } else {
    res.status(404).json({ erro: `Espécies ameaçadas não encontradas para o país: ${pais}` });
  }
});

export default router;