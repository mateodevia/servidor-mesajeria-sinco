const socketio = require('socket.io');

const SocketIoUtils = (server) => {
    // Inicializa el servidor de sockets
    io = socketio.listen(server);

    //cuando un agente se conecta crea un socket con el servidor
    io.sockets.on('connection', (socket) => {
        socket.on('suscribeTo', (clientId) => {
            //se crea una room para ese cliente y se suscribe el socket del agente a ese room
            socket.join(clientId);
        });

        socket.on('unsuscribeFrom', (clientId) => {
            //se desuscribe el cliente
            socket.leave(clientId);
        });
    });

    exports = {};

    exports.sendUpdateToClient = (clientId, update) => {
        io.sockets.in(clientId).emit('update', update);
    };

    return exports;
};

module.exports = SocketIoUtils;
