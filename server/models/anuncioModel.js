const db = require('../db');

const anuncioModel = {
  inserirAnuncio: async (caminhoImagem, corpo, req) => {
    // console.log(caminhoImagem)
    // console.log(req.session)

    const values = [corpo.idUsuario, corpo.nome, corpo.descricao, corpo.valor, corpo.marca, corpo.telefone, corpo.cor, caminhoImagem, corpo.ano, 0, 0];

    const stringSql = 'INSERT INTO anuncios (id_usuario, nome_veiculo, descricao_veiculo, valor_veiculo, marca_veiculo, telefone, cor_veiculo, imagem_veiculo, ano_veiculo, quantidade_acessos, quantidade_likes) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)'
    db.query(stringSql, values, (err, result) => {
      if (err) {
        console.error('Erro ao inserir os dados:', err);
        return false
      }
      console.log('anúncio inserido com sucesso');
      return true
    })
  },

}


module.exports = anuncioModel