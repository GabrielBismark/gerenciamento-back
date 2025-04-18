const mysql = require('mysql2');
require('dotenv').config();

const connection = mysql.createConnection({
    host: process.env.DB_HOST,
    user: process.env.DB_USER,
    password: process.env.DB_PASSWORD,
    database: process.env.DB_NAME,
    port: process.env.DB_PORT,
    multipleStatements: true,
    connectTimeout: 10000, // 10 segundos
    ssl: process.env.DB_SSL === 'true' ? { rejectUnauthorized: false } : undefined, // Ajuste condicional para SSL
});

// Testar a conexão
connection.connect((err) => {
    if (err) {
        console.error('Erro ao conectar ao banco de dados:', err);
        return;
    }
    console.log('Conectado ao banco de dados localmente!');
});

module.exports = connection;