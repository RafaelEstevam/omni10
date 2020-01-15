const mongoose = require('mongoose');
const PointSchema = require('./utils/PointSchema');

const DevSchema = new mongoose.Schema({
    name: String,
    github_user: String,
    technologies: [String], //Armazena várias string
    bio: String,
    avatar_url: String,
    email: String,
    password: String,
    location: {
        type: PointSchema,
        index: '2dsphere'
    }
});
                                //nome da tabela
module.exports = mongoose.model('Dev', DevSchema);
                                       //estrutura da tabela