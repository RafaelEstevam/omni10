const axios = require("axios");
const Dev = require("../modules/dev");
const stringToArray = require("../utils/stringToArray");
const { findConnections, sendMessage } = require("../websocket");

module.exports = {

    //INDEX SHOW STORE UPDATE DESTROY

    async store (req, res){ //async = função que pode demorar a responder

        const {github_user, technologies, latitude, longitude} = req.body;

        let dev = await Dev.findOne({github_user});

        if(!dev){
            const response = await axios.get(`https://api.github.com/users/${github_user}`); // await = não continua enquanto não receber retorno
            const {name = login, avatar_url, bio} = response.data;

            const techs = stringToArray(technologies);

            const location = {
                type: 'Point',
                coordinates: [longitude, latitude]
            }
        
            dev = await Dev.create({
                github_user,
                name,
                avatar_url,
                bio,
                technologies: techs,
                location
            })

            const sendSocketMessageTo = findConnections(
                {latitude, longitude},
                techs
            )

            sendMessage(sendSocketMessageTo, 'new-dev', dev);
        
            return res.json(dev);
        }else{
            return res.send("Usuário já cadastrado");
        }
    },

    async index (req, res){
        const allDevs = await Dev.find();
        if(allDevs){
            return res.json(allDevs);
        }
    },

    async show (req, res){
        const {github_user} = req.params;
        let oneDev = await Dev.findOne({github_user});
        if(oneDev){
            return res.json(oneDev);
        }
    }
}