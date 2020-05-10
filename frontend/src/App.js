import React, { useEffect, useState } from 'react';
import socketIOClient from 'socket.io-client';
import './App.css';
import { Switch, Route, withRouter } from 'react-router-dom';
import Navbar from './components/Navbar/Navbar';
import Login from './components/Login/Login';
import Procesos from './components/Procesos/Procesos';

function App(props) {
    let [clientId, setClientId] = useState('1018505033');

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
    }, []);

    return (
        <div>
            <Switch>
                <Route
                    exact
                    path='/'
                    render={() => {
                        return <Login />;
                    }}
                />
                <Route
                    path='/misprocesos'
                    render={() => {
                        return (
                            <React.Fragment>
                                <Navbar selected={'misProcesos'} />
                                <Procesos />
                            </React.Fragment>
                        );
                    }}
                />
                <Route
                    path='/crearproceso'
                    render={() => {
                        return (
                            <React.Fragment>
                                <Navbar selected={'crearProceso'} />
                                <div className='testApp'>Crear Proceso</div>
                            </React.Fragment>
                        );
                    }}
                />
            </Switch>
        </div>
    );
}

export default withRouter(App);
