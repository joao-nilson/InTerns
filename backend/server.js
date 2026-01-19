const express = require('express');
const cors = require('cors');
require('dotenv').config();

// Ativa a conexão Singleton com o MongoDB
// O require já executa o construtor que inicia a conexão
const dbManager = require('./database/db');

const app = express();
const PORT = process.env.PORT || 5000;

// Middlewares Globais
app.use(cors()); 
app.use(express.json());

// Definição das Rotas (Atendem RF01, RF03, RF04 e RF07)
const authRoutes = require('./routes/auth');
const jobRoutes = require('./routes/jobs');

app.use('/api/auth', authRoutes);
app.use('/api/jobs', jobRoutes);

// Health Check Endpoint
app.get('/', (req, res) => {
  res.json({
    message: 'InTerns API is running...',
    database: 'MongoDB Singleton Instance',
    status: 'connected'
  });
});

// Encerramento seguro (Graceful Shutdown) - RNF06
process.on('SIGINT', async () => {
  console.log('\nFinalizando servidor...');
  await dbManager.disconnect();
  process.exit(0);
});

app.listen(PORT, () => {
  console.log(`🚀 InTerns: Servidor rodando em http://localhost:${PORT}`);
  // Log de segurança para verificar se o .env foi carregado
  if (!process.env.MONGODB_URI) {
    console.error('⚠️ ALERTA: MONGODB_URI não encontrada no arquivo .env');
  }
});