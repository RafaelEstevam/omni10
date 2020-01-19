const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const http = require('http');
const routes = require('./routes/routes');
const {setupWebsocket} = require('./websocket');

const app = express();
const server = http.Server(app);

setupWebsocket(server); //dispara função assim que o back carrega

mongoose.connect('mongodb+srv://omni10:omni10@cluster0-9vg2e.mongodb.net/omni10?retryWrites=true&w=majority', {
    useNewUrlParser: true,
    useUnifiedTopology: true
});//conexão com banco de dados

app.use(cors());
app.use(express.json()); //Entender requisições JSON;
app.use(routes); //Importar rotas

server.listen(3030);