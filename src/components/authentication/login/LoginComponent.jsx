import React, { Component } from 'react';
import { postLogin } from '../../../services/Login';
import { Navigate } from 'react-router-dom';
import styles from "./Login.module.css";
import { postRegister } from '../../../services/UsuariosService';
import { Usuario } from '../../../models/usuario';

export default class LoginComponent extends Component {
  state = {
    user: {
      userName: "",
      password: ""
    },
    userRegistration: {
      idUsuario: 123131231,
      nombre: "",
      apellidos: "",
      email: "",
      imagen: "",
      password: "",
      estadoUsuario: true,
      idRole: 2
    },
    status: false,
    isActive: false, // Esto controla el toggle entre login y registro
  };

  handleToggleForm = () => {
    this.setState(prevState => ({
      isActive: !prevState.isActive,  // Cambia entre login y registro
    }));
  };

  handleChange = (e) => {
    const { name, value } = e.target;
    this.setState({
      user: {
        ...this.state.user,
        [name]: value,
      }
    });
  };

  handleRegisterChange = (e) => {
    e.preventDefault();
    const { name, value } = e.target;
    this.setState({
      userRegistration: {
        ...this.state.userRegistration,
        [name]: value,
      }
    });
  };

  login = (e) => {
    e.preventDefault();
    postLogin(this.state.user)
      .then((response) => {
        localStorage.setItem("token", response.response);
        this.setState({ status: true });
      })
      .catch((error) => {
        console.error("Error during login:", error);
      });
  };

  register = (e) => {
    e.preventDefault();
    const usuarioRegistro = new Usuario(this.state.userRegistration.idUsuario, this.state.userRegistration.nombre, this.state.userRegistration.apellidos, this.state.userRegistration.email, this.state.userRegistration.estadoUsuario, this.state.userRegistration.imagen, this.state.userRegistration.password, this.state.userRegistration.idRole);
    postRegister(usuarioRegistro)
      .then((response) => {
        localStorage.setItem("token", response.response);
        this.setState({ isActive: false });
        console.log(this.state.userRegistration);
      })
      .catch((error) => {
        console.error("Error during register:", error);
      });
  }

  render() {
    if (this.state.status) {
      return <Navigate to="/charlas" />;
    }

    return (
      <div className={`${styles.container} ${this.state.isActive ? styles.active : ''}`}>
        {/* Formulario de registro */}
        <div className={`${styles["form-container"]} ${styles["sign-up"]} ${this.state.isActive ? '' : styles.active}`}>
          <form onSubmit={this.register}>
            <h1>Create Account</h1>
            <input type="text" name="nombre" placeholder="Nombre" onChange={this.handleRegisterChange} />
            <input type="text" name="apellidos" placeholder="Apellidos" onChange={this.handleRegisterChange} />
            <input type="email" name="email" placeholder="userexample@example.com" onChange={this.handleRegisterChange} />
            <input type="text" name="imagen" placeholder="Image.jpg" onChange={this.handleRegisterChange} />
            <input type="password" name="password" placeholder="Password" onChange={this.handleRegisterChange} />
            <button onClick={this.register}>Sign Up</button>
          </form>
        </div>

        {/* Formulario de inicio de sesión */}
        <div className={`${styles["form-container"]} ${styles["sign-in"]} ${this.state.isActive ? styles.active : ''}`}>
          <form onSubmit={this.login}>
            <h1>Sign In</h1>
            <input type="email" name="userName" placeholder="userexample@example.com" onChange={this.handleChange} />
            <input type="password" name="password" placeholder="Password" onChange={this.handleChange} />
              <button type="submit">Log In</button>
          </form>
        </div>

        {/* Toggle para cambiar entre formularios */}
        <div className={styles["toggle-container"]}>
          <div className={styles.toggle}>
            <div className={`${styles["toggle-panel"]} ${styles["toggle-left"]}`}>
              <h1>Already have an Account?</h1>
              <p>Enter your personal details to use all of the site features</p>
              <button onClick={() => this.handleToggleForm('login')}>Log In</button>
            </div>
            <div className={`${styles["toggle-panel"]} ${styles["toggle-right"]} `}>
              <h1>Dont have an account?</h1>
              <p>Register with your personal details to use all of the site features</p>
              <button onClick={() => this.handleToggleForm('register')}>Register</button>
            </div>
          </div>
        </div>
      </div>
    );
  }
}
