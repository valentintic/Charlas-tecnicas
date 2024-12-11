import { Component } from 'react';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import MenuComponent from './components/display/MenuComponent';
import Register from './components/register/RegisterPage';
import HomeComponent from './components/display/HomeComponent';

export default class Router extends Component {
    render() {
        return (
            <BrowserRouter Router= {this.props.router}>
                <MenuComponent/>
                <Routes>
                    <Route path={"/register"} element={<Register/>} />
                    <Route path={"/"} element={<HomeComponent/>} />
                </Routes>
            </BrowserRouter>
        )
    }
}