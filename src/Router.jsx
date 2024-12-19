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


// Función para verificar si el usuario está autenticado
const isAuthenticated = () => {
    return !!localStorage.getItem('token'); // Cambia según cómo guardas el token
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
                    <Route path={"/"} element={<HomeComponent/>} />
                    <Route path={"/login"} element={<LoginComponent/>} />
                    <Route path={"/charlas"} element={<CharlasComponent/>} />
                    <Route path={"/create/charla"} element={<FormCharlas/>} />
                    <Route path={"/update/charla/:id"} element={<FormCharlas/>} />
                    <Route path={"/user/profile"} element={<UserProfileComponent/>}/> 
                    <Route path={"/rondas"} element={<RondasComponent/>}/>  
                </Routes>
                <FooterComponent />
            </BrowserRouter>
        );
    }
}
