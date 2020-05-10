import React, { useRef } from 'react';
import '../Login/Login.css';
import { withRouter } from 'react-router-dom';

function Login(props) {
    let inputRef = useRef();

    let handleClick = () => {
        if (inputRef.current.value === '') {
            alert('El usuario no es valido');
        } else {
            window.sessionStorage.username = inputRef.current.value;
            props.history.push('/misprocesos');
        }
    };
    return (
        <React.Fragment>
            <div className='loginContainer'>
                <h1>Bienvenido</h1>
                <h2>
                    Para ingresar al manejador de procesos de Sincosoft ingrese
                    su identificador de usuario
                </h2>
                <input
                    ref={inputRef}
                    type='text'
                    placeholder='Identificador del usuario'
                />
                <br />
                <button onClick={handleClick}>Entrar</button>
            </div>
        </React.Fragment>
    );
}

export default withRouter(Login);
