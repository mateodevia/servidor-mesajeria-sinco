const rabbit = require('../utils/rabbitUtils');

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

module.exports.handleSubProcessCompletion = async (
    clientId,
    type,
    result,
    resolve,
    reject
) => {
    try {
        // Consulta el proceso en la base de datos
        let proceso = (await mongoUtils.getActiveProcessesByType(type))[0];

        if (proceso) {
            if (result === 'Exito') {
                proceso.exitosos += 1;
            } else {
                proceso.fallidos += 1;
            }
            if (proceso.exitosos + proceso.fallidos === proceso.cantidad) {
                proceso.activo = false;
            }

            //notifica al cliente si esta conectado
            socketIoUtils.sendUpdateToClient(clientId, proceso);
            //Persiste la información en la base de datos
            mongoUtils.updateProcess(proceso);
            resolve('OK');
        } else {
            reject({
                type: 400,
                msg: 'No exiten procesos activos de ese tipo',
            });
        }
    } catch (err) {
        reject(err);
    }
};

module.exports.getActiveProcesses = async (clientId, resolve, reject) => {
    try {
        //Busca en la base de datos si ya existe un proceso de ese tipo
        let procesosActivos = await mongoUtils.getActiveProcessesByClient(
            clientId
        );
        resolve(procesosActivos);
    } catch (err) {
        reject(err);
    }
};
