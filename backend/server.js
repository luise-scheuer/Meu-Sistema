require('dotenv').config();
const express = require('express');
const mongoose = require('mongoose');
//const path = require('path');
const routes = require('./src/routes'); // IMPORTANTO O ARQUIVO DE ROTAS

const app = express();
app.use(express.json());
//app.use(express.static(path.join(__dirname, 'public')));
app.use(routes);

const MONGO_URI = process.env.MONGODB_URI;
const PORT = process.env.PORT || 8080;

// Conexão com MongoDB
mongoose.connect(MONGO_URI)
.then(() => console.log('MongoDB conectado!'))
.catch(err => console.error('Erro ao conectar:', err));

// Inicializa o servidor
app.listen(PORT, () => {
  console.log(`Servidor rodando em http://localhost:${PORT}`);
});