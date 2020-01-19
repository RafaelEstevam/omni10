import socketio from 'socket.io-client';

const socket = socketio('http://192.168.15.10:3030', {
    autoConnect: false
}); //conexão websocket com o backend

function subscribeToNewDevs(subscribeFunction){
    socket.on('new-dev', subscribeFunction);
}

function connect(latitude, longitude, technologies){
    socket.io.opts.query = {latitude, longitude, technologies}
    socket.connect();
}

function disconnect(){
    if(socket.connected){
        socket.disconnect();
    }
}

export {connect, disconnect, subscribeToNewDevs};