import React, { useEffect } from 'react';
import '../Processes/Processes.css';
import { withRouter } from 'react-router-dom';
import socketIOClient from 'socket.io-client';

function Processes(props) {
    let socket = socketIOClient(
        'https://prueba-sinco-componente-a.herokuapp.com/'
    );

    useEffect(() => {
        socket.on('connect', () => {
            console.log('Main socket opnened');
            // Envia mensaje con identificacion para que el servidor le cree una room
            socket.emit('suscribeTo', '1018505033');
        });
        socket.on('update', (update) => {
            console.log('update', update);
        });
        return () => socket.close();
    }, []);
    return (
        <React.Fragment>
            <h1>Mis Procesos</h1>
        </React.Fragment>
    );
}

export default withRouter(Processes);
