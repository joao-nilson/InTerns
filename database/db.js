const mongoose = require('mongoose');
require('dotenv').config();

class DataBaseManager {
  constructor() {
    // Verifica se já existe uma instância criada
    if (!DataBaseManager.instance) {
      this.uri = process.env.MONGODB_URI || 'mongodb://127.0.0.1:27017/jobboard';
      this._connect();
      DataBaseManager.instance = this; // Salva a instância
    }
    return DataBaseManager.instance;
  }

  async _connect() {
    try {
      const conn = await mongoose.connect(this.uri);
      console.log(`✅ InTerns: Singleton MongoDB Conectado: ${conn.connection.host}`);
      
      // Handlers de evento para manter a integridade da conexão
      mongoose.connection.on('error', (err) => {
        console.error('❌ Erro na conexão do MongoDB:', err);
      });

      mongoose.connection.on('disconnected', () => {
        console.log('⚠️ MongoDB desconectado');
      });

    } catch (error) {
      console.error('❌ Erro ao conectar ao MongoDB:', error.message);
      process.exit(1);
    }
  }

  // Método para encerrar a conexão de forma segura
  async disconnect() {
    await mongoose.connection.close();
    console.log('🔌 Conexão Singleton encerrada pelo app.');
  }
}

// Exporta uma única instância da classe (O coração do padrão Singleton no Node.js)
const instance = new DataBaseManager();
Object.freeze(instance); // Garante que a instância não seja modificada

module.exports = instance;