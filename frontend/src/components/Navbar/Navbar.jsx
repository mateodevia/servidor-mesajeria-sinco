import React, { useEffect } from 'react';
import { withRouter } from 'react-router-dom';
import '../Navbar/Navbar.css';
import Logo from '../../media/LogoSinco.svg';

function Navbar(props) {
    useEffect(() => {
        if (!window.sessionStorage.username) {
            props.history.push('/');
        }
    }, []);
    return (
        <div className='headerContainer'>
            <img className='logo' src={Logo} />
            <div
                className={
                    props.selected === 'misProcesos'
                        ? 'selected title'
                        : 'title'
                }
                onClick={() => props.history.push('/misprocesos')}
            >
                Mis Procesos
            </div>
            <div
                className={
                    props.selected === 'crearProceso'
                        ? 'selected title'
                        : 'title'
                }
                onClick={() => props.history.push('/crearproceso')}
            >
                Crear Proceso
            </div>
        </div>
    );
}

export default withRouter(Navbar);
