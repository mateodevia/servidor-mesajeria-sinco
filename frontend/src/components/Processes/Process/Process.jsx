import React, { useEffect, useState } from 'react';
import '../Process/Process.css';

function Process(props) {
    let [open, setOpen] = useState(false);

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
            if (process[i]?.result === 'Exito') {
                exitos += 1;
            }
        }
        return exitos;
    };

    let calculateFallidos = (process) => {
        let fallas = 0;
        for (let i = 0; i < process.cantidad; i++) {
            if (process[i] && process[i].result !== 'Exito') {
                fallas += 1;
            }
        }
        return fallas;
    };

    return (
        <div className='processContainer' onClick={() => setOpen(!open)}>
            <h3>{props.process.tipo}</h3>
            <div className='processFlex'>
                <div className='statisticContainer'>
                    <div className='greenCircle'></div>
                    <h5>Exitosos: {calculateExitosos(props.process)}</h5>
                </div>
                <div className='statisticContainer'>
                    <div className='redCircle'></div>
                    <h5>Fallidos: {calculateFallidos(props.process)}</h5>
                </div>
            </div>
            <div className='progressBar'>
                <div
                    style={{ width: calculatePercentage(props.process) }}
                ></div>
            </div>
            {open && (
                <div className='subProcessesContainer'>
                    {Object.keys(props.process)
                        .filter(
                            (key) =>
                                key !== '_id' &&
                                key !== 'cantidad' &&
                                key !== 'cliente' &&
                                key !== 'tipo'
                        )
                        .map((subprocess, i) => {
                            return (
                                <div key={i}>
                                    {props.process[subprocess] ? (
                                        <div
                                            className='subprocess'
                                            style={
                                                props.process[subprocess]
                                                    .result === 'Exito'
                                                    ? {
                                                          borderLeft:
                                                              '4px solid rgb(134, 206, 27)',
                                                      }
                                                    : {
                                                          borderLeft:
                                                              '4px solid rgb(200, 45, 45)',
                                                      }
                                            }
                                        >
                                            {i}:{' '}
                                            {props.process[subprocess]
                                                .description || 'Exito'}
                                        </div>
                                    ) : (
                                        <div className='subprocess'>
                                            {i}: Pendiente
                                        </div>
                                    )}
                                </div>
                            );
                        })}
                </div>
            )}
        </div>
    );
}

export default Process;
