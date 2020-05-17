const rabbit = require('../utils/rabbitUtils');

let cachedProcesses = {};

module.exports.createProcess = async (
    id,
    type,
    quantity,
    resolve,
    reject,
    mongoInjection
) => {
    try {
        //Busca en la base de datos si ya existe un proceso de ese tipo
        let procesosActivos = await (
            mongoInjection || mongoUtils
        ).getActiveProcessesByType(type);

        // Revisa si ya existen procesos
        if (procesosActivos.length === 0) {
            //guarda en la base de datos el nuevo pedido
            (mongoInjection || mongoUtils).createProcess(id, type, quantity);

            // manda el proceso a rabbit
            // El if es para que los tests no llenen el servidor de mensajeria
            if (!mongoInjection) {
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
                resolve('El proceso se creo correctamente');
            }
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
    subProcess,
    description,
    resolve,
    reject
) => {
    try {
        // Consulta el proceso en la base de datos
        let proceso = (await mongoUtils.getActiveProcessesByType(type))[0];
        //Guarda las cosas en el cache
        cachedProcesses[type] = proceso;
        cachedProcesses[type][subProcess] = result;
        if (proceso) {
            //notifica al cliente si esta conectado
            socketIoUtils.sendUpdateToClient(clientId, {
                result: result,
                subProcess: subProcess,
                process: proceso,
                description: description,
            });
            proceso[subProcess] = { result: result, description: description };

            //Persiste la información en la base de datos
            mongoUtils.updateProcess(proceso, subProcess);
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

module.exports.getActiveProcesses = async (
    clientId,
    resolve,
    reject,
    mongoInjection
) => {
    try {
        //Busca en la base de datos si ya existe un proceso de ese tipo
        let procesosActivos = await (
            mongoInjection || mongoUtils
        ).getActiveProcessesByClient(clientId);
        resolve(procesosActivos);
    } catch (err) {
        reject(err);
    }
};
