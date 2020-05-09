const rabbit = require('../utils/rabbitUtils');
const mongoUtils = require('../utils/mongoUtils');

module.exports.createProcess = async (id, type, quantity, resolve, reject) => {
    try {
        //Busca en la base de datos si ya existe un proceso de ese tipo
        let procesosActivos = await mongoUtils.getActiveProcessesByType(type);

        // Revisa si ya existen procesos
        if (procesosActivos.length === 0) {
            //guarda en la base de datos el nuevo pedido
            mongoUtils.createProcess(id, type, quantity);

            // manda el proceso a rabbit
            rabbit.sendProcess(
                id,
                type,
                quantity,
                () => resolve('El proceso se creo correctamente'),
                (err) => {
                    reject({
                        type: 500,
                        msg: `Error en la comunicacion con el servidor de mensajería: ${err}`,
                    });
                }
            );
        } else {
            reject({
                type: 400,
                msg: 'Ya existe un proceso activo de ese tipo',
            });
        }
    } catch (err) {
        reject(err);
    }
};
