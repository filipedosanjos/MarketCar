const db = require('../db');
const senhaHash = require('../senhaHash')

const usuarioModel = {
  inserirUsuario: async (loginCriar, senhaCriar, usuarioCriar) => {
    const login = loginCriar;
    const senha = await senhaHash.hashPassword(senhaCriar);
    const usuario = usuarioCriar;

    const values = [usuario, login, senha];
    // console.log(values);
    var stringSql = 'INSERT INTO usuarios (nome_usuario, login, senha) values (?, ?, ?)'
    db.query(stringSql, values, (err, result) => {
      if (err) {
        console.error('Erro ao inserir os dados:', err);
        return
      }
      console.log('Usuário inserido com sucesso');
      return true
    })
  },
  obterUsuario: async (loginInput, senhaInput) => {
    return new Promise((resolve, reject) => {
      var stringSql = 'SELECT * FROM usuarios WHERE login = ?'
      db.query(stringSql, [loginInput], (err, result) => {
        if (err) {
          console.error('Erro ao obter os dados:', err);
          return
        }
        if (result.length > 0) {
          const usuario = result[0];
          const senhaCorreta = senhaHash.comparePassword(senhaInput, usuario.senha)
          resolve(senhaCorreta)
        } else {
          resolve(null)
        }
      })
    })
  },
  iniciarSessao: async (req, res) => {
    const sql = 'SELECT * FROM usuarios WHERE login = ?';
    const corpo = req.body;
    // console.log('login é ', corpo.login)
    db.query(sql, [corpo.login], (err, result) => {
      if (err) {
        console.error('Erro ao obter os dados:', err);
        return false
      }
      if (result.length > 0) {
        const idUsuario = result[0].id_usuario
        const nomeUsuario = result[0].nome_usuario

        // console.log(result[0].id_usuario)
        res.status(200).json({ id: idUsuario, nome: nomeUsuario });
        return true
      }
    })
  },
  deletarUsuario: (id) => {
    return new Promise((resolve, reject) => {
      const stringSql = 'DELETE FROM anuncios WHERE id_usuario = ?'
      db.query(stringSql, [id], (err, result) => {
        if(err) {
          console.error('Erro ao excluir os dados:', err)
        }
        // console.log(result)
      })
      const sql = 'DELETE FROM usuarios WHERE id_usuario = ?'
      db.query(sql, [id], (err, result) => {
        if (err) {
          console.error('Erro ao excluir os dados:', err);
          resolve(false)
        }
        resolve(true)
      })
    })
  }
}

module.exports = usuarioModel;