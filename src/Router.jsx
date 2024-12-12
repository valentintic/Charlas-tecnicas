import { Component } from 'react';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import MenuComponent from './components/display/MenuComponent';
import HomeComponent from './components/display/HomeComponent';
import CharlasComponent from './components/charlas/CharlasComponent';
import Register from './components/authentication/register/RegisterPage';
import LoginComponent from './components/authentication/login/LoginComponent';
import FormCharlas from './components/charlas/FormCharlas';

export default class Router extends Component {
    render() {
        return (
            <BrowserRouter Router= {this.props.router}>
                <Routes>
                    <Route path={"/register"} element={<Register/>} />
                    <Route path={"/"} element={<HomeComponent/>} />
                    <Route path={"/charlas"} element={<CharlasComponent/>} />
                    <Route path={"/login"} element={<LoginComponent/>} />
                    <Route path={"/create/charla"} element={<FormCharlas/>} />
                </Routes>
            </BrowserRouter>
        )
    }
}