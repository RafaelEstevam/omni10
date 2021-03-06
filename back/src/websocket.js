const stringToArray = require('./utils/stringToArray');
const calculateDistance = require('./utils/calculateDistance');

const socketio = require('socket.io');
let io;
const connections = [];

exports.setupWebsocket = (server) =>{
    io = socketio(server);
    io.on('connection', socket => {
        const {latitude, longitude, technologies} = socket.handshake.query;

        connections.push({
            id: socket.id,
            coordinates: {
                latitude: Number(latitude),
                longitude: Number(longitude),
            },
            technologies: stringToArray(technologies)
        })
    })
};

exports.findConnections = (coordinates, technologies) =>{
    return connections.filter(connection => {
        return calculateDistance(coordinates, connection.coordinates) < 10
            && connection.technologies.some(item => technologies.includes(item))
    })
}

exports.sendMessage = (to, message, data) =>{
    to.forEach(connection=>{
        io.to(connection.id).emit(message, data);
    })
}