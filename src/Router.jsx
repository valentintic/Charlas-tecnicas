import { Component } from 'react';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import MenuComponent from './components/display/MenuComponent';
import HomeComponent from './components/display/HomeComponent';
import CharlasComponent from './components/charlas/CharlasComponent';
import LoginComponent from './components/authentication/login/LoginComponent';
import FormCharlas from './components/charlas/FormCharlas';
import UserProfileComponent from './components/user/UserProfileComponent';


export default class Router extends Component {
    render() {
        return (
            <BrowserRouter Router= {this.props.router}>
                <MenuComponent/>
                <Routes>
                    <Route path={"/"} element={<HomeComponent/>} />
                    <Route path={"/login"} element={<LoginComponent/>} />
                    <Route path={"/charlas"} element={<CharlasComponent/>} />
                    <Route path={"/create/charla"} element={<FormCharlas/>} />
                    <Route path={"/user/profile"} element={<UserProfileComponent/>}/> 
                </Routes>
            </BrowserRouter>
        )
    }
}