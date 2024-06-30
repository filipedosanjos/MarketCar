const express = require('express');
const router = express.Router();
const anuncioController = require('../controllers/anuncioController');

const multer = require('multer');
const path = require('path');

const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, '../client/public/images')
  },
  filename: (req, file, cb) => {
    cb(null, Date.now() + path.extname(file.originalname))
  }
})

const upload = multer({storage: storage});


router.post('/novo-anuncio', anuncioController.criarAnuncio);
router.post('/', upload.single("imagem") ,anuncioController.salvarImagem)

module.exports = router;