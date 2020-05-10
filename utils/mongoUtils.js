const MongoClient = require('mongodb').MongoClient;

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
            let result = await processesCollection.find({
                tipo: type,
                activo: true,
            });
            return result.toArray();
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
            let response = await processesCollection.insertOne({
                cliente: id,
                activo: true,
                tipo: type,
                cantidad: quantity,
                exitosos: 0,
                fallidos: 0,
            });
            return response.ops[0];
        } catch (err) {
            throw {
                type: 500,
                msg: `Error en la base de datos: ${err}`,
            };
        }
    };

    exports.updateProcess = async (process) => {
        try {
            const db = client.db(dbName);
            const processesCollection = db.collection('procesos');
            let response = await processesCollection.updateOne(
                { activo: true, tipo: process.tipo },
                {
                    $set: {
                        activo: process.activo,
                        exitosos: process.exitosos,
                        fallidos: process.fallidos,
                    },
                }
            );

            return 'OK';
        } catch (err) {
            console.log(err);
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
            let result = await processesCollection.find({
                cliente: clientId,
                activo: true,
            });
            return result.toArray();
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
