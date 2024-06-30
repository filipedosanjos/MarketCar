const express = require ('express');
// const bodyParser = require('body-parser');
const app = express();
const port = 5000;
app.use(express.json());

const cors = require('cors');
const db = require('./db');

const usuario = require('./routes/usuario');
const anuncio = require('./routes/anuncio');
const home = require('./routes/home')

app.use(cors());
const path = require('path')
app.use(express.static(path.join(__dirname, 'public')));
// app.use(bodyParser.json());
// app.use(express.urlencoded({ extended: true }));

app.use('/login', usuario);
app.use('/anunciar', anuncio)
app.use('/home', home)


app.listen(port, () => {
  console.log("Servidor iniciado");
})

module.exports = app
