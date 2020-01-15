const express = require('express');
const mongoose = require('mongoose');
const routes = require('./routes/routes');

const app = express();

mongoose.connect('mongodb+srv://omni10:omni10@cluster0-9vg2e.mongodb.net/omni10?retryWrites=true&w=majority', {
    useNewUrlParser: true,
    useUnifiedTopology: true
});

app.use(express.json()); //Entender requisições JSON;
app.use(routes); //Importar rotas

app.listen(3030);