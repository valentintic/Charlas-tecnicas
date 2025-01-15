import React, { Component } from 'react';
import { postLogin } from '../../../services/Login';
import { Navigate } from 'react-router-dom';
import styles from './Login.module.css';  // Importas el archivo como un objeto
import { postRegister } from '../../../services/UsuariosService';
import { Usuario } from '../../../models/usuario';
import { withLocation } from '../login/WithLocation.jsx'; // Asegúrate de que la ruta sea correcta


class LoginComponent extends Component {
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
    curso: "",
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
      },
      ...(name === 'curso' && { curso: value }),
      
    });
  };

  login = (e) => {
    e.preventDefault();
    postLogin(this.state.user)
      .then((response) => {
        localStorage.setItem("token", response.data.response);
        this.setState({ status: true });
      })
      .catch((error) => {
        console.error("Error during login:", error);
      });
  };

  register = (e) => {
    e.preventDefault();
    const usuarioRegistro = new Usuario(this.state.userRegistration.idUsuario, this.state.userRegistration.nombre, this.state.userRegistration.apellidos, this.state.userRegistration.email + '@tajamar365.com', this.state.userRegistration.estadoUsuario, this.state.userRegistration.imagen, this.state.userRegistration.password, this.state.userRegistration.idRole);
    const curso = this.state.curso;
    postRegister(curso, usuarioRegistro)
      .then((response) => {
        localStorage.setItem("token", response.response);
        this.setState({ isActive: false });
        console.log(this.state.userRegistration);
      })
      .catch((error) => {
        console.error("Error during register:", error);
      });
  }

  componentDidMount() {
    const { state } = this.props.location || {};
    if (state?.isActive) {
      this.setState({ isActive: state.isActive });
    }
  }

  componentDidUpdate(prevProps) {
    const { state } = this.props.location || {};
    if (state?.isActive !== prevProps.location?.state?.isActive) {
      this.setState({ isActive: state.isActive });
    }
  }
  

  render() {
    if (this.state.status) {
      return <Navigate to="/charlas" />;
    }

    return (
      <div className={`${styles["login-page-container"]}`}>
        <div className={`${styles.container} ${this.state.isActive ? styles.active : ''}`}>
        {/* Formulario de registro */}
        <div className={`${styles["form-container"]} ${styles["sign-up"]} ${this.state.isActive ? '' : styles.active}`}>
          <form onSubmit={this.register}>
            <h2>Create Account</h2>
            <input type="text" name="nombre" placeholder="Nombre" onChange={this.handleRegisterChange} />
            <input type="text" name="apellidos" placeholder="Apellidos" onChange={this.handleRegisterChange} />
            <div style={{ display: 'flex', alignItems: 'center' }}>
              <input
                type="text"
                name="email"
                placeholder="user.example"
                onChange={this.handleRegisterChange}
                style={{ flex: '0.5', borderRadius: '8px 0 0 8px' }}
              />
              <input
                type="text"
                value="@tajamar365.com"
                disabled
                style={{
                  backgroundColor: '#ddd',
                  color: '#333',
                  border: 'none',
                  flex: '0.5',
                  borderRadius: '0 8px 8px 0',
                  textAlign: 'center',
                  
                }}
              />

            </div>
            <input type="text" name="imagen" placeholder="Image.jpg" onChange={this.handleRegisterChange} />
            <input type="password" name="password" placeholder="Password" onChange={this.handleRegisterChange} />
            <input type="text" name="curso" placeholder="Curso" onChange={this.handleRegisterChange} />
            <button onClick={this.register}>Sign Up</button>
          </form>
        </div>

        {/* Formulario de inicio de sesión */}
        <div className={`${styles["form-container"]} ${styles["sign-in"]} ${this.state.isActive ? styles.active : ''}`}>
          <form onSubmit={this.login}>
            <h1>Sign In</h1>
            <input type="email" name="userName" placeholder="userexample@tajamar365.com" onChange={this.handleChange} />
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
        </div>        
      
    );
  }
}

export default withLocation(LoginComponent);
