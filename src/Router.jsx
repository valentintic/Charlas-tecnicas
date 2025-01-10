import { Component } from 'react';
import { BrowserRouter, Route, Routes, Navigate } from 'react-router-dom';
import MenuComponent from './components/display/MenuComponent';
import HomeComponent from './components/display/HomeComponent';
import CharlasComponent from './components/charlas/CharlasComponent';
import LoginComponent from './components/authentication/login/LoginComponent';
import FormCharlas from './components/charlas/FormCharlas';
import UserProfileComponent from './components/user/UserProfileComponent';
import RondasComponent from './components/rondas/RondasComponent';
import FooterComponent from './components/display/FooterComponent';

const isAuthenticated = () => {
    return !!localStorage.getItem('token');
};

const PrivateRoute = ({ element }) => {
    return isAuthenticated() ? element : <Navigate to="/login" />;
};

const PublicRoute = ({ element }) => {
    return isAuthenticated() ? <Navigate to="/" /> : element;
};

export default class Router extends Component {
    render() {
        return (
            <BrowserRouter>
                <MenuComponent />
                <Routes>
                    <Route path="/" element={<HomeComponent />} />
                    <Route path="/login" element={<PublicRoute element={<LoginComponent />} />} />
                    <Route path="/charlas" element={<PrivateRoute element={<CharlasComponent />} />} />
                    <Route path="/create/charla" element={<PrivateRoute element={<FormCharlas />} />} />
                    <Route path="/update/charla/:id" element={<PrivateRoute element={<FormCharlas />} />} />
                    <Route path="/user/profile" element={<PrivateRoute element={<UserProfileComponent />} />} />
                    <Route path="/rondas" element={<PrivateRoute element={<RondasComponent />} />} />
                </Routes>
                {/* <FooterComponent /> */}
            </BrowserRouter>
        );
    }
}
