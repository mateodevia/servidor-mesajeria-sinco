import React, { useEffect, useState } from 'react';
import '../Processes/Processes.css';
import { withRouter } from 'react-router-dom';
import socketIOClient from 'socket.io-client';

function Processes(props) {
    let [processes, setProcesses] = useState(undefined);
    let [updatedProcess, setUpdatedProcess] = useState(undefined);

    let calculatePercentage = (process) => {
        let completed = process.exitosos + process.fallidos;
        let percentage = (completed * 100) / process.cantidad;
        return percentage + '%';
    };

    let socket = socketIOClient(
        'https://prueba-sinco-componente-a.herokuapp.com/'
    );

    useEffect(() => {
        fetch(`/clients/${window.sessionStorage.username}/processes`).then(
            (response) => {
                response.json().then((data) => {
                    setProcesses(data);
                });
            }
        );
        socket.on('connect', () => {
            console.log('Main socket opnened');
            // Envia mensaje con identificacion para que el servidor le cree una room
            socket.emit('suscribeTo', window.sessionStorage.username);
        });
        socket.on('update', (update) => {
            setUpdatedProcess(update);
        });
        return () => socket.close();
    }, []);

    useEffect(() => {
        if (processes) {
            let newProcesses = [...processes];
            for (let i in newProcesses) {
                if (newProcesses[i].tipo === updatedProcess.tipo) {
                    newProcesses[i] = updatedProcess;
                }
            }
            console.log(updatedProcess);
            console.log(newProcesses);
            setProcesses(newProcesses);
        }
    }, [updatedProcess]);

    return (
        <div className='processesContainer'>
            <h1>Mis Procesos</h1>
            {!processes && <h4>Cargando...</h4>}
            {processes?.length === 0 && <h4>No hay procesos activos</h4>}
            {processes?.map((process, i) => (
                <div key={i} className='processContainer'>
                    <h3>{process.tipo}</h3>
                    <div className='processFlex'>
                        <div className='statisticContainer'>
                            <div className='greenCircle'></div>
                            <h5>Exitosos: {process.exitosos}</h5>
                        </div>
                        <div className='statisticContainer'>
                            <div className='redCircle'></div>
                            <h5>Fallidos: {process.fallidos}</h5>
                        </div>
                    </div>
                    <div className='progressBar'>
                        <div
                            style={{ width: calculatePercentage(process) }}
                        ></div>
                    </div>
                </div>
            ))}
        </div>
    );
}

export default withRouter(Processes);
