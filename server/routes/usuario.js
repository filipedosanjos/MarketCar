const express = require('express');
const router = express.Router();
const usuarioController = require('../controllers/usuarioController');

router.post('/criar', usuarioController.criarUsuario);

router.post('/', usuarioController.verificarUsuario);

router.get('/excluir_usuario', usuarioController.excluirUsuario);

module.exports = router;