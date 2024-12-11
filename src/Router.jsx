import { Component } from 'react';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import MenuComponent from './components/display/MenuComponent';
import HomeComponent from './components/display/HomeComponent';
import CharlasComponent from './components/charlas/CharlasComponent';
import LoginComponent from './components/authentication/login/LoginComponent';

import RegisterComponent from './components/authentication/register/RegisterComponent';

export default class Router extends Component {
    render() {
        return (
            <BrowserRouter Router= {this.props.router}>
                <MenuComponent/>
                <Routes>
                    <Route path={"/register"} element={<RegisterComponent/>} />
                    <Route path={"/"} element={<HomeComponent/>} />
                    <Route path={"/charlas"} element={<CharlasComponent/>} />
                    <Route path={"/login"} element={<LoginComponent/>} />
                </Routes>
            </BrowserRouter>
        )
    }
}