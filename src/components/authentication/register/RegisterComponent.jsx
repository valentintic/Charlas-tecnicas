import React, { Component } from "react";
import { Usuario } from "../../../models/usuario";
import ServiceUsuarios from "../../../services/UsuariosService";
import { Navigate } from "react-router-dom";
const service = new ServiceUsuarios();

export default class RegisterComponent extends Component {

    state = {
        status: false
    }

    //Inicializamos los datos del formulario
    cajaNombre = React.createRef();
    cajaApellidos = React.createRef();
    cajaEmail = React.createRef();
    cajaPassword = React.createRef();

    InsertUser = (e) => {
        e.preventDefault();
        let idUsuario = 12312313;
        let nombre = this.cajaNombre.current.value;
        let apellidos = this.cajaApellidos.current.value;
        let email = this.cajaEmail.current.value;
        let estadoUsuario = true;
        let imagen = "prueba.jpg";
        let password = this.cajaPassword.current.value;
        let idRole = 2;

        let newUsuario = new Usuario(idUsuario ,nombre ,apellidos ,email ,estadoUsuario ,imagen ,password ,idRole);

        service.insertDepartamento(newUsuario).then(result => {
            console.log(result);
            this.setState({
                status: true
            })
            
        });
        //  validar la informacion del formulario
        //  correo unico?, verificar que las dos contraseñas coinciden
        //  estado de usuario?, role por defecto?
    }



    render() {

        if (this.state.status == true) {
            return(<Navigate to="/login"/>);
            
        }else{
            return (
                <>
                    <div className="mb-3">
                        <form onSubmit={(e) => e.preventDefault()} className="container mt-4 p-4 border rounded bg-light">
                            <h1>Registro</h1>
                            <label className="form-label" >Nombre:</label>
                            <input className="form-control" ref={this.cajaNombre} type="text" name="nombre" id="nombre" />
                            <label className="form-label" >Apellidos:</label>
                            <input className="form-control" ref={this.cajaApellidos} type="text" name="apellidos" id="apellidos" />
                            <label className="form-label" >Email:</label>
                            <input className="form-control" ref={this.cajaEmail} type="text" name="email" id="email" />
                            <label className="form-label" >Constraseña:</label>
                            <input className="form-control" ref={this.cajaPassword} type="password" name="password" id="password" />
                            <label className="form-label" >Repite Constraseña:</label>
                            <input className="form-control" type="password" name="passwordRepeat" id="passwordRepeat" />
                            <br />
                            <input className="form-check-input" type="checkbox" value="" id="flexCheckDefault"/>
                            <label className="form-check-label" htmlFor="flexCheckDefault">De momento no hace nada</label>
                            <br />
                            <br />
                            <input type="submit" onClick={this.InsertUser} value="Registrarse" className="btn btn-primary" />
                        </form>
                    </div>
                </>
            )
        }
        
    }
}