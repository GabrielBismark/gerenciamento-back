const { connection } = require('../models/user.js');
const bcrypt = require('bcrypt'); // Certifique-se de instalar o bcrypt com `npm install bcrypt`
const jwt = require('jsonwebtoken'); // Importar o jsonwebtoken]

const SECRET_KEY = process.env.SECRET_KEY // Use uma chave secreta segura

// Função para cadastrar um novo user
const cadastrarUser = async (nome, email, senha, cargo, setor) => {
  return new Promise(async (resolve, reject) => {
    try {
      // Validações
      if (!nome || !email || !senha || !cargo || !setor) {
        throw new Error("Preencha todos os campos!");
      }

      // Verificar se o email já existe no banco
      const queryEmailExist = 'SELECT * FROM user WHERE email = ?';
      connection.query(queryEmailExist, [email], async (err, results) => {
        if (err) {
          reject(err);
          return;
        }

        if (results.length > 0) {
          reject(new Error("Um usuário já foi cadastrado com esse email."));
          return;
        }

        // Gerar hash da senha
        const salt = await bcrypt.genSalt(12);
        const passwordHash = await bcrypt.hash(senha, salt);

        // Inserir o usuário no banco
        const query = `
          INSERT INTO user (nome, email, senha, cargo, setor)
          VALUES (?, ?, ?, ?, ?)
        `;
        connection.query(query, [nome, email, passwordHash, cargo, setor], (err, results) => {
          if (err) {
            reject(err);
          } else {
            resolve({ id: results.insertId, nome, email, cargo, setor });
          }
        });
      });
    } catch (error) {
      reject(error);
    }
  });
};

const loginUser = async (email, senha) => {
  return new Promise((resolve, reject) => {
    const query = 'SELECT * FROM user WHERE email = ?';
    connection.query(query, [email], async (err, results) => {
      if (err) {
        reject(err);
        return;
      }

      if (results.length === 0) {
        reject(new Error("Usuário não encontrado."));
        return;
      }

      const user = results[0];
      const isMatch = await bcrypt.compare(senha, user.senha);

      if (!isMatch) {
        reject(new Error("Senha incorreta."));
        return;
      }

      // Gerar o token JWT
      const token = jwt.sign(
        { id: user.id, email: user.email, cargo: user.cargo, setor: user.setor },
        SECRET_KEY,
        { expiresIn: '1h' } // Token válido por 1 hora
      );

      resolve({ user: { id: user.id, nome: user.nome, email: user.email, cargo: user.cargo, setor: user.setor }, token });
    });
  });
}

const buscarUsers = (nome) => {
  return new Promise((resolve, reject) => {
    let query = 'SELECT * FROM user WHERE 1=1';
    const params = [];

    if (nome) {
      query += ' AND nome LIKE ?';
      params.push(`%${nome}%`);
    }

    console.log('Query executada:', query); // Log da query
    console.log('Parâmetros:', params); // Log dos parâmetros

    connection.query(query, params, (err, results) => {
      if (err) {
        console.error('Erro ao executar a query:', err); // Log do erro
        reject(err);
        return;
      }

      resolve(results);
    });
  });
};

// Função para editar um user
const editarUser = (id, nome, email, senha, cargo, setor) => {
  return new Promise((resolve, reject) => {
    const query = `
      UPDATE user SET nome = ?, email = ?, senha = ?, cargo = ?, setor = ?
      WHERE id = ?
    `;
    connection.query(query, [nome, email, senha, cargo, setor, id], (err, results) => {
      if (err) {
        reject(err);
      } else {
        resolve({ id, nome, email, senha, cargo, setor });
      }
    });
  });
};

// Função para excluir um user
const excluirUser = (id) => {
  return new Promise((resolve, reject) => {
    const query = 'DELETE FROM user WHERE id = ?';
    connection.query(query, [id], (err, results) => {
      if (err) {
        reject(err);
      } else {
        resolve(results);
      }
    });
  });
};



module.exports = {
  cadastrarUser,
  loginUser,
  buscarUsers,
  editarUser,
  excluirUser,
};
