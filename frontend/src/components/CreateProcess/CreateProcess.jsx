import React, { useRef, useState } from 'react';
import './CreateProcess.css';
import { withRouter } from 'react-router-dom';

function CreateProcess(props) {
    let [esperando, setEsperando] = useState(false);

    let typeRef = useRef();
    let quantityRef = useRef();

    let createProcess = () => {
        if (typeRef.current.value != '' && quantityRef.current.value != '') {
            setEsperando(true);
            fetch(`/clients/${window.sessionStorage.username}/processes`, {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({
                    type: typeRef.current.value,
                    quantity: parseInt(quantityRef.current.value),
                }),
            }).then((response) => {
                response.json().then((data) => {
                    if (data.error) {
                        alert(data.error);
                        setEsperando(false);
                    } else {
                        alert(data.msg);
                        setEsperando(false);
                    }
                });
            });
        } else {
            alert('Porfavor llene todosl los campos');
        }
    };

    return (
        <div className='createProcessContainer'>
            <h1>Crear Proceso</h1>
            <h3>
                Por favor ingrese el tipo de proceso, y la cantidad de procesos
                que quiere mandar a ejecutar
            </h3>
            <input
                ref={typeRef}
                type='text'
                placeholder='Tipo de proceso'
                disabled={esperando}
            />
            <input
                ref={quantityRef}
                type='number'
                placeholder='Cantidad'
                disabled={esperando}
            />
            <button disabled={esperando} onClick={createProcess}>
                Crear
            </button>
        </div>
    );
}

export default withRouter(CreateProcess);
