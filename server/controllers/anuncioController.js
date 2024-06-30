const anuncioModel = require('../models/anuncioModel');

let corpo;
const anuncioController = {
  criarAnuncio: (req, res) => {
    try {
      corpo = req.body;
      const {nome, descricao, valor, marca, ano} = req.body;
      
      res.json({mensagem: 'OK'})

    } catch (error) {
        res.status(500).json({ error: 'Erro interno do servidor' });
    }
  },
  salvarImagem: async (req, res) => {
    try{
    // console.log('nome arquivo', req.file.filename)
    const caminhoImagem = `/images/${req.file.filename}`;
    const retorno = await anuncioModel.inserirAnuncio(caminhoImagem, corpo, req)

    if(retorno === true) {
      res.status(200).json({mensagem: 'Anúncio criado com sucesso.'})
    }
  } catch (error) {
    res.status(500).json({ error: 'Erro interno do servidor' });
  }
  }
}

module.exports = anuncioController