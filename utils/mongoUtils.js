const MongoClient = require('mongodb').MongoClient;

const url = process.env.SINCO_MONGO_URL;

module.exports.connect = async () => {
    const client = new MongoClient(url, {
        useNewUrlParser: true,
        useUnifiedTopology: true,
    });
    return client.connect();
};
