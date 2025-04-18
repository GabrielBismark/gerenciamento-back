const express = require('express');
const userController = require('../controllers/userController');

const router = express.Router();

// Rota para cadastrar um usuario
router.post('/auth/register', userController.cadastrarUser);

// Rota para fazer login
router.post('/auth/login', userController.loginUser);

// Rota para buscar todos os usuarios
router.get('/user', userController.buscarUsers);

// Rota para editar um usuario
router.put('/user/:id', userController.editarUser);

// Rota para excluir um usuarios
router.delete('/user/:id', userController.excluirUser);


module.exports = router;
