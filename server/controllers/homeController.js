const homeModel = require('../models/homeModel');

const HomeController = {
  obterTodosAnuncios: async (req, res) => {
    const dados = req.query;
    const resposta = await homeModel.obterTodosAnuncios(dados.id);
    res.json({resposta})
  },
  obterMeusAnuncios: async (req, res) => {
    const dados = req.query;
    const resposta = await homeModel.obterMeusAnuncios(dados.id);
    res.json({resposta})
  },
  excluirAnuncio: async (req, res) => {
    const dados = req.query;
    const resposta = await homeModel.deletarAnuncio(dados.id_anuncio);
    if(resposta === true) {
      res.status(200).json({mensagem: 'Anuncio excluído do sistema.'})
    } else {
      req.status(400).json({mensagem: 'Houve um erro ao excluír o registro.'})
    }
  },
  filtrarAnuncios: async (req, res) => {
    const dados = req.query;
    const resposta = await homeModel.filtrarAnuncios(dados)
    // console.log(resposta)
    res.json({resposta})
  }
}

module.exports = HomeController;