import React, { useEffect, useState } from 'react';
import '../Processes/Processes.css';
import { withRouter } from 'react-router-dom';
import socketIOClient from 'socket.io-client';
import Process from './Process/Process';

function Processes(props) {
    let [processes, setProcesses] = useState(undefined);
    let [updatedProcess, setUpdatedProcess] = useState(undefined);

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
            console.log('Update from server', updatedProcess);

            let p = updatedProcess.process;
            let result = updatedProcess.result;
            let subProcess = updatedProcess.subProcess;
            let description = updatedProcess.description;
            let newProcesses = [...processes];
            let processTobeUpdated = undefined;
            let processFinished = true;
            for (let i in newProcesses) {
                if (newProcesses[i].tipo === p.tipo) {
                    processTobeUpdated = i;
                    newProcesses[i][parseInt(subProcess)] = {
                        result: result,
                        description: description,
                    };
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
                <Process key={i} process={process} />
            ))}
        </div>
    );
}

export default withRouter(Processes);
