const express = require('express');
const userRoutes = require('./routes/userRoutes'); // Ajuste o caminho conforme necessário

const { criarTabelaUser } = require('./models/user'); // Importar a função de criação de tabelas

// Criar tabelas de veículos e locações

const cors = require("cors");

// Criar tabelas relacionadas a clientes
criarTabelaUser();


const app = express();
app.use(express.json()); // Para processar JSON no corpo da requisição
app.use(cors());

// Usar as rotas definidas em routes
app.use(userRoutes); // Prefixo para as rotas da API

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Servidor rodando na porta ${PORT}`);
});