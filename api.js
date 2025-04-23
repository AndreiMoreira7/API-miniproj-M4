import cors from 'cors';
import express from 'express';
import arRoutes from './controllers/arController.js';
import especiesRoutes from './controllers/especiesController.js';
import dicasRoutes from './controllers/dicasController.js';

const app = express();
const PORT = 3000;

app.use(cors()); // Permite requisições de qualquer origem
app.use(express.json()); // Middleware para lidar com JSON no corpo das requisições (se necessário no futuro)

app.use('/api/ar', arRoutes);
app.use('/api/especies', especiesRoutes);
app.use('/api/dica', dicasRoutes);

app.listen(PORT, () => {
  console.log(`Servidor rodando na porta http://localhost:${PORT}`);
});