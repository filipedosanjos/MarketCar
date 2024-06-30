const express = require('express');
const router = express.Router();
const homeController = require('../controllers/homeController');

router.get('/', homeController.obterTodosAnuncios);

router.get('/meus-anuncios', homeController.obterMeusAnuncios);

router.get('/excluir-anuncio', homeController.excluirAnuncio)

router.get('/filtrar', homeController.filtrarAnuncios)


module.exports = router;