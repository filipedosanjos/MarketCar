const db = require('../db');

const homeModel = {
  obterTodosAnuncios: (id) => {
    return new Promise((resolve, reject) => {
      var stringSql = 'SELECT * FROM anuncios a LEFT JOIN usuarios u ON a.id_usuario = u.id_usuario WHERE a.id_usuario != ?'
      db.query(stringSql, id, (err, result) => {
        if (err) {
          console.error('Erro ao obter os dados:', err);
          return
        }
        resolve(result)
      })
    })
  },
  obterMeusAnuncios: (id) => {
    return new Promise((resolve, reject) => {
      var stringSql = 'SELECT * FROM anuncios a LEFT JOIN usuarios u ON a.id_usuario = u.id_usuario WHERE a.id_usuario = ?'
      db.query(stringSql, id, (err, result) => {
        if (err) {
          console.error('Erro ao obter os dados:', err);
          return
        }
        resolve(result)
      })
    })
  },
  deletarAnuncio: (id_anuncio) => {
    return new Promise((resolve, reject) => {
      var stringSql = 'DELETE FROM anuncios WHERE id_anuncio = ?'
      db.query(stringSql, [id_anuncio], (err, result) => {
        if (err) {
          console.error('Erro ao deletar os dados:', err);
          resolve(false)
        }
        resolve(true)
      })
    })
  },
  filtrarAnuncios: (corpo) => {
    return new Promise((resolve, reject) => {
      var stringSql = 'SELECT * FROM anuncios a LEFT JOIN usuarios u ON a.id_usuario = u.id_usuario WHERE a.id_usuario != ?'
      var parametros = [corpo.id];
      if (corpo.marca) {
        stringSql += ' AND a.marca_veiculo = ?';
        parametros.push(corpo.marca);
      }
      if (corpo.ano) {
        stringSql += ' AND a.ano_veiculo = ?';
        parametros.push(corpo.ano);
      }
      // console.log(corpo)
      db.query(stringSql, parametros, (err, result) => {
        if (err) {
          console.error('Erro ao deletar os dados:', err);
          resolve(false)
        }
        resolve(result)
      })
    })
  },

}

module.exports = homeModel;