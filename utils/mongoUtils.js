const MongoClient = require('mongodb').MongoClient;

const url = process.env.SINCO_MONGO_URL;
const dbName = 'prueba-sinco-db';

module.exports.connect = async () => {
    const client = new MongoClient(url, {
        useNewUrlParser: true,
        useUnifiedTopology: true,
    });
    return client.connect();
};

module.exports.getActiveProcessesByType = async (type) => {
    try {
        const client = new MongoClient(url, {
            useNewUrlParser: true,
            useUnifiedTopology: true,
        });
        await client.connect();

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

module.exports.createProcess = async (id, type, quantity) => {
    try {
        const client = new MongoClient(url, {
            useNewUrlParser: true,
            useUnifiedTopology: true,
        });
        await client.connect();

        const db = client.db(dbName);
        const processesCollection = db.collection('procesos');

        response = await processesCollection.insertOne({
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

module.exports.updateProcess = async (process) => {
    try {
        const client = new MongoClient(url, {
            useNewUrlParser: true,
            useUnifiedTopology: true,
        });
        await client.connect();

        const db = client.db(dbName);
        const processesCollection = db.collection('procesos');

        response = await processesCollection.updateOne(
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
