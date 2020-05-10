import React, { useEffect, useState } from 'react';
import './App.css';
import { Switch, Route, withRouter } from 'react-router-dom';
import Navbar from './components/Navbar/Navbar';
import Login from './components/Login/Login';
import Processes from './components/Processes/Processes';
import CreateProcess from './components/CreateProcess/CreateProcess';

function App(props) {
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
                                <Processes />
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
                                <CreateProcess />
                            </React.Fragment>
                        );
                    }}
                />
            </Switch>
        </div>
    );
}

export default withRouter(App);
