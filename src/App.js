import React from 'react';
import './App.css';
import LoginComponent from './components/LoginComponent';
import HeaderComponent from './components/HeaderComponent';
import RegistrarionComponent from './components/RegistrationComponent';
import {BrowserRouter as Router, Route, Switch}from 'react-router-dom';


function App(){
    return (
        <div>
            <Router>
                <div>
                <Switch> https://contafast.herokuapp.com
                    <Route exact path ="/" component = {HeaderComponent}></Route>
                    <Route path ="/registrar-usuario" component = {HeaderComponent}></Route>
                </Switch>
                </div>
                <div>
                    <Switch> https://contafast.herokuapp.com
                        <Route exact path ="/" component = {LoginComponent}></Route>
                        <Route path ="/registrar-usuario" component = {RegistrarionComponent}></Route>
                    </Switch>
                </div>
            </Router>
        </div>
    )
}
export default App;