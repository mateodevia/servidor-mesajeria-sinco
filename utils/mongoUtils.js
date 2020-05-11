const MongoClient = require('mongodb').MongoClient;
const ObjectID = require('mongodb').ObjectID;

const MongoUtils = () => {
    exports = {};
    const url = process.env.SINCO_MONGO_URL;
    const dbName = 'prueba-sinco-db';

    const client = new MongoClient(url, {
        useNewUrlParser: true,
        useUnifiedTopology: true,
    });

    exports.connect = async () => {
        let response = await client.connect();
        return response;
    };

    exports.getActiveProcessesByType = async (type) => {
        try {
            const db = client.db(dbName);
            const processesCollection = db.collection('procesos');
            let result = await processesCollection
                .find({
                    tipo: type,
                    activo: true,
                })
                .toArray();

            if (result.length > 0) {
                let newResult = [];
                for (let i in result) {
                    let p = result[i];
                    let finished = true;
                    for (let j = 0; j < p.cantidad; j++) {
                        if (p[j] === false) {
                            finished = false;
                        }
                    }
                    if (finished === false) {
                        newResult.push(p);
                    }
                }
                result = newResult;
            }
            return result;
        } catch (err) {
            throw {
                type: 500,
                msg: `Error en la base de datos: ${err}`,
            };
        }
    };

    exports.createProcess = async (id, type, quantity) => {
        try {
            const db = client.db(dbName);
            const processesCollection = db.collection('procesos');
            let newProcess = {
                cliente: id,
                activo: true,
                tipo: type,
                cantidad: quantity,
            };
            for (let i = 0; i < quantity; i++) {
                newProcess[i] = false;
            }
            let response = await processesCollection.insertOne(newProcess);

            return response.ops[0];
        } catch (err) {
            throw {
                type: 500,
                msg: `Error en la base de datos: ${err}`,
            };
        }
    };

    exports.updateProcess = async (process, subProcesss) => {
        try {
            const db = client.db(dbName);
            const processesCollection = db.collection('procesos');
            let o_id = new ObjectID(process._id);
            let response = await processesCollection.updateOne(
                { _id: o_id },
                {
                    $set: {
                        activo: process.activo,
                        subProcesos: process.subProcesos,
                        [`${subProcesss}`]: process[subProcesss],
                    },
                }
            );

            return 'OK';
        } catch (err) {
            throw {
                type: 500,
                msg: `Error en la base de datos: ${err}`,
            };
        }
    };

    exports.getActiveProcessesByClient = async (clientId) => {
        try {
            const db = client.db(dbName);
            const processesCollection = db.collection('procesos');
            let result = await processesCollection
                .find({
                    cliente: clientId,
                    activo: true,
                })
                .toArray();
            if (result.length > 0) {
                let newResult = [];
                for (let i in result) {
                    let p = result[i];
                    let finished = true;
                    for (let j = 0; j < p.cantidad; j++) {
                        if (p[j] === false) {
                            finished = false;
                        }
                    }
                    if (finished === false) {
                        newResult.push(p);
                    }
                }
                result = newResult;
            }
            return result;
        } catch (err) {
            throw {
                type: 500,
                msg: `Error en la base de datos: ${err}`,
            };
        }
    };

    exports.closeConection = async () => {
        client.close();
    };

    return exports;
};

module.exports = MongoUtils;
