const Dev = require("../modules/dev");
const stringToArray = require("../utils/stringToArray");

module.exports = {
    async index(req, res){
        const {longitude, latitude, technologies} = req.query;
        const techs = stringToArray(technologies);

        const devs = await Dev.find({
            technologies: {
                $in: techs
            },
            location:{
                $near: {
                    $geometry: {
                        type: 'Point',
                        coordinates: [longitude, latitude],
                    },
                    $maxDistance: 10000,
                },
            },
        });

        return res.json({devs})
    }
}