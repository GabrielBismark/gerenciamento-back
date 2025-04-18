const connection = require('../config/database'); // Ajuste o caminho para a configuração do banco

// Função para criar as tabelas relacionadas a clientes
const criarTabelaParticipant = () => {
    const query = `
    CREATE TABLE IF NOT EXISTS participant (
        id INT AUTO_INCREMENT PRIMARY KEY,
        nome VARCHAR(100) NOT NULL,
        apelido VARCHAR(100),
        email VARCHAR(100) NOT NULL UNIQUE,
        celular VARCHAR(20) NOT NULL,
        sexo ENUM('masculino', 'feminino') NOT NULL,
        rg VARCHAR(20) UNIQUE,
        cpf VARCHAR(14) NOT NULL UNIQUE,
        data_nascimento DATE NOT NULL,
        cep VARCHAR(10),
        data_cadastro TIMESTAMP DEFAULT CURRENT_TIMESTAMP
    );
  `;

    connection.query(query, (err, results) => {
        if (err) {
            console.error('Erro ao criar tabelas de participant:', err);
            return;
        }
        console.log('Tabelas de participant criadas com sucesso!');
    });
};

// Exportar a conexão e a função de criação de tabelas
module.exports = {
    connection,
    criarTabelaParticipant,
};