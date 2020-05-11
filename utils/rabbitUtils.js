var amqp = require('amqplib/callback_api');

const url = process.env.CLOUDAMQP_URL || 'amqp://localhost';

module.exports.sendProcess = (id, type, quantity, resolve, reject) => {
    amqp.connect(url, (error0, connection) => {
        if (error0 !== null) {
            reject(error0);
        } else {
            connection.createChannel(function (error1, channel) {
                if (error1) {
                    reject(error1);
                }
                let queue = 'processes';

                channel.assertQueue(queue, {
                    durable: true,
                });
                for (let i = 0; i < quantity; i++) {
                    let msg = `${id}/${type}/${i}`;
                    channel.sendToQueue(queue, Buffer.from(msg), {
                        persistent: true,
                    });
                }
                resolve();
            });
        }
    });
};
