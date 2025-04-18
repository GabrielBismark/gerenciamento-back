const UserService = require('../services/userService.js');

// Função para cadastrar um user
const cadastrarUser = async (req, res) => {
    try {
        const { nome, email, senha, cargo, setor } = req.body;
        const user = await UserService.cadastrarUser(nome, email, senha, cargo, setor);
        res.status(201).json(user);
    } catch (err) {
        res.status(500).json({ message: 'Erro ao cadastrar user', error: err.message });
    }

    
};

const loginUser = async (req, res) => {
    try {
        const { email, senha } = req.body;
        const user = await UserService.loginUser(email, senha);
        res.status(200).json(user);
    } catch (err) {
        res.status(401).json({ message: 'Erro ao fazer login', error: err.message });
    }
}

const buscarUsers = async (req, res) => {
    try {
        const { nome } = req.query;
        console.log('Nome recebido na query:', nome); 

        const users = await UserService.buscarUsers(nome);
        if (users.length === 0) {
            return res.status(404).json({ message: 'Nenhum user encontrado' });
        }
        res.status(200).json(users);
    } catch (err) {
        console.error('Erro ao buscar users:', err); // Log do erro
        res.status(500).json({ message: 'Erro ao buscar users', error: err.message });
    }
};

// Função para editar um user
const editarUser = async (req, res) => {
    try {
        const id = req.params.id;
        const {nome, email, senha, cargo, setor } = req.body;
        const user = await UserService.editarUser(id, nome, email, senha, cargo, setor);
        res.status(200).json(user);
    } catch (err) {
        res.status(500).json({ message: 'Erro ao editar user', error: err.message });
    }
};

// Função para excluir um user
const excluirUser = async (req, res) => {
    try {
        const id = req.params.id;
        await UserService.excluirUser(id);
        res.status(200).json({ message: 'User excluído com sucesso' });
    } catch (err) {
        res.status(500).json({ message: 'Erro ao excluir user', error: err.message });
    }
};

module.exports = {
    cadastrarUser,
    loginUser,
    buscarUsers,
    editarUser,
    excluirUser,
};
