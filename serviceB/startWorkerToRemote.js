var amqp = require('amqplib/callback_api');
var fetch = require('node-fetch');

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
                let clientId = partes[0];
                let type = partes[1];

                console.log(
                    `Se recibió un proceso de tipo ${type} del cliente ${clientId}`
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
                        `Termino un proceso de tipo ${type} para cliente ${clientId} con resultado: ${response}`
                    );
                    //Llama al webhook del componente A para notificar el resultado del procesamiento
                    fetch(
                        `https://prueba-sinco-componente-a.herokuapp.com/clients/${clientId}/notifications`,
                        {
                            method: 'POST',
                            headers: { 'Content-Type': 'application/json' },
                            body: JSON.stringify({
                                type: type,
                                result: response,
                            }),
                        }
                    ).then((response) => {
                        response.json().then((data) => {
                            //Si el el webhook contesta bien, envía la confirmacion al servidor de mensajería
                            if (data.msg) {
                                channel.ack(msg);
                            }
                        });
                    });
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
