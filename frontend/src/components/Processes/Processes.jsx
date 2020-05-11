import React, { useEffect, useState } from 'react';
import '../Processes/Processes.css';
import { withRouter } from 'react-router-dom';
import socketIOClient from 'socket.io-client';

function Processes(props) {
    let [processes, setProcesses] = useState(undefined);
    let [updatedProcess, setUpdatedProcess] = useState(undefined);

    let calculatePercentage = (process) => {
        let completed = 0;
        for (let i = 0; i < process.cantidad; i++) {
            if (process[i]) {
                completed += 1;
            }
        }
        let percentage = (completed * 100) / process.cantidad;
        return percentage + '%';
    };

    let calculateExitosos = (process) => {
        let exitos = 0;
        for (let i = 0; i < process.cantidad; i++) {
            if (process[i] === 'Exito') {
                exitos += 1;
            }
        }
        return exitos;
    };

    let calculateFallidos = (process) => {
        let fallas = 0;
        for (let i = 0; i < process.cantidad; i++) {
            if (process[i] === 'Falla') {
                fallas += 1;
            }
        }
        return fallas;
    };

    let socket = socketIOClient('/');

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
            console.log(updatedProcess);

            let p = updatedProcess.process;
            let result = updatedProcess.result;
            let subProcess = updatedProcess.subProcess;
            let newProcesses = [...processes];
            let processTobeUpdated = undefined;
            let processFinished = true;
            for (let i in newProcesses) {
                if (newProcesses[i].tipo === p.tipo) {
                    processTobeUpdated = i;
                    newProcesses[i][parseInt(subProcess)] = result;
                }
            }

            for (let i = 0; i < p.cantidad; i++) {
                if (newProcesses[processTobeUpdated][i] === false) {
                    processFinished = false;
                }
            }

            if (processFinished) {
                newProcesses.splice(processTobeUpdated, 1);
            }
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
                            <h5>Exitosos: {calculateExitosos(process)}</h5>
                        </div>
                        <div className='statisticContainer'>
                            <div className='redCircle'></div>
                            <h5>Fallidos: {calculateFallidos(process)}</h5>
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
