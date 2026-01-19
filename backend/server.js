require('dotenv').config();
const dbManager = require('./database/db'); // Conexao com Banco Real via Singleton
const app = require('./app');

const PORT = process.env.PORT || 5000;

process.on('SIGINT', async () => {
  console.log('\nFinalizando servidor...');
  await dbManager.disconnect();
  process.exit(0);
});

app.listen(PORT, () => {
  console.log(`InTerns: Servidor rodando em http://localhost:${PORT}`);
  
  if (!process.env.MONGODB_URI) {
    console.error('ALERTA: MONGODB_URI não encontrada no arquivo .env');
  }
});