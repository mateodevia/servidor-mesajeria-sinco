var amqp = require('amqplib/callback_api');

amqp.connect(process.env.CLOUDAMQP_URL || 'amqp://localhost', function (
    error0,
    connection
) {
    if (error0) {
        throw error0;
    }
    connection.createChannel(function (error1, channel) {
        if (error1) {
            throw error1;
        }
        var queue = 'processes';

        channel.assertQueue(queue, {
            durable: true,
        });
        channel.prefetch(1);

        console.log('Worker listo. Oprima [ CTRL+C ] para parar el worker');

        channel.consume(
            queue,
            (msg) => {
                let partes = msg.content.toString().split('/');

                console.log(
                    `Se recibió un proceso de tipo ${partes[1]} del cliente ${partes[0]}`
                );

                setTimeout(() => {
                    // Calcula un numero aleatorio
                    let random = Math.random();
                    let response = '';
                    // Simula una falla en el proceso con una probabilidad de 5%
                    if (random < 0.5) {
                        response = 'Exito';
                    } else {
                        response = 'Falla';
                    }
                    console.log(
                        `Termino un proceso de tipo ${partes[1]} para cliente ${partes[0]} con resultado: ${response}`
                    );
                    channel.ack(msg);
                    //Llama al webhook del componente A para notificar el resultado del procesamiento
                }, 5000);
            },
            {
                // manual acknowledgment mode,
                // see https://www.rabbitmq.com/confirms.html for details
                noAck: false,
            }
        );
    });
});
