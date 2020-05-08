const rabbit = require('../utils/rabbitUtils');

module.exports.createProcess = (id, type, quantity, resolve, reject) => {
    rabbit.sendProcess(
        id,
        type,
        quantity,
        () => resolve('El proceso se creo correctamente'),
        (err) => {
            reject(
                `Error en la comunicacion con el servidor de mensajería: ${err}`
            );
        }
    );
};
