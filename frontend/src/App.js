import React, { useEffect } from 'react';
import socketIOClient from 'socket.io-client';
import './App.css';

function App() {
    let socket = socketIOClient('http://localhost:3001/');

    useEffect(() => {
        socket.on('connect', () => {
            console.log('Main socket opnened');
            // Envia mensaje con identificacion para que el servidor le cree una room
            socket.emit('suscribeTo', '1018505033');
        });
        socket.on('update', (update) => {
            console.log('update', update);
        });
    }, []);

    return (
        <div>
            <h1>Sistema de Procesos Sincosoft</h1>
        </div>
    );
}

export default App;
