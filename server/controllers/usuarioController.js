const usuarioModel = require('../models/usuarioModel');
// const User = require('../models/usuarioModel');


const UsuarioController = {
  criarUsuario: async (req, res) => {
    try {
      const { loginCriar, senhaCriar, usuarioCriar } = req.body;
      // console.log(loginCriar, senhaCriar, usuarioCriar)
      if (!(loginCriar === '') && !(senhaCriar === '') && !(usuarioCriar === '')) {
        await usuarioModel.inserirUsuario(loginCriar, senhaCriar, usuarioCriar);
        res.status(200).json({ mensagem: 'Cadastro realizado com sucesso.' })
      }
      else {
        let msg = 'Os seguintes campos devem ser preenchidos: ';
        if (loginCriar == '') { msg += '\nLogin ' }
        if (senhaCriar == '') { msg += '\nSenha ' }
        if (usuarioCriar == '') { msg += '\nNome do usuário ' }
        res.status(400).json({ mensagem: msg });

      }
    } catch (error) {
      console.error('Erro ao criar usuário:', error);
      res.status(500).json({ error: 'Erro interno do servidor' });
    }
  },

  verificarUsuario: async (req, res) => {
    try {
      const { login, senha } = req.body;
      if (!(login === '') && !(senha === '')) {
        const verificacao = await usuarioModel.obterUsuario(login, senha);
        if (verificacao === true) {
          usuarioModel.iniciarSessao(req, res);
        } else if (verificacao === false) {
          res.status(400).json({ mensagem: 'Login ou senha incorretos.' })
        } else {
          res.status(400).json({ mensagem: 'Usuário não existe' })
        }
      }
      else {
        let msg = 'Os seguintes campos devem ser preenchidos: ';
        if (login == '') { msg += '\nLogin ' }
        if (senha == '') { msg += '\nSenha ' }
        res.status(400).json({ mensagem: msg })
      }

    } catch (error) {
      console.error('Erro ao efetuar login:', error);
      res.status(500).json({ error: 'Erro interno do servidor' });
    }
  },
  excluirUsuario: async (req, res) => {
    const corpo = req.query
    const id = corpo.id;
    // console.log(id)
    const resposta =  await usuarioModel.deletarUsuario(id);
    if (resposta === true) {
      res.status(200).json({mensagem: 'Usuario excluído do sistema.'})
    } else {
      res.status(400).json({mensagem: 'Houve um erro ao excluír o usuário.'})
    }
  }
};

module.exports = UsuarioController;