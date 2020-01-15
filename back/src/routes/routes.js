const {Router} = require("express");
const devController = require("../controllers/DevController");
const searchController = require("../controllers/SearchController");

const routes = Router();

routes.get('/', (req, res) =>{
    return res.json({message: 'Hello World'});
});

routes.post('/devs', devController.store);
routes.get('/devs', devController.index);
routes.get('/devs/:github_user', devController.show);
// routes.put('/devs/:user_name', devController.update);
// routes.delete('/devs/:user_name', devController.destroy);

routes.get('/search', searchController.index);

module.exports = routes;