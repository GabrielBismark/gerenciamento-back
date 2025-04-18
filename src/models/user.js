const connection = require('../config/database'); // Ajuste o caminho para a configuração do banco

// Função para criar as tabelas relacionadas a clientes
const criarTabelaUser = () => {
  const query = `
    CREATE TABLE IF NOT EXISTS user (
      id INT AUTO_INCREMENT PRIMARY KEY,
      nome VARCHAR(100) NOT NULL,
      email VARCHAR(100) NOT NULL UNIQUE,
      senha VARCHAR(255) NOT NULL,
      cargo VARCHAR(50) NOT NULL,
      setor VARCHAR(50) NOT NULL,
      data_cadastro TIMESTAMP DEFAULT CURRENT_TIMESTAMP
    );
  `;

  connection.query(query, (err, results) => {
    if (err) {
      console.error('Erro ao criar tabelas de clientes:', err);
      return;
    }
    console.log('Tabelas de clientes criadas com sucesso!');
  });
};

// Exportar a conexão e a função de criação de tabelas
module.exports = {
  connection,
  criarTabelaUser,
};