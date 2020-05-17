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
                let subProcess = partes[2];

                console.log(
                    `Se recibió un proceso de tipo ${type} del cliente ${clientId}`
                );

                setTimeout(() => {
                    try {
                        // Simula una peticion mal formada Ej: División por 0
                        if (type === 'Errores') {
                            throw 'Error por petición mal formada';
                        }
                        // Simula una peticion mal formada en un solo subproceso
                        if (type === 'Error' && subProcess === '0') {
                            throw 'Error por petición mal formada';
                        }
                        // Calcula un numero aleatorio
                        let random = Math.random();
                        // Simula un error eventual Ej: Que un servicio externo falle
                        if (0.5 < random) {
                            throw 'Error eventual';
                        }

                        //Llama al webhook del componente A para notificar el resultado del procesamiento
                        fetch(
                            `http://localhost:3001/clients/${clientId}/notifications`,
                            {
                                method: 'POST',
                                headers: {
                                    'Content-Type': 'application/json',
                                },
                                body: JSON.stringify({
                                    type: type,
                                    result: 'Exito',
                                    subProcess: subProcess,
                                }),
                            }
                        )
                            .then(async (response) => {
                                let data = await response.json();
                                //Si el webhook contesta bien, envía la confirmacion al servidor de mensajería
                                if (data.msg) {
                                    channel.ack(msg);
                                } else {
                                    throw 'Error en el componente A';
                                }
                                console.log(
                                    `Termino un proceso de tipo ${type}`
                                );
                            })
                            .catch((err) => {
                                throw 'Error al conectarse con el componente A';
                            });
                    } catch (err) {
                        //Revisa si el servidor error es eventual o permanente
                        if (
                            [
                                'Error eventual',
                                'Error en el componente A',
                                'Error al conectarse con el componente A',
                            ].includes(err)
                        ) {
                            //Si es una falla eventual la manda al servidor de mensajeria para que lo devuelve a la cola
                            console.log('Devolvio un mensaje a la cola');
                            channel.reject(msg, true);
                        } else {
                            //Si es una falla permanente le notifica de la falla al servicio A
                            fetch(
                                `http://localhost:3001/clients/${clientId}/notifications`,
                                {
                                    method: 'POST',
                                    headers: {
                                        'Content-Type': 'application/json',
                                    },
                                    body: JSON.stringify({
                                        type: type,
                                        result: 'Falla Inmanejable',
                                        description: err.toString(),
                                        subProcess: subProcess,
                                    }),
                                }
                            )
                                .then(async (response) => {
                                    let data = await response.json();
                                    //Si el el webhook contesta bien, envia el error al servidor de mensajeria pero sin que lo vuelva a encolar
                                    if (data.msg) {
                                        channel.reject(msg, false);
                                        console.log(
                                            `Termino un proceso de tipo ${type}`
                                        );
                                    } else {
                                        //Si el servicio A tiene un error la manda al servidor de mensajeria para que lo devuelve a la cola y se vuelva a intentar màs tarde
                                        channel.reject(msg, true);
                                        console.log(
                                            'Devolvio un mensaje a la cola'
                                        );
                                    }
                                })
                                .catch((err) => {
                                    //Si no se logra conectar al servicio A lo devuelve a la cola para que se vuelva a intentar màs tarde
                                    channel.reject(msg, true);
                                    console.log(
                                        'Devolvio un mensaje a la cola'
                                    );
                                });
                        }
                    }
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
